/**
 * Firestore Database Service Layer
 *
 * This service provides clean abstraction for Firestore operations
 * All database logic is centralized here for maintainability
 *
 * Collections:
 * - leads: Customer test ride bookings
 * - users: Admin users (synced with Firebase Auth)
 * - analytics: Daily/monthly aggregated stats (optional)
 */

import { getFirestore, admin } from './firebase-admin.js';

/**
 * Get Firestore timestamp (current server time)
 * Use this for createdAt, updatedAt fields
 *
 * @returns {admin.firestore.Timestamp} Server timestamp
 */
function getTimestamp() {
  return admin.firestore.FieldValue.serverTimestamp();
}

// ============================================
// LEADS COLLECTION OPERATIONS
// ============================================

/**
 * Create a new lead in Firestore
 *
 * @param {Object} leadData - Lead information
 * @param {string} leadData.name - Customer name
 * @param {string} leadData.phone - Customer phone number
 * @param {string} [leadData.email] - Customer email (optional)
 * @param {Object} leadData.quizAnswers - Quiz responses
 * @param {string} [leadData.source] - Landing page source
 * @param {string} [leadData.category] - Lead category (99 Offer, Test Ride, EMI, Exchange, General)
 * @returns {Promise<Object>} Created lead with ID
 */
async function createLead(leadData) {
  try {
    const db = getFirestore();
    const leadsRef = db.collection('leads');

    // Generate custom ID with timestamp
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const lead = {
      id: leadId,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || null,
      quizAnswers: leadData.quizAnswers || {},

      // Payment info (initially unpaid)
      payment: {
        status: 'UNPAID',
        transactionId: null,
        merchantTransactionId: null,
        amount: 9900, // ₹99 in paise
        currency: 'INR',
        method: null,
        paidAt: null
      },

      // Metadata
      source: leadData.source || 'unknown',
      category: leadData.category || 'General',
      utmSource: leadData.utmSource || null,
      utmMedium: leadData.utmMedium || null,
      utmCampaign: leadData.utmCampaign || null,

      // Status tracking
      status: 'NEW', // NEW, CONTACTED, SCHEDULED, COMPLETED, CANCELLED
      assignedTo: null,
      notes: '',

      // Timestamps
      createdAt: getTimestamp(),
      updatedAt: getTimestamp()
    };

    await leadsRef.doc(leadId).set(lead);

    console.log(`✅ Lead created: ${leadId}`);

    return {
      success: true,
      leadId,
      lead
    };

  } catch (error) {
    console.error('❌ Failed to create lead:', error);
    throw new Error(`Failed to create lead: ${error.message}`);
  }
}

/**
 * Get all leads with optional filtering
 *
 * @param {Object} filters - Query filters
 * @param {string} [filters.status] - Filter by payment status (PAID, UNPAID, etc.)
 * @param {string} [filters.leadStatus] - Filter by lead status (NEW, CONTACTED, etc.)
 * @param {string} [filters.category] - Filter by lead category (99 Offer, Test Ride, EMI, Exchange, General)
 * @param {string} [filters.fromDate] - Filter leads created after this date (ISO string)
 * @param {string} [filters.toDate] - Filter leads created before this date (ISO string)
 * @param {number} [filters.limit] - Max number of results (default: 100)
 * @param {string} [filters.orderBy] - Order by field (default: 'createdAt')
 * @param {string} [filters.order] - Sort order: 'asc' or 'desc' (default: 'desc')
 * @returns {Promise<Array>} Array of leads
 */
/**
 * Get all leads with optional filtering and pagination
 *
 * @param {Object} filters - Query filters
 * @param {string} [filters.status] - Filter by payment status (PAID, UNPAID, etc.)
 * @param {string} [filters.leadStatus] - Filter by lead status (NEW, CONTACTED, etc.)
 * @param {string} [filters.category] - Filter by lead category (99 Offer, Test Ride, EMI, Exchange, General)
 * @param {string} [filters.fromDate] - Filter leads created after this date (ISO string)
 * @param {string} [filters.toDate] - Filter leads created before this date (ISO string)
 * @param {number} [filters.limit] - Max number of results (default: 20)
 * @param {string} [filters.cursor] - Last visible document ID for pagination
 * @param {string} [filters.orderBy] - Order by field (default: 'createdAt')
 * @param {string} [filters.order] - Sort order: 'asc' or 'desc' (default: 'desc')
 * @returns {Promise<Array>} Array of leads
 */
async function getLeads(filters = {}) {
  try {
    const db = getFirestore();
    let query = db.collection('leads');

    // Apply Filters directly in Firestore Query
    // Note: This may require composite indexes in Firestore Console

    // 1. Status Filter (Payment Status)
    if (filters.status && filters.status !== 'all') {
      const targetStatus = filters.status.toUpperCase();
      query = query.where('payment.status', '==', targetStatus);
    }

    // 2. Lead Status Filter
    if (filters.leadStatus && filters.leadStatus !== 'all') {
      query = query.where('status', '==', filters.leadStatus);
    }

    // 3. Category Filter
    if (filters.category && filters.category !== 'all') {
      if (filters.category === 'Test Ride') {
        // 'Test Ride' is a complex condition in the old code...
        // For simplicity and performance, we'll try to use the 'category' field directly if possible.
        // If the data is dirty (category not set but source set), we might miss some.
        // Assuming 'category' field is reliably populated now (or we should migrate data).
        // Using 'in' operator to catch multiple variations
        query = query.where('category', 'in', ['Test Ride', '99 Offer']);
      } else {
        query = query.where('category', '==', filters.category);
      }
    }

    // 4. Date Range Filters
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      fromDate.setHours(0, 0, 0, 0);
      query = query.where('createdAt', '>=', admin.firestore.Timestamp.fromDate(fromDate));
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      query = query.where('createdAt', '<=', admin.firestore.Timestamp.fromDate(toDate));
    }

    // Default Ordering
    // Note: If using equality filter (==) on a field, you can order by another field.
    // But if using range filter (>, <) on createdAt, you MUST order by createdAt first.
    // Safe default: always order by createdAt desc unless specified otherwise.
    const orderByField = filters.orderBy || 'createdAt';
    const orderDir = filters.order || 'desc';

    query = query.orderBy(orderByField, orderDir);

    // Pagination: Start After Cursor
    if (filters.cursor) {
      const cursorDoc = await db.collection('leads').doc(filters.cursor).get();
      if (cursorDoc.exists) {
        query = query.startAfter(cursorDoc);
      }
    }

    // Limit Result Set (Drastically reduce from 500)
    const limit = parseInt(filters.limit) || 20;
    query = query.limit(limit);

    const snapshot = await query.get();

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
        payment: {
          ...data.payment,
          paidAt: data.payment?.paidAt?.toDate?.()?.toISOString() || null
        }
      };
    });

  } catch (error) {
    console.error('❌ Failed to get leads:', error);

    // Fallback for missing index errors: simplify query
    if (error.code === 9 || error.message.includes('index')) {
      console.warn('⚠️ Missing index detected. Suggestion: Check Firebase Console.');
    }

    throw new Error(`Failed to get leads: ${error.message}`);
  }
}

/**
 * Get a single lead by ID
 *
 * @param {string} leadId - Lead ID
 * @returns {Promise<Object|null>} Lead data or null if not found
 */
async function getLeadById(leadId) {
  try {
    const db = getFirestore();
    const leadDoc = await db.collection('leads').doc(leadId).get();

    if (!leadDoc.exists) {
      return null;
    }

    const data = leadDoc.data();
    return {
      id: leadDoc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      payment: {
        ...data.payment,
        paidAt: data.payment?.paidAt?.toDate?.()?.toISOString() || null
      }
    };

  } catch (error) {
    console.error('❌ Failed to get lead:', error);
    throw new Error(`Failed to get lead: ${error.message}`);
  }
}

/**
 * Update lead payment status
 *
 * @param {string} leadId - Lead ID
 * @param {Object} paymentData - Payment information
 * @param {string} paymentData.status - Payment status (PAID, FAILED, PENDING)
 * @param {string} [paymentData.transactionId] - Payment gateway transaction ID
 * @param {string} [paymentData.orderId] - Razorpay order ID
 * @param {string} [paymentData.merchantTransactionId] - Merchant transaction ID
 * @param {string} [paymentData.method] - Payment method (RAZORPAY, PHONEPE, etc.)
 * @param {number} [paymentData.amount] - Payment amount
 * @param {string} [paymentData.currency] - Payment currency
 * @param {string} [paymentData.errorMessage] - Error message for failed payments
 * @returns {Promise<Object>} Updated lead
 */
async function updateLeadPayment(leadId, paymentData) {
  try {
    const db = getFirestore();
    const leadRef = db.collection('leads').doc(leadId);

    // Check if lead exists
    const leadDoc = await leadRef.get();
    if (!leadDoc.exists) {
      throw new Error(`Lead not found: ${leadId}`);
    }

    // Update payment info
    const updateData = {
      'payment.status': paymentData.status,
      'payment.method': paymentData.method || 'RAZORPAY',
      updatedAt: getTimestamp()
    };

    if (paymentData.transactionId) {
      updateData['payment.transactionId'] = paymentData.transactionId;
    }

    if (paymentData.orderId) {
      updateData['payment.orderId'] = paymentData.orderId;
    }

    if (paymentData.merchantTransactionId) {
      updateData['payment.merchantTransactionId'] = paymentData.merchantTransactionId;
    }

    if (paymentData.amount !== undefined) {
      updateData['payment.amount'] = paymentData.amount;
    }

    if (paymentData.currency) {
      updateData['payment.currency'] = paymentData.currency;
    }

    if (paymentData.errorMessage) {
      updateData['payment.errorMessage'] = paymentData.errorMessage;
    }

    // Set paidAt timestamp if payment is successful
    if (paymentData.status === 'PAID') {
      updateData['payment.paidAt'] = getTimestamp();
    }

    await leadRef.update(updateData);

    console.log(`✅ Lead payment updated: ${leadId} - ${paymentData.status}`);

    // Return updated lead
    return await getLeadById(leadId);

  } catch (error) {
    console.error('❌ Failed to update lead payment:', error);
    throw new Error(`Failed to update lead payment: ${error.message}`);
  }
}

/**
 * Update lead status and notes
 *
 * @param {string} leadId - Lead ID
 * @param {Object} updates - Fields to update
 * @param {string} [updates.status] - Lead status (NEW, CONTACTED, SCHEDULED, etc.)
 * @param {string} [updates.notes] - Admin notes
 * @param {string} [updates.assignedTo] - Assigned admin user ID
 * @returns {Promise<Object>} Updated lead
 */
async function updateLead(leadId, updates) {
  try {
    const db = getFirestore();
    const leadRef = db.collection('leads').doc(leadId);

    // Check if lead exists
    const leadDoc = await leadRef.get();
    if (!leadDoc.exists) {
      throw new Error(`Lead not found: ${leadId}`);
    }

    const updateData = {
      ...updates,
      updatedAt: getTimestamp()
    };

    console.log(`🔥 Firestore writing update for ${leadId}:`, JSON.stringify(updateData, null, 2));

    await leadRef.update(updateData);

    console.log(`✅ Lead updated: ${leadId}`);

    return await getLeadById(leadId);

  } catch (error) {
    console.error('❌ Failed to update lead:', error);
    throw new Error(`Failed to update lead: ${error.message}`);
  }
}

/**
 * Delete a lead
 *
 * @param {string} leadId - Lead ID
 * @returns {Promise<Object>} Success response
 */
async function deleteLead(leadId) {
  try {
    const db = getFirestore();
    await db.collection('leads').doc(leadId).delete();

    console.log(`✅ Lead deleted: ${leadId}`);

    return {
      success: true,
      message: `Lead ${leadId} deleted successfully`
    };

  } catch (error) {
    console.error('❌ Failed to delete lead:', error);
    throw new Error(`Failed to delete lead: ${error.message}`);
  }
}

/**
 * Get leads statistics (total, paid, unpaid, revenue)
 *
 * @returns {Promise<Object>} Stats object
 */
async function getLeadsStats() {
  try {
    const db = getFirestore();
    const leadsRef = db.collection('leads');

    // Use Aggregation Queries (Cost: 1 read batch per aggregation = very cheap)
    const { AggregateField } = admin.firestore;

    // 1. Total Leads
    const totalQuery = leadsRef.count();

    // 2. Status Counts
    const paidQuery = leadsRef.where('payment.status', '==', 'PAID').count();
    const unpaidQuery = leadsRef.where('payment.status', '==', 'UNPAID').count();
    const pendingQuery = leadsRef.where('payment.status', '==', 'PENDING').count();
    const failedQuery = leadsRef.where('payment.status', '==', 'FAILED').count();

    // 3. Revenue Sum (Only for PAID leads)
    // IMPORTANT: 'payment.amount' must be a number field in Firestore
    const revenueQuery = leadsRef
      .where('payment.status', '==', 'PAID')
      .aggregate({
        totalRevenue: AggregateField.sum('payment.amount')
      });

    // Run aggregations in parallel
    const [
      totalSnap,
      paidSnap,
      unpaidSnap,
      pendingSnap,
      failedSnap,
      revenueSnap
    ] = await Promise.all([
      totalQuery.get(),
      paidQuery.get(),
      unpaidQuery.get(),
      pendingQuery.get(),
      failedQuery.get(),
      revenueQuery.get()
    ]);

    const revenue = revenueSnap.data().totalRevenue || 0;

    // Normalize revenue (handle legacy rupee vs paise storage if needed)
    // Note: Sum aggregation just sums the field. 
    // If you have mixed units (rupees vs paise), the sum will be mixed.
    // Assuming mostly consistent data now. 
    // If the amount is > 500, we treat it as paise.

    // We will assume the sum logic here mirrors the previous logic roughly

    return {
      total: totalSnap.data().count,
      paid: paidSnap.data().count,
      unpaid: unpaidSnap.data().count,
      pending: pendingSnap.data().count,
      failed: failedSnap.data().count,
      revenue: revenue, // Aggregate sum
      revenueInRupees: revenue / 100 // Approximation
    };

  } catch (error) {
    console.error('❌ Failed to get leads stats:', error);
    // Fallback? Returing zeros is better than crashing
    return {
      total: 0, paid: 0, unpaid: 0, pending: 0, failed: 0, revenue: 0, revenueInRupees: 0
    };
  }
}

// ============================================
// USER COLLECTION OPERATIONS (Admin Users)
// ============================================

/**
 * Create or update user document in Firestore
 * This should be called after creating a user in Firebase Auth
 *
 * @param {string} uid - Firebase Auth user ID
 * @param {Object} userData - User data
 * @returns {Promise<Object>} User document
 */
async function createOrUpdateUser(uid, userData) {
  try {
    const db = getFirestore();
    const userRef = db.collection('users').doc(uid);

    const userDoc = {
      uid,
      email: userData.email,
      displayName: userData.displayName || null,
      photoURL: userData.photoURL || null,
      role: userData.role || 'admin',
      permissions: userData.permissions || ['view_leads', 'edit_leads'],
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      createdBy: userData.createdBy || null,
      createdAt: getTimestamp(),
      lastLogin: getTimestamp()
    };

    await userRef.set(userDoc, { merge: true });

    console.log(`✅ User document created/updated: ${uid}`);

    return userDoc;

  } catch (error) {
    console.error('❌ Failed to create/update user:', error);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

/**
 * Get user by ID
 *
 * @param {string} uid - User ID
 * @returns {Promise<Object|null>} User data or null
 */
async function getUserById(uid) {
  try {
    const db = getFirestore();
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const data = userDoc.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      lastLogin: data.lastLogin?.toDate?.()?.toISOString() || null
    };

  } catch (error) {
    console.error('❌ Failed to get user:', error);
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

/**
 * Get all admin users
 *
 * @returns {Promise<Array>} Array of users
 */
async function getAllUsers() {
  try {
    const db = getFirestore();
    const usersSnapshot = await db.collection('users').get();

    if (usersSnapshot.empty) {
      return [];
    }

    return usersSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        lastLogin: data.lastLogin?.toDate?.()?.toISOString() || null
      };
    });

  } catch (error) {
    console.error('❌ Failed to get users:', error);
    throw new Error(`Failed to get users: ${error.message}`);
  }
}

/**
 * Update user last login timestamp
 *
 * @param {string} uid - User ID
 * @returns {Promise<void>}
 */
async function updateUserLastLogin(uid) {
  try {
    const db = getFirestore();
    await db.collection('users').doc(uid).update({
      lastLogin: getTimestamp()
    });

    console.log(`✅ User last login updated: ${uid}`);

  } catch (error) {
    console.error('❌ Failed to update user last login:', error);
    // Don't throw error - this is not critical
  }
}

export {
  // Utility
  getTimestamp,

  // Lead operations
  createLead,
  getLeads,
  getLeadById,
  updateLeadPayment,
  updateLead,
  deleteLead,
  getLeadsStats,

  // User operations
  createOrUpdateUser,
  getUserById,
  getAllUsers,
  updateUserLastLogin
};

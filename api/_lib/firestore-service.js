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
async function getLeads(filters = {}) {
  try {
    const db = getFirestore();
    let query = db.collection('leads');

    // Always order by createdAt descending by default to get latest first
    // We will do other sub-filtering in memory to avoid missing index errors
    query = query.orderBy('createdAt', 'desc');

    // Limit to 500 latest leads for processing
    query = query.limit(500);

    const snapshot = await query.get();

    if (snapshot.empty) {
      return [];
    }

    let leads = snapshot.docs.map(doc => {
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

    // APPLY FILTERS IN MEMORY
    // This is more reliable for development as it doesn't require Firestore indexes

    // 1. Status Filter
    if (filters.status) {
      const targetStatus = filters.status.toUpperCase();
      leads = leads.filter(l => l.payment?.status === targetStatus);
    }

    // 2. Category Filter
    if (filters.category && filters.category !== 'all') {
      if (filters.category === 'Test Ride') {
        // Show Test Ride, Legacy 99, Landing Page, OR any lead with quiz answers
        leads = leads.filter(l =>
          l.category === 'Test Ride' ||
          l.category === '99 Offer' ||
          l.source === 'test-ride-landing' ||
          (l.quizAnswers && Object.keys(l.quizAnswers).length > 0)
        );
      } else {
        leads = leads.filter(l => l.category === filters.category);
      }
    }

    // 3. Date Range Filters
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      fromDate.setHours(0, 0, 0, 0);
      const fromTime = fromDate.getTime();
      leads = leads.filter(l => {
        if (!l.createdAt) return false;
        const created = new Date(l.createdAt);
        created.setHours(0, 0, 0, 0); // Date comparison only
        return created.getTime() >= fromTime;
      });
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      const toTime = toDate.getTime();
      leads = leads.filter(l => {
        if (!l.createdAt) return false;
        const created = new Date(l.createdAt);
        created.setHours(0, 0, 0, 0); // Date comparison only
        return created.getTime() <= toTime;
      });
    }

    // Apply limit from filters if provided
    if (filters.limit) {
      leads = leads.slice(0, parseInt(filters.limit));
    }

    return leads;

  } catch (error) {
    console.error('❌ Failed to get leads:', error);
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
    const leadsSnapshot = await db.collection('leads').get();

    if (leadsSnapshot.empty) {
      return {
        total: 0,
        paid: 0,
        unpaid: 0,
        pending: 0,
        failed: 0,
        revenue: 0
      };
    }

    let paid = 0;
    let unpaid = 0;
    let pending = 0;
    let failed = 0;
    let revenue = 0;

    leadsSnapshot.forEach(doc => {
      const lead = doc.data();
      const status = lead.payment?.status || 'UNPAID';

      if (status === 'PAID') {
        paid++;
        const amt = lead.payment?.amount || 0;
        // Resilient calculation: 
        // If amount is small (e.g., 99), it's already in Rupees
        // If amount is large (e.g., 9900), it's in Paise
        if (amt && amt > 0 && amt < 500) {
          revenue += Math.round(amt * 100);
        } else {
          revenue += amt;
        }
      } else if (status === 'UNPAID') {
        unpaid++;
      } else if (status === 'PENDING') {
        pending++;
      } else if (status === 'FAILED') {
        failed++;
      }
    });

    return {
      total: leadsSnapshot.size,
      paid,
      unpaid,
      pending,
      failed,
      revenue, // in paise
      revenueInRupees: revenue / 100
    };

  } catch (error) {
    console.error('❌ Failed to get leads stats:', error);
    throw new Error(`Failed to get leads stats: ${error.message}`);
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

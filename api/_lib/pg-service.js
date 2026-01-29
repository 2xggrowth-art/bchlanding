/**
 * PostgreSQL Database Service Layer
 *
 * Drop-in replacement for firestore-service.js
 * Uses node-postgres (pg) to connect to Supabase PostgreSQL on OVHCloud/Coolify
 *
 * Collections (tables):
 * - leads: Customer test ride bookings
 * - admin_users: Admin users
 */

import pg from 'pg';
const { Pool } = pg;

let pool = null;

function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
  });

  pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL pool error:', err);
  });

  return pool;
}

// ============================================
// LEADS COLLECTION OPERATIONS
// ============================================

async function createLead(leadData) {
  try {
    const db = getPool();
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const payment = {
      status: 'UNPAID',
      transactionId: null,
      merchantTransactionId: null,
      amount: 9900,
      currency: 'INR',
      method: null,
      paidAt: null
    };

    const result = await db.query(
      `INSERT INTO leads (id, name, phone, email, quiz_answers, payment, source, category, utm_source, utm_medium, utm_campaign, status, notes, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
       RETURNING *`,
      [
        leadId,
        leadData.name,
        leadData.phone,
        leadData.email || null,
        JSON.stringify(leadData.quizAnswers || {}),
        JSON.stringify(payment),
        leadData.source || 'unknown',
        leadData.category || 'General',
        leadData.utmSource || null,
        leadData.utmMedium || null,
        leadData.utmCampaign || null,
        'NEW',
        ''
      ]
    );

    const lead = formatLead(result.rows[0]);

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

async function getLeads(filters = {}) {
  try {
    const db = getPool();
    const conditions = [];
    const params = [];
    let paramIndex = 1;

    // 1. Payment status filter
    if (filters.status && filters.status !== 'all') {
      conditions.push(`payment->>'status' = $${paramIndex}`);
      params.push(filters.status.toUpperCase());
      paramIndex++;
    }

    // 2. Lead status filter
    if (filters.leadStatus && filters.leadStatus !== 'all') {
      conditions.push(`status = $${paramIndex}`);
      params.push(filters.leadStatus);
      paramIndex++;
    }

    // 3. Category filter
    if (filters.category && filters.category !== 'all') {
      if (filters.category === 'Test Ride') {
        conditions.push(`category IN ($${paramIndex}, $${paramIndex + 1})`);
        params.push('Test Ride', '99 Offer');
        paramIndex += 2;
      } else {
        conditions.push(`category = $${paramIndex}`);
        params.push(filters.category);
        paramIndex++;
      }
    }

    // 4. Date range filters
    if (filters.fromDate) {
      const fromDate = new Date(filters.fromDate);
      fromDate.setHours(0, 0, 0, 0);
      conditions.push(`created_at >= $${paramIndex}`);
      params.push(fromDate.toISOString());
      paramIndex++;
    }

    if (filters.toDate) {
      const toDate = new Date(filters.toDate);
      toDate.setHours(23, 59, 59, 999);
      conditions.push(`created_at <= $${paramIndex}`);
      params.push(toDate.toISOString());
      paramIndex++;
    }

    // Build query — whitelist allowed orderBy columns to prevent SQL injection
    const ALLOWED_ORDER_COLUMNS = {
      'createdAt': 'created_at',
      'created_at': 'created_at',
      'updatedAt': 'updated_at',
      'updated_at': 'updated_at',
      'name': 'name',
      'status': 'status',
      'category': 'category'
    };
    const orderByField = ALLOWED_ORDER_COLUMNS[filters.orderBy] || 'created_at';
    const orderDir = filters.order === 'asc' ? 'ASC' : 'DESC';
    const limit = parseInt(filters.limit) || 20;

    let query = 'SELECT * FROM leads';
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    // Cursor-based pagination
    if (filters.cursor) {
      const cursorCondition = orderDir === 'DESC'
        ? `created_at < (SELECT created_at FROM leads WHERE id = $${paramIndex})`
        : `created_at > (SELECT created_at FROM leads WHERE id = $${paramIndex})`;
      conditions.length > 0
        ? query += ` AND ${cursorCondition}`
        : query += ` WHERE ${cursorCondition}`;
      params.push(filters.cursor);
      paramIndex++;
    }

    query += ` ORDER BY ${orderByField} ${orderDir}`;
    query += ` LIMIT $${paramIndex}`;
    params.push(limit);

    const result = await db.query(query, params);
    return result.rows.map(formatLead);
  } catch (error) {
    console.error('❌ Failed to get leads:', error);
    throw new Error(`Failed to get leads: ${error.message}`);
  }
}

async function getLeadById(leadId) {
  try {
    const db = getPool();
    const result = await db.query('SELECT * FROM leads WHERE id = $1', [leadId]);

    if (result.rows.length === 0) {
      return null;
    }

    return formatLead(result.rows[0]);
  } catch (error) {
    console.error('❌ Failed to get lead:', error);
    throw new Error(`Failed to get lead: ${error.message}`);
  }
}

async function updateLeadPayment(leadId, paymentData) {
  const db = getPool();
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // Lock row to prevent concurrent payment updates
    const existing = await client.query(
      'SELECT payment FROM leads WHERE id = $1 FOR UPDATE',
      [leadId]
    );
    if (existing.rows.length === 0) {
      throw new Error(`Lead not found: ${leadId}`);
    }

    const currentPayment = existing.rows[0].payment || {};
    const updatedPayment = { ...currentPayment };

    updatedPayment.status = paymentData.status;
    updatedPayment.method = paymentData.method || 'RAZORPAY';

    if (paymentData.transactionId) updatedPayment.transactionId = paymentData.transactionId;
    if (paymentData.orderId) updatedPayment.orderId = paymentData.orderId;
    if (paymentData.merchantTransactionId) updatedPayment.merchantTransactionId = paymentData.merchantTransactionId;
    if (paymentData.amount !== undefined) updatedPayment.amount = paymentData.amount;
    if (paymentData.currency) updatedPayment.currency = paymentData.currency;
    if (paymentData.errorMessage) updatedPayment.errorMessage = paymentData.errorMessage;
    if (paymentData.status === 'PAID') updatedPayment.paidAt = new Date().toISOString();

    await client.query(
      'UPDATE leads SET payment = $1, updated_at = NOW() WHERE id = $2',
      [JSON.stringify(updatedPayment), leadId]
    );

    await client.query('COMMIT');

    console.log(`✅ Lead payment updated: ${leadId} - ${paymentData.status}`);
    return await getLeadById(leadId);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to update lead payment:', error);
    throw new Error(`Failed to update lead payment: ${error.message}`);
  } finally {
    client.release();
  }
}

async function updateLead(leadId, updates) {
  try {
    const db = getPool();

    // Check if lead exists
    const existing = await db.query('SELECT * FROM leads WHERE id = $1', [leadId]);
    if (existing.rows.length === 0) {
      throw new Error(`Lead not found: ${leadId}`);
    }

    // Build dynamic update
    const setClauses = [];
    const params = [];
    let paramIndex = 1;

    if (updates.status !== undefined) {
      setClauses.push(`status = $${paramIndex++}`);
      params.push(updates.status);
    }
    if (updates.notes !== undefined) {
      setClauses.push(`notes = $${paramIndex++}`);
      params.push(updates.notes);
    }
    if (updates.assignedTo !== undefined) {
      setClauses.push(`assigned_to = $${paramIndex++}`);
      params.push(updates.assignedTo);
    }
    if (updates.name !== undefined) {
      setClauses.push(`name = $${paramIndex++}`);
      params.push(updates.name);
    }
    if (updates.phone !== undefined) {
      setClauses.push(`phone = $${paramIndex++}`);
      params.push(updates.phone);
    }
    if (updates.email !== undefined) {
      setClauses.push(`email = $${paramIndex++}`);
      params.push(updates.email);
    }
    if (updates.category !== undefined) {
      setClauses.push(`category = $${paramIndex++}`);
      params.push(updates.category);
    }
    if (updates.payment !== undefined) {
      setClauses.push(`payment = $${paramIndex++}`);
      params.push(JSON.stringify(updates.payment));
    }

    setClauses.push(`updated_at = NOW()`);

    params.push(leadId);
    const query = `UPDATE leads SET ${setClauses.join(', ')} WHERE id = $${paramIndex}`;

    console.log(`🔧 PostgreSQL writing update for ${leadId}: fields=[${Object.keys(updates).join(', ')}]`);
    await db.query(query, params);

    console.log(`✅ Lead updated: ${leadId}`);
    return await getLeadById(leadId);
  } catch (error) {
    console.error('❌ Failed to update lead:', error);
    throw new Error(`Failed to update lead: ${error.message}`);
  }
}

async function deleteLead(leadId) {
  try {
    const db = getPool();
    await db.query('DELETE FROM leads WHERE id = $1', [leadId]);

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

async function getLeadsStats() {
  try {
    const db = getPool();

    const result = await db.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE payment->>'status' = 'PAID')::int AS paid,
        COUNT(*) FILTER (WHERE payment->>'status' = 'UNPAID')::int AS unpaid,
        COUNT(*) FILTER (WHERE payment->>'status' = 'PENDING')::int AS pending,
        COUNT(*) FILTER (WHERE payment->>'status' = 'FAILED')::int AS failed,
        COALESCE(SUM((payment->>'amount')::numeric) FILTER (WHERE payment->>'status' = 'PAID'), 0)::bigint AS revenue
      FROM leads
    `);

    const stats = result.rows[0];
    return {
      total: stats.total,
      paid: stats.paid,
      unpaid: stats.unpaid,
      pending: stats.pending,
      failed: stats.failed,
      revenue: Number(stats.revenue),
      revenueInRupees: Number(stats.revenue) / 100
    };
  } catch (error) {
    console.error('❌ Failed to get leads stats:', error);
    return {
      total: 0, paid: 0, unpaid: 0, pending: 0, failed: 0, revenue: 0, revenueInRupees: 0
    };
  }
}

// ============================================
// USER COLLECTION OPERATIONS (Admin Users)
// ============================================

async function createOrUpdateUser(uid, userData) {
  try {
    const db = getPool();

    const result = await db.query(
      `INSERT INTO admin_users (uid, email, display_name, photo_url, role, permissions, is_active, created_by, created_at, last_login)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
       ON CONFLICT (uid) DO UPDATE SET
         email = EXCLUDED.email,
         display_name = COALESCE(EXCLUDED.display_name, admin_users.display_name),
         photo_url = COALESCE(EXCLUDED.photo_url, admin_users.photo_url),
         last_login = NOW()
       RETURNING *`,
      [
        uid,
        userData.email,
        userData.displayName || null,
        userData.photoURL || null,
        userData.role || 'admin',
        JSON.stringify(userData.permissions || ['view_leads', 'edit_leads']),
        userData.isActive !== undefined ? userData.isActive : true,
        userData.createdBy || null
      ]
    );

    console.log(`✅ User document created/updated: ${uid}`);
    return formatUser(result.rows[0]);
  } catch (error) {
    console.error('❌ Failed to create/update user:', error);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

async function getUserById(uid) {
  try {
    const db = getPool();
    const result = await db.query('SELECT * FROM admin_users WHERE uid = $1', [uid]);

    if (result.rows.length === 0) {
      return null;
    }

    return formatUser(result.rows[0]);
  } catch (error) {
    console.error('❌ Failed to get user:', error);
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

async function getAllUsers() {
  try {
    const db = getPool();
    const result = await db.query('SELECT * FROM admin_users');
    return result.rows.map(formatUser);
  } catch (error) {
    console.error('❌ Failed to get users:', error);
    throw new Error(`Failed to get users: ${error.message}`);
  }
}

async function updateUserLastLogin(uid) {
  try {
    const db = getPool();
    await db.query('UPDATE admin_users SET last_login = NOW() WHERE uid = $1', [uid]);
    console.log(`✅ User last login updated: ${uid}`);
  } catch (error) {
    console.error('❌ Failed to update user last login:', error);
  }
}

// ============================================
// HELPERS
// ============================================

function formatLead(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    quizAnswers: row.quiz_answers,
    payment: row.payment,
    source: row.source,
    category: row.category,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    status: row.status,
    assignedTo: row.assigned_to,
    notes: row.notes,
    createdAt: row.created_at ? row.created_at.toISOString() : null,
    updatedAt: row.updated_at ? row.updated_at.toISOString() : null
  };
}

function formatUser(row) {
  if (!row) return null;
  return {
    uid: row.uid,
    email: row.email,
    displayName: row.display_name,
    photoURL: row.photo_url,
    role: row.role,
    permissions: row.permissions,
    isActive: row.is_active,
    createdBy: row.created_by,
    createdAt: row.created_at ? row.created_at.toISOString() : null,
    lastLogin: row.last_login ? row.last_login.toISOString() : null
  };
}

function getTimestamp() {
  return new Date().toISOString();
}

export {
  getTimestamp,
  createLead,
  getLeads,
  getLeadById,
  updateLeadPayment,
  updateLead,
  deleteLead,
  getLeadsStats,
  createOrUpdateUser,
  getUserById,
  getAllUsers,
  updateUserLastLogin
};

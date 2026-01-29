/**
 * JWT Authentication Module
 *
 * Replaces Firebase Auth for admin login/verification.
 * Uses PostgreSQL admin_users table + bcrypt + jsonwebtoken.
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pg from 'pg';
const { Pool } = pg;

let pool = null;

function getPool() {
  if (pool) return pool;
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
  });
  return pool;
}

const JWT_SECRET = process.env.JWT_SECRET || 'bch-store-secret-change-in-production';
const JWT_EXPIRY = '7d';

/**
 * Login admin user with email and password
 */
async function loginAdmin(email, password) {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  const db = getPool();
  const result = await db.query(
    'SELECT * FROM admin_users WHERE email = $1 AND is_active = true',
    [email.toLowerCase().trim()]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = result.rows[0];

  if (!user.password_hash) {
    throw new Error('Account not set up. Please run the setup script.');
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error('Invalid email or password');
  }

  // Update last login
  await db.query('UPDATE admin_users SET last_login = NOW() WHERE uid = $1', [user.uid]);

  // Generate JWT
  const token = jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      role: user.role,
      admin: true
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );

  return {
    success: true,
    token,
    user: {
      uid: user.uid,
      email: user.email,
      displayName: user.display_name,
      role: user.role,
      admin: true
    }
  };
}

/**
 * Verify JWT token — returns decoded payload or throws
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Hash a password for storage
 */
async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

/**
 * Create admin user with password (setup script helper)
 */
async function createAdminUser(email, password, displayName) {
  const db = getPool();
  const uid = `admin_${Date.now()}`;
  const passwordHash = await hashPassword(password);

  const result = await db.query(
    `INSERT INTO admin_users (uid, email, display_name, role, permissions, is_active, password_hash, created_at, last_login)
     VALUES ($1, $2, $3, 'admin', '["view_leads","edit_leads"]'::jsonb, true, $4, NOW(), NOW())
     ON CONFLICT (email) DO UPDATE SET password_hash = $4, last_login = NOW()
     RETURNING *`,
    [uid, email.toLowerCase().trim(), displayName || null, passwordHash]
  );

  return result.rows[0];
}

export { loginAdmin, verifyToken, hashPassword, createAdminUser };

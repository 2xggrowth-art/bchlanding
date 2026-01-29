/**
 * Migration Script: Export Firestore leads → Import into PostgreSQL
 *
 * Usage:
 *   node scripts/migrate-firestore-to-pg.js
 *
 * Requires:
 *   - .env.local with both Firebase Admin and DATABASE_URL configured
 *   - SSH tunnel to PostgreSQL: ssh -L 5432:10.0.6.5:5432 -N root@51.195.46.40
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import admin from 'firebase-admin';
import pg from 'pg';
const { Pool } = pg;

// Initialize Firebase Admin (same key processing as firebase-admin.js)
let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';
privateKey = privateKey.trim();
if ((privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))) {
  privateKey = privateKey.slice(1, -1).trim();
}
privateKey = privateKey.replace(/\\n/g, '\n');

const projectId = (process.env.FIREBASE_ADMIN_PROJECT_ID || '').trim().replace(/"/g, '');
const clientEmail = (process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '').trim().replace(/"/g, '').replace(/\\n/g, '');

console.log('🔑 Firebase config:', { projectId, clientEmail, keyLength: privateKey.length });

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey
  })
});

const db = admin.firestore();

// Initialize PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace(/"/g, ''),
  ssl: false
});

async function migrateLeads() {
  console.log('📥 Fetching leads from Firestore...');

  const snapshot = await db.collection('leads').get();

  if (snapshot.empty) {
    console.log('No leads found in Firestore.');
    return 0;
  }

  console.log(`Found ${snapshot.size} leads. Migrating...`);
  let migrated = 0;
  let skipped = 0;
  let errors = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const id = doc.id;

    try {
      // Check if lead already exists in PostgreSQL
      const existing = await pool.query('SELECT id FROM leads WHERE id = $1', [id]);
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      const payment = data.payment || {};
      const paymentJson = {
        status: payment.status || 'UNPAID',
        transactionId: payment.transactionId || null,
        merchantTransactionId: payment.merchantTransactionId || null,
        orderId: payment.orderId || null,
        amount: payment.amount || 9900,
        currency: payment.currency || 'INR',
        method: payment.method || null,
        paidAt: payment.paidAt?.toDate?.()?.toISOString() || null,
        errorMessage: payment.errorMessage || null
      };

      const createdAt = data.createdAt?.toDate?.() || new Date();
      const updatedAt = data.updatedAt?.toDate?.() || new Date();

      await pool.query(
        `INSERT INTO leads (id, name, phone, email, quiz_answers, payment, source, category, utm_source, utm_medium, utm_campaign, status, assigned_to, notes, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          id,
          data.name || 'Unknown',
          data.phone || '',
          data.email || null,
          JSON.stringify(data.quizAnswers || {}),
          JSON.stringify(paymentJson),
          data.source || 'unknown',
          data.category || 'General',
          data.utmSource || null,
          data.utmMedium || null,
          data.utmCampaign || null,
          data.status || 'NEW',
          data.assignedTo || null,
          data.notes || '',
          createdAt.toISOString(),
          updatedAt.toISOString()
        ]
      );

      migrated++;
      if (migrated % 50 === 0) {
        console.log(`  ... migrated ${migrated} leads`);
      }
    } catch (err) {
      errors++;
      console.error(`  ❌ Error migrating lead ${id}:`, err.message);
    }
  }

  console.log(`\n✅ Migration complete:`);
  console.log(`  Migrated: ${migrated}`);
  console.log(`  Skipped (already exists): ${skipped}`);
  console.log(`  Errors: ${errors}`);
  return migrated;
}

async function migrateUsers() {
  console.log('\n📥 Fetching admin users from Firestore...');

  const snapshot = await db.collection('users').get();

  if (snapshot.empty) {
    console.log('No users found in Firestore.');
    return 0;
  }

  console.log(`Found ${snapshot.size} users. Migrating...`);
  let migrated = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const uid = doc.id;

    try {
      await pool.query(
        `INSERT INTO admin_users (uid, email, display_name, photo_url, role, permissions, is_active, created_by, created_at, last_login)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (uid) DO NOTHING`,
        [
          uid,
          data.email || '',
          data.displayName || null,
          data.photoURL || null,
          data.role || 'admin',
          JSON.stringify(data.permissions || ['view_leads', 'edit_leads']),
          data.isActive !== undefined ? data.isActive : true,
          data.createdBy || null,
          data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          data.lastLogin?.toDate?.()?.toISOString() || new Date().toISOString()
        ]
      );
      migrated++;
    } catch (err) {
      console.error(`  ❌ Error migrating user ${uid}:`, err.message);
    }
  }

  console.log(`✅ Migrated ${migrated} users.`);
  return migrated;
}

async function main() {
  console.log('🚀 Starting Firestore → PostgreSQL migration\n');

  try {
    await migrateLeads();
    await migrateUsers();
  } catch (err) {
    console.error('❌ Migration failed:', err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

main();

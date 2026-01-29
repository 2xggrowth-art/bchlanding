/**
 * Production Express Server for BCH Store
 *
 * Serves both the Vite-built frontend and all API endpoints.
 * Designed to run in Docker on Coolify/OVHCloud.
 * No Firebase, no Vercel dependencies.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createLead, updateLead, getLeads, getLeadsStats,
  getLeadById, updateLeadPayment, deleteLead
} from './api/_lib/pg-service.js';
import { handleCors, setCorsHeaders } from './api/_lib/auth-middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Health check
// ==========================================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==========================================
// API Routes — supports both /api/lead and /api/leads
// ==========================================

// CORS preflight for all /api routes
app.options('/api/*', (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  res.status(200).end();
});

// Create lead (public)
app.post(['/api/lead', '/api/leads'], async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    const result = await createLead(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating lead:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get leads (admin) — auth handled by middleware imported in handler
app.get(['/api/lead', '/api/leads'], async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    // Import auth middleware dynamically to avoid circular deps
    const { requireAdmin } = await import('./api/_lib/auth-middleware.js');
    const adminUser = await requireAdmin(req, res);
    if (!adminUser) return;

    const leads = await getLeads(req.query);
    const stats = await getLeadsStats();
    const nextCursor = leads.length > 0 ? leads[leads.length - 1].id : null;

    res.status(200).json({ success: true, leads, stats, total: leads.length, nextCursor });
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update lead by ID (public — used during quiz + payment flow)
app.post(['/api/lead/:id', '/api/leads/:id'], async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    const updatedLead = await updateLead(req.params.id, req.body);
    res.status(200).json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error('Error updating lead:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single lead by ID
app.get(['/api/lead/:id', '/api/leads/:id'], async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    const lead = await getLeadById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, lead });
  } catch (error) {
    console.error('Error getting lead:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete lead by ID (admin)
app.delete(['/api/lead/:id', '/api/leads/:id'], async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    const result = await deleteLead(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting lead:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Razorpay Payment Routes
// ==========================================

app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    const handler = (await import('./api/razorpay/create-order.js')).default;
    await handler(req, res);
  } catch (error) {
    console.error('Error in /api/razorpay/create-order:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/razorpay/verify-payment', async (req, res) => {
  try {
    const handler = (await import('./api/razorpay/verify-payment.js')).default;
    await handler(req, res);
  } catch (error) {
    console.error('Error in /api/razorpay/verify-payment:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Admin Auth Routes (JWT-based, replaces Firebase Auth)
// ==========================================

app.post('/api/admin/login', async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    const { loginAdmin } = await import('./api/_lib/jwt-auth.js');
    const result = await loginAdmin(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    console.error('Admin login error:', error.message);
    res.status(401).json({ success: false, error: error.message });
  }
});

app.get('/api/admin/verify', async (req, res) => {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  try {
    const { verifyToken } = await import('./api/_lib/jwt-auth.js');
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ success: false, error: 'No token provided' });

    const user = verifyToken(token);
    res.status(200).json({ success: true, admin: true, user });
  } catch (error) {
    console.error('Admin verify error:', error.message);
    res.status(401).json({ success: false, error: error.message });
  }
});

// ==========================================
// Serve frontend static files (production)
// ==========================================

const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA fallback — all non-API routes serve index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ success: false, error: 'API endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// ==========================================
// Start
// ==========================================

const PORT = process.env.PORT || 5175;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n  BCH Store server running at http://0.0.0.0:${PORT}\n`);
  console.log(`  Frontend: http://localhost:${PORT}`);
  console.log(`  API:      http://localhost:${PORT}/api/*`);
  console.log(`  Health:   http://localhost:${PORT}/health\n`);
});

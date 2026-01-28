import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route to verify API routing works
app.get('/api/test', (req, res) => {
  console.log('✅ API test route hit');
  res.json({ success: true, message: 'API is working!' });
});

// Import API handlers with cache busting
const loadHandler = async (handlerPath) => {
  // Add timestamp to prevent caching during development
  const cacheBuster = `?t=${Date.now()}`;
  const module = await import(handlerPath + cacheBuster);
  return module.default;
};

// API Routes with error handling
app.post('/api/razorpay/create-order', async (req, res) => {
  try {
    console.log('📨 POST /api/razorpay/create-order');
    const handler = await loadHandler('./api/razorpay/create-order.js');
    await handler(req, res);
  } catch (error) {
    console.error('❌ Error in /api/razorpay/create-order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/razorpay/verify-payment', async (req, res) => {
  try {
    console.log('📨 POST /api/razorpay/verify-payment');
    const handler = await loadHandler('./api/razorpay/verify-payment.js');
    await handler(req, res);
  } catch (error) {
    console.error('❌ Error in /api/razorpay/verify-payment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Import Shared Service
import { createLead, updateLead, getLeads, getLeadsStats } from './api/_lib/firestore-service.js';

// ==========================================
// Express Routes (mirroring Vercel structure)
// ==========================================

// Create Lead
app.post('/api/leads', async (req, res) => {
  try {
    console.log('📨 POST /api/leads (Express)');
    const result = await createLead(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error creating lead:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update Lead
app.post('/api/leads/:id', async (req, res) => {
  try {
    console.log(`📨 POST /api/leads/${req.params.id} (Express)`);
    const result = await updateLead(req.params.id, req.body);
    res.status(200).json({ success: true, lead: result });
  } catch (error) {
    console.error('❌ Error updating lead:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get Leads (Admin)
app.get('/api/leads', async (req, res) => {
  try {
    console.log('📨 GET /api/leads (Express)');
    // In dev, we might skip auth or mock it, assuming local dev is safe
    // If you want robust auth in dev, you need to duplicate the middleware logic here

    // For now, mirroring Vercel's response structure
    const leads = await getLeads(req.query);
    const stats = await getLeadsStats();

    res.status(200).json({ success: true, leads, stats, total: leads.length });
  } catch (error) {
    console.error('❌ Error fetching leads:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/admin/verify', async (req, res) => {
  try {
    console.log('📨 GET /api/admin/verify');
    const handler = await loadHandler('./api/admin/verify.js');
    await handler(req, res);
  } catch (error) {
    console.error('❌ Error in /api/admin/verify:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = 5175;

async function startServer() {
  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.listen(PORT, () => {
    console.log(`\n  ✅ Server running at http://localhost:${PORT}\n`);
    console.log(`  Frontend: http://localhost:${PORT}`);
    console.log(`  API: http://localhost:${PORT}/api/*\n`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

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

app.all('/api/leads/:id', async (req, res) => {
  try {
    console.log(`\n--- INCOMING REQUEST ---`);
    console.log(`Method: ${req.method}`);
    console.log(`Path: ${req.path}`);
    console.log(`ID Param: ${req.params.id}`);

    req.query.id = req.params.id;
    const handler = await loadHandler('./api/leads/[id].js');

    if (!handler) {
      console.error('❌ Could not load handler for [id].js');
      return res.status(500).json({ success: false, error: 'Handler not found' });
    }

    console.log(`🚀 Executing handler for ID: ${req.query.id}`);
    await handler(req, res);
  } catch (error) {
    console.error(`❌ Error in /api/leads/${req.params.id}:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.all('/api/leads', async (req, res) => {
  try {
    console.log(`📨 ${req.method} /api/leads - Path: ${req.path}`);
    console.log(`🔍 Query Parser Check:`, req.query);
    const handler = await loadHandler('./api/leads/index.js');
    await handler(req, res);
  } catch (error) {
    console.error('❌ Error in /api/leads:', error);
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

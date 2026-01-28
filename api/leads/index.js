import { createLead, getLeads, getLeadsStats } from '../_lib/firestore-service.js';
import { requireAdmin } from '../_lib/auth-middleware.js';

export default async function handler(req, res) {
  // CORS check (Simple version or use helper if desired, keeping it simple as requested)
  // Vercel usually handles some CORS via vercel.json, but explicit headers are good.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const result = await createLead(req.body);
      return res.status(201).json(result);
    }

    if (req.method === 'GET') {
      // 1. Verify Admin
      const adminUser = await requireAdmin(req, res);
      if (!adminUser) return; // Response sent by middleware

      // 2. Fetch Data
      const leads = await getLeads(req.query);
      const stats = await getLeadsStats();

      const nextCursor = leads.length > 0 ? leads[leads.length - 1].id : null;

      return res.status(200).json({
        success: true,
        leads,
        stats,
        total: leads.length,
        nextCursor
      });
    }

    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

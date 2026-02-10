import { updateLead, getLeadById, deleteLead } from '../_lib/firestore-service.js';
import { verifyIdToken } from '../_lib/firebase-admin.js';

// Allowed fields for lead updates
const ALLOWED_UPDATE_FIELDS = ['name', 'email', 'phone', 'status', 'notes'];

function getAllowedOrigins() {
  return [process.env.FRONTEND_URL || 'http://localhost:5173', 'https://bchstore.in'];
}

function isOriginAllowed(origin) {
  const allowedOrigins = getAllowedOrigins();
  return allowedOrigins.includes(origin);
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  console.log(`[LEAD ${req.method}] ID: ${req.query.id}`);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Lead ID required' });
  }

  try {
    // Handle updates via POST or PATCH
    if (req.method === 'POST' || req.method === 'PATCH') {
      // Validate and extract Authorization header
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      // Verify token and get user
      let user;
      try {
        user = await verifyIdToken(token);
      } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      // Fetch lead to check ownership or admin status
      const lead = await getLeadById(id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }

      // Check authorization (admin or lead owner)
      const isAdmin = user.admin === true;
      const isOwner = lead.userId === user.uid;
      if (!isAdmin && !isOwner) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      // Validate and sanitize input
      const updateData = {};
      ALLOWED_UPDATE_FIELDS.forEach(field => {
        if (field in req.body) {
          updateData[field] = req.body[field];
        }
      });

      const updatedLead = await updateLead(id, updateData);
      return res.status(200).json({ success: true, lead: updatedLead });
    }

    // Checking if we should support GET for single lead (Admin)
    if (req.method === 'GET') {
      // Validate and extract Authorization header
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      // Verify token and get user
      let user;
      try {
        user = await verifyIdToken(token);
      } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      // Fetch lead
      const lead = await getLeadById(id);
      if (!lead) {
        return res.status(404).json({ success: false, message: 'Lead not found' });
      }

      // Check authorization (admin or lead owner)
      const isAdmin = user.admin === true;
      const isOwner = lead.userId === user.uid;
      if (!isAdmin && !isOwner) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      return res.status(200).json({ success: true, lead });
    }

    // Handle DELETE
    if (req.method === 'DELETE') {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      let user;
      try {
        user = await verifyIdToken(token);
      } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      // Only admins can delete
      const isAdmin = user.admin === true;
      if (!isAdmin) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }

      await deleteLead(id);
      return res.status(200).json({ success: true, message: 'Lead deleted successfully' });
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

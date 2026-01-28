import { updateLead, getLeadById } from '../_lib/firestore-service.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  console.log(`[LEAD ${req.method}] ID: ${req.query.id}`);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Leand ID required' });
  }

  try {
    // User requested POST for updates
    if (req.method === 'POST') {
      const updatedLead = await updateLead(id, req.body);
      return res.status(200).json({ success: true, lead: updatedLead });
    }

    // Checking if we should support GET for single lead (Admin)
    if (req.method === 'GET') {
      const lead = await getLeadById(id);
      if (!lead) return res.status(404).json({ success: false, message: 'Not found' });
      return res.status(200).json({ success: true, lead });
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

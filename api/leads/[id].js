/**
 * Vercel Serverless Function: Lead Update by ID
 * PATCH /api/leads/[id]
 */

import { updateLead, getLeadById, deleteLead } from '../_lib/firestore-service.js';
import { handleCors } from '../_lib/auth-middleware.js';

export default async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return; // OPTIONS request handled
  }

  // Get leadId from the URL path
  // In Vercel, the path is usually available in req.query for dynamic routes
  const { id } = req.query;

  try {
    // ============================================
    // PATCH - Update an existing lead
    // ============================================
    const method = req.method.toUpperCase();

    // ============================================
    // PATCH/POST - Update an existing lead
    // ============================================
    if (method === 'PATCH' || method === 'POST') {
      const updates = req.body;
      console.log(`\n--- LEAD HANDLER PATCH ---`);
      console.log(`ID from query: ${id}`);
      console.log(`Updates:`, updates);

      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Lead ID is required'
        });
      }

      // Check if lead exists first
      const existingLead = await getLeadById(id);
      if (!existingLead) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `Lead with ID ${id} not found`
        });
      }

      // Update lead in Firestore
      const updatedLead = await updateLead(id, updates);

      console.log(`✅ Lead updated: ${id}`, updates);

      return res.status(200).json({
        success: true,
        message: 'Lead updated successfully',
        lead: updatedLead
      });
    }

    // ============================================
    // DELETE - Remove a lead
    // ============================================
    if (method === 'DELETE') {
      if (!id) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Lead ID is required'
        });
      }

      // Check if lead exists first
      const existingLead = await getLeadById(id);
      if (!existingLead) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: `Lead with ID ${id} not found`
        });
      }

      // Delete lead from Firestore
      const result = await deleteLead(id);

      console.log(`🗑️ Lead deleted: ${id}`);

      return res.status(200).json({
        success: true,
        message: 'Lead deleted successfully'
      });
    }

    // ============================================
    // Method not allowed
    // ============================================
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: `Method ${req.method} not allowed on this endpoint`
    });

  } catch (error) {
    console.error(`❌ Lead Update API Error (${id}):`, error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

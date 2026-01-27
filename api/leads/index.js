/**
 * Vercel Serverless Function: Lead Management
 *
 * GET /api/leads - Get all leads (ADMIN ONLY - Requires Firebase Auth)
 * POST /api/leads - Create new lead (PUBLIC - No auth required)
 *
 * This endpoint has been upgraded to use:
 * - Firebase Admin SDK for authentication
 * - Firestore for persistent storage
 * - Role-based access control
 */

import { createLead, getLeads, getLeadsStats } from '../_lib/firestore-service.js';
import { requireAdmin, handleCors } from '../_lib/auth-middleware.js';

export default async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return; // OPTIONS request handled
  }

  try {
    // ============================================
    // GET - Retrieve all leads (ADMIN ONLY)
    // ============================================
    if (req.method === 'GET') {
      // Verify admin authentication
      const admin = await requireAdmin(req, res);
      if (!admin) {
        return; // Authentication failed, response already sent
      }

      // Get filter parameters from query string
      const filters = {
        status: req.query.status, // PAID, UNPAID, PENDING, FAILED
        leadStatus: req.query.leadStatus, // NEW, CONTACTED, SCHEDULED, etc.
        category: req.query.category, // 99 Offer, Test Ride, EMI, Exchange, General
        fromDate: req.query.fromDate, // Date range start (ISO string)
        toDate: req.query.toDate, // Date range end (ISO string)
        limit: parseInt(req.query.limit) || 20,
        cursor: req.query.cursor, // Pagination cursor (lead ID)
        orderBy: req.query.orderBy || 'createdAt',
        order: req.query.order || 'desc'
      };

      // Get leads from Firestore
      const leads = await getLeads(filters);

      // Get statistics (Optimized with aggregations)
      // Optional: Only fetch stats if 'includeStats' is true or on first page
      // For now, it's cheap enough (6 reads) to fetch every time
      const stats = await getLeadsStats();

      return res.status(200).json({
        success: true,
        leads,
        stats,
        total: leads.length,
        nextCursor: leads.length > 0 ? leads[leads.length - 1].id : null
      });
    }

    // ============================================
    // POST - Create new lead (PUBLIC)
    // ============================================
    if (req.method === 'POST') {
      const { name, phone, email, quizAnswers, source, category, utmSource, utmMedium, utmCampaign } = req.body;

      // Validation
      if (!name || !phone) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Name and phone are required'
        });
      }

      // Validate phone number format (basic check)
      const phoneRegex = /^[+]?[0-9]{10,15}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Invalid phone number format'
        });
      }

      // Create lead in Firestore
      const result = await createLead({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        quizAnswers: quizAnswers || {},
        source: source || 'unknown',
        category: category || 'General',
        utmSource,
        utmMedium,
        utmCampaign
      });

      console.log('✅ New lead created:', {
        id: result.leadId,
        name: name,
        phone: phone
      });

      return res.status(201).json({
        success: true,
        leadId: result.leadId,
        message: 'Lead created successfully',
        lead: result.lead
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
    console.error('❌ Lead API Error:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred'
    });
  }
}

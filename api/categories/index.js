/**
 * Categories API - List all categories or create new category
 *
 * GET /api/categories - List all categories (public)
 * POST /api/categories - Create new category (admin only)
 */

import { listCategories, createCategory, seedDefaultCategories } from '../_lib/firestore-service.js';
import { verifyAdmin } from '../_lib/auth-middleware.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET - List all categories (public)
    if (req.method === 'GET') {
      const categories = await listCategories();

      // Seed default categories if none exist
      if (categories.length === 0) {
        await seedDefaultCategories();
        const seededCategories = await listCategories();
        return res.status(200).json({
          success: true,
          data: seededCategories,
          seeded: true
        });
      }

      return res.status(200).json({
        success: true,
        data: categories
      });
    }

    // POST - Create new category (admin only)
    if (req.method === 'POST') {
      const admin = await verifyAdmin(req);
      if (!admin) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized - Admin access required'
        });
      }

      const { name, icon, description, order } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          error: 'Category name is required'
        });
      }

      const slug = await createCategory({
        name,
        icon,
        description,
        order
      });

      return res.status(201).json({
        success: true,
        data: { slug },
        message: `Category "${name}" created successfully`
      });
    }

    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });

  } catch (error) {
    console.error('❌ Categories API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}

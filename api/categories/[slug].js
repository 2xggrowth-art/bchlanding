/**
 * Single Category API - Get, update, or delete a specific category
 *
 * GET /api/categories/:slug - Get category details (public)
 * PATCH /api/categories/:slug - Update category (admin only)
 * DELETE /api/categories/:slug - Delete category (admin only)
 */

import { updateCategory, deleteCategory, getCategoryBySlug } from '../_lib/firestore-service.js';
import { verifyAdmin } from '../_lib/auth-middleware.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const slug = req.query.slug;

  if (!slug) {
    return res.status(400).json({
      success: false,
      error: 'Category slug is required'
    });
  }

  try {
    // GET - Get category details (public, direct doc read — 1 read instead of all)
    if (req.method === 'GET') {
      const category = await getCategoryBySlug(slug);

      if (!category) {
        return res.status(404).json({
          success: false,
          error: `Category not found: ${slug}`
        });
      }

      return res.status(200).json({
        success: true,
        data: category
      });
    }

    // PATCH - Update category (admin only)
    if (req.method === 'PATCH') {
      const admin = await verifyAdmin(req);
      if (!admin) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized - Admin access required'
        });
      }

      const { name, icon, description, order } = req.body;

      await updateCategory(slug, {
        ...(name && { name }),
        ...(icon !== undefined && { icon }),
        ...(description !== undefined && { description }),
        ...(order !== undefined && { order })
      });

      return res.status(200).json({
        success: true,
        message: `Category "${slug}" updated successfully`
      });
    }

    // DELETE - Delete category (admin only)
    if (req.method === 'DELETE') {
      const admin = await verifyAdmin(req);
      if (!admin) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized - Admin access required'
        });
      }

      const result = await deleteCategory(slug);

      return res.status(200).json({
        success: true,
        message: result.message
      });
    }

    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });

  } catch (error) {
    console.error(`❌ Category [${slug}] API error:`, error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}

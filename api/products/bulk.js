/**
 * Bulk Products Operations API
 * POST /api/products/bulk - Import products in bulk (admin only)
 * GET  /api/products/bulk - Export all products (admin only)
 */

import { verifyAdmin } from '../_lib/auth-middleware.js';
import { FirestoreService } from '../_lib/firestore-service.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Verify admin authentication
    const adminUser = await verifyAdmin(req);
    if (!adminUser) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - Admin access required',
      });
    }

    const firestoreService = new FirestoreService();

    // POST - Bulk import products
    if (req.method === 'POST') {
      const { products } = req.body;

      if (!products || !Array.isArray(products)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid request. Expected an array of products.',
        });
      }

      if (products.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No products provided for import.',
        });
      }

      if (products.length > 100) {
        return res.status(400).json({
          success: false,
          error: 'Maximum 100 products can be imported at once.',
        });
      }

      const results = await firestoreService.bulkImportProducts(products);

      return res.status(200).json({
        success: true,
        results,
        message: `Imported ${results.success} products successfully. ${results.failed} failed.`,
      });
    }

    // GET - Export all products
    if (req.method === 'GET') {
      const result = await firestoreService.listProducts({ limit: 1000 });

      // Format products for CSV export
      const exportData = result.products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        mrp: product.mrp,
        image: product.image,
        badge: product.badge || '',
        shortDescription: product.shortDescription,
        specs: JSON.stringify(product.specs),
        sizeGuide: product.sizeGuide ? JSON.stringify(product.sizeGuide) : '',
        warranty: product.warranty ? JSON.stringify(product.warranty) : '',
        accessories: product.accessories.join(','),
        stockQuantity: product.stock?.quantity || 0,
        stockStatus: product.stock?.status || 'out_of_stock',
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }));

      return res.status(200).json({
        success: true,
        products: exportData,
        total: result.total,
        message: `Exported ${exportData.length} products.`,
      });
    }

    // Method not allowed
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
    });
  } catch (error) {
    console.error('❌ Error in bulk operations:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process bulk operation',
    });
  }
}

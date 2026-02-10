/**
 * Excel Import API - Import products from XLSX/XLS file
 *
 * POST /api/products/import-excel - Parse and import Excel file (admin only)
 *
 * Expected Excel format:
 * | name | category | price | stock | description | ... |
 */

import { bulkCreateProducts } from '../_lib/firestore-service.js';
import { verifyAdmin } from '../_lib/auth-middleware.js';
import XLSX from 'xlsx';
import formidable from 'formidable';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Parse Excel file to JSON
 * @param {Buffer} fileBuffer - Excel file buffer
 * @returns {Array} Array of product objects
 */
function parseExcelToProducts(fileBuffer) {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert to JSON with header row
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

  if (rows.length === 0) {
    throw new Error('Excel file is empty');
  }

  // Map Excel columns to product schema
  const products = rows.map((row, index) => {
    try {
      // Required fields validation
      if (!row.name || !row.category || !row.price) {
        throw new Error(`Row ${index + 2}: Missing required fields (name, category, price)`);
      }

      // Parse stock info
      const stockQuantity = parseInt(row.stock || row.stockQuantity || 0);
      const stockStatus = row.stockStatus || (stockQuantity > 0 ? 'in_stock' : 'out_of_stock');

      // Parse price
      const price = parseFloat(row.price);
      const mrp = parseFloat(row.mrp || row.MRP || price);
      const discount = row.discount ? parseFloat(row.discount) : Math.round(((mrp - price) / mrp) * 100);

      // Parse tags
      const tags = row.tags ?
        (typeof row.tags === 'string' ? row.tags.split(',').map(t => t.trim()) : row.tags) :
        [];

      // Parse images
      const images = row.images ?
        (typeof row.images === 'string' ? row.images.split(',').map(url => ({ url: url.trim(), alt: row.name })) : row.images) :
        [];

      // Parse specifications
      const specifications = {};
      if (row.frameSize) specifications.frameSize = row.frameSize;
      if (row.wheelSize) specifications.wheelSize = row.wheelSize;
      if (row.gears) specifications.gears = parseInt(row.gears);
      if (row.weight) specifications.weight = row.weight;
      if (row.maxLoad) specifications.maxLoad = row.maxLoad;
      if (row.brakeType) specifications.brakeType = row.brakeType;
      if (row.suspension) specifications.suspension = row.suspension;
      if (row.material) specifications.material = row.material;

      const product = {
        name: row.name.trim(),
        category: row.category.toLowerCase().trim(),
        description: row.description || '',
        price,
        mrp,
        discount,
        images,
        stock: {
          quantity: stockQuantity,
          status: stockStatus,
          lowStockThreshold: parseInt(row.lowStockThreshold || 5)
        },
        specifications,
        tags,
        brand: row.brand || 'Bharath Cycle Hub',
        ageRange: row.ageRange || '',
        isFeatured: row.isFeatured === 'true' || row.isFeatured === true || false,
        isNew: row.isNew === 'true' || row.isNew === true || false,
      };

      return product;
    } catch (error) {
      throw new Error(`Row ${index + 2}: ${error.message}`);
    }
  });

  return products;
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Verify admin
    const admin = await verifyAdmin(req);
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - Admin access required'
      });
    }

    // Parse multipart form data
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowEmptyFiles: false,
      filter: function ({ mimetype }) {
        // Accept Excel files
        return mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
               mimetype === 'application/vnd.ms-excel' ||
               mimetype === 'text/csv';
      }
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = files.file?.[0] || files.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded. Please upload an Excel file (.xlsx, .xls, .csv)'
      });
    }

    // Read file buffer
    const fs = await import('fs');
    const fileBuffer = fs.readFileSync(file.filepath);

    // Parse Excel to products
    const products = parseExcelToProducts(fileBuffer);

    if (products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid products found in Excel file'
      });
    }

    // Bulk import products
    const result = await bulkCreateProducts(products);

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      success: true,
      message: `Successfully imported ${result.created} products`,
      data: {
        created: result.created,
        failed: result.failed,
        errors: result.errors
      }
    });

  } catch (error) {
    console.error('❌ Excel import error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to import Excel file'
    });
  }
}

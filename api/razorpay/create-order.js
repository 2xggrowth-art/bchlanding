/**
 * Vercel Serverless Function: Create Razorpay Order
 *
 * POST /api/razorpay/create-order
 * Creates a new Razorpay order for payment
 *
 * Required environment variables:
 * - RAZORPAY_KEY_ID
 * - RAZORPAY_KEY_SECRET
 */

import Razorpay from 'razorpay';
import crypto from 'crypto';
import { handleCors } from '../_lib/auth-middleware.js';
import { getLeadById, updateLeadPayment } from '../_lib/firestore-service.js';

// Initialize Razorpay instance lazily
let razorpay = null;

function getRazorpay() {
  if (razorpay) return razorpay;

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys are missing from environment variables');
  }

  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  return razorpay;
}

export default async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'Only POST requests are allowed'
    });
  }

  try {
    const { leadId } = req.body;

    // Server-enforced price — never trust client-supplied amount
    const amount = 99; // ₹99 test ride fee
    const currency = 'INR';

    // Validation
    if (!leadId) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'leadId is required'
      });
    }

    // Verify lead exists
    const lead = await getLeadById(leadId);
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Lead not found'
      });
    }

    // Create Razorpay order with short receipt (max 40 chars)
    // Format: rcpt_timestamp_shortId (e.g., rcpt_1769339168_abc123)
    const shortId = leadId.substring(leadId.length - 8); // Last 8 chars of leadId
    const timestamp = Date.now().toString().substring(0, 10); // First 10 digits
    const receipt = `rcpt_${timestamp}_${shortId}`; // Max 28 chars

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: currency,
      receipt: receipt,
      notes: {
        leadId: leadId,
        customerName: lead.name,
        customerPhone: lead.phone,
        customerEmail: lead.email || ''
      }
    };

    const rzp = getRazorpay();
    const order = await rzp.orders.create(options);

    console.log('✅ Razorpay order created:', {
      orderId: order.id,
      leadId: leadId,
      amount: amount
    });

    // Update lead with order info (skip existence check — already verified above)
    await updateLeadPayment(leadId, {
      status: 'PENDING',
      orderId: order.id,
      amount: amount, // Store in rupees (matches frontend value)
      currency: currency,
      method: 'RAZORPAY'
    }, { skipExistenceCheck: true });

    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      },
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (error) {
    console.error('❌ Razorpay Order Creation Error:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Failed to create payment order. Please try again.'
    });
  }
}

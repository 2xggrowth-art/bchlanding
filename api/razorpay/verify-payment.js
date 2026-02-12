/**
 * Vercel Serverless Function: Verify Razorpay Payment
 *
 * POST /api/razorpay/verify-payment
 * Verifies Razorpay payment signature and updates lead status
 *
 * Required environment variables:
 * - RAZORPAY_KEY_SECRET
 */

import crypto from 'crypto';
import { handleCors } from '../_lib/auth-middleware.js';
import { updateLeadPayment, getLeadById } from '../_lib/firestore-service.js';

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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      leadId
    } = req.body;

    // Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Missing required payment verification parameters'
      });
    }

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

    // Generate signature for verification
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Verify signature
    if (generatedSignature !== razorpay_signature) {
      console.error('❌ Payment signature verification failed:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        leadId: leadId
      });

      // Update lead with failed payment (skip existence check — already verified above)
      await updateLeadPayment(leadId, {
        status: 'FAILED',
        orderId: razorpay_order_id,
        transactionId: razorpay_payment_id,
        method: 'RAZORPAY',
        errorMessage: 'Payment signature verification failed'
      }, { skipExistenceCheck: true });

      return res.status(400).json({
        success: false,
        error: 'Payment Verification Failed',
        message: 'Invalid payment signature'
      });
    }

    // Signature is valid - update lead with successful payment (skip existence check)
    const updatedLead = await updateLeadPayment(leadId, {
      status: 'PAID',
      orderId: razorpay_order_id,
      transactionId: razorpay_payment_id,
      method: 'RAZORPAY'
    }, { skipExistenceCheck: true });

    console.log('✅ Payment verified successfully:', {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      leadId: leadId
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      lead: updatedLead,
      paymentId: razorpay_payment_id
    });

  } catch (error) {
    console.error('❌ Payment Verification Error:', error);

    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: error.message || 'Failed to verify payment'
    });
  }
}

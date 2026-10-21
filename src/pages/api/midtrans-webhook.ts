import type { APIRoute } from 'astro';
import crypto from 'node:crypto';
import { updateOrderStatus } from '../../lib/supabase';
import type { TransactionStatus } from '../../types/payment';

export const prerender = false;

/**
 * Midtrans HTTP Notification Webhook Handler
 * Endpoint: POST /api/midtrans-webhook
 * 
 * Midtrans mengirimkan webhook saat ada perubahan status pembayaran (settlement, expire, cancel, deny).
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const notification = await request.json();

    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const signatureKey = notification.signature_key;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;
    const paymentType = notification.payment_type;
    const transactionId = notification.transaction_id;

    const serverKey = process.env.MIDTRANS_SERVER_KEY || import.meta.env.MIDTRANS_SERVER_KEY || '';

    // Validasi Signature Key jika server key dikonfigurasi
    if (serverKey && !serverKey.includes('your_server_key')) {
      const hash = crypto
        .createHash('sha512')
        .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
        .digest('hex');

      if (hash !== signatureKey) {
        console.warn('[Midtrans Webhook] Invalid Signature Key!');
        return new Response(JSON.stringify({ error: 'Invalid signature key' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Mapping Midtrans transaction status ke sistem internal
    let internalStatus: TransactionStatus = 'PENDING';

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'challenge') {
        internalStatus = 'CHALLENGE';
      } else if (fraudStatus === 'accept') {
        internalStatus = 'SUCCESS';
      }
    } else if (transactionStatus === 'settlement') {
      internalStatus = 'SUCCESS';
    } else if (transactionStatus === 'pending') {
      internalStatus = 'PENDING';
    } else if (
      transactionStatus === 'deny' ||
      transactionStatus === 'expire' ||
      transactionStatus === 'cancel'
    ) {
      internalStatus = 'FAILED';
    } else if (transactionStatus === 'refund') {
      internalStatus = 'REFUND';
    }

    // Update status di Supabase
    await updateOrderStatus(orderId, internalStatus, {
      payment_type: paymentType,
      transaction_id: transactionId,
      metadata: {
        raw_notification: notification,
        updated_via: 'midtrans_webhook'
      }
    });

    console.log(`[Midtrans Webhook] Order ${orderId} updated to ${internalStatus}`);

    return new Response(JSON.stringify({ status: 'OK', message: 'Notification received' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('[Midtrans Webhook Error]', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

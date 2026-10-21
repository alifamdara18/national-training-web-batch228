import midtransClient from 'midtrans-client';
import type { CheckoutPayload } from '../types/payment';

// Membaca konfigurasi dari environment variables
const serverKey = process.env.MIDTRANS_SERVER_KEY || import.meta.env.MIDTRANS_SERVER_KEY || '';
const clientKey = process.env.PUBLIC_MIDTRANS_CLIENT_KEY || import.meta.env.PUBLIC_MIDTRANS_CLIENT_KEY || '';
const isProduction = (process.env.PUBLIC_MIDTRANS_IS_PRODUCTION || import.meta.env.PUBLIC_MIDTRANS_IS_PRODUCTION) === 'true';

// Cek apakah kredensial valid (bukan placeholder default)
export const isMidtransConfigured = Boolean(
  serverKey && 
  clientKey && 
  !serverKey.includes('your_server_key') && 
  !clientKey.includes('your_client_key')
);

// Inisialisasi Midtrans Snap API Client jika kredensial tersedia
let snapClient: any = null;

if (isMidtransConfigured) {
  try {
    snapClient = new midtransClient.Snap({
      isProduction,
      serverKey,
      clientKey
    });
  } catch (err) {
    console.error('Failed to initialize Midtrans Snap client:', err);
  }
}

/**
 * URL Snap JS SDK berdasarkan environment
 */
export const MIDTRANS_SNAP_SCRIPT_URL = isProduction
  ? 'https://app.midtrans.com/snap/snap.js'
  : 'https://app.sandbox.midtrans.com/snap/snap.js';

export const MIDTRANS_CLIENT_KEY = clientKey || 'SB-Mid-client-mock';

/**
 * Membuat Transaksi Snap Token di Midtrans Gateway
 */
export async function createSnapToken({
  orderId,
  amount,
  payload,
  packageName
}: {
  orderId: string;
  amount: number;
  payload: CheckoutPayload;
  packageName: string;
}): Promise<{
  token: string;
  redirect_url: string;
  isMock: boolean;
}> {
  // Jika Midtrans dikonfigurasi secara sah, panggil API Midtrans
  if (snapClient && isMidtransConfigured) {
    try {
      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount
        },
        credit_card: {
          secure: true
        },
        customer_details: {
          first_name: payload.name,
          email: payload.email,
          phone: payload.whatsapp
        },
        item_details: [
          {
            id: `ITEM-${payload.packageType}`,
            price: amount,
            quantity: 1,
            name: packageName.substring(0, 50)
          }
        ]
      };

      const transaction = await snapClient.createTransaction(parameter);
      return {
        token: transaction.token,
        redirect_url: transaction.redirect_url,
        isMock: false
      };
    } catch (error: any) {
      console.error('[Midtrans Snap API Error]', error);
      // Fallback ke token simulasi jika Midtrans API gagal (misal koneksi sandbox timeout)
    }
  }

  // Fallback Mock Token untuk keperluan testing / sandbox simulasi developer
  const mockToken = `MOCK-SNAP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  return {
    token: mockToken,
    redirect_url: `/payment/success?order_id=${orderId}&package=${payload.packageType}&mock=true`,
    isMock: true
  };
}

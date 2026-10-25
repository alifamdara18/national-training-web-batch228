import type { APIRoute } from 'astro';
import { saveOrder, updateOrderStatus } from '../../lib/supabase';
import { createSnapToken, MIDTRANS_CLIENT_KEY } from '../../lib/midtrans';
import type { CheckoutPayload, CheckoutApiResponse } from '../../types/payment';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Content-Type harus application/json'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body: CheckoutPayload = await request.json();

    // 1. Validasi Input Data
    if (!body.name || !body.email || !body.whatsapp || !body.packageType) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Semua field (name, email, whatsapp, packageType) wajib diisi!'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Tentukan Total Tagihan Berdasarkan PackageType
    let amount = 49000;
    let packageName = 'Innerpiece Public Speaking - Paket Mahasiswa';

    if (body.packageType === 'vip') {
      if (body.duration === '1tahun') {
        amount = 2800000;
        packageName = 'Innerpiece Public Speaking - VIP Pendampingan (1 Tahun)';
      } else {
        amount = 1400000;
        packageName = 'Innerpiece Public Speaking - VIP Pendampingan (3 Bulan)';
      }
    } else {
      amount = 49000;
      packageName = 'Innerpiece Public Speaking - Paket Mahasiswa (Mandiri)';
    }

    // 3. Generate Order ID Unik
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `AMD237-${timestamp}-${randomSuffix}`;

    // 4. Buat Transaksi Snap Token dari Midtrans (atau mock token)
    const snapResult = await createSnapToken({
      orderId,
      amount,
      payload: body,
      packageName
    });

    // 5. Simpan Order Awal ke Supabase (orders) dengan status PENDING
    const orderData = {
      order_id: orderId,
      user_name: body.name.trim(),
      user_email: body.email.trim().toLowerCase(),
      user_phone: body.whatsapp.trim(),
      package_type: body.packageType,
      duration: body.duration || (body.packageType === 'vip' ? '3bulan' : undefined),
      amount,
      status: 'PENDING' as const,
      snap_token: snapResult.token,
      created_at: new Date().toISOString(),
      metadata: {
        packageName,
        isMock: snapResult.isMock,
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    };

    await saveOrder(orderData);

    const responsePayload: CheckoutApiResponse = {
      success: true,
      order_id: orderId,
      gross_amount: amount,
      package_type: body.packageType,
      duration: body.duration,
      snap_token: snapResult.token,
      redirect_url: snapResult.redirect_url,
      client_key: MIDTRANS_CLIENT_KEY,
      is_mock: snapResult.isMock,
      message: 'Order berhasil dibuat dengan status PENDING'
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('[API /api/checkout Error]', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Terjadi kesalahan pada server saat memproses checkout'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

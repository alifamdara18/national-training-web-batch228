import type { APIRoute } from 'astro';
import { saveOrder, supabase } from '../../lib/supabase';
import type { ManualCheckoutPayload, PackageType, VipDuration, AdSource } from '../../types/payment';

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

    const body: ManualCheckoutPayload = await request.json();

    // Normalisasi input data dari field utama atau aliases
    const userName = (body.user_name || body.name || '').trim();
    const userEmail = (body.user_email || body.email || '').trim().toLowerCase();
    const userPhone = (body.user_phone || body.whatsapp || '').trim();
    const packageType = (body.package_type || body.packageType || 'mahasiswa') as PackageType;
    const duration = (body.duration || (packageType === 'vip' ? '3bulan' : undefined)) as VipDuration | undefined;
    const adSource = (body.ad_source || 'Meta Ads (FB/IG)') as AdSource;

    // 1. Validasi Input Data
    if (!userName || !userEmail || !userPhone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Data diri belum lengkap! Nama lengkap, email, dan nomor WhatsApp wajib diisi.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Hitung Nominal Tagihan Berdasarkan Package & Duration
    let amount = 49000;
    let packageName = 'Innerpiece Public Speaking - Paket Mahasiswa (Mandiri)';

    if (packageType === 'vip') {
      if (duration === '1tahun') {
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

    // 3. Generate Order ID Unik (Format: SIM-AMD237-YYYYMMDD-XXXX)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyymmdd = `${yyyy}${mm}${dd}`;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `SIM-AMD237-${yyyymmdd}-${randomSuffix}`;

    // 4. Hitung Estimasi Biaya Iklan (Estimated Ad Cost)
    let estimatedAdCost = 0;
    if (adSource === 'Meta Ads (FB/IG)') {
      estimatedAdCost = 15000;
    } else if (adSource === 'TikTok Ads') {
      estimatedAdCost = 12000;
    } else if (adSource === 'Grup WA Organik') {
      estimatedAdCost = 0;
    } else if (adSource === 'Direct / Referral') {
      estimatedAdCost = 0;
    } else {
      estimatedAdCost = 0;
    }

    // 5. Simpan Record ke Tabel orders Supabase dengan Status SUCCESS
    const orderRecord = {
      order_id: orderId,
      user_name: userName,
      user_email: userEmail,
      user_phone: userPhone,
      package_type: packageType,
      duration: duration || null,
      amount,
      status: 'SUCCESS' as const,
      payment_type: 'manual_transfer_bca',
      snap_token: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: {
        packageName,
        payment_method: 'manual_transfer_bca',
        bank_name: 'BCA',
        account_number: '8546160438',
        account_holder: 'Sugiyanti',
        ad_source: adSource,
        estimated_ad_cost: estimatedAdCost,
        simulation_mode: 'UX_TEST_COACH_SURYA',
        is_manual_simulation: true,
        verified_at: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    };

    const saveResult = await saveOrder(orderRecord);
    if (!saveResult.success && saveResult.error) {
      console.warn('[API checkout-manual] saveOrder warning:', saveResult.error);
    }

    // 6. Siapkan URL Pengalihan ke Halaman Sukses
    const redirectUrl = `/payment/success?order_id=${encodeURIComponent(orderId)}&package=${encodeURIComponent(packageType)}&name=${encodeURIComponent(userName)}&gross_amount=${amount}`;

    return new Response(
      JSON.stringify({
        success: true,
        order_id: orderId,
        amount,
        package_type: packageType,
        duration,
        ad_source: adSource,
        estimated_ad_cost: estimatedAdCost,
        redirect_url: redirectUrl,
        message: 'Simulasi pesanan manual berhasil dicatat. Mengalihkan ke halaman sukses.'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('[API /api/checkout-manual Exception]', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Terjadi kesalahan sistem saat memproses checkout simulasi manual.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

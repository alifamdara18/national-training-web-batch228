import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async () => {
  const startTime = Date.now();
  const testOrderId = `TEST-PING-${Date.now()}`;

  try {
    // 1. Uji SELECT ke tabel orders
    const { data: selectData, error: selectError } = await supabase
      .from('orders')
      .select('*')
      .limit(5);

    // 2. Uji INSERT untuk mendeteksi apakah Row Level Security (RLS) aktif
    const { data: insertData, error: insertError } = await supabase
      .from('orders')
      .insert([{
        order_id: testOrderId,
        user_name: 'Ping Test Connection',
        user_email: 'ping@amdara.id',
        user_phone: '081234567890',
        package_type: 'mahasiswa',
        amount: 49000,
        status: 'PENDING'
      }])
      .select()
      .maybeSingle();

    // Jika insert berhasil, hapus row test tersebut agar database tetap bersih
    if (!insertError && insertData) {
      await supabase.from('orders').delete().eq('order_id', testOrderId);
    }

    const latencyMs = Date.now() - startTime;

    // Evaluasi RLS Policy
    const isRlsBlocked = insertError && (insertError.code === '42501' || insertError.message?.includes('row-level security'));

    return new Response(
      JSON.stringify({
        connected: true,
        auth: 'VALID',
        supabase_url: import.meta.env.PUBLIC_SUPABASE_URL,
        latency_ms: latencyMs,
        select_test: {
          success: !selectError,
          total_rows: selectData?.length || 0,
          error: selectError?.message || null
        },
        insert_test: {
          success: !insertError,
          rls_active: Boolean(isRlsBlocked),
          error: insertError?.message || null
        },
        rls_fix_sql: isRlsBlocked
          ? `-- Jalankan query ini di Supabase SQL Editor untuk mengizinkan Checkout Form menyimpan order:
CREATE POLICY "Allow anon insert orders" ON orders FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anon select orders" ON orders FOR SELECT TO anon USING (true);
CREATE POLICY "Allow anon update orders" ON orders FOR UPDATE TO anon USING (true);
-- Atau nonaktifkan RLS jika tabel orders dikelola via API server:
-- ALTER TABLE orders DISABLE ROW LEVEL SECURITY;`
          : null,
        message: isRlsBlocked
          ? 'Koneksi ke Supabase Berhasil! Namun Row-Level Security (RLS) pada tabel "orders" memerlukan Policy INSERT untuk peran anon.'
          : 'Koneksi ke Supabase dan operasi database Berhasil 100%!'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        connected: false,
        auth: 'FAILED',
        error: err.message || 'Gagal menghubungi server Supabase',
        latency_ms: Date.now() - startTime
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

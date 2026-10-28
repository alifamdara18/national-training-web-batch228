import { createClient } from '@supabase/supabase-js';
import type { OrderRecord, TransactionStatus } from '../types/payment';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || 'https://ehtiadlnzmapfndstszh.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Mgr4RPMjz3os_2bHXGJNpA_dicibaH8';

// Inisialisasi Supabase client resmi
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// In-memory fallback untuk cache lokal
const memoryOrders = new Map<string, OrderRecord>();

/**
 * Menyimpan data order baru ke database Supabase
 */
export async function saveOrder(order: OrderRecord): Promise<{ success: boolean; data?: OrderRecord; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        order_id: order.order_id,
        user_name: order.user_name,
        user_email: order.user_email,
        user_phone: order.user_phone,
        package_type: order.package_type,
        duration: order.duration || null,
        amount: order.amount,
        status: order.status,
        snap_token: order.snap_token || null,
        payment_type: order.payment_type || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        metadata: order.metadata || {}
      }])
      .select()
      .single();

    if (error) {
      console.warn('[Supabase saveOrder Warning]', error.message);
      memoryOrders.set(order.order_id, order);
      return { success: true, data: order, error: error.message };
    }

    return { success: true, data: data as OrderRecord };
  } catch (err: any) {
    console.error('[Supabase saveOrder Exception]', err);
    memoryOrders.set(order.order_id, order);
    return { success: true, data: order, error: err.message };
  }
}

/**
 * Mengambil data order berdasarkan order_id
 */
export async function getOrderByOrderId(orderId: string): Promise<OrderRecord | null> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase getOrderByOrderId Warning]', error.message);
      return memoryOrders.get(orderId) || null;
    }

    if (data) return data as OrderRecord;
    return memoryOrders.get(orderId) || null;
  } catch (err) {
    console.error('[Supabase getOrderByOrderId Exception]', err);
    return memoryOrders.get(orderId) || null;
  }
}

/**
 * Memperbarui status transaksi order di Supabase
 */
export async function updateOrderStatus(
  orderId: string, 
  status: TransactionStatus, 
  details?: { payment_type?: string; transaction_id?: string; metadata?: any }
): Promise<{ success: boolean; error?: string }> {
  try {
    const updatePayload: Record<string, any> = {
      status,
      updated_at: new Date().toISOString()
    };
    if (details?.payment_type) updatePayload.payment_type = details.payment_type;
    if (details?.transaction_id) updatePayload.transaction_id = details.transaction_id;
    if (details?.metadata) updatePayload.metadata = details.metadata;

    const { error } = await supabase
      .from('orders')
      .update(updatePayload)
      .eq('order_id', orderId);

    if (error) {
      console.warn('[Supabase updateOrderStatus Warning]', error.message);
    }

    const existing = memoryOrders.get(orderId);
    if (existing) {
      existing.status = status;
      if (details?.payment_type) existing.payment_type = details.payment_type;
      if (details?.transaction_id) existing.transaction_id = details.transaction_id;
      existing.updated_at = new Date().toISOString();
      memoryOrders.set(orderId, existing);
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Supabase updateOrderStatus Exception]', err);
    return { success: false, error: err.message };
  }
}

/**
 * Mengambil tiket zoom dari tabel `zoom_tickets` Supabase
 * dengan fallback default jika tabel belum ada atau kosong.
 */
export async function getZoomTicket(): Promise<import('../types/payment').ZoomTicket> {
  const defaultTicket: import('../types/payment').ZoomTicket = {
    meeting_id: '822 8190 2280',
    passcode: 'AMDARA237',
    zoom_url: 'https://zoom.us/j/82281902280?pwd=InnerpieceMentoring',
    topic: 'Innerpiece Public Speaking - Sesi Live Mentoring Bersama Master Surya Jaya Negara',
    schedule_time: 'Setiap Hari Minggu | 19:30 - 21:30 WIB',
    host_name: 'Master Surya Jaya Negara & Tim Amdara Training'
  };

  try {
    const { data, error } = await supabase
      .from('zoom_tickets')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('[Supabase getZoomTicket Warning]', error.message);
      return defaultTicket;
    }

    if (data) {
      return {
        id: data.id,
        meeting_id: data.meeting_id || defaultTicket.meeting_id,
        passcode: data.passcode || defaultTicket.passcode,
        zoom_url: data.zoom_url || defaultTicket.zoom_url,
        topic: data.topic || defaultTicket.topic,
        schedule_time: data.schedule_time || defaultTicket.schedule_time,
        host_name: data.host_name || defaultTicket.host_name
      };
    }

    return defaultTicket;
  } catch (err) {
    console.warn('[Supabase getZoomTicket Exception]', err);
    return defaultTicket;
  }
}

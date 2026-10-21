import type { APIRoute } from 'astro';
import { getOrderByOrderId, updateOrderStatus } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const orderId = url.searchParams.get('order_id');

  if (!orderId) {
    return new Response(JSON.stringify({ error: 'order_id parameter is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const order = await getOrderByOrderId(orderId);

  if (!order) {
    return new Response(JSON.stringify({ error: 'Order not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, order }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

// Opsional: Untuk simulasi perubahan status secara manual saat testing di development
export const POST: APIRoute = async ({ request }) => {
  try {
    const { order_id, status } = await request.json();

    if (!order_id || !status) {
      return new Response(JSON.stringify({ error: 'order_id and status are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await updateOrderStatus(order_id, status, {
      metadata: { updated_via: 'manual_status_api' }
    });

    return new Response(JSON.stringify({ success: true, message: `Status updated to ${status}` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

/**
 * Type Safety & Interfaces untuk Integrasi Payment Gateway Midtrans & Supabase
 * Amdara Training & Consultancy
 */

export type PackageType = 'mahasiswa' | 'vip';

export type VipDuration = '3bulan' | '1tahun';

export type TransactionStatus =
  | 'PENDING'
  | 'SETTLEMENT'
  | 'SUCCESS'
  | 'CAPTURE'
  | 'CHALLENGE'
  | 'DENY'
  | 'EXPIRE'
  | 'CANCEL'
  | 'REFUND'
  | 'PENDING_VERIFICATION';

export type AdSource = 
  | 'Grup WA Organik'
  | 'Meta Ads (FB/IG)'
  | 'TikTok Ads'
  | 'Direct / Referral';

/**
 * Payload data yang dikirimkan dari frontend CheckoutForm ke endpoint /api/checkout-manual
 */
export interface ManualCheckoutPayload {
  user_name: string;
  user_email: string;
  user_phone: string;
  package_type: PackageType;
  duration?: VipDuration;
  ad_source?: AdSource;
  // Fallbacks / aliases
  name?: string;
  email?: string;
  whatsapp?: string;
  packageType?: PackageType;
}

export interface ZoomTicket {
  id?: string;
  meeting_id: string;
  passcode: string;
  zoom_url: string;
  topic: string;
  schedule_time: string;
  host_name?: string;
}

/**
 * Payload data yang dikirimkan dari frontend CheckoutForm ke endpoint /api/checkout
 */
export interface CheckoutPayload {
  name: string;
  email: string;
  whatsapp: string;
  packageType: PackageType;
  duration?: VipDuration;
  ad_source?: AdSource;
}

/**
 * Struktur response yang dikembalikan oleh Midtrans Snap JS Popup saat transaksi selesai/pending/error
 */
export interface MidtransSnapResult {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status?: string;
  pdf_url?: string;
  finish_redirect_url?: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  bca_va_number?: string;
  permata_va_number?: string;
  bill_key?: string;
  biller_code?: string;
  qr_string?: string;
}

/**
 * Interface callback Midtrans Snap popup window
 */
export interface MidtransSnapHandlers {
  onSuccess: (result: MidtransSnapResult) => void;
  onPending: (result: MidtransSnapResult) => void;
  onError: (result: MidtransSnapResult) => void;
  onClose?: () => void;
}

/**
 * Global window augmentation agar window.snap dapat dipanggil di TypeScript
 */
declare global {
  interface Window {
    snap?: {
      pay: (token: string, handlers: MidtransSnapHandlers) => void;
      embed?: (token: string, options: { embedId: string }) => void;
    };
  }
}

/**
 * Response API dari endpoint /api/checkout ke Frontend
 */
export interface CheckoutApiResponse {
  success: boolean;
  order_id: string;
  gross_amount: number;
  package_type: PackageType;
  duration?: VipDuration;
  snap_token?: string;
  redirect_url?: string;
  client_key?: string;
  is_mock?: boolean;
  message?: string;
  error?: string;
}

/**
 * Representasi record pesanan di tabel `orders` Supabase
 */
export interface OrderRecord {
  id?: string;
  order_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  package_type: PackageType;
  duration?: string;
  amount: number;
  status: TransactionStatus;
  snap_token?: string | null;
  payment_type?: string | null;
  transaction_id?: string | null;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

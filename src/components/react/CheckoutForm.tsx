import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  XCircle,
  Copy,
  Check
} from 'lucide-react';
import type { 
  PackageType, 
  VipDuration, 
  CheckoutPayload, 
  CheckoutApiResponse, 
  MidtransSnapResult 
} from '../../types/payment';

interface CheckoutFormProps {
  initialPackage?: PackageType;
  initialDuration?: VipDuration;
}

export default function CheckoutForm({ 
  initialPackage = 'mahasiswa',
  initialDuration = '3bulan' 
}: CheckoutFormProps) {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [packageType, setPackageType] = useState<PackageType>(initialPackage);
  const [duration, setDuration] = useState<VipDuration>(initialDuration);
  
  // UI & Loading States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Pending Instruction Modal
  const [pendingResult, setPendingResult] = useState<MidtransSnapResult | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Simulation Modal State (jika Snap SDK mock atau sandbox simulation)
  const [mockSession, setMockSession] = useState<{
    orderId: string;
    grossAmount: number;
    token: string;
  } | null>(null);

  // Sync packageType jika URL parameter berubah
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get('plan');
      if (planParam === 'mahasiswa' || planParam === 'vip') {
        setPackageType(planParam);
      }
      const durParam = params.get('duration');
      if (durParam === '3bulan' || durParam === '1tahun') {
        setDuration(durParam);
      }
    }
  }, []);

  // Dynamically Load Midtrans Snap.js Script
  useEffect(() => {
    const isProduction = false; // default sandbox
    const snapScriptUrl = isProduction
      ? 'https://app.midtrans.com/snap/snap.js'
      : 'https://app.sandbox.midtrans.com/snap/snap.js';

    // Cek apakah script sudah ada di DOM
    const existingScript = document.querySelector(`script[src="${snapScriptUrl}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = snapScriptUrl;
      script.setAttribute('data-client-key', 'SB-Mid-client-placeholder');
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Hitung total harga saat ini
  const getCurrentAmount = () => {
    if (packageType === 'mahasiswa') return 49000;
    return duration === '1tahun' ? 2800000 : 1400000;
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(getCurrentAmount());

  // Handle Copy VA / Rekening
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const payload: CheckoutPayload = {
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      packageType,
      duration: packageType === 'vip' ? duration : undefined
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data: CheckoutApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || 'Gagal memproses transaksi checkout');
      }

      // Periksa apakah Snap JS tersedia dan token bukan mock token lokal
      const hasSnapJs = typeof window !== 'undefined' && Boolean(window.snap);
      const isRealSnapToken = data.snap_token && !data.is_mock;

      if (hasSnapJs && isRealSnapToken) {
        // Panggil Popup Midtrans Snap Resmi
        window.snap!.pay(data.snap_token!, {
          onSuccess: (result: MidtransSnapResult) => {
            console.log('[Midtrans Snap] Payment Success:', result);
            window.location.href = `/payment/success?order_id=${encodeURIComponent(result.order_id || data.order_id)}&package=${packageType}&name=${encodeURIComponent(name)}&gross_amount=${data.gross_amount}`;
          },
          onPending: (result: MidtransSnapResult) => {
            console.log('[Midtrans Snap] Payment Pending:', result);
            setLoading(false);
            setPendingResult(result);
          },
          onError: (result: MidtransSnapResult) => {
            console.error('[Midtrans Snap] Payment Error:', result);
            setLoading(false);
            setErrorMessage(`Transaksi Gagal: ${result.status_message || 'Pembayaran ditolak atau dibatalkan'}`);
          },
          onClose: () => {
            console.log('[Midtrans Snap] Customer closed the popup without finishing the payment');
            setLoading(false);
          }
        });
      } else {
        // FALLBACK SIMULATOR MODAL:
        // Memberikan developer & tester kontrol instan untuk menguji callback onSuccess, onPending, dan onError
        setLoading(false);
        setMockSession({
          orderId: data.order_id,
          grossAmount: data.gross_amount,
          token: data.snap_token || 'MOCK-TOKEN'
        });
      }
    } catch (err: any) {
      console.error('[CheckoutForm Error]', err);
      setLoading(false);
      setErrorMessage(err.message || 'Koneksi ke server pembayaran gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Alert Notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1 text-sm">
              <span className="font-semibold block text-red-200">Terjadi Kesalahan</span>
              {errorMessage}
            </div>
            <button 
              type="button" 
              onClick={() => setErrorMessage(null)} 
              className="text-red-400 hover:text-red-200"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* 1. Pilih Paket */}
        <div className="bg-navy-800/90 rounded-3xl p-6 sm:p-7 shadow-xl border border-navy-700/80 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              Pilih Paket Pelatihan
            </h3>
            <span className="text-xs text-slate-400">Batch 228</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Paket Mahasiswa */}
            <div 
              onClick={() => setPackageType('mahasiswa')}
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                packageType === 'mahasiswa'
                  ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'border-navy-700 hover:border-slate-600 bg-navy-900/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-950 text-gold-400 border border-gold-500/30">
                  Self-Paced
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  packageType === 'mahasiswa' ? 'border-gold-400 bg-gold-400 text-navy-950' : 'border-slate-600'
                }`}>
                  {packageType === 'mahasiswa' && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </div>
              <h4 className="font-bold text-white text-base">Paket Mahasiswa</h4>
              <p className="text-xs text-slate-300 mt-0.5">Akses Video Modul Mandiri Lengkap</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-400 line-through">Rp250.000</span>
                <span className="text-xl font-extrabold text-gold-400">Rp49.000</span>
              </div>
            </div>

            {/* Paket VIP */}
            <div 
              onClick={() => setPackageType('vip')}
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                packageType === 'vip'
                  ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                  : 'border-navy-700 hover:border-slate-600 bg-navy-900/60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-gold-500 to-yellow-400 text-navy-950 font-extrabold shadow-sm">
                  🔥 Best Value
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  packageType === 'vip' ? 'border-gold-400 bg-gold-400 text-navy-950' : 'border-slate-600'
                }`}>
                  {packageType === 'vip' && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </div>
              <h4 className="font-bold text-white text-base">VIP Pendampingan</h4>
              <p className="text-xs text-slate-300 mt-0.5">Live Zoom Interaktif + Mentoring</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-400 line-through">Rp2.500.000</span>
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                  {duration === '1tahun' ? 'Rp2.800.000' : 'Rp1.400.000'}
                </span>
              </div>
            </div>
          </div>

          {/* Opsi Durasi jika VIP */}
          {packageType === 'vip' && (
            <div className="mt-4 pt-4 border-t border-navy-700 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-300 font-medium">Pilihan Durasi Mentoring:</span>
              <div className="inline-flex bg-navy-950 rounded-xl p-1 border border-navy-700">
                <button
                  type="button"
                  onClick={() => setDuration('3bulan')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    duration === '3bulan' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3 Bulan (1,4 Jt)
                </button>
                <button
                  type="button"
                  onClick={() => setDuration('1tahun')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    duration === '1tahun' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  1 Tahun (2,8 Jt)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. Data Diri Peserta */}
        <div className="bg-navy-800/90 rounded-3xl p-6 sm:p-7 shadow-xl border border-navy-700/80 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold-400" />
            Data Diri Peserta
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name-input" className="block text-sm font-medium text-slate-300 mb-1.5">
                Nama Lengkap (Untuk Sertifikat Digital) <span className="text-gold-400">*</span>
              </label>
              <input
                id="name-input"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-600 bg-navy-950 text-white focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition placeholder:text-slate-500 text-sm"
                placeholder="Contoh: Budi Santoso, S.Kom."
              />
            </div>

            <div>
              <label htmlFor="email-input" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email Aktif (Akses Akun LMS) <span className="text-gold-400">*</span>
              </label>
              <input
                id="email-input"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-600 bg-navy-950 text-white focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition placeholder:text-slate-500 text-sm"
                placeholder="budi.santoso@gmail.com"
              />
            </div>

            <div>
              <label htmlFor="whatsapp-input" className="block text-sm font-medium text-slate-300 mb-1.5">
                Nomor WhatsApp Aktif (Grup & Link Zoom) <span className="text-gold-400">*</span>
              </label>
              <input
                id="whatsapp-input"
                required
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-600 bg-navy-950 text-white focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition placeholder:text-slate-500 text-sm"
                placeholder="Contoh: 081234567890"
              />
            </div>
          </div>
        </div>

        {/* 3. Saluran Pembayaran Didukung */}
        <div className="bg-navy-800/90 rounded-3xl p-6 shadow-xl border border-navy-700/80 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-200">Metode Pembayaran Resmi Midtrans</h3>
            <span className="text-[11px] text-gold-400 font-semibold bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
              Otomatis & Terverifikasi
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Didukung oleh Midtrans Payment Gateway. Anda dapat memilih QRIS (GoPay, OVO, ShopeePay), Virtual Account Bank (BCA, Mandiri, BNI, BRI), atau Kartu Kredit.
          </p>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-700/70 flex flex-col items-center justify-center text-center">
              <Wallet className="w-5 h-5 text-gold-400 mb-1" />
              <span className="text-xs font-semibold text-slate-300">QRIS Instant</span>
              <span className="text-[10px] text-slate-500">GoPay / Dana / OVO</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-700/70 flex flex-col items-center justify-center text-center">
              <Building2 className="w-5 h-5 text-gold-400 mb-1" />
              <span className="text-xs font-semibold text-slate-300">Virtual Account</span>
              <span className="text-[10px] text-slate-500">BCA / Mandiri / BNI</span>
            </div>
            <div className="p-3 rounded-xl bg-navy-950/80 border border-navy-700/70 flex flex-col items-center justify-center text-center">
              <CreditCard className="w-5 h-5 text-gold-400 mb-1" />
              <span className="text-xs font-semibold text-slate-300">Kartu & E-Wallet</span>
              <span className="text-[10px] text-slate-500">Visa / Mastercard</span>
            </div>
          </div>
        </div>

        {/* 4. Tombol Bayar Sekarang */}
        <button
          type="submit"
          id="btn-bayar-sekarang"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 sm:py-4.5 px-8 bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 rounded-2xl font-extrabold text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-3 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
              <span>Memproses Transaksi...</span>
            </div>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6 text-navy-950" />
              <span>Bayar Sekarang ({formattedPrice})</span>
              <ArrowRight className="w-5 h-5 ml-1 opacity-80" />
            </>
          )}
        </button>
      </form>

      {/* ========================================================================= */}
      {/* MODAL SIMULASI INTEGRASI (Untuk Pengujian Cepat / Sandbox Simulation)       */}
      {/* ========================================================================= */}
      {mockSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-navy-900 border border-gold-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative text-white">
            <button
              onClick={() => setMockSession(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Simulasi Payment Gateway Midtrans</h3>
                <p className="text-xs text-gold-400 font-medium">Sandbox & Local Development Ready</p>
              </div>
            </div>

            <div className="bg-navy-950 rounded-2xl p-4 border border-navy-800 space-y-2 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono font-bold text-gold-300">{mockSession.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nama Peserta:</span>
                <span className="font-semibold text-slate-200">{name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Paket Terpilih:</span>
                <span className="font-semibold text-slate-200 uppercase">{packageType}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-navy-800">
                <span className="text-slate-300 font-bold">Total Tagihan:</span>
                <span className="font-bold text-gold-400 text-sm">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(mockSession.grossAmount)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Pilih tindakan di bawah ini untuk menguji callback otomatis Midtrans Snap ke sistem:
            </p>

            <div className="space-y-3">
              {/* Tombol Simulasi Sukses */}
              <button
                type="button"
                id="btn-simulate-success"
                onClick={() => {
                  window.location.href = `/payment/success?order_id=${encodeURIComponent(mockSession.orderId)}&package=${packageType}&name=${encodeURIComponent(name)}&gross_amount=${mockSession.grossAmount}&status=SUCCESS`;
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Simulasikan Pembayaran Berhasil (onSuccess Callback)
              </button>

              {/* Tombol Simulasi Pending */}
              <button
                type="button"
                id="btn-simulate-pending"
                onClick={() => {
                  setPendingResult({
                    status_code: '201',
                    status_message: 'Transaksi Pending: Silakan selesaikan pembayaran QRIS / Virtual Account',
                    transaction_id: `TRX-${Date.now()}`,
                    order_id: mockSession.orderId,
                    gross_amount: String(mockSession.grossAmount),
                    payment_type: 'qris',
                    transaction_time: new Date().toISOString(),
                    transaction_status: 'pending',
                    va_numbers: [{ bank: 'bca', va_number: '128880812345678' }]
                  });
                  setMockSession(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-sm transition-all cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                Simulasikan Menunggu Pembayaran (onPending Callback)
              </button>

              {/* Tombol Simulasi Gagal */}
              <button
                type="button"
                id="btn-simulate-failed"
                onClick={() => {
                  setErrorMessage('Simulasi: Transaksi ditolak atau pembayaran kadaluarsa (onError).');
                  setMockSession(null);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-medium text-xs transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                Simulasikan Transaksi Ditolak / Gagal (onError)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL INSTRUKSI PEMBAYARAN PENDING (QRIS / Bank Transfer Instructions)     */}
      {/* ========================================================================= */}
      {pendingResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-navy-900 border border-gold-500/30 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-white">
            <button
              onClick={() => setPendingResult(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Menunggu Pembayaran</h3>
              <p className="text-xs text-slate-300 mt-1">
                Selesaikan pembayaran Anda sebelum waktu habis untuk mengaktifkan akses LMS.
              </p>
            </div>

            {/* Nomor VA atau QRIS info */}
            <div className="bg-navy-950 rounded-2xl p-5 border border-navy-800 space-y-4 mb-6">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Nomor Pesanan (Order ID)</span>
                <span className="font-mono text-sm font-bold text-gold-300">{pendingResult.order_id}</span>
              </div>

              {pendingResult.va_numbers && pendingResult.va_numbers.length > 0 ? (
                <div>
                  <span className="text-xs text-slate-400 block mb-1">
                    Nomor Virtual Account ({pendingResult.va_numbers[0].bank.toUpperCase()})
                  </span>
                  <div className="flex items-center justify-between bg-navy-900 p-3 rounded-xl border border-navy-700">
                    <span className="font-mono text-lg font-extrabold text-gold-400 tracking-wider">
                      {pendingResult.va_numbers[0].va_number}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(pendingResult.va_numbers![0].va_number)}
                      className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-all"
                      title="Salin Nomor VA"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <span className="text-xs text-slate-400 block mb-2">Scan QRIS melalui Aplikasi Bank / E-Wallet Anda</span>
                  <div className="w-40 h-40 bg-white p-2 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                    <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center text-gold-400 p-2">
                      <Wallet className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-bold text-white uppercase">QRIS Midtrans</span>
                      <span className="text-[8px] text-slate-400">Scan via GoPay/Shopee</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-navy-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Tagihan:</span>
                <span className="font-bold text-gold-400 text-sm">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(pendingResult.gross_amount))}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/payment/success?order_id=${encodeURIComponent(pendingResult.order_id)}&package=${packageType}&name=${encodeURIComponent(name)}&gross_amount=${pendingResult.gross_amount}`;
                }}
                className="w-full py-3 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Saya Sudah Bayar (Cek Verifikasi)
              </button>
              <button
                type="button"
                onClick={() => setPendingResult(null)}
                className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
              >
                Tutup Jendela Ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

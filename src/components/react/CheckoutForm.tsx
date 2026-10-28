import React, { useState, useEffect } from 'react';
import {
  Building2,
  CreditCard,
  Check,
  Copy,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Megaphone,
  Radio,
  Lock,
  Wallet,
  Smartphone
} from 'lucide-react';
import type {
  PackageType,
  VipDuration,
  AdSource,
  ManualCheckoutPayload
} from '../../types/payment';

interface CheckoutFormProps {
  initialPackage?: PackageType;
  initialDuration?: VipDuration;
}

export default function CheckoutForm({
  initialPackage = 'mahasiswa',
  initialDuration = '3bulan'
}: CheckoutFormProps) {
  // Form Data State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [packageType, setPackageType] = useState<PackageType>(initialPackage);
  const [duration, setDuration] = useState<VipDuration>(initialDuration);

  // Metode Pembayaran (Manual = Default & Aktif, Midtrans = Disabled / Maintenance)
  const [paymentMethod, setPaymentMethod] = useState<'manual' | 'midtrans'>('manual');

  // Sumber Traffic / Iklan (ad_source)
  const [adSource, setAdSource] = useState<AdSource>('Meta Ads (FB/IG)');

  // UI & Loading States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedBca, setCopiedBca] = useState(false);

  // Sync package & duration dari URL parameter jika ada
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

  // Hitung total harga sesuai paket
  const getCurrentAmount = () => {
    if (packageType === 'mahasiswa') return 49000;
    return duration === '1tahun' ? 2800000 : 1400000;
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(getCurrentAmount());

  // One-Click Copy untuk Rekening BCA
  const handleCopyBca = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('8546160438');
      setCopiedBca(true);
      setTimeout(() => setCopiedBca(false), 2500);
    }
  };

  // Submit Handler -> Langsung ke /api/checkout-manual (tanpa Midtrans SDK)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (paymentMethod === 'midtrans') {
      setErrorMessage('Metode Payment Gateway Midtrans sedang dalam status Maintenance. Silakan gunakan metode Simulasi Bayar Manual.');
      return;
    }

    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setErrorMessage('Mohon lengkapi seluruh formulir data diri (Nama, Email, dan WhatsApp).');
      return;
    }

    setLoading(true);

    const payload: ManualCheckoutPayload = {
      user_name: name.trim(),
      user_email: email.trim(),
      user_phone: whatsapp.trim(),
      package_type: packageType,
      duration: packageType === 'vip' ? duration : undefined,
      ad_source: adSource,
      // Duplikat alias untuk redundansi keamanan
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      packageType: packageType
    };

    try {
      const response = await fetch('/api/checkout-manual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Terjadi kesalahan saat memproses checkout.');
      }

      // Berhasil -> Redirect instan ke Halaman Sukses
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        window.location.href = `/payment/success?order_id=${encodeURIComponent(data.order_id)}&package=${packageType}&name=${encodeURIComponent(name)}`;
      }
    } catch (err: any) {
      console.error('[CheckoutForm Manual Error]', err);
      setLoading(false);
      setErrorMessage(err.message || 'Koneksi ke server gagal. Silakan coba kembali.');
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Error Alert Notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-500/15 border border-red-500/40 flex items-start gap-3 text-red-200 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
            <div className="flex-1 text-sm">
              <span className="font-bold block text-red-100">Pemberitahuan:</span>
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

        {/* ================================================================= */}
        {/* 1. PILIH PAKET PELATIHAN                                          */}
        <div className="bg-navy-800/90 rounded-3xl p-6 sm:p-7 shadow-xl border border-navy-700/80 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-400" />
              Pilihan Paket Pelatihan
            </h3>
            <span className="text-xs text-gold-400 font-semibold bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
              Pendampingan Master Surya Jaya Negara Resmi - Slot Terbatas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Paket Mahasiswa */}
            <div
              onClick={() => setPackageType('mahasiswa')}
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${packageType === 'mahasiswa'
                ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                : 'border-navy-700 hover:border-slate-600 bg-navy-900/60'
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-950 text-gold-400 border border-gold-500/30">
                  Self-Paced
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${packageType === 'mahasiswa' ? 'border-gold-400 bg-gold-400 text-navy-950' : 'border-slate-600'
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
              className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${packageType === 'vip'
                ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                : 'border-navy-700 hover:border-slate-600 bg-navy-900/60'
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-gold-500 to-yellow-400 text-navy-950 font-extrabold shadow-sm">
                  🔥 Best Value
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${packageType === 'vip' ? 'border-gold-400 bg-gold-400 text-navy-950' : 'border-slate-600'
                  }`}>
                  {packageType === 'vip' && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </div>
              <h4 className="font-bold text-white text-base">VIP Pendampingan</h4>
              <p className="text-xs text-slate-300 mt-0.5">Live Zoom Interaktif + Mentoring</p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-xs text-slate-400 line-through">
                  {duration === '1tahun' ? 'Rp5.000.000' : 'Rp2.500.000'}
                </span>
                <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                  {duration === '1tahun' ? 'Rp2.800.000' : 'Rp1.400.000'}
                </span>
              </div>
            </div>
          </div>

          {/* Opsi Durasi jika VIP */}
          {packageType === 'vip' && (
            <div className="mt-4 pt-4 border-t border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-300 font-medium">Pilihan Durasi Mentoring:</span>
              <div className="inline-flex bg-navy-950 rounded-xl p-1 border border-navy-700">
                <button
                  type="button"
                  onClick={() => setDuration('3bulan')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${duration === '3bulan' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  3 Bulan (1,4 Jt)
                </button>
                <button
                  type="button"
                  onClick={() => setDuration('1tahun')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${duration === '1tahun' ? 'bg-gold-500 text-navy-950 shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  1 Tahun (2,8 Jt)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* 2. DATA DIRI PESERTA                                              */}
        {/* ================================================================= */}
        <div className="bg-navy-800/90 rounded-3xl p-6 sm:p-7 shadow-xl border border-navy-700/80 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
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
                placeholder="Contoh: 081378777838"
              />
            </div>

            {/* Field Dropdown/Radio ad_source untuk Tracking Audiens */}
            <div className="pt-2">
              <label htmlFor="ad-source-select" className="block text-sm font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-gold-400" />
                Sumber Informasi Pelatihan (Opsional)
              </label>
              <select
                id="ad-source-select"
                value={adSource}
                onChange={(e) => setAdSource(e.target.value as AdSource)}
                className="w-full px-4 py-3 rounded-xl border border-navy-600 bg-navy-950 text-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition text-sm cursor-pointer"
              >
                <option value="Meta Ads (FB/IG)">Meta Ads (Facebook / Instagram)</option>
                <option value="TikTok Ads">TikTok Ads / TikTok FYP</option>
                <option value="Grup WA Organik">Grup WhatsApp Organik</option>
                <option value="Direct / Referral">Direct / Rekomendasi Teman & Alumni</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Membantu Master Surya Jaya Negara menganalisis efektivitas channel publikasi program.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. METODE PEMBAYARAN: SIMULASI MANUAL VS MIDTRANS                 */}
        {/* ================================================================= */}
        <div className="bg-navy-800/90 rounded-3xl p-6 sm:p-7 shadow-xl border border-navy-700/80 backdrop-blur-md space-y-4">
          <div className="flex flex-col gap-2.5">
            <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold-500/15 to-yellow-500/10 border border-gold-500/35 text-gold-300 text-xs sm:text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)] leading-tight">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Pendampingan Intensif selama 1 Tahun Bersama Master Surya Jaya Negara Resmi Dibuka</span>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gold-400" />
                Pilih Metode Pembayaran
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {/* Opsi 1: Simulasi Bayar Manual (Transfer Bank / WA Admin) - AKTIF & DEFAULT */}
            <div
              onClick={() => setPaymentMethod('manual')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${paymentMethod === 'manual'
                ? 'border-gold-500 bg-gold-500/10 shadow-[0_0_25px_rgba(212,175,55,0.25)]'
                : 'border-navy-700 bg-navy-900/60 hover:border-slate-600'
                }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm sm:text-base">
                        Simulasi Bayar Manual (Transfer Bank / WA Admin)
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Aktif / Rekomendasi
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Transfer ke rekening resmi BCA manajemen dan dapatkan aktivasi akses LMS instan untuk pengujian UX.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'manual' ? 'border-gold-400 bg-gold-400 text-navy-950' : 'border-slate-600'
                    }`}>
                    {paymentMethod === 'manual' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* Detail Rekening BCA & One-Click Copy */}
              {paymentMethod === 'manual' && (
                <div className="mt-4 pt-4 border-t border-gold-500/30 bg-navy-950/70 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">💳 No. Rek BCA Amdara:</span>
                        <span className="text-xs px-2 py-0.5 bg-navy-900 text-slate-200 font-mono rounded border border-navy-700">Bank BCA</span>
                      </div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-lg sm:text-xl font-mono font-extrabold text-white tracking-wider">
                          8546160438
                        </span>
                        <span className="text-xs text-slate-400">a.n <strong>Sugiyanti</strong></span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyBca}
                      className="inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-navy-950 text-xs font-bold border border-gold-500/40 transition-all active:scale-95 cursor-pointer shadow-sm"
                    >
                      {copiedBca ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Nomor Rekening Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Rekening BCA</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-navy-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span>Jumlah yang ditransfer: <strong className="text-gold-300">{formattedPrice}</strong></span>
                    <a
                      href="https://wa.me/6281378777838?text=Halo%20Admin%20Amdara%2C%20saya%20ingin%20konsultasi%20mengenai%20pembayaran%20transfer%20BCA."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      Konfirmasi / Konsultasi via WhatsApp (081378777838) →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Opsi 2: Payment Gateway Midtrans (DISABLED / MAINTENANCE) */}
            <div
              className="p-4 rounded-2xl border border-navy-700/60 bg-navy-900/40 opacity-60 cursor-not-allowed relative"
              title="Payment Gateway sedang dalam pemeliharaan berkala"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-300 text-sm sm:text-base">
                        Payment Gateway Midtrans (QRIS / VA / CC)
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Status Maintenance ⛔
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Jalur payment gateway otomatis sedang dalam sinkronisasi sistem. Silakan gunakan Simulasi Bayar Manual di atas.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 rounded-full border border-slate-700 bg-navy-950 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. TOMBOL SUBMIT "KONFIRMASI & AKSES LMS"                          */}
        {/* ================================================================= */}
        <button
          type="submit"
          id="btn-konfirmasi-manual"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 sm:py-4.5 px-8 bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 rounded-2xl font-extrabold text-lg shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-3 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
              <span>Memvalidasi & Mengaktifkan Akses...</span>
            </div>
          ) : (
            <>
              <CheckCircle2 className="w-6 h-6 text-navy-950" />
              <span>Konfirmasi & Akses LMS ({formattedPrice})</span>
              <ArrowRight className="w-5 h-5 ml-1 opacity-80" />
            </>
          )}
        </button>

        {/* Footer Guarantee Info */}
        <div className="text-center">
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            Data pendaftaran Anda aman & langsung terhubung ke dashboard LMS
          </p>
        </div>

      </form>
    </div>
  );
}

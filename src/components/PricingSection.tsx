import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Users, 
  Lock, 
  PhoneCall, 
  Gift 
} from 'lucide-react';
import { TRAINING_CONFIG, TRAINING_BONUSES } from '../data/trainingData';

interface PricingSectionProps {
  onOpenRegister: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenRegister }) => {
  const includes = [
    "3 Hari Kelas Intensif Live via Zoom (Total 8 Jam Belajar)",
    "Peluang Praktik Langsung & Evaluasi Personal 1-on-1 dari Mentor",
    "Sertifikat Kelulusan Resmi Nasional Amdara Training (ID Verifikasi)",
    "Master E-Workbook 60 Halaman + Template Slide Presentasi Pro",
    "Akses Rekaman Video HD Seluruh Sesi Seumur Hidup",
    "50+ Template Skrip Pidato, Ice Breaking, & Elevator Pitch",
    "Akses Seumur Hidup Komunitas Alumni VIP Se-Indonesia",
    "Sesi Konsultasi & Mentoring Q&A Tanpa Batas di Grup VIP"
  ];

  return (
    <section id="investasi" className="py-24 bg-gradient-to-b from-[#070E1A] via-[#0A182E] to-[#070E1A] relative border-t border-slate-800">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Biaya Investasi Terjangkau
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Investasi Leher ke Atas Terbaik untuk{' '}
            <span className="gold-gradient-text font-cinzel">Masa Depan Karier Anda</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Jangan biarkan rasa takut berbicara menghambat promosi jabatan atau kesempatan beasiswa Anda. Dapatkan pembekalan lengkap kelas nasional dengan biaya subsidi terjangkau.
          </p>
        </div>

        {/* The Main Pricing Card */}
        <div className="rounded-3xl bg-[#091629] border-2 border-amber-400/60 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Gold Ribbon */}
          <div className="absolute top-0 right-0">
            <div className="bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-widest px-6 py-1.5 rounded-bl-2xl shadow-lg">
              SPECIAL BATCH PROMO
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Details & Price */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-500/30">
                    {TRAINING_CONFIG.batchNumber}
                  </span>
                  <span className="text-xs text-amber-300 font-semibold">
                    • Slot Terbatas {TRAINING_CONFIG.seatsTotal} Peserta
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-cinzel">
                  {TRAINING_CONFIG.programTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Program intensif lengkap dari Amdara Training. Sudah termasuk 6 Modul Utama, 8 Fasilitas Bonus, dan Evaluasi Praktik 1-on-1.
                </p>
              </div>

              {/* Price display */}
              <div className="p-5 rounded-2xl bg-[#061120] border border-amber-500/30 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-0.5">Biaya Investasi Pendaftaran:</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-extrabold text-amber-400 font-cinzel tracking-tight">
                      {TRAINING_CONFIG.formattedPrice}
                    </span>
                    <span className="text-base text-slate-500 line-through decoration-red-400 decoration-2">
                      {TRAINING_CONFIG.formattedOriginalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                    ✓ All-in (Tidak ada biaya tambahan lagi)
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold px-2.5 py-1 rounded-full">
                    Hemat {TRAINING_CONFIG.discountPercent}%
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Sisa {TRAINING_CONFIG.seatsRemaining} Slot Tersedia
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Daftar Sekarang • {TRAINING_CONFIG.formattedPrice}</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" /> Pembayaran Aman & Instan (BCA, QRIS, Mandiri, BRI, E-Wallet)
                  </span>
                  <a
                    href={`https://wa.me/${TRAINING_CONFIG.contactWhatsapp}?text=Halo%20Admin%20Amdara%20Training,%20saya%20ingin%20mendaftar%20National%20Public%20Speaking%20seharga%20399k`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3 text-emerald-400" /> Bantuan via WhatsApp
                  </a>
                </div>
              </div>

            </div>

            {/* Right Col: Everything Included List */}
            <div className="lg:col-span-5 bg-[#070F1D] p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Fasilitas yang Anda Dapatkan:
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Nilai Rp 2.8 Juta
                </span>
              </div>

              <div className="space-y-2.5">
                {includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Guarantee badge */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 bg-[#0A1628] -mx-2 -mb-2 p-3 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-amber-400 shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-white block">Garansi Kepuasan Belajar</span>
                  <span className="text-slate-400">Jika merasa tidak mendapat manfaat, Anda boleh mengulang di batch berikutnya secara gratis.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Users, 
  Award, 
  ShieldCheck, 
  Play, 
  Video, 
  ArrowRight,
  TrendingUp,
  Star
} from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

interface HeroBannerProps {
  onOpenRegister: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenRegister }) => {
  // Countdown timer simulation for early bird batch
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#070E1A] via-[#0B1A30] to-[#070E1A]">
      {/* Background Decorative Glows - Navy, Blue & Gold */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 right-10 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#E5B84B 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* National Certification Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-gradient-to-r from-blue-950/80 to-[#0F2344] border border-blue-500/30 px-3.5 py-1.5 rounded-full shadow-inner shadow-blue-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
                {TRAINING_CONFIG.batchNumber}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Sertifikasi Nasional
              </span>
            </div>

            {/* Main Headline with Gold & Blue Harmony */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold leading-[1.15] text-white tracking-tight">
              Bicara Penuh Percaya Diri,{' '}
              <span className="gold-gradient-text block mt-1 sm:inline sm:mt-0 font-cinzel">
                Pukau Audiens & Kuasai Panggung
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Program pelatihan intensif <strong className="text-white">National Public Speaking</strong> by <span className="text-amber-300 font-semibold">{TRAINING_CONFIG.name}</span>. Hapus demam panggung, kuasai vokal karismatik, dan buat setiap presentasi Anda memikat dari awal hingga akhir.
            </p>

            {/* Special Price Banner Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0B1E38] via-[#0F284C] to-[#0A1A30] border border-amber-500/30 shadow-xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Investasi Khusus Batch Ini
                    </span>
                    <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      HEMAT {TRAINING_CONFIG.discountPercent}%
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-cinzel tracking-tight">
                      {TRAINING_CONFIG.formattedPrice}
                    </span>
                    <span className="text-sm sm:text-base text-slate-400 line-through decoration-red-400 decoration-2">
                      {TRAINING_CONFIG.formattedOriginalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    ✨ Termasuk Sertifikat, E-Workbook, Rekaman Sesi, & 1-on-1 Feedback
                  </p>
                </div>

                {/* Countdown Box */}
                <div className="bg-[#061120] border border-slate-700/80 px-4 py-2.5 rounded-xl text-center shrink-0 w-full sm:w-auto">
                  <div className="text-[10px] font-semibold text-amber-300/90 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Promo Berakhir Dalam:
                  </div>
                  <div className="flex items-center justify-center gap-2 font-mono font-bold text-white">
                    <div className="bg-slate-800/90 px-2 py-1 rounded text-sm min-w-[32px]">
                      {String(timeLeft.hours).padStart(2, '0')}
                      <span className="block text-[8px] font-sans text-slate-400 -mt-0.5">JAM</span>
                    </div>
                    <span className="text-amber-400">:</span>
                    <div className="bg-slate-800/90 px-2 py-1 rounded text-sm min-w-[32px]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                      <span className="block text-[8px] font-sans text-slate-400 -mt-0.5">MNT</span>
                    </div>
                    <span className="text-amber-400">:</span>
                    <div className="bg-slate-800/90 px-2 py-1 rounded text-sm min-w-[32px] text-amber-300">
                      {String(timeLeft.seconds).padStart(2, '0')}
                      <span className="block text-[8px] font-sans text-slate-400 -mt-0.5">DTK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenRegister}
                className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Amankan Kursi • {TRAINING_CONFIG.formattedPrice}</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#kurikulum"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <span>Lihat Silabus & Materi</span>
              </a>
            </div>

            {/* Quick Guarantees & Social Proof */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Full Praktik</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sertifikat Resmi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rekaman Seumur Hidup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alumni VIP Network</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Card with Training Atmosphere */}
          <div className="lg:col-span-5 relative">
            
            {/* Glow Aura behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-blue-600/30 to-blue-400/10 rounded-3xl blur-2xl transform rotate-1 scale-95" />

            {/* Main Interactive Card */}
            <div className="relative rounded-3xl bg-[#0B182B] border border-amber-500/30 p-6 shadow-2xl overflow-hidden">
              
              {/* Card Header Tag */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 ml-1">Live Interactive Class</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>4.9 / 5.0 (1,450+ Alumni)</span>
                </div>
              </div>

              {/* Visual Presentation Preview / Mock Zoom Room */}
              <div className="my-5 relative rounded-2xl overflow-hidden border border-blue-500/30 bg-[#070E1A] group">
                <img
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80"
                  alt="Suasana Pelatihan National Public Speaking Amdara Training"
                  className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-black/30" />
                
                {/* Floating Live Badge */}
                <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  LIVE ZOOM + EVALUASI 1-ON-1
                </div>

                {/* Overlaid Title on Image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-amber-300 font-semibold tracking-wide uppercase">
                    Metode Amdara Experiential Learning
                  </p>
                  <p className="text-sm font-bold text-white line-clamp-1">
                    Praktik Langsung, Bedah Vokal & Feedback Seketika
                  </p>
                </div>
              </div>

              {/* Schedule & Detail Highlights */}
              <div className="space-y-3 bg-[#081324] rounded-xl p-4 border border-slate-800">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" /> Tanggal Sesi:
                  </span>
                  <span className="font-semibold text-white">{TRAINING_CONFIG.startDate}</span>
                </div>

                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Durasi & Jadwal:
                  </span>
                  <span className="font-semibold text-white">19:30 - 22:00 WIB (3 Hari)</span>
                </div>

                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/60">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-blue-400" /> Platform:
                  </span>
                  <span className="font-semibold text-white">Zoom Meeting Interaktif</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Kuota Tersisa:
                  </span>
                  <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Tersisa {TRAINING_CONFIG.seatsRemaining} dari {TRAINING_CONFIG.seatsTotal} Kursi
                  </span>
                </div>
              </div>

              {/* Live Slot Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Keterisian Kursi</span>
                  <span className="font-bold text-amber-400">86% Terisi</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 via-amber-400 to-amber-500 h-full rounded-full w-[86%]" />
                </div>
              </div>

              {/* Quick Card Button */}
              <button
                onClick={onOpenRegister}
                className="w-full mt-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Daftar Sekarang • Rp 399.000</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

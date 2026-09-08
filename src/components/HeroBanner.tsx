import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight
} from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

interface HeroBannerProps {
  onOpenRegister: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenRegister }) => {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* National Certification Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-blue-950/80 to-[#0F2344] border border-blue-500/30 px-4 py-2 rounded-full shadow-inner shadow-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
            {TRAINING_CONFIG.batchNumber}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Sertifikasi Nasional
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold leading-[1.25] text-white tracking-tight">
          Saksikan bagaimana seseorang mampu berdiri di depan banyak orang dengan{' '}
          <span className="gold-gradient-text block mt-2 font-cinzel">
            tenang, percaya diri, dan energi yang mampu membuat audiens terpaku mendengarkan.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Bayangkan jika suatu hari nanti Anda berada di posisi yang sama. Berdiri di atas panggung dengan tatapan penuh keyakinan, suara berkarakter, dan setiap kata menyentuh hati audiens.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRegister}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Daftar Sekarang</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#kurikulum"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <span>Lihat Silabus & Materi</span>
          </a>
        </div>

        {/* Quick Guarantees & Social Proof */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-slate-300 justify-items-center">
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
    </section>
  );
};

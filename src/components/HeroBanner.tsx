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
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#E5B84B 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* National Certification Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-blue-950/80 to-[#0F2344] border border-blue-500/30 px-4 py-2 rounded-full shadow-inner shadow-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
            {TRAINING_CONFIG.batchNumber} - {TRAINING_CONFIG.startDate}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Sertifikasi Nasional
          </span>
        </div>

        {/* Main Headline (Curiosity Hook) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold leading-[1.25] text-white tracking-tight max-w-4xl mx-auto">
          Terungkap: Rahasia Bagaimana Introvert Sekalipun Bisa Tampil Memukau &{' '}
          <span className="gold-gradient-text block mt-2 font-cinzel">
            Membius Audiens Tanpa Rasa Gugup Sedikitpun.
          </span>
        </h1>

        {/* Video Teaser (Above the Fold) */}
        <div className="relative max-w-3xl mx-auto mt-10 rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-blue-900/20 group cursor-pointer bg-slate-900">
          <div className="aspect-video relative">
            {/* Placeholder Video - Replace with actual video source later */}
            <video 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              poster="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1200&auto=format&fit=crop"
              controls
              controlsList="nodownload"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Browser Anda tidak mendukung tag video.
            </video>
            
            {/* Play Button Overlay (Optional, if not using native controls natively) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-amber-500/90 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-slate-950 border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
            
            {/* Overlay label */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Cuplikan Kelas</span>
            </div>
          </div>
        </div>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
          Tonton video di atas untuk melihat cuplikan atmosfer kelas dan bagaimana metode kami mengubah rasa takut menjadi karisma dalam waktu singkat.
        </p>

        {/* CTA (Direct Registration) */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRegister}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-extrabold text-base sm:text-lg uppercase tracking-widest text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-[0_0_40px_-10px_rgba(251,191,36,0.6)] hover:shadow-[0_0_60px_-15px_rgba(251,191,36,0.8)] transition-all transform hover:-translate-y-1 cursor-pointer w-full sm:w-auto"
          >
            <Sparkles className="w-6 h-6 text-slate-950" />
            <span>Amankan Kursi Anda Sekarang</span>
            <ArrowRight className="w-6 h-6 text-slate-950 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Slot sangat terbatas. Sistem pendaftaran otomatis.
          </p>
        </div>

        {/* Quick Guarantees & Social Proof */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm text-slate-300 justify-items-center opacity-80">
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
            <span>Garansi 100% Uang Kembali</span>
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

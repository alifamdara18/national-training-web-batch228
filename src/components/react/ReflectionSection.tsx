import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

const ReflectionSection: React.FC = () => {
  return (
    <section className="w-full py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Subtle Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Compass className="w-3.5 h-3.5" />
          <span>Refleksi Diri</span>
        </div>

        {/* Reflection Copy */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
          Coba Berhenti <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Sejenak…</span>
        </h2>

        <div className="p-8 sm:p-10 rounded-3xl bg-navy-900/60 border border-gold-500/20 backdrop-blur-md shadow-2xl relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />

          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            Bayangkan suatu hari kakak berdiri di depan banyak orang. Tidak terburu-buru. Tidak sibuk memikirkan apakah kakak cukup bagus. Dan tidak lagi berusaha berpura-pura menjadi orang lain.
          </p>

          <div className="my-6 p-4 rounded-xl bg-navy-950/70 border-l-4 border-gold-400">
            <p className="text-white text-base sm:text-lg font-semibold italic">
              "Kakak hanya berdiri sebagai dirimu sendiri. Tenang. Hadir. Dan berbicara dari tempat yang paling jujur di dalam dirimu."
            </p>
          </div>

          <p className="text-gold-300 text-lg sm:text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-400 shrink-0" />
            <span>Bagaimana rasanya ketika ketakutan itu akhirnya sirna?</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default ReflectionSection;

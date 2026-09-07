import React from 'react';
import { AlertCircle, CheckCircle2, ArrowRight, Zap, Target, Sparkles } from 'lucide-react';
import { PAIN_POINTS } from '../data/trainingData';

export const PainPoints: React.FC = () => {
  return (
    <section id="tentang" className="py-20 bg-[#070E1A] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-amber-400" /> Akar Masalah Komunikasi
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Pernahkah Kesempatan Emas Anda Lewat Hanya Karena{' '}
            <span className="gold-gradient-text font-cinzel">Takut Berbicara?</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Riset membuktikan bahwa ketakutan berbicara di depan umum (glossophobia) dialami oleh 75% orang. Anda tidak sendirian, dan kabar baiknya: <strong className="text-white">Public speaking adalah skill yang 100% bisa dilatih</strong> dengan metode yang tepat di Amdara Training.
          </p>
        </div>

        {/* 4 Pain Points vs Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {PAIN_POINTS.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gradient-to-br from-[#0B1728] to-[#0A1320] border border-slate-800 hover:border-amber-500/40 transition-all p-6 shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 mt-1">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {item.problem}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Solution Pill */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 bg-blue-950/20 -mx-6 -mb-6 p-4 rounded-b-2xl border-l-2 border-l-amber-400">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Solusi di Amdara Training:
                    </div>
                    <p className="text-xs text-slate-200">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transformation Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#0B1E38] via-[#0E284D] to-[#0B1E38] border border-blue-500/30 p-8 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Bayangkan dalam 3 Hari ke Depan, Anda Bisa Berdiri di Depan Siapa Saja Tanpa Ragu
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Bukan lagi rasa cemas atau malu, melainkan kepuasan melihat mata audiens fokus mendengarkan kata demi kata Anda, mengangguk setuju, dan memberikan tepuk tangan meriah.
            </p>
            <div className="pt-2">
              <a
                href="#kurikulum"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 px-5 py-2.5 rounded-xl transition-all"
              >
                <span>Pelajari Kurikulum & Metode Latihannya</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

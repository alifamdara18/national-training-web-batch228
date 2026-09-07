import React from 'react';
import { Award, CheckCircle2, Mic, Users, Star, ShieldCheck } from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

export const TrainerProfile: React.FC = () => {
  return (
    <section className="py-20 bg-[#070E1A] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="rounded-3xl bg-gradient-to-br from-[#0C1A30] via-[#091526] to-[#081220] border border-amber-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden relative">
          
          {/* Background subtle elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Trainer Visual / Avatar */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="relative inline-block mx-auto">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl relative group">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
                    alt="Lead Trainer Amdara Training"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E1A] via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#0A1628]/95 backdrop-blur border border-amber-400/30 py-1.5 px-2.5 rounded-xl text-center">
                    <p className="text-[11px] font-bold text-amber-300">
                      Master Public Speaking Coach
                    </p>
                  </div>
                </div>

                {/* Experience floating chip */}
                <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-slate-950" />
                  <span>10+ Th Pengalaman</span>
                </div>
              </div>
            </div>

            {/* Trainer Bio & Credentials */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                <Mic className="w-3.5 h-3.5 text-amber-400" /> Mentor Utama Anda
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Dipandu Langsung oleh Praktisi & Master Trainer Berpengalaman
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Di <strong className="text-white">Amdara Training</strong>, Anda tidak diajar oleh pembicara teoritis semata, melainkan praktisi yang telah melatih lebih dari 15.000 peserta dari berbagai instansi pemerintah, BUMN, perbankan, dan universitas ternama di seluruh Indonesia.
              </p>

              {/* 4 Credentials List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-[#070F1C] p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Certified National Speaker (BNSP RI)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-[#070F1C] p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Coach Pembicara Konferensi & TEDx</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-[#070F1C] p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Corporate Communication Consultant</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-[#070F1C] p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Pendekatan Personal & Ramah Pemula</span>
                </div>
              </div>

              {/* Quote */}
              <div className="p-4 rounded-xl bg-blue-950/20 border-l-2 border-l-amber-400 text-xs text-slate-300 italic">
                "Kemampuan berbicara di depan umum bukanlah bakat lahir. Itu adalah seni penguasaan teknik dan jam terbang. Ketika tekniknya benar, rasa percaya diri akan hadir secara alami."
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

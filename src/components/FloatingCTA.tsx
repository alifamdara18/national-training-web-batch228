import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, PhoneCall } from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

interface FloatingCTAProps {
  onOpenRegister: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenRegister }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slideUp">
      <div className="rounded-2xl bg-[#091629]/95 backdrop-blur-md border border-amber-500/40 p-3.5 shadow-2xl shadow-black/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white leading-none">
                National Public Speaking
              </span>
              <span className="text-[10px] text-red-400 font-bold">
                Sisa {TRAINING_CONFIG.seatsRemaining} Slot!
              </span>
            </div>
            <div className="text-amber-400 font-extrabold text-sm font-cinzel leading-tight mt-0.5">
              {TRAINING_CONFIG.formattedPrice}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${TRAINING_CONFIG.contactWhatsapp}?text=Halo%20Admin%20Amdara%20Training,%20saya%20mau%20daftar%20National%20Public%20Speaking%20399k`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 shrink-0"
            title="Tanya WhatsApp"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
          </a>

          <button
            onClick={onOpenRegister}
            className="px-3.5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Daftar 399k</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

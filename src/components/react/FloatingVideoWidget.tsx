import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const waNumber = "6281378777838";
  const defaultMsg = encodeURIComponent("Halo Manajemen Amdara Training, saya ingin konsultasi mengenai kelas Public Speaking Batch 237.");
  const waUrl = `https://wa.me/${waNumber}?text=${defaultMsg}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Konsultasi via WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all hover:scale-105 active:scale-95 border border-emerald-300/30 group"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
      </div>
      <span className="hidden sm:inline text-sm font-bold tracking-wide">Konsultasi WA Amdara</span>
    </a>
  );
}


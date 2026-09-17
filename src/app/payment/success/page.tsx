import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, BookOpen, Clock, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Countdown timer for auto-redirect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/lms');
    }
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen bg-[#070E1A] flex flex-col items-center justify-center p-6 relative font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg bg-[#0A1628] border border-slate-800/60 rounded-3xl p-8 md:p-12 text-center relative z-10 shadow-2xl">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
          <CheckCircle size={48} className="text-emerald-400 relative z-10" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Pembayaran Berhasil!</h1>
        <p className="text-slate-400 mb-8">
          Selamat! Kamu telah resmi terdaftar di <strong className="text-white">National Training Web Development Batch 228</strong>.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
            <BookOpen size={24} className="text-amber-400 mb-2" />
            <span className="text-xs text-slate-400 text-center">Akses<br/>Seumur Hidup</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
            <Users size={24} className="text-emerald-400 mb-2" />
            <span className="text-xs text-slate-400 text-center">Grup<br/>Diskusi VIP</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
            <Clock size={24} className="text-blue-400 mb-2" />
            <span className="text-xs text-slate-400 text-center">12 Modul<br/>Intensif</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/lms')}
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold py-4 px-8 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 group"
        >
          <span>Masuk ke Area LMS Saya</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-sm text-slate-500 mt-6">
          Mengarahkan otomatis dalam <span className="font-bold text-slate-300">{countdown}</span> detik...
        </p>
      </div>
    </div>
  );
}

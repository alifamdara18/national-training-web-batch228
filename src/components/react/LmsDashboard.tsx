import React, { useState, useEffect } from 'react';
import { Video, ShieldCheck, Users, PlayCircle, BookOpen, Clock, Lock, ArrowRight } from 'lucide-react';

export default function LmsDashboard() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Mock target date for next Sunday 19:00 WIB
    const target = new Date();
    target.setDate(target.getDate() + (7 - target.getDay())); // Next Sunday
    target.setHours(19, 0, 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 font-sans text-slate-50">
      {/* Header */}
      <header className="bg-navy-900 border-b border-gold-500/20 sticky top-0 z-10 shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-navy-950 font-bold text-lg shadow-inner border border-gold-400">
              IP
            </div>
            <span className="font-bold text-white text-lg hidden sm:block tracking-wide">Innerpiece</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-semibold shadow-[0_0_10px_rgba(212,175,55,0.15)]">
              <ShieldCheck className="w-4 h-4" />
              Terverifikasi - Batch 228
            </span>
            <div className="w-10 h-10 rounded-full bg-navy-800 overflow-hidden border-2 border-gold-500 shadow-md">
              <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-white">Selamat Datang, Budi! 🎉</h1>
          <p className="text-slate-300 mt-2 text-lg">Perjalanan public speaking Anda dimulai di sini. Persiapkan diri Anda untuk sesi live.</p>
        </div>

        {/* Zoom Ticket Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-1 shadow-[0_0_30px_rgba(212,175,55,0.2)] border border-gold-500/40">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-3xl rounded-full"></div>
          
          <div className="bg-navy-900/60 backdrop-blur-xl rounded-[22px] p-6 sm:p-10 text-white relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
              <div className="space-y-4 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-300 text-sm font-medium">
                  <Video className="w-4 h-4" />
                  Tiket Resmi Live Session
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Sesi Live Sinkronisasi: Master The Stage</h2>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gold-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gold-400" />
                    <span>Minggu, 19.00 WIB</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold-400" />
                    <span>Batch 228</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-navy-950/80 rounded-2xl p-6 border border-gold-500/30 text-center min-w-[280px] shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <p className="text-sm text-gold-300 mb-3 font-medium">Dimulai Dalam</p>
                <div className="flex justify-center gap-3 mb-6">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-navy-800 rounded-lg flex items-center justify-center font-bold text-xl border border-gold-500/20 shadow-inner text-white">
                        {value.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-400/80 mt-1">{unit}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 rounded-xl font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Video className="w-5 h-5" />
                  Gabung Sesi Zoom
                </button>
                <div className="mt-3 text-xs text-gold-200/70 flex justify-between px-2 font-mono">
                  <span>ID: 893 2134 4452</span>
                  <span>Pass: INNER228</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Self-Paced Learning */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-gold-400" />
              Materi Pendukung
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((modul) => (
              <div key={modul} className="group bg-navy-800 rounded-2xl overflow-hidden border border-navy-700 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-gold-500/30 transition-all hover:-translate-y-1 cursor-pointer">
                <div className="aspect-video bg-navy-900 relative overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`} alt={`Thumbnail ${modul}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 mix-blend-luminosity group-hover:mix-blend-normal" />
                  <div className="absolute inset-0 bg-navy-950/40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gold-500/20 backdrop-blur-md rounded-full flex items-center justify-center border border-gold-400/50 group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-8 h-8 text-gold-300" />
                    </div>
                  </div>
                  {modul === 3 && (
                    <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center flex-col gap-2">
                      <Lock className="w-8 h-8 text-slate-400" />
                      <span className="text-sm font-medium text-slate-400">Terkunci (Selesaikan modul 2)</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs font-bold text-gold-400 mb-2 uppercase tracking-wider">Modul {modul}</div>
                  <h4 className="font-bold text-white mb-2 line-clamp-2">
                    {modul === 1 ? 'Fundamental Public Speaking: Mengatasi Grogi' : modul === 2 ? 'Teknik Vokal & Bahasa Tubuh' : 'Pola Latihan Lanjutan'}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 15 mnt</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Banner */}
        <div className="bg-gradient-to-r from-navy-800 to-navy-900 border border-gold-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold-500/10 blur-3xl rounded-full"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center rotate-3 shadow-[0_0_15px_rgba(74,222,128,0.3)] border border-green-300/50">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Grup Komunitas Eksklusif</h4>
              <p className="text-slate-300 text-sm">Bergabung dengan peserta lain untuk networking & diskusi.</p>
            </div>
          </div>
          <button className="relative z-10 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            Akses Grup WhatsApp <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}

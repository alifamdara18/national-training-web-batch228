import React, { useState, useEffect } from 'react';
import { Mic2, Menu, X, Sparkles, ChevronRight, PhoneCall } from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

interface NavbarProps {
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegister }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Kurikulum & Fitur', href: '#kurikulum' },
    { label: 'Fasilitas Bonus', href: '#fasilitas' },
    { label: 'Testimoni', href: '#testimoni' },
    { label: 'Investasi (399k)', href: '#investasi' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#0B1B33] via-[#1E3A8A] to-[#0B1B33] border-b border-amber-500/20 py-2 px-4 text-center text-xs md:text-sm text-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-medium">
          <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Promo Subsidi
          </span>
          <span>
            Pendaftaran <strong className="text-white">{TRAINING_CONFIG.programTitle}</strong> hanya{' '}
            <strong className="text-amber-400 font-bold">{TRAINING_CONFIG.formattedPrice}</strong>
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-amber-200/90">Tersisa {TRAINING_CONFIG.seatsRemaining} Slot Terakhir!</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070E1A]/95 backdrop-blur-md shadow-xl shadow-black/40 border-b border-slate-800/80 py-3.5'
            : 'bg-[#070E1A]/70 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#070E1A] rounded-[11px] flex items-center justify-center group-hover:bg-[#0B1B33] transition-colors">
                <Mic2 className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-cinzel">
                  AMDARA
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  TRAINING
                </span>
              </div>
              <p className="text-[10px] text-amber-300/80 tracking-wider uppercase font-semibold">
                {TRAINING_CONFIG.programTitle}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-amber-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${TRAINING_CONFIG.contactWhatsapp}?text=Halo%20Admin%20Amdara%20Training,%20saya%20tertarik%20dengan%20National%20Public%20Speaking%20seharga%20399k`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-all bg-slate-800/40"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Konsultasi WA</span>
            </a>

            <button
              onClick={onOpenRegister}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Daftar Sekarang • 399k</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-slate-950"
            >
              399k
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B1526] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-slate-200 hover:text-amber-400 py-2 border-b border-slate-800/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="w-full py-3 rounded-xl font-bold text-center text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-lg shadow-amber-500/25"
              >
                Daftar Pelatihan • Rp 399.000
              </button>
              <a
                href={`https://wa.me/${TRAINING_CONFIG.contactWhatsapp}?text=Halo%20Admin%20Amdara%20Training,%20saya%20ingin%20tanya%20tentang%20National%20Public%20Speaking%20399k`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl font-semibold text-center text-xs text-slate-200 border border-slate-700 bg-slate-800/60 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Chat WhatsApp Admin
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

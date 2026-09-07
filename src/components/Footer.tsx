import React from 'react';
import { Mic2, PhoneCall, Mail, MapPin, ShieldCheck, Heart, Award, Instagram, Linkedin, Youtube } from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050B14] border-t border-slate-800/80 text-slate-400 text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-[#070E1A] rounded-[11px] flex items-center justify-center">
                  <Mic2 className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white font-cinzel">
                    AMDARA
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-600/30 text-blue-300 border border-blue-500/30">
                    TRAINING
                  </span>
                </div>
                <p className="text-[10px] text-amber-400 font-semibold tracking-wider uppercase">
                  National Public Speaking
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Lembaga pelatihan komunikasi dan public speaking berstandar nasional yang telah membantu ribuan mahasiswa, profesional, dan pemimpin tampil percaya diri di depan publik.
            </p>

            {/* Verification / Security note */}
            <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Program Resmi Bersertifikat Nasional</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#tentang" className="hover:text-amber-300 transition-colors">Tentang Program</a>
              </li>
              <li>
                <a href="#kurikulum" className="hover:text-amber-300 transition-colors">Fitur & Silabus</a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-amber-300 transition-colors">Bonus & Fasilitas</a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-amber-300 transition-colors">Testimoni Alumni</a>
              </li>
              <li>
                <a href="#investasi" className="hover:text-amber-300 transition-colors">Biaya (Rp 399k)</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">Pertanyaan Umum</a>
              </li>
            </ul>
          </div>

          {/* Training Features Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Spesifikasi Program
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>Format: Live Interactive via Zoom Meeting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>Durasi: 3 Hari Intensif + 1 Bulan Support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>Investasi: Rp 399.000 (Subsidi Terbatas)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>Output: Sertifikat Kelulusan Resmi Amdara</span>
              </li>
            </ul>
          </div>

          {/* Contact / Helpdesk */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Layanan Informasi & Admin
            </h4>
            <div className="space-y-2 text-slate-300">
              <a
                href={`https://wa.me/${TRAINING_CONFIG.contactWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </a>

              <a
                href="mailto:alifamdara18@gmail.com"
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>alifamdara18@gmail.com</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Head Office: Jakarta Selatan & Online Learning Hub Nasional</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all text-slate-300"
                aria-label="Instagram Amdara Training"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all text-slate-300"
                aria-label="LinkedIn Amdara Training"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all text-slate-300"
                aria-label="YouTube Amdara Training"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Disclaimer */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-[11px]">
          <div>
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-white">Amdara Training</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.
            </p>
            <p className="text-slate-400 text-[10px] mt-0.5">
              National Public Speaking adalah merek program resmi dari Amdara Training.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Kebijakan Privasi</span>
            <span>•</span>
            <span>Syarat & Ketentuan</span>
            <span>•</span>
            <span>Garansi Program</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

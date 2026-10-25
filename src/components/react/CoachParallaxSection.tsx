import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Sparkles, Award, Users, CheckCircle2, MessageSquareQuote, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

interface CoachParallaxSectionProps {
  children?: React.ReactNode;
  imageSrc?: string;
}

export const CoachParallaxSection: React.FC<CoachParallaxSectionProps> = ({
  children,
  imageSrc = '/master-surya-jayanegara-baru.png',
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const isReduced = prefersReducedMotion || isMobile;

  // Parallax offsets for depth layers
  const bgGlowY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 15] : [-40, 50]);
  const imageY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 25] : [-20, 70]);
  const floatingCardY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 20] : [20, -50]);

  return (
    <section
      ref={sectionRef}
      id="trainer"
      className="w-full py-24 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-t border-navy-800/80 relative overflow-hidden"
    >
      {/* Decorative Gold & Navy Radial Backdrops */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Mentor & Fasilitator Utama
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Belajar Langsung Bersama <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500">Master Surya Jaya Negara</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Bukan sekadar pembicara panggung, melainkan mentor yang siap mendengarkan, mengurai ketakutanmu, dan membimbing langkahmu hingga percaya diri bersuara.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* =========================================================================
              LEFT COLUMN: MASTER SURYA JAYA NEGARA PARALLAX VISUAL + DEPTH GLOW + STAT BADGES
             ========================================================================= */}
          <div className="lg:col-span-6 flex justify-center relative overflow-visible">
            <div className="relative w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[580px] overflow-visible">

              {/* Layer 0: Ambient Glowing Rings */}
              <motion.div
                style={{ y: bgGlowY }}
                className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none"
              >
                {/* Gold Radial Aura */}
                <div className="w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-gold-500/25 via-gold-400/15 to-transparent blur-3xl filter" />

                {/* Rotating Dotted Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dashed border-gold-500/30"
                />
              </motion.div>

              {/* Layer 1: Master Surya Jaya Negara Image with Smooth Parallax & Floating Animation */}
              <motion.div
                style={{ y: imageY }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 flex justify-center overflow-visible"
              >
                {children ? (
                  <div className="filter drop-shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:drop-shadow-[0_25px_60px_rgba(212,175,55,0.35)] transition-all duration-300 w-full flex justify-center overflow-visible">
                    {children}
                  </div>
                ) : (
                  <img
                    src={imageSrc}
                    alt="Master Surya Jaya Negara - Master Trainer Innerpeace Public Speaking"
                    width={640}
                    height={486}
                    className="w-full h-auto object-contain filter drop-shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:drop-shadow-[0_25px_60px_rgba(212,175,55,0.35)] transition-all duration-300 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black_92%,transparent_100%)]"
                    loading="lazy"
                  />
                )}
              </motion.div>

              {/* Layer 2: Floating Experience Badge (Overlapping Bottom Left) */}
              <motion.div
                style={{ y: floatingCardY }}
                className="absolute -bottom-6 -left-3 sm:-left-6 z-20"
              >
                <div className="p-3.5 sm:p-4 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-gold-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-black text-lg">
                    10+
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm">Tahun Pengalaman</div>
                    <div className="text-gold-300 text-[11px] font-medium">Melatih Public Speaking</div>
                  </div>
                </div>
              </motion.div>

              {/* Layer 3: Floating Trust Badge (Overlapping Top Right) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 -right-2 sm:-right-4 z-20"
              >
                <div className="px-3.5 py-2 rounded-xl bg-navy-900/90 backdrop-blur-md border border-gold-500/30 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-100">Certified Mentor</span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: PHILOSOPHY, APPROACH, CREDENTIALS & DIRECT QUOTE
             ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">

            {/* Coach Title & Credentials Intro */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                "Bicara Bukan Soal Tampil Sempurna, Tapi Soal Menyampaikan Dari Hati."
              </h3>
              <p className="mt-3 text-slate-300 text-base sm:text-lg leading-relaxed">
                Master Surya Jaya Negara memformulasikan metode <strong className="text-gold-400">Innerpeace Public Speaking</strong> dari pengalaman nyata bertahun-tahun mendampingi mereka yang gemetar memegang mic, takut salah, hingga akhirnya bisa memukau audiens dengan gaya khas dirinya sendiri.
              </p>
            </div>

            {/* 3 Core Coaching Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

              <div className="p-4 rounded-xl bg-navy-900/60 border border-gold-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-gold-400 font-bold text-sm mb-1.5">
                  <HeartHandshake className="w-4 h-4 text-gold-400" />
                  <span>Pendekatan Humanis</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Bukan metode kaku penuh instruksi hafalan. Kakak diajak berdamai dengan rasa gugup agar ketenangan muncul secara alami.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900/60 border border-gold-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-gold-400 font-bold text-sm mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>100% Praktik Interaktif</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tidak cuma menyimak slide. Kakak langsung latihan berbicara berkali-kali dengan bimbingan dan koreksi langsung per sesi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900/60 border border-gold-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-gold-400 font-bold text-sm mb-1.5">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span>Teknik Vokal & Struktur</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Mempelajari cara menyusun ide pesan dengan runtut, intonasi memikat, artikulasi jelas, serta bahasa tubuh yang berwibawa.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900/60 border border-gold-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-2.5 text-gold-400 font-bold text-sm mb-1.5">
                  <Users className="w-4 h-4 text-gold-400" />
                  <span>Ruang Belajar Suportif</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Kelas dirancang sebagai zona nyaman tanpa penghakiman. Semua peserta saling mendukung dan tumbuh bersama.
                </p>
              </div>

            </div>

            {/* Track Record Stats Bar */}
            <div className="p-5 rounded-2xl bg-navy-900/80 border border-gold-500/25 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">2,000+</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Alumni Terlatih</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">227</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Batch Tuntas</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">10+ Thn</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Dedikasi Melatih</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Praktik & Evaluasi</div>
              </div>
            </div>

            {/* Coach Quote & Action Call */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-gold-500 via-yellow-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold text-sm sm:text-base rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                Daftar Dibimbing Master Surya Jaya Negara <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/6281378777838?text=Halo%20Master%20Surya%20Jaya%20Negara%20dan%20Tim%20Amdara%2C%20saya%20ingin%20tanya%20tentang%20bimbingan%20Batch%20237."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-navy-800 hover:bg-navy-700 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-gold-500/20 transition-all"
              >
                Tanya Master Trainer via WhatsApp
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CoachParallaxSection;

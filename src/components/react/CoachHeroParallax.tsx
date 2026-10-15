import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { Mic, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface CoachHeroParallaxProps {
  children?: React.ReactNode;
  imageSrc?: string;
  className?: string;
}

export const CoachHeroParallax: React.FC<CoachHeroParallaxProps> = ({
  children,
  imageSrc = '/coach-surya-removebg-preview.png',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth dampening for silky scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  });

  // Layered depth parallax offsets (scaled down on mobile or if reduced motion is requested)
  const isReduced = prefersReducedMotion || isMobile;

  // Background glow moves slowest
  const bgGlowY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 15] : [-25, 45]);
  
  // Decorative rings move mid-speed
  const decorRingY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 25] : [-35, 65]);
  
  // Main Coach photo moves with deliberate depth
  const coachY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 35] : [-15, 95]);
  
  // Top floating badge moves faster for 3D stereoscopic depth
  const badgeTopY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 20] : [-30, 110]);
  
  // Bottom floating badge moves with distinct speed
  const badgeBottomY = useTransform(smoothProgress, [0, 1], isReduced ? [0, 30] : [10, 130]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* =========================================================================
          LAYER 0: AMBIENT GLOW & BACKDROP ILLUMINATION (GOLD #D4AF37 & NAVY BLUE)
         ========================================================================= */}
      <motion.div
        style={{ y: bgGlowY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
      >
        {/* Core Gold Radial Aura */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.65, 0.85, 0.65],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-gold-500/30 via-yellow-400/20 to-transparent blur-3xl filter"
        />

        {/* Deep Navy Radial Atmosphere */}
        <div className="absolute w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-navy-800/60 blur-2xl filter -z-20" />
      </motion.div>

      {/* =========================================================================
          LAYER 1: GEOMETRIC ORBITS & DECORATIVE ACCENTS (MULTI-LAYER DEPTH)
         ========================================================================= */}
      <motion.div
        style={{ y: decorRingY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10"
      >
        {/* Outer Dotted Gold Orbit Ring (Continuous 360 Spin) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="w-72 h-72 sm:w-[22rem] sm:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-full border border-dashed border-gold-500/25 relative"
        >
          {/* Orbiting Gold Pearl Accent */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold-400 shadow-[0_0_12px_#D4AF37]" />
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-500/70 shadow-[0_0_8px_#D4AF37]" />
        </motion.div>

        {/* Inner Solid Tech Ring */}
        <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border border-gold-500/15 bg-gradient-to-b from-navy-900/40 to-transparent backdrop-blur-[1px]" />
      </motion.div>

      {/* =========================================================================
          LAYER 2: MAIN SUBJECT - COACH SURYA (PARALLAX + SMOOTH BOBBING HOVER)
         ========================================================================= */}
      <motion.div
        style={{ y: coachY }}
        className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px] mx-auto flex justify-center"
      >
        {/* Smooth Bobbing / Floating Animation (Continuous organic movement) */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            scale: 1.025,
            transition: { duration: 0.3 },
          }}
          className="relative group cursor-pointer"
        >
          {/* Subtle Ground Shadow & Glow beneath Coach */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/50 blur-xl rounded-full" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-gold-500/20 blur-lg rounded-full" />

          {/* Render Astro Image if passed as children, otherwise render fallback img */}
          {children ? (
            <div className="relative filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_35px_rgba(212,175,55,0.25)] transition-all duration-300">
              {children}
            </div>
          ) : (
            <img
              src={imageSrc}
              alt="Coach Surya - Master Public Speaking Amdara Training"
              width={408}
              height={612}
              className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_35px_rgba(212,175,55,0.25)] transition-all duration-300 pointer-events-none select-none"
              loading="eager"
            />
          )}
        </motion.div>
      </motion.div>

      {/* =========================================================================
          LAYER 3: FOREGROUND 3D FLOATING BADGES (STEREOSCOPIC DEPTH PARALLAX)
         ========================================================================= */}
      
      {/* Top Floating Badge: Coach Surya Authority */}
      <motion.div
        style={{ y: badgeTopY }}
        animate={{
          y: [-3, 5, -3],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-2 left-0 sm:-left-4 lg:-left-6 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-navy-900/85 backdrop-blur-md border border-gold-500/40 shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-navy-950 font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)] shrink-0">
            <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-navy-950" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-extrabold text-white tracking-wide">Coach Surya</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20" />
            </div>
            <p className="text-[10px] sm:text-xs text-gold-300/90 font-medium">Lead Mentor Amdara</p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Floating Badge: 100% Praktik & Kepuasan */}
      <motion.div
        style={{ y: badgeBottomY }}
        animate={{
          y: [4, -5, 4],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute -bottom-4 right-0 sm:-right-4 lg:-right-6 z-20"
      >
        <div className="flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-navy-900/90 backdrop-blur-md border border-gold-500/35 shadow-[0_14px_35px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-105">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
          </div>
          <div className="text-left">
            <p className="text-xs sm:text-sm font-bold text-white leading-tight">100% Praktik Langsung</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Bimbingan Step-by-Step</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoachHeroParallax;

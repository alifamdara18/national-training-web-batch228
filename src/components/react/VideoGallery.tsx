import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize2, X, Sparkles, CheckCircle2, Video as VideoIcon, Film, Users, ExternalLink } from 'lucide-react';

export interface VideoItem {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  duration?: string;
}

export const VIDEO_LIST: VideoItem[] = [
  {
    id: 'testimoni-keseruan',
    youtubeId: 'wBMIu6js18A',
    url: 'https://youtu.be/wBMIu6js18A',
    title: 'Keseruan Brightstar Public Speaking - Training Online Rasa Offline',
    category: 'Highlight & Testimoni Alumni',
    tag: 'Testimoni Utama',
    description: 'Rasakan atmosfer energik dan transformasi nyata alumni Amdara Training. Terbukti interaktif, seru, dan membuat kepercayaan diri melejit seketika!',
    duration: '2:45',
  },
  {
    id: 'latihan-body-language',
    youtubeId: 'XivG9-w2V5Y',
    url: 'https://youtu.be/XivG9-w2V5Y',
    title: 'Sesi Latihan Body Language & Penguasaan Panggung',
    category: 'Suasana Kelas & Pola Praktik',
    tag: 'Pola Praktik 100%',
    description: 'Intip bagaimana gestur tubuh alami, tatapan mata terhubung, dan proyeksi vokal dilatih langsung step-by-step di depan kelas.',
    duration: '3:12',
  },
  {
    id: 'sesi-private-master',
    youtubeId: 'cX7aps8nDpc',
    url: 'https://youtu.be/cX7aps8nDpc',
    title: 'Private Master Trainer Mastery - Pendampingan Intensif',
    category: 'Sesi Mentoring Private',
    tag: 'Mentoring Eksklusif',
    description: 'Pendampingan 1-on-1 intensif membedah mental block, menyusun struktur speech memikat, dan evaluasi personal langsung dari Coach Surya.',
    duration: '3:50',
  },
];

export const VideoGallery: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

  const activeVideo = VIDEO_LIST[activeVideoIndex];

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle switching video in the main player
  const handleSelectVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlayingInline(false);
  };

  return (
    <section id="preview-video" className="w-full py-20 relative overflow-hidden bg-navy-950">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Sneak-Peek Sesi Latihan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Intip Langsung <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500">Keseruan Kelas Kami</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Bukan teori di atas kertas. Tonton rekaman nyata bagaimana peserta dibimbing dari nol, saling mendukung, hingga percaya diri berbicara tanpa rasa takut.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {VIDEO_LIST.map((video, idx) => {
              const isActive = idx === activeVideoIndex;
              return (
                <button
                  key={video.id}
                  onClick={() => handleSelectVideo(idx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-105'
                      : 'bg-navy-900/80 text-slate-300 hover:text-white border border-gold-500/20 hover:border-gold-500/40'
                  }`}
                >
                  <Film className={`w-3.5 h-3.5 ${isActive ? 'text-navy-950' : 'text-gold-400'}`} />
                  <span>{video.tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            FEATURED VIDEO PLAYER ('LOSS' / LEGA & FULL-WIDTH WITH GOLD SOFT SHADOW)
           ========================================================================= */}
        <div className="w-full relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-navy-900 border border-gold-500/20 hover:border-gold-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.22)] transition-all duration-500">
          
          <div className="aspect-[16/9] w-full relative overflow-hidden bg-black">
            {isPlayingInline ? (
              /* Inline Iframe with Lite Embed trigger */
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              /* Lite Embed Thumbnail with Glowing Play Overlay */
              <div className="relative w-full h-full cursor-pointer group" onClick={() => setIsPlayingInline(true)}>
                {/* High Quality YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`}
                  alt={activeVideo.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                  loading="lazy"
                />

                {/* Cinematic Ambient Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60" />

                {/* Central Glowing Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Animated Pulsing Gold Waves */}
                    <span className="animate-ping absolute inset-0 rounded-full bg-gold-400/40 opacity-75" />
                    <span className="absolute -inset-3 rounded-full bg-gold-500/20 blur-md group-hover:bg-gold-500/40 transition-colors" />

                    <button
                      type="button"
                      aria-label={`Putar ${activeVideo.title}`}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-gold-600 via-gold-500 to-yellow-400 text-navy-950 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.5)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.8)] group-hover:scale-110 active:scale-95 transition-all duration-300"
                    >
                      <Play className="w-9 h-9 sm:w-11 sm:h-11 text-navy-950 ml-1.5 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Top Info Bar (Category & Fullscreen Trigger) */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-semibold shadow-lg">
                    <VideoIcon className="w-3.5 h-3.5 text-gold-400" />
                    <span>{activeVideo.category}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalVideo(activeVideo);
                    }}
                    className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-950/80 hover:bg-gold-500 text-slate-200 hover:text-navy-950 backdrop-blur-md border border-gold-500/30 text-xs font-semibold shadow-lg transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Layar Penuh</span>
                  </button>
                </div>

                {/* Bottom Content Bar (Title, Description & Quick Actions) */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div className="max-w-2xl">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug drop-shadow-md">
                      {activeVideo.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {activeVideo.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalVideo(activeVideo);
                      }}
                      className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 text-xs sm:text-sm font-black rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Tonton Modal</span>
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            VIDEO GRID SELECTOR (3 CARDS SEAMLESS SWITCHER)
           ========================================================================= */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {VIDEO_LIST.map((video, idx) => {
            const isActive = idx === activeVideoIndex;
            return (
              <div
                key={video.id}
                onClick={() => handleSelectVideo(idx)}
                className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? 'bg-navy-900 border-2 border-gold-500 shadow-[0_0_25px_rgba(212,175,55,0.25)] scale-[1.02]'
                    : 'bg-navy-900/60 hover:bg-navy-900 border border-gold-500/20 hover:border-gold-500/40 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Thumbnail Container */}
                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden relative bg-black/60 mb-3">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                    {/* Small Play Button Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gold-500 text-navy-950 shadow-[0_0_15px_#D4AF37]'
                          : 'bg-navy-950/70 text-white group-hover:bg-gold-500 group-hover:text-navy-950'
                      }`}>
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Duration Chip */}
                    {video.duration && (
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] text-white font-medium">
                        {video.duration}
                      </span>
                    )}

                    {/* Currently Playing Indicator */}
                    {isActive && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-gold-500 text-navy-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                        Sedang Dipilih
                      </span>
                    )}
                  </div>

                  {/* Category Chip */}
                  <span className="text-[11px] font-semibold text-gold-400">
                    {video.category}
                  </span>

                  {/* Title */}
                  <h4 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors mt-1 line-clamp-2 leading-snug">
                    {video.title}
                  </h4>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-4 pt-3 border-t border-navy-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 group-hover:text-slate-200">
                    {isActive ? 'Aktif di Pemutar Utama' : 'Klik untuk Memutar'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalVideo(video);
                    }}
                    title="Buka Popup Layar Penuh"
                    className="text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
                  >
                    <span>Popup</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          FULLSCREEN MODAL OVERLAY (LIGHTWEIGHT, FAST, ESCAPE LISTENER)
         ========================================================================= */}
      <AnimatePresence>
        {modalVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8">
            {/* Backdrop Blur Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalVideo(null)}
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-xl"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-5xl bg-navy-900 border border-gold-500/40 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-navy-800 bg-navy-950/60">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold">
                    {modalVideo.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                    {modalVideo.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={modalVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                    title="Buka di YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setModalVideo(null)}
                    aria-label="Tutup Modal"
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 16:9 Video Player Container */}
              <div className="aspect-[16/9] w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${modalVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={modalVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer Quick Switcher */}
              <div className="p-4 sm:p-5 border-t border-navy-800 bg-navy-950/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-slate-300">
                  {modalVideo.description}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  {VIDEO_LIST.map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => setModalVideo(vid)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        vid.id === modalVideo.id
                          ? 'bg-gold-500 text-navy-950 font-bold'
                          : 'bg-navy-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {vid.tag}
                    </button>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;

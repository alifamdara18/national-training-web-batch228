import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ChevronRight } from 'lucide-react';

const PLAYLIST = [
  {
    id: 'wBMIu6js18A',
    title: 'Keseruan Training',
    thumbnail: 'https://img.youtube.com/vi/wBMIu6js18A/maxresdefault.jpg'
  },
  {
    id: '6tYDTYOML_c',
    title: 'Online Rasa Offline',
    thumbnail: 'https://img.youtube.com/vi/6tYDTYOML_c/maxresdefault.jpg'
  },
  {
    id: 'n5z8d8jzAtU',
    title: 'Atmosphere 1',
    thumbnail: 'https://img.youtube.com/vi/n5z8d8jzAtU/maxresdefault.jpg'
  },
  {
    id: 'qCKveaczK1Q',
    title: 'Atmosphere 2',
    thumbnail: 'https://img.youtube.com/vi/qCKveaczK1Q/maxresdefault.jpg'
  }
];

interface FloatingVideoWidgetProps {
  onOpenRegister: () => void;
}

export function FloatingVideoWidget({ onOpenRegister }: FloatingVideoWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show widget after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Save state if user closed it manually, maybe? 
  // Requirement: "Simpan state jika user menutup modal agar tidak mengganggu navigasi"
  // For simplicity, we just toggle isOpen state. 

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* Badge */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center gap-1.5 whitespace-nowrap transform origin-bottom-right group-hover:scale-105 transition-transform"
            >
              <span>🎥</span> Coba Intip Kelas!
            </motion.div>

            {/* Bubble Container (Story Style) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 animate-[spin_4s_linear_infinite]">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-full blur animate-pulse opacity-70"></div>
              
              {/* Inner content */}
              <div className="relative w-full h-full bg-slate-900 rounded-full overflow-hidden border-2 border-[#070E1A] animate-[spin_4s_linear_infinite_reverse]">
                <img 
                  src={PLAYLIST[0].thumbnail} 
                  alt="Video Preview" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen/Modal Video */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6 sm:bg-black/80 sm:backdrop-blur-sm bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full sm:h-[85vh] sm:max-h-[800px] sm:w-full sm:max-w-md bg-slate-900 sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl border-0 sm:border border-slate-800"
            >
              {/* Header */}
              <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <span className="text-white font-semibold text-sm drop-shadow-md">Intip Keseruan Kelas</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Area */}
              <div className="flex-1 relative bg-black flex items-center justify-center">
                {/* 16:9 ratio container for youtube if it doesn't fit 9:16 perfectly, 
                    but we can use absolute full height/width to simulate reels if youtube supports it.
                    Standard embed is 16:9. We will center it vertically. */}
                <div className="w-full aspect-video">
                  <iframe
                    key={activeVideoIndex}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${PLAYLIST[activeVideoIndex].id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* Navigation & CTA Area */}
              <div className="bg-slate-900 border-t border-slate-800 p-4 sm:p-5 flex flex-col gap-4 relative z-10">
                {/* Playlist Tabs */}
                <div>
                  <div className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wider">Pilih Episode</div>
                  <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
                    {PLAYLIST.map((video, idx) => (
                      <button
                        key={video.id}
                        onClick={() => setActiveVideoIndex(idx)}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all snap-start
                          ${activeVideoIndex === idx 
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' 
                            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                          }`}
                      >
                        {activeVideoIndex === idx && <Play className="w-3.5 h-3.5 fill-current" />}
                        {video.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full relative group overflow-hidden rounded-xl p-[2px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3 rounded-[10px] flex items-center justify-between">
                    <div className="flex flex-col text-left">
                      <span className="text-white/90 text-xs font-medium">Rasakan Sensasi Training-nya!</span>
                      <span className="text-white font-bold text-sm">Daftarkan Diri Anda Sekarang 🔥</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

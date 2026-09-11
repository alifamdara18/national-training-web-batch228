import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VIDEO_CATEGORIES = ['Semua', 'Cuplikan Latihan', 'Suasana Kelas', 'Testimoni', 'Profil Pembicara'];

const VIDEOS = [
  {
    id: 1,
    category: 'Cuplikan Latihan',
    title: 'Teknik Pernapasan 4-7-8',
    poster: 'https://images.unsplash.com/photo-1475721025505-c31da59c6dd4?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '01:24'
  },
  {
    id: 2,
    category: 'Suasana Kelas',
    title: 'Energi Hari Pertama',
    poster: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '00:45'
  },
  {
    id: 3,
    category: 'Testimoni',
    title: 'Rian - Project Manager',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '02:10'
  },
  {
    id: 4,
    category: 'Profil Pembicara',
    title: 'Mengenal Lead Trainer',
    poster: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '01:50'
  }
];

export const InteractiveVideoGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredVideos = activeCategory === 'Semua' 
    ? VIDEOS 
    : VIDEOS.filter(v => v.category === activeCategory);

  return (
    <section className="py-20 bg-[#0A1628] relative border-t border-slate-800" id="experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <Play className="w-3.5 h-3.5 fill-blue-400 text-blue-400" /> Galeri Pengalaman
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Rasakan Sendiri <span className="gold-gradient-text font-cinzel">Atmosfer Kelas Kami</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Telusuri cuplikan materi, suasana belajar, dan bukti nyata dari mereka yang telah bertransformasi.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {VIDEO_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/60 hover:border-amber-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 group-hover:border-amber-500/50 transition-colors shadow-lg">
                <video 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  poster={video.poster}
                  controls
                  controlsList="nodownload"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                
                {/* Labels */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 pointer-events-none">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">{video.category}</span>
                </div>
                <div className="absolute bottom-12 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md pointer-events-none">
                  <span className="text-[10px] font-mono text-white">{video.duration}</span>
                </div>
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-100 group-hover:text-amber-400 transition-colors px-1">
                {video.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

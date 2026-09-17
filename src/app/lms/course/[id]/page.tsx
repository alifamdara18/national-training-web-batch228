import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, ChevronLeft, Lock, FileText, Download } from 'lucide-react';
import type { Module, Episode } from '../types';

// Mock Data
const MOCK_MODULES: Module[] = [
  {
    id: 'mod1',
    title: 'Modul 1: Fundamental Mindset Developer',
    description: 'Memahami cara berpikir seorang developer profesional.',
    isCompleted: true,
    episodes: [
      { id: 'ep1', title: 'Roadmap Web Developer 2024', duration: '12:45', videoUrl: 'mock', isCompleted: true },
      { id: 'ep2', title: 'Membangun Kebiasaan Ngoding', duration: '15:20', videoUrl: 'mock', isCompleted: true },
    ]
  },
  {
    id: 'mod2',
    title: 'Modul 2: HTML & CSS Mastery',
    description: 'Struktur dan styling modern dengan best practices.',
    isCompleted: false,
    episodes: [
      { id: 'ep3', title: 'Struktur Semantik HTML5', duration: '20:15', videoUrl: 'mock', isCompleted: true },
      { id: 'ep4', title: 'CSS Flexbox & Grid Praktis', duration: '35:00', videoUrl: 'mock', isCompleted: false },
      { id: 'ep5', title: 'Studi Kasus: Clone UI Sederhana', duration: '45:10', videoUrl: 'mock', isCompleted: false },
    ]
  }
];

export function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeEpisode, setActiveEpisode] = useState<Episode>(MOCK_MODULES[1].episodes[1]);
  const [activeModuleId, setActiveModuleId] = useState<string>('mod2');

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] bg-[#070E1A]">
      {/* Main Content (Video Player & Info) */}
      <div className="flex-1 lg:border-r border-slate-800/60 flex flex-col">
        {/* Navigation Bar */}
        <div className="h-14 px-4 flex items-center border-b border-slate-800/60 bg-[#0A1628]/50">
          <button 
            onClick={() => navigate('/lms')}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            <span>Kembali ke Dashboard</span>
          </button>
        </div>

        {/* Video Player Area */}
        <div className="w-full bg-black aspect-video relative group flex items-center justify-center">
          {/* Fake Video Player Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent opacity-60 z-10 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="h-16 w-16 bg-amber-400/90 hover:bg-amber-400 hover:scale-110 transition-all rounded-full flex items-center justify-center pl-1.5 shadow-lg shadow-amber-500/20">
              <Play size={28} className="text-slate-900" />
            </button>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-slate-800 z-30">
            <div className="h-full bg-amber-400 w-1/3" />
          </div>
        </div>

        {/* Video Info */}
        <div className="p-6 lg:p-8 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{activeEpisode.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center space-x-1">
                  <Play size={14} />
                  <span>Modul 2</span>
                </span>
                <span>•</span>
                <span>Durasi: {activeEpisode.duration}</span>
              </div>
            </div>
            
            <button className="flex items-center space-x-2 bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 border border-transparent text-slate-300 px-4 py-2 rounded-lg transition-all font-medium">
              <CheckCircle2 size={18} />
              <span>Tandai Selesai</span>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/60">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Materi Pendukung</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-slate-800/30 rounded-xl border border-slate-800 hover:border-amber-400/30 transition-colors cursor-pointer group">
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-200">Slide Presentasi</h4>
                  <p className="text-xs text-slate-400">PDF • 2.4 MB</p>
                </div>
                <Download size={16} className="text-slate-500 group-hover:text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Playlist */}
      <div className="w-full lg:w-80 bg-[#0A1628] flex flex-col h-[500px] lg:h-auto border-t lg:border-t-0 border-slate-800/60">
        <div className="p-4 border-b border-slate-800/60">
          <h3 className="font-bold text-slate-200">Daftar Modul</h3>
          <p className="text-xs text-slate-400 mt-1">3 / 12 Episode Selesai</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {MOCK_MODULES.map((module) => (
            <div key={module.id} className="border-b border-slate-800/60">
              {/* Module Header */}
              <button 
                onClick={() => setActiveModuleId(module.id)}
                className={`w-full text-left p-4 hover:bg-slate-800/40 transition-colors flex items-start justify-between
                  ${activeModuleId === module.id ? 'bg-slate-800/40' : ''}
                `}
              >
                <div>
                  <h4 className={`text-sm font-bold leading-tight ${activeModuleId === module.id ? 'text-amber-400' : 'text-slate-200'}`}>
                    {module.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{module.episodes.length} Video</p>
                </div>
                {module.isCompleted && <CheckCircle2 size={16} className="text-emerald-500 shrink-0 ml-2" />}
              </button>

              {/* Episodes List (Accordion Open/Close logic simplified for mock) */}
              {activeModuleId === module.id && (
                <div className="bg-[#070E1A]/50 pb-2">
                  {module.episodes.map((episode) => {
                    const isActive = activeEpisode.id === episode.id;
                    return (
                      <button
                        key={episode.id}
                        onClick={() => setActiveEpisode(episode)}
                        className={`w-full text-left px-4 py-3 flex items-start space-x-3 transition-colors hover:bg-slate-800/40
                          ${isActive ? 'border-l-2 border-amber-400 bg-amber-400/5' : 'border-l-2 border-transparent'}
                        `}
                      >
                        <div className="mt-0.5 shrink-0">
                          {episode.isCompleted ? (
                            <CheckCircle2 size={16} className="text-emerald-500" />
                          ) : isActive ? (
                            <Play size={16} className="text-amber-400" />
                          ) : (
                            <Lock size={16} className="text-slate-600" />
                          )}
                        </div>
                        <div>
                          <p className={`text-sm leading-tight ${isActive ? 'text-amber-400 font-medium' : 'text-slate-300'}`}>
                            {episode.title}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">{episode.duration}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

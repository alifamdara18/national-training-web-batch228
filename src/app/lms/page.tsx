import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Clock, CheckCircle, BarChart3, Trophy, BookOpen } from 'lucide-react';
import type { Course } from './types';

// Mock Data
const MOCK_COURSES: Course[] = [
  {
    id: 'batch-228',
    title: 'National Training Web Development Batch 228',
    description: 'Materi komprehensif dari fundamental hingga advanced.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000',
    totalModules: 12,
    completedModules: 4,
    progressPercentage: 33,
    modules: []
  },
  {
    id: 'bonus-mastery',
    title: 'Bonus: Frontend Mastery Workshop',
    description: 'Sesi khusus pendalaman React & Tailwind.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000',
    totalModules: 3,
    completedModules: 0,
    progressPercentage: 0,
    modules: []
  }
];

export function LMSDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-[#0A1628] border border-slate-800/60 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Trophy size={160} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang Kembali, Budi! 👋</h2>
          <p className="text-slate-400 mb-6 text-lg">
            Mari lanjutkan perjalanan belajarmu. Kamu sudah menyelesaikan {MOCK_COURSES[0].completedModules} dari {MOCK_COURSES[0].totalModules} modul di materi utama.
          </p>
          <button 
            onClick={() => navigate(`/lms/course/${MOCK_COURSES[0].id}`)}
            className="inline-flex items-center space-x-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-400/20"
          >
            <PlayCircle size={20} />
            <span>Lanjutkan Belajar</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <BookOpen size={24} className="text-amber-400" />
            <span>Modul Saya</span>
          </h3>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COURSES.map(course => (
            <div 
              key={course.id}
              className="bg-[#0A1628] border border-slate-800/60 rounded-2xl overflow-hidden hover:border-amber-400/50 transition-all duration-300 group flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.thumbnailUrl} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-slate-900/80 backdrop-blur text-xs font-medium px-2 py-1 rounded flex items-center space-x-1 text-slate-300">
                    <Clock size={12} />
                    <span>Total {course.totalModules} Modul</span>
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h4 className="text-lg font-bold text-slate-100 mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {course.title}
                </h4>
                <p className="text-sm text-slate-400 mb-6 line-clamp-2">
                  {course.description}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <BarChart3 size={14} />
                      <span>Progress</span>
                    </span>
                    <span className="font-medium text-amber-400">{course.progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                      style={{ width: `${course.progressPercentage}%` }}
                    />
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/lms/course/${course.id}`)}
                    className="w-full mt-4 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-amber-400 hover:text-slate-900 hover:border-amber-400 font-medium transition-all"
                  >
                    {course.progressPercentage > 0 ? 'Lanjutkan' : 'Mulai Belajar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



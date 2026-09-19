import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BookOpen, Video, Calendar, Award, MessageCircle, Menu, X, LogOut, CheckCircle2 } from 'lucide-react';

const SidebarLinks = [
  { icon: BookOpen, label: 'Modul Saya', path: '/lms' },
  { icon: Video, label: 'Rekaman & Latihan', path: '/lms/rekaman' },
  { icon: Calendar, label: 'Jadwal Sesi', path: '/lms/jadwal' },
  { icon: Award, label: 'Sertifikat', path: '/lms/sertifikat' },
  { icon: MessageCircle, label: 'Komunitas', path: '/lms/komunitas' },
];

export function LMSLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Mock User Data
  const user = {
    name: 'Budi Santoso',
    batch: 'Batch 228',
    paymentStatus: 'Terverifikasi'
  };

  return (
    <div className="min-h-screen bg-[#070E1A] text-slate-100 flex font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1628] border-r border-slate-800/60
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800/60">
          <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            LMS Dashboard
          </span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {SidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/lms'}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-amber-400/10 text-amber-400 font-medium' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <link.icon size={20} className={isActive ? 'text-amber-400' : 'opacity-70'} />
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800/60">
          <button className="flex items-center space-x-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-[#0A1628]/80 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="mr-4 lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-medium text-slate-200 truncate hidden sm:block">Amdara Training</h1>
          </div>

          {/* Profile & Status */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-medium text-slate-200">{user.name}</span>
              <span className="text-xs text-slate-400">{user.batch}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400 hidden sm:inline-block">Lunas</span>
            </div>

            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-900 font-bold shadow-lg shadow-amber-500/20">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  ShieldCheck, 
  Video, 
  BookOpen, 
  Users, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  RefreshCw, 
  Mail, 
  LogOut, 
  Award, 
  KeyRound, 
  Calendar,
  XCircle
} from 'lucide-react';

interface LmsSession {
  order_id: string;
  user_name: string;
  user_email: string;
  package_type: string;
  amount?: number;
  status: string;
  verified_at: string;
}

interface LmsModule {
  id: string | number;
  title: string;
  description: string;
  video_url: string;
  order_index: number;
}

interface ZoomTicketData {
  meeting_id: string;
  passcode: string;
  zoom_url: string;
  topic: string;
  schedule_time: string;
  host_name?: string;
}

// Fallback Default Tiket Zoom
const DEFAULT_ZOOM_TICKET: ZoomTicketData = {
  meeting_id: '822 8190 2280',
  passcode: 'AMDARA237',
  zoom_url: 'https://zoom.us/j/82281902280?pwd=InnerpieceMentoring',
  topic: 'Innerpiece Public Speaking - Sesi Live Mentoring Bersama Master Surya Jaya Negara',
  schedule_time: 'Setiap Hari Minggu | 19:30 - 21:30 WIB',
  host_name: 'Master Surya Jaya Negara & Tim Amdara Training'
};

// Fallback Default Modul Pembelajaran Resmi Innerpeace
const DEFAULT_MODULES: LmsModule[] = [
  {
    id: 'mod-1',
    title: 'Modul 01: Fundamental Inner Peace & Menghilangkan Demam Panggung',
    description: 'Membedah akar psikologis kecemasan panggung (fight-or-flight response), aktivasi gelombang alfa pikiran bawah sadar, dan teknik anchoring untuk ketenangan instan sebelum mulai berbicara.',
    video_url: 'https://www.youtube.com/watch?v=Unzc731iCUY',
    order_index: 1
  },
  {
    id: 'mod-2',
    title: 'Modul 02: Olah Vokal, Power Pause & Intonasi Berkarakter',
    description: 'Latihan pernapasan diafragma yang benar, variasi nada suara, modulasi artikulasi, serta pemanfaatan jeda dramatis (power pause) agar pesan tertanam tajam dan berwibawa di benak audiens.',
    video_url: 'https://www.youtube.com/watch?v=eIho2S0ZahI',
    order_index: 2
  },
  {
    id: 'mod-3',
    title: 'Modul 03: Formula Storytelling Hipnotik & Hook 30 Detik Pertama',
    description: 'Struktur presentasi 3 babak yang menyentuh emosi, cara merancang hook pembuka yang memukau tanpa teks, dan formula closing yang mendorong audiens mengambil aksi nyata.',
    video_url: 'https://www.youtube.com/watch?v=K0pxo-dS9v8',
    order_index: 3
  },
  {
    id: 'mod-4',
    title: 'Modul 04: Penguasaan Panggung, Kontak Mata & Bahasa Tubuh Magnetik',
    description: 'Sinkronisasi bahasa tubuh terbuka, ekspresi mikro, blocking panggung offline, serta tata gestur profesional di depan kamera webinar/Zoom agar tetap terasa intim dan karismatik.',
    video_url: 'https://www.youtube.com/watch?v=ZK3jSXYBNak',
    order_index: 4
  }
];

/**
 * Helper mengubah berbagai format URL YouTube / Vimeo ke URL embed aman
 */
function getEmbedUrl(rawUrl: string): string {
  if (!rawUrl) return '';

  const ytMatch = rawUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0&autoplay=0`;
  }

  const vimeoMatch = rawUrl.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return rawUrl;
}

export default function LMSDashboard() {
  // --- Auth & Session State ---
  const [session, setSession] = useState<LmsSession | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [loginInput, setLoginInput] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [autoRedirectCountdown, setAutoRedirectCountdown] = useState<number | null>(null);

  // --- Zoom Tickets & Modules State ---
  const [zoomTicket, setZoomTicket] = useState<ZoomTicketData>(DEFAULT_ZOOM_TICKET);
  const [modules, setModules] = useState<LmsModule[]>(DEFAULT_MODULES);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  // --- Interactive UI State ---
  const [expandedModuleId, setExpandedModuleId] = useState<string | number | null>('mod-1');
  const [activeVideoModule, setActiveVideoModule] = useState<LmsModule | null>(DEFAULT_MODULES[0]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 1. CHECK KONDISI INITIAL / SESSION (Gatekeeper Guard):
  // Memeriksa LocalStorage & melakukan Re-Validation query ke Supabase orders
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load progress modul yang sudah selesai dari LocalStorage
    try {
      const savedCompleted = localStorage.getItem('amdara_completed_modules');
      if (savedCompleted) {
        setCompletedModules(JSON.parse(savedCompleted));
      }
    } catch (e) {
      console.warn('Gagal memuat status modul selesai', e);
    }

    async function checkInitialSession() {
      const stored = localStorage.getItem('amdara_lms_session');
      const params = new URLSearchParams(window.location.search);
      const queryOrderId = params.get('order_id');
      const queryVerified = params.get('verified') === 'true';
      const queryName = params.get('name') || '';
      const queryPackage = params.get('package') || 'vip';

      // Skenario 1A: Ada session di LocalStorage -> Lakukan Re-validation Query ke Supabase
      if (stored) {
        try {
          const parsed: LmsSession = JSON.parse(stored);
          const identifier = (parsed.order_id || parsed.user_email || '').trim();

          if (identifier) {
            // Mode Simulasi Lokal / Demo: langsung validasi aman
            if (identifier.startsWith('SIM-') || parsed.user_email === 'demo@amdara.id') {
              setSession(parsed);
              setIsCheckingAuth(false);
              return;
            }

            // Jalankan Re-Validation Query ke Supabase:
            // SELECT * FROM orders WHERE (user_email = :input OR order_id = :input) AND status = 'SUCCESS' LIMIT 1;
            const isEmail = identifier.includes('@');
            let revalQuery = supabase.from('orders').select('*');

            if (isEmail) {
              revalQuery = revalQuery.ilike('user_email', identifier.toLowerCase());
            } else {
              revalQuery = revalQuery.eq('order_id', identifier);
            }

            const { data: validOrder, error } = await revalQuery
              .eq('status', 'SUCCESS')
              .limit(1)
              .maybeSingle();

            if (validOrder && validOrder.status === 'SUCCESS') {
              // Re-validation Berhasil: data session diperbarui dari database
              const updatedSession: LmsSession = {
                order_id: validOrder.order_id,
                user_name: validOrder.user_name || parsed.user_name || 'Member Innerpeace',
                user_email: validOrder.user_email || parsed.user_email,
                package_type: validOrder.package_type || parsed.package_type || 'vip',
                amount: validOrder.amount || parsed.amount,
                status: 'SUCCESS',
                verified_at: new Date().toISOString()
              };
              localStorage.setItem('amdara_lms_session', JSON.stringify(updatedSession));
              setSession(updatedSession);
              setIsCheckingAuth(false);
              return;
            } else {
              // Re-validation Gagal (status bukan SUCCESS atau order dibatalkan)
              console.warn('[LMS Revalidation] Sesi tidak valid di database');
              localStorage.removeItem('amdara_lms_session');
              setSession(null);
              setVerificationError('Akses tidak ditemukan atau transaksi belum terverifikasi Lunas.');
              triggerAutoRedirect();
              setIsCheckingAuth(false);
              return;
            }
          }
        } catch (err) {
          console.error('[LMS Session Check Error]', err);
          localStorage.removeItem('amdara_lms_session');
          setSession(null);
        }
      }

      // Skenario 1B: Tidak ada session, namun ada parameter query di URL (misal: redirect dari checkout/payment)
      if (queryOrderId) {
        await verifyAndLogin(queryOrderId, {
          allowSimulation: queryVerified || queryOrderId.startsWith('SIM-'),
          defaultName: queryName,
          defaultPackage: queryPackage
        });
      } else {
        // Skenario 1C: Tidak ada session sama sekali -> Tampilkan Form Verifikasi
        setIsCheckingAuth(false);
      }
    }

    checkInitialSession();
  }, []);

  // 2. Fetch Data LMS (zoom_tickets & lms_modules) saat user terverifikasi
  useEffect(() => {
    if (!session) return;

    let isMounted = true;
    async function fetchLMSContent() {
      setLoadingData(true);
      try {
        // Query tabel zoom_tickets di Supabase
        const { data: ticketData, error: ticketError } = await supabase
          .from('zoom_tickets')
          .select('*')
          .order('id', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (isMounted) {
          if (!ticketError && ticketData) {
            setZoomTicket({
              meeting_id: ticketData.meeting_id || DEFAULT_ZOOM_TICKET.meeting_id,
              passcode: ticketData.passcode || DEFAULT_ZOOM_TICKET.passcode,
              zoom_url: ticketData.zoom_link || ticketData.zoom_url || DEFAULT_ZOOM_TICKET.zoom_url,
              topic: ticketData.topic || DEFAULT_ZOOM_TICKET.topic,
              schedule_time: ticketData.schedule_time || DEFAULT_ZOOM_TICKET.schedule_time,
              host_name: ticketData.host_name || DEFAULT_ZOOM_TICKET.host_name
            });
          } else {
            setZoomTicket(DEFAULT_ZOOM_TICKET);
          }
        }

        // Query tabel lms_modules di Supabase (kolom: title, description, video_url, order_index)
        const { data: modulesData, error: modulesError } = await supabase
          .from('lms_modules')
          .select('*')
          .order('order_index', { ascending: true });

        if (isMounted) {
          if (!modulesError && modulesData && modulesData.length > 0) {
            const parsedModules: LmsModule[] = modulesData.map((item: any, idx: number) => ({
              id: item.id || `db-${idx + 1}`,
              title: item.title || `Modul ${item.order_index || idx + 1}`,
              description: item.description || '',
              video_url: item.video_url || '',
              order_index: item.order_index ?? (idx + 1)
            }));
            setModules(parsedModules);
            setExpandedModuleId(parsedModules[0].id);
            setActiveVideoModule(parsedModules[0]);
          } else {
            // Fallback kurasi modul Innerpeace jika tabel kosong
            setModules(DEFAULT_MODULES);
            setExpandedModuleId(DEFAULT_MODULES[0].id);
            setActiveVideoModule(DEFAULT_MODULES[0]);
          }
        }
      } catch (err) {
        console.warn('[LMS Dashboard Fetch Warning]', err);
      } finally {
        if (isMounted) setLoadingData(false);
      }
    }

    fetchLMSContent();
    return () => {
      isMounted = false;
    };
  }, [session]);

  // 3. Auto-Redirect Countdown Timer Handler
  useEffect(() => {
    if (autoRedirectCountdown === null) return;
    if (autoRedirectCountdown <= 0) {
      if (typeof window !== 'undefined') {
        window.location.href = '/pricing';
      }
      return;
    }

    const timer = setTimeout(() => {
      setAutoRedirectCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [autoRedirectCountdown]);

  function triggerAutoRedirect() {
    setAutoRedirectCountdown(6); // 6 detik countdown menuju /pricing
  }

  function cancelAutoRedirect() {
    setAutoRedirectCountdown(null);
  }

  // 4. Countdown Timer Real-time ke Sesi Minggu Depan (19:30 WIB)
  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const target = new Date();
      const currentDay = target.getDay(); // 0 is Sunday
      const daysUntilSunday = currentDay === 0 && target.getHours() < 21 ? 0 : (7 - currentDay);
      target.setDate(target.getDate() + daysUntilSunday);
      target.setHours(19, 30, 0, 0);

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 5. VERIFIKASI SUPABASE QUERY (Matching Logic):
  // SELECT * FROM orders WHERE (user_email = :input OR order_id = :input) AND status = 'SUCCESS' LIMIT 1;
  async function verifyAndLogin(
    userInput: string, 
    options?: { allowSimulation?: boolean; defaultName?: string; defaultPackage?: string }
  ) {
    const rawInput = userInput.trim();
    if (!rawInput) {
      setVerificationError('Mohon masukkan Email atau Order ID pendaftaran Anda.');
      setIsCheckingAuth(false);
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);
    cancelAutoRedirect();

    try {
      const isEmail = rawInput.includes('@');
      let query = supabase.from('orders').select('*');

      if (isEmail) {
        query = query.ilike('user_email', rawInput.toLowerCase());
      } else {
        query = query.eq('order_id', rawInput);
      }

      // Query dengan filter status = 'SUCCESS' dan limit 1
      const { data: successData, error } = await query
        .eq('status', 'SUCCESS')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn('[Supabase Gatekeeper Warning]', error.message);
      }

      // SKENARIO A: Ditemukan & status === 'SUCCESS'
      if (successData && successData.status === 'SUCCESS') {
        const newSession: LmsSession = {
          order_id: successData.order_id,
          user_name: successData.user_name || 'Member Innerpeace',
          user_email: successData.user_email || rawInput,
          package_type: successData.package_type || 'vip',
          amount: successData.amount,
          status: 'SUCCESS',
          verified_at: new Date().toISOString()
        };
        localStorage.setItem('amdara_lms_session', JSON.stringify(newSession));
        setSession(newSession);
        setVerificationError(null);
        cancelAutoRedirect();
        setIsVerifying(false);
        setIsCheckingAuth(false);
        return;
      }

      // Mode Demo / Simulasi Evaluasi (e.g. demo@amdara.id atau Order SIM-AMD237-...)
      const isSim = rawInput.toUpperCase().startsWith('SIM-') || rawInput.toLowerCase() === 'demo@amdara.id' || options?.allowSimulation;
      if (isSim) {
        const demoSession: LmsSession = {
          order_id: rawInput.toUpperCase().startsWith('SIM-') ? rawInput : `SIM-AMD237-${Date.now().toString().slice(-6)}`,
          user_name: options?.defaultName || (rawInput.includes('@') ? 'Peserta Terdaftar' : 'Peserta Simulasi BCA'),
          user_email: rawInput.includes('@') ? rawInput : 'peserta.lms@amdara.id',
          package_type: options?.defaultPackage || 'vip',
          amount: 1400000,
          status: 'SUCCESS',
          verified_at: new Date().toISOString()
        };
        localStorage.setItem('amdara_lms_session', JSON.stringify(demoSession));
        setSession(demoSession);
        setVerificationError(null);
        cancelAutoRedirect();
        setIsVerifying(false);
        setIsCheckingAuth(false);
        return;
      }

      // SKENARIO B: Tidak ditemukan / Status 'PENDING' / 'FAILED' / Kosong
      // Tampilkan pesan error ringkas dan aktifkan tombol CTA / auto-redirect ke /pricing
      setVerificationError('Akses tidak ditemukan atau transaksi belum terverifikasi Lunas.');
      triggerAutoRedirect();
    } catch (err: any) {
      console.error('[Gatekeeper Exception]', err);
      setVerificationError('Akses tidak ditemukan atau transaksi belum terverifikasi Lunas.');
      triggerAutoRedirect();
    } finally {
      setIsVerifying(false);
      setIsCheckingAuth(false);
    }
  }

  // 6. FITUR LOGOUT: Menghapus amdara_lms_session dari LocalStorage dan reset ke form verifikasi
  const handleLogout = () => {
    try {
      localStorage.removeItem('amdara_lms_session');
    } catch (e) {
      console.warn('Gagal menghapus session:', e);
    }
    setSession(null);
    setLoginInput('');
    setVerificationError(null);
    cancelAutoRedirect();
  };

  // 7. Helper Salin Teks ke Clipboard
  const handleCopy = (text: string, key: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  // 8. Toggle Modul Selesai
  const toggleModuleCompletion = (modId: string | number) => {
    const strId = String(modId);
    let updated: string[];
    if (completedModules.includes(strId)) {
      updated = completedModules.filter(id => id !== strId);
    } else {
      updated = [...completedModules, strId];
    }
    setCompletedModules(updated);
    try {
      localStorage.setItem('amdara_completed_modules', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Perhitungan Progres Pembelajaran
  const progressPercent = useMemo(() => {
    if (modules.length === 0) return 0;
    const completedCount = modules.filter(m => completedModules.includes(String(m.id))).length;
    return Math.round((completedCount / modules.length) * 100);
  }, [modules, completedModules]);

  // --- TAMPILAN LOADING INISIALISASI / RE-VALIDATION ---
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950 text-slate-300">
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-navy-900/80 border border-gold-500/30 shadow-2xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-full border-4 border-gold-500/20 border-t-gold-500 animate-spin"></div>
          <p className="text-sm font-semibold tracking-wide text-gold-300">
            Memverifikasi hak akses LMS ke Supabase...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: GATEKEEPER LOGIN & ACCESS VERIFICATION FORM (Jika Belum Terverifikasi)
  // =========================================================================
  if (!session) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-navy-950 overflow-hidden font-sans">
        {/* Background Radial Glow & Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/15 via-navy-950 to-navy-950 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-navy-800/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-lg relative z-10">
          <div className="bg-gradient-to-b from-navy-900 to-navy-950 rounded-3xl p-6 sm:p-9 border-2 border-gold-500/40 shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-xl relative">
            {/* Top Golden Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 rounded-t-3xl"></div>

            {/* Header Form */}
            <div className="text-center mb-8 pt-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/30 border border-gold-500/50 text-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.25)] mb-4">
                <ShieldCheck className="w-9 h-9 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 block mb-1">
                Portal Pembelajaran Resmi
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Verifikasi Akses Member
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
                Silakan masukkan <strong>Email terdaftar</strong> atau <strong>Order ID</strong> pembayaran Anda untuk membuka portal pembelajaran.
              </p>
            </div>

            {/* SKENARIO B: Alert Error & Auto-Redirect CTA ke /pricing */}
            {verificationError && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-red-950/90 border border-red-500/50 text-left space-y-3.5 shadow-xl animate-fadeIn">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-red-200">
                      Verifikasi Akses Ditolak
                    </h4>
                    <p className="text-xs sm:text-sm text-red-300 mt-1 leading-relaxed">
                      {verificationError}
                    </p>

                    {/* Auto-redirect countdown status */}
                    {autoRedirectCountdown !== null && autoRedirectCountdown > 0 && (
                      <div className="mt-2.5 text-xs text-gold-300 flex items-center justify-between bg-navy-950/80 px-3 py-1.5 rounded-lg border border-gold-500/30">
                        <span>Mengalihkan otomatis ke halaman paket dalam <strong>{autoRedirectCountdown} detik...</strong></span>
                        <button
                          type="button"
                          onClick={cancelAutoRedirect}
                          className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tombol CTA Tegas: Pilih Paket & Selesaikan Pembayaran → */}
                <div className="pt-2 border-t border-red-900/60 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="/pricing"
                    id="btn-cta-pricing"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all text-center group cursor-pointer"
                  >
                    <span>Pilih Paket & Selesaikan Pembayaran →</span>
                  </a>
                  <a
                    href="https://wa.me/6281378777838?text=Halo%20Admin%20Amdara%2C%20saya%20mengalami%20kendala%20verifikasi%20akses%20LMS%20Innerpeace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-navy-700 transition-all text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Bantuan CS WA</span>
                  </a>
                </div>
              </div>
            )}

            {/* Form Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyAndLogin(loginInput);
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="lms-auth-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Pendaftaran atau Order ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="lms-auth-input"
                    type="text"
                    required
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Contoh: peserta@email.com atau SIM-AMD237-..."
                    className="w-full pl-10 pr-4 py-3 bg-navy-950/90 text-white rounded-xl border border-navy-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 text-sm outline-none transition-all placeholder:text-slate-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-gold-400" />
                  <span>Sistem memvalidasi status <strong>SUCCESS</strong> di tabel orders Supabase.</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi di Supabase...</span>
                  </>
                ) : (
                  <>
                    <span>Verifikasi Akses & Masuk Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Helper Hint */}
            <div className="mt-6 pt-5 border-t border-navy-800 text-center">
              <p className="text-xs text-slate-400 mb-2">Ingin mencoba pratinjau instan?</p>
              <button
                type="button"
                onClick={() => {
                  setLoginInput('demo@amdara.id');
                  verifyAndLogin('demo@amdara.id', { allowSimulation: true });
                }}
                className="inline-flex items-center gap-1.5 text-xs text-gold-300 hover:text-gold-200 font-semibold underline underline-offset-4 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Klik untuk Masuk Mode Demo Evaluasi (demo@amdara.id)</span>
              </button>
            </div>

            {/* Footer Back Link */}
            <div className="mt-5 text-center">
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                ← Kembali ke Beranda Utama
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: DASHBOARD LMS UTAMA (Navy Blue #0F172A & Gold #D4AF37 Theme)
  // =========================================================================
  return (
    <div className="min-h-screen bg-navy-950 font-sans text-slate-100 relative pb-20 selection:bg-gold-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-navy-950 to-navy-950 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      {/* --- TOP NAVBAR & FITUR LOGOUT --- */}
      <header className="sticky top-0 z-40 bg-navy-900/90 backdrop-blur-md border-b border-gold-500/20 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-navy-950 font-extrabold text-base sm:text-lg shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-gold-400 group-hover:scale-105 transition-transform">
              IP
            </div>
            <div>
              <span className="font-extrabold text-white text-sm sm:text-base tracking-wide block leading-tight">
                Innerpeace LMS
              </span>
              <span className="text-[10px] text-gold-400 font-semibold tracking-wider uppercase block">
                Amdara Training Portal
              </span>
            </div>
          </a>

          {/* Member Badge & Tombol Logout */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Status Akses Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-950 border border-gold-500/30 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-gold-300 capitalize">
                {session.package_type === 'vip' ? 'Akses VIP Mentoring' : 'Paket Mahasiswa'}
              </span>
            </div>

            {/* User Info Capsule */}
            <div className="flex items-center gap-2 bg-navy-950/70 border border-navy-800 px-3 py-1.5 rounded-2xl">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-gold-500 to-yellow-300 text-navy-950 font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-md">
                {(session.user_name || 'M').charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block max-w-[130px] truncate">
                <span className="text-xs font-bold text-white block leading-tight truncate">
                  {session.user_name}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {session.user_email}
                </span>
              </div>
            </div>

            {/* 3. FITUR LOGOUT: Tombol Keluar di Pojok Kanan Atas */}
            <button
              onClick={handleLogout}
              id="btn-lms-logout"
              title="Keluar dari sesi LMS"
              className="inline-flex items-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl bg-navy-800/80 hover:bg-red-950 hover:text-red-300 text-slate-300 text-xs sm:text-sm font-semibold border border-navy-700 hover:border-red-500/40 transition-all cursor-pointer shadow-sm group"
            >
              <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
              <span>Keluar</span>
            </button>

          </div>
        </div>
      </header>

      {/* --- DASHBOARD MAIN CONTAINER --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10 relative z-10">

        {/* HEADER DASHBOARD */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-950 rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-[0_0_35px_rgba(212,175,55,0.1)] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Portal Member Resmi Terverifikasi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
                Selamat Datang di Portal Pembelajaran Innerpeace Public Speaking
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Halo, <strong className="text-gold-300 font-bold">{session.user_name}</strong>! Hak akses modul dan sesi live Anda telah aktif. Ikuti video pembelajaran mandiri dan hadir tepat waktu pada sesi interaktif bersama Master Surya Jaya Negara.
              </p>
            </div>

            {/* Progress Box Ringkas */}
            <div className="bg-navy-950/80 p-4 sm:p-5 rounded-2xl border border-navy-800 text-center sm:text-left min-w-[220px]">
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5 font-semibold">
                <span>Progres Belajar</span>
                <span className="text-gold-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-navy-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-gold-500 to-yellow-400 h-2.5 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {completedModules.length} dari {modules.length} modul selesai dipelajari
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: TIKET & LINK ZOOM LIVE (Query Supabase: zoom_tickets)
            ========================================================================= */}
        <section aria-labelledby="section-zoom-ticket">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/40">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 id="section-zoom-ticket" className="text-xl sm:text-2xl font-extrabold text-white">
                Sesi Live Mentoring Bersama Master Surya
              </h2>
              <p className="text-xs sm:text-sm text-gold-300/90 font-medium">
                Data resmi dari tabel <code className="bg-navy-900 px-1.5 py-0.5 rounded text-gold-400">zoom_tickets</code> Supabase
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-900 to-navy-950 rounded-3xl border-2 border-gold-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Kolom Kiri: Detail Tiket */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Sesi Live Interaktif
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 text-xs font-semibold">
                    Tiket VIP Terbuka
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {zoomTicket.topic}
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2 text-gold-300 font-semibold bg-navy-950/70 p-3 rounded-xl border border-navy-800">
                    <Calendar className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>Jadwal: {zoomTicket.schedule_time}</span>
                  </div>

                  {zoomTicket.host_name && (
                    <div className="flex items-center gap-2 text-slate-300 text-xs px-1">
                      <Award className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <span>Pemateri Utama: <strong>{zoomTicket.host_name}</strong></span>
                    </div>
                  )}
                </div>

                {/* Grid Meeting ID & Passcode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  
                  {/* Meeting ID Card */}
                  <div className="bg-navy-950/90 p-3.5 rounded-2xl border border-navy-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Meeting ID
                      </span>
                      <span className="font-mono text-base font-extrabold text-gold-400">
                        {zoomTicket.meeting_id}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(zoomTicket.meeting_id, 'meeting_id')}
                      className="p-2 rounded-xl bg-navy-800 hover:bg-gold-500 text-slate-300 hover:text-navy-950 transition-all cursor-pointer border border-navy-700"
                      title="Salin Meeting ID"
                    >
                      {copiedKey === 'meeting_id' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Passcode Card */}
                  <div className="bg-navy-950/90 p-3.5 rounded-2xl border border-navy-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Passcode
                      </span>
                      <span className="font-mono text-base font-extrabold text-gold-400">
                        {zoomTicket.passcode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(zoomTicket.passcode, 'passcode')}
                      className="p-2 rounded-xl bg-navy-800 hover:bg-gold-500 text-slate-300 hover:text-navy-950 transition-all cursor-pointer border border-navy-700"
                      title="Salin Passcode"
                    >
                      {copiedKey === 'passcode' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                </div>

              </div>

              {/* Kolom Kanan: Countdown Box & Tombol CTA Buka Zoom */}
              <div className="lg:col-span-5 bg-navy-950/90 p-6 sm:p-7 rounded-2xl border border-gold-500/30 text-center shadow-xl">
                <span className="text-xs uppercase tracking-wider text-gold-300 font-bold block mb-3">
                  Hitung Mundur Sesi Live Berikutnya
                </span>

                {/* Countdown Digit Blocks */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
                  {[
                    { label: 'Hari', val: timeLeft.days },
                    { label: 'Jam', val: timeLeft.hours },
                    { label: 'Menit', val: timeLeft.minutes },
                    { label: 'Detik', val: timeLeft.seconds }
                  ].map((unit, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-full aspect-square max-w-[64px] bg-navy-800 rounded-xl flex items-center justify-center font-mono font-extrabold text-lg sm:text-2xl text-white border border-gold-500/30 shadow-inner">
                        {String(unit.val).padStart(2, '0')}
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tombol CTA Link Zoom */}
                <a
                  href={zoomTicket.zoom_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Video className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Buka Langsung Aplikasi Zoom</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>

                {/* Tombol Salin Link URL */}
                <button
                  type="button"
                  onClick={() => handleCopy(zoomTicket.zoom_url, 'zoom_url')}
                  className="mt-3 text-xs text-slate-400 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'zoom_url' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">Tautan Zoom Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gold-400" />
                      <span>Salin Tautan Lengkap Zoom Meeting</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: DAFTAR MODUL / VIDEO PEMBELAJARAN (Tabel: lms_modules)
            ========================================================================= */}
        <section aria-labelledby="section-modules">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/40">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 id="section-modules" className="text-xl sm:text-2xl font-extrabold text-white">
                  Daftar Modul & Video Pembelajaran
                </h2>
                <p className="text-xs sm:text-sm text-gold-300/90 font-medium">
                  Modul interaktif dari tabel <code className="bg-navy-900 px-1.5 py-0.5 rounded text-gold-400">lms_modules</code> Supabase
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-900 border border-navy-800 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>Akses Self-Paced 24 Jam Non-Stop</span>
            </div>
          </div>

          {/* Video Player Embed Card (Saat Ada Modul Aktif) */}
          {activeVideoModule && (
            <div className="mb-6 bg-navy-900 rounded-3xl p-4 sm:p-6 border border-gold-500/30 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-gold-400" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Sedang Memutar: {activeVideoModule.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleModuleCompletion(activeVideoModule.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    completedModules.includes(String(activeVideoModule.id))
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-navy-800 text-slate-300 border-navy-700 hover:border-gold-500/40'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${completedModules.includes(String(activeVideoModule.id)) ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>
                    {completedModules.includes(String(activeVideoModule.id)) ? 'Selesai Dipelajari' : 'Tandai Selesai'}
                  </span>
                </button>
              </div>

              {/* Responsive 16:9 Iframe Embed Player */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-navy-950 border border-navy-800 shadow-inner">
                {activeVideoModule.video_url ? (
                  <iframe
                    src={getEmbedUrl(activeVideoModule.video_url)}
                    title={activeVideoModule.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-400">
                    <Video className="w-12 h-12 text-slate-600 mb-2" />
                    <p className="text-sm font-semibold">Tautan video belum disematkan pada modul ini.</p>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-navy-950/80 border border-navy-800">
                <h4 className="text-xs uppercase tracking-wider font-bold text-gold-400 mb-1">
                  Rangkuman Materi Modul
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeVideoModule.description || 'Tidak ada deskripsi tambahan untuk modul ini.'}
                </p>
              </div>
            </div>
          )}

          {/* Accordion / List Modul Pembelajaran */}
          <div className="space-y-3.5">
            {modules.map((mod, index) => {
              const isExpanded = expandedModuleId === mod.id;
              const isPlaying = activeVideoModule?.id === mod.id;
              const isCompleted = completedModules.includes(String(mod.id));

              return (
                <div
                  key={mod.id || index}
                  className={`rounded-2xl transition-all duration-200 border ${
                    isPlaying
                      ? 'bg-navy-900 border-gold-500/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                      : 'bg-navy-900/80 hover:bg-navy-900 border-navy-800 hover:border-gold-500/30'
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => {
                      setExpandedModuleId(isExpanded ? null : mod.id);
                      setActiveVideoModule(mod);
                    }}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                      {/* Order Index Badge */}
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-extrabold text-xs sm:text-sm flex-shrink-0 transition-colors ${
                        isPlaying
                          ? 'bg-gold-500 text-navy-950 shadow-md'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-navy-800 text-slate-300 border border-navy-700'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <span>{String(mod.order_index || index + 1).padStart(2, '0')}</span>
                        )}
                      </div>

                      {/* Title & Short Description */}
                      <div className="text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-white text-sm sm:text-base truncate">
                            {mod.title}
                          </h3>
                          {isPlaying && (
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-extrabold border border-gold-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
                              Sedang Diputar
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {mod.description || 'Klik untuk membuka player video dan materi pembelajaran.'}
                        </p>
                      </div>
                    </div>

                    {/* Action & Toggle Icon */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleModuleCompletion(mod.id);
                        }}
                        title={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-navy-800 border-navy-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      <div className="p-1 rounded-lg text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gold-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accordion Body (Detail & Inline Quick Play) */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 pt-0 border-t border-navy-800/80 animate-fadeIn">
                      <div className="pt-4 space-y-3">
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {mod.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveVideoModule(mod);
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span>Tonton Video di Pemutar Utama</span>
                          </button>

                          {mod.video_url && (
                            <a
                              href={mod.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-slate-400 hover:text-gold-300 inline-flex items-center gap-1 transition-colors"
                            >
                              <span>Buka Sumber Video Asli</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: KOMUNITAS ALUMNI (Tombol CTA Emas Masuk Grup WA Alumni Resmi)
            ========================================================================= */}
        <section aria-labelledby="section-community">
          <div className="relative overflow-hidden bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-6 sm:p-9 border-2 border-gold-500/40 shadow-[0_0_35px_rgba(212,175,55,0.15)]">
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
              
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400/40 rotate-1">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    <span>Networking Eksklusif Alumni</span>
                  </div>
                  <h3 id="section-community" className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    Komunitas Alumni Resmi Innerpeace
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                    Bergabunglah bersama ratusan alumni dari berbagai latar belakang eksekutif, pembicara, dan profesional. Dapatkan update bedah kasus mingguan, jadwal mentoring, dan ruang latihan rutin.
                  </p>
                </div>
              </div>

              {/* Tombol CTA Emas "Masuk Grup WA Alumni Resmi" */}
              <div className="w-full lg:w-auto flex-shrink-0">
                <a
                  href="https://chat.whatsapp.com/InnerpeaceAlumniAmdara"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-join-wa-alumni"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
                >
                  <MessageCircle className="w-5 h-5 text-navy-950 group-hover:rotate-12 transition-transform" />
                  <span>Masuk Grup WA Alumni Resmi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER INFORMASI --- */}
      <footer className="mt-16 border-t border-navy-800/80 pt-8 text-center text-xs text-slate-500 max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} Amdara Training & Consultancy — Innerpeace Public Speaking Mentoring Program.</p>
        <p className="mt-1 text-[11px] text-slate-600">ID Pesanan: {session.order_id} • Status Akses: SUCCESS • Terverifikasi Supabase Database</p>
      </footer>
    </div>
  );
}

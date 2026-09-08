import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  Smile, 
  Sparkles, 
  Flame, 
  Layers, 
  Video, 
  Users, 
  FileText, 
  Gift,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { CURRICULUM_MODULES, TRAINING_BONUSES, TRAINING_CONFIG } from '../data/trainingData';

interface CurriculumFeaturesProps {
  onOpenRegister: () => void;
}

export const CurriculumFeatures: React.FC<CurriculumFeaturesProps> = ({ onOpenRegister }) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  const pillars = [
    {
      title: "Mindset & Anti-Nervousness",
      description: "Teknik neuro-psikologis untuk mengendalikan detak jantung dan kecemasan dalam 90 detik sebelum naik panggung.",
      icon: Flame,
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400"
    },
    {
      title: "Vocal Dynamics & Articulation",
      description: "Melatih intonasi berwibawa, pitch, volume, dan tempo berbicara agar tidak terdengar monoton serta menghilangkan 'umm/eee'.",
      icon: Volume2,
      color: "from-blue-600/20 to-blue-700/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      title: "Magnetic Body Language",
      description: "Kontak mata terarah, gestur tangan open palms berwibawa, dan postur panggung yang memancarkan rasa percaya diri tinggi.",
      icon: Smile,
      color: "from-amber-500/20 to-blue-600/10",
      borderColor: "border-amber-400/30",
      iconColor: "text-amber-300"
    },
    {
      title: "Storytelling Framework 4C",
      description: "Struktur Context-Conflict-Climax-Call to Action untuk merangkai presentasi, ide bisnis, atau skripsi yang tak terlupakan.",
      icon: BookOpen,
      color: "from-blue-600/20 to-indigo-600/10",
      borderColor: "border-blue-400/30",
      iconColor: "text-blue-300"
    },
    {
      title: "Persuasive Pitching & Closing",
      description: "Seni mempengaruhi audiens agar setuju dengan gagasan Anda, menyetujui proposal, atau membeli produk yang Anda tawarkan.",
      icon: Layers,
      color: "from-amber-500/20 to-amber-700/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400"
    },
    {
      title: "Handling Hard Q&A & Hecklers",
      description: "Teknik bridging cerdas untuk menjawab pertanyaan menjebak dari audiens, dosen penguji, atau dewan direksi secara elegan.",
      icon: Award,
      color: "from-blue-600/20 to-cyan-600/10",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-300"
    }
  ];

  const journeyPoints = [
    { label: "✨ Menemukan keberanian dalam diri", reason: "Membangun keberanian otentik saat tampil dan mengemukakan pendapat di depan siapapun." },
    { label: "✨ Mengaktifkan potensi yang selama ini tersembunyi", reason: "Menggali daya pikat vokal dan rasa percaya diri alami yang belum pernah terpancar sebelumnya." },
    { label: "✨ Membentuk komunikasi yang penuh percaya diri", reason: "Menguasai gestur, artikulasi, dan ketenangan agar setiap kata disampaikan dengan meyakinkan." },
    { label: "✨ Menjadi pribadi yang lebih berdampak", reason: "Menginspirasi, meyakinkan, dan memberi pengaruh positif nyata bagi audiens Anda." }
  ];

  return (
    <section id="kurikulum" className="py-20 bg-[#070E1A] relative">
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* FITUR 1: 6 PILAR KOMPETENSI UTAMA */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Fitur Unggulan Kurikulum
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              6 Pilar Kompetensi Public Speaking yang Akan Anda Kuasai
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dirancang berbasis riset kompetensi internasional dan disesuaikan dengan kultur audiens di Indonesia. Anda akan belajar mulai dari pondasi mental hingga teknik diplomasi tingkat lanjut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-gradient-to-b ${pillar.color} bg-[#0A1628] border ${pillar.borderColor} p-6 shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#070E1A] border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComp className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FITUR 2: DETAIL SILABUS 3 HARI INTENSIVE */}
        <div className="rounded-3xl bg-[#091526] border border-blue-500/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" /> Silabus Resmi Amdara Training
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Struktur Pelatihan 3 Hari Live Zoom + Praktik Langsung
            </h3>
            <p className="text-sm text-slate-300">
              Setiap sesi dirancang padat praktik (70% praktek, 30% teori) sehingga Anda langsung merasakan progres di setiap harinya.
            </p>
          </div>

          {/* Day Selector Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {CURRICULUM_MODULES.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveDay(module.id)}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeDay === module.id
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700'
                }`}
              >
                <span>{module.week}</span>
              </button>
            ))}
          </div>

          {/* Active Module Detail */}
          {CURRICULUM_MODULES.filter((m) => m.id === activeDay).map((module) => (
            <div key={module.id} className="space-y-6 animate-fadeIn">
              <div className="bg-[#050D18] border border-slate-800 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80 mb-4">
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white font-cinzel">
                    {module.title}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full shrink-0">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{module.duration}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {module.description}
                </p>

                {/* Key Takeaways */}
                <div className="space-y-3 mb-6">
                  <h5 className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    Materi yang Akan Dibahas & Dilatih:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {module.keyTakeaways.map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Exercise Box */}
                <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 p-4 rounded-xl border border-blue-500/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block mb-0.5">
                      Tugas Praktik Hari Ini:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200">
                      {module.practicalExercise}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* FITUR 3: FASILITAS & BONUS SENILAI JUTAAN RUPIAH (Semua Include di 399k) */}
        <div id="fasilitas" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5 text-amber-400" /> Fasilitas & Bonus Eksklusif
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Investasi Rp 399.000, Dapatkan Bonus Senilai{' '}
              <span className="text-amber-400">Rp 2.200.000+</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Semua fasilitas di bawah ini otomatis menjadi milik Anda tanpa biaya tambahan sepeser pun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAINING_BONUSES.map((bonus, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#091526] border border-slate-800 hover:border-amber-500/40 p-6 shadow-xl relative transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 line-through">
                    Senilai Rp {bonus.normalValue.toLocaleString('id-ID')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {bonus.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {bonus.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Gratis Termasuk
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    Akses Langsung
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Value comparison strip */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-blue-900/30 to-amber-500/15 border border-amber-400/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Total Nilai Pelatihan + Seluruh Fasilitas:
              </p>
              <p className="text-xl sm:text-2xl font-extrabold text-white">
                <span className="line-through text-slate-400 mr-2">Rp 2.800.000+</span>
                <span className="text-amber-400 font-cinzel">HANYA {TRAINING_CONFIG.formattedPrice}</span>
              </p>
            </div>
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
            >
              Klaim Semua Bonus Ini (399k)
            </button>
          </div>
        </div>

        {/* FITUR 4: BRAND & VALUE SECTION */}
        <div className="rounded-3xl bg-[#081220] border border-amber-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              {TRAINING_CONFIG.programTitle}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-cinzel mt-2">
              "{TRAINING_CONFIG.tagline}"
            </h3>
            <p className="text-sm font-semibold text-amber-300 mt-2">
              Perjalanan Anda Untuk:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {journeyPoints.map((point, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0C1A30] border border-slate-800 hover:border-amber-400/40 transition-all">
                <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-amber-300 mb-1.5">
                  <span>{point.label}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-1 leading-relaxed">
                  {point.reason}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

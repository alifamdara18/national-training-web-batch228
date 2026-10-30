import React from 'react';
import { 
  Sparkles, 
  Target, 
  Rocket, 
  Mic, 
  Users, 
  Quote, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  initials: string;
  quote: string;
  highlight?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Qurrota A'Yunin",
    initials: "QA",
    highlight: "Bukan Sekadar Training, Tapi Cerita Baru",
    quote: "Setelah saya mengikuti Innerpeace Public Speaking malam ini, saya semakin ingin melampaui teman-teman saya. Materi besi ini tidak boleh dibuang sia-sia. Setiap kali masuk Zoom, serasa disambut pintu kesuksesan dengan lagu-lagu ceria AMDARA 'Bukan Sekadar Training, Tapi Cerita Baru'."
  },
  {
    name: "El Malikha Indah",
    initials: "EI",
    highlight: "Terbang Tanpa Sayap & Damai",
    quote: "Saya merasakan sangat damai seperti sedang terbang tanpa sayap di angkasa. Ternyata sepengaruh itu belajar Innerpeace Public Speaking ✨. Kondisi saya semakin ringan tanpa beban, bisa bahagia dan damai tanpa syarat. Terima kasih Master Surya Jaya Negara!"
  },
  {
    name: "Umma Rohmi",
    initials: "UR",
    highlight: "Ngalir Seperti Air Tanpa Blibet",
    quote: "Saya merasakan lebih damai, bahagia, lebih percaya diri dan lancar, ngalir seperti air tanpa blibet. Audience hidup dan semua perhatian menuju ke saya. Ini adalah pengalaman pertama yang sangat menyenangkan di AMDARA."
  },
  {
    name: "Nitaa",
    initials: "NT",
    highlight: "Mudah Dipahami & The Best Coach",
    quote: "Ternyata sangat asyik dan menyenangkan! Penyampaian materinya mudah dipahami, tidak terasa membosankan. Pokoknya the best Coach! Terima kasih sudah berbagi ilmu dan menghadirkan suasana yang menyenangkan."
  },
  {
    name: "Siti Rodliyah",
    location: "Grobogan",
    initials: "SR",
    highlight: "Menyadari Potensi Dari Dalam Diri",
    quote: "Saya merasa lebih tenang dan lebih damai. Saya mulai menyadari ternyata punya potensi dari dalam diri yang harus dikelola dengan baik. Bismillah, siap bertransformasi!"
  },
  {
    name: "Rofiqoh 717",
    initials: "RF",
    highlight: "Bahagia & Penuh Semangat",
    quote: "Saya sangat merasakan bahagia banget karena pembawaan Master sangat asik & bersemangat. Walaupun banyak 'tampolan' buat saya, tapi saya dengarnya malah senyum-senyum karena kebawa suasana. Makasih Master!"
  },
  {
    name: "Fiteyy",
    initials: "FY",
    highlight: "Lebih Percaya Diri & Berani Salah",
    quote: "Seru bangettt, tambah bahagia, banyak senyum, lebih percaya diri, berani salah karena masih belajar. Public speaking sangat penting bahkan jadi kebutuhan sehari-hari!"
  },
  {
    name: "Nursiti",
    location: "Bekasi",
    initials: "NS",
    highlight: "Serasa Terlahir Kembali",
    quote: "Saya merasakan seperti terlahir kembali dan siap untuk melangkah ke depan. Sangat damai, lebih bahagia, dan lebih percaya diri. Terima kasih Master Surya dan Amdara."
  }
];

const pillars = [
  {
    icon: Target,
    title: "Metode Innerpeace Unique",
    subtitle: "Akar Masalah Mental",
    description: "Mengatasi rasa gugup dari akar masalah mental, bukan sekadar teori hafalan teknis.",
    gradient: "from-amber-400 to-yellow-500"
  },
  {
    icon: Rocket,
    title: "Suasana Kelas Ceria & Hidup",
    subtitle: "Energi Positif & Bahagia",
    description: "Setiap sesi diawali dan dihidupkan dengan lagu-lagu motivasi khas Amdara yang membangun energi percaya diri.",
    gradient: "from-yellow-400 to-gold-500"
  },
  {
    icon: Mic,
    title: "Pendampingan Langsung Master Trainer",
    subtitle: "Master Surya Jaya Negara",
    description: "Diarahkan dan dibimbing langsung oleh Master Surya Jaya Negara dengan evaluasi komprehensif.",
    gradient: "from-gold-400 to-amber-500"
  },
  {
    icon: Users,
    title: "Komunitas Alumni Solid",
    subtitle: "Networking & Support Group",
    description: "Akses diskusi, ruang latihan berkala, dan jejaring suportif bersama ribuan alumni di seluruh Indonesia.",
    gradient: "from-yellow-500 to-gold-600"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="w-full relative py-20 lg:py-28 bg-navy-950 text-slate-100 overflow-hidden border-t border-navy-800">
      {/* Background Ambient Glows & Stardust Texture */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-b from-gold-500/10 via-navy-900/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION HEADLINE                                                       */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 font-extrabold text-xs uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>💡 TRANSFORMATION & REASON</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Mengapa Harus Pilih <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-400 to-gold-500 drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]">
              Innerpeace Public Speaking?
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed">
            Bukan sekadar belajar teknik bicara, tetapi transformasi pola pikir dan kedamaian diri saat tampil di hadapan publik.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. 4 PILAR KEUNGGULAN UTAMA                                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 lg:mb-28">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-7 bg-navy-900/80 border border-gold-500/20 hover:border-gold-500/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent group-hover:via-gold-400 transition-all" />

                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-gold-400 transition-all shadow-inner">
                    <IconComponent className="w-6 h-6 text-gold-400" />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400/90 block mb-1">
                    {pillar.subtitle}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-200 transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-navy-800 flex items-center gap-1.5 text-xs text-gold-400/80 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                  <span>Keunggulan Teruji</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. TESTIMONI ALUMNI HEADER & GRID                                         */}
        {/* ========================================================================= */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-gold-500/30 text-gold-300 text-xs font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5 text-gold-400" />
            <span>Kisah Nyata Alumni Kami</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Apa Kata Mereka Yang Sudah Merasakan Perubahannya?
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Untaian kesan jujur dari para alumni yang berhasil menemukan ketenangan, keberanian, dan kepercayaan diri baru bersama Amdara.
          </p>
        </div>

        {/* 8 Quote Cards in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-navy-900/90 to-navy-950/90 border border-gold-500/25 hover:border-gold-500/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.18)] flex flex-col justify-between"
            >
              {/* Background Quote Watermark */}
              <div className="absolute top-4 right-4 text-gold-500/10 group-hover:text-gold-500/20 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 rotate-180" />
              </div>

              <div>
                {/* 5-Star Rating Bar */}
                <div className="flex items-center gap-1 text-gold-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  ))}
                  <span className="text-[10px] font-bold text-gold-300/80 ml-1.5 px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/20">
                    5.0
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic relative z-10 mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info & Avatar Footer */}
              <div className="pt-4 border-t border-navy-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/30 to-gold-600/10 border border-gold-500/40 flex items-center justify-center font-bold text-gold-300 text-xs shadow-md shrink-0">
                  {item.initials}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-white text-sm truncate leading-tight group-hover:text-gold-300 transition-colors">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">
                      {item.location ? `Alumni (${item.location})` : 'Alumni Terverifikasi'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 4. INTEGRASI CTA BUTTON                                                   */}
        {/* ========================================================================= */}
        <div className="text-center pt-4">
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-gold-500/30 via-yellow-500/20 to-gold-500/30 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center gap-3 py-4 sm:py-5 px-8 sm:px-12 bg-gradient-to-r from-gold-500 via-yellow-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 rounded-2xl font-black text-base sm:text-xl shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all hover:scale-105 active:scale-95 group"
            >
              <span>Siap Merasakan Transformasinya? Pilih Paket Belajar Sekarang</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-400 font-medium">
            ✨ Bimbingan langsung bersama Master Surya Jaya Negara • Garansi Kepuasan 100%
          </p>
        </div>

      </div>
    </section>
  );
}

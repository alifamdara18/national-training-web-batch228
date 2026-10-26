import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, XCircle } from 'lucide-react';

const PricingCards = () => {
  const [isCompare, setIsCompare] = useState(false);
  const [vipDuration, setVipDuration] = useState<'3bulan' | '1tahun'>('3bulan');

  const vipPrice = vipDuration === '3bulan' ? '1.400.000' : '2.800.000';
  const vipNormalPrice = vipDuration === '3bulan' ? '2.500.000' : '5.000.000';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">

      {/* <div className="flex flex-col items-center justify-center mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 text-center tracking-tight">
          Investasi untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">Dirimu</span>
        </h2>
        <p className="text-slate-300 text-center max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Bukan sekadar untuk belajar berbicara. Tetapi untuk memberi ruang kepada dirimu sendiri agar lebih berani muncul. Lebih tenang. Lebih percaya diri. Dan lebih siap menyampaikan siapa dirimu kepada dunia.
        </p>
      </div> */}

      {!isCompare ? (
        <div className="flex justify-center items-center max-w-xl mx-auto mt-4">
          {/* Card: Basic / Mahasiswa */}
          <div className="w-full bg-navy-800/80 rounded-3xl p-8 sm:p-10 border border-navy-700 hover:border-gold-500/30 transition-all duration-300 relative group shadow-2xl flex flex-col">
            <div className="absolute -top-4 right-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-gold-300 bg-navy-950 rounded-full border border-gold-500/30 shadow-lg">
                🚀 Solusi Praktis & Hemat Tanpa Zoom
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 mt-2">Paket Mahasiswa / Mandiri</h3>
            <p className="text-slate-300 text-sm mb-6 min-h-[40px] font-medium">Solusi Praktis & Hemat Tanpa Zoom — Belajar fleksibel kapan saja tanpa mengganggu jadwal perkuliahan atau kerja.</p>

            <div className="mb-8">
              <span className="text-slate-500 line-through text-sm font-medium">Harga Normal Rp299.000</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-white">Rp</span>
                <span className="text-5xl font-extrabold text-white tracking-tight">49.000</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "🏆 5 x Training , 3 x Via Zoom 2x Konsultasi",
                "🏆 5 SERTIFIKAT Nasional beserta Namanya",
                "🏆 Akses Audio Video Recording",
                "🏆 Asyik, interaktif, & efektif",
                "🏆 Jaminan Bisa/Gratis Mengulang",
                "🏆 Bertemu relasi Istimewa",
                "🏆 Dilatih oleh trainer motivator nasional ",
                "🏆 Peluang untuk Jadi MC",
                "🏆 Peluang untuk jadi pembicara",
                "🏆 Praktek dengan para pakar",
              ].map((fitur, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5 opacity-80" />
                  <span>{fitur}</span>
                </li>
              ))}
            </ul>

            <a href="/checkout?plan=mahasiswa" className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-transparent border-2 border-gold-500/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 rounded-xl font-bold transition-all hover:bg-gold-500/10 active:scale-95 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              Daftar Paket Rp49rb <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      ) : (
        /* Comparison Table View */
        <div className="max-w-4xl mx-auto bg-navy-900/60 rounded-3xl border border-navy-700/50 backdrop-blur-md overflow-hidden shadow-2xl mt-4 animate-in fade-in zoom-in-95 duration-300">
          {/* <div className="grid grid-cols-3 gap-0 border-b border-navy-700 bg-navy-950/80 p-6">
            <div className="col-span-1 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white">Perbandingan</h3>
              <p className="text-xs text-slate-400 mt-1">Pilih fitur yang Anda butuhkan</p>
            </div>
            <div className="col-span-1 text-center flex flex-col justify-end">
              <h4 className="font-bold text-slate-200">Satu Langkah Awal</h4>
              <p className="text-gold-400 font-bold mt-2 text-lg">Rp49.000</p>
            </div>
            <div className="col-span-1 text-center relative flex flex-col justify-end">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="px-3 py-1 text-[10px] font-extrabold text-navy-950 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)] tracking-wider">
                  RECOMMENDED
                </span>
              </div>
              <h4 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mt-6">VIP Mentoring</h4>
              <p className="text-gold-400 font-bold mt-2 text-lg">Mulai Rp1.4Jt</p>
            </div>
          </div> */}

          {/* <div className="divide-y divide-navy-800/50">
            {[
              { title: "Akses Rekaman Video & Modul LMS", basic: true, vip: true },
              { title: "E-Sertifikat Kelulusan Resmi", basic: true, vip: true },
              { title: "Akses Komunitas Diskusi Global", basic: true, vip: true },
              { title: "Akses Live Zoom Meeting Interaktif", basic: false, vip: true },
              { title: "Pendampingan Mentoring Intensif", basic: false, vip: true },
              { title: "Tanya Jawab Personal", basic: false, vip: true },
              { title: "100% Money-Back Guarantee", basic: false, vip: true },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-0 p-5 hover:bg-navy-800/40 transition-colors">
                <div className="col-span-1 text-sm text-slate-300 flex items-center pr-4 font-medium">{row.title}</div>
                <div className="col-span-1 flex items-center justify-center">
                  {row.basic ? <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-sm" /> : <XCircle className="w-5 h-5 text-slate-600/50" />}
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {row.vip ? (
                    <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                      <CheckCircle2 className="w-5 h-5 text-gold-400 drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]" />
                    </div>
                  ) : <XCircle className="w-5 h-5 text-slate-600/50" />}
                </div>
              </div>
            ))}
          </div> */}

          {/* <div className="grid grid-cols-3 gap-0 p-6 bg-navy-950/60 border-t border-navy-700">
            <div className="col-span-1"></div>
            <div className="col-span-1 px-4 text-center">
              <a href="/checkout?plan=mahasiswa" className="inline-flex items-center justify-center py-3 px-6 bg-transparent border border-gold-500/40 text-gold-400 rounded-xl text-sm font-bold hover:bg-gold-500/10 transition-all w-full active:scale-95">
                Pilih Basic
              </a>
            </div>
            <div className="col-span-1 px-4 text-center">
              <a href={`/checkout?plan=vip&duration=${vipDuration}`} className="inline-flex items-center justify-center py-3 px-6 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-xl text-sm font-extrabold hover:from-gold-400 hover:to-gold-500 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] w-full active:scale-95 hover:scale-[1.02]">
                Pilih VIP
              </a>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PricingCards;

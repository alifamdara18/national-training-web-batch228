import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const PhilosophySection = () => {
  return (
    <section className="w-full py-20 bg-navy-900/50 border-y border-navy-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Karena Public Speaking <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Bukan Hanya Tentang Bicara</span>
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Public speaking bukan sekadar teknik. Bukan hanya soal suara keras. Bukan tentang terlihat paling hebat. Bagi kami, public speaking dimulai dari satu hal yang jauh lebih dalam: <strong className="text-gold-400 font-bold">Damai dengan diri sendiri.</strong>
          </p>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mt-4">
            Ketika pikiran lebih tenang… kata-kata menjadi lebih jernih. Ketika kita tidak lagi sibuk melawan rasa takut… kehadiran kita mulai terasa. Dan ketika kita berani menjadi diri sendiri… orang lain pun lebih mudah mempercayai kita.
          </p>
        </div>

        <div className="bg-navy-950 rounded-3xl p-8 sm:p-12 border border-gold-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Heart size={200} className="text-gold-500" />
          </div>
          
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 mb-8 tracking-widest text-center">
            INNERPEACE PUBLIC SPEAKING
          </h3>
          <p className="text-white text-center text-lg mb-8 font-medium">Sebuah ruang belajar untuk membantu kamu menemukan:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {[
              "Ketenangan sebelum berbicara",
              "Keberanian untuk tampil",
              "Suara yang lebih kuat",
              "Cara berbicara yang lebih natural",
              "Kemampuan menyampaikan pesan dengan hati",
              "Kepercayaan diri tanpa harus menjadi orang lain"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Sparkles className="text-gold-500 w-5 h-5 shrink-0" />
                <span className="text-slate-200 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-8 border-t border-navy-800 relative z-10">
            <p className="text-slate-300 text-lg leading-relaxed italic">
              "Di sini kamu tidak dituntut langsung hebat. Kamu hanya diajak untuk mulai. Pelan-pelan. Satu latihan. Satu keberanian. Satu perubahan kecil. Sampai suatu hari kamu sadar: <strong className="text-gold-400 not-italic">Ternyata aku bisa.</strong>"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

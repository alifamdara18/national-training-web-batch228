import React from 'react';

const EmotionalHook = () => {
  return (
    <section className="w-full py-16 px-4 bg-navy-950 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Mungkin Selama Ini kakak <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Bukan Tidak Bisa Bicara…</span>
        </h2>
        <div className="space-y-4 text-slate-300 text-lg sm:text-xl leading-relaxed font-medium">
          <p>Mungkin Kakak hanya belum menemukan ketenangan untuk mengungkapkan isi hati.</p>
          <p>Menahan takut salah. Menahan rasa gugup. Menahan kepercayaan diri. Bahkan terlalu sibuk memikirkan bagaimana orang lain akan menilai Kakak.</p>
          <p className="text-white mt-6 pt-4 border-t border-gold-500/20">
            Padahal, Kakak punya sesuatu yang berharga untuk disampaikan.
            <span className="text-gold-400 font-semibold">Ada cerita yang menginspirasi. Ada pengalaman yang bermakna. Ada ide yang luar biasa. Ada potensi yang selama ini belum sepenuhnya berani ditunjukkan.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmotionalHook;

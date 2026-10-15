import React from 'react';

const EmotionalHook = () => {
  return (
    <section className="w-full py-16 px-4 bg-navy-950 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
          Mungkin Selama Ini Kamu <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">Bukan Tidak Bisa Bicara…</span>
        </h2>
        <div className="space-y-4 text-slate-300 text-lg sm:text-xl leading-relaxed font-medium">
          <p>Mungkin kamu hanya terlalu sering menahan diri.</p>
          <p>Menahan takut salah. Menahan rasa tidak percaya diri. Menahan pikiran tentang bagaimana orang lain menilaimu.</p>
          <p className="text-white mt-6 pt-4 border-t border-gold-500/20">
            Padahal di dalam dirimu… ada banyak hal yang sebenarnya ingin disampaikan. Ada cerita. Ada pengalaman. Ada ide. <span className="text-gold-400 font-semibold">Ada suara yang layak didengar.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmotionalHook;

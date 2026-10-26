import React from 'react';

const SelfReflection = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-navy-950 to-navy-900 border-t border-navy-800">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
          Bahkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">bisa memancarkan energi positif pada seluruh audiens</span>
        </h2>

        <div className="space-y-6 text-slate-300 text-lg sm:text-xl leading-relaxed mb-12">
          <p>Kalau rasa takut itu sedikit berkurang… apa yang ingin Kakak lakukan?</p>
          <p className="font-medium text-gold-300">
            Berani presentasi? Berani menyampaikan pendapat? Berani membuat konten? Berani bicara di depan banyak orang? Berani menjadi leader? Atau mungkin… hanya ingin bisa mengatakan apa yang ada di dalam hati dengan lebih percaya diri?
          </p>
          <p className="text-white">Apa pun jawabannya… semuanya bisa dimulai dari satu langkah kecil.</p>
        </div>

        <div className="bg-navy-800/50 rounded-2xl p-8 sm:p-10 border border-gold-500/20 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4">Kakak Tidak Harus Menunggu Sampai Siap</h3>
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            Kadang kita menunggu percaya diri terlebih dahulu. Padahal percaya diri justru lahir setelah kita berani mencoba.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            Jadi Kakak tidak perlu datang sebagai orang yang sudah hebat. <strong className="text-gold-400">Datanglah sebagai dirimu sekarang.</strong> Dengan rasa gugupmu. Dengan keraguanmu. Dengan semua cerita yang Kakak bawa. Dan izinkan dirimu untuk bertumbuh.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SelfReflection;

import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Quote, Sparkles, Filter, X } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data/trainingData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem('amdara_testimonials');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TESTIMONIALS;
  });

  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [modalOpen, setModalOpen] = useState(false);

  // New review form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    companyOrCampus: '',
    tag: 'Profesional' as 'Profesional' | 'Mahasiswa' | 'Entrepreneur' | 'Pendidik',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('amdara_testimonials', JSON.stringify(testimonials));
    } catch (e) {
      console.error(e);
    }
  }, [testimonials]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) return;

    const newTesti: Testimonial = {
      id: `testi-${Date.now()}`,
      name: formData.name,
      role: formData.role || 'Peserta Training',
      companyOrCampus: formData.companyOrCampus || 'Amdara Alumni Network',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      rating: formData.rating,
      comment: formData.comment,
      date: 'Baru Saja',
      tag: formData.tag,
      verified: true,
    };

    setTestimonials([newTesti, ...testimonials]);
    setFormData({
      name: '',
      role: '',
      companyOrCampus: '',
      tag: 'Profesional',
      rating: 5,
      comment: '',
    });
    setModalOpen(false);
  };

  const filtered = activeFilter === 'Semua' 
    ? testimonials 
    : testimonials.filter((t) => t.tag === activeFilter);

  return (
    <section id="testimoni" className="py-20 bg-[#070E1A] relative border-t border-slate-800">
      
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Pengalaman Nyata Alumni
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Apa Kata Mereka Setelah Mengikuti{' '}
              <span className="gold-gradient-text font-cinzel">Amdara Training?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Dari yang awalnya gemetar di podium hingga kini dipercaya menjadi pembicara dan pemimpin presentasi di instansi masing-masing.
            </p>
          </div>

          {/* Action button to add review for later */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-800 text-amber-300 border border-amber-400/40 hover:border-amber-400 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>Tulis Ulasan Alumni</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-500" /> Filter:
          </span>
          {['Semua', 'Profesional', 'Mahasiswa', 'Entrepreneur', 'Pendidik'].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tag
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-gradient-to-br from-[#0C1A30] to-[#081220] border border-slate-800 hover:border-amber-500/40 p-6 sm:p-7 shadow-xl relative flex flex-col justify-between group transition-all"
            >
              {/* Decorative Quote mark */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-700/30 group-hover:text-amber-500/20 transition-colors pointer-events-none" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-semibold text-slate-400">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {item.role} • <span className="text-slate-300">{item.companyOrCampus}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-500/30">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Future Testimonial Placeholder Banner */}
        <div className="mt-10 rounded-2xl bg-[#091526] border border-dashed border-amber-400/40 p-6 text-center space-y-2">
          <Sparkles className="w-6 h-6 text-amber-400 mx-auto" />
          <h4 className="text-sm sm:text-base font-bold text-white">
            Slot Testimoni Berikutnya adalah Cerita Sukses Anda!
          </h4>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Bergabunglah dengan ratusan alumni National Public Speaking Amdara Training Batch ini dan rasakan perubahan percaya diri Anda sejak hari pertama.
          </p>
        </div>

      </div>

      {/* Add Review / Testimonial Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0B182B] border border-amber-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-amber-400" />
                Tulis Ulasan & Testimoni Alumni
              </h3>
              <p className="text-xs text-slate-400">
                Bagikan pengalaman atau impresi Anda tentang Amdara Training.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Farhan Pratama, S.Kom."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#070E1A] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Profesi / Jabatan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Marketing Lead"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#070E1A] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#070E1A] border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Profesional">Profesional</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Pendidik">Pendidik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Instansi / Perusahaan / Kampus
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Telkom Indonesia / ITB"
                  value={formData.companyOrCampus}
                  onChange={(e) => setFormData({ ...formData, companyOrCampus: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#070E1A] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Rating Bintang
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, rating: num })}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          num <= formData.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Testimoni / Ulasan *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ceritakan perubahan apa yang Anda rasakan setelah belajar di Amdara Training..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#070E1A] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600"
                >
                  Simpan Testimoni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

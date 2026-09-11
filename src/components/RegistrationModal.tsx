import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  ArrowRight, 
  PhoneCall, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck,
  Building,
  User,
  Mail,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRAINING_CONFIG } from '../data/trainingData';
import { RegistrationFormData, TicketData } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    whatsapp: '',
    email: '',
    city: '',
    occupation: 'Karyawan / Profesional',
    motivation: 'Ingin lancar presentasi dan percaya diri',
    paymentMethod: 'QRIS',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp || !formData.email) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5B84B', '#2563EB', '#38BDF8', '#FFFFFF']
      });
    } catch (err) {
      console.error(err);
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newTicket: TicketData = {
      ticketNumber: `AMD-NPS-${randomNum}`,
      fullName: formData.fullName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      trainingName: `${TRAINING_CONFIG.name} - ${TRAINING_CONFIG.programTitle}`,
      price: TRAINING_CONFIG.formattedPrice,
      paymentMethod: formData.paymentMethod,
      issueDate: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      batchDate: TRAINING_CONFIG.startDate
    };

    setTicketData(newTicket);
    setIsSuccess(true);
  };

  const handleCopyTicket = () => {
    if (!ticketData) return;
    const text = `Konfirmasi Pendaftaran Amdara Training
Nama: ${ticketData.fullName}
No. Registrasi: ${ticketData.ticketNumber}
Program: ${ticketData.trainingName}
Total Biaya: ${ticketData.price}
Metode Pembayaran: ${ticketData.paymentMethod}
Jadwal: ${ticketData.batchDate}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waConfirmUrl = ticketData ? `https://wa.me/${TRAINING_CONFIG.contactWhatsapp}?text=${encodeURIComponent(
    `Halo Admin Amdara Training,\n\nSaya telah mendaftar ${ticketData.trainingName} seharga Rp 399.000.\n\n` +
    `No. Registrasi: ${ticketData.ticketNumber}\n` +
    `Nama: ${ticketData.fullName}\n` +
    `Email: ${ticketData.email}\n` +
    `Metode: ${ticketData.paymentMethod}\n\n` +
    `Mohon konfirmasi dan info tata cara pembayaran selanjutnya. Terima kasih!`
  )}` : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#0A1628] border border-amber-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Tutup formulir"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-400" /> Formulir Registrasi Resmi
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-cinzel">
                Pendaftaran {TRAINING_CONFIG.programTitle}
              </h3>
              <p className="text-xs text-slate-300">
                Amankan 1 dari {TRAINING_CONFIG.seatsRemaining} kursi terakhir dengan harga promo subsidi <strong className="text-amber-400">{TRAINING_CONFIG.formattedPrice}</strong>.
              </p>
            </div>

            {/* Price Badge Preview */}
            <div className="bg-[#06101E] border border-slate-800 rounded-xl p-3 flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Investasi All-In</span>
                <span className="text-lg font-extrabold text-amber-400 font-cinzel">
                  {TRAINING_CONFIG.formattedPrice}
                </span>
              </div>
              <span className="text-[11px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-md font-bold">
                Diskon {TRAINING_CONFIG.discountPercent}%
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Lengkap (untuk Sertifikat) *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Alif, S.T."
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#06101E] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nomor WhatsApp Aktif *
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#06101E] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Alamat Email (kirim materi & rekaman) *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#06101E] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* City & Occupation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kota Domisili / Asal
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: Jakarta / Surabaya"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#06101E] border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Latar Belakang / Profesi
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#06101E] border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Karyawan / Profesional">Karyawan / Profesional</option>
                    <option value="Mahasiswa / Pelajar">Mahasiswa / Pelajar</option>
                    <option value="Entrepreneur / Pebisnis">Entrepreneur / Pebisnis</option>
                    <option value="Dosen / Pendidik / Guru">Dosen / Pendidik / Guru</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* Jadwal Pelatihan */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Jadwal Pelatihan (Angkatan Utama)
                </label>
                <div className="p-3 rounded-xl border border-amber-400/50 bg-amber-400/10 text-left">
                  <span className="font-bold text-amber-400 block text-sm">{TRAINING_CONFIG.startDate}</span>
                  <span className="text-xs text-slate-300 mt-1 block">{TRAINING_CONFIG.durationText}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Pilih Metode Pembayaran Pendaftaran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'QRIS', label: 'QRIS (Semua E-Wallet)' },
                    { id: 'BCA', label: 'Transfer BCA' },
                    { id: 'Mandiri / BRI', label: 'Mandiri / BRI' },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className={`p-2.5 rounded-xl text-center text-xs font-semibold transition-all border cursor-pointer ${
                        formData.paymentMethod === m.id
                          ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md shadow-amber-400/20'
                          : 'bg-[#06101E] text-slate-300 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Konfirmasi Pendaftaran • {TRAINING_CONFIG.formattedPrice}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Data Anda aman & dijamin langsung terdaftar di sistem Amdara Training.</span>
              </div>

            </form>
          </div>
        ) : (
          /* SUCCESS INVOICE / E-TICKET VIEW */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                Pendaftaran Berhasil Dikunci!
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2 font-cinzel">
                Tiket & Data Pendaftaran Anda
              </h3>
              <p className="text-xs text-slate-300">
                Kursi Anda di {TRAINING_CONFIG.programTitle} telah berhasil diamankan.
              </p>
            </div>

            {/* Ticket Card */}
            {ticketData && (
              <div className="bg-[#050D18] border border-amber-500/40 rounded-2xl p-5 text-left space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">KODE REGISTRASI:</span>
                    <span className="font-mono font-bold text-amber-400 text-sm">
                      {ticketData.ticketNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">TOTAL TAGIHAN:</span>
                    <span className="font-extrabold text-white text-base">
                      {ticketData.price}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nama Peserta:</span>
                    <span className="font-semibold text-white">{ticketData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Metode Pembayaran:</span>
                    <span className="font-semibold text-amber-300">{ticketData.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">WhatsApp:</span>
                    <span className="font-semibold text-white">{ticketData.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Jadwal Pelatihan:</span>
                    <span className="font-semibold text-white">{ticketData.batchDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 bg-[#081528] -mx-5 -mb-5 p-3 rounded-b-2xl">
                  💡 Silakan klik tombol di bawah untuk mengirimkan konfirmasi pendaftaran langsung ke WhatsApp Admin Amdara Training.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={waConfirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-slate-950" />
                <span>Kirim Konfirmasi ke WhatsApp Admin</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Data Tiket'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { CreditCard, Wallet, Building2, CheckCircle2 } from 'lucide-react';

export default function CheckoutForm() {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('qris');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment callback
    setTimeout(() => {
      window.location.href = '/lms/dashboard';
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-navy-800 rounded-2xl p-6 shadow-md border border-navy-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Data Diri Peserta</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nama Lengkap</label>
            <input required type="text" className="w-full px-4 py-2.5 rounded-xl border border-navy-600 bg-navy-900 text-white focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition placeholder:text-slate-500" placeholder="Budi Santoso" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input required type="email" className="w-full px-4 py-2.5 rounded-xl border border-navy-600 bg-navy-900 text-white focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition placeholder:text-slate-500" placeholder="budi@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nomor WhatsApp</label>
            <input required type="tel" className="w-full px-4 py-2.5 rounded-xl border border-navy-600 bg-navy-900 text-white focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition placeholder:text-slate-500" placeholder="081234567890" />
          </div>
        </div>
      </div>

      <div className="bg-navy-800 rounded-2xl p-6 shadow-md border border-navy-700">
        <h3 className="text-lg font-semibold mb-4 text-white">Metode Pembayaran</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <label className={`relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition ${method === 'qris' ? 'border-gold-500 bg-gold-500/10' : 'border-navy-700 hover:bg-navy-700/50'}`}>
            <input type="radio" name="payment" value="qris" className="sr-only" checked={method === 'qris'} onChange={() => setMethod('qris')} />
            <Wallet className={`w-8 h-8 mb-2 ${method === 'qris' ? 'text-gold-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-semibold ${method === 'qris' ? 'text-gold-300' : 'text-slate-400'}`}>QRIS</span>
          </label>
          <label className={`relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition ${method === 'bank' ? 'border-gold-500 bg-gold-500/10' : 'border-navy-700 hover:bg-navy-700/50'}`}>
            <input type="radio" name="payment" value="bank" className="sr-only" checked={method === 'bank'} onChange={() => setMethod('bank')} />
            <Building2 className={`w-8 h-8 mb-2 ${method === 'bank' ? 'text-gold-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-semibold ${method === 'bank' ? 'text-gold-300' : 'text-slate-400'}`}>Transfer Bank</span>
          </label>
          <label className={`relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition ${method === 'ewallet' ? 'border-gold-500 bg-gold-500/10' : 'border-navy-700 hover:bg-navy-700/50'}`}>
            <input type="radio" name="payment" value="ewallet" className="sr-only" checked={method === 'ewallet'} onChange={() => setMethod('ewallet')} />
            <CreditCard className={`w-8 h-8 mb-2 ${method === 'ewallet' ? 'text-gold-400' : 'text-slate-500'}`} />
            <span className={`text-sm font-semibold ${method === 'ewallet' ? 'text-gold-300' : 'text-slate-400'}`}>E-Wallet</span>
          </label>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-gold-500 via-yellow-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
      >
        {loading ? (
          <div className="w-6 h-6 border-3 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
        ) : (
          <>
            <CheckCircle2 className="w-6 h-6" />
            Bayar Sekarang (Rp1.400.000)
          </>
        )}
      </button>
    </form>
  );
}

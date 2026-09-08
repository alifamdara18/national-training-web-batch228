import React, { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle2, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { TRAINING_CONFIG } from '../data/trainingData';

interface QuizProps {
  onOpenRegister: () => void;
}

export const InteractiveQuiz: React.FC<QuizProps> = ({ onOpenRegister }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: "Saat diminta berbicara spontan tanpa persiapan di depan umum, apa yang Anda rasakan?",
      options: [
        { text: "Jantung berdegup kencang, keringat dingin, dan blank total", score: 1 },
        { text: "Gugup beberapa menit pertama, lalu perlahan bisa mengontrol diri", score: 2 },
        { text: "Cukup santai namun bingung menstrukturkan urutan kalimat", score: 3 },
        { text: "Sangat tenang dan menikmati momen berbicara", score: 4 }
      ]
    },
    {
      q: "Bagaimana penggunaan suara dan filler words ('umm...', 'eee...') saat Anda presentasi?",
      options: [
        { text: "Sangat sering keluar filler words karena takut ada jeda hening", score: 1 },
        { text: "Kadang-kadang keluar, terutama saat lupa poin berikutnya", score: 2 },
        { text: "Jarang, namun suara saya cenderung monoton dan cepat lelah", score: 3 },
        { text: "Intonasi dinamis dan artikulasi jelas tanpa jeda canggung", score: 4 }
      ]
    },
    {
      q: "Bagaimana bahasa tubuh dan kontak mata Anda terhadap audiens?",
      options: [
        { text: "Menatap lantai, langit-langit, atau hanya membaca slide", score: 1 },
        { text: "Menatap audiens tapi tangan kaku di saku atau belakang punggung", score: 2 },
        { text: "Kontak mata cukup baik namun gestur masih terasa canggung", score: 3 },
        { text: "Gestur terbuka, rileks, dan kontak mata menyapu seluruh ruangan", score: 4 }
      ]
    },
    {
      q: "Seberapa sering presentasi atau usulan Anda disetujui / dipuji audiens?",
      options: [
        { text: "Jarang, audiens terlihat bosan dan sibuk mengecek handphone", score: 1 },
        { text: "Biasa saja, audiens paham tapi tidak ada aksi lanjut", score: 2 },
        { text: "Cukup sering, namun butuh waktu lama untuk meyakinkan mereka", score: 3 },
        { text: "Hampir selalu sukses mempersuasi dan menggerakkan audiens", score: 4 }
      ]
    }
  ];

  const handleSelect = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getEvaluation = () => {
    if (percentage <= 45) {
      return {
        level: "Tingkat Kecemasan Tinggi (High Anxiety)",
        badgeColor: "bg-red-500/20 text-red-300 border-red-500/30",
        message: "Anda sering merasa tertahan oleh rasa takut dan blank saat berbicara. Ini sangat wajar dialami pemula.",
        recommendation: `Anda sangat direkomendasikan mengikuti ${TRAINING_CONFIG.programTitle} Amdara Training. Modul Day 1 (Teknik 90 Detik Tenang) akan mengubah rasa takut Anda menjadi rasa percaya diri seketika.`
      };
    } else if (percentage <= 75) {
      return {
        level: "Tingkat Menengah (Developing Speaker)",
        badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        message: "Anda sudah punya keberanian dasar, namun masih kekurangan struktur cerita, intonasi berbobot, dan teknik persuasi.",
        recommendation: "Investasi 399k ini adalah batu loncatan emas untuk menyempurnakan Storytelling 4C dan teknik vokal berwibawa agar karier/studi Anda melesat."
      };
    } else {
      return {
        level: "Tingkat Terampil (Polished Speaker)",
        badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        message: "Fondasi berbicara Anda sudah baik! Anda siap melangkah ke panggung kepemimpinan tingkat nasional.",
        recommendation: "Modul Handling Difficult Q&A, elevator pitching, dan jaringan alumni Amdara akan memperluas panggung profesional Anda."
      };
    }
  };

  const evalResult = getEvaluation();

  return (
    <section className="py-16 bg-gradient-to-b from-[#070E1A] via-[#091526] to-[#070E1A] border-y border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Tes Mandiri Cepat (1 Menit)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ukur Tingkat Percaya Diri & Kesiapan Public Speaking Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Ketahui di mana letak hambatan bicara Anda dan dapatkan rekomendasi langsung.
          </p>
        </div>

        {/* Quiz Card Container */}
        <div className="rounded-3xl bg-[#0C1A30] border border-amber-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {!showResult ? (
            <div>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>Pertanyaan {currentStep + 1} dari {questions.length}</span>
                <span className="font-semibold text-amber-400">
                  {Math.round(((currentStep) / questions.length) * 100)}% Selesai
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-gradient-to-r from-blue-500 to-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-6">
                {questions[currentStep].q}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt.score)}
                    className="w-full text-left p-4 rounded-xl bg-[#081220] hover:bg-[#112442] border border-slate-700/80 hover:border-amber-400/60 transition-all text-xs sm:text-sm text-slate-200 hover:text-white flex items-center justify-between group cursor-pointer"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result View */
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 mx-auto">
                <Award className="w-8 h-8 text-amber-400" />
              </div>

              <div>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-2 ${evalResult.badgeColor}`}>
                  {evalResult.level}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Skor Percaya Diri: <span className="text-amber-400">{percentage}/100</span>
                </h3>
              </div>

              <div className="bg-[#070E1A] p-5 rounded-2xl border border-slate-800 text-left space-y-3 max-w-xl mx-auto">
                <p className="text-xs sm:text-sm text-slate-300">
                  {evalResult.message}
                </p>
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    Rekomendasi untuk Anda:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    {evalResult.recommendation}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Daftar Pelatihan Sekarang • Rp 399.000</span>
                </button>
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ulangi Tes</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

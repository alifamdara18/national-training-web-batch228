import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PainPoints } from './components/PainPoints';
import { CurriculumFeatures } from './components/CurriculumFeatures';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { TrainerProfile } from './components/TrainerProfile';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { FloatingCTA } from './components/FloatingCTA';

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const handleOpenRegister = () => {
    setRegisterModalOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070E1A] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Navigation */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner with 399k Highlight & Countdown */}
        <HeroBanner onOpenRegister={handleOpenRegister} />

        {/* Problems & Solutions (Akar Masalah & Transformasi) */}
        <PainPoints />

        {/* Fitur & Kurikulum (6 Pilar, Silabus 3 Hari, 8 Bonus Fasilitas) */}
        <CurriculumFeatures onOpenRegister={handleOpenRegister} />

        {/* Interactive Self-Assessment Quiz */}
        <InteractiveQuiz onOpenRegister={handleOpenRegister} />

        {/* Lead Mentor & Trainer Credentials */}
        <TrainerProfile />

        {/* Testimoni untuk Nanti (Featured Reviews + Form Input) */}
        <TestimonialsSection />

        {/* Biaya & Investasi (Rp 399.000 Special Batch) */}
        <PricingSection onOpenRegister={handleOpenRegister} />

        {/* Tanya Jawab (FAQ) */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Action Bar */}
      <FloatingCTA onOpenRegister={handleOpenRegister} />

      {/* Interactive Registration & E-Ticket Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={handleCloseRegister}
      />
    </div>
  );
}

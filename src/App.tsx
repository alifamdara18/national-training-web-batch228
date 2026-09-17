import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Landing Page Components
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PainPoints } from './components/PainPoints';
import { CurriculumFeatures } from './components/CurriculumFeatures';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { TrainerProfile } from './components/TrainerProfile';
import { InteractiveVideoGallery } from './components/InteractiveVideoGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PricingSection } from './components/PricingSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { FloatingVideoWidget } from './components/FloatingVideoWidget';

// LMS Components
import { LMSLayout } from './app/lms/layout';
import { LMSDashboard } from './app/lms/page';
import { CoursePlayer } from './app/lms/course/[id]/page';
import { PaymentSuccessPage } from './app/payment/success/page';

function LandingPage() {
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

        {/* Video First Experience Gallery */}
        <InteractiveVideoGallery />

        {/* Biaya & Investasi (Rp 399.000 Special Batch) */}
        <PricingSection onOpenRegister={handleOpenRegister} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Registration & E-Ticket Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={handleCloseRegister}
      />

      {/* Floating Video Widget (Story Style) */}
      <FloatingVideoWidget onOpenRegister={handleOpenRegister} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Funnel */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Payment Callback */}
        <Route path="/payment/success" element={<PaymentSuccessPage />} />

        {/* LMS Protected Area */}
        <Route path="/lms" element={<LMSLayout />}>
          <Route index element={<LMSDashboard />} />
          <Route path="course/:id" element={<CoursePlayer />} />
          {/* Tambahan route lain seperti /lms/jadwal, /lms/sertifikat dll bisa ditambahkan di sini nantinya */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

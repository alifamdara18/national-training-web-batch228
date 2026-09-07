export interface Testimonial {
  id: string;
  name: string;
  role: string;
  companyOrCampus: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  tag: 'Profesional' | 'Mahasiswa' | 'Entrepreneur' | 'Pendidik';
  verified: boolean;
}

export interface CurriculumModule {
  id: number;
  week: string;
  title: string;
  duration: string;
  description: string;
  keyTakeaways: string[];
  practicalExercise: string;
}

export interface TrainingBonus {
  title: string;
  normalValue: number;
  description: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Pelaksanaan' | 'Biaya & Sertifikat' | 'Materi & Pemula';
}

export interface RegistrationFormData {
  fullName: string;
  whatsapp: string;
  email: string;
  city: string;
  occupation: string;
  motivation: string;
  paymentMethod: string;
}

export interface TicketData {
  ticketNumber: string;
  fullName: string;
  email: string;
  whatsapp: string;
  trainingName: string;
  price: string;
  paymentMethod: string;
  issueDate: string;
  batchDate: string;
}

import { CurriculumModule, TrainingBonus, FAQItem, Testimonial } from '../types';

export const TRAINING_CONFIG = {
  name: "Amdara Training",
  programTitle: "National Public Speaking",
  tagline: "Kuasai Panggung, Bicara Penuh Wibawa & Pengaruhi Audiens Anda",
  price: 399000,
  formattedPrice: "Rp 399.000",
  originalPrice: 1250000,
  formattedOriginalPrice: "Rp 1.250.000",
  discountPercent: 68,
  batchNumber: "Batch 18 - Nasional",
  startDate: "26 - 28 September 2026",
  durationText: "3 Hari Live Intensive + 1 Bulan Pendampingan",
  seatsTotal: 50,
  seatsRemaining: 7,
  contactWhatsapp: "6281234567890", // Official Amdara Training WhatsApp
  format: "Live Interactive via Zoom + Praktik Langsung 1-on-1",
  targetAudience: "Mahasiswa, Fresh Graduate, Karyawan, Leader, & Entrepreneur"
};

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 1,
    week: "Hari 1 - Sesi Pondasi",
    title: "Overcoming Stage Fright & The Psychology of Confidence",
    duration: "2.5 Jam (19:30 - 22:00 WIB)",
    description: "Bongkar akar ketakutan berbicara di depan umum. Kuasai teknik neuro-linguistic dan pernapasan diafragma untuk menenangkan detak jantung dalam 90 detik sebelum naik panggung.",
    keyTakeaways: [
      "Mindset Shift: Mengubah kecemasan (Adrenalin) menjadi antusiasme karismatik",
      "Teknik Pernapasan 4-7-8 & Grounding Fisik agar tangan tidak gemetar",
      "First 30 Seconds Rule: Cara memikat audiens sejak kalimat pertama meluncur",
      "Mengatasi sindrom 'Blank di Tengah Bicara' dengan anchor memory"
    ],
    practicalExercise: "Praktik Opening Speech 60 detik langsung di breakout room dengan evaluasi mentor."
  },
  {
    id: 2,
    week: "Hari 2 - Sesi Teknik",
    title: "Vocal Mastery & High-Impact Non-Verbal Communication",
    duration: "2.5 Jam (19:30 - 22:00 WIB)",
    description: "Bukan hanya apa yang Anda sampaikan, tetapi BAGAIMANA Anda menyampaikannya. Tingkatkan intonasi, dinamika volume suara, dan bahasa tubuh berwibawa.",
    keyTakeaways: [
      "Olah vokal: Tempo, jeda strategis (Power of Pause), dan artikulasi bebas gumam (filler words)",
      "Eye Contact Mastery: Menghubungkan emosi dengan audiens di ruangan maupun layar virtual",
      "Gestur tangan natural: Posisi open palms vs authoritative box",
      "Micro-expressions & senyum percaya diri yang menular ke seluruh ruangan"
    ],
    practicalExercise: "Simulasi Elevator Pitch 90 detik dengan variasi intonasi dramatis dan jeda taktis."
  },
  {
    id: 3,
    week: "Hari 3 - Sesi Persuasi",
    title: "Storytelling Framework 4C & Handling Difficult Q&A",
    duration: "3 Jam (19:00 - 22:00 WIB)",
    description: "Rangkai pesan yang menggerakkan aksi menggunakan formula bercerita para pembicara TEDx. Pelajari cara menjawab pertanyaan tajam audiens tanpa terlihat gugup.",
    keyTakeaways: [
      "Struktur 4C (Context, Conflict, Climax, Call to Action) untuk presentasi tak terlupakan",
      "Teknik Bridging: Mengalihkan pertanyaan menjebak kembali ke inti pesan Anda",
      "Visual Storytelling: Menyajikan data rumit menjadi kisah yang mudah dipahami orang awam",
      "Call to Action yang irresistable untuk presentasi bisnis, pitching dana, atau sidang skripsi"
    ],
    practicalExercise: "Final Grand Presentation: Tampil 3 menit di panggung utama dengan penilaian National Standard Amdara."
  }
];

export const TRAINING_BONUSES: TrainingBonus[] = [
  {
    title: "Sertifikat Kelulusan Resmi Nasional",
    normalValue: 250000,
    description: "Sertifikat berstandar nasional dari Amdara Training dengan verifikasi ID unik untuk CV & LinkedIn.",
    iconName: "Award"
  },
  {
    title: "Master E-Workbook & Slide Deck Pro",
    normalValue: 350000,
    description: "Kumpulan template presentasi berkelas tinggi & panduan praktis 60 halaman siap pakai.",
    iconName: "BookOpen"
  },
  {
    title: "Rekaman Sesi Full HD Seumur Hidup",
    normalValue: 500000,
    description: "Akses selamanya ke arsip video pelatihan kualitas tinggi untuk diulang kapan pun Anda butuh.",
    iconName: "Video"
  },
  {
    title: "Akses Komunitas Alumni VIP Amdara",
    normalValue: 400000,
    description: "Grup networking eksklusif se-Indonesia untuk sharing info lowongan MC, trainer, dan kolaborasi bisnis.",
    iconName: "Users"
  },
  {
    title: "1-on-1 Feedback & Review Personal",
    normalValue: 450000,
    description: "Setiap tugas praktik Anda dinilai dan diberikan catatan perbaikan personal langsung dari Lead Trainer.",
    iconName: "CheckCircle2"
  },
  {
    title: "50+ Cheatsheet & Speech Scripts",
    normalValue: 300000,
    description: "Contoh teks opening, ice breaking, humor santun, dan closing pidato untuk berbagai situasi formal/non-formal.",
    iconName: "FileText"
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "testi-1",
    name: "Rian Hendrawan, S.T.",
    role: "Project Manager",
    companyOrCampus: "BUMN Infrastruktur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Dulu sebelum ikut Amdara Training, saya selalu keringat dingin setiap kali presentasi di depan direksi. Setelah 3 hari belajar teknik pernapasan dan Storytelling 4C, presentasi tender proyek kemarin dipuji langsung oleh General Manager! Investasi 399k paling berdampak dalam karier saya.",
    date: "Agustus 2026",
    tag: "Profesional",
    verified: true
  },
  {
    id: "testi-2",
    name: "Nadira Kusuma",
    role: "Mahasiswi & Ketua BEM",
    companyOrCampus: "Universitas Indonesia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Kelas National Public Speaking ini sangat interaktif! Bukan cuma teori membosankan, tapi kami langsung dipaksa praktik dan dibedah kesalahannya satu-satu secara ramah. Feedback 1-on-1 mentornya sangat membuka mata. Saya jadi jauh lebih percaya diri saat orasi dan memimpin rapat.",
    date: "Juli 2026",
    tag: "Mahasiswa",
    verified: true
  },
  {
    id: "testi-3",
    name: "dr. Bagas Wicaksono",
    role: "Dokter & Health Educator",
    companyOrCampus: "Klinik Pratama Sehat",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Sebagai tenaga medis, menyampaikan bahasa medis ke pasien dan audiens awam sering kali sulit. Materi Vocal Mastery dan teknik bridging di Amdara membantu saya jadi narasumber kesehatan di webinar nasional dengan sangat luwes. Sangat direkomendasikan!",
    date: "Agustus 2026",
    tag: "Profesional",
    verified: true
  },
  {
    id: "testi-4",
    name: "Clarissa Dewi",
    role: "Founder & Creative Director",
    companyOrCampus: "Lumiere Studio",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    comment: "Harga 399k untuk materi sekelas ini terasa terlalu murah. Nilai bonus workbook, feedback mentor, dan template pitching-nya saja sudah jutaan rupiah. Setelah ikut batch ini, pitching investor saya berhasil tembus pendanaan tahap awal. Terima kasih Amdara Training!",
    date: "September 2026",
    tag: "Entrepreneur",
    verified: true
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    category: "Materi & Pemula",
    question: "Saya orangnya sangat pemalu dan introvert parah, apakah kelas ini cocok?",
    answer: "Sangat cocok! Lebih dari 70% alumni Amdara Training adalah individu introvert yang sebelumnya takut memegang mikrofon. Pendekatan kami bertahap, psikologis, dan ruang kelas yang aman tanpa penghakiman sehingga Anda merasa nyaman mencoba."
  },
  {
    id: "faq-2",
    category: "Pelaksanaan",
    question: "Bagaimana jika saya berhalangan hadir di salah satu sesi live Zoom?",
    answer: "Tenang saja! Seluruh sesi direkam dalam kualitas Full HD dan akan dibagikan ke portal peserta maksimal 2 jam setelah sesi selesai. Anda mendapatkan akses rekaman seumur hidup dan tetap bisa mengumpulkan tugas praktik untuk direview mentor."
  },
  {
    id: "faq-3",
    category: "Biaya & Sertifikat",
    question: "Mengapa biayanya hanya Rp 399.000? Apakah ada biaya tersembunyi?",
    answer: "Biaya Rp 399.000 adalah harga program subsidi batch nasional untuk membuka akses seluas-luasnya bagi talenta Indonesia. Tidak ada biaya tersembunyi apa pun. Semua modul, sertifikat resmi, workbook, rekaman seumur hidup, dan grup alumni sudah termasuk."
  },
  {
    id: "faq-4",
    category: "Biaya & Sertifikat",
    question: "Apakah sertifikatnya resmi dan dapat dicantumkan di CV / LinkedIn?",
    answer: "Ya, sertifikat kelulusan National Public Speaking dikeluarkan secara resmi oleh Amdara Training lengkap dengan nomor sertifikat terverifikasi, jam pelatihan (JP), dan silabus kompetensi di halaman belakang."
  },
  {
    id: "faq-5",
    category: "Pelaksanaan",
    question: "Bagaimana teknis praktik langsung selama pelatihan daring?",
    answer: "Kami menggunakan fitur Breakout Rooms dengan asisten fasilitator, serta panggung utama Live Zoom. Peserta akan diminta menyalakan kamera dan melakukan simulasi dengan skenario nyata: presentasi bisnis, MC formal, atau speech inspiratif."
  }
];

export const PAIN_POINTS = [
  {
    problem: "Keringat Dingin & Jantung Berdebar Kencang",
    description: "Baru dipanggil namanya saja sudah gemetar, suara tercekat di tenggorokan, dan nafas tersengal-sengal.",
    solution: "Kuasai teknik Grounding Fisik & Pernapasan 4-7-8 untuk menetralkan kortisol dalam 90 detik."
  },
  {
    problem: "Tiba-Tiba 'Blank' & Lupa Materi di Depan Orang",
    description: "Semua poin di kepala mendadak hilang saat melihat tatapan mata audiens atau pimpinan.",
    solution: "Gunakan Mind Map Storytelling & Anchor Words agar presentasi mengalir lancar tanpa hafalan kaku."
  },
  {
    problem: "Suara Monoton, Pelan, dan Penuh Gumaman 'Umm... Eee...'",
    description: "Audiens cepat mengantuk, membuka gadget, atau tidak menangkap pesan utama yang Anda bawa.",
    solution: "Pelajari Vocal Dynamics, tempo artikulasi berbobot, dan trik Power Pause untuk menggantikan filler words."
  },
  {
    problem: "Bahasa Tubuh Kaku Seperti Patung",
    description: "Bingung tangan harus ditaruh di mana, tatapan mata liar ke langit-langit, dan postur tampak tidak yakin.",
    solution: "Kuasai Open Gestures, authoritative stance, dan kontak mata magnetik yang memancarkan aura pemimpin."
  }
];

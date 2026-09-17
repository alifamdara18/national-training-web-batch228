export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  batch: string;
  paymentStatus: 'Terverifikasi' | 'Menunggu' | 'Gagal';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  totalModules: number;
  completedModules: number;
  progressPercentage: number;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isCompleted: boolean;
}

export interface Order {
  id: string;
  userId: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  createdAt: string;
}

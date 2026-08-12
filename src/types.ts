export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company?: string;
  avatarUrl?: string;
  rating: number;
  text: string;
  tag: 'Mentoria' | 'Consultoria' | 'AI Studio' | 'Automação';
  date: string;
}

export interface ServiceOption {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  popular?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  date: string;
  time: string;
  name: string;
  whatsapp: string;
  email: string;
  notes?: string;
  status: 'confirmado' | 'pendente';
  createdAt: string;
}

export interface ToastNotification {
  message: string;
  visible: boolean;
}

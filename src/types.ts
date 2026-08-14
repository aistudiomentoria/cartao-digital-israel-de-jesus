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

export interface DiagnosticData {
  // Identification & Profile
  fullName: string;
  companyName: string;
  role: string;
  whatsapp: string;
  email: string;
  segment: string;
  companySize: string;

  // Bottlenecks & Operational Routine
  manualTasks: string[];
  mainBottleneck90Days: string;
  dataManagementMethod: string;

  // AI Maturity & Goals
  aiUsageLevel: string;
  prioritySolutions: string[];

  // Alignment
  readiness: string;
  preferredPeriod: string;
  scheduledDate?: string;
  scheduledTime?: string;
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
  diagnosticData?: DiagnosticData;
  status: 'confirmado' | 'pendente';
  createdAt: string;
}

export interface ToastNotification {
  message: string;
  visible: boolean;
}

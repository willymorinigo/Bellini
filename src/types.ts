export interface SpecialtyService {
  id: string;
  title: string;
  duration: string;
  shortDescription: string;
  detailedDescription: string;
  priceRange: string;
  iconName: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  education: string;
  avatarUrl: string;
}

export interface CaseComparison {
  id: string;
  title: string;
  description: string;
  category: string;
  beforeUrl: string;
  afterUrl: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceTitle: string;
  specialistId: string;
  specialistName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

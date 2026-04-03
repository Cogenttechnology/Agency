/* ─────────────────────────────────────────────────────────
   Enquiry Store — localStorage-based persistence
   ───────────────────────────────────────────────────────── */

export type EnquiryStatus = 'new' | 'read' | 'replied' | 'closed';

export interface Enquiry {
  id: string;
  source: 'modal' | 'contact';
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string; // ISO string
}

const KEY = 'cogent_enquiries';

export function getEnquiries(): Enquiry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveEnquiry(data: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Enquiry {
  const enquiry: Enquiry = {
    ...data,
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  const all = getEnquiries();
  all.unshift(enquiry);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }
  return enquiry;
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus): void {
  const all = getEnquiries().map(e => e.id === id ? { ...e, status } : e);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }
}

export function deleteEnquiry(id: string): void {
  const all = getEnquiries().filter(e => e.id !== id);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(KEY, JSON.stringify(all));
  }
}

export function getUnreadCount(): number {
  return getEnquiries().filter(e => e.status === 'new').length;
}

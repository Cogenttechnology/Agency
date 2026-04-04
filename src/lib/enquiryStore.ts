/* ─────────────────────────────────────────────────────────
   Enquiry Store — Supabase-backed persistence
   ───────────────────────────────────────────────────────── */

import { supabase } from './supabase';

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

export async function getEnquiries(): Promise<Enquiry[]> {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getEnquiries error:', error.message);
    return [];
  }

  return (data ?? []).map(dbToEnquiry);
}

export async function saveEnquiry(
  input: Omit<Enquiry, 'id' | 'status' | 'createdAt'>
): Promise<Enquiry | null> {
  const { data, error } = await supabase
    .from('enquiries')
    .insert({
      source: input.source,
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      services: input.services,
      budget: input.budget,
      message: input.message,
      status: 'new',
    })
    .select()
    .single();

  if (error) {
    console.error('saveEnquiry error:', error.message);
    return null;
  }

  return dbToEnquiry(data);
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id);

  if (error) console.error('updateEnquiryStatus error:', error.message);
}

export async function deleteEnquiry(id: string): Promise<void> {
  const { error } = await supabase
    .from('enquiries')
    .delete()
    .eq('id', id);

  if (error) console.error('deleteEnquiry error:', error.message);
}

export async function getUnreadCount(): Promise<number> {
  const { count, error } = await supabase
    .from('enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  if (error) {
    console.error('getUnreadCount error:', error.message);
    return 0;
  }

  return count ?? 0;
}

// ── DB row → Enquiry ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToEnquiry(row: any): Enquiry {
  return {
    id: row.id,
    source: row.source,
    name: row.name,
    email: row.email,
    phone: row.phone ?? '',
    company: row.company ?? '',
    services: row.services ?? [],
    budget: row.budget ?? '',
    message: row.message ?? '',
    status: row.status,
    createdAt: row.created_at,
  };
}

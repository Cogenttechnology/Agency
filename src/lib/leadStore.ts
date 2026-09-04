/* ─────────────────────────────────────────────────────────
   Lead Store — Supabase-backed persistence for /scale landing page
   ───────────────────────────────────────────────────────── */

import { supabase } from './supabase';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'won' | 'lost';

export interface Lead {
  id: string;
  phone: string;
  brand: string;
  website: string;
  monthlySales: string;
  monthlyAdSpend: string;
  source: string;
  referrer: string;
  utm: Record<string, string> | null;
  ip: string;
  userAgent: string;
  status: LeadStatus;
  notes: string;
  createdAt: string; // ISO string
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000);

  if (error) {
    console.error('getLeads error:', error.message);
    return [];
  }

  return (data ?? []).map(dbToLead);
}

export async function saveLead(
  input: Omit<Lead, 'id' | 'status' | 'notes' | 'createdAt'>
): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert({
      phone: input.phone,
      brand: input.brand,
      website: input.website,
      monthly_sales: input.monthlySales,
      monthly_ad_spend: input.monthlyAdSpend,
      source: input.source,
      referrer: input.referrer,
      utm: input.utm,
      ip: input.ip,
      user_agent: input.userAgent,
      status: 'new',
    })
    .select()
    .single();

  if (error) {
    console.error('saveLead error:', error.message);
    return null;
  }

  return dbToLead(data);
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) console.error('updateLeadStatus error:', error.message);
}

export async function deleteLead(id: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) console.error('deleteLead error:', error.message);
}

export async function countRecentByIp(ip: string, sinceIso: string): Promise<number> {
  const { count, error } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', sinceIso);

  if (error) {
    console.error('countRecentByIp error:', error.message);
    return 0;
  }

  return count ?? 0;
}

// ── DB row → Lead ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToLead(row: any): Lead {
  return {
    id: row.id,
    phone: row.phone ?? '',
    brand: row.brand ?? '',
    website: row.website ?? '',
    monthlySales: row.monthly_sales ?? '',
    monthlyAdSpend: row.monthly_ad_spend ?? '',
    source: row.source ?? '',
    referrer: row.referrer ?? '',
    utm: row.utm ?? null,
    ip: row.ip ?? '',
    userAgent: row.user_agent ?? '',
    status: row.status,
    notes: row.notes ?? '',
    createdAt: row.created_at,
  };
}

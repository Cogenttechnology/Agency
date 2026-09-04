/**
 * Resource route: /api/leads
 * Public submit for the /scale landing page, admin CRUD for the dashboard.
 */

import type { Route } from './+types/leads';
import {
  getLeads,
  saveLead,
  updateLeadStatus,
  deleteLead,
  countRecentByIp,
  type LeadStatus,
} from '../../lib/leadStore';

const MIN_FILL_SECONDS = 3;
const MAX_PER_IP_PER_HOUR = 5;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function verifyAuth(request: Request): boolean {
  const token = request.headers.get('x-admin-token');
  return token === 'cogent_admin_auth';
}

/** GET /api/leads */
export async function loader({ request }: Route.LoaderArgs) {
  if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
  return json(await getLeads());
}

/** POST /api/leads */
export async function action({ request }: Route.ActionArgs) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { _action, ...data } = body as { _action: string; [k: string]: unknown };

  if (_action === 'submit') {
    return handleSubmit(request, data);
  }

  // Admin actions require auth
  if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);

  switch (_action) {
    case 'updateStatus': {
      const { id, status } = data as { id: string; status: LeadStatus };
      if (!id || !status) return json({ error: 'id and status required' }, 400);
      await updateLeadStatus(id, status);
      return json({ ok: true });
    }
    case 'delete': {
      const { id } = data as { id: string };
      if (!id) return json({ error: 'id required' }, 400);
      await deleteLead(id);
      return json({ ok: true });
    }
    default:
      return json({ error: 'Unknown action' }, 400);
  }
}

async function handleSubmit(request: Request, data: Record<string, unknown>) {
  const get = (k: string): string => String(data[k] ?? '').trim();

  // Honeypot — bots fill this hidden field, humans never see it
  if (get('company') !== '') {
    return json({ ok: true });
  }

  // Time-trap — real humans take longer than a few seconds to fill the form
  const elapsed = Number(data.elapsed ?? 0);
  if (elapsed > 0 && elapsed < MIN_FILL_SECONDS) {
    return json({ ok: true });
  }

  const phone = get('phone').replace(/[^\d+]/g, '');
  const brand = get('brand');
  let site = get('site');
  const sales = get('sales');
  const spend = get('spend');

  const digits = phone.replace(/\D/g, '').length;
  if (digits < 10 || digits > 13) return json({ error: 'Please enter a valid phone number.' }, 400);
  if (brand === '' || brand.length > 120) return json({ error: 'Please enter your brand name.' }, 400);
  if (site === '') return json({ error: 'Please enter your website link.' }, 400);
  if (!/^https?:\/\//i.test(site)) site = 'https://' + site;
  try {
    new URL(site);
  } catch {
    return json({ error: 'Please enter a valid website URL.' }, 400);
  }
  if (sales === '' || spend === '') {
    return json({ error: 'Please select your monthly sales and ad spend.' }, 400);
  }

  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    '';
  const ua = (request.headers.get('user-agent') ?? '').slice(0, 255);
  const referrer = (get('referrer') || request.headers.get('referer') || '').slice(0, 255);
  const source = (get('source') || 'lead-gen-lp').slice(0, 60);

  const utm: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid']) {
    const v = get(k);
    if (v !== '') utm[k] = v.slice(0, 180);
  }

  if (ip !== '') {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await countRecentByIp(ip, since);
    if (recent >= MAX_PER_IP_PER_HOUR) {
      return json(
        { error: 'Too many submissions from this connection. Please call us instead: +91 99828 98842.' },
        429
      );
    }
  }

  const lead = await saveLead({
    phone,
    brand,
    website: site,
    monthlySales: sales,
    monthlyAdSpend: spend,
    source,
    referrer,
    utm: Object.keys(utm).length ? utm : null,
    ip,
    userAgent: ua,
  });

  if (!lead) {
    return json({ error: 'We could not save your details. Please WhatsApp us on +91 99828 98842.' }, 500);
  }

  return json({ ok: true, stored: true }, 201);
}

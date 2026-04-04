/**
 * Resource route: /api/enquiries
 * Handles admin CRUD for enquiries — server-side only.
 */

import type { Route } from './+types/enquiries';
import {
  getEnquiries,
  saveEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getUnreadCount,
  type EnquiryStatus,
} from '../../lib/enquiryStore';

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

/** GET /api/enquiries */
export async function loader({ request }: Route.LoaderArgs) {
  if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);
  const url = new URL(request.url);
  if (url.searchParams.get('count') === 'unread') {
    return json({ count: await getUnreadCount() });
  }
  return json(await getEnquiries());
}

/** POST /api/enquiries */
export async function action({ request }: Route.ActionArgs) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { _action, ...data } = body as { _action: string; [k: string]: unknown };

  // Public submit (no auth required)
  if (_action === 'submit') {
    const enquiry = await saveEnquiry(data as Parameters<typeof saveEnquiry>[0]);
    if (!enquiry) return json({ error: 'Failed to save enquiry' }, 500);
    return json(enquiry, 201);
  }

  // Admin actions require auth
  if (!verifyAuth(request)) return json({ error: 'Unauthorized' }, 401);

  switch (_action) {
    case 'updateStatus': {
      const { id, status } = data as { id: string; status: EnquiryStatus };
      if (!id || !status) return json({ error: 'id and status required' }, 400);
      await updateEnquiryStatus(id, status);
      return json({ ok: true });
    }
    case 'delete': {
      const { id } = data as { id: string };
      if (!id) return json({ error: 'id required' }, 400);
      await deleteEnquiry(id);
      return json({ ok: true });
    }
    default:
      return json({ error: 'Unknown action' }, 400);
  }
}

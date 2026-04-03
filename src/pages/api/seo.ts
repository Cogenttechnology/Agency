/**
 * Resource route: /api/seo
 * Handles admin CRUD for page SEO metadata — server-side only.
 */

import type { Route } from "./+types/seo";
import {
  getAllSeoPages,
  getSeoByPath,
  saveSeoPage,
  resetSeoPage,
  type PageSeo,
} from "../../lib/seoStore.server";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function verifyAuth(request: Request): boolean {
  return request.headers.get("x-admin-token") === "cogent_admin_auth";
}

/** GET /api/seo — list all pages */
export async function loader({ request }: Route.LoaderArgs) {
  if (!verifyAuth(request)) return json({ error: "Unauthorized" }, 401);
  return json(getAllSeoPages());
}

/** POST /api/seo */
export async function action({ request }: Route.ActionArgs) {
  if (!verifyAuth(request)) return json({ error: "Unauthorized" }, 401);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return json({ error: "Invalid JSON" }, 400);

  const { _action, ...data } = body as { _action: string; [k: string]: unknown };

  switch (_action) {
    case "save": {
      saveSeoPage(data as unknown as PageSeo);
      return json({ ok: true });
    }
    case "reset": {
      const { id } = data as { id: string };
      if (!id) return json({ error: "id required" }, 400);
      resetSeoPage(id);
      return json({ ok: true });
    }
    case "getByPath": {
      const { path } = data as { path: string };
      if (!path) return json({ error: "path required" }, 400);
      const page = getSeoByPath(path);
      if (!page) return json({ error: "Not found" }, 404);
      return json(page);
    }
    default:
      return json({ error: "Unknown action" }, 400);
  }
}

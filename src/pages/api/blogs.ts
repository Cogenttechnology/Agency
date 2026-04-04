/**
 * Resource route: /api/blogs
 * Handles all admin CRUD for blog posts — server-side only.
 * No UI component exported — pure JSON API.
 */

import type { Route } from "./+types/blogs";
import {
  getBlogs,
  getBlogBySlug,
  saveBlog,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
  type BlogPost,
} from "../../lib/blogStore.server";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function verifyAuth(request: Request): boolean {
  const token = request.headers.get("x-admin-token");
  return token === "cogent_admin_auth";
}

/** GET /api/blogs — list all posts (admin) */
export async function loader({ request }: Route.LoaderArgs) {
  if (!verifyAuth(request)) return json({ error: "Unauthorized" }, 401);
  return json(await getBlogs());
}

/** POST /api/blogs — create | update | delete | publish | unpublish */
export async function action({ request }: Route.ActionArgs) {
  if (!verifyAuth(request)) return json({ error: "Unauthorized" }, 401);

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const { _action, ...data } = body as { _action: string; [k: string]: unknown };

  switch (_action) {
    case "create": {
      const post = await saveBlog(data as unknown as Omit<BlogPost, "id" | "createdAt" | "updatedAt">);
      return json(post, 201);
    }
    case "update": {
      const { id, ...fields } = data as { id: string; [k: string]: unknown };
      if (!id) return json({ error: "id required" }, 400);
      const updated = await updateBlog(id, fields as Partial<BlogPost>);
      if (!updated) return json({ error: "Not found" }, 404);
      return json(updated);
    }
    case "delete": {
      const { id } = data as { id: string };
      if (!id) return json({ error: "id required" }, 400);
      await deleteBlog(id);
      return json({ ok: true });
    }
    case "publish": {
      const { id } = data as { id: string };
      if (!id) return json({ error: "id required" }, 400);
      const post = await publishBlog(id);
      if (!post) return json({ error: "Not found" }, 404);
      return json(post);
    }
    case "unpublish": {
      const { id } = data as { id: string };
      if (!id) return json({ error: "id required" }, 400);
      const post = await unpublishBlog(id);
      if (!post) return json({ error: "Not found" }, 404);
      return json(post);
    }
    case "getBySlug": {
      const { slug } = data as { slug: string };
      if (!slug) return json({ error: "slug required" }, 400);
      const post = await getBlogBySlug(slug);
      if (!post) return json({ error: "Not found" }, 404);
      return json(post);
    }
    default:
      return json({ error: "Unknown action" }, 400);
  }
}

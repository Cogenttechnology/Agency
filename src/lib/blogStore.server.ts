/**
 * Server-side blog store — backed by Supabase.
 * This module is safe to import in loaders, actions, and resource routes.
 */

import { createClient } from '@supabase/supabase-js';
import type { BlogPost } from './blogStore';

export type { BlogPost };

// On the server, Vite env vars are available via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── DB row → BlogPost ─────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dbToPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title ?? '',
    metaDescription: row.meta_description ?? '',
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    category: row.category ?? '',
    tags: row.tags ?? [],
    coverGradient: row.cover_gradient ?? '',
    coverImage: row.cover_image ?? null,
    author: row.author ?? '',
    authorRole: row.author_role ?? '',
    status: row.status,
    internalLinks: row.internal_links ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at ?? null,
    readTime: row.read_time ?? 0,
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getBlogs error:', error.message);
    return [];
  }

  return (data ?? []).map(dbToPost);
}

export async function getPublishedBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('getPublishedBlogs error:', error.message);
    return [];
  }

  return (data ?? []).map(dbToPost);
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return dbToPost(data);
}

export async function saveBlog(
  input: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>
): Promise<BlogPost> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('blogs')
    .insert({
      slug: input.slug,
      title: input.title,
      meta_title: input.metaTitle,
      meta_description: input.metaDescription,
      excerpt: input.excerpt,
      content: input.content,
      category: input.category,
      tags: input.tags,
      cover_gradient: input.coverGradient,
      cover_image: input.coverImage ?? null,
      author: input.author,
      author_role: input.authorRole,
      status: input.status,
      internal_links: input.internalLinks,
      published_at: input.publishedAt,
      read_time: input.readTime,
      created_at: now,
      updated_at: now,
    })
    .select()
    .single();

  if (error) throw new Error(`saveBlog error: ${error.message}`);
  return dbToPost(data);
}

export async function updateBlog(
  id: string,
  fields: Partial<BlogPost>
): Promise<BlogPost | null> {
  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (fields.slug !== undefined) updatePayload.slug = fields.slug;
  if (fields.title !== undefined) updatePayload.title = fields.title;
  if (fields.metaTitle !== undefined) updatePayload.meta_title = fields.metaTitle;
  if (fields.metaDescription !== undefined) updatePayload.meta_description = fields.metaDescription;
  if (fields.excerpt !== undefined) updatePayload.excerpt = fields.excerpt;
  if (fields.content !== undefined) updatePayload.content = fields.content;
  if (fields.category !== undefined) updatePayload.category = fields.category;
  if (fields.tags !== undefined) updatePayload.tags = fields.tags;
  if (fields.coverGradient !== undefined) updatePayload.cover_gradient = fields.coverGradient;
  if (fields.coverImage !== undefined) updatePayload.cover_image = fields.coverImage;
  if (fields.author !== undefined) updatePayload.author = fields.author;
  if (fields.authorRole !== undefined) updatePayload.author_role = fields.authorRole;
  if (fields.status !== undefined) updatePayload.status = fields.status;
  if (fields.internalLinks !== undefined) updatePayload.internal_links = fields.internalLinks;
  if (fields.publishedAt !== undefined) updatePayload.published_at = fields.publishedAt;
  if (fields.readTime !== undefined) updatePayload.read_time = fields.readTime;

  const { data, error } = await supabase
    .from('blogs')
    .update(updatePayload)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('updateBlog error:', error.message);
    return null;
  }

  return dbToPost(data);
}

export async function deleteBlog(id: string): Promise<void> {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) console.error('deleteBlog error:', error.message);
}

export async function publishBlog(id: string): Promise<BlogPost | null> {
  return updateBlog(id, {
    status: 'published',
    publishedAt: new Date().toISOString(),
  });
}

export async function unpublishBlog(id: string): Promise<BlogPost | null> {
  return updateBlog(id, { status: 'draft', publishedAt: null });
}

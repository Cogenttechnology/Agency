import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BLOG_IMAGES_BUCKET = 'blog-images';

/**
 * Upload a blog cover image to Supabase Storage.
 * Returns the public URL on success, throws on error.
 */
export async function uploadBlogImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `covers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a blog cover image from Supabase Storage by its public URL.
 * Silently ignores errors (best-effort cleanup).
 */
export async function deleteBlogImage(publicUrl: string): Promise<void> {
  try {
    const url = new URL(publicUrl);
    // Path after /storage/v1/object/public/<bucket>/
    const parts = url.pathname.split(`/${BLOG_IMAGES_BUCKET}/`);
    if (parts.length < 2) return;
    await supabase.storage.from(BLOG_IMAGES_BUCKET).remove([parts[1]]);
  } catch {
    // best-effort
  }
}

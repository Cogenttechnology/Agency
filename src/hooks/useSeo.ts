/* ─────────────────────────────────────────────────────────
   useSeo — injects <title>, <meta>, and JSON-LD schemas
   into document.head for the current page.
   ───────────────────────────────────────────────────────── */
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getSeoByPath } from '../lib/seoStore';

export default function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    function inject() {
      const seo = getSeoByPath(pathname);
      if (!seo) return;

      /* ── <title> ─────────────────────────────────────────── */
      document.title = seo.title || seo.metaTitle || 'Cogent Agency';

      /* ── Helper: upsert a <meta> tag ─────────────────────── */
      const setMeta = (selector: string, attr: string, value: string) => {
        if (!value) return;
        let el = document.querySelector<HTMLMetaElement>(selector);
        if (!el) {
          el = document.createElement('meta');
          document.head.appendChild(el);
        }
        el.setAttribute(attr, value);
      };

      /* ── Helper: upsert a <link> tag ─────────────────────── */
      const setLink = (rel: string, value: string) => {
        if (!value) return;
        let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
        if (!el) {
          el = document.createElement('link');
          el.rel = rel;
          document.head.appendChild(el);
        }
        el.href = value;
      };

      /* ── Standard meta ───────────────────────────────────── */
      setMeta('meta[name="description"]',         'content', seo.metaDescription);
      setMeta('meta[name="keywords"]',            'content', seo.keywords);
      setMeta('meta[name="robots"]',              'content', seo.robots || 'index, follow');

      /* ── Open Graph ──────────────────────────────────────── */
      setMeta('meta[property="og:title"]',        'content', seo.metaTitle);
      setMeta('meta[property="og:description"]',  'content', seo.metaDescription);
      setMeta('meta[property="og:image"]',        'content', seo.ogImage);
      setMeta('meta[property="og:url"]',          'content', seo.canonical);
      setMeta('meta[property="og:type"]',         'content', 'website');
      setMeta('meta[property="og:site_name"]',    'content', 'Cogent Agency');

      /* ── Twitter Card ────────────────────────────────────── */
      setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
      setMeta('meta[name="twitter:title"]',       'content', seo.metaTitle);
      setMeta('meta[name="twitter:description"]', 'content', seo.metaDescription);
      setMeta('meta[name="twitter:image"]',       'content', seo.ogImage);

      /* ── Canonical ───────────────────────────────────────── */
      setLink('canonical', seo.canonical);

      /* ── JSON-LD Schemas ─────────────────────────────────── */
      document.querySelectorAll('script[data-cogent-schema]').forEach(el => el.remove());

      seo.schemas
        .filter(s => s.enabled && s.custom.trim())
        .forEach(schema => {
          try {
            JSON.parse(schema.custom);
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-cogent-schema', schema.type);
            script.textContent = schema.custom;
            document.head.appendChild(script);
          } catch {
            // Skip invalid JSON silently
          }
        });
    }

    inject();
    window.addEventListener('cogent_seo_updated', inject);
    return () => window.removeEventListener('cogent_seo_updated', inject);
  }, [pathname]);
}

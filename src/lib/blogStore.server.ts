/**
 * Server-only blog store — reads/writes to a JSON file on disk.
 * This module must only be imported in server-side code (loaders, actions, resource routes).
 * It uses Node.js `fs` which is not available in the browser.
 */

import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "./blogStore";

export type { BlogPost };

// Resolve path relative to the project root (process.cwd()), not this file.
// In dev, cwd is the project root. In production, same applies with react-router-serve.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "blogs.json");

const SEED_POSTS: BlogPost[] = [
  {
    id: 'blog_seed_001',
    slug: '10-seo-mistakes-killing-google-rankings-2025',
    title: '10 SEO Mistakes That Are Killing Your Google Rankings in 2025',
    metaTitle: '10 SEO Mistakes Killing Your Google Rankings in 2025 | Cogent Agency',
    metaDescription: 'Discover the 10 most damaging SEO mistakes businesses make in 2025 — from ignoring Core Web Vitals to thin content — and learn how to fix them fast.',
    excerpt: "Most businesses unknowingly sabotage their own search rankings. From ignoring Core Web Vitals to building toxic backlinks, these ten mistakes are costing you visibility, traffic, and revenue — here's how to fix every one of them.",
    content: `<h2>Why Most SEO Efforts Fall Short</h2>
<p>Search engine optimisation has never been more competitive — or more misunderstood. With Google rolling out multiple algorithm updates per year and AI-driven results reshaping the SERP landscape, outdated tactics don't just fail to work; they actively harm your rankings. In our experience working with brands across Mumbai and beyond, the same critical mistakes appear again and again. Here are the ten most damaging ones and exactly how to fix them.</p>

<h2>1. Ignoring Core Web Vitals</h2>
<p>Since Google's Page Experience update, Core Web Vitals — Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) — are direct ranking signals. A site that loads in 4 seconds loses rankings to a competitor loading in 1.8 seconds, even if your content is superior.</p>
<p><strong>The fix:</strong> Run your site through Google PageSpeed Insights and address the flagged issues. Compress images to WebP, defer non-critical JavaScript, and use a CDN. Aim for LCP under 2.5 seconds and CLS below 0.1.</p>

<h2>2. Publishing Thin, Low-Value Content</h2>
<p>The era of 300-word keyword-stuffed articles is over. Google's Helpful Content system specifically targets pages that exist to rank rather than to genuinely help users. Thin content signals low expertise and poor user experience.</p>
<p><strong>The fix:</strong> Audit your existing content using Google Search Console. Consolidate or expand pages with low impressions and high bounce rates. Each piece should comprehensively answer the searcher's query and demonstrate genuine topical authority.</p>

<h2>3. Neglecting Technical SEO Fundamentals</h2>
<p>Broken internal links, missing canonical tags, duplicate meta descriptions, and crawl errors silently drain your ranking potential. If Googlebot can't efficiently crawl and index your pages, even your best content won't rank.</p>
<ul>
  <li>Conduct a full technical audit using Screaming Frog or Ahrefs Site Audit monthly</li>
  <li>Fix all 4xx errors and redirect chains</li>
  <li>Ensure every important page is in your XML sitemap and is crawlable</li>
  <li>Use structured data markup (JSON-LD) for articles, products, and FAQs</li>
</ul>

<h2>4. Targeting the Wrong Keywords</h2>
<p>Ranking for high-volume head terms is vanity. Most conversions happen through long-tail keywords that signal clear purchase intent. A bakery ranking for "cakes" gets browsers; ranking for "custom wedding cakes Mumbai under 5000" gets buyers.</p>
<p><strong>The fix:</strong> Build a keyword map that aligns search terms to buyer journey stages. Use tools like Semrush or Ahrefs to identify keywords where you can realistically compete — and where the intent matches your offering. Our <a href="/services/seo">SEO service</a> includes full keyword architecture planning.</p>

<h2>5. Building Low-Quality Backlinks</h2>
<p>Paid link schemes, private blog networks, and mass directory submissions still cause manual penalties. Google's Spam Brain system is better than ever at detecting unnatural link profiles. A handful of strong, relevant editorial links beats hundreds of spammy ones.</p>
<p><strong>The fix:</strong> Audit your backlink profile with Google Search Console's Links report. Disavow toxic links. Focus link-building efforts on digital PR, guest contributions to industry publications, and creating genuinely linkable assets.</p>

<h2>6. Skipping Local SEO Optimisation</h2>
<p>If your business serves a geographic area, neglecting Google Business Profile is leaving significant traffic on the table. Local pack results appear above organic listings for most local queries and receive 44% of total clicks.</p>
<ul>
  <li>Verify and fully complete your Google Business Profile</li>
  <li>Maintain consistent NAP (Name, Address, Phone) across all directories</li>
  <li>Respond to every review — positive and negative</li>
  <li>Post weekly updates to signal an active, relevant business</li>
</ul>

<h2>7. Ignoring Mobile Usability</h2>
<p>Google uses mobile-first indexing — meaning it crawls and indexes the mobile version of your site first. A desktop-optimised site with a poor mobile experience will see rankings suffer across all devices.</p>
<p><strong>The fix:</strong> Test every key page with Google's Mobile-Friendly Test. Ensure tap targets are at least 48px, text is legible without zooming, and no content is hidden behind horizontal scroll. Our <a href="/services/web-development">web development team</a> builds mobile-first from day one.</p>

<h2>8. Forgetting About E-E-A-T</h2>
<p>Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) aren't direct ranking factors, but they influence how Google's quality raters evaluate your content — and those evaluations shape algorithm training. YMYL (Your Money or Your Life) sectors are especially affected.</p>
<p><strong>The fix:</strong> Add proper author bios with credentials, cite reputable sources, earn mentions from authoritative sites in your industry, and ensure your About page and contact information are prominent and credible.</p>

<h2>9. Not Tracking the Right Metrics</h2>
<p>Obsessing over keyword position while ignoring organic traffic, click-through rates, and conversions leads to misallocated effort. Position 1 for a keyword nobody searches is worthless; position 4 for a high-intent query may drive more revenue.</p>
<p><strong>The fix:</strong> Build a proper SEO dashboard in Google Looker Studio that connects Search Console, GA4, and your CRM. Track organic sessions, goal completions from organic, average CTR, and indexed page count — not just keyword rankings.</p>

<h2>10. Treating SEO as a One-Time Project</h2>
<p>SEO is not a campaign — it's an ongoing programme. Competitors are publishing content, earning links, and improving their technical foundations every single day. A site that was well-optimised two years ago will naturally lose ground without continuous investment.</p>
<p>The most successful brands treat SEO as a permanent channel with dedicated monthly budget for content creation, technical maintenance, and link acquisition. If you're ready to build a sustainable organic growth engine, <a href="/services/seo">our SEO team</a> is here to help.</p>

<h3>Final Thoughts</h3>
<p>Fixing these ten mistakes won't produce overnight results — organic SEO typically takes 3–6 months to show meaningful movement. But the compounding returns are unmatched. Paid ads stop the moment you cut the budget; a well-built organic presence keeps driving traffic and revenue for years. Start with a thorough audit, prioritise the highest-impact fixes, and stay consistent.</p>`,
    category: 'SEO',
    tags: ['SEO', 'Google Rankings', 'Core Web Vitals', 'Technical SEO', 'Content Strategy'],
    coverGradient: 'linear-gradient(135deg, #0a0a1a 0%, #0d1f3c 40%, #00d4aa22 100%)',
    author: 'Rohan Mehta',
    authorRole: 'SEO Strategist',
    status: 'published',
    internalLinks: [
      { text: 'Our SEO Services', url: '/services/seo' },
      { text: 'Web Development', url: '/services/web-development' },
      { text: 'Performance Marketing', url: '/services/performance-marketing' },
    ],
    createdAt: '2025-01-10T09:00:00.000Z',
    updatedAt: '2025-01-12T11:30:00.000Z',
    publishedAt: '2025-01-12T12:00:00.000Z',
    readTime: 7,
  },
  {
    id: 'blog_seed_002',
    slug: 'how-to-get-8x-roas-meta-ads-proven-framework',
    title: 'How to Get 8× ROAS on Meta Ads: Our Proven Framework',
    metaTitle: "How to Get 8× ROAS on Meta Ads: Cogent Agency's Proven Framework",
    metaDescription: 'Learn the exact Meta Ads framework Cogent Agency uses to deliver 8× ROAS for e-commerce clients — from campaign structure to creative strategy and audience targeting.',
    excerpt: "Getting 8× return on ad spend on Meta isn't magic — it's methodology. This is the exact campaign architecture, creative strategy, and optimisation framework we've used to scale e-commerce brands from ₹50K/month ad spend to over ₹5L/month while maintaining elite ROAS.",
    content: `<h2>The 8× ROAS Problem (and Why Most Brands Never Get There)</h2>
<p>The average ROAS on Meta Ads across e-commerce is around 2.5–3×. Many brands celebrate hitting 4×. So when we tell clients we consistently deliver 7–10× ROAS, they're sceptical — until they see the numbers in their own Ads Manager. The gap isn't luck or budget. It's architecture, creative, and a relentless testing culture. Here's the exact framework.</p>`,
    category: 'Performance Marketing',
    tags: ['Meta Ads', 'ROAS', 'Facebook Ads', 'E-commerce Marketing', 'Paid Social'],
    coverGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #a855f722 100%)',
    author: 'Priya Sharma',
    authorRole: 'Head of Performance Marketing',
    status: 'published',
    internalLinks: [
      { text: 'Performance Marketing Services', url: '/services/performance-marketing' },
      { text: 'Social Media Marketing', url: '/services/social-media-marketing' },
      { text: 'Contact Us', url: '/contact' },
    ],
    createdAt: '2025-01-20T09:00:00.000Z',
    updatedAt: '2025-01-22T14:00:00.000Z',
    publishedAt: '2025-01-22T15:00:00.000Z',
    readTime: 8,
  },
  {
    id: 'blog_seed_003',
    slug: 'why-brand-identity-is-your-most-valuable-marketing-asset',
    title: 'Why Your Brand Identity Is Your Most Valuable Marketing Asset',
    metaTitle: 'Why Brand Identity Is Your Most Valuable Marketing Asset | Cogent Agency',
    metaDescription: 'A strong brand identity reduces CAC, commands price premiums, and builds lasting loyalty. Learn how to build and leverage brand identity as a strategic business asset.',
    excerpt: "Businesses obsess over performance channels while neglecting the single asset that makes every channel more effective: brand identity. A strong brand doesn't just look good — it reduces your cost per acquisition, commands premium pricing, and creates a loyal customer base that no competitor can easily steal.",
    content: `<h2>The Most Undervalued Asset in Your Marketing Stack</h2>
<p>When a startup or growing business thinks about marketing investment, they naturally gravitate toward the measurable — Google Ads, Meta campaigns, SEO rankings. These are quantifiable, attributable, and satisfying to report on. Brand identity, by contrast, feels soft, expensive, and hard to justify in a quarterly review. This is a costly misconception, and it's one of the primary reasons that businesses with large ad budgets still struggle to build lasting market position.</p>`,
    category: 'Brand Strategy',
    tags: ['Brand Identity', 'Brand Strategy', 'Marketing Strategy', 'Brand Equity', 'Positioning'],
    coverGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1000 40%, #f59e0b22 100%)',
    author: 'Ananya Kapoor',
    authorRole: 'Brand Strategist',
    status: 'published',
    internalLinks: [
      { text: 'Our Services', url: '/services' },
      { text: 'Performance Marketing', url: '/services/performance-marketing' },
      { text: 'Contact Us', url: '/contact' },
    ],
    createdAt: '2025-02-01T09:00:00.000Z',
    updatedAt: '2025-02-03T10:00:00.000Z',
    publishedAt: '2025-02-03T11:00:00.000Z',
    readTime: 6,
  },
];

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_POSTS, null, 2), "utf-8");
  }
}

export function getBlogs(): BlogPost[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")) as BlogPost[];
  } catch {
    return SEED_POSTS;
  }
}

function writeBlogs(posts: BlogPost[]): void {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export function getPublishedBlogs(): BlogPost[] {
  return getBlogs()
    .filter((p) => p.status === "published" && p.publishedAt !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime()
    );
}

export function getBlogBySlug(slug: string): BlogPost | null {
  return getBlogs().find((p) => p.slug === slug) ?? null;
}

export function saveBlog(
  data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">
): BlogPost {
  const now = new Date().toISOString();
  const post: BlogPost = {
    ...data,
    id: `blog_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  const all = getBlogs();
  all.unshift(post);
  writeBlogs(all);
  return post;
}

export function updateBlog(
  id: string,
  data: Partial<BlogPost>
): BlogPost | null {
  const all = getBlogs();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: BlogPost = {
    ...all[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  all[idx] = updated;
  writeBlogs(all);
  return updated;
}

export function deleteBlog(id: string): void {
  writeBlogs(getBlogs().filter((p) => p.id !== id));
}

export function publishBlog(id: string): BlogPost | null {
  return updateBlog(id, {
    status: "published",
    publishedAt: new Date().toISOString(),
  });
}

export function unpublishBlog(id: string): BlogPost | null {
  return updateBlog(id, { status: "draft", publishedAt: null });
}

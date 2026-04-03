/**
 * Server-only SEO store — reads/writes to data/seo.json on disk.
 * Must only be imported in loaders, actions, or resource routes.
 */

import fs from "node:fs";
import path from "node:path";
import type { PageSeo, PageSchema } from "./seoStore";

export type { PageSeo, PageSchema };

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "seo.json");

/* ── Default schemas ─────────────────────────────────────── */
const orgSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Cogent Agency",
  "url": "https://cogent.agency",
  "logo": "https://cogent.agency/logo.png",
  "sameAs": [
    "https://www.instagram.com/cogent.agency",
    "https://www.linkedin.com/company/cogent-agency"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-00-0000-0000",
    "contactType": "customer service"
  }
}, null, 2);

const localBizSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cogent Agency",
  "image": "https://cogent.agency/logo.png",
  "url": "https://cogent.agency",
  "telephone": "+91-00-0000-0000",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressCountry": "IN"
  },
  "priceRange": "₹₹₹"
}, null, 2);

const webPageSchema = (name: string, url: string, desc: string) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": name,
  "url": url,
  "description": desc,
  "isPartOf": { "@type": "WebSite", "url": "https://cogent.agency" }
}, null, 2);

const serviceSchema = (name: string, desc: string) => JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "provider": { "@type": "Organization", "name": "Cogent Agency" },
  "description": desc,
  "areaServed": "IN"
}, null, 2);

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Cogent Agency offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cogent Agency offers Performance Marketing, SEO, Social Media Marketing, Video Production, Influencer Marketing, Web Design & Development, and 360° Digital Marketing."
      }
    }
  ]
}, null, 2);

const DEFAULT_PAGES: PageSeo[] = [
  {
    id: 'home', label: 'Home', path: '/',
    title: "Cogent Agency — India's Premier Digital Marketing Agency",
    metaTitle: 'Cogent Agency | Performance Marketing, SEO & Creative Studio',
    metaDescription: "Cogent is India's full-service digital marketing agency. We deliver ROI-driven performance marketing, SEO, social media, video production & web development.",
    ogImage: 'https://cogent.agency/og-home.jpg',
    canonical: 'https://cogent.agency/',
    robots: 'index, follow',
    keywords: 'digital marketing agency india, performance marketing, SEO agency, social media marketing',
    schemas: [
      { type: 'Organization', enabled: true, custom: orgSchema },
      { type: 'LocalBusiness', enabled: true, custom: localBizSchema },
      { type: 'FAQPage', enabled: true, custom: faqSchema },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'about', label: 'About', path: '/about',
    title: 'About Cogent Agency | Our Story, Team & Mission',
    metaTitle: 'About Cogent Agency | Digital Marketing Experts Since 2017',
    metaDescription: '7+ years of experience, 200+ brands served, and a relentless obsession with results.',
    ogImage: 'https://cogent.agency/og-about.jpg',
    canonical: 'https://cogent.agency/about',
    robots: 'index, follow',
    keywords: 'about cogent agency, digital marketing team, agency about us',
    schemas: [
      { type: 'Organization', enabled: true, custom: orgSchema },
      { type: 'WebPage', enabled: true, custom: webPageSchema('About Cogent Agency', 'https://cogent.agency/about', 'Meet the team behind Cogent Agency.') },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'services', label: 'Services', path: '/services',
    title: 'Our Services | Digital Marketing, SEO, Video & More — Cogent Agency',
    metaTitle: 'Digital Marketing Services | Cogent Agency',
    metaDescription: "Explore Cogent's full suite of digital marketing services — Performance Marketing, SEO, Social Media, Video Production, Influencer Marketing & Web Development.",
    ogImage: 'https://cogent.agency/og-services.jpg',
    canonical: 'https://cogent.agency/services',
    robots: 'index, follow',
    keywords: 'digital marketing services, SEO services, social media services india',
    schemas: [
      { type: 'Service', enabled: true, custom: serviceSchema('Digital Marketing Services', 'Full-suite digital marketing including SEO, paid ads, social media and video production.') },
      { type: 'WebPage', enabled: true, custom: webPageSchema('Services', 'https://cogent.agency/services', 'Full-suite digital marketing services.') },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'performance-marketing', label: 'Performance Marketing', path: '/services/performance-marketing',
    title: 'Performance Marketing Agency India | Google & Meta Ads — Cogent',
    metaTitle: 'Performance Marketing Services | ROI-Driven Ads — Cogent Agency',
    metaDescription: 'Cogent delivers ROI-obsessed paid media campaigns across Google, Meta & YouTube. Every rupee tracked, every conversion optimised.',
    ogImage: 'https://cogent.agency/og-performance.jpg',
    canonical: 'https://cogent.agency/services/performance-marketing',
    robots: 'index, follow',
    keywords: 'performance marketing agency, google ads agency india, meta ads agency',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('Performance Marketing', 'ROI-driven paid media campaigns across Google, Meta, and YouTube.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'seo', label: 'SEO', path: '/services/seo',
    title: 'SEO Agency India | Organic Growth & Rankings — Cogent Agency',
    metaTitle: 'SEO Services India | Technical SEO & Content Strategy — Cogent',
    metaDescription: "Dominate search rankings with Cogent's data-driven SEO strategy. Technical SEO, content, and link building that compounds month over month.",
    ogImage: 'https://cogent.agency/og-seo.jpg',
    canonical: 'https://cogent.agency/services/seo',
    robots: 'index, follow',
    keywords: 'SEO agency india, technical SEO, content strategy, link building',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('SEO Services', 'Data-driven SEO including technical SEO, content strategy, and link building.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'social-media-marketing', label: 'Social Media Marketing', path: '/services/social-media-marketing',
    title: 'Social Media Marketing Agency India | Cogent Agency',
    metaTitle: 'Social Media Marketing Services | Cogent Agency India',
    metaDescription: 'Grow your brand with strategic social media content, community management, and paid social campaigns that drive real results.',
    ogImage: 'https://cogent.agency/og-social.jpg',
    canonical: 'https://cogent.agency/services/social-media-marketing',
    robots: 'index, follow',
    keywords: 'social media marketing agency india, instagram marketing, facebook ads',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('Social Media Marketing', 'Strategic content, community management, and paid social campaigns.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'video-production', label: 'Video Production', path: '/services/video-production',
    title: 'Video Production Agency Mumbai | Brand Films & Reels — Cogent',
    metaTitle: 'Video Production Services | Brand Films, Reels & Ads — Cogent',
    metaDescription: 'From concept to final cut — Cogent produces scroll-stopping brand films, reels, ads, and explainer videos from our Mumbai studio.',
    ogImage: 'https://cogent.agency/og-video.jpg',
    canonical: 'https://cogent.agency/services/video-production',
    robots: 'index, follow',
    keywords: 'video production agency mumbai, brand film production, reel production',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('Video Production', 'Brand films, reels, ads and explainer videos produced in our studio.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'influencer-marketing', label: 'Influencer Marketing', path: '/services/influencer-marketing',
    title: 'Influencer Marketing Agency India | Creator Campaigns — Cogent',
    metaTitle: 'Influencer Marketing Services | Nano to Mega Creators — Cogent',
    metaDescription: 'Connect your brand with the right creators. Cogent manages end-to-end influencer campaigns from sourcing to ROI tracking.',
    ogImage: 'https://cogent.agency/og-influencer.jpg',
    canonical: 'https://cogent.agency/services/influencer-marketing',
    robots: 'index, follow',
    keywords: 'influencer marketing agency india, creator campaigns, influencer management',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('Influencer Marketing', 'End-to-end creator partnerships from nano to mega influencers.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'web-development', label: 'Web Design & Dev', path: '/services/web-development',
    title: 'Web Design & Development Agency India | React & Next.js — Cogent',
    metaTitle: 'Web Design & Development Services | Cogent Agency India',
    metaDescription: 'High-performance websites and digital products built with React and Next.js. Mobile-first, blazing fast, and built to convert.',
    ogImage: 'https://cogent.agency/og-web.jpg',
    canonical: 'https://cogent.agency/services/web-development',
    robots: 'index, follow',
    keywords: 'web design agency india, react development, next.js agency',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('Web Design & Development', 'High-performance React and Next.js websites built to convert.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: '360-digital-marketing', label: '360° Digital Marketing', path: '/services/360-digital-marketing',
    title: '360° Digital Marketing Agency India | Full-Funnel Strategy — Cogent',
    metaTitle: '360° Digital Marketing Services | Cogent Agency',
    metaDescription: 'Full-funnel digital presence across every channel — SEO, paid ads, social, video, influencer and web — all under one roof.',
    ogImage: 'https://cogent.agency/og-360.jpg',
    canonical: 'https://cogent.agency/services/360-digital-marketing',
    robots: 'index, follow',
    keywords: '360 degree digital marketing, full funnel marketing, integrated digital marketing',
    schemas: [{ type: 'Service', enabled: true, custom: serviceSchema('360° Digital Marketing', 'Full-funnel integrated digital marketing across every channel.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'studio', label: 'Cogent Studio', path: '/studio',
    title: 'Cogent Studio | Podcast, Studio Shoots & Creative Production Mumbai',
    metaTitle: 'Cogent Studio | Professional Podcast & Shoot Studio Mumbai',
    metaDescription: 'State-of-the-art creative studio in Mumbai for podcasts, brand shoots, video production and cinematic content.',
    ogImage: 'https://cogent.agency/og-studio.jpg',
    canonical: 'https://cogent.agency/studio',
    robots: 'index, follow',
    keywords: 'podcast studio mumbai, brand shoot studio, video production studio',
    schemas: [
      { type: 'LocalBusiness', enabled: true, custom: localBizSchema },
      { type: 'Service', enabled: true, custom: serviceSchema('Cogent Studio', 'Professional podcast, shoot and video production studio in Mumbai.') },
    ],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'portfolio', label: 'Portfolio', path: '/portfolio',
    title: 'Portfolio | Our Work & Case Studies — Cogent Agency',
    metaTitle: 'Portfolio & Case Studies | Cogent Agency',
    metaDescription: "Explore Cogent's work across e-commerce, fintech, healthcare, real estate, SaaS and fashion brands.",
    ogImage: 'https://cogent.agency/og-portfolio.jpg',
    canonical: 'https://cogent.agency/portfolio',
    robots: 'index, follow',
    keywords: 'digital marketing portfolio, case studies, agency work',
    schemas: [{ type: 'WebPage', enabled: true, custom: webPageSchema('Portfolio', 'https://cogent.agency/portfolio', 'Explore our work and case studies.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'blog', label: 'Blog', path: '/blog',
    title: 'Blog | Digital Marketing Insights & Tips — Cogent Agency',
    metaTitle: 'Digital Marketing Blog | Cogent Agency Insights',
    metaDescription: 'Expert insights on SEO, performance marketing, social media, brand strategy and more from the Cogent Agency team.',
    ogImage: 'https://cogent.agency/og-blog.jpg',
    canonical: 'https://cogent.agency/blog',
    robots: 'index, follow',
    keywords: 'digital marketing blog, SEO tips, marketing insights india',
    schemas: [{ type: 'WebPage', enabled: true, custom: webPageSchema('Blog', 'https://cogent.agency/blog', 'Digital marketing insights and tips.') }],
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'contact', label: 'Contact', path: '/contact',
    title: 'Contact Cogent Agency | Get a Free Consultation',
    metaTitle: "Contact Us | Cogent Agency — Let's Build Something Big",
    metaDescription: 'Ready to grow your brand? Get in touch with Cogent Agency. We respond within 24 hours.',
    ogImage: 'https://cogent.agency/og-contact.jpg',
    canonical: 'https://cogent.agency/contact',
    robots: 'index, follow',
    keywords: 'contact cogent agency, digital marketing consultation, hire marketing agency',
    schemas: [{ type: 'LocalBusiness', enabled: true, custom: localBizSchema }],
    updatedAt: new Date().toISOString(),
  },
];

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_PAGES, null, 2), "utf-8");
  }
}

export function getAllSeoPages(): PageSeo[] {
  ensureFile();
  try {
    const stored: PageSeo[] = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    // Merge in any default pages not yet in the file
    const storedIds = new Set(stored.map((p) => p.id));
    return [...stored, ...DEFAULT_PAGES.filter((d) => !storedIds.has(d.id))];
  } catch {
    return DEFAULT_PAGES;
  }
}

export function getSeoByPath(pathname: string): PageSeo | null {
  const normalised = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  return getAllSeoPages().find((p) => p.path === normalised) ?? null;
}

export function saveSeoPage(page: PageSeo): void {
  const all = getAllSeoPages();
  const idx = all.findIndex((p) => p.id === page.id);
  const updated = { ...page, updatedAt: new Date().toISOString() };
  if (idx >= 0) all[idx] = updated;
  else all.push(updated);
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
}

export function resetSeoPage(id: string): void {
  const def = DEFAULT_PAGES.find((p) => p.id === id);
  if (!def) return;
  saveSeoPage({ ...def, updatedAt: new Date().toISOString() });
}

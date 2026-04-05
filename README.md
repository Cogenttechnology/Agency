# Cogent Agency — Website Architecture

> Full technical reference for the Cogent Agency website. Read this before making any code changes.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Routing](#3-routing)
4. [Root Layout](#4-root-layout)
5. [Pages](#5-pages)
6. [Components](#6-components)
7. [Context & State](#7-context--state)
8. [Hooks](#8-hooks)
9. [Lib / Stores](#9-lib--stores)
10. [CSS Architecture & Design Tokens](#10-css-architecture--design-tokens)
11. [API Routes](#11-api-routes)
12. [Backend — Supabase](#12-backend--supabase)
13. [Assets](#13-assets)
14. [Build & Performance](#14-build--performance)
15. [Admin CMS](#15-admin-cms)
16. [Key Patterns & Conventions](#16-key-patterns--conventions)

---

## 1. Tech Stack

| Layer | Library / Tool | Version | Purpose |
|---|---|---|---|
| UI | React | 19.2.4 | Component framework |
| Routing | React Router | v7.13.2 | File-based SSR routing |
| Language | TypeScript | 5.9 | Strict mode, path alias `~/*` |
| Build | Vite | 6.0.0 | Dev server + production bundler |
| Animation | GSAP + @gsap/react | 3.14.2 | Scroll-triggered animations |
| Smooth scroll | Lenis | 1.3.20 | Inertia scroll synced with GSAP |
| 3D graphics | React Three Fiber + Drei | 9.5 / 10.7 | Hero sphere + service blobs |
| Icons | Lucide React | 1.6.0 | All UI icons |
| Backend | Supabase | 2.101.1 | Enquiries + blog posts DB |
| CSS | Custom CSS + Tailwind utilities | — | Design tokens + component styles |
| Performance | Web Vitals | 5.2.0 | CWV reporting (LCP, CLS, INP) |

**Scripts:**
```
npm run dev      → React Router dev server (HMR)
npm run build    → Production build (NODE_OPTIONS 4GB memory)
npm run start    → Serve built app
npm run lint     → ESLint checks
```

---

## 2. Project Structure

```
d:\Cogent\Agency\
├── src/
│   ├── assets/                   # Static assets
│   │   ├── Logo.png
│   │   ├── logo.svg
│   │   ├── ai_viideos/           # MP4s for VideoShowcase
│   │   ├── documentry_ads/
│   │   ├── jewellery/
│   │   ├── lead_ads/
│   │   ├── lifestyle_ads/
│   │   ├── tvc/
│   │   ├── ugc_videos/
│   │   └── vertical_ads/
│   │
│   ├── components/               # Reusable UI components
│   │   ├── 3D/
│   │   │   ├── HeroCanvas.tsx    # Animated 3D sphere (Three.js)
│   │   │   └── ServiceBlobCanvas.tsx
│   │   ├── ClientLogos/          # Infinite marquee of 10 logos
│   │   ├── Cursor/               # Custom cursor + follower (GSAP)
│   │   ├── EnquiryModal/         # Contact form modal (global)
│   │   ├── FaqAccordion/         # Reusable FAQ accordion
│   │   ├── FloatingCTA/          # Sticky WhatsApp + Enquiry buttons
│   │   ├── Footer/               # Site footer
│   │   ├── Navbar/               # Header with mega-menu dropdowns
│   │   ├── PageTransition/       # Page reveal overlay animation
│   │   ├── PerfShowcase/         # Performance marketing case studies
│   │   ├── SeoShowcase/          # SEO results showcase
│   │   ├── SocialShowcase/       # Social media campaigns showcase
│   │   ├── VideoShowcase/        # Video reel player with categories
│   │   └── WorkShowcase/         # Portfolio case study items
│   │
│   ├── context/
│   │   └── EnquiryContext.tsx    # Global modal open/close state
│   │
│   ├── hooks/
│   │   ├── useLenis.ts           # Smooth scroll (Lenis + GSAP sync)
│   │   └── useSeo.ts             # Dynamic SEO meta tag injection
│   │
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client + Storage upload helpers
│   │   ├── gsap.ts               # GSAP plugins + animation helpers
│   │   ├── webVitals.ts          # Core Web Vitals reporter
│   │   ├── seoStore.ts           # SEO data (client: localStorage)
│   │   ├── seoStore.server.ts    # SEO data (server: data/seo.json)
│   │   ├── blogStore.ts          # Blog posts (client: localStorage)
│   │   ├── blogStore.server.ts   # Blog posts (server: Supabase)
│   │   ├── enquiryStore.ts       # Enquiries (Supabase)
│   │   └── scriptStore.ts        # Tracking scripts (localStorage)
│   │
│   ├── pages/
│   │   ├── Home/                 # / (landing page)
│   │   ├── About/                # /about-us
│   │   ├── LifeAtCogent/         # /life-at-cogent
│   │   ├── Services/             # /services + 10 individual service pages
│   │   ├── Portfolio/            # /portfolio
│   │   ├── Blog/                 # /blog + /blog/:slug
│   │   ├── Studio/               # /studio
│   │   ├── Contact/              # /contact
│   │   ├── ThankYou/             # /thank-you
│   │   ├── Admin/                # /admin (CMS dashboard)
│   │   └── api/                  # Server-side API handlers
│   │       ├── blogs.ts
│   │       ├── enquiries.ts
│   │       └── seo.ts
│   │
│   ├── styles/
│   │   └── globals.css           # Design tokens + global styles
│   │
│   ├── root.tsx                  # App layout shell + meta/SEO loader
│   ├── routes.ts                 # All route definitions
│   ├── entry.client.tsx          # Client hydration entry
│   └── entry.server.tsx          # SSR rendering entry
│
├── data/
│   ├── seo.json                  # Persisted SEO metadata (edited via admin)
│   └── blogs.json                # Persisted blog posts (edited via admin)
│
├── public/                       # Static public assets
├── package.json
├── vite.config.ts
├── tsconfig.app.json
└── react-router.config.ts
```

---

## 3. Routing

**File:** `src/routes.ts`

React Router v7 uses explicit route config (not file-based auto-discovery).

| URL | File | Notes |
|---|---|---|
| `/` | `pages/Home/Home.tsx` | Landing page |
| `/about-us` | `pages/About/About.tsx` | Company story, team, values |
| `/life-at-cogent` | `pages/LifeAtCogent/LifeAtCogent.tsx` | Culture, events, photos |
| `/services` | `pages/Services/Services.tsx` | Services overview |
| `/ppc-company-in-jaipur` | `pages/Services/PerformanceMarketing.tsx` | PPC / Performance Marketing |
| `/best-seo-company-in-jaipur` | `pages/Services/SEO.tsx` | SEO |
| `/best-social-media-marketing-company-in-jaipur` | `pages/Services/SocialMediaMarketing.tsx` | Social Media |
| `/services/video-production` | `pages/Services/VideoProduction.tsx` | Video Production |
| `/services/influencer-marketing` | `pages/Services/InfluencerMarketing.tsx` | Influencer Marketing |
| `/website-development-company-in-jaipur` | `pages/Services/WebDevelopment.tsx` | Web Design & Dev |
| `/best-digital-marketing-company-in-jaipur` | `pages/Services/Digital360.tsx` | 360° Digital Marketing |
| `/d2c-marketing-agency-in-jaipur` | `pages/Services/D2CMarketing.tsx` | D2C Marketing |
| `/content-marketing-agency-in-jaipur` | `pages/Services/ContentMarketing.tsx` | Content Marketing |
| `/marketing-consultant-in-jaipur` | `pages/Services/MarketingConsultant.tsx` | Marketing Consultant |
| `/portfolio` | `pages/Portfolio/Portfolio.tsx` | Filterable case studies |
| `/studio` | `pages/Studio/Studio.tsx` | Cogent Studio (in-house production) |
| `/blog` | `pages/Blog/Blog.tsx` | Blog listing with categories |
| `/blog/:slug` | `pages/Blog/BlogPost.tsx` | Individual blog post |
| `/contact` | `pages/Contact/Contact.tsx` | Contact form + info |
| `/thank-you` | `pages/ThankYou/ThankYou.tsx` | Post-enquiry confirmation |
| `/admin` | `pages/Admin/Admin.tsx` | CMS dashboard (no Navbar/Footer) |
| `/api/blogs` | `pages/api/blogs.ts` | Blog CRUD API |
| `/api/enquiries` | `pages/api/enquiries.ts` | Enquiry submit + manage API |
| `/api/seo` | `pages/api/seo.ts` | SEO metadata CRUD API |

**To add a new route:** add a `route("path", "pages/Folder/Component.tsx")` line in `src/routes.ts`.

---

## 4. Root Layout

**File:** `src/root.tsx`

This is the outermost shell that wraps every page.

### Functions in root.tsx

| Function | What it does |
|---|---|
| `loader()` | Fetches SEO metadata for current route path from `seoStore.server.ts` |
| `meta()` | Generates `<title>`, `<meta>`, Open Graph, Twitter Card, canonical tags from loader data |
| `links()` | Preconnects to Google Fonts, preloads Outfit + Plus Jakarta Sans |
| `Layout()` | Pure HTML shell — `<html>`, `<head>`, `<body>`, injects tracking scripts |
| `App()` | Main wrapper — provides EnquiryContext, renders Cursor + Navbar + `<Outlet>` + Footer + EnquiryModal + FloatingCTA |
| `ErrorBoundary()` | Fallback UI for 404s and unhandled errors |

### App() responsibilities
- Wraps everything in `<EnquiryProvider>`
- Runs `useLenis()` for smooth scroll init
- Refreshes `ScrollTrigger` on every route change
- Calls `reportWebVitals()` on mount
- Conditionally hides Navbar + Footer on `/admin`

---

## 5. Pages

Each page lives in its own folder with a `.tsx` + `.css` pair.

### Home (`/`)
- Hero: animated 3D sphere (HeroCanvas), headline, CTA buttons
- Stats row: 60+ professionals, 6+ years, 99.9% retention, 15+ industries
- Floating channel icons (SEO, Meta, Social, Video, Email, Influencer) with GSAP animations
- Service highlights linking to individual service pages
- ClientLogos marquee
- CTA section opening EnquiryModal

### About (`/about-us`)
- Cinematic hero with background orbs + grain overlay
- Origin story section
- Core values grid (6 values with icons and colors)
- Timeline section
- Team section
- ClientLogos
- FAQ accordion
- CTA section

### Life at Cogent (`/life-at-cogent`)
- Culture page showing team events and moments
- Hero section with gradient orbs
- Event grid (3-col → 2-col → 1-col responsive)
- Each card: image/video media, tag badge, title, description
- GSAP scroll-triggered card reveals
- To add real events: edit the `events` array at the top of `LifeAtCogent.tsx`

### Services (`/services`)
- Three service pillars: Brand Strategy, Digital Marketing, Creative Production
- 3D ServiceBlobCanvas for each pillar
- Links to all 10 individual service pages
- ClientLogos

### Individual Service Pages (10 pages)
All share `ServicePage.css` and follow this structure:
- Hero with service title + description
- Key features/benefits grid
- Showcase component (PerfShowcase / SeoShowcase / SocialShowcase / VideoShowcase)
- Process steps / methodology
- Pricing tiers or packages
- FAQ accordion
- ClientLogos
- CTA section

### Portfolio (`/portfolio`)
- Category filter tabs: All, Branding, Digital, Web, Video (GSAP Flip transitions)
- 9 projects: Novo Retail, PulseX, Ecliptic.io, FlowState Film, Synapse Labs, Catalyst Growth, Axion Store, Zenith Intro, Brandify
- Each card: gradient bg, category, result metric, tags, external link

### Blog (`/blog`)
- Category filters
- Blog card grid: title, author, date, read time, category, tags, excerpt
- Links to `/blog/:slug`

### Blog Post (`/blog/:slug`)
- Full article rendered from HTML content
- Author card, read time, category, tags
- Related posts (3 suggestions)
- Internal links sidebar
- JSON-LD Article schema for SEO

### Studio (`/studio`)
- In-house creative production facility page
- Studio capabilities: 4K cameras, lighting, sound stage, editing
- Service cards: Podcast, Shoots, Brand Films, Product Shoots, Reels, Interviews, Voiceovers, Music
- Hourly booking pricing
- CTA to contact

### Contact (`/contact`)
- Form fields: name, email, phone, company, services (checkboxes), budget range, message
- Service options: Performance Marketing, Video, SEO, Social, Influencer, Web Design
- Budget tiers: Under ₹50K | ₹50K–₹1.5L | ₹1.5L–₹5L | ₹5L+
- On submit: POST to `/api/enquiries`, redirect to `/thank-you`
- Contact info card: email, phone, location

### Admin (`/admin`)
- No Navbar or Footer (excluded in root.tsx)
- Auth: `admin@gmail.com` / `admin@123` (client-side check only)
- Four tabs: Enquiries, Blogs, SEO, Scripts
- See [Section 15](#15-admin-cms) for full detail

---

## 6. Components

### Navbar (`src/components/Navbar/`)

**Two dropdown menus:**

1. **About dropdown** (`hasAboutDropdown: true`) — triggered on hover over "About"
   - About Us → `/about-us`
   - Life at Cogent → `/life-at-cogent`
   - Slim list layout (300px wide), arrow icon per item

2. **Services dropdown** (`hasDropdown: true`) — triggered on hover over "Services"
   - 7 services in a 2-col grid (540px wide): Performance Marketing, Video Production, SEO, Social Media, Influencer, Web Design & Dev, 360° Digital
   - Footer link: "View all services →"

**Mobile menu:** Hamburger → accordion toggles for both About and Services dropdowns.

**Active state logic:**
- Services: active if `pathname.startsWith('/services')` or matches any top-level service path
- About: active if `pathname === '/about-us'` or `pathname === '/life-at-cogent'`

**To add a new nav item:** add to `navLinks` array in `Navbar.tsx`. For a dropdown, add `hasDropdown` or `hasAboutDropdown: true`.

---

### Footer (`src/components/Footer/`)

Four columns:
1. **Brand** — logo, tagline, social icons (Instagram, Twitter, LinkedIn)
2. **Navigation** — Home, About, Life at Cogent, Services, Portfolio, Content Marketing, Marketing Consultant, Blog, Contact
3. **Services** — 7 service links
4. **Contact** — email, phone, location

Top CTA banner with "Start a Project" button.

**To add a footer link:** add to `navLinks` array in `Footer.tsx`.

---

### EnquiryModal (`src/components/EnquiryModal/`)
- Triggered globally via `openEnquiry()` from `useEnquiry()` context
- GSAP open/close animation (scale + fade)
- Closes on backdrop click or X button
- POSTs to `/api/enquiries` with `_action: "submit"`

### FloatingCTA (`src/components/FloatingCTA/`)
- Appears 1.2s after page load (GSAP stagger)
- WhatsApp button: opens WhatsApp with preset message
- Enquiry button: calls `openEnquiry()`

### Cursor (`src/components/Cursor/`)
- Hidden on touch devices
- Two elements: cursor dot + cursor follower
- GSAP mousemove tracking with lag on follower
- Scales up 3× on hover over links/buttons

### ClientLogos (`src/components/ClientLogos/`)
- CSS animation marquee (no JS)
- 10 client logos with brand colors
- 3 rows, middle row scrolls reverse
- Used on: Home, Services, Portfolio, Contact, Studio, About

### VideoShowcase (`src/components/VideoShowcase/`)
- Video player with category tabs
- Categories: Cinematic Ad, Brand Film, Social Reel, BTS, Documentary, UGC, TVC, Lifestyle, Lead Ad, AI Video, Jewellery
- Metadata per video: title, client, campaign note, view count, duration
- Used on: VideoProduction service page

### FaqAccordion (`src/components/FaqAccordion/`)
- Props: `items: { q: string; a: string }[]`, `classBase?: string`
- One item open at a time
- Used on: About, all service pages

### HeroCanvas (`src/components/3D/HeroCanvas.tsx`)
- React Three Fiber scene
- Animated distorted sphere (color `#6c63ff`) with noise shader
- Stars particle background
- Loaded only on Home page

### ServiceBlobCanvas (`src/components/3D/ServiceBlobCanvas.tsx`)
- Morphing CSS blob (no WebGL) animated via GSAP
- `color` prop for dynamic brand coloring
- Floats up/down with organic border-radius animation
- Used on Services overview page

---

## 7. Context & State

### EnquiryContext (`src/context/EnquiryContext.tsx`)

```typescript
interface EnquiryContextValue {
  isOpen: boolean;
  openEnquiry: () => void;
  closeEnquiry: () => void;
}
```

- Provided at root level in `App()` in `root.tsx`
- Consumed by: Navbar CTA button, FloatingCTA, EnquiryModal, all page CTA buttons

**Usage:**
```tsx
import { useEnquiry } from '../../context/EnquiryContext';
const { openEnquiry } = useEnquiry();
<button onClick={openEnquiry}>Let's Talk</button>
```

---

## 8. Hooks

### useLenis (`src/hooks/useLenis.ts`)
- Initializes Lenis smooth scroll engine once on mount
- Syncs Lenis RAF with GSAP's ticker so animations stay in sync
- Fires `ScrollTrigger.update()` on every Lenis scroll event
- Exports `getLenis()` to programmatically scroll anywhere
- Called once in `App()` in `root.tsx`

### useSeo (`src/hooks/useSeo.ts`)
- Reads current `pathname` and injects matching SEO metadata into `<head>`
- Sets: `<title>`, all `<meta>` tags, canonical `<link>`, JSON-LD `<script>` tags
- Listens for `cogent_seo_updated` custom event to re-inject when admin saves changes
- Called automatically via the root loader — not needed in individual pages

---

## 9. Lib / Stores

### supabase.ts
```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
export default supabase;
```

**Storage helpers** (also exported from `supabase.ts`):

| Function | Signature | Purpose |
|---|---|---|
| `uploadBlogImage` | `(file: File) => Promise<string>` | Uploads to `blog-images/covers/`, returns public URL |
| `deleteBlogImage` | `(publicUrl: string) => Promise<void>` | Removes file from Storage by URL (best-effort) |

Upload path format: `covers/{timestamp}-{random}.{ext}`

---

### gsap.ts
Registers plugins: `ScrollTrigger`, `Flip`, `TextPlugin`.

Helper functions exported:
| Function | What it does |
|---|---|
| `fadeUpReveal(el, delay?)` | y: 60→0, opacity: 0→1 with ScrollTrigger |
| `staggerReveal(els, stagger?)` | Same but staggers multiple elements |
| `expandWidth(el)` | width: 0→100% for progress bars / underlines |
| `magneticHover(el)` | Mouse-following magnetic effect |

Always import GSAP from `../../lib/gsap` — never directly from `gsap` — so plugins are pre-registered.

---

### seoStore.ts / seoStore.server.ts

**PageSeo interface:**
```typescript
interface PageSeo {
  id: string;
  path: string;          // e.g. "/about-us"
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  canonical: string;
  schemas: PageSchema[]; // JSON-LD objects
}
```

14 default pages pre-configured with full meta + schemas.
- `seoStore.ts` (client): reads/writes localStorage
- `seoStore.server.ts` (server): reads/writes `data/seo.json`

---

### blogStore.ts / blogStore.server.ts

**BlogPost interface:**
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;            // HTML string
  category: string;
  tags: string[];
  coverGradient: string;      // CSS gradient (fallback when no image)
  coverImage: string | null;  // Supabase Storage public URL (nullable)
  author: string;
  authorRole: string;
  status: 'draft' | 'published';
  readTime: number;           // minutes
  internalLinks: { text: string; url: string }[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

3 seed posts: SEO article, Meta Ads ROAS guide, Brand Identity piece.
- `blogStore.ts` (client): localStorage with seed fallback
- `blogStore.server.ts` (server): Supabase `blogs` table

---

### enquiryStore.ts

**Enquiry interface:**
```typescript
interface Enquiry {
  id: string;
  source: 'modal' | 'contact';
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: string;
}
```

All operations use the Supabase `enquiries` table.

---

### scriptStore.ts

**TrackingScript interface:**
```typescript
interface TrackingScript {
  id: string;
  name: string;
  type: 'meta_pixel' | 'gtm' | 'ga4' | 'custom';
  code: string;
  placement: 'head' | 'body_start' | 'body_end';
  enabled: boolean;
}
```

Scripts stored in localStorage, injected into `Layout()` in `root.tsx` based on placement.

---

## 10. CSS Architecture & Design Tokens

**File:** `src/styles/globals.css`

All tokens are CSS custom properties on `:root`.

### Colors
```css
--color-bg:           #080810    /* Page background */
--color-bg-2:         #0f0f1a    /* Secondary background */
--color-surface:      #14141f    /* Card / panel background */
--color-surface-2:    #1c1c2e    /* Elevated surface */
--color-border:       rgba(255,255,255,0.08)

--color-accent:       #6c63ff    /* Primary purple */
--color-accent-light: #8b85ff    /* Hover states, active links */
--color-accent-dark:  #4a44cc    /* Pressed states */
--color-accent2:      #ff6b6b    /* Red / coral accent */
--color-accent3:      #00d4aa    /* Teal accent */

--color-text:         #f0f0f5    /* Primary text */
--color-text-2:       #b0b0c0    /* Secondary text, descriptions */
--color-muted:        #606080    /* Placeholder, disabled */

--color-gradient-1:   linear-gradient(135deg, #6c63ff 0%, #ff6b6b 100%)
--color-gradient-2:   linear-gradient(135deg, #00d4aa 0%, #6c63ff 100%)
```

### Typography
```css
--font-display: 'Outfit'            /* All headings, bold labels */
--font-body:    'Plus Jakarta Sans' /* All body text */
```

### Spacing
```css
--space-xs: 0.5rem   --space-sm: 1rem
--space-md: 2rem     --space-lg: 4rem    --space-xl: 8rem
```

### Border Radius
```css
--radius-sm: 8px   --radius-md: 16px   --radius-lg: 24px   --radius-full: 9999px
```

### Motion
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in:  cubic-bezier(0.7, 0, 0.84, 0)
--ease-io:  cubic-bezier(0.85, 0, 0.15, 1)
--duration: 0.4s
```

### Z-Index Layers
```css
--z-base:    1       /* Content */
--z-overlay: 10      /* Modals, dropdowns */
--z-nav:     100     /* Navbar */
--z-cursor:  9999    /* Custom cursor */
```

### Utility Classes
| Class | Purpose |
|---|---|
| `.container` | Max-width 1440px, responsive horizontal padding |
| `.section` | 5.5rem vertical padding |
| `.section--sm` | 3rem vertical padding |
| `.glass` | Glassmorphic effect (backdrop-filter + border) |
| `.text-gradient` | Gradient text using `--color-gradient-1` |
| `.btn` | Base button reset |
| `.btn-primary` | Filled accent button with shine effect |
| `.btn-outline` | Outlined button |
| `.tag` | Small badge (rounded, accent background) |
| `.grid-2` / `.grid-3` / `.grid-4` | CSS Grid layout utilities |

### Responsive Breakpoints
```
1024px  →  2-col grids
768px   →  1-col, reduced padding
480px   →  tightest mobile sizing
```

### Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## 11. API Routes

All API handlers live in `src/pages/api/`. Admin actions require header `x-admin-token: cogent_admin_auth`.

### `/api/enquiries`

| Method | Action / Condition | Body | Response |
|---|---|---|---|
| POST | `_action: "submit"` (public) | name, email, phone, company, services, budget, message, source | 201: Enquiry object |
| POST | `_action: "updateStatus"` (admin) | id, status | 200: `{ ok: true }` |
| POST | `_action: "delete"` (admin) | id | 200: `{ ok: true }` |
| GET | `?count=unread` (admin) | — | 200: `{ count: number }` |
| GET | (admin) | — | 200: Enquiry[] |

### `/api/blogs`

| Method | Action | Key Fields | Response |
|---|---|---|---|
| POST | `_action: "create"` | All BlogPost fields | 201: BlogPost |
| POST | `_action: "update"` | id + partial fields | 200: BlogPost |
| POST | `_action: "publish"` / `"unpublish"` | id | 200: BlogPost |
| POST | `_action: "delete"` | id | 200: `{ ok: true }` |
| POST | `_action: "getBySlug"` | slug | 200: BlogPost |
| GET | (admin) | — | 200: BlogPost[] |

### `/api/seo`

| Method | Action | Key Fields | Response |
|---|---|---|---|
| POST | `_action: "save"` | Full PageSeo object | 200: `{ ok: true }` |
| POST | `_action: "reset"` | id | 200: `{ ok: true }` |
| POST | `_action: "getByPath"` | path | 200: PageSeo |
| GET | (admin) | — | 200: PageSeo[] |

---

## 12. Backend — Supabase

**Client:** `src/lib/supabase.ts`

**Environment variables (`.env`):**
```
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=[anon key]
```

### Database Tables

**`enquiries`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key, auto-generated |
| source | text | `'modal'` or `'contact'` |
| name, email, phone, company | text | Form fields |
| services | jsonb | Array of selected services |
| budget, message | text | Form fields |
| status | text | `'new'` / `'read'` / `'replied'` / `'closed'` |
| created_at | timestamptz | Auto |

**`blogs`**
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| slug | text | Unique URL identifier |
| title, meta_title, meta_description | text | SEO fields |
| excerpt, content | text | Content (HTML) |
| category, tags | text / text[] | Categorization |
| cover_gradient | text | CSS gradient fallback |
| cover_image | text | Supabase Storage public URL (nullable) |
| author, author_role | text | Byline |
| status | text | `'draft'` / `'published'` |
| read_time | int | Minutes |
| internal_links | jsonb | `[{ text, url }]` |
| created_at, updated_at, published_at | timestamptz | Timestamps |

### Supabase Storage

**Bucket: `blog-images`**
| Setting | Value |
|---|---|
| Visibility | Public |
| Upload path | `covers/{timestamp}-{random}.{ext}` |
| Allowed MIME types | Any image |
| Max file size | 50 MB (bucket default) — code enforces 5 MB |
| RLS Policy | INSERT allowed for `anon` role (`bucket_id = 'blog-images'`) |

Images are uploaded client-side from the Admin CMS via `uploadBlogImage()` in `supabase.ts`. The returned public URL is stored in `blogs.cover_image` and served directly to readers.

---

## 13. Assets

All video assets in `src/assets/` are organized by ad category:

| Folder | Files | Used in |
|---|---|---|
| `ai_viideos/` | 2 MP4s | VideoShowcase — AI Video tab |
| `documentry_ads/` | 1 MP4 | VideoShowcase — Documentary tab |
| `jewellery/` | 5 MP4s | VideoShowcase — Jewellery tab |
| `lead_ads/` | 3 MP4s | VideoShowcase — Lead Ad tab |
| `lifestyle_ads/` | 3 MP4s | VideoShowcase — Lifestyle tab |
| `tvc/` | 2 MP4s | VideoShowcase — TVC tab |
| `ugc_videos/` | 7 MP4s | VideoShowcase — UGC tab |
| `vertical_ads/` | 2 MP4s | VideoShowcase — Social Reel tab |
| `Logo.png` | Brand logo | Navbar, Footer |
| `logo.svg` | Vector logo | Favicons, OG image |

---

## 14. Build & Performance

**File:** `vite.config.ts`

### Code Splitting
```
vendor-react    →  React + React Router core
vendor-gsap     →  GSAP (~200KB)
vendor-three    →  @react-three/fiber + drei + three.js (only on 3D pages)
vendor-lenis    →  Lenis smooth scroll (~40KB)
Main bundle     →  App code
```

### Other Optimizations
- CSS code splitting: each page loads only its own CSS
- Chunk size warning threshold: 600KB
- Asset filenames include content hash for long-term caching
- 4GB memory allocation for production build (`--max-old-space-size=4096`)
- Web Vitals (LCP, CLS, INP) reported to console, color-coded by rating

---

## 15. Admin CMS

**URL:** `/admin`
**Auth:** `admin@gmail.com` / `admin@123` (client-side only — no server auth)
**Note:** Navbar and Footer are hidden on `/admin` (excluded in `root.tsx`)

### Tab 1 — Enquiries
- Table of all form submissions from EnquiryModal and Contact page
- Status badges: new (purple) / read (blue) / replied (green) / closed (grey)
- Actions per row: mark read, mark replied, close, delete
- Unread count badge shown in tab header

### Tab 2 — Blogs
- Create new post or edit existing
- Fields: title, slug (auto-generated from title), metaTitle, metaDescription, excerpt, category, tags, author, read time, cover gradient, internal links
- **Cover Image upload** — click "Upload Image" to pick a file (JPG/PNG/WebP, max 5 MB):
  - Uploads to Supabase Storage bucket `blog-images/covers/`
  - Public URL saved in `cover_image` field on the blog post
  - Preview shown immediately with a "Remove" button to delete + clear
  - Cover gradient acts as fallback when no image is set
- Rich text editor for HTML content with formatting toolbar (H2, H3, Bold, Italic, UL, Link)
- Publish / unpublish toggle
- Posts saved to Supabase `blogs` table — live immediately on publish, no redeploy needed

### Tab 3 — SEO
- 14 pre-configured pages matching all routes
- Editable per page: title, description, keywords, OG fields, Twitter fields, canonical URL, JSON-LD schemas
- "Reset to default" button per page
- Changes persist to `data/seo.json` and immediately update live meta tags via `cogent_seo_updated` custom event

### Tab 4 — Scripts
- Add / edit / delete tracking scripts
- Types: Meta Pixel, GTM, GA4, Custom HTML/JS
- Placement: `<head>` / `<body>` start / `<body>` end
- Enable / disable toggle per script
- Injected globally in `Layout()` in `root.tsx` based on placement setting

---

## 16. Key Patterns & Conventions

### File naming
- Pages and components: `PascalCase.tsx` + `PascalCase.css` in their own folder
- Stores / utils: `camelCase.ts`
- CSS class naming: `component-name__element--modifier` (BEM-like)

### GSAP animation pattern (used on every page)
```tsx
const pageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP / ScrollTrigger calls go here
  }, pageRef);

  return () => ctx.revert(); // Essential: prevents ScrollTrigger leaks on navigation
}, []);
```

### Always import GSAP from lib
```tsx
import { gsap, ScrollTrigger } from '../../lib/gsap'; // correct — plugins pre-registered
import { gsap } from 'gsap';                          // wrong — plugins not registered
```

### Opening the enquiry modal from any page
```tsx
import { useEnquiry } from '../../context/EnquiryContext';

const { openEnquiry } = useEnquiry();
<button onClick={openEnquiry} className="btn btn-primary">Let's Talk</button>
```

### Adding a new page (full checklist)
1. Create `src/pages/PageName/PageName.tsx` + `PageName.css`
2. Add route in `src/routes.ts`
3. Add to `navLinks` in `src/components/Navbar/Navbar.tsx`
4. Add to `navLinks` in `src/components/Footer/Footer.tsx`
5. Add SEO entry in `src/lib/seoStore.ts` (defaultPages array)
6. Add SEO entry in `src/lib/seoStore.server.ts`

### Adding events to Life at Cogent
Edit the `events` array in `src/pages/LifeAtCogent/LifeAtCogent.tsx`:
```tsx
{
  id: 7,
  title: 'Event Name',
  description: 'Short description of the event...',
  type: 'image',   // or 'video'
  src: '/path/to/asset.jpg', // or: import from '../../assets/...'
  tag: 'Tag Label',
}
```

### Environment variables
```
VITE_SUPABASE_URL         Supabase project URL
VITE_SUPABASE_ANON_KEY    Supabase anonymous/public key
```
All env vars must be prefixed with `VITE_` for Vite to expose them to the browser.

---

*Last updated: April 2026 — added coverImage upload (Supabase Storage), Life at Cogent page, About dropdown in Navbar*

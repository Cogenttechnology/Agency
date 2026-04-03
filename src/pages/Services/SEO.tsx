import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Settings,
  FileText,
  Link2,
  MapPin,
  ShoppingBag,
  BookOpen,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Plus,
} from 'lucide-react';
import SeoShowcase from '../../components/SeoShowcase/SeoShowcase';
import './ServicePage.css';


/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#00d4aa';
const GRADIENT = 'linear-gradient(135deg, #00d4aa, #0099aa)';

const seoServices = [
  {
    icon: Settings,
    title: 'Technical SEO',
    desc: 'Site speed, Core Web Vitals, crawlability, indexation, schema markup, and technical health audits.',
  },
  {
    icon: FileText,
    title: 'On-Page SEO',
    desc: 'Title tags, meta descriptions, heading structure, internal linking, and content optimisation for target keywords.',
  },
  {
    icon: Link2,
    title: 'Off-Page & Link Building',
    desc: 'Authority-building through high-quality backlink acquisition, digital PR, and brand mention campaigns.',
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    desc: 'Google Business Profile optimisation, local citations, and geo-targeted content to dominate local search.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce SEO',
    desc: 'Category page optimisation, product schema, faceted navigation fixes, and conversion-focused content.',
  },
  {
    icon: BookOpen,
    title: 'Content Strategy',
    desc: 'Topical authority mapping, content gap analysis, and SEO content briefs that rank and convert.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Audit & Analysis',
    desc: "Deep technical and content audit to identify what's holding your rankings back.",
  },
  {
    num: '02',
    title: 'Keyword Strategy',
    desc: 'Intent-mapped keyword research aligned to your buyer journey and competitive landscape.',
  },
  {
    num: '03',
    title: 'On-Page Optimisation',
    desc: 'Implement on-page and technical changes to signal relevance and authority to search engines.',
  },
  {
    num: '04',
    title: 'Authority Building',
    desc: 'Build domain authority through link acquisition, content distribution, and digital PR.',
  },
];

const tools = [
  'SEMrush',
  'Ahrefs',
  'Screaming Frog',
  'Google Search Console',
  'Google Analytics 4',
  'Moz',
  'SurferSEO',
  'PageSpeed Insights',
  'Sitebulb',
  'Clearscope',
];

const keywords = [
  'SEO Agency India',
  'Rank on Page 1',
  'Organic Traffic',
  'Link Building',
  'Technical SEO',
  'Local SEO',
  'Content Strategy',
  'Keyword Research',
  'Domain Authority',
  'Core Web Vitals',
  'E-commerce SEO',
  'SERP Rankings',
];

const results = [
  {
    metric: '420%',
    detail: 'Organic traffic growth in 6 months',
    client: 'LegalEase Platform',
    industry: 'LegalTech / SaaS',
  },
  {
    metric: '#1',
    detail: 'Google ranking for 45+ target keywords',
    client: 'HomeDecor Hub',
    industry: 'E-commerce / Home',
  },
  {
    metric: '3.2×',
    detail: 'Increase in organic leads YoY',
    client: 'FinanceFirst',
    industry: 'BFSI / Finance',
  },
];

const faqs = [
  {
    q: 'How long does SEO take to show results?',
    a: "SEO is a long-term investment. Most clients start seeing measurable improvements in 3–4 months, with significant traffic and ranking gains typically visible within 6 months. Highly competitive industries may take 9–12 months to reach peak performance. The results compound over time and continue delivering value long after.",
  },
  {
    q: 'What makes your SEO approach different from other agencies?',
    a: "We combine technical excellence with content quality and authority building — treating all three as equally important. We don't rely on shortcuts or outdated tactics. Every strategy is custom-built around your competitive landscape, and we report with full transparency on what we're doing and why.",
  },
  {
    q: 'Do you offer local SEO services?',
    a: "Yes. Our local SEO service includes Google Business Profile optimisation, local citation building, geo-targeted content creation, review management strategy, and local schema implementation. We help brick-and-mortar businesses and service-area businesses dominate their local markets.",
  },
  {
    q: 'Will you write the content or do we need to provide it?',
    a: "We offer fully managed content creation as part of our SEO service. Our writers produce optimised blog posts, landing pages, and resource articles based on detailed SEO briefs. If you have an in-house team, we can provide the briefs and review the content instead.",
  },
  {
    q: 'How do you track and report SEO progress?',
    a: "We connect Google Search Console, GA4, and Ahrefs to a live reporting dashboard. You receive a monthly SEO report covering keyword ranking movements, organic traffic growth, backlink profile health, Core Web Vitals, and strategic recommendations for the next period.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`svc-faq-item${open ? ' svc-faq-item--open' : ''}`}>
      <button className="svc-faq-item__trigger" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="svc-faq-item__icon">
          <Plus size={14} />
        </span>
      </button>
      <div className="svc-faq-item__body">
        <div className="svc-faq-item__body-inner">
          <p className="svc-faq-item__answer">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── SEO Graph Visual ────────────────────────────────────── */
function SeoGraphVisual() {
  return (
    <div className="svc-graph" aria-hidden="true">
      <svg
        viewBox="0 0 400 160"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[40, 80, 120].map((y) => (
          <line key={y} x1="24" y1={y} x2="376" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* Area fill */}
        <path
          d="M24,140 C60,140 80,120 100,110 C130,95 150,90 180,75 C210,58 240,50 270,35 C300,22 330,20 376,18 L376,140 Z"
          fill="rgba(0, 212, 170, 0.08)"
        />
        {/* Main line */}
        <path
          className="svc-graph__path"
          d="M24,140 C60,140 80,120 100,110 C130,95 150,90 180,75 C210,58 240,50 270,35 C300,22 330,20 376,18"
          fill="none"
          stroke="#00d4aa"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Dot at end */}
        <circle cx="376" cy="18" r="5" fill="#00d4aa" opacity="0" style={{ animation: 'svc-graph-draw 0.1s ease forwards 2.4s' }}>
          <animate attributeName="opacity" from="0" to="1" begin="2.4s" dur="0.2s" fill="freeze" />
        </circle>
      </svg>
      {/* Axis labels */}
      <div style={{ position: 'absolute', bottom: 8, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
        {['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'].map((l) => (
          <span key={l} style={{ fontSize: '0.62rem', color: 'var(--color-muted)' }}>{l}</span>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '0.65rem', color: '#00d4aa', fontWeight: 600 }}>
        Organic Traffic Growth
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function SEO() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo('.seo-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.seo-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
        gsap.fromTo('.seo-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7,  ease: 'power3.out' });
        gsap.fromTo('.seo-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.seo-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.seo-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        // Power of organic section
        gsap.fromTo(
          '.seo-power__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-power', start: 'top 80%' },
          }
        );
        gsap.fromTo(
          '.seo-power__graph',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-power', start: 'top 80%' },
          }
        );

        // Keyword bubbles
        gsap.fromTo(
          '.svc-keyword-bubble',
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.seo-keywords', start: 'top 80%' },
          }
        );

        // Services
        gsap.fromTo(
          '.seo-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-services-grid', start: 'top 80%' },
          }
        );

        // Process
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-process', start: 'top 80%' },
          }
        );

        // Tools pills
        gsap.fromTo(
          '.seo-tools .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.seo-tools', start: 'top 80%' },
          }
        );

        // Results
        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-results', start: 'top 80%' },
          }
        );

        // FAQ
        gsap.fromTo(
          '.svc-faq-item',
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.svc-faq', start: 'top 80%' },
          }
        );

        // CTA
        gsap.fromTo(
          '.svc-cta > *',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.svc-cta', start: 'top 80%' },
          }
        );
      }, pageRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      style={{ '--svc-color': COLOR, '--svc-gradient': GRADIENT } as React.CSSProperties}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <section id="seo-hero" className="svc-hero" aria-labelledby="seo-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#0099aa' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#00d4aa' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag seo-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Search Engine Optimisation
              </span>
              <h1 id="seo-h1-el" className="svc-hero__h1 seo-h1">
                Rank Higher. Get Found.{' '}
                <span className="text-gradient">Grow Faster.</span>
              </h1>
              <p className="svc-hero__sub seo-sub">
                We build organic search engines for your business — driving sustained
                traffic, qualified leads, and revenue growth without paying per click.
              </p>
              <div className="svc-hero__actions seo-actions">
                <button onClick={openEnquiry}  className="btn btn-primary">
                  Get a Free SEO Audit <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry}  className="btn btn-outline">
                  See Our Results
                </button>
              </div>
              <div className="svc-hero__stats seo-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">300%</span>
                  <span className="svc-stat-card__label">Avg Traffic Growth</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">150+</span>
                  <span className="svc-stat-card__label">Websites Optimised</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">90%</span>
                  <span className="svc-stat-card__label">Clients in Top 3</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual seo-visual" aria-hidden="true">
              {/* Animated keyword bubbles */}
              <div className="svc-keyword-cloud seo-keywords" style={{ padding: '1rem' }}>
                {keywords.map((kw) => (
                  <span key={kw} className="svc-keyword-bubble">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Power of Organic ──────────────────────────────── */}
      <section id="power-of-organic-seo" className="svc-section seo-power" aria-labelledby="seo-power-h2">
        <div className="container">
          <div className="svc-intro">
            <div className="svc-intro__text seo-power__text">
              <span className="tag">Why SEO Matters</span>
              <h2 id="seo-power-h2">The Power of Organic Search</h2>
              <p>
                Organic search is the single largest source of website traffic globally,
                accounting for over 53% of all web visits. Unlike paid ads that stop the
                moment you stop spending, SEO builds a compounding asset — rankings that
                generate traffic and leads 24/7 without a cost-per-click.
              </p>
              <p>
                Our SEO methodology combines technical precision, content quality, and
                authority building to create sustainable ranking growth. We don't chase
                algorithm shortcuts — we build the kind of digital presence that search
                engines trust and users love.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: TrendingUp, text: '53% of traffic is organic' },
                  { icon: Shield,     text: 'Long-term sustainable growth' },
                  { icon: Users,      text: 'Higher quality leads' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-2)' }}>
                    <Icon size={16} color={COLOR} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="svc-intro__visual">
              <div style={{ width: '100%' }} className="seo-power__graph">
                <SeoGraphVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Services ──────────────────────────────────── */}
      <section id="seo-services" className="svc-section svc-section--alt" aria-labelledby="seo-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="seo-services-h2">Comprehensive SEO Services</h2>
            <p>Every dimension of SEO — technical, content, authority — covered under one roof.</p>
          </div>
          <div className="svc-grid-6 seo-services-grid">
            {seoServices.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="svc-card">
                <div className="svc-card__icon-wrap">
                  <Icon size={22} />
                </div>
                <h3 className="svc-card__title">{title}</h3>
                <p className="svc-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────── */}
      <section id="seo-methodology" className="svc-section" aria-labelledby="seo-method-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Approach</span>
            <h2 id="seo-method-h2">Our SEO Methodology</h2>
            <p>A structured 4-phase approach that delivers predictable, scalable ranking improvements.</p>
          </div>
          <div className="svc-process seo-process">
            {steps.map((step, i) => (
              <>
                <div key={step.num} className="svc-process__step">
                  <div className="svc-process__num">{step.num}</div>
                  <h3 className="svc-process__title">{step.title}</h3>
                  <p className="svc-process__desc">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div key={`c-${i}`} className="svc-process__connector" />
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ─────────────────────────────────────────── */}
      <section id="seo-tools" className="svc-section svc-section--dark seo-tools" aria-labelledby="seo-tools-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Toolkit</span>
            <h2 id="seo-tools-h2">SEO Tools We Use</h2>
            <p>
              Industry-leading platforms and proprietary processes to audit, track, and optimise
              your search presence.
            </p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {tools.map((t) => (
              <span key={t} className="svc-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="seo-results" className="svc-section seo-results" aria-labelledby="seo-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="seo-results-h2">Organic Growth Stories</h2>
            <p>Results we've delivered for businesses across industries and competitive landscapes.</p>
          </div>
          <div className="svc-results">
            {results.map((r) => (
              <article key={r.client} className="svc-result-card">
                <div className="svc-result-card__metric">{r.metric}</div>
                <p className="svc-result-card__detail">{r.detail}</p>
                <p className="svc-result-card__client">{r.client}</p>
                <p className="svc-result-card__industry">{r.industry}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="seo-faq" className="svc-section svc-section--alt" aria-labelledby="seo-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="seo-faq-h2">SEO Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Showcase ────────────────────────────────── */}
      <SeoShowcase />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="seo-cta" className="svc-section svc-cta svc-cta--seo" aria-labelledby="seo-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="seo-cta-h2" className="svc-cta__title">
            Start <span className="text-gradient">Ranking Today</span>
          </h2>
          <p className="svc-cta__sub">
            Get a free SEO audit and competitive analysis — we'll show you exactly where
            your biggest organic growth opportunities are hiding.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry}  className="btn btn-primary">
              Get Your Free SEO Audit <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry}  className="btn btn-outline">
              Talk to an SEO Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

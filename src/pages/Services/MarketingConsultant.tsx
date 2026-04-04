import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Compass,
  BarChart2,
  Target,
  Users,
  Lightbulb,
  ClipboardList,
  TrendingUp,
  Shield,
  ArrowRight,
  Plus,
} from 'lucide-react';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './ServicePage.css';

/* ── Constants ─────────────────────────────────────────────── */
const COLOR = '#8b5cf6';
const GRADIENT = 'linear-gradient(135deg, #8b5cf6, #6d28d9)';

const consultingServices = [
  {
    icon: Compass,
    title: 'Marketing Strategy',
    desc: 'Full-funnel marketing strategies aligned to your business goals, competitive landscape, and target audience segments.',
  },
  {
    icon: BarChart2,
    title: 'Marketing Audits',
    desc: 'Comprehensive audits of your current channels, campaigns, messaging, and spend to identify gaps and quick wins.',
  },
  {
    icon: Target,
    title: 'Go-To-Market Planning',
    desc: 'Launch strategies for new products, markets, or rebrands — from positioning and messaging to channel mix and budgets.',
  },
  {
    icon: Users,
    title: 'Brand Positioning',
    desc: 'Clarify your brand story, value proposition, and differentiation so every marketing asset lands with impact.',
  },
  {
    icon: Lightbulb,
    title: 'Campaign Planning',
    desc: 'Integrated campaign blueprints that coordinate across paid, organic, email, and social for maximum impact.',
  },
  {
    icon: ClipboardList,
    title: 'Marketing Operations',
    desc: 'Structure your team, tech stack, and processes for efficient execution — from CRM setup to reporting dashboards.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Discovery & Diagnosis',
    desc: 'Deep-dive into your business, goals, current marketing performance, and competitive environment.',
  },
  {
    num: '02',
    title: 'Strategy Development',
    desc: 'Deliver a clear, actionable marketing roadmap with prioritised initiatives and measurable KPIs.',
  },
  {
    num: '03',
    title: 'Implementation Support',
    desc: 'Work alongside your team or agency partners to execute the strategy with guidance and oversight.',
  },
  {
    num: '04',
    title: 'Review & Optimise',
    desc: 'Track performance against targets, identify learnings, and continuously refine the approach.',
  },
];

const tools = [
  'Google Analytics 4',
  'HubSpot',
  'Salesforce',
  'SEMrush',
  'Meta Ads Manager',
  'Google Ads',
  'Notion',
  'Miro',
  'Looker Studio',
  'Hotjar',
];

const keywords = [
  'Marketing Strategy',
  'GTM Planning',
  'Brand Positioning',
  'Growth Consulting',
  'Marketing Audits',
  'Campaign Planning',
  'Funnel Optimisation',
  'Marketing Ops',
  'Budget Allocation',
  'KPI Frameworks',
  'Competitive Analysis',
  'Demand Generation',
];

const results = [
  {
    metric: '3.8×',
    detail: 'ROAS improvement after full marketing audit & restructure',
    client: 'D2C Fashion Brand',
    industry: 'E-commerce / Fashion',
  },
  {
    metric: '62%',
    detail: 'Reduction in CAC within 6 months of strategy overhaul',
    client: 'EdTech Startup',
    industry: 'Education / SaaS',
  },
  {
    metric: '₹4Cr+',
    detail: 'Pipeline generated from a single GTM campaign',
    client: 'B2B SaaS Platform',
    industry: 'Enterprise Tech',
  },
];

const faqs = [
  {
    q: 'What does a marketing consultant actually do?',
    a: 'A marketing consultant provides expert, objective guidance on your marketing strategy, channels, messaging, and operations. We diagnose what\'s not working, identify growth opportunities, build strategic roadmaps, and help you execute — either directly or alongside your in-house team.',
  },
  {
    q: 'How is consulting different from hiring an agency?',
    a: 'Agencies execute deliverables (ads, content, campaigns). Consultants diagnose, strategise, and advise. Many businesses need both — or a consultant first to set the direction before engaging execution partners. We also offer hybrid engagements where we both consult and execute.',
  },
  {
    q: 'Who is marketing consulting best suited for?',
    a: 'It\'s ideal for founders who need a marketing leader without full-time cost, CMOs who want an experienced sounding board, or companies whose marketing spend isn\'t delivering expected returns. We work with startups, scale-ups, and established businesses undergoing transformation.',
  },
  {
    q: 'What is the typical engagement structure?',
    a: 'Engagements range from a one-time strategy sprint (2–4 weeks) to ongoing fractional CMO retainers. Most clients start with a diagnostic audit and strategy delivery, then optionally continue with monthly advisory sessions and execution support.',
  },
  {
    q: 'Do you work with specific industries?',
    a: 'We have deep experience in SaaS, D2C, e-commerce, B2B services, and consumer brands. Our strategic frameworks are transferable across industries, and we always invest in understanding your specific market dynamics before making recommendations.',
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

export default function MarketingConsultant() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo('.mc-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.mc-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
        gsap.fromTo('.mc-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7,  ease: 'power3.out' });
        gsap.fromTo('.mc-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.mc-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.mc-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        gsap.fromTo(
          '.mc-intro__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.mc-intro', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-keyword-bubble',
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.mc-keywords', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.mc-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.mc-services-grid', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.mc-process', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.mc-tools .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.mc-tools', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.mc-results', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-faq-item',
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.svc-faq', start: 'top 80%' },
          }
        );

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
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="mc-hero" className="svc-hero" aria-labelledby="mc-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#6d28d9' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#8b5cf6' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag mc-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Marketing Consultant
              </span>
              <h1 id="mc-h1-el" className="svc-hero__h1 mc-h1">
                Strategy That Drives{' '}
                <span className="text-gradient">Real Growth.</span>
              </h1>
              <p className="svc-hero__sub mc-sub">
                Expert marketing guidance to clarify your strategy, align your team, and
                unlock the growth levers your business has been missing.
              </p>
              <div className="svc-hero__actions mc-actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  Book a Strategy Session <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
                  See Our Results
                </button>
              </div>
              <div className="svc-hero__stats mc-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">3.8×</span>
                  <span className="svc-stat-card__label">Avg ROAS Improvement</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">50+</span>
                  <span className="svc-stat-card__label">Brands Consulted</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">62%</span>
                  <span className="svc-stat-card__label">Avg CAC Reduction</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual mc-visual" aria-hidden="true">
              <div className="svc-keyword-cloud mc-keywords" style={{ padding: '1rem' }}>
                {keywords.map((kw) => (
                  <span key={kw} className="svc-keyword-bubble">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why a Consultant ─────────────────────────────────── */}
      <section id="mc-why" className="svc-section mc-intro" aria-labelledby="mc-why-h2">
        <div className="container">
          <div className="svc-intro">
            <div className="svc-intro__text mc-intro__text">
              <span className="tag">Why Consulting</span>
              <h2 id="mc-why-h2">The Right Strategy Changes Everything</h2>
              <p>
                Most marketing underperformance isn't a budget problem — it's a strategy
                problem. Brands spend on channels and campaigns without a clear framework
                connecting activity to business outcomes.
              </p>
              <p>
                We bring an outside perspective, senior-level experience, and a
                diagnostic-first approach to help you cut through the noise, prioritise
                the right moves, and build a marketing function that scales.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: TrendingUp, text: 'Data-driven strategic clarity' },
                  { icon: Shield,     text: 'Objective, unbiased perspective' },
                  { icon: Users,      text: 'Senior expertise on demand' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-2)' }}>
                    <Icon size={16} color={COLOR} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="svc-intro__visual">
              <div className="svc-graph" aria-hidden="true">
                <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} preserveAspectRatio="none">
                  {[40, 80, 120].map((y) => (
                    <line key={y} x1="24" y1={y} x2="376" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  <path
                    d="M24,145 C60,145 90,140 120,130 C160,115 180,95 220,70 C255,48 300,25 376,12 L376,145 Z"
                    fill="rgba(139, 92, 246, 0.08)"
                  />
                  <path
                    d="M24,145 C60,145 90,140 120,130 C160,115 180,95 220,70 C255,48 300,25 376,12"
                    fill="none"
                    stroke={COLOR}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="376" cy="12" r="5" fill={COLOR}>
                    <animate attributeName="opacity" from="0" to="1" begin="2.4s" dur="0.2s" fill="freeze" />
                  </circle>
                </svg>
                <div style={{ position: 'absolute', bottom: 8, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
                  {['Pre', 'Month 1', 'Month 3', 'Month 6', 'Month 9'].map((l) => (
                    <span key={l} style={{ fontSize: '0.62rem', color: 'var(--color-muted)' }}>{l}</span>
                  ))}
                </div>
                <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '0.65rem', color: COLOR, fontWeight: 600 }}>
                  ROAS After Consulting
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="mc-services" className="svc-section svc-section--alt" aria-labelledby="mc-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="mc-services-h2">Marketing Consulting Services</h2>
            <p>Strategic support across every dimension of your marketing — from diagnosis to execution.</p>
          </div>
          <div className="svc-grid-6 mc-services-grid">
            {consultingServices.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Process ──────────────────────────────────────────── */}
      <section id="mc-process" className="svc-section" aria-labelledby="mc-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Approach</span>
            <h2 id="mc-process-h2">How We Work With You</h2>
            <p>A structured consulting process from diagnosis through to measurable results.</p>
          </div>
          <div className="svc-process mc-process">
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

      {/* ── Tools ────────────────────────────────────────────── */}
      <section id="mc-tools" className="svc-section svc-section--dark mc-tools" aria-labelledby="mc-tools-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Toolkit</span>
            <h2 id="mc-tools-h2">Platforms & Frameworks We Use</h2>
            <p>Industry-standard tools and proprietary frameworks for diagnosis, planning, and performance tracking.</p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {tools.map((t) => (
              <span key={t} className="svc-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────── */}
      <section id="mc-results" className="svc-section mc-results" aria-labelledby="mc-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="mc-results-h2">Consulting Outcomes</h2>
            <p>Measurable results from strategy engagements we've led.</p>
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

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="mc-faq" className="svc-section svc-section--alt" aria-labelledby="mc-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="mc-faq-h2">Consulting Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="mc-cta" className="svc-section svc-cta" aria-labelledby="mc-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="mc-cta-h2" className="svc-cta__title">
            Ready to <span className="text-gradient">Transform Your Marketing?</span>
          </h2>
          <p className="svc-cta__sub">
            Book a free 30-minute strategy session — we'll review your current marketing,
            identify your biggest growth opportunities, and share our initial thinking at
            no cost.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry} className="btn btn-primary">
              Book a Free Strategy Session <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry} className="btn btn-outline">
              Talk to a Consultant
            </button>
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

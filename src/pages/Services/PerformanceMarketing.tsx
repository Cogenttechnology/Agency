import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  BarChart3,
  ShoppingCart,
  Play,
  Smartphone,
  Search,
  Globe,
  ArrowRight,
  Plus,
} from 'lucide-react';
import PerfShowcase from '../../components/PerfShowcase/PerfShowcase';
import './ServicePage.css';

/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#a855f7';
const GRADIENT = 'linear-gradient(135deg, #a855f7, #7c3aed)';

const services = [
  {
    icon: Search,
    title: 'Google Ads',
    desc: 'Search, Display & Performance Max campaigns that capture high-intent buyers and drive qualified traffic.',
  },
  {
    icon: Globe,
    title: 'Meta Ads',
    desc: 'Facebook & Instagram campaigns with precision audience targeting, creative testing, and ROAS optimisation.',
  },
  {
    icon: BarChart3,
    title: 'Programmatic Display',
    desc: 'Data-driven display advertising across premium publishers using DV360, The Trade Desk, and Amazon DSP.',
  },
  {
    icon: ShoppingCart,
    title: 'Shopping Campaigns',
    desc: 'Google Shopping & Performance Max for e-commerce brands — maximising visibility and revenue per SKU.',
  },
  {
    icon: Play,
    title: 'YouTube Ads',
    desc: 'Skippable, non-skippable & bumper ads engineered to drive brand recall and direct response at scale.',
  },
  {
    icon: Smartphone,
    title: 'App Install Campaigns',
    desc: 'App campaigns across Google UAC, Meta and Apple Search Ads — tuned for CPI, ROAS and retention.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Research & Audit',
    desc: 'Deep-dive into your current accounts, competitors, and market to find untapped opportunities.',
  },
  {
    num: '02',
    title: 'Strategy & Setup',
    desc: 'Build campaign architecture, audience segments, creative briefs, and bidding structures.',
  },
  {
    num: '03',
    title: 'Launch & Optimise',
    desc: 'Go live with full A/B testing, continuous bid optimisation, and creative iteration.',
  },
  {
    num: '04',
    title: 'Scale & Report',
    desc: 'Identify winning combinations, scale budgets intelligently, and deliver transparent ROI reports.',
  },
];

const platforms = [
  'Google Ads',
  'Meta (FB & IG)',
  'YouTube',
  'LinkedIn Ads',
  'Snapchat Ads',
  'Pinterest Ads',
  'DV360',
  'Amazon Ads',
];

const results = [
  {
    metric: '12×',
    detail: 'ROAS achieved within 90 days',
    client: 'FashionForward India',
    industry: 'E-commerce / Fashion',
  },
  {
    metric: '₹80Cr',
    detail: 'Revenue driven in a single quarter',
    client: 'TechGrow SaaS',
    industry: 'B2B / SaaS',
  },
  {
    metric: '64%',
    detail: 'Reduction in Cost Per Lead',
    client: 'EduPrime Courses',
    industry: 'EdTech',
  },
];

const faqs = [
  {
    q: 'What is performance marketing and how is it different from brand marketing?',
    a: "Performance marketing is a results-driven approach where you only pay for measurable outcomes — clicks, leads, or sales. Unlike brand marketing which focuses on awareness, every rupee in performance marketing is tied to a trackable action and a clear ROI.",
  },
  {
    q: 'How much ad spend do I need to get started?',
    a: "We typically recommend a minimum monthly ad spend of ₹1 lakh to generate statistically significant data. However, the right budget depends on your industry, goals, and CPC benchmarks. We'll advise you on the optimal starting point during our audit.",
  },
  {
    q: 'How long before I see results from performance marketing?',
    a: "Most campaigns start delivering measurable results within 2–4 weeks of launch. However, the real optimisation and scaling happens between weeks 6–12 as we accumulate conversion data and refine the targeting and creative strategy.",
  },
  {
    q: 'What platforms do you manage campaigns on?',
    a: "We manage campaigns across Google Ads, Meta (Facebook & Instagram), YouTube, LinkedIn, Snapchat, Pinterest, Amazon Ads, and programmatic platforms like DV360 and The Trade Desk. We recommend the right mix based on where your audience is.",
  },
  {
    q: 'How do you measure and report on performance?',
    a: "We set up comprehensive tracking via Google Tag Manager, Meta Pixel, and GA4 from day one. You get a live dashboard with real-time metrics and a detailed monthly report covering ROAS, CPL, CTR, conversion rates, and strategic recommendations.",
  },
];

/* ── FAQ Item ────────────────────────────────────────────── */
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

/* ── Page ────────────────────────────────────────────────── */
export default function PerformanceMarketing() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.to('.svc-hero__tag', { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__tag', { y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__h1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0, ease: 'power3.out' });

        // Counter animation for stats
        document.querySelectorAll<HTMLElement>('.pm-counter').forEach((el) => {
          const target = parseFloat(el.dataset.target || '0');
          const isDecimal = el.dataset.decimal === 'true';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            delay: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = isDecimal
                ? obj.val.toFixed(1) + '×'
                : Math.round(obj.val) + (el.dataset.suffix || '');
            },
          });
        });

        // Scroll-triggered sections
        gsap.fromTo(
          '.pm-intro__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-intro', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-services-grid', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-process', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.pm-platforms', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-results', start: 'top 80%' },
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
      {/* ── Hero ─────────────────────────────────────────── */}
      <section id="performance-marketing-hero" className="svc-hero" aria-labelledby="pm-h1">
        {/* Orbs */}
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#7c3aed' }} />
        <div className="svc-orb svc-orb--3" style={{ background: COLOR }} />

        <div className="container">
          <div className="svc-hero__inner">
            {/* Left */}
            <div className="svc-hero__content">
              <span className="svc-hero__tag" style={{ color: COLOR, borderColor: COLOR }}>
                Performance Marketing
              </span>
              <h1 id="pm-h1" className="svc-hero__h1">
                Performance Marketing That Delivers{' '}
                <span className="text-gradient">Real ROI</span>
              </h1>
              <p className="svc-hero__sub">
                We manage ₹500Cr+ in ad spend across Google, Meta, and programmatic
                platforms — engineering campaigns that turn every rupee into measurable
                revenue.
              </p>
              <div className="svc-hero__actions">
                <button onClick={openEnquiry}  className="btn btn-primary">
                  Get a Free Audit <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry}  className="btn btn-outline">
                  View Case Studies
                </button>
              </div>
              <div className="svc-hero__stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num pm-counter" data-target="8" data-decimal="true">8×</span>
                  <span className="svc-stat-card__label">Average ROAS Delivered</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">₹500Cr+</span>
                  <span className="svc-stat-card__label">Ad Spend Managed</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num pm-counter" data-target="200" data-suffix="+">200+</span>
                  <span className="svc-stat-card__label">Campaigns Launched</span>
                </div>
              </div>
            </div>

            {/* Right — animated bar chart */}
            <div className="svc-hero__visual" aria-hidden="true">
              <div style={{ width: '100%' }}>
                <div className="svc-bar-chart">
                  {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'].map((label, i) => (
                    <div
                      key={i}
                      className="svc-bar"
                      data-label={label}
                      style={{
                        background: GRADIENT,
                        animationDelay: `${1.2 + i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '1.5rem' }}>
                  ROAS Growth — Quarter on Quarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Is Performance Marketing ────────────────── */}
      <section id="what-is-performance-marketing" className="svc-section" aria-labelledby="pm-intro-h2">
        <div className="container">
          <div className="svc-intro pm-intro">
            <div className="svc-intro__text pm-intro__text">
              <span className="tag">The Fundamentals</span>
              <h2 id="pm-intro-h2">What Is Performance Marketing?</h2>
              <p>
                Performance marketing is a data-driven form of digital advertising where
                brands only pay for specific actions — a click, a lead, a sale, or an
                app install. Every campaign element is measurable, trackable, and
                optimised in real time.
              </p>
              <p>
                Unlike traditional marketing where ROI is estimated, performance marketing
                gives you complete visibility into which channels, audiences, and creatives
                are generating revenue. We use advanced bidding strategies, first-party
                data integration, and creative science to systematically lower your cost
                per acquisition while scaling your returns.
              </p>
              <button onClick={openEnquiry}  className="btn btn-outline" style={{ width: 'fit-content' }}>
                Learn Our Approach <ArrowRight size={14} />
              </button>
            </div>
            <div className="svc-intro__visual" aria-hidden="true">
              <div style={{ width: '100%' }}>
                <div className="svc-bar-chart" style={{ height: '240px' }}>
                  {[
                    { h: '30%', l: 'SEO' },
                    { h: '55%', l: 'Email' },
                    { h: '45%', l: 'Social' },
                    { h: '90%', l: 'Perf.' },
                    { h: '60%', l: 'Content' },
                  ].map(({ h, l }, i) => (
                    <div
                      key={i}
                      className="svc-bar"
                      data-label={l}
                      style={{
                        height: h,
                        background: i === 3 ? GRADIENT : 'rgba(255,255,255,0.08)',
                        animationDelay: `${0.1 + i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-muted)', marginTop: '1.5rem' }}>
                  Performance Marketing delivers the highest measurable ROI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────── */}
      <section id="performance-marketing-services" className="svc-section svc-section--alt" aria-labelledby="pm-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="pm-services-h2">Performance Marketing Services</h2>
            <p>
              From search intent capture to programmatic retargeting — we cover every
              paid channel that drives measurable growth.
            </p>
          </div>
          <div className="svc-grid-6 pm-services-grid">
            {services.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Process ──────────────────────────────────────── */}
      <section id="performance-marketing-process" className="svc-section" aria-labelledby="pm-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How We Work</span>
            <h2 id="pm-process-h2">Our Performance Framework</h2>
            <p>A proven 4-step methodology that takes campaigns from audit to scaled profitability.</p>
          </div>
          <div className="svc-process pm-process">
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

      {/* ── Platforms ─────────────────────────────────────── */}
      <section id="performance-marketing-platforms" className="svc-section svc-section--dark pm-platforms" aria-labelledby="pm-platforms-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Stack</span>
            <h2 id="pm-platforms-h2">Platforms We Master</h2>
            <p>We are certified partners and power users of every major paid media platform.</p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {platforms.map((p) => (
              <span key={p} className="svc-pill">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="performance-marketing-results" className="svc-section pm-results" aria-labelledby="pm-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Results</span>
            <h2 id="pm-results-h2">Campaigns That Changed the Game</h2>
            <p>Real numbers from real clients — not estimates, not projections.</p>
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
      <section id="performance-marketing-faq" className="svc-section svc-section--alt" aria-labelledby="pm-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="pm-faq-h2">Performance Marketing Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Campaign Showcase ────────────────────────────── */}
      <PerfShowcase />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="performance-marketing-cta" className="svc-section svc-cta svc-cta--pm" aria-labelledby="pm-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="pm-cta-h2" className="svc-cta__title">
            Ready to 10× Your <span className="text-gradient">ROAS?</span>
          </h2>
          <p className="svc-cta__sub">
            Let our performance team audit your current campaigns and show you exactly
            where you're leaving money on the table.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry}  className="btn btn-primary">
              Get Your Free Audit <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry}  className="btn btn-outline">
              Talk to a Strategist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

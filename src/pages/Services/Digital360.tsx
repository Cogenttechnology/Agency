import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Search, Share2, BarChart2, Mic2, Video, Monitor,
  ArrowRight, Plus, CheckCircle, TrendingUp, Target,
  Zap, Globe, Users, Star, RefreshCw,
} from 'lucide-react';
import './ServicePage.css';
import './Digital360.css';

/* ── Constants ───────────────────────────────────────────── */
const COLOR    = '#00d4ff';
const GRADIENT = 'linear-gradient(135deg, #00d4ff 0%, #6c63ff 100%)';

/* ── Data ────────────────────────────────────────────────── */
const pillars = [
  {
    icon: Search,
    title: 'Search & SEO',
    desc: 'Dominate organic search with technical SEO, content strategy, and authority link building that compounds month over month.',
    color: '#00d4aa',
  },
  {
    icon: BarChart2,
    title: 'Performance Marketing',
    desc: 'ROI-obsessed paid campaigns across Google, Meta, YouTube and programmatic — every rupee tracked and optimised.',
    color: '#a855f7',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    desc: 'Strategic content calendars, community management, and paid social that builds audiences and drives conversions.',
    color: '#f59e0b',
  },
  {
    icon: Mic2,
    title: 'Influencer Marketing',
    desc: 'End-to-end creator partnerships — from nano to mega influencers — that deliver authentic reach and measurable results.',
    color: '#ec4899',
  },
  {
    icon: Video,
    title: 'Video & Content Production',
    desc: 'Brand films, reels, podcasts, and ad creatives produced in our state-of-the-art studio — built to stop the scroll.',
    color: '#ff6b6b',
  },
  {
    icon: Monitor,
    title: 'Web Design & Development',
    desc: 'High-performance websites, landing pages, and digital products that convert visitors into customers at every stage.',
    color: '#6c63ff',
  },
];

const whyPoints = [
  {
    icon: RefreshCw,
    title: 'One Strategy, All Channels',
    desc: 'A fragmented agency stack creates gaps. With Cogent, every channel speaks the same strategic language — amplifying each other instead of competing.',
  },
  {
    icon: Target,
    title: 'Unified Data & Attribution',
    desc: 'We connect every touchpoint to a single reporting view. Know exactly which channels, campaigns, and creatives are driving your revenue.',
  },
  {
    icon: Zap,
    title: 'Faster Execution',
    desc: 'No agency handoffs. No briefing delays. Strategy, creative, and media all under one roof means campaigns launch in days, not weeks.',
  },
  {
    icon: TrendingUp,
    title: 'Compounding Growth',
    desc: 'SEO compounds. Brand compounds. Retargeting audiences grow. A 360° approach builds assets that deliver increasing returns over time.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We analyse your full digital footprint — website, ads, social, SEO, content — to find gaps, opportunities, and quick wins across every channel.',
  },
  {
    num: '02',
    title: 'Integrated Strategy',
    desc: 'We build a unified growth roadmap with clear channel priorities, budget allocations, KPIs, and a 90-day execution plan tailored to your business.',
  },
  {
    num: '03',
    title: 'Full-Funnel Launch',
    desc: 'Simultaneous activation across all channels — search, social, content, and paid media — with consistent messaging from awareness to conversion.',
  },
  {
    num: '04',
    title: 'Optimise & Scale',
    desc: 'Weekly cross-channel analysis lets us double down on what works, fix what doesn\'t, and intelligently scale your best-performing growth engines.',
  },
];

const channels = [
  'Google Ads', 'Meta Ads', 'SEO', 'Content Marketing',
  'Instagram', 'YouTube', 'LinkedIn', 'Influencer Marketing',
  'Email Marketing', 'Video Production', 'Web Development', 'Analytics',
  'WhatsApp Marketing', 'Programmatic Display', 'CRO', 'Brand Strategy',
];

const results = [
  {
    metric: '4.8×',
    detail: 'Overall ROAS across all channels combined',
    client: 'NovaBrand D2C',
    industry: 'E-Commerce / Lifestyle',
  },
  {
    metric: '320%',
    detail: 'Revenue growth in 12 months with 360° strategy',
    client: 'UrbanEdge Retail',
    industry: 'Fashion / D2C',
  },
  {
    metric: '60%',
    detail: 'Reduction in blended Customer Acquisition Cost',
    client: 'HealthFirst Platform',
    industry: 'HealthTech / SaaS',
  },
];

const faqs = [
  {
    q: 'What exactly is 360° Digital Marketing?',
    a: '360° Digital Marketing means your brand is present, consistent, and converting at every stage of the customer journey — from the moment someone first discovers you through search or social, to the point they become a loyal customer. It covers SEO, paid media, social media, content, influencer, email, and web — all working as one integrated growth engine rather than separate disconnected efforts.',
  },
  {
    q: 'Is 360° marketing only for large businesses with big budgets?',
    a: "Absolutely not. We design 360° strategies that are proportionate to your stage and budget. For early-stage businesses, we prioritise 2–3 high-impact channels and expand as results compound. The key benefit — unified strategy and reporting — is valuable at any budget. We'll recommend the right channel mix based on where your audience is and what your current performance gaps are.",
  },
  {
    q: 'How do you ensure all channels work together rather than cannibalising each other?',
    a: 'This is the core of what we do. We build a single attribution model that gives every channel credit for its role in the conversion journey. We use consistent messaging frameworks across all channels, coordinate campaign timing so channels amplify each other, and hold weekly cross-channel strategy sessions where our SEO, paid media, social, and creative teams align. You get one account manager who owns the full picture.',
  },
  {
    q: 'How long does it take to see results from a 360° approach?',
    a: "Paid channels typically deliver measurable results within 2–4 weeks. SEO and content start showing movement in 3–4 months and compound significantly after 6 months. Social and influencer campaigns build momentum over 60–90 days. The power of 360° is that while one channel is building, others are already converting — so you're never in a 'waiting for results' phase. Most clients see meaningful aggregate growth within the first 90 days.",
  },
  {
    q: 'Do we need to be active on every channel from day one?',
    a: "No. We start with a channel prioritisation framework based on your audience, category, and budget. Typically we launch 3–4 channels in the first 30 days and expand as data confirms where your best acquisition and engagement opportunities lie. Over-extending across too many channels too soon dilutes quality — we always prioritise doing fewer things exceptionally well over spreading thin.",
  },
];

/* ── Sub-components ──────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`svc-faq-item${open ? ' svc-faq-item--open' : ''}`}>
      <button className="svc-faq-item__trigger" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className="svc-faq-item__icon"><Plus size={14} /></span>
      </button>
      <div className="svc-faq-item__body">
        <div className="svc-faq-item__body-inner">
          <p className="svc-faq-item__answer">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Orbit Visual ────────────────────────────────────────── */
function OrbitVisual() {
  return (
    <div className="d360-orbit" aria-hidden="true">
      {/* Central hub */}
      <div className="d360-orbit__hub">
        <span className="d360-orbit__hub-text">360°</span>
      </div>

      {/* Rings */}
      <div className="d360-orbit__ring d360-orbit__ring--1" />
      <div className="d360-orbit__ring d360-orbit__ring--2" />
      <div className="d360-orbit__ring d360-orbit__ring--3" />

      {/* Orbiting nodes */}
      {[
        { label: 'SEO',     angle: 0,   color: '#00d4aa', delay: '0s' },
        { label: 'Paid',    angle: 60,  color: '#a855f7', delay: '0.3s' },
        { label: 'Social',  angle: 120, color: '#f59e0b', delay: '0.6s' },
        { label: 'Video',   angle: 180, color: '#ff6b6b', delay: '0.9s' },
        { label: 'Web',     angle: 240, color: '#6c63ff', delay: '1.2s' },
        { label: 'Creator', angle: 300, color: '#ec4899', delay: '1.5s' },
      ].map(({ label, angle, color, delay }) => {
        const rad = (angle * Math.PI) / 180;
        const r = 130;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <div
            key={label}
            className="d360-orbit__node"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              '--node-color': color,
              animationDelay: delay,
            } as React.CSSProperties}
          >
            <span className="d360-orbit__node-dot" style={{ background: color }} />
            <span className="d360-orbit__node-label">{label}</span>
          </div>
        );
      })}

      {/* Glow */}
      <div className="d360-orbit__glow" />
    </div>
  );
}

/* ── Funnel Visual ───────────────────────────────────────── */
function FunnelVisual() {
  const stages = [
    { label: 'Awareness',    width: '100%', color: '#00d4ff', pct: '100%' },
    { label: 'Interest',     width: '80%',  color: '#6c63ff', pct: '80%' },
    { label: 'Consideration',width: '60%',  color: '#a855f7', pct: '60%' },
    { label: 'Intent',       width: '42%',  color: '#ec4899', pct: '42%' },
    { label: 'Conversion',   width: '28%',  color: '#ff6b6b', pct: '28%' },
  ];
  return (
    <div className="d360-funnel" aria-hidden="true">
      {stages.map(({ label, width, color, pct }) => (
        <div key={label} className="d360-funnel__stage">
          <span className="d360-funnel__label">{label}</span>
          <div className="d360-funnel__bar-wrap">
            <div
              className="d360-funnel__bar"
              style={{ width, background: color, '--bar-w': pct } as React.CSSProperties}
            />
          </div>
        </div>
      ))}
      <p className="d360-funnel__caption">Full-Funnel Coverage — Awareness to Conversion</p>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Digital360() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {

        /* ── Hero entrance ───────────────────────────────── */
        const heroTl = gsap.timeline({ delay: 0.2 });
        heroTl
          .fromTo('.d360-tag',     { opacity: 0, y: 24 },  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo('.d360-h1',      { opacity: 0, y: 50 },  { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
          .fromTo('.d360-sub',     { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .fromTo('.d360-actions', { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .fromTo('.d360-stats',   { opacity: 0, y: 20 },  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .fromTo('.d360-orbit',   { opacity: 0, scale: 0.7, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8');

        /* ── Orbit node stagger ──────────────────────────── */
        gsap.fromTo('.d360-orbit__node',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(2)', delay: 1.0 }
        );

        /* ── Orbit continuous slow spin ─────────────────── */
        gsap.to('.d360-orbit__ring--2', {
          rotation: 360, duration: 28, repeat: -1, ease: 'none', transformOrigin: 'center center',
        });
        gsap.to('.d360-orbit__ring--3', {
          rotation: -360, duration: 40, repeat: -1, ease: 'none', transformOrigin: 'center center',
        });

        /* ── Stat counters ───────────────────────────────── */
        document.querySelectorAll<HTMLElement>('.d360-counter').forEach(el => {
          const target = parseFloat(el.dataset.target || '0');
          const suffix = el.dataset.suffix || '';
          const decimal = el.dataset.decimal === 'true';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2, delay: 1.4, ease: 'power2.out',
            onUpdate: () => {
              el.textContent = (decimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
            },
          });
        });

        /* ── What is 360 section ─────────────────────────── */
        gsap.fromTo('.d360-intro__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-intro', start: 'top 80%' },
          }
        );
        gsap.fromTo('.d360-funnel',
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-intro', start: 'top 80%' },
          }
        );

        /* ── Funnel bars animate in ──────────────────────── */
        gsap.fromTo('.d360-funnel__bar',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-funnel', start: 'top 85%' },
          }
        );

        /* ── Pillars ─────────────────────────────────────── */
        gsap.fromTo('.d360-pillar-card',
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-pillars-grid', start: 'top 80%' },
          }
        );

        /* ── Why section cards ───────────────────────────── */
        gsap.fromTo('.d360-why-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-why-grid', start: 'top 80%' },
          }
        );

        /* ── Process steps with line draw ───────────────── */
        gsap.fromTo('.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-process', start: 'top 80%' },
          }
        );
        gsap.fromTo('.svc-process__connector',
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 0.5, stagger: 0.18, ease: 'power2.out',
            scrollTrigger: { trigger: '.d360-process', start: 'top 80%' },
          }
        );

        /* ── Channel pills ───────────────────────────────── */
        gsap.fromTo('.d360-channel-pill',
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: 'back.out(1.8)',
            scrollTrigger: { trigger: '.d360-channels', start: 'top 80%' },
          }
        );

        /* ── Results cards ───────────────────────────────── */
        gsap.fromTo('.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-results', start: 'top 80%' },
          }
        );

        /* ── Marquee checkpoints ─────────────────────────── */
        gsap.fromTo('.d360-checkpoint',
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-checkpoints', start: 'top 80%' },
          }
        );

        /* ── FAQ ─────────────────────────────────────────── */
        gsap.fromTo('.svc-faq-item',
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.svc-faq', start: 'top 80%' },
          }
        );

        /* ── CTA ─────────────────────────────────────────── */
        gsap.fromTo('.d360-cta-inner > *',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-cta-section', start: 'top 80%' },
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

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section id="360-digital-marketing" className="svc-hero d360-hero" aria-labelledby="d360-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#6c63ff' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#a855f7' }} />
        <div className="d360-hero__scanline" aria-hidden="true" />

        <div className="container">
          <div className="svc-hero__inner">
            {/* Left */}
            <div className="svc-hero__content">
              <span className="svc-hero__tag d360-tag" style={{ color: COLOR, borderColor: COLOR }}>
                360° Digital Marketing
              </span>
              <h1 id="d360-h1-el" className="svc-hero__h1 d360-h1">
                Every Channel.<br />
                One Strategy.<br />
                <span className="text-gradient">Total Growth.</span>
              </h1>
              <p className="svc-hero__sub d360-sub">
                The most powerful brands don't pick one channel — they dominate all of them.
                Cogent's 360° Digital Marketing service unifies SEO, paid media, social, content,
                influencer, and web into a single compounding growth engine.
              </p>
              <div className="svc-hero__actions d360-actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  Get a Free 360° Audit <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
                  See Our Work
                </button>
              </div>
              <div className="svc-hero__stats d360-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num d360-counter" data-target="6" data-suffix="+" >6+</span>
                  <span className="svc-stat-card__label">Channels Managed</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num d360-counter" data-target="200" data-suffix="+">200+</span>
                  <span className="svc-stat-card__label">Brands Scaled</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num d360-counter" data-target="4.8" data-decimal="true" data-suffix="×">4.8×</span>
                  <span className="svc-stat-card__label">Blended ROAS</span>
                </div>
              </div>
            </div>

            {/* Right — orbit */}
            <div className="svc-hero__visual" aria-hidden="true">
              <OrbitVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS 360° ══════════════════════════════════ */}
      <section id="what-is-360-digital-marketing" className="svc-section d360-intro" aria-labelledby="d360-intro-h2">
        <div className="container">
          <div className="svc-intro">
            <div className="svc-intro__text d360-intro__text">
              <span className="tag">The Full Picture</span>
              <h2 id="d360-intro-h2">What Is 360° Digital Marketing?</h2>
              <p>
                Most brands operate with fragmented marketing — an SEO agency here, a social
                media freelancer there, a performance agency somewhere else. Each works in a silo,
                reports independently, and optimises for their own metrics. The result is
                disconnected messaging, duplicated spend, and missed attribution.
              </p>
              <p>
                360° Digital Marketing means every channel is architected together. Your SEO
                content feeds your social media. Your paid ads retarget your organic visitors.
                Your influencers amplify your content. Your website converts the traffic every
                channel sends. Each piece of the ecosystem makes every other piece stronger.
              </p>
              <div className="d360-intro__checks">
                {[
                  'Unified brand voice across all touchpoints',
                  'Single attribution model — see the full customer journey',
                  'Channels amplify each other instead of competing',
                  'One strategy team, zero briefing gaps',
                ].map(c => (
                  <div key={c} className="d360-intro__check">
                    <CheckCircle size={15} color={COLOR} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="svc-intro__visual">
              <FunnelVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6 PILLARS ═════════════════════════════════════ */}
      <section id="360-marketing-services" className="svc-section svc-section--alt" aria-labelledby="d360-pillars-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">The Six Pillars</span>
            <h2 id="d360-pillars-h2">Every Channel, <span className="text-gradient">Mastered</span></h2>
            <p>Six integrated disciplines — each elite on its own, unstoppable together.</p>
          </div>
          <div className="d360-pillars-grid">
            {pillars.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="d360-pillar-card" style={{ '--pillar-color': color } as React.CSSProperties}>
                <div className="d360-pillar-card__top">
                  <div className="d360-pillar-card__icon">
                    <Icon size={22} />
                  </div>
                  <div className="d360-pillar-card__num-glow" style={{ background: color }} />
                </div>
                <h3 className="d360-pillar-card__title">{title}</h3>
                <p className="d360-pillar-card__desc">{desc}</p>
                <div className="d360-pillar-card__line" style={{ background: color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY 360° ══════════════════════════════════════ */}
      <section id="why-360-marketing" className="svc-section" aria-labelledby="d360-why-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">The Advantage</span>
            <h2 id="d360-why-h2">Why 360° Beats Single-Channel</h2>
            <p>The sum of all channels — when unified — is greater than its parts.</p>
          </div>
          <div className="d360-why-grid">
            {whyPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="d360-why-card">
                <div className="d360-why-card__icon">
                  <Icon size={22} />
                </div>
                <h3 className="d360-why-card__title">{title}</h3>
                <p className="d360-why-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═══════════════════════════════════════ */}
      <section id="360-marketing-process" className="svc-section svc-section--alt" aria-labelledby="d360-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How We Work</span>
            <h2 id="d360-process-h2">Our 360° Growth Process</h2>
            <p>A four-phase programme that builds a complete, compounding digital presence.</p>
          </div>
          <div className="svc-process d360-process">
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

      {/* ══ CHANNELS CLOUD ════════════════════════════════ */}
      <section id="360-marketing-channels" className="svc-section svc-section--dark d360-channels" aria-labelledby="d360-channels-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Full Stack</span>
            <h2 id="d360-channels-h2">Every Channel in Our Arsenal</h2>
            <p>16 disciplines. One team. One goal: your growth.</p>
          </div>
          <div className="d360-channels-cloud">
            {channels.map(ch => (
              <span key={ch} className="d360-channel-pill">{ch}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ═══════════════════════════════ */}
      <section id="360-whats-included" className="svc-section" aria-labelledby="d360-included-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What You Get</span>
            <h2 id="d360-included-h2">Everything Included, <span className="text-gradient">Nothing Hidden</span></h2>
            <p>One monthly engagement. Every service you need to dominate your category.</p>
          </div>
          <div className="d360-checkpoints">
            {[
              { icon: Globe,        label: 'Dedicated Account Strategist',     desc: 'One senior point of contact who owns your entire growth roadmap.' },
              { icon: BarChart2,    label: 'Unified Reporting Dashboard',       desc: 'Real-time visibility across all channels in a single dashboard.' },
              { icon: Zap,         label: 'Monthly Strategy Sessions',          desc: 'Deep-dive reviews with your full cross-channel team every month.' },
              { icon: Target,      label: 'Cross-Channel Campaign Planning',    desc: 'Coordinated calendar so every campaign amplifies every other.' },
              { icon: TrendingUp,  label: 'Quarterly Growth Reviews',           desc: 'Comprehensive analysis of channel mix, budget allocation, and KPIs.' },
              { icon: Star,        label: 'Priority Creative Production',       desc: 'Fast-track access to our studio for content, video, and ad creatives.' },
              { icon: Users,       label: 'Influencer & Creator Network',       desc: '2,000+ vetted creators available for every campaign requirement.' },
              { icon: RefreshCw,   label: 'Continuous Optimisation',            desc: 'Weekly channel reviews with real-time bid and creative updates.' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="d360-checkpoint">
                <div className="d360-checkpoint__icon">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="d360-checkpoint__label">{label}</p>
                  <p className="d360-checkpoint__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RESULTS ═══════════════════════════════════════ */}
      <section id="360-marketing-results" className="svc-section svc-section--alt d360-results" aria-labelledby="d360-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="d360-results-h2">What 360° Looks Like in Practice</h2>
            <p>Results from brands who trusted us with the full picture.</p>
          </div>
          <div className="svc-results">
            {results.map(r => (
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

      {/* ══ FAQ ═══════════════════════════════════════════ */}
      <section id="360-marketing-faq" className="svc-section" aria-labelledby="d360-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="d360-faq-h2">360° Marketing — Your Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map(f => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════ */}
      <section id="360-marketing-cta" className="svc-section d360-cta-section" aria-labelledby="d360-cta-h2">
        <div className="d360-cta-glow" aria-hidden="true" />
        <div className="container d360-cta-inner">
          <span className="tag">Get Started</span>
          <h2 id="d360-cta-h2" className="svc-cta__title">
            Ready for <span className="text-gradient">Total Digital Dominance?</span>
          </h2>
          <p className="svc-cta__sub">
            Get a free 360° audit of your current digital presence. We'll map every gap,
            every opportunity, and every channel you should be owning — then show you exactly
            how we'd build your growth engine.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry} className="btn btn-primary">
              Get Your Free 360° Audit <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry} className="btn btn-outline">
              Talk to a Strategist
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

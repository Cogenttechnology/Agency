import React, { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  ArrowRight,
  Plus,
  TrendingUp,
  DollarSign,
  BarChart2,
  Video,
  Monitor,
  ShoppingBag,
  Target,
  Zap,
  RefreshCw,
  Users,
  Star,
  CheckCircle,
  Package,
  Layers,
  PieChart,
  Rocket,
  Globe,
} from 'lucide-react';
import './ServicePage.css';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './D2CMarketing.css';

/* ── Constants ─────────────────────────────────────── */
const COLOR    = '#ff6b35';
const GRADIENT = 'linear-gradient(135deg, #ff6b35 0%, #f59e0b 100%)';

/* ── Data ──────────────────────────────────────────── */
const heroStats = [
  { num: '20 Cr+', label: 'Ad Budget Managed' },
  { num: '80 Cr+', label: 'Revenue Generated' },
  { num: '4x',     label: 'Average ROAS' },
];

const services = [
  {
    icon: BarChart2,
    title: 'Paid Media',
    desc: 'A data-led, structured, and scalable approach to Meta and Google Ads focused on sustainable performance and ROI.',
    color: '#ff6b35',
    tag: '01',
  },
  {
    icon: TrendingUp,
    title: 'Growth Marketing',
    desc: 'Driving profitable growth by reducing RTOs, improving contribution margins, increasing prepaid orders, and strengthening retention.',
    color: '#f59e0b',
    tag: '02',
  },
  {
    icon: Video,
    title: 'Visuals',
    desc: 'UGC videos, CGI and animations, paid collaborations, static ads, branding and packaging — creatives that convert.',
    color: '#a855f7',
    tag: '03',
  },
  {
    icon: Monitor,
    title: 'Tech',
    desc: 'End-to-end e-commerce solutions covering website and app development, CRO, and conversion-focused UI/UX design.',
    color: '#3b82f6',
    tag: '04',
  },
];

const whyUs = [
  {
    icon: DollarSign,
    title: 'Profit-First Approach',
    desc: 'We obsess over contribution margins, not just topline revenue. Every decision is made with profitability in mind.',
  },
  {
    icon: Layers,
    title: 'All In-House',
    desc: 'From UGC video production to performance marketing and CRO — everything delivered in-house, no outsourcing.',
  },
  {
    icon: PieChart,
    title: 'Data-Driven',
    desc: 'Analytics and data inform every creative, every bid strategy, every audience — no guesswork, only insights.',
  },
  {
    icon: Rocket,
    title: 'Scalable Systems',
    desc: 'We build systems that drive sustainable growth, not short-term spikes. Built to scale profitably over time.',
  },
  {
    icon: RefreshCw,
    title: 'Reduce RTOs',
    desc: 'We actively work to reduce Return-to-Origin rates, improving prepaid order ratios and saving margin on every order.',
  },
  {
    icon: Globe,
    title: '8+ Years Experience',
    desc: 'Based in Jaipur with 8+ years of experience helping Indian D2C brands scale from zero to crores monthly.',
  },
];

const process = [
  {
    num: '01',
    title: 'Brand Audit',
    desc: 'Deep dive into your current metrics — ROAS, CAC, LTV, RTO rates, and creative performance to find the gaps.',
  },
  {
    num: '02',
    title: 'Growth Blueprint',
    desc: 'Custom strategy combining paid media, creative direction, and tech improvements to hit your revenue targets.',
  },
  {
    num: '03',
    title: 'Launch & Scale',
    desc: 'Execute campaigns, produce creatives, and deploy tech optimizations — all simultaneously for maximum impact.',
  },
  {
    num: '04',
    title: 'Track & Optimize',
    desc: 'Weekly performance reviews, creative testing cycles, and continuous margin optimization to compound growth.',
  },
];

const clients = [
  'Jaipur Studio', 'Nitnaya', 'Aruwa', 'Khushboo Jewellers',
  'Upper & Bottom', 'Tushti', 'Diruno', 'Ultimats',
  'Kuku FM', 'Saras Dairy', 'Clarks Jaipur', 'Manglam',
];

const metrics = [
  { num: '0→30L', label: 'Monthly Revenue', client: 'Diruno Fashion', period: 'in 4 months' },
  { num: '4x',    label: 'Average ROAS',    client: 'Multiple Brands', period: 'sustained' },
  { num: '80Cr+', label: 'Revenue Driven',  client: 'Portfolio-wide',  period: 'total' },
];

const testimonials = [
  {
    name: 'Mihir',
    brand: 'Diruno Men\'s Fashion',
    quote: 'In the last four months, we have generated revenue from zero to thirty lakh per month. They scale performance based on creative insights, analytics, and data trends.',
    rating: 5,
  },
  {
    name: 'Arun',
    brand: 'Ultimats',
    quote: 'Our entire digital marketing requirement is met by the team, and we\'re very happy with their professionalism and attention to detail.',
    rating: 5,
  },
  {
    name: 'Piyush',
    brand: 'Khushboo Jewellers',
    quote: 'All of our marketing is being handled by them, and if you also want to get digital marketing done, I think there\'s no one better than them.',
    rating: 5,
  },
];

const faqs = [
  {
    q: 'What is D2C marketing and how is it different?',
    a: 'D2C (Direct-to-Consumer) marketing bypasses traditional retail channels, letting brands sell directly to customers online. It requires a unique mix of paid media, conversion optimization, retention, and logistics efficiency — unlike general marketing which focuses only on awareness or lead gen.',
  },
  {
    q: 'What platforms do you run paid media on?',
    a: 'We primarily run on Meta (Facebook & Instagram) and Google Ads — the two highest-ROI platforms for D2C brands in India. We also work on YouTube, Snapchat, and emerging platforms based on your audience demographics.',
  },
  {
    q: 'How do you help reduce RTOs?',
    a: 'We analyze your RTO patterns by SKU, region, and traffic source. Then we implement targeted interventions — prepaid incentives, COD verification flows, address validation, and audience suppression — to systematically bring down your RTO rate and protect your margins.',
  },
  {
    q: 'Do you work with early-stage D2C brands?',
    a: 'Yes. We work with brands at all stages — from zero to their first crore, to brands scaling from 10Cr to 100Cr. Our approach adapts based on where you are: early-stage focuses on finding the winning creative-audience combo; growth stage focuses on scaling what works.',
  },
  {
    q: 'What makes your creative process different?',
    a: 'Our creatives are built on data — we analyze what hooks, formats, and messaging angles perform best in your category, then produce UGC, CGI, and static ads in-house. Every creative is made to perform, not just to look good.',
  },
];

/* ── Sub-components ─────────────────────────────────── */
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

/* 3D tilt card — follows cursor on desktop */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    gsap.to(card, {
      rotateY: dx * 12,
      rotateX: -dy * 12,
      scale: 1.04,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.5, ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      className={`d2c-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────── */
export default function D2CMarketing() {
  const { openEnquiry } = useEnquiry();
  const pageRef  = useRef<HTMLDivElement>(null);
  const orbRef1  = useRef<HTMLDivElement>(null);
  const orbRef2  = useRef<HTMLDivElement>(null);

  /* Magnetic orb follows cursor in hero */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth  - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      gsap.to(orbRef1.current, { x: x * 80, y: y * 60, duration: 1.2, ease: 'power2.out' });
      gsap.to(orbRef2.current, { x: -x * 50, y: -y * 40, duration: 1.5, ease: 'power2.out' });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Scroll animations */
  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;
    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {

        /* Hero */
        gsap.fromTo('.d2c-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.d2c-h1',      { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.d2c-sub',     { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
        gsap.fromTo('.d2c-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.d2c-hero-stat', { opacity: 0, y: 30, scale: 0.85 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, delay: 1.0,
          ease: 'back.out(1.7)',
        });
        gsap.fromTo('.d2c-hero-visual', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6, ease: 'power3.out' });

        /* Value prop */
        gsap.fromTo('.d2c-value__text > *', { opacity: 0, x: -40 }, {
          opacity: 1, x: 0, duration: 0.75, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-value', start: 'top 80%' },
        });
        gsap.fromTo('.d2c-value__visual', { opacity: 0, scale: 0.9 }, {
          opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-value', start: 'top 80%' },
        });

        /* Services */
        gsap.fromTo('.d2c-service-card', { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-services-grid', start: 'top 80%' },
        });

        /* Metrics */
        gsap.fromTo('.d2c-metric-card', { opacity: 0, scale: 0.8, y: 30 }, {
          opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.15, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.d2c-metrics', start: 'top 80%' },
        });

        /* Why us */
        gsap.fromTo('.d2c-why-card', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-why-grid', start: 'top 80%' },
        });

        /* Process */
        gsap.fromTo('.svc-process__step', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-process', start: 'top 80%' },
        });

        /* Clients */
        gsap.fromTo('.d2c-client-pill', { opacity: 0, scale: 0.7 }, {
          opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.d2c-clients', start: 'top 85%' },
        });

        /* Testimonials */
        gsap.fromTo('.d2c-testimonial', { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-testimonials-grid', start: 'top 80%' },
        });

        /* FAQ */
        gsap.fromTo('.svc-faq-item', { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.55, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-faq', start: 'top 80%' },
        });

        /* CTA */
        gsap.fromTo('.d2c-cta > *', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.d2c-cta', start: 'top 85%' },
        });

      }, pageRef);
      ScrollTrigger.refresh();
    });
    return () => { cancelAnimationFrame(rafId); ctx?.revert(); };
  }, []);

  return (
    <div
      ref={pageRef}
      className="d2c-page"
      style={{ '--svc-color': COLOR, '--svc-gradient': GRADIENT } as React.CSSProperties}
    >

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="d2c-hero" aria-labelledby="d2c-h1">
        <div ref={orbRef1} className="d2c-orb d2c-orb--1" />
        <div ref={orbRef2} className="d2c-orb d2c-orb--2" />
        <div className="d2c-orb d2c-orb--3" />

        <div className="container">
          <div className="d2c-hero__inner">
            <div className="d2c-hero__content">
              <span className="d2c-tag">
                <Package size={12} style={{ display: 'inline', marginRight: 6 }} />
                D2C Growth Partner
              </span>
              <h1 id="d2c-h1" className="d2c-h1">
                Growth Partner for{' '}
                <span className="d2c-gradient-text">India's Leading</span>{' '}
                D2C Brands
              </h1>
              <p className="d2c-sub">
                A data-driven eCommerce agency helping with Tech, Analytics, Visuals &amp;
                Paid Media. We help brands scale their online presence with proven strategies
                and cutting-edge technology.
              </p>
              <div className="d2c-actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  View Our Profile <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
                  Get Free Brand Audit
                </button>
              </div>
              {/* Hero stats */}
              <div className="d2c-hero-stats">
                {heroStats.map(s => (
                  <TiltCard key={s.label} className="d2c-hero-stat">
                    <span className="d2c-hero-stat__num">{s.num}</span>
                    <span className="d2c-hero-stat__label">{s.label}</span>
                  </TiltCard>
                ))}
              </div>
            </div>

            {/* Hero 3D visual */}
            <div className="d2c-hero-visual" aria-hidden="true">
              <div className="d2c-hero-visual__scene">
                {/* Floating cubes */}
                <div className="d2c-cube d2c-cube--1">
                  <div className="d2c-cube__face d2c-cube__face--front" />
                  <div className="d2c-cube__face d2c-cube__face--back" />
                  <div className="d2c-cube__face d2c-cube__face--left" />
                  <div className="d2c-cube__face d2c-cube__face--right" />
                  <div className="d2c-cube__face d2c-cube__face--top" />
                  <div className="d2c-cube__face d2c-cube__face--bottom" />
                </div>
                <div className="d2c-cube d2c-cube--2">
                  <div className="d2c-cube__face d2c-cube__face--front" />
                  <div className="d2c-cube__face d2c-cube__face--back" />
                  <div className="d2c-cube__face d2c-cube__face--left" />
                  <div className="d2c-cube__face d2c-cube__face--right" />
                  <div className="d2c-cube__face d2c-cube__face--top" />
                  <div className="d2c-cube__face d2c-cube__face--bottom" />
                </div>
                <div className="d2c-cube d2c-cube--3">
                  <div className="d2c-cube__face d2c-cube__face--front" />
                  <div className="d2c-cube__face d2c-cube__face--back" />
                  <div className="d2c-cube__face d2c-cube__face--left" />
                  <div className="d2c-cube__face d2c-cube__face--right" />
                  <div className="d2c-cube__face d2c-cube__face--top" />
                  <div className="d2c-cube__face d2c-cube__face--bottom" />
                </div>
                {/* Central card */}
                <div className="d2c-hero-card">
                  <div className="d2c-hero-card__glow" />
                  <div className="d2c-hero-card__icon">
                    <Rocket size={32} />
                  </div>
                  <p className="d2c-hero-card__label">D2C Growth Engine</p>
                  <div className="d2c-hero-card__metrics">
                    <div className="d2c-hero-card__metric">
                      <span style={{ color: '#ff6b35', fontWeight: 800, fontSize: '1.3rem' }}>4x</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>ROAS</span>
                    </div>
                    <div className="d2c-hero-card__divider" />
                    <div className="d2c-hero-card__metric">
                      <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.3rem' }}>80Cr</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>Revenue</span>
                    </div>
                  </div>
                </div>
                {/* Orbiting ring */}
                <div className="d2c-ring d2c-ring--1" />
                <div className="d2c-ring d2c-ring--2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Value Prop ──────────────────────────────────── */}
      <section className="svc-section d2c-value" aria-labelledby="d2c-value-h2">
        <div className="container">
          <div className="svc-intro">
            <div className="svc-intro__text d2c-value__text">
              <span className="tag">Who We Are</span>
              <h2 id="d2c-value-h2">
                One-Stop Growth Partner<br />for E-Commerce Brands
              </h2>
              <p>
                We are a one-stop growth partner for e-commerce brands. We marry Paid Media,
                Creative, and Technology to create high-growth, profitable D2C brands.
              </p>
              <p>
                Based in Jaipur with 8+ years of experience, and backed by our sister concern
                The Cogent, we focus on building scalable systems that drive sustainable
                growth — not just short-term results. From UGC video production and social media
                marketing to CRO and performance marketing — everything delivered in-house.
              </p>
              <div className="d2c-value__checks">
                {['In-house creative studio', 'Data-first decisions', 'Profit-focused strategy', 'RTO reduction systems'].map(t => (
                  <div key={t} className="d2c-value__check">
                    <CheckCircle size={16} color={COLOR} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <button onClick={openEnquiry} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Work With Us <ArrowRight size={16} />
              </button>
            </div>
            <div className="d2c-value__visual svc-intro__visual">
              <TiltCard className="d2c-value-visual-card">
                <div className="d2c-value-visual-card__glow" />
                <div className="d2c-value-visual-card__content">
                  {[
                    { icon: BarChart2, label: 'Paid Media', color: '#ff6b35' },
                    { icon: Video,     label: 'Visuals',    color: '#a855f7' },
                    { icon: Monitor,   label: 'Tech & CRO', color: '#3b82f6' },
                    { icon: TrendingUp, label: 'Growth',    color: '#f59e0b' },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="d2c-pillar-chip" style={{ '--chip-c': color } as React.CSSProperties}>
                      <Icon size={18} color={color} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
                <div className="d2c-value-visual-card__stat">
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: COLOR }}>4x</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)' }}>Average ROAS across portfolio</span>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────── */}
      <section className="svc-section svc-section--alt" aria-labelledby="d2c-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="d2c-services-h2">Our Core Services</h2>
            <p>Four integrated disciplines working together to scale your D2C brand profitably.</p>
          </div>
          <div className="d2c-services-grid">
            {services.map(({ icon: Icon, title, desc, color, tag }) => (
              <TiltCard key={title} className="d2c-service-card">
                <div className="d2c-service-card__inner" style={{ '--s-color': color } as React.CSSProperties}>
                  <div className="d2c-service-card__tag">{tag}</div>
                  <div className="d2c-service-card__icon">
                    <Icon size={28} />
                  </div>
                  <h3 className="d2c-service-card__title">{title}</h3>
                  <p className="d2c-service-card__desc">{desc}</p>
                  <button
                    className="d2c-service-card__cta"
                    onClick={openEnquiry}
                  >
                    Know More <ArrowRight size={13} />
                  </button>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact Metrics ───────────────────────────────── */}
      <section className="svc-section d2c-metrics-section" aria-labelledby="d2c-metrics-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Numbers Don't Lie</span>
            <h2 id="d2c-metrics-h2">Results That Speak</h2>
            <p>Real numbers from real brands we've scaled.</p>
          </div>
          <div className="d2c-metrics">
            {metrics.map(m => (
              <TiltCard key={m.label} className="d2c-metric-card">
                <div className="d2c-metric-card__glow" />
                <div className="d2c-metric-card__num">{m.num}</div>
                <div className="d2c-metric-card__label">{m.label}</div>
                <div className="d2c-metric-card__client">{m.client}</div>
                <div className="d2c-metric-card__period">{m.period}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ───────────────────────────────────────── */}
      <section className="svc-section svc-section--alt" aria-labelledby="d2c-why-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Why Choose Us</span>
            <h2 id="d2c-why-h2">The Cogent D2C Difference</h2>
            <p>What sets us apart from every other digital marketing agency.</p>
          </div>
          <div className="d2c-why-grid">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="d2c-why-card">
                <div className="d2c-why-card__icon">
                  <Icon size={22} />
                </div>
                <h3 className="d2c-why-card__title">{title}</h3>
                <p className="d2c-why-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="svc-section" aria-labelledby="d2c-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How We Work</span>
            <h2 id="d2c-process-h2">Our Growth Process</h2>
            <p>A structured 4-step approach to scaling D2C brands profitably.</p>
          </div>
          <div className="svc-process d2c-process">
            {process.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="svc-process__step">
                  <div className="svc-process__num">{step.num}</div>
                  <h3 className="svc-process__title">{step.title}</h3>
                  <p className="svc-process__desc">{step.desc}</p>
                </div>
                {i < process.length - 1 && <div className="svc-process__connector" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients ──────────────────────────────────────── */}
      <section className="svc-section svc-section--dark d2c-clients" aria-labelledby="d2c-clients-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Clients</span>
            <h2 id="d2c-clients-h2">Brands We've Scaled</h2>
            <p>The trust motivates us to deliver the best.</p>
          </div>
          <div className="d2c-clients-grid">
            {clients.map(c => (
              <div key={c} className="d2c-client-pill">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="svc-section" aria-labelledby="d2c-testi-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What Clients Say</span>
            <h2 id="d2c-testi-h2">Success Stories</h2>
          </div>
          <div className="d2c-testimonials-grid">
            {testimonials.map(t => (
              <TiltCard key={t.name} className="d2c-testimonial">
                <div className="d2c-testimonial__stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p className="d2c-testimonial__quote">"{t.quote}"</p>
                <div className="d2c-testimonial__author">
                  <div className="d2c-testimonial__avatar">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="d2c-testimonial__name">{t.name}</p>
                    <p className="d2c-testimonial__brand">{t.brand}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="svc-section svc-section--alt" aria-labelledby="d2c-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="d2c-faq-h2">D2C Marketing Questions</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map(f => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="svc-section d2c-cta" aria-labelledby="d2c-cta-h2">
        <div className="d2c-cta__orb d2c-cta__orb--1" />
        <div className="d2c-cta__orb d2c-cta__orb--2" />
        <div className="container">
          <div className="d2c-cta__inner">
            <span className="tag">Get Started</span>
            <h2 id="d2c-cta-h2" className="d2c-cta__title">
              Ready to Scale Your{' '}
              <span className="d2c-gradient-text">D2C Brand?</span>
            </h2>
            <p className="d2c-cta__sub">
              Get a free brand audit — we'll analyse your current ROAS, CAC, creative
              performance, and RTO rate to show you exactly where your growth is being lost.
            </p>
            <div className="d2c-cta__actions">
              <button onClick={openEnquiry} className="btn btn-primary d2c-cta__btn">
                Get Free Brand Audit <ArrowRight size={16} />
              </button>
              <button onClick={openEnquiry} className="btn btn-outline">
                Send Us a Message
              </button>
            </div>
            {/* Floating metrics */}
            <div className="d2c-cta__metrics">
              {[
                { val: '20Cr+', label: 'Ad Budget' },
                { val: '80Cr+', label: 'Revenue' },
                { val: '4x',    label: 'ROAS' },
                { val: '8+',    label: 'Years Exp.' },
              ].map(m => (
                <div key={m.label} className="d2c-cta__metric">
                  <span className="d2c-cta__metric-val">{m.val}</span>
                  <span className="d2c-cta__metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}

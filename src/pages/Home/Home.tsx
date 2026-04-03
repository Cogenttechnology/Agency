import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useEnquiry } from '../../context/EnquiryContext';
import {
  ArrowRight, ChevronLeft, ChevronRight, Plus, Minus,
  Lightbulb, Users, Globe, Award, Star,
  Monitor, Video, Search, Share2, BarChart2, Mic2, Mail,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './Home.css';

/* ─── Data ──────────────────────────────────────────────── */

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
  { value: 12,  suffix: '×', label: 'Average ROI' },
  { value: 7,   suffix: '+', label: 'Years of Excellence' },
];

const channels = [
  { icon: Search,   label: 'SEO',        color: '#00d4aa', pos: { top: '5%',   left: '40%'  }, float: 'floatA', dur: '3.5s' },
  { icon: BarChart2,label: 'Meta Ads',   color: '#a855f7', pos: { top: '28%',  left: '-2%'  }, float: 'floatB', dur: '4s'   },
  { icon: Share2,   label: 'Social',     color: '#f59e0b', pos: { top: '28%',  right: '-2%' }, float: 'floatC', dur: '3s'   },
  { icon: Video,    label: 'Video',      color: '#ff6b6b', pos: { bottom:'12%',left: '8%'   }, float: 'floatA', dur: '5s'   },
  { icon: Mail,     label: 'Email',      color: '#00d4ff', pos: { bottom:'12%',right: '8%'  }, float: 'floatB', dur: '4.5s' },
  { icon: Mic2,     label: 'Influencer', color: '#ec4899', pos: { bottom:'30%',left: '44%'  }, float: 'floatC', dur: '3.8s' },
];

const services = [
  {
    icon: Monitor,
    title: 'Web Design & Development',
    desc: 'We craft high-performance websites and digital products that look stunning and convert visitors into customers.',
    bullets: ['Custom UI/UX design', 'React & Next.js builds', 'Mobile-first & blazing fast', 'CMS integration'],
    color: '#6c63ff',
  },
  {
    icon: Video,
    title: 'Video Production',
    desc: 'From concept to final cut — we produce scroll-stopping brand films, reels, ads, and explainer videos that tell your story.',
    bullets: ['Brand films & ads', 'Social-first reels', 'Motion graphics', 'Scripting & storyboarding'],
    color: '#ff6b6b',
  },
  {
    icon: Search,
    title: 'SEO',
    desc: 'Dominate search rankings with a data-driven SEO strategy that drives qualified organic traffic and compounds over time.',
    bullets: ['Technical & on-page SEO', 'Content strategy', 'Link building', 'Monthly ranking reports'],
    color: '#00d4aa',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    desc: 'We grow your brand\'s presence across platforms with content strategies, community management, and paid social campaigns.',
    bullets: ['Content calendar & creation', 'Community management', 'Paid social campaigns', 'Analytics & reporting'],
    color: '#f59e0b',
  },
  {
    icon: BarChart2,
    title: 'Performance Marketing',
    desc: 'ROI-obsessed paid media campaigns across Google, Meta, and beyond — every rupee tracked, every conversion optimised.',
    bullets: ['Google & Meta Ads', 'Retargeting funnels', 'Landing page optimisation', 'Real-time dashboards'],
    color: '#a855f7',
  },
  {
    icon: Mic2,
    title: 'Influencer Marketing',
    desc: 'We connect your brand with the right voices — from nano creators to mega influencers — to generate authentic reach and conversions.',
    bullets: ['Creator sourcing & vetting', 'Campaign strategy', 'Content brief & review', 'ROI tracking & reporting'],
    color: '#ec4899',
  },
];

const industries = [
  {
    id: 'ecom',
    industry: 'E-Commerce',
    project: 'Axion Store',
    tag: 'Brand + Web',
    desc: 'Full brand overhaul and e-commerce platform for a luxury lifestyle retailer — from identity to checkout experience.',
    metric: '3.4× conversion lift',
    color: '#6c63ff',
    gradient: 'linear-gradient(135deg,#6c63ff 0%,#3a35cc 100%)',
  },
  {
    id: 'fintech',
    industry: 'FinTech',
    project: 'PulseX App',
    tag: 'UI/UX + Marketing',
    desc: 'Mobile-first design system and growth campaign for an emerging payments startup targeting Gen Z consumers.',
    metric: '2M+ app installs',
    color: '#00d4aa',
    gradient: 'linear-gradient(135deg,#00d4aa 0%,#0099aa 100%)',
  },
  {
    id: 'health',
    industry: 'Healthcare',
    project: 'MediCore',
    tag: 'Brand Strategy',
    desc: 'Comprehensive rebranding and digital presence for a multi-city hospital chain with a trusted legacy.',
    metric: '180% web traffic',
    color: '#ff6b6b',
    gradient: 'linear-gradient(135deg,#ff6b6b 0%,#cc3344 100%)',
  },
  {
    id: 'realty',
    industry: 'Real Estate',
    project: 'Skyline Group',
    tag: 'Digital Marketing',
    desc: 'Performance-led campaigns across search and social that generated qualified high-intent leads at scale.',
    metric: '₹420Cr in sales',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#f59e0b 0%,#d97706 100%)',
  },
  {
    id: 'saas',
    industry: 'SaaS',
    project: 'Synapse Labs',
    tag: 'Web + SEO',
    desc: 'Website redesign and content strategy for a B2B analytics platform, growing organic reach exponentially.',
    metric: '5× organic growth',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg,#a855f7 0%,#7c3aed 100%)',
  },
  {
    id: 'fashion',
    industry: 'Fashion',
    project: 'Novo Retail',
    tag: 'Creative Production',
    desc: 'Campaign shoots, social-first content and influencer strategy that made a D2C fashion brand go viral.',
    metric: '820K impressions',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg,#ec4899 0%,#be185d 100%)',
  },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Timelines vary by scope. A brand identity project takes 4–6 weeks, while a full website build ranges from 8–14 weeks. We work in focused sprints to ensure fast, quality delivery without compromising craft.',
  },
  {
    q: 'Do you work with startups or only established brands?',
    a: 'Both. We have dedicated packages for early-stage startups and established enterprises. Whether you are launching your first brand or scaling a market leader, we tailor our process to your stage and budget.',
  },
  {
    q: 'What does your onboarding process look like?',
    a: 'We start with a free 30-minute discovery call to understand your goals. From there, we send a proposal within 48 hours. Once approved, we kick off with a deep-dive strategy session before any execution begins.',
  },
  {
    q: 'Can you handle everything in-house?',
    a: 'Yes — strategy, creative, technology, and media all under one roof. Our integrated team means faster turnaround, a consistent brand voice, and zero agency handoff gaps.',
  },
  {
    q: 'What industries do you specialise in?',
    a: 'We have delivered results across e-commerce, fintech, healthcare, real estate, SaaS, fashion, and FMCG. Our process is industry-agnostic — what matters is your ambition and your audience.',
  },
  {
    q: 'How do you measure success?',
    a: 'Every engagement begins with agreed KPIs — be it brand awareness, lead volume, conversion rate, or ROI. We report against these metrics monthly and optimise campaigns in real time.',
  },
];

const clients = [
  { name: 'Brandify',   color: '#6c63ff', bg: 'rgba(108,99,255,0.1)' },
  { name: 'NovaSpark',  color: '#ff6b6b', bg: 'rgba(255,107,107,0.1)' },
  { name: 'Zenith Co',  color: '#00d4aa', bg: 'rgba(0,212,170,0.1)' },
  { name: 'PulseMedia', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { name: 'Ecliptic',   color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
  { name: 'Axion Labs', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  { name: 'Momentum',   color: '#6c63ff', bg: 'rgba(108,99,255,0.1)' },
  { name: 'Catalyst',   color: '#00d4aa', bg: 'rgba(0,212,170,0.1)' },
];

const aboutCards = [
  {
    icon: Lightbulb,
    title: 'Strategy First',
    desc: 'Every project starts with deep research and a clear north star — no guesswork, only direction.',
    color: '#6c63ff',
    gradient: 'var(--color-gradient-1)',
  },
  {
    icon: Users,
    title: 'People-Centred',
    desc: 'We design for real humans — building experiences that feel intuitive, warm, and intentional.',
    color: '#00d4aa',
    gradient: 'linear-gradient(135deg,#00d4aa,#6c63ff)',
  },
  {
    icon: Globe,
    title: 'Built to Scale',
    desc: 'From local ambitions to global campaigns, our work is engineered to grow with you.',
    color: '#ff6b6b',
    gradient: 'linear-gradient(135deg,#ff6b6b,#f59e0b)',
  },
  {
    icon: Award,
    title: 'Obsessed with Quality',
    desc: 'We hold every pixel and every sentence to the highest standard before it leaves our hands.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    wide: true,
  },
];

const testimonials = [
  {
    quote: "Cogent completely transformed how our brand shows up online. The strategy was sharp, the creative was stunning, and the results spoke for themselves — 3× more qualified leads in just 90 days.",
    name: 'Aisha Mehta',
    title: 'CMO, Axion Labs',
    initials: 'AM',
    gradient: 'linear-gradient(135deg,#6c63ff,#3a35cc)',
    rating: 5,
  },
  {
    quote: "Working with Cogent felt like having a world-class creative team embedded in our startup. They understood our vision instantly and delivered a brand identity we're incredibly proud of.",
    name: 'Rohan Kapoor',
    title: 'Founder, PulseX',
    initials: 'RK',
    gradient: 'linear-gradient(135deg,#00d4aa,#0099aa)',
    rating: 5,
  },
  {
    quote: "The website they built for us is fast, beautiful, and converts. Our bounce rate dropped 40% and time-on-site nearly doubled. Best investment we made this year.",
    name: 'Priya Singh',
    title: 'Head of Growth, Synapse Labs',
    initials: 'PS',
    gradient: 'linear-gradient(135deg,#ff6b6b,#cc3344)',
    rating: 5,
  },
  {
    quote: "Cogent doesn't just execute briefs — they challenge you to think bigger. Their strategic input helped us reposition our entire product, leading to a successful Series A raise.",
    name: 'Daniel Osei',
    title: 'CEO, Skyline Group',
    initials: 'DO',
    gradient: 'linear-gradient(135deg,#f59e0b,#d97706)',
    rating: 5,
  },
];

/* ─── Component ─────────────────────────────────────────── */

export default function Home() {
  const { openEnquiry } = useEnquiry();
  const homeRef  = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [activeInd,   setActiveInd]   = useState(0);
  const [openFaq,     setOpenFaq]     = useState<number | null>(null);
  const [activeTesti, setActiveTesti] = useState(0);
  const autoPlayRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const testiAutoRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const wordIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Industry auto-play ──────────────────────────────── */
  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(
      () => setActiveInd(i => (i + 1) % industries.length),
      4500,
    );
  };

  /* ── Testimonial auto-play ───────────────────────────── */
  const startTestiPlay = () => {
    if (testiAutoRef.current) clearInterval(testiAutoRef.current);
    testiAutoRef.current = setInterval(
      () => setActiveTesti(i => (i + 1) % testimonials.length),
      5000,
    );
  };

  const goToTesti = (i: number) => { setActiveTesti(i); startTestiPlay(); };

  useEffect(() => {
    startAutoPlay();
    startTestiPlay();
    return () => {
      if (autoPlayRef.current)  clearInterval(autoPlayRef.current);
      if (testiAutoRef.current) clearInterval(testiAutoRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToInd = (i: number) => { setActiveInd(i); startAutoPlay(); };
  const prevInd = () => goToInd((activeInd - 1 + industries.length) % industries.length);
  const nextInd = () => goToInd((activeInd + 1) % industries.length);

  /* ── FAQ toggle ──────────────────────────────────────── */
  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  /* ── GSAP animations ─────────────────────────────────── */
  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {

        /* Hero — word swap */
        const words = ['Legends', 'Empires', 'Icons', 'Forces'];
        let wordIdx = 0;
        const wordEl = document.querySelector('.hero__swap-word');
        wordIntervalRef.current = setInterval(() => {
          wordIdx = (wordIdx + 1) % words.length;
          gsap.to(wordEl, {
            opacity: 0, y: -14, duration: 0.3,
            onComplete: () => {
              if (wordEl) wordEl.textContent = words[wordIdx];
              gsap.fromTo(wordEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35 });
            },
          });
        }, 2500);

        /* Hero — entrance timeline */
        const tl = gsap.timeline({ delay: 0.2 });
        tl.fromTo('.hero__eyebrow',      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo('.hero__line-1',       { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
          .fromTo('.hero__line-2',       { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
          .fromTo('.hero__word-wrap',    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
          .fromTo('.hero__sub',          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
          .fromTo('.hero__actions',      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
          .fromTo('.hero__metrics',      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.25')
          .fromTo('.hero__channel-card', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, stagger: 0.1, duration: 0.55, ease: 'back.out(1.4)' }, '-=0.3')
          .fromTo('.hero__orb-core',     { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.2)' }, '-=0.8')
          .fromTo('.hero__scroll-hint',  { opacity: 0 },             { opacity: 1, duration: 0.5 }, '-=0.2');

        /* Hero — parallax on scroll */
        gsap.to('.hero__right', {
          y: 70, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__left', {
          y: 35, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__bg-orb', {
          y: 90, ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        });

        /* Stats counter */
        stats.forEach((stat, i) => {
          const el = document.querySelector(`.stat-value-${i}`);
          if (!el) return;
          gsap.to({ val: 0 }, {
            val: stat.value, duration: 2, ease: 'power2.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
            onUpdate: function () {
              el.textContent = Math.round((this as any).targets()[0].val) + stat.suffix;
            },
          });
        });

        /* Services */
        gsap.fromTo('.service-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.services-section', start: 'top 80%' } });

        /* Industry section header */
        gsap.fromTo('.ind-header > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.ind-section', start: 'top 82%' } });

        /* About section */
        gsap.fromTo('.about-left > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-section', start: 'top 80%' } });
        gsap.fromTo('.about-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-right', start: 'top 82%' } });

        /* Testimonials */
        gsap.fromTo('.testi-header > *',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.testi-section', start: 'top 82%' } });

        /* FAQ items */
        gsap.fromTo('.faq-item',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.faq-section', start: 'top 80%' } });

        /* Section headings */
        gsap.utils.toArray<Element>('.section-heading').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' } });
        });

      }, homeRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
      if (wordIntervalRef.current) clearInterval(wordIntervalRef.current);
    };
  }, []);

  const ind = industries[activeInd];

  /* ── JSX ─────────────────────────────────────────────── */
  return (
    <div ref={homeRef} className="home">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero">
        {/* Background orbs */}
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-orb hero__bg-orb--3" />
        {/* Scanline */}
        <div className="hero__scanline" aria-hidden="true" />
        {/* Watermark */}
        <div className="hero__deco" aria-hidden="true">COGENT</div>

        <div className="container hero__grid">
          {/* LEFT */}
          <div className="hero__left">
            <div className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              <span className="hero__eyebrow-text">India's Premier Digital Agency</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__line-1">We Turn</span>
              <span className="hero__line-2">Brands Into</span>
              <span className="hero__word-wrap">
                <span className="hero__swap-word text-gradient">Legends</span>
              </span>
            </h1>
            <p className="hero__sub">
              360° performance marketing, cinematic content &amp; scalable technology — all under one roof.
            </p>
            <div className="hero__actions">
              <button onClick={openEnquiry} className="btn btn-primary" id="hero-cta">
                <span>Start a Project</span>
                <ArrowRight size={18} />
              </button>
              <Link to="/portfolio" className="hero__ghost-link" id="hero-portfolio">
                See Our Work <ArrowRight size={14} />
              </Link>
            </div>
            <div className="hero__metrics">
              {[
                { num: '200+',   lbl: 'Projects'  },
                { num: '₹50Cr+', lbl: 'Ad Spend'  },
                { num: '8×',     lbl: 'Avg ROAS'  },
                { num: '98%',    lbl: 'Retention' },
              ].map(m => (
                <div key={m.lbl} className="hero__metric-pill glass">
                  <span className="hero__metric-num text-gradient">{m.num}</span>
                  <span className="hero__metric-lbl">{m.lbl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Orb Scene */}
          <div className="hero__right">
            <div className="hero__orb-scene">
              {/* Rings */}
              <div className="hero__orb-ring hero__orb-ring--1" />
              <div className="hero__orb-ring hero__orb-ring--2" />
              <div className="hero__orb-ring hero__orb-ring--3" />
              {/* Core */}
              <div className="hero__orb-core" />
              {/* Channel cards */}
              {channels.map(ch => (
                <div
                  key={ch.label}
                  className="hero__channel-card"
                  style={{
                    ...ch.pos,
                    animationName: ch.float,
                    animationDuration: ch.dur,
                    animationTimingFunction: 'ease-in-out',
                    animationIterationCount: 'infinite',
                  } as React.CSSProperties}
                >
                  <ch.icon size={22} style={{ color: ch.color }} />
                  <span>{ch.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint" aria-hidden="true">
          <span className="hero__scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section ref={statsRef} className="section stats-section">
        <div className="container stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-item">
              <div className={`stat-value stat-value-${i}`}>0{s.suffix}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">What We Do</span>
            <h2 className="section-heading">Full-Spectrum<br />Marketing Muscle</h2>
            <p className="section-subtext">
              From bold ideas to measurable results — we cover every angle of your growth story.
            </p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, desc, bullets, color }) => (
              <Link to="/services" key={title}
                className="service-card"
                id={`service-${title.replace(/\s/g, '-').toLowerCase()}`}>
                <div className="service-card__icon" style={{ '--icon-color': color } as React.CSSProperties}>
                  <Icon size={24} />
                </div>
                <h3 className="service-card__title">{title}</h3>
                <p className="service-card__desc">{desc}</p>
                <ul className="service-card__bullets">
                  {bullets.map(b => (
                    <li key={b} className="service-card__bullet">
                      <span className="service-card__bullet-dot" style={{ background: color }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="service-card__arrow"><ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ INDUSTRY SLIDER ══════════════════ */}
      <section className="section ind-section">
        <div className="container">
          {/* Header */}
          <div className="ind-header">
            <span className="tag">Industries We've Mastered</span>
            <h2 className="section-heading">Work That Speaks<br />Across Every Sector</h2>
          </div>

          {/* Industry tab pills */}
          <div className="ind-tabs" role="tablist">
            {industries.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={i === activeInd}
                className={`ind-tab ${i === activeInd ? 'ind-tab--active' : ''}`}
                style={{ '--tab-color': item.color } as React.CSSProperties}
                onClick={() => goToInd(i)}
              >
                {item.industry}
              </button>
            ))}
          </div>

          {/* Slide card — key forces re-animation on change */}
          <div className="ind-card" key={ind.id}>
            {/* Left: copy */}
            <div className="ind-card__text">
              <span
                className="tag"
                style={{
                  color: ind.color,
                  background: `${ind.color}1a`,
                  borderColor: `${ind.color}40`,
                } as React.CSSProperties}
              >
                {ind.tag}
              </span>
              <p className="ind-card__industry">{ind.industry}</p>
              <h3 className="ind-card__project">{ind.project}</h3>
              <p className="ind-card__desc">{ind.desc}</p>
              <div className="ind-card__metric" style={{ borderColor: ind.color } as React.CSSProperties}>
                <span className="ind-card__metric-value" style={{ color: ind.color }}>{ind.metric}</span>
                <span className="ind-card__metric-label">Key Result</span>
              </div>
              <Link to="/portfolio" className="ind-card__cta btn btn-primary"
                style={{ background: ind.color } as React.CSSProperties}
                id={`ind-cta-${ind.id}`}>
                <span>View Case Study</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: gradient visual */}
            <div className="ind-card__visual" style={{ background: ind.gradient } as React.CSSProperties}>
              <div className="ind-card__visual-noise" />
              <span className="ind-card__visual-label">{ind.industry}</span>
              <span className="ind-card__visual-number">
                {String(activeInd + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="ind-controls">
            <div className="ind-dots" role="tablist">
              {industries.map((_, i) => (
                <button
                  key={i}
                  className={`ind-dot ${i === activeInd ? 'ind-dot--active' : ''}`}
                  onClick={() => goToInd(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="ind-arrows">
              <button className="ind-arrow" onClick={prevInd} aria-label="Previous industry">
                <ChevronLeft size={20} />
              </button>
              <button className="ind-arrow" onClick={nextInd} aria-label="Next industry">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ ABOUT SNAPSHOT ══════════════════ */}
      <section className="section about-section">
        <div className="container">
          <div className="about-inner">
            {/* Left: copy */}
            <div className="about-left">
              <span className="tag">Who We Are</span>
              <h2 className="section-heading">A Studio Obsessed<br />With Your Growth</h2>
              <p className="about-mission">
                Cogent is a full-service creative agency built for ambitious brands. We combine
                sharp strategy, bold design, and performance marketing to help businesses grow
                faster and stand out louder — from their first campaign to their hundredth.
              </p>
              <div className="about-pillars">
                {[
                  { icon: Lightbulb, label: 'Strategy-led, always' },
                  { icon: Users,     label: 'Collaborative by nature' },
                  { icon: Globe,     label: 'Built for global ambition' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="about-pillar">
                    <span className="about-pillar__icon"><Icon size={18} /></span>
                    {label}
                  </div>
                ))}
              </div>
              <div className="about-inline-stats">
                {[
                  { num: '7+',   lbl: 'Years in Business' },
                  { num: '200+', lbl: 'Projects Delivered' },
                  { num: '40+',  lbl: 'Team Members' },
                ].map(s => (
                  <div key={s.lbl}>
                    <span className="about-stat__num">{s.num}</span>
                    <span className="about-stat__lbl">{s.lbl}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-outline about-cta">
                <span>Our Story</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: value cards */}
            <div className="about-right">
              {aboutCards.map(({ icon: Icon, title, desc, color, gradient, wide }) => (
                <div
                  key={title}
                  className={`about-card${wide ? ' about-card--wide' : ''}`}
                  style={{ '--card-color': color, '--card-gradient': gradient } as React.CSSProperties}
                >
                  <span className="about-card__icon"><Icon size={20} /></span>
                  <div>
                    <h4 className="about-card__title">{title}</h4>
                    <p className="about-card__desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section className="section testi-section">
        <div className="container">
          <div className="testi-header">
            <span className="tag">Client Love</span>
            <h2 className="section-heading">What Our Clients<br />Say About Us</h2>
          </div>

          <div className="testi-wrapper">
            {/* Featured card */}
            <div className="testi-card" key={activeTesti}>
              <div className="testi-card__quote-icon">"</div>
              <div className="testi-card__stars">
                {Array.from({ length: testimonials[activeTesti].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testi-card__text">{testimonials[activeTesti].quote}</p>
              <div className="testi-card__author">
                <div
                  className="testi-avatar"
                  style={{ background: testimonials[activeTesti].gradient }}
                >
                  {testimonials[activeTesti].initials}
                </div>
                <div>
                  <p className="testi-card__name">{testimonials[activeTesti].name}</p>
                  <p className="testi-card__title">{testimonials[activeTesti].title}</p>
                </div>
              </div>
            </div>

            {/* Nav sidebar */}
            <div className="testi-nav">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  className={`testi-nav__item ${i === activeTesti ? 'testi-nav__item--active' : ''}`}
                  onClick={() => goToTesti(i)}
                >
                  <div className="testi-nav__avatar" style={{ background: t.gradient }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="testi-nav__name">{t.name}</p>
                    <p className="testi-nav__company">{t.title}</p>
                  </div>
                </button>
              ))}
              <div className="testi-controls ind-arrows">
                <button className="ind-arrow" onClick={() => goToTesti((activeTesti - 1 + testimonials.length) % testimonials.length)} aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <button className="ind-arrow" onClick={() => goToTesti((activeTesti + 1) % testimonials.length)} aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FAQ ══════════════════ */}
      <section className="section faq-section">
        <div className="container">
          <div className="faq-inner">
            {/* Left: sticky heading */}
            <div className="faq-left">
              <span className="tag">FAQ</span>
              <h2 className="section-heading faq-heading">Questions<br />We Get Asked</h2>
              <p className="faq-sub">
                Can't find your answer?{' '}
                <button onClick={openEnquiry}  className="faq-link">Talk to us →</button>
              </p>
            </div>

            {/* Right: accordion */}
            <div className="faq-list">
              {faqs.map((item, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'faq-item--open' : ''}`}>
                  <button className="faq-item__trigger" onClick={() => toggleFaq(i)}>
                    <span className="faq-item__question">{item.q}</span>
                    <span className="faq-item__icon">
                      {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <div className="faq-item__body">
                    <div><p className="faq-item__answer">{item.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA MID ══════════════════ */}
      <section className="section cta-mid-section">
        <div className="container cta-mid">
          <div className="cta-mid__glow" />
          <span className="tag">Let's Collaborate</span>
          <h2 className="section-heading cta-mid__heading">Your Next Big<br />Campaign Starts Here</h2>
          <button onClick={openEnquiry}  className="btn btn-primary" id="home-mid-cta">
            <span>Start a Project</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <section className="section--sm marquee-section">
        <div className="marquee-label">
          <span className="marquee-label__line" />
          Trusted by ambitious brands
          <span className="marquee-label__line" />
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={i}
                className="marquee-item"
                style={{ '--m-color': c.color, '--m-bg': c.bg } as React.CSSProperties}
              >
                <span className="marquee-item__dot" />
                {c.name}
              </span>
            ))}
          </div>
        </div>
        <div className="marquee-wrapper marquee-wrapper--reverse">
          <div className="marquee-track marquee-track--reverse">
            {[...clients].reverse().concat([...clients].reverse()).map((c, i) => (
              <span
                key={i}
                className="marquee-item marquee-item--outline"
                style={{ '--m-color': c.color, '--m-bg': c.bg } as React.CSSProperties}
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

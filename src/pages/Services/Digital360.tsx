import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Search, Share2, BarChart2, Mic2, Video, Monitor,
  ArrowRight, CheckCircle, TrendingUp, Target,
  Zap, Globe, Users, Star, RefreshCw, Palette,
  Building2, ShoppingBag, Heart, GraduationCap, Home, Utensils,
} from 'lucide-react';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import './ServicePage.css';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './Digital360.css';

/* ── Constants ───────────────────────────────────────────── */
const COLOR    = '#00d4ff';
const GRADIENT = 'linear-gradient(135deg, #00d4ff 0%, #6c63ff 100%)';

/* ── Data ────────────────────────────────────────────────── */
const pillars = [
  {
    icon: Share2,
    title: 'Social Media Marketing',
    desc: 'Dynamic social media strategies that engage, inspire, and grow your audience based on your brand identity and business goals.',
    color: '#f59e0b',
    href: '/best-social-media-marketing-company-in-jaipur',
  },
  {
    icon: Search,
    title: 'Search Engine Optimisation',
    desc: 'Increase your online visibility and get to the top of search results with technical SEO, content strategy, and authority link building.',
    color: '#00d4aa',
    href: '/best-seo-company-in-jaipur',
  },
  {
    icon: BarChart2,
    title: 'Performance Marketing',
    desc: 'Data-driven performance marketing campaigns across Google, Meta and YouTube that maximise your ROI with full attribution.',
    color: '#a855f7',
    href: '/ppc-company-in-jaipur',
  },
  {
    icon: Video,
    title: 'Video Marketing',
    desc: 'Compelling video content — brand films, reels, and ad creatives — produced in our state-of-the-art studio to captivate your audience.',
    color: '#ff6b6b',
    href: '/services/video-production',
  },
  {
    icon: Mic2,
    title: 'Influencer Marketing',
    desc: 'Targeted influencer campaigns that connect you with authentic voices — from nano to mega creators — delivering real, measurable reach.',
    color: '#ec4899',
    href: '/services/influencer-marketing',
  },
  {
    icon: Monitor,
    title: 'Web & App Development',
    desc: 'Build incredible, high-performance websites and apps with the latest technologies — built to convert visitors into customers.',
    color: '#6c63ff',
    href: '/website-development-company-in-jaipur',
  },
  {
    icon: Palette,
    title: 'Content Marketing',
    desc: 'Strategic content creation that builds authority, drives organic traffic, and nurtures prospects through every stage of the funnel.',
    color: '#00d4ff',
    href: '/content-marketing-agency-in-jaipur',
  },
  {
    icon: Globe,
    title: 'Brand Marketing & Communication',
    desc: 'Comprehensive brand management — from outdoor advertising to automation — ensuring consistent presence across every touchpoint.',
    color: '#34d399',
    href: '/marketing-consultant-in-jaipur',
  },
];

const smartPoints = [
  { letter: 'S', word: 'Specific',    desc: 'Crystal-clear objectives aligned with your exact business category, audience, and competitive landscape in Jaipur.' },
  { letter: 'M', word: 'Measurable',  desc: 'Every campaign is tied to trackable KPIs — impressions, leads, CAC, ROAS — with unified real-time dashboards.' },
  { letter: 'A', word: 'Achievable',  desc: 'We set targets grounded in your market data, historical benchmarks, and realistic growth trajectories.' },
  { letter: 'R', word: 'Realistic',   desc: 'No vanity metrics. We focus on outcomes that move your revenue, not just your follower count.' },
  { letter: 'T', word: 'Timely',      desc: 'Structured 30-60-90 day sprints keep campaigns on pace with clear milestones and accountability at every step.' },
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
  {
    icon: Star,
    title: 'High ROI Focus',
    desc: 'Every rupee is tracked and optimised. We run ROI-obsessed campaigns that ensure your marketing spend always delivers measurable returns.',
  },
  {
    icon: Users,
    title: 'All Business Sizes',
    desc: 'From startups to enterprise — we design 360° strategies proportionate to your stage, budget, and goals. No one-size-fits-all packages.',
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
    desc: 'We build a unified SMART growth roadmap with clear channel priorities, budget allocations, KPIs, and a 90-day execution plan tailored to your business.',
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

const industries = [
  { icon: Heart,        name: 'Healthcare',        clients: 'Nav Imperial, CKS Hospital' },
  { icon: Building2,    name: 'Real Estate',        clients: 'KGK Realty, Manglam Group' },
  { icon: ShoppingBag,  name: 'Retail & D2C',       clients: 'Sanjay Textile, Kirana King' },
  { icon: Utensils,     name: 'Food & Hospitality', clients: 'Saras Dairy, Clarks Jaipur' },
  { icon: GraduationCap,name: 'Education',          clients: 'Multiple institutions' },
  { icon: Home,         name: 'Infrastructure',     clients: 'R-Tech Group, Shubhashish' },
];

const channels = [
  'Google Ads', 'Meta Ads', 'SEO', 'Content Marketing',
  'Instagram', 'YouTube', 'LinkedIn', 'Influencer Marketing',
  'Email Marketing', 'Video Production', 'Web Development', 'Analytics',
  'WhatsApp Marketing', 'Programmatic Display', 'CRO', 'Brand Strategy',
];

const results = [
  {
    metric: '99.9%',
    detail: 'Client retention ratio across all 360° retainers',
    client: 'The Cogent Portfolio',
    industry: 'Multi-Industry',
  },
  {
    metric: '15+',
    detail: 'Industries served with integrated 360° campaigns',
    client: 'Jaipur & Delhi Clients',
    industry: 'Diverse Sectors',
  },
  {
    metric: '60+',
    detail: 'Dedicated marketing professionals on every account',
    client: 'In-House Team',
    industry: 'Full-Stack Expertise',
  },
];

const faqs = [
  {
    q: 'What is included in 360° Marketing Solutions?',
    a: 'Our 360° solution covers Social Media Marketing, Search Engine Optimisation, Performance Marketing, Video Marketing, Influencer Partnerships, Web & App Development, Content Marketing, and complete Brand Communication — all managed by a single dedicated team under one unified strategy.',
  },
  {
    q: 'Is 360° marketing only for large businesses with big budgets?',
    a: 'Absolutely not. We work with all sizes of business — from startups to established enterprises. We design 360° strategies proportionate to your stage and budget, prioritising 2–3 high-impact channels and expanding as results compound. The key benefit — unified strategy and reporting — is valuable at any budget level.',
  },
  {
    q: 'How does your SMART strategy approach work?',
    a: 'We plan every campaign using the SMART framework — Specific, Measurable, Achievable, Realistic, and Timely. This means each goal has a clear definition, a trackable metric, a realistic target, and a defined timeline — ensuring accountability and focus at every stage of execution.',
  },
  {
    q: 'How do you ensure all channels work together rather than cannibalising each other?',
    a: 'We build a single attribution model that gives every channel credit for its role in the conversion journey. We use consistent messaging frameworks across all channels, coordinate campaign timing so channels amplify each other, and hold weekly cross-channel strategy sessions. You get one account manager who owns the full picture.',
  },
  {
    q: 'How long does it take to see results from a 360° approach?',
    a: 'Paid channels typically deliver measurable results within 2–4 weeks. SEO and content start showing movement in 3–4 months and compound significantly after 6 months. Social and influencer campaigns build momentum over 60–90 days. Most clients see meaningful aggregate growth within the first 90 days because while one channel is building, others are already converting.',
  },
  {
    q: 'Is a solid digital presence necessary for offline-successful businesses?',
    a: 'Yes — a solid digital presence is required to remain competitive and tap into a wider audience. Even businesses thriving offline in Jaipur benefit enormously from digital: it extends your reach beyond geography, builds brand trust through reviews and content, and creates 24/7 lead generation engines that work while you sleep.',
  },
];

/* ── Orbit Visual ────────────────────────────────────────── */
function OrbitVisual() {
  return (
    <div className="d360-orbit" aria-hidden="true">
      <div className="d360-orbit__hub">
        <span>360°</span>
      </div>
      <div className="d360-orbit__ring d360-orbit__ring--1" />
      <div className="d360-orbit__ring d360-orbit__ring--2" />
      <div className="d360-orbit__ring d360-orbit__ring--3" />
      {[
        { label: 'SEO',     angle: 0,   color: '#00d4aa' },
        { label: 'Paid',    angle: 60,  color: '#a855f7' },
        { label: 'Social',  angle: 120, color: '#f59e0b' },
        { label: 'Video',   angle: 180, color: '#ff6b6b' },
        { label: 'Web',     angle: 240, color: '#6c63ff' },
        { label: 'Creator', angle: 300, color: '#ec4899' },
      ].map(({ label, angle, color }) => {
        const rad = (angle * Math.PI) / 180;
        const r = 130;
        return (
          <div
            key={label}
            className="d360-orbit__node"
            style={{
              transform: `translate(calc(-50% + ${Math.cos(rad) * r}px), calc(-50% + ${Math.sin(rad) * r}px))`,
              '--node-color': color,
            } as React.CSSProperties}
          >
            <span className="d360-orbit__node-dot" style={{ background: color }} />
            <span className="d360-orbit__node-label">{label}</span>
          </div>
        );
      })}
      <div className="d360-orbit__glow" />
    </div>
  );
}

/* ── Funnel Visual ───────────────────────────────────────── */
function FunnelVisual() {
  const stages = [
    { label: 'Awareness',     width: '100%', color: '#00d4ff' },
    { label: 'Interest',      width: '80%',  color: '#6c63ff' },
    { label: 'Consideration', width: '60%',  color: '#a855f7' },
    { label: 'Intent',        width: '42%',  color: '#ec4899' },
    { label: 'Conversion',    width: '28%',  color: '#ff6b6b' },
  ];
  return (
    <div className="d360-funnel" aria-hidden="true">
      {stages.map(({ label, width, color }) => (
        <div key={label} className="d360-funnel__stage">
          <span className="d360-funnel__label">{label}</span>
          <div className="d360-funnel__bar-wrap">
            <div
              className="d360-funnel__bar"
              style={{ width, background: color, '--bar-w': width } as React.CSSProperties}
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

        /* Hero entrance */
        const heroTl = gsap.timeline({ delay: 0.2 });
        heroTl
          .fromTo('.d360-tag',     { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
          .fromTo('.d360-h1',      { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
          .fromTo('.d360-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
          .fromTo('.d360-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .fromTo('.d360-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          .fromTo('.d360-orbit',   { opacity: 0, scale: 0.7, rotation: -30 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8');

        gsap.fromTo('.d360-orbit__node',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, stagger: 0.12, duration: 0.5, ease: 'back.out(2)', delay: 1.0 }
        );

        /* Orbit rings continuous spin */
        gsap.to('.d360-orbit__ring--2', { rotation: 360,  duration: 28, repeat: -1, ease: 'none', transformOrigin: 'center center' });
        gsap.to('.d360-orbit__ring--3', { rotation: -360, duration: 40, repeat: -1, ease: 'none', transformOrigin: 'center center' });

        /* Stat counters */
        document.querySelectorAll<HTMLElement>('.d360-counter').forEach(el => {
          const target  = parseFloat(el.dataset.target || '0');
          const suffix  = el.dataset.suffix || '';
          const decimal = el.dataset.decimal === 'true';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2, delay: 1.4, ease: 'power2.out',
            onUpdate: () => {
              el.textContent = (decimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
            },
          });
        });

        /* What is 360 */
        gsap.fromTo('.d360-intro__text > *',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-intro', start: 'top 80%' } }
        );
        gsap.fromTo('.d360-funnel',
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-intro', start: 'top 80%' } }
        );
        gsap.fromTo('.d360-funnel__bar',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-funnel', start: 'top 85%' } }
        );

        /* 8 Pillars */
        gsap.fromTo('.d360-pillar-card',
          { opacity: 0, y: 50, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.09, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-pillars-grid', start: 'top 80%' } }
        );

        /* SMART Strategy */
        gsap.fromTo('.d360-smart__heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-smart-section', start: 'top 80%' } }
        );
        gsap.fromTo('.d360-smart-card',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-smart-list', start: 'top 82%' } }
        );

        /* Why 360 */
        gsap.fromTo('.d360-why-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-why-grid', start: 'top 80%' } }
        );

        /* Industries */
        gsap.fromTo('.d360-industry-card',
          { opacity: 0, scale: 0.88 },
          { opacity: 1, scale: 1, duration: 0.55, stagger: 0.09, ease: 'back.out(1.6)',
            scrollTrigger: { trigger: '.d360-industries-grid', start: 'top 82%' } }
        );

        /* Process */
        gsap.fromTo('.svc-process__step',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-process', start: 'top 80%' } }
        );
        gsap.fromTo('.svc-process__connector',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.5, stagger: 0.18, ease: 'power2.out',
            scrollTrigger: { trigger: '.d360-process', start: 'top 80%' } }
        );

        /* Channel pills */
        gsap.fromTo('.d360-channel-pill',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: 'back.out(1.8)',
            scrollTrigger: { trigger: '.d360-channels', start: 'top 80%' } }
        );

        /* Checkpoints */
        gsap.fromTo('.d360-checkpoint',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-checkpoints', start: 'top 80%' } }
        );

        /* Results */
        gsap.fromTo('.svc-result-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-results', start: 'top 80%' } }
        );

        /* Internal links hub */
        gsap.fromTo('.d360-link-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-links-grid', start: 'top 82%' } }
        );

        /* FAQ */
        gsap.fromTo('.svc-faq-item',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.svc-faq', start: 'top 80%' } }
        );

        /* CTA */
        gsap.fromTo('.d360-cta-inner > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.d360-cta-section', start: 'top 80%' } }
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

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section id="360-digital-marketing" className="svc-hero d360-hero" aria-labelledby="d360-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#6c63ff' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#a855f7' }} />
        <div className="d360-hero__scanline" aria-hidden="true" />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag d360-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Best Digital Marketing Company in Jaipur
              </span>
              <h1 id="d360-h1-el" className="svc-hero__h1 d360-h1">
                Every Channel.<br />
                One Strategy.<br />
                <span className="text-gradient">Speedy Business Growth.</span>
              </h1>
              <p className="svc-hero__sub d360-sub">
                The most powerful brands don't pick one channel — they dominate all of them.
                Cogent's 360° Digital Marketing service unifies SEO, paid media, social, content,
                influencer, and web into a single compounding growth engine. Guaranteed results.
                ROI focused. 24/7 support.
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
                  <span className="svc-stat-card__num d360-counter" data-target="8" data-suffix="+">8+</span>
                  <span className="svc-stat-card__label">Services Under One Roof</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num d360-counter" data-target="60" data-suffix="+">60+</span>
                  <span className="svc-stat-card__label">Marketing Professionals</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num" style={{ color: COLOR }}>99.9%</span>
                  <span className="svc-stat-card__label">Client Retention</span>
                </div>
              </div>
            </div>
            <div className="svc-hero__visual" aria-hidden="true">
              <OrbitVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHAT IS 360° ══════════════════════════════════════ */}
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
                  '100% result oriented with customised solutions',
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

      {/* ══ 8 PILLARS ═════════════════════════════════════════ */}
      <section id="360-marketing-services" className="svc-section svc-section--alt" aria-labelledby="d360-pillars-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">360° Marketing Solutions</span>
            <h2 id="d360-pillars-h2">Every Channel, <span className="text-gradient">Mastered</span></h2>
            <p>Eight integrated disciplines — each elite on its own, unstoppable together.</p>
          </div>
          <div className="d360-pillars-grid d360-pillars-grid--8">
            {pillars.map(({ icon: Icon, title, desc, color, href }) => (
              <Link
                key={title}
                to={href}
                className="d360-pillar-card"
                style={{ '--pillar-color': color } as React.CSSProperties}
              >
                <div className="d360-pillar-card__top">
                  <div className="d360-pillar-card__icon" style={{ color }}>
                    <Icon size={22} />
                  </div>
                  <div className="d360-pillar-card__num-glow" style={{ background: color }} />
                </div>
                <h3 className="d360-pillar-card__title">{title}</h3>
                <p className="d360-pillar-card__desc">{desc}</p>
                <div className="d360-pillar-card__line" style={{ background: color }} />
                <span className="d360-pillar-card__arrow">
                  Learn more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SMART STRATEGY ════════════════════════════════════ */}
      <section id="smart-strategy" className="svc-section d360-smart-section" aria-labelledby="d360-smart-h2">
        <div className="container">
          <div className="svc-section__header d360-smart__heading">
            <span className="tag">Our Philosophy</span>
            <h2 id="d360-smart-h2">We Work on a <span className="text-gradient">SMART Strategy</span></h2>
            <p>Every goal we set is Specific, Measurable, Achievable, Realistic and Timely — because guesswork isn't a growth strategy.</p>
          </div>
          <div className="d360-smart-list">
            {smartPoints.map(({ letter, word, desc }) => (
              <div key={letter} className="d360-smart-card">
                <div className="d360-smart-card__letter">{letter}</div>
                <div className="d360-smart-card__body">
                  <h3 className="d360-smart-card__word">{word}</h3>
                  <p className="d360-smart-card__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY 360° ══════════════════════════════════════════ */}
      <section id="why-360-marketing" className="svc-section svc-section--alt" aria-labelledby="d360-why-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">The Advantage</span>
            <h2 id="d360-why-h2">Why Choose <span className="text-gradient">The Cogent?</span></h2>
            <p>We build on pillars of efficiency, automation, structure, high ROI, branding, and expertise — so your business grows on every front simultaneously.</p>
          </div>
          <div className="d360-why-grid">
            {whyPoints.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="d360-why-card">
                <div className="d360-why-card__icon">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="d360-why-card__title">{title}</h3>
                  <p className="d360-why-card__desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INDUSTRIES ════════════════════════════════════════ */}
      <section id="industries-we-serve" className="svc-section d360-industries-section" aria-labelledby="d360-industries-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">15+ Industries</span>
            <h2 id="d360-industries-h2">Brands That <span className="text-gradient">Trust Us</span></h2>
            <p>From healthcare to hospitality — we've driven 360° growth for businesses across Jaipur, Delhi, and beyond.</p>
          </div>
          <div className="d360-industries-grid">
            {industries.map(({ icon: Icon, name, clients }) => (
              <div key={name} className="d360-industry-card">
                <div className="d360-industry-card__icon">
                  <Icon size={24} />
                </div>
                <h4 className="d360-industry-card__name">{name}</h4>
                <p className="d360-industry-card__clients">{clients}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═══════════════════════════════════════════ */}
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

      {/* ══ CHANNELS CLOUD ════════════════════════════════════ */}
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

      {/* ══ WHAT'S INCLUDED ═══════════════════════════════════ */}
      <section id="360-whats-included" className="svc-section" aria-labelledby="d360-included-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What You Get</span>
            <h2 id="d360-included-h2">Everything Included, <span className="text-gradient">Nothing Hidden</span></h2>
            <p>One monthly engagement. Every service you need to dominate your category.</p>
          </div>
          <div className="d360-checkpoints">
            {[
              { icon: Globe,       label: 'Dedicated Account Strategist',  desc: 'One senior point of contact who owns your entire growth roadmap.' },
              { icon: BarChart2,   label: 'Unified Reporting Dashboard',    desc: 'Real-time visibility across all channels in a single dashboard.' },
              { icon: Zap,         label: 'Monthly Strategy Sessions',      desc: 'Deep-dive reviews with your full cross-channel team every month.' },
              { icon: Target,      label: 'Cross-Channel Campaign Planning',desc: 'Coordinated calendar so every campaign amplifies every other.' },
              { icon: TrendingUp,  label: 'Quarterly Growth Reviews',       desc: 'Comprehensive analysis of channel mix, budget allocation, and KPIs.' },
              { icon: Star,        label: 'Priority Creative Production',   desc: 'Fast-track access to our studio for content, video, and ad creatives.' },
              { icon: Users,       label: 'Influencer & Creator Network',   desc: '2,000+ vetted creators available for every campaign requirement.' },
              { icon: RefreshCw,   label: 'Continuous Optimisation',        desc: 'Weekly channel reviews with real-time bid and creative updates.' },
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

      {/* ══ RESULTS ═══════════════════════════════════════════ */}
      <section id="360-marketing-results" className="svc-section svc-section--alt d360-results" aria-labelledby="d360-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="d360-results-h2">What 360° Looks Like in Practice</h2>
            <p>Numbers from real brands who trusted us with the full picture.</p>
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

      {/* ══ INTERNAL LINKS HUB ════════════════════════════════ */}
      <section id="explore-our-services" className="svc-section d360-links-section" aria-labelledby="d360-links-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Explore Our Services</span>
            <h2 id="d360-links-h2">Dive Deeper Into <span className="text-gradient">Each Discipline</span></h2>
            <p>Every service in our 360° stack has a dedicated specialist team. Explore what goes into each channel.</p>
          </div>
          <div className="d360-links-grid">
            {[
              { label: 'SEO Services',               href: '/best-seo-company-in-jaipur',                          color: '#00d4aa', icon: Search },
              { label: 'Social Media Marketing',     href: '/best-social-media-marketing-company-in-jaipur',       color: '#f59e0b', icon: Share2 },
              { label: 'Performance Marketing',      href: '/ppc-company-in-jaipur',                               color: '#a855f7', icon: BarChart2 },
              { label: 'Video Production',           href: '/services/video-production',                           color: '#ff6b6b', icon: Video },
              { label: 'Influencer Marketing',       href: '/services/influencer-marketing',                       color: '#ec4899', icon: Mic2 },
              { label: 'Web Development',            href: '/website-development-company-in-jaipur',               color: '#6c63ff', icon: Monitor },
              { label: 'Content Marketing',          href: '/content-marketing-agency-in-jaipur',                  color: '#00d4ff', icon: Palette },
              { label: 'Marketing Consultant',       href: '/marketing-consultant-in-jaipur',                      color: '#34d399', icon: Globe },
            ].map(({ label, href, color, icon: Icon }) => (
              <Link
                key={label}
                to={href}
                className="d360-link-card"
                style={{ '--link-color': color } as React.CSSProperties}
              >
                <div className="d360-link-card__icon" style={{ color }}>
                  <Icon size={20} />
                </div>
                <span className="d360-link-card__label">{label}</span>
                <ArrowRight size={14} className="d360-link-card__arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section id="360-marketing-faq" className="svc-section svc-section--alt" aria-labelledby="d360-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="d360-faq-h2">360° Marketing — Your Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════ */}
      <section id="360-marketing-cta" className="svc-section d360-cta-section" aria-labelledby="d360-cta-h2">
        <div className="d360-cta-glow" aria-hidden="true" />
        <div className="container d360-cta-inner">
          <span className="tag">Get Started</span>
          <h2 id="d360-cta-h2" className="svc-cta__title">
            Let's Make Your Business<br />
            <span className="text-gradient">A Brand With Digital Solutions!</span>
          </h2>
          <p className="svc-cta__sub">
            Get a free 360° audit of your current digital presence. We'll map every gap,
            every opportunity, and every channel you should be owning — then show you exactly
            how we'd build your growth engine. 24/7 support. Guaranteed results.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry} className="btn btn-primary">
              Get Your Free 360° Audit <ArrowRight size={16} />
            </button>
            <a href="tel:+919785957575" className="btn btn-outline">
              Call Now
            </a>
          </div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}

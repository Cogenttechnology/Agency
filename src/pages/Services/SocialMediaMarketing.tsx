import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  PenTool,
  MessageCircle,
  DollarSign,
  Users,
  ShoppingBag,
  BarChart2,
  Globe,
  Heart,
  TrendingUp,
  ArrowRight,
  Plus,
} from 'lucide-react';
import SocialShowcase from '../../components/SocialShowcase/SocialShowcase';
import './ServicePage.css';

/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#f59e0b';
const GRADIENT = 'linear-gradient(135deg, #f59e0b, #d97706)';

const smmServices = [
  {
    icon: PenTool,
    title: 'Content Strategy',
    desc: 'Platform-specific content strategies, creative direction, and editorial calendars that keep your brand consistently visible.',
  },
  {
    icon: MessageCircle,
    title: 'Community Management',
    desc: 'Daily community engagement, comment moderation, DM handling, and brand voice maintenance across all platforms.',
  },
  {
    icon: DollarSign,
    title: 'Paid Social',
    desc: 'ROI-focused paid social campaigns across Meta, LinkedIn, TikTok, and YouTube — built to scale what works.',
  },
  {
    icon: Users,
    title: 'Influencer Coordination',
    desc: 'End-to-end influencer partnerships from sourcing and briefing to content review and performance tracking.',
  },
  {
    icon: ShoppingBag,
    title: 'Social Commerce',
    desc: 'Instagram Shop, Facebook Marketplace, and TikTok Shop setup and management to drive in-app purchases.',
  },
  {
    icon: BarChart2,
    title: 'Analytics & Reporting',
    desc: 'Deep-dive social analytics with custom dashboards, audience insights, and content performance breakdowns.',
  },
];

const platforms = [
  { name: 'Instagram',  color: '#e1306c' },
  { name: 'Facebook',   color: '#1877f2' },
  { name: 'LinkedIn',   color: '#0a66c2' },
  { name: 'X / Twitter', color: '#1da1f2' },
  { name: 'YouTube',    color: '#ff0000' },
  { name: 'Pinterest',  color: '#bd081c' },
  { name: 'Snapchat',   color: '#fffc00' },
  { name: 'TikTok',     color: '#69c9d0' },
];

const steps = [
  {
    num: '01',
    title: 'Brand Audit',
    desc: "We analyse your current social presence, audience, competitors, and content gaps.",
  },
  {
    num: '02',
    title: 'Content Pillars',
    desc: 'Define 4–6 strategic content pillars aligned to your brand voice and audience interests.',
  },
  {
    num: '03',
    title: 'Content Calendar',
    desc: 'Build a 30-day rolling calendar with platform-specific formats, hooks, and posting schedules.',
  },
  {
    num: '04',
    title: 'Publish & Optimise',
    desc: 'Publish, monitor performance, and continuously iterate based on engagement and reach data.',
  },
];

const contentTypes = [
  'Reels',
  'Carousels',
  'Stories',
  'Static Posts',
  'UGC Campaigns',
  'Live Sessions',
  'Polls & Q&A',
  'Short-Form Video',
  'Infographics',
  'Memes & Trends',
];

const bigStats = [
  {
    icon: Globe,
    num: '4.9B',
    label: 'Social media users globally',
    desc: 'Over 60% of the world population is on social — your audience is already there waiting.',
  },
  {
    icon: TrendingUp,
    num: '2h 27m',
    label: 'Average daily social usage',
    desc: "That's nearly 2.5 hours every single day that your audience spends scrolling and engaging.",
  },
  {
    icon: Heart,
    num: '54%',
    label: 'Discover brands on social',
    desc: 'Over half of all consumers first discover new brands through social media feeds and ads.',
  },
];

const results = [
  {
    metric: '2.8M',
    detail: 'Organic reach in a single campaign month',
    client: 'UrbanEats Delivery',
    industry: 'Food & Beverage',
  },
  {
    metric: '6.4%',
    detail: 'Engagement rate (industry avg: 1.2%)',
    client: 'GlowUp Cosmetics',
    industry: 'D2C / Beauty',
  },
  {
    metric: '180%',
    detail: 'Follower growth in 90 days',
    client: 'TechSpark Startup',
    industry: 'B2B / SaaS',
  },
];

const faqs = [
  {
    q: 'How many posts per week do you create for social media?',
    a: "Our content plans typically range from 3–7 posts per week per platform, depending on your package and goals. We prioritise quality over quantity — every post is strategically crafted with a clear objective, whether that's engagement, reach, or conversion.",
  },
  {
    q: 'Do you manage comments and DMs as part of the service?',
    a: "Yes. Community management is included in our full-service social media packages. We respond to comments, handle DMs, manage reviews, and maintain your brand voice in every interaction — typically within a 2–4 hour response window during business hours.",
  },
  {
    q: 'Which social media platforms should my business be on?',
    a: "The right platforms depend on where your target audience spends time and what type of content works for your business. We recommend starting with 2–3 platforms and doing them exceptionally well rather than spreading thin across all of them. Our audit will identify the highest-opportunity platforms for you.",
  },
  {
    q: 'How do you measure social media success?',
    a: "Beyond vanity metrics like follower count, we track meaningful KPIs: reach, engagement rate, click-through rate, website traffic from social, leads generated, and social commerce conversions. You receive a detailed monthly report with commentary and next-month priorities.",
  },
  {
    q: 'Do you create the content or does our team need to provide it?',
    a: "We handle the full content creation process — ideation, copywriting, design, and video editing. All we ask for is a monthly brand briefing call and approvals. You stay in control of your brand while we handle the execution.",
  },
];

/* ── Social Feed Mockup Visual ───────────────────────────── */
function SocialFeedVisual() {
  const feedCards = [
    { name: 'BrandXYZ', handle: '@brandxyz', text: 'New collection just dropped! ✨ Shop the look now.', imgColor: '#f59e0b' },
    { name: 'UrbanEats', handle: '@urbaneats', text: "Tonight's special: 30% off all orders after 8PM 🍕", imgColor: '#d97706' },
    { name: 'GlowUp', handle: '@glowupco', text: 'Skincare routine that actually works — thread 🧵', imgColor: '#f59e0b' },
    { name: 'TechSpark', handle: '@techspark', text: 'We just crossed 10K followers! Thank you all 🚀', imgColor: '#b45309' },
  ];

  return (
    <div style={{ width: '100%', height: '340px', overflow: 'hidden', borderRadius: 'var(--radius-md)' }} aria-hidden="true">
      <div className="svc-social-feed">
        {[...feedCards, ...feedCards].map((card, i) => (
          <div key={i} className="svc-feed-card">
            <div
              className="svc-feed-card__avatar"
              style={{
                background: `linear-gradient(135deg, ${card.imgColor}, #b45309)`,
                opacity: 0.8,
              }}
            />
            <div className="svc-feed-card__content">
              <span className="svc-feed-card__name">{card.name}</span>
              <span className="svc-feed-card__text">{card.handle}</span>
              <p className="svc-feed-card__text" style={{ marginTop: '0.25rem' }}>{card.text}</p>
              <div
                className="svc-feed-card__img"
                style={{
                  background: `linear-gradient(135deg, ${card.imgColor}44, ${card.imgColor}22)`,
                  border: `1px solid ${card.imgColor}33`,
                  width: '100%',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
export default function SocialMediaMarketing() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero
        gsap.fromTo('.smm-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.smm-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
        gsap.fromTo('.smm-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7,  ease: 'power3.out' });
        gsap.fromTo('.smm-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.smm-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.smm-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        // Big stats
        gsap.fromTo(
          '.smm-numbers .svc-stat-callout',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.smm-numbers', start: 'top 80%' },
          }
        );

        // Services
        gsap.fromTo(
          '.smm-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.smm-services-grid', start: 'top 80%' },
          }
        );

        // Platform pills
        gsap.fromTo(
          '.smm-platforms .svc-platform-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.smm-platforms', start: 'top 80%' },
          }
        );

        // Process
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.smm-process', start: 'top 80%' },
          }
        );

        // Content type pills
        gsap.fromTo(
          '.smm-content-types .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.smm-content-types', start: 'top 80%' },
          }
        );

        // Results
        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.smm-results', start: 'top 80%' },
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
      <section id="social-media-marketing-hero" className="svc-hero" aria-labelledby="smm-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#d97706' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#b45309' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag smm-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Social Media Marketing
              </span>
              <h1 id="smm-h1-el" className="svc-hero__h1 smm-h1">
                Build a Brand That{' '}
                <span className="text-gradient">Owns Social</span>
              </h1>
              <p className="svc-hero__sub smm-sub">
                We create social media presences that generate reach, build community,
                and convert followers into loyal customers — consistently, at scale.
              </p>
              <div className="svc-hero__actions smm-actions">
                <button onClick={openEnquiry}  className="btn btn-primary">
                  Get a Social Strategy <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry}  className="btn btn-outline">
                  See Our Work
                </button>
              </div>
              <div className="svc-hero__stats smm-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">10M+</span>
                  <span className="svc-stat-card__label">Reach Generated</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">500+</span>
                  <span className="svc-stat-card__label">Campaigns Executed</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">4.2%</span>
                  <span className="svc-stat-card__label">Avg Engagement Rate</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual smm-visual" aria-hidden="true">
              <SocialFeedVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social by the Numbers ─────────────────────────── */}
      <section id="social-media-statistics" className="svc-section smm-numbers" aria-labelledby="smm-numbers-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">The Opportunity</span>
            <h2 id="smm-numbers-h2">Social Media by the Numbers</h2>
            <p>The scale of social media presents an unmatched opportunity for brands to reach and convert audiences.</p>
          </div>
          <div className="svc-stat-callouts">
            {bigStats.map(({ icon: Icon, num, label, desc }) => (
              <div key={label} className="svc-stat-callout">
                <div className="svc-stat-callout__icon">
                  <Icon size={24} />
                </div>
                <div className="svc-stat-callout__num">{num}</div>
                <div className="svc-stat-callout__label">{label}</div>
                <p className="svc-stat-callout__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section id="social-media-services" className="svc-section svc-section--alt" aria-labelledby="smm-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Offer</span>
            <h2 id="smm-services-h2">Social Media Services</h2>
            <p>
              A full-service social media offering — strategy, content, community, paid, and
              analytics under one roof.
            </p>
          </div>
          <div className="svc-grid-6 smm-services-grid">
            {smmServices.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Platforms ─────────────────────────────────────── */}
      <section id="social-media-platforms" className="svc-section svc-section--dark smm-platforms" aria-labelledby="smm-platforms-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Where We Work</span>
            <h2 id="smm-platforms-h2">Platforms We Manage</h2>
            <p>From Instagram to TikTok — we manage your presence everywhere your audience is scrolling.</p>
          </div>
          <div className="svc-platform-grid">
            {platforms.map(({ name, color }) => (
              <div key={name} className="svc-platform-pill">
                <div className="svc-platform-pill__dot" style={{ background: color }} />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategy Process ──────────────────────────────── */}
      <section id="social-media-strategy-process" className="svc-section" aria-labelledby="smm-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Approach</span>
            <h2 id="smm-process-h2">Our Social Strategy Process</h2>
            <p>A repeatable 4-step cycle that transforms brands into social-first powerhouses.</p>
          </div>
          <div className="svc-process smm-process">
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

      {/* ── Content Types ─────────────────────────────────── */}
      <section id="social-content-types" className="svc-section svc-section--alt smm-content-types" aria-labelledby="smm-content-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Content Formats</span>
            <h2 id="smm-content-h2">Content Types We Create</h2>
            <p>Every format the algorithm loves — built for reach, engagement, and conversion.</p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {contentTypes.map((t) => (
              <span key={t} className="svc-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="social-media-results" className="svc-section smm-results" aria-labelledby="smm-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Case Studies</span>
            <h2 id="smm-results-h2">Social Success Stories</h2>
            <p>Real growth numbers from brands we've helped dominate their social channels.</p>
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
      <section id="social-media-faq" className="svc-section svc-section--dark" aria-labelledby="smm-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="smm-faq-h2">Social Media Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Showcase ──────────────────────────────── */}
      <SocialShowcase />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="social-media-cta" className="svc-section svc-cta svc-cta--smm" aria-labelledby="smm-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Let's Go</span>
          <h2 id="smm-cta-h2" className="svc-cta__title">
            Dominate <span className="text-gradient">Your Feed</span>
          </h2>
          <p className="svc-cta__sub">
            Let's build a social media presence that your competitors will study and
            your customers will follow.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry}  className="btn btn-primary">
              Start Your Social Strategy <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry}  className="btn btn-outline">
              View Social Packages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

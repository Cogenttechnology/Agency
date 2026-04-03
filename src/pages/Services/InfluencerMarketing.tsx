import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Search,
  Map,
  FileCheck,
  Gift,
  TrendingUp,
  BarChart2,
  Shield,
  Target,
  Layers,
  ArrowRight,
  Plus,
} from 'lucide-react';
import WorkShowcase from '../../components/WorkShowcase/WorkShowcase';
import type { WorkItem } from '../../components/WorkShowcase/WorkShowcase';
import './ServicePage.css';

const workItems: WorkItem[] = [
  {
    title: 'Novo Retail — Creator Launch',
    category: 'Influencer Campaign',
    result: '2.4M reach, 8.1% engagement',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    tags: ['Micro Influencers', 'Fashion', 'Instagram', 'UGC'],
  },
  {
    title: 'NovaSkin — Beauty Seeding',
    category: 'Product Seeding',
    result: '500+ creator posts generated',
    gradient: 'linear-gradient(135deg, #be185d 0%, #7c3aed 100%)',
    tags: ['Beauty', 'Nano Creators', 'Gifting', 'TikTok'],
  },
  {
    title: 'FitLife — Macro Campaign',
    category: 'Macro Influencer',
    result: '₹3.2Cr in attributed app installs',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
    tags: ['Health', 'YouTube', 'Macro', 'Paid Amplification'],
  },
];

/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#ec4899';
const GRADIENT = 'linear-gradient(135deg, #ec4899, #be185d)';

const tiers = [
  {
    range: '1K – 10K followers',
    name: 'Nano',
    benefits: [
      'Highest engagement rates (5–8%)',
      'Ultra-niche, loyal communities',
      'Cost-effective for local campaigns',
      'Authentic, relatable content',
    ],
  },
  {
    range: '10K – 100K followers',
    name: 'Micro',
    benefits: [
      'Strong niche authority (3–5% ER)',
      'Category-specific credibility',
      'Best reach-to-cost ratio',
      'High content quality standards',
    ],
  },
  {
    range: '100K – 1M followers',
    name: 'Macro',
    benefits: [
      'Mass reach with niche alignment',
      'Professional content production',
      'Strong brand association value',
      'Multi-platform presence',
    ],
  },
  {
    range: '1M+ followers',
    name: 'Mega',
    benefits: [
      'National / global brand visibility',
      'Celebrity-level association',
      'Maximum campaign awareness',
      'Cross-media amplification',
    ],
  },
];

const imServices = [
  {
    icon: Search,
    title: 'Creator Discovery',
    desc: 'AI-powered creator identification across Instagram, YouTube, TikTok, and X — filtered by niche, audience, and engagement authenticity.',
  },
  {
    icon: Map,
    title: 'Campaign Strategy',
    desc: 'End-to-end campaign strategy including influencer mix, messaging framework, timeline, and KPI setting.',
  },
  {
    icon: FileCheck,
    title: 'Content Brief & Review',
    desc: 'Detailed creative briefs, content review cycles, and brand compliance checks before any post goes live.',
  },
  {
    icon: Gift,
    title: 'Gifting & Seeding',
    desc: 'Product gifting programmes and seeding campaigns managed from dispatch to content tracking and reporting.',
  },
  {
    icon: TrendingUp,
    title: 'Paid Amplification',
    desc: 'Boost top-performing influencer content via paid media (Spark Ads, Branded Content) for extended reach.',
  },
  {
    icon: BarChart2,
    title: 'ROI Tracking',
    desc: 'Comprehensive campaign reporting with EMV, CPE, reach, conversions, and creator performance scorecards.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Brief',
    desc: "We define goals, target audience, key messages, campaign deliverables, and success metrics.",
  },
  {
    num: '02',
    title: 'Source',
    desc: 'Identify, vet, and onboard the right creators using audience analytics and fake follower detection.',
  },
  {
    num: '03',
    title: 'Execute',
    desc: 'Manage briefing, content review, approvals, scheduling, and posting across all creators.',
  },
  {
    num: '04',
    title: 'Measure',
    desc: 'Track performance in real time and deliver a comprehensive post-campaign ROI report.',
  },
];

const industries = [
  'Fashion & Apparel',
  'Beauty & Skincare',
  'Tech & Gadgets',
  'Food & Beverage',
  'Health & Wellness',
  'Finance & FinTech',
  'Travel & Hospitality',
  'Gaming & Esports',
  'Home & Lifestyle',
  'Education & EdTech',
];

const reasons = [
  {
    icon: Shield,
    title: 'Trust & Authenticity',
    desc: '92% of consumers trust recommendations from individuals over brand messaging. Influencers deliver your message through a trusted voice.',
  },
  {
    icon: Target,
    title: 'Hyper-targeted Reach',
    desc: 'Creators have pre-built, highly specific audiences. You reach exactly the right people — not just a broad demographic.',
  },
  {
    icon: Layers,
    title: 'Content at Scale',
    desc: 'One campaign generates dozens of pieces of authentic, platform-native content that your brand can repurpose across channels.',
  },
];

const results = [
  {
    metric: '8.2%',
    detail: 'Average engagement rate across 200+ creator campaigns',
    client: 'GlowUp Skincare',
    industry: 'D2C / Beauty',
  },
  {
    metric: '12M',
    detail: 'Total reach from a 3-month macro campaign',
    client: 'NovaByte Gaming',
    industry: 'Gaming / Tech',
  },
  {
    metric: '₹6Cr',
    detail: 'Revenue driven via influencer affiliate links',
    client: 'StyleNation',
    industry: 'Fashion / D2C',
  },
];

const faqs = [
  {
    q: 'How do you ensure the influencers you select are authentic and have genuine followers?',
    a: "We use a combination of platform analytics and third-party tools to audit every creator's audience quality. We check for fake follower percentages, audience demographics, historical engagement authenticity, and content consistency. Only creators who pass our quality threshold are recommended to clients.",
  },
  {
    q: "What's the difference between nano, micro, macro, and mega influencers?",
    a: "Each tier offers a different balance of reach, engagement, and cost. Nano and micro influencers typically deliver higher engagement rates and stronger niche authority at lower costs. Macro and mega influencers provide mass reach and brand prestige. The right mix depends on your campaign goals and budget.",
  },
  {
    q: 'Do you handle all communication and negotiations with influencers?',
    a: "Yes. We manage the full creator relationship — from initial outreach and rate negotiation to contracting, briefing, content review, and payment processing. You don't need to manage any creator communication directly unless you choose to.",
  },
  {
    q: 'How do you track conversions and ROI from influencer campaigns?',
    a: "We set up unique tracking links, discount codes, and UTM parameters for each creator. Combined with platform insights and post-campaign reporting, we measure reach, impressions, engagement, link clicks, conversions, revenue attributed, and earned media value (EMV).",
  },
  {
    q: 'Can influencer content be repurposed for our paid ads?',
    a: "Absolutely — and we recommend it. We secure usage rights as part of every creator contract so you can boost top-performing content through Meta Spark Ads, TikTok Branded Content Ads, and YouTube. Repurposed creator content typically outperforms brand-produced ads significantly.",
  },
];

/* ── Influencer Card Stack Visual ────────────────────────── */
function InfluencerStackVisual() {
  const creators = [
    { name: 'Priya S.',   handle: '@priyastyles',    followers: '48.2K', er: '6.8% ER', color: '#ec4899' },
    { name: 'Arjun K.',   handle: '@arjunfitlife',   followers: '12.1K', er: '7.4% ER', color: '#be185d' },
    { name: 'Meera T.',   handle: '@meeracooks',     followers: '280K',  er: '4.2% ER', color: '#f472b6' },
  ];

  return (
    <div className="svc-card-stack" aria-hidden="true">
      {creators.map((c, i) => (
        <div key={i} className="svc-stack-card">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div
              className="svc-stack-card__avatar"
              style={{ background: `linear-gradient(135deg, ${c.color}, #7c0a2a)` }}
            />
            <div>
              <p className="svc-stack-card__name">{c.name}</p>
              <p className="svc-stack-card__handle">{c.handle}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div>
              <p className="svc-stack-card__followers" style={{ color: c.color }}>{c.followers}</p>
              <p className="svc-stack-card__engagement">Followers</p>
            </div>
            <div>
              <p className="svc-stack-card__followers" style={{ color: c.color }}>{c.er}</p>
              <p className="svc-stack-card__engagement">Engagement</p>
            </div>
          </div>
          <div style={{ height: '4px', borderRadius: '2px', background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
        </div>
      ))}
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
export default function InfluencerMarketing() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero
        gsap.fromTo('.im-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.im-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
        gsap.fromTo('.im-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7,  ease: 'power3.out' });
        gsap.fromTo('.im-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.im-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.im-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        // Reasons
        gsap.fromTo(
          '.im-reasons .svc-reason',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.im-reasons', start: 'top 80%' },
          }
        );

        // Tiers
        gsap.fromTo(
          '.im-tiers .svc-tier-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.im-tiers', start: 'top 80%' },
          }
        );

        // Services
        gsap.fromTo(
          '.im-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.im-services-grid', start: 'top 80%' },
          }
        );

        // Process
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.im-process', start: 'top 80%' },
          }
        );

        // Industries
        gsap.fromTo(
          '.im-industries .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.45, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.im-industries', start: 'top 80%' },
          }
        );

        // Results
        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.im-results', start: 'top 80%' },
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
      <section id="influencer-marketing-hero" className="svc-hero" aria-labelledby="im-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#be185d' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#f472b6' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag im-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Influencer Marketing
              </span>
              <h1 id="im-h1-el" className="svc-hero__h1 im-h1">
                Authentic Reach.{' '}
                <span className="text-gradient">Real Conversions.</span>
              </h1>
              <p className="svc-hero__sub im-sub">
                We connect brands with the right creators — building campaigns that
                generate genuine trust, targeted reach, and measurable return on
                investment.
              </p>
              <div className="svc-hero__actions im-actions">
                <button onClick={openEnquiry}  className="btn btn-primary">
                  Launch a Creator Campaign <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry}  className="btn btn-outline">
                  Explore Our Network
                </button>
              </div>
              <div className="svc-hero__stats im-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">2000+</span>
                  <span className="svc-stat-card__label">Vetted Creators</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">500M+</span>
                  <span className="svc-stat-card__label">Total Reach</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">8%</span>
                  <span className="svc-stat-card__label">Avg Engagement Rate</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual im-visual" aria-hidden="true">
              <InfluencerStackVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Influencer Marketing Works ────────────────── */}
      <section id="why-influencer-marketing" className="svc-section" aria-labelledby="im-why-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">The Case for Creators</span>
            <h2 id="im-why-h2">Why Influencer Marketing Works</h2>
            <p>
              In an era of ad fatigue, creator partnerships deliver messages that audiences
              actually want to receive.
            </p>
          </div>
          <div className="svc-reasons im-reasons">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="svc-reason">
                <div className="svc-reason__icon">
                  <Icon size={24} />
                </div>
                <h3 className="svc-reason__title">{title}</h3>
                <p className="svc-reason__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tiers ─────────────────────────────────────────── */}
      <section id="influencer-tiers" className="svc-section svc-section--alt" aria-labelledby="im-tiers-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Creator Tiers</span>
            <h2 id="im-tiers-h2">The Right Creator for Every Goal</h2>
            <p>
              We work across all influencer tiers — matching the right creator type to your
              campaign objectives and budget.
            </p>
          </div>
          <div className="svc-grid-4 im-tiers">
            {tiers.map((tier) => (
              <div key={tier.name} className="svc-tier-card">
                <span className="svc-tier-card__range">{tier.range}</span>
                <h3 className="svc-tier-card__name">{tier.name}</h3>
                <ul className="svc-tier-card__benefits">
                  {tier.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────── */}
      <section id="influencer-marketing-services" className="svc-section" aria-labelledby="im-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="im-services-h2">Influencer Marketing Services</h2>
            <p>
              Full-service influencer management — from creator discovery to campaign
              reporting and content amplification.
            </p>
          </div>
          <div className="svc-grid-6 im-services-grid">
            {imServices.map(({ icon: Icon, title, desc }) => (
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
      <section id="influencer-campaign-process" className="svc-section svc-section--dark" aria-labelledby="im-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How We Execute</span>
            <h2 id="im-process-h2">Our Influencer Campaign Process</h2>
            <p>A tight 4-step framework that takes every campaign from brief to results with precision.</p>
          </div>
          <div className="svc-process im-process">
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

      {/* ── Industries ────────────────────────────────────── */}
      <section id="influencer-marketing-industries" className="svc-section im-industries" aria-labelledby="im-industries-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Industries We Serve</span>
            <h2 id="im-industries-h2">We've Delivered Across Every Category</h2>
            <p>
              Our creator network spans every major industry — ensuring relevant, authentic
              partnerships for any brand.
            </p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {industries.map((ind) => (
              <span key={ind} className="svc-pill">{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="influencer-marketing-results" className="svc-section svc-section--alt im-results" aria-labelledby="im-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="im-results-h2">Creator Campaigns That Converted</h2>
            <p>Real campaign results — measured in reach, engagement, and revenue.</p>
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
      <section id="influencer-marketing-faq" className="svc-section" aria-labelledby="im-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="im-faq-h2">Influencer Marketing Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Showcase ────────────────────────────────── */}
      <WorkShowcase color={COLOR} items={workItems} />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="influencer-marketing-cta" className="svc-section svc-cta svc-cta--im" aria-labelledby="im-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="im-cta-h2" className="svc-cta__title">
            Build Your{' '}
            <span className="text-gradient">Creator Army</span>
          </h2>
          <p className="svc-cta__sub">
            Let's identify the perfect creators for your brand and build a campaign that
            turns audiences into customers at scale.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry}  className="btn btn-primary">
              Start Your Campaign <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry}  className="btn btn-outline">
              Meet Our Creator Network
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

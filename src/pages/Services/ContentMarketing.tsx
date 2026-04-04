import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  FileText,
  Rss,
  Video,
  Mail,
  Search,
  BarChart2,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  Plus,
} from 'lucide-react';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './ServicePage.css';

/* ── Constants ─────────────────────────────────────────────── */
const COLOR = '#f97316';
const GRADIENT = 'linear-gradient(135deg, #f97316, #ea580c)';

const contentServices = [
  {
    icon: FileText,
    title: 'Blog & Article Writing',
    desc: 'SEO-optimised blog posts, long-form articles, and thought-leadership pieces that rank and convert readers into leads.',
  },
  {
    icon: Video,
    title: 'Video & Visual Content',
    desc: 'Engaging video scripts, infographics, and visual storytelling that drive shares, views, and brand recall.',
  },
  {
    icon: Rss,
    title: 'Social Media Content',
    desc: 'Platform-native content calendars and copy for Instagram, LinkedIn, X, and more — crafted for engagement.',
  },
  {
    icon: Mail,
    title: 'Email Newsletters',
    desc: 'Nurture sequences and broadcast emails that keep your audience engaged and move them down the funnel.',
  },
  {
    icon: Search,
    title: 'SEO Content Strategy',
    desc: 'Topical authority maps, keyword clustering, and content briefs aligned to search intent and your buyer journey.',
  },
  {
    icon: BarChart2,
    title: 'Content Analytics & Reporting',
    desc: 'Performance tracking across all content assets — traffic, engagement, leads, and revenue attribution.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We audit your existing content, identify gaps, and research your audience and competitive landscape.',
  },
  {
    num: '02',
    title: 'Strategy & Planning',
    desc: 'Build a data-driven content plan with topics, formats, publishing cadence, and distribution channels.',
  },
  {
    num: '03',
    title: 'Create & Publish',
    desc: 'Our writers and creators produce high-quality content tailored to each platform and audience segment.',
  },
  {
    num: '04',
    title: 'Distribute & Amplify',
    desc: 'We maximise reach through SEO, social distribution, email, and paid amplification strategies.',
  },
];

const tools = [
  'Ahrefs',
  'SEMrush',
  'Clearscope',
  'HubSpot',
  'Notion',
  'Canva Pro',
  'GA4',
  'Hotjar',
  'BuzzSumo',
  'Mailchimp',
];

const keywords = [
  'Content Strategy',
  'Blog Writing',
  'Brand Storytelling',
  'Thought Leadership',
  'Video Scripts',
  'Email Nurture',
  'Topical Authority',
  'Organic Traffic',
  'Lead Generation',
  'Content Calendar',
  'SEO Content',
  'Audience Engagement',
];

const results = [
  {
    metric: '5×',
    detail: 'Organic leads from blog content in 8 months',
    client: 'HealthStack SaaS',
    industry: 'HealthTech / SaaS',
  },
  {
    metric: '280%',
    detail: 'Increase in email open rates after nurture redesign',
    client: 'RetailEdge',
    industry: 'E-commerce / Retail',
  },
  {
    metric: '60+',
    detail: 'First-page rankings from content-led SEO',
    client: 'FinAdvisors India',
    industry: 'BFSI / Finance',
  },
];

const faqs = [
  {
    q: 'What types of content do you produce?',
    a: 'We produce the full spectrum: SEO blog posts, long-form guides, case studies, whitepapers, social media content, email newsletters, video scripts, infographics, and landing page copy. Every piece is tailored to your brand voice and audience.',
  },
  {
    q: 'How do you measure the success of content marketing?',
    a: 'We track organic traffic growth, keyword rankings, time-on-page, lead attribution, email open and click rates, and social engagement. You receive a monthly content performance report with insights and recommendations.',
  },
  {
    q: 'How long before we see results from content marketing?',
    a: 'SEO-focused content typically shows ranking movement in 3–4 months and meaningful traffic growth by 6 months. Social and email content drives faster engagement but compounds over time as your audience grows.',
  },
  {
    q: 'Do you need us to provide topics or do you handle the strategy?',
    a: 'We handle the full content strategy — from audience research and keyword discovery to editorial calendars and briefs. If you have ideas or subject-matter experts to collaborate with, we incorporate that too.',
  },
  {
    q: 'Can you match our existing brand voice?',
    a: 'Yes. We start every engagement with a brand voice audit. We review your existing content, document tone guidelines, and run a calibration round before going live to ensure everything sounds authentically like you.',
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

export default function ContentMarketing() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo('.cm-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.cm-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
        gsap.fromTo('.cm-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7,  ease: 'power3.out' });
        gsap.fromTo('.cm-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.cm-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.cm-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        gsap.fromTo(
          '.cm-intro__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.cm-intro', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-keyword-bubble',
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.cm-keywords', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.cm-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.cm-services-grid', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.cm-process', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.cm-tools .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.cm-tools', start: 'top 80%' },
          }
        );

        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.cm-results', start: 'top 80%' },
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
      <section id="cm-hero" className="svc-hero" aria-labelledby="cm-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#ea580c' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#f97316' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag cm-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Content Marketing
              </span>
              <h1 id="cm-h1-el" className="svc-hero__h1 cm-h1">
                Content That Attracts,{' '}
                <span className="text-gradient">Engages & Converts.</span>
              </h1>
              <p className="svc-hero__sub cm-sub">
                We craft content strategies and assets that build authority, drive organic
                traffic, and turn your audience into loyal customers — consistently.
              </p>
              <div className="svc-hero__actions cm-actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  Get a Content Strategy <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
                  See Our Work
                </button>
              </div>
              <div className="svc-hero__stats cm-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">5×</span>
                  <span className="svc-stat-card__label">Avg Lead Growth</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">200+</span>
                  <span className="svc-stat-card__label">Content Campaigns</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">85%</span>
                  <span className="svc-stat-card__label">Client Retention</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual cm-visual" aria-hidden="true">
              <div className="svc-keyword-cloud cm-keywords" style={{ padding: '1rem' }}>
                {keywords.map((kw) => (
                  <span key={kw} className="svc-keyword-bubble">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Content Marketing ────────────────────────────── */}
      <section id="cm-why" className="svc-section cm-intro" aria-labelledby="cm-why-h2">
        <div className="container">
          <div className="svc-intro">
            <div className="svc-intro__text cm-intro__text">
              <span className="tag">Why Content Marketing</span>
              <h2 id="cm-why-h2">Content is the Engine of Modern Growth</h2>
              <p>
                Businesses that invest in content marketing generate 3× more leads than
                those relying solely on outbound tactics — at 62% lower cost. Content
                builds trust, authority, and organic reach that compounds over time.
              </p>
              <p>
                Our approach connects every piece of content to a clear business goal:
                ranking for high-intent keywords, nurturing leads through the funnel, or
                establishing your brand as the definitive voice in your industry.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: TrendingUp, text: '3× more leads vs outbound' },
                  { icon: Target,     text: 'Intent-driven content strategy' },
                  { icon: Users,      text: 'Builds long-term brand trust' },
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
                    d="M24,140 C70,138 100,125 140,105 C170,90 200,80 230,60 C260,42 300,28 376,15 L376,140 Z"
                    fill="rgba(249, 115, 22, 0.08)"
                  />
                  <path
                    d="M24,140 C70,138 100,125 140,105 C170,90 200,80 230,60 C260,42 300,28 376,15"
                    fill="none"
                    stroke={COLOR}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="376" cy="15" r="5" fill={COLOR}>
                    <animate attributeName="opacity" from="0" to="1" begin="2.4s" dur="0.2s" fill="freeze" />
                  </circle>
                </svg>
                <div style={{ position: 'absolute', bottom: 8, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
                  {['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'].map((l) => (
                    <span key={l} style={{ fontSize: '0.62rem', color: 'var(--color-muted)' }}>{l}</span>
                  ))}
                </div>
                <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '0.65rem', color: COLOR, fontWeight: 600 }}>
                  Content-Driven Lead Growth
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="cm-services" className="svc-section svc-section--alt" aria-labelledby="cm-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="cm-services-h2">Content Marketing Services</h2>
            <p>From strategy to creation to distribution — every content need, handled end-to-end.</p>
          </div>
          <div className="svc-grid-6 cm-services-grid">
            {contentServices.map(({ icon: Icon, title, desc }) => (
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
      <section id="cm-process" className="svc-section" aria-labelledby="cm-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Approach</span>
            <h2 id="cm-process-h2">How We Build Your Content Engine</h2>
            <p>A proven 4-phase process that turns content into a reliable growth channel.</p>
          </div>
          <div className="svc-process cm-process">
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
      <section id="cm-tools" className="svc-section svc-section--dark cm-tools" aria-labelledby="cm-tools-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Toolkit</span>
            <h2 id="cm-tools-h2">Tools We Use</h2>
            <p>Best-in-class platforms for research, creation, distribution, and measurement.</p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {tools.map((t) => (
              <span key={t} className="svc-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────── */}
      <section id="cm-results" className="svc-section cm-results" aria-labelledby="cm-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="cm-results-h2">Content That Delivers Results</h2>
            <p>Real outcomes from content strategies we've built and executed.</p>
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
      <section id="cm-faq" className="svc-section svc-section--alt" aria-labelledby="cm-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="cm-faq-h2">Content Marketing Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="cm-cta" className="svc-section svc-cta" aria-labelledby="cm-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="cm-cta-h2" className="svc-cta__title">
            Build Your <span className="text-gradient">Content Engine</span>
          </h2>
          <p className="svc-cta__sub">
            Get a free content audit and strategy session — we'll show you exactly where
            your biggest content opportunities are and how to capitalise on them.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry} className="btn btn-primary">
              Get a Free Content Audit <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry} className="btn btn-outline">
              Talk to a Content Strategist
            </button>
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

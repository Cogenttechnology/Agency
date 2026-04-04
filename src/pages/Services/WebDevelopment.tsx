import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Monitor, Smartphone, ShoppingCart, Zap, Code2,
  Layout, Globe, Search, ArrowRight, Plus,
} from 'lucide-react';
import WorkShowcase from '../../components/WorkShowcase/WorkShowcase';
import type { WorkItem } from '../../components/WorkShowcase/WorkShowcase';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './ServicePage.css';

const workItems: WorkItem[] = [
  {
    title: 'Axion Store — E-Commerce Redesign',
    category: 'Web Design & Dev',
    result: '3.4× conversion lift post-launch',
    gradient: 'linear-gradient(135deg, #6c63ff 0%, #3a35cc 100%)',
    tags: ['Shopify', 'UI/UX', 'E-Commerce', 'Performance'],
  },
  {
    title: 'Synapse Labs — SaaS Website',
    category: 'Next.js Development',
    result: '220% organic sessions increase',
    gradient: 'linear-gradient(135deg, #3a35cc 0%, #a855f7 100%)',
    tags: ['Next.js', 'SaaS', 'SEO', 'CMS'],
  },
  {
    title: 'Skyline Group — Real Estate Platform',
    category: 'Custom Web App',
    result: '1.8s load time, 99 Lighthouse score',
    gradient: 'linear-gradient(135deg, #6c63ff 0%, #00d4aa 100%)',
    tags: ['React', 'Real Estate', 'Performance', 'Maps API'],
  },
];

const COLOR    = '#6c63ff';
const GRADIENT = 'linear-gradient(135deg, #6c63ff, #3a35cc)';

const services = [
  { icon: Layout,       title: 'UI/UX Design',           desc: 'Pixel-perfect interfaces grounded in user research — beautiful, intuitive, and conversion-optimised.' },
  { icon: Code2,        title: 'Custom Web Development',  desc: 'React, Next.js and Node.js builds that are blazing-fast, scalable, and built to last.' },
  { icon: Smartphone,   title: 'Mobile-First Design',     desc: 'Every project starts mobile — we ensure flawless experiences across all screen sizes.' },
  { icon: ShoppingCart, title: 'E-Commerce Development',  desc: 'Shopify, WooCommerce and headless builds that maximise product discoverability and checkout conversion.' },
  { icon: Zap,          title: 'Performance Optimisation', desc: 'Core Web Vitals, Lighthouse scores, and CDN setup — we make your site load in under 2 seconds.' },
  { icon: Globe,        title: 'CMS Integration',         desc: 'Headless CMS setups with Contentful, Sanity or Prismic so your team can update content independently.' },
  { icon: Search,       title: 'Technical SEO Setup',     desc: 'Schema markup, structured data, sitemap, robots.txt and all technical foundations for top rankings.' },
  { icon: Monitor,      title: 'Landing Page Design',     desc: 'High-converting campaign landing pages designed and shipped in days — A/B test ready.' },
];

const steps = [
  { num: '01', title: 'Discovery',    desc: 'Stakeholder workshops, user research, competitor analysis and project scoping.' },
  { num: '02', title: 'Wireframing',  desc: 'Low-fidelity wireframes and information architecture locked before any visual design.' },
  { num: '03', title: 'UI Design',    desc: 'High-fidelity Figma designs with a full component library and style guide.' },
  { num: '04', title: 'Development',  desc: 'Clean, tested code built in sprints with continuous client review and feedback.' },
  { num: '05', title: 'Launch & QA',  desc: 'Cross-browser testing, accessibility audit, performance checks, and go-live support.' },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS',
  'Figma', 'Shopify', 'Webflow', 'Contentful', 'Vercel',
  'PostgreSQL', 'Supabase',
];

const results = [
  { metric: '2.1s',  detail: 'Average page load time across all delivered projects', client: 'Axion Store',   industry: 'E-Commerce' },
  { metric: '220%',  detail: 'Increase in organic sessions after website relaunch',  client: 'Synapse Labs',  industry: 'SaaS / B2B' },
  { metric: '4.1×',  detail: 'Conversion rate improvement on redesigned checkout',   client: 'Novo Retail',   industry: 'D2C Fashion' },
];

const faqs = [
  {
    q: 'How long does a website project take?',
    a: 'A landing page can go live in 1–2 weeks. A full marketing website typically takes 6–10 weeks. E-commerce and custom web applications range from 10–20 weeks depending on scope and integrations.',
  },
  {
    q: 'Do you design and develop, or just one?',
    a: 'Both — under one roof. Our designers and developers work in tandem from day one, which eliminates handoff gaps, reduces revisions, and speeds up delivery significantly.',
  },
  {
    q: 'What platforms and technologies do you use?',
    a: 'We primarily build with React and Next.js for web applications, and Shopify or WooCommerce for e-commerce. For CMS-driven sites, we use Contentful, Sanity, or Webflow. We choose the stack that best fits your needs.',
  },
  {
    q: 'Will my website be SEO-friendly?',
    a: 'Absolutely. Every site we build includes technical SEO foundations: semantic HTML, structured data, fast load times, proper meta setup, and sitemap generation. We can also integrate with your SEO strategy from day one.',
  },
  {
    q: 'Do you provide ongoing maintenance and support?',
    a: 'Yes. We offer monthly retainer packages covering updates, security patches, performance monitoring, and content changes. You are never left on your own after launch.',
  },
];

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

/* ── Browser Mockup Visual ───────────────────────────────── */
function BrowserVisual() {
  return (
    <div className="wd-browser" aria-hidden="true">
      {/* Browser chrome */}
      <div className="wd-browser__chrome">
        <div className="wd-browser__dots">
          <span style={{ background: '#ff6b6b' }} />
          <span style={{ background: '#f59e0b' }} />
          <span style={{ background: '#00d4aa' }} />
        </div>
        <div className="wd-browser__bar">cogent.agency/work</div>
      </div>
      {/* Screen */}
      <div className="wd-browser__screen">
        <div className="wd-browser__screen-bg" />
        {/* Fake navbar */}
        <div className="wd-fake-nav">
          <div className="wd-fake-logo" />
          <div className="wd-fake-links">
            <div className="wd-fake-link" />
            <div className="wd-fake-link" />
            <div className="wd-fake-link" />
          </div>
          <div className="wd-fake-btn" />
        </div>
        {/* Hero block */}
        <div className="wd-fake-hero">
          <div className="wd-fake-tag" />
          <div className="wd-fake-h1" />
          <div className="wd-fake-h1 wd-fake-h1--short" />
          <div className="wd-fake-p" />
          <div className="wd-fake-p wd-fake-p--short" />
          <div className="wd-fake-cta" />
        </div>
        {/* Card row */}
        <div className="wd-fake-cards">
          {[0,1,2].map(i => (
            <div key={i} className="wd-fake-card" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
      </div>
      {/* Floating chips */}
      <div className="wd-chip wd-chip--speed">
        <span style={{ color: '#00d4aa' }}>⚡</span>
        <span>100 / 100</span>
      </div>
      <div className="wd-chip wd-chip--mobile">
        <span>📱</span>
        <span>Mobile-First</span>
      </div>
      <div className="wd-chip wd-chip--seo">
        <span style={{ color: '#6c63ff' }}>🔍</span>
        <span>SEO Ready</span>
      </div>
    </div>
  );
}

export default function WebDevelopment() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo('.wd-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.wd-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.wd-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
        gsap.fromTo('.wd-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.wd-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.wd-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        gsap.fromTo('.wd-services-grid .svc-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.wd-services-grid', start: 'top 80%' } });

        gsap.fromTo('.svc-process__step',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.wd-process', start: 'top 80%' } });

        gsap.fromTo('.wd-stack .svc-pill',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.wd-stack', start: 'top 80%' } });

        gsap.fromTo('.svc-result-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.wd-results', start: 'top 80%' } });

        gsap.fromTo('.svc-faq-item',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.svc-faq', start: 'top 80%' } });
      }, pageRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={pageRef} style={{ '--svc-color': COLOR, '--svc-gradient': GRADIENT } as React.CSSProperties}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section id="web-development-hero" className="svc-hero" aria-labelledby="wd-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#3a35cc' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#a855f7' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag wd-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Web Design & Development
              </span>
              <h1 id="wd-h1-el" className="svc-hero__h1 wd-h1">
                Websites That Look{' '}
                <span className="text-gradient">Stunning & Convert</span>
              </h1>
              <p className="svc-hero__sub wd-sub">
                We design and build high-performance websites and digital products
                that captivate visitors, rank on Google, and turn traffic into
                revenue.
              </p>
              <div className="svc-hero__actions wd-actions">
                <button onClick={openEnquiry}  className="btn btn-primary">
                  Start Your Project <ArrowRight size={16} />
                </button>
                <Link to="/portfolio" className="btn btn-outline">
                  View Our Work
                </Link>
              </div>
              <div className="svc-hero__stats wd-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">150+</span>
                  <span className="svc-stat-card__label">Websites Launched</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">2.1s</span>
                  <span className="svc-stat-card__label">Avg Load Time</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">98%</span>
                  <span className="svc-stat-card__label">Client Satisfaction</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual wd-visual" aria-hidden="true">
              <BrowserVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────── */}
      <section id="web-development-services" className="svc-section svc-section--alt" aria-labelledby="wd-svc-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Build</span>
            <h2 id="wd-svc-h2">Every Web Capability Under One Roof</h2>
            <p>From concept to launch — we handle design, development, performance, and SEO as one seamless team.</p>
          </div>
          <div className="svc-grid-6 wd-services-grid">
            {services.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="svc-card">
                <div className="svc-card__icon-wrap"><Icon size={22} /></div>
                <h3 className="svc-card__title">{title}</h3>
                <p className="svc-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section id="web-development-process" className="svc-section" aria-labelledby="wd-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How We Work</span>
            <h2 id="wd-process-h2">Our Web Development Process</h2>
            <p>A structured 5-stage process that ensures on-brief delivery, zero surprises, and a site you're proud of.</p>
          </div>
          <div className="svc-process wd-process">
            {steps.map((step, i) => (
              <div key={step.num} style={{ display: 'contents' }}>
                <div className="svc-process__step">
                  <div className="svc-process__num">{step.num}</div>
                  <h3 className="svc-process__title">{step.title}</h3>
                  <p className="svc-process__desc">{step.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="svc-process__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────────── */}
      <section id="web-development-tech-stack" className="svc-section svc-section--dark wd-stack" aria-labelledby="wd-stack-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Technology</span>
            <h2 id="wd-stack-h2">Our Tech Stack</h2>
            <p>Modern, battle-tested tools chosen for performance, scalability, and developer experience.</p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {techStack.map(t => <span key={t} className="svc-pill">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="web-development-results" className="svc-section svc-section--alt wd-results" aria-labelledby="wd-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proof of Work</span>
            <h2 id="wd-results-h2">Websites That Perform</h2>
            <p>Real metrics from real projects — speed, traffic, and conversion improvements that matter.</p>
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

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="web-development-faq" className="svc-section" aria-labelledby="wd-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="wd-faq-h2">Web Development Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── Work Showcase ────────────────────────────────── */}
      <WorkShowcase color={COLOR} items={workItems} />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="web-development-cta" className="svc-section svc-cta" aria-labelledby="wd-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="wd-cta-h2" className="svc-cta__title">
            Let's Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="svc-cta__sub">
            Tell us about your project and we'll respond with a tailored proposal within 48 hours.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry}  className="btn btn-primary">
              Start Your Project <ArrowRight size={16} />
            </button>
            <Link to="/portfolio" className="btn btn-outline">
              See Our Work
            </Link>
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

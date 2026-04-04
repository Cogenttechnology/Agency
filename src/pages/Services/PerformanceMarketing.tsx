import React, { useEffect, useRef, useState } from 'react';
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
  Award,
  Lightbulb,
  Target,
  Settings,
  Eye,
  RefreshCw,
  Camera,
  Share2,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Layers,
  Shield,
  Zap,
} from 'lucide-react';
import PerfShowcase from '../../components/PerfShowcase/PerfShowcase';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './ServicePage.css';

/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#a855f7';
const GRADIENT = 'linear-gradient(135deg, #a855f7, #7c3aed)';

/* ── Ad Type Cards (PPC Services from reference) ─────────── */
const adTypes = [
  {
    icon: Search,
    title: 'Search Ads',
    desc: 'Reach your audience instantly with targeted search ads! Maximize your online presence and drive conversions. Start your campaign today!',
    color: '#a855f7',
  },
  {
    icon: Eye,
    title: 'Display Ads',
    desc: 'Elevate your online presence with captivating display ads. Stand out from the crowd and attract more customers with our visually stunning designs.',
    color: '#7c3aed',
  },
  {
    icon: Layers,
    title: 'Discovery Ads',
    desc: 'Elevate your brand visibility with Discovery Ads. Reach potential customers across Google platforms with captivating visuals. Let\'s ignite your digital presence today.',
    color: '#a855f7',
  },
  {
    icon: Share2,
    title: 'Social Media Ads',
    desc: 'Your key to reaching the right audience at the right time. Let us elevate your brand with targeted campaigns that drive results.',
    color: '#9333ea',
  },
  {
    icon: RefreshCw,
    title: 'Remarketing Ads',
    desc: 'Unlock the power of remarketing ads! Reach out to potential customers who\'ve shown interest in your brand before.',
    color: '#7c3aed',
  },
  {
    icon: Camera,
    title: 'E-Commerce Shoot',
    desc: 'Elevate your online store with stunning E-Commerce shoots. From product photography to lifestyle images, we\'ve got you covered.',
    color: '#a855f7',
  },
];

/* ── Why The Cogent cards ─────────────────────────────────── */
const whyCogent = [
  {
    icon: Award,
    title: 'Proven Expertise',
    desc: 'With years of experience and a track record of success, The Cogent is a trusted PPC company in Jaipur. Our team of skilled professionals understands the nuances of PPC advertising, ensuring your campaigns are effective and efficient.',
  },
  {
    icon: Settings,
    title: 'Tailored Strategies',
    desc: "We don't believe in one-size-fits-all approaches. At The Cogent, we take the time to understand your business, industry, and objectives. We then develop custom PPC strategies that are specifically tailored to meet your needs and drive results.",
  },
  {
    icon: Shield,
    title: 'Transparent Communication',
    desc: "We value transparency and communication. Throughout the entire process, you'll have access to detailed reports and regular updates on the performance of your PPC campaigns. We believe in keeping our clients informed every step of the way.",
  },
  {
    icon: Target,
    title: 'Results-Driven Approach',
    desc: "Our ultimate goal is to deliver tangible results for your business. Whether it's increasing website traffic, generating leads, or improving conversions, we focus on measurable outcomes that have a positive impact on your bottom line. With The Cogent as your PPC company in Jaipur, you can trust that your investment will yield significant returns.",
  },
  {
    icon: BarChart3,
    title: 'Campaign Strategy and Planning',
    desc: 'Develop campaign strategies & tactical plans, including content creation, ad targeting, & campaign timelines, to drive campaign success and achieve objectives.',
  },
  {
    icon: Globe,
    title: 'Digital Marketing Campaign Management',
    desc: 'Expertly execute and manage digital marketing campaigns across various channels, ensuring consistent messaging, optimal targeting, and campaign performance tracking.',
  },
];

/* ── Expectations ─────────────────────────────────────────── */
const expectations = [
  { icon: Target,      label: 'Targeted Approach' },
  { icon: BarChart3,   label: 'Measurable Results' },
  { icon: DollarSign,  label: 'Cost-effectiveness' },
  { icon: Layers,      label: 'Flexibility and Scalability' },
  { icon: Shield,      label: 'Transparency & Accountability' },
  { icon: TrendingUp,  label: 'Higher ROI' },
];

/* ── Why Choose (4-pillars) ───────────────────────────────── */
const whyChoose = [
  {
    icon: Award,
    title: 'Expertise',
    desc: 'Our social media specialists are a group of highly qualified people with a keen grasp of the social media arena, marketing know-how, and several years of experience in the industry.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We make sure that we are on the edge of the cutting edge by using the most advanced social media tools, techniques, and trends as our selling points.',
  },
  {
    icon: Target,
    title: 'Results-Driven',
    desc: 'Our aim is clear, to provide visible results aimed at crossing off your goal list.',
  },
  {
    icon: Settings,
    title: 'Customized Solutions',
    desc: 'We are aware that no two businesses are the same. Therefore, our solutions are customized to suit your exact requirements.',
  },
];

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
    q: 'What is Performance Marketing?',
    a: 'Action-driven digital marketing is where businesses are charged only for actions such as clicks, leads, sales, or conversions. You can ensure that you use your marketing budget effectively since you will be paid only for measurable results.',
  },
  {
    q: 'Compare and contrast with traditional marketing.',
    a: 'Whereas, in the traditional marketing process, almost all the cost is front-end, and the conventional approach here is of an advertisement on a television or print — the concept of performance-based marketing is that you only pay when those specific actions are completed, which makes the approach significantly more accountable and results-oriented in terms of results and outcome.',
  },
  {
    q: 'On which mediums can Performance Marketing be executed?',
    a: "Performance Marketing uses many digital channels: search engine ads, social media websites, affiliate marketing, and display advertisements. Such a choice depends on your business's target audience and the purpose of its promotion.",
  },
  {
    q: 'How to measure and optimize Performance Marketing campaigns?',
    a: "We'd use robust analytics tools to track critical metrics like conversion rates, cost per acquisition or CPA, and return on investment or ROI. Continuous optimization will allow us to make all the targeting adjustments needed, optimize bids, test different ad creatives at our disposal, and focus on optimizing campaign performance to deliver even better results.",
  },
  {
    q: 'Will performance marketing work for my business?',
    a: 'Performance Marketing can complement any small or big business without regard to the business niche. Our campaigns are all customer-focused on specific objectives, such as lead generation or conversion to sales, which will help ensure efficiency and maximum results.',
  },
];

/* ── Ad Type Card — 3D flip + tap on mobile ──────────────── */
interface AdCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  desc: string;
  color: string;
  index: number;
  onEnquiry: () => void;
}

function AdCard({ icon: Icon, title, desc, color, index, onEnquiry }: AdCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`pm-ad-card${flipped ? ' pm-ad-card--flipped' : ''}`}
      style={{ '--ad-color': color, '--ad-delay': `${index * 0.1}s` } as React.CSSProperties}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="pm-ad-card__inner">
        {/* Front */}
        <div className="pm-ad-card__front">
          <div className="pm-ad-card__glow" />
          <div className="pm-ad-card__num">0{index + 1}</div>
          <div className="pm-ad-card__icon"><Icon size={28} /></div>
          <h3 className="pm-ad-card__title">{title}</h3>
          <div className="pm-ad-card__arrow">↗</div>
        </div>
        {/* Back */}
        <div className="pm-ad-card__back">
          <div className="pm-ad-card__back-glow" />
          <div className="pm-ad-card__back-icon"><Icon size={20} /></div>
          <h3 className="pm-ad-card__back-title">{title}</h3>
          <p className="pm-ad-card__desc">{desc}</p>
          <button
            className="pm-ad-card__cta"
            onClick={e => { e.stopPropagation(); onEnquiry(); }}
          >
            Get Started <ArrowRight size={13} />
          </button>
        </div>
      </div>
      {/* Mobile flat view */}
      <div className="pm-ad-card__flat">
        <div className="pm-ad-card__flat-top">
          <div className="pm-ad-card__icon"><Icon size={22} /></div>
          <span className="pm-ad-card__num pm-ad-card__flat-num">0{index + 1}</span>
        </div>
        <h3 className="pm-ad-card__title">{title}</h3>
        <p className="pm-ad-card__desc">{desc}</p>
        <button className="pm-ad-card__cta" onClick={e => { e.stopPropagation(); onEnquiry(); }}>
          Get Started <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ── FAQ Item ────────────────────────────────────────────── */
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

/* ── Page ────────────────────────────────────────────────── */
export default function PerformanceMarketing() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo('.svc-hero__tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__h1',  { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.svc-hero__stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });

        // Counter animation
        document.querySelectorAll<HTMLElement>('.pm-counter').forEach((el) => {
          const target = parseFloat(el.dataset.target || '0');
          const isDecimal = el.dataset.decimal === 'true';
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2, delay: 1.2, ease: 'power2.out',
            onUpdate: () => {
              el.textContent = isDecimal
                ? obj.val.toFixed(1) + '×'
                : Math.round(obj.val) + (el.dataset.suffix || '');
            },
          });
        });

        // Ad type cards
        gsap.fromTo(
          '.pm-ad-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-ad-grid', start: 'top 85%' },
          }
        );

        // Intro
        gsap.fromTo(
          '.pm-intro__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-intro', start: 'top 80%' },
          }
        );

        // Services
        gsap.fromTo(
          '.pm-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-services-grid', start: 'top 80%' },
          }
        );

        // Why Cogent cards
        gsap.fromTo(
          '.pm-why-cogent-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-why-cogent-grid', start: 'top 80%' },
          }
        );

        // Expectation items
        gsap.fromTo(
          '.pm-expect-item',
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.09, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.pm-expectations', start: 'top 80%' },
          }
        );

        // Why choose 4-pillars
        gsap.fromTo(
          '.pm-why-choose-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-why-choose-grid', start: 'top 80%' },
          }
        );

        // Process
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-process', start: 'top 80%' },
          }
        );

        // Platform pills
        gsap.fromTo(
          '.pm-platforms .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.pm-platforms', start: 'top 80%' },
          }
        );

        // Results
        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.pm-results', start: 'top 80%' },
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
      <section id="performance-marketing-hero" className="svc-hero" aria-labelledby="pm-h1">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#7c3aed' }} />
        <div className="svc-orb svc-orb--3" style={{ background: COLOR }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag" style={{ color: COLOR, borderColor: COLOR }}>
                Performance Marketing
              </span>
              <h1 id="pm-h1" className="svc-hero__h1">
                Drive 2x More Revenue through{' '}
                <span className="text-gradient">Result Driven Performance Marketing</span>
              </h1>
              <p className="svc-hero__sub">
                We specialise in delivering top-notch PPC services in Jaipur that are tailored to your business goals. With our expertise, we'll help you maximise your reach, engage your audience, and achieve remarkable results through strategic pay-per-click campaigns.
              </p>
              <div className="svc-hero__actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  Get a Free Audit <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
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

            <div className="svc-hero__visual" aria-hidden="true">
              <div style={{ width: '100%' }}>
                <div className="svc-bar-chart">
                  {['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'].map((label, i) => (
                    <div key={i} className="svc-bar" data-label={label}
                      style={{ background: GRADIENT, animationDelay: `${1.2 + i * 0.1}s` }} />
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

      {/* ── PPC Ad Types ─────────────────────────────────── */}
      <section id="ppc-ad-types" className="svc-section svc-section--alt" aria-labelledby="pm-ad-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">PPC Services</span>
            <h2 id="pm-ad-h2">Want to know which of the above ads is the best for your Business</h2>
            <p>We run every type of paid campaign — pick the format that fits your goal or let us recommend the right mix.</p>
          </div>
          <div className="pm-ad-grid">
            {adTypes.map(({ icon, title, desc, color }, i) => (
              <AdCard key={title} icon={icon} title={title} desc={desc} color={color} index={i} onEnquiry={openEnquiry} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button onClick={openEnquiry} className="btn btn-primary">
              Let's Talk About Your Brand <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── The Cogent — Your PPC Company ────────────────── */}
      <section id="ppc-company-jaipur" className="svc-section" aria-labelledby="pm-why-cogent-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">About The Cogent</span>
            <h2 id="pm-why-cogent-h2">The Cogent — Your Go-to PPC Company in <span className="text-gradient">Jaipur</span></h2>
            <p>Six strong reasons why leading brands in Jaipur trust The Cogent to run their performance campaigns.</p>
          </div>
          <div className="svc-grid-6 pm-why-cogent-grid">
            {whyCogent.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="svc-card pm-why-cogent-card">
                <div className="svc-card__icon-wrap"><Icon size={22} /></div>
                <h3 className="svc-card__title">{title}</h3>
                <p className="svc-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Can Expect ──────────────────────────── */}
      <section id="performance-marketing-expectations" className="svc-section svc-section--dark pm-expectations" aria-labelledby="pm-expect-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What to Expect</span>
            <h2 id="pm-expect-h2">What you can expect from <span className="text-gradient">Performance Marketing</span></h2>
            <p>Every campaign we run is built around six core promises to your business.</p>
          </div>
          <div className="pm-expect-grid">
            {expectations.map(({ icon: Icon, label }) => (
              <div key={label} className="pm-expect-item">
                <div className="pm-expect-item__icon"><Icon size={24} /></div>
                <CheckCircle size={16} className="pm-expect-item__check" />
                <span className="pm-expect-item__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose The Cogent ────────────────────────── */}
      <section id="why-choose-cogent-ppc" className="svc-section svc-section--alt" aria-labelledby="pm-why-choose-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Why Choose Us</span>
            <h2 id="pm-why-choose-h2">Why choose The Cogent for your <span className="text-gradient">Performance Marketing</span></h2>
            <p>Four pillars that set us apart from every other PPC agency in the market.</p>
          </div>
          <div className="svc-grid-4 pm-why-choose-grid">
            {whyChoose.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="svc-card pm-why-choose-card">
                <div className="svc-card__icon-wrap"><Icon size={22} /></div>
                <h3 className="svc-card__title">{title}</h3>
                <p className="svc-card__desc">{desc}</p>
              </article>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <button onClick={openEnquiry} className="btn btn-primary">
              Get Started <ArrowRight size={16} />
            </button>
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
              <button onClick={openEnquiry} className="btn btn-outline" style={{ width: 'fit-content' }}>
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
                    <div key={i} className="svc-bar" data-label={l}
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
            <p>From search intent capture to programmatic retargeting — we cover every paid channel that drives measurable growth.</p>
          </div>
          <div className="svc-grid-6 pm-services-grid">
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
                {i < steps.length - 1 && <div key={`c-${i}`} className="svc-process__connector" />}
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
            {platforms.map((p) => <span key={p} className="svc-pill">{p}</span>)}
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
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── Campaign Showcase ────────────────────────────── */}
      <PerfShowcase />

      {/* ── Boost Your Brand CTA ─────────────────────────── */}
      <section id="boost-brand-cta" className="svc-section pm-boost-cta" aria-labelledby="pm-boost-h2">
        <div className="pm-boost-cta__orb pm-boost-cta__orb--1" />
        <div className="pm-boost-cta__orb pm-boost-cta__orb--2" />
        <div className="container">
          <div className="pm-boost-cta__inner">
            <div className="pm-boost-cta__content">
              <span className="tag">Boost Your Brand</span>
              <h2 id="pm-boost-h2" className="pm-boost-cta__title">
                Boost your brand for <span className="text-gradient">better Results</span>
              </h2>
              <p className="pm-boost-cta__sub">
                Let our performance team audit your current campaigns and show you exactly where you're leaving money on the table.
              </p>
            </div>
            <div className="pm-boost-cta__metrics">
              <div className="pm-boost-metric">
                <span className="pm-boost-metric__num">2×</span>
                <span className="pm-boost-metric__label">Revenue Growth</span>
              </div>
              <div className="pm-boost-metric">
                <span className="pm-boost-metric__num">64%</span>
                <span className="pm-boost-metric__label">Lower CPL</span>
              </div>
              <div className="pm-boost-metric">
                <span className="pm-boost-metric__num">12×</span>
                <span className="pm-boost-metric__label">ROAS</span>
              </div>
            </div>
            <button onClick={openEnquiry} className="btn btn-primary pm-boost-cta__btn">
              Let's Connect <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
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
            <button onClick={openEnquiry} className="btn btn-primary">
              Get Your Free Audit <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry} className="btn btn-outline">
              Talk to a Strategist
            </button>
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

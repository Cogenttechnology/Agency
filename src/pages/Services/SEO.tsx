import React, { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Settings,
  FileText,
  Link2,
  MapPin,
  ShoppingBag,
  BookOpen,
  TrendingUp,
  Shield,
  Users,
  ArrowRight,
  Plus,
  Smartphone,
  BarChart2,
  Search,
  Code2,
  AlertCircle,
  Mic,
  PlayCircle,
  Store,
  Globe,
  Award,
  DollarSign,
  Zap,
  Target,
} from 'lucide-react';
import SeoShowcase from '../../components/SeoShowcase/SeoShowcase';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './ServicePage.css';


/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#00d4aa';
const GRADIENT = 'linear-gradient(135deg, #00d4aa, #0099aa)';

const seoServices = [
  {
    icon: Settings,
    title: 'Technical SEO',
    desc: 'Site speed, Core Web Vitals, crawlability, indexation, schema markup, and technical health audits.',
  },
  {
    icon: FileText,
    title: 'On-Page SEO',
    desc: 'Title tags, meta descriptions, heading structure, internal linking, and content optimisation for target keywords.',
  },
  {
    icon: Link2,
    title: 'Off-Page & Link Building',
    desc: 'Authority-building through high-quality backlink acquisition, digital PR, and brand mention campaigns.',
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    desc: 'Google Business Profile optimisation, local citations, and geo-targeted content to dominate local search.',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce SEO',
    desc: 'Category page optimisation, product schema, faceted navigation fixes, and conversion-focused content.',
  },
  {
    icon: BookOpen,
    title: 'Content Strategy',
    desc: 'Topical authority mapping, content gap analysis, and SEO content briefs that rank and convert.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Research',
    desc: 'Our team works to analyze the market in order to find significant opportunities within your market. With help of competitor analysis, customer behavior, local search trends, and keywords, we build up insights to advance your SEO tactics.',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'We develop individualized digital marketing plans based on your goals. After agreeing on the right strategy, we employ several techniques to improve your online presence and how you can influence your target clients.',
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'Our SEO services are designed according to your objective and involve various activities performed by our SEO specialists to enhance the website\'s standing, visitors, and sales.',
  },
  {
    num: '04',
    title: 'Tracking',
    desc: 'The control of performance is one of our major activities. At every step, we monitor the outcome of each campaign, make changes as necessary, and identify new opportunities to ensure we get the best results.',
  },
];

const tools = [
  'SEMrush',
  'Ahrefs',
  'Screaming Frog',
  'Google Search Console',
  'Google Analytics 4',
  'Moz',
  'SurferSEO',
  'PageSpeed Insights',
  'Sitebulb',
  'Clearscope',
];

const keywords = [
  'SEO Agency India',
  'Rank on Page 1',
  'Organic Traffic',
  'Link Building',
  'Technical SEO',
  'Local SEO',
  'Content Strategy',
  'Keyword Research',
  'Domain Authority',
  'Core Web Vitals',
  'E-commerce SEO',
  'SERP Rankings',
];

const results = [
  {
    metric: '420%',
    detail: 'Organic traffic growth in 6 months',
    client: 'LegalEase Platform',
    industry: 'LegalTech / SaaS',
  },
  {
    metric: '#1',
    detail: 'Google ranking for 45+ target keywords',
    client: 'HomeDecor Hub',
    industry: 'E-commerce / Home',
  },
  {
    metric: '3.2×',
    detail: 'Increase in organic leads YoY',
    client: 'FinanceFirst',
    industry: 'BFSI / Finance',
  },
];

/* ── New data from reference page ───────────────────────── */
const provenStats = [
  { num: '350+', label: 'Projects Handled' },
  { num: '50+',  label: 'Team of Professionals' },
  { num: '1000+', label: 'Local Listings Optimized' },
  { num: '20+',  label: 'Different Sectors' },
  { num: '10X',  label: 'Brand Visibility' },
  { num: '20M$', label: 'Traffic Value' },
];

const keyFeatures = [
  {
    icon: Settings,
    title: 'Technical SEO Optimization',
    desc: 'We optimize the more technical aspects of your website such as speed, mobile friendly and structured data to help ranking on search engines.',
  },
  {
    icon: MapPin,
    title: 'Local SEO Management',
    desc: 'Stand out locally with our Local SEO services that have been designed to ensure your business appears in local searches and attracts clients in your area.',
  },
  {
    icon: FileText,
    title: 'Content Marketing & SEO Integration',
    desc: 'We craft and optimize high-quality, SEO-friendly content that engages users and improves your website\'s organic search performance.',
  },
  {
    icon: Smartphone,
    title: 'Mobile SEO Optimization',
    desc: 'Our mobile SEO strategies ensure your website is fully optimized for mobile search, delivering a seamless experience across all devices and improving mobile rankings.',
  },
  {
    icon: BookOpen,
    title: 'SEO Consultation & Strategy Planning',
    desc: 'Our team offers individual SEO consultation and concept creation for the further successful promotion of your company in terms of rankings.',
  },
  {
    icon: BarChart2,
    title: 'Conversion Rate Optimisation (CRO)',
    desc: 'We study web traffic data to better market the site and boost conversion rates to make more visitors paying customers.',
  },
  {
    icon: Search,
    title: 'Competitor SEO Gap Analysis',
    desc: 'Our detailed competitor analysis lets you know where your competitors are vulnerable and where they are missing the boat, SEO-wise.',
  },
  {
    icon: Code2,
    title: 'Schema Markup Implementation',
    desc: 'We assist in improving search results and visibility by including schema markup to your site to make it easier for search engines to interpret your content.',
  },
  {
    icon: Globe,
    title: 'SEO-Friendly Web Design',
    desc: 'Our websites are attractive and also optimized for quick loading and better positioning ensuring the sites are easily found by the search engine.',
  },
  {
    icon: AlertCircle,
    title: 'Penalty Recovery Services',
    desc: 'In case your site has been penalized our specialists will establish the reasons and will work on recovering your rankings and traffic.',
  },
];

const managedServices = [
  {
    icon: Award,
    title: 'Enterprise SEO',
    desc: 'We have enterprise level SEO services for large businesses or companies. These tactics demystify complicated issues of SEO, and lead to increased sales revenue.',
    color: '#00d4aa',
  },
  {
    icon: PlayCircle,
    title: 'YouTube SEO',
    desc: 'Improve your YouTube channel prominence with our professional YouTube SEO services. We ensure you get the best video titles, descriptions, thumbnails and tags to gain the most views from targeted traffic.',
    color: '#ff4444',
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce SEO',
    desc: 'Unleash your E-commerce website potential using our tested SEO strategies. We assist you in reaching more customers and increase your sale many folds by enhancing every small feature of your online store.',
    color: '#f59e0b',
  },
  {
    icon: Mic,
    title: 'Voice Search Optimization',
    desc: 'We make your content easily reachable for voice assistants like Siri, Alexa, and Google Assistant by tuning in to long-tail natural and conversational keywords to rank for the voice search traffic.',
    color: '#a855f7',
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    desc: 'Get the best out of Local SEO services we offer to ensure you have the best position in the local market. We assist you in ranking top for local related keywords and enhance customer trust, prominence, and traffic flow.',
    color: '#3b82f6',
  },
  {
    icon: Store,
    title: 'App Store Optimization',
    desc: 'App Store Optimization services will help you advance your app\'s promotion to a new level. We help enhance your app\'s searchability in the app stores and increase its discoverability and usage rates.',
    color: '#ec4899',
  },
];

const seoBenefits = [
  {
    icon: TrendingUp,
    title: 'Increased Organic Traffic',
    desc: 'When you partner with an SEO expert in Jaipur, you may safely count on a continuous stream of targeted visitors to your site. With keyword planning, on-page optimization, quality backlinking, and industry-leading content metrics, we deliver trustable outcomes.',
  },
  {
    icon: DollarSign,
    title: 'Reduced Dependency on Paid Ads',
    desc: 'SEO works to build your organic search visibility, trust, and authority over time, relieving paid search. The Cogent offers help for long-term engagement and customer acquisition strategy, so you do not need to waste a fortune on ads.',
  },
  {
    icon: Zap,
    title: 'Branding and Awareness',
    desc: 'We are experienced at using SEO, content marketing knowledge and social media for the benefit of your brand. Our proven techniques are focused on improving your online authority and visibility while creating awareness of your business.',
  },
  {
    icon: Users,
    title: 'Enhanced User Engagement',
    desc: 'Great content, website development and integration with social media will allow you to entice, and keep, your audience engaged. We make sure your site is optimized to keep its visitors engaged through every search touchpoint.',
  },
  {
    icon: Target,
    title: 'Qualified Leads',
    desc: 'The goal of our data-driven SEO is to attract the correct customers on their online journey. The Cogent brings you a stream of highly qualified leads with better conversion rates and better customer loyalty over time.',
  },
  {
    icon: BarChart2,
    title: 'Lower Cost Per Acquisition (CPA)',
    desc: 'With a full SEO strategy we can improve the quality of your organic traffic, decrease your bounce rates, and increase your conversions — leading to a lower average cost per acquisition and more cost-efficient growth.',
  },
];

const faqs = [
  {
    q: 'What is search engine optimization, and why is it valuable to my business?',
    a: 'SEO optimizes your site to enhance ranking and visibility on search engines, more so Google. This encompasses keyword research, page content optimization, and quality building of backlinks. The higher your ranking, the more organic traffic comes in — hence more leads and sales that boost brand awareness.',
  },
  {
    q: 'How long does it take for SEO results to come along?',
    a: 'SEO is a long-term approach and takes 3 to 6 months before any positive results can be seen. However, the time may vary depending on the market competition of your industry, the state of your website, and the tactics put in place for search engine optimization.',
  },
  {
    q: 'What are the critical components of successful SEO?',
    a: 'Optimized content on your website such as relevant keywords, meta tags optimization, and quality content — plus off-page work including link building, technical optimization such as site speed and mobile-friendliness, and continuous monitoring and adjustments according to analytics for sustained success.',
  },
  {
    q: 'Does my website guarantee #1 rankings in Google?',
    a: 'No SEO company can ever promise #1 rankings in Google. Algorithms of search engines are complex and constantly evolving. Many other factors like competitors and content quality influence rankings. However, an efficient SEO strategy will significantly enhance your search rankings and visibility over time.',
  },
  {
    q: 'What is the difference between local SEO and general SEO?',
    a: 'Local SEO is space-centric, using tactics like optimization of your Google My Business listing, obtaining local citations, and gathering local reviews. This is crucial for businesses that service clients based in a specific area. General SEO targets a much bigger, global, open-range audience.',
  },
];

/* ── Sub-components ──────────────────────────────────────── */
interface ManagedCardProps {
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  color: string;
  index: number;
  onEnquiry: () => void;
}

function ManagedCard({ icon: Icon, title, desc, color, onEnquiry }: ManagedCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`seo-managed-card${flipped ? ' seo-managed-card--flipped' : ''}`}
      style={{ '--seo-card-color': color } as React.CSSProperties}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="seo-managed-card__inner">
        {/* Front */}
        <div className="seo-managed-card__front">
          <div className="seo-managed-card__icon">
            <Icon size={28} />
          </div>
          <h3 className="seo-managed-card__title">{title}</h3>
          <span className="seo-managed-card__hint">Tap to learn more</span>
        </div>
        {/* Back */}
        <div className="seo-managed-card__back">
          <h3 className="seo-managed-card__back-title">{title}</h3>
          <p className="seo-managed-card__desc">{desc}</p>
          <button
            className="seo-managed-card__cta"
            onClick={e => { e.stopPropagation(); onEnquiry(); }}
          >
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </div>
      {/* Flat mobile view */}
      <div className="seo-managed-card__flat">
        <div className="seo-managed-card__flat-icon"><Icon size={24} /></div>
        <div>
          <h3 className="seo-managed-card__flat-title">{title}</h3>
          <p className="seo-managed-card__flat-desc">{desc}</p>
          <button className="seo-managed-card__cta" onClick={e => { e.stopPropagation(); onEnquiry(); }}>
            Get Started <ArrowRight size={14} />
          </button>
        </div>
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

/* ── SEO Graph Visual ────────────────────────────────────── */
function SeoGraphVisual() {
  return (
    <div className="svc-graph" aria-hidden="true">
      <svg
        viewBox="0 0 400 160"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[40, 80, 120].map((y) => (
          <line key={y} x1="24" y1={y} x2="376" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* Area fill */}
        <path
          d="M24,140 C60,140 80,120 100,110 C130,95 150,90 180,75 C210,58 240,50 270,35 C300,22 330,20 376,18 L376,140 Z"
          fill="rgba(0, 212, 170, 0.08)"
        />
        {/* Main line */}
        <path
          className="svc-graph__path"
          d="M24,140 C60,140 80,120 100,110 C130,95 150,90 180,75 C210,58 240,50 270,35 C300,22 330,20 376,18"
          fill="none"
          stroke="#00d4aa"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Dot at end */}
        <circle cx="376" cy="18" r="5" fill="#00d4aa" opacity="0" style={{ animation: 'svc-graph-draw 0.1s ease forwards 2.4s' }}>
          <animate attributeName="opacity" from="0" to="1" begin="2.4s" dur="0.2s" fill="freeze" />
        </circle>
      </svg>
      {/* Axis labels */}
      <div style={{ position: 'absolute', bottom: 8, left: 24, right: 24, display: 'flex', justifyContent: 'space-between' }}>
        {['Month 1', 'Month 3', 'Month 6', 'Month 9', 'Month 12'].map((l) => (
          <span key={l} style={{ fontSize: '0.62rem', color: 'var(--color-muted)' }}>{l}</span>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 8, right: 12, fontSize: '0.65rem', color: '#00d4aa', fontWeight: 600 }}>
        Organic Traffic Growth
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function SEO() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo('.seo-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.seo-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5,  ease: 'power3.out' });
        gsap.fromTo('.seo-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7,  ease: 'power3.out' });
        gsap.fromTo('.seo-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.seo-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.seo-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        // Proven stats
        gsap.fromTo(
          '.seo-proven-stat',
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.seo-proven', start: 'top 80%' },
          }
        );
        gsap.fromTo(
          '.seo-proven__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-proven', start: 'top 80%' },
          }
        );

        // Power of organic section
        gsap.fromTo(
          '.seo-power__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-power', start: 'top 80%' },
          }
        );
        gsap.fromTo(
          '.seo-power__graph',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-power', start: 'top 80%' },
          }
        );

        // Keyword bubbles
        gsap.fromTo(
          '.svc-keyword-bubble',
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.seo-keywords', start: 'top 80%' },
          }
        );

        // Key features
        gsap.fromTo(
          '.seo-feature-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-features-grid', start: 'top 80%' },
          }
        );

        // Services
        gsap.fromTo(
          '.seo-services-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-services-grid', start: 'top 80%' },
          }
        );

        // Managed services cards
        gsap.fromTo(
          '.seo-managed-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-managed-grid', start: 'top 80%' },
          }
        );

        // Process
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-process', start: 'top 80%' },
          }
        );

        // Tools pills
        gsap.fromTo(
          '.seo-tools .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.seo-tools', start: 'top 80%' },
          }
        );

        // Benefits
        gsap.fromTo(
          '.seo-benefit-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-benefits-grid', start: 'top 80%' },
          }
        );

        // Results
        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.seo-results', start: 'top 80%' },
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
      <section id="seo-hero" className="svc-hero" aria-labelledby="seo-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#0099aa' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#00d4aa' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag seo-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Search Engine Optimisation
              </span>
              <h1 id="seo-h1-el" className="svc-hero__h1 seo-h1">
                Drive Traffic and Leads with{' '}
                <span className="text-gradient">Jaipur's Best SEO Company</span>
              </h1>
              <p className="svc-hero__sub seo-sub">
                Skyrocket your website to the top of search results! Our expert SEO services
                ensure higher visibility, increased traffic, and long-term business growth.
              </p>
              <div className="svc-hero__actions seo-actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  Get a Free SEO Audit <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
                  See Our Results
                </button>
              </div>
              <div className="svc-hero__stats seo-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">350+</span>
                  <span className="svc-stat-card__label">Clients Served</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">10X</span>
                  <span className="svc-stat-card__label">Sales Boosted</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">50+</span>
                  <span className="svc-stat-card__label">SEO Professionals</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual seo-visual" aria-hidden="true">
              {/* Animated keyword bubbles */}
              <div className="svc-keyword-cloud seo-keywords" style={{ padding: '1rem' }}>
                {keywords.map((kw) => (
                  <span key={kw} className="svc-keyword-bubble">{kw}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proven Results ────────────────────────────────── */}
      <section id="seo-proven" className="svc-section seo-proven" aria-labelledby="seo-proven-h2">
        <div className="container">
          <div className="seo-proven__inner">
            <div className="seo-proven__text">
              <span className="tag">Proven Results</span>
              <h2 id="seo-proven-h2">Proven Results by Top SEO Experts</h2>
              <p>
                We've provided the Best SEO Services in Jaipur to over 350+ clients, helping
                them boost their sales by 10x! As the best SEO company in Jaipur, we are
                committed to your success. Our team of skilled, creative, and driven
                professionals works tirelessly to ensure your brand achieves top rankings
                and sustainable growth.
              </p>
              <button onClick={openEnquiry} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Let's Connect <ArrowRight size={16} />
              </button>
            </div>
            <div className="seo-proven__stats">
              {provenStats.map((s) => (
                <div key={s.label} className="seo-proven-stat">
                  <span className="seo-proven-stat__num">{s.num}</span>
                  <span className="seo-proven-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Power of Organic ──────────────────────────────── */}
      <section id="power-of-organic-seo" className="svc-section svc-section--alt seo-power" aria-labelledby="seo-power-h2">
        <div className="container">
          <div className="svc-intro">
            <div className="svc-intro__text seo-power__text">
              <span className="tag">Why SEO Matters</span>
              <h2 id="seo-power-h2">Skyrocket Your Business to Google's First Page</h2>
              <p>
                Our expert SEO services in Jaipur are designed to help your business achieve
                top rankings on Google. With a team of 50+ seasoned professionals, we employ
                cutting-edge strategies and proven techniques to ensure your website stands
                out in the crowded digital landscape. Over the years, we have helped over
                350+ businesses improve their online presence and achieve better rankings on
                SERPs resulting in higher online visibility.
              </p>
              <p>
                Whether you are operating a small shop, restaurant, a small business, an
                ecommerce company, or operating an international business, The Cogent holds
                your hand and offers top notch SEO services. Our trained SEO professionals
                use only legal, white hat SEO solutions that will yield long-term results.
              </p>
              <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { icon: TrendingUp, text: '53% of traffic is organic' },
                  { icon: Shield,     text: 'Long-term sustainable growth' },
                  { icon: Users,      text: 'Higher quality leads' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-2)' }}>
                    <Icon size={16} color={COLOR} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="svc-intro__visual">
              <div style={{ width: '100%' }} className="seo-power__graph">
                <SeoGraphVisual />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Features ──────────────────────────────────── */}
      <section id="seo-key-features" className="svc-section seo-key-features" aria-labelledby="seo-features-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Offer</span>
            <h2 id="seo-features-h2">Key Features of Our Comprehensive SEO Services Package</h2>
            <p>Every dimension of SEO — technical, content, authority — covered under one roof.</p>
          </div>
          <div className="seo-features-grid">
            {keyFeatures.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="seo-feature-card">
                <div className="seo-feature-card__icon">
                  <Icon size={22} />
                </div>
                <h3 className="seo-feature-card__title">{title}</h3>
                <p className="seo-feature-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Services ──────────────────────────────────── */}
      <section id="seo-services" className="svc-section svc-section--alt" aria-labelledby="seo-services-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Do</span>
            <h2 id="seo-services-h2">Comprehensive SEO Services</h2>
            <p>Every dimension of SEO — technical, content, authority — covered under one roof.</p>
          </div>
          <div className="svc-grid-6 seo-services-grid">
            {seoServices.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Managed SEO Services ──────────────────────────── */}
      <section id="seo-managed" className="svc-section" aria-labelledby="seo-managed-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Managed Services</span>
            <h2 id="seo-managed-h2">Our Managed SEO Services</h2>
            <p>We offer our clients the best possible services to improve their online visibility and increase sales.</p>
          </div>
          <div className="seo-managed-grid">
            {managedServices.map((s, i) => (
              <ManagedCard key={s.title} {...s} index={i} onEnquiry={openEnquiry} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={openEnquiry} className="btn btn-primary">
              Let's Talk About Your SEO <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────── */}
      <section id="seo-methodology" className="svc-section svc-section--alt" aria-labelledby="seo-method-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Approach</span>
            <h2 id="seo-method-h2">Our Step By Step Working Process</h2>
            <p>A structured 4-phase approach that delivers predictable, scalable ranking improvements.</p>
          </div>
          <div className="svc-process seo-process">
            {steps.map((step, i) => (
              <React.Fragment key={step.num}>
                <div className="svc-process__step">
                  <div className="svc-process__num">{step.num}</div>
                  <h3 className="svc-process__title">{step.title}</h3>
                  <p className="svc-process__desc">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="svc-process__connector" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ─────────────────────────────────────────── */}
      <section id="seo-tools" className="svc-section svc-section--dark seo-tools" aria-labelledby="seo-tools-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Toolkit</span>
            <h2 id="seo-tools-h2">SEO Tools We Use</h2>
            <p>
              Industry-leading platforms and proprietary processes to audit, track, and optimise
              your search presence.
            </p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {tools.map((t) => (
              <span key={t} className="svc-pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────── */}
      <section id="seo-benefits" className="svc-section seo-benefits" aria-labelledby="seo-benefits-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Why SEO</span>
            <h2 id="seo-benefits-h2">Benefits of SEO Services from an SEO Expert in Jaipur</h2>
            <p>Long-term advantages that compound over time and deliver real business impact.</p>
          </div>
          <div className="seo-benefits-grid">
            {seoBenefits.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="seo-benefit-card">
                <div className="seo-benefit-card__icon">
                  <Icon size={24} />
                </div>
                <h3 className="seo-benefit-card__title">{title}</h3>
                <p className="seo-benefit-card__desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="seo-results" className="svc-section svc-section--alt seo-results" aria-labelledby="seo-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Proven Impact</span>
            <h2 id="seo-results-h2">Organic Growth Stories</h2>
            <p>Results we've delivered for businesses across industries and competitive landscapes.</p>
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
      <section id="seo-faq" className="svc-section" aria-labelledby="seo-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="seo-faq-h2">SEO Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Work Showcase ────────────────────────────────── */}
      <SeoShowcase />

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="seo-cta" className="svc-section svc-cta svc-cta--seo" aria-labelledby="seo-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="seo-cta-h2" className="svc-cta__title">
            Ready to Take Your Website{' '}
            <span className="text-gradient">to the Top</span>
          </h2>
          <p className="svc-cta__sub">
            Get a free SEO audit and competitive analysis — we'll show you exactly where
            your biggest organic growth opportunities are hiding.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry} className="btn btn-primary">
              Get Your Free SEO Audit <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry} className="btn btn-outline">
              Talk to an SEO Expert
            </button>
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

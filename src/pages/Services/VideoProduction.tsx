import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Film,
  Smartphone,
  Package,
  Lightbulb,
  Star,
  Megaphone,
  Briefcase,
  Camera,
  Zap,
  TrendingUp,
  Clock,
  ArrowRight,
  Plus,
} from 'lucide-react';
import VideoShowcase from '../../components/VideoShowcase/VideoShowcase';
import type { VideoItem } from '../../components/VideoShowcase/VideoShowcase';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './ServicePage.css';

// ── Vite asset imports — actual project work ──────────────
import ugc1   from '../../assets/ugc_videos/Ugc 1.mp4';
import ugc3   from '../../assets/ugc_videos/Ugc 3.mp4';
import ugc4   from '../../assets/ugc_videos/Ugc 4.mp4';
import ugc5   from '../../assets/ugc_videos/Ugc 5.mp4';
import ugc6   from '../../assets/ugc_videos/Ugc 6.mp4';
import ugc7   from '../../assets/ugc_videos/Ugc 7.mp4';
import ai1    from '../../assets/ai_viideos/AI 1.mp4';
import ai2    from '../../assets/ai_viideos/AI 2.mp4';
import doc1   from '../../assets/documentry_ads/Documentry 1.mp4';
import jwl1   from '../../assets/jewellery/Jewellery 1.mp4';
import jwl2   from '../../assets/jewellery/Jewellery 2.mp4';
import jwl3   from '../../assets/jewellery/Jewellery 3.mp4';
import jwl4   from '../../assets/jewellery/Jewellery 4.mp4';
import jwl5   from '../../assets/jewellery/Jewellery 5.mp4';
import lead1  from '../../assets/lead_ads/Lead 1.mp4';
import lead2  from '../../assets/lead_ads/Lead 2.mp4';
import lead3  from '../../assets/lead_ads/Lead 3.mp4';
import life1  from '../../assets/lifestyle_ads/Lifestyle 1.mp4';
import life2  from '../../assets/lifestyle_ads/Lifestyle 2.mp4';
import life3  from '../../assets/lifestyle_ads/Lifestyle 3.mp4';
import tvc1   from '../../assets/tvc/Tvc 1.mp4';
import tvc2   from '../../assets/tvc/Tvc 2.mp4';
import vert1  from '../../assets/vertical_ads/Vertical 1.mp4';
import vert2  from '../../assets/vertical_ads/Vertical 2.mp4';

const videoItems: VideoItem[] = [
  // ── UGC Videos ──────────────────────────────────────────
  {
    id: 'ugc-1',
    title: 'UGC Ad — Authentic Creator Content',
    client: 'Brand Campaign',
    category: 'UGC',
    campaignNote: 'User-generated style content for social performance',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #4a1020 40%, #cc3344 100%)',
    accentColor: '#ff6b6b',
    tags: ['UGC', 'Social', 'Creator'],
    src: ugc1,
  },
  {
    id: 'ugc-3',
    title: 'UGC Ad — Product Review Style',
    client: 'Brand Campaign',
    category: 'UGC',
    campaignNote: 'Organic-looking product content for paid social',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #4a1020 40%, #cc3344 100%)',
    accentColor: '#ff6b6b',
    tags: ['UGC', 'Product', 'Instagram'],
    src: ugc3,
  },
  {
    id: 'ugc-4',
    title: 'UGC Ad — Lifestyle Hook',
    client: 'Brand Campaign',
    category: 'UGC',
    campaignNote: 'Hook-driven UGC content for Meta ads',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #4a1020 40%, #cc3344 100%)',
    accentColor: '#ff6b6b',
    tags: ['UGC', 'Meta Ads', 'Hook'],
    src: ugc4,
  },
  {
    id: 'ugc-5',
    title: 'UGC Ad — Testimonial Cut',
    client: 'Brand Campaign',
    category: 'UGC',
    campaignNote: 'Social proof-driven creator testimonial',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #4a1020 40%, #cc3344 100%)',
    accentColor: '#ff6b6b',
    tags: ['UGC', 'Testimonial', 'Social Proof'],
    src: ugc5,
  },
  {
    id: 'ugc-6',
    title: 'UGC Ad — Unboxing Experience',
    client: 'Brand Campaign',
    category: 'UGC',
    campaignNote: 'Unboxing-style UGC for D2C brand awareness',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #4a1020 40%, #cc3344 100%)',
    accentColor: '#ff6b6b',
    tags: ['UGC', 'Unboxing', 'D2C'],
    src: ugc6,
  },
  {
    id: 'ugc-7',
    title: 'UGC Ad — Before & After',
    client: 'Brand Campaign',
    category: 'UGC',
    campaignNote: 'Transformation-style UGC for conversion campaigns',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #4a1020 40%, #cc3344 100%)',
    accentColor: '#ff6b6b',
    tags: ['UGC', 'Transformation', 'Conversion'],
    src: ugc7,
  },
  // ── AI Videos ───────────────────────────────────────────
  {
    id: 'ai-1',
    title: 'AI Brand Film — Futuristic Visual',
    client: 'AI-Generated Production',
    category: 'AI Video',
    campaignNote: 'AI-augmented cinematic brand content',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0f0a1a 0%, #281045 40%, #5a2aaa 100%)',
    accentColor: '#a855f7',
    tags: ['AI Video', 'Brand Film', 'Generative'],
    src: ai1,
  },
  {
    id: 'ai-2',
    title: 'AI Ad Creative — Motion Design',
    client: 'AI-Generated Production',
    category: 'AI Video',
    campaignNote: 'AI-powered motion design for digital ads',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0f0a1a 0%, #281045 40%, #5a2aaa 100%)',
    accentColor: '#a855f7',
    tags: ['AI Video', 'Motion Design', 'Digital Ads'],
    src: ai2,
  },
  // ── Documentary Ad ──────────────────────────────────────
  {
    id: 'doc-1',
    title: 'Documentary Ad — Brand Story',
    client: 'Documentary Production',
    category: 'Documentary',
    campaignNote: 'Long-form brand documentary for awareness campaigns',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a0f0a 0%, #1a2c18 40%, #2a5c3a 100%)',
    accentColor: '#00d4aa',
    tags: ['Documentary', 'Brand Story', 'Long-Form'],
    src: doc1,
  },
  // ── Jewellery Videos ────────────────────────────────────
  {
    id: 'jwl-1',
    title: 'Jewellery — Cinematic Product Film',
    client: 'Jewellery Brand',
    category: 'Jewellery',
    campaignNote: 'Luxury jewellery cinematic showcase',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #4a3000 40%, #c8a44a 100%)',
    accentColor: '#f0c040',
    tags: ['Jewellery', 'Luxury', 'Cinematic', 'Product'],
    src: jwl1,
  },
  {
    id: 'jwl-2',
    title: 'Jewellery — Lifestyle Collection Ad',
    client: 'Jewellery Brand',
    category: 'Jewellery',
    campaignNote: 'Lifestyle-driven jewellery collection campaign',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #4a3000 40%, #c8a44a 100%)',
    accentColor: '#f0c040',
    tags: ['Jewellery', 'Lifestyle', 'Collection'],
    src: jwl2,
  },
  {
    id: 'jwl-3',
    title: 'Jewellery — Bridal Campaign Film',
    client: 'Jewellery Brand',
    category: 'Jewellery',
    campaignNote: 'Bridal jewellery aspirational brand film',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #4a3000 40%, #c8a44a 100%)',
    accentColor: '#f0c040',
    tags: ['Jewellery', 'Bridal', 'Brand Film'],
    src: jwl3,
  },
  {
    id: 'jwl-4',
    title: 'Jewellery — Close-Up Product Reel',
    client: 'Jewellery Brand',
    category: 'Jewellery',
    campaignNote: 'Macro close-up product reel for social media',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #4a3000 40%, #c8a44a 100%)',
    accentColor: '#f0c040',
    tags: ['Jewellery', 'Macro', 'Social Reel'],
    src: jwl4,
  },
  {
    id: 'jwl-5',
    title: 'Jewellery — Heritage Collection',
    client: 'Jewellery Brand',
    category: 'Jewellery',
    campaignNote: 'Heritage & tradition storytelling for jewellery',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a1000 0%, #4a3000 40%, #c8a44a 100%)',
    accentColor: '#f0c040',
    tags: ['Jewellery', 'Heritage', 'Storytelling'],
    src: jwl5,
  },
  // ── Lead Ads ────────────────────────────────────────────
  {
    id: 'lead-1',
    title: 'Lead Gen Ad — High-Conversion Hook',
    client: 'Performance Campaign',
    category: 'Lead Ad',
    campaignNote: 'Direct-response lead generation video ad',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a0f1a 0%, #0d2545 40%, #1a5a9a 100%)',
    accentColor: '#4da6ff',
    tags: ['Lead Gen', 'Performance', 'Direct Response'],
    src: lead1,
  },
  {
    id: 'lead-2',
    title: 'Lead Gen Ad — Problem-Solution Format',
    client: 'Performance Campaign',
    category: 'Lead Ad',
    campaignNote: 'Problem-solution structured ad for lead capture',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a0f1a 0%, #0d2545 40%, #1a5a9a 100%)',
    accentColor: '#4da6ff',
    tags: ['Lead Gen', 'Problem-Solution', 'Meta Ads'],
    src: lead2,
  },
  {
    id: 'lead-3',
    title: 'Lead Gen Ad — Urgency & CTA',
    client: 'Performance Campaign',
    category: 'Lead Ad',
    campaignNote: 'Urgency-driven CTA video for lead campaigns',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a0f1a 0%, #0d2545 40%, #1a5a9a 100%)',
    accentColor: '#4da6ff',
    tags: ['Lead Gen', 'CTA', 'Urgency'],
    src: lead3,
  },
  // ── Lifestyle Ads ────────────────────────────────────────
  {
    id: 'life-1',
    title: 'Lifestyle Ad — Brand Aspiration',
    client: 'Lifestyle Brand',
    category: 'Lifestyle',
    campaignNote: 'Aspirational lifestyle content for brand building',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a1205 0%, #1a3410 40%, #2d6b1a 100%)',
    accentColor: '#5dd65a',
    tags: ['Lifestyle', 'Aspirational', 'Brand Building'],
    src: life1,
  },
  {
    id: 'life-2',
    title: 'Lifestyle Ad — Product in Use',
    client: 'Lifestyle Brand',
    category: 'Lifestyle',
    campaignNote: 'Lifestyle integration for product awareness',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a1205 0%, #1a3410 40%, #2d6b1a 100%)',
    accentColor: '#5dd65a',
    tags: ['Lifestyle', 'Product', 'Awareness'],
    src: life2,
  },
  {
    id: 'life-3',
    title: 'Lifestyle Ad — Seasonal Campaign',
    client: 'Lifestyle Brand',
    category: 'Lifestyle',
    campaignNote: 'Seasonal lifestyle campaign for social channels',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0a1205 0%, #1a3410 40%, #2d6b1a 100%)',
    accentColor: '#5dd65a',
    tags: ['Lifestyle', 'Seasonal', 'Social'],
    src: life3,
  },
  // ── TVC ─────────────────────────────────────────────────
  {
    id: 'tvc-1',
    title: 'TVC — Television Commercial',
    client: 'Broadcast Production',
    category: 'TVC',
    campaignNote: 'Full production TVC for broadcast & OTT',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a10 0%, #3a1530 40%, #8b3060 100%)',
    accentColor: '#e040a0',
    tags: ['TVC', 'Broadcast', 'OTT', 'Full Production'],
    src: tvc1,
  },
  {
    id: 'tvc-2',
    title: 'TVC — Brand Commercial',
    client: 'Broadcast Production',
    category: 'TVC',
    campaignNote: 'Brand-led television commercial production',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #1a0a10 0%, #3a1530 40%, #8b3060 100%)',
    accentColor: '#e040a0',
    tags: ['TVC', 'Brand', 'Television', 'Commercial'],
    src: tvc2,
  },
  // ── Vertical Ads ─────────────────────────────────────────
  {
    id: 'vert-1',
    title: 'Vertical Ad — Reels & Shorts',
    client: 'Social Performance',
    category: 'Social Reel',
    campaignNote: 'Vertical-format ad for Instagram Reels & YouTube Shorts',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0f0a1a 0%, #281045 40%, #5a2aaa 100%)',
    accentColor: '#a855f7',
    tags: ['Vertical', 'Reels', 'Shorts', 'Social'],
    src: vert1,
  },
  {
    id: 'vert-2',
    title: 'Vertical Ad — Story Format',
    client: 'Social Performance',
    category: 'Social Reel',
    campaignNote: 'Story-format vertical ad for Stories & TikTok',
    views: '—',
    duration: '—',
    gradient: 'linear-gradient(135deg, #0f0a1a 0%, #281045 40%, #5a2aaa 100%)',
    accentColor: '#a855f7',
    tags: ['Vertical', 'Stories', 'TikTok', 'Social'],
    src: vert2,
  },
];

/* ── Constants ───────────────────────────────────────────── */
const COLOR = '#ff6b6b';
const GRADIENT = 'linear-gradient(135deg, #ff6b6b, #cc3344)';

const videoTypes = [
  {
    icon: Film,
    title: 'Brand Films',
    desc: 'Cinematic brand stories that define your identity and create lasting emotional impressions.',
  },
  {
    icon: Smartphone,
    title: 'Social Reels',
    desc: 'Short-form vertical content engineered for maximum engagement on Instagram, TikTok, and YouTube Shorts.',
  },
  {
    icon: Package,
    title: 'Product Demo',
    desc: 'High-impact product showcase videos that highlight features and drive purchase decisions.',
  },
  {
    icon: Lightbulb,
    title: 'Explainer Videos',
    desc: 'Clear, engaging animations and live-action videos that simplify complex products or services.',
  },
  {
    icon: Star,
    title: 'Testimonial Videos',
    desc: 'Authentic customer stories and case study films that build trust and social proof.',
  },
  {
    icon: Megaphone,
    title: 'Ad Creatives',
    desc: 'Performance-optimised video ads designed for paid media — built to stop the scroll and convert.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Videos',
    desc: 'Professional internal and external corporate communications, training, and employer branding content.',
  },
  {
    icon: Camera,
    title: 'Documentary',
    desc: 'Long-form documentary content that tells deep brand and human stories across OTT and social platforms.',
  },
];

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We align on goals, audience, tone, and key messages through a detailed creative brief.',
  },
  {
    num: '02',
    title: 'Scripting',
    desc: 'Our writers craft compelling scripts with clear narrative arcs, CTAs, and platform-specific hooks.',
  },
  {
    num: '03',
    title: 'Pre-Production',
    desc: 'Location scouting, casting, storyboarding, shot lists, and logistics — every detail locked in.',
  },
  {
    num: '04',
    title: 'Shoot',
    desc: 'Production day with our crew — 4K cameras, lighting rigs, directorial oversight, and quality control.',
  },
  {
    num: '05',
    title: 'Post-Production',
    desc: 'Editing, colour grading, motion graphics, sound design, and final delivery in all required formats.',
  },
];

const capabilities = [
  '4K RED Camera',
  'Drone Footage',
  'Studio Setup',
  'Color Grading',
  'Motion Graphics',
  'Sound Design',
  'Voice-Over',
  'Subtitle & CC',
  '3D Animation',
  'Green Screen',
  'Live Streaming',
  'Multi-Cam Shoots',
];

const statCallouts = [
  {
    icon: TrendingUp,
    num: '80%',
    label: 'of internet traffic is video',
    desc: 'By 2027, video will account for 82% of all consumer internet traffic globally.',
  },
  {
    icon: Zap,
    num: '6×',
    label: 'more conversions with video',
    desc: 'Landing pages with video convert up to 6× better than those without any visual content.',
  },
  {
    icon: Clock,
    num: '3 min',
    label: 'average branded watch time',
    desc: 'Viewers spend 3× longer on pages with video, dramatically increasing engagement signals.',
  },
];

const portfolioItems = [
  {
    label: 'Brand Film — FinTech Startup',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #cc3344 100%)',
  },
  {
    label: 'Product Launch — Consumer Electronics',
    gradient: 'linear-gradient(135deg, #cc3344 0%, #7c0a2a 100%)',
  },
  {
    label: 'Social Campaign — D2C Beauty Brand',
    gradient: 'linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%)',
  },
];

const results = [
  {
    metric: '4.8M',
    detail: 'Organic views on a single brand film in 30 days',
    client: 'NovaSkin Beauty',
    industry: 'D2C / Beauty',
  },
  {
    metric: '340%',
    detail: 'Increase in product page conversion rate',
    client: 'GadgetZone',
    industry: 'Consumer Electronics',
  },
  {
    metric: '₹12Cr',
    detail: 'Revenue attributed to video ad campaigns',
    client: 'FitLife App',
    industry: 'Health & Fitness',
  },
];

const faqs = [
  {
    q: 'What types of video content do you produce?',
    a: "We produce the full spectrum — brand films, social reels, product demos, explainer videos, testimonials, ad creatives, corporate communications, and documentary-style content. Each format is crafted for a specific business goal and distribution platform.",
  },
  {
    q: 'How long does the video production process take?',
    a: "Timelines vary by complexity. A social reel can be turned around in 5–7 days. A full brand film typically takes 3–6 weeks from brief to final delivery. We provide a detailed production schedule at the start of every project.",
  },
  {
    q: 'Do you handle the entire production in-house?',
    a: "Yes. We manage everything from scripting and pre-production logistics to the shoot day and post-production — editing, colour, sound, and motion graphics. You work with one team from start to finish.",
  },
  {
    q: 'What video formats and resolutions do you deliver?',
    a: "We shoot in 4K and deliver in all required formats: landscape (16:9), square (1:1), vertical (9:16), and cinematic (2.39:1). Files are provided in formats optimised for web, social, broadcast, and OTT platforms.",
  },
  {
    q: 'Can you create animated or motion graphics videos?',
    a: "Absolutely. Our motion graphics team creates 2D animations, kinetic typography, and data visualisation videos. We also produce explainer videos with custom illustration and voice-over in multiple languages.",
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

/* ── Video Hero Visual ───────────────────────────────────── */
function VideoHeroVisual() {
  return (
    <div className="vp-hero-visual" aria-hidden="true">
      {/* Main player card */}
      <div className="vp-player">
        <div className="vp-player__screen">
          <div className="vp-player__gradient" />
          {/* Animated scan line */}
          <div className="vp-player__scanline" />
          {/* Play button */}
          <div className="vp-player__play">
            <div className="vp-player__play-ring vp-player__play-ring--1" />
            <div className="vp-player__play-ring vp-player__play-ring--2" />
            <span className="vp-player__play-icon">▶</span>
          </div>
          {/* Duration badge */}
          <div className="vp-player__duration">2:47</div>
          {/* Quality badge */}
          <div className="vp-player__quality">4K</div>
        </div>
        {/* Progress bar */}
        <div className="vp-player__controls">
          <div className="vp-player__bar">
            <div className="vp-player__bar-fill" />
          </div>
          <div className="vp-player__ctrl-row">
            <span className="vp-player__ctrl-dot" />
            <span className="vp-player__ctrl-dot" />
            <span className="vp-player__ctrl-dot" />
          </div>
        </div>
      </div>

      {/* Floating stat chips */}
      <div className="vp-chip vp-chip--views">
        <span className="vp-chip__dot" style={{ background: '#ff6b6b' }} />
        <span>4.8M Views</span>
      </div>
      <div className="vp-chip vp-chip--rating">
        <span style={{ color: '#f59e0b' }}>★★★★★</span>
        <span>Client Rated</span>
      </div>
      <div className="vp-chip vp-chip--live">
        <span className="vp-chip__live-dot" />
        <span>LIVE</span>
      </div>

      {/* Thumbnail strip below */}
      <div className="vp-thumb-strip">
        {['#ff6b6b','#cc3344','#ff8e53','#7c0a2a','#ff6b6b'].map((c, i) => (
          <div key={i} className={`vp-thumb${i === 1 ? ' vp-thumb--active' : ''}`}
            style={{ background: `linear-gradient(135deg, ${c}, rgba(0,0,0,0.5))` }} />
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function VideoProduction() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo('.vp-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.vp-h1',      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.vp-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
        gsap.fromTo('.vp-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.85, ease: 'power3.out' });
        gsap.fromTo('.vp-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
        gsap.fromTo('.vp-visual',  { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.9, delay: 0.6,  ease: 'power3.out' });

        // Stat callouts
        gsap.fromTo(
          '.svc-stat-callout',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.vp-why', start: 'top 80%' },
          }
        );

        // Cards
        gsap.fromTo(
          '.vp-types-grid .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.vp-types-grid', start: 'top 80%' },
          }
        );

        // Process
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out',
            scrollTrigger: { trigger: '.vp-process', start: 'top 80%' },
          }
        );

        // Pills
        gsap.fromTo(
          '.vp-caps .svc-pill',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: '.vp-caps', start: 'top 80%' },
          }
        );

        // Portfolio
        gsap.fromTo(
          '.svc-video-thumb',
          { opacity: 0, scale: 0.93 },
          {
            opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.vp-portfolio-grid', start: 'top 80%' },
          }
        );

        // Results
        gsap.fromTo(
          '.svc-result-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.vp-results', start: 'top 80%' },
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
      <section id="video-production-hero" className="svc-hero" aria-labelledby="vp-h1-el">
        <div className="svc-orb svc-orb--1" style={{ background: COLOR }} />
        <div className="svc-orb svc-orb--2" style={{ background: '#cc3344' }} />
        <div className="svc-orb svc-orb--3" style={{ background: '#ff8e53' }} />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span className="svc-hero__tag vp-tag" style={{ color: COLOR, borderColor: COLOR }}>
                Video Production
              </span>
              <h1 id="vp-h1-el" className="svc-hero__h1 vp-h1">
                Video That Stops the Scroll{' '}
                <span className="text-gradient">&amp; Drives Action</span>
              </h1>
              <p className="svc-hero__sub vp-sub">
                From cinematic brand films to scroll-stopping social reels — we craft
                video content that captivates audiences and converts viewers into
                customers.
              </p>
              <div className="svc-hero__actions vp-actions">
                <button onClick={openEnquiry}  className="btn btn-primary">
                  Start Your Video Project <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry}  className="btn btn-outline">
                  View Showreel
                </button>
              </div>
              <div className="svc-hero__stats vp-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">500+</span>
                  <span className="svc-stat-card__label">Videos Produced</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">100M+</span>
                  <span className="svc-stat-card__label">Views Generated</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">98%</span>
                  <span className="svc-stat-card__label">Client Retention Rate</span>
                </div>
              </div>
            </div>

            <div className="svc-hero__visual vp-visual" aria-hidden="true">
              <VideoHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Video Wins ────────────────────────────────── */}
      <section id="why-video-marketing" className="svc-section vp-why" aria-labelledby="vp-why-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">The Case for Video</span>
            <h2 id="vp-why-h2">Why Video Wins Every Time</h2>
            <p>The numbers are undeniable — video is the highest-performing content format across every digital channel.</p>
          </div>
          <div className="svc-stat-callouts">
            {statCallouts.map(({ icon: Icon, num, label, desc }) => (
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

      {/* ── Video Showcase ───────────────────────────────── */}
      <VideoShowcase items={videoItems} />

      {/* ── Video Types ───────────────────────────────────── */}
      <section id="video-production-types" className="svc-section svc-section--alt" aria-labelledby="vp-types-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Create</span>
            <h2 id="vp-types-h2">Every Type of Video, Mastered</h2>
            <p>
              We produce 8 distinct video formats — each built for a specific goal,
              audience, and platform.
            </p>
          </div>
          <div className="svc-grid-6 vp-types-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {videoTypes.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Production Process ────────────────────────────── */}
      <section id="video-production-process" className="svc-section" aria-labelledby="vp-process-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How We Work</span>
            <h2 id="vp-process-h2">Our Production Process</h2>
            <p>A rigorous 5-stage process that ensures every video is on-brief, on-time, and on-budget.</p>
          </div>
          <div className="svc-process vp-process" style={{ justifyContent: 'center' }}>
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

      {/* ── Equipment & Capabilities ──────────────────────── */}
      <section id="video-production-capabilities" className="svc-section svc-section--dark vp-caps" aria-labelledby="vp-caps-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Arsenal</span>
            <h2 id="vp-caps-h2">Equipment &amp; Capabilities</h2>
            <p>Professional-grade tools and techniques for cinematic results at every budget.</p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {capabilities.map((c) => (
              <span key={c} className="svc-pill">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ─────────────────────────────────────── */}
      <section id="video-production-portfolio" className="svc-section" aria-labelledby="vp-portfolio-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Work</span>
            <h2 id="vp-portfolio-h2">Recent Productions</h2>
            <p>A glimpse of the stories we've brought to life for our clients.</p>
          </div>
          <div className="svc-video-grid vp-portfolio-grid">
            {portfolioItems.map(({ label, gradient }) => (
              <div key={label} className="svc-video-thumb">
                <div className="svc-video-thumb__bg" style={{ background: gradient }} />
                <div className="svc-video-thumb__play">
                  <div className="svc-video-thumb__play-btn" aria-label="Play video">
                    ▶
                  </div>
                </div>
                <div className="svc-video-thumb__label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────── */}
      <section id="video-production-results" className="svc-section svc-section--alt vp-results" aria-labelledby="vp-results-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Impact</span>
            <h2 id="vp-results-h2">Video That Moves the Needle</h2>
            <p>Real results from real video campaigns — measured in views, conversions, and revenue.</p>
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
      <section id="video-production-faq" className="svc-section" aria-labelledby="vp-faq-h2">
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="vp-faq-h2">Video Production Questions Answered</h2>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section id="video-production-cta" className="svc-section svc-cta svc-cta--vp" aria-labelledby="vp-cta-h2">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <span className="tag">Get Started</span>
          <h2 id="vp-cta-h2" className="svc-cta__title">
            Let's Tell <span className="text-gradient">Your Story</span>
          </h2>
          <p className="svc-cta__sub">
            Share your vision with us and we'll turn it into video content that
            resonates, converts, and endures.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry}  className="btn btn-primary">
              Start Your Project <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry}  className="btn btn-outline">
              Request a Quote
            </button>
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

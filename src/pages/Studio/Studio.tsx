import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  Mic,
  Camera,
  Film,
  Video,
  Users,
  Star,
  Zap,
  Monitor,
  Package,
  ArrowRight,
  Plus,
  CheckCircle,
  Play,
} from 'lucide-react';
import '../Services/ServicePage.css';
import './Studio.css';

/* ── Constants ──────────────────────────────────────────── */
const COLOR    = '#ff6b6b';
const GRADIENT = 'linear-gradient(135deg, #ff6b6b, #ff4444)';

/* ── Services ───────────────────────────────────────────── */
const studioServices = [
  {
    icon: Mic,
    title: 'Podcast Production',
    desc: 'Full-service podcast studio with acoustic treatment, Deity microphones, monitoring headphones, and post-production mixing. Record compelling audio-visual podcasts in our dedicated podcast booth.',
  },
  {
    icon: Camera,
    title: 'Studio Photography',
    desc: 'Professional photography studio with Aputure 600d Pro lights, seamless backdrops, and reflectors. Perfect for product photography, e-commerce shoots, portraits, and editorial campaigns.',
  },
  {
    icon: Film,
    title: 'Brand Films',
    desc: 'Cinematic brand storytelling with Sony FX6 and Blackmagic URSA Mini Pro 4.6K. We script, shoot, and edit brand films that capture your essence and connect emotionally with your audience.',
  },
  {
    icon: Package,
    title: 'Product Shoots',
    desc: 'Detailed product photography and videography for e-commerce, catalogues, and social media. Controlled studio environment ensures perfect lighting and consistent results across your product line.',
  },
  {
    icon: Users,
    title: 'Interview Shoots',
    desc: 'Multi-camera interview setups with teleprompter, professional lighting rigs, and broadcast-quality audio. Ideal for testimonials, thought leadership content, and documentary-style productions.',
  },
  {
    icon: Star,
    title: 'Behind-the-Scenes Content',
    desc: 'Authentic BTS content that humanises your brand. We capture raw moments, creative processes, and team culture in our studio environment to fuel your social media and marketing content.',
  },
  {
    icon: Zap,
    title: 'Reel & Short-Form Video',
    desc: 'Fast-turnaround reels and short-form video content optimised for Instagram, YouTube Shorts, and TikTok. High-energy, platform-native production that drives reach and engagement.',
  },
  {
    icon: Video,
    title: 'Corporate Video Production',
    desc: 'Professional corporate videos for investor presentations, internal communications, product launches, and training content. End-to-end production with scripting, shoot, and delivery.',
  },
];

/* ── Equipment ──────────────────────────────────────────── */
const equipment = [
  'Sony FX6 Cinema Camera',
  'Blackmagic URSA Mini Pro 4.6K',
  'Aputure 600d Pro Lights',
  'DJI Ronin 4D Gimbal',
  'Deity Microphones',
  'Acoustic Foam Treatment',
  '4K Monitor Walls',
  'Teleprompter Setup',
  'Seamless Paper Backdrops',
  'C-Stand Lighting Rigs',
  'Shotgun & Lapel Mics',
  'Professional Audio Interface',
];

/* ── Process Steps ──────────────────────────────────────── */
const processSteps = [
  {
    num: '01',
    title: 'Pre-Production Planning',
    desc: 'We align on your creative brief, script requirements, shot list, and production schedule. Moodboards, location scouting within studio, and talent briefing are all handled before shoot day.',
  },
  {
    num: '02',
    title: 'Studio Setup & Tech Check',
    desc: 'On the morning of your shoot, our crew sets up lighting, rigs cameras, calibrates audio, and runs a full technical check. Everything is tested and production-ready before you arrive.',
  },
  {
    num: '03',
    title: 'Production Day',
    desc: 'Directed by our creative team, your shoot runs efficiently and creatively. We capture all planned content plus b-roll, ensuring we have everything needed for a compelling edit.',
  },
  {
    num: '04',
    title: 'Post-Production & Delivery',
    desc: 'Our editors colour grade, mix audio, and craft your final cut with motion graphics and music. Deliverables are provided in all required formats within the agreed turnaround window.',
  },
];

/* ── Why Cogent Studio ──────────────────────────────────── */
const whyFeatures = [
  {
    icon: Monitor,
    title: 'Professional Grade Equipment',
    desc: 'Sony FX6 cinema cameras, Blackmagic URSA Mini Pro 4.6K, Aputure 600d Pro lights, DJI Ronin 4D gimbals, and a full acoustic treatment setup. Every piece of kit is maintained to broadcast standard.',
  },
  {
    icon: Users,
    title: 'Expert Creative Team',
    desc: 'Our in-house directors, DPs, sound engineers, and editors bring years of experience across brand films, documentaries, and commercial productions. Creative excellence on every project.',
  },
  {
    icon: Film,
    title: 'End-to-End Production',
    desc: 'From concept and scripting through shoot day to final delivery — we handle every stage of your production. One team, one studio, zero production chaos. Consistent quality guaranteed.',
  },
];

/* ── Showcase Portfolio ──────────────────────────────────── */
const showcaseItems = [
  {
    tag: 'Podcast Series',
    title: 'The Founders Mindset',
    sub: '12-Episode Run · Audio + Video',
    gradient: 'linear-gradient(145deg, #1c0808 0%, #3d1010 40%, #2a0a0a 100%)',
    accent: '#ff6b6b',
    index: '01',
    featured: true,
  },
  {
    tag: 'Brand Campaign',
    title: 'Product Launch Film',
    sub: 'D2C Fashion · 4K Production',
    gradient: 'linear-gradient(145deg, #08081c 0%, #151540 40%, #0a0a28 100%)',
    accent: '#6c63ff',
    index: '02',
    featured: false,
  },
  {
    tag: 'Product Shoot',
    title: 'E-Commerce Photography',
    sub: '200+ SKUs · Seamless Studio',
    gradient: 'linear-gradient(145deg, #081c0a 0%, #103518 40%, #081408 100%)',
    accent: '#00d4aa',
    index: '03',
    featured: false,
  },
  {
    tag: 'Corporate Video',
    title: 'Investor Presentation Film',
    sub: 'FinTech Series B · Scripted + Shot',
    gradient: 'linear-gradient(145deg, #1c1008 0%, #352210 40%, #1a1008 100%)',
    accent: '#f59e0b',
    index: '04',
    featured: false,
  },
  {
    tag: 'Interview Series',
    title: 'Leadership Thought Pieces',
    sub: '8 Executives · Multi-Camera',
    gradient: 'linear-gradient(145deg, #0a081c 0%, #181535 40%, #0c0a20 100%)',
    accent: '#a855f7',
    index: '05',
    featured: false,
  },
  {
    tag: 'Short-Form',
    title: 'Instagram Reel Campaign',
    sub: '24 Videos · 3-Day Studio Sprint',
    gradient: 'linear-gradient(145deg, #1c0812 0%, #351525 40%, #1a0810 100%)',
    accent: '#ec4899',
    index: '06',
    featured: false,
  },
];

/* ── FAQ ─────────────────────────────────────────────────── */
const faqs = [
  {
    q: 'How do I book the studio and what does the booking include?',
    a: 'Booking the Cogent Studio is simple — reach out via the enquiry form or call us directly. A studio booking includes full use of our equipment (cameras, lights, audio gear, backdrops), a dedicated studio manager on set, pre-production consultation, and basic post-production colour grading. Additional services like full editing, motion graphics, and scripting can be added to your package.',
  },
  {
    q: 'What is included in a standard studio day?',
    a: 'A standard studio day (8 hours) includes setup and breakdown time, access to all in-studio equipment, professional lighting configuration, multi-camera setup, teleprompter use, acoustic recording booth for audio-only sessions, and a studio manager. Crew (director, DP, sound engineer) can be added on request. We also provide refreshments and a green room for talent.',
  },
  {
    q: 'What is the typical turnaround time for post-production?',
    a: 'Turnaround depends on the scope of deliverables. For short-form reels and social content, we typically deliver within 3–5 business days. Brand films and longer corporate productions are delivered within 7–14 business days. Rush delivery is available for an additional fee. We always confirm expected delivery timelines before your shoot date.',
  },
  {
    q: 'Do you offer custom packages for ongoing content creation?',
    a: 'Absolutely. We work with brands on monthly retainer packages that include regular shoot days, consistent post-production, and a dedicated creative team that understands your brand deeply. Retainer clients get priority booking slots, discounted day rates, and faster turnaround. Contact us to design a content creation package that fits your budget and output goals.',
  },
];

/* ── FaqItem Component ───────────────────────────────────── */
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

/* ── Floor Plan Visual ───────────────────────────────────── */
function StudioFloorPlan() {
  return (
    <div className="studio-floor-plan" aria-hidden="true">
      <div className="studio-floor-plan__grid" />

      {/* Main studio floor */}
      <div
        className="studio-floor-plan__room"
        style={{ top: '10%', left: '8%', width: '55%', height: '50%' }}
      >
        <span className="studio-floor-plan__room-label">Main Studio Floor</span>
      </div>

      {/* Podcast booth */}
      <div
        className="studio-floor-plan__room"
        style={{ top: '10%', right: '5%', width: '28%', height: '30%' }}
      >
        <span className="studio-floor-plan__room-label">Podcast Booth</span>
      </div>

      {/* Green room */}
      <div
        className="studio-floor-plan__room"
        style={{ bottom: '8%', right: '5%', width: '28%', height: '28%' }}
      >
        <span className="studio-floor-plan__room-label">Green Room</span>
      </div>

      {/* Edit suite */}
      <div
        className="studio-floor-plan__room"
        style={{ bottom: '8%', left: '8%', width: '30%', height: '28%' }}
      >
        <span className="studio-floor-plan__room-label">Edit Suite</span>
      </div>

      {/* Storage */}
      <div
        className="studio-floor-plan__room"
        style={{ bottom: '8%', left: '42%', width: '20%', height: '28%' }}
      >
        <span className="studio-floor-plan__room-label">Gear Store</span>
      </div>

      {/* Glowing dots — equipment positions */}
      <div
        className="studio-floor-plan__dot studio-floor-plan__dot--pulse"
        style={{ width: 8, height: 8, top: '22%', left: '18%' }}
      />
      <div
        className="studio-floor-plan__dot studio-floor-plan__dot--pulse-2"
        style={{ width: 8, height: 8, top: '32%', left: '40%' }}
      />
      <div
        className="studio-floor-plan__dot studio-floor-plan__dot--pulse-3"
        style={{ width: 6, height: 6, top: '48%', left: '25%' }}
      />
      <div
        className="studio-floor-plan__dot studio-floor-plan__dot--pulse"
        style={{ width: 6, height: 6, top: '18%', right: '16%' }}
      />

      {/* Camera icon */}
      <div
        className="studio-floor-plan__camera"
        style={{ top: '38%', left: '14%' }}
      />
      <div
        className="studio-floor-plan__camera"
        style={{ top: '28%', left: '50%', transform: 'rotate(90deg)' }}
      />

      {/* Light cone */}
      <div
        className="studio-floor-plan__light"
        style={{ top: '8%', left: '22%' }}
      />
      <div
        className="studio-floor-plan__light"
        style={{ top: '8%', left: '44%' }}
      />
    </div>
  );
}

/* ── Film Reel Visual ────────────────────────────────────── */
function FilmReelVisual() {
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <div className="studio-film-strip">
      <div className="studio-film-reel-container">
        <div className="studio-film-reel studio-film-reel--anim">
          {spokes.map((angle) => (
            <div
              key={angle}
              className="studio-film-reel__spoke"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          ))}
          <div className="studio-film-reel__hub">
            <Film size={16} color="#fff" />
          </div>
        </div>

        {/* Floating badges */}
        <div className="studio-hero-badge studio-hero-badge--top">4K Cameras</div>
        <div className="studio-hero-badge studio-hero-badge--right">Sony FX6</div>
        <div className="studio-hero-badge studio-hero-badge--bottom">Acoustic Studio</div>
        <div className="studio-hero-badge studio-hero-badge--left">Pro Lights</div>
      </div>

      {/* Film tape strip decoration */}
      <div className="studio-film-tape">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={i % 3 === 0 ? 'studio-film-tape__hole' : 'studio-film-tape__frame'} />
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function Studio() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        /* ── Hero entrance ──────────────────────────────── */
        gsap.fromTo('.studio-tag',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: 'power3.out' });
        gsap.fromTo('.studio-h1-wrap', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.studio-sub',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.72, ease: 'power3.out' });
        gsap.fromTo('.studio-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.88, ease: 'power3.out' });
        gsap.fromTo('.studio-stats',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.05, ease: 'power3.out' });
        gsap.fromTo('.studio-hero__visual-wrap',
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1.0, delay: 0.6, ease: 'power3.out' }
        );

        /* ── Film reel continuous rotation ──────────────── */
        gsap.to('.studio-film-reel--anim', {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });

        /* ── About section ──────────────────────────────── */
        gsap.fromTo(
          '.studio-about__text > *',
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-about', start: 'top 80%' },
          }
        );
        gsap.fromTo(
          '.studio-about__visual',
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-about', start: 'top 80%' },
          }
        );

        /* ── Services cards ─────────────────────────────── */
        gsap.fromTo(
          '.studio-services .svc-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-services', start: 'top 80%' },
          }
        );

        /* ── Equipment pills ────────────────────────────── */
        gsap.fromTo(
          '.studio-equipment .svc-pill',
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: '.studio-equipment', start: 'top 80%' },
          }
        );

        /* ── Process steps ──────────────────────────────── */
        gsap.fromTo(
          '.svc-process__step',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-process', start: 'top 80%' },
          }
        );

        /* ── Why Cogent Studio cards ─────────────────────── */
        gsap.fromTo(
          '.studio-why-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-why', start: 'top 80%' },
          }
        );

        /* ── Showcase cards ─────────────────────────────── */
        gsap.fromTo(
          '.studio-showcase-card',
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-showcase', start: 'top 80%' },
          }
        );

        /* ── FAQ items ──────────────────────────────────── */
        gsap.fromTo(
          '.svc-faq-item',
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-faq', start: 'top 80%' },
          }
        );

        /* ── CTA ────────────────────────────────────────── */
        gsap.fromTo(
          '.studio-cta-section > *',
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: '.studio-cta-section', start: 'top 80%' },
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
      <section
        id="studio-hero"
        className="svc-hero studio-hero"
        aria-labelledby="studio-h1-el"
      >
        <div className="svc-orb svc-orb--1" />
        <div className="svc-orb svc-orb--2" />
        <div className="svc-orb svc-orb--3" />

        <div className="container">
          <div className="svc-hero__inner">
            <div className="svc-hero__content">
              <span
                className="svc-hero__tag studio-tag"
                style={{ color: COLOR, borderColor: COLOR }}
              >
                Cogent Studio — India
              </span>

              <h1 id="studio-h1-el" className="svc-hero__h1 studio-h1-wrap">
                Where <span className="text-gradient">Stories</span> Come to Life.
              </h1>

              <p className="svc-hero__sub studio-sub">
                India's premier professional content creation studio. State-of-the-art 4K cameras,
                acoustic treatment, Aputure Pro lighting, and an expert creative team — everything
                you need to produce world-class video, podcast, and photography content under one roof.
              </p>

              <div className="svc-hero__actions studio-actions">
                <button onClick={openEnquiry} className="btn btn-primary">
                  Book a Studio Session <ArrowRight size={16} />
                </button>
                <button onClick={openEnquiry} className="btn btn-outline">
                  View Packages
                </button>
              </div>

              <div className="svc-hero__stats studio-stats">
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">4K</span>
                  <span className="svc-stat-card__label">Equipment</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">Pro</span>
                  <span className="svc-stat-card__label">Studio</span>
                </div>
                <div className="svc-stat-card">
                  <span className="svc-stat-card__num">100+</span>
                  <span className="svc-stat-card__label">Productions</span>
                </div>
              </div>
            </div>

            <div className="studio-hero__visual-wrap" aria-hidden="true">
              <FilmReelVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ── About Studio ────────────────────────────────── */}
      <section
        id="about-cogent-studio"
        className="svc-section studio-about"
        aria-labelledby="studio-about-h2"
      >
        <div className="container">
          <div className="studio-about__inner">
            <div className="studio-about__text">
              <span className="tag">About the Studio</span>
              <h2 id="studio-about-h2">
                A World-Class Creative Studio in the Heart of India
              </h2>
              <p>
                Cogent Studio is a purpose-built professional content creation facility designed
                for brands, creators, and businesses who refuse to compromise on quality. Our
                studio combines Hollywood-level production infrastructure with the agility of a
                boutique creative house — giving you the best of both worlds.
              </p>
              <p>
                With acoustic foam treatment for pristine audio, Aputure 600d Pro lighting rigs
                for perfect exposure, 4K cinema cameras including the Sony FX6 and Blackmagic
                URSA Mini Pro, and a dedicated podcast production booth, we're equipped to handle
                any production brief from brand films and product shoots to podcast series and
                corporate communications.
              </p>
              <p>
                Our video production studio in India is trusted by startups, D2C brands, SaaS
                companies, and enterprise clients who need high-quality visual content that
                converts. Whether you're looking for a studio hire in India or a full end-to-end
                content creation studio partner, Cogent Studio delivers.
              </p>
              <div className="studio-about__features">
                {[
                  'Acoustic treatment for broadcast-quality audio',
                  'Full 4K production infrastructure',
                  'Dedicated podcast studio booth',
                  'Professional lighting rig with Aputure 600d Pro',
                  'Teleprompter and multi-camera setups',
                  'End-to-end production and post-production',
                ].map((feat) => (
                  <div key={feat} className="studio-about__feature">
                    <CheckCircle size={15} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="studio-about__visual" aria-hidden="true">
              <StudioFloorPlan />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Grid ────────────────────────────────── */}
      <section
        id="studio-services"
        className="svc-section svc-section--alt studio-services"
        aria-labelledby="studio-services-h2"
      >
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">What We Produce</span>
            <h2 id="studio-services-h2">Studio Production Services</h2>
            <p>
              From podcast production and studio photography to brand films and corporate video —
              our studio is your complete content creation partner in India.
            </p>
          </div>
          <div className="svc-grid-6">
            {studioServices.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Equipment Section ────────────────────────────── */}
      <section
        id="studio-equipment"
        className="svc-section svc-section--dark studio-equipment"
        aria-labelledby="studio-equipment-h2"
      >
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Kit</span>
            <h2 id="studio-equipment-h2">Professional Grade Equipment</h2>
            <p>
              Every piece of equipment in Cogent Studio is chosen for reliability, image quality,
              and production versatility. Cinema cameras, professional audio, broadcast lighting —
              it's all here.
            </p>
          </div>
          <div className="svc-pills" style={{ justifyContent: 'center' }}>
            {equipment.map((item) => (
              <span key={item} className="svc-pill">
                <span
                  className="studio-equipment-icon"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,107,107,0.15)',
                    marginRight: 6,
                    flexShrink: 0,
                  }}
                >
                  <Zap size={11} color={COLOR} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────── */}
      <section
        id="studio-process"
        className="svc-section studio-process"
        aria-labelledby="studio-process-h2"
      >
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">How It Works</span>
            <h2 id="studio-process-h2">Our Production Process</h2>
            <p>
              A structured four-stage approach that ensures every production runs smoothly,
              stays on schedule, and delivers exceptional results.
            </p>
          </div>
          <div className="svc-process">
            {processSteps.map((step, i) => (
              <>
                <div key={step.num} className="svc-process__step">
                  <div className="svc-process__num">{step.num}</div>
                  <h3 className="svc-process__title">{step.title}</h3>
                  <p className="svc-process__desc">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div key={`connector-${i}`} className="svc-process__connector" />
                )}
              </>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Cogent Studio ────────────────────────────── */}
      <section
        id="why-cogent-studio"
        className="svc-section svc-section--alt studio-why"
        aria-labelledby="studio-why-h2"
      >
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Why Choose Us</span>
            <h2 id="studio-why-h2">Why Cogent Studio</h2>
            <p>
              More than a studio hire — a creative production partner committed to exceptional
              output at every stage.
            </p>
          </div>
          <div className="studio-why-grid">
            {whyFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="studio-why-card">
                <div className="studio-why-card__icon">
                  <Icon size={24} />
                </div>
                <h3 className="studio-why-card__title">{title}</h3>
                <p className="studio-why-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showcase / Portfolio Teaser ───────────────────── */}
      <section
        id="studio-showcase"
        className="svc-section studio-showcase"
        aria-labelledby="studio-showcase-h2"
      >
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">Our Work</span>
            <h2 id="studio-showcase-h2">From the Studio Floor</h2>
            <p>
              A glimpse at the brands and creators we've partnered with to produce high-quality
              visual content across formats.
            </p>
          </div>
          <div className="studio-showcase-grid">
            {/* Featured large card */}
            {showcaseItems.filter(i => i.featured).map(({ tag, title, sub, gradient, accent, index }) => (
              <div key={title} className="studio-showcase-card studio-showcase-card--featured">
                <div className="studio-showcase-card__bg" style={{ background: gradient }} />
                <div className="studio-showcase-card__noise" />
                <div className="studio-showcase-card__overlay">
                  <div className="studio-showcase-card__top">
                    <span className="studio-showcase-card__index">{index}</span>
                    <span className="studio-showcase-card__tag" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>{tag}</span>
                  </div>
                  <div className="studio-showcase-card__bottom">
                    <h3 className="studio-showcase-card__title">{title}</h3>
                    <p className="studio-showcase-card__sub">{sub}</p>
                  </div>
                </div>
                <div className="studio-showcase-card__play" style={{ background: accent }}>
                  <Play size={16} color="#fff" fill="#fff" />
                </div>
                <div className="studio-showcase-card__glow" style={{ background: accent }} />
              </div>
            ))}

            {/* Small cards grid */}
            <div className="studio-showcase-small-grid">
              {showcaseItems.filter(i => !i.featured).map(({ tag, title, sub, gradient, accent, index }) => (
                <div key={title} className="studio-showcase-card studio-showcase-card--small">
                  <div className="studio-showcase-card__bg" style={{ background: gradient }} />
                  <div className="studio-showcase-card__noise" />
                  <div className="studio-showcase-card__overlay">
                    <div className="studio-showcase-card__top">
                      <span className="studio-showcase-card__index">{index}</span>
                      <span className="studio-showcase-card__tag" style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}>{tag}</span>
                    </div>
                    <div className="studio-showcase-card__bottom">
                      <h3 className="studio-showcase-card__title">{title}</h3>
                      <p className="studio-showcase-card__sub">{sub}</p>
                    </div>
                  </div>
                  <div className="studio-showcase-card__play" style={{ background: accent }}>
                    <Play size={12} color="#fff" fill="#fff" />
                  </div>
                  <div className="studio-showcase-card__glow" style={{ background: accent }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section
        id="studio-faq"
        className="svc-section svc-section--alt studio-faq"
        aria-labelledby="studio-faq-h2"
      >
        <div className="container">
          <div className="svc-section__header">
            <span className="tag">FAQ</span>
            <h2 id="studio-faq-h2">Studio Booking Questions</h2>
            <p>
              Everything you need to know about booking, what's included, turnaround times,
              and custom production packages.
            </p>
          </div>
          <div className="svc-faq" role="list">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        id="studio-cta"
        className="svc-section svc-cta"
        aria-labelledby="studio-cta-h2"
      >
        <div
          className="container studio-cta-section"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          <span className="tag">Book Now</span>
          <h2 id="studio-cta-h2" className="svc-cta__title">
            Book Your <span className="text-gradient">Studio Session</span>
          </h2>
          <p className="svc-cta__sub">
            Whether you need a single shoot day or an ongoing content creation partner, Cogent
            Studio is ready to bring your vision to life. Professional equipment, expert crew,
            and cinematic quality — every time.
          </p>
          <div className="svc-cta__actions">
            <button onClick={openEnquiry} className="btn btn-primary">
              Enquire Now <ArrowRight size={16} />
            </button>
            <button onClick={openEnquiry} className="btn btn-outline">
              View Studio Packages
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

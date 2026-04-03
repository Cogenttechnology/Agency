import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { ArrowRight, ArrowLeft, Heart, MessageCircle, Repeat2, Send, TrendingUp, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './SocialShowcase.css';

/* ── Types ───────────────────────────────────────────────── */
interface GridPost {
  gradient: string;
  type: 'reel' | 'post' | 'carousel';
  likes: string;
  comments: string;
  isReel?: boolean;
}

interface GrowthPoint {
  month: string;
  value: number;
  label: string;
}

interface SocialProfile {
  id: string;
  handle: string;
  name: string;
  industry: string;
  accentColor: string;
  avatar: string;
  beforeFollowers: string;
  afterFollowers: string;
  beforeEngagement: string;
  afterEngagement: string;
  growthPct: string;
  period: string;
  grid: GridPost[];
  growth: GrowthPoint[];
  engagementRate: string;
  reachPerPost: string;
  topContent: string;
}

/* ── Data ────────────────────────────────────────────────── */
const profiles: SocialProfile[] = [
  {
    id: 'glowup',
    handle: '@glowupco',
    name: 'GlowUp Cosmetics',
    industry: 'D2C Beauty',
    accentColor: '#f59e0b',
    avatar: 'linear-gradient(135deg, #f59e0b, #ec4899)',
    beforeFollowers: '4.2K', afterFollowers: '86K',
    beforeEngagement: '0.8%', afterEngagement: '6.4%',
    growthPct: '+1,948%', period: '6 Months',
    engagementRate: '6.4%', reachPerPost: '42K avg', topContent: 'Reels & Carousels',
    grid: [
      { gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)', type: 'reel',     likes: '12.4K', comments: '318', isReel: true },
      { gradient: 'linear-gradient(135deg,#ec4899,#a855f7)', type: 'post',     likes: '8.1K',  comments: '142' },
      { gradient: 'linear-gradient(135deg,#a855f7,#6c63ff)', type: 'carousel', likes: '6.8K',  comments: '205' },
      { gradient: 'linear-gradient(135deg,#f59e0b,#ff8e53)', type: 'post',     likes: '9.3K',  comments: '267' },
      { gradient: 'linear-gradient(135deg,#ff6b6b,#f59e0b)', type: 'reel',     likes: '18.2K', comments: '492', isReel: true },
      { gradient: 'linear-gradient(135deg,#ec4899,#f59e0b)', type: 'carousel', likes: '5.4K',  comments: '188' },
      { gradient: 'linear-gradient(135deg,#00d4aa,#f59e0b)', type: 'reel',     likes: '14.6K', comments: '381', isReel: true },
      { gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', type: 'post',     likes: '7.2K',  comments: '159' },
      { gradient: 'linear-gradient(135deg,#a855f7,#ec4899)', type: 'carousel', likes: '11.1K', comments: '344' },
    ],
    growth: [
      { month: 'Jan', value: 5, label: '4.2K' }, { month: 'Feb', value: 12, label: '8.1K' },
      { month: 'Mar', value: 24, label: '18K' },  { month: 'Apr', value: 42, label: '32K' },
      { month: 'May', value: 68, label: '56K' },  { month: 'Jun', value: 100, label: '86K' },
    ],
  },
  {
    id: 'urbaneats',
    handle: '@urbaneats',
    name: 'UrbanEats Delivery',
    industry: 'Food & Beverage',
    accentColor: '#ff6b6b',
    avatar: 'linear-gradient(135deg, #ff6b6b, #f59e0b)',
    beforeFollowers: '11K', afterFollowers: '142K',
    beforeEngagement: '1.1%', afterEngagement: '4.8%',
    growthPct: '+1,191%', period: '9 Months',
    engagementRate: '4.8%', reachPerPost: '78K avg', topContent: 'Reels & Stories',
    grid: [
      { gradient: 'linear-gradient(135deg,#ff6b6b,#f59e0b)', type: 'reel',     likes: '22.1K', comments: '614', isReel: true },
      { gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', type: 'post',     likes: '9.4K',  comments: '211' },
      { gradient: 'linear-gradient(135deg,#d97706,#ff6b6b)', type: 'carousel', likes: '7.8K',  comments: '188' },
      { gradient: 'linear-gradient(135deg,#ff8e53,#ff6b6b)', type: 'reel',     likes: '31.5K', comments: '842', isReel: true },
      { gradient: 'linear-gradient(135deg,#ff6b6b,#cc3344)', type: 'post',     likes: '12.2K', comments: '303' },
      { gradient: 'linear-gradient(135deg,#f59e0b,#ff6b6b)', type: 'carousel', likes: '8.6K',  comments: '241' },
      { gradient: 'linear-gradient(135deg,#ff6b6b,#f59e0b)', type: 'post',     likes: '14.3K', comments: '376' },
      { gradient: 'linear-gradient(135deg,#d97706,#ff8e53)', type: 'reel',     likes: '19.7K', comments: '528', isReel: true },
      { gradient: 'linear-gradient(135deg,#cc3344,#ff6b6b)', type: 'carousel', likes: '6.9K',  comments: '194' },
    ],
    growth: [
      { month: 'Jan', value: 8, label: '11K' },  { month: 'Mar', value: 18, label: '26K' },
      { month: 'May', value: 35, label: '52K' }, { month: 'Jun', value: 52, label: '76K' },
      { month: 'Aug', value: 74, label: '112K' },{ month: 'Sep', value: 100, label: '142K' },
    ],
  },
  {
    id: 'techspark',
    handle: '@techspark',
    name: 'TechSpark SaaS',
    industry: 'B2B / SaaS',
    accentColor: '#6c63ff',
    avatar: 'linear-gradient(135deg, #6c63ff, #00d4aa)',
    beforeFollowers: '890', afterFollowers: '28K',
    beforeEngagement: '0.6%', afterEngagement: '3.9%',
    growthPct: '+3,045%', period: '12 Months',
    engagementRate: '3.9%', reachPerPost: '18K avg', topContent: 'Carousels & Threads',
    grid: [
      { gradient: 'linear-gradient(135deg,#6c63ff,#00d4aa)', type: 'carousel', likes: '4.2K',  comments: '218' },
      { gradient: 'linear-gradient(135deg,#00d4aa,#6c63ff)', type: 'reel',     likes: '9.8K',  comments: '341', isReel: true },
      { gradient: 'linear-gradient(135deg,#a855f7,#6c63ff)', type: 'post',     likes: '3.6K',  comments: '156' },
      { gradient: 'linear-gradient(135deg,#6c63ff,#a855f7)', type: 'post',     likes: '5.1K',  comments: '192' },
      { gradient: 'linear-gradient(135deg,#00d4aa,#a855f7)', type: 'carousel', likes: '7.4K',  comments: '288' },
      { gradient: 'linear-gradient(135deg,#6c63ff,#00d4aa)', type: 'reel',     likes: '12.1K', comments: '407', isReel: true },
      { gradient: 'linear-gradient(135deg,#a855f7,#00d4aa)', type: 'carousel', likes: '6.3K',  comments: '241' },
      { gradient: 'linear-gradient(135deg,#00d4aa,#6c63ff)', type: 'post',     likes: '4.8K',  comments: '177' },
      { gradient: 'linear-gradient(135deg,#6c63ff,#a855f7)', type: 'reel',     likes: '15.2K', comments: '512', isReel: true },
    ],
    growth: [
      { month: 'Jan', value: 3, label: '890' },  { month: 'Mar', value: 10, label: '3.4K' },
      { month: 'May', value: 22, label: '8K' },  { month: 'Jul', value: 48, label: '14K' },
      { month: 'Sep', value: 72, label: '21K' }, { month: 'Dec', value: 100, label: '28K' },
    ],
  },
];

/* ── Sparkline ───────────────────────────────────────────── */
function GrowthGraph({ points, color, active }: { points: GrowthPoint[]; color: string; active: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const animated = useRef(false);

  const W = 380, H = 110, PAD = 20;
  const xStep = (W - PAD * 2) / (points.length - 1);
  const toY = (v: number) => H - PAD - (v / 100) * (H - PAD * 2);

  const pathD = points.map((p, i) => {
    const x = PAD + i * xStep, y = toY(p.value);
    if (i === 0) return `M ${x},${y}`;
    const px = PAD + (i - 1) * xStep, py = toY(points[i - 1].value);
    return `C ${px + xStep * 0.5},${py} ${x - xStep * 0.5},${y} ${x},${y}`;
  }).join(' ');
  const areaD = pathD + ` L ${PAD + (points.length - 1) * xStep},${H - PAD} L ${PAD},${H - PAD} Z`;

  useEffect(() => { animated.current = false; }, [points]);

  useEffect(() => {
    if (!active || animated.current || !pathRef.current) return;
    animated.current = true;
    const len = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: 0.2 });
    dotsRef.current?.querySelectorAll('circle').forEach((d, i) =>
      gsap.fromTo(d, { scale: 0, transformOrigin: 'center' },
        { scale: 1, duration: 0.35, delay: 0.3 + i * 0.18, ease: 'back.out(2)' })
    );
  }, [active]);

  return (
    <div className="ssc-graph">
      <svg viewBox={`0 0 ${W} ${H}`} className="ssc-graph__svg">
        {[25, 50, 75].map(v => (
          <line key={v} x1={PAD} y1={toY(v)} x2={W - PAD} y2={toY(v)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        <path d={areaD} fill={`${color}18`} />
        <path ref={pathRef} d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <g ref={dotsRef}>
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={PAD + i * xStep} cy={toY(p.value)} r="4" fill={color} stroke="#09090f" strokeWidth="2" />
              <text x={PAD + i * xStep} y={toY(p.value) - 9} textAnchor="middle"
                fontSize="8" fill="rgba(255,255,255,0.5)" fontFamily="monospace">{p.label}</text>
            </g>
          ))}
        </g>
      </svg>
      <div className="ssc-graph__months">
        {points.map(p => <span key={p.month}>{p.month}</span>)}
      </div>
    </div>
  );
}

/* ── Grid Post ───────────────────────────────────────────── */
function GridPost({ post }: { post: GridPost }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="ssc-grid-post"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="ssc-grid-post__bg" style={{ background: post.gradient }} />
      <div className="ssc-grid-post__grain" />
      {post.isReel && <span className="ssc-reel-badge">▶</span>}
      {post.type === 'carousel' && <span className="ssc-carousel-badge">⧉</span>}
      <div className={`ssc-grid-post__hover${hovered ? ' show' : ''}`}>
        <span><Heart size={12} fill="currentColor" /> {post.likes}</span>
        <span><MessageCircle size={12} /> {post.comments}</span>
      </div>
    </div>
  );
}

/* ── Slide ───────────────────────────────────────────────── */
function Slide({ profile, active }: { profile: SocialProfile; active: boolean }) {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="ssc-slide">
      {/* Instagram phone mockup */}
      <div className="ssc-slide__phone">
        <div className="ssc-phone-header">
          <div className="ssc-phone-avatar" style={{ background: profile.avatar }} />
          <div className="ssc-phone-meta">
            <span className="ssc-phone-name">{profile.name}</span>
            <span className="ssc-phone-handle" style={{ color: profile.accentColor }}>{profile.handle}</span>
          </div>
          <div className="ssc-phone-follow" style={{ background: profile.accentColor }}>Follow</div>
        </div>
        <div className="ssc-insta-grid">
          {profile.grid.map((post, i) => <GridPost key={i} post={post} />)}
        </div>
        <div className="ssc-phone-actions">
          <div className="ssc-phone-actions__left">
            <Heart size={20} /><MessageCircle size={20} /><Send size={20} />
          </div>
          <Repeat2 size={18} />
        </div>
      </div>

      {/* Stats */}
      <div className="ssc-slide__stats">
        <div className="ssc-slide__industry">{profile.industry}</div>
        <h3 className="ssc-slide__name">{profile.name}</h3>

        <div className="ssc-ba">
          <div className="ssc-ba__col ssc-ba__col--before">
            <span className="ssc-ba__tag">Before</span>
            <div className="ssc-ba__row">
              <div className="ssc-ba__item">
                <span className="ssc-ba__num">{profile.beforeFollowers}</span>
                <span className="ssc-ba__key">Followers</span>
              </div>
              <div className="ssc-ba__item">
                <span className="ssc-ba__num">{profile.beforeEngagement}</span>
                <span className="ssc-ba__key">Engagement</span>
              </div>
            </div>
          </div>
          <ChevronRight size={18} className="ssc-ba__arrow" style={{ color: profile.accentColor }} />
          <div className="ssc-ba__col ssc-ba__col--after"
            style={{ borderColor: `${profile.accentColor}40`, background: `${profile.accentColor}0a` }}>
            <span className="ssc-ba__tag" style={{ color: profile.accentColor }}>After Cogent</span>
            <div className="ssc-ba__row">
              <div className="ssc-ba__item">
                <span className="ssc-ba__num" style={{ color: profile.accentColor }}>{profile.afterFollowers}</span>
                <span className="ssc-ba__key">Followers</span>
              </div>
              <div className="ssc-ba__item">
                <span className="ssc-ba__num" style={{ color: profile.accentColor }}>{profile.afterEngagement}</span>
                <span className="ssc-ba__key">Engagement</span>
              </div>
            </div>
            <div className="ssc-ba__badge" style={{ color: profile.accentColor }}>
              <TrendingUp size={12} /> {profile.growthPct} in {profile.period}
            </div>
          </div>
        </div>

        <div className="ssc-graph-card">
          <div className="ssc-graph-card__head">
            <span>Follower Growth</span>
            <span className="ssc-graph-card__period">{profile.period}</span>
          </div>
          <GrowthGraph points={profile.growth} color={profile.accentColor} active={active} />
        </div>

        <div className={`ssc-eng${active ? ' ssc-eng--in' : ''}`}
          style={{ '--ec': profile.accentColor } as React.CSSProperties}>
          <div className="ssc-eng__head"><TrendingUp size={13} /> Engagement Snapshot</div>
          <div className="ssc-eng__grid">
            <div className="ssc-eng__item">
              <span className="ssc-eng__val">{profile.engagementRate}</span>
              <span className="ssc-eng__key">Eng. Rate</span>
            </div>
            <div className="ssc-eng__item">
              <span className="ssc-eng__val">{profile.reachPerPost}</span>
              <span className="ssc-eng__key">Reach / Post</span>
            </div>
            <div className="ssc-eng__item">
              <span className="ssc-eng__val" style={{ fontSize: '0.78rem' }}>{profile.topContent}</span>
              <span className="ssc-eng__key">Top Format</span>
            </div>
          </div>
        </div>

        <button onClick={openEnquiry}  className="ssc-slide__cta" style={{ color: profile.accentColor }}>
          Grow your social like this <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────── */
const AUTO_DELAY = 4000; // ms between auto-advances

export default function SocialShowcase() {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  // Section entrance via ScrollTrigger — only animate header, never carousel
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ssc-header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.ssc-header', start: 'top 85%' },
        }
      );
    }, sectionRef);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  // Detect active slide from scroll position inside track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slideW = track.scrollWidth / profiles.length;
      const idx = Math.round(track.scrollLeft / slideW);
      setActive(Math.min(profiles.length - 1, Math.max(0, idx)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slideW = track.scrollWidth / profiles.length;
    track.scrollTo({ left: slideW * idx, behavior: 'smooth' });
    setActive(idx);
    // Briefly pause auto so manual nav doesn't immediately override
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, AUTO_DELAY + 500);
  };

  // Auto-advance: cycles through slides, pauses on hover/touch
  useEffect(() => {
    const schedule = () => {
      autoTimerRef.current = setTimeout(() => {
        if (!pausedRef.current) {
          setActive(prev => {
            const next = prev < profiles.length - 1 ? prev + 1 : 0;
            const track = trackRef.current;
            if (track) {
              const slideW = track.scrollWidth / profiles.length;
              track.scrollTo({ left: slideW * next, behavior: 'smooth' });
            }
            return next;
          });
        }
        schedule();
      }, AUTO_DELAY);
    };
    schedule();
    return () => { if (autoTimerRef.current) clearTimeout(autoTimerRef.current); };
  }, []);

  const pauseAuto = () => { pausedRef.current = true; };
  const resumeAuto = () => { pausedRef.current = false; };

  return (
    <section ref={sectionRef} className="ssc-section" id="social-showcase" aria-labelledby="ssc-h2">
      <div className="ssc-bg-orb ssc-bg-orb--1" />
      <div className="ssc-bg-orb ssc-bg-orb--2" />

      <div className="container">
        <div className="ssc-header">
          <span className="tag">Our Work</span>
          <h2 id="ssc-h2">Brands We Made <span className="text-gradient">Go Viral</span></h2>
          <p className="ssc-sub">Real Instagram grids. Real growth numbers. Drag to browse.</p>
        </div>
      </div>

      {/* Horizontal drag carousel — no GSAP pin, no Lenis conflict */}
      <div className="ssc-carousel-wrap" onMouseEnter={pauseAuto} onMouseLeave={resumeAuto}
        onTouchStart={pauseAuto} onTouchEnd={resumeAuto}>
        <div ref={trackRef} className="ssc-carousel">
          {profiles.map((p, i) => (
            <div key={p.id} className="ssc-carousel__item">
              <Slide profile={p} active={active === i} />
            </div>
          ))}
        </div>

        {/* Left / right fade masks */}
        <div className="ssc-carousel__fade ssc-carousel__fade--left" />
        <div className="ssc-carousel__fade ssc-carousel__fade--right" />
      </div>

      {/* Controls */}
      <div className="container">
        <div className="ssc-controls">
          <button className="ssc-ctrl-btn" onClick={() => scrollTo(active - 1)}
            disabled={active === 0} aria-label="Previous">
            <ArrowLeft size={18} />
          </button>

          <div className="ssc-dots">
            {profiles.map((p, i) => (
              <button key={p.id}
                className={`ssc-dot${active === i ? ' ssc-dot--active' : ''}`}
                style={{ '--dc': p.accentColor } as React.CSSProperties}
                onClick={() => scrollTo(i)}
                aria-label={p.name}
              />
            ))}
          </div>

          <button className="ssc-ctrl-btn" onClick={() => scrollTo(active + 1)}
            disabled={active === profiles.length - 1} aria-label="Next">
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="ssc-footer">
          <button onClick={openEnquiry}  className="btn btn-primary">
            Start Your Social Growth <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

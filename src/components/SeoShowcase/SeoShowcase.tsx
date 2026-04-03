import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import {
  ArrowRight, ArrowLeft, TrendingUp, Search, Sparkles,
  ChevronRight, MousePointerClick, Eye, Hash,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './SeoShowcase.css';

/* ── Types ───────────────────────────────────────────────── */
interface GscPoint {
  month: string;
  clicks: number;   // 0–100 normalised
  impr: number;     // 0–100 normalised
  clicksLabel: string;
  imprLabel: string;
}

interface Keyword {
  term: string;
  beforeRank: number;  // e.g. 48
  afterRank: number;   // e.g. 1
  volume: string;      // e.g. "8.4K/mo"
  aiResult?: boolean;  // appears in AI overview
}

interface SeoCase {
  id: string;
  brand: string;
  industry: string;
  accentColor: string;
  period: string;
  beforeClicks: string;
  afterClicks: string;
  beforeImpr: string;
  afterImpr: string;
  ctrGrowth: string;
  keywordsRanked: string;
  gsc: GscPoint[];
  keywords: Keyword[];
  aiOverviewNote: string;
}

/* ── Data ────────────────────────────────────────────────── */
const cases: SeoCase[] = [
  {
    id: 'synapse',
    brand: 'Synapse Labs',
    industry: 'B2B SaaS',
    accentColor: '#00d4aa',
    period: '6 Months',
    beforeClicks: '1.2K/mo',  afterClicks: '18.4K/mo',
    beforeImpr: '28K/mo',     afterImpr: '310K/mo',
    ctrGrowth: '+420%',       keywordsRanked: '180+',
    aiOverviewNote: 'Featured in Google AI Overviews for 12 product-category queries',
    gsc: [
      { month: 'Jan', clicks: 5,  impr: 8,  clicksLabel: '1.2K', imprLabel: '28K'  },
      { month: 'Feb', clicks: 10, impr: 15, clicksLabel: '2.1K', imprLabel: '48K'  },
      { month: 'Mar', clicks: 20, impr: 28, clicksLabel: '3.8K', imprLabel: '82K'  },
      { month: 'Apr', clicks: 38, impr: 50, clicksLabel: '7.1K', imprLabel: '148K' },
      { month: 'May', clicks: 65, impr: 72, clicksLabel: '12K',  imprLabel: '224K' },
      { month: 'Jun', clicks: 100,impr: 100,clicksLabel: '18.4K',imprLabel: '310K' },
    ],
    keywords: [
      { term: 'analytics platform for startups', beforeRank: 62, afterRank: 1,  volume: '5.2K/mo', aiResult: true },
      { term: 'B2B data analytics tool',          beforeRank: 45, afterRank: 2,  volume: '8.4K/mo' },
      { term: 'SaaS analytics dashboard',          beforeRank: 38, afterRank: 3,  volume: '12K/mo',  aiResult: true },
      { term: 'business intelligence software',    beforeRank: 91, afterRank: 7,  volume: '22K/mo' },
    ],
  },
  {
    id: 'medicore',
    brand: 'MediCore Hospitals',
    industry: 'Healthcare',
    accentColor: '#6c63ff',
    period: '9 Months',
    beforeClicks: '680/mo',   afterClicks: '14.2K/mo',
    beforeImpr: '12K/mo',     afterImpr: '198K/mo',
    ctrGrowth: '+1,988%',     keywordsRanked: '240+',
    aiOverviewNote: 'AI Overview appearances for 8 high-intent medical queries',
    gsc: [
      { month: 'Jan', clicks: 5,  impr: 6,  clicksLabel: '680',   imprLabel: '12K'  },
      { month: 'Feb', clicks: 9,  impr: 12, clicksLabel: '1.2K',  imprLabel: '22K'  },
      { month: 'Mar', clicks: 16, impr: 22, clicksLabel: '2.2K',  imprLabel: '44K'  },
      { month: 'May', clicks: 35, impr: 48, clicksLabel: '4.9K',  imprLabel: '96K'  },
      { month: 'Jul', clicks: 62, impr: 74, clicksLabel: '8.8K',  imprLabel: '148K' },
      { month: 'Sep', clicks: 100,impr: 100,clicksLabel: '14.2K', imprLabel: '198K' },
    ],
    keywords: [
      { term: 'best multi-specialty hospital Mumbai', beforeRank: 55, afterRank: 1,  volume: '9.1K/mo', aiResult: true },
      { term: 'orthopedic surgeon near me',           beforeRank: 40, afterRank: 2,  volume: '18K/mo' },
      { term: 'cardiac care hospital India',          beforeRank: 78, afterRank: 4,  volume: '6.8K/mo', aiResult: true },
      { term: 'hospital appointment booking online',  beforeRank: 32, afterRank: 5,  volume: '14K/mo' },
    ],
  },
  {
    id: 'axion',
    brand: 'Axion Store',
    industry: 'E-Commerce',
    accentColor: '#f59e0b',
    period: '8 Months',
    beforeClicks: '3.4K/mo',  afterClicks: '38K/mo',
    beforeImpr: '54K/mo',     afterImpr: '620K/mo',
    ctrGrowth: '+1,018%',     keywordsRanked: '500+',
    aiOverviewNote: 'Product pages cited in AI Shopping summaries for 20+ categories',
    gsc: [
      { month: 'Jan', clicks: 9,  impr: 9,  clicksLabel: '3.4K',  imprLabel: '54K'  },
      { month: 'Feb', clicks: 14, impr: 16, clicksLabel: '5.2K',  imprLabel: '98K'  },
      { month: 'Mar', clicks: 24, impr: 30, clicksLabel: '9.1K',  imprLabel: '186K' },
      { month: 'Apr', clicks: 40, impr: 50, clicksLabel: '15.2K', imprLabel: '310K' },
      { month: 'Jun', clicks: 68, impr: 72, clicksLabel: '25.8K', imprLabel: '448K' },
      { month: 'Aug', clicks: 100,impr: 100,clicksLabel: '38K',   imprLabel: '620K' },
    ],
    keywords: [
      { term: 'luxury lifestyle products online',    beforeRank: 82, afterRank: 1, volume: '11K/mo', aiResult: true },
      { term: 'premium home decor India',            beforeRank: 44, afterRank: 2, volume: '28K/mo' },
      { term: 'buy designer furniture online',       beforeRank: 67, afterRank: 3, volume: '19K/mo', aiResult: true },
      { term: 'exclusive lifestyle brand store',     beforeRank: 90, afterRank: 6, volume: '7.4K/mo' },
    ],
  },
];

/* ── GSC Graph ───────────────────────────────────────────── */
function GscGraph({ points, color, active }: { points: GscPoint[]; color: string; active: boolean }) {
  const clicksRef = useRef<SVGPathElement>(null);
  const imprRef = useRef<SVGPathElement>(null);
  const animated = useRef(false);

  const W = 380, H = 100, PAD = { x: 20, y: 12 };
  const xStep = (W - PAD.x * 2) / (points.length - 1);
  const toY = (v: number) => H - PAD.y - (v / 100) * (H - PAD.y * 2);

  const makePath = (vals: number[]) =>
    vals.map((v, i) => {
      const x = PAD.x + i * xStep, y = toY(v);
      if (i === 0) return `M ${x},${y}`;
      const px = PAD.x + (i - 1) * xStep, py = toY(vals[i - 1]);
      return `C ${px + xStep * 0.5},${py} ${x - xStep * 0.5},${y} ${x},${y}`;
    }).join(' ');

  const clicksPath = makePath(points.map(p => p.clicks));
  const imprPath  = makePath(points.map(p => p.impr));

  // Area under clicks
  const areaPath = clicksPath + ` L ${PAD.x + (points.length - 1) * xStep},${H - PAD.y} L ${PAD.x},${H - PAD.y} Z`;

  useEffect(() => { animated.current = false; }, [points]);

  useEffect(() => {
    if (!active || animated.current) return;
    animated.current = true;
    [clicksRef, imprRef].forEach((ref, i) => {
      if (!ref.current) return;
      const len = ref.current.getTotalLength();
      gsap.set(ref.current, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(ref.current, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', delay: i * 0.3 });
    });
  }, [active]);

  return (
    <div className="seo-gsc-graph">
      <svg viewBox={`0 0 ${W} ${H}`} className="seo-gsc-graph__svg">
        {[25, 50, 75].map(v => (
          <line key={v} x1={PAD.x} y1={toY(v)} x2={W - PAD.x} y2={toY(v)}
            stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        <path d={areaPath} fill={`${color}12`} />
        {/* Impressions (dimmer) */}
        <path ref={imprRef} d={imprPath} fill="none"
          stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
        {/* Clicks (main) */}
        <path ref={clicksRef} d={clicksPath} fill="none"
          stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {/* End dots */}
        {[
          { val: points[points.length - 1].clicks, col: color },
          { val: points[points.length - 1].impr,   col: 'rgba(255,255,255,0.4)' },
        ].map(({ val, col }, i) => (
          <circle key={i}
            cx={PAD.x + (points.length - 1) * xStep} cy={toY(val)}
            r="4" fill={col} stroke="#09090f" strokeWidth="2" />
        ))}
      </svg>
      {/* Month labels */}
      <div className="seo-gsc-graph__months">
        {points.map(p => <span key={p.month}>{p.month}</span>)}
      </div>
      {/* Legend */}
      <div className="seo-gsc-legend">
        <span style={{ color }}><MousePointerClick size={11} /> Clicks</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}><Eye size={11} /> Impressions</span>
      </div>
    </div>
  );
}

/* ── Keyword Row ─────────────────────────────────────────── */
function KeywordRow({ kw, color, active }: { kw: Keyword; color: string; active: boolean }) {
  const rankRef = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => { animated.current = false; }, [kw]);

  useEffect(() => {
    if (!active || animated.current || !rankRef.current) return;
    animated.current = true;
    const obj = { val: kw.beforeRank };
    gsap.to(obj, {
      val: kw.afterRank, duration: 1.4, ease: 'power3.out', delay: 0.2,
      onUpdate: () => { if (rankRef.current) rankRef.current.textContent = `#${Math.round(obj.val)}`; },
    });
  }, [active, kw]);

  const isTop3 = kw.afterRank <= 3;

  return (
    <div className="seo-kw-row">
      <div className="seo-kw-row__term">
        <Hash size={11} className="seo-kw-row__hash" />
        <span>{kw.term}</span>
        {kw.aiResult && (
          <span className="seo-ai-badge"><Sparkles size={9} /> AI</span>
        )}
      </div>
      <div className="seo-kw-row__right">
        <span className="seo-kw-row__vol">{kw.volume}</span>
        <span className="seo-kw-row__before">#{kw.beforeRank}</span>
        <ChevronRight size={12} style={{ opacity: 0.4, flexShrink: 0 }} />
        <span
          ref={rankRef}
          className={`seo-kw-row__after${isTop3 ? ' seo-kw-row__after--top' : ''}`}
          style={isTop3 ? { color } : undefined}
        >
          #{kw.beforeRank}
        </span>
      </div>
    </div>
  );
}

/* ── Slide ───────────────────────────────────────────────── */
function Slide({ c, active }: { c: SeoCase; active: boolean }) {
  const { openEnquiry } = useEnquiry();
  return (
    <div className="seo-slide">
      {/* Left: GSC panel */}
      <div className="seo-slide__gsc">
        {/* Header */}
        <div className="seo-gsc-header">
          <div className="seo-gsc-chrome">
            <span /><span /><span />
          </div>
          <span className="seo-gsc-title">Google Search Console — {c.brand}</span>
        </div>

        {/* Stats row */}
        <div className="seo-gsc-stats">
          <div className="seo-gsc-stat">
            <span className="seo-gsc-stat__label"><MousePointerClick size={11} /> Total Clicks</span>
            <div className="seo-gsc-stat__row">
              <span className="seo-gsc-stat__before">{c.beforeClicks}</span>
              <ChevronRight size={12} style={{ opacity: 0.4 }} />
              <span className="seo-gsc-stat__after" style={{ color: c.accentColor }}>{c.afterClicks}</span>
            </div>
          </div>
          <div className="seo-gsc-stat">
            <span className="seo-gsc-stat__label"><Eye size={11} /> Impressions</span>
            <div className="seo-gsc-stat__row">
              <span className="seo-gsc-stat__before">{c.beforeImpr}</span>
              <ChevronRight size={12} style={{ opacity: 0.4 }} />
              <span className="seo-gsc-stat__after" style={{ color: c.accentColor }}>{c.afterImpr}</span>
            </div>
          </div>
          <div className="seo-gsc-stat">
            <span className="seo-gsc-stat__label"><TrendingUp size={11} /> CTR Growth</span>
            <span className="seo-gsc-stat__after" style={{ color: c.accentColor, fontSize: '1.1rem' }}>{c.ctrGrowth}</span>
          </div>
        </div>

        {/* Animated GSC graph */}
        <GscGraph points={c.gsc} color={c.accentColor} active={active} />

        {/* AI Overview badge */}
        <div className="seo-ai-overview" style={{ '--aoc': c.accentColor } as React.CSSProperties}>
          <div className="seo-ai-overview__icon"><Sparkles size={14} /></div>
          <div>
            <div className="seo-ai-overview__title">Appearing in AI Results</div>
            <div className="seo-ai-overview__note">{c.aiOverviewNote}</div>
          </div>
        </div>
      </div>

      {/* Right: Rankings panel */}
      <div className="seo-slide__rankings">
        <div className="seo-slide__meta">
          <span className="seo-slide__industry">{c.industry}</span>
          <h3 className="seo-slide__brand">{c.brand}</h3>
          <div className="seo-slide__period-tag" style={{ color: c.accentColor }}>
            <TrendingUp size={12} /> {c.ctrGrowth} growth in {c.period}
          </div>
        </div>

        <div className="seo-rankings-card">
          <div className="seo-rankings-card__head">
            <Search size={13} />
            <span>Keyword Rankings</span>
            <span className="seo-rankings-card__total" style={{ color: c.accentColor }}>
              {c.keywordsRanked} ranked
            </span>
          </div>
          <div className="seo-rankings-card__legend">
            <span>Keyword</span>
            <span>Vol</span>
            <span>Before → After</span>
          </div>
          {c.keywords.map(kw => (
            <KeywordRow key={kw.term} kw={kw} color={c.accentColor} active={active} />
          ))}
        </div>

        {/* Before / after summary pills */}
        <div className="seo-ba-strip">
          <div className="seo-ba-pill seo-ba-pill--before">
            <span className="seo-ba-pill__tag">Before</span>
            <span className="seo-ba-pill__val">{c.beforeClicks}</span>
            <span className="seo-ba-pill__key">clicks/mo</span>
          </div>
          <div className="seo-ba-arrow">→</div>
          <div className="seo-ba-pill seo-ba-pill--after"
            style={{ borderColor: `${c.accentColor}50`, background: `${c.accentColor}0d` }}>
            <span className="seo-ba-pill__tag" style={{ color: c.accentColor }}>After Cogent</span>
            <span className="seo-ba-pill__val" style={{ color: c.accentColor }}>{c.afterClicks}</span>
            <span className="seo-ba-pill__key">clicks/mo</span>
          </div>
        </div>

        <button onClick={openEnquiry}  className="seo-slide__cta" style={{ color: c.accentColor }}>
          Get results like this <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────── */
const AUTO_DELAY = 5000;

export default function SeoShowcase() {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.seo-sc-header > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.seo-sc-header', start: 'top 85%' } }
      );
    }, sectionRef);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slideW = track.scrollWidth / cases.length;
      const idx = Math.round(track.scrollLeft / slideW);
      setActive(Math.min(cases.length - 1, Math.max(0, idx)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slideW = track.scrollWidth / cases.length;
    track.scrollTo({ left: slideW * idx, behavior: 'smooth' });
    setActive(idx);
    pausedRef.current = true;
    setTimeout(() => { pausedRef.current = false; }, AUTO_DELAY + 500);
  };

  useEffect(() => {
    const schedule = () => {
      autoTimerRef.current = setTimeout(() => {
        if (!pausedRef.current) {
          setActive(prev => {
            const next = prev < cases.length - 1 ? prev + 1 : 0;
            const track = trackRef.current;
            if (track) {
              const slideW = track.scrollWidth / cases.length;
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

  return (
    <section ref={sectionRef} className="seo-sc-section" id="seo-showcase" aria-labelledby="seo-sc-h2">
      <div className="seo-sc-orb seo-sc-orb--1" />
      <div className="seo-sc-orb seo-sc-orb--2" />

      <div className="container">
        <div className="seo-sc-header">
          <span className="tag">Our Work</span>
          <h2 id="seo-sc-h2">Rankings We've <span className="text-gradient">Earned</span></h2>
          <p className="seo-sc-sub">Real GSC data. Real keyword movements. Real organic growth.</p>
        </div>
      </div>

      <div className="seo-sc-carousel-wrap"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}>
        <div ref={trackRef} className="seo-sc-carousel">
          {cases.map((c, i) => (
            <div key={c.id} className="seo-sc-carousel__item">
              <Slide c={c} active={active === i} />
            </div>
          ))}
        </div>
        <div className="seo-sc-fade seo-sc-fade--left" />
        <div className="seo-sc-fade seo-sc-fade--right" />
      </div>

      <div className="container">
        <div className="seo-sc-controls">
          <button className="seo-sc-btn" onClick={() => scrollTo(active - 1)}
            disabled={active === 0} aria-label="Previous">
            <ArrowLeft size={18} />
          </button>
          <div className="seo-sc-dots">
            {cases.map((c, i) => (
              <button key={c.id}
                className={`seo-sc-dot${active === i ? ' seo-sc-dot--active' : ''}`}
                style={{ '--dc': c.accentColor } as React.CSSProperties}
                onClick={() => scrollTo(i)}
                aria-label={c.brand}
              />
            ))}
          </div>
          <button className="seo-sc-btn" onClick={() => scrollTo(active + 1)}
            disabled={active === cases.length - 1} aria-label="Next">
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="seo-sc-footer">
          <button onClick={openEnquiry}  className="btn btn-primary">
            Get Your Free SEO Audit <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

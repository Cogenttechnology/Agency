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
    id: 'ankit-kayal',
    brand: 'Dr. Ankit Kayal',
    industry: 'Healthcare — Urology',
    accentColor: '#00d4aa',
    period: '6 Months',
    beforeClicks: '120/mo',  afterClicks: '4.8K/mo',
    beforeImpr: '3.2K/mo',  afterImpr: '68K/mo',
    ctrGrowth: '+3,900%',   keywordsRanked: '5+',
    aiOverviewNote: 'Ranking for "best urologist in jaipur" & "kidney detox drink" in AI Overviews',
    gsc: [
      { month: 'Jan', clicks: 5,  impr: 5,  clicksLabel: '120',  imprLabel: '3.2K' },
      { month: 'Feb', clicks: 12, impr: 14, clicksLabel: '580',  imprLabel: '9.5K' },
      { month: 'Mar', clicks: 24, impr: 30, clicksLabel: '1.1K', imprLabel: '20K'  },
      { month: 'Apr', clicks: 45, impr: 52, clicksLabel: '2.2K', imprLabel: '36K'  },
      { month: 'May', clicks: 70, impr: 75, clicksLabel: '3.4K', imprLabel: '51K'  },
      { month: 'Jun', clicks: 100,impr: 100,clicksLabel: '4.8K', imprLabel: '68K'  },
    ],
    keywords: [
      { term: 'best urologist in jaipur',         beforeRank: 58, afterRank: 1, volume: '8.1K/mo', aiResult: true },
      { term: 'top 5 urologist in jaipur',         beforeRank: 42, afterRank: 2, volume: '2.4K/mo' },
      { term: 'best urologist surgeon in jaipur',  beforeRank: 67, afterRank: 3, volume: '1.8K/mo' },
      { term: 'kidney detox drink',                beforeRank: 80, afterRank: 4, volume: '22K/mo',  aiResult: true },
    ],
  },
  {
    id: 'cks-hospital',
    brand: 'CKS Hospital',
    industry: 'Healthcare — Multispeciality',
    accentColor: '#6c63ff',
    period: '8 Months',
    beforeClicks: '410/mo',  afterClicks: '11.2K/mo',
    beforeImpr: '9.8K/mo',  afterImpr: '186K/mo',
    ctrGrowth: '+2,632%',   keywordsRanked: '10+',
    aiOverviewNote: 'Appearing in AI Results for cardiology & cancer hospital searches in Jaipur',
    gsc: [
      { month: 'Jan', clicks: 4,  impr: 5,  clicksLabel: '410',  imprLabel: '9.8K'  },
      { month: 'Feb', clicks: 9,  impr: 12, clicksLabel: '920',  imprLabel: '22K'   },
      { month: 'Mar', clicks: 18, impr: 24, clicksLabel: '1.9K', imprLabel: '45K'   },
      { month: 'May', clicks: 38, impr: 50, clicksLabel: '3.9K', imprLabel: '94K'   },
      { month: 'Jun', clicks: 65, impr: 74, clicksLabel: '6.7K', imprLabel: '138K'  },
      { month: 'Aug', clicks: 100,impr: 100,clicksLabel: '11.2K',imprLabel: '186K'  },
    ],
    keywords: [
      { term: 'best multispeciality hospital in jaipur', beforeRank: 52, afterRank: 1, volume: '9.4K/mo', aiResult: true },
      { term: 'best heart hospital in jaipur',           beforeRank: 44, afterRank: 2, volume: '5.8K/mo' },
      { term: 'best cardiologist in jaipur',             beforeRank: 71, afterRank: 3, volume: '6.2K/mo', aiResult: true },
      { term: 'best cancer hospital in jaipur',          beforeRank: 88, afterRank: 5, volume: '4.1K/mo' },
    ],
  },
  {
    id: 'noonmoon',
    brand: 'Noonmoon Events',
    industry: 'Events & Wedding Planning',
    accentColor: '#f59e0b',
    period: '5 Months',
    beforeClicks: '85/mo',   afterClicks: '3.6K/mo',
    beforeImpr: '2.1K/mo',  afterImpr: '52K/mo',
    ctrGrowth: '+4,135%',   keywordsRanked: '6+',
    aiOverviewNote: 'Dominating "event planner in jaipur" & "wedding planner in rajasthan" in local pack',
    gsc: [
      { month: 'Jan', clicks: 5,  impr: 4,  clicksLabel: '85',   imprLabel: '2.1K' },
      { month: 'Feb', clicks: 14, impr: 18, clicksLabel: '500',  imprLabel: '9.4K' },
      { month: 'Mar', clicks: 30, impr: 38, clicksLabel: '1.1K', imprLabel: '20K'  },
      { month: 'Apr', clicks: 55, impr: 60, clicksLabel: '2.0K', imprLabel: '31K'  },
      { month: 'May', clicks: 100,impr: 100,clicksLabel: '3.6K', imprLabel: '52K'  },
    ],
    keywords: [
      { term: 'event planner in jaipur',            beforeRank: 60, afterRank: 1, volume: '12K/mo', aiResult: true },
      { term: 'event management company in jaipur', beforeRank: 48, afterRank: 2, volume: '8.8K/mo' },
      { term: 'wedding planner in rajasthan',        beforeRank: 73, afterRank: 3, volume: '7.2K/mo', aiResult: true },
      { term: 'jaipur wedding planners',             beforeRank: 55, afterRank: 4, volume: '4.5K/mo' },
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

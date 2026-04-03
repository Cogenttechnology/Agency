import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { ArrowRight, TrendingUp, Users, Target, BarChart2, Zap, DollarSign } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './PerfShowcase.css';

/* ── Types ───────────────────────────────────────────────── */
export interface PerfMetric {
  icon: React.ElementType;
  label: string;
  countTo: number;
  suffix: string;
  prefix?: string;
  isDecimal?: boolean;
  color: string;
  desc: string;
}

export interface PerfCampaign {
  id: string;
  title: string;
  client: string;
  industry: string;
  platform: string;
  platformColor: string;
  adType: string;
  adHeadline: string;
  adBody: string;
  adCta: string;
  adAccent: string;
  adGradient: string;
  metrics: PerfMetric[];
  period: string;
}

/* ── Campaign Data ───────────────────────────────────────── */
const campaigns: PerfCampaign[] = [
  {
    id: 'pulsex',
    title: 'PulseX — E-Commerce Scale-Up',
    client: 'PulseX India',
    industry: 'E-Commerce / Fashion',
    platform: 'Google & Meta',
    platformColor: '#4285f4',
    adType: 'Shopping',
    adHeadline: 'Shop the Latest Drop — Up to 40% Off',
    adBody: 'Free shipping on orders above ₹999. Limited time offer on 500+ styles.',
    adCta: 'Shop Now',
    adAccent: '#a855f7',
    adGradient: 'linear-gradient(135deg, #1a0a2e 0%, #3d1a7a 60%, #6c2fcc 100%)',
    period: '90 Days',
    metrics: [
      { icon: TrendingUp, label: 'ROAS',              countTo: 8.4,  suffix: '×',   isDecimal: true,  color: '#a855f7', desc: 'Return on every ₹1 spent' },
      { icon: DollarSign, label: 'Revenue Generated', countTo: 4.2,  suffix: ' Cr', prefix: '₹',     isDecimal: true,  color: '#00d4aa', desc: 'Attributed revenue in Q4' },
      { icon: Users,      label: 'Orders Driven',     countTo: 18400, suffix: '',   isDecimal: false, color: '#f59e0b', desc: 'Confirmed conversions tracked' },
      { icon: Target,     label: 'CPL Reduction',     countTo: 62,   suffix: '%',   isDecimal: false, color: '#ff6b6b', desc: 'Lower cost per lead vs. before' },
    ],
  },
  {
    id: 'skyline',
    title: 'Skyline Group — Real Estate Leads',
    client: 'Skyline Realty Group',
    industry: 'Real Estate / Luxury',
    platform: 'Google Search',
    platformColor: '#34a853',
    adType: 'Search',
    adHeadline: '3BHK Flats in Mumbai — ₹1.2 Cr Onwards',
    adBody: 'RERA Approved. Ready Possession. Book a Free Site Visit Today.',
    adCta: 'Book Site Visit',
    adAccent: '#00d4aa',
    adGradient: 'linear-gradient(135deg, #041a14 0%, #0a3d2e 60%, #0d6b52 100%)',
    period: '6 Months',
    metrics: [
      { icon: Users,      label: 'Leads Generated',   countTo: 4200, suffix: '',    isDecimal: false, color: '#00d4aa', desc: 'Qualified site visit requests' },
      { icon: DollarSign, label: 'Pipeline Value',     countTo: 420,  suffix: ' Cr', prefix: '₹',     isDecimal: false, color: '#a855f7', desc: 'Total qualified deal pipeline' },
      { icon: Target,     label: 'Cost Per Lead',      countTo: 380,  suffix: '',   prefix: '₹',      isDecimal: false, color: '#f59e0b', desc: 'Down from ₹1,200 previously' },
      { icon: BarChart2,  label: 'CPL Reduction',      countTo: 68,   suffix: '%',   isDecimal: false, color: '#ff6b6b', desc: 'vs. previous agency benchmark' },
    ],
  },
  {
    id: 'fitlife',
    title: 'FitLife App — 2M Install Campaign',
    client: 'FitLife Technologies',
    industry: 'Health & Fitness App',
    platform: 'Meta & Google UAC',
    platformColor: '#1877f2',
    adType: 'App Install',
    adHeadline: 'Lose 5kg in 30 Days — Free for 1 Month',
    adBody: 'AI-powered workouts. Smart nutrition plans. Join 2M+ users worldwide.',
    adCta: 'Download Free',
    adAccent: '#5dd65a',
    adGradient: 'linear-gradient(135deg, #030f03 0%, #0d2e0d 60%, #155015 100%)',
    period: '45 Days',
    metrics: [
      { icon: Zap,        label: 'App Installs',       countTo: 2,    suffix: 'M+',  isDecimal: false, color: '#5dd65a', desc: 'Total verified installs' },
      { icon: Target,     label: 'Cost Per Install',   countTo: 12,   suffix: '',   prefix: '₹',      isDecimal: false, color: '#f59e0b', desc: 'CPI — 60% below benchmark' },
      { icon: TrendingUp, label: 'D30 Retention',      countTo: 41,   suffix: '%',   isDecimal: false, color: '#00d4aa', desc: 'Users still active after 30 days' },
      { icon: BarChart2,  label: 'Click-Through Rate', countTo: 4.8,  suffix: '%',   isDecimal: true,  color: '#a855f7', desc: '3× industry average CTR' },
    ],
  },
];

/* ── Ad Creative Mockup ──────────────────────────────────── */
function AdCreative({ campaign }: { campaign: PerfCampaign }) {
  return (
    <div className="psc-creative">
      {/* Platform / type label */}
      <div className="psc-creative__platform"
        style={{ '--p-color': campaign.platformColor } as React.CSSProperties}>
        <span className="psc-creative__platform-dot" />
        {campaign.platform} &middot; {campaign.adType} Ad
      </div>

      {/* The ad card visual */}
      <div className="psc-creative__ad" style={{ background: campaign.adGradient }}>
        <div className="psc-creative__grain" />
        <div className="psc-creative__orb"
          style={{ background: `radial-gradient(circle, ${campaign.adAccent}40 0%, transparent 70%)` }} />

        <div className="psc-creative__ad-body">
          <span className="psc-creative__sponsored"
            style={{ '--ad-accent': campaign.adAccent } as React.CSSProperties}>
            Sponsored
          </span>
          <h3 className="psc-creative__headline">{campaign.adHeadline}</h3>
          <p className="psc-creative__copy">{campaign.adBody}</p>
          <button className="psc-creative__cta"
            style={{ background: campaign.adAccent }}>
            {campaign.adCta} →
          </button>
        </div>

        {/* Blurred dashboard strip */}
        <div className="psc-creative__dashboard">
          <div className="psc-creative__dash-cols">
            {['CTR', 'CPC', 'Conv.', 'ROAS', 'Spend', 'Impr.'].map(l => (
              <div key={l} className="psc-creative__dash-col">
                <span className="psc-creative__dash-key">{l}</span>
                <span className="psc-creative__dash-val" />
              </div>
            ))}
          </div>
          <p className="psc-creative__dash-note">
            📊 Dashboard blurred — client confidentiality
          </p>
        </div>
      </div>

      <div className="psc-creative__meta">
        <span className="psc-creative__meta-client">{campaign.client}</span>
        <span className="psc-creative__meta-industry">{campaign.industry}</span>
      </div>
    </div>
  );
}

/* ── Stats Panel ─────────────────────────────────────────── */
function StatsPanel({ campaign, visible }: { campaign: PerfCampaign; visible: boolean }) {
  const { openEnquiry } = useEnquiry();
  const panelRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!visible || animated.current || !panelRef.current) return;
    animated.current = true;

    campaign.metrics.forEach((metric, i) => {
      const el = panelRef.current!.querySelector<HTMLElement>(
        `[data-mid="${campaign.id}-${i}"]`
      );
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: metric.countTo,
        duration: 2.2,
        delay: 0.18 * i,
        ease: 'power2.out',
        onUpdate: () => {
          const num = metric.isDecimal
            ? obj.val.toFixed(1)
            : Math.round(obj.val).toLocaleString('en-IN');
          el.textContent = (metric.prefix || '') + num + metric.suffix;
        },
      });
    });
  }, [visible, campaign]);

  return (
    <div ref={panelRef} className="psc-stats">
      <div className="psc-stats__head">
        <h3 className="psc-stats__campaign-title">{campaign.title}</h3>
        <span className="psc-stats__period">
          Results over <strong>{campaign.period}</strong>
        </span>
      </div>

      <div className="psc-stats__grid">
        {campaign.metrics.map((m, i) => {
          const Icon = m.icon as React.FC<{ size?: number }>;
          return (
            <div
              key={i}
              className="psc-metric"
              style={{ '--m-accent': m.color } as React.CSSProperties}
            >
              <div className="psc-metric__icon">
                <Icon size={16} />
              </div>
              <div className="psc-metric__content">
                <span className="psc-metric__value" data-mid={`${campaign.id}-${i}`}>
                  0
                </span>
                <span className="psc-metric__label">{m.label}</span>
                <span className="psc-metric__desc">{m.desc}</span>
              </div>
              <div className="psc-metric__bar-track">
                <div
                  className="psc-metric__bar-fill"
                  style={{
                    width: visible ? '85%' : '0%',
                    background: `linear-gradient(90deg, ${m.color}99, ${m.color})`,
                    transitionDelay: `${0.18 * i + 0.5}s`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={openEnquiry}  className="psc-stats__link">
        <span>Get Similar Results for Your Brand</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function PerfShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.psc-header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.psc-header', start: 'top 85%' },
        }
      );

      campaigns.forEach((c, i) => {
        const row = sectionRef.current?.querySelector<HTMLElement>(`.psc-row[data-id="${c.id}"]`);
        if (!row) return;

        const isRtl = i % 2 !== 0;
        const creative = row.querySelector('.psc-creative');
        const stats = row.querySelector('.psc-stats');

        gsap.fromTo(creative,
          { opacity: 0, x: isRtl ? 60 : -60 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%' },
          }
        );

        gsap.fromTo(stats,
          { opacity: 0, x: isRtl ? -60 : 60 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              onEnter: () => setVisible(prev => ({ ...prev, [c.id]: true })),
            },
          }
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="psc-section"
      id="campaign-showcase"
      aria-labelledby="psc-h2"
    >
      <div className="psc-bg-grid" aria-hidden="true" />
      <div className="psc-bg-orb psc-bg-orb--1" />
      <div className="psc-bg-orb psc-bg-orb--2" />

      <div className="container">
        <div className="psc-header">
          <span className="tag">Our Work</span>
          <h2 id="psc-h2">
            Campaigns That <span className="text-gradient">Moved the Needle</span>
          </h2>
          <p className="psc-sub">
            Real ad creatives. Real dashboards. Scroll to watch the numbers count up live.
          </p>
        </div>

        <div className="psc-rows">
          {campaigns.map((c, i) => (
            <div
              key={c.id}
              className={`psc-row psc-row--${i % 2 === 0 ? 'ltr' : 'rtl'}`}
              data-id={c.id}
            >
              {/* LTR: creative left, stats right. RTL flips via CSS order */}
              <AdCreative campaign={c} />
              <StatsPanel campaign={c} visible={!!visible[c.id]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

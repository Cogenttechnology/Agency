import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { Play, Pause, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './VideoShowcase.css';

export interface VideoItem {
  id: string;
  title: string;
  client: string;
  category: 'Cinematic Ad' | 'Brand Film' | 'Social Reel' | 'BTS' | 'Documentary' | 'UGC' | 'TVC' | 'Lifestyle' | 'Lead Ad' | 'AI Video' | 'Jewellery';
  campaignNote: string;
  views: string;
  duration: string;
  gradient: string;
  accentColor: string;
  tags: string[];
  src?: string;
}

interface VideoShowcaseProps {
  items: VideoItem[];
}

function CinematicCard({ item, index }: { item: VideoItem; index: number }) {
  const { openEnquiry } = useEnquiry();
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  // src is only set once the card is near the viewport — avoids loading all videos on mount
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  // Two-phase IntersectionObserver:
  // Phase 1 (rootMargin 200px) — set src so the browser can start buffering before visible
  // Phase 2 (threshold 0.4) — actually play/pause
  useEffect(() => {
    if (!item.src || !cardRef.current) return;

    // Phase 1: load src when card is 200px away
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(item.src);
          loadObserver.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    loadObserver.observe(cardRef.current);

    // Phase 2: play/pause when 40% visible
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    playObserver.observe(cardRef.current);

    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, [item.src]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().then(() => setPlaying(true)).catch(() => {}); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="cvs-card" data-index={index}>
      {/* Full-bleed video / gradient bg */}
      <div className="cvs-card__scene" style={item.src ? undefined : { background: item.gradient }}>
        {item.src && (
          <video
            ref={videoRef}
            className="cvs-card__video"
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
          />
        )}

        {/* Gradient fallback orbs */}
        {!item.src && (
          <>
            <div className="cvs-card__orb cvs-card__orb--1"
              style={{ background: `radial-gradient(circle, ${item.accentColor}66 0%, transparent 65%)` }} />
            <div className="cvs-card__orb cvs-card__orb--2"
              style={{ background: `radial-gradient(circle, ${item.accentColor}33 0%, transparent 65%)` }} />
          </>
        )}

        {/* Cinematic grain */}
        <div className="cvs-card__grain" />

        {/* Letterbox bars */}
        <div className="cvs-card__bar cvs-card__bar--top" />
        <div className="cvs-card__bar cvs-card__bar--bottom" />

        {/* Bottom gradient for text legibility */}
        <div className="cvs-card__fade" />

        {/* ── Top HUD ── */}
        <div className="cvs-card__hud-top">
          <span className="cvs-card__category" style={{ color: item.accentColor, borderColor: `${item.accentColor}55` }}>
            {item.category}
          </span>
          <div className="cvs-card__counter">
            <span className="cvs-card__counter-num">{String(index + 1).padStart(2, '0')}</span>
            <span className="cvs-card__counter-sep">/</span>
            <span className="cvs-card__counter-total">24</span>
          </div>
        </div>

        {/* ── Center controls ── */}
        <div className="cvs-card__center">
          {playing && <div className="cvs-card__scanline" />}
          <button className="cvs-card__play" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}
            style={{ '--cvs-accent': item.accentColor } as React.CSSProperties}>
            <span className="cvs-card__play-ring" />
            <span className="cvs-card__play-ring cvs-card__play-ring--2" />
            {playing ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}
          </button>
          {item.src && (
            <button className="cvs-card__mute" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
        </div>

        {/* ── Bottom info overlay ── */}
        <div className={`cvs-card__info cvs-card__info--${isEven ? 'left' : 'right'}`}>
          <div className="cvs-card__info-inner">
            <p className="cvs-card__client" style={{ color: item.accentColor }}>{item.client}</p>
            <h3 className="cvs-card__title">{item.title}</h3>
            <p className="cvs-card__note">{item.campaignNote}</p>
            <div className="cvs-card__tags">
              {item.tags.map(t => (
                <span key={t} className="cvs-card__tag">{t}</span>
              ))}
            </div>
            <button className="cvs-card__cta" onClick={openEnquiry}>
              <span>Discuss a Similar Project</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Accent line */}
          <div className="cvs-card__accent-line" style={{ background: item.accentColor }} />
        </div>

        {/* Playing indicator */}
        {playing && (
          <div className="cvs-card__live">
            <span className="cvs-card__live-dot" />
            PLAYING
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoShowcase({ items }: VideoShowcaseProps) {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo('.cvs-header > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.cvs-header', start: 'top 85%' } }
      );

      // Each card slides up + fades
      gsap.utils.toArray<Element>('.cvs-card').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            delay: i * 0.04,
          }
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cvs-section" id="video-showcase" aria-labelledby="cvs-h2">
      {/* Ambient background */}
      <div className="cvs-bg-orb cvs-bg-orb--1" />
      <div className="cvs-bg-orb cvs-bg-orb--2" />

      <div className="container">
        <div className="cvs-header">
          <span className="tag">Our Work</span>
          <h2 id="cvs-h2">
            Stories We've <span className="text-gradient">Brought to Life</span>
          </h2>
          <p className="cvs-sub">
            Real work. Real results. Each frame crafted with intention — from concept to colour grade.
          </p>
        </div>
      </div>

      {/* Full-width film strip */}
      <div className="cvs-strip">
        {items.map((item, i) => (
          <CinematicCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className="container">
        <div className="cvs-footer">
          <button onClick={openEnquiry} className="btn btn-primary cvs-cta-btn">
            <span>Start Your Video Project</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

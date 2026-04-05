import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './LifeAtCogent.css';

/* ─── Data ──────────────────────────────────────────────── */

const events = [
  {
    id: 1,
    title: 'Team Offsite 2024',
    description:
      'A refreshing retreat where our team bonded over workshops, strategy sessions, and a whole lot of laughter. Memories made, ideas sparked.',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    tag: 'Offsite',
  },
  {
    id: 2,
    title: 'Diwali Celebration',
    description:
      'Lights, sweets, and the Cogent spirit — our annual Diwali bash brought everyone together to celebrate the festival of lights in style.',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80',
    tag: 'Festival',
  },
  {
    id: 3,
    title: 'Brand Sprint Workshop',
    description:
      'A high-energy internal workshop where our strategists and creatives collaborated to push the boundaries of brand thinking.',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    tag: 'Workshop',
  },
  {
    id: 4,
    title: 'Cogent Turns 6',
    description:
      'Six years of bold ideas and measurable impact. We celebrated our anniversary with gratitude, cake, and a vision for what\'s next.',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    tag: 'Anniversary',
  },
  {
    id: 5,
    title: 'Campaign Launch Day',
    description:
      'The adrenaline of launch day — our team came together to push a landmark campaign live and watched the numbers climb in real-time.',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    tag: 'Campaign',
  },
  {
    id: 6,
    title: 'Friday Jam Sessions',
    description:
      'Every Friday, we unwind with music, snacks, and honest conversations. It\'s the heartbeat of our culture — informal, real, and fun.',
    type: 'image' as const,
    src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    tag: 'Culture',
  },
];

/* ─── Component ─────────────────────────────────────────── */

export default function LifeAtCogent() {
  const pageRef   = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        '.lac-hero__tag, .lac-hero__heading, .lac-hero__sub',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      );

      /* Cards scroll reveal */
      gsap.fromTo(
        '.lac-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="lac-page">

      {/* ── Hero ── */}
      <section ref={heroRef} className="lac-hero">
        <div className="lac-hero__orb lac-hero__orb--1" />
        <div className="lac-hero__orb lac-hero__orb--2" />
        <div className="container lac-hero__inner">
          <span className="lac-hero__tag">Our Culture</span>
          <h1 className="lac-hero__heading">
            Life at <span className="text-gradient">Cogent</span>
          </h1>
          <p className="lac-hero__sub">
            Behind every bold campaign is a team that works hard, laughs louder, and
            genuinely cares. Here's a peek into the moments that make Cogent, Cogent.
          </p>
        </div>
        <div className="lac-hero__grain" />
      </section>

      {/* ── Events Grid ── */}
      <section className="lac-events section">
        <div className="container">
          <div className="lac-section-header">
            <h2 className="lac-section-title">
              Moments &amp; <span className="text-gradient">Memories</span>
            </h2>
            <p className="lac-section-sub">
              From festivals to off-sites, workshops to Friday jams — every event
              adds to the story of who we are.
            </p>
          </div>

          <div ref={cardsRef} className="lac-grid">
            {events.map((ev) => (
              <div key={ev.id} className="lac-card">
                <div className="lac-card__media">
                  {ev.type === 'image' ? (
                    <img src={ev.src} alt={ev.title} className="lac-card__img" loading="lazy" />
                  ) : (
                    <video
                      src={ev.src}
                      className="lac-card__video"
                      controls
                      preload="metadata"
                    />
                  )}
                  <span className="lac-card__tag">{ev.tag}</span>
                </div>
                <div className="lac-card__body">
                  <h3 className="lac-card__title">{ev.title}</h3>
                  <p className="lac-card__desc">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

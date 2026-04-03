import { useEffect, useRef } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { ArrowRight, Award, Users, Globe, Lightbulb } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './About.css';

const team = [
  { name: 'Arjun Mehta', role: 'Creative Director', img: 'https://i.pravatar.cc/300?img=11' },
  { name: 'Priya Sharma', role: 'Head of Strategy', img: 'https://i.pravatar.cc/300?img=5' },
  { name: 'Rohan Das', role: 'Lead Developer', img: 'https://i.pravatar.cc/300?img=12' },
  { name: 'Neha Kapoor', role: 'Brand Strategist', img: 'https://i.pravatar.cc/300?img=9' },
];

const values = [
  { icon: Lightbulb, title: 'Bold Ideas', desc: 'We challenge convention and push creative boundaries.' },
  { icon: Users, title: 'Client-Centric', desc: 'Your goals are our north star, always.' },
  { icon: Globe, title: 'Global Thinking', desc: 'Local roots, global-scale execution and impact.' },
  { icon: Award, title: 'Proven Results', desc: 'We let outcomes do the talking.' },
];

const timeline = [
  { year: '2017', event: 'Founded in Mumbai by a team of brand obsessives.' },
  { year: '2019', event: 'Expanded to digital-first campaigns, 3x revenue growth.' },
  { year: '2021', event: 'Launched our in-house creative production studio.' },
  { year: '2023', event: 'Crossed 200+ brands served across 12 industries.' },
  { year: '2025', event: 'Opened our Dubai creative hub.' },
];

export default function About() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // Hero reveal
        gsap.fromTo('.about-hero__text > *',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.3 }
        );

        // Values cards
        gsap.fromTo('.value-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.values-grid', start: 'top 80%' } }
        );

        // Timeline items
        gsap.fromTo('.timeline-item',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.timeline', start: 'top 80%' } }
        );

        // Team cards
        gsap.fromTo('.team-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.team-grid', start: 'top 80%' } }
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
    <div ref={pageRef} className="about-page">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="about-hero section">
        <div className="container about-hero__inner">
          <div className="about-hero__text">
            <span className="tag">Who We Are</span>
            <h1>An Agency <br /><span className="text-gradient">Built Different</span></h1>
            <p>
              Cogent is a full-service marketing agency founded on one belief: great work comes from
              obsessing over your client's success. We blend strategy, creativity, and technology
              to build brands that don't just exist — they lead.
            </p>
            <button onClick={openEnquiry}  className="btn btn-primary" id="about-cta">
              <span>Work With Us</span>
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="about-hero__visual">
            <div className="about-blob" />
            <div className="about-stat-badge">
              <span className="about-stat-badge__value text-gradient">200+</span>
              <span className="about-stat-badge__label">Brands Built</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="section values-section">
        <div className="container">
          <div className="text-center mb-lg">
            <span className="tag">Our Philosophy</span>
            <h2 className="section-heading mt-sm">How We Think &amp; Work</h2>
          </div>
          <div className="values-grid">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="value-card glass">
                <div className="value-card__icon">
                  <Icon size={22} />
                </div>
                <h3 className="value-card__title">{title}</h3>
                <p className="value-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="section timeline-section">
        <div className="container">
          <span className="tag">Our Journey</span>
          <h2 className="section-heading mt-sm mb-lg">The Cogent Story</h2>
          <div className="timeline">
            {timeline.map(({ year, event }) => (
              <div key={year} className="timeline-item">
                <div className="timeline-year">{year}</div>
                <div className="timeline-dot" />
                <div className="timeline-event">{event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="section team-section">
        <div className="container">
          <div className="text-center mb-lg">
            <span className="tag">Meet the Crew</span>
            <h2 className="section-heading mt-sm">The Minds Behind It All</h2>
          </div>
          <div className="team-grid">
            {team.map(({ name, role, img }) => (
              <div key={name} className="team-card" id={`team-${name.split(' ')[0].toLowerCase()}`}>
                <div className="team-card__img-wrapper">
                  <img src={img} alt={name} className="team-card__img" />
                  <div className="team-card__overlay" />
                </div>
                <div className="team-card__info">
                  <h4 className="team-card__name">{name}</h4>
                  <span className="team-card__role">{role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

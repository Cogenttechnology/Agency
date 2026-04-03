import { useEffect, useRef } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import {
  ArrowRight, Users, Lightbulb, Shield, Award, TrendingUp,
  Heart,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import FaqAccordion from '../../components/FaqAccordion/FaqAccordion';
import './About.css';

/* ─── Data ──────────────────────────────────────────────── */

const stats = [
  { value: '6+',    label: 'Years in Business' },
  { value: '60+',   label: 'Marketing Professionals' },
  { value: '99.9%', label: 'Client Retention Ratio' },
  { value: '15+',   label: 'Industries Served' },
];

const values = [
  {
    icon: Heart,
    title: 'Client-Centric Approach',
    desc: 'Our clients come first. We prioritize understanding their unique needs and tailor solutions to ensure their success and satisfaction.',
    color: '#ff6b6b',
  },
  {
    icon: Lightbulb,
    title: 'Innovative Thinking',
    desc: 'We constantly push boundaries. Our commitment to innovation drives us to explore new ideas and technologies that keep our clients ahead.',
    color: '#f59e0b',
  },
  {
    icon: Shield,
    title: 'Integrity & Transparency',
    desc: 'We build trust through honesty. Our clients can count on open communication and ethical practices in every aspect of our work.',
    color: '#00d4aa',
  },
  {
    icon: Award,
    title: 'Excellence in Execution',
    desc: 'We believe in doing things right the first time. Our dedication to excellence ensures we deliver results that meet and exceed expectations.',
    color: '#6c63ff',
  },
  {
    icon: Users,
    title: 'Collaborative Partnerships',
    desc: 'We thrive on collaboration. Strong partnerships with our clients and within our team create synergy that enhances the value of our work.',
    color: '#ec4899',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Growth',
    desc: 'We never stop learning. We invest in our team\'s development and stay updated with industry trends to provide the most relevant solutions.',
    color: '#a855f7',
  },
];

const timeline = [
  {
    year: '2018',
    title: 'The Beginning',
    event: 'The story begins with a team dreaming of becoming the ace of marketing. Founded in Jaipur with a vision to deliver excellence.',
  },
  {
    year: '2019',
    title: 'First Major Milestones',
    event: 'Expanded service offerings and onboarded first major enterprise clients across healthcare and real estate sectors.',
  },
  {
    year: '2021',
    title: 'Studio Launch',
    event: 'Launched our in-house video production and photography studio — bringing cinematic brand storytelling under one roof.',
  },
  {
    year: '2022',
    title: 'Team of 40+',
    event: 'Crossed 40+ marketing professionals and expanded into D2C marketing, influencer campaigns, and performance advertising.',
  },
  {
    year: '2024',
    title: 'Delhi Expansion',
    event: 'Opened our Delhi office at Chandni Chowk, extending our reach and serving brands across North India at scale.',
  },
  {
    year: '2025',
    title: '60+ Strong & Growing',
    event: 'Today, 60+ professionals serve 15+ industries with a 99.9% client retention ratio. The best chapter is still being written.',
  },
];

const team = [
  { name: 'Mr. Nitin Jain',   role: 'Founder & Director',       initials: 'NJ', gradient: 'linear-gradient(135deg,#6c63ff,#3a35cc)' },
  { name: 'Mr. Mohit Bhal',   role: 'Co-Founder & Director',    initials: 'MB', gradient: 'linear-gradient(135deg,#00d4aa,#0099aa)' },
  { name: 'Mr. Ritik Munjal', role: 'Head of Creative & Studio', initials: 'RM', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { name: 'Mr. Aunip Jain',   role: 'Head of Digital Strategy',  initials: 'AJ', gradient: 'linear-gradient(135deg,#ec4899,#be185d)' },
];

const clients = [
  'Manglam Group', 'Nav Imperial Hospital', 'KGK Realty', 'CKS Hospital',
  'Sanjay Textile Store', 'R-Tech Group', 'Kirana King', 'Saras Dairy',
  'SBI Bank', 'Swiggy', 'Kuku FM', 'Vivo', 'Clarks Jaipur',
  'Shubhashish Group', 'Rajasthan Government', 'Hero',
];

const faqs = [
  {
    q: "What is The Cogent's core mission?",
    a: "The Cogent's mission is to provide cutting-edge digital marketing and web development solutions that empower businesses to thrive in the digital space.",
  },
  {
    q: "How long has The Cogent been in the digital marketing industry?",
    a: "The Cogent has been delivering innovative marketing strategies and website solutions for over 6+ years, helping businesses grow and adapt to evolving online trends.",
  },
  {
    q: "What services does The Cogent specialize in?",
    a: "The Cogent specializes in SEO, PPC, social media marketing, website development, video production, influencer marketing, and content creation to enhance brand visibility and online presence.",
  },
  {
    q: "Who are The Cogent's typical clients?",
    a: "We work with a diverse clientele — from startups to established businesses across 15+ industries — all seeking to optimize their digital marketing strategies and grow their online impact.",
  },
  {
    q: "What sets The Cogent apart from other digital marketing agencies?",
    a: "The Cogent stands out for its personalized approach, data-driven strategies, and a dedicated team that ensures every campaign aligns with the unique goals of each client.",
  },
];

/* ─── Component ─────────────────────────────────────────── */

export default function About() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {

        /* Hero */
        gsap.fromTo('.about-hero__tag',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' });
        gsap.fromTo('.about-hero__h1',   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
        gsap.fromTo('.about-hero__body', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
        gsap.fromTo('.about-hero__cta',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: 'power3.out' });
        gsap.fromTo('.about-hero__stat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 1.0, ease: 'power3.out' });
        gsap.fromTo('.about-hero__film-reel', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.0, delay: 0.6, ease: 'power3.out' });

        /* Origin story */
        gsap.fromTo('.origin-section .origin-text > *',
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.origin-section', start: 'top 80%' } }
        );
        gsap.fromTo('.origin-quote',
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.origin-quote', start: 'top 82%' } }
        );

        /* Values */
        gsap.fromTo('.value-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.values-section', start: 'top 78%' } }
        );

        /* Timeline */
        gsap.fromTo('.tl-item',
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, stagger: 0.15, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: '.timeline-section', start: 'top 78%' } }
        );

        /* Team */
        gsap.fromTo('.team-card',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.team-section', start: 'top 80%' } }
        );

        /* Clients marquee fade-in */
        gsap.fromTo('.about-clients-section > *',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-clients-section', start: 'top 82%' } }
        );

        /* FAQ */
        gsap.fromTo('.about-faq-item',
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-faq-section', start: 'top 80%' } }
        );

        /* CTA */
        gsap.fromTo('.about-cta-section > *',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-cta-section', start: 'top 82%' } }
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

      {/* ══════════════ CINEMATIC HERO ══════════════ */}
      <section className="about-hero">
        {/* Background orbs */}
        <div className="about-hero__orb about-hero__orb--1" />
        <div className="about-hero__orb about-hero__orb--2" />
        <div className="about-hero__orb about-hero__orb--3" />
        {/* Film grain overlay */}
        <div className="about-hero__grain" aria-hidden="true" />
        {/* Watermark */}
        <div className="about-hero__deco" aria-hidden="true">COGENT</div>

        <div className="container about-hero__grid">
          {/* Left copy */}
          <div className="about-hero__copy">
            <span className="tag about-hero__tag">Who We Are</span>
            <h1 className="about-hero__h1">
              Where the Story of<br />
              <span className="text-gradient">Great Marketing</span><br />
              Ace Began.
            </h1>
            <p className="about-hero__body">
              The story begins in 2018 with a team dreaming of becoming the ace of marketing.
              Incorporating innovation and strategic analysis with data-driven insights and
              creative thinking, we delivered excellence to our clients.
            </p>
            <button onClick={openEnquiry} className="btn btn-primary about-hero__cta" id="about-cta">
              <span>Work With Us</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right — cinematic stat film reel */}
          <div className="about-hero__visual">
            <div className="about-hero__film-reel" aria-hidden="true">
              <div className="film-strip film-strip--left">
                {[...Array(8)].map((_, i) => <div key={i} className="film-hole" />)}
              </div>
              <div className="film-content">
                {stats.map(({ value, label }) => (
                  <div key={label} className="about-hero__stat">
                    <span className="about-hero__stat-val text-gradient">{value}</span>
                    <span className="about-hero__stat-lbl">{label}</span>
                  </div>
                ))}
              </div>
              <div className="film-strip film-strip--right">
                {[...Array(8)].map((_, i) => <div key={i} className="film-hole" />)}
              </div>
            </div>
          </div>
        </div>

        <div className="about-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ══════════════ ORIGIN STORY ══════════════ */}
      <section className="section origin-section">
        <div className="container origin-inner">
          <div className="origin-text">
            <span className="tag">Our Origin</span>
            <h2>A Dream to Become<br /><span className="text-gradient">The Ace of Marketing</span></h2>
            <p>
              We envision a world where businesses can easily leverage innovative marketing
              solutions and resources. We aim to be the catalyst for success in every project
              we undertake.
            </p>
            <p>
              At The Cogent, we commit to proffer clarity and excellence to our clients —
              combining strategic analysis, data-driven insights, and bold creative thinking
              to deliver work that genuinely moves the needle.
            </p>
          </div>
          {/* Cinematic quote card */}
          <div className="origin-quote">
            <div className="origin-quote__lines" aria-hidden="true">
              {[...Array(6)].map((_, i) => <div key={i} className="origin-quote__line" />)}
            </div>
            <span className="origin-quote__mark">"</span>
            <p className="origin-quote__text">
              Your Success,<br />Our Commitment.
            </p>
            <p className="origin-quote__sub">
              We promise results, we deliver excellence.
            </p>
            <div className="origin-quote__badge">
              <span className="origin-quote__year">Est. 2018</span>
              <span className="origin-quote__city">Jaipur, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CORE VALUES ══════════════ */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="tag">Our Philosophy</span>
            <h2 className="section-heading mt-sm">What We Stand For</h2>
            <p className="section-subtext">
              Six principles that guide every campaign, every conversation, and every result we deliver.
            </p>
          </div>
          <div className="values-grid">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="value-card"
                style={{ '--val-color': color } as React.CSSProperties}
              >
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

      {/* ══════════════ CINEMATIC TIMELINE ══════════════ */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Our Journey</span>
            <h2 className="section-heading mt-sm">The Cogent Story</h2>
          </div>
          <div className="tl-track">
            {timeline.map(({ year, title, event }, i) => {
              const side = i % 2 === 0 ? 'left' : 'right';
              const node = (
                <div className="tl-node">
                  <div className="tl-node__dot" />
                  <div className="tl-node__pulse" />
                </div>
              );
              const card = (
                <div className="tl-card">
                  <span className="tl-card__year">{year}</span>
                  <h3 className="tl-card__title">{title}</h3>
                  <p className="tl-card__event">{event}</p>
                </div>
              );
              return (
                <div key={year} className={`tl-item tl-item--${side}`}>
                  {side === 'left' ? (
                    <>{card}{node}<div /></>
                  ) : (
                    <><div />{node}{card}</>
                  )}
                </div>
              );
            })}
            <div className="tl-spine" />
          </div>
        </div>
      </section>

      {/* ══════════════ LEADERSHIP TEAM ══════════════ */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="tag">Leadership</span>
            <h2 className="section-heading mt-sm">The Minds Behind It All</h2>
            <p className="section-subtext">
              Visionaries, strategists, and creators who built Cogent from the ground up.
            </p>
          </div>
          <div className="team-grid">
            {team.map(({ name, role, initials, gradient }) => (
              <div key={name} className="team-card">
                <div className="team-card__avatar-wrap">
                  <div
                    className="team-card__avatar"
                    style={{ background: gradient }}
                  >
                    <span className="team-card__initials">{initials}</span>
                    <div className="team-card__avatar-shine" />
                  </div>
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

      {/* ══════════════ CLIENTS MARQUEE ══════════════ */}
      <section className="section--sm about-clients-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="tag">Trusted By</span>
            <h2 className="section-heading mt-sm">
              The Trust Motivates Us<br />to Deliver the Best
            </h2>
          </div>
        </div>
        <div className="about-marquee-wrapper">
          <div className="about-marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="about-marquee-item">{c}</span>
            ))}
          </div>
        </div>
        <div className="about-marquee-wrapper about-marquee-wrapper--reverse">
          <div className="about-marquee-track about-marquee-track--reverse">
            {[...clients].reverse().concat([...clients].reverse()).map((c, i) => (
              <span key={i} className="about-marquee-item about-marquee-item--outline">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="section about-faq-section">
        <div className="container about-faq-inner">
          <div className="about-faq-left">
            <span className="tag">FAQ</span>
            <h2 className="section-heading mt-sm">Questions About<br />The Cogent</h2>
            <p className="about-faq-sub">
              Still curious?{' '}
              <button onClick={openEnquiry} className="about-faq-link">Talk to us →</button>
            </p>
          </div>
          <div className="about-faq-list">
            <FaqAccordion items={faqs} classBase="about" />
          </div>
        </div>
      </section>

      {/* ══════════════ CINEMATIC CTA ══════════════ */}
      <section className="section about-cta-section">
        <div className="about-cta-bg" aria-hidden="true">
          <div className="about-cta-bg__orb about-cta-bg__orb--1" />
          <div className="about-cta-bg__orb about-cta-bg__orb--2" />
          <div className="about-cta-bg__lines">
            {[...Array(8)].map((_, i) => <div key={i} className="about-cta-bg__line" />)}
          </div>
        </div>
        <div className="container about-cta-content">
          <span className="tag">Join Us</span>
          <h2 className="section-heading about-cta-heading">
            Make Your Brand<br />
            <span className="text-gradient">A Known Name!</span>
          </h2>
          <p className="about-cta-sub">
            Partner with The Cogent to amplify your brand's presence. Our innovative
            strategies and dedicated team ensure your success in a competitive market.
          </p>
          <div className="about-cta-actions">
            <button onClick={openEnquiry} className="btn btn-primary" id="about-bottom-cta">
              <span>Let's Connect</span>
              <ArrowRight size={18} />
            </button>
            <a href="tel:+919785957575" className="btn btn-outline">
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

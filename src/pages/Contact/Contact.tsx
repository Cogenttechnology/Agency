import { useEffect, useRef, useState } from 'react';

import { Mail, Phone, MapPin, Send, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './Contact.css';

const services = [
  { id: 'performance', label: 'Performance Marketing', color: '#a855f7' },
  { id: 'video', label: 'Video Production', color: '#ff6b6b' },
  { id: 'seo', label: 'SEO', color: '#00d4aa' },
  { id: 'social', label: 'Social Media', color: '#f59e0b' },
  { id: 'influencer', label: 'Influencer Marketing', color: '#ec4899' },
  { id: 'web', label: 'Web Design & Dev', color: '#6c63ff' },
];

const budgets = [
  { id: 'under50', label: 'Under ₹50K' },
  { id: '50-150', label: '₹50K – ₹1.5L' },
  { id: '150-500', label: '₹1.5L – ₹5L' },
  { id: '500plus', label: '₹5L+' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@cogent.agency', href: 'mailto:hello@cogent.agency', color: '#a855f7' },
  { icon: Phone, label: 'Phone', value: '+91 00 0000 0000', href: 'tel:+910000000000', color: '#00d4aa' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, India', href: '#', color: '#ff6b6b' },
];

const clients = [
  { name: 'Brandify', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  { name: 'NovaSpark', color: '#ff6b6b', bg: 'rgba(255,107,107,0.12)' },
  { name: 'Zenith Co', color: '#00d4aa', bg: 'rgba(0,212,170,0.12)' },
  { name: 'PulseMedia', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  { name: 'Ecliptic', color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
  { name: 'Axion Labs', color: '#6c63ff', bg: 'rgba(108,99,255,0.12)' },
  { name: 'Momentum', color: '#ff6b6b', bg: 'rgba(255,107,107,0.12)' },
  { name: 'Catalyst', color: '#00d4aa', bg: 'rgba(0,212,170,0.12)' },
];

const stats = [
  { value: '150+', label: 'Brands Served' },
  { value: '₹50Cr+', label: 'Ad Spend Managed' },
  { value: '3.8×', label: 'Avg. ROAS' },
  { value: '98%', label: 'Client Retention' },
];

export default function Contact() {
  const pageRef  = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo('.ct-hero__badge, .ct-hero__heading, .ct-hero__sub',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
        gsap.fromTo('.ct-info-item',
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
        );
        gsap.fromTo('.ct-form-card',
          { opacity: 0, y: 50, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
        );
        gsap.fromTo('.ct-stat',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: '.ct-stats', start: 'top 85%' } }
        );
        gsap.fromTo('.ct-client-pill',
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.ct-clients-grid', start: 'top 85%' } }
        );
      }, pageRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _action: 'submit',
        source: 'contact',
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        services: selectedServices,
        budget: selectedBudget,
        message: form.message,
      }),
    }).catch(err => console.error('Enquiry submit error:', err));
    gsap.to('.ct-form-card', {
      scale: 0.97, opacity: 0, duration: 0.3,
      onComplete: () => { setSubmitted(true); },
    });
  };

  return (
    <div ref={pageRef} className="contact-page">

      {/* ── Hero / Form Section ───────────────────────────────── */}
      <section className="ct-hero section">
        <div className="ct-orb ct-orb--1" />
        <div className="ct-orb ct-orb--2" />

        <div className="container ct-hero__inner">
          {/* Left: heading + info */}
          <div className="ct-hero__left">
            <span className="ct-hero__badge tag">
              <Sparkles size={12} style={{ display: 'inline', marginRight: 6 }} />
              Let's Build Something Big
            </span>
            <h1 className="ct-hero__heading">
              Ready to <span className="text-gradient">Grow Your</span><br />Brand with Us?
            </h1>
            <p className="ct-hero__sub">
              Drop us a message and our team will respond within 24 hours. No sales pressure — just a real conversation.
            </p>

            <ul className="ct-info-list">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <li key={label} className="ct-info-item">
                  <a href={href} className="ct-info-link">
                    <span className="ct-info-icon" style={{ '--ci-color': color } as React.CSSProperties}>
                      <Icon size={16} />
                    </span>
                    <div>
                      <span className="ct-info-label">{label}</span>
                      <span className="ct-info-value">{value}</span>
                    </div>
                    <ArrowRight size={14} className="ct-info-arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form Card */}
          <div className="ct-hero__right">
            {!submitted ? (
              <div className="ct-form-card glass">
                <div className="ct-form-card__header">
                  <h2>Send Us an Enquiry</h2>
                  <p>Fill in the details and we'll get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="ct-form">
                  {/* Row: Name + Email */}
                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label className="ct-form__label" htmlFor="name">Full Name *</label>
                      <input
                        id="name" name="name" type="text" required
                        className="ct-form__input" placeholder="Arjun Mehta"
                        value={form.name} onChange={handleChange}
                      />
                    </div>
                    <div className="ct-form__group">
                      <label className="ct-form__label" htmlFor="email">Email *</label>
                      <input
                        id="email" name="email" type="email" required
                        className="ct-form__input" placeholder="hello@brand.com"
                        value={form.email} onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row: Phone + Company */}
                  <div className="ct-form__row">
                    <div className="ct-form__group">
                      <label className="ct-form__label" htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone" name="phone" type="tel" required
                        className="ct-form__input" placeholder="+91 98765 43210"
                        value={form.phone} onChange={handleChange}
                      />
                    </div>
                    <div className="ct-form__group">
                      <label className="ct-form__label" htmlFor="company">Company / Brand</label>
                      <input
                        id="company" name="company" type="text"
                        className="ct-form__input" placeholder="Your Company Name"
                        value={form.company} onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Services */}
                  <div className="ct-form__group">
                    <label className="ct-form__label">Services Interested In</label>
                    <div className="ct-chips">
                      {services.map(s => (
                        <button
                          key={s.id} type="button"
                          className={`ct-chip${selectedServices.includes(s.id) ? ' ct-chip--active' : ''}`}
                          style={{ '--chip-color': s.color } as React.CSSProperties}
                          onClick={() => toggleService(s.id)}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="ct-form__group">
                    <label className="ct-form__label">Monthly Budget</label>
                    <div className="ct-budget-pills">
                      {budgets.map(b => (
                        <button
                          key={b.id} type="button"
                          className={`ct-budget-pill${selectedBudget === b.id ? ' ct-budget-pill--active' : ''}`}
                          onClick={() => setSelectedBudget(b.id)}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="ct-form__group">
                    <label className="ct-form__label" htmlFor="message">Tell us about your project *</label>
                    <textarea
                      id="message" name="message" rows={4} required
                      className="ct-form__input ct-form__textarea"
                      placeholder="We're launching a new brand and need help with..."
                      value={form.message} onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="ct-form__submit btn btn-primary">
                    <span>Send Enquiry</span>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            ) : (
              <div className="ct-success glass">
                <div className="ct-success__icon">
                  <CheckCircle size={48} />
                </div>
                <h3>You're all set!</h3>
                <p>We've received your enquiry and will reach out within 24 hours.</p>
                <p className="ct-success__sub">Check your inbox for a confirmation.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────── */}
      <section className="ct-stats section--sm">
        <div className="container ct-stats__grid">
          {stats.map(s => (
            <div key={s.label} className="ct-stat">
              <span className="ct-stat__value text-gradient">{s.value}</span>
              <span className="ct-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trusted By ──────────────────────────────────────── */}
      <section className="ct-clients section">
        <div className="container">
          <div className="ct-clients__head">
            <span className="tag">Trusted By</span>
            <h2>Brands That <span className="text-gradient">Chose Cogent</span></h2>
            <p>We've partnered with startups, D2C brands, and enterprise teams across industries.</p>
          </div>

          <div className="ct-clients-grid">
            {clients.map(c => (
              <div
                key={c.name}
                className="ct-client-pill"
                style={{ '--cp-color': c.color, '--cp-bg': c.bg } as React.CSSProperties}
              >
                <span className="ct-client-pill__dot" />
                <span className="ct-client-pill__name">{c.name}</span>
              </div>
            ))}
          </div>

          <div className="ct-clients__cta">
            <p>Your brand could be next.</p>
            <a href="#contact-form" className="btn btn-outline" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Start a Conversation <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <ClientLogos />
    </div>
  );
}

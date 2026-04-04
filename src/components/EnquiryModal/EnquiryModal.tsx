import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { X, Send, Sparkles } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { useEnquiry } from '../../context/EnquiryContext';
import './EnquiryModal.css';

const services = [
  { id: 'performance', label: 'Performance Marketing', color: '#a855f7' },
  { id: 'video',       label: 'Video Production',      color: '#ff6b6b' },
  { id: 'seo',         label: 'SEO',                   color: '#00d4aa' },
  { id: 'social',      label: 'Social Media',           color: '#f59e0b' },
  { id: 'influencer',  label: 'Influencer Marketing',  color: '#ec4899' },
  { id: 'web',         label: 'Web Design & Dev',       color: '#6c63ff' },
];

const budgets = [
  { id: 'under50',  label: 'Under ₹50K'    },
  { id: '50-150',   label: '₹50K – ₹1.5L' },
  { id: '150-500',  label: '₹1.5L – ₹5L'  },
  { id: '500plus',  label: '₹5L+'          },
];

export default function EnquiryModal() {
  const { isOpen, closeEnquiry } = useEnquiry();
  const navigate   = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget]     = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport width
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 560);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Animate in / out
  useEffect(() => {
    const overlay = overlayRef.current;
    const card    = cardRef.current;
    if (!overlay || !card) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(card,
        { opacity: 0, y: 30, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(card, { opacity: 0, y: 20, scale: 0.97, duration: 0.22, ease: 'power2.in' });
      gsap.to(overlay, {
        opacity: 0, duration: 0.28, ease: 'power2.in', delay: 0.08,
        onComplete: () => { gsap.set(overlay, { display: 'none' }); },
      });
    }
  }, [isOpen]);

  // Reset on reopen
  useEffect(() => {
    if (isOpen) {
      setSelectedServices([]);
      setSelectedBudget('');
      setForm({ name: '', email: '', phone: '', company: '', message: '' });
    }
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeEnquiry(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeEnquiry]);

  const toggleService = (id: string) =>
    setSelectedServices(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleServicesSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedServices(Array.from(e.target.selectedOptions).map(o => o.value));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _action: 'submit',
        source: 'modal',
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        services: selectedServices,
        budget: selectedBudget,
        message: form.message,
      }),
    }).catch(err => console.error('Enquiry submit error:', err));
    gsap.to(cardRef.current, {
      opacity: 0, scale: 0.97, duration: 0.22,
      onComplete: () => {
        closeEnquiry();
        navigate('/thank-you');
      },
    });
  };

  return (
    <div ref={overlayRef} className="enq-overlay" style={{ display: 'none' }}
      onClick={e => { if (e.target === overlayRef.current) closeEnquiry(); }}
      role="dialog" aria-modal="true" aria-label="Enquiry Form">

      <div ref={cardRef} className="enq-card glass">
        <button className="enq-close" onClick={closeEnquiry} aria-label="Close">
          <X size={16} />
        </button>

        <div className="enq-card__header">
          <span className="enq-card__badge tag">
            <Sparkles size={10} style={{ display: 'inline', marginRight: 5 }} />
            Let's Build Something Big
          </span>
          <h2 className="enq-card__title">Send Us an Enquiry</h2>
          <p className="enq-card__sub">We'll respond within 24 hours. No pressure, just a real conversation.</p>
        </div>

        <form onSubmit={handleSubmit} className="enq-form">

          {/* Row 1: Name + Email */}
          <div className="enq-form__row">
            <div className="enq-form__group">
              <label className="enq-form__label" htmlFor="enq-name">Full Name *</label>
              <input id="enq-name" name="name" type="text" required
                className="enq-form__input" placeholder="Arjun Mehta"
                value={form.name} onChange={handleChange} />
            </div>
            <div className="enq-form__group">
              <label className="enq-form__label" htmlFor="enq-email">Email *</label>
              <input id="enq-email" name="email" type="email" required
                className="enq-form__input" placeholder="hello@brand.com"
                value={form.email} onChange={handleChange} />
            </div>
          </div>

          {/* Row 2: Phone + Company */}
          <div className="enq-form__row">
            <div className="enq-form__group">
              <label className="enq-form__label" htmlFor="enq-phone">Phone *</label>
              <input id="enq-phone" name="phone" type="tel" required
                className="enq-form__input" placeholder="+91 98765 43210"
                value={form.phone} onChange={handleChange} />
            </div>
            <div className="enq-form__group">
              <label className="enq-form__label" htmlFor="enq-company">Company / Brand</label>
              <input id="enq-company" name="company" type="text"
                className="enq-form__input" placeholder="Your Company Name"
                value={form.company} onChange={handleChange} />
            </div>
          </div>

          {/* Services */}
          <div className="enq-form__group">
            <label className="enq-form__label" htmlFor="enq-services">Services Interested In</label>
            {isMobile ? (
              <>
                <select id="enq-services" multiple
                  className="enq-form__input enq-form__select"
                  value={selectedServices} onChange={handleServicesSelect}>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <p className="enq-form__hint">Hold Ctrl / Cmd to select multiple</p>
              </>
            ) : (
              <div className="enq-chips">
                {services.map(s => (
                  <button key={s.id} type="button"
                    className={`enq-chip${selectedServices.includes(s.id) ? ' enq-chip--active' : ''}`}
                    style={{ '--chip-color': s.color } as React.CSSProperties}
                    onClick={() => toggleService(s.id)}>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Budget */}
          <div className="enq-form__group">
            <label className="enq-form__label" htmlFor="enq-budget">Monthly Budget</label>
            {isMobile ? (
              <select id="enq-budget"
                className="enq-form__input enq-form__select"
                value={selectedBudget} onChange={e => setSelectedBudget(e.target.value)}>
                <option value="">Select a range…</option>
                {budgets.map(b => (
                  <option key={b.id} value={b.id}>{b.label}</option>
                ))}
              </select>
            ) : (
              <div className="enq-budget-pills">
                {budgets.map(b => (
                  <button key={b.id} type="button"
                    className={`enq-budget-pill${selectedBudget === b.id ? ' enq-budget-pill--active' : ''}`}
                    onClick={() => setSelectedBudget(b.id)}>
                    {b.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="enq-form__group">
            <label className="enq-form__label" htmlFor="enq-message">About Your Project *</label>
            <textarea id="enq-message" name="message" rows={2} required
              className="enq-form__input enq-form__textarea"
              placeholder="We're launching a new brand and need help with..."
              value={form.message} onChange={handleChange} />
          </div>

          <button type="submit" className="enq-submit btn btn-primary">
            <span>Send Enquiry</span>
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}

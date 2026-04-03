import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, FileText, X, Sparkles } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import './FloatingCTA.css';

const WHATSAPP_NUMBER = '919829XXXXXX'; // replace with actual number
const PHONE_NUMBER    = '+91 98290 XXXXX'; // replace with actual number
const PHONE_HREF      = 'tel:+9198290XXXXX';

export default function FloatingCTA() {
  const { openEnquiry } = useEnquiry();
  const [open, setOpen]     = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show after 2 s on page
  useEffect(() => {
    timerRef.current = setTimeout(() => setVisible(true), 2000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const toggle = () => setOpen(o => !o);

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hi! I'm interested in your digital marketing services. Can we talk?");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener');
    setOpen(false);
  };

  const handlePhone = () => {
    window.location.href = PHONE_HREF;
    setOpen(false);
  };

  const handleEnquiry = () => {
    openEnquiry();
    setOpen(false);
  };

  if (!visible) return null;

  return (
    <div className={`fcta${open ? ' fcta--open' : ''}`} aria-label="Contact options">

      {/* ── Backdrop blur layer (click to close) ── */}
      {open && <div className="fcta__backdrop" onClick={() => setOpen(false)} />}

      {/* ── Action buttons (fan upward) ── */}
      <div className="fcta__actions" aria-hidden={!open}>

        {/* Enquiry Form */}
        <button
          className="fcta__btn fcta__btn--enquiry"
          onClick={handleEnquiry}
          tabIndex={open ? 0 : -1}
          aria-label="Open Enquiry Form"
        >
          <span className="fcta__btn-icon"><FileText size={20} /></span>
          <span className="fcta__btn-label">Enquiry Form</span>
        </button>

        {/* Phone */}
        <button
          className="fcta__btn fcta__btn--phone"
          onClick={handlePhone}
          tabIndex={open ? 0 : -1}
          aria-label={`Call us at ${PHONE_NUMBER}`}
        >
          <span className="fcta__btn-icon"><Phone size={20} /></span>
          <span className="fcta__btn-label">Call Us</span>
        </button>

        {/* WhatsApp */}
        <button
          className="fcta__btn fcta__btn--whatsapp"
          onClick={handleWhatsApp}
          tabIndex={open ? 0 : -1}
          aria-label="Chat on WhatsApp"
        >
          {/* WhatsApp SVG icon */}
          <span className="fcta__btn-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
          <span className="fcta__btn-label">WhatsApp</span>
        </button>
      </div>

      {/* ── Toggle FAB ── */}
      <button
        className="fcta__fab"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
      >
        <span className="fcta__fab-ring" />
        <span className="fcta__fab-icon">
          {open
            ? <X size={22} />
            : <Sparkles size={22} />
          }
        </span>
        {!open && <span className="fcta__fab-pulse" />}
      </button>
    </div>
  );
}

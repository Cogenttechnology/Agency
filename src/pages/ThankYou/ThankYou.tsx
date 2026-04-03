import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import './ThankYou.css';

export default function ThankYou() {
  const navigate   = useNavigate();
  const pageRef    = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<SVGCircleElement>(null);
  const [count, setCount] = useState(5);

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ty-icon',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.2 }
      );
      gsap.fromTo('.ty-heading, .ty-sub, .ty-meta',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
      gsap.fromTo('.ty-actions',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.9 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  /* Countdown + animate SVG ring */
  useEffect(() => {
    if (!ringRef.current) return;
    const circumference = 2 * Math.PI * 44; // r=44
    ringRef.current.style.strokeDasharray  = `${circumference}`;
    ringRef.current.style.strokeDashoffset = '0';

    // Animate dash over 5 seconds
    gsap.to(ringRef.current, {
      strokeDashoffset: circumference,
      duration: 5,
      ease: 'none',
    });

    // Countdown ticker
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(interval);
          navigate('/');
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div ref={pageRef} className="ty-page">
      {/* background orbs */}
      <div className="ty-orb ty-orb--1" />
      <div className="ty-orb ty-orb--2" />

      <div className="ty-card glass">
        {/* Animated check icon */}
        <div className="ty-icon">
          <CheckCircle size={64} strokeWidth={1.5} />
        </div>

        <h1 className="ty-heading">
          Thank You! <span className="text-gradient">We Got It.</span>
        </h1>
        <p className="ty-sub">
          Your enquiry has been received. Our team will reach out within <strong>24 hours</strong>.<br />
          No pressure — just a real conversation.
        </p>

        {/* Countdown ring */}
        <div className="ty-countdown">
          <svg width="100" height="100" viewBox="0 0 100 100">
            {/* Track */}
            <circle cx="50" cy="50" r="44" className="ty-ring-track" />
            {/* Progress */}
            <circle
              ref={ringRef}
              cx="50" cy="50" r="44"
              className="ty-ring-fill"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="ty-countdown__num">
            <span>{count}</span>
            <small>sec</small>
          </div>
        </div>

        <p className="ty-meta">Redirecting to home in {count} second{count !== 1 ? 's' : ''}…</p>

        <div className="ty-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            <span>Go Home Now</span>
            <ArrowRight size={16} />
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/services')}>
            Explore Services
          </button>
        </div>
      </div>
    </div>
  );
}

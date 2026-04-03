import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './PageTransition.css';

interface Props {
  children: ReactNode;
}

export default function PageTransition({ children }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current!;

    const tl = gsap.timeline({
      onComplete: () => ScrollTrigger.refresh(),
    });

    tl.to(overlay, { scaleY: 0, duration: 0.7, ease: 'power3.inOut' });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="page-transition-wrapper">
      <div ref={overlayRef} className="page-transition-overlay" />
      <div className="page-transition-content">
        {children}
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

export default function ServiceBlobCanvas({ color }: { color: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Gentle floating + morphing animation
    gsap.to(el.querySelector('.svc-blob'), {
      scale: 1.08,
      borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
      duration: 3.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to(el.querySelector('.svc-blob'), {
      y: -14,
      duration: 2.8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to(el.querySelector('.svc-blob-inner'), {
      scale: 0.92,
      duration: 2.2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    gsap.to(el.querySelector('.svc-blob-glow'), {
      opacity: 0.6,
      scale: 1.2,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div ref={wrapRef} className="svc-blob-wrap" style={{ '--blob-color': color } as React.CSSProperties}>
      <div className="svc-blob-glow" />
      <div className="svc-blob">
        <div className="svc-blob-inner" />
      </div>
    </div>
  );
}

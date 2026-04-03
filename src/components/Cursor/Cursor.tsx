import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    const xTo  = gsap.quickTo(cursor,   'x', { duration: 0.1, ease: 'power3.out' });
    const yTo  = gsap.quickTo(cursor,   'y', { duration: 0.1, ease: 'power3.out' });
    const xToF = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power3.out' });
    const yToF = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power3.out' });

    // Throttle to one update per animation frame — prevents 480 GSAP calls/sec
    let rafId = 0;
    let pendingX = 0;
    let pendingY = 0;

    const onMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (rafId) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        xTo(pendingX);
        yTo(pendingY);
        xToF(pendingX);
        yToF(pendingY);
        rafId = 0;
      });
    };

    // Use event delegation on document instead of attaching to every element.
    // This also handles elements added after mount (route changes) automatically —
    // no MutationObserver needed.
    const onEnter = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor]')) {
        cursor.classList.add('cursor--active');
        follower.classList.add('follower--active');
      }
    };

    const onLeave = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [data-cursor]')) {
        cursor.classList.remove('cursor--active');
        follower.classList.remove('follower--active');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}

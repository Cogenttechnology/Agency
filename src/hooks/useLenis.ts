import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisInstance = lenis;

    // Drive Lenis from GSAP's ticker so they share the same RAF loop.
    // This keeps ScrollTrigger's scroll position perfectly in sync with Lenis.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP ticker from lagging on the first few frames
    gsap.ticker.lagSmoothing(0);

    // Notify ScrollTrigger whenever Lenis actually scrolls
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.off('scroll', ScrollTrigger.update);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore – GSAP Flip type file has a casing mismatch on Windows (flip.d.ts vs Flip.js)
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';

// Register all plugins once (Browser only)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin);
}

export { gsap, ScrollTrigger, Flip };

// ── Reusable animation helpers ──────────────────────────

/** Reveals an element by fading up from below */
export function fadeUpReveal(
  target: string | Element | Element[],
  trigger?: Element | string,
  delay = 0
) {
  return gsap.fromTo(
    target,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? {
          trigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
        : undefined,
    }
  );
}

/** Staggered reveal for a list of child elements */
export function staggerReveal(
  parent: Element | string,
  childSelector: string,
  delay = 0
) {
  const children = gsap.utils.toArray(
    typeof parent === 'string'
      ? `${parent} ${childSelector}`
      : (parent as Element).querySelectorAll(childSelector)
  );

  return gsap.fromTo(
    children,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: typeof parent === 'string' ? parent : parent as Element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/** Horizontal line/bar animate */
export function expandWidth(
  target: string | Element,
  trigger?: Element | string
) {
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left' },
    {
      scaleX: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? { trigger, start: 'top 80%', toggleActions: 'play none none none' }
        : undefined,
    }
  );
}

/** Quick magnetic effect — attach to mouse events */
export function magneticHover(el: Element, strength = 0.4) {
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

  const onMove = (e: MouseEvent) => {
    const rect = (el as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xTo((e.clientX - cx) * strength);
    yTo((e.clientY - cy) * strength);
  };

  const onLeave = () => { xTo(0); yTo(0); };

  el.addEventListener('mousemove', onMove as EventListener);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove', onMove as EventListener);
    el.removeEventListener('mouseleave', onLeave);
  };
}

export default gsap;

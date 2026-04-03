import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './WorkShowcase.css';

export interface WorkItem {
  title: string;
  category: string;
  result: string;
  gradient: string;
  tags: string[];
}

interface WorkShowcaseProps {
  color: string;
  items: WorkItem[];
}

export default function WorkShowcase({ color, items }: WorkShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.wsc-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
      gsap.fromTo('.wsc-header > *',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="wsc-section" id="work-showcase" aria-labelledby="wsc-h2">
      <div className="container">
        <div className="wsc-header">
          <span className="tag">Our Work</span>
          <h2 id="wsc-h2">Results We've Delivered</h2>
          <p className="wsc-sub">
            A snapshot of campaigns and projects where our work made a measurable difference.
          </p>
        </div>

        <div className="wsc-grid">
          {items.map((item) => (
            <article key={item.title} className="wsc-card">
              {/* Visual */}
              <div className="wsc-card__visual" style={{ background: item.gradient }}>
                {/* Atmosphere blobs */}
                <div className="wsc-card__blob wsc-card__blob--1" />
                <div className="wsc-card__blob wsc-card__blob--2" />
                {/* Hover overlay */}
                <div className="wsc-card__visual-overlay" />
                <div className="wsc-card__visual-arrow">
                  <ArrowUpRight size={20} />
                </div>
                {/* Category badge */}
                <span
                  className="wsc-card__category"
                  style={{ background: `${color}22`, color, borderColor: `${color}44` }}
                >
                  {item.category}
                </span>
              </div>

              {/* Body */}
              <div className="wsc-card__body">
                <h3 className="wsc-card__title">{item.title}</h3>
                <span
                  className="wsc-card__result"
                  style={{ background: `${color}18`, color }}
                >
                  {item.result}
                </span>
                <div className="wsc-card__tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="wsc-card__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="wsc-footer">
          <Link to="/portfolio" className="btn btn-outline wsc-cta">
            <span>View Full Portfolio</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

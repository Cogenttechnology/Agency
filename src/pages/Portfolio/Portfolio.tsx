import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { gsap, Flip, ScrollTrigger } from '../../lib/gsap';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './Portfolio.css';

const categories = ['All', 'Branding', 'Digital', 'Web', 'Video'];

const projects = [
  { id: 1, title: 'Novo Retail', category: 'Branding', img: 'https://picsum.photos/seed/p1/600/400', tag: 'Brand Identity' },
  { id: 2, title: 'PulseX Campaign', category: 'Digital', img: 'https://picsum.photos/seed/p2/600/400', tag: 'Performance' },
  { id: 3, title: 'Ecliptic.io', category: 'Web', img: 'https://picsum.photos/seed/p3/600/400', tag: 'Web Design' },
  { id: 4, title: 'FlowState Film', category: 'Video', img: 'https://picsum.photos/seed/p4/600/400', tag: 'Brand Film' },
  { id: 5, title: 'Synapse Labs', category: 'Branding', img: 'https://picsum.photos/seed/p5/600/400', tag: 'Identity' },
  { id: 6, title: 'Catalyst Growth', category: 'Digital', img: 'https://picsum.photos/seed/p6/600/400', tag: 'Social Media' },
  { id: 7, title: 'Axion Store', category: 'Web', img: 'https://picsum.photos/seed/p7/600/400', tag: 'E-Commerce' },
  { id: 8, title: 'Zenith Intro', category: 'Video', img: 'https://picsum.photos/seed/p8/600/400', tag: 'Motion Reel' },
  { id: 9, title: 'Brandify', category: 'Branding', img: 'https://picsum.photos/seed/p9/600/400', tag: 'Rebranding' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const gridRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo('.portfolio-hero__text > *',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.3 }
        );
        gsap.fromTo('.project-card',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.portfolio-grid', start: 'top 80%' } }
        );
      }, pageRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  const handleFilter = (cat: string) => {
    if (!gridRef.current) return;

    const state = Flip.getState(gridRef.current.children);
    setActiveFilter(cat);

    // Flip animation happens after React re-render
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: 0.05,
        absolute: true,
      });
    });
  };

  return (
    <div ref={pageRef} className="portfolio-page">
      {/* Hero */}
      <section className="portfolio-hero section">
        <div className="container portfolio-hero__text">
          <span className="tag">Our Work</span>
          <h1>Case Studies &amp;<br /><span className="text-gradient">Real Results</span></h1>
          <p>A curated collection of projects across branding, digital, web, and video.</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="section--sm portfolio-filter-section">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Portfolio filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'is-active' : ''}`}
                role="tab"
                id={`filter-${cat.toLowerCase()}`}
                aria-selected={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section--sm portfolio-grid-section">
        <div className="container">
          <div ref={gridRef} className="portfolio-grid">
            {filtered.map((proj) => (
              <div key={proj.id} className="project-card" id={`project-${proj.id}`}>
                <div className="project-card__img-wrapper">
                  <img src={proj.img} alt={proj.title} className="project-card__img" loading="lazy" />
                  <div className="project-card__overlay">
                    <span className="project-card__tag">{proj.tag}</span>
                    <button className="project-card__link" aria-label={`View ${proj.title}`}>
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
                <div className="project-card__info">
                  <h3 className="project-card__title">{proj.title}</h3>
                  <span className="project-card__cat">{proj.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ClientLogos />
    </div>
  );
}

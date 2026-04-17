import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { gsap, Flip, ScrollTrigger } from '../../lib/gsap';
import ClientLogos from '../../components/ClientLogos/ClientLogos';
import './Portfolio.css';

const categories = ['All', 'Branding', 'Digital', 'Web', 'Video'];

const projects: { id: number; title: string; category: string; img: string; tag: string; keywords?: string }[] = [
  { id: 1, title: 'Dr. Ankit Kayal', category: 'Digital', img: '/assets/work/ankit-kayal.jpg', tag: 'SEO — Healthcare', keywords: 'Best Urologist in Jaipur' },
  { id: 2, title: 'Dr. Nikhil Mehta', category: 'Digital', img: '/assets/work/nikhil-mehta.jpg', tag: 'SEO — Oncology', keywords: 'Best Oncologist in Jaipur' },
  { id: 3, title: 'CKS Hospital', category: 'Digital', img: '/assets/work/cks-hospital.jpg', tag: 'SEO — Hospital', keywords: 'Best Multispeciality Hospital in Jaipur' },
  { id: 4, title: 'Noonmoon Events', category: 'Digital', img: '/assets/work/noonmoon.jpg', tag: 'SEO — Events', keywords: 'Event Planner in Jaipur' },
  { id: 5, title: 'RNM Financial', category: 'Digital', img: '/assets/work/rnm.jpg', tag: 'SEO — Finance', keywords: 'Financial Consulting Companies in India' },
  { id: 6, title: 'JKJ Jewellers', category: 'Branding', img: '/assets/work/jkj-jewellers.jpg', tag: 'SEO — Jewellery', keywords: 'Best Jadau Jewellery in Jaipur' },
  { id: 7, title: 'Manohar Bikaneri', category: 'Digital', img: '/assets/work/manohar-bikaneri.jpg', tag: 'SEO — FMCG', keywords: 'Bhaji Boxes in Delhi' },
  { id: 8, title: 'Goldnest', category: 'Branding', img: '/assets/work/goldnest.jpg', tag: 'SEO — Fashion', keywords: 'Best Menswear Shop in Jaipur' },
  { id: 9, title: 'Ultimates', category: 'Web', img: '/assets/work/ultimates.jpg', tag: 'SEO — Industrial', keywords: 'Aluminium Matting & Custom Floor Mats' },
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
          <p>From ranking <em>best urologist in Jaipur</em> to dominating <em>event planner in Jaipur</em> — real clients, real keywords, real page-1 results.</p>
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
                  {proj.keywords && (
                    <span className="project-card__keywords">#{proj.keywords}</span>
                  )}
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

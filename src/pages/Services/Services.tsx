import { lazy, Suspense, useEffect, useRef } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import './Services.css';

const ServiceBlobCanvas = lazy(() => import('../../components/3D/ServiceBlobCanvas'));

const services = [
  {
    id: 'brand',
    tag: '01 — Brand Strategy',
    title: 'Build a Brand People Believe In',
    desc: 'We uncover what makes you different and craft a brand identity that resonates deeply and lasts. From positioning to visual language, we create the foundation for everything.',
    features: ['Brand Positioning', 'Visual Identity', 'Brand Guidelines', 'Naming & Messaging'],
    color: '#6c63ff',
  },
  {
    id: 'digital',
    tag: '02 — Digital Marketing',
    title: 'Marketing That Moves the Needle',
    desc: 'Performance campaigns with purpose. We use data to find where your audience lives online, and reach them with precision and persuasion across every channel.',
    features: ['SEO & Content', 'Paid Media (PPC)', 'Social Media', 'Email Marketing'],
    color: '#ff6b6b',
  },
  {
    id: 'creative',
    tag: '03 — Creative Production',
    title: 'Content That Stops the Scroll',
    desc: 'Our in-house studio produces world-class visual content — from product photography to cinematic brand films that tell your story with impact.',
    features: ['Brand Films', 'Photography', 'Graphic Design', 'Motion Graphics'],
    color: '#00d4aa',
  },
  {
    id: 'web',
    tag: '04 — Web & Technology',
    title: 'Digital Experiences That Convert',
    desc: "Beautiful, blazing-fast websites and apps that don't just look extraordinary — they turn visitors into customers through intelligent UX and cutting-edge technology.",
    features: ['Website Design', 'Web Development', 'UX/UI Design', 'E-commerce'],
    color: '#f59e0b',
  },
];

export default function Services() {
  const { openEnquiry } = useEnquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;

    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        gsap.fromTo('.services-hero__text > *',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.3 }
        );

        gsap.utils.toArray<Element>('.service-row').forEach((row) => {
          gsap.fromTo(row.querySelectorAll('.service-row__text > *'),
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: row, start: 'top 75%' } }
          );
        });
      }, pageRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="services-page">
      {/* Hero */}
      <section className="services-hero section">
        <div className="container services-hero__text">
          <span className="tag">Our Services</span>
          <h1>Full-Spectrum<br /><span className="text-gradient">Marketing Power</span></h1>
          <p className="services-hero__sub">
            We bring every discipline under one roof — so your brand moves fast, stays consistent, and grows.
          </p>
        </div>
      </section>

      {/* Service Rows */}
      {services.map((svc, i) => (
        <section key={svc.id} className={`service-row section ${i % 2 === 1 ? 'service-row--reverse' : ''}`} id={`service-${svc.id}`}>
          <div className="container service-row__inner">
            {/* 3D Visual */}
            <div className="service-row__canvas">
              <Suspense fallback={<div className="service-row__canvas-placeholder" style={{ background: `${svc.color}18` }} />}>
                <ServiceBlobCanvas color={svc.color} />
              </Suspense>
            </div>

            {/* Text */}
            <div className="service-row__text">
              <span className="tag">{svc.tag}</span>
              <h2 className="service-row__title">{svc.title}</h2>
              <p className="service-row__desc">{svc.desc}</p>
              <ul className="service-features">
                {svc.features.map((f) => (
                  <li key={f}>
                    <CheckCircle size={16} style={{ color: svc.color }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={openEnquiry}  className="btn btn-primary" id={`svc-cta-${svc.id}`}
                style={{ '--btn-bg': svc.color } as React.CSSProperties}>
                <span>Enquire</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

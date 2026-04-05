import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown, Monitor, Video, Search, Share2, BarChart2, Mic2, ArrowRight, RefreshCw } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { useEnquiry } from '../../context/EnquiryContext';
import logoSrc from '../../assets/Logo.png';
import './Navbar.css';

const serviceLinks = [
  { path: '/ppc-company-in-jaipur',                              label: 'Performance Marketing', icon: BarChart2,  color: '#a855f7', desc: 'ROI-driven paid media across Google & Meta' },
  { path: '/services/video-production',                          label: 'Video Production',       icon: Video,      color: '#ff6b6b', desc: 'Brand films, reels & ad creatives' },
  { path: '/best-seo-company-in-jaipur',                         label: 'SEO',                    icon: Search,     color: '#00d4aa', desc: 'Rank higher & drive organic growth' },
  { path: '/best-social-media-marketing-company-in-jaipur',      label: 'Social Media Marketing', icon: Share2,     color: '#f59e0b', desc: 'Content, community & paid social' },
  { path: '/services/influencer-marketing',                      label: 'Influencer Marketing',   icon: Mic2,       color: '#ec4899', desc: 'Authentic reach through creators' },
  { path: '/website-development-company-in-jaipur',              label: 'Web Design & Dev',       icon: Monitor,    color: '#6c63ff', desc: 'High-performance websites & apps' },
  { path: '/best-digital-marketing-company-in-jaipur',           label: '360° Digital Marketing', icon: RefreshCw,  color: '#00d4ff', desc: 'Full-funnel presence across every channel' },
];

const aboutLinks = [
  { path: '/about-us',        label: 'About Us',        desc: 'Our story, values & the team behind the work' },
  { path: '/life-at-cogent',  label: 'Life at Cogent',  desc: 'Events, culture & moments that make us, us' },
];

const navLinks = [
  { path: '/',          label: 'Home' },
  { path: '/about-us',  label: 'About', hasAboutDropdown: true },
  { path: '/services',  label: 'Services', hasDropdown: true },
  { path: '/portfolio',                    label: 'Portfolio' },
  { path: '/d2c-marketing-agency-in-jaipur', label: 'D2C' },
  { path: '/studio',                       label: 'Cogent Studio' },
  { path: '/blog',      label: 'Blog' },
  { path: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const navRef          = useRef<HTMLElement>(null);
  const mobileMenuRef   = useRef<HTMLDivElement>(null);
  const dropdownRef     = useRef<HTMLDivElement>(null);
  const aboutDropRef    = useRef<HTMLDivElement>(null);
  const location        = useLocation();
  const [isOpen,          setIsOpen]          = useState(false);
  const [dropOpen,        setDropOpen]        = useState(false);
  const [aboutDropOpen,   setAboutDropOpen]   = useState(false);
  const [mobileServOpen,  setMobileServOpen]  = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const lastScrollY     = useRef(0);
  const dropTimer       = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutDropTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openEnquiry } = useEnquiry();

  /* Initial reveal */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 });
  }, []);

  /* Scroll hide/show */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < 60) {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power3.out' });
      } else if (current > lastScrollY.current) {
        gsap.to(navRef.current, { y: -100, duration: 0.4, ease: 'power3.out' });
        setDropOpen(false);
        setAboutDropOpen(false);
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power3.out' });
      }
      lastScrollY.current = current;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close on route change */
  useEffect(() => {
    setIsOpen(false);
    setDropOpen(false);
    setAboutDropOpen(false);
    setMobileServOpen(false);
    setMobileAboutOpen(false);
    mobileMenuRef.current?.classList.remove('open');
  }, [location]);

  /* Services dropdown handlers */
  const onServicesEnter = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
    setDropOpen(true);
  };
  const onServicesLeave = () => {
    dropTimer.current = setTimeout(() => setDropOpen(false), 180);
  };
  const onDropEnter = () => {
    if (dropTimer.current) clearTimeout(dropTimer.current);
  };
  const onDropLeave = () => {
    dropTimer.current = setTimeout(() => setDropOpen(false), 180);
  };

  /* About dropdown handlers */
  const onAboutEnter = () => {
    if (aboutDropTimer.current) clearTimeout(aboutDropTimer.current);
    setAboutDropOpen(true);
  };
  const onAboutLeave = () => {
    aboutDropTimer.current = setTimeout(() => setAboutDropOpen(false), 180);
  };
  const onAboutDropEnter = () => {
    if (aboutDropTimer.current) clearTimeout(aboutDropTimer.current);
  };
  const onAboutDropLeave = () => {
    aboutDropTimer.current = setTimeout(() => setAboutDropOpen(false), 180);
  };

  /* Animate services dropdown in */
  useEffect(() => {
    if (!dropdownRef.current) return;
    if (dropOpen) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(dropdownRef.current.querySelectorAll('.drop-item'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.04, duration: 0.3, ease: 'power2.out' });
    }
  }, [dropOpen]);

  /* Animate about dropdown in */
  useEffect(() => {
    if (!aboutDropRef.current) return;
    if (aboutDropOpen) {
      gsap.fromTo(aboutDropRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
      gsap.fromTo(aboutDropRef.current.querySelectorAll('.about-drop-item'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.3, ease: 'power2.out' });
    }
  }, [aboutDropOpen]);

  /* Mobile toggle */
  const toggleMenu = () => {
    const next = !isOpen;
    setIsOpen(next);
    const menu = mobileMenuRef.current;
    if (!menu) return;
    if (next) {
      menu.classList.add('open');
      gsap.fromTo(menu.querySelectorAll('.mobile-link, .mobile-services'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: 'power3.out' });
    } else {
      menu.classList.remove('open');
      setMobileServOpen(false);
      setMobileAboutOpen(false);
    }
  };

  const serviceTopPaths = ['/ppc-company-in-jaipur', '/best-seo-company-in-jaipur', '/best-social-media-marketing-company-in-jaipur', '/website-development-company-in-jaipur', '/best-digital-marketing-company-in-jaipur'];
  const isServiceActive = location.pathname.startsWith('/services') || serviceTopPaths.includes(location.pathname);
  const isAboutActive   = location.pathname === '/about-us' || location.pathname === '/life-at-cogent';

  return (
    <nav ref={navRef} className="navbar glass">
      <div className="container navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__logo" id="nav-logo">
          <img src={logoSrc} alt="Cogent" className="logo-img" />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links" id="nav-links">
          {navLinks.map(({ path, label, hasDropdown, hasAboutDropdown }) => (
            <li
              key={path}
              className={(hasDropdown || hasAboutDropdown) ? 'nav-item--has-drop' : ''}
              onMouseEnter={hasDropdown ? onServicesEnter : hasAboutDropdown ? onAboutEnter : undefined}
              onMouseLeave={hasDropdown ? onServicesLeave : hasAboutDropdown ? onAboutLeave : undefined}
            >
              <Link
                to={path}
                className={`navbar__link ${
                  hasDropdown
                    ? isServiceActive ? 'active' : ''
                    : hasAboutDropdown
                    ? isAboutActive ? 'active' : ''
                    : location.pathname === path ? 'active' : ''
                }`}
                id={`nav-${label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {label}
                {(hasDropdown || hasAboutDropdown) && (
                  <ChevronDown
                    size={14}
                    className={`nav-chevron ${(hasDropdown ? dropOpen : aboutDropOpen) ? 'nav-chevron--open' : ''}`}
                  />
                )}
                <span className="navbar__link-underline" />
              </Link>

              {/* Services Dropdown */}
              {hasDropdown && dropOpen && (
                <div
                  ref={dropdownRef}
                  className="nav-dropdown"
                  onMouseEnter={onDropEnter}
                  onMouseLeave={onDropLeave}
                >
                  <div className="nav-dropdown__grid">
                    {serviceLinks.map(({ path: sp, label: sl, icon: Icon, color, desc }) => (
                      <Link key={sp} to={sp} className="drop-item" id={`drop-${sl.toLowerCase().replace(/\s/g, '-')}`}>
                        <span className="drop-item__icon" style={{ background: `${color}1a`, color }}>
                          <Icon size={18} />
                        </span>
                        <span className="drop-item__text">
                          <span className="drop-item__label">{sl}</span>
                          <span className="drop-item__desc">{desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="nav-dropdown__footer">
                    <Link to="/services" className="drop-footer-link">
                      View all services <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )}

              {/* About Dropdown */}
              {hasAboutDropdown && aboutDropOpen && (
                <div
                  ref={aboutDropRef}
                  className="nav-dropdown nav-dropdown--about"
                  onMouseEnter={onAboutDropEnter}
                  onMouseLeave={onAboutDropLeave}
                >
                  <div className="nav-dropdown__list">
                    {aboutLinks.map(({ path: ap, label: al, desc }) => (
                      <Link key={ap} to={ap} className="about-drop-item">
                        <span className="drop-item__text">
                          <span className="drop-item__label">{al}</span>
                          <span className="drop-item__desc">{desc}</span>
                        </span>
                        <ArrowRight size={14} className="about-drop-item__arrow" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button onClick={openEnquiry} className="btn btn-primary navbar__cta" id="nav-cta">
          <span>Let's Talk</span>
        </button>

        {/* Hamburger */}
        <button className="navbar__hamburger" onClick={toggleMenu} aria-label="Toggle menu" id="nav-hamburger">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="mobile-menu glass">
        {navLinks.map(({ path, label, hasDropdown, hasAboutDropdown }) =>
          hasDropdown ? (
            <div key={path} className="mobile-services">
              <button
                className={`mobile-link mobile-link--toggle ${isServiceActive ? 'active' : ''}`}
                onClick={() => setMobileServOpen(v => !v)}
              >
                {label}
                <ChevronDown size={16} className={`nav-chevron ${mobileServOpen ? 'nav-chevron--open' : ''}`} />
              </button>
              {mobileServOpen && (
                <div className="mobile-drop">
                  {serviceLinks.map(({ path: sp, label: sl, icon: Icon, color }) => (
                    <Link key={sp} to={sp} className="mobile-drop-item">
                      <span className="drop-item__icon drop-item__icon--sm" style={{ background: `${color}1a`, color }}>
                        <Icon size={15} />
                      </span>
                      {sl}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : hasAboutDropdown ? (
            <div key={path} className="mobile-services">
              <button
                className={`mobile-link mobile-link--toggle ${isAboutActive ? 'active' : ''}`}
                onClick={() => setMobileAboutOpen(v => !v)}
              >
                {label}
                <ChevronDown size={16} className={`nav-chevron ${mobileAboutOpen ? 'nav-chevron--open' : ''}`} />
              </button>
              {mobileAboutOpen && (
                <div className="mobile-drop">
                  {aboutLinks.map(({ path: ap, label: al }) => (
                    <Link key={ap} to={ap} className="mobile-drop-item">
                      {al}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={path}
              key={path}
              className={`mobile-link ${location.pathname === path ? 'active' : ''}`}
              id={`mobile-${label.toLowerCase()}`}
            >
              {label}
            </Link>
          )
        )}
        <button onClick={openEnquiry} className="btn btn-primary mobile-cta" id="mobile-cta">
          <span>Let's Talk</span>
        </button>
      </div>
    </nav>
  );
}

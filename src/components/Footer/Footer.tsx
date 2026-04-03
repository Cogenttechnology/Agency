import logoSrc from '../../assets/Logo.png';
import { Link } from 'react-router';
import { Camera, MessageCircle, Briefcase, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import './Footer.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
];

const services = [
  { label: 'Web Design & Development', path: '/services' },
  { label: 'Performance Marketing',    path: '/services/performance-marketing' },
  { label: 'Video Production',         path: '/services/video-production' },
  { label: 'SEO',                      path: '/services/seo' },
  { label: 'Social Media Marketing',   path: '/services/social-media-marketing' },
  { label: 'Influencer Marketing',     path: '/services/influencer-marketing' },
  { label: '360° Digital Marketing',  path: '/services/360-digital-marketing' },
];

const socials = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: MessageCircle, label: 'Twitter / X', href: '#' },
  { icon: Briefcase, label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const { openEnquiry } = useEnquiry();

  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container footer-cta__inner">
          <div>
            <h2 className="footer-cta__heading">
              Ready to <span className="text-gradient">grow?</span>
            </h2>
            <p>Let's build something extraordinary together.</p>
          </div>
          <button onClick={openEnquiry} className="btn btn-primary footer-cta__btn" id="footer-cta-btn">
            <span>Start a Project</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-col footer-col--brand">
            <Link to="/" className="navbar__logo">
              <img src={logoSrc} alt="Cogent" className="logo-img" />
            </Link>
            <p className="footer-tagline">
              Bold brands. Digital experiences. Measurable growth. We're the
              agency that gets it done.
            </p>
            <div className="footer-socials">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="footer-social-btn"
                  id={`footer-social-${label.toLowerCase().replace(/\s.*/, '')}`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="footer-col">
            <h4 className="footer-col__title">Navigation</h4>
            <ul className="footer-links">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col__title">Services</h4>
            <ul className="footer-links">
              {services.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col__title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={15} />
                <a href="mailto:hello@cogent.agency">hello@cogent.agency</a>
              </li>
              <li>
                <Phone size={15} />
                <a href="tel:+910000000000">+91 00 0000 0000</a>
              </li>
              <li>
                <MapPin size={15} />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Cogent Agency. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

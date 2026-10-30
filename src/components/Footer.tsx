import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  Smartphone,
} from "lucide-react";
const primary = [
  ["Events & celebrations", "/events"],
  ["Studios & photography", "/studios"],
  ["Marketing & growth", "/marketing"],
  ["Business & digital", "/web"],
];
export default function Footer() {
  return (
    <footer className="p-footer g-footer">
      <div className="p-container">
        <div className="g-footer-invite">
          <div>
            <span className="p-eyebrow">YOUR NEXT CHAPTER, WITH FOCSERA</span>
            <h2>
              Good things.
              <br />
              Right at your doorstep.
            </h2>
          </div>
          <div className="g-footer-download">
            <a
              className="p-button"
              href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Smartphone size={20} />
              <span>
                <small>GET IT ON</small>Google Play
              </span>
              <ArrowUpRight size={20} />
            </a>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">
              Have something in mind? Let's talk <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="g-footer-grid">
          <div className="g-footer-about">
            <Link className="p-brand" to="/" aria-label="Focsera home">
              <img
                src="/images/logos/focsera-wordmark.png"
                alt="Focsera — at your doorstep"
              />
            </Link>
            <p>
              For your big days, your bold ideas,
              <br />
              and everything you want to build.
            </p>
            <div className="g-footer-social">
              <a
                href="https://www.instagram.com/focsera.in/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={19} />
              </a>
              <a
                href="https://www.linkedin.com/in/focsera/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={19} />
              </a>
              <a href="mailto:info@focsera.com" aria-label="Email Focsera">
                <Mail size={19} />
              </a>
            </div>
          </div>
          <nav aria-label="Footer services">
            <h3>Our expertise</h3>
            {primary.map(([n, p]) => (
              <Link key={p} to={p}>
                {n}
              </Link>
            ))}
            <Link to="/media">Media & branding</Link>
            <Link to="/pilo">
              Pilo by Focsera <ArrowUpRight size={12} />
            </Link>
            <Link to="/interiors">Interiors & spaces</Link>
          </nav>
          <nav aria-label="Footer company">
            <h3>The Focsera world</h3>
            <Link to="/about">About us</Link>
            <Link to="/mission">Our purpose</Link>
            <Link to="/beyond">
              Beyond by Focsera <ArrowUpRight size={12} />
            </Link>
            <Link to="/arenax">
              ArenaX <ArrowUpRight size={12} />
            </Link>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">Partner with us</a>
          </nav>
          <nav aria-label="Footer support">
            <h3>Here for you</h3>
            <Link to="/#faq">FAQs</Link>
            <Link to="/account">Your account</Link>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">Get in touch</a>
            <a href="mailto:info@focsera.com">info@focsera.com</a>
            <a href="tel:+919515803954">+91 95158 03954</a>
            <Link to="/#packages">
              Explore packages <ArrowUpRight size={12} />
            </Link>
          </nav>
        </div>
        <div className="g-footer-wordmark" aria-hidden="true">
          <img src="/images/logos/focsera-wordmark.png" alt="" />
        </div>
        <div className="g-footer-legal">
          <span>
            © {new Date().getFullYear()} Focsera. All rights reserved.
          </span>
          <nav aria-label="Legal links">
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms of service</Link>
            <Link to="/refund-policy">Refund policy</Link>
          </nav>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

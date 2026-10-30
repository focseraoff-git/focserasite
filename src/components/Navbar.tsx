import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Download,
  Camera,
  CalendarDays,
  Monitor,
  Armchair,
  TrendingUp,
  Megaphone,
  Package,
  GraduationCap,
} from "lucide-react";
import { serviceVisuals } from "../design/services";
const icons = [
  Camera,
  CalendarDays,
  Monitor,
  Armchair,
  TrendingUp,
  Megaphone,
  Package,
];
export default function Navbar() {
  const [mobile, setMobile] = useState(false),
    [solutions, setSolutions] = useState(false);
  const location = useLocation();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    setMobile(false);
    setSolutions(false);
  }, [location]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setSolutions(false);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSolutions(false);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className="p-header" ref={ref}>
      <div className="p-container p-nav">
        <Link to="/" className="p-brand" aria-label="Focsera home">
          <img
            src="/images/logos/focsera-wordmark.png"
            alt="Focsera — at your doorstep"
          />
        </Link>
        <nav className="p-desktop-nav" aria-label="Main navigation">
          <button
            onClick={() => setSolutions(!solutions)}
            aria-expanded={solutions}
            aria-controls="p-solutions-menu"
          >
            Services <ChevronDown size={14} />
          </button>
          <Link to="/#packages">Packages</Link>

          <Link
            to="/about"
            aria-current={location.pathname === "/about" ? "page" : undefined}
          >
            About us
          </Link>
          <Link to="/pilo" aria-current={location.pathname === '/pilo' ? 'page' : undefined}>Pilo <ArrowUpRight size={12}/></Link>
          <Link to="/beyond">
            Beyond <ArrowUpRight size={12} />
          </Link>
        </nav>
        <div className="p-nav-actions">
          <a
            className="p-app-download-icon"
            href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download the Focsera app"
            title="Download the Focsera app"
          >
            <Download size={20} />
          </a>
          <a className="p-button" href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">
            Let's talk <ArrowUpRight size={16} />
          </a>
          <button
            className="p-menu-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="p-mobile-menu"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {solutions && (
        <nav
          className="p-mega-menu p-container"
          id="p-solutions-menu"
          aria-label="Services"
        >
          <div>
            <span className="p-eyebrow">Expertise for every ambition</span>
            <h3>
              What are you
              <br />
              thinking of?
            </h3>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-text-link">
              Let's figure it out <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="p-mega-links">
            {serviceVisuals.map((s, i) => {
              const Icon = icons[i];
              return (
                <Link to={s.path} key={s.path}>
                  <Icon size={21} />
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.description}</small>
                  </span>
                  <ArrowUpRight size={16} />
                </Link>
              );
            })}
            <Link to="/beyond">
              <GraduationCap size={21} />
              <span>
                <strong>Beyond by Focsera</strong>
                <small>Learning beyond the classroom.</small>
              </span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </nav>
      )}
      {mobile && (
        <nav
          className="p-mobile-menu"
          id="p-mobile-menu"
          aria-label="Mobile navigation"
        >
          {serviceVisuals.map((s) => (
            <Link to={s.path} key={s.path}>
              {s.title}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          {[
            ["Packages", "/#packages"],
            ["About us", "/about"],
            ["Pilo", "/pilo"],
            ["Beyond", "/beyond"],
            ["Contact", "/contact"],
          ].map(([n, p]) => (
            p === "/contact" ? <a href="https://wa.me/919515802954" key={p} target="_blank" rel="noopener noreferrer">{n}<ArrowUpRight size={16}/></a> : <Link to={p} key={p}>{n}<ArrowUpRight size={16}/></Link>
          ))}
        </nav>
      )}
    </header>
  );
}

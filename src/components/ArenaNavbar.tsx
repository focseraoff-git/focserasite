import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
const links = [
  ["About", "/arenax/about"],
  ["Games", "/arenax/games"],
  ["Schedule", "/arenax/schedule"],
  ["Contact", "/arenax/contact"],
  ["Volunteer", "/arenax/volunteers"],
];
export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="p-header p-arena-header">
      <div className="p-container p-nav">
        <Link
          to="/arenax"
          className="p-brand p-arena-brand"
          aria-label="ArenaX home"
        >
          <span>ArenaX</span>
          <small>by focsera</small>
        </Link>
        <nav className="p-desktop-nav" aria-label="ArenaX navigation">
          {links.map(([n, p]) => (
            n === "Contact" ? <a key={p} href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">{n}</a> : <Link
              key={p}
              to={p}
              aria-current={location.pathname === p ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
        </nav>
        <div className="p-nav-actions">
          <Link className="p-button" to="/arenax/register">
            Register <ArrowUpRight size={16} />
          </Link>
          <button
            className="p-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="arena-mobile"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          className="p-mobile-menu"
          id="arena-mobile"
          aria-label="ArenaX mobile navigation"
        >
          {links.map(([n, p]) => (
            n === "Contact" ? <a key={p} href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">{n}<ArrowUpRight size={15}/></a> : <Link key={p} to={p}>
              {n}
              <ArrowUpRight size={15} />
            </Link>
          ))}
          <Link to="/">
            Focsera main <ArrowUpRight size={15} />
          </Link>
        </nav>
      )}
    </header>
  );
};

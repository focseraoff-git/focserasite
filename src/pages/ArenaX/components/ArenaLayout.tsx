// src/pages/ArenaX/components/ArenaXLayout.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ArenaXLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/arenax", label: "Overview" },
    { to: "/arenax/games", label: "Games" },
    { to: "/arenax/schedule", label: "Schedule" },
    { to: "/arenax/volunteers", label: "Volunteers" },
    { to: "/arenax/register", label: "Register", primary: true }
  ];

  return (
    <div className="arenax-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* single centralized style injection (no external CSS file) */}
      <style>{`
        :root{
          --ax-bg: #20110d;
          --ax-bg-2: #2d1a14;
          --ax-sand: #E8D3B8;
          --ax-cream: #F2E4CE;
          --ax-gold: #FFD35A;
          --ax-gold-2: #E8D3A0;
          --ax-muted: rgba(242,228,206,0.90);
          --ax-border: rgba(255,255,255,0.04);
          --ax-card: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12));
          --ax-elev: 0 10px 28px rgba(0,0,0,0.36);
        }

        /* base layout */
        .arenax-root {
          background: linear-gradient(180deg, var(--ax-bg-2) 0%, var(--ax-bg) 60%);
          color: var(--ax-cream);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
        }

        .ax-container { max-width:1100px; margin:0 auto; padding:28px; }

        /* header */
        .ax-header {
          position: sticky; top: 0; z-index: 80;
          backdrop-filter: blur(6px);
          background: linear-gradient(180deg, rgba(32,17,13,0.72), rgba(32,17,13,0.35));
          border-bottom: 1px solid var(--ax-border);
          box-shadow: 0 8px 30px rgba(0,0,0,0.35);
        }
        .ax-header-inner { display:flex; align-items:center; justify-content:space-between; gap:20px; }
        .ax-brand { display:flex; gap:12px; align-items:center; }
        .ax-logo {
          width:56px; height:56px; border-radius:12px;
          background: linear-gradient(90deg,var(--ax-gold),var(--ax-gold-2));
          color: #20110d; font-weight:900; display:flex; align-items:center; justify-content:center;
          box-shadow: 0 8px 24px rgba(255,211,90,0.08), inset 0 -6px 12px rgba(0,0,0,0.12);
        }
        .ax-subtle { color: var(--ax-muted); font-size:13px; }
        .ax-title { font-weight:800; color:var(--ax-sand); line-height:1; }

        /* nav */
        .ax-nav { display:flex; gap:12px; align-items:center; }
        .ax-nav-link {
          padding:8px 14px; border-radius:10px; text-decoration:none; color:var(--ax-muted); font-weight:700;
          transition:transform .18s ease, color .18s ease, box-shadow .18s ease;
        }
        .ax-nav-link:hover { transform: translateY(-3px); color:var(--ax-sand); }
        .ax-active {
          background: linear-gradient(90deg,var(--ax-gold),var(--ax-gold-2)); color:#20110d !important;
          box-shadow: 0 8px 28px rgba(255,211,90,0.08);
        }

        /* mobile */
        .ax-hamburger { display:none; background:transparent; border:0; cursor:pointer; padding:8px; border-radius:8px; }
        .ax-ham-line { display:block; width:22px; height:2px; background:var(--ax-cream); margin:4px 0; transition:all .28s ease; border-radius:2px; }
        .ax-mobile-menu { display:none; }
        .ax-mobile-inner { padding:16px; display:flex; flex-direction:column; gap:8px; }

        /* hero area helpers (glows) */
        .ax-glow {
          position:absolute; border-radius:50%; filter:blur(40px); opacity:0.5; pointer-events:none; z-index:0;
        }

        /* footer */
        .ax-footer {
          border-top:1px solid var(--ax-border);
          background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.00));
          padding:22px 0;
        }
        .ax-footer-inner { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
        .ax-footer-title { font-weight:700; color:var(--ax-sand); }
        .ax-contact a { color:var(--ax-muted); text-decoration:none; font-weight:600; }

        /* cards & grid */
        .ax-grid { display:grid; gap:18px; }
        .ax-grid.cols-3 { grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); }
        .ax-card {
          background: var(--ax-card); border:1px solid var(--ax-border); padding:22px; border-radius:14px;
          box-shadow: var(--ax-elev); transition: transform .28s cubic-bezier(.2,.9,.3,1), box-shadow .28s;
        }
        .ax-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }

        /* buttons */
        .ax-btn { padding:10px 18px; border-radius:999px; font-weight:800; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
        .ax-btn.primary { background: linear-gradient(90deg,var(--ax-gold),var(--ax-gold-2)); color:#20110d; box-shadow: 0 8px 30px rgba(255,211,90,0.08); }
        .ax-btn.ghost { border:1px solid var(--ax-border); color:var(--ax-sand); background:transparent; }

        /* hero animations + text */
        @keyframes floatSlow { from { transform: translateY(0); } to { transform: translateY(-10px); } }
        .ax-float { animation: floatSlow 6s ease-in-out infinite alternate; }
        .ax-title-lg { font-size: clamp(34px, 5vw, 56px); font-weight:900; line-height:1.02; letter-spacing:-0.02em; color:var(--ax-cream); text-align:center; margin:0; text-shadow: 0 6px 18px rgba(0,0,0,0.5); }
        .ax-sub { color:var(--ax-muted); text-align:center; margin-top:12px; font-size:16px; }

        /* reveal animation for sections */
        .ax-reveal { opacity:0; transform: translateY(18px); transition: all .7s cubic-bezier(.2,.9,.3,1); }
        .ax-reveal.visible { opacity:1; transform: translateY(0); }

        /* respects reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ax-float { animation: none; }
          .ax-card, .ax-nav-link { transition: none; transform: none; }
        }

        /* responsive */
        @media (max-width:920px) {
          .ax-nav { display:none; }
          .ax-hamburger { display:flex; }
          .ax-mobile-menu { display:block; max-height:0; overflow:hidden; transition:max-height .28s ease; }
          .ax-mobile-menu.open { max-height:360px; }
        }
      `}</style>

      {/* header */}
      <header className="ax-header" role="banner" aria-label="ArenaX header">
        <div className="ax-container ax-header-inner" style={{ position: "relative", zIndex: 3 }}>
          <div className="ax-brand">
            <div className="ax-logo" aria-hidden>F</div>
            <div>
              <div className="ax-subtle">Focsera Presents</div>
              <div className="ax-title">Arena<span style={{ color: "var(--ax-gold)" }}>X</span></div>
            </div>
          </div>

          <nav className="ax-nav" role="navigation" aria-label="ArenaX navigation">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/arenax"}
                className={({ isActive }) => `ax-nav-link ${isActive ? "ax-active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="ax-hamburger"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
            style={{ background: "transparent", border: 0 }}
          >
            <span className="ax-ham-line" />
            <span className="ax-ham-line" />
            <span className="ax-ham-line" />
          </button>
        </div>

        {/* mobile menu */}
        <div className={`ax-mobile-menu ${open ? "open" : ""}`} role="menu" aria-hidden={!open}>
          <div className="ax-mobile-inner ax-container">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="ax-mobile-link" onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* content area */}
      <main style={{ flex: 1, position: "relative", zIndex: 1 }}>
        {children}
      </main>

      {/* footer (enforced dark look) */}
      <footer className="ax-footer" role="contentinfo" aria-label="ArenaX footer">
        <div className="ax-container ax-footer-inner">
          <div>
            <div className="ax-footer-title">Focsera Events</div>
            <div className="ax-subtle">ArenaX — Two-day Community Festival</div>
          </div>

          <div className="ax-contact" style={{ display: "flex", gap: 12 }}>
            <a href="mailto:info.focsera@gmail.com" style={{ color: "var(--ax-muted)", textDecoration: "none" }}>info.focsera@gmail.com</a>
            <span style={{ color: "var(--ax-muted)" }}>•</span>
            <a href="tel:+919515803954" style={{ color: "var(--ax-muted)", textDecoration: "none" }}>+91 9515803954</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// src/pages/ArenaX/components/Hero.tsx
import React from "react";

export default function Hero({
  title,
  subtitle,
  ctas,
}: {
  title: string;
  subtitle?: string;
  ctas?: { label: string; href: string }[];
}) {
  return (
    <section aria-label="ArenaX hero" style={{ position: "relative", padding: "90px 0 110px", overflow: "hidden" }}>
      {/* glows */}
      <div className="ax-glow ax-float" style={{ width: 320, height: 320, background: "radial-gradient(circle, rgba(255,211,90,0.12), transparent 60%)", top: "6%", left: "6%", position: "absolute" }} />
      <div className="ax-glow" style={{ width: 220, height: 220, background: "radial-gradient(circle, rgba(6,120,210,0.06), transparent 60%)", bottom: "6%", right: "8%", position: "absolute", opacity: 0.36 }} />

      <div className="ax-container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <h1 className="ax-title-lg" style={{ fontSize: "clamp(32px, 5vw, 56px)", margin: 0, fontWeight: 900, color: "var(--ax-cream)" }}>{title}</h1>
        {subtitle && <p className="ax-sub" style={{ marginTop: 12, maxWidth: 880, marginLeft: "auto", marginRight: "auto" }}>{subtitle}</p>}

        <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
          {ctas?.map((c, i) => (
            <a key={i} href={c.href} className={`ax-btn ${i === 0 ? "primary" : "ghost"}`} style={{ transform: "translateZ(0)" }}>
              <span>{c.label}</span>
              {i === 0 && (
                <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginLeft: 6 }}>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="#20110d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* scroll hint */}
        <div style={{ marginTop: 28, textAlign: "center", color: "var(--ax-muted)" }}>
          <div style={{ display: "inline-block", padding: 8, border: "1px solid var(--ax-border)", borderRadius: 14 }}>
            <svg width="18" height="28" viewBox="0 0 24 32" fill="none" aria-hidden>
              <rect x="6" y="2" width="12" height="18" rx="6" stroke="var(--ax-muted)" strokeWidth="1.2" />
              <circle cx="12" cy="10" r="2" fill="var(--ax-muted)" />
            </svg>
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>Scroll</div>
        </div>
      </div>
    </section>
  );
}

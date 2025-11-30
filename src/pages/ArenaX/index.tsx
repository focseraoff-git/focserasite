// src/pages/ArenaX/index.tsx
import React, { useEffect } from "react";
import ArenaXLayout from "./components/ArenaLayout";
import Hero from "./components/Hero";

function GameCard({ title, desc, price }: { title: string; desc?: string; price?: string }) {
  return (
    <article className="ax-card ax-reveal" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 900, color: "var(--ax-sand)" }}>{title}</div>
          {desc && <div style={{ marginTop: 8, color: "var(--ax-muted)" }}>{desc}</div>}
        </div>
        <div style={{ textAlign: "right" }}>
          {price && <div style={{ color: "var(--ax-gold)", fontWeight: 900 }}>{price}</div>}
          <div style={{ marginTop: 10 }}>
            <a className="ax-btn ghost" href="/arenax/register">Play</a>
          </div>
        </div>
      </div>
    </article>
  );
}

function PrizeCard({ title, points }: { title: string; points?: string }) {
  return (
    <div className="ax-card ax-reveal">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 900, color: "var(--ax-sand)" }}>{title}</div>
          <div style={{ marginTop: 6, color: "var(--ax-muted)" }}>Redeem at prize counter</div>
        </div>
        <div style={{ fontWeight: 900, color: "var(--ax-gold)" }}>{points ?? "—"}</div>
      </div>
    </div>
  );
}

export default function ArenaXHome() {
  useEffect(() => {
    // reveal on scroll
    const els = Array.from(document.querySelectorAll<HTMLElement>(".ax-reveal"));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const games = [
    { title: "Gym Race", desc: "Micro fitness tasks for all ages", price: "₹30" },
    { title: "Sack Race", desc: "Hop to the finish line", price: "₹20" },
    { title: "Escape Room", desc: "Solve within the time limit", price: "₹120" },
  ];

  const prizes = [
    { title: "Snack Coupon", points: "30" },
    { title: "Merch Coupon", points: "200" },
    { title: "Gift Voucher", points: "500" },
  ];

  return (
    <ArenaXLayout>
      <Hero
        title="ArenaX — The Ultimate Two-Day Community Challenge Festival"
        subtitle="Designed for every age, loved by every heart."
        ctas={[
          { label: "Explore Games", href: "/arenax/games" },
          { label: "Event Schedule", href: "/arenax/schedule" },
          { label: "Know More", href: "#about" },
        ]}
      />

      {/* About section */}
      <section id="about" style={{ padding: "72px 0" }}>
        <div className="ax-container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "var(--ax-sand)", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>About ArenaX</h2>
          <p style={{ color: "var(--ax-muted)", maxWidth: 900, margin: "0 auto 22px", lineHeight: 1.6 }}>
            A two-day community festival exclusively for residents — immersive games, stalls, escape rooms, and a prize counter.
            All games are supervised and designed to be safe, fun, and memorable.
          </p>

          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", marginTop: 28 }}>
            <div className="ax-card ax-reveal">
              <div style={{ fontWeight: 900, color: "var(--ax-gold)" }}>Two-Day Festival</div>
              <div style={{ marginTop: 8, color: "var(--ax-muted)" }}>Continuous games & stalls across both days — drop-in friendly.</div>
            </div>
            <div className="ax-card ax-reveal">
              <div style={{ fontWeight: 900, color: "var(--ax-gold)" }}>Family Friendly</div>
              <div style={{ marginTop: 8, color: "var(--ax-muted)" }}>Activities for kids, teens, adults & seniors.</div>
            </div>
            <div className="ax-card ax-reveal">
              <div style={{ fontWeight: 900, color: "var(--ax-gold)" }}>Prize Redemption</div>
              <div style={{ marginTop: 8, color: "var(--ax-muted)" }}>Win points at game stalls and redeem at the prize counter.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Games preview */}
      <section style={{ padding: "44px 0", background: "linear-gradient(180deg, rgba(255,211,90,0.01), transparent)" }}>
        <div className="ax-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "var(--ax-sand)", margin: 0 }}>Games — Preview</h3>
            <a className="ax-btn ghost" href="/arenax/games">View all games</a>
          </div>

          <div style={{ height: 18 }} />

          <div className="ax-grid cols-3">
            {games.map(g => <GameCard key={g.title} {...g} />)}
          </div>
        </div>
      </section>

      {/* Prizes preview */}
      <section style={{ padding: "40px 0" }}>
        <div className="ax-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "var(--ax-sand)", margin: 0 }}>Prize Redemption</h3>
            <a className="ax-btn ghost" href="/arenax/prizes">Go to prize counter</a>
          </div>

          <div style={{ height: 16 }} />

          <div className="ax-grid cols-3">
            {prizes.map(p => <PrizeCard key={p.title} {...p} />)}
          </div>
        </div>
      </section>
    </ArenaXLayout>
  );
}

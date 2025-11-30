import React from "react";

type Difficulty = "easy" | "medium" | "hard";

export default function GameCardAdvanced({
  title,
  desc,
  price,
  imageUrl,
  difficulty = "medium",
  duration,
  slots,
  onPlay,
}: {
  title: string;
  desc?: string;
  price?: string; // e.g. "₹40"
  imageUrl?: string; // optional thumbnail
  difficulty?: Difficulty;
  duration?: string; // e.g. "15 min"
  slots?: string; // e.g. "Solo / 1 player"
  onPlay?: () => void; // callback when play clicked
}) {
  const diffColors: Record<Difficulty, { bg: string; text: string }> = {
    easy: { bg: "rgba(110, 231, 183, 0.12)", text: "#06B58C" }, // green
    medium: { bg: "rgba(255, 229, 153, 0.12)", text: "#D97706" }, // amber
    hard: { bg: "rgba(255, 142, 142, 0.10)", text: "#DC2626" }, // red
  };

  const thumbnail =
    imageUrl ??
    "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='%23251a14'/><text x='50%' y='50%' fill='%23E8D3B8' font-family='Arial' font-size='28' text-anchor='middle' dominant-baseline='middle'>ArenaX</text></svg>`
      );

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPlay) onPlay();
    else {
      // fallback: navigate to register page
      window.location.href = "/arenax/register";
    }
  };

  return (
    <article
      aria-label={`${title} — ${difficulty} — ${price ?? "free"}`}
      style={{
        display: "flex",
        gap: 16,
        alignItems: "stretch",
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))",
        borderRadius: 14,
        padding: 0,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.04)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        transition: "transform .25s ease, box-shadow .25s ease",
        width: "100%",
        maxWidth: 980,
      }}
      className="ax-advanced-card"
    >
      <style>{`
        .ax-advanced-card:hover { transform: translateY(-8px); box-shadow: 0 22px 50px rgba(0,0,0,0.52); }
        .ax-thumb { width: 260px; min-width:260px; height:160px; overflow:hidden; display:block; background:var(--ax-bg); }
        .ax-thumb img { width:100%; height:100%; object-fit:cover; transition: transform .6s ease; display:block; }
        .ax-advanced-card:hover .ax-thumb img { transform: scale(1.06); }
        .ax-content { padding: 18px 18px 18px 18px; display:flex; flex-direction:column; gap:12px; flex:1; min-width:0; }
        .ax-row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .ax-title { font-size:18px; font-weight:900; color:var(--ax-sand); margin:0; line-height:1.05; }
        .ax-desc { color: var(--ax-muted); font-size:14px; margin:0; opacity:0.95; }
        .ax-meta { display:flex; gap:10px; align-items:center; color: var(--ax-muted); font-size:13px; }
        .ax-chip { padding:6px 10px; border-radius:999px; font-weight:800; font-size:12px; display:inline-flex; align-items:center; gap:8px; }
        .ax-price { font-weight:900; color:var(--ax-gold); font-size:15px; }
        .ax-play { display:inline-flex; align-items:center; gap:10px; padding:10px 16px; border-radius:999px; background: linear-gradient(90deg,var(--ax-gold),var(--ax-gold-2)); color:var(--ax-bg); font-weight:900; border:none; cursor:pointer; transition: transform .14s ease, box-shadow .14s ease; box-shadow: 0 10px 30px rgba(255,211,90,0.12); }
        .ax-play:active { transform: translateY(1px) scale(.997); }
        .ax-play:focus { outline:3px solid rgba(255,211,90,0.16); outline-offset:3px; }
        .ax-meta-small { font-size:12px; color: rgba(242,228,206,0.66); }

        /* responsive */
        @media (max-width:760px) {
          .ax-advanced-card { flex-direction: column; }
          .ax-thumb { width:100%; min-width:unset; height:220px; }
        }
      `}</style>

      {/* Thumbnail */}
      <div className="ax-thumb" role="img" aria-label={`${title} thumbnail`}>
        <img src={thumbnail} alt={`${title} thumbnail`} />
      </div>

      {/* Content */}
      <div className="ax-content">
        {/* Top row: title & price */}
        <div className="ax-row" style={{ alignItems: "flex-start" }}>
          <div style={{ minWidth: 0 }}>
            <h3 className="ax-title">{title}</h3>
            {desc && <p className="ax-desc" style={{ marginTop: 8 }}>{desc}</p>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            {price ? <div className="ax-price" aria-hidden>{price}</div> : <div style={{ height: 18 }} />}

            {/* Difficulty chip */}
            <div
              className="ax-chip"
              style={{
                background: diffColors[difficulty].bg,
                color: diffColors[difficulty].text,
                border: `1px solid ${diffColors[difficulty].text}20`,
                paddingLeft: 10,
                paddingRight: 10,
              }}
              aria-label={`Difficulty ${difficulty}`}
            >
              {difficulty === "easy" ? "Easy" : difficulty === "medium" ? "Medium" : "Hard"}
            </div>
          </div>
        </div>

        {/* Middle row: meta */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {duration && <div className="ax-meta ax-meta-small" aria-hidden>⏱ {duration}</div>}
            {slots && <div className="ax-meta ax-meta-small" aria-hidden>👤 {slots}</div>}
          </div>

          {/* Play button (prominent) */}
          <div>
            <button
              onClick={handlePlay}
              className="ax-play"
              aria-label={`Play ${title}`}
              title={`Play ${title}`}
            >
              Play
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable={false}>
                <path d="M5 3v18l15-9L5 3z" style={{fill: "var(--ax-bg)"}} />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom row: extra small details or link */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <div style={{ color: "rgba(242,228,206,0.62)", fontSize: 13 }}>
            <span style={{ fontWeight: 700 }}>Prize:</span> Redeemable points
          </div>
          <div style={{ color: "rgba(242,228,206,0.62)", fontSize: 13 }}>
            <a href="/arenax/faq" style={{ color: "rgba(242,228,206,0.9)", textDecoration: "underline", fontWeight: 700 }}>FAQs</a>
          </div>
        </div>
      </div>
    </article>
  );
}

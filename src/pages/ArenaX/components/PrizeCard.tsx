import React from "react";

export default function PrizeCard({
  title,
  points,
  icon,
}: {
  title: string;
  points?: string;
  icon?: React.ReactNode;
}) {
  const vars = {
    gold: "var(--ax-gold)",
    sand: "var(--ax-sand)",
    cream: "var(--ax-cream)",
    muted: "var(--ax-muted)",
    border: "var(--ax-border)",
  };

  return (
    <div
      className="ax-prize-card"
      style={{
        padding: "20px 22px",
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${vars.border}`,
        borderRadius: 16,
        backdropFilter: "blur(8px)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.32)",
        transition: "all .22s ease",
        cursor: "pointer",
        width: "100%",
      }}
    >
      <style>{`
        .ax-prize-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,211,90,0.18);
          box-shadow: 0 18px 42px rgba(0,0,0,0.45);
        }
        .ax-prize-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--ax-sand);
          margin: 0;
        }
        .ax-prize-sub {
          font-size: 13px;
          margin-top: 6px;
          color: var(--ax-muted);
        }
        .ax-prize-points {
          background: rgba(255,211,90,0.12);
          border: 1px solid rgba(255,211,90,0.25);
          color: var(--ax-gold);
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 900;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .ax-prize-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--ax-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: var(--ax-sand);
          margin-right: 14px;
        }
        @media (max-width: 760px) {
          .ax-prize-card { padding: 18px 18px; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {icon && <div className="ax-prize-icon">{icon}</div>}

          <div>
            <div className="ax-prize-title">{title}</div>
            <div className="ax-prize-sub">Redeem at prize counter</div>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <span className="ax-prize-points">{points ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Download, RotateCw } from "lucide-react";

interface GameCardDisplayProps {
  name: string;
  cardNumber?: number;
  totalCards?: number;
  cardCode?: string;
  flatNumber?: string;
  phone?: string;
  email?: string;
}

const cardStyle = { accent: "#b8860b", neon: "#ffd700" };

// Replace with your preferred background (keeps your supplied earlier)
const ARENAX_BG =
  "https://www.shutterstock.com/image-vector/abstract-gold-brown-triangle-background-260nw-1827626084.jpg";

export const GameCardDisplay = ({
  name,
  cardNumber = 1,
  totalCards = 1,
  cardCode,
  flatNumber,
  phone,
  email,
}: GameCardDisplayProps) => {
  const [localCardCode, setLocalCardCode] = useState(cardCode || "");
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [boom, setBoom] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Inject small CSS for keyframes and sparkles (no external file needed)
  useEffect(() => {
    const id = "gamed-card-effects-css";
    if (document.getElementById(id)) return;
    const css = `
      @keyframes gold-slide { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
      @keyframes sparkle-float { 0% { transform: translateY(0) scale(0.9); opacity: 0.9 } 50% { transform: translateY(-6px) scale(1.05); opacity: 1 } 100% { transform: translateY(0) scale(0.95); opacity: 0.85 } }
      @keyframes neon-pulse { 0% { box-shadow: 0 0 4px rgba(255,215,0,0.12), 0 0 12px rgba(184,134,11,0.06) } 50% { box-shadow: 0 0 18px rgba(255,215,0,0.30), 0 0 48px rgba(184,134,11,0.18) } 100% { box-shadow: 0 0 4px rgba(255,215,0,0.12), 0 0 12px rgba(184,134,11,0.06) } }
      .gcard-sparkle { position:absolute; width:8px; height:8px; border-radius:50%; background: radial-gradient(circle at 30% 30%, #fff8d6, ${cardStyle.neon}); filter: blur(1px); mix-blend-mode: screen; animation: sparkle-float 2.4s ease-in-out infinite; opacity:0.9; pointer-events:none; }
      .gcard-gold-ribbon { position:absolute; inset:0; background: linear-gradient(90deg, rgba(255,231,150,0.0), rgba(255,220,120,0.12), rgba(255,231,150,0.0)); background-size:200% 100%; animation: gold-slide 6s linear infinite; transform: translateZ(1px); pointer-events:none; border-radius:inherit; }
      .gcard-shine { position:absolute; left:-40%; top:-50%; width:180%; height:220%; transform: rotate(25deg); background: linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.0) 60%); filter: blur(12px); opacity:0.6; pointer-events:none; mix-blend-mode: screen; }
      .gcard-neon-border { animation: neon-pulse 3s infinite; border-radius:inherit; }
    `;
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = css;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (!cardCode) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let result = "AX-";
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setLocalCardCode(result);
    }
  }, [cardCode]);

  const qrData = JSON.stringify({
    name,
    flat: flatNumber || "N/A",
    phone: phone || "N/A",
    email: email || "N/A",
    cardCode: localCardCode,
    cardNumber,
    totalCards,
  });

  const handleMouseMove = (e: any) => {
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10; // slightly more dramatic tilt
    const rotateY = (centerX - x) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleFlip = () => {
    // boom burst when flipping for visual emphasis
    setBoom(true);
    setTimeout(() => setBoom(false), 700);
    setIsFlipped((s) => !s);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `ArenaX-Card-${localCardCode}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // sparkles positions (some variety)
  const sparkles = [
    { left: "10%", top: "18%", delay: 0.0, scale: 1 },
    { left: "78%", top: "12%", delay: 0.2, scale: 0.8 },
    { left: "52%", top: "28%", delay: 0.6, scale: 1.1 },
    { left: "22%", top: "68%", delay: 0.3, scale: 0.9 },
    { left: "75%", top: "68%", delay: 0.5, scale: 0.85 },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* CARD WRAPPER */}
      <div
        style={{ perspective: "1400px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        onClick={handleFlip}
        className="cursor-pointer select-none"
      >
        <motion.div
          ref={cardRef}
          className="relative w-[360px] h-[230px] rounded-2xl"
          style={{
            transformStyle: "preserve-3d",
            // subtle perspective translateZ for layered feels
            WebkitTransformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: isFlipped ? 180 : rotation.y,
            rotateX: isFlipped ? 0 : rotation.x,
            z: 0,
          }}
          whileHover={{ scale: 1.035 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
        >
          {/* LAYER: FRONT */}
          <motion.div
            className="absolute inset-0 rounded-2xl gcard-neon-border"
            style={{
              backfaceVisibility: "hidden",
              backgroundImage: `url(${ARENAX_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: `2px solid ${cardStyle.neon}`,
              boxShadow: `0 8px 30px rgba(0,0,0,0.6), inset 0 0 30px ${cardStyle.neon}33`,
              overflow: "hidden",
            }}
            initial={{ opacity: 0.98 }}
          >
            {/* animated gold ribbon */}
            <div className="gcard-gold-ribbon" />

            {/* soft angled shine */}
            <div className="gcard-shine" />

            {/* arenaX title - slight float */}
            <motion.div
              style={{
                position: "absolute",
                top: 18,
                left: 20,
                right: 20,
                textAlign: "center",
                pointerEvents: "none",
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="text-3xl font-extrabold"
                style={{
                  color: "#ffeaa7",
                  textShadow: `0 0 12px ${cardStyle.neon}, 0 8px 30px rgba(0,0,0,0.5)`,
                  letterSpacing: 0.6,
                }}
              >
                ArenaX
              </div>
            </motion.div>

            {/* center content block */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: 16,
              }}
            >
              {/* name with subtle 3d extrude */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "white",
                  textShadow: `0 2px 0 rgba(0,0,0,0.6), 0 0 10px ${cardStyle.accent}`,
                }}
              >
                {name}
              </motion.div>

              {/* QR card panel - elevated */}
              <motion.div
                className="rounded-lg"
                style={{
                  padding: 10,
                  background: "rgba(255,255,255,0.98)",
                  borderRadius: 14,
                  boxShadow: `0 8px 30px rgba(0,0,0,0.45), 0 0 24px ${cardStyle.neon}55`,
                }}
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <QRCode value={qrData} size={90} />
              </motion.div>

              {/* code */}
              <div
                style={{
                  fontFamily: "monospace",
                  color: "#ffeda6",
                  fontSize: 12,
                  marginTop: 4,
                  textShadow: `0 0 6px ${cardStyle.neon}`,
                }}
              >
                {localCardCode}
              </div>
            </div>

            {/* sparkles */}
            {sparkles.map((s, i) => (
              <div
                key={i}
                className="gcard-sparkle"
                style={{
                  left: s.left,
                  top: s.top,
                  transform: `scale(${s.scale})`,
                  animationDelay: `${s.delay}s`,
                }}
              />
            ))}

            {/* subtle corner glow elements */}
            <div
              style={{
                position: "absolute",
                bottom: -40,
                left: -40,
                width: 160,
                height: 160,
                borderRadius: 24,
                filter: "blur(32px)",
                background:
                  "radial-gradient(circle at 20% 30%, rgba(255,215,0,0.12), rgba(184,134,11,0.02), transparent 50%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -24,
                right: -24,
                width: 120,
                height: 120,
                borderRadius: 20,
                filter: "blur(26px)",
                background:
                  "radial-gradient(circle at 70% 40%, rgba(255,240,180,0.14), rgba(184,134,11,0.02), transparent 50%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* BOOM burst effect (on click/flip) */}
          {boom && (
            <motion.div
              initial={{ scale: 0, opacity: 0.85 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 18,
                background: `radial-gradient(circle, ${cardStyle.neon}30, transparent 40%)`,
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            />
          )}

          {/* BACK */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "linear-gradient(135deg, rgba(28,14,2,0.96), rgba(60,30,0,0.96))",
              border: `2px solid ${cardStyle.neon}`,
              boxShadow: `0 10px 50px rgba(0,0,0,0.6), inset 0 0 30px rgba(0,0,0,0.4)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
            }}
            animate={{ opacity: isFlipped ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#ffefc2", marginBottom: 6 }}>
                Card #{cardNumber} / {totalCards}
              </div>
              <div style={{ fontSize: 12, color: "#ffd" }}>
                {name} — ArenaX Pass
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="flex items-center gap-2 text-xs text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <RotateCw className="w-3 h-3" />
        Click card to flip
      </motion.div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          // small scale feedback on click
          setBoom(true);
          setTimeout(() => setBoom(false), 500);
          downloadCard();
        }}
        className="gap-2 px-6 py-3 rounded-xl font-bold tracking-wider"
        style={{
          background: `linear-gradient(90deg, ${cardStyle.accent}, ${cardStyle.neon})`,
          color: "white",
          boxShadow: `0 8px 30px rgba(0,0,0,0.45), 0 0 25px ${cardStyle.neon}60`,
        }}
      >
        <Download className="w-4 h-4" />
        Download Card
      </Button>
    </div>
  );
};


import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";
import { Download, RotateCw, Shield, Trophy, Zap, Star } from "lucide-react";
import { useState, useRef } from "react";

interface GameCardDisplayProps {
  name: string;
  cardNumber: number;
  totalCards: number;
  cardCode: string;
  flatNumber: string;
  phone: string;
  email: string;
}

export const GameCardDisplay = ({
  name,
  cardNumber,
  totalCards,
  cardCode,
  flatNumber,
  phone,
  email,
}: GameCardDisplayProps) => {

  const qrData = `Champion: ${name}, AccessID: ${cardCode} `;

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (width / 2)) * 20;
    const rotateX = (mouseY / (height / 2)) * -20;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      // 1. Snapshot State
      const node = cardRef.current;
      const originalTransform = node.style.transform;
      const originalFilter = node.style.filter;

      // 2. Prepare for Capture (Flattening the image)
      node.style.transform = "none";
      node.style.filter = "none";

      // 3. Fix Gradient Text Glitch for html2canvas
      // We explicitly find elements with gradient text and replace with solid color for the screenshot
      const gradientTexts = node.querySelectorAll<HTMLElement>('[data-gradient-text="true"]');
      const originalStyles: { el: HTMLElement, bg: string, fill: string }[] = [];

      gradientTexts.forEach(el => {
        originalStyles.push({
          el,
          bg: el.style.backgroundImage,
          fill: el.style.webkitTextFillColor
        });
        // Apply solid metallic color for capture safety
        el.style.backgroundImage = 'none';
        el.style.webkitTextFillColor = 'initial'; // Reset transparent fill
        el.style.color = '#FDB931'; // Fallback Gold Color
      });

      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: 4, // Ultra-high resolution
        logging: false,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => element.classList.contains('animate-pulse') // Remove moving parts that blur
      });

      // 4. Restore State
      node.style.transform = originalTransform;
      node.style.filter = originalFilter;

      // Restore gradient text
      gradientTexts.forEach((el, index) => {
        el.style.backgroundImage = originalStyles[index].bg;
        el.style.webkitTextFillColor = originalStyles[index].fill;
        el.style.color = ''; // Remove inline override
      });

      const link = document.createElement('a');
      link.download = `ArenaX-VIP-${name.replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
      alert("Could not generate card image. Please try screenshotting.");
    }
  };

  // Ultra-Premium Palette
  const goldGradientText = "bg-gradient-to-b from-[#FFF8E1] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent";

  return (
    <div className="flex flex-col items-center gap-16 py-20 min-h-screen justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 15, delay: cardNumber * 0.1 }}
        className="relative group perspective-[2000px] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotation({ x: 0, y: 0 })}
        onClick={handleFlip}
      >
        {/* Cinematic Spotlight Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-[radial-gradient(circle,_rgba(255,215,0,0.08),_transparent_60%)] blur-[80px] rounded-full pointer-events-none"></div>

        <motion.div
          ref={cardRef}
          className="relative w-[360px] h-[640px] rounded-[36px]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: isFlipped ? 180 : rotation.y,
            rotateX: isFlipped ? 0 : rotation.x,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {/* ================= FRONT FACE: "THE BLACK CARD" ================= */}
          <div
            className="absolute inset-0 rounded-[36px] overflow-hidden backface-hidden z-20"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "#000",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,1), 0 0 40px rgba(184, 134, 11, 0.15)"
            }}
          >
            {/* outer rim glow */}
            <div className="absolute -inset-[1px] rounded-[37px] bg-gradient-to-b from-[#FFD700] via-[#B8860B] to-[#000] opacity-50 z-0"></div>

            {/* Inner Card Container */}
            <div className="absolute inset-[2px] rounded-[34px] bg-[#030303] overflow-hidden flex flex-col z-10">

              {/* Background: Subtle Luxury Texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#2a1b0d_0%,_#000_60%)]"></div>

              {/* -- DECORATIVE TOP -- */}
              <div className="relative pt-8 pb-4 text-center z-10">
                <div className="flex justify-center items-center gap-2 mb-3 opacity-60">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#FFD700]"></span>
                  <Star className="w-3 h-3 text-[#FFD700] fill-current" />
                  <span className="text-[9px] text-[#B8860B] font-bold uppercase tracking-[0.3em]">Exclusive Access</span>
                  <Star className="w-3 h-3 text-[#FFD700] fill-current" />
                  <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#FFD700]"></span>
                </div>

                {/* Title with data attribute for safe download */}
                <h1
                  data-gradient-text="true"
                  className={`font-serif text-5xl font-black italic tracking-tighter drop-shadow-2xl ${goldGradientText}`}
                  style={{ WebkitTextFillColor: 'transparent' }}
                >
                  ARENA<span className="text-[#B8860B]">X</span>
                </h1>
              </div>

              {/* -- CENTER: HOLOGRAM QR -- */}
              <div className="relative flex-1 flex items-center justify-center z-10 py-2">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Spinning Rings */}
                  <div className="absolute inset-0 border border-[#FFD700]/10 rounded-full animate-[spin_8s_linear_infinite]"></div>
                  <div className="absolute inset-6 border border-[#B8860B]/20 rounded-full border-t-transparent animate-[spin_4s_linear_infinite_reverse]"></div>

                  {/* QR Container */}
                  <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#B8860B] shadow-[0_0_30px_rgba(255,215,0,0.1)]">
                    <div className="bg-black p-3 rounded-xl relative overflow-hidden">
                      <QRCode
                        value={qrData}
                        size={140}
                        level="M"
                        bgColor="#000000"
                        fgColor="#FDB931" // Direct gold color for QR
                        style={{ display: 'block' }}
                      />
                      {/* Scanning beam */}
                      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-[#FFD700]/10 to-transparent blur-md animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* -- BOTTOM: DETAILS -- */}
              <div className="relative z-10 px-8 pb-10">
                <div className="text-center mb-8">
                  <p className="text-[#665c4a] text-[9px] font-bold uppercase tracking-[0.4em] mb-2">Player Identity</p>
                  <h2
                    data-gradient-text="true"
                    className={`font-serif text-3xl font-bold uppercase tracking-wide ${goldGradientText}`}
                    style={{ WebkitTextFillColor: 'transparent' }}
                  >
                    {name}
                  </h2>
                  <div className="w-12 h-[2px] bg-[#B8860B] mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Pass Stats Row */}
                <div className="flex justify-between items-center bg-[#111] border border-[#333] rounded-xl p-4 backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-[#666] uppercase tracking-[0.2em] mb-1">Pass Code</span>
                    <span className="font-mono text-lg text-[#FDB931] tracking-widest">{cardCode}</span>
                  </div>

                  <div className="h-8 w-[1px] bg-[#333]"></div>

                  <div className="flex flex-col items-end">
                    <span className="text-[8px] text-[#666] uppercase tracking-[0.2em] mb-1">Status</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00ff00] shadow-[0_0_5px_#00ff00]"></div>
                      <span className="text-xs font-bold text-white tracking-widest uppercase">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glass Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none opacity-50 z-20"></div>
          </div>


          {/* ================= BACK FACE ================= */}
          <div
            className="absolute inset-0 rounded-[36px] overflow-hidden backface-hidden z-10"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "#080808",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,1)"
            }}
          >
            {/* Minimal Gold Frame */}
            <div className="absolute inset-4 border border-[#B8860B]/30 rounded-[28px] opacity-70"></div>

            <div className="relative h-full flex flex-col items-center justify-center p-10 text-center z-10">
              <div className="mb-8 p-6 rounded-full bg-[#0f0f0f] border border-[#333]">
                <Trophy className="w-12 h-12 text-[#FFD700]" />
              </div>

              <h3 className="font-serif text-4xl text-white font-bold uppercase tracking-widest mb-2">ArenaX</h3>
              <p className="text-[#888] text-[10px] uppercase tracking-[0.4em]">The Elite Circle</p>

              <div className="absolute bottom-10 opacity-30">
                <img src="/images/logos/logog.png" alt="Logo" className="h-6 w-auto grayscale" />
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>

      {/* ============== CONTROLS ============== */}
      <div className="text-center space-y-6">
        <button
          onClick={downloadCard}
          className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#B8860B] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
          <div className="absolute inset-0 border border-[#FFD700]/50 rounded-full"></div>

          <Download className="w-5 h-5 text-[#FFD700] group-hover:drop-shadow-[0_0_8px_#FFD700]" />
          <span className="text-[#FFD700] font-bold uppercase tracking-[0.25em] text-xs">Save Ticket</span>
        </button>
      </div>
    </div>
  );
};

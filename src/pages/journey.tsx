import React, { useEffect, useRef, useState } from "react";

/* ---------- Types ---------- */
interface MediaItem {
  title: string;
  caption: string;
  driveId: string;
  type: "video" | "image";
  aspectRatio?: "16:9" | "9:16";
}

/* ---------- Helpers ---------- */
// MODIFICATION: Updated to correctly append autoplay=1 to all URLs
const DRIVE_PREVIEW = (idOrUrl: string | null | undefined): string => {
  if (!idOrUrl) return "";
  let baseUrl = "";
  let originalParams: string | null = null;

  if (idOrUrl.includes("drive.google.com")) {
    const urlParts = idOrUrl.split("?");
    baseUrl = urlParts[0];
    originalParams = urlParts[1] || null;
    
    if (baseUrl.includes("/view")) {
      baseUrl = baseUrl.replace("/view", "/preview");
    }

    if (!baseUrl.includes("/preview")) {
        const m = baseUrl.match(/\/d\/([^/]+)/);
        if (m && m[1]) {
          baseUrl = `https://drive.google.com/file/d/${m[1]}/preview`;
        }
    }
  } else {
    // Assumes it's a driveId
    baseUrl = `https://drive.google.com/file/d/${idOrUrl}/preview`;
  }

  const params = new URLSearchParams(originalParams || "");
  params.set("autoplay", "1"); // Add/overwrite autoplay=1

  return `${baseUrl}?${params.toString()}`;
};

const IconPlay = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 3v18l15-9L5 3z" />
  </svg>
);
const IconClose = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Lightbox ---------- */
interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;
  // MODIFICATION: src now comes from the updated helper
  const src = DRIVE_PREVIEW(item.driveId);
  const isVideo = item.type === "video";
  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1200px] rounded-2xl overflow-hidden bg-[#121212] border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
          <div>
            <p className="text-white font-medium tracking-wide">{item.title}</p>
            <p className="text-sm text-white/50">{item.caption}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <IconClose className="text-white" />
          </button>
        </div>
        <div className="bg-black flex items-center justify-center relative aspect-video">
          {isVideo ? (
            <iframe
              src={src}
              title={item.title}
              allow="autoplay; encrypted-media; fullscreen"
              className="w-full h-[75vh] border-0"
            />
          ) : (
            <img src={src} alt={item.title} className="w-full h-[75vh] object-contain" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Horizontal Carousel ---------- */
interface CarouselProps {
  items?: MediaItem[];
  interval?: number;
  height?: number;
  onOpen: (item: MediaItem) => void;
}

function Carousel({ items = [], interval = 4000, height = 220, onOpen }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  // MODIFICATION: Disabled autoscroll
  // useEffect(() => {
  //   if (items.length === 0) return;
  //   const timer = setInterval(() => setIdx((i) => (i + 1) % items.length), interval);
  //   return () => clearInterval(timer);
  // }, [items.length, interval]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !el.children[idx]) return;
    el.children[idx].scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [idx]);

  return (
    <div className="overflow-hidden py-4">
      <div ref={ref} className="flex gap-6 overflow-x-auto no-scrollbar px-6">
        {items.map((it, i) => {
          // MODIFICATION: src now comes from the updated helper
          const src = DRIVE_PREVIEW(it.driveId);
          
          const isPortrait = it.aspectRatio === "9:16";
          const landscapeWidthClass = "w-[min(600px,80vw)]";
          
          const style: React.CSSProperties = { height };
          if (isPortrait) {
            style.width = `${(height * 9) / 16}px`;
          }

          return (
            <div
              key={i}
              onClick={() => onOpen(it)}
              className={`relative flex-shrink-0 rounded-xl overflow-hidden shadow-2xl cursor-pointer group border border-white/5 hover:border-blue-500/50 transition-all duration-500 ${isPortrait ? "" : landscapeWidthClass}`}
              style={style}
            >
              {it.type === "image" ? (
                <img
                  src={src}
                  alt={it.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 relative">
                  <iframe
                    src={src}
                    allow="autoplay"
                    className="w-full h-full object-cover border-0 pointer-events-none"
                    tabIndex={-1} 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 z-10" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white font-bold text-lg tracking-tight">{it.title}</p>
                <p className="text-xs text-blue-200/80 font-medium uppercase tracking-wider mt-1">{it.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Main ---------- */
export default function JourneyCinematicPro_Fixed() {
  const slides: MediaItem[] = [
    { title: "Teluginti Deepavali", caption: "Lights & storytelling.", driveId: "https://drive.google.com/file/d/1PRndfJOKqx7E0O8ZkdWJRIJCndCUbGab/view", type: "video", aspectRatio: "9:16" },
    { title: "Agentic AI", caption: "Future visuals & experiments.", driveId: "1Xg44eZdtpWKjOwdSRNG71OeHvT6Bs10w", type: "video" },
    { title: "Nature Cinematic", caption: "Calm & atmospheric.", driveId: "https://drive.google.com/file/d/1UGgKWWnO-CZmv6KpnSr97AArDcPCrHlg/view?t=2", type: "video" },
  ];

  const youth: MediaItem[] = [
    { title: "Youth Speaks: Opening", caption: "Keynote", driveId: "1YOUTH_IMG1", type: "image" },
    { title: "Event Highlights", caption: "Cinematic Reel", driveId: "https://drive.google.com/file/d/1DNrlcFSzYqT0WgeVjJzx2lLMz7iwiGiA/view", type: "video", aspectRatio: "9:16" },
    { title: "Audience Pulse", caption: "Crowd Moments", driveId: "1YOUTH_IMG2", type: "image" },
  ];

  const innovate: MediaItem[] = [
    { title: "Grand Opening", caption: "Stage Set", driveId: "1INNO_OPEN", type: "image" },
    { title: "Brand Battles", caption: "Official Poster", driveId: "1INNO_POSTER", type: "image" },
    { title: "InnovateX Recap", caption: "Aftermovie Reel", driveId: "1INNO_REEL", type: "video" },
  ];

  const [lightItem, setLightItem] = useState<MediaItem | null>(null);

  /* ---- Parallax Logic ---- */
  useEffect(() => {
    const elms = document.querySelectorAll<HTMLElement>("[data-parallax='1']");
    const onScroll = () => {
      elms.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = 1 - rect.top / vh;
        const offset = (progress - 0.5) * -80; 
        el.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30">
      <style>{`
        html,body{scroll-behavior:smooth;overscroll-behavior:none}
        .no-scrollbar::-webkit-scrollbar{display:none}
      `}</style>

      {/* Hero Slides */}
      {slides.map((s, i) => {
        const isPortrait = s.aspectRatio === "9:16";
        
        return (
          <section key={i} className="relative h-screen flex items-end overflow-hidden border-b border-white/5">
            <div 
              data-parallax="1" 
              className="absolute inset-0 will-change-transform flex justify-center items-center overflow-hidden"
            >
              <iframe
                // MODIFICATION: src now comes from the updated helper
                src={DRIVE_PREVIEW(s.driveId)}
                allow="autoplay;fullscreen"
                className={`border-0 opacity-80 ${isPortrait ? "h-full aspect-[9/16]" : "w-full h-full"}`}
                title={s.title}
                tabIndex={-1} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />
            </div>

            <div className="relative z-20 w-full px-6 pb-32 md:pl-20">
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4 drop-shadow-2xl">
                  {s.title}
                </h2>
                <div className="h-1 w-20 bg-blue-500 mb-6 rounded-full" />
                <p className="text-lg text-gray-300 mb-8 font-light border-l-2 border-white/30 pl-4">
                  {s.caption}
                </p>
                <button
                  onClick={() => setLightItem(s)}
                  className="group px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-3 hover:bg-blue-50 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  <div className="p-1 bg-black rounded-full text-white group-hover:scale-110 transition-transform">
                    <IconPlay className="w-4 h-4" />
                  </div>
                  Watch Film
                </button>
              </div>
            </div>
          </section>
        )
      })}

      {/* Youth Speaks Section */}
      <section className="relative min-h-screen flex flex-col justify-center bg-[#050505] py-24">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]" />
        </div>

        <div className="relative z-20 px-6 mb-12 text-center">
          <span className="text-blue-400 tracking-[0.2em] text-sm uppercase font-bold">Community Event</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-2 mb-4">Youth Speaks</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A platform for young voices. Experience the energy and the stories that unfolded on stage.
          </p>
        </div>

        <Carousel items={youth} interval={4000} height={300} onOpen={setLightItem} />
      </section>

      {/* InnovateX25 - Major Redesign */}
      <section id="innovatex" className="relative py-32 flex items-center justify-center bg-[#0a0a0a] border-y border-white/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-20 w-full max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Glass Card Info */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-white/50">Flagship Summit</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Innovate<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">X</span>25
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Two days of relentless creativity. The IPL Auction, Brand Battles, and Echoes coming together for a summit of 350+ participants.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <p className="text-2xl font-bold text-white">350+</p>
                <p className="text-xs text-gray-500 uppercase">Attendees</p>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <p className="text-2xl font-bold text-white">₹499</p>
                <p className="text-xs text-gray-500 uppercase">Entry Fee</p>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold hover:opacity-90 transition-opacity shadow-lg shadow-blue-900/20">
              View Full Recap
            </button>
          </div>

          {/* Right: Video Grid / Visuals */}
          <div className="space-y-6">
            <div className="text-right mb-4">
              <h3 className="text-2xl font-bold text-white">Gallery & Highlights</h3>
              <p className="text-sm text-gray-500">Autoplaying previews</p>
            </div>
            <div
              onClick={() => setLightItem(innovate[2])}
              className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-black"
            >
              <iframe
                // MODIFICATION: src now comes from the updated helper
                src={DRIVE_PREVIEW("1INNO_REEL")}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                tabIndex={-1} 
                allow="autoplay"
                title="InnovateX Recap"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconPlay className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="flex gap-4 h-32">
              {innovate.slice(0, 2).map((item, i) => (
                <div key={i} onClick={() => setLightItem(item)} className="flex-1 rounded-xl overflow-hidden border border-white/10 cursor-pointer relative group">
                  <img
                    src={DRIVE_PREVIEW(item.driveId)}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 text-center">
        <p className="text-white/40 text-sm font-light">
          © {new Date().getFullYear()} Focsera Studios • Cinematic Experience
        </p>
      </footer>

      {/* Lightbox */}
      <Lightbox item={lightItem} onClose={() => setLightItem(null)} />
    </div>
  );
}
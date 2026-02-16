import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JourneyGallery from "../components/JourneyGallery";

/* ---------- Types ---------- */
interface MediaItem {
  title: string;
  caption: string;
  mediaId: string;
  type: "video" | "image";
  aspectRatio?: "16:9" | "9:16";
}

/* ---------- Helpers ---------- */
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getEmbedUrl = (
  mediaId: string | null | undefined,
  type: "video" | "image",
  options: { autoplay?: boolean; controls?: boolean } = {}
): string => {
  if (!mediaId) return "";

  const { autoplay = false, controls = false } = options;

  if (type === "video") {
    const videoId = getYouTubeId(mediaId);
    if (videoId) {
      const params = new URLSearchParams({
        playsinline: '1',
        rel: '0',
        modestbranding: '1',
        showinfo: '0',
      });

      if (autoplay) {
        params.set('autoplay', '1');
        params.set('mute', '1');
        params.set('loop', '1');
        params.set('playlist', videoId);
      }

      if (controls) {
        params.set('controls', '1');
      } else {
        params.set('controls', '0');
      }

      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }
    return "";
  }

  if (type === "image") {
    if (mediaId.startsWith("1YOUTH") || mediaId.startsWith("1INNO")) {
      const text = mediaId.replace(/_/g, ' ');
      const bgColor = "0a0a0a";
      const textColor = "555555";
      return `https://placehold.co/600x400/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
    }
    return mediaId || "";
  }

  return mediaId || "";
};

const IconClose = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconExpand = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Lightbox ---------- */
function Lightbox({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;

  const src = getEmbedUrl(item.mediaId, item.type, { autoplay: true, controls: true });
  const isVideo = item.type === "video";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl rounded-2xl overflow-hidden bg-[#050505] border border-white/10 shadow-2xl relative"
        >
          <div className="absolute top-4 right-4 z-50">
            <button onClick={onClose} className="p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10">
              <IconClose />
            </button>
          </div>

          <div className="bg-black flex items-center justify-center relative aspect-video h-[80vh] w-full">
            {isVideo ? (
              <iframe
                src={src}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                className="w-full h-full border-0"
              />
            ) : (
              <img src={src} alt={item.title} className="w-full h-full object-contain" />
            )}
          </div>

          <div className="p-6 bg-[#050505] border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
            <p className="text-gray-400">{item.caption}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- Components ---------- */

const BentoGridItem = ({ item, className, onClick }: { item: MediaItem; className?: string; onClick: () => void }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      className={`relative group rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-[#0a0a0a] ${className}`}
    >
      <div className="absolute inset-0 bg-gray-900 animate-pulse" /> {/* Placeholder loading */}
      <img
        src={getEmbedUrl(item.mediaId, item.type)}
        alt={item.title}
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 p-6 w-full">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-1">{item.caption}</p>
          <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white">
          <IconExpand className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  )
}

const ArchiveItem = ({ item, onClick }: { item: MediaItem, onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/5 transition-all group"
    >
      <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-900 relative flex-shrink-0">
        {item.type === 'video' ? (
          <div className="w-full h-full bg-blue-900/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-1"></div>
            </div>
          </div>
        ) : (
          <img src={getEmbedUrl(item.mediaId, item.type)} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">{item.title}</h4>
        <p className="text-xs text-gray-500 truncate">{item.caption}</p>
      </div>
    </div>
  )
}

/* ---------- Main Page ---------- */
export default function JourneyPage() {
  const [lightItem, setLightItem] = useState<MediaItem | null>(null);

  // Data
  // Data
  const featuredMedia: MediaItem[] = [
    { title: "Moments of Joy", caption: "Celebration", mediaId: "/images/journey/IMG_0566.png", type: "image", aspectRatio: "9:16" },
    { title: "Art & Tradition", caption: "Rangoli Art", mediaId: "/images/journey/IMG_0569.png", type: "image", aspectRatio: "9:16" },
    { title: "Community Spirit", caption: "Togetherness", mediaId: "/images/journey/IMG_05959_.png", type: "image", aspectRatio: "16:9" },
    { title: "Shared Happiness", caption: "Festive Vibes", mediaId: "/images/journey/IMG_0575.png", type: "image", aspectRatio: "9:16" },
    { title: "Cultural Essence", caption: "Heritage", mediaId: "/images/journey/IMG_0578.png", type: "image", aspectRatio: "9:16" },
  ];



  const archives: { category: string; items: MediaItem[] }[] = [
    {
      category: "InnovateX Highlights",
      items: [
        { title: "Grand Opening", caption: "Stage Set", mediaId: "1INNO_OPEN", type: "image" },
        { title: "Brand Battles", caption: "Official Poster", mediaId: "1INNO_POSTER", type: "image" },
        { title: "InnovateX Recap", caption: "Aftermovie Reel", mediaId: "https://www.youtube.com/watch?v=2--j1fth-sE", type: "video" },
      ]
    },
    {
      category: "Youth Speaks",
      items: [
        { title: "Youth Speaks: Opening", caption: "Keynote", mediaId: "1YOUTH_IMG1", type: "image" },
        { title: "Event Highlights", caption: "Cinematic Reel", mediaId: "https://www.youtube.com/watch?v=S21q-kB-dGk", type: "video", aspectRatio: "9:16" },
        { title: "Audience Pulse", caption: "Crowd Moments", mediaId: "1YOUTH_IMG2", type: "image" },
      ]
    },
    {
      category: "Cinematic Shorts",
      items: [
        { title: "Teluginti Deepavali", caption: "Lights & storytelling", mediaId: "", type: "video", aspectRatio: "9:16" },
        { title: "Agentic AI", caption: "Future Visuals", mediaId: "https://www.youtube.com/watch?v=B069-0Iofb8", type: "video" },
        { title: "Nature Cinematic", caption: "Calm & atmospheric", mediaId: "https://www.youtube.com/watch?v=Cxw3t-8-bk8", type: "video" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 selection:bg-orange-500/30">
      <style>{`
        html,body{scroll-behavior:smooth;overscroll-behavior:none}
        .no-scrollbar::-webkit-scrollbar{display:none}
      `}</style>

      {/* Hero Section: Visual Chronicles */}
      <section className="relative px-4 pt-32 pb-12 md:px-8 md:pt-40 md:pb-24 max-w-[1400px] mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-gray-300 text-xs font-bold tracking-[0.2em] uppercase">The Collection</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-6 py-2 leading-tight">
            Visual Chronicles
          </h1>
          <p className="max-w-xl mx-auto text-lg text-gray-400 font-light leading-relaxed">
            Capturing the essence of life's most vibrant moments. A curated visual journey of community, innovation, and culture.
          </p>
        </motion.div>

        {/* Mobile Layout (Vertical Stack) */}
        <div className="flex flex-col gap-4 md:hidden pb-12">
          <BentoGridItem item={featuredMedia[2]} onClick={() => setLightItem(featuredMedia[2])} className="aspect-video" />
          <div className="grid grid-cols-2 gap-3">
            <BentoGridItem item={featuredMedia[0]} onClick={() => setLightItem(featuredMedia[0])} className="aspect-[9/16]" />
            <BentoGridItem item={featuredMedia[1]} onClick={() => setLightItem(featuredMedia[1])} className="aspect-[9/16]" />
            <BentoGridItem item={featuredMedia[3]} onClick={() => setLightItem(featuredMedia[3])} className="aspect-[9/16]" />
            <BentoGridItem item={featuredMedia[4]} onClick={() => setLightItem(featuredMedia[4])} className="aspect-[9/16]" />
          </div>
        </div>

        {/* Desktop Layout (Bento Grid) */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 min-h-[800px]">
          {/* Left Column */}
          <BentoGridItem
            item={featuredMedia[0]}
            onClick={() => setLightItem(featuredMedia[0])}
            className="col-span-1 row-span-2"
          />

          {/* Center Top Big */}
          <BentoGridItem
            item={featuredMedia[2]}
            onClick={() => setLightItem(featuredMedia[2])}
            className="col-span-2 row-span-1"
          />

          {/* Right Column */}
          <BentoGridItem
            item={featuredMedia[1]}
            onClick={() => setLightItem(featuredMedia[1])}
            className="col-span-1 row-span-2"
          />

          {/* Center Bottom Split */}
          <BentoGridItem
            item={featuredMedia[3]}
            onClick={() => setLightItem(featuredMedia[3])}
            className="col-span-1 row-span-1"
          />
          <BentoGridItem
            item={featuredMedia[4]}
            onClick={() => setLightItem(featuredMedia[4])}
            className="col-span-1 row-span-1"
          />
        </div>

      </section>

      {/* New Journey Gallery Section */}
      <JourneyGallery />

      {/* Minimized Archives Section */}
      <section className="bg-[#050505] border-t border-white/5 py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Past Chronicles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {archives.map((cat, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                  {cat.category}
                </h3>
                <div className="space-y-2">
                  {cat.items.map((it, j) => (
                    <ArchiveItem key={j} item={it} onClick={() => setLightItem(it)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-white/20 text-xs border-t border-white/5">
        © {new Date().getFullYear()} Focsera Studios
      </footer>

      {/* Lightbox */}
      <Lightbox item={lightItem} onClose={() => setLightItem(null)} />
    </div>
  );
}

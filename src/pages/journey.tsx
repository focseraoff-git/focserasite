// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';

// --- SVG Icon Components ---
// Using inline SVGs for icons as we can't import libraries like lucide-react

const IconCheckCircle = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconSparkles = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 16l1.9-4.8 4.8-1.9-4.8-1.9L12 3z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const IconAward = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const IconShieldCheck = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconRocket = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.5-3 1.5-4.5 0s-1.5-3 0-4.5L13.5 4.5l6 6L4.5 16.5z" />
    <path d="m15 13.5 6 6" />
    <path d="m21.5 11.5-1-1" />
  </svg>
);

const IconUsers = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6" />
    <path d="M23 11h-6" />
  </svg>
);

const IconCheck = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconPhone = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconLock = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconClipboardList = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);


// [NEW] 3D Tiltable Card Component
const TiltableCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -8; // Max tilt 4 degrees
    const rotateY = (x / width) * 8;  // Max tilt 4 degrees
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};


// --- SVG Icon Components (Styled for the new design) ---
const IconWrapper = ({ children }) => (
  // [THEME] Updated to light theme
  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 backdrop-blur-sm border border-blue-200/50 shadow-lg">
    {children}
  </div>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 9 2c-3.1 0-5.5 2.2-6 5.1.1 1.6.6 3 1.5 4.2.9 1.2 1.5 2.5 1.5 3.8V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1z" /><path d="M9 18v2h6v-2" />
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// --- Stylish Media Gallery Component ---
const MediaGallery = ({ items = [] }) => {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Grid supports both images and videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {items.map((item, index) => (
          <div key={index} className="w-full max-w-[360px]">
            <button onClick={() => setActiveItem(item)} className="block w-full text-left group">
              {/* [THEME] Updated to use neon-card-border for frosted glass */}
              <div className={`relative ${item.type === 'video' ? 'aspect-[9/16] rounded-3xl' : 'aspect-[16/10] rounded-2xl'} overflow-hidden shadow-2xl neon-card-border transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20`}>
                {item.type === 'video' ? (
                  <video src={item.src} muted playsInline loop preload="auto" autoPlay className="w-full h-full object-cover" />
                ) : (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* [THEME] Updated hover icon bg */}
                  <div className="w-20 h-20 rounded-full bg-black/20 backdrop-blur-lg flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={item.type === 'video' ? 'M8 5v14l11-7z' : 'M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8'} /></svg>
                  </div>
                </div>

                {/* [THEME] Updated tag style */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">{item.type === 'video' ? 'REEL' : 'PHOTO'}</div>
                <div className="absolute bottom-4 left-4 right-4">
                  {/* [THEME] Updated text color (shadow for readability) */}
                  <p className="text-white font-bold text-lg truncate [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.5)]">{item.title}</p>
                  <p className="text-slate-100 text-sm [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.5)]">{item.caption}</p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Modal viewer for both image and video */}
      {activeItem && (
        // [THEME] Updated backdrop
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setActiveItem(null)}>
          {/* [THEME] Updated modal to use frosted glass */}
          <div className="relative w-full max-w-3xl neon-card-border rounded-3xl shadow-2xl flex flex-col overflow-hidden m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200/50 flex justify-between items-center">
              <div>
                {/* [THEME] Updated modal text colors */}
                <p className="text-gray-900 font-bold text-lg">{activeItem.title}</p>
                <p className="text-sm text-gray-600 mt-1">{activeItem.caption}</p>
              </div>
              <button onClick={() => setActiveItem(null)} className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-500/10 transition-colors">
                <XIcon />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black p-6">
              {activeItem.type === 'video' ? (
                <video src={activeItem.src} controls autoPlay className="w-full h-auto rounded-lg max-h-[70vh]" />
              ) : (
                <img src={activeItem.src} alt={activeItem.title} className="w-full h-auto rounded-lg object-contain max-h-[70vh]" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Elegant Timeline Item Component ---
const TimelineItem = ({ year, title, description, icon, isLeft, url }) => (
  // [NEW] Added animate-on-scroll
  <div className={`relative w-full flex ${isLeft ? 'justify-start' : 'justify-end'} mb-12 animate-on-scroll`}>
    <div className="w-full md:w-1/2">
      {/* [NEW] Wrapped in TiltableCard and applied neon-card-border */}
      <TiltableCard className={`relative p-6 rounded-2xl shadow-xl neon-card-border ${isLeft ? 'md:mr-6' : 'md:ml-6'}`}>
        <div className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center ${isLeft ? 'right-[-20px]' : 'left-[-20px]'}`}>
          {icon}
        </div>
        {/* [THEME] Updated text colors */}
        <p className="text-lg font-bold text-blue-600 mb-2">{year}</p>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group mt-4">
            Visit Website <ArrowRightIcon />
          </a>
        )}
      </TiltableCard>
    </div>
  </div>
);

// --- Main Journey Page Component ---
export default function App() {
  // [NEW] Scroll Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const journeyData = [
    {
      year: '2025',
      title: 'Hosted InnovateX25',
      description: 'Hosted our flagship tech and creativity conference, InnovateX25, bringing together industry leaders and visionaries from around the globe in October.',
      icon: <IconWrapper><LightbulbIcon /></IconWrapper>,
      url: 'https://innovatex25-1nfy.vercel.app/',
    }
  ];

  // =================================================================
  // THIS IS THE SECTION TO EDIT
  //
  // 1. Make sure your video files (e.g., 'teluginti-deepavali.mp4')
  //    are in the 'public/videos/journey/' folder.
  // 2. Use .mp4 for web compatibility, not .MOV.
  // 3. The 'src' path must start with '/' to point to the public folder.
  //
  const mediaData = [
    { 
      type: 'video', 
      src: '/videos/journey/Adobe Express - IMG_5861.mp4', 
      title: 'Teluginti Deepavali', 
      caption: 'Let the lights inspire you! 🪔' 
    },
    
  ];

  // InnovateX gallery data (external links)
  const innovatexData = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', title: 'InnovateX Day 1', caption: 'Keynote and opening' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80', title: 'Workshops', caption: 'Hands-on sessions' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1532619187605-1c7a8b6b7a3b?auto=format&fit=crop&w=1200&q=80', title: 'Hackathon', caption: 'Team projects in action' },
    { type: 'video', src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', title: 'Highlights Reel', caption: 'InnovateX highlights' },
  ];
  // =================================================================


  return (
    // [THEME] Changed to bg-white, text-gray-900
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* [NEW] Style tag from PromptXDark.jsx (light theme) */}
      <style>{`
        /* [ULTIMATE] Frosted glass card style */
        .neon-card-border {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          will-change: transform; /* Hint for animations */
        }
        .grid-background {
          position: fixed;
          inset: 0;
          z-index: -10;
          /* [THEME] Light grid on white */
          background-image:
            linear-gradient(to right, rgba(59, 130, 246, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(100% 100% at top center, white, transparent);
        }
        @keyframes aurora-slide {
          0% { transform: translate(-20%, -20%) rotate(0deg); }
          50% { transform: translate(20%, 30%) rotate(10deg); }
          100% { transform: translate(-20%, -20%) rotate(0deg); }
        }
        .aurora-blob {
          position: absolute;
          filter: blur(3xl);
          /* [THEME] Lighter opacity for light bg */
          opacity: 0.1;
          will-change: transform;
          animation: aurora-slide 25s infinite ease-in-out;
          z-index: -5;
        }
        
        /* [ULTIMATE] Enhanced Scroll animation */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px) scale(0.99);
          filter: blur(4px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out, filter 0.6s ease-out;
          transition-delay: var(--delay, 0s);
          will-change: opacity, transform, filter;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
        
        /* Fade-in for modal */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
      
      {/* [THEME] Background Effects */}
      <div className="grid-background" />
      <div className="aurora-blob top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-400 rounded-full" />
      <div className="aurora-blob bottom-[-30%] right-[-30%] w-[1000px] h-[1000px] bg-indigo-400 rounded-full" style={{ animationDelay: '8s' }} />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="text-center mb-20 animate-on-scroll">
            {/* [THEME] Updated header text colors */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-4">
              Our <span className="text-blue-600">Journey</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From a simple idea to a multi-divisional powerhouse. Follow our story of growth, innovation, and passion.
            </p>
          </header>

          {/* Gallery Section */}
          <section className="mb-24 animate-on-scroll" id="gallery">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
              <span className="text-blue-600">Reels</span>
            </h2>
            <MediaGallery items={mediaData} />
          </section>

          {/* InnovateX Gallery Section */}
          <section className="mb-24 animate-on-scroll" id="innovatex-gallery">
            <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">
              <span className="text-blue-600">InnovateX Gallery</span>
            </h2>
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
              Highlights from our InnovateX conference — keynotes, workshops and community moments. Use the viewer to enlarge photos or play highlight reels.
            </p>
            <MediaGallery items={innovatexData} />
          </section>

          {/* Timeline Section */}
          <section className="relative" style={{ perspective: '1000px' }}>
            {/* [THEME] Updated timeline bar color */}
            <div className="absolute top-0 h-full w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-transparent left-4 md:left-1/2 md:-translate-x-1/2"></div>
            
            {journeyData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="w-full flex justify-center">
                  {isLeft ? <TimelineItem {...item} isLeft={true} /> : <div className="hidden md:block w-1/2"></div>}
                  {!isLeft ? <TimelineItem {...item} isLeft={false} /> : <div className="hidden md:block w-1/2"></div>}
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}

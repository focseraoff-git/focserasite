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
    const rotateY = (x / width) * 8;   // Max tilt 4 degrees
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
  // [THEME] Updated for dark theme
  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-900/50 backdrop-blur-sm border border-blue-500/50 shadow-lg">
    {children}
  </div>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 9 2c-3.1 0-5.5 2.2-6 5.1.1 1.6.6 3 1.5 4.2.9 1.2 1.5 2.5 1.5 3.8V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1z" /><path d="M9 18v2h6v-2" />
  </svg>
);

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
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

// --- [NEW] Stylish Media Slideshow Component ---
const MediaSlideshow = ({ items = [] }) => {
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
      {/* [NEW] Swiper.js Slideshow */}
      <swiper-container
        effect="coverflow"
        grab-cursor="true"
        centered-slides="true"
        slides-per-view="auto"
        loop="true"
        pagination='{"clickable": true}'
        navigation="true"
        coverflow-effect='{"rotate": 50, "stretch": 0, "depth": 100, "modifier": 1, "slideShadows": true}'
      >
        {items.map((item, index) => (
          <swiper-slide key={index} class="swiper-slide-coverflow">
            <button onClick={() => setActiveItem(item)} className="block w-full text-left group">
              <div className={`relative ${item.type === 'video' ? 'aspect-[9/16] rounded-3xl' : 'aspect-[16/10] rounded-2xl'} overflow-hidden shadow-2xl neon-card-border transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20`}>
                {item.type === 'video' ? (
                  <video src={item.src} muted playsInline loop preload="auto" autoPlay className="w-full h-full object-cover" />
                ) : (
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-lg flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={item.type === 'video' ? 'M8 5v14l11-7z' : 'M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8'} /></svg>
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">{item.type === 'video' ? 'REEL' : 'PHOTO'}</div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg truncate [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.5)]">{item.title}</p>
                  <p className="text-slate-100 text-sm [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.5)]">{item.caption}</p>
                </div>
              </div>
            </button>
          </swiper-slide>
        ))}
      </swiper-container>

      {/* Modal viewer for both image and video */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setActiveItem(null)}>
          {/* [THEME] Updated modal for dark theme */}
          <div className="relative w-full max-w-3xl neon-card-border rounded-3xl shadow-2xl flex flex-col overflow-hidden m-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200/20 flex justify-between items-center">
              <div>
                <p className="text-gray-100 font-bold text-lg">{activeItem.title}</p>
                <p className="text-sm text-gray-400 mt-1">{activeItem.caption}</p>
              </div>
              <button onClick={() => setActiveItem(null)} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <XIcon />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black/50 p-6">
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
        <p className="text-lg font-bold text-blue-400 mb-2">{year}</p>
        <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 group mt-4">
            Visit Website <ArrowRightIcon />
          </a>
        )}
      </TiltableCard>
    </div>
  </div>
);

// --- [NEW] Division Card Component ---
const DivisionCard = ({ icon, title, description }) => (
  <TiltableCard className="w-full neon-card-border rounded-2xl p-6 flex flex-col items-start">
    <div className="mb-4">
      <IconWrapper>{icon}</IconWrapper>
    </div>
    <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </TiltableCard>
);

// --- [NEW] Portfolio Card Component (for Web & Media) ---
const PortfolioCard = ({ title, description, url, children, icon }) => (
  <TiltableCard className="w-full neon-card-border rounded-2xl p-6">
    {icon && <div className="mb-4"><IconWrapper>{icon}</IconWrapper></div>}
    <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
    {url && (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 group">
        Visit Website <ArrowRightIcon />
      </a>
    )}
    {children}
  </TiltableCard>
);

// --- [NEW] Tabbed Portfolio Component ---
const TabbedPortfolio = ({ webData, mediaData }) => {
  const [activeTab, setActiveTab] = useState('web');
  const tabs = [
    { id: 'web', label: 'Web Portfolio', icon: <IconRocket className="text-indigo-400" /> },
    { id: 'media', label: 'Media Portfolio', icon: <IconSparkles className="text-rose-400" /> }
  ];

  return (
    <div>
      <div className="flex justify-center mb-8 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {activeTab === 'web' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {webData.map((item, i) => (
              <PortfolioCard
                key={i}
                title={item.title}
                description={item.description}
                url={item.url}
              />
            ))}
          </div>
        )}
        {activeTab === 'media' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <PortfolioCard
              icon={<IconUsers className="text-rose-400" />}
              title="Clients & Services"
              description="We partner with creators and brands to grow their presence."
            >
              <div className="mt-4">
                <h4 className="font-semibold text-gray-200 mb-2">Services Include</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mediaData.services.map((service, i) => (
                    <span key={i} className="text-sm bg-gray-700 text-gray-200 px-3 py-1 rounded-full">{service}</span>
                  ))}
                </div>
                <h4 className="font-semibold text-gray-200 mb-2">Selected Clients</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {mediaData.clients.map((client, i) => (
                    <li key={i}>{client}</li>
                  ))}
                </ul>
              </div>
            </PortfolioCard>
          </div>
        )}
      </div>
    </div>
  );
};


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

  // [NEW] Load Swiper.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // =================================================================
  //
  // DATA DEFINITIONS
  // This is the new section to edit your content.
  // Replace placeholder URLs (placehold.co, flower.mp4) with your
  // Google Drive preview links or other public URLs.
  //
  // =================================================================

  // --- 1. Timeline Milestones ---
  const journeyData = [
    {
      year: '2025',
      title: 'Hosted InnovateX25',
      description: 'Hosted our flagship tech and creativity conference, InnovateX25, bringing together industry leaders and visionaries from around the globe in October.',
      icon: <IconWrapper><LightbulbIcon /></IconWrapper>,
      url: 'https://innovatex25-1nfy.vercel.app/',
    },
  ];

  // --- 2. Studios Gallery ---
  // (Teluginti Deepavali Reel, Youth Speaks Event, Agentic Ai, Nature Reel)
  const studiosMediaData = [
    {
      type: 'video',
      // Ensure this video path is correct in your /public folder
      src: '/videos/journey/Adobe Express - IMG_5861.mp4',
      title: 'Teluginti Deepavali',
      caption: 'Let the lights inspire you! 🪔'
    },
    {
      type: 'image',
      // REPLACE THIS PLACEHOLDER
      src: 'https://placehold.co/800x600/003366/FFFFFF?text=Youth+Speaks',
      title: 'Youth Speaks Event',
      caption: 'Capturing the voices of tomorrow.'
    },
    {
      type: 'image',
      // REPLACE THIS PLACEHOLDER
      src: 'https://placehold.co/800x600/330066/FFFFFF?text=Agentic+AI',
      title: 'Agentic AI',
      caption: 'Visuals for cutting-edge tech.'
    },
    {
      type: 'video',
      // REPLACE THIS PLACEHOLDER
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      title: 'Nature Reel',
      caption: 'The beauty of the outdoors.'
    },
  ];

  // --- 3. Events Gallery (InnovateX Highlights) ---
  // (photo highlights|poster highlights|reel highlights|Raw highlights)
  const innovatexMediaData = [
    {
      type: 'image',
      // REPLACE THIS PLACEHOLDER
      src: 'https://placehold.co/800x600/660033/FFFFFF?text=Photo+Highlights',
      title: 'Photo Highlights',
      caption: 'Keynotes and community moments.'
    },
    {
      type: 'image',
      // REPLACE THIS PLACEHOLDER
      src: 'https://placehold.co/800x600/006633/FFFFFF?text=Poster+Highlights',
      title: 'Poster Highlights',
      caption: 'Event branding and design.'
    },
    {
      type: 'video',
      // REPLACE THIS PLACEHOLDER
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      title: 'Reel Highlights',
      caption: 'The official event aftermovie.'
    },
    {
      type: 'video',
      // REPLACE THIS PLACEHOLDER
      src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      title: 'Raw Highlights',
      caption: 'Behind-the-scenes.'
    },
  ];
  
  // --- 4. Web Portfolio ---
  const webPortfolioData = [
    { 
      title: 'Focsera.in', 
      description: 'Digital learning platform.', 
      // REPLACE THIS LINK if needed
      url: 'https://focsera.in' 
    },
    { 
      title: 'InnovateX Website', 
      description: 'Conference and event hub.', 
      // REPLACE THIS LINK if needed
      url: 'https://innovatex25-1nfy.vercel.app/' 
    },
    { 
      title: 'IPL Auction Website', 
      description: 'Interactive auction simulator.', 
      // REPLACE THIS PLACEHOLDER LINK
      url: '#' 
    },
    { 
      title: 'Reelhaus Website', 
      description: 'Portfolio site for creatives.', 
      // REPLACE THIS PLACEHOLDER LINK
      url: '#' 
    },
    { 
      title: 'Template Demos', 
      description: 'Customizable websites for clients.', 
      // REPLACE THIS PLACEHOLDER LINK
      url: '#' 
    },
  ];
  
  // --- 5. Media Portfolio ---
  const mediaPortfolioData = {
    services: ['Thumbnails', 'Youtube Videos', 'Content Strategy', 'Ad Campaigns'],
    clients: ['Dr.mithun s jakkan', 'Figuring out by jay', 'Sahara yt']
  };

  // =================================================================
  // END OF DATA DEFINITIONS
  // =================================================================


  return (
    // [THEME] Changed to bg-gray-950, text-gray-200
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-blue-500 selection:text-white">
      
      {/* [NEW] Style tag from PromptXDark.jsx (dark theme) */}
      <style>{`
        /* [ULTIMATE] Frosted glass card style (Dark Theme) */
        .neon-card-border {
          background: rgba(22, 28, 45, 0.75); /* Dark, semi-transparent bg */
          backdrop-filter: blur(20px) saturate(150%); /* More blur */
          border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle light border */
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2); /* Deeper shadow */
          will-change: transform; /* Hint for animations */
        }
        .grid-background {
          position: fixed;
          inset: 0;
          z-index: -10;
          /* [THEME] Light grid on dark */
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
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
          /* [THEME] Brighter opacity for dark bg */
          opacity: 0.2;
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
        
        /* Fade-in for modal and tabs */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        /* [NEW] Gradient text style */
        .gradient-text {
          background-image: linear-gradient(to right, #3b82f6, #9333ea); /* Blue to Purple */
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* [NEW] Swiper.js Coverflow slide styles */
        .swiper-slide-coverflow {
          width: 60% !important;
          max-width: 400px;
        }
        @media (min-width: 768px) {
          .swiper-slide-coverflow {
            width: 40% !important;
            max-width: 500px;
          }
        }
        
        /* [NEW] Swiper.js Navigation/Pagination styles (Dark Theme) */
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5) !important;
        }
        .swiper-pagination-bullet-active {
          background-color: #3b82f6 !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #ffffff !important;
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: rgba(0, 0, 0, 0.6);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: 900;
        }
      `}</style>
      
      {/* [THEME] Background Effects */}
      <div className="grid-background" />
      <div className="aurora-blob top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-600 rounded-full" />
      <div className="aurora-blob bottom-[-30%] right-[-30%] w-[1000px] h-[1000px] bg-purple-600 rounded-full" style={{ animationDelay: '8s' }} />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="text-center mb-20 animate-on-scroll">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
              Our <span className="gradient-text">Journey</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From a simple idea to a multi-divisional powerhouse. Follow our story of growth, innovation, and passion.
            </p>
          </header>

          {/* [NEW] Divisions Section */}
          <section className="mb-24 animate-on-scroll" id="divisions">
            <h2 className="text-4xl font-bold text-center mb-10 text-white">
              Our <span className="gradient-text">Divisions</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DivisionCard 
                icon={<CameraIcon />} 
                title="Studios"
                description="Professional Photography & Videography Services. We capture your moments through stunning photos and videos. From weddings to corporate content, we provide professional visual storytelling services."
              />
              <DivisionCard 
                icon={<IconSparkles className="text-rose-400" />} 
                title="Media"
                description="Professional Content, Marketing & Growth Services. We build your brand's voice and amplify your reach. From content strategy to ad campaigns, we provide end-to-end media solutions."
              />
              <DivisionCard 
                icon={<IconAward className="text-emerald-400" />} 
                title="Events"
                description="Expert Event Planning & Management. We craft your next unforgettable event. From private parties to large corporate functions, we handle every detail to create a seamless and beautiful celebration."
              />
              <DivisionCard 
                icon={<IconRocket className="text-indigo-400" />} 
                title="Web"
                description="Building digital experiences that drive results. Modern web solutions for businesses of all sizes, from portfolio sites to complex applications."
              />
            </div>
          </section>


          {/* [MODIFIED] Studios Gallery Section */}
          <section className="mb-24 animate-on-scroll" id="studios-gallery">
            <h2 className="text-4xl font-bold text-center mb-10 text-white">
              <span className="gradient-text">Studios</span> Gallery
            </h2>
            <MediaSlideshow items={studiosMediaData} />
          </section>

          {/* [MODIFIED] InnovateX Gallery Section */}
          <section className="mb-24 animate-on-scroll" id="innovatex-gallery">
            <h2 className="text-4xl font-bold text-center mb-6 text-white">
              <span className="gradient-text">Events</span> Gallery
            </h2>
            <p className="text-center text-gray-300 max-w-2xl mx-auto mb-10">
              Highlights from our InnovateX25 School Summit — photos, posters, and highlight reels from our biggest event.
            </p>
            <MediaSlideshow items={innovatexMediaData} />
          </section>

          {/* [NEW] Tabbed Portfolio Section */}
          <section className="mb-24 animate-on-scroll" id="portfolio">
             <h2 className="text-4xl font-bold text-center mb-10 text-white">
              Our <span className="gradient-text">Portfolio</span>
            </h2>
            <TabbedPortfolio 
              webData={webPortfolioData} 
              mediaData={mediaPortfolioData} 
            />
          </section>


          {/* [MODIFIED] Timeline Section */}
          <section className="relative" style={{ perspective: '1000px' }}>
            <h2 className="text-4xl font-bold text-center mb-16 text-white animate-on-scroll">
              Our <span className="gradient-text">Milestones</span>
            </h2>
            <div className="absolute top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent left-4 md:left-1/2 md:-translate-x-1/2"></div>
            
            {journeyData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={index} className="w-full flex justify-center">
                  {isLeft ? <TimelineItem {...item} isLeft={true} /> : <div className="hidden md:block w-1/2"></div>}
                  {!isLeft ? <TimelineItem {...item} isLeft={false} /> : <div className="hidden md:block w-1A/2"></div>}
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </div>
  );
}
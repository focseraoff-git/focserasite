// @ts-nocheck
import React, { useState, useEffect } from 'react';

// --- SVG Icon Components (Styled for the new design) ---
const IconWrapper = ({ children }) => (
    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
        {children}
    </div>
);

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-300">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 9 2c-3.1 0-5.5 2.2-6 5.1.1 1.6.6 3 1.5 4.2.9 1.2 1.5 2.5 1.5 3.8V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1z" /><path d="M9 18v2h6v-2" />
    </svg>
);

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
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
                            <div className={`relative ${item.type === 'video' ? 'aspect-[9/16] rounded-3xl' : 'aspect-[16/10] rounded-2xl'} overflow-hidden shadow-2xl bg-slate-900/50 border border-white/20 backdrop-blur-xl transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20`}>
                                {item.type === 'video' ? (
                                    <video src={item.src} muted playsInline loop preload="auto" autoPlay className="w-full h-full object-cover" />
                                ) : (
                                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                                        <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={item.type === 'video' ? 'M8 5v14l11-7z' : 'M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8'} /></svg>
                                    </div>
                                </div>

                                <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">{item.type === 'video' ? 'REEL' : 'PHOTO'}</div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white font-bold text-lg truncate">{item.title}</p>
                                    <p className="text-slate-300 text-sm">{item.caption}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal viewer for both image and video */}
            {activeItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setActiveItem(null)}>
                    <div className="relative w-full max-w-3xl bg-slate-900/50 border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-white/10 flex justify-between items-center">
                            <div>
                                <p className="text-white font-bold text-lg">{activeItem.title}</p>
                                <p className="text-sm text-slate-400 mt-1">{activeItem.caption}</p>
                            </div>
                            <button onClick={() => setActiveItem(null)} className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                                <XIcon />
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-black p-6">
                            {activeItem.type === 'video' ? (
                                <video src={activeItem.src} controls autoPlay className="w-full h-auto rounded-lg" />
                            ) : (
                                <img src={activeItem.src} alt={activeItem.title} className="w-full h-auto rounded-lg object-contain" />
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
  <div className={`relative w-full flex ${isLeft ? 'justify-start' : 'justify-end'} mb-12`}>
    <div className="w-full md:w-1DQCjrU-gTYq/2">
        <div className={`relative p-6 rounded-2xl shadow-xl border border-white/20 bg-slate-800/50 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 ${isLeft ? 'md:mr-6' : 'md:ml-6'}`}>
            <div className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center ${isLeft ? 'right-[-20px]' : 'left-[-20px]'}`}>
                {icon}
            </div>
            <p className="text-lg font-bold text-blue-400 mb-2">{year}</p>
            <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
            <p className="text-slate-300 leading-relaxed">{description}</p>
            {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 group mt-4">
                    Visit Website <ArrowRightIcon />
                </a>
            )}
        </div>
    </div>
  </div>
);

// --- Main Journey Page Component ---
export default function App() {
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
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-cyan-300 selection:text-slate-900">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/50"></div>
              <div className="absolute top-0 left-[-20%] w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 right-[-20%] w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
            
            <main className="relative z-10 pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <header className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                            Our Journey
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                            From a simple idea to a multi-divisional powerhouse. Follow our story of growth, innovation, and passion.
                        </p>
                    </header>

                    {/* Gallery Section */}
                    <section className="mb-24" id="gallery">
                        <h2 className="text-4xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Reels</h2>
                        <MediaGallery items={mediaData} />
                    </section>

                    {/* InnovateX Gallery Section */}
                    <section className="mb-24" id="innovatex-gallery">
                        <h2 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">InnovateX Gallery</h2>
                        <p className="text-center text-slate-300 max-w-2xl mx-auto mb-6">Highlights from our InnovateX conference — keynotes, workshops and community moments. Use the viewer to enlarge photos or play highlight reels.</p>
                        <MediaGallery items={innovatexData} />
                    </section>

                    {/* Timeline Section */}
                    <section className="relative">
                        <div className="absolute top-0 h-full w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent left-4 md:left-1/2 md:-translate-x-1/2"></div>
                        
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


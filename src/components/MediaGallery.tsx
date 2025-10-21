// @ts-nocheck
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

// Fixed corner reel component
const CornerReel = ({ videos = [], onOpen = () => {} }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* Collapsed/expanded container fixed to right side on md+; spans top-to-bottom and uses portal so it's not clipped */}
      {/* place the reel below the navbar to avoid overlap and clipping; keep a right/bottom gap */}
      <div className="hidden md:block fixed top-20 right-6 bottom-6 z-[90] pointer-events-none">
        <div className="flex flex-col items-end h-full pointer-events-auto">
          {/* wider reel to display portrait thumbnails fully; leave padding so it doesn't overlap other UI */}
          <div className="w-72 bg-transparent flex flex-col items-end h-full pr-4 pt-4 pb-4 backdrop-blur-sm">
            {/* Scrollable stack that fills available height */}
            {open && (
              <div className="flex flex-col gap-4 items-end overflow-y-auto pr-1" style={{ maxHeight: '100%' }}>
                {videos.map((it) => (
                  <button key={it.__index} onClick={() => onOpen(it.__index)} className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black focus:outline-none" aria-label={`Open ${it.title || it.caption}`}>
                    <div style={{ aspectRatio: '9/16' }} className="relative w-full bg-black">
                      <video src={it.src} muted playsInline preload="metadata" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute left-3 top-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-xs font-bold px-2 py-1 rounded">Reel</div>
                      <div className="absolute left-0 right-0 bottom-0 p-2">
                        <h4 className="text-white text-xs font-semibold truncate">{it.title || it.caption}</h4>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto pt-4">
            <button onClick={() => setOpen((s) => !s)} className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center" aria-label={open ? 'Collapse reel' : 'Expand reel'}>
              {open ? '–' : '▴'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: small floating button to open reel modal (not implemented) */}
    </div>
  );
};

// Premium media gallery: polished thumbnails, title overlay and richer lightbox
const MediaGallery = ({ items = [], reelCorner = false }) => {
  const [active, setActive] = useState<number | null>(null);

  const activeItem = active !== null ? items[active] : null;

  // Separate items for layout: images go to the main grid, videos into a vertical thumbnail column
  const mapped = items.map((it, i) => ({ ...it, __index: i }));
  const images = mapped.filter((m) => m.type === 'image');
  const videos = mapped.filter((m) => m.type === 'video');

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main gallery for images (and any other non-video media) */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((it, idx) => (
              <div key={it.__index} className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
                <button onClick={() => setActive(it.__index)} className="block w-full text-left">
                  <div className="relative w-full h-56 md:h-48 lg:h-56 overflow-hidden group">
                    <img loading="lazy" src={it.src} alt={it.title || it.caption || `media-${it.__index}`} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />

                    {/* Title overlay */}
                    <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <h4 className="text-white text-sm md:text-base font-semibold truncate">{it.title || it.caption}</h4>
                      {it.caption && <p className="text-xs text-white/80 mt-1 truncate">{it.caption}</p>}
                    </div>

                    {/* Premium ribbon */}
                    {it.premium && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full shadow">Premium</div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical portrait video thumbnails column */}
        <div className={`w-full md:flex-shrink-0 ${reelCorner ? 'md:w-auto' : 'md:w-80 lg:w-96'}`}>
          {videos.length > 0 && (
            <div className={reelCorner ? 'hidden md:block' : 'flex flex-col gap-4'}>
              {videos.map((it) => (
                <div key={it.__index} className={`relative rounded-2xl overflow-hidden shadow-xl bg-black ${reelCorner ? '' : ''}`}>
                  <button onClick={() => setActive(it.__index)} className="block w-full text-left">
                    <div style={{ aspectRatio: '9/16' }} className="w-full bg-black relative group">
                      <video src={it.src} muted playsInline preload="metadata" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" className="drop-shadow-xl"><path d="M5 3v18l15-9L5 3z"/></svg>
                      </div>

                      {/* Title overlay on video thumbnail */}
                      <div className="absolute left-0 right-0 bottom-0 p-3">
                        <h4 className="text-white text-sm font-semibold truncate">{it.title || it.caption}</h4>
                        {it.caption && <p className="text-xs text-white/80 mt-1 truncate">{it.caption}</p>}
                      </div>

                      {it.premium && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full shadow">Premium</div>
                      )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed corner reel (collapsible) */}
      {reelCorner && videos.length > 0 && typeof document !== 'undefined' && createPortal(
        <CornerReel videos={videos} onOpen={(idx) => setActive(idx)} />,
        document.body
      )}

      {active !== null && activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button onClick={() => setActive(null)} className="absolute top-6 right-6 text-white text-2xl bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">✕</button>
          <div className={`relative w-full ${activeItem.type === 'image' ? 'max-w-6xl' : 'max-w-3xl'} max-h-[88vh] overflow-hidden rounded-2xl bg-black`}>
            <div className="p-4 border-b border-white/10">
              <h3 className="text-xl text-white font-bold">{activeItem.title || activeItem.caption}</h3>
              {activeItem.caption && <p className="text-sm text-white/80 mt-1">{activeItem.caption}</p>}
            </div>

            <div className="p-6 flex items-center justify-center bg-black">
              {activeItem.type === 'image' ? (
                <img src={activeItem.src} alt={activeItem.caption || ''} className="w-full h-auto max-h-[80vh] object-contain" />
              ) : (
                <video src={activeItem.src} controls autoPlay className="w-full h-auto max-h-[70vh] max-w-full bg-black" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;

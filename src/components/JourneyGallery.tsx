import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

interface MediaItem {
    title: string;
    caption: string;
    mediaId: string;
    type: "video" | "image" | "testimonial";
    aspectRatio?: "16:9" | "9:16";
    // For testimonials
    quote?: string;
    author?: string;
    role?: string;
}

const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const getEmbedUrl = (
    mediaId: string | null | undefined,
    type: "video" | "image" | "testimonial",
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

/* ---------- Lightbox ---------- */
function Lightbox({ item, onClose }: { item: MediaItem | null; onClose: () => void }) {
    React.useEffect(() => {
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
                    className="w-full max-w-6xl rounded-2xl overflow-hidden bg-[#050505] border border-white/10 shadow-2xl relative backdrop-blur-3xl"
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

const defaultGallery: MediaItem[] = [
    { title: "The Beginning", caption: "First Steps", mediaId: "/images/journey/IMG_0566.png", type: "image", aspectRatio: "16:9" },
    {
        title: "Testimonial",
        caption: "Client Love",
        mediaId: "",
        type: "testimonial",
        quote: "Focsera didn't just capture our wedding; they bottled the magic. Every photo brings us back to that exact moment.",
        author: "Ananya & Rahul",
        role: "Wedding Couple"
    },
    { title: "Planning", caption: "Drafting Ideas", mediaId: "/images/interior_concept_sketch_artistic.png", type: "image", aspectRatio: "16:9" },
    { title: "Execution", caption: "On Site", mediaId: "/images/interior_render_cinematic.png", type: "image", aspectRatio: "16:9" },
    {
        title: "Testimonial",
        caption: "Client Love",
        mediaId: "",
        type: "testimonial",
        quote: "The attention to detail is obsessive in the best way possible. They saw angles and moments I didn't even know existed.",
        author: "Priya S.",
        role: "Fashion Model"
    },
    { title: "Details", caption: "Fine Tuning", mediaId: "/images/interior_detail_texture_macro.png", type: "image", aspectRatio: "16:9" },
    { title: "Atmosphere", caption: "Setting the Mood", mediaId: "/images/interior_mood_board_aesthetic.png", type: "image", aspectRatio: "16:9" },
    { title: "Celebration", caption: "The Event", mediaId: "/images/journey/IMG_0575.png", type: "image", aspectRatio: "16:9" },
    { title: "Memories", caption: "Captured Moments", mediaId: "/images/journey/IMG_0578.png", type: "image", aspectRatio: "16:9" },
    {
        title: "Testimonial",
        caption: "Client Love",
        mediaId: "",
        type: "testimonial",
        quote: "Professional, creative, and incredibly fun to work with. The final album is a masterpiece we'll treasure forever.",
        author: "The Mehta Family",
        role: "Family Portrait"
    },
    { title: "Legacy", caption: "Timeless", mediaId: "/images/journey/IMG_05959_.png", type: "image", aspectRatio: "16:9" },
];

export default function JourneyGallery() {
    const [lightItem, setLightItem] = useState<MediaItem | null>(null);
    // Ultra-Smooth "Apple-like" Cubic Bezier Easing
    const smoothEase = [0.23, 1, 0.32, 1] as any;
    const [items, setItems] = useState<MediaItem[]>(defaultGallery);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll effect
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        let scrollInterval: NodeJS.Timeout;

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (scrollContainer && !isPaused) {
                    const maxScroll = scrollContainer.scrollWidth / 2;

                    // Seamless loop: If we've scrolled past the first set of items (halfway),
                    // instantly jump back to start (`behavior: 'auto'` is implicit with direct assignment)
                    // We use a small threshold (1) to account for pixel rounding
                    if (scrollContainer.scrollLeft >= maxScroll - 1) {
                        scrollContainer.scrollLeft = 0;
                    } else {
                        scrollContainer.scrollBy({ left: 1, behavior: 'auto' });
                    }
                }
            }, 20); // Speed of scroll
        };

        if (!isPaused) {
            startScrolling();
        }

        return () => clearInterval(scrollInterval);
    }, [isPaused, items]);



    useEffect(() => {
        const fetchGalleryImages = async () => {
            try {
                const { data, error } = await supabase
                    .storage
                    .from('gallery_assets')
                    .list('', {
                        limit: 100,
                        offset: 0,
                        sortBy: { column: 'name', order: 'asc' },
                    });

                if (error) {
                    console.error('Error fetching gallery images:', error);
                    setItems(defaultGallery);
                    return;
                }

                if (data && data.length > 0) {
                    const supabaseItems: MediaItem[] = data
                        .filter(file => file.name !== '.emptyFolderPlaceholder') // Filter out placeholders
                        .map(file => {
                            // Get public URL
                            const { data: { publicUrl } } = supabase
                                .storage
                                .from('gallery_assets')
                                .getPublicUrl(file.name);

                            // Attempt to parse title/caption from filename (e.g., "The Beginning_First Steps.jpg")
                            // Fallback to generic if not formatted
                            const nameParts = file.name.split('.')[0].split('_');
                            let title = "Gallery Image";
                            let caption = "Captured Moment";

                            if (nameParts.length >= 2) {
                                title = nameParts[0].replace(/-/g, ' ');
                                caption = nameParts[1].replace(/-/g, ' ');
                            } else if (nameParts.length === 1) {
                                title = nameParts[0].replace(/-/g, ' ');
                            }

                            return {
                                title: title,
                                caption: caption,
                                mediaId: publicUrl,
                                type: "image", // Assuming all are images for now
                            };
                        });

                    if (supabaseItems.length > 0) {
                        setItems(supabaseItems);
                    } else {
                        setItems(defaultGallery);
                    }
                } else {
                    setItems(defaultGallery);
                }
            } catch (err) {
                console.error('Unexpected error fetching gallery:', err);
                setItems(defaultGallery); // Fallback on error
            }
        };

        fetchGalleryImages();
    }, []);

    /* Removed redundant galleryToDisplay logic */

    return (
        <>
            <section className="py-32 bg-slate-950 relative overflow-hidden">
                {/* Ambient Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen opacity-40"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[100px] rounded-full mix-blend-screen opacity-30"></div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                </div>

                <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Sticky Sidebar - Premium Editorial Feel */}
                    <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: smoothEase }}
                            className="inline-flex items-center gap-3 mb-8"
                        >
                            <span className="w-12 h-[1px] bg-blue-400/50"></span>
                            <span className="text-blue-300 text-xs font-bold tracking-[0.3em] uppercase">The Process</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
                            className="text-6xl md:text-8xl font-serif font-medium text-white mb-8 leading-[0.9] tracking-tight"
                        >
                            Our <br /> <i className="font-serif italic text-blue-200 opacity-80">Journey.</i>
                        </motion.h2>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: smoothEase }}
                            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent mb-8 origin-left"
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                            className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-sm mb-12"
                        >
                            <span className="text-white font-medium">From inception to applause.</span> <br />
                            Witness the meticulous evolution of our craft through these captured moments of dedication, art, and emotion.
                        </motion.p>

                        {/* Decorative 'Swipe' Hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="hidden lg:flex items-center gap-4 text-white/30 text-xs tracking-widest uppercase translate-y-12"
                        >
                            <span className="w-12 h-[1px] bg-white/20"></span>
                            Drag or Scroll
                            <ArrowRight size={16} className="text-white/30 animate-pulse" />
                        </motion.div>
                    </div>

                    {/* Scrollable Horizontal Stream - Hidden Scrollbar */}
                    <div
                        className="lg:w-2/3 overflow-visible"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    >
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide pt-4 px-4 mask-linear-fade"
                        >
                            {[...items, ...items].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.8, delay: (index % items.length) * 0.1, ease: smoothEase }}
                                    className={`relative group overflow-hidden rounded-[1.5rem] cursor-pointer shrink-0 w-[85vw] sm:w-[400px] md:w-[450px] aspect-[4/5] snap-center ${item.type === 'testimonial' ? 'bg-blue-900/10 border border-blue-500/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]' : 'bg-slate-900 border border-white/5 hover:border-white/20'} transition-all duration-500`}
                                    onClick={() => item.type !== 'testimonial' && setLightItem(item)}
                                >
                                    {item.type === 'testimonial' ? (
                                        <div className="p-8 flex flex-col justify-center h-full relative overflow-hidden group-hover:bg-blue-900/20 transition-colors duration-500">
                                            {/* Decorative Quote Icon */}
                                            <div className="absolute top-6 left-6 text-blue-500/20 text-8xl font-serif font-black leading-none select-none">“</div>

                                            <div className="relative z-10 flex flex-col h-full justify-between">
                                                <div className="mb-6">
                                                    <div className="flex gap-1 mb-4">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
                                                        "{item.quote}"
                                                    </blockquote>
                                                </div>

                                                <div className="flex items-center gap-4 mt-auto">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                                                        {item.author?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold text-base">{item.author}</div>
                                                        <div className="text-blue-400 text-xs font-bold tracking-wider uppercase">{item.role}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ambient Glow */}
                                            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none group-hover:bg-blue-400/30 transition-colors duration-500"></div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="absolute inset-0 bg-slate-800 animate-pulse" />

                                            <img
                                                src={getEmbedUrl(item.mediaId, item.type)}
                                                alt={item.title}
                                                className="relative w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
                                                loading={index < 4 ? "eager" : "lazy"}
                                                fetchpriority={index < 4 ? "high" : "auto"}
                                            />

                                            {/* Cinematic Gradient Overlay */}
                                            {/* Cinematic Gradient Overlay - Stronger on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                                            {/* Hover Reveal Overlay */}
                                            <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />

                                            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
                                                <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg transform transition-transform duration-500 hover:scale-[1.02]">
                                                    <p className="text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                                                        {item.caption}
                                                    </p>
                                                    <h3 className="text-white text-lg font-bold leading-tight drop-shadow-md">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Hover Icon */}
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 delay-100 rotate-45 group-hover:rotate-0">
                                                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Lightbox item={lightItem} onClose={() => setLightItem(null)} />
        </>
    );
}

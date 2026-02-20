import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Rocket, Camera, Utensils, Armchair, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 'fuel-up',
        title: 'Fuel-Up Kit',
        subtitle: 'Launch Your Identity.',
        description: 'The ultimate starter kit for new businesses. Visiting cards, branding, and a website starting at ₹1,999.',
        bgGradient: 'from-blue-900 via-slate-950 to-cyan-900',
        accentColor: 'text-cyan-400',
        buttonClass: 'bg-cyan-500 hover:bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]',
        icon: Rocket,
        link: '/web#fuel-up-kit'
    },
    {
        id: 'elevate',
        title: 'Sankranthi Special',
        subtitle: 'Elevate Digital.',
        description: 'Unlock a cinematic, high-performance website for just ₹999. Limited time offer to transform your presence.',
        bgGradient: 'from-orange-900 via-slate-950 to-red-900',
        accentColor: 'text-orange-400',
        buttonClass: 'bg-orange-500 hover:bg-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.3)]',
        icon: Sparkles,
        link: '/web#sankranthi-offer'
    },
    {
        id: 'creator-boost',
        title: 'Creator Boost',
        subtitle: 'Amplify Reach.',
        description: 'Professional media production and strategy to skyrocket your engagement. Let\'s create something viral.',
        bgGradient: 'from-purple-900 via-slate-950 to-pink-900',
        accentColor: 'text-pink-400',
        buttonClass: 'bg-pink-500 hover:bg-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
        icon: Camera,
        link: '/media'
    },
    {
        id: 'dine-qr',
        title: 'DineQR System',
        subtitle: 'Smart Dining.',
        description: 'Seamless QR ordering, kitchen management, and waiter systems. Modernize your restaurant today.',
        bgGradient: 'from-emerald-900 via-slate-950 to-green-900',
        accentColor: 'text-emerald-400',
        buttonClass: 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]',
        icon: Utensils,
        link: '/product-services'
    },
    {
        id: 'interiors',
        title: 'Focsera Interiors',
        subtitle: 'Redefine Space.',
        description: 'Transforming residential and commercial spaces with bespoke interior design solutions.',
        bgGradient: 'from-amber-900 via-slate-950 to-yellow-900',
        accentColor: 'text-amber-400',
        buttonClass: 'bg-amber-500 hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]',
        icon: Armchair,
        link: '/interiors'
    }
];

export default function HomeCarousel() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const navigate = useNavigate();
    const Icon = slides[current].icon;

    // Ultra-Smooth "Apple-like" Cubic Bezier Easing
    const smoothEase = [0.23, 1, 0.32, 1] as any;

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            handleNext();
        }, 8000); // Slower, more deliberate auto-play
        return () => clearInterval(interval);
    }, [isAutoPlaying, current]);

    const handleNext = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const handleDotClick = (index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
        setIsAutoPlaying(false);
    };

    const handleLink = (link: string) => {
        if (link.includes('#')) {
            const [path, hash] = link.split('#');
            navigate(path);
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            navigate(link);
        }
    };

    // Check for mobile to reduce animation load
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const slideVariants: any = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.9,
            // Disable heavy blur on mobile
            filter: isMobile ? "none" : "blur(20px)"
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)"
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.9,
            // Disable heavy blur on mobile
            filter: isMobile ? "none" : "blur(20px)"
        })
    };

    const contentVariants: any = {
        hidden: { opacity: 0, y: 50, rotateX: isMobile ? 0 : 5 }, // Simplify 3D transform
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 1, ease: smoothEase, staggerChildren: 0.15 }
        }
    };

    return (
        <div className="relative w-full max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 perspective-1000">

            {/* Main Carousel Container */}
            <div className="relative h-[650px] md:h-[750px] w-full overflow-hidden rounded-[3rem] border border-white/[0.05] bg-slate-900 shadow-2xl group">

                {/* Dynamic Background */}
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className={`absolute inset-0 bg-gradient-to-br ${slides[current].bgGradient} opacity-30`}
                />
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { duration: 1.2, ease: smoothEase },
                            opacity: { duration: 0.8, ease: "linear" },
                            scale: { duration: 1.2, ease: smoothEase },
                            filter: { duration: 0.8 }
                        }}
                        className="absolute inset-0 w-full h-full flex items-center"
                    >

                        {/* Content Layout */}
                        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* Text Content */}
                            <motion.div
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                            >
                                <motion.div variants={contentVariants} className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 ${slides[current].accentColor} font-bold text-xs tracking-[0.2em] uppercase mb-8 backdrop-blur-md shadow-lg`}>
                                    <Icon size={14} strokeWidth={2.5} />
                                    {slides[current].title}
                                </motion.div>

                                <motion.h2 variants={contentVariants} className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.85] drop-shadow-2xl">
                                    {slides[current].subtitle}
                                </motion.h2>

                                <motion.p variants={contentVariants} className="text-lg md:text-2xl text-slate-300 mb-12 max-w-xl leading-relaxed font-medium drop-shadow-md">
                                    {slides[current].description}
                                </motion.p>

                                <motion.button
                                    variants={contentVariants}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleLink(slides[current].link)}
                                    className={`px-10 py-5 ${slides[current].buttonClass} text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center gap-4 transition-all hover:bg-opacity-90`}
                                >
                                    Explore Now <ArrowRight size={18} />
                                </motion.button>
                            </motion.div>

                            {/* Visual/Graphic Side (Abstract Glass Composition) */}
                            <motion.div
                                initial={{ opacity: 0, x: 100, rotateY: 10 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, x: 100, rotateY: -10 }}
                                transition={{ duration: 1.2, ease: smoothEase, delay: 0.1 }}
                                className="order-1 lg:order-2 hidden lg:flex justify-center items-center relative perspective-500"
                            >
                                <div className="relative w-[500px] h-[500px]">
                                    {/* Abstract Glass Layers */}
                                    <div className={`absolute inset-0 rounded-full border border-white/10 ${slides[current].accentColor.replace('text-', 'bg-')}/5 backdrop-blur-[2px]`} />
                                    <div className={`absolute inset-10 rounded-[4rem] border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-6 flex items-center justify-center transform hover:rotate-3 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
                                        {/* Inner Glow */}
                                        <div className={`absolute inset-0 bg-${slides[current].accentColor.split('-')[1]}-500/20 blur-3xl rounded-full mix-blend-screen animate-pulse-slow`}></div>
                                        <Icon size={140} className={`text-white opacity-90 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] relative z-10`} strokeWidth={0.8} />
                                    </div>

                                    {/* Floating Particles */}
                                    <motion.div
                                        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        className={`absolute -top-5 -right-5 w-24 h-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center`}
                                    >
                                        <Sparkles className="text-white/50" />
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-white/10 ${slides[current].buttonClass.split(' ')[0]}/20 backdrop-blur-xl`}
                                    />
                                </div>
                            </motion.div>

                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls - Minimalist */}
                <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                    <button
                        onClick={handlePrev}
                        className="w-14 h-14 rounded-full bg-black/20 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-14 h-14 rounded-full bg-white text-black hover:bg-slate-200 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Pagination Indicators - Bars */}
                <div className="absolute bottom-14 left-8 md:left-16 flex gap-3 z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            className={`h-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${idx === current
                                ? `w-16 ${slides[current].accentColor.replace('text-', 'bg-')} shadow-[0_0_15px_currentColor]`
                                : 'w-3 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, Gift, Sparkles, ArrowRight, Star, Zap, CheckCircle2 } from 'lucide-react';

export default function AppDownload() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const screenshots = [
        '/images/app1-cropped.png',
        '/images/app3-cropped.png',
        '/images/app2-cropped.png'
    ];

    // Auto-rotate screenshots
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % screenshots.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    // Mouse parallax effect
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left - rect.width / 2) / 20,
            y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
    };

    return (
        <section
            className="relative py-24 sm:py-32 bg-slate-950 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Revolutionary Background */}
            <div className="absolute inset-0">
                {/* Mesh Gradient */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-screen filter blur-[150px] animate-pulse"
                        style={{ animationDuration: '8s' }} />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400 rounded-full mix-blend-screen filter blur-[140px] animate-pulse"
                        style={{ animationDuration: '10s', animationDelay: '2s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500 rounded-full mix-blend-screen filter blur-[160px] animate-pulse"
                        style={{ animationDuration: '12s', animationDelay: '4s' }} />
                </div>

                {/* Animated Grid */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 md:gap-16 lg:gap-20 items-center">
                    {/* LEFT: Revolutionary Typography & Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="space-y-8 md:space-y-10 text-center lg:text-left"
                    >
                        {/* Ultra-Modern Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-block"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className="relative flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                                        Now Available
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Groundbreaking Typography */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-tighter">
                                    <span className="block text-white">Download</span>
                                    <span className="block text-white/80">the</span>
                                    <span className="block relative inline-block mt-2">
                                        <span className="relative z-10 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-gradient">
                                            Focsera App
                                        </span>
                                        <motion.div
                                            animate={{
                                                scaleX: [0.8, 1.1, 0.8],
                                                opacity: [0.3, 0.6, 0.3],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-xl"
                                        />
                                    </span>
                                </h2>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg font-light mx-auto lg:mx-0"
                            >
                                Book smart services at your fingertips. Experience seamless booking across all Focsera divisions from one{' '}
                                <span className="text-cyan-300 font-medium">unified dashboard</span>.
                            </motion.p>
                        </div>

                        {/* Minimalist Feature Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start"
                        >
                            {[
                                { text: "All Services in One App", icon: Zap },
                                { text: "Instant Booking", icon: CheckCircle2 }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative flex items-center gap-2.5 px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
                                        <item.icon className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                                        <span className="text-sm font-medium text-white/90">{item.text}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Premium Offer Badge - Above Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="inline-block"
                        >
                            <div className="relative group">
                                <motion.div
                                    animate={{
                                        opacity: [0.4, 0.6, 0.4],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg"
                                />
                                <div className="relative bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-[2px]">
                                    <div className="bg-slate-950 rounded-[14px] px-6 py-3.5 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                                            <Gift className="w-5 h-5 text-white" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <div className="text-xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text tracking-tight">
                                                25% OFF
                                            </div>
                                            <div className="text-xs text-blue-400/70 font-bold uppercase tracking-wide">
                                                First Booking
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Next-Gen CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.a
                                href="https://play.google.com/store/apps/details?id=com.focsera.focsera&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative inline-flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <svg className="w-7 h-7 relative z-10" viewBox="0 0 24 24" fill="white">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>

                                <span className="relative z-10 text-lg font-bold text-white">
                                    Get it on Google Play
                                </span>

                                <motion.div
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </motion.div>
                            </motion.a>

                            <p className="text-sm text-white/40 mt-4 font-medium">
                                Available exclusively on Android
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: Futuristic Phone Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative order-first lg:order-last"
                        style={{
                            transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
                            transition: 'transform 0.3s ease-out',
                        }}
                    >
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-purple-500/20 rounded-full blur-[120px] scale-110" />

                        {/* Phone Mockup */}
                        <div className="relative mx-auto max-w-[320px] sm:max-w-[380px]">
                            {/* Phone Frame */}
                            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3.5rem] p-2 sm:p-3 border border-white/10 shadow-2xl">
                                {/* Screen */}
                                <div className="relative rounded-[3rem] overflow-hidden bg-black aspect-[9/19.5]">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20" />

                                    {/* Screenshots */}
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentSlide}
                                            src={screenshots[currentSlide]}
                                            alt={`App Screenshot ${currentSlide + 1}`}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </AnimatePresence>

                                    {/* Sleek Indicators */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {screenshots.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide
                                                    ? 'w-8 bg-white'
                                                    : 'w-1 bg-white/30 hover:bg-white/50'
                                                    }`}
                                                aria-label={`Go to screenshot ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 6s ease infinite;
                }
            `}} />
        </section>
    );
}

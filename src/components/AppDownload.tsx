import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AppDownload() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const screenshots = [
        '/images/Screenshot_20260402_111519.jpg',
        '/images/Screenshot_20260402_111605.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % screenshots.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            id="download-app"
            className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden"
        >
            {/* Subtle glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center lg:text-left"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                            Get expert help in minutes.{' '}
                            <span className="text-blue-400">Download Focsera.</span>
                        </h2>
                        <p className="text-base text-slate-400 mb-10 max-w-md mx-auto lg:mx-0">
                            Book smart services at your fingertips. Experience seamless booking across all Focsera divisions from one unified dashboard.
                        </p>

                        {/* App buttons */}
                        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-6">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.focsera.focsera&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-white text-slate-900 px-6 py-3.5 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-lg min-w-[200px]"
                            >
                                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Get it on</div>
                                    <div className="text-sm font-bold leading-tight">Google Play</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 bg-white/10 text-white/70 px-6 py-3.5 rounded-xl min-w-[200px] border border-white/10">
                                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">Coming soon</div>
                                    <div className="text-sm font-bold leading-tight text-white/60">App Store</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-slate-500">
                            iOS user? <a href="tel:9515803954" className="text-blue-400 hover:underline">Contact 9515803954</a>
                        </p>
                    </motion.div>

                    {/* Right: Phone */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center order-first lg:order-last"
                    >
                        <div className="relative max-w-[280px]">
                            <div className="relative bg-gradient-to-b from-slate-700 to-slate-800 rounded-[2.5rem] p-2 border border-white/10 shadow-2xl">
                                <div className="relative rounded-[2.2rem] overflow-hidden bg-black aspect-[9/19.5]">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentSlide}
                                            src={screenshots[currentSlide]}
                                            alt={`App Screenshot`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </AnimatePresence>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {screenshots.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

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
            className="relative py-28 sm:py-36 bg-slate-900 overflow-hidden"
        >
            {/* Subtle glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[180px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Centered heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.5rem] font-extrabold text-white tracking-[-0.03em] leading-[1.08] mb-6">
                        Get expert help in minutes.{' '}
                        <br className="hidden sm:block" />
                        <span className="text-blue-400">Download Focsera.</span>
                    </h2>
                    <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto leading-relaxed font-normal">
                        Book smart services at your fingertips. Experience seamless booking across all Focsera divisions from one unified dashboard.
                    </p>
                </motion.div>

                {/* Phone mockups — fan arrangement */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="relative flex justify-center items-end mb-16 sm:mb-20"
                >
                    <div className="relative w-full max-w-[650px] h-[340px] sm:h-[440px] md:h-[520px] flex justify-center">
                        {/* Left phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute bottom-0 w-[140px] sm:w-[180px] md:w-[210px] z-10"
                            style={{ left: '10%', transform: 'rotate(-8deg)' }}
                        >
                            <div className="rounded-[2rem] p-1.5 bg-gradient-to-b from-slate-600 to-slate-800 border border-white/10 shadow-2xl shadow-black/50">
                                <div className="rounded-[1.7rem] overflow-hidden bg-black aspect-[9/19.5]">
                                    <img
                                        src="/images/Screenshot_20260426_235650.jpg.jpeg"
                                        alt="App screen"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Center phone (front, bigger) */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute bottom-0 w-[170px] sm:w-[220px] md:w-[250px] z-20 left-1/2 -translate-x-1/2"
                        >
                            <div className="rounded-[2.4rem] p-2 bg-gradient-to-b from-slate-600 to-slate-800 border border-white/15 shadow-2xl shadow-black/60">
                                <div className="rounded-[2rem] overflow-hidden bg-black aspect-[9/19.5] relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-20" />
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
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {screenshots.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentSlide(i)}
                                                className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right phone */}
                        <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute bottom-0 w-[140px] sm:w-[180px] md:w-[210px] z-10"
                            style={{ right: '10%', transform: 'rotate(8deg)' }}
                        >
                            <div className="rounded-[2rem] p-1.5 bg-gradient-to-b from-slate-600 to-slate-800 border border-white/10 shadow-2xl shadow-black/50">
                                <div className="rounded-[1.7rem] overflow-hidden bg-black aspect-[9/19.5]">
                                    <img
                                        src="/images/Screenshot_20260427_000920.jpg.jpeg"
                                        alt="App screen"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="https://play.google.com/store/apps/details?id=com.focsera.focsera&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-white text-slate-900 px-7 py-4 rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-xl shadow-white/10 min-w-[200px]"
                    >
                        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Get it on</div>
                            <div className="text-sm font-bold leading-tight">Google Play</div>
                        </div>
                    </a>

                    <div className="flex items-center gap-3 bg-white/10 text-white/70 px-7 py-4 rounded-2xl min-w-[200px] border border-white/10">
                        <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                        <div className="text-left">
                            <div className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">Coming soon</div>
                            <div className="text-sm font-bold leading-tight text-white/60">App Store</div>
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center text-xs text-slate-500 mt-6"
                >
                    iOS user? <a href="tel:9515803954" className="text-blue-400 hover:underline">Contact 9515803954</a>
                </motion.p>
            </div>
        </section>
    );
}

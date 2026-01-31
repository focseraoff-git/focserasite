import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const FebHeroRibbon = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="fixed top-0 left-0 w-full z-[100] bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 py-2 px-3 md:py-3 md:px-6 border-b border-pink-400/30"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-6 relative z-10 w-full max-w-7xl mx-auto justify-between">

                {/* Text Message */}
                <div className="flex items-center justify-center gap-2 text-xs sm:text-base text-center w-full sm:w-auto">
                    <Heart className="text-white fill-white animate-pulse shrink-0" size={16} />
                    <span>
                        <span className="font-['Dancing_Script'] font-bold text-2xl sm:text-3xl mr-1">Love is in the air!</span>
                        <span className="opacity-90">Feb 7–15 Slots</span>
                        <span className="hidden sm:inline mx-2">•</span>
                        <strong className="bg-white/20 px-2 py-0.5 rounded text-[10px] sm:text-xs uppercase tracking-wider">Selling Fast</strong>
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                    <button
                        onClick={() => {
                            navigate('/studios');
                            setTimeout(() => {
                                const el = document.getElementById('feb-in-frames');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        className="bg-white text-rose-600 px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-black/10 hover:bg-rose-50 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                    >
                        Book Now
                    </button>
                    <a
                        href="tel:+919515803954"
                        className="flex items-center gap-1.5 bg-black/20 border border-white/20 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium hover:bg-black/30 transition-all text-white/90 whitespace-nowrap"
                    >
                        <Phone size={12} /> <span className="hidden sm:inline">Call Us</span> <span className="sm:hidden">Call</span>
                    </a>
                </div>

            </div>
        </motion.div>
    );
};

export default FebHeroRibbon;

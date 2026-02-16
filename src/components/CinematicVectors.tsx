
import React from 'react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS ---
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring" as const, duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 }
            }
        };
    }
};

const glow = {
    hidden: { opacity: 0 },
    visible: {
        opacity: [0.5, 0.8, 0.5],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
};

// --- VECTORS ---

export const CineCameraVector = ({ className }: { className?: string }) => (
    <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        {/* Body */}
        <motion.rect x="2" y="6" width="14" height="12" rx="2" variants={draw} custom={0} />
        {/* Lens System */}
        <motion.path d="M16 12h2" variants={draw} custom={1} />
        <motion.path d="M18 9v6" variants={draw} custom={1} />
        <motion.path d="M18 9l4-2v10l-4-2" variants={draw} custom={1} />
        {/* Reels/Top Handle */}
        <motion.circle cx="7" cy="6" r="2" variants={draw} custom={2} />
        <motion.circle cx="11" cy="6" r="2" variants={draw} custom={2} />
        {/* Matte Box */}
        <motion.path d="M22 7v10" variants={draw} custom={3} />
        <motion.path d="M22 7l-2 1" variants={draw} custom={3} />
        <motion.path d="M22 17l-2-1" variants={draw} custom={3} />
    </motion.svg>
);

export const DroneVector = ({ className }: { className?: string }) => (
    <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        {/* Body */}
        <motion.rect x="9" y="9" width="6" height="6" rx="1" variants={draw} custom={0} />
        {/* Camera */}
        <motion.circle cx="12" cy="12" r="1.5" variants={draw} custom={1} />
        {/* Arms */}
        <motion.path d="M9 9L5 5" variants={draw} custom={2} />
        <motion.path d="M15 9l4-4" variants={draw} custom={2} />
        <motion.path d="M9 15l-4 4" variants={draw} custom={2} />
        <motion.path d="M15 15l4 4" variants={draw} custom={2} />
        {/* Rotors */}
        <motion.circle cx="5" cy="5" r="2.5" variants={draw} custom={3} />
        <motion.circle cx="19" cy="5" r="2.5" variants={draw} custom={3} />
        <motion.circle cx="5" cy="19" r="2.5" variants={draw} custom={3} />
        <motion.circle cx="19" cy="19" r="2.5" variants={draw} custom={3} />
    </motion.svg>
);

export const LightVector = ({ className }: { className?: string }) => (
    <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        {/* Stand */}
        <motion.path d="M12 22v-8" variants={draw} custom={0} />
        <motion.path d="M8 22h8" variants={draw} custom={0} />
        {/* Softbox Octagon */}
        <motion.path d="M8 3h8l3 3v8l-3 3H8l-3-3V6l3-3z" variants={draw} custom={1} />
        {/* Bulb/Flash */}
        <motion.circle cx="12" cy="10" r="2" variants={draw} custom={2} />
        {/* Rays */}
        <motion.path d="M12 10l-4 4" variants={draw} custom={3} strokeDasharray="1 1" />
        <motion.path d="M12 10l4 4" variants={draw} custom={3} strokeDasharray="1 1" />
        <motion.path d="M12 10l4-4" variants={draw} custom={3} strokeDasharray="1 1" />
        <motion.path d="M12 10l-4-4" variants={draw} custom={3} strokeDasharray="1 1" />
    </motion.svg>
);

// --- MEDIA TECH LOGOS (CSS Vectors) ---

export const RedLogo = () => (
    <div className="flex items-center gap-0.5 select-none transform hover:scale-105 transition-transform cursor-default">
        <div className="h-4 w-4 border-2 border-current rounded-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
        </div>
        <span className="font-black tracking-tighter text-xl scale-x-110">RED</span>
    </div>
);

export const ArriLogo = () => (
    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-current hover:bg-current hover:text-black transition-colors duration-300 cursor-default">
        <span className="font-black tracking-widest text-[10px] scale-x-125">ARRI</span>
    </div>
);

export const SonyLogo = () => (
    <span className="font-serif font-black tracking-widest text-lg hover:text-blue-400 transition-colors uppercase cursor-default">
        Sony
    </span>
);

export const BlackmagicLogo = () => (
    <div className="flex flex-col items-start leading-none group cursor-default">
        <span className="text-[8px] font-bold tracking-widest uppercase opacity-70 group-hover:text-blue-400">Blackmagic</span>
        <span className="text-sm font-light tracking-wide italic">design</span>
    </div>
);

export const ProfotoLogo = () => (
    <span className="font-sans font-black tracking-tight text-lg italic hover:text-blue-400 transition-colors cursor-default">
        Profoto
    </span>
);

export const CanonLogo = () => (
    <span className="font-bold tracking-tighter text-xl hover:text-red-500 transition-colors cursor-default" style={{ fontFamily: 'serif' }}>
        Canon
    </span>
);

export const IphoneLogo = () => (
    <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.77-1.31 0-2.21-1.23-3.03-2.47-1.66-2.48-2.94-7.01-1.22-10.04 1.71-3.01 4.79-3.2 6.55-1.07.69.83 1.93 1.07 2.68 1.07.75 0 2.22-.53 3.51-1.07 1.58-.66 5.86-1.51 7.22 4.35-.12.07-4.22 2.76-3.87 7.78zM12.93 5.06c.66-1.56.09-3.32-.09-3.81-1.59.18-3.4 1.15-4 3.65-.62 2.5 1.76 3.86 4.09 3.81.44-2.12-.66-2.09 0-3.65z" />
        </svg>
        <span className="font-medium tracking-wide">iPhone Pro</span>
    </div>
);

// --- INTERIOR PARTNER LOGOS ---

export const AsianPaintsLogo = () => (
    <div className="group flex items-center gap-1 font-sans cursor-default">
        <span className="text-2xl font-black text-orange-500 group-hover:text-orange-400 transition-colors">ap</span>
        <span className="text-sm font-bold uppercase tracking-tight group-hover:text-white transition-colors">asianpaints</span>
    </div>
);

export const SaintGobainLogo = () => (
    <div className="flex flex-col items-center leading-none group cursor-default">
        <svg viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-4 mb-0.5 text-blue-400 opacity-80 group-hover:opacity-100">
            <path d="M2 10 L12 2 L22 10" />
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-blue-300">Saint-Gobain</span>
    </div>
);

export const HettichLogo = () => (
    <span className="font-black text-lg tracking-tight uppercase hover:text-red-500 transition-colors cursor-default" style={{ transform: 'skewX(-10deg)' }}>
        Hettich
    </span>
);

export const OrientLogo = () => (
    <div className="flex items-center gap-2 group cursor-default">
        <div className="w-6 h-6 rounded-full border-4 border-orange-500 group-hover:border-orange-400"></div>
        <div className="flex flex-col leading-none">
            <span className="font-bold text-sm">orient</span>
            <span className="text-[8px] uppercase tracking-wider opacity-60">Electric</span>
        </div>
    </div>
);

export const EbcoLogo = () => (
    <div className="border border-current px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors cursor-default">
        <span className="font-bold italic tracking-wide lowercase text-sm">ebco</span>
    </div>
);

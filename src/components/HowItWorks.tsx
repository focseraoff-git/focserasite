import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Browse services',
        description: 'Explore all Focsera divisions — Studios, Events, Interiors, Media — from one unified app.',
        image: '/images/Screenshot_20260517_151602.jpg.jpeg',
        accent: '#3b82f6',
    },
    {
        number: '02',
        title: 'Book instantly',
        description: 'Select your preferred service, date and time. Confirm in seconds — no calls, no waiting.',
        image: '/images/Screenshot_20260518_134332.jpg.jpeg',
        accent: '#6366f1',
    },
    {
        number: '03',
        title: 'Get expert help',
        description: 'Sit back while our vetted Focsera professionals handle everything and deliver results.',
        image: '/images/Screenshot_20260511_210806.jpg.jpeg',
        accent: '#8b5cf6',
    },
];

export default function HowItWorks() {
    const [active, setActive] = useState(0);

    return (
        <section className="py-14 sm:py-20 bg-[#0a0d16] text-white overflow-hidden relative">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.25em] mb-3">How It Works</p>
                    <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
                        Simple steps to smarter bookings.
                    </h2>
                    <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
                        From browsing to booking — the entire Focsera experience lives in your pocket.
                    </p>
                </motion.div>

                {/* MOBILE: Carousel (single step) */}
                <div className="md:hidden">
                    <div className="flex flex-col items-center">
                        {/* Phone mockup */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                                className="w-[200px] mb-6"
                            >
                                <div
                                    className="rounded-[2.2rem] p-[5px] shadow-2xl shadow-black/80"
                                    style={{ background: 'linear-gradient(145deg, #334155, #0f172a)' }}
                                >
                                    <div className="relative rounded-[1.9rem] overflow-hidden bg-black aspect-[9/19.5]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                                        <img
                                            src={steps[active].image}
                                            alt={`Step ${steps[active].number}`}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Text */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`text-${active}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center px-4 mb-6"
                            >
                                <span
                                    className="text-[10px] font-extrabold uppercase tracking-[0.25em] mb-1.5 block"
                                    style={{ color: steps[active].accent }}
                                >
                                    Step {steps[active].number}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2">{steps[active].title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                                    {steps[active].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Nav controls */}
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setActive(Math.max(0, active - 1))}
                                disabled={active === 0}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* Dots */}
                            <div className="flex gap-2">
                                {steps.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                                disabled={active === steps.length - 1}
                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* DESKTOP: 3-column grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-10 lg:gap-14">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="flex flex-col items-center group"
                        >
                            <div className="relative mb-6 w-full max-w-[220px] mx-auto">
                                <div
                                    className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-600"
                                    style={{ backgroundColor: step.accent }}
                                />
                                <div
                                    className="relative rounded-[2.2rem] p-[5px] shadow-2xl shadow-black/80"
                                    style={{ background: 'linear-gradient(145deg, #334155, #0f172a)' }}
                                >
                                    <div className="relative rounded-[1.9rem] overflow-hidden bg-black aspect-[9/19.5]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                                        <img
                                            src={step.image}
                                            alt={`Step ${step.number}`}
                                            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <span
                                    className="text-[10px] font-extrabold uppercase tracking-[0.25em] mb-2 block"
                                    style={{ color: step.accent }}
                                >
                                    Step {step.number}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight">{step.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed max-w-[260px] mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

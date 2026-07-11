import { motion } from 'framer-motion';

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
    return (
        <section className="py-20 sm:py-24 bg-[#0a0d16] text-white overflow-hidden relative">
            {/* Subtle glow behind section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-[11px] sm:text-xs font-bold text-blue-500 uppercase tracking-[0.25em] mb-4">How It Works</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
                        Simple steps to smarter bookings.
                    </h2>
                    <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
                        From browsing to booking — the entire Focsera experience lives in your pocket.
                    </p>
                </motion.div>

                {/* Phones row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                            className="flex flex-col items-center group"
                        >
                            {/* Phone mockup */}
                            <div className="relative mb-6 w-full max-w-[220px]">
                                {/* Glow behind phone */}
                                <div
                                    className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-600"
                                    style={{ backgroundColor: step.accent }}
                                />
                                <div
                                    className="relative rounded-[2.2rem] p-[5px] shadow-2xl shadow-black/80"
                                    style={{ background: 'linear-gradient(145deg, #334155, #0f172a)' }}
                                >
                                    <div className="relative rounded-[1.9rem] overflow-hidden bg-black aspect-[9/19.5]">
                                        {/* Dynamic island */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                                        <img
                                            src={step.image}
                                            alt={`Step ${step.number}`}
                                            className="w-full h-full object-cover object-bottom group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Text */}
                            <div className="text-center mt-4">
                                <span 
                                    className="text-[10px] font-extrabold uppercase tracking-[0.25em] mb-2 block" 
                                    style={{ color: step.accent }}
                                >
                                    Step {step.number}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight">
                                    {step.title}
                                </h3>
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

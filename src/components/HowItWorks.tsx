import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Browse services',
        description: 'Explore all Focsera divisions — Studios, Events, Interiors, Media — from one unified app.',
        image: '/images/Screenshot_20260426_235650.jpg.jpeg',
        accent: '#3b82f6',
    },
    {
        number: '02',
        title: 'Book instantly',
        description: 'Select your preferred service, date and time. Confirm in seconds — no calls, no waiting.',
        image: '/images/Screenshot_20260426_235735.jpg.jpeg',
        accent: '#6366f1',
    },
    {
        number: '03',
        title: 'Get expert help',
        description: 'Sit back while our vetted Focsera professionals handle everything and deliver results.',
        image: '/images/Screenshot_20260427_000920.jpg.jpeg',
        accent: '#8b5cf6',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-28 sm:py-36 bg-slate-50 dark:bg-slate-900/50 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-5">How It Works</p>
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1]">
                        Simple steps to<br className="hidden sm:block" /> smarter bookings.
                    </h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-lg mx-auto font-normal leading-relaxed">
                        From browsing to booking — the entire Focsera experience lives in your pocket.
                    </p>
                </motion.div>

                {/* Phones row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
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
                            <div className="relative mb-8 w-full max-w-[240px]">
                                {/* Glow behind phone */}
                                <div
                                    className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-600"
                                    style={{ backgroundColor: step.accent }}
                                />
                                <div
                                    className="relative rounded-[2.2rem] p-[5px] shadow-xl shadow-slate-900/10 dark:shadow-black/30"
                                    style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)' }}
                                >
                                    <div className="relative rounded-[1.9rem] overflow-hidden bg-black aspect-[9/19]">
                                        {/* Dynamic island */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                                        <img
                                            src={step.image}
                                            alt={`Step ${step.number}`}
                                            className="w-full h-full object-cover object-bottom group-hover:scale-[1.02] transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                {/* Step chip */}
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-white text-xs font-bold shadow-lg whitespace-nowrap tracking-wide"
                                    style={{ backgroundColor: step.accent }}
                                >
                                    Step {step.number}
                                </motion.div>
                            </div>

                            {/* Text */}
                            <div className="text-center mt-4">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2.5 tracking-tight">{step.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px] mx-auto">
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

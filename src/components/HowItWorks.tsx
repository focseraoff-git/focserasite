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
        <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">How It Works</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Simple steps to smarter bookings
                    </h2>
                    <p className="mt-3 text-slate-500 dark:text-slate-400 text-base max-w-md mx-auto">
                        From browsing to booking — the entire Focsera experience lives in your pocket.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.12 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Phone mockup */}
                            <div className="relative mb-8 w-full max-w-[200px]">
                                <div
                                    className="relative rounded-[2rem] p-[5px] shadow-lg"
                                    style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)' }}
                                >
                                    <div className="relative rounded-[1.7rem] overflow-hidden bg-black aspect-[9/19]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                                        <img
                                            src={step.image}
                                            alt={`Step ${step.number}`}
                                            className="w-full h-full object-cover object-bottom"
                                        />
                                    </div>
                                </div>
                                {/* Step chip */}
                                <div
                                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-bold shadow-md whitespace-nowrap"
                                    style={{ backgroundColor: step.accent }}
                                >
                                    Step {step.number}
                                </div>
                            </div>

                            {/* Text */}
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[240px]">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

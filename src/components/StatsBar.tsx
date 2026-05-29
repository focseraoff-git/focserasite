import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Clock, Layers, Users } from 'lucide-react';

interface StatProps {
    end: number;
    suffix: string;
    label: string;
    sub: string;
    delay: number;
}

function CountUp({ end, suffix, delay }: { end: number; suffix: string; delay: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const timer = setTimeout(() => {
            let start = 0;
            const duration = 1800;
            const step = 16;
            const increment = end / (duration / step);
            const interval = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(interval);
                } else {
                    setCount(Math.floor(start));
                }
            }, step);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [isInView, end, delay]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

const stats: (StatProps & { icon: any; accent: string })[] = [
    { end: 24, suffix: '', label: 'Hours Turn Around Time', sub: 'lightning-fast delivery', delay: 0, icon: Clock, accent: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { end: 7, suffix: '', label: 'Premium Divisions', sub: 'all under one app', delay: 200, icon: Layers, accent: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
    { end: 120, suffix: '+', label: 'Expert Partners', sub: 'vetted professionals', delay: 400, icon: Users, accent: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400' },
];

export default function StatsBar() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            ref={ref}
            className="relative py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500"
        >
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                    {/* Left heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-2"
                    >
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-5">Why Focsera</p>
                        <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1]">
                            No more planning{' '}
                            <br className="hidden sm:block" />
                            around your{' '}
                            <br className="hidden sm:block" />
                            creative help.
                        </h2>
                        <p className="mt-5 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-sm font-normal leading-relaxed">
                            On-demand professional creative help delivered with speed, quality and trust.
                        </p>
                    </motion.div>

                    {/* Right stat cards */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 28 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                className="relative bg-slate-50 dark:bg-white/[0.03] rounded-[1.5rem] p-7 border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 hover:shadow-lg hover:shadow-slate-100/60 dark:hover:shadow-none transition-all duration-400 group"
                            >
                                {/* Icon */}
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${stat.accent} transition-colors duration-300`}>
                                    <stat.icon size={20} />
                                </div>

                                {/* Number */}
                                <div className="text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] mb-2 text-slate-900 dark:text-white">
                                    <CountUp end={stat.end} suffix={stat.suffix} delay={stat.delay} />
                                </div>

                                {/* Label */}
                                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 tracking-tight">{stat.label}</div>
                                <div className="text-xs text-slate-400 dark:text-slate-500">{stat.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

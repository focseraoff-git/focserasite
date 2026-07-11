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
            className="relative py-20 sm:py-24 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500"
        >
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                >
                    <p className="text-[11px] sm:text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-[0.25em] mb-4">Why Focsera</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-tight">
                        No more planning around your creative help.
                    </h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                        On-demand professional creative help delivered with speed, quality and trust.
                    </p>
                </motion.div>

                {/* Stat cards in single row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 28 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex items-center gap-4 bg-slate-50/70 dark:bg-white/[0.02] rounded-[1.25rem] p-5 sm:p-6 border border-slate-100 dark:border-white/[0.05] hover:border-blue-100 dark:hover:border-blue-500/10 shadow-sm hover:shadow-md hover:shadow-blue-500/5 dark:hover:shadow-none transition-all duration-400 group"
                        >
                            {/* Icon container */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.accent} transition-colors duration-300`}>
                                <stat.icon size={22} />
                            </div>

                            {/* Number & Info */}
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-slate-900 dark:text-white leading-tight">
                                    <CountUp end={stat.end} suffix={stat.suffix} delay={stat.delay} />
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-tight mt-0.5">
                                    {stat.label}
                                </span>
                                <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                    {stat.sub}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

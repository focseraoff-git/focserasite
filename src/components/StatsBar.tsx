import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

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

const stats: StatProps[] = [
    { end: 24, suffix: '', label: 'Hours Turn Around Time', sub: '', delay: 0 },
    { end: 7, suffix: '', label: 'Premium Divisions', sub: 'all under one app', delay: 200 },
    { end: 120, suffix: '+', label: 'Expert Partners', sub: 'vetted professionals', delay: 400 },
];

export default function StatsBar() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            ref={ref}
            className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500"
        >
            <div className="relative max-w-5xl mx-auto px-4 sm:px-8">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-12"
                >
                    On-demand professional creative help
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-white/10">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center text-center py-8 sm:py-4 sm:px-10"
                        >
                            <div className="text-4xl sm:text-5xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
                                <CountUp end={stat.end} suffix={stat.suffix} delay={stat.delay} />
                            </div>
                            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

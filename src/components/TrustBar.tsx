import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Building2, GraduationCap, Heart, Palette, Rocket, Users } from 'lucide-react';

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
        if (start >= end) { setCount(end); clearInterval(interval); }
        else { setCount(Math.floor(start)); }
      }, step);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, end, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const audiences = [
  { label: 'Businesses', icon: Building2 },
  { label: 'Schools', icon: GraduationCap },
  { label: 'Families', icon: Heart },
  { label: 'Creators', icon: Palette },
  { label: 'Startups', icon: Rocket },
  { label: 'Event Organizers', icon: Users },
];

const stats = [
  { end: 80, suffix: '+', label: 'Professional Partners' },
  { end: 100, suffix: '+', label: 'Packages' },
  { end: 5, suffix: '+', label: 'Industries' },
  { end: 1, suffix: '', label: 'City — Hyderabad', noCount: true },
];

export default function TrustBar() {
  return (
    <section id="trust" className="relative py-14 sm:py-20 bg-heritage-cream border-b border-heritage-stone/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-[11px] font-semibold text-heritage-gold uppercase tracking-[0.25em] mb-5">
            Trusted by
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {audiences.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-heritage-warm/70 border border-heritage-stone/40 text-heritage-charcoal"
                >
                  <Icon size={14} className="text-focsera-primary" />
                  <span className="text-[12px] sm:text-[13px] font-semibold">{a.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="text-center py-4 sm:py-6"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-heritage-charcoal tracking-tight">
                {stat.noCount ? (
                  <span>Hyderabad</span>
                ) : (
                  <CountUp end={stat.end} suffix={stat.suffix} delay={300 + i * 150} />
                )}
              </div>
              <div className="text-[12px] sm:text-[13px] font-medium text-focsera-muted mt-1">
                {stat.noCount ? 'Currently Serving' : stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

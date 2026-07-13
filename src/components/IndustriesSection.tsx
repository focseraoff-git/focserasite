import { motion } from 'framer-motion';
import {
  UtensilsCrossed, ShoppingBag, GraduationCap, Heart, PartyPopper,
  Camera, Building, Hotel, Briefcase
} from 'lucide-react';

const industries = [
  { name: 'Restaurants', icon: UtensilsCrossed, color: '#ef4444', bg: '#fef2f2' },
  { name: 'Retail', icon: ShoppingBag, color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Education', icon: GraduationCap, color: '#059669', bg: '#ecfdf5' },
  { name: 'Healthcare', icon: Heart, color: '#ec4899', bg: '#fdf2f8' },
  { name: 'Events', icon: PartyPopper, color: '#8b5cf6', bg: '#f5f3ff' },
  { name: 'Creators', icon: Camera, color: '#0B5FFF', bg: '#EAF2FF' },
  { name: 'Real Estate', icon: Building, color: '#6366f1', bg: '#eef2ff' },
  { name: 'Hospitality', icon: Hotel, color: '#14b8a6', bg: '#f0fdfa' },
  { name: 'Corporate', icon: Briefcase, color: '#475569', bg: '#f1f5f9' },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-16 sm:py-24 bg-focsera-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[11px] font-bold text-focsera-primary uppercase tracking-[0.2em] mb-3">
            Industries
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-focsera-text tracking-[-0.03em] leading-tight">
            Serving every industry.
          </h2>
          <p className="mt-4 text-focsera-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            From restaurants and retail to education and healthcare — Focsera powers execution across industries.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-3 sm:gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.03 + i * 0.04 }}
                className="group flex flex-col items-center gap-2.5 py-5 sm:py-6 px-3 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-gray-100/50 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: ind.bg }}
                >
                  <Icon size={20} style={{ color: ind.color }} />
                </div>
                <span className="text-[11px] sm:text-[12px] font-semibold text-focsera-text text-center leading-tight">
                  {ind.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

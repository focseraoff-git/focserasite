import { motion } from 'framer-motion';
import { User, Building2, GraduationCap, Landmark, Camera } from 'lucide-react';

const audiences = [
  {
    title: 'Individuals',
    icon: User,
    tags: ['Birthdays', 'Home', 'Photography', 'Celebrations'],
    color: '#0B5FFF',
    bg: '#EAF2FF',
  },
  {
    title: 'Businesses',
    icon: Building2,
    tags: ['Branding', 'Website', 'Marketing', 'Design'],
    color: '#7c3aed',
    bg: '#f3e8ff',
  },
  {
    title: 'Schools',
    icon: GraduationCap,
    tags: ['AI Workshops', 'Skill Labs', 'Events'],
    color: '#059669',
    bg: '#d1fae5',
  },
  {
    title: 'Organizations',
    icon: Landmark,
    tags: ['Corporate Events', 'Media', 'Training'],
    color: '#d97706',
    bg: '#fef3c7',
  },
  {
    title: 'Creators',
    icon: Camera,
    tags: ['Photography', 'Editing', 'Content', 'Studios'],
    color: '#e11d48',
    bg: '#ffe4e6',
  },
];

export default function WhoWeHelp() {
  return (
    <section className="py-20 sm:py-28 bg-heritage-warm/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[11px] font-semibold text-heritage-gold uppercase tracking-[0.25em] mb-3">
            Built for Everyone
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-heritage-charcoal tracking-[-0.01em] leading-[1.25]">
            Who is Focsera for?
          </h2>
          <p className="mt-5 text-focsera-muted text-sm sm:text-base max-w-lg mx-auto leading-[1.8] font-light">
            Whether you're an individual planning a celebration or a business scaling operations — Focsera is for you.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-heritage-stone/50 hover:border-heritage-stone hover:shadow-lg hover:shadow-heritage-stone/30 transition-all duration-500 cursor-default"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: item.bg }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-[15px] font-serif font-semibold text-heritage-charcoal mb-3">
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] sm:text-[11px] font-medium text-focsera-muted bg-heritage-warm/60 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

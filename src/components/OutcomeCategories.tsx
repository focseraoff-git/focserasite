import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PartyPopper, TrendingUp, Hammer, Film, Megaphone, BookOpen } from 'lucide-react';

const outcomes = [
  {
    title: 'Celebrate',
    icon: PartyPopper,
    description: 'Make every milestone unforgettable.',
    tags: ['Birthday', 'Wedding', 'Corporate Events', 'Photography', 'Decorations'],
    cta: 'Explore Celebration',
    path: '/events',
    gradient: 'from-pink-500 to-rose-500',
    lightBg: 'bg-rose-50',
    lightText: 'text-rose-600',
    hoverBorder: 'hover:border-rose-200',
  },
  {
    title: 'Grow',
    icon: TrendingUp,
    description: 'Build your brand and scale your business.',
    tags: ['Website', 'Branding', 'Marketing', 'Content', 'Logo'],
    cta: 'Grow My Business',
    path: '/web',
    gradient: 'from-blue-500 to-indigo-500',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-600',
    hoverBorder: 'hover:border-blue-200',
  },
  {
    title: 'Build',
    icon: Hammer,
    description: 'Transform spaces with expert craftsmanship.',
    tags: ['Interior', 'Fabrication', 'Renovation', 'Architecture'],
    cta: 'Upgrade My Space',
    path: '/interiors',
    gradient: 'from-amber-500 to-orange-500',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-600',
    hoverBorder: 'hover:border-amber-200',
  },
  {
    title: 'Create',
    icon: Film,
    description: 'Bring your creative vision to life.',
    tags: ['Photography', 'Videography', 'Editing', 'Design'],
    cta: 'Create Content',
    path: '/studios',
    gradient: 'from-violet-500 to-purple-500',
    lightBg: 'bg-violet-50',
    lightText: 'text-violet-600',
    hoverBorder: 'hover:border-violet-200',
  },
  {
    title: 'Market',
    icon: Megaphone,
    description: 'Amplify your reach and drive results.',
    tags: ['Ads', 'Social Media', 'SEO', 'Lead Generation', 'Analytics'],
    cta: 'Boost My Brand',
    path: '/marketing',
    gradient: 'from-cyan-500 to-sky-500',
    lightBg: 'bg-cyan-50',
    lightText: 'text-cyan-600',
    hoverBorder: 'hover:border-cyan-200',
  },
  {
    title: 'Learn',
    icon: BookOpen,
    description: 'Future-proof skills for the AI era.',
    tags: ['AI Workshops', 'School Programs', 'Labs'],
    cta: 'Explore Education',
    path: '/labs',
    gradient: 'from-emerald-500 to-teal-500',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-200',
  },
];

export default function OutcomeCategories() {
  const navigate = useNavigate();

  return (
    <section id="outcomes" className="py-20 sm:py-28 bg-heritage-cream">
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
            Solutions
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold text-heritage-charcoal tracking-[-0.01em] leading-[1.25]">
            What do you want to achieve?
          </h2>
          <p className="mt-5 text-focsera-muted text-sm sm:text-base max-w-lg mx-auto leading-[1.8] font-light">
            Choose your goal. We'll connect you with the right professionals and manage the entire execution.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {outcomes.map((outcome, i) => {
            const Icon = outcome.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
                onClick={() => navigate(outcome.path)}
                className={`group relative bg-white rounded-2xl p-6 sm:p-7 border border-heritage-stone/60 ${outcome.hoverBorder} hover:shadow-xl hover:shadow-heritage-stone/30 transition-all duration-500 cursor-pointer`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${outcome.lightBg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={22} className={outcome.lightText} />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-heritage-charcoal tracking-normal mb-2">
                  {outcome.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] sm:text-sm text-focsera-muted leading-relaxed mb-5">
                  {outcome.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {outcome.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[11px] font-medium text-gray-500 bg-heritage-warm/60 px-2.5 py-1 rounded-lg border border-heritage-stone/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div
                  className={`inline-flex items-center gap-2 text-[13px] font-semibold ${outcome.lightText} group-hover:gap-3 transition-all duration-300`}
                >
                  {outcome.cta}
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>

                {/* Gradient line at top */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full bg-gradient-to-r ${outcome.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

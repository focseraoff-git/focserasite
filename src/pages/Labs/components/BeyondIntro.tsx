import React from 'react';
import { Sparkles, Zap, HeartHandshake, Rocket, ArrowRight } from 'lucide-react';
import { DoodleSparkle, DoodleLoop, StickerBadge } from './BeyondDoodles';

export const BeyondIntro: React.FC = () => {
  const miniStatements = [
    {
      number: '01',
      title: 'Learn something new',
      subtitle: 'Beyond standard textbooks',
      description: 'Demystify artificial intelligence, robotics, creative tools, and future-ready tech with clear intuition, no boring lectures.',
      bg: 'bg-[#EDE2FA]', // Pastel Lavender
      icon: Zap,
      accent: 'border-[#35102F]',
      badge: 'Curiosity First',
    },
    {
      number: '02',
      title: 'Try something real',
      subtitle: 'Hands-on from minute one',
      description: 'Build real prototypes, engineer live prompts, launch mock brand campaigns, and evaluate portfolios instead of memorizing definitions.',
      bg: 'bg-[#C7EB49]', // Electric Lime
      icon: Rocket,
      accent: 'border-[#35102F]',
      badge: 'Practical Action',
    },
    {
      number: '03',
      title: 'Meet your kind of people',
      subtitle: 'A community of builders',
      description: 'Collaborate with peers, compete in high-energy summits, receive 1-on-1 industry mentorship, and discover what sparks your ambition.',
      bg: 'bg-[#F7DCE7]', // Soft Blush
      icon: HeartHandshake,
      accent: 'border-[#35102F]',
      badge: 'Community',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10 overflow-hidden">
      {/* Decorative doodle loop */}
      <div className="absolute -top-6 right-12 hidden md:block opacity-60">
        <DoodleLoop className="w-16 h-16 text-[#35102F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#35102F]/70">
              The Beyond Philosophy
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
            <span>Not another class.</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
              A whole new experience.
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-[#35102F]/75 leading-relaxed beyond-font-sans font-normal max-w-2xl mx-auto">
            Beyond brings future-ready education to students through hands-on workshops,
            exciting events, creative challenges, and collaborative experiences.
          </p>
        </div>

        {/* 3 Expressive Mini-Statements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {miniStatements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className={`relative rounded-3xl p-7 sm:p-8 border-2 border-[#35102F] shadow-[4px_6px_0px_#35102F] hover:shadow-[8px_10px_0px_#35102F] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${item.bg} group`}
              >
                {/* Top header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black px-3 py-1 bg-white/90 text-[#35102F] rounded-full border border-[#35102F] uppercase tracking-wider">
                      {item.badge}
                    </span>
                    <span className="text-3xl font-black text-[#35102F]/30 beyond-font-heading">
                      {item.number}
                    </span>
                  </div>

                  {/* Icon with interactive circle */}
                  <div className="w-14 h-14 rounded-2xl bg-[#35102F] text-[#C7EB49] flex items-center justify-center mb-6 shadow-[2px_3px_0px_rgba(53,16,47,0.3)] group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-[#35102F] leading-tight beyond-font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#35102F]/60 mt-1 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-[#35102F]/85 leading-relaxed beyond-font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Bottom interactive accent */}
                <div className="mt-8 pt-4 border-t border-[#35102F]/15 flex items-center justify-between text-xs font-black text-[#35102F]">
                  <span>EXPERIENCE IT</span>
                  <span className="w-7 h-7 rounded-full bg-white border border-[#35102F] flex items-center justify-center group-hover:bg-[#35102F] group-hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Quote Banner */}
        <div className="mt-14 sm:mt-16 bg-[#35102F] text-[#FFF9EF] rounded-3xl p-6 sm:p-10 border-2 border-[#35102F] shadow-[6px_8px_0px_#C7EB49] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#C7EB49] text-[#35102F] flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-medium beyond-font-serif italic text-white/95">
                “When you give curious students the right tools, they don't just study the future — they start building it.”
              </p>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C7EB49] mt-1 block">
                The Beyond Manifesto
              </span>
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-block px-4 py-2 rounded-xl bg-white/10 text-xs font-bold text-[#FFF9EF] border border-white/20">
              100% Practical • Zero Rote Learning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondIntro;

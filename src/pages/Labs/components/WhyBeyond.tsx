import React from 'react';
import { Compass, Hammer, TrendingUp, Users2, Sparkles, ArrowUpRight } from 'lucide-react';
import { DoodleSparkle } from './BeyondDoodles';

export const WhyBeyond: React.FC = () => {
  const principles = [
    {
      number: '01',
      title: 'Curiosity first',
      subtitle: 'Ask the daring questions',
      description: 'Education shouldn’t begin with rules or standardized answers. It begins by wondering how things work, questioning conventions, and experimenting without fear of failure.',
      icon: Compass,
      accent: '#C7EB49',
    },
    {
      number: '02',
      title: 'Learning by doing',
      subtitle: 'Build from day one',
      description: 'Lectures fade; building sticks. Every single Beyond session is anchored in hands-on creation — from prompting AI models and coding microcontrollers to designing brand identities.',
      icon: Hammer,
      accent: '#EDE2FA',
    },
    {
      number: '03',
      title: 'Skills for tomorrow',
      subtitle: 'Future-proof capability',
      description: 'We don’t prepare students for jobs that were popular a decade ago. We empower them with the creative, technical, and strategic tools that shape tomorrow’s economy.',
      icon: TrendingUp,
      accent: '#F7DCE7',
    },
    {
      number: '04',
      title: 'Growing together',
      subtitle: 'Collaboration over isolation',
      description: 'The best innovations are collective. Students collaborate in multidisciplinary teams, participate in peer reviews, and experience the thrill of collective achievement.',
      icon: Users2,
      accent: '#C7EB49',
    },
  ];

  return (
    <section id="why" className="py-20 sm:py-28 bg-[#35102F] text-[#FFF9EF] relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#C7EB49]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative stars */}
      <div className="absolute top-16 right-16 hidden lg:block opacity-60">
        <DoodleSparkle className="w-10 h-10 text-[#C7EB49] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#C7EB49]">
              Our Foundation
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#FFF9EF] tracking-tight leading-[1.05] beyond-font-heading">
            <span>Because the future</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#C7EB49] block sm:inline">
              won't wait.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#FFF9EF]/80 beyond-font-sans font-normal max-w-xl">
            Four guiding principles behind every workshop, challenge, curriculum module, and summit we design.
          </p>
        </div>

        {/* 4 Brand Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.number}
                className="rounded-3xl border-2 border-[#FFF9EF]/20 bg-white/[0.04] p-7 sm:p-9 hover:bg-white/[0.08] hover:border-[#C7EB49] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${principle.accent}20`, color: principle.accent }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-white/20 beyond-font-heading">
                      {principle.number}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#C7EB49] block mb-1">
                    {principle.subtitle}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3 beyond-font-heading">
                    {principle.title}
                  </h3>

                  <p className="text-sm sm:text-base text-white/80 leading-relaxed beyond-font-sans font-normal">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-white/60">
                  <span>Beyond Core Value</span>
                  <span className="text-[#C7EB49] font-black group-hover:translate-x-1 transition-transform">
                    ✦
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyBeyond;

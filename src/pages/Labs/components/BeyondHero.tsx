import React from 'react';
import { ArrowUpRight, Sparkles, Compass, Lightbulb, Trophy } from 'lucide-react';
import { DoodleArrow, DoodleSparkle, DoodleUnderline, StickerBadge } from './BeyondDoodles';

interface BeyondHeroProps {
  onExploreClick: () => void;
  onPartnerClick: () => void;
}

export const BeyondHero: React.FC<BeyondHeroProps> = ({
  onExploreClick,
  onPartnerClick,
}) => {
  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#FFF9EF]">
      {/* Background subtle editorial grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#35102F 0.75px, transparent 0.75px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating decorative doodles */}
      <div className="absolute top-28 left-6 sm:left-12 hidden md:block">
        <DoodleSparkle className="w-8 h-8 text-[#C7EB49] animate-pulse" />
      </div>

      <div className="absolute top-40 right-8 sm:right-16 hidden lg:block">
        <div className="p-3 bg-[#EDE2FA] border-2 border-[#35102F] rounded-2xl rotate-6 shadow-[3px_4px_0px_#35102F] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#35102F]" />
          <span className="text-xs font-black uppercase text-[#35102F] tracking-wider">
            Future-Ready Kids
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Lime Sticker */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up">
            <StickerBadge
              text="LEARNING, BUT MAKE IT FUN."
              bg="bg-[#C7EB49]"
              textColor="text-[#35102F]"
              rotate="-rotate-2"
              className="text-xs sm:text-sm py-1.5 px-4 font-black tracking-widest"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-[92px] font-black tracking-tight leading-[0.98] text-[#35102F] beyond-font-heading">
            <span className="block">GO BEYOND</span>
            <span className="block mt-1 sm:mt-2 relative inline-block">
              <span className="beyond-font-serif font-normal italic text-[#35102F] font-serif pr-2">
                THE CLASSROOM.
              </span>
              {/* Lime accent scribble beneath "THE CLASSROOM" */}
              <DoodleUnderline className="absolute -bottom-2 left-0 w-full h-4 text-[#C7EB49]" />
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="mt-8 sm:mt-10 text-lg sm:text-xl lg:text-2xl text-[#35102F]/80 max-w-2xl leading-relaxed beyond-font-sans font-normal">
            From AI and emerging technologies to creativity, communication, and real-world skills —
            we turn learning into <span className="font-bold text-[#35102F] bg-[#EDE2FA] px-2 py-0.5 rounded-lg border border-[#35102F]/20">experiences worth remembering</span>.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto relative">
            {/* Primary Button */}
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 sm:py-4.5 bg-[#C7EB49] text-[#35102F] font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[4px_6px_0px_#35102F] hover:shadow-[1px_2px_0px_#35102F] hover:translate-x-[3px] hover:translate-y-[4px] transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Explore Experiences</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary Button */}
            <button
              onClick={onPartnerClick}
              className="w-full sm:w-auto px-8 py-4 sm:py-4.5 bg-[#FFF9EF] text-[#35102F] font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[3px_4px_0px_rgba(53,16,47,0.3)] hover:bg-[#EDE2FA] hover:shadow-[1px_2px_0px_#35102F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Partner With Us</span>
            </button>

            {/* Hand-drawn arrow pointing to partner with us */}
            <div className="hidden lg:block absolute -right-24 -bottom-10 pointer-events-none">
              <DoodleArrow className="w-20 h-14 text-[#35102F]" />
              <span className="block text-[11px] font-black text-[#35102F] -rotate-6 uppercase tracking-wider mt-1">
                For Schools!
              </span>
            </div>
          </div>

          {/* Micro-Pill Feature Strip */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-[#35102F]/15 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-[#35102F]/80">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#35102F]/15">
              <Compass className="w-4 h-4 text-[#35102F]" /> Hands-on Workshops
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#35102F]/15">
              <Trophy className="w-4 h-4 text-[#35102F]" /> InnovateX Summits
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#35102F]/15">
              <Lightbulb className="w-4 h-4 text-[#35102F]" /> Creative Tech Labs
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C7EB49]/60 border border-[#35102F]/20 text-[#35102F] font-black">
              ★ NEP 2020 Aligned
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeyondHero;

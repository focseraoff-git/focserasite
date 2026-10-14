import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Award, CheckCircle2, ArrowRight, Star, Flame } from 'lucide-react';
import { DoodleSparkle, StickerBadge } from './BeyondDoodles';

interface FeaturedProgramsProps {
  onEnquireProgram: (programName: string) => void;
}

export const FeaturedPrograms: React.FC<FeaturedProgramsProps> = ({ onEnquireProgram }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'flagship' | 'workshop' | 'annual'>('all');

  return (
    <section id="programs" className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
                Curated Offerings
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
              <span>Big ideas.</span>{' '}
              <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
                Real experiences.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#35102F]/75 beyond-font-sans font-normal">
              Tested across classrooms and partner campuses. Immersive programs engineered to inspire curiosity and real capability.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-[#35102F]/60 uppercase tracking-widest">
              Audience:
            </span>
            <span className="px-3 py-1 bg-[#EDE2FA] text-[#35102F] border border-[#35102F] rounded-full text-xs font-black">
              Classes 6 – 12
            </span>
          </div>
        </div>

        {/* Highlighted Flagship: InnovateX Summit */}
        <div className="mb-10 relative">
          <div className="relative rounded-3xl bg-[#35102F] text-[#FFF9EF] border-2 border-[#35102F] p-7 sm:p-10 lg:p-12 shadow-[8px_12px_0px_#C7EB49] overflow-hidden">
            {/* Background geometric accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7EB49]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <Sparkles className="w-80 h-80 text-white" />
            </div>

            {/* Top row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C7EB49] text-[#35102F] text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_white]">
                  <Flame className="w-3.5 h-3.5 fill-[#35102F]" /> Flagship Summit
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold border border-white/20">
                  <Calendar className="w-3.5 h-3.5 text-[#C7EB49]" /> 3-Day Flagship
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold border border-white/20">
                  <Users className="w-3.5 h-3.5 text-[#C7EB49]" /> High-School Audience
                </span>
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-[#C7EB49]">
                Featured Experience
              </span>
            </div>

            {/* Content Body */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight beyond-font-heading">
                  InnovateX Summit
                </h3>
                <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed beyond-font-sans font-normal">
                  Our premier three-day inter-school immersion. Students participate in competitive strategy simulations,
                  brand pitch battles, interactive problem-solving, and direct industry mentorship.
                </p>

                {/* Summit Core Tracks */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                    <span className="text-xs font-black text-[#C7EB49] uppercase tracking-wider block mb-1">
                      🏏 IPL Auction Simulation
                    </span>
                    <span className="text-xs text-white/80">Strategy, budget planning & high-stakes financial literacy.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                    <span className="text-xs font-black text-[#C7EB49] uppercase tracking-wider block mb-1">
                      ⚔️ Brand Battles
                    </span>
                    <span className="text-xs text-white/80">Campaign design, positioning & live logo pitch rounds.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                    <span className="text-xs font-black text-[#C7EB49] uppercase tracking-wider block mb-1">
                      💡 Young Innovators
                    </span>
                    <span className="text-xs text-white/80">Real-world community solution presentations.</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15">
                    <span className="text-xs font-black text-[#C7EB49] uppercase tracking-wider block mb-1">
                      🎙️ Echoes Mentorship
                    </span>
                    <span className="text-xs text-white/80">Exclusive counselor & industry mentor breakout sessions.</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#C7EB49] font-bold">
                  <Award className="w-4 h-4" />
                  <span>Cash prizes, custom goodies & accredited certificates for all participants</span>
                </div>
              </div>

              {/* Action column */}
              <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center">
                <div className="w-full bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-7 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="text-xs text-white/70 uppercase tracking-widest font-mono">Format</span>
                    <span className="text-sm font-black text-[#C7EB49]">On-Campus / Inter-School</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="text-xs text-white/70 uppercase tracking-widest font-mono">Scope</span>
                    <span className="text-sm font-black text-white">3 Days • High School</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <span className="text-xs text-white/70 uppercase tracking-widest font-mono">Inclusions</span>
                    <span className="text-sm font-black text-white">Full Kit, Badges, Mentors</span>
                  </div>

                  <button
                    onClick={() => onEnquireProgram('InnovateX Summit (3-Day Flagship)')}
                    className="w-full mt-2 py-4 px-6 bg-[#C7EB49] text-[#35102F] font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-white shadow-[3px_4px_0px_white] hover:shadow-[1px_2px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Host InnovateX at Your School</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: PromptX AI Workshop + Beyond Year-Long Program */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Program 1: PromptX AI Workshop */}
          <div className="rounded-3xl bg-[#EDE2FA] border-2 border-[#35102F] p-7 sm:p-9 shadow-[6px_8px_0px_#35102F] hover:shadow-[8px_12px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              {/* Header tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-[#35102F] text-[#FFF9EF] text-xs font-black uppercase tracking-wider">
                  AI & Emerging Tech
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#35102F] border border-[#35102F] text-xs font-bold">
                  1-Day Program
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#35102F] border border-[#35102F] text-xs font-bold">
                  Classes 6 – 10
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#35102F] leading-tight beyond-font-heading">
                PromptX AI Workshop
              </h3>

              <p className="mt-3 text-sm sm:text-base text-[#35102F]/80 leading-relaxed beyond-font-sans">
                A rapid, high-impact one-day workshop introducing middle and high school students to AI fundamentals, prompt engineering, and modern creative workflows.
              </p>

              {/* Inclusions */}
              <div className="mt-6 space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#35102F]">
                  <CheckCircle2 className="w-4 h-4 text-[#35102F] shrink-0 mt-0.5" />
                  <span>Session 1: Discovering the World of Artificial Intelligence & LLMs</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#35102F]">
                  <CheckCircle2 className="w-4 h-4 text-[#35102F] shrink-0 mt-0.5" />
                  <span>Session 2: Hands-On Prompt Engineering & Creative AI Tools</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#35102F]">
                  <CheckCircle2 className="w-4 h-4 text-[#35102F] shrink-0 mt-0.5" />
                  <span>Safe and ethical AI use training for students & academic integrity</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#35102F]">
                  <CheckCircle2 className="w-4 h-4 text-[#35102F] shrink-0 mt-0.5" />
                  <span>Practical AI tools for school presentations, homework & research</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#35102F]">
                  <CheckCircle2 className="w-4 h-4 text-[#35102F] shrink-0 mt-0.5" />
                  <span>Comprehensive physical study materials & certificates for all participants</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#35102F]/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#35102F]/60 block">Format</span>
                <span className="text-xs font-bold text-[#35102F]">Full-Day Intensive (2 Sessions)</span>
              </div>
              <button
                onClick={() => onEnquireProgram('PromptX AI Workshop (1-Day)')}
                className="px-5 py-2.5 bg-[#C7EB49] text-[#35102F] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#35102F] shadow-[2px_3px_0px_#35102F] hover:shadow-[1px_1px_0px_#35102F] transition-all cursor-pointer"
              >
                Enquire Workshop
              </button>
            </div>
          </div>

          {/* Program 2: Beyond Year-Long Saturday Program */}
          <div className="rounded-3xl bg-[#F7DCE7] border-2 border-[#35102F] p-7 sm:p-9 shadow-[6px_8px_0px_#35102F] hover:shadow-[8px_12px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              {/* Header tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-[#35102F] text-[#FFF9EF] text-xs font-black uppercase tracking-wider">
                  Comprehensive Skills
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#35102F] border border-[#35102F] text-xs font-bold">
                  60 Sessions / Year
                </span>
                <span className="px-3 py-1 rounded-full bg-white text-[#35102F] border border-[#35102F] text-xs font-bold">
                  Classes 6 – 12
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#35102F] leading-tight beyond-font-heading">
                Beyond Year-Long Program
              </h3>

              <p className="mt-3 text-sm sm:text-base text-[#35102F]/80 leading-relaxed beyond-font-sans">
                A structured, Saturday-afternoon creative lab running across the entire academic year. Divided into 3 grade-level cohorts with zero exam pressure.
              </p>

              {/* 3 Tracks breakdown */}
              <div className="mt-6 space-y-2.5">
                <div className="p-3 rounded-2xl bg-white/70 border border-[#35102F]/20">
                  <span className="text-xs font-black text-[#35102F] uppercase tracking-wider block">
                    Track 1: Creative Exploration
                  </span>
                  <span className="text-xs text-[#35102F]/80">Canva, visual storytelling, mobile photography & composition.</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/70 border border-[#35102F]/20">
                  <span className="text-xs font-black text-[#35102F] uppercase tracking-wider block">
                    Track 2: Skill Development
                  </span>
                  <span className="text-xs text-[#35102F]/80">CapCut video editing, Figma UI/UX prototyping & design systems.</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/70 border border-[#35102F]/20">
                  <span className="text-xs font-black text-[#35102F] uppercase tracking-wider block">
                    Track 3: Career Launch
                  </span>
                  <span className="text-xs text-[#35102F]/80">DaVinci Resolve, live client briefs & student freelance portfolio.</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#35102F] pt-1">
                  <Star className="w-4 h-4 fill-[#C7EB49] text-[#35102F]" />
                  <span>Output-based portfolio evaluation — no tests, real published projects</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#35102F]/15 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#35102F]/60 block">Cadence</span>
                <span className="text-xs font-bold text-[#35102F]">Weekly Saturday Sessions</span>
              </div>
              <button
                onClick={() => onEnquireProgram('Beyond Year-Long Program (60 Sessions)')}
                className="px-5 py-2.5 bg-[#C7EB49] text-[#35102F] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#35102F] shadow-[2px_3px_0px_#35102F] hover:shadow-[1px_1px_0px_#35102F] transition-all cursor-pointer"
              >
                Enquire Year-Long
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedPrograms;

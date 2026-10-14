import React from 'react';
import { ArrowUpRight, GraduationCap, Building2, Sparkles } from 'lucide-react';

interface DualPathwaysProps {
  onExploreWorkshops: () => void;
  onPartnerWithBeyond: () => void;
}

export const DualPathways: React.FC<DualPathwaysProps> = ({
  onExploreWorkshops,
  onPartnerWithBeyond,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
              Join the Movement
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
            <span>Choose your</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#35102F]">
              pathway.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#35102F]/75 beyond-font-sans font-normal max-w-xl mx-auto">
            Whether you’re an ambitious learner ready to build something real or a school leader looking to elevate campus learning.
          </p>
        </div>

        {/* 2 Distinct Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Pathway 1: For Students */}
          <div className="rounded-3xl border-2 border-[#35102F] bg-[#EDE2FA] p-8 sm:p-10 shadow-[6px_8px_0px_#35102F] hover:shadow-[8px_12px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#35102F] text-[#C7EB49] flex items-center justify-center mb-6 shadow-[2px_3px_0px_rgba(53,16,47,0.3)]">
                <GraduationCap className="w-7 h-7" />
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-[#35102F]/70 block mb-1">
                For Students & Curious Builders
              </span>

              <h3 className="text-3xl sm:text-4xl font-black text-[#35102F] leading-tight mb-4 beyond-font-heading">
                For Students
              </h3>

              <p className="text-base text-[#35102F]/85 leading-relaxed beyond-font-sans">
                “Discover experiences that make learning exciting.” Dive into PromptX AI workshops, compete in InnovateX summits, and build real-world portfolios with other ambitious creators.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-[#35102F]">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#35102F]/20">AI Prompting</span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#35102F]/20">Video & Figma</span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#35102F]/20">IPL Auctions</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#35102F]/15">
              <button
                onClick={onExploreWorkshops}
                className="w-full py-4 px-6 bg-[#35102F] text-[#FFF9EF] font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[3px_4px_0px_#C7EB49] hover:bg-[#35102F]/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Workshops</span>
                <ArrowUpRight className="w-4 h-4 text-[#C7EB49]" />
              </button>
            </div>
          </div>

          {/* Pathway 2: For Institutions */}
          <div className="rounded-3xl border-2 border-[#35102F] bg-[#C7EB49] p-8 sm:p-10 shadow-[6px_8px_0px_#35102F] hover:shadow-[8px_12px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#35102F] text-[#C7EB49] flex items-center justify-center mb-6 shadow-[2px_3px_0px_rgba(53,16,47,0.3)]">
                <Building2 className="w-7 h-7" />
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-[#35102F]/70 block mb-1">
                For Schools, Colleges & EdTech Networks
              </span>

              <h3 className="text-3xl sm:text-4xl font-black text-[#35102F] leading-tight mb-4 beyond-font-heading">
                For Institutions
              </h3>

              <p className="text-base text-[#35102F]/85 leading-relaxed beyond-font-sans">
                “Bring future-ready learning experiences to your campus.” Turnkey STEM labs, accredited curriculum, faculty training, and flagship annual summits with zero administrative burden.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold text-[#35102F]">
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#35102F]/20">NEP 2020 Aligned</span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#35102F]/20">Trained Instructors</span>
                <span className="px-3 py-1 rounded-full bg-white/80 border border-[#35102F]/20">Full Hardware Labs</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#35102F]/15">
              <button
                onClick={onPartnerWithBeyond}
                className="w-full py-4 px-6 bg-[#35102F] text-[#FFF9EF] font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[3px_4px_0px_white] hover:bg-[#35102F]/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Partner With Beyond</span>
                <ArrowUpRight className="w-4 h-4 text-[#C7EB49]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DualPathways;

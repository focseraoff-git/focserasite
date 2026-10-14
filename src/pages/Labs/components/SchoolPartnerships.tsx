import React from 'react';
import { ArrowUpRight, Bot, Cpu, Lightbulb, Presentation, Wrench, BookOpen, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface SchoolPartnershipsProps {
  onOpenPartnerModal: () => void;
}

export const SchoolPartnerships: React.FC<SchoolPartnershipsProps> = ({ onOpenPartnerModal }) => {
  const institutionalServices = [
    {
      icon: Bot,
      title: 'AI & Machine Learning Workshops',
      description: 'Hands-on workshops covering AI fundamentals, prompt engineering, ChatGPT & Claude integration, and real-world AI applications.',
      tag: 'Workshops',
    },
    {
      icon: Cpu,
      title: 'InnovateX Skill Labs',
      description: 'Complete physical lab setup with hardware, curriculum, and trained instructors for robotics, IoT, 3D printing, and creative coding.',
      tag: 'Lab Setup',
    },
    {
      icon: Lightbulb,
      title: 'STEM Education Programs',
      description: 'Science, Technology, Engineering, and Math programs designed for K-12 with project-based inquiry learning methodologies.',
      tag: 'K-12 STEM',
    },
    {
      icon: Presentation,
      title: 'Teacher Training & FDP',
      description: 'Faculty development programs on emerging technologies, EdTech tools, AI in lesson planning, and modern pedagogical approaches.',
      tag: 'Faculty Dev',
    },
    {
      icon: Wrench,
      title: 'Lab Infrastructure Setup',
      description: 'End-to-end lab setup: hardware procurement, workstation installation, network configuration, safety compliance, and lab management.',
      tag: 'Infrastructure',
    },
    {
      icon: BookOpen,
      title: 'Curriculum Development',
      description: 'Custom technology curriculum development aligned with NEP 2020, CBSE skill subjects, ICSE, and state board guidelines.',
      tag: 'NEP 2020',
    },
  ];

  return (
    <section id="schools" className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Clean Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Strong Typographic Statement & Institution Context */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
                Institutional Partnerships
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
              <span>Bring Beyond</span>{' '}
              <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
                to your campus.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#35102F]/80 leading-relaxed beyond-font-sans font-normal">
              We partner directly with progressive schools, colleges, and school networks to introduce
              experiential future-tech labs without placing extra burden on existing faculty.
            </p>

            {/* Value Highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#EDE2FA]/80 border border-[#35102F]/20">
                <ShieldCheck className="w-5 h-5 text-[#35102F] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#35102F]">
                  <strong className="font-black block mb-0.5">Zero Faculty Overhead</strong>
                  Our certified industry trainers and curriculum coordinators handle setup, delivery, student assessments, and reporting.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#C7EB49]/40 border border-[#35102F]/20">
                <Sparkles className="w-5 h-5 text-[#35102F] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#35102F]">
                  <strong className="font-black block mb-0.5">NEP 2020 & Skill Credit Ready</strong>
                  Curriculum structured to fulfill national experiential learning and vocational skill credit directives.
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenPartnerModal}
                className="px-8 py-4 bg-[#C7EB49] text-[#35102F] font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[4px_6px_0px_#35102F] hover:shadow-[1px_2px_0px_#35102F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Bring Beyond to Your School</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="/images/Focsera_School_Pitch.pdf"
                download
                className="px-5 py-3.5 bg-white text-[#35102F] font-bold text-xs uppercase tracking-wider rounded-2xl border-2 border-[#35102F] text-center hover:bg-[#EDE2FA] transition-colors"
              >
                School Pitch PDF ↗
              </a>
            </div>
          </div>

          {/* Right Column: Compact, Readable Services Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {institutionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="p-6 rounded-3xl bg-white/80 border-2 border-[#35102F] shadow-[3px_4px_0px_#35102F] hover:shadow-[6px_8px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#EDE2FA] text-[#35102F] border border-[#35102F] flex items-center justify-center group-hover:bg-[#C7EB49] transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#35102F] text-[#FFF9EF]">
                          {service.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-[#35102F] mb-2 leading-snug beyond-font-heading">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#35102F]/75 leading-relaxed beyond-font-sans">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#35102F]/10 flex items-center justify-between text-xs font-bold text-[#35102F]/70">
                      <span>Full Implementation</span>
                      <span className="text-[#35102F] font-black group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SchoolPartnerships;

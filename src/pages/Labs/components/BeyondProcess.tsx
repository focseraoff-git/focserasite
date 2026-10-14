import React from 'react';
import { Target, Compass, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { DoodleSparkle } from './BeyondDoodles';

export const BeyondProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: "Understand Institution's Goals",
      description: 'We sit down with your leadership team to understand student demographics, curriculum objectives, lab space, and academic schedules.',
      icon: Target,
      tag: 'Discovery & Audit',
      bg: 'bg-[#EDE2FA]',
    },
    {
      number: '02',
      title: 'Design the Right Experience',
      description: 'Tailor workshop modules, assign certified trainers, curate hands-on kits, and map deliverables directly to NEP 2020 guidelines.',
      icon: Compass,
      tag: 'Custom Curation',
      bg: 'bg-[#C7EB49]',
    },
    {
      number: '03',
      title: 'Set Up and Deliver Program',
      description: 'Seamless campus deployment. Our team handles hardware, software, student engagement, mentor sessions, and high-energy workshops.',
      icon: Sparkles,
      tag: 'Live Execution',
      bg: 'bg-[#F7DCE7]',
    },
    {
      number: '04',
      title: 'Continue Supporting Learning',
      description: 'Session reports, accredited student certificates, digital portfolios, and year-round coordination for ongoing student growth.',
      icon: HeartHandshake,
      tag: 'Long-term Impact',
      bg: 'bg-[#FFF9EF]',
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
              Operational Roadmap
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
            <span>From idea</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
              to experience.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#35102F]/75 beyond-font-sans font-normal max-w-xl">
            A frictionless, turnkey implementation process designed specifically for busy school principals and educators.
          </p>
        </div>

        {/* Horizontal Timeline on Desktop / Vertical on Mobile */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-[#35102F]/20 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`rounded-3xl border-2 border-[#35102F] p-6 sm:p-7 shadow-[4px_6px_0px_#35102F] hover:shadow-[6px_10px_0px_#35102F] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${step.bg} group`}
                >
                  <div>
                    {/* Top Row: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#35102F] text-[#C7EB49] flex items-center justify-center font-black shadow-[2px_2px_0px_rgba(53,16,47,0.3)] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-[#35102F]/30 beyond-font-heading">
                        {step.number}
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#35102F] border border-[#35102F] inline-block mb-3">
                      {step.tag}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-black text-[#35102F] leading-snug mb-3 beyond-font-heading">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#35102F]/80 leading-relaxed beyond-font-sans">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="mt-6 pt-3 border-t border-[#35102F]/15 flex items-center gap-1.5 text-xs font-bold text-[#35102F]">
                    <CheckCircle2 className="w-4 h-4 text-[#35102F]" />
                    <span>Step {step.number} Complete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BeyondProcess;

import React from 'react';
import { Check, Sparkles, ArrowRight, Star, Shield } from 'lucide-react';

interface PartnershipPlansProps {
  onSelectPlan: (planName: string) => void;
}

export const PartnershipPlans: React.FC<PartnershipPlansProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      name: 'Starter',
      subtitle: 'Short Trial Pilot',
      audience: 'For schools looking to test',
      bg: 'bg-white/80',
      isPopular: false,
      tag: 'Trial Pilot',
      badgeBg: 'bg-[#EDE2FA]',
      inclusions: [
        'Trained expert trainer assigned to campus',
        'Complete curriculum content & session guides',
        'Event posters & offline marketing setup',
        'Session-wise digital certificates for students',
      ],
      description: 'Ideal for schools wanting to run an introductory skill boot camp before committing to annual tracks.',
    },
    {
      name: 'Standard',
      subtitle: 'Full Academic Year',
      audience: 'Complete skills experience',
      bg: 'bg-[#EDE2FA]',
      isPopular: true,
      tag: 'Most Popular',
      badgeBg: 'bg-[#C7EB49]',
      inclusions: [
        'Everything in Basic Starter package',
        'Professional event photography coverage',
        'Social media reels & student promotional content',
        'Gamified badges & inter-house school competitions',
        'Mid-term progress reports & student portfolios',
      ],
      description: 'Our core comprehensive institutional package offering full-year experiential learning, media, and gamification.',
    },
    {
      name: 'Premium',
      subtitle: 'Annual Partnership',
      audience: 'Maximum brand impact for schools',
      bg: 'bg-[#F7DCE7]',
      isPopular: false,
      tag: 'Flagship Tier',
      badgeBg: 'bg-[#35102F] text-white',
      inclusions: [
        'Everything in Standard Skill package',
        'Professional cinematic videography coverage',
        'Annual showcase event and project exhibition',
        'Free custom physical school corridor branding kit',
        'Dedicated senior curriculum director support',
      ],
      description: 'The definitive turn-key institutional partnership that positions your school as an innovation leader in your city.',
    },
  ];

  return (
    <section id="plans" className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
              Partnership Tiers
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
            <span>Every campus is different.</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
              So is our approach.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#35102F]/75 beyond-font-sans font-normal max-w-2xl mx-auto">
            Choose the collaboration model that fits your institutional vision. Transparent scopes,
            turnkey execution, and no hidden surprises.
          </p>
        </div>

        {/* 3 Editorial Cards Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border-2 border-[#35102F] p-7 sm:p-9 flex flex-col justify-between shadow-[4px_6px_0px_#35102F] hover:shadow-[8px_12px_0px_#35102F] hover:-translate-y-1.5 transition-all duration-300 ${plan.bg} ${
                plan.isPopular ? 'ring-2 ring-[#35102F]' : ''
              }`}
            >
              {/* Popular Sticker */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#C7EB49] text-[#35102F] text-[11px] font-black uppercase tracking-wider rounded-full border-2 border-[#35102F] shadow-[2px_2px_0px_#35102F]">
                    <Star className="w-3 h-3 fill-[#35102F]" /> Most Popular
                  </span>
                </div>
              )}

              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#35102F] ${plan.badgeBg}`}>
                    {plan.subtitle}
                  </span>
                  <span className="text-xs font-semibold text-[#35102F]/60">
                    {plan.audience}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-[#35102F] beyond-font-heading">
                  {plan.name} Plan
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#35102F]/80 leading-relaxed beyond-font-sans mb-6">
                  {plan.description}
                </p>

                {/* Scope Inclusions */}
                <div className="pt-4 border-t border-[#35102F]/15 mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#35102F]/60 block mb-3">
                    What's Included:
                  </span>
                  <ul className="space-y-3">
                    {plan.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#35102F]">
                        <span className="w-4 h-4 rounded-full bg-[#35102F] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Enquiry CTA */}
              <div className="pt-6 border-t border-[#35102F]/15">
                <button
                  onClick={() => onSelectPlan(`${plan.name} Institutional Plan`)}
                  className={`w-full py-3.5 px-5 font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-[#35102F] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? 'bg-[#C7EB49] text-[#35102F] shadow-[3px_4px_0px_#35102F] hover:shadow-[1px_1px_0px_#35102F] hover:translate-x-[2px] hover:translate-y-[2px]'
                      : 'bg-white text-[#35102F] shadow-[2px_3px_0px_#35102F] hover:bg-[#35102F] hover:text-white'
                  }`}
                >
                  <span>Enquire {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-center block text-[#35102F]/60 font-medium mt-2">
                  Custom quote tailored to campus size & batch
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnershipPlans;

import React from 'react';
import { ArrowUpRight, FileDown, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';
import { DoodleSparkle } from './BeyondDoodles';

interface BeyondCTAProps {
  onConnectClick: () => void;
}

export const BeyondCTA: React.FC<BeyondCTAProps> = ({ onConnectClick }) => {
  const whatsappUrl = `https://wa.me/919515803954?text=${encodeURIComponent(
    "Hi Focsera! I'm interested in Beyond by Focsera education programs, workshops, and school partnerships. Can you share more details?"
  )}`;

  return (
    <section className="py-20 sm:py-28 bg-[#C7EB49] text-[#35102F] relative border-t-2 border-[#35102F] overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-12 left-10 hidden sm:block">
        <DoodleSparkle className="w-10 h-10 text-[#35102F]" />
      </div>
      <div className="absolute bottom-12 right-12 hidden sm:block">
        <DoodleSparkle className="w-12 h-12 text-[#35102F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">

          {/* Sticker pill */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#35102F] text-[#FFF9EF] text-xs font-black uppercase tracking-widest shadow-[2px_3px_0px_white] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#C7EB49]" /> The Next Step
          </span>

          {/* Oversized Plum Heading */}
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.98] text-[#35102F] beyond-font-heading">
            <span className="block">READY TO GO</span>
            <span className="beyond-font-serif italic font-normal text-[#35102F] block mt-1 sm:mt-2">
              BEYOND?
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-8 text-xl sm:text-2xl text-[#35102F]/90 font-medium beyond-font-sans max-w-xl">
            Let's make learning something to look forward to.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            {/* Primary CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-9 py-4.5 bg-[#35102F] text-[#FFF9EF] font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[4px_6px_0px_white] hover:shadow-[1px_2px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-5 h-5 text-[#C7EB49]" />
            </a>

            {/* Secondary CTA */}
            <a
              href="/images/Focsera_School_Pitch.pdf"
              download
              className="w-full sm:w-auto px-8 py-4.5 bg-[#FFF9EF] text-[#35102F] font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[3px_4px_0px_#35102F] hover:shadow-[1px_2px_0px_#35102F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-[#35102F]" />
              <span>Download School Pitch</span>
            </a>
          </div>

          {/* Quick contact direct phone */}
          <div className="mt-8 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#35102F]/80">
            <span>Direct helpline for school leaders:</span>
            <a href="tel:+919515803954" className="font-black text-[#35102F] underline hover:no-underline">
              +91 95158 03954
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeyondCTA;

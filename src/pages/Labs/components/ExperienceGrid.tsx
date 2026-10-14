import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { DoodleSparkle } from './BeyondDoodles';

interface ExperienceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  pillBg: string;
  cardBg: string;
  topics: string[];
  graphicType: 'tech' | 'create' | 'speak' | 'events';
  highlight: string;
}

export const ExperienceGrid: React.FC<{ onSelectCategory?: (cat: string) => void }> = ({
  onSelectCategory,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const experiences: ExperienceItem[] = [
    {
      id: 'tech',
      category: 'Pillar 01',
      title: 'Discover Tech',
      description: 'Demystify artificial intelligence, machine learning, robotics, IoT, and coding through live playgrounds and real-world tools.',
      cardBg: 'bg-[#EDE2FA]', // Pastel Lavender
      pillBg: 'bg-[#35102F] text-[#FFF9EF]',
      topics: ['AI & Prompt Engineering', 'Machine Learning Logic', 'Robotics & Microcontrollers', 'Applied Coding & Web Basics'],
      graphicType: 'tech',
      highlight: 'Emerging Technologies',
    },
    {
      id: 'create',
      category: 'Pillar 02',
      title: 'Create & Build',
      description: 'Hands-on design, dynamic video editing, generative creative tools, and tangible projects that turn imagination into a real portfolio.',
      cardBg: 'bg-[#C7EB49]', // Electric Lime
      pillBg: 'bg-[#35102F] text-[#FFF9EF]',
      topics: ['UI/UX Design in Figma', 'Short-form Video & CapCut', 'Visual Branding & Canva', 'Output-Based Portfolios'],
      graphicType: 'create',
      highlight: 'Design & Media Production',
    },
    {
      id: 'speak',
      category: 'Pillar 03',
      title: 'Speak & Grow',
      description: 'Master interpersonal communication, stage confidence, persuasive storytelling, debate, teamwork, and empathetic leadership.',
      cardBg: 'bg-[#F7DCE7]', // Soft Blush
      pillBg: 'bg-[#35102F] text-[#FFF9EF]',
      topics: ['Stage Confidence & Pitching', 'Leadership & Team Dynamics', 'Effective Communication', 'Creative Problem Solving'],
      graphicType: 'speak',
      highlight: 'Confidence & Soft Skills',
    },
    {
      id: 'events',
      category: 'Pillar 04',
      title: 'Events & Challenges',
      description: 'Interactive high-school competitions, 3-day flagship summits, mock startup auctions, and collaborative hack-style challenges.',
      cardBg: 'bg-[#FFF9EF]', // Warm Cream
      pillBg: 'bg-[#C7EB49] text-[#35102F]',
      topics: ['InnovateX Summit', 'IPL Strategy Auctions', 'Brand Battles & Pitches', 'Young Innovators Showcase'],
      graphicType: 'events',
      highlight: 'Summits & Competitions',
    },
  ];

  // Bespoke graphic compositions for each card
  const renderCardGraphic = (type: string) => {
    switch (type) {
      case 'tech':
        return (
          <div className="relative w-full h-36 rounded-2xl bg-white/70 border-2 border-[#35102F] flex items-center justify-center overflow-hidden p-4">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#35102F_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#35102F] text-[#C7EB49] flex items-center justify-center font-mono font-black text-xs shadow-[2px_2px_0px_#C7EB49]">
                {'<AI/>'}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="px-2.5 py-1 rounded-md bg-[#35102F] text-[#C7EB49] text-[10px] font-mono font-bold">
                  neural_net.fit()
                </div>
                <div className="px-2 py-0.5 rounded-md bg-[#C7EB49] text-[#35102F] text-[9px] font-black tracking-wider uppercase">
                  Prompt Engineering
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#35102F] bg-[#EDE2FA] flex items-center justify-center text-xs font-black">
                🤖
              </div>
            </div>
          </div>
        );
      case 'create':
        return (
          <div className="relative w-full h-36 rounded-2xl bg-white/80 border-2 border-[#35102F] flex items-center justify-center overflow-hidden p-4">
            <div className="flex items-center gap-2 relative z-10">
              <div className="px-3 py-2 bg-[#35102F] text-white rounded-xl text-xs font-black transform -rotate-6 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                Figma ✦ UI
              </div>
              <div className="px-3 py-2 bg-white text-[#35102F] border-2 border-[#35102F] rounded-xl text-xs font-black transform rotate-3">
                CapCut 🎬
              </div>
              <div className="w-9 h-9 rounded-full bg-[#35102F] text-[#C7EB49] flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_#C7EB49]">
                🎨
              </div>
            </div>
            {/* Color palette swatches */}
            <div className="absolute bottom-2 left-4 flex gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#35102F] border border-white" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#C7EB49] border border-white" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#F7DCE7] border border-white" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#EDE2FA] border border-white" />
            </div>
          </div>
        );
      case 'speak':
        return (
          <div className="relative w-full h-36 rounded-2xl bg-white/80 border-2 border-[#35102F] flex items-center justify-center overflow-hidden p-4">
            <div className="flex flex-col items-center gap-2 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#F7DCE7] text-[#35102F] border border-[#35102F] rounded-full text-xs font-bold">
                  “I have an idea.”
                </span>
                <span className="w-7 h-7 rounded-full bg-[#35102F] text-white flex items-center justify-center text-xs">
                  🎙️
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#C7EB49] border border-[#35102F] flex items-center justify-center text-xs">
                  🤝
                </span>
                <span className="px-3 py-1 bg-[#35102F] text-[#FFF9EF] rounded-full text-xs font-black uppercase tracking-wider">
                  Pitch & Win
                </span>
              </div>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="relative w-full h-36 rounded-2xl bg-[#EDE2FA]/70 border-2 border-[#35102F] flex items-center justify-center overflow-hidden p-4">
            <div className="flex items-center gap-2 relative z-10">
              <div className="p-2.5 bg-[#C7EB49] text-[#35102F] border-2 border-[#35102F] rounded-xl text-center shadow-[2px_2px_0px_#35102F]">
                <span className="text-[10px] font-black uppercase block tracking-wider">Summit</span>
                <span className="text-sm font-black">InnovateX</span>
              </div>
              <div className="text-lg font-black text-[#35102F]">⚔️</div>
              <div className="p-2.5 bg-[#35102F] text-[#FFF9EF] border-2 border-[#35102F] rounded-xl text-center">
                <span className="text-[10px] font-bold uppercase block tracking-wider text-[#C7EB49]">Stage</span>
                <span className="text-sm font-black">IPL Battle</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="experiences" className="py-20 sm:py-28 bg-[#FFF9EF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <DoodleSparkle className="w-5 h-5 text-[#35102F]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
              Explore Beyond
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
            <span>There's more than</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
              one way to learn.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#35102F]/75 beyond-font-sans font-normal max-w-xl">
            Each learning pathway is engineered with an energetic blend of intuition, live experimentation,
            and real output — tailored for inquisitive students.
          </p>
        </div>

        {/* 4 Visually Distinctive Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`rounded-3xl border-2 border-[#35102F] p-6 sm:p-8 flex flex-col justify-between shadow-[4px_6px_0px_#35102F] hover:shadow-[8px_12px_0px_#35102F] hover:-translate-y-1 transition-all duration-300 ${exp.cardBg} group`}
            >
              <div>
                {/* Top Badge & Highlight */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-[#35102F] ${exp.pillBg}`}>
                    {exp.category}
                  </span>
                  <span className="text-xs font-bold text-[#35102F]/70 uppercase tracking-widest">
                    {exp.highlight}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-3xl sm:text-4xl font-black text-[#35102F] mb-3 beyond-font-heading">
                  {exp.title}
                </h3>

                <p className="text-sm sm:text-base text-[#35102F]/85 leading-relaxed beyond-font-sans mb-6">
                  {exp.description}
                </p>

                {/* Bespoke Graphic composition */}
                <div className="mb-6">
                  {renderCardGraphic(exp.graphicType)}
                </div>

                {/* Topics / Sub-inclusions list */}
                <div className="space-y-2 mb-6">
                  <span className="text-xs font-black uppercase tracking-wider text-[#35102F]/60 block mb-2">
                    Key Focus Areas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {exp.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#35102F]">
                        <span className="w-4 h-4 rounded-full bg-[#35102F] text-white flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-[#35102F]/15 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#35102F]">
                  Hands-On Learning
                </span>
                <a
                  href="#programs"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#35102F] text-xs font-black text-[#35102F] group-hover:bg-[#35102F] group-hover:text-white transition-colors"
                >
                  <span>View Programs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceGrid;

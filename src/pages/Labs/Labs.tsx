import React, { useState, useEffect } from 'react';
import BeyondNavbar from './components/BeyondNavbar';
import BeyondHero from './components/BeyondHero';
import BeyondIntro from './components/BeyondIntro';
import ExperienceGrid from './components/ExperienceGrid';
import FeaturedPrograms from './components/FeaturedPrograms';
import SchoolPartnerships from './components/SchoolPartnerships';
import PartnershipPlans from './components/PartnershipPlans';
import BeyondProcess from './components/BeyondProcess';
import BeyondGallery from './components/BeyondGallery';
import WhyBeyond from './components/WhyBeyond';
import DualPathways from './components/DualPathways';
import BeyondCTA from './components/BeyondCTA';
import BeyondFooter from './components/BeyondFooter';
import PartnerModal from './components/PartnerModal';

export const BeyondLabsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('InnovateX Summit & AI Workshops');

  useEffect(() => {
    // Update Page Title and Meta description
    document.title = "Beyond by Focsera — Beyond Classrooms. Into What's Next.";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        "Beyond by Focsera introduces students to AI, emerging tech, creative tools, and real-world skills through workshops, summits, and campus labs."
      );
    }
  }, []);

  const handleOpenPartnerModal = (program?: string) => {
    if (program) {
      setSelectedProgram(program);
    }
    setIsModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#35102F] font-sans selection:bg-[#C7EB49] selection:text-[#35102F] overflow-x-hidden relative">

      {/* Top Sticky Navigation */}
      <BeyondNavbar onOpenPartnerModal={() => handleOpenPartnerModal()} />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero */}
        <BeyondHero
          onExploreClick={() => scrollToSection('experiences')}
          onPartnerClick={() => scrollToSection('schools')}
        />

        {/* Section 2: Introduction */}
        <BeyondIntro />

        {/* Section 3: Explore Beyond */}
        <ExperienceGrid onSelectCategory={() => scrollToSection('programs')} />

        {/* Section 4: Featured Programs */}
        <FeaturedPrograms onEnquireProgram={(program) => handleOpenPartnerModal(program)} />

        {/* Section 5: Beyond for Schools */}
        <SchoolPartnerships onOpenPartnerModal={() => handleOpenPartnerModal('Custom Institutional STEM / AI Lab')} />

        {/* Section 6: Partnership Plans */}
        <PartnershipPlans onSelectPlan={(plan) => handleOpenPartnerModal(plan)} />

        {/* Section 7: How It Works */}
        <BeyondProcess />

        {/* Section 8: The Beyond Experience (Moments & PROMPTX Video) */}
        <BeyondGallery onEnquireProgram={(prog) => handleOpenPartnerModal(prog)} />

        {/* Section 9: Why Beyond */}
        <WhyBeyond />

        {/* Section 10: Join the Movement (Dual Pathways) */}
        <DualPathways
          onExploreWorkshops={() => scrollToSection('programs')}
          onPartnerWithBeyond={() => handleOpenPartnerModal('School Campus Partnership')}
        />

        {/* Section 11: Final CTA */}
        <BeyondCTA onConnectClick={() => handleOpenPartnerModal()} />
      </main>

      {/* Section 12: Dedicated Beyond Footer */}
      <BeyondFooter />

      {/* Partner Inquiry Interactive Modal */}
      <PartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProgram={selectedProgram}
      />

    </div>
  );
};

export default BeyondLabsPage;

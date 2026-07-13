import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import WhoWeHelp from '../components/WhoWeHelp';
import OutcomeCategories from '../components/OutcomeCategories';
import HowItWorks from '../components/HowItWorks';
import WhyFocseraComparison from '../components/WhyFocseraComparison';
import FeaturedPackages from '../components/FeaturedPackages';
import FeaturedPartners from '../components/FeaturedPartners';
import IndustriesSection from '../components/IndustriesSection';
import Testimonials from '../components/Testimonials';
import HomeFAQ from '../components/HomeFAQ';
import AppDownload from '../components/AppDownload';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-focsera-bg text-focsera-text font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* ══ HERO ══ */}
      <HeroSection />

      {/* ══ TRUST BAR ══ */}
      <TrustBar />

      {/* ══ WHO WE HELP ══ */}
      <WhoWeHelp />

      {/* ══ OUTCOME CATEGORIES ══ */}
      <OutcomeCategories />

      {/* ══ HOW IT WORKS ══ */}
      <HowItWorks />

      {/* ══ WHY FOCSERA ══ */}
      <WhyFocseraComparison />

      {/* ══ FEATURED PACKAGES ══ */}
      <FeaturedPackages />

      {/* ══ FEATURED PARTNERS ══ */}
      <FeaturedPartners />

      {/* ══ INDUSTRIES ══ */}
      <IndustriesSection />

      {/* ══ TESTIMONIALS ══ */}
      <Testimonials />

      {/* ══ FAQ ══ */}
      <HomeFAQ />

      {/* ══ APP DOWNLOAD ══ */}
      <AppDownload />

      {/* ══ FINAL CTA ══ */}
      <FinalCTA />
    </div>
  );
}

// @ts-ignore
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Camera, Megaphone, PartyPopper, Globe, Package, GraduationCap, ArrowRight, Sparkles, Armchair, Clapperboard, Calendar } from 'lucide-react';

import FuelUpPopup from '../components/FuelUpPopup';
import HomeCarousel from '../components/HomeCarousel';

import FebHeroRibbon from '../components/FebCampaign/FebHeroRibbon';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const divisions = [
    {
      icon: Camera,
      name: 'Focsera Studios',
      path: '/studios',
      description: 'Professional photography, videography, and curated portfolios for individuals and businesses.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clapperboard,
      name: 'Focsera Media',
      path: '/media',
      description: 'Full-service media production house. From concept to post-production, we bring stories to life.',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Armchair,
      name: 'Focsera Interiors',
      path: '/interiors',
      description: 'Transforming spaces into living masterpieces. Bespoke interior design solutions for your dream home.',
      gradient: 'from-[#0066FF] to-blue-600'
    },
    {
      icon: Calendar,
      name: 'Focsera Events',
      path: '/events',
      description: 'Creating unforgettable experiences. Corporate events, weddings, and parties managed with precision.',
      gradient: 'from-blue-600 to-[#0066FF]'
    },
    {
      icon: Globe,
      name: 'Focsera Web',
      path: '/web',
      description: 'Modern websites, e-commerce platforms, and custom web applications built for success.',
      gradient: 'from-[#0066FF] to-blue-500'
    },
    {
      icon: Package,
      name: 'Focsera Product Services',
      path: '/product-services',
      description: 'End-to-end product solutions from design and modeling to marketing and sales support.',
      gradient: 'from-cyan-500 to-[#0052CC]'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#ECECEC]">
      <FebHeroRibbon />
      <FuelUpPopup />
      <style>{` 
      /* PromptX CTA shimmer effect */
      .promptx-cta { box-shadow: 0 6px 36px rgba(6,182,212,0.12); position: relative; overflow: visible; }
      .promptx-cta::after { content: ''; position: absolute; inset: -6px; border-radius: 9999px; background: radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 10%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(6,182,212,0.08), transparent 10%); z-index: -1; }
      .promptx-shimmer { position: absolute; inset: 0; pointer-events: none; opacity: 0.35; mix-blend-mode: screen; background: linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.05) 100%); transform: translateX(-110%); transition: transform .8s ease-in-out; }
      .promptx-cta:hover .promptx-shimmer { transform: translateX(110%); }
    `}</style>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0052CC] pt-20 pb-12 sm:pt-24 md:pt-0">
        {/* Festive Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#ECECEC] rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          ></div>
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 animate-float">
            <Sparkles className="text-white" size={32} />
          </div>
          <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '2s' }}>
            <Sparkles className="text-white" size={24} />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '4s' }}>
            <Sparkles className="text-white" size={28} />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <div className="mb-6 animate-scale-in flex flex-col items-center gap-4">
            <div className="inline-block px-5 py-2 glass-effect rounded-full text-white text-xs sm:text-sm font-medium">
              Welcome to the Future of Creativity
            </div>
          </div>
          <h1 className="text-3xl sm:text-6xl lg:text-8xl font-black text-white mb-6 animate-fade-in leading-tight tracking-tight">
            Focus. Create.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-sm">Celebrate.</span>
          </h1>
          <p className="text-lg sm:text-2xl text-white/95 mb-8 animate-fade-in-delay max-w-2xl mx-auto font-light leading-relaxed">
            A global creative, media, and digital solutions group empowering brands and individuals worldwide
          </p>

          {/* --- BUTTON GROUP SECTION --- */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-delay-2 w-full max-w-md sm:max-w-none mx-auto">

            {/* 1. Explore Divisions Button */}
            <Link
              to="/about"
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0052CC] rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden text-sm sm:text-base hover:-translate-y-0.5"
            >
              <span className="relative z-10">Explore Divisions</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
              <div className="absolute inset-0 shimmer"></div>
            </Link>

            {/* 2. NEW PromptX Button */}
            {/* <Link
              to="/promptx"
              className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base hover:-translate-y-0.5"
            >
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
              <span>PromptX</span>
            </Link> */}

            {/* 4. ArenaX Button */}
            {/* <Link
              to="/arenax"
              className="group px-6 py-3 sm:px-8 sm:py-4 glass-effect border border-white/30 text-white rounded-full font-semibold hover:bg-white hover:text-[#0052CC] transition-all duration-300 promptx-cta text-sm sm:text-base hover:-translate-y-0.5"
            >
              <span className="relative z-10">ArenaX</span>
              <div className="promptx-shimmer" aria-hidden></div>
            </Link> */}

          </div>
          {/* --- END BUTTON GROUP --- */}
        </div>

        {/* --- Wave Separator Removed for Clean Overlap --- */}
      </section>

      {/* --- CAROUSEL SECTION --- */}
      <section className="relative py-10 sm:py-16 overflow-hidden bg-white/50 border-b border-gray-100">
        {/* Premium Light Background Transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0052CC]/5 via-white to-white"></div>

        {/* Decorative ambient glows for depth */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-cyan-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
            <div className="h-1 w-10 bg-blue-200 rounded-full mb-3"></div>
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 tracking-tight">Featured Highlights</h2>
          </div>

          <div className="relative">
            <HomeCarousel />
          </div>
        </div>
      </section>

      {/* Divisions Grid Section */}
      <section className="relative py-12 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#ECECEC]/30 to-white"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-[#0052CC]/10 to-[#0066FF]/10 rounded-full text-[#0052CC] text-xs sm:text-sm font-semibold">
                Our Divisions
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Six Pillars of <span className="text-gradient">Excellence</span>
            </h2>
            <div className="w-20 sm:w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Specialized divisions working together to deliver comprehensive creative and digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {divisions.map((division, index) => {
              const Icon = division.icon;
              return (
                <Link
                  key={index}
                  to={division.path}
                  className="group glossy-card rounded-3xl p-6 sm:p-8 hover-lift border border-gray-100 relative overflow-hidden flex flex-col items-start"
                  style={{ animationDelay: `${index * 100}ms` }}
                >

                  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${division.gradient} rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="text-white" size={32} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0052CC] transition-colors">
                    {division.name}
                  </h3>

                  <p className="text-gray-600 mb-5 sm:mb-6 leading-relaxed font-light text-sm sm:text-base flex-grow">
                    {division.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#0052CC] font-semibold group-hover:gap-3 transition-all text-sm sm:text-base mt-auto">
                    Learn More
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0052CC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0052CC]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="glass-effect rounded-3xl p-6 sm:p-10 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl sm:text-6xl font-bold text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">6</div>
              <div className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Specialized Divisions</div>
              <div className="text-white/80 font-light text-sm sm:text-base">Comprehensive creative and digital solutions</div>
            </div>

            <div className="glass-effect rounded-3xl p-6 sm:p-10 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl sm:text-6xl font-bold text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Endless Possibilities</div>
              <div className="text-white/80 font-light text-sm sm:text-base">Unlimited creative potential</div>
            </div>

            <div className="glass-effect rounded-3xl p-6 sm:p-10 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl sm:text-6xl font-bold text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">1</div>
              <div className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">Unified Vision</div>
              <div className="text-white/80 font-light text-sm sm:text-base">Global excellence in creativity</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

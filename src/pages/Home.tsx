// @ts-ignore
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PromptXPopup from '../components/PromptXPopup';
import { Camera, Megaphone, PartyPopper, Globe, Package, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import DashboardPage from './divisions/Skill/Pages/OnlineCompilerPage';

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
      icon: Megaphone,
      name: 'Focsera Media',
      path: '/media',
      description: 'Content strategy, social media marketing, and influencer campaigns to maximize engagement.',
      gradient: 'from-[#0052CC] to-blue-600'
    },
    {
      icon: PartyPopper,
      name: 'Focsera Events',
      path: '/events',
      description: 'Corporate, private, and campus events designed to create memorable experiences.',
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
    {
      icon: GraduationCap,
      name: 'Focsera Skill',
      path: '/divisions/skill/dashboard',
      description: 'Professional training in creative and digital technologies to empower the next generation.',
      gradient: 'from-blue-500 to-[#0052CC]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#ECECEC]">
  <style>{` 
      /* PromptX shining banner + CTA effects */
  /* Badge: white sheen (subtle moving white highlight) while keeping theme blue accent */
  .promptx-badge {
    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
    padding: 6px 14px;
    border-radius: 9999px;
    border: 1px solid rgba(255,255,255,0.12);
    color: white;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 6px 30px rgba(0,0,0,0.06), 0 3px 12px rgba(0,0,0,0.04);
    position: relative;
    overflow: hidden;
  }

  /* gentle scale pulse */
  @keyframes promptx-pulse { 0% { transform: scale(1); opacity: 0.99 } 50% { transform: scale(1.02); opacity: 1 } 100% { transform: scale(1); opacity: 0.99 } }
  .promptx-badge { animation: promptx-pulse 2600ms ease-in-out infinite; }

  /* moving white sheen overlay */
  .promptx-badge::after {
    content: '';
    position: absolute;
    top: -10%;
    left: -120%;
    width: 60%;
    height: 120%;
    background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-20deg);
    opacity: 0.7;
    animation: promptx-white-sheen 3.2s linear infinite;
    pointer-events: none;
  }
  @keyframes promptx-white-sheen { 0% { left: -120%; } 60% { left: 140%; } 100% { left: 140%; } }

  /* text remains white but with subtle blue glow to fit theme */
  .promptx-text { color: white; text-shadow: 0 6px 18px rgba(6,182,212,0.06); font-weight:700; }
      .promptx-cta { box-shadow: 0 6px 36px rgba(6,182,212,0.12); position: relative; overflow: visible; }
      .promptx-cta::after { content: ''; position: absolute; inset: -6px; border-radius: 9999px; background: radial-gradient(circle at 30% 20%, rgba(99,102,241,0.12), transparent 10%, transparent 40%), radial-gradient(circle at 70% 80%, rgba(6,182,212,0.08), transparent 10%); z-index: -1; }
      .promptx-shimmer { position: absolute; inset: 0; pointer-events: none; opacity: 0.35; mix-blend-mode: screen; background: linear-gradient(120deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.05) 100%); transform: translateX(-110%); transition: transform .8s ease-in-out; }
      .promptx-cta:hover .promptx-shimmer { transform: translateX(110%); }
      @media (max-width: 640px) { .promptx-badge { padding: 6px 10px; font-size: 13px } }
    `}</style>
  <PromptXPopup autoShow={true} alwaysShow={true} />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0052CC]">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            ></div>
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ECECEC] rounded-full mix-blend-overlay filter blur-3xl animate-pulse"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            ></div>
          </div>

          <div className="absolute inset-0 opacity-10">
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
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8 animate-scale-in">
            <div className="inline-block px-6 py-2 glass-effect rounded-full text-white text-sm font-medium mb-6">
              Welcome to the Future of Creativity
            </div>
            {/* PromptX shining badge to indicate nearby event */}
            <div className="mt-2">
              <span className="promptx-badge">
                <PartyPopper size={16} className="text-[var(--theme-blue-500)]" />
                <span className="promptx-text">PromptX Workshop — Happening Soon</span>
              </span>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 animate-fade-in leading-tight">
            Focus. Create.<br />Celebrate.
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 mb-12 animate-fade-in-delay max-w-3xl mx-auto font-light">
            A global creative, media, and digital solutions group empowering brands and individuals worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link
              to="/about"
              className="group relative px-10 py-5 bg-white text-[#0052CC] rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Explore Divisions</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              <div className="absolute inset-0 shimmer"></div>
            </Link>
            <Link
              to="/promptx"
              className="group px-10 py-5 glass-effect border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#0052CC] transition-all duration-300 promptx-cta"
            >
             <span className="relative z-10">PromptX</span>
             <div className="promptx-shimmer" aria-hidden></div>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#ECECEC]/30 to-white"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-[#0052CC]/10 to-[#0066FF]/10 rounded-full text-[#0052CC] text-sm font-semibold">
                Our Divisions
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Six Pillars of <span className="text-gradient">Excellence</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Specialized divisions working together to deliver comprehensive creative and digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisions.map((division, index) => {
              const Icon = division.icon;
              return (
                <Link
                  key={index}
                  to={division.path}
                  className="group glossy-card rounded-3xl p-8 hover-lift border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${division.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <Icon className="text-white" size={36} />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#0052CC] transition-colors">
                    {division.name}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed font-light">
                    {division.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#0052CC] font-semibold group-hover:gap-3 transition-all">
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

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0052CC]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect rounded-3xl p-10 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform">6</div>
              <div className="text-2xl font-semibold text-white mb-3">Specialized Divisions</div>
              <div className="text-white/80 font-light">Comprehensive creative and digital solutions</div>
            </div>

            <div className="glass-effect rounded-3xl p-10 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-2xl font-semibold text-white mb-3">Endless Possibilities</div>
              <div className="text-white/80 font-light">Unlimited creative potential</div>
            </div>

            <div className="glass-effect rounded-3xl p-10 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-6xl font-bold text-white mb-4 group-hover:scale-110 transition-transform">1</div>
              <div className="text-2xl font-semibold text-white mb-3">Unified Vision</div>
              <div className="text-white/80 font-light">Global excellence in creativity</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

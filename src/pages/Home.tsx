
// @ts-ignore
import { Link } from 'react-router-dom';
import { Camera, Globe, Package, ArrowRight, Sparkles, Armchair, Clapperboard, Calendar, ArrowDown, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import HomeCarousel from '../components/HomeCarousel';
import PackagesSection from '../components/PackagesSection';
import JourneyGallery from '../components/JourneyGallery';
import WhyFocsera from '../components/WhyFocsera';
import AppDownload from '../components/AppDownload';

export default function Home() {
  // Ultra-Smooth "Apple-like" Cubic Bezier Easing
  const smoothEase = [0.23, 1, 0.32, 1] as any;
  const longTransition = { duration: 1.4, ease: smoothEase };
  const standardTransition = { duration: 0.8, ease: smoothEase };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]); // Slower parallax for bg
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]); // Extra layer
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const divisions = [
    {
      icon: Camera,
      name: 'Focsera Studios',
      path: '/studios',
      description: 'Professional photography, videography, and curated portfolios.',
      color: 'blue',
      // Start with standard blue keys, will use group-hover for deep blue effects
    },
    {
      icon: Calendar,
      name: 'Focsera Events',
      path: '/events',
      description: 'Corporate events, weddings, and parties managed with precision.',
      color: 'indigo',
    },
    {
      icon: Armchair,
      name: 'Focsera Interiors',
      path: '/interiors',
      description: 'Bespoke interior design solutions for your dream home.',
      color: 'violet',
    },
    {
      icon: Globe,
      name: 'Focsera Web',
      path: '/web',
      description: 'Modern websites and custom web applications.',
      color: 'sky',
    },
    {
      icon: Package,
      name: 'Focsera Product',
      path: '/product-services',
      description: 'End-to-end product design and modeling.',
      color: 'emerald',
    },
    {
      icon: Clapperboard,
      name: 'Focsera Media',
      path: '/media',
      description: 'Full-service media production house.',
      color: 'rose',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        ...longTransition
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: standardTransition
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* --- HERO SECTION (Immersive Dark - Ultra Luxury) --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden bg-slate-950">
        {/* Deep, Rich Background Gradients - PARALLAX ENABLED */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>

          {/* Cinematic Noise Texture - Fixed/Static for tactile feel */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 md:opacity-20 mix-blend-normal md:mix-blend-overlay pointer-events-none"></div>

          {/* Subtle Ambient Glow (No blobs, no grid - Pure Ambience) */}
          <motion.div style={{ y: y1 }} className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[600px] bg-blue-900/10 blur-[180px] rounded-full pointer-events-none mix-blend-screen opacity-50"></motion.div>
          <motion.div style={{ y: y2 }} className="hidden md:block absolute bottom-0 right-0 w-[60vw] h-[600px] bg-slate-800/10 blur-[180px] rounded-full pointer-events-none mix-blend-screen opacity-40"></motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-[90rem] mx-auto w-full">
          {/* Glass Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...standardTransition, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/80 md:bg-white/5 border border-white/10 text-slate-300 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-10 sm:mb-14 backdrop-blur-none md:backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles size={12} className="text-slate-400" />
            The Future of Creativity
          </motion.div>

          {/* SOPHISTICATED TYPOGRAPHY - ASYMMETRIC EDITORIAL PERFECTION (RESIZED) */}
          <div className="relative mb-16 w-full max-w-6xl mx-auto flex flex-col items-center lg:items-start perspective-1000">

            {/* 1. FOCUS (Solid Base) */}
            <motion.h1
              initial={{ opacity: 0, x: -50, rotateX: 10 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ ...longTransition, delay: 0.3 }}
              className="text-4xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] font-sans font-black tracking-tighter leading-[0.85] text-white z-10 self-start lg:ml-0 drop-shadow-2xl origin-top"
            >
              Focus.
            </motion.h1>

            {/* 2. CREATE (The Bridge - Serif Italic) */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...longTransition, delay: 0.5 }}
              className="self-center lg:self-auto lg:ml-[20%] mt-0 sm:-mt-4 md:-mt-6 z-20"
            >
              <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] font-serif italic text-slate-300 tracking-tight leading-[0.85] mix-blend-overlay opacity-90">
                Create.
              </h1>
            </motion.div>

            {/* 3. CELEBRATE (The Climax - Platinum Gradient) */}
            <motion.h1
              initial={{ opacity: 0, x: 50, rotateX: -10 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ ...longTransition, delay: 0.7 }}
              className="text-4xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem] font-sans font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 self-end lg:mr-32 mt-0 sm:-mt-4 md:-mt-6 z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.25)] origin-top"
            >
              Celebrate.
            </motion.h1>

            {/* PREMIUM FLOATING BADGE - Frosted Glass & Gold Border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ ...standardTransition, delay: 1 }}
              className="mt-8 lg:mt-0 relative lg:absolute lg:top-[30%] right-auto lg:right-[15%] bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-30 cursor-default group self-center lg:self-auto"
            >
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="font-serif italic font-bold text-white text-base sm:text-xl tracking-wide">
                  Your Ideas. <br />
                  <span className="text-xs font-sans font-normal uppercase tracking-widest text-slate-300 group-hover:text-white transition-colors">Delivered Instantly.</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Caption & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...standardTransition, delay: 0.9 }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-12 sm:mb-16 font-medium leading-relaxed tracking-wide px-4 max-w-3xl mx-auto drop-shadow-md">
              We empower brands, elevate events, and redefine spaces with world-class media production and digital innovation.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...standardTransition, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 mb-20"
            >
              {/* Primary CTA: Solid White (High Luxury) */}
              <button
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative w-full sm:w-auto min-w-[220px] h-16 px-10 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-[1.03] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
              >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">Start Your Project</span>
              </button>

              {/* Secondary CTA: Transparent Glass */}
              <button
                onClick={() => document.getElementById('divisions')?.scrollIntoView({ behavior: 'smooth' })}
                className="group w-full sm:w-auto min-w-[220px] h-16 px-10 bg-transparent border border-white/20 text-slate-300 rounded-full font-bold text-sm uppercase tracking-widest hover:border-white/50 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center gap-3 backdrop-blur-sm hover:bg-white/5"
              >
                <ArrowDown size={16} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-4 group-hover:ml-0" />
                Explore Services
              </button>
            </motion.div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-70">Scroll</span>
          <ArrowDown size={18} className="opacity-70" />
        </motion.div>
      </section>



      {/* --- PACKAGES SECTION (Integration) --- */}
      <PackagesSection />

      {/* --- JOURNEY GALLERY SECTION --- */}
      <JourneyGallery />

      {/* --- DIVISIONS SECTION (Glass Bento Grid) --- */}
      <section className="py-32 relative bg-slate-950" id="divisions">
        {/* Subtle Background Glow w/ Parallax */}
        <motion.div style={{ y: y3 }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-40"></motion.div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={standardTransition}
            className="mb-24 text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-500 font-extrabold tracking-widest uppercase text-sm mb-4 block">Our Expertise</span>
            <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-6">
              Six Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Excellence.</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {divisions.map((division, index) => {
              const Icon = division.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="h-full">
                  <Link
                    to={division.path}
                    className="group relative h-full min-h-[340px] bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/10 hover:bg-white/[0.04] backdrop-blur-sm hover:scale-[1.02]"
                  >
                    {/* Hover Glow - Subtle White */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2">
                      {/* Icon Box - Ultra Minimal */}
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 text-slate-300 mb-8 border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                        <Icon size={32} strokeWidth={1} />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                        {division.name}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed text-base group-hover:text-slate-300 transition-colors">
                        {division.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/5 pt-6 group-hover:border-white/10 transition-colors">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-widest group-hover:text-white transition-colors">Discover</span>
                      <ArrowRight size={16} className="text-slate-600 group-hover:text-white group-hover:-rotate-45 transition-all duration-500" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>





      {/* --- WHY FOCSERA SECTION --- */}
      <WhyFocsera />

      {/* --- FEATURED HIGHLIGHTS (Clean Transition) --- */}
      <section className="py-20 bg-slate-950 overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl sm:text-6xl font-black text-white mb-12 tracking-tighter text-center">Featured Highlights</h2>
          <HomeCarousel />
        </div>
      </section>

      {/* --- APP DOWNLOAD SECTION --- */}
      <AppDownload />

      {/* --- STATISTICS SECTION --- */}
      <section className="relative py-40 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-950/40 via-slate-950 to-slate-950"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center"
          >
            {[
              { number: "6", label: "Specialized Divisions", sub: "Comprehensive solutions", color: "from-blue-400 to-blue-600" },
              { number: "∞", label: "Endless Possibilities", sub: "Unlimited potential", color: "from-indigo-400 to-indigo-600" },
              { number: "1", label: "Unified Vision", sub: "Tailored for you", color: "from-violet-400 to-violet-600" }
            ].map((stat, i) => (
              <div key={i} className="group">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2, ease: "backOut" }}
                  className={`text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-500 inline-block drop-shadow-xl`}
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{stat.label}</h3>
                <p className="text-slate-400 font-medium">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div >
  );
}

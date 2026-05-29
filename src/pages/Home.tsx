
// @ts-ignore
import { ArrowDown, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import AppDownload from '../components/AppDownload';
import StatsBar from '../components/StatsBar';
import ServicesGrid from '../components/ServicesGrid';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HomeFAQ from '../components/HomeFAQ';
import PartnersPackages from '../components/PartnersPackages';

const trustLogos = [
  { name: 'Focsera Studios', src: '/images/logos/FocseraStudios.jpg' },
  { name: 'Focsera Media', src: '/images/logos/FocseraMedia.jpg' },
  { name: 'Focsera Events', src: '/images/logos/FocseraEvents.jpg' },
  { name: 'Focsera Web', src: '/images/logos/FocseraWeb.jpg' },
  { name: 'Focsera Product', src: '/images/logos/FocseraProduct.jpg' },
  { name: 'Focsera Skill', src: '/images/logos/FocseraSkill.jpg' },
];

export default function Home() {
  const smoothEase = [0.23, 1, 0.32, 1] as any;
  const standardTransition = { duration: 0.8, ease: smoothEase };

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden transition-colors duration-500">

      {/* ══════════════════════════════════════════════════
          HERO — Split layout
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">

        {/* Subtle background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[60vw] h-[70vh] bg-blue-100/60 dark:bg-blue-900/20 rounded-tl-[40%] transition-colors duration-500" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[300px] bg-blue-400/10 dark:bg-blue-500/8 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end min-h-[85vh]">

            {/* ── LEFT: Text content ── */}
            <div className="flex flex-col justify-center py-20 lg:py-32">
              {/* Badge */}
              <motion.div
                onClick={() => document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-8 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/15 transition-colors w-fit"
              >
                <Zap size={13} className="text-blue-500 dark:text-blue-400" />
                <span>Now on Google Play</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.2 }}
                className="text-[2.5rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-slate-900 dark:text-white mb-6"
              >
                Trusted creative help{' '}
                <br className="hidden sm:block" />
                in minutes!
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-md mb-10 leading-relaxed font-normal"
              >
                Book professional photography, events, interiors and more — all from one app.
              </motion.p>

              {/* App store buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start gap-3.5"
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                  target="_blank"
                  rel="noreferrer"
                  id="hero-google-play-btn"
                  className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3.5 rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-slate-900/10 dark:shadow-white/10 min-w-[190px]"
                >
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase font-medium text-gray-400 dark:text-slate-500 tracking-wider">Get it on</div>
                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 px-6 py-3.5 rounded-2xl min-w-[190px]">
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase font-medium text-slate-400 tracking-wider">Coming soon</div>
                    <div className="text-sm font-semibold leading-tight text-slate-500 dark:text-slate-400">App Store</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Person cutout ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...standardTransition, delay: 0.5 }}
              className="hidden lg:flex justify-end items-end relative"
            >
              <img
                src="/images/2.png"
                alt="Focsera Team"
                className="w-auto h-[70vh] max-h-[680px] object-contain object-bottom opacity-0 transition-opacity duration-700 drop-shadow-2xl"
                onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300 dark:text-slate-600 cursor-pointer z-50"
          onClick={() => document.getElementById('trust-strip')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* ══ TRUST LOGOS STRIP ══ */}
      <section id="trust-strip" className="py-10 sm:py-14 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5 transition-colors duration-500">
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none transition-colors duration-500" />
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none transition-colors duration-500" />

          <div className="flex animate-marquee w-max">
            {[...trustLogos, ...trustLogos, ...trustLogos, ...trustLogos].map((logo, i) => (
              <div key={i} className="flex items-center justify-center mx-8 sm:mx-12 shrink-0">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 sm:h-10 w-auto object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 dark:brightness-200 dark:contrast-0 dark:hover:brightness-100 dark:hover:contrast-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <div id="stats">
        <StatsBar />
      </div>

      {/* ══ SERVICES ══ */}
      <ServicesGrid />

      {/* ══ PARTNERS & PACKAGES SYSTEM ══ */}
      <div id="partners-packages">
        <PartnersPackages />
      </div>

      {/* ══ HOW IT WORKS ══ */}
      <HowItWorks />

      {/* ══ TESTIMONIALS ══ */}
      <Testimonials />

      {/* ══ FAQ ══ */}
      <HomeFAQ />

      {/* ══ APP DOWNLOAD CTA ══ */}
      <AppDownload />

      {/* Floating Download FAB */}
      <motion.a
        href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-[100] h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center shadow-lg shadow-blue-500/30 cursor-pointer transition-all duration-500 overflow-hidden group max-w-[56px] hover:max-w-[260px] pl-1"
      >
        <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-transparent">
          <Zap size={20} className="text-white" />
        </div>
        <span className="text-white font-bold text-sm whitespace-nowrap pr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          Download from Play Store
        </span>
      </motion.a>
    </div>
  );
}

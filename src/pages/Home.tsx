
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

export default function Home() {
  const smoothEase = [0.23, 1, 0.32, 1] as any;
  const standardTransition = { duration: 0.8, ease: smoothEase };

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden transition-colors duration-500">

      {/* ══════════════════════════════════════════════════
          HERO — fills viewport on mobile, split on desktop
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">

        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-dot-pattern opacity-40 dark:opacity-60" />
          <div className="absolute bottom-0 right-0 w-[60vw] h-[70vh] bg-blue-100/60 dark:bg-blue-900/20 rounded-tl-[40%] transition-colors duration-500" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[260px] bg-blue-400/10 dark:bg-blue-500/8 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center lg:items-end pt-20 pb-8 sm:pt-24 sm:pb-12 lg:py-28">

            {/* ── LEFT: Text content ── */}
            <div className="flex flex-col items-start">

              {/* Badge */}
              <motion.div
                onClick={() => document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' })}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/25 text-[11px] font-semibold tracking-wide mb-5 cursor-pointer hover:bg-blue-100 transition-colors w-fit"
              >
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold">✓</span>
                <span>7 divisions live</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.2 }}
                className="text-[2.4rem] leading-[1.08] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] font-extrabold tracking-[-0.03em] text-slate-900 dark:text-white mb-4"
              >
                Trusted creative<br />help in minutes!
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.3 }}
                className="text-[15px] sm:text-lg text-slate-500 dark:text-slate-400 max-w-md mb-7 leading-relaxed"
              >
                Book professional photography, events, interiors and more — all from one app.
              </motion.p>

              {/* App store buttons — side by side */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.4 }}
                className="flex flex-row items-stretch gap-2.5 w-full max-w-[360px] mb-6"
              >
                {/* Google Play */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                  target="_blank"
                  rel="noreferrer"
                  id="hero-google-play-btn"
                  className="flex items-center gap-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-3.5 rounded-xl hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 shadow-md shadow-slate-900/10 flex-1 min-w-0"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="text-left min-w-0">
                    <div className="text-[9px] uppercase font-medium opacity-60 tracking-wider">Get it on</div>
                    <div className="text-[13px] font-bold leading-tight">Google Play</div>
                  </div>
                </a>

                {/* App Store */}
                <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 px-4 py-3.5 rounded-xl flex-1 min-w-0">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="text-left min-w-0">
                    <div className="text-[9px] uppercase font-medium tracking-wider">Coming soon</div>
                    <div className="text-[13px] font-semibold leading-tight text-slate-500 dark:text-slate-400">App Store</div>
                  </div>
                </div>
              </motion.div>

              {/* Live Areas — hidden on mobile to reduce clutter, visible sm+ */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...standardTransition, delay: 0.55 }}
                className="hidden sm:block pt-5 border-t border-slate-100 dark:border-white/5 w-full max-w-[360px]"
              >
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">Live In</div>
                <div className="flex flex-row flex-wrap gap-1.5">
                  {['Hyderabad', 'Madhapur', 'Gachibowli', 'Jubilee Hills', 'Banjara Hills', '+ more'].map((area, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/5 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Person image — desktop only ── */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...standardTransition, delay: 0.5 }}
              className="hidden lg:flex justify-end items-end relative w-full"
            >
              <div className="absolute right-10 bottom-24 w-[360px] h-[360px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl -z-10" />
              <img
                src="/images/2.png"
                alt="Focsera Team"
                className="w-auto h-[70vh] max-h-[640px] object-contain object-bottom opacity-0 transition-opacity duration-700 drop-shadow-2xl z-10"
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
          className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300 dark:text-slate-600 cursor-pointer z-50"
          onClick={() => document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* ══ STATS ══ */}
      <div id="stats">
        <StatsBar />
      </div>

      {/* ══ SERVICES ══ */}
      <ServicesGrid />

      {/* ══ PARTNERS & PACKAGES ══ */}
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

      {/* Floating Download FAB — desktop only */}
      <motion.a
        href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-[100] h-14 bg-blue-600 hover:bg-blue-700 rounded-full hidden sm:flex items-center shadow-lg shadow-blue-500/30 cursor-pointer transition-all duration-500 overflow-hidden group max-w-[56px] hover:max-w-[260px] pl-1"
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

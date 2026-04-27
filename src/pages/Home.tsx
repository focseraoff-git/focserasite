
// @ts-ignore
import { ArrowDown, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

import AppDownload from '../components/AppDownload';
import StatsBar from '../components/StatsBar';
import ServicesGrid from '../components/ServicesGrid';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import HomeFAQ from '../components/HomeFAQ';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const smoothEase = [0.23, 1, 0.32, 1] as any;
  const standardTransition = { duration: 0.8, ease: smoothEase };

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden transition-colors duration-500">

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end items-center pt-32 pb-0 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">

        {/* Subtle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[350px] bg-blue-400/20 dark:bg-blue-500/15 blur-[120px] rounded-full"
          />
        </div>

        {/* Soft blue bottom wash */}
        <div className="absolute bottom-0 left-0 right-0 h-[35vh] bg-gradient-to-t from-blue-100/80 via-blue-50/40 to-transparent dark:from-blue-950/40 dark:via-blue-950/20 dark:to-transparent pointer-events-none z-0 transition-colors duration-500" />

        {/* ── LEFT PERSON ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...standardTransition, delay: 0.7 }}
          className="hidden xl:block absolute bottom-0 left-0 z-0 pointer-events-none h-[65vh] w-auto"
        >
          <img
            src="/images/ChatGPT Image Apr 27, 2026, 12_27_30 AM (1) (1).png"
            alt="Focsera Team"
            className="w-auto h-full max-w-none object-contain object-left-bottom opacity-0 transition-opacity duration-700 scale-[2.4] -translate-x-[20%] translate-y-[80%] origin-bottom-left"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          />
        </motion.div>

        {/* ── RIGHT PERSON ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...standardTransition, delay: 0.8 }}
          className="hidden xl:block absolute bottom-0 right-0 z-0 pointer-events-none h-[65vh] w-auto"
        >
          <img
            src="/images/2.png"
            alt="Focsera Team"
            className="w-auto h-full max-w-none object-contain object-right-bottom opacity-0 transition-opacity duration-700 scale-[2.4] translate-x-[40%] translate-y-[80%] origin-bottom-right"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          />
        </motion.div>

        {/* Centre content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto w-full flex flex-col items-center">

          {/* Badge */}
          <motion.div
            onClick={() => document.getElementById('download-app')?.scrollIntoView({ behavior: 'smooth' })}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...standardTransition, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20 text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-6 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-500/15 transition-colors"
          >
            <Zap size={12} className="text-blue-500 dark:text-blue-400" />
            <span>Now on Google Play</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...standardTransition, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-5"
          >
            Trusted creative help{' '}
            <br className="hidden sm:block" />
            in minutes!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...standardTransition, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8 leading-relaxed"
          >
            Book professional photography, events, interiors and more — all from one app.
          </motion.p>

          {/* App store buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...standardTransition, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-3 mb-14"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
              target="_blank"
              rel="noreferrer"
              id="hero-google-play-btn"
              className="flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-md min-w-[180px]"
            >
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase font-medium text-gray-400 dark:text-slate-500 tracking-wider">Get it on</div>
                <div className="text-sm font-semibold leading-tight">Google Play</div>
              </div>
            </a>

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 px-5 py-3 rounded-xl min-w-[180px]">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div className="text-left">
                <div className="text-[9px] uppercase font-medium text-slate-400 tracking-wider">Coming soon</div>
                <div className="text-sm font-semibold leading-tight text-slate-500 dark:text-slate-400">App Store</div>
              </div>
            </div>
          </motion.div>

          {/* Fanned phone mockups */}
          <div className="relative w-full max-w-[700px] h-[300px] sm:h-[380px] md:h-[440px] mx-auto flex justify-center">
            {/* Left phone */}
            <motion.div
              initial={{ opacity: 0, x: "20%", y: 80, rotateZ: 0 }}
              animate={{ opacity: 1, x: "-65%", y: 50, rotateZ: -10 }}
              transition={{ duration: 1, delay: 0.5, ease: smoothEase }}
              className="absolute top-0 w-[160px] sm:w-[200px] md:w-[230px] z-10"
            >
              <div className="rounded-[2rem] p-1.5 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="w-full aspect-[9/19.5] overflow-hidden rounded-[1.7rem] relative">
                  <img src="/images/Screenshot_20260426_235650.jpg.jpeg" alt="App screen" className="w-full h-full object-cover object-bottom scale-[1.1] translate-y-[2%]" />
                </div>
              </div>
            </motion.div>

            {/* Right phone */}
            <motion.div
              initial={{ opacity: 0, x: "-20%", y: 80, rotateZ: 0 }}
              animate={{ opacity: 1, x: "65%", y: 50, rotateZ: 10 }}
              transition={{ duration: 1, delay: 0.6, ease: smoothEase }}
              className="absolute top-0 w-[160px] sm:w-[200px] md:w-[230px] z-10"
            >
              <div className="rounded-[2rem] p-1.5 bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700">
                <div className="w-full aspect-[9/19.5] overflow-hidden rounded-[1.7rem] relative">
                  <img src="/images/Screenshot_20260427_000920.jpg.jpeg" alt="App screen" className="w-full h-full object-cover object-bottom scale-[1.1] translate-y-[2%]" />
                </div>
              </div>
            </motion.div>

            {/* Centre phone (front) */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ duration: 1, delay: 0.7, ease: smoothEase }}
              className="absolute top-0 w-[180px] sm:w-[230px] md:w-[260px] z-20"
            >
              <div className="rounded-[2.2rem] p-1.5 bg-slate-900 shadow-2xl border border-slate-700">
                <div className="w-full aspect-[9/19.5] overflow-hidden rounded-[1.9rem] relative">
                  <img src="/images/Screenshot_20260426_235735.jpg.jpeg" alt="App screen" className="w-full h-full object-cover object-bottom scale-[1.1] translate-y-[2%]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-300 dark:text-slate-600 cursor-pointer z-50"
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

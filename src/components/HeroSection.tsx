import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Send, UserCheck, FileText, CheckCircle, Smartphone } from 'lucide-react';
import videoBg from '../assets/ai vid.mp4';

const workflowSteps = [
  { icon: Send, label: 'Submit Project', color: '#0B5FFF' },
  { icon: UserCheck, label: 'Partner Accepts', color: '#4F8CFF' },
  { icon: FileText, label: 'Execution', color: '#6366f1' },
  { icon: CheckCircle, label: 'Completed', color: '#10b981' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollY } = useScroll();

  // Scroll mapping: scale down and add rounded edges
  const scale = useTransform(scrollY, [0, 450], [1, isMobile ? 0.96 : 0.94]);
  const borderRadius = useTransform(scrollY, [0, 450], ["0px", isMobile ? "24px" : "48px"]);
  const margin = useTransform(scrollY, [0, 450], ["0px", isMobile ? "12px" : "24px"]);

  return (
    <section className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-center overflow-hidden bg-white">
      {/* Morphing Background Container */}
      <motion.div
        style={{
          scale,
          borderRadius,
          left: margin,
          right: margin,
          top: 0,
          bottom: margin,
        }}
        className="absolute inset-0 overflow-hidden z-0 pointer-events-none origin-top bg-gradient-to-br from-[#0B1D40] via-[#0a1628] to-[#061024]"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-focsera-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-16 items-center min-h-[calc(100vh-160px)]">

          {/* LEFT — Text */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-blue-300 text-[11px] font-semibold tracking-wide mb-6 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              India's Execution Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="text-[2.2rem] leading-[1.2] sm:text-[3.2rem] md:text-[3.6rem] lg:text-[3.8rem] xl:text-[4.5rem] font-serif font-semibold tracking-[-0.01em] text-white mb-6"
            >
              One Platform to{' '}
              <span className="bg-gradient-to-r from-[#D4B87A] via-[#C9A96E] to-amber-300 bg-clip-text text-transparent">
                Build, Celebrate
              </span>{' '}
              & Grow.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="text-base sm:text-lg text-slate-400 max-w-xl mb-10 leading-[1.8] font-light"
            >
              From birthday celebrations and business launches to school programs and home transformations, Focsera connects you with trusted professionals who manage every step from planning to execution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <a
                href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-primary"
                className="flex items-center justify-center gap-2.5 bg-focsera-primary hover:bg-blue-600 text-white font-semibold text-[15px] px-7 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <Smartphone size={17} />
                Get the Focsera App
                <ArrowRight size={16} />
              </a>
              <button
                onClick={() => document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.10] text-white/90 font-medium text-[15px] px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                Explore Solutions
                <ChevronDown size={16} />
              </button>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mt-8 flex items-center gap-2 text-[12px] text-slate-500"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Currently serving Hyderabad
            </motion.div>
          </div>

          {/* RIGHT — Person Image & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="hidden lg:flex justify-end items-end relative w-full h-[65vh] max-h-[580px]"
          >
            {/* Glow background */}
            <div className="absolute right-10 bottom-12 w-[360px] h-[360px] rounded-full bg-blue-500/10 blur-3xl -z-10" />

            {/* Person image */}
            <img
              src="/images/2.png"
              alt="Focsera Execution"
              className="w-auto h-full object-contain object-bottom drop-shadow-2xl z-10 animate-float"
            />

            {/* Floating glass badge 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-8 top-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-xl z-20 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Send size={15} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-blue-300 font-semibold tracking-wider uppercase">Step 01</div>
                <div className="text-xs font-bold text-white">Share Project</div>
              </div>
            </motion.div>

            {/* Floating glass badge 2 */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-0 top-36 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-xl z-20 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <UserCheck size={15} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-purple-300 font-semibold tracking-wider uppercase">Step 02</div>
                <div className="text-xs font-bold text-white">Meet Expert</div>
              </div>
            </motion.div>

            {/* Floating glass badge 3 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 bottom-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 shadow-xl z-20 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle size={15} />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">Step 03</div>
                <div className="text-xs font-bold text-white">Execution Managed</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 cursor-pointer z-10"
        onClick={() => document.getElementById('trust')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}

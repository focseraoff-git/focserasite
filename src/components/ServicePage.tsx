import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageSquare, Check, HelpCircle, Sparkles, Star, Shield, Zap, Layers, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface TrustPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PackageItem {
  name: string;
  subtitle?: string;
  timeline?: string;
  guests?: string;
  whatsIncluded: string[];
  isPopular?: boolean;
}

export interface AddonItem {
  name: string;
  description: string;
}

export interface ServicePageData {
  // Hero
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroIcon: LucideIcon;
  heroVideoPath?: string;

  // Services
  services: ServiceItem[];

  // Packages (PDF packages show on screen)
  packages?: PackageItem[];
  addons?: AddonItem[];

  // Process
  processSteps: ProcessStep[];

  // Trust / Why Choose
  trustPoints: TrustPoint[];

  // CTA
  ctaTitle: string;
  ctaDescription: string;
  pdfPath?: string;
  pdfLabel?: string;

  // WhatsApp
  whatsappMessage: string;
  packageCategories?: {
    title: string;
    packages: PackageItem[];
  }[];
}

interface ServicePageProps {
  data: ServicePageData;
}

export default function ServicePage({ data }: ServicePageProps) {
  const HeroIcon = data.heroIcon;
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
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
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden relative">

      {/* Premium SVG Grid & Dots overlay (Vercel/Linear style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1.5px,transparent_1.5px)] bg-[size:4.5rem_4.5rem] pointer-events-none opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1.5px,transparent_1.5px)] [background-size:2.25rem_2.25rem] opacity-60 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_100%)]" />

      {/* Ambient Radial Lights (Luxurious soft pastel overlays) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[25%] left-[5%] w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[165px] pointer-events-none" />

      {/* ══ HERO ══ */}
      <section className="relative min-h-[100svh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5 bg-transparent pt-20 sm:pt-24 lg:pt-0">
        {data.heroVideoPath && (
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
            <video
              src={data.heroVideoPath}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-[0.4]"
            />
            {/* Ambient Dark/Glow Overlay for readability */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[0.5px]" />
          </motion.div>
        )}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Micro Pill Tag */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full backdrop-blur-md mb-8 bg-white/5 border border-white/10 text-sky-300 shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                  <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-sky-400"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400"></span>
                  </span>
                  <HeroIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-350">
                    {data.heroTag}
                  </span>
                </div>

                {/* Styled Typography Title */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] leading-[0.98] mb-8 text-white">
                  {data.heroTitle.split(' ').map((word, i) => (
                    <span key={i} className={i === 2 || i === 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-350" : ""}>
                      {word}{' '}
                    </span>
                  ))}
                </h1>

                <p className="text-base sm:text-lg font-light leading-relaxed max-w-xl mb-12 text-slate-400">
                  {data.heroSubtitle}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                  {data.heroTag === 'Focsera Learn' ? (
                    <a
                      href={`https://wa.me/919515803954?text=${encodeURIComponent(data.whatsappMessage || "Hi Focsera! We're interested in your school programs.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Chat on WhatsApp</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <a
                      href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transform hover:-translate-y-0.5"
                    >
                      <span>Book on Focsera App</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  )}
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 font-semibold text-sm rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-200"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    <span>Talk to Us</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Premium Dynamic Interactive Panel (Brings the hand-crafted feel) */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <div className="bg-[#090e24]/40 backdrop-blur-2xl rounded-[23px] p-8 border border-white/5">
                  {/* Panel Top bar */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Execution Control</span>
                  </div>

                  {/* Mock Stats/Data */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Vetted Experts Only</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Vetting pass rate: 4.8%</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Active</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Managed Milestone Delivery</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">End-to-end quality controls</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Secure</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-sky-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">Transparent Invoicing</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">Zero hidden/unexpected pricing</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-1 rounded-md uppercase tracking-wider">Aligned</span>
                    </div>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-450">Total Partners Active</span>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[12px] font-extrabold text-white">80+ verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ CAPABILITIES (Futuristic Bento Grid Layout) ══ */}
      <section className="py-24 sm:py-32 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 sm:mb-24"
          >
            <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em] mb-4">
              CAPABILITIES
            </p>
            <h2 className="text-3xl sm:text-6xl font-extrabold tracking-[-0.04em] leading-tight text-white mb-6">
              Our Core Capabilities
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              Focsera handles everything from expert matching to end-to-end execution. Explore the solutions built for your next milestone.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {data.services.map((service, i) => {
              const Icon = service.icon;

              let bentoSpan = "col-span-1";
              if (i === 0) bentoSpan = "col-span-1 lg:col-span-2 row-span-1";
              else if (i === 3) bentoSpan = "col-span-1 lg:row-span-2";
              else if (i === 5) bentoSpan = "col-span-1 lg:col-span-2 row-span-1";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`group relative overflow-hidden rounded-3xl p-[1px] transition-all duration-500 transform hover:-translate-y-1.5 bg-gradient-to-b from-white/10 to-transparent hover:from-sky-500/25 hover:to-indigo-500/20 ${bentoSpan}`}
                >
                  <div className="w-full h-full bg-white/2 rounded-[23px] p-8 flex flex-col justify-between min-h-[230px] relative overflow-hidden border border-white/5 group-hover:border-white/15 transition-all duration-500 shadow-sm shadow-slate-950/60">

                    <div className="absolute -top-12 -left-12 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all duration-500 pointer-events-none" />

                    <div>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-blue-500/25 group-hover:to-indigo-500/25 transition-all duration-300">
                        <Icon className="w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-colors" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-sky-450 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-400 leading-relaxed font-light">
                        {service.description}
                      </p>
                    </div>

                    <span className="absolute right-6 bottom-4 text-6xl font-black text-white opacity-[0.03] group-hover:opacity-[0.08] tracking-tighter select-none transition-opacity duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PACKAGES (Futuristic Dashboard layout comparing packages) ══ */}
      {((data.packages && data.packages.length > 0) || (data.packageCategories && data.packageCategories.length > 0)) && (
        <section className="py-24 sm:py-32 bg-transparent border-t border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em] mb-4">
                PACKAGES
              </p>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
                Choose Your Strategy
              </h2>
            </motion.div>

            {/* Premium Category Switcher if category tabs exist */}
            {data.packageCategories && data.packageCategories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-lg mx-auto">
                {data.packageCategories.map((cat, ci) => (
                  <button
                    key={ci}
                    onClick={() => setSelectedCategoryIndex(ci)}
                    className={`flex-1 min-w-[140px] px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${selectedCategoryIndex === ci
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10 scale-[1.03] border border-blue-500'
                      : 'bg-white/5 text-slate-350 hover:text-white border border-white/10 hover:border-white/20 shadow-sm'
                      }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            )}

            {/* Premium Tab Swapper for Mobile/Tablet or Grid layout on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
              {(data.packageCategories && data.packageCategories.length > 0
                ? data.packageCategories[selectedCategoryIndex].packages
                : data.packages || []
              ).map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative rounded-3xl p-[1px] transition-all duration-500 transform hover:-translate-y-2.5 ${pkg.isPopular
                    ? 'bg-gradient-to-b from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_25px_60px_rgba(59,130,246,0.15)]'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="w-full h-full bg-slate-950/80 rounded-[23px] p-8 flex flex-col justify-between relative border border-white/5">

                    {pkg.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[9px] font-black uppercase tracking-[0.25em] px-5 py-1.5 rounded-full shadow-md border border-blue-400/40 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-cyan-200" />
                        <span>Most Popular</span>
                      </div>
                    )}

                    <div>
                      {/* Header */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-black tracking-tight mb-2 text-white">
                          {pkg.name}
                        </h3>
                        {pkg.subtitle && (
                          <p className={`text-[10px] font-black leading-relaxed tracking-[0.15em] uppercase ${pkg.isPopular ? 'text-sky-400' : 'text-slate-400'}`}>
                            {pkg.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Timelines and Capacity indicators */}
                      {(pkg.timeline || pkg.guests) && (
                        <div className="flex flex-wrap gap-2.5 mb-8">
                          {pkg.timeline && (
                            <span className="inline-flex items-center text-[10px] font-extrabold px-3 py-1.5 rounded-xl border bg-white/5 text-sky-400 border-white/10">
                              ⏱️ {pkg.timeline}
                            </span>
                          )}
                          {pkg.guests && (
                            <span className="inline-flex items-center text-[10px] font-extrabold px-3 py-1.5 rounded-xl border bg-white/5 text-sky-350 border-white/10">
                              👥 {pkg.guests}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Line divider */}
                      <div className="h-px bg-white/5 w-full mb-8" />

                      {/* What's Included */}
                      <ul className="space-y-4 mb-8">
                        {pkg.whatsIncluded.map((item, idx) => (
                          <li key={idx} className="flex gap-3.5 items-start">
                            <div className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/25 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                              <Check className="w-3.5 h-3.5 text-sky-450" />
                            </div>
                            <span className="text-[13px] leading-relaxed font-medium text-slate-350">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Button */}
                    <div className="mt-auto">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-black text-xs tracking-[0.15em] uppercase transition-all duration-300 ${pkg.isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white hover:from-blue-500 hover:to-sky-450 shadow-lg shadow-blue-500/25'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                          }`}
                      >
                        Book on Focsera App
                      </a>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Add-ons Expansions */}
            {data.addons && data.addons.length > 0 && (
              <div className="mt-24 pt-20 border-t border-white/5">
                <h3 className="text-sm font-extrabold text-sky-400 uppercase tracking-[0.25em] mb-10 text-center">
                  ADD-ON EXPANSIONS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {data.addons.map((addon, idx) => (
                    <div key={idx} className="p-6 rounded-3xl bg-white/2 border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all duration-400 flex items-start gap-4 shadow-sm shadow-slate-950/50">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                        <HelpCircle className="w-5 h-5 text-sky-400" />
                      </div>
                      <div>
                        <h4 className="text-[14.5px] font-bold text-white tracking-tight mb-1.5">
                          {addon.name}
                        </h4>
                        <p className="text-[12.5px] text-slate-400 leading-relaxed font-light">
                          {addon.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ PROCESS ══ */}
      <section className="py-24 sm:py-32 relative bg-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em] mb-4">
              PROCESS
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] text-white">
              End-To-End Execution
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-[1.5px] bg-white/5 z-0" />

            {data.processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative text-center z-10"
              >
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/30 flex items-center justify-center mx-auto mb-6 shadow-sm transition-all duration-300">
                  <span className="text-2xl font-black text-sky-400">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[13px] text-slate-400 leading-relaxed font-light">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section className="py-24 sm:py-32 bg-transparent border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-[11px] font-black text-sky-400 uppercase tracking-[0.3em] mb-4">
              WHY FOCSERA
            </p>
            <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.03em] text-white">
              The Execution Standard
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {data.trustPoints.map((point, i) => {
              const Icon = point.icon;

              let trustSpan = "col-span-1";
              if (i === 0 || i === 3) trustSpan = "col-span-1 lg:col-span-2";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={`group relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-sky-500/25 hover:to-indigo-500/20 transition-all duration-500 ${trustSpan}`}
                >
                  <div className="w-full h-full bg-white/2 rounded-[23px] p-7 flex gap-5 items-start border border-white/5 group-hover:border-white/15 transition-all duration-500 shadow-sm shadow-slate-950/60">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-300 shadow-inner">
                      <Icon className="w-5 h-5 text-sky-450 group-hover:text-sky-300 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-sky-400 transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-[13px] text-slate-400 leading-relaxed font-light">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-b from-[#090e24] to-[#020617] rounded-3xl p-10 sm:p-16 text-center overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.03em] leading-tight mb-6">
                {data.ctaTitle}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-10 max-w-xl mx-auto font-light">
                {data.ctaDescription}
              </p>

              <div className="flex justify-center">
                {data.heroTag === 'Focsera Learn' ? (
                  <a
                    href={`https://wa.me/919515803954?text=${encodeURIComponent(data.whatsappMessage || "Hi Focsera! We're interested in your school programs.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat with Schools Team</span>
                  </a>
                ) : (
                  <a
                    href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-10 py-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-sm rounded-xl hover:from-blue-500 hover:to-sky-400 transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transform hover:-translate-y-0.5"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Book on Focsera App</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

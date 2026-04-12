import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Download, MonitorPlay, Brain, Rocket, Cpu, 
  ImageIcon, Award, CheckCircle2, ArrowRight, BookOpen, Layers, Zap, Clock, Users, Calendar
} from 'lucide-react';

export default function Labs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Ultra-Smooth "Apple-like" Cubic Bezier Easing
  const smoothEase = [0.23, 1, 0.32, 1] as any;
  const standardTransition = { duration: 0.8, ease: smoothEase };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: standardTransition
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden pt-24">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Deep Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none opacity-60 mix-blend-screen"></motion.div>
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-12 pb-24 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: smoothEase }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <Zap size={14} className="fill-orange-400" />
              Powered by Focsera Technologies
            </div>

            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white tracking-tighter mb-6 leading-none">
              Focsera <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600">Labs.</span>
            </h1>
            
            <p className="text-2xl sm:text-3xl text-slate-300 font-light max-w-4xl mx-auto mb-6 tracking-tight leading-tight">
              A year-long Future Skills Program that turns 
              <br className="hidden sm:block" />
              <span className="text-white font-medium"> Saturdays into creator academies.</span>
            </p>

            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
              For Classes 6–12. Students learn <span className="text-slate-200 font-semibold">Design, Video Editing, AI Tools, Podcasting, and Entrepreneurship</span> — delivered by trained professionals, directly in your school.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a 
                href="#partner"
                className="group relative px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                <span className="relative z-10 flex items-center gap-2">
                  Partner Your School <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <a 
                href="/docs/Labs_Mini_Handbook.pdf"
                download="Focsera_Labs_Mini_Handbook_2025.pdf"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                <Download size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                Download Handbook
              </a>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: smoothEase }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-24"
          >
            {[
              { icon: Calendar, label: "Total Events", value: "60" },
              { icon: Users, label: "Grade Groups", value: "3" },
              { icon: Layers, label: "Terms / Year", value: "4" },
              { icon: Clock, label: "Hours per Session", value: "4" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col items-center backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                <stat.icon size={24} className="text-orange-500 mb-4 opacity-80" />
                <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- THE VISION SECTION --- */}
      <section className="py-32 relative bg-slate-950 border-t border-white/5 z-20">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={standardTransition}
            >
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
                Our Vision
              </h2>
              <div className="text-2xl sm:text-3xl text-orange-400 font-light leading-snug mb-8 border-l-4 border-orange-500 pl-6">
                "To make every student in India <strong className="text-white font-bold">digitally skilled, creatively confident, and career-ready</strong> before they graduate — not after."
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Schools want to offer skill programs but lack trainers, content, tools, and execution capacity. Students want to learn real skills but don't know where to start. 
              </p>
              <p className="text-slate-300 text-lg font-medium leading-relaxed">
                Focsera Labs solves this. We handle everything end-to-end. <br/><strong className="text-white">Zero effort from the school. Zero cash outflow from your operational budget.</strong>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={standardTransition}
              className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900/50 p-8 sm:p-12 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] rounded-full pointer-events-none"></div>
              <h3 className="text-2xl font-bold text-white mb-8">What Schools Provide</h3>
              <ul className="space-y-6">
                {[
                  "A computer lab with basic WiFi access on Saturdays.",
                  "A school Point of Contact (POC) for coordination.",
                  "Collection of the program fee directly from parents at admission.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 size={24} className="text-orange-500 shrink-0 mt-1" />
                    <span className="text-slate-300 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 pt-8 border-t border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">What We Provide</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Vetted Professional Trainers",
                    "Full Curriculum & Content",
                    "Session Coordinators",
                    "Photography & Reels",
                    "Certificates & Badges",
                    "Annual Showcase Event",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- THREE TRACKS SECTION --- */}
      <section className="py-32 relative bg-slate-900 border-t border-white/5">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={standardTransition}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl font-black text-white mb-6 tracking-tighter">Three Learning Tracks</h2>
            <p className="text-xl text-slate-400">Built specifically for the developmental stage of the students. 20 sessions per track.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Track 1 */}
            <motion.div variants={itemVariants} className="group relative bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-10 overflow-hidden hover:bg-white/[0.04] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] group-hover:bg-blue-500/30 transition-colors"></div>
              <div className="text-sm font-bold text-blue-400 tracking-widest uppercase mb-2">Category 01</div>
              <h3 className="text-3xl font-bold text-white mb-2">Creative Exploration</h3>
              <div className="text-slate-400 font-medium mb-8 pb-8 border-b border-white/10">Classes 6 & 7</div>
              
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> Canva Poster Design</div>
                <div className="flex items-center gap-3"><ImageIcon size={18} className="text-slate-500 shrink-0" /> Phone Photography</div>
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> 30-Second Story Reels</div>
                <div className="flex items-center gap-3"><Brain size={18} className="text-slate-500 shrink-0" /> Intro to AI Prompts</div>
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> Stop Motion Animation</div>
              </div>
            </motion.div>

            {/* Track 2 */}
            <motion.div variants={itemVariants} className="group relative bg-white/[0.02] border border-orange-500/20 rounded-[2rem] p-10 overflow-hidden hover:bg-white/[0.04] transition-all duration-500 ring-1 ring-orange-500/10 shadow-[0_0_30px_rgba(249,115,22,0.05)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-[60px] group-hover:bg-orange-500/30 transition-colors"></div>
              <div className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full rotate-12 shadow-lg">Most Popular</div>
              <div className="text-sm font-bold text-orange-400 tracking-widest uppercase mb-2">Category 02</div>
              <h3 className="text-3xl font-bold text-white mb-2">Skill Development</h3>
              <div className="text-slate-400 font-medium mb-8 pb-8 border-b border-white/10">Classes 8, 9 & 10</div>
              
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> CapCut Pro Video Editing</div>
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> UI/UX Design in Figma</div>
                <div className="flex items-center gap-3"><Brain size={18} className="text-slate-500 shrink-0" /> AI Tools Masterclass</div>
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> Real Podcast Recording</div>
                <div className="flex items-center gap-3"><Rocket size={18} className="text-slate-500 shrink-0" /> Brand Identity Design</div>
              </div>
            </motion.div>

            {/* Track 3 */}
            <motion.div variants={itemVariants} className="group relative bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-10 overflow-hidden hover:bg-white/[0.04] transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[60px] group-hover:bg-purple-500/30 transition-colors"></div>
              <div className="text-sm font-bold text-purple-400 tracking-widest uppercase mb-2">Category 03</div>
              <h3 className="text-3xl font-bold text-white mb-2">Career Launch</h3>
              <div className="text-slate-400 font-medium mb-8 pb-8 border-b border-white/10">Classes 11 & 12</div>
              
              <div className="space-y-4 text-slate-300">
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> Cinematic DaVinci Editing</div>
                <div className="flex items-center gap-3"><Rocket size={18} className="text-slate-500 shrink-0" /> Freelancing Basics</div>
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> LinkedIn & Portfolio Setup</div>
                <div className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-500 shrink-0" /> Startup Pitching</div>
                <div className="flex items-center gap-3"><Award size={18} className="text-slate-500 shrink-0" /> TEDx-Style Public Speaking</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- SESSION FRAMEWORK --- */}
      <section className="py-32 relative bg-slate-950 border-t border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={standardTransition}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4 block">The Focsera Framework</span>
            <h2 className="text-5xl font-black text-white mb-6">4 Hours. Every Saturday.</h2>
            <p className="text-xl text-slate-400">Every session follows the exact same structure. What changes is the depth and the topic.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...standardTransition, delay: 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors"
            >
              <div className="text-4xl font-black text-white mb-2">1. TEACH</div>
              <div className="text-orange-500 font-bold mb-6">60 Minutes</div>
              <p className="text-slate-400 leading-relaxed text-lg">
                Live skill demonstration with real before/after examples. The trainer explains the 'why', not just the 'how'. Visual, fast-paced — no passive PowerPoint slides.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...standardTransition, delay: 0.2 }}
              className="bg-blue-900/20 border border-blue-500/30 rounded-[2rem] p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="text-4xl font-black text-white mb-2">2. PRACTICE</div>
                <div className="text-blue-400 font-bold mb-6 text-lg">150 Minutes</div>
                <p className="text-blue-100/80 leading-relaxed text-lg">
                  Guided exercise followed by independent creation. Trainer steps back and coaches one-to-one. Every single student builds a real, finished output.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...standardTransition, delay: 0.3 }}
              className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors"
            >
              <div className="text-4xl font-black text-white mb-2">3. COMPETE</div>
              <div className="text-green-500 font-bold mb-6">30 Minutes</div>
              <p className="text-slate-400 leading-relaxed text-lg">
                Best work displayed on the projector and peer-judged. Winner announced. Badges and certificates distributed. One WOW moment every session.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...standardTransition, delay: 0.5 }}
            className="mt-16 bg-slate-900 border border-slate-800 rounded-[2rem] p-8 text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-center"
          >
            <BookOpen size={40} className="text-orange-500 shrink-0" />
            <p className="text-xl text-slate-300 font-medium text-left">
              <strong className="text-white">Output-Based, Not Exam-Based:</strong> Focsera Labs uses no written exams. Students are evaluated purely on the portfolios they build over the year.
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-32 relative bg-slate-900 border-t border-slate-800" id="plans">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-black text-white mb-6">Subscription Plans</h2>
            <p className="text-xl text-slate-400 mb-8">Transparent pricing designed to fit different school budgets.</p>
            <div className="text-lg text-slate-300 bg-slate-950 px-8 py-5 rounded-2xl inline-block border border-slate-800 shadow-xl">
              <strong className="text-white">Zero cash outflow from the school budget.</strong> The program fee can be collected directly from parents at admission.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Basic */}
            <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-10 flex flex-col hover:border-slate-700 transition-colors">
              <div className="text-2xl font-bold text-white mb-2">Basic Starter</div>
              <div className="text-slate-400 text-sm mb-6 h-10">Best for short pilots and trials.</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sessions</div>
              <div className="text-5xl font-black text-white mb-8 pb-8 border-b border-slate-800">5 <span className="text-xl text-slate-600 font-medium tracking-normal">/ year</span></div>
              
              <ul className="space-y-4 flex-1 mb-8">
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-green-500 shrink-0" /> Trained Trainer + Content</li>
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-green-500 shrink-0" /> Posters & Marketing</li>
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-green-500 shrink-0" /> Session Certificates</li>
              </ul>
              
              <div className="mt-auto pt-6 border-t border-slate-800">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Fee per student</div>
                <div className="text-3xl font-bold text-white">₹1,500 – 2,000</div>
              </div>
            </div>

            {/* Standard */}
            <div className="relative bg-gradient-to-b from-blue-900/40 to-slate-950 border border-blue-500/50 rounded-[2rem] p-10 flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.15)] transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white font-bold px-6 py-2 rounded-full text-sm shadow-xl">Most Popular</div>
              <div className="text-2xl font-bold text-white mb-2 mt-4">Standard Skill</div>
              <div className="text-blue-200/60 text-sm mb-6 h-10">The complete academic year experience.</div>
              <div className="text-xs font-bold text-blue-400/80 uppercase tracking-widest mb-2">Sessions</div>
              <div className="text-6xl font-black text-white mb-8 pb-8 border-b border-blue-500/20">15 <span className="text-xl text-blue-200/40 font-medium tracking-normal">/ year</span></div>
              
              <ul className="space-y-4 flex-1 mb-8">
                <li className="flex items-center gap-3 text-slate-200 text-lg"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> <span className="font-bold text-white">Everything in Basic</span></li>
                <li className="flex items-center gap-3 text-slate-200 text-lg"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> Professional Photography</li>
                <li className="flex items-center gap-3 text-slate-200 text-lg"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> Social Media Reels</li>
                <li className="flex items-center gap-3 text-slate-200 text-lg"><CheckCircle2 size={20} className="text-blue-400 shrink-0" /> Competitions & Badges</li>
              </ul>
              
              <div className="mt-auto pt-6 border-t border-blue-500/20">
                <div className="text-xs text-blue-300 font-bold uppercase mb-1">Fee per student</div>
                <div className="text-4xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">₹3,000 <span className="text-3xl text-blue-300 font-bold"> - 3,500</span></div>
              </div>
            </div>

            {/* Premium */}
            <div className="bg-slate-950 border border-slate-800 rounded-[2rem] p-10 flex flex-col hover:border-slate-700 transition-colors">
              <div className="text-2xl font-bold text-white mb-2">Premium Innovation</div>
              <div className="text-slate-400 text-sm mb-6 h-10">For innovation leaders looking for maximum impact.</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Sessions</div>
              <div className="text-5xl font-black text-white mb-8 pb-8 border-b border-slate-800">20 <span className="text-xl text-slate-600 font-medium tracking-normal">/ year</span></div>
              
              <ul className="space-y-4 flex-1 mb-8">
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> <span className="font-bold text-white">Everything in Standard</span></li>
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Professional Videography</li>
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Annual Showcase Event</li>
                <li className="flex items-center gap-3 text-slate-300 text-lg"><CheckCircle2 size={20} className="text-orange-500 shrink-0" /> Free Physical Branding Kit</li>
              </ul>
              
              <div className="mt-auto pt-6 border-t border-slate-800">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">Fee per student</div>
                <div className="text-3xl font-bold text-white">₹4,500 – 5,000</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 relative bg-slate-950 overflow-hidden" id="partner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-orange-900/30 via-slate-950 to-slate-950"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl sm:text-7xl font-black text-white mb-8 tracking-tighter">
            Let's build the future of education together.
          </h2>
          <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Schedule a walkthrough, run a free pilot session, and see the student response firsthand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact"
              className="px-10 py-5 bg-orange-500 text-white rounded-full font-bold text-xl hover:bg-orange-600 transition-all hover:scale-105 shadow-[0_0_40px_rgba(249,115,22,0.4)] w-full sm:w-auto"
            >
              Get In Touch Today
            </Link>
            <a 
              href="/docs/Labs_Mini_Handbook.pdf"
              download="Focsera_Labs_Mini_Handbook_2025.pdf"
              className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold text-xl hover:bg-white/10 transition-all w-full sm:w-auto flex justify-center items-center gap-3"
            >
              <BookOpen size={24} />
              Read The Full Handbook
            </a>
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12 text-slate-400 font-medium text-lg bg-slate-900/50 p-6 rounded-2xl max-w-2xl mx-auto border border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-slate-500">Phone:</span>
              <a href="tel:+919515803954" className="text-white hover:text-orange-400 transition-colors">+91 9515803954</a>
            </div>
            <div className="w-px h-6 bg-slate-700 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500">Email:</span>
              <a href="mailto:collab.focsera@gmail.com" className="text-white hover:text-orange-400 transition-colors">collab.focsera@gmail.com</a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

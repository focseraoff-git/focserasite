import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles, Terminal, Trophy, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import videoSrc from '../../../components/PROMPTXfinale.mp4';
import { DoodleSparkle } from './BeyondDoodles';

interface BeyondGalleryProps {
  onEnquireProgram?: (program: string) => void;
}

export const BeyondGallery: React.FC<BeyondGalleryProps> = ({ onEnquireProgram }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FFF9EF] relative border-t-2 border-[#35102F]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7EB49] border border-[#35102F]" />
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#35102F]/70">
              The Beyond Experience
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#35102F] tracking-tight leading-[1.05] beyond-font-heading">
            <span>Inside our</span>{' '}
            <span className="beyond-font-serif italic font-normal text-[#35102F] block sm:inline">
              workshops & events.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#35102F]/75 beyond-font-sans font-normal max-w-xl">
            Real video footage from our PromptX flagship session, captured live in vertical reel format, alongside official curriculum blueprints.
          </p>
        </div>

        {/* Featured Video Showcase: 9:16 Vertical Reel Player + Editorial Context */}
        <div className="mb-16 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: 9:16 Vertical Video Player (Reel / Mobile Format) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[36px] bg-[#35102F] border-2 border-[#35102F] overflow-hidden shadow-[8px_12px_0px_#35102F] group">

                {/* 9:16 Aspect Ratio Container */}
                <div className="relative aspect-[9/16] w-full bg-black overflow-hidden flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    playsInline
                    loop
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full h-full object-cover"
                    poster="/images/logos/PromptX.jpg"
                  />

                  {/* Play/Pause clickable overlay */}
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 z-10 cursor-pointer flex flex-col items-center justify-center"
                  >
                    {!isPlaying && (
                      <div className="p-5 rounded-full bg-[#C7EB49] border-2 border-[#35102F] shadow-[4px_6px_0px_#35102F] hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-[#35102F] fill-[#35102F] ml-1" />
                      </div>
                    )}
                  </div>

                  {/* Top Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#35102F]/80 text-[#C7EB49] border border-[#C7EB49]/30 text-xs font-black uppercase tracking-wider backdrop-blur-md">
                      <Film className="w-3.5 h-3.5" /> PromptX Live Reel
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono backdrop-blur-md border border-white/20">
                      9:16 HD
                    </span>
                  </div>

                  {/* Bottom Video Progress Scrub Line */}
                  <div className="absolute bottom-16 left-4 right-4 z-20">
                    <div
                      className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!videoRef.current) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const ratio = clickX / rect.width;
                        videoRef.current.currentTime = ratio * videoRef.current.duration;
                      }}
                    >
                      <div
                        className="h-full bg-[#C7EB49] transition-all duration-150"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Reel Control Bar */}
                  <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#C7EB49] hover:text-[#35102F] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFullscreen();
                      }}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Fullscreen"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Editorial Context & Official Program Collateral */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#EDE2FA] text-[#35102F] text-xs font-black uppercase tracking-wider rounded-full border border-[#35102F]">
                  Real Session Archive
                </span>
                <span className="text-xs font-mono text-[#35102F]/60 uppercase tracking-widest">
                  Verified Video
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black text-[#35102F] leading-tight beyond-font-heading">
                PromptX AI Workshop Finale
              </h3>

              <p className="mt-4 text-base sm:text-lg text-[#35102F]/80 leading-relaxed beyond-font-sans font-normal">
                Watch students explore prompt engineering, safe AI workflows, and live creative tools in an immersive, high-energy classroom session. No dry lectures — pure experimentation from start to finish.
              </p>

              {/* Key Features Observed in the Session */}
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#35102F]/15 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#35102F] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#35102F]">
                    <strong className="font-bold block">Live Student Interaction & Prompting</strong>
                    Participants learn role-based prompt engineering and practical AI tools for academic presentations.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#35102F]/15 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#35102F] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#35102F]">
                    <strong className="font-bold block">Safe & Ethical AI Framework</strong>
                    Instructing middle & high-school learners on digital safety, verification, and academic integrity.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#35102F]/15 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#35102F] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#35102F]">
                    <strong className="font-bold block">Accredited Materials & Completion Kits</strong>
                    Physical learning materials, activity workbooks, and verifiable certificates for every participant.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => onEnquireProgram?.('PromptX AI Workshop (1-Day)')}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#C7EB49] text-[#35102F] font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[3px_4px_0px_#35102F] hover:shadow-[1px_2px_0px_#35102F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book PromptX for Your School</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="/images/Focsera_School_Pitch.pdf"
                  download
                  className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#35102F] font-bold text-xs uppercase tracking-wider rounded-2xl border-2 border-[#35102F] text-center hover:bg-[#EDE2FA] transition-colors"
                >
                  Download Pitch PDF ↗
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Genuine Event Artwork & Branded Graphic Editorial Cards (Zero Mock Images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Genuine Item 1: Real PromptX Official Poster Artwork */}
          <div className="rounded-3xl border-2 border-[#35102F] bg-white overflow-hidden shadow-[4px_6px_0px_#35102F] hover:shadow-[6px_10px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col group">
            <div className="relative aspect-[4/3] bg-[#35102F] overflow-hidden flex items-center justify-center">
              <img
                src="/images/logos/PromptX.jpg"
                alt="PromptX Official Event Poster"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#C7EB49] text-[#35102F] text-[10px] font-black uppercase tracking-wider border border-[#35102F]">
                Official Poster
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#35102F]/60 block mb-1">
                  Workshop Blueprint
                </span>
                <h4 className="text-base font-black text-[#35102F] beyond-font-heading">
                  PromptX Event Series
                </h4>
                <p className="text-xs text-[#35102F]/75 mt-1 beyond-font-sans leading-relaxed">
                  Real program collateral for AI prompt engineering and hands-on LLM exploration.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#35102F]/10 flex items-center gap-1.5 text-[11px] font-bold text-[#35102F]">
                <Film className="w-3.5 h-3.5 text-[#35102F]" />
                <span>Verified Program Asset</span>
              </div>
            </div>
          </div>

          {/* Branded Graphic Card 2: Interactive Prompt Console Composition */}
          <div className="rounded-3xl border-2 border-[#35102F] bg-[#EDE2FA] p-5 shadow-[4px_6px_0px_#35102F] hover:shadow-[6px_10px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between group">
            <div>
              {/* Graphic Composition */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#35102F] text-[#C7EB49] p-3.5 border-2 border-[#35102F] flex flex-col justify-between font-mono text-[11px] mb-4 shadow-[2px_2px_0px_#35102F]">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-white/50">promptx_cli</span>
                </div>
                <div className="space-y-1 py-1 text-white/90">
                  <span className="text-[#C7EB49] block">&gt; system.prompt("engineer")</span>
                  <span className="text-white/70 block">&gt; context: "ethical_ai"</span>
                  <span className="text-emerald-300 block">&gt; output: model.eval() ✓</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-[#C7EB49] flex items-center justify-between">
                  <span>TOKEN_STREAM</span>
                  <span className="animate-pulse">● LIVE</span>
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#35102F]/60 block mb-1">
                Live Simulation
              </span>
              <h4 className="text-base font-black text-[#35102F] beyond-font-heading">
                Interactive Prompt Labs
              </h4>
              <p className="text-xs text-[#35102F]/75 mt-1 beyond-font-sans leading-relaxed">
                Direct student prompting, role parameters, and ethical AI sandboxes without theory drag.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#35102F]/10 flex items-center gap-1.5 text-[11px] font-bold text-[#35102F]">
              <Terminal className="w-3.5 h-3.5 text-[#35102F]" />
              <span>Prompt Sandbox Architecture</span>
            </div>
          </div>

          {/* Branded Graphic Card 3: InnovateX Auction & Battle Composition */}
          <div className="rounded-3xl border-2 border-[#35102F] bg-[#C7EB49] p-5 shadow-[4px_6px_0px_#35102F] hover:shadow-[6px_10px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between group">
            <div>
              {/* Graphic Composition */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-white border-2 border-[#35102F] p-3.5 flex flex-col justify-between mb-4 shadow-[2px_2px_0px_#35102F]">
                <div className="flex items-center justify-between border-b border-[#35102F]/15 pb-1.5">
                  <span className="text-[10px] font-black uppercase text-[#35102F]">IPL Strategy Stage</span>
                  <span className="text-xs">🏏</span>
                </div>
                <div className="space-y-1.5 py-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#35102F] bg-[#EDE2FA] px-2 py-1 rounded-lg">
                    <span>Purse Balance</span>
                    <span className="font-mono">₹ 100 Cr</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-[#35102F] bg-[#FFF9EF] px-2 py-1 rounded-lg">
                    <span>Valuation Matrix</span>
                    <span className="text-[#35102F] font-bold">Risk vs Return</span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded bg-[#35102F] text-white text-[9px] font-bold text-center uppercase tracking-wider">
                  Brand Battle Rounds
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#35102F]/70 block mb-1">
                Summit Competition
              </span>
              <h4 className="text-base font-black text-[#35102F] beyond-font-heading">
                Auction & Strategy Arena
              </h4>
              <p className="text-xs text-[#35102F]/85 mt-1 beyond-font-sans leading-relaxed">
                Competitive financial literacy, fast bidding math, and live campaign pitches on stage.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#35102F]/15 flex items-center gap-1.5 text-[11px] font-bold text-[#35102F]">
              <Trophy className="w-3.5 h-3.5 text-[#35102F]" />
              <span>Flagship Summit Module</span>
            </div>
          </div>

          {/* Branded Graphic Card 4: Portfolio Output Graphic */}
          <div className="rounded-3xl border-2 border-[#35102F] bg-[#F7DCE7] p-5 shadow-[4px_6px_0px_#35102F] hover:shadow-[6px_10px_0px_#35102F] hover:-translate-y-1 transition-all flex flex-col justify-between group">
            <div>
              {/* Graphic Composition */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-white border-2 border-[#35102F] p-3.5 flex flex-col justify-between mb-4 shadow-[2px_2px_0px_#35102F]">
                <div className="flex items-center justify-between border-b border-[#35102F]/15 pb-1.5">
                  <span className="text-[10px] font-black uppercase text-[#35102F]">Output Portfolio</span>
                  <span className="text-xs">🎓</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-2">
                  <div className="w-10 h-10 rounded-xl bg-[#35102F] text-[#C7EB49] flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#C7EB49]">
                    UI
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#C7EB49] text-[#35102F] border border-[#35102F] flex items-center justify-center font-bold text-xs">
                    🎬
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#EDE2FA] text-[#35102F] border border-[#35102F] flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                </div>
                <div className="px-2 py-1 rounded bg-[#35102F] text-[#FFF9EF] text-[9px] font-bold text-center uppercase tracking-wider">
                  Accredited Digital Certificate
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#35102F]/60 block mb-1">
                Student Outcomes
              </span>
              <h4 className="text-base font-black text-[#35102F] beyond-font-heading">
                Zero-Exam Portfolios
              </h4>
              <p className="text-xs text-[#35102F]/75 mt-1 beyond-font-sans leading-relaxed">
                Tangible outputs, video deliverables, and verified certificates ready for college admissions.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#35102F]/10 flex items-center gap-1.5 text-[11px] font-bold text-[#35102F]">
              <Award className="w-3.5 h-3.5 text-[#35102F]" />
              <span>Accredited Credentials</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BeyondGallery;

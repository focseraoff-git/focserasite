// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

export default function PromptXPopup({ autoShow = true }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!autoShow) return;
    const dismissed = localStorage.getItem('promptx_popup_dismissed');
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, [autoShow]);

  const close = (remember = true) => {
    setOpen(false);
    if (remember) localStorage.setItem('promptx_popup_dismissed', '1');
  };

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => close(false)} />

      <div className="relative z-[100000] max-w-4xl w-full bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — visual */}
          <div className="relative p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-[#0ea5e9] via-[#3b82f6] to-[#6366f1]">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_20%)]" />
            <div className="text-center text-white">
              <div className="text-6xl font-extrabold mb-4">PromptX</div>
              <div className="text-lg mb-6">AI Workshop — Classes 6–10</div>
              <div className="inline-flex items-center gap-3 justify-center">
                <div className="px-4 py-2 bg-white/20 rounded-full text-white font-semibold">Future Skills</div>
                <div className="px-3 py-2 bg-white/10 rounded-full text-white">Hands-on</div>
              </div>
            </div>

            {/* Decorative floating badges */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/5 blur-2xl animate-pulse" />
            <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-white/5 blur-2xl" />
          </div>

          {/* Right — content */}
          <div className="p-8 md:p-12 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-3xl font-extrabold text-white">Join PromptX: AI Workshop</h3>
                <p className="text-sm text-white/80 mt-2">A hands-on workshop to boost academic creativity & productivity using AI tools.</p>
              </div>
              <button onClick={() => close()} aria-label="Close" className="text-white/80 hover:text-white ml-4">✕</button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <ul className="grid grid-cols-2 gap-2 text-white/90">
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Live AI Tool Demos</li>
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Hands-on Tasks</li>
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Certificates for All</li>
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Ethical AI Training</li>
              </ul>

              <div className="pt-2">
                <p className="text-white/80">Eligibility: Classes 6–10 · Fee: <strong>₹149</strong></p>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <Link to="/promptx" className="px-6 py-3 bg-white text-[#0656d8] font-bold rounded-full shadow hover:scale-105 transition-transform">Register Now</Link>
                <a href="#" className="px-4 py-2 border border-white/20 rounded-full text-white/90">Download Brochure</a>
              </div>

              <div className="mt-6 text-xs text-white/60">Limited seats — schools & groups welcome. Click register to view full workshop details and registration form.</div>
            </div>

            <div className="mt-6 flex items-center gap-3 text-white/70">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">AI</div>
              <div>
                <div className="text-sm font-semibold">Powered by Focsera</div>
                <div className="text-xs">Future Skills · School Workshops</div>
              </div>
            </div>

          </div>
        </div>

        {/* Confetti SVG overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/></filter>
          </defs>
        </svg>

      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// [FIX] Removed 'Link' import as react-router-dom is not available
// import { Link } from 'react-router-dom';

export default function PromptXPopup({ autoShow = true, alwaysShow = false }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!autoShow) return;
    // If alwaysShow is true, ignore localStorage and show every time
    if (alwaysShow) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
    const dismissed = localStorage.getItem('promptx_popup_dismissed');
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, [autoShow, alwaysShow]);

  const close = (remember = true) => {
    setOpen(false);
    // Only persist dismissal if we're not in alwaysShow mode
    if (!alwaysShow && remember) localStorage.setItem('promptx_popup_dismissed', '1');
  };

  // Prevent background scroll when modal is open and restore when closed
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous || '';
    };
  }, [open]);

  // Keyboard: ESC to close and simple focus trap
  useEffect(() => {
    if (!open) return;
    const root = modalRef.current;
    const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable: HTMLElement[] = root ? Array.from(root.querySelectorAll(focusableSelector)) as HTMLElement[] : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab') {
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    // focus the modal container or first focusable
    (first ?? root)?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const modal = (
    <div className="fixed inset-0 z-[99999] flex items-start md:items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true">
      {/* --- Backdrop --- */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => close(false)} />

      {/* [STYLE] Enhanced glassmorphism effect: darker, more blur, better border */}
  <div
    ref={modalRef}
    tabIndex={-1}
    style={{ WebkitOverflowScrolling: 'touch' }}
    className="relative z-[100000] w-full max-w-md sm:max-w-2xl md:max-w-4xl bg-gradient-to-br from-gray-900/70 to-gray-800/60 border border-white/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-auto max-h-[90vh]">
        
        {/* [STYLE] New close button: icon-based, rounded, and better position */}
        <button 
          onClick={() => close()} 
          aria-label="Close" 
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* --- Left — visual --- */}
          {/* [STYLE] Added abstract AI icon as background element */}
          <div className="relative p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-[#0ea5e9] via-[#3b82f6] to-[#6366f1] overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_30%)]" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1),transparent_30%)]" />

            {/* [EDIT] Removed the large background SVG icon */}

            <div className="relative z-10 text-center text-white">
              <div className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">PromptX</div>
              <div className="text-sm sm:text-lg mb-6 drop-shadow-md">AI Workshop — Classes 6–10</div>
              <div className="inline-flex items-center gap-3 justify-center">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold">Future Skills</div>
                <div className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white">Hands-on</div>
              </div>
            </div>

            {/* Decorative floating badges */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/5 blur-2xl animate-pulse" />
            <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-white/5 blur-2xl" />
          </div>

          {/* --- Right — content --- */}
          <div className="relative p-6 sm:p-8 md:p-12 bg-gradient-to-b from-white/5 to-transparent">
            
            <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Join PromptX: AI Workshop</h3>
                <p className="text-xs sm:text-sm text-white/80 mt-2">A hands-on workshop to boost academic creativity & productivity using AI tools.</p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-white/90">
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Live AI Tool Demos</li>
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Hands-on Tasks</li>
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Certificates for All</li>
                <li className="flex items-center gap-2"><span className="text-cyan-300">✔</span> Ethical AI Training</li>
              </ul>

              <div className="pt-2">
                <p className="text-white/80">Eligibility: Classes 7–10 · Fee: <strong>₹149</strong></p>
              </div>

              {/* [EDIT] Buttons now stacked vertically */}
              <div className="flex flex-col items-stretch gap-3 mt-4">
                <a 
                  href="/promptx" 
                  className="text-center px-4 py-2 sm:px-6 sm:py-3 bg-white text-blue-700 font-bold rounded-lg shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:scale-105 transition-all transform text-sm"
                >
                  Register Now
                </a>
                <a 
                  href="/images/logos/PromptX.jpg" 
                  className="text-center px-4 py-2 sm:px-5 sm:py-3 border border-white/20 rounded-full text-white/90 hover:bg-white/10 transition-colors text-sm"
                >
                  Download Poster
                </a>
              </div>

              <div className="mt-6 text-xs text-white/60">Limited seats. Click register to view full workshop details.</div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white/70 border-t border-white/10 pt-6">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-sm">AI</div>
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


// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// [FIX] Removed 'Link' import as react-router-dom is not available
// import { Link } from 'react-router-dom';

export default function PromptXPopup({ autoShow = true, alwaysShow = false }) {
  const [open, setOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(false); // [NEW] Animation state
  const [tilt, setTilt] = useState({ x: 0, y: 0 }); // [NEW] 3D Tilt state
  const modalRef = useRef<HTMLDivElement | null>(null);
  const confettiContainerRef = useRef<HTMLDivElement | null>(null);

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

  // [NEW] Sync open prop to animation state
  useEffect(() => {
    if (open) {
      // When open becomes true, trigger the 'show' animation
      setIsShowing(true);
    }
    // We handle 'false' in the close function
  }, [open]);

  const close = (remember = true) => {
    setIsShowing(false); // Trigger 'hide' animation
    // We will unmount on transition end
    if (!alwaysShow && remember) localStorage.setItem('promptx_popup_dismissed', '1');
  };

  // [NEW] 3D Tilt Effect Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    // [FIX] Lowered 3D tilt effect by increasing divisor
    const x = (e.clientX - rect.left - rect.width / 2) / 40; // Was 20
    const y = (e.clientY - rect.top - rect.height / 2) / 40; // Was 20
    setTilt({ x: -y, y: x }); // Invert x/y for natural-feeling rotation
  };

  // [NEW] Reset tilt on mouse leave
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Prevent background scroll when modal is open and restore when closed
  useEffect(() => {
    if (!isShowing) return; // [EDIT] Use isShowing
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous || '';
    };
  }, [isShowing]); // [EDIT] Use isShowing

  // Keyboard: ESC to close and simple focus trap
  useEffect(() => {
    if (!isShowing) return; // [EDIT] Use isShowing
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
  }, [isShowing]); // [EDIT] Use isShowing

  // [NEW] "Wow" Effect: Gooey Confetti Animation
  useEffect(() => {
    if (!isShowing) return; // [EDIT] Trigger on isShowing
    const container = modalRef.current;
    if (!container) return;

    // Create a container for confetti
    const confettiContainer = document.createElement('div');
    // [NEW] Add fade-in animation to confetti container
    confettiContainer.className = 'absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-0 animate-fade-in';
    confettiContainerRef.current = confettiContainer;

    const colors = ['#0ea5e9', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'];
    const numConfetti = 30; // [EDIT] More confetti!
    let particles = [];

    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement('div');
      const color = colors[i % colors.length];
      const size = Math.random() * 8 + 6; // 6px to 14px

      confetti.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0;
        filter: url(#goo);
        left: ${Math.random() * 100}%;
        animation: drop ${Math.random() * 3 + 4}s ease-in-out ${Math.random() * 1}s forwards;
      `;
      confettiContainer.appendChild(confetti);
      particles.push(confetti);
    }

    // Prepend so it's behind other content
    container.prepend(confettiContainer);

    return () => {
      // Cleanup on close
      if (confettiContainerRef.current) {
        confettiContainerRef.current.remove();
        confettiContainerRef.current = null;
      }
    };
  }, [isShowing]); // [EDIT] Depend on isShowing


  if (!open) return null; // This now unmounts *after* the exit animation

  // [NEW] Handler for unmounting after exit animation
  const handleTransitionEnd = () => {
    if (!isShowing) {
      setOpen(false); // Now unmount
    }
  };

  const modal = (
    <div
      className="fixed inset-0 z-[99999] flex items-start md:items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      style={{
        perspective: '1000px', // [NEW] Perspective for 3D
      }}
    >
      {/* --- Backdrop --- */}
      {/* [THEME] Lighter backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => close(false)}
      />

      {/* [THEME] Frosted glass light theme */}
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
          WebkitOverflowScrolling: 'touch',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isShowing ? 1 : 0.95})`, // [NEW] Apply tilt and scale
          opacity: isShowing ? 1 : 0, // [NEW] Apply opacity
          transition: 'transform 0.1s ease-out, opacity 0.3s ease-in-out, scale 0.3s ease-in-out', // [NEW] Transitions
        }}
        onMouseMove={handleMouseMove} // [NEW]
        onMouseLeave={handleMouseLeave} // [NEW]
        onTransitionEnd={handleTransitionEnd} // [NEW]
        // [THEME] Light frosted glass
        className="relative z-[100000] w-full max-w-md sm:max-w-2xl md:max-w-4xl bg-white/75 backdrop-blur-2xl border border-gray-200/50 rounded-3xl shadow-2xl overflow-auto max-h-[90vh]"
      >

        {/* [NEW] CSS for animations (gradient + confetti + stagger) */}
        <style>{`
          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animated-gradient {
            background-size: 200% 200%;
            animation: gradient-animation 8s ease infinite;
          }
          @keyframes drop {
            0% { transform: translateY(-100px) scale(1.2); opacity: 1; }
            80% { transform: translateY(80vh) scale(0.3); opacity: 1; }
            100% { transform: translateY(90vh) scale(0); opacity: 0; }
          }
          /* [NEW] Stagger animation */
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          /* [NEW] Fade-in for confetti container */
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 0.7; } /* Don't make it 100% opaque */
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out forwards;
          }
          .animate-stagger {
            animation: fade-in-up 0.5s ease-out forwards;
            opacity: 0; /* Start hidden */
            animation-fill-mode: forwards;
          }
        `}</style>

        {/* [THEME] Light theme close button */}
        <button
          onClick={() => close()}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* [EDIT] Added relative z-10 to place content above confetti */}
        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">

          {/* --- Left — visual --- */}
          {/* [STYLE] Added animated gradient class and inline style */}
          <div
            className="relative p-8 md:p-12 flex items-center justify-center animated-gradient overflow-hidden"
            style={{ backgroundImage: 'linear-gradient(to right, #0ea5e9, #3b82f6, #6366f1, #3b82f6, #0ea5e9)' }}
          >
            {/* [STYLE] Stronger radial gradients */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_30%)]" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.1),transparent_30%)]" />

            {/* [EDIT] Removed the large background SVG icon */}

            <div className="relative z-10 text-center text-white">
              {/* [NEW] Add stagger animation to elements */}
              <div
                className="text-4xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tighter animate-stagger"
                style={{ animationDelay: '0.2s' }}
              >PromptX</div>
              <div
                className="text-sm sm:text-lg mb-6 drop-shadow-md animate-stagger"
                style={{ animationDelay: '0.3s' }}
              >AI Workshop — Classes 6–10</div>
              <div
                className="text-sm sm:text-lg mb-6 drop-shadow-md animate-stagger font-bold text-yellow-300"
                style={{ animationDelay: '0.35s' }}
              >📅 Jan 3rd, 2026</div>
              <div
                className="inline-flex items-center gap-3 justify-center animate-stagger"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:scale-105 transition-transform cursor-default">Future Skills</div>
                <div className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:scale-105 transition-transform cursor-default">Hands-on</div>
              </div>
            </div>

            {/* Decorative floating badges */}
            {/* [STYLE] Softer blur */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-white/5 blur-3xl animate-pulse" />
            <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-white/5 blur-3xl" />
          </div>

          {/* --- Right — content --- */}
          {/* [THEME] Removed dark bg class */}
          <div className="relative p-6 sm:p-8 md:p-12">

            <div
              // [NEW] Stagger
              className="animate-stagger"
              style={{ animationDelay: '0.3s' }}
            >
              {/* [THEME] Light text */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Join PromptX: AI Workshop</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">A hands-on workshop to boost academic creativity & productivity using AI tools.</p>
            </div>

            <div
              className="mt-8 grid grid-cols-1 gap-4"
            >
              {/* [THEME] Light text */}
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-800">
                <li
                  className="flex items-center gap-2 animate-stagger"
                  style={{ animationDelay: '0.5s' }}
                ><span className="text-cyan-500">✔</span> Live AI Tool Demos</li>
                <li
                  className="flex items-center gap-2 animate-stagger"
                  style={{ animationDelay: '0.55s' }}
                ><span className="text-cyan-500">✔</span> Hands-on Tasks</li>
                <li
                  className="flex items-center gap-2 animate-stagger"
                  style={{ animationDelay: '0.6s' }}
                ><span className="text-cyan-500">✔</span> Certificates for All</li>
                <li
                  className="flex items-center gap-2 animate-stagger"
                  style={{ animationDelay: '0.65s' }}
                ><span className="text-cyan-500">✔</span> Ethical AI Training</li>
              </ul>

              <div
                className="pt-2 animate-stagger"
                style={{ animationDelay: '0.7s' }}
              >
                {/* [THEME] Light text, blue fee */}
                <p className="text-gray-700">Eligibility: Classes 7–10 · Fee: <strong className="text-blue-600 font-bold">₹149</strong></p>
              </div>

              {/* [EDIT] Buttons now stacked vertically */}
              <div
                className="flex flex-col items-stretch gap-3 mt-4 animate-stagger"
                style={{ animationDelay: '0.8s' }}
              >
                {/* [THEME] Light theme primary button */}
                <a
                  href="/promptx"
                  className="text-center px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:bg-blue-700 hover:scale-[1.03] transition-all transform text-sm"
                >
                  Register Now
                </a>
                {/* [THEME] Light theme secondary button */}
                <a
                  href="/images/logos/PromptX.jpg"
                  className="text-center px-4 py-2 sm:px-5 sm:py-3 border border-blue-600 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  Download Poster
                </a>
              </div>

              <div
                className="mt-6 text-xs text-gray-500 animate-stagger"
                style={{ animationDelay: '0.9s' }}
              >Limited seats. Click register to view full workshop details.</div>
            </div>

            {/* [THEME] Light theme footer */}
            <div
              className="mt-8 flex items-center gap-3 text-gray-600 border-t border-gray-200 pt-6 animate-stagger"
              style={{ animationDelay: '1.0s' }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">AI</div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Powered by Focsera</div>
                <div className="text-xs text-gray-600">Future Skills · School Workshops</div>
              </div>
            </div>

          </div>
        </div>

        {/* Confetti SVG overlay (filter definition) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /></filter>
          </defs>
        </svg>

      </div>
    </div>
  );

  return createPortal(modal, document.body);
}


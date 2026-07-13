import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, Users, FileText, CheckCircle2 } from 'lucide-react';
import videoBg from '../assets/ai vid.mp4';

const steps = [
  {
    number: '01',
    icon: MessageSquareText,
    title: 'Tell us about your project',
    description: 'Share your requirements — what you need, when you need it, and your budget range in our app.',
    image: '/images/Screenshot_20260517_151602.jpg.jpeg',
    color: '#0B5FFF',
    bg: '#EAF2FF',
  },
  {
    number: '02',
    icon: Users,
    title: 'Meet verified professionals',
    description: 'We match you with pre-vetted experts who specialize in exactly what you need.',
    image: '/images/Screenshot_20260518_134332.jpg.jpeg',
    color: '#7c3aed',
    bg: '#f3e8ff',
  },
  {
    number: '03',
    icon: FileText,
    title: 'Receive a personalized quotation',
    description: 'Get transparent pricing with a detailed breakdown — no hidden costs, no surprises.',
    image: '/images/Screenshot_20260511_210806.jpg.jpeg',
    color: '#d97706',
    bg: '#fef3c7',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Relax while Focsera manages execution',
    description: 'We coordinate everything from scheduling to quality checks. You focus on what matters.',
    image: '/images/app-screenshot-1.png',
    color: '#059669',
    bg: '#d1fae5',
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Scroll wheel event interceptor for local in-place steps transitions
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Determine if the section is occupying the main screen space
      const isVisible = rect.top < viewportHeight * 0.4 && rect.bottom > viewportHeight * 0.4;
      if (!isVisible) return;

      const now = Date.now();
      const delta = e.deltaY;

      // Check transition cooldown (900ms) to ensure smooth slide switching
      if (now - lastScrollTime.current < 900) {
        // Prevent background scrolling while transition is running
        e.preventDefault();
        return;
      }

      if (delta > 0) {
        // Scrolling Down: transition to next step in place
        if (activeStep < steps.length - 1) {
          e.preventDefault();
          setActiveStep(prev => prev + 1);
          lastScrollTime.current = now;
        }
      } else if (delta < 0) {
        // Scrolling Up: transition to previous step in place
        if (activeStep > 0) {
          e.preventDefault();
          setActiveStep(prev => prev - 1);
          lastScrollTime.current = now;
        }
      }
    };

    // Mobile touch swiping local transition logic
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isVisible = rect.top < viewportHeight * 0.4 && rect.bottom > viewportHeight * 0.4;
      if (!isVisible) return;

      const touchEndY = e.touches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      const now = Date.now();

      if (now - lastScrollTime.current < 900) {
        if (Math.abs(diffY) > 10) e.preventDefault();
        return;
      }

      if (Math.abs(diffY) > 40) { // swipe threshold
        if (diffY > 0) {
          if (activeStep < steps.length - 1) {
            e.preventDefault();
            setActiveStep(prev => prev + 1);
            lastScrollTime.current = now;
          }
        } else {
          if (activeStep > 0) {
            e.preventDefault();
            setActiveStep(prev => prev - 1);
            lastScrollTime.current = now;
          }
        }
      }
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
    }

    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [activeStep]);

  const handleDotClick = (index: number) => {
    setActiveStep(index);
    lastScrollTime.current = Date.now();
  };

  return (
    <div ref={containerRef} className="relative w-full bg-focsera-bg border-b border-gray-150/60 min-h-[600px] lg:h-[80vh] flex items-center justify-center py-16 sm:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 w-full">
        
        {/* Split Layout: Mockup (Left), Vertical Stepper Line (Middle), Text Card (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center w-full relative">
          
          {/* LEFT: Phone Mockup Container */}
          <div className="col-span-1 md:col-span-5 flex justify-center py-4">
            <div className="relative w-[180px] sm:w-[200px] md:w-full max-w-[280px]">
              {/* Phone Frame */}
              <div className="rounded-[2.2rem] sm:rounded-[2.6rem] p-2 bg-gradient-to-b from-slate-200 to-slate-400 border border-gray-300 shadow-2xl shadow-gray-400/40">
                <div className="relative rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden bg-black aspect-[9/19.5]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-4 sm:h-5 bg-black rounded-b-2xl z-20" />

                  {/* Dynamic Screenshot or Video */}
                  <AnimatePresence mode="wait">
                    {activeStep === 3 ? (
                      <motion.video
                        key="step-4-video"
                        src={videoBg}
                        autoPlay
                        loop
                        muted
                        playsInline
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <motion.img
                        key={activeStep}
                        src={steps[activeStep].image}
                        alt={`Step ${steps[activeStep].number}`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.03 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Side volume buttons */}
              <div className="absolute -left-1.5 top-20 sm:top-24 w-0.5 sm:w-1 h-6 sm:h-10 bg-gray-400 rounded-l" />
              <div className="absolute -left-1.5 top-28 sm:top-36 w-0.5 sm:w-1 h-6 sm:h-10 bg-gray-400 rounded-l" />
            </div>
          </div>

          {/* MIDDLE: Vertical scroll indicator dots (CropWings style pagination) */}
          <div className="hidden md:flex col-span-1 flex-col gap-6 justify-center items-center py-4 shrink-0 relative h-[180px]">
            {/* Stepper Vertical Connector Line */}
            <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gray-250/70 -translate-x-1/2 z-0" />
            
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className="w-3.5 h-3.5 rounded-full relative group flex items-center justify-center z-10 bg-focsera-bg focus:outline-none"
                aria-label={`Go to step ${i + 1}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeStep === i
                    ? 'bg-blue-600 scale-[1.5] shadow-[0_0_12px_rgba(11,95,255,0.8)] border-2 border-blue-600'
                    : activeStep > i
                      ? 'bg-blue-600 border-2 border-blue-600'
                      : 'bg-gray-300 border-2 border-gray-300'
                }`} />
                <span className={`absolute right-6 text-[10px] font-black uppercase tracking-widest transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 ${
                  activeStep === i ? 'opacity-100 text-blue-600' : 'text-gray-400'
                }`}>
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: Static Text Info Card (transitions dynamically in place) */}
          <div className="col-span-1 md:col-span-6 flex flex-col justify-center min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Step Pill */}
                <span className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-md bg-blue-50 text-blue-600">
                  Step {steps[activeStep].number}
                </span>

                {/* Step Title */}
                <h3 className="text-2xl sm:text-4xl font-extrabold text-focsera-text tracking-tight">
                  {steps[activeStep].title}
                </h3>

                {/* Step Description */}
                <p className="text-sm sm:text-base text-focsera-muted leading-relaxed font-light">
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

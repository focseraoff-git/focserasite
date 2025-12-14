// @ts-nocheck

import React, { useState, useRef, useEffect } from 'react';
import { load } from "@cashfreepayments/cashfree-js";

// --- SVG Icon Components ---
const IconCheckCircle = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);



const IconSparkles = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9L12 16l1.9-4.8 4.8-1.9-4.8-1.9L12 3z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const IconAward = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const IconShieldCheck = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconRocket = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4.5 16.5c-1.5 1.5-3 1.5-4.5 0s-1.5-3 0-4.5L13.5 4.5l6 6L4.5 16.5z" />
    <path d="m15 13.5 6 6" />
    <path d="m21.5 11.5-1-1" />
  </svg>
);

const IconUsers = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <path d="M20 8v6" />
    <path d="M23 11h-6" />
  </svg>
);

const IconCheck = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconLock = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconClipboardList = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);




// --- 3D Tiltable Card Component ---
const TiltableCard = ({ children, className = "", style = {}, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    // Reduced tilt intensity for cleaner feel on light mode
    const rotateX = (y / height) * -4; 
    const rotateY = (x / width) * 4;   
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const combinedStyle = { transformStyle: 'preserve-3d', willChange: 'transform', ...style };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={combinedStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

// --- The Main Component ---
export default function PromptXLight() {
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('7'); 
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const formRef = useRef(null);

  // Scroll Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setMessage(null);
  setIsError(false);

  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cashfree-init`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          studentName: name,
          classLevel,
          parentName,
          mobile,
          email,
          notes,
        }),
      }
    );

    const data = await res.json();

    if (!data.paymentSessionId) {
      throw new Error("Payment session not created");
    }

   const cashfree = await load({
  mode: "production", // sandbox only for testing
});

await cashfree.checkout({
  paymentSessionId: data.paymentSessionId,
  redirectMode: "REDIRECT",
});



  } catch (err) {
    console.error(err);
    setMessage("Unable to start payment. Try again.");
    setIsError(true);
  } finally {
    setSubmitting(false);
  }
};


  const workshopHighlights = [
    { text: "Live AI Tool Demonstrations", icon: <IconSparkles className="w-7 h-7 text-blue-500" /> },
    { text: "Hands-on Project-Based Tasks", icon: <IconRocket className="w-7 h-7 text-green-500" /> },
    { text: "Certificates for All Participants", icon: <IconAward className="w-7 h-7 text-yellow-500" /> },
    { text: "Ethical & Safe AI Use Training", icon: <IconShieldCheck className="w-7 h-7 text-red-500" /> },
    { text: "Fun & Interactive Sessions", icon: <IconSparkles className="w-7 h-7 text-purple-500" /> },
    { text: "Future-Ready Skills", icon: <IconRocket className="w-7 h-7 text-indigo-500" /> }
  ];
  
  const tools = ['ChatGPT', 'Gemini', 'Perplexity', 'Notion AI', 'Gamma', 'Elicit', 'RunwayML', 'ElevenLabs', 'MidJourney', 'Descript', 'Veo 3', 'Lindy', 'N8N', 'Notebook LM'];

  return (
    <>
      <style>{`
        /* [THEME] Blue & White Theme */
        
        .neon-card-border {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          will-change: transform;
        }
        
        .neon-input-focus:focus {
          border-color: rgba(59, 130, 246, 0.7) !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        
        .grid-background {
          position: fixed;
          inset: 0;
          z-index: -10;
          background-image:
            linear-gradient(to right, rgba(59, 130, 246, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(100% 100% at top center, white, transparent);
        }

        @keyframes aurora-slide {
          0% { transform: translate(-20%, -20%) rotate(0deg); }
          50% { transform: translate(20%, 30%) rotate(10deg); }
          100% { transform: translate(-20%, -20%) rotate(0deg); }
        }

        .aurora-blob {
          position: absolute;
          filter: blur(80px);
          opacity: 0.15;
          will-change: transform;
          animation: aurora-slide 25s infinite ease-in-out;
          z-index: -5;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px) scale(0.99);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          will-change: opacity, transform;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .locked-tools-content::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(59, 130, 246, 0.02) 50%,
            transparent 100%
          );
          pointer-events: none;
        }

        @keyframes popup-scale {
          0% { transform: translateY(10px) scale(0.96); opacity: 0 }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1 }
          100% { transform: translateY(0) scale(1); opacity: 1 }
        }
        .grand-popup {
          animation: popup-scale 550ms cubic-bezier(.2,.9,.2,1);
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .confetti-area { position: absolute; inset: -20% -10% auto -10%; pointer-events: none; overflow: visible; }
        @keyframes confetti-fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1 } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0.95 } }
        .confetti-piece { width: 10px; height: 16px; position: absolute; top: -10vh; border-radius: 2px; opacity: 0.95; animation: confetti-fall 2400ms linear infinite; }
        .confetti-piece.c1 { left: 8%; background: #06b6d4; animation-delay: 0ms; }
        .confetti-piece.c2 { left: 16%; background: #7c3aed; animation-delay: 120ms; }
        .confetti-piece.c3 { left: 24%; background: #60a5fa; animation-delay: 240ms; }
        .popup-hero { font-size: 48px; line-height: 1; letter-spacing: -2px; }
      `}</style>
      
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="grid-background" />
        <div className="aurora-blob top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-400 rounded-full" />
        <div className="aurora-blob bottom-[-30%] right-[-30%] w-[1000px] h-[1000px] bg-indigo-400 rounded-full" style={{ animationDelay: '8s' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          
          {/* --- Header --- */}
          <header className="text-center mb-24 animate-on-scroll">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              <span className="text-blue-600">PromptX</span> – AI Workshop
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
              A hands-on workshop for students in Classes 7–10 to boost academic creativity & productivity using AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#registration" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
                Register Now
              </a>
              <a href="/images/logos/PromptX.jpg" download className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-blue-600 font-semibold text-lg border border-blue-600 shadow-sm hover:bg-blue-50 hover:border-blue-700 transition-all transform hover:-translate-y-0.5">
                Download Poster
              </a>
            </div>
          </header>

          {/* --- About Section --- */}
          <section className="mb-24 p-8 md:p-12 rounded-2xl neon-card-border animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About PromptX</h2>
            <div className="text-lg text-gray-700 space-y-5 leading-relaxed max-w-4xl mx-auto">
              <p>
                <strong>PromptX</strong> is an interactive 6 hour workshop designed to demystify Artificial Intelligence for students. We move beyond the hype and focus on practical, hands-on applications that can immediately help students with their schoolwork.
              </p>
              <p>
                This workshop introduces students to powerful AI tools for research, writing, presentation design, and creative projects. We emphasize ethical use and critical thinking, ensuring students become responsible digital citizens. No prior coding knowledge is required; all activities are project-focused and designed to be fun and engaging.
              </p>
            </div>
          </section>

          {/* --- Workshop Highlights --- */}
          <section className="mb-24 animate-on-scroll">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center"><span className="text-blue-600">Workshop Highlights</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
              {workshopHighlights.map((item, index) => (
                <TiltableCard 
                  key={item.text} 
                  className={`p-6 rounded-xl flex items-center gap-5 transition-all neon-card-border animate-on-scroll`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    {React.cloneElement(item.icon, { className: `${item.icon.props.className}` })}
                  </div>
                  <span className="text-lg font-semibold text-gray-800">{item.text}</span>
                </TiltableCard>
              ))}
            </div>
          </section>

          {/* --- Details Row: Who, Structure, Fee --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24" style={{ perspective: '1000px' }}>
            <TiltableCard className="border-l-4 border-blue-500 p-8 rounded-r-lg neon-card-border animate-on-scroll" style={{ backgroundColor: 'rgba(239, 246, 255, 0.75)' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <IconUsers className="w-7 h-7 text-blue-500" />
                Who Can Attend
              </h3>
              <p className="text-lg text-gray-700">
                Classes 7–10<br/>
                No coding knowledge required.<br/>
                Max batch size as per school hall capacity.
              </p>
            </TiltableCard>
            
            <div className="lg:col-span-2 p-8 rounded-lg neon-card-border animate-on-scroll" style={{ transitionDelay: '100ms' }}>
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Workshop Structure</h3>
               <table className="w-full text-left mb-6">
                 <thead>
                   <tr className="bg-gray-50/50 border-b-2 border-gray-200">
                     <th className="py-4 px-5 font-semibold text-gray-500 uppercase text-sm tracking-wider">Session</th>
                     <th className="py-4 px-5 font-semibold text-gray-500 uppercase text-sm tracking-wider">Duration</th>
                     <th className="py-4 px-5 font-semibold text-gray-500 uppercase text-sm tracking-wider">Outcome</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr className="border-b border-gray-200/50">
                     <td className="py-4 px-5 text-gray-700 text-lg">Session 1: Discovering the World of AI</td>
                     <td className="py-4 px-5 text-gray-700 text-lg">3 hr</td>
                     <td className="py-4 px-5 text-gray-700 text-lg">Intro to AI, its impact, & tool demos</td>
                   </tr>
                   <tr className="border-b-0">
                     <td className="py-4 px-5 text-gray-700 text-lg">Session 2: Hands-On with AI Tools</td>
                     <td className="py-4 px-5 text-gray-700 text-lg">3 hrs</td>
                     <td className="py-4 px-5 text-gray-700 text-lg">Guided practice, Q&A, & feedback</td>
                   </tr>
                 </tbody>
               </table>
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <p className="text-xl text-gray-700">Total Duration: <strong>6 Hours</strong></p>
                 <p className="text-2xl font-bold text-blue-600">Fee: ₹149 per participant</p>
               </div>
            </div>
          </div>

          {/* --- Tools Covered --- */}
          <section className="mb-24 relative animate-on-scroll">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center"><span className="text-blue-600">Tools We'll Explore</span></h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 relative locked-tools-content">
              {tools.map((t) => (
                <div key={t} className="p-4 rounded-xl shadow-sm flex items-center gap-4 neon-card-border" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                    {t[0]}
                  </div>
                  <div className="text-base font-semibold text-gray-700">{t}</div>
                </div>
              ))}
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
              <IconLock className="w-12 h-12 text-blue-500 mb-4 animate-pulse" />
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Want to see the full toolkit?</h4>
              <p className="text-lg text-gray-600 mb-6 max-w-sm">
                Register now to unlock the full list of powerful AI tools covered in the workshop.
              </p>
              <a href="#registration" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
                Register to Reveal
              </a>
            </div>
          </section>

          {/* --- Benefits Sections --- */}
          <section className="mb-24" style={{ perspective: '1000px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <TiltableCard className="p-8 rounded-xl neon-card-border animate-on-scroll">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits to Students</h3>
                <ul className="list-none pl-0 space-y-3">
                  {[
                    'Confidently use multiple AI tools',
                    'Design better presentations & reports',
                    'Automate repetitive tasks to save time',
                    'Use prompt engineering for better AI responses',
                    'Apply AI ethics in academic work'
                  ].map((b, i) => (
                    <li key={b} className="flex items-center gap-3 text-lg text-gray-700 animate-on-scroll" style={{ transitionDelay: `${i * 50}ms` }}>
                      <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </TiltableCard>
              <TiltableCard className="p-8 rounded-xl neon-card-border animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits to School</h3>
                <ul className="list-none pl-0 space-y-3">
                  {[
                    'All sessions conducted by AI professionals',
                    'Mentors and instructors provided',
                    'Study materials & certificates included',
                    'Full technical & workshop management'
                  ].map((b, i) => (
                    <li key={b} className="flex items-center gap-3 text-lg text-gray-700 animate-on-scroll" style={{ transitionDelay: `${i * 50}ms` }}>
                      <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </TiltableCard>
            </div>
          </section>

          {/* --- Event Guidelines Section --- */}
          <section className="mb-24 animate-on-scroll">
            <div className="p-8 rounded-xl neon-card-border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Event Guidelines</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-none pl-0">
                {[
                  'Maintain discipline, punctuality, and decorum.',
                  'Behave respectfully toward staff and participants.',
                  'Carry your Institution ID card at all times.',
                  'Adhere to the institution\'s prescribed dress code.',
                  'Keep event venues clean and undamaged.',
                  'Follow all instructions from event organizers.',
                  'Misconduct or cheating may lead to disqualification.',
                  'Cooperate with staff for safety and management.'
                ].map((b, i) => (
                  <li key={b} className="flex items-center gap-3 text-lg text-gray-700 animate-on-scroll" style={{ transitionDelay: `${Math.floor(i / 2) * 50}ms` }}>
                    <IconClipboardList className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --- Registration Section --- */}
          <section id="registration" className="mb-24 animate-on-scroll">
            <div className="p-8 md:p-12 rounded-2xl neon-card-border">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Registration & Payment</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Student's Name</label>
                  <input id="name" required placeholder="e.g. Rohan Sharma" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                </div>
                
                <div>
                  <label htmlFor="classLevel" className="block text-sm font-medium text-gray-600 mb-1">Class</label>
                  <select id="classLevel" value={classLevel} onChange={e => setClassLevel(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none neon-input-focus">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <option key={i} value={7 + i}>Class {7 + i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-600 mb-1">Parent's Name</label>
                  <input id="parentName" required placeholder="e.g. Priya Sharma" value={parentName} onChange={e => setParentName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                  <input id="mobile" type="tel" required placeholder="10-digit mobile number" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email (Required)</label>
                  <input id="email" type="email" required placeholder="e.g. parent@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-600 mb-1">Notes (Optional)</label>
                  <textarea id="notes" placeholder="Any questions or comments?" value={notes} onChange={e => setNotes(e.target.value)} rows="3" className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                </div>

                {/* Submit Button & Helper Text */}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mt-4">
                  <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {submitting ? 'Redirecting...' : 'Pay Now & Register'}
                  </button>
                  <div className="text-sm text-gray-600 text-center sm:text-left">
                    We will contact you via phone/email to confirm your slot.
                  </div>
                </div>
              </form>
              
              {/* --- Success/Error Message --- */}
              {message && (
                <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
                  isError 
                    ? 'bg-red-100 text-red-700 border border-red-300' 
                    : 'bg-green-100 text-green-700 border border-green-300'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* --- Registration Success Popup --- */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSuccessPopup(false)} />
          <TiltableCard className="w-full max-w-2xl z-50">
            <div className="relative z-10 w-full grand-popup rounded-3xl p-6 sm:p-8 md:p-10 text-center overflow-visible">
              <div className="confetti-area" aria-hidden>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`confetti-piece c${i + 1}`}></div>
                ))}
              </div>

              <div className="mx-auto max-w-xl">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center mb-4 shadow-lg">
                  <div className="text-white popup-hero">🎉</div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Registration Confirmed!</h3>
                <p className="text-md sm:text-lg text-gray-800 mb-4">You've successfully registered for PromptX.</p>
                <p className="text-sm sm:text-base text-gray-600 mb-6">You'll receive your ticket via email shortly. Please print the ticket from that email and present the printed ticket at the event entrance.</p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={() => setShowSuccessPopup(false)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition-colors">Close</button>
                  <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" onClick={() => setShowSuccessPopup(false)} className="px-4 py-2 text-sm text-blue-600 hover:underline">Got Email? View Ticket</a>
                </div>
              </div>
            </div>
          </TiltableCard>
        </div>
      )}
    </>
  );
}
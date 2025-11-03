// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
// [FIX] Removed faulty local import. The component will now rely on a globally
// provided 'supabase' client instance, which is handled by the existing
// 'if (!supabase)' check in the handleSubmit function.

// --- SVG Icon Components ---
// Using inline SVGs for icons as we can't import libraries like lucide-react

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

const IconPhone = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMail = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 19.4 0 0 1-2.06 0L2 7" />
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

// [NEW] 3D Tiltable Card Component
const TiltableCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -8; // Max tilt 4 degrees
    const rotateY = (x / width) * 8;  // Max tilt 4 degrees
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};


// --- The Main Component ---

export default function PromptXDark() {
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('7'); 
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const formRef = useRef(null);
  // [FIX] Removed spotlightRef as glows are being removed
  // const spotlightRef = useRef(null); // [NEW] Ref for mouse spotlight

  // [FIX] Removed Mouse-follow Spotlight Effect
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     if (spotlightRef.current) {
  //       // Center the spotlight on the cursor
  //       spotlightRef.current.style.transform = `translate3d(${e.clientX - 400}px, ${e.clientY - 400}px, 0)`;
  //     }
  //   };
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  // [NEW] Scroll Animation Effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    } else {
      setPaymentScreenshot(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  // @ts-ignore
  if (typeof supabase === 'undefined') {
    setMessage('Supabase client not available. Please configure the Supabase client.');
    setIsError(true);
    setSubmitting(false);
    return;
  }
    
  setSubmitting(true);
    setMessage(null);
    setIsError(false);

    if (!email || !email.trim()) {
      setMessage('Please provide a valid email address.');
      setIsError(true);
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage('Please provide a valid email address.');
      setIsError(true);
      setSubmitting(false);
      return;
    }

    let screenshotPath = 'N/A';
    let uploadError = null;

    if (!paymentScreenshot) {
        setMessage('Please upload a payment screenshot.');
        setIsError(true);
        setSubmitting(false);
        return;
    }

    const file = paymentScreenshot;
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9_.]/g, '_');
    const filePath = `screenshots/${Date.now()}_${cleanFileName}`;

    try {
        // @ts-ignore
        const { data: uploadData, error } = await supabase.storage
            .from('registrations') // BUCKET NAME
            .upload(filePath, file);

        if (error) throw error; 
        screenshotPath = filePath; 

    } catch (error) {
        console.error('Error uploading screenshot:', error);
        uploadError = error;
    }
    
    if (uploadError) {
        setMessage(`Error uploading screenshot: ${uploadError.message}. Please try again.`);
        setIsError(true);
        setSubmitting(false);
        return; 
    }

    const payloadMessage = `Class: ${classLevel}\nParent: ${parentName}\nMobile: ${mobile}\nNotes: ${notes}\nTransaction ID: ${transactionId}\nScreenshot Path: ${screenshotPath}`;

    try {
      // @ts-ignore
      const { data, error } = await supabase.from('custom_contacts').insert([{
        full_name: name,
        email: email || '',
        interested_division: 'PromptX',
        message: payloadMessage,
      }]);

      if (error) throw error;
      
      setMessage('Registration received! We will contact you shortly to confirm.');
      setIsError(false);
      setShowSuccessPopup(true);
      setName(''); setParentName(''); setMobile(''); setEmail(''); setNotes(''); setTransactionId(''); setClassLevel('7'); 
      setPaymentScreenshot(null);
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'There was an error submitting the form. Please try again later.');
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
      {/* [NEW] Style tag for glows, animations, and background effects */}
      <style>{`
        /* [THEME] Blue & White Theme */
        /* [FIX] Removed pulse-glow animation */
        
        .animate-pulse-glow {
          /* [FIX] Removed animation */
        }
        .neon-text-glow {
          /* [FIX] Removed glow filter */
        }
        .neon-icon-glow {
          /* [FIX] Removed glow filter */
        }
        
        /* [ULTIMATE] Frosted glass card style */
        .neon-card-border {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          will-change: transform; /* Hint for animations */
        }
        
        .neon-input-focus:focus {
          /* [FIX] Removed glow box-shadow */
          border-color: rgba(59, 130, 246, 0.7) !important;
        }
        .grid-background {
          position: fixed;
          inset: 0;
          z-index: -10;
          /* [THEME] Light grid on white */
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
          filter: blur(3xl);
          /* [THEME] Lighter opacity for light bg */
          opacity: 0.1;
          will-change: transform;
          animation: aurora-slide 25s infinite ease-in-out;
          z-index: -5;
        }

        /* [FIX] Removed Mouse-follow spotlight */
        
        /* [ULTIMATE] Enhanced Scroll animation */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px) scale(0.99);
          filter: blur(4px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out, filter 0.6s ease-out;
          transition-delay: var(--delay, 0s);
          will-change: opacity, transform, filter;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        /* [NEW] Scanline for locked tools */
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
            rgba(0, 0, 0, 0.01) 48%,
            rgba(59, 130, 246, 0.03) 50%,
            rgba(0, 0, 0, 0.01) 52%,
            transparent 100%
          );
          animation: scanline 5s linear infinite;
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100vh; }
        }
        /* Success popup: grand futuristic celebration */
        @keyframes popup-scale {
          0% { transform: translateY(10px) scale(0.96); opacity: 0 }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1 }
          100% { transform: translateY(0) scale(1); opacity: 1 }
        }
        .grand-popup {
          animation: popup-scale 550ms cubic-bezier(.2,.9,.2,1);
          /* [THEME] Light popup */
          border: 1px solid rgba(0,0,0,0.05);
          /* [ULTIMATE] Frosted glass for popup */
          background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(245,245,255,0.7));
          backdrop-filter: blur(12px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        .confetti-area { position: absolute; inset: -20% -10% auto -10%; pointer-events: none; overflow: visible; }
        @keyframes confetti-fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1 } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0.95 } }
        .confetti-piece { width: 10px; height: 16px; position: absolute; top: -10vh; border-radius: 2px; opacity: 0.95; animation: confetti-fall 2400ms linear infinite; }
        .confetti-piece.c1 { left: 8%; background: #06b6d4; animation-delay: 0ms; }
        .confetti-piece.c2 { left: 16%; background: #7c3aed; animation-delay: 120ms; }
        .confetti-piece.c3 { left: 24%; background: #60a5fa; animation-delay: 240ms; }
        .confetti-piece.c4 { left: 32%; background: #f97316; animation-delay: 360ms; }
        .confetti-piece.c5 { left: 40%; background: #f43f5e; animation-delay: 480ms; }
        .confetti-piece.c6 { left: 48%; background: #34d399; animation-delay: 600ms; }
        .confetti-piece.c7 { left: 56%; background: #06b6d4; animation-delay: 720ms; }
        .confetti-piece.c8 { left: 64%; background: #7c3aed; animation-delay: 840ms; }
        .confetti-piece.c9 { left: 72%; background: #60a5fa; animation-delay: 960ms; }
        .confetti-piece.c10 { left: 80%; background: #f97316; animation-delay: 1080ms; }
        .confetti-piece.c11 { left: 88%; background: #f43f5e; animation-delay: 1200ms; }
        .confetti-piece.c12 { left: 96%; background: #34d399; animation-delay: 1320ms; }
        .popup-hero { font-size: 48px; line-height: 1; letter-spacing: -2px; }
        @media (max-width: 640px) { .popup-hero { font-size: 34px; } }
      `}</style>
      
      {/* [THEME] Changed to bg-white, text-gray-900 */}
      <div className="min-h-screen bg-white text-gray-900 font-sans antialiased relative overflow-hidden">
        
        {/* [FIX] Removed Mouse spotlight element */}
        
        {/* [NEW] Background Effects */}
        <div className="grid-background" />
        <div className="aurora-blob top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-400 rounded-full" />
        <div className="aurora-blob bottom-[-30%] right-[-30%] w-[1000px] h-[1000px] bg-indigo-400 rounded-full" style={{ animationDelay: '8s' }} />

        {/* [STYLE] Added relative z-10 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          
          {/* --- Header --- */}
          <header className="text-center mb-24 animate-on-scroll">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {/* [THEME] Changed to text-blue-600 */ }
              {/* [FIX] Removed neon-text-glow class */ }
              <span className="text-blue-600">PromptX</span> – AI Workshop
            </h1>
            {/* [THEME] Changed text to gray-700 */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
              A hands-on workshop for students in Classes 7–10 to boost academic creativity & productivity using AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* [FIX] Removed animate-pulse-glow class */ }
              <a href="#registration" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
                Register Now
              </a>
              {/* [THEME] Changed to white bg, blue border/text */}
              <a href="/images/logos/PromptX.jpg" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-blue-600 font-semibold text-lg border border-blue-600 shadow-sm hover:bg-blue-50 hover:border-blue-700 transition-all transform hover:-translate-y-0.5">
                Download Poster
              </a>
            </div>
          </header>

          {/* --- About Section --- */}
          {/* [ULTIMATE] Frosted glass card */ }
          <section className="mb-24 p-8 md:p-12 rounded-2xl neon-card-border animate-on-scroll">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">About PromptX</h2>
            {/* [THEME] Changed text to gray-700 */}
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
            {/* [THEME] Changed to text-blue-600 */ }
            {/* [FIX] Removed neon-text-glow class */ }
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center"><span className="text-blue-600">Workshop Highlights</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
              {workshopHighlights.map((item, index) => (
                // [ULTIMATE] Frosted glass tiltable card
                <TiltableCard 
                  key={item.text} 
                  className={`p-6 rounded-xl flex items-center gap-5 transition-all neon-card-border animate-on-scroll`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* [THEME] Changed icon bg */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    {/* [FIX] Removed neon-icon-glow class */ }
                    {React.cloneElement(item.icon, { className: `${item.icon.props.className}` })}
                  </div>
                  {/* [THEME] Changed text color */}
                  <span className="text-lg font-semibold text-gray-800">{item.text}</span>
                </TiltableCard>
              ))}
            </div>
          </section>

          {/* --- Details Row: Who, Structure, Fee --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24" style={{ perspective: '1000px' }}>
            {/* [THEME] Changed bg, border, text */ }
            {/* [ULTIMATE] Frosted glass tiltable card. Manually applying bg-blue-50/70 */}
            <TiltableCard className="border-l-4 border-blue-500 p-8 rounded-r-lg neon-card-border animate-on-scroll" style={{ backgroundColor: 'rgba(239, 246, 255, 0.75)' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                {/* [FIX] Removed neon-icon-glow class */ }
                <IconUsers className="w-7 h-7 text-blue-500" />
                Who Can Attend
              </h3>
              <p className="text-lg text-gray-700">
                Classes 7–10<br/>
                No coding knowledge required.<br/>
                Max batch size as per school hall capacity.
              </p>
            </TiltableCard>
            
            {/* [ULTIMATE] Frosted glass card */ }
            <div className="lg:col-span-2 p-8 rounded-lg neon-card-border animate-on-scroll" style={{ transitionDelay: '100ms' }}>
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Workshop Structure</h3>
               <table className="w-full text-left mb-6">
                 <thead>
                   {/* [THEME] Changed bg, border, text */ }
                   <tr className="bg-gray-50/50 border-b-2 border-gray-200">
                     <th className="py-4 px-5 font-semibold text-gray-500 uppercase text-sm tracking-wider">Session</th>
                     <th className="py-4 px-5 font-semibold text-gray-500 uppercase text-sm tracking-wider">Duration</th>
                     <th className="py-4 px-5 font-semibold text-gray-500 uppercase text-sm tracking-wider">Outcome</th>
                   </tr>
                 </thead>
                 <tbody>
                   {/* [THEME] Changed border, text */ }
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
            {/* [THEME] Changed text color */ }
            {/* [FIX] Removed neon-text-glow class */ }
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center"><span className="text-blue-600">Tools We'll Explore</span></h3>
            
            {/* [FIX] Removed filter blur-lg class */ }
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 relative locked-tools-content">
              {tools.map((t) => (
                // [ULTIMATE] Frosted glass card
                <div key={t} className="p-4 rounded-xl shadow-sm flex items-center gap-4 neon-card-border" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-lg">
                    {t[0]}
                  </div>
                  <div className="text-base font-semibold text-gray-700">{t}</div>
                </div>
              ))}
            </div>
            
            {/* [ULTIMATE] Frosted glass overlay */ }
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20">
              {/* [FIX] Removed neon-icon-glow class */ }
              <IconLock className="w-12 h-12 text-blue-500 mb-4 animate-pulse" />
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Want to see the full toolkit?</h4>
              <p className="text-lg text-gray-600 mb-6 max-w-sm">
                Register now to unlock the full list of powerful AI tools covered in the workshop.
              </p>
              {/* [FIX] Removed animate-pulse-glow class */ }
              <a href="#registration" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
                Register to Reveal
              </a>
            </div>
          </section>

          {/* --- Benefits Sections --- */}
          <section className="mb-24" style={{ perspective: '1000px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* [ULTIMATE] Frosted glass tiltable card */ }
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
                    <li 
                      key={b} 
                      className="flex items-center gap-3 text-lg text-gray-700 animate-on-scroll"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {/* [FIX] Removed neon-icon-glow class */ }
                      <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </TiltableCard>
              {/* [ULTIMATE] Frosted glass tiltable card */ }
              <TiltableCard className="p-8 rounded-xl neon-card-border animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits to School</h3>
                <ul className="list-none pl-0 space-y-3">
                  {[
                    'All sessions conducted by AI professionals',
                    'Mentors and instructors provided',
                    'Study materials & certificates included',
                    'Full technical & workshop management'
                  ].map((b, i) => (
                    <li 
                      key={b} 
                      className="flex items-center gap-3 text-lg text-gray-700 animate-on-scroll"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {/* [FIX] Removed neon-icon-glow class */ }
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
            {/* [ULTIMATE] Frosted glass card */ }
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
                  <li 
                    key={b} 
                    className="flex items-center gap-3 text-lg text-gray-700 animate-on-scroll"
                    style={{ transitionDelay: `${Math.floor(i / 2) * 50}ms` }}
                  >
                    {/* [THEME] Changed icon color */ }
                    {/* [FIX] Removed neon-icon-glow class */ }
                    <IconClipboardList className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --- Registration Section --- */}
          <section id="registration" className="mb-24 animate-on-scroll">
            <div className="max-w-3xl mx-auto">
              
              {/* [ULTIMATE] Frosted glass card */ }
              <div className="mb-12 p-8 rounded-2xl border border-blue-200/50 text-center neon-card-border">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Step 1: Complete Payment</h3>
                <p className="text-2xl font-bold text-blue-600 mb-4">Fee: ₹149 per participant</p>
                
                <img 
                  src="\images\logos\WhatsApp Image 2025-10-07 at 18.03.41_1cc79ef4.jpg" 
                  alt="Payment QR Code"
                  className="w-64 h-64 mx-auto rounded-lg shadow-md border-4 border-blue-200"
                />
                <p className="text-lg font-medium text-gray-800 mt-6">
                  UPI ID: <strong>udayl4905-2@okaxis</strong>
                </p>
                 <p className="text-gray-600 mt-2">After paying, please fill out the form below and upload the screenshot.</p>
              </div>

              {/* [ULTIMATE] Frosted glass card */ }
              <div className="p-8 md:p-12 rounded-2xl neon-card-border">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Step 2: Register for PromptX</h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form Inputs */}
                  <div className="md:col-span-2">
                    {/* [THEME] Changed text color */ }
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Student's Name</label>
                    {/* [THEME] Changed input style */ }
                    <input id="name" required placeholder="e.g. Rohan Sharma" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>
                  
                  <div>
                    <label htmlFor="classLevel" className="block text-sm font-medium text-gray-600 mb-1">Class</label>
                    {/* [THEME] Changed select style */ }
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
                    <label htmlFor="transactionId" className="block text-sm font-medium text-gray-600 mb-1">Transaction ID (Required)</label>
                    <input id="transactionId" placeholder="Enter UPI Transaction ID or Ref No." value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="screenshot" className="block text-sm font-medium text-gray-600 mb-1">Payment Screenshot (Required)</label>
                    {/* [THEME] Changed file input style */ }
                    <input 
                      id="screenshot" 
                      type="file" 
                      required 
                      onChange={handleFileChange} 
                      accept="image/png, image/jpeg, image/jpg"
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 p-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" 
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-600 mb-1">Notes (Optional)</label>
                    <textarea id="notes" placeholder="Any questions or comments?" value={notes} onChange={e => setNotes(e.target.value)} rows="3" className="w-full p-4 border border-gray-300 rounded-lg bg-white/50 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>

                  {/* Submit Button & Helper Text */}
                  <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mt-4">
                    {/* [FIX] Removed animate-pulse-glow class */ }
                    <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {submitting ? 'Submitting...' : 'Register Now'}
                    </button>
                    {/* [THEME] Changed text color */ }
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
            </div>
          </section>

          {/* --- Registration Success Popup --- */}
          {showSuccessPopup && (
            <div className="fixed inset-0 z-[100002] flex items-center justify-center p-4" style={{ perspective: '1000px' }}>
              {/* [THEME] Lighter backdrop */ }
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowSuccessPopup(false)} />

              {/* [ULTIMATE] Frosted glass tiltable popup */ }
              <TiltableCard className="w-full max-w-2xl">
                <div className="relative z-10 w-full grand-popup rounded-3xl p-6 sm:p-8 md:p-10 text-center overflow-visible">
                  {/* Confetti layer */}
                  <div className="confetti-area" aria-hidden>
                    <div className="confetti-piece c1"></div>
                    <div className="confetti-piece c2"></div>
                    <div className="confetti-piece c3"></div>
                    <div className="confetti-piece c4"></div>
                    <div className="confetti-piece c5"></div>
                    <div className="confetti-piece c6"></div>
                    <div className="confetti-piece c7"></div>
                    <div className="confetti-piece c8"></div>
                    <div className="confetti-piece c9"></div>
                    <div className="confetti-piece c10"></div>
                    <div className="confetti-piece c11"></div>
                    <div className="confetti-piece c12"></div>
                  </div>

                  <div className="mx-auto max-w-xl">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center mb-4 shadow-lg">
                      {/* [THEME] Emoji hero */ }
                      <div className="text-white popup-hero">🎉</div>
                    </div>
                    {/* [THEME] Light text */ }
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Registration Confirmed!</h3>
                    <p className="text-md sm:text-lg text-gray-800 mb-4">You've successfully registered for PromptX.</p>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">You'll receive your ticket via email shortly. Please print the ticket from that email and present the printed ticket at the event entrance. You may use the button below to save a PDF or print this confirmation as a backup if needed.</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button onClick={() => setShowSuccessPopup(false)} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition-colors">Close</button>
                      <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" onClick={() => { setShowSuccessPopup(false); }} className="px-4 py-2 text-sm text-blue-600 hover:underline">Got Email? View Ticket</a>
                    </div>
                  </div>
                </div>
              </TiltableCard>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
}



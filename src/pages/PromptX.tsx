// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// [NEW] Added Lock Icon for the "Tools" section overlay
const IconLock = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// [NEW] Added Clipboard Icon for Guidelines
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

// --- The Main Component ---

export default function PromptXDark() {
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('7'); // [EDIT] Changed default to Class 7
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentScreenshot(e.target.files[0]);
    } else {
      setPaymentScreenshot(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  // Ensure Supabase client is available
  if (!supabase) {
    setMessage('Supabase client not available. Please configure the Supabase client.');
    setIsError(true);
    setSubmitting(false);
    return;
  }
    
  setSubmitting(true);
    setMessage(null);
    setIsError(false);

    // --- Basic Client-side Validations ---
    // Email must be provided
    if (!email || !email.trim()) {
      setMessage('Please provide a valid email address.');
      setIsError(true);
      setSubmitting(false);
      return;
    }

    // simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setMessage('Please provide a valid email address.');
      setIsError(true);
      setSubmitting(false);
      return;
    }

    // Transaction ID must be present (input already has required attr, but double-check)
    if (!transactionId || !transactionId.trim()) {
      setMessage('Transaction ID is required.');
      setIsError(true);
      setSubmitting(false);
      return;
    }

    // --- Normalize and check uniqueness of Transaction ID before uploading screenshot ---
    const rawTx = transactionId || '';
    const txTrimmed = rawTx.trim().replace(/\s+/g, ' ');
    // Remove SQL wildcard chars to avoid accidental matches
    const safeTx = txTrimmed.replace(/[%_]/g, '');

    try {
      const txSearch = `%Transaction ID: ${safeTx}%`;
      const { data: existing, error: txError } = await supabase
        .from('custom_contacts')
        .select('id, message')
        .ilike('message', txSearch)
        .limit(1);

      if (txError) {
        console.error('Error checking transaction uniqueness:', txError);
        setMessage('Unable to verify transaction ID uniqueness. Please try again later.');
        setIsError(true);
        setSubmitting(false);
        return;
      }

      // Debug log for troubleshooting (can be removed later)
      console.debug('Transaction uniqueness check:', { txSearch, existing });

      if (existing && existing.length > 0) {
        setMessage('This Transaction ID has already been used. If you think this is an error, contact us.');
        setIsError(true);
        setSubmitting(false);
        return;
      }
      // use safeTx for the rest of the submission
      transactionId = safeTx;
    } catch (err) {
      console.error('Unexpected error when checking transaction uniqueness:', err);
      setMessage('Unexpected error while validating transaction ID. Please try again.');
      setIsError(true);
      setSubmitting(false);
      return;
    }

    let screenshotPath = 'N/A';
    let uploadError = null;

    // --- 1. Handle File Upload ---
    if (!paymentScreenshot) {
        setMessage('Please upload a payment screenshot.');
        setIsError(true);
        setSubmitting(false);
        return;
    }

    const file = paymentScreenshot;
    // Sanitize file name to remove special characters
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9_.]/g, '_');
    // Create a unique file path
    const filePath = `screenshots/${Date.now()}_${cleanFileName}`;

    try {
        // We assume a bucket named 'registrations' exists
        // See SUPABASE_SETUP.md for instructions on how to create it
        const { data: uploadData, error } = await supabase.storage
            .from('registrations') // BUCKET NAME
            .upload(filePath, file);

        if (error) throw error; // Throw error to be caught by catch block
        
        // We just save the path, not the full public URL
        screenshotPath = filePath; 

    } catch (error) {
        console.error('Error uploading screenshot:', error);
        uploadError = error;
    }
    
    if (uploadError) {
        setMessage(`Error uploading screenshot: ${uploadError.message}. Please try again.`);
        setIsError(true);
        setSubmitting(false);
        return; // Stop submission if file upload fails
    }

    // --- 2. Insert Form Data ---
    // Now we insert the form data, including the path to the uploaded file
    const payloadMessage = `Class: ${classLevel}\nParent: ${parentName}\nMobile: ${mobile}\nNotes: ${notes}\nTransaction ID: ${transactionId}\nScreenshot Path: ${screenshotPath}`;

    try {
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
      setName(''); setParentName(''); setMobile(''); setEmail(''); setNotes(''); setTransactionId(''); setClassLevel('7'); // [EDIT] Reset to Class 7
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

  // Success popup remains open until user closes it via the Close button
  
  const workshopHighlights = [
    { text: "Live AI Tool Demonstrations", icon: <IconSparkles className="w-7 h-7 text-blue-400" /> },
    { text: "Hands-on Project-Based Tasks", icon: <IconRocket className="w-7 h-7 text-green-400" /> },
    { text: "Certificates for All Participants", icon: <IconAward className="w-7 h-7 text-amber-400" /> },
    { text: "Ethical & Safe AI Use Training", icon: <IconShieldCheck className="w-7 h-7 text-red-400" /> },
    { text: "Fun & Interactive Sessions", icon: <IconSparkles className="w-7 h-7 text-purple-400" /> },
    { text: "Future-Ready Skills", icon: <IconRocket className="w-7 h-7 text-indigo-400" /> }
  ];
  
  // [EDIT] Updated tools list based on the provided document
  const tools = ['ChatGPT', 'Gemini', 'Perplexity', 'Notion AI', 'Gamma', 'Elicit', 'RunwayML', 'ElevenLabs', 'MidJourney', 'Descript', 'Veo 3', 'Lindy', 'N8N', 'Notebook LM'];

  return (
    // [STYLE] Added fragment to host <style> tag
    <>
      {/* [NEW] Style tag for glows, animations, and background effects */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 25px rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.7), 0 0 40px rgba(59, 130, 246, 0.4);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
        .neon-text-glow {
          filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.8));
        }
        .neon-icon-glow {
          filter: drop-shadow(0 0 8px currentColor);
        }
        .neon-card-border {
          box-shadow: 0 0 1px rgba(255, 255, 255, 0.2), 0 0 3px rgba(96, 165, 250, 0.3), 0 0 12px rgba(96, 165, 250, 0.2);
        }
        .neon-input-focus:focus {
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.8);
          border-color: rgba(59, 130, 246, 0.8) !important;
        }
        .grid-background {
          position: fixed;
          inset: 0;
          z-index: -10;
          background-image:
            linear-gradient(to right, rgba(147, 197, 253, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(147, 197, 253, 0.05) 1px, transparent 1px);
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
          opacity: 0.15;
          will-change: transform;
          animation: aurora-slide 25s infinite ease-in-out;
          z-index: -5;
        }
        /* Success popup: grand futuristic celebration */
        @keyframes popup-scale {
          0% { transform: translateY(10px) scale(0.96); opacity: 0 }
          60% { transform: translateY(-6px) scale(1.02); opacity: 1 }
          100% { transform: translateY(0) scale(1); opacity: 1 }
        }
        .grand-popup {
          animation: popup-scale 550ms cubic-bezier(.2,.9,.2,1);
          border: 1px solid rgba(255,255,255,0.06);
          background: linear-gradient(135deg, rgba(10,12,20,0.9), rgba(20,22,30,0.85));
          backdrop-filter: blur(8px) saturate(140%);
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
      
      {/* [STYLE] Added relative, overflow-hidden */}
      <div className="min-h-screen bg-gray-950 text-slate-200 font-sans antialiased relative overflow-hidden">
        
        {/* [NEW] Background Effects */}
        <div className="grid-background" />
        <div className="aurora-blob top-[-20%] left-[-20%] w-[800px] h-[800px] bg-blue-600 rounded-full" />
        <div className="aurora-blob bottom-[-30%] right-[-30%] w-[1000px] h-[1000px] bg-indigo-700 rounded-full" style={{ animationDelay: '8s' }} />

        {/* [STYLE] Added relative z-10 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          
          {/* --- Header --- */}
          <header className="text-center mb-24">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              {/* [STYLE] Added neon-text-glow */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 neon-text-glow">PromptX</span> – AI Workshop
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
              A hands-on workshop for students in Classes 7–10 to boost academic creativity & productivity using AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* [STYLE] Added animate-pulse-glow */}
              <a href="#registration" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 animate-pulse-glow">
                Register Now
              </a>
              {/* [STYLE] Enhanced border and hover */}
              <a href="/images/logos/PromptX.jpg" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-slate-200 font-semibold text-lg border border-blue-400/30 shadow-sm hover:bg-white/10 hover:border-blue-400/70 transition-all transform hover:-translate-y-0.5">
                Download Poster
              </a>
            </div>
          </header>

          {/* --- About Section --- */}
          {/* [STYLE] Added neon-card-border */}
          <section className="mb-24 bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-xl border border-white/10 neon-card-border">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">About PromptX</h2>
            <div className="text-lg text-slate-300 space-y-5 leading-relaxed max-w-4xl mx-auto">
              <p>
                <strong>PromptX</strong> is an interactive 6 hour workshop designed to demystify Artificial Intelligence for students. We move beyond the hype and focus on practical, hands-on applications that can immediately help students with their schoolwork.
              </p>
              <p>
                This workshop introduces students to powerful AI tools for research, writing, presentation design, and creative projects. We emphasize ethical use and critical thinking, ensuring students become responsible digital citizens. No prior coding knowledge is required; all activities are project-focused and designed to be fun and engaging.
              </p>
            </div>
          </section>

          {/* --- Workshop Highlights --- */}
          <section className="mb-24">
            {/* [STYLE] Added neon-text-glow */}
            <h3 className="text-3xl font-bold text-white mb-12 text-center neon-text-glow">Workshop Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopHighlights.map((item) => (
                // [STYLE] Added neon-card-border and enhanced hover
                <div key={item.text} className="bg-white/5 p-6 rounded-xl shadow-lg border border-white/10 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1 hover:border-white/20 hover:shadow-blue-500/20 neon-card-border">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    {/* [STYLE] Cloned icon to add neon-icon-glow class */}
                    {React.cloneElement(item.icon, { className: `${item.icon.props.className} neon-icon-glow` })}
                  </div>
                  <span className="text-lg font-semibold text-slate-200">{item.text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* --- Details Row: Who, Structure, Fee --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
            {/* [STYLE] Added neon-card-border */}
            <div className="bg-blue-900/30 border-l-4 border-blue-500 p-8 rounded-r-lg shadow-lg neon-card-border">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                {/* [STYLE] Added neon-icon-glow */}
                <IconUsers className="w-7 h-7 text-blue-400 neon-icon-glow" />
                Who Can Attend
              </h3>
              <p className="text-lg text-slate-300">
                Classes 7–10<br/>
                No coding knowledge required.<br/>
                Max batch size as per school hall capacity.
              </p>
            </div>
            
            {/* [STYLE] Added neon-card-border */}
            <div className="lg:col-span-2 bg-white/5 p-8 rounded-lg shadow-lg border border-white/10 neon-card-border">
               <h3 className="text-2xl font-bold text-white mb-6">Workshop Structure</h3>
               <table className="w-full text-left mb-6">
                <thead>
                  <tr className="bg-white/5 border-b-2 border-white/10">
                    <th className="py-4 px-5 font-semibold text-slate-400 uppercase text-sm tracking-wider">Session</th>
                    <th className="py-4 px-5 font-semibold text-slate-400 uppercase text-sm tracking-wider">Duration</th>
                    <th className="py-4 px-5 font-semibold text-slate-400 uppercase text-sm tracking-wider">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-5 text-slate-300 text-lg">Session 1: Discovering the World of AI</td>
                    <td className="py-4 px-5 text-slate-300 text-lg">3 hr</td>
                    <td className="py-4 px-5 text-slate-300 text-lg">Intro to AI, its impact, & tool demos</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-5 text-slate-300 text-lg">Session 2: Hands-On with AI Tools</td>
                    <td className="py-4 px-5 text-slate-300 text-lg">3 hrs</td>
                    <td className="py-4 px-5 text-slate-300 text-lg">Guided practice, Q&A, & feedback</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <p className="text-xl text-slate-300">Total Duration: <strong>6 Hours</strong></p>
                <p className="text-2xl font-bold text-blue-400">Fee: ₹149 per participant</p>
              </div>
            </div>
          </div>

          {/* --- Tools Covered --- */}
          <section className="mb-24 relative">
            {/* [STYLE] Added neon-text-glow */}
            <h3 className="text-3xl font-bold text-white mb-12 text-center neon-text-glow">Tools We'll Explore</h3>
            
            {/* [STYLE] Made blur stronger */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 filter blur-lg">
              {tools.map((t) => (
                <div key={t} className="bg-white/5 p-4 border border-white/10 rounded-xl shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-lg flex items-center justify-center text-blue-300 font-bold text-lg">
                    {t[0]}
                  </div>
                  <div className="text-base font-semibold text-slate-300">{t}</div>
                </div>
              ))}
            </div>
            
            {/* [STYLE] Stronger backdrop blur, added glow to icon and button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/80 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
              <IconLock className="w-12 h-12 text-blue-500 mb-4 animate-pulse neon-icon-glow" />
              <h4 className="text-2xl font-bold text-white mb-2">Want to see the full toolkit?</h4>
              <p className="text-lg text-slate-400 mb-6 max-w-sm">
                Register now to unlock the full list of powerful AI tools covered in the workshop.
              </p>
              <a href="#registration" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 animate-pulse-glow">
                Register to Reveal
              </a>
            </div>
          </section>

          {/* --- Benefits Sections --- */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* [STYLE] Added neon-card-border */}
              <div className="bg-white/5 p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-lg neon-card-border">
                <h3 className="text-2xl font-bold text-white mb-6">Benefits to Students</h3>
                <ul className="list-none pl-0 space-y-3">
                  {[
                    'Confidently use multiple AI tools',
                    'Design better presentations & reports',
                    'Automate repetitive tasks to save time',
                    'Use prompt engineering for better AI responses',
                    'Apply AI ethics in academic work'
                  ].map(b => (
                    <li key={b} className="flex items-center gap-3 text-lg text-slate-300">
                      <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0 neon-icon-glow" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* [STYLE] Added neon-card-border */}
              <div className="bg-white/5 p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-lg neon-card-border">
                <h3 className="text-2xl font-bold text-white mb-6">Benefits to School</h3>
                <ul className="list-none pl-0 space-y-3">
                  {[
                    'All sessions conducted by AI professionals',
                    'Mentors and instructors provided',
                    'Study materials & certificates included',
                    'Full technical & workshop management'
                  ].map(b => (
                    <li key={b} className="flex items-center gap-3 text-lg text-slate-300">
                      <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0 neon-icon-glow" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* --- Event Guidelines Section --- */}
          <section className="mb-24">
            {/* [STYLE] Added neon-card-border */}
            <div className="bg-white/5 p-8 rounded-xl shadow-lg border border-white/10 backdrop-blur-lg neon-card-border">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Event Guidelines</h3>
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
                ].map(b => (
                  <li key={b} className="flex items-center gap-3 text-lg text-slate-300">
                    <IconClipboardList className="w-5 h-5 text-amber-400 flex-shrink-0 neon-icon-glow" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* --- Registration Section --- */}
          <section id="registration" className="mb-24">
            <div className="max-w-3xl mx-auto">
              
              {/* [STYLE] Added stronger blue border and neon-card-border */}
              <div className="mb-12 p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-blue-500/50 text-center shadow-lg neon-card-border">
                <h3 className="text-3xl font-bold text-white mb-6">Step 1: Complete Payment</h3>
                <p className="text-2xl font-bold text-blue-400 mb-4">Fee: ₹149 per participant</p>
                
                {/* [STYLE] Added neon glow to QR code */}
                <img 
                  src="\images\logos\WhatsApp Image 2025-10-07 at 18.03.41_1cc79ef4.jpg" 
                  alt="Payment QR Code"
                  className="w-64 h-64 mx-auto rounded-lg shadow-md border-4 border-blue-500/30 shadow-blue-500/20"
                />
                <p className="text-lg font-medium text-slate-300 mt-6">
                  UPI ID: <strong>udayl4905-2@okaxis</strong>
                </p>
                 <p className="text-slate-400 mt-2">After paying, please fill out the form below and upload the screenshot.</p>
              </div>

              {/* [STYLE] Added neon-card-border */}
              <div className="bg-white/5 backdrop-blur-lg p-8 md:p-12 rounded-2xl shadow-xl border border-white/10 neon-card-border">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Step 2: Register for PromptX</h3>
                
                <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Form Inputs */}
                  <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Student's Name</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <input id="name" required placeholder="e.g. Rohan Sharma" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>
                  
                  <div>
                    <label htmlFor="classLevel" className="block text-sm font-medium text-slate-400 mb-1">Class</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <select id="classLevel" value={classLevel} onChange={e => setClassLevel(e.target.value)} className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none neon-input-focus">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <option key={i} value={7 + i}>Class {7 + i}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="parentName" className="block text-sm font-medium text-slate-400 mb-1">Parent's Name</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <input id="parentName" required placeholder="e.g. Priya Sharma" value={parentName} onChange={e => setParentName(e.target.value)} className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-slate-400 mb-1">Mobile Number</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <input id="mobile" type="tel" required placeholder="10-digit mobile number" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email (Required)</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <input id="email" type="email" required placeholder="e.g. parent@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="transactionId" className="block text-sm font-medium text-slate-400 mb-1">Transaction ID (Required)</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <input id="transactionId" required placeholder="Enter UPI Transaction ID or Ref No." value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="screenshot" className="block text-sm font-medium text-slate-400 mb-1">Payment Screenshot (Required)</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <input 
                      id="screenshot" 
                      type="file" 
                      required 
                      onChange={handleFileChange} 
                      accept="image/png, image/jpeg, image/jpg"
                      className="w-full text-sm text-slate-400 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 p-2 border border-gray-700 rounded-lg bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" 
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-slate-400 mb-1">Notes (Optional)</label>
                    {/* [STYLE] Added neon-input-focus */}
                    <textarea id="notes" placeholder="Any questions or comments?" value={notes} onChange={e => setNotes(e.target.value)} rows="3" className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all neon-input-focus" />
                  </div>

                  {/* Submit Button & Helper Text */}
                  <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mt-4">
                    {/* [STYLE] Added animate-pulse-glow */}
                    <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed animate-pulse-glow">
                      {submitting ? 'Submitting...' : 'Register Now'}
                    </button>
                    <div className="text-sm text-slate-400 text-center sm:text-left">
                      We will contact you via phone/email to confirm your slot.
                    </div>
                  </div>
                </form>
                
                {/* --- Success/Error Message --- */}
                {message && (
                  <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
                    isError 
                      ? 'bg-red-900/50 text-red-300 border border-red-700' 
                      : 'bg-green-900/50 text-green-300 border border-green-700'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Contact section removed as requested */}

          {/* --- Registration Success Popup --- */}
          {showSuccessPopup && (
            <div className="fixed inset-0 z-[100002] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setShowSuccessPopup(false)} />

              <div className="relative z-10 w-full max-w-2xl grand-popup rounded-3xl p-6 sm:p-8 md:p-10 text-center overflow-visible">
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
                    <div className="text-white popup-hero">🎉</div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Registration Confirmed!</h3>
                  <p className="text-md sm:text-lg text-slate-200 mb-4">You've successfully registered for PromptX.</p>
                  <p className="text-sm sm:text-base text-slate-300 mb-6">You'll receive your ticket via email shortly. Please print the ticket from that email and present the printed ticket at the event entrance. You may use the button below to save a PDF or print this confirmation as a backup if needed.</p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button onClick={() => { window.print(); }} className="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-black font-bold rounded-full shadow hover:scale-105 transition-transform">Save as PDF / Print (Backup)</button>
                    <button onClick={() => setShowSuccessPopup(false)} className="px-6 py-3 border border-white/10 text-white rounded-full">Close</button>
                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" onClick={() => { setShowSuccessPopup(false); }} className="px-4 py-2 text-sm text-white/90">Got Email? View Ticket</a>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
}


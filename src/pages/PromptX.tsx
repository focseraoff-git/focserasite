// @ts-nocheck
import React, { useState, useRef } from 'react';
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

// --- The Main Component ---

export default function PromptX() {
  const [name, setName] = useState('');
  const [classLevel, setClassLevel] = useState('6');
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
    setSubmitting(true);
    setMessage(null);
    setIsError(false);

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
      setName(''); setParentName(''); setMobile(''); setEmail(''); setNotes(''); setTransactionId(''); setClassLevel('6');
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
    { text: "Certificates for All Participants", icon: <IconAward className="w-7 h-7 text-amber-500" /> },
    { text: "Ethical & Safe AI Use Training", icon: <IconShieldCheck className="w-7 h-7 text-red-500" /> },
    { text: "Fun & Interactive Sessions", icon: <IconSparkles className="w-7 h-7 text-purple-500" /> },
    { text: "Future-Ready Skills", icon: <IconRocket className="w-7 h-7 text-indigo-500" /> }
  ];
  
  const tools = ['ChatGPT', 'Gemini', 'Perplexity', 'Notion AI', 'Gamma', 'Elicit', 'RunwayML', 'ElevenLabs', 'MidJourney'];

  return (
    // [STYLE] Changed background to bg-slate-50 for a softer, more premium feel
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        
        {/* --- Header --- */}
        <header className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">PromptX</span> – AI Workshop
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10">
            A hands-on workshop for students in Classes 6–10 to boost academic creativity & productivity using AI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#registration" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
              Register Now
            </a>
            <a href="#" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-semibold text-lg border border-slate-300 shadow-sm hover:bg-slate-50 transition-all transform hover:-translate-y-0.5">
              Download Brochure
            </a>
          </div>
        </header>

        {/* --- About Section --- */}
        {/* [STYLE] Changed to bg-white to create a "card" effect on the bg-slate-50 page */}
        <section className="mb-24 bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">About PromptX</h2>
          <div className="text-lg text-slate-700 space-y-5 leading-relaxed max-w-4xl mx-auto">
            <p>
              <strong>PromptX</strong> is an interactive 2-3 hour workshop designed to demystify Artificial Intelligence for students. We move beyond the hype and focus on practical, hands-on applications that can immediately help students with their schoolwork.
            </p>
            <p>
              This workshop introduces students to powerful AI tools for research, writing, presentation design, and creative projects. We emphasize ethical use and critical thinking, ensuring students become responsible digital citizens. No prior coding knowledge is required; all activities are project-focused and designed to be fun and engaging.
            </p>
          </div>
        </section>

        {/* --- Workshop Highlights --- */}
        <section className="mb-24">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Workshop Highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopHighlights.map((item) => (
              // [STYLE] Added hover:shadow-xl for a more pronounced hover effect
              <div key={item.text} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 flex items-center gap-5 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-lg font-semibold text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- Details Row: Who, Structure, Fee --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Who can attend */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 rounded-r-lg shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <IconUsers className="w-7 h-7 text-blue-600" />
              Who Can Attend
            </h3>
            <p className="text-lg text-slate-700">
              Classes 6–10<br/>
              No coding knowledge required.<br/>
              Max batch size as per school hall capacity.
            </p>
          </div>
          
          {/* Workshop Structure */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md border border-slate-200">
             <h3 className="text-2xl font-bold text-slate-800 mb-6">Workshop Structure</h3>
             <table className="w-full text-left mb-6">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-200">
                  <th className="py-4 px-5 font-semibold text-slate-600 uppercase text-sm tracking-wider">Session</th>
                  <th className="py-4 px-5 font-semibold text-slate-600 uppercase text-sm tracking-wider">Duration</th>
                  <th className="py-4 px-5 font-semibold text-slate-600 uppercase text-sm tracking-wider">Outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-5 text-slate-700 text-lg">Session 1: Discover</td>
                  <td className="py-4 px-5 text-slate-700 text-lg">1 hr</td>
                  <td className="py-4 px-5 text-slate-700 text-lg">AI Introduction + Tool Demos</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-4 px-5 text-slate-700 text-lg">Session 2: Create</td>
                  <td className="py-4 px-5 text-slate-700 text-lg">1–1.5 hrs</td>
                  <td className="py-4 px-5 text-slate-700 text-lg">Hands-on Practice + Project</td>
                </tr>
              </tbody>
            </table>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xl text-slate-700">Total Duration: <strong>2–3 Hours</strong></p>
              <p className="text-2xl font-bold text-blue-600">Fee: ₹149 per participant</p>
            </div>
          </div>
        </div>

        {/* --- Tools Covered --- */}
        {/* [NEW] Made section relative to contain the overlay */}
        <section className="mb-24 relative">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">Tools We'll Explore</h3>
          
          {/* [NEW] Added filter and blur to create suspense as requested */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 filter blur-md">
            {tools.map((t) => (
              <div key={t} className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center text-blue-700 font-bold text-lg">
                  {t[0]}
                </div>
                <div className="text-base font-semibold text-slate-700">{t}</div>
              </div>
            ))}
          </div>
          
          {/* [NEW] Added overlay with CTA to "unlock" the blurred content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center">
            <IconLock className="w-12 h-12 text-blue-600 mb-4" />
            <h4 className="text-2xl font-bold text-slate-900 mb-2">Want to see the full toolkit?</h4>
            <p className="text-lg text-slate-600 mb-6 max-w-sm">
              Register now to unlock the full list of powerful AI tools covered in the workshop.
            </p>
            <a href="#registration" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5">
              Register to Reveal
            </a>
          </div>
        </section>

        {/* --- Benefits Sections --- */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Benefits to Students</h3>
              <ul className="list-none pl-0 space-y-3">
                {['Faster homework and research', 'Better presentation & communication skills', 'Improved confidence in technology', 'Creativity boost for projects', 'Early exposure to future careers'].map(b => (
                  <li key={b} className="flex items-center gap-3 text-lg text-slate-700">
                    <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Benefits to School</h3>
              <ul className="list-none pl-0 space-y-3">
                {['NEP 2020 aligned education', 'Tech-forward school reputation', 'Social media coverage opportunities', 'Increased parent & student satisfaction'].map(b => (
                  <li key={b} className="flex items-center gap-3 text-lg text-slate-700">
                    <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- Registration Section --- */}
        <section id="registration" className="mb-24">
          <div className="max-w-3xl mx-auto">
            
            {/* --- Step 1: Payment --- */}
            {/* [STYLE] Changed to bg-white to stand out on the bg-slate-50 page */}
            <div className="mb-12 p-8 bg-white rounded-2xl border border-slate-200 text-center shadow-lg">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Step 1: Complete Payment</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">Fee: ₹149 per participant</p>
              
              {/* [FIX] Replaced broken local image path with a functional placeholder.
                  The original path "\images\logos\..." will not work in a web browser. */}
              <img 
                src="\images\logos\WhatsApp Image 2025-10-07 at 18.03.41_1cc79ef4.jpg" 
                alt="Payment QR Code"
                className="w-64 h-64 mx-auto rounded-lg shadow-md"
                onError={(e) => e.target.src = 'https://placehold.co/256x256/eee/999?text=QR+Code'}
              />
              <p className="text-lg font-medium text-slate-700 mt-6">
                UPI ID: <strong>promptx@upi</strong>
              </p>
               <p className="text-slate-500 mt-2">After paying, please fill out the form below and upload the screenshot.</p>
            </div>

            {/* --- Step 2: Registration Form --- */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Step 2: Register for PromptX</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Inputs */}
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Student's Name</label>
                  <input id="name" required placeholder="e.g. Rohan Sharma" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                
                <div>
                  <label htmlFor="classLevel" className="block text-sm font-medium text-slate-600 mb-1">Class</label>
                  <select id="classLevel" value={classLevel} onChange={e => setClassLevel(e.target.value)} className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <option key={i} value={6 + i}>Class {6 + i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-slate-600 mb-1">Parent's Name</label>
                  <input id="parentName" required placeholder="e.g. Priya Sharma" value={parentName} onChange={e => setParentName(e.target.value)} className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-slate-600 mb-1">Mobile Number</label>
                  <input id="mobile" type="tel" required placeholder="10-digit mobile number" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email (Optional)</label>
                  <input id="email" type="email" placeholder="e.g. parent@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="transactionId" className="block text-sm font-medium text-slate-600 mb-1">Transaction ID (Required)</label>
                  <input id="transactionId" required placeholder="Enter UPI Transaction ID or Ref No." value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="screenshot" className="block text-sm font-medium text-slate-600 mb-1">Payment Screenshot (Required)</label>
                  <input 
                    id="screenshot" 
                    type="file" 
                    required 
                    onChange={handleFileChange} 
                    accept="image/png, image/jpeg, image/jpg"
                    className="w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 p-2 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-slate-600 mb-1">Notes (Optional)</label>
                  <textarea id="notes" placeholder="Any questions or comments?" value={notes} onChange={e => setNotes(e.target.value)} rows="3" className="w-full p-4 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>

                {/* Submit Button & Helper Text */}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-6 mt-4">
                  <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed">
                    {submitting ? 'Submitting...' : 'Register Now'}
                  </button>
                  <div className="text-sm text-slate-500 text-center sm:text-left">
                    We will contact you via phone/email to confirm your slot.
                  </div>
                </div>
              </form>
              
              {/* --- Success/Error Message --- */}
              {message && (
                <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
                  isError 
                    ? 'bg-red-100 text-red-800 border border-red-300' 
                    : 'bg-green-100 text-green-800 border border-green-300'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <footer className="text-center border-t border-slate-200 pt-16">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Us</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
             <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-3 text-lg text-slate-600 hover:text-blue-600 transition-all">
              <IconPhone className="w-5 h-5" />
              <span>+91-XXXXXXXXXX</span>
            </a>
             <a href="mailto:contact@promptx.in" className="flex items-center gap-3 text-lg text-slate-600 hover:text-blue-600 transition-all">
              <IconMail className="w-5 h-5" />
              <span>contact@promptx.in</span>
            </a>
          </div>
          <p className="text-slate-500 mt-10 text-sm">© {new Date().getFullYear()} PromptX. All rights reserved.</p>
        </footer>
        
      </div>
    </div>
  );
}


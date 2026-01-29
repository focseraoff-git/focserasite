// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import FancyModal from '../../components/FancyModal';

// --- ICONS (using inline SVGs for self-containment) ---
const Megaphone = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 11v2a2 2 0 0 0 2 2h2l8 5V4l-8 5H5a2 2 0 0 0-2 2z"></path>
        <path d="M19 11a5 5 0 0 1 0 2"></path>
    </svg>
);

const Edit = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path>
    </svg>
);

const TrendingUp = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

const ArrowRight = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const Check = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12" /></svg>
);
const ChevronDown = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const ShoppingCart = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);
const User = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const CreditCard = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
);
const List = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
);
const Sparkles = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.5 3 3 1.5 1.5-3-3-1.5z"></path>
        <path d="m3 12-1.5 3 3 1.5 1.5-3-3-1.5z"></path>
        <path d="m21 12-1.5 3 3 1.5 1.5-3-3-1.5z"></path>
        <path d="m12 21-1.5 3 3 1.5 1.5-3-3-1.5z"></path>
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
        <path d="M3 3l1.5 1.5"></path>
        <path d="M21 3l-1.5 1.5"></path>
        <path d="M21 21l-1.5-1.5"></path>
        <path d="M3 21l1.5-1.5"></path>
    </svg>
);

// --- MOCK DATA based on Media packages pricing.docx ---
// This data is used as a fallback if fetching from Supabase fails.
const packagesData = [
    {
        id: 1,
        name: "Content Engine",
        description: "Your all-in-one solution for consistent, high-quality content creation, from writing to video timelines.",
        thumbnail: "https://images.unsplash.com/photo-1516116462742-f411874254A6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        category: "Content Creation",
        standard_price: 10000,
        premium_price: 20000,
        included_services: ["Content Writing", "Caption Generation", "Video Timeline"],
        is_active: true,
    },
    {
        id: 2,
        name: "Visual Impact Bundle",
        description: "Elevate your brand's visual appeal with professional thumbnail design, video editing, and storytelling assets.",
        thumbnail: "https://images.unsplash.com/photo-1611162617213-7d724e0f2241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        category: "Visual Design",
        standard_price: 15000,
        premium_price: 28000,
        included_services: ["Thumbnail Design", "Video Editing", "Video Storytelling Assets (caption + timeline)"],
        is_active: true,
    },
    {
        id: 3,
        name: "Audience Amplifier",
        description: "Reach new heights with targeted social media marketing, ad campaigns, and powerful SEO optimization.",
        thumbnail: "https://images.unsplash.com/photo-1611926653458-0929221b2712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        category: "Marketing",
        standard_price: 25000,
        premium_price: 50000,
        included_services: ["Social Media Marketing", "Running Ads (Meta, Google)", "SEO Optimization"],
        included_services: ['Brand Film / TVC', '12 Reels/Shorts', 'SEO Blog Strategy'],
        delivery_time: '30 Days',
        ideal_for: 'Established Brands'
    },
    {
        id: '4', // This ID matches CREATOR_CHOICE_ID
        name: "Creator's Choice",
        description: 'Build your own custom package. Pick exactly what you need.',
        thumbnail: "https://images.unsplash.com/photo-1553877522-c36980345885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        included_services: ['Custom Selection'],
        delivery_time: 'Flexible',
        ideal_for: 'Everyone'
    }
];

const CREATOR_BOOST_PACKAGE = {
    id: 'creator_boost',
    name: 'CreatorBoost 10X Pack',
    description: 'The ultimate starter kit for creators. 10 Reels + 10 Posts + Strategy.',
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    included_services: ['10 High-Retention Reels', '10 Static Posts', 'Growth Strategy', 'Hashtag Research'],
    delivery_time: '30 Days',
    ideal_for: 'Creators / Influencers'
};

// Individual services derived from the "Included Services" list in the doc.
// This is used for the custom package builder.
const individualServicesData = [
    { key: 'reels', label: 'Reels / Shorts Production', category: 'Video', description: 'High-retention vertical video editing.' },
    { key: 'static_posts', label: 'Static Social Media Posts', category: 'Design', description: 'Professional graphics for Instagram/LinkedIn.' },
    { key: 'seo_blogs', label: 'SEO Blog Writing', category: 'Marketing', description: 'Rank higher on Google with optimized articles.' },
    { key: 'ad_management', label: 'Ad Campaign Management', category: 'Marketing', description: 'Meta & Google Ads setup and optimization.' },
    { key: 'brand_film', label: 'Brand Film / TVC', category: 'Video', description: 'Cinematic brand storytelling.' },
    { key: 'logo_design', label: 'Logo & Brand Identity', category: 'Design', description: 'Complete visual identity design.' },
];

// ID used throughout the file to identify the Creator's Choice / Custom package
const CREATOR_CHOICE_ID = '4';

// --- TERMS & CONDITIONS for Focsera Media ---
const TERMS_TEXT = `FOCSERA MEDIA – GENERAL TERMS AND CONDITIONS

A. Terms & Conditions for Monthly Packages
Scope of Services
Focsera Media will provide the services included in the selected package for the duration of one month.
Services are limited to the agreed deliverables as listed in the package. Additional services will require separate quotation.
Payment Terms
Full payment for the month is due before service commencement unless otherwise agreed.
Payments can be made via bank transfer, UPI, or any mutually agreed mode.
Package Validity
The package is valid for one calendar month from the start date.
Unused services within the month do not carry over to the next month.
Revisions
Each service (content, video editing, thumbnails, captions) includes a limited number of revisions, as mutually agreed.
Additional revisions may incur extra charges.
Content Ownership & Rights
All content created by Focsera Media remains the property of the client after full payment.
Focsera Media reserves the right to showcase the content in portfolios or marketing materials, unless otherwise requested.
Client Responsibilities
Client must provide all necessary inputs (branding assets, product info, campaign details) on time.
Delays in providing information may affect delivery timelines.

Confidentiality
Both parties agree to keep shared information confidential and not disclose sensitive data to third parties.
Cancellation & Refund
Cancellation requests must be made 7 days prior to the next billing cycle.
No refund will be issued for services already delivered in the current month.
Limitation of Liability
Focsera Media is not responsible for third-party platform issues (social media algorithm changes, ad rejections, SEO ranking fluctuations).
Liability is limited to the value of the services purchased.

B. Terms & Conditions for Per-Video Basis Packages
Scope of Services
The package applies to a single video as per the agreed services (editing, thumbnail, caption, SEO, etc.).
Any additional services beyond the agreed scope will be charged separately.
Payment Terms
Full payment for the video must be made before work begins unless otherwise agreed.
No work will commence without confirmation of payment.
Delivery Timeline
Focsera Media will provide the completed video within the agreed timeline, usually 3–7 business days depending on complexity.
Timeline may be extended if client delays in providing assets, scripts, or approvals.
Revisions
The service includes 1–2 rounds of revisions (depending on agreement).
Additional revisions will be charged separately.
Content Ownership & Rights
Ownership transfers to the client after full payment.
Focsera Media may use the content for portfolio and marketing purposes unless the client requests non-disclosure.
Client Responsibilities
Client must provide all necessary inputs (script, footage, branding assets, product details) before work starts.
Delays in providing assets may impact delivery timelines.
Confidentiality
Both parties agree to maintain confidentiality regarding scripts, content ideas, and marketing strategies.
Cancellation & Refund
Once work has started, cancellations are not accepted for the ongoing video.
Refunds may be considered only if Focsera Media fails to deliver within agreed timelines without valid reason.
Limitation of Liability
Focsera Media is not responsible for third-party platform issues or changes affecting video performance.
Liability is limited to the value of the per-video service purchased
`;

const TermsModal = ({ onClose }) => (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border-2 border-[#0052CC]">
            <div className="flex justify-between items-start p-6 border-b">
                <h3 className="text-2xl font-bold">FOCSERA MEDIA — Terms & Conditions</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-900 font-bold text-2xl leading-none">&times;</button>
            </div>
            <div className="text-sm text-gray-700 space-y-3 overflow-y-auto p-6">
                {TERMS_TEXT.split('\n').map((line, idx) => (
                    line.trim() === '' ? <div key={idx} className="py-1" /> : <p key={idx}>{line}</p>
                ))}
            </div>
            <div className="mt-auto p-6 border-t text-right bg-gray-50 rounded-b-2xl">
                <button onClick={onClose} className="button-primary px-6 py-2">I Understand</button>
            </div>
        </div>
    </div>
);

// --- HOOKS ---
const useIntersectionObserver = (options) => {
    const [ref, setRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);
        if (ref) observer.observe(ref);
        return () => { if (ref) observer.unobserve(ref); };
    }, [ref, options]);
    return [setRef, isVisible];
};

// --- COMPONENTS ---

const PromotionalNotesSection = () => (
    <div className="bg-black border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center py-5 gap-6 text-center md:text-left">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/10 group-hover:border-yellow-500/50 transition-all duration-500">
                        <TrendingUp className="text-gray-400 group-hover:text-yellow-400 transition-colors" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-gray-200 tracking-wide uppercase text-xs">Immediate Impact</h3>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">Quick onboarding process</p>
                    </div>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/10 group-hover:border-yellow-500/50 transition-all duration-500">
                        <Sparkles className="text-gray-400 group-hover:text-yellow-400 transition-colors" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-gray-200 tracking-wide uppercase text-xs">Limited Slots</h3>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">First 25 users only</p>
                    </div>
                </div>
                <div className="w-px h-8 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/10 group-hover:border-yellow-500/50 transition-all duration-500">
                        <Megaphone className="text-gray-400 group-hover:text-yellow-400 transition-colors" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-gray-200 tracking-wide uppercase text-xs">Pro Quality</h3>
                        <p className="text-xs text-gray-500 font-mono mt-0.5">Cinema-grade editing</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const CreatorBoostSection = ({ onBook }) => {
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (idx) => {
        setFaqOpen(faqOpen === idx ? null : idx);
    };

    const faqs = [
        { q: "Can I get both reels and thumbnails?", a: "The pack includes either 10 reels with captions OR 10 thumbnails." },
        { q: "How long will delivery take?", a: "Delivery time depends on content volume, usually within a week." },
        { q: "Can I request changes?", a: "Yes, one revision is included." },
        { q: "How do I submit content samples?", a: "After booking, instructions will be provided." }
    ];

    return (
        <section className="relative py-28 bg-[#050505] overflow-hidden">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>

                {/* Spotlight Effects */}
                <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left Content */}
                    <div className="flex-1 space-y-10">
                        <div>
                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                </span>
                                <span className="text-gray-300 font-medium text-[10px] uppercase tracking-[0.2em]">Limited Time Offer</span>
                            </div>

                            <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                                CREATOR<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                    BOOST 10X
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg font-light tracking-wide">
                                Use cinema-grade assets to scale your brand. <span className="text-white font-medium">10 Reels. 10 Thumbnails. 10X Growth.</span>
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Package Inclusions</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "10 Edited Reels OR 10 Thumbnails",
                                        "Cinematic Color Grading",
                                        "Hormozi-Style Captions",
                                        "Viral Hook Strategy",
                                        "Thumbnail Psychology",
                                        "1 Revision Round"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 group-hover:bg-yellow-400 group-hover:shadow-[0_0_8px_rgba(234,179,8,0.8)] transition-all"></div>
                                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FAQ Minimal */}
                        <div className="pt-4 border-t border-white/5">
                            <div className="space-y-1">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="overflow-hidden">
                                        <button
                                            onClick={() => toggleFaq(idx)}
                                            className="w-full text-left flex justify-between items-center py-3 group"
                                        >
                                            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-wider">{faq.q}</span>
                                            <span className={`text-gray-600 group-hover:text-white transition-all transform ${faqOpen === idx ? 'rotate-45' : ''}`}>+</span>
                                        </button>
                                        <div className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${faqOpen === idx ? 'max-h-20 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-sm text-gray-400 pl-4 border-l border-yellow-500/30">{faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Card - Glassmorphism Refined */}
                    <div className="w-full max-w-[400px] relative perspective-1000">
                        {/* Glow Behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-yellow-600/20 via-orange-900/10 to-transparent blur-[80px] rounded-full"></div>

                        <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-1 shadow-2xl overflow-hidden ring-1 ring-white/5">
                            {/* Inner Border/Highlight */}
                            <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none"></div>

                            <div className="relative bg-gradient-to-b from-white/5 to-transparent rounded-[1.8rem] p-8 overflow-hidden">
                                {/* Shine Efx */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                <div className="flex-1 text-center md:text-left relative z-10">
                                    <div className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-300 text-xs font-bold uppercase tracking-wider mb-4 animate-bounce-slow">
                                        Limited Time Offer
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-none drop-shadow-xl">
                                        CreatorBoost <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">10X Pack</span>
                                    </h2>
                                    <p className="text-xl text-blue-100/80 mb-8 font-light max-w-lg mx-auto md:mx-0">
                                        Explode your growth with 10 High-Retention Reels + 10 Static Posts + Strategy.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                        <div className="text-center sm:text-left">
                                            <div className="text-3xl md:text-5xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                                Special Offer
                                            </div>
                                        </div>
                                        <div className="hidden sm:block w-px h-16 bg-white/20"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">10</div>
                                            <span className="text-sm text-blue-200">Slots Left</span>
                                        </div>
                                    </div>
                                    <h4 className="text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center mb-4">How it works</h4>
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-gray-500">1</span>
                                        <span>Book & Fill Form</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-gray-500">2</span>
                                        <span>Upload Raw Content</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-300">
                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-gray-500">3</span>
                                        <span>Receive in ~7 Days</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onBook(CREATOR_BOOST_PACKAGE)}
                                    className="group relative w-full py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-xl overflow-hidden hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                                    <span className="relative flex items-center justify-center gap-2">
                                        Start Now <ArrowRight className="w-4 h-4" />
                                    </span>
                                </button>

                                <p className="text-[9px] text-gray-600 text-center mt-4 font-mono">
                                    SECURE PAYMENT via RAZORPAY
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


const MediaPackageCard = ({ packageData, onBook, index, customizerScrollRef, onOpenTerms, customSelectedCount = 0 }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    // Handle the custom "Creator's Choice" card, which acts as a promo for the customizer
    if (packageData.id === CREATOR_CHOICE_ID) {
        return (
            <div
                className="group relative bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-3xl overflow-hidden shadow-xl flex flex-col transition-all duration-500 ease-out hover:shadow-2xl hover:border-blue-500"
                style={{ transitionDelay: `${index * 100}ms` }}
            >
                <div className="p-8 flex flex-col flex-grow items-center justify-center text-center">
                    <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="text-blue-600" size={40} />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-3">{packageData.name}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow text-sm">{packageData.description}</p>
                    <button onClick={() => {
                        customizerScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }} className="relative mt-4 w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 group/btn">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500"></div>
                        <span className="relative flex items-center justify-center gap-2">
                            Build Your Package
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    {/* Dynamic estimated price for Creator's Choice */}
                    <div className="mt-6 w-full text-center">
                        <div className="text-lg md:text-xl font-black text-gray-900">Contact for Pricing</div>
                        {customSelectedCount > 0 && <div className="text-xs text-gray-600 mt-1">{customSelectedCount} service(s) selected</div>}
                    </div>

                    <div className="mt-3 text-center">
                        <button type="button" onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-600 hover:text-gray-900 underline">View Terms &amp; Conditions</button>
                    </div>
                </div>
            </div>
        );
    }

    const isPremium = packageData.id === '3'; // Example: 'Brand Authority' is considered premium

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative group p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${isPremium ? 'bg-gradient-to-b from-blue-900/20 to-black border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.15)]' : 'bg-[#111] border-white/5 hover:border-white/20'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {isPremium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Best Value
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{packageData.name}</h3>
                <p className="text-gray-400 text-sm h-10">{packageData.description}</p>
            </div>

            <div className="mb-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-xl md:text-4xl font-bold text-white tracking-tight">
                        Contact for Pricing
                    </span>
                </div>
                <div className="mt-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                    Customizable
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2"><List className="w-5 h-5 text-blue-500" /> Included Services</h4>
                <ul className="space-y-2">
                    {packageData.included_services.map((service, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500/20">
                                <Check className="text-green-400 w-4 h-4" strokeWidth={3} />
                            </span>
                            <span className="text-sm text-gray-400">{service}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
                <button
                    onClick={() => onBook(packageData)}
                    className={`relative w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 group/btn shadow-lg shadow-blue-900/20`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500`}></div>
                    <span className="relative flex items-center justify-center gap-2">
                        Book This Package
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                </button>
                <div className="mt-3 text-center">
                    <button type="button" onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-500 hover:text-white underline transition-colors">View Terms &amp; Conditions</button>
                </div>
            </div>
        </div>
    );
};

const CreatorBoostModal = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const details = Object.fromEntries(formData.entries());

        // 1. Prepare Data for DB
        const bookingData = {
            user_id: null, // Guest booking
            package_id: CREATOR_BOOST_PACKAGE.id,
            total_price: null, // No price for this offer
            client_details: {
                name: details.name,
                email: details.email,
                phone: details.phone,
                sample_link: details.sample_link,
                notes: details.notes,
                offer: "CREATORBOOST10X"
            },
            package_details: {
                name: "CreatorBoost 10X Pack",
                tier: "special_offer"
            },
            status: 'pending'
        };

        try {
            // 2. Insert into Supabase
            const { error } = await supabase.from('media_bookings').insert([bookingData]);

            if (error) throw error;

            // 3. WhatsApp Redirect
            const message = `Hello Focsera! I just booked the *CreatorBoost 10X Pack*.\n\n*Name:* ${details.name}\n*Phone:* ${details.phone}\n*Link:* ${details.sample_link}\n\nPlease confirm my slot!`;
            const whatsappUrl = `https://wa.me/918610266034?text=${encodeURIComponent(message)}`;

            // Show success & redirect
            alert("Booking Saved! Redirecting to WhatsApp to finalize...");
            window.open(whatsappUrl, '_blank');
            onClose();

        } catch (err) {
            console.error(err);
            alert("Error saving booking: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden">
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="text-yellow-400 w-5 h-5" />
                        Secure Your Spot
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        {/* Assuming X icon is defined elsewhere or using a simple X */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                            <input name="name" required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="John Doe" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                            <input name="phone" required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="+91..." />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                            <input name="email" required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Sample Footage / Channel Link</label>
                            <input name="sample_link" required type="url" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="Google Drive / YouTube / Instagram Link" />
                            <p className="text-[10px] text-gray-500 mt-1">Link to raw footage or your current channel.</p>
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Additional Notes (Optional)</label>
                            <textarea name="notes" rows="2" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors" placeholder="Any specific requirements?"></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black text-lg rounded-xl shadow-lg transform transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? 'Processing...' : 'CONFIRM REQUEST'}
                    </button>
                    <p className="text-center text-[10px] text-gray-500">
                        *Redirects to WhatsApp for final confirmation. Secure booking.
                    </p>
                </form>
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
const LandingPage = ({ onBookNow, packages, individualServices, loadError, onRetry }) => {
    const [selectedServices, setSelectedServices] = useState({});
    const [showFancyModal, setShowFancyModal] = useState(false);
    const [fancyModalContent, setFancyModalContent] = useState(null);
    const [showTerms, setShowTerms] = useState(false);

    // New State for CreatorBoost Modal
    const [showBoostModal, setShowBoostModal] = useState(false);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const customizerScrollRef = useRef(null);

    const selectedServiceCount = Object.entries(selectedServices).filter(([_, v]) => v).length;

    const handleServiceToggle = (key) => {
        setSelectedServices(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const quoteData = Object.fromEntries(formData.entries());

        const name = quoteData.name || '';
        const email = quoteData.email || '';
        const details = quoteData.details || '';

        if (!name.trim() || !email.trim() || !details.trim()) {
            alert('Please provide your name, email, and some details about the project.');
            return;
        }

        // Append contextual info (if a custom package was being built)
        let contextualNotes = '';
        const selectedServiceKeys = Object.entries(selectedServices || {}).filter(([_, v]) => v).map(([k]) => k);
        if (selectedServiceKeys.length) {
            contextualNotes += `\n\nInterested Services: ${selectedServiceKeys.join(', ')}`;
        }
        contextualNotes += `\nEstimated Total: Contact for Pricing`;

        const combinedDetails = details + contextualNotes;

        const payload = {
            name: name,
            email: email,
            phone: quoteData.phone || null,
            details: combinedDetails,
        };

        try {
            const { error } = await supabase.from('media_quotes').insert([payload]);
            if (error) {
                console.error('Error inserting media quote:', error);
                alert('Error submitting quote: ' + (error.message || String(error)));
                return;
            }

            setShowFancyModal(true);
            setFancyModalContent({
                title: 'Inquiry Received',
                subtitle: 'Thank you — our team will reach out shortly.',
                details: (
                    <>
                        <p className="mb-2 text-gray-300">We have received your project details and will review them shortly.</p>
                        <p className="text-sm text-gray-500">Our media team will contact you within 24 hours to discuss your content strategy.</p>
                    </>
                )
            });
            e.target.reset();
        } catch (err) {
            console.error('Unexpected error submitting media quote:', err);
            alert('An unexpected error occurred while submitting your request. Please try again later.');
        }
    };

    const handleCustomBooking = () => {
        if (selectedServiceCount === 0) {
            alert("Please select at least one service to build a custom package.");
            return;
        }
        // Find the 'Creator's Choice' package from the main data source to use as a template.
        // Be defensive: Supabase may return ids as strings, or the package may be missing from remote data.
        const customPackageTemplate = (packages || []).find(p => p?.id === CREATOR_CHOICE_ID)
            || packagesData.find(p => p?.id === CREATOR_CHOICE_ID);

        if (!customPackageTemplate) {
            console.error("Creator's Choice package template not found.");
            alert("An error occurred. Could not create custom package. Please try again or contact support.");
            return;
        }

        // Ensure the handler exists before calling (defensive)
        if (typeof onBookNow !== 'function') {
            console.error('onBookNow handler is not available');
            alert('Booking is temporarily unavailable. Please try again later.');
            return;
        }

        onBookNow(customPackageTemplate, selectedServices);
    };

    if (loadError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
                <div className="max-w-md w-full bg-[#111] rounded-2xl shadow-xl p-8 text-center border border-white/10">
                    <h3 className="text-lg font-bold text-red-500 mb-2">Failed to load packages</h3>
                    <p className="text-sm text-gray-400 mb-4">{String(loadError)}</p>
                    <div className="flex justify-center">
                        <button onClick={() => onRetry && onRetry()} className="px-6 py-3 bg-[#0052CC] text-white rounded-xl hover:bg-blue-600 transition-colors">Retry</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!packages || packages.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-500 bg-[#050505]">No packages available right now.</div>
        );
    }

    // Group services by category for the customizer
    const servicesByCategory = individualServices.reduce((acc, service) => {
        const category = service.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(service);
        return acc;
    }, {});

    return (
        <>
            <section className="relative py-32 bg-gradient-to-br from-[#020617] via-[#0B1121] to-[#0f172a] overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full animate-[float_8s_ease-in-out_infinite] blur-xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-2xl animate-[float_12s_ease-in-out_infinite] blur-2xl"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <div className="w-32 h-32 bg-black/40 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl overflow-hidden border border-white/10">
                        <img src="/images/logos/FocseraMedia.jpg" alt="Focsera Media" className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity" />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">Focsera Media</h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4 font-light">
                        Professional Content, Marketing & Growth Services
                    </p>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We build your brand's voice and amplify your reach. From content strategy to ad campaigns, we provide end-to-end media solutions.
                    </p>
                </div>
            </section>

            {/* UPGRADED: CreatorBoost Offer Section (Moved to Top) */}
            <CreatorBoostSection onBook={() => setShowBoostModal(true)} />

            {/* UPGRADED: Promotional Notes Section (Integrated as a ticker strip) */}
            <PromotionalNotesSection />

            {/* Booking Modal */}
            <CreatorBoostModal isOpen={showBoostModal} onClose={() => setShowBoostModal(false)} />

            <section className="py-16 bg-[#050505] border-b border-white/5 relative">
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="text-center p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(0,82,204,0.15)]">
                                <Edit className="text-[#3b82f6]" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Content Creation</h3>
                            <p className="text-gray-400 text-lg font-light">High-quality writing, video editing, and visual design to tell your story.</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(0,82,204,0.15)]">
                                <TrendingUp className="text-[#3b82f6]" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Marketing & Growth</h3>
                            <p className="text-gray-400 text-lg font-light">Strategic SEO, SMM, and ad campaigns to grow your audience.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={packagesRef} className="py-24 bg-[#050505] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-4 gradient-text">Our Signature Packages</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    {/* Creator's Choice promo card — scrolls to customizer and shows live estimate */}
                    <div className="max-w-2xl mx-auto mb-6">
                        {(() => {
                            const cc = (packages || []).find(p => p.id === CREATOR_CHOICE_ID) || packagesData.find(p => p.id === CREATOR_CHOICE_ID);
                            if (cc) {
                                return (
                                    <MediaPackageCard
                                        packageData={cc}
                                        onBook={onBookNow}
                                        onOpenTerms={() => setShowTerms(true)}
                                        index={-1}
                                        customizerScrollRef={customizerScrollRef}
                                        customSelectedCount={selectedServiceCount}
                                    />
                                );
                            }
                            return null;
                        })()}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {packages.filter(Boolean).filter(p => p.id !== CREATOR_CHOICE_ID).map((pkg, index) => (
                            <MediaPackageCard
                                key={pkg?.id ?? index}
                                packageData={pkg}
                                onBook={onBookNow}
                                onOpenTerms={() => setShowTerms(true)}
                                index={index}
                                customizerScrollRef={customizerScrollRef}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section ref={customizerScrollRef} className="py-24 bg-[#080808] border-t border-white/5 scroll-mt-24 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div ref={customizerSectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-4 gradient-text">Build Your Own Package</h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Select the individual services you need to create a plan that's perfectly tailored to your goals.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">

                            {Object.entries(servicesByCategory).map(([category, services]) => (
                                <div key={category}>
                                    <h3 className="text-xl font-bold mb-4 text-gray-300 border-b border-white/10 pb-2">{category} Services</h3>
                                    <div className="space-y-4">
                                        {services.map((service) => {
                                            const isSelected = selectedServices[service.key];
                                            return (
                                                <div key={service.key} className={`p-4 border rounded-xl transition-all duration-300 ${isSelected ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_15px_rgba(0,82,204,0.15)]' : 'bg-white/5 border-white/5 hover:border-white/20'}`}>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <button
                                                                    onClick={() => handleServiceToggle(service.key)}
                                                                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#0052CC] border-[#0052CC]' : 'border-gray-500 hover:border-gray-400'}`}
                                                                >
                                                                    {isSelected && <Check className="text-white" size={16} />}
                                                                </button>
                                                                <span className="font-semibold text-gray-200">{service.label}</span>
                                                            </div>
                                                            {service.description && (
                                                                <p className="text-xs text-gray-500 ml-9">{service.description}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className="text-sm font-bold text-gray-300">
                                                                Select
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="lg:col-span-1 sticky top-8">
                            <div className="bg-[#111] backdrop-blur-lg p-8 rounded-3xl border-2 border-blue-900/30 shadow-2xl ring-1 ring-white/5">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">Your Custom Package</h3>
                                <div className="space-y-3 mb-6 border-b border-white/10 pb-4 min-h-[100px]">
                                    {selectedServiceCount === 0 && (
                                        <p className="text-sm text-gray-600 text-center py-6 italic">Select services to see your total.</p>
                                    )}

                                    {Object.entries(selectedServices).filter(([_, value]) => value).map(([key]) => {
                                        const service = individualServices.find(a => a.key === key);
                                        return service ? (
                                            <div key={key} className={`flex justify-between items-center text-sm transition-all`}>
                                                <p className={`text-gray-200 font-semibold`}>{service.label}</p>
                                                <p className={`text-gray-500 font-medium`}>Included</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-lg font-bold text-gray-300">Estimated Total</p>
                                    <p className="text-xl font-bold text-[#3b82f6]">Contact for Pricing</p>
                                </div>
                                <p className="text-xs text-gray-500 italic mb-4">These are default estimates — final pricing will be discussed and negotiated after a consultation.</p>
                                <button onClick={handleCustomBooking} className="button-primary w-full shadow-lg shadow-blue-600/20">
                                    Book This Package
                                    <ArrowRight className="button-primary-icon" />
                                </button>
                                <p className="text-[10px] text-gray-600 mt-4 text-center">Final price will be confirmed after consultation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={quoteSectionRef} className="py-24 bg-[#050505] border-t border-white/5">
                <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${quoteIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold text-white mb-4 gradient-text">Have a Unique Project?</h2>
                    <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                        If you're unsure where to start, tell us about your goals, and we'll create a custom quote just for you.
                    </p>
                    <form onSubmit={handleQuoteSubmit} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl text-left max-w-3xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label><input type="text" id="name" name="name" className="w-full input-field" placeholder="John Doe" required /></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label><input type="email" id="email" name="email" className="w-full input-field" placeholder="you@example.com" required /></div>
                        </div>
                        <div><label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full input-field" placeholder="+91 12345 67890" /></div>
                        <div><label htmlFor="details" className="block text-sm font-medium text-gray-400 mb-2">Tell us about your project</label><textarea id="details" name="details" rows="5" className="w-full input-field" placeholder="Please include as many details as possible: your business, target audience, content goals, etc." required></textarea></div>
                        <button type="submit" className="button-primary w-full transform hover:scale-[1.02] shadow-xl shadow-blue-500/20">Get a Custom Quote <ArrowRight className="button-primary-icon" /></button>
                        <div className="mt-3 text-center">
                            <button type="button" onClick={() => setShowTerms(true)} className="text-xs text-gray-500 hover:text-white underline transition-colors">View Terms &amp; Conditions</button>
                        </div>
                    </form>
                </div>
            </section>

            <footer className="bg-black/80 text-white py-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 border border-white/10"><Megaphone className="text-blue-500" size={32} /></div>
                    <p className="font-bold text-2xl mb-2">Focsera Media</p>
                    <p className="text-gray-500">Content that Converts, Strategy that Scales.</p>
                    <p className="text-sm text-gray-600 mt-8">© {new Date().getFullYear()} Focsera Media. All Rights Reserved.</p>
                </div>
            </footer>
            {
                showFancyModal && fancyModalContent && (
                    <FancyModal
                        title={fancyModalContent.title}
                        subtitle={fancyModalContent.subtitle}
                        details={fancyModalContent.details}
                        onClose={() => setShowFancyModal(false)}
                    />
                )
            }

            {
                showTerms && (
                    <TermsModal onClose={() => setShowTerms(false)} />
                )
            }
        </>
    );
};

// --- CHECKOUT FLOW COMPONENTS ---

const CheckoutHeader = ({ currentStep }) => {
    const steps = [
        { id: 'login', name: 'Login', icon: <User className="w-5 h-5" /> },
        { id: 'cart', name: 'Review Order', icon: <ShoppingCart className="w-5 h-5" /> },
        { id: 'details', name: 'Checkout', icon: <CreditCard className="w-5 h-5" /> }
    ];
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <header className="bg-black/80 backdrop-blur-lg sticky top-0 z-40 border-b border-white/10">
            <nav className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-4">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center gap-2 font-bold text-xl text-white">
                        <Megaphone className="text-blue-500" />
                        Focsera Media
                    </a>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transition-all duration-500" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}></div>
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index <= currentStepIndex ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'bg-black/40 border-white/10 text-gray-500'}`}>
                                    {index < currentStepIndex ? <Check /> : step.icon}
                                </div>
                                <p className={`mt-2 text-xs font-semibold ${index <= currentStepIndex ? 'text-blue-400' : 'text-gray-600'}`}>{step.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

// LoginPage remains identical to your example, as auth is generic
const LoginPage = ({ onLogin, onBack }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [messageType, setMessageType] = useState('error');
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            if (isLoginView) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                setMessageType('success');
                setSuccessMessage('Congratulations! You have successfully logged in.');
                setTimeout(() => { onLogin(); }, 2000);
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { full_name: fullName } }
                });

                if (error) {
                    if (error.message.includes('already registered')) {
                        setMessageType('info');
                        setError('This email is already registered. Please sign in instead.');
                        setTimeout(() => setIsLoginView(true), 3000);
                    } else {
                        throw error;
                    }
                } else if (data.user) {
                    setMessageType('success');
                    setSuccessMessage('Account created successfully! Please check your email to confirm your account.');
                    setTimeout(() => {
                        setIsLoginView(true);
                        setSuccessMessage(null);
                    }, 4000);
                }
            }
        } catch (err) {
            setMessageType('error');
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 pt-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
            <div className="w-full max-w-md animate-fadeInUp relative z-10">
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 lg:p-10">
                    <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors">
                        <span className="hover:-translate-x-1 transition-transform">&larr;</span> Back
                    </button>
                    <div className="text-center mb-8 mt-8">
                        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent inline-block mb-2">
                            FOCSERA
                        </h2>
                        <p className="text-gray-400">{isLoginView ? 'Sign in to continue your booking' : 'Join Focsera Media today'}</p>
                    </div>

                    <div className="flex gap-2 mb-8 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setIsLoginView(true)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${isLoginView ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => setIsLoginView(false)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${!isLoginView ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 ${messageType === 'error' ? 'bg-red-900/20 border border-red-500/30 text-red-200' : 'bg-blue-900/20 border border-blue-500/30 text-blue-200'}`}>
                            <span>{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl text-green-200 text-sm flex items-start gap-3">
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-5">
                        {!isLoginView && (
                            <div className="group">
                                <label className="text-sm font-bold text-gray-300 block mb-2 ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={20} />
                                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full pl-12 pr-4 py-4 input-field text-white placeholder-gray-500" placeholder="John Doe" required />
                                </div>
                            </div>
                        )}
                        <div className="group">
                            <label className="text-sm font-bold text-gray-300 block mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 input-field text-white placeholder-gray-500" placeholder="you@example.com" required />
                            </div>
                        </div>
                        <div className="group">
                            <label className="text-sm font-bold text-gray-300 block mb-2 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-4 input-field text-white placeholder-gray-500" placeholder="••••••••" required minLength={6} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10 transition-colors">
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="relative w-full group overflow-hidden rounded-xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2 py-4 font-bold text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                                {loading ? 'Please wait...' : (isLoginView ? 'Log In' : 'Create Account')}
                                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLoginView(!isLoginView)} className="text-blue-500 font-bold hover:text-blue-400 transition-colors">
                                {isLoginView ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                    <div className="flex items-center my-8">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>
                    <button onClick={onLogin} className="w-full py-3.5 border border-white/10 bg-white/5 rounded-xl font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ bookingPackage, onProceed, onBack, individualServices }) => {
    const isCustom = bookingPackage.package.id === CREATOR_CHOICE_ID;
    const services = isCustom
        ? Object.entries(bookingPackage.selectedServices).filter(([_, v]) => v).map(([key]) => {
            const s = individualServices.find(a => a.key === key);
            return s ? { name: s.label } : null;
        }).filter(Boolean)
        : bookingPackage.package.included_services.map(s => ({ name: s }));

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden animate-fadeInUp">
                    <div className="p-8 border-b border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-2">Review Your Order</h2>
                        <p className="text-gray-400">Please verify the package details before proceeding to checkout.</p>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2"><List size={20} className="text-blue-500" /> Package Summary</h3>
                                <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-xl text-white">{bookingPackage.package.name}</h4>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${bookingPackage.tier === 'premium' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
                                                {bookingPackage.tier === 'premium' ? 'PREMIUM TIER' : 'STANDARD TIER'}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-white">Contact for Pricing</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{bookingPackage.package.description}</p>

                                    <div className="space-y-3">
                                        <p className="text-sm font-bold text-gray-300">Included in this plan:</p>
                                        <ul className="grid grid-cols-1 gap-2">
                                            {services.map((s, i) => (
                                                <li key={i} className="flex justify-between text-sm text-gray-400 py-1 border-b border-white/5 last:border-0">
                                                    <span className="flex items-center gap-2"><Check size={14} className="text-green-500" /> {s.name}</span>
                                                    <span className="font-medium text-gray-300">Included</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-blue-900/10 rounded-2xl p-6 border border-blue-500/20 sticky top-8">
                                <h3 className="text-lg font-bold text-white mb-4">Order Total</h3>
                                <div className="flex justify-between items-center mb-2 text-gray-400">
                                    <span>Subtotal</span>
                                    <span>Contact for Pricing</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 text-green-400 text-sm">
                                    <span>Consultation</span>
                                    <span>FREE</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 mb-8">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-white text-lg">Total</span>
                                        <span className="font-bold text-lg text-blue-400">Contact for Pricing</span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-2 text-right">Final price confirmed after consultation</p>
                                </div>
                                <div className="space-y-3">
                                    <button onClick={onProceed} className="button-primary w-full shadow-lg shadow-blue-600/20">
                                        Proceed to Checkout <ArrowRight className="button-primary-icon" />
                                    </button>
                                    <button onClick={onBack} className="w-full py-3 text-gray-400 font-medium hover:text-white transition-colors">
                                        Go Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailsPage = ({ bookingPackage, onSubmit, onBack }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Real submission logic would go here
        onSubmit(e);
        setLoading(false);
    };

    return (
        <div className="min-h-screen pt-32 pb-16 px-4 bg-[#050505]">
            <div className="max-w-2xl mx-auto animate-fadeInUp">
                <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
                    <div className="p-8 border-b border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-2">Final Details</h2>
                        <p className="text-gray-400">Enter your contact information to finalize the booking request.</p>
                    </div>
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">First Name</label>
                                    <input type="text" name="firstName" className="w-full input-field" placeholder="John" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-300 mb-2">Last Name</label>
                                    <input type="text" name="lastName" className="w-full input-field" placeholder="Doe" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Company Name (Optional)</label>
                                <input type="text" name="company" className="w-full input-field" placeholder="Your Company Ltd." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-300 mb-2">Project Vision / Details</label>
                                <textarea name="notes" rows="4" className="w-full input-field" placeholder="Briefly describe what you're looking for..." required></textarea>
                            </div>

                            <div className="bg-yellow-900/10 border border-yellow-500/20 rounded-xl p-4 flex gap-3 items-start">
                                <Info className="text-yellow-500 mt-0.5 flex-shrink-0" size={18} />
                                <p className="text-sm text-yellow-200/80">
                                    <strong>Note:</strong> No payment is required right now. This request starts the consultation process. We will contact you to finalize details and pricing.
                                </p>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={onBack} className="flex-1 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                                    Back
                                </button>
                                <button type="submit" disabled={loading} className="flex-[2] button-primary shadow-lg shadow-blue-600/20">
                                    {loading ? 'Processing...' : 'Confirm Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SuccessModal = ({ onClose }) => {
    const [confetti, setConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn overflow-hidden">
            {confetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                backgroundColor: ['#0052CC', '#0066FF', '#00C7FF', '#FFD700', '#FF6B6B'][Math.floor(Math.random() * 5)],
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${Math.random() * 3 + 2}s`,
                                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="bg-[#111] backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto border-2 border-blue-500/30 relative animate-scaleIn">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-bounce-slow">
                        <Check className="w-20 h-20 text-white" strokeWidth={4} />
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-5xl font-bold text-white mb-4 animate-slideDown">Booking Confirmed!</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto mb-6 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>

                    <div className="bg-blue-900/10 border border-blue-500/20 rounded-2xl p-8 mb-8">
                        <p className="text-xl text-gray-300 leading-relaxed mb-6">
                            Thank you for choosing <span className="font-bold text-blue-400">Focsera Media</span>!
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Your booking request has been successfully received and our team is already reviewing the details.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                            <div className="bg-white/5 rounded-xl p-6 shadow-md border border-white/5">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-blue-400">1</span>
                                </div>
                                <h4 className="font-bold text-white mb-2">Confirmation Email</h4>
                                <p className="text-sm text-gray-500">Sent within 5 minutes</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 shadow-md border border-white/5">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-blue-400">2</span>
                                </div>
                                <h4 className="font-bold text-white mb-2">Strategy Call</h4>
                                <p className="text-sm text-gray-500">Within 24 hours</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-6 shadow-md border border-white/5">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-blue-400">3</span>
                                </div>
                                <h4 className="font-bold text-white mb-2">Project Kick-off</h4>
                                <p className="text-sm text-gray-500">Pricing & schedule</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 italic">
                            Our professional team will reach out to discuss the final details, confirm pricing, and schedule your project kick-off call.
                        </p>
                    </div>

                    <button onClick={onClose} className="button-primary text-lg px-12 py-4 shadow-xl hover:shadow-2xl transition-all shadow-blue-600/20">
                        Return to Media
                        <ArrowRight className="button-primary-icon" size={24} />
                    </button>
                    <p className="text-sm text-gray-500 mt-6">
                        Need immediate assistance? Call us at <span className="font-semibold text-blue-400">+91 98765 43210</span>
                    </p>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---

export default function App() {
    const [session, setSession] = useState(null);
    const [currentView, setCurrentView] = useState('landing');
    const [bookingPackage, setBookingPackage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [packages, setPackages] = useState([]);
    const [individualServices, setIndividualServices] = useState([]);
    const [loadError, setLoadError] = useState(null);

    // Get initial data (now attempts Supabase first, falls back to mocked data)
    const getInitialData = async () => {
        setIsLoading(true);
        try {
            // Try to fetch packages and services from Supabase
            const [{ data: packagesRemote, error: packagesError }, { data: servicesRemote, error: servicesError }] = await Promise.all([
                supabase.from('media_packages').select('*').order('id', { ascending: true }),
                supabase.from('media_services').select('*').order('id', { ascending: true })
            ]);

            if (packagesError) {
                console.warn('Supabase packages load error, falling back to mocks:', packagesError.message || packagesError);
            }
            if (servicesError) {
                console.warn('Supabase services load error, falling back to mocks:', servicesError.message || servicesError);
            }

            // If Supabase returned data, use it; otherwise use mock data
            if (Array.isArray(packagesRemote) && packagesRemote.length > 0) {
                // Deduplicate by id (defensive): prefer the first occurrence
                const uniqueById = [];
                const seenIds = new Set();
                packagesRemote.forEach(p => {
                    const id = Number(p?.id);
                    if (!seenIds.has(id)) {
                        seenIds.add(id);
                        uniqueById.push({ ...p, id });
                    }
                });

                // Further dedupe by normalized name, but prefer the canonical CREATOR_CHOICE_ID if present.
                const nameMap = new Map();
                const normalize = (s = '') => {
                    let t = String(s || '').toLowerCase();
                    // remove parenthetical suffixes like "(custom)" or "(custom)"
                    t = t.replace(/\(.*?\)/g, '');
                    // remove common word 'custom' and whitespace
                    t = t.replace(/\bcustom\b/g, '');
                    // remove non-alphanumeric characters
                    t = t.replace(/[^a-z0-9]/g, '');
                    return t.trim();
                };
                uniqueById.forEach(p => {
                    const key = normalize(p.name);
                    if (!nameMap.has(key)) {
                        nameMap.set(key, p);
                    } else {
                        const existing = nameMap.get(key);
                        // Prefer the package that has the CREATOR_CHOICE_ID
                        if (Number(p.id) === CREATOR_CHOICE_ID) {
                            nameMap.set(key, p);
                        } else if (Number(existing.id) === CREATOR_CHOICE_ID) {
                            // keep existing
                        } else {
                            // keep existing (first)
                        }
                    }
                });

                setPackages(Array.from(nameMap.values()));
            } else {
                setPackages(packagesData.filter(Boolean));
            }

            if (Array.isArray(servicesRemote) && servicesRemote.length > 0) {
                setIndividualServices(servicesRemote.map(s => ({ ...s })));
            } else {
                setIndividualServices(individualServicesData.filter(Boolean));
            }

            setLoadError(null);
        } catch (err) {
            console.error('Error loading data from Supabase:', err);
            setLoadError(err?.message || String(err));
            // Fallback to mocked data
            setPackages(packagesData.filter(Boolean));
            setIndividualServices(individualServicesData.filter(Boolean));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const savedPackageJson = sessionStorage.getItem('focseraBookingPackage');
        if (savedPackageJson) {
            const savedPackage = JSON.parse(savedPackageJson);
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    setBookingPackage(savedPackage);
                    setCurrentView('cart');
                    sessionStorage.removeItem('focseraBookingPackage');
                }
            });
        }

        getInitialData();

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);

            if (_event === 'SIGNED_IN') {
                const savedPackageJson = sessionStorage.getItem('focseraBookingPackage');
                if (savedPackageJson) {
                    const savedPackage = JSON.parse(savedPackageJson);
                    setBookingPackage(savedPackage);
                    setCurrentView('cart');
                    sessionStorage.removeItem('focseraBookingPackage');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []); // Empty dependency array, runs once

    const handleBookNow = (packageData, tierOrServices, price) => {
        if (!packageData.is_active && packageData.id !== CREATOR_CHOICE_ID) return;

        let packageToBook = {};

        if (typeof tierOrServices === 'string') {
            // This is a Standard or Premium package
            const tier = tierOrServices;
            const finalPrice = tier === 'standard' ? packageData.standard_price : packageData.premium_price;
            packageToBook = {
                package: packageData,
                tier: tier,
                totalPrice: finalPrice,
            };
        } else {
            // This is a Custom "Creator's Choice" package
            const selectedServices = tierOrServices;
            packageToBook = {
                package: { ...packageData, name: "Custom Media Package", is_active: true }, // Create a bookable version
                services: selectedServices,
                totalPrice: price,
            };
        }

        sessionStorage.setItem('focseraBookingPackage', JSON.stringify(packageToBook));
        setBookingPackage(packageToBook);

        if (session) {
            setCurrentView('cart');
        } else {
            setCurrentView('cart');
        }
        window.scrollTo(0, 0);
    };

    const resetToLanding = () => {
        setCurrentView('landing');
        setBookingPackage(null);
        setShowSuccess(false);
        sessionStorage.removeItem('focseraBookingPackage');
    };

    const renderContent = () => {
        if (!bookingPackage && (currentView === 'cart' || currentView === 'details')) {
            return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-400 bg-[#050505] p-4 text-center">
                <div>
                    <p className="mb-4">Please select a package first.</p>
                    <button onClick={resetToLanding} className="button-primary">Go to Packages</button>
                </div>
            </div>;
        }

        const showHeader = ['login', 'cart', 'details'].includes(currentView);

        return (
            <>
                {showHeader && <CheckoutHeader currentStep={currentView} />}
                {(() => {
                    switch (currentView) {
                        case 'login':
                            return <LoginPage onLogin={() => setCurrentView('cart')} onBack={resetToLanding} />;
                        case 'cart':
                            return <CartPage
                                bookingPackage={bookingPackage}
                                individualServices={individualServices}
                                onProceed={() => setCurrentView('details')}
                                onBack={resetToLanding}
                            />;
                        case 'details':
                            return <DetailsPage
                                bookingPackage={bookingPackage}
                                individualServices={individualServices}
                                session={session}
                                onSubmit={() => setShowSuccess(true)}
                                onBack={() => setCurrentView('cart')}
                            />;
                        case 'landing':
                        default:
                            return <LandingPage
                                onBookNow={handleBookNow}
                                packages={packages}
                                individualServices={individualServices}
                                loadError={loadError}
                                onRetry={() => { setLoadError(null); getInitialData(); }}
                            />;
                    }
                })()}
            </>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                    <p className="text-lg font-bold text-gray-300">Loading Focsera Media...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                :root { --brand-blue: #0052CC; --brand-blue-dark: #0047b3; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
                @keyframes background-pan { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideDown { animation: slideDown 0.6s ease-out forwards; animation-delay: 0.2s; opacity: 0; }

                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                .animate-shimmer { animation: shimmer 2.5s infinite linear; }

                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti { animation: confetti forwards; }

                .gradient-text { background: linear-gradient(90deg, #60a5fa, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: background-pan 5s linear infinite; }

                .button-primary {
                    position: relative; overflow: hidden;
                    display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
                    padding: 0.875rem 1.5rem; background-image: linear-gradient(90deg, var(--brand-blue) 0%, #0066FF 100%);
                    color: white; border-radius: 9999px; font-weight: 600;
                    transition: all 0.3s ease; transform: scale(1);
                    box-shadow: 0 4px 15px rgba(0, 82, 204, 0.2);
                }
                .button-primary:hover:not(:disabled) { transform: scale(1.05); box-shadow: 0 8px 25px rgba(0, 82, 204, 0.3); }
                .button-primary:active:not(:disabled) { transform: scale(0.98); }
                .button-primary-icon { transition: transform 0.3s ease; }
                .button-primary:hover:not(:disabled) .button-primary-icon { transform: translateX(4px); }

                .input-field {
                    background-color: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.5rem;
                    padding: 0.75rem 1rem; transition: all 0.2s ease-in-out; color: white;
                }
                .input-field:focus {
                    outline: none; border-color: var(--brand-blue);
                    box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.2);
                }
                .input-field::placeholder { color: #9ca3af; }
            `}</style>

            <div className="bg-[#050505] min-h-screen text-gray-200 font-sans antialiased selection:bg-blue-500/30">
                {['login', 'cart', 'details'].includes(currentView) && <CheckoutHeader currentStep={currentView} />}
                {renderContent()}
                {showSuccess && <SuccessModal onClose={resetToLanding} />}
            </div>
        </>
    );
}

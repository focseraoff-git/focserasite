// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import FancyModal from '../../components/FancyModal';

// --- ICONS (using inline SVGs for self-containment) ---
const Megaphone = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 11v2a2 2 0 0 0 2 2h2l8 5V4l-8 5H5a2 2 0 0 0-2 2z"></path>
        <path d="M19 11a5 5 0 0 1 0 2"></path>
    </svg>
);

const Edit = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4L18.5 2.5z"></path>
    </svg>
);

const TrendingUp = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

const ArrowRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const Check = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>
);
const ChevronDown = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const ShoppingCart = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);
const User = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const CreditCard = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
);
const List = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
    </svg>
);
const Sparkles = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
        is_active: true,
    },
    {
        id: 4,
        name: "Community Connect",
        description: "Build a loyal following through strategic collaborations, brand tie-ups, and active community engagement.",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        category: "Community",
        standard_price: 20000,
        premium_price: 40000,
        included_services: ["Collaborations", "Brand Tie-ups", "Community Engagement"],
        is_active: true,
    },
    {
        id: 5,
        name: "Growth Intelligence",
        description: "Make data-driven decisions with in-depth performance analysis, SEO, and strategic content planning.",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        category: "Strategy",
        standard_price: 25000,
        premium_price: 50000,
        included_services: ["Performance Analysis", "SEO Optimization", "Content Planning & Strategy"],
        is_active: true,
    },
    {
        id: 6,
        name: "Creator's Choice",
        description: "Don't see a package that fits? Build your own by selecting only the services you need.",
        thumbnail: "https://images.unsplash.com/photo-1553877522-c36980345885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTU5fDB8MHwxfGFsbHx8fHx8fHx8fDE3MzIzMzg5Nzh8&ixlib=rb-4.0.3&q=80&w=600",
        category: "Custom",
        standard_price: 0,
        premium_price: 0,
        included_services: ["Fully customizable - client selects any combination of services"],
        is_active: false, // This ensures it's treated as a promo card
    }
];

// Individual services derived from the "Included Services" list in the doc.
// This is used for the custom package builder.
const individualServicesData = [
    { id: 1, key: 'content_writing', label: 'Content Writing', description: 'Blog posts, articles, and scripts.', price_min: 8000, category: 'Content' },
    { id: 2, key: 'caption_generation', label: 'Caption Generation', description: 'Engaging captions for social media posts.', price_min: 5000, category: 'Content' },
    { id: 3, key: 'video_timeline', label: 'Video Timeline', description: 'Strategic planning and timeline creation for video content.', price_min: 6000, category: 'Content' },
    { id: 4, key: 'thumbnail_design', label: 'Thumbnail Design', description: 'Click-worthy thumbnails for YouTube and other platforms.', price_min: 7000, category: 'Visuals' },
    { id: 5, key: 'video_editing', label: 'Video Editing', description: 'Professional editing for short or long-form content.', price_min: 12000, category: 'Visuals' },
    { id: 6, key: 'video_storytelling', label: 'Video Storytelling Assets', description: 'Captions, timelines, and assets for compelling stories.', price_min: 7500, category: 'Visuals' },
    { id: 7, key: 'smm', label: 'Social Media Marketing', description: 'Managing and growing your social media presence.', price_min: 15000, category: 'Marketing' },
    { id: 8, key: 'ads', label: 'Running Ads (Meta, Google)', description: 'Full-service ad campaign management.', price_min: 20000, category: 'Marketing' },
    { id: 9, key: 'seo', label: 'SEO Optimization', description: 'Improve your search engine ranking.', price_min: 18000, category: 'Marketing' },
    { id: 10, key: 'collabs', label: 'Collaborations', description: 'Identifying and managing creator collaborations.', price_min: 10000, category: 'Community' },
    { id: 11, key: 'brand_tieups', label: 'Brand Tie-ups', description: 'Securing and managing brand sponsorship deals.', price_min: 15000, category: 'Community' },
    { id: 12, key: 'community_engagement', label: 'Community Engagement', description: 'Actively managing and engaging with your online community.', price_min: 9000, category: 'Community' },
    { id: 13, key: 'analysis', label: 'Performance Analysis', description: 'Monthly reports and insights on your content performance.', price_min: 12000, category: 'Strategy' },
    { id: 14, key: 'strategy', label: 'Content Planning & Strategy', description: 'Long-term content calendar and strategic planning.', price_min: 15000, category: 'Strategy' },
];

// ID used throughout the file to identify the Creator's Choice / Custom package
const CREATOR_CHOICE_ID = 6;

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

const MediaPackageCard = ({ packageData, onBook, index, customizerScrollRef, onOpenTerms, customEstimatedPrice = 0, customSelectedCount = 0 }) => {
    const cardRef = useRef(null);
    const [selectedTier, setSelectedTier] = useState('standard'); // 'standard' or 'premium'

    const handleMouseMove = (e) => {
        if (!packageData.is_active) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        if (!packageData.is_active) return;
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    // Handle the custom "Creator's Choice" card, which acts as a promo for the customizer
    if (!packageData.is_active) {
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
                        {customEstimatedPrice > 0 ? (
                            <>
                                <div className="text-2xl font-black text-gray-900">₹{Math.round(customEstimatedPrice).toLocaleString('en-IN')}</div>
                                <div className="text-xs text-gray-500">per month</div>
                            </>
                        ) : (
                            <div className="text-sm text-gray-500">Estimate will appear after you select services below</div>
                        )}
                        {customSelectedCount > 0 && <div className="text-xs text-gray-600 mt-1">{customSelectedCount} service(s) selected</div>}
                    </div>

                    <div className="mt-3 text-center">
                       <button type="button" onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-600 hover:text-gray-900 underline">View Terms &amp; Conditions</button>
                    </div>
                </div>
            </div>
        );
    }

    const price = selectedTier === 'standard' ? packageData.standard_price : packageData.premium_price;

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl flex flex-col transition-all duration-500 ease-out hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <div className="relative overflow-hidden">
                {/* PREMIUM RIBBON */}
                {selectedTier === 'premium' && (
                    <div className="absolute top-4 right-4 z-30">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white font-black shadow-lg transform rotate-6">
                            <span className="text-xs uppercase tracking-wider">Premium</span>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src={packageData.thumbnail} alt={packageData.name} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-xs font-bold text-gray-900 rounded-full shadow-lg">{packageData.category}</span>
                </div>
            </div>
            <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white/80 to-white backdrop-blur-lg">
                <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">{packageData.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm flex-grow">{packageData.description}</p>
                
                <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2"><List className="w-5 h-5 text-blue-600"/> Included Services</h4>
                    <ul className="space-y-2">
                        {packageData.included_services.map(service => {
                            const highlighted = selectedTier === 'premium';
                            return (
                                <li key={service} className={`flex items-center gap-3 transition-all ${highlighted ? 'bg-yellow-50 border border-yellow-200 rounded-md p-2 shadow-sm' : ''}`}>
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${highlighted ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                        <Check className={`${highlighted ? 'text-yellow-600' : 'text-green-600'} w-4 h-4`} strokeWidth={3} />
                                    </span>
                                    <span className={`text-sm ${highlighted ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{service}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200">
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-6">
                        <button
                            onClick={() => setSelectedTier('standard')}
                            className={`flex-1 py-3 rounded-xl font-bold text-center transition-all duration-300 ${selectedTier === 'standard' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => setSelectedTier('premium')}
                            className={`flex-1 py-3 rounded-xl font-bold text-center transition-all duration-300 ${selectedTier === 'premium' ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-gray-600 hover:text-gray-800'}`}
                        >
                            Premium
                        </button>
                    </div>

                    {selectedTier === 'premium' && (
                        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                            <p className="text-xs font-semibold text-blue-700">✔ Includes Free Creator Kit! (Assets, VFX, SFX, etc.)</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <span className={`text-4xl font-black ${selectedTier === 'premium' ? 'bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'}`}>₹{price.toLocaleString('en-IN')}</span>
                        <span className="block text-sm text-gray-500 font-medium mt-1">per month</span>
                        <p className="text-xs text-gray-500 italic mt-2">Default monthly prices shown — final price will be discussed and negotiated during consultation.</p>
                    </div>

                    <button 
                        onClick={() => onBook(packageData, selectedTier)} 
                        disabled={!packageData.is_active} 
                        className={`relative w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed group/btn ${selectedTier === 'premium' ? 'shadow-[0_20px_60px_-15px_rgba(255,165,0,0.25)]' : ''}`}
                    >
                        <div className={`absolute inset-0 ${selectedTier === 'premium' ? 'bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500' : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500'} bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500`}></div>
                        <span className="relative flex items-center justify-center gap-2">
                            {selectedTier === 'premium' ? (<><Sparkles className="w-5 h-5 text-white"/> Premium - Book This Package</>) : 'Book This Package'}
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                    </button>
                    <div className="mt-3 text-center">
                        <button type="button" onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-600 hover:text-gray-900 underline">View Terms &amp; Conditions</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LandingPage = ({ onBookNow, packages, individualServices, loadError, onRetry }) => {
    const [selectedServices, setSelectedServices] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const [showFancyModal, setShowFancyModal] = useState(false);
    const [fancyModalContent, setFancyModalContent] = useState(null);
    const [showTerms, setShowTerms] = useState(false);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const customizerScrollRef = useRef(null);

    useEffect(() => {
        let newTotal = 0;
        Object.keys(selectedServices).forEach(key => {
            if (selectedServices[key]) {
                const service = individualServices.find(a => a.key === key);
                if (service) {
                    newTotal += service.price_min;
                }
            }
        });
        setTotalPrice(newTotal);
    }, [selectedServices, individualServices]);

    useEffect(() => {
        const animation = requestAnimationFrame(() => {
            const difference = totalPrice - displayPrice;
            if (Math.abs(difference) < 1) setDisplayPrice(totalPrice);
            else setDisplayPrice(displayPrice + difference * 0.1);
        });
        return () => cancelAnimationFrame(animation);
    }, [totalPrice, displayPrice]);

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
        if (totalPrice) contextualNotes += `\nEstimated Total: ${totalPrice}`;

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
                        <p className="mb-2">We have received your project details and will review them shortly.</p>
                        <p className="text-sm text-gray-600">Our media team will contact you within 24 hours to discuss your content strategy.</p>
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
        if (totalPrice === 0) {
            alert("Please select at least one service to build a custom package.");
            return;
        }
        // Find the 'Creator's Choice' package from the main data source to use as a template.
        // Be defensive: Supabase may return ids as strings, or the package may be missing from remote data.
        const customPackageTemplate = (packages || []).find(p => Number(p?.id) === CREATOR_CHOICE_ID)
            || packagesData.find(p => Number(p?.id) === CREATOR_CHOICE_ID);

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

        onBookNow(customPackageTemplate, selectedServices, totalPrice);
    };

    if (loadError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <h3 className="text-lg font-bold text-red-600 mb-2">Failed to load packages</h3>
                    <p className="text-sm text-gray-600 mb-4">{String(loadError)}</p>
                    <div className="flex justify-center">
                        <button onClick={() => onRetry && onRetry()} className="px-6 py-3 bg-[#0052CC] text-white rounded-xl">Retry</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!packages || packages.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">No packages available right now.</div>
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
            <section className="relative py-32 bg-gradient-to-br from-[#0052CC] to-[#0066FF] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZHRoPSI1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-2xl animate-[float_12s_ease-in-out_infinite]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <Megaphone className="text-[#0052CC]" size={64} />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">Focsera Media</h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
                        Professional Content, Marketing & Growth Services
                    </p>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        We build your brand's voice and amplify your reach. From content strategy to ad campaigns, we provide end-to-end media solutions.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Edit className="text-[#0052CC]" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Content Creation</h3>
                            <p className="text-gray-600 text-lg">High-quality writing, video editing, and visual design to tell your story.</p>
                        </div>
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <TrendingUp className="text-[#0052CC]" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Marketing & Growth</h3>
                            <p className="text-gray-600 text-lg">Strategic SEO, SMM, and ad campaigns to grow your audience.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={packagesRef} className="py-24 bg-white">
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Our Signature Packages</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
                    </div>
                    {/* Creator's Choice promo card — scrolls to customizer and shows live estimate */}
                    <div className="max-w-2xl mx-auto mb-6">
                        {(() => {
                            const cc = (packages || []).find(p => Number(p.id) === CREATOR_CHOICE_ID) || packagesData.find(p => Number(p.id) === CREATOR_CHOICE_ID);
                            if (cc) {
                                return (
                                    <MediaPackageCard
                                        packageData={cc}
                                        onBook={onBookNow}
                                        onOpenTerms={() => setShowTerms(true)}
                                        index={-1}
                                        customizerScrollRef={customizerScrollRef}
                                        customEstimatedPrice={displayPrice}
                                        customSelectedCount={Object.entries(selectedServices).filter(([_, v]) => v).length}
                                    />
                                );
                            }
                            return null;
                        })()}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {packages.filter(Boolean).filter(p => Number(p.id) !== CREATOR_CHOICE_ID).map((pkg, index) => (
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

             <section ref={customizerScrollRef} className="py-24 bg-gray-50 scroll-mt-24">
                 <div ref={customizerSectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                     <div className="text-center mb-16">
                         <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Build Your Own Package</h2>
                         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Select the individual services you need to create a plan that's perfectly tailored to your goals.
                         </p>
                     </div>
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                         <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-2xl space-y-8">
                            
                            {Object.entries(servicesByCategory).map(([category, services]) => (
                                <div key={category}>
                                    <h3 className="text-xl font-bold mb-4">{category} Services</h3>
                                    <div className="space-y-4">
                                        {services.map((service) => {
                                            const isSelected = selectedServices[service.key];
                                            return (
                                                <div key={service.key} className={`p-4 border-2 rounded-xl transition-all duration-300 ${isSelected ? 'bg-blue-50 border-[#0052CC] shadow-md' : 'bg-gray-50 border-gray-200'}`}>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <button
                                                                    onClick={() => handleServiceToggle(service.key)}
                                                                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#0052CC] border-[#0052CC]' : 'border-gray-300 hover:border-gray-400'}`}
                                                                >
                                                                    {isSelected && <Check className="text-white" size={16} />}
                                                                </button>
                                                                <span className="font-semibold text-gray-900">{service.label}</span>
                                                            </div>
                                                            {service.description && (
                                                                <p className="text-xs text-gray-600 ml-9">{service.description}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className="text-sm font-bold text-gray-900">
                                                                ₹{service.price_min.toLocaleString('en-IN')}
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
                             <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#0052CC] shadow-2xl">
                                 <h3 className="text-2xl font-bold mb-6 text-center">Your Custom Package</h3>
                                 <div className="space-y-3 mb-6 border-b border-blue-200 pb-4 min-h-[100px]">
                                    {Object.entries(selectedServices).filter(([_, value]) => value).length === 0 && (
                                        <p className="text-sm text-gray-500 text-center py-6">Select services to see your total.</p>
                                    )}
                                    
                                     {Object.entries(selectedServices).filter(([_, value]) => value).map(([key]) => {
                                         const service = individualServices.find(a => a.key === key);
                                         const isPremiumMode = displayPrice > 0 && displayPrice >= 20000; // heuristic: premium-level total
                                         return service ? (
                                             <div key={key} className={`flex justify-between items-center text-sm transition-all ${isPremiumMode ? 'bg-yellow-50 border border-yellow-200 rounded-md p-2 shadow-sm' : ''}`}>
                                                 <p className={`${isPremiumMode ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>{service.label}</p>
                                                 <p className={`${isPremiumMode ? 'text-yellow-700 font-bold' : 'text-gray-500 font-medium'}`}>+ ₹{(service.price_min).toLocaleString('en-IN')}</p>
                                             </div>
                                         ) : null;
                                     })}
                                 </div>
                                 <div className="flex justify-between items-center mb-6">
                                     <p className="text-lg font-bold">Estimated Total</p>
                                     <p className="text-3xl font-bold text-[#0052CC]">₹{Math.round(displayPrice).toLocaleString('en-IN')}</p>
                                 </div>
                                 <p className="text-xs text-gray-500 italic mb-4">These are default estimates — final pricing will be discussed and negotiated after a consultation.</p>
                                 <button onClick={handleCustomBooking} className="button-primary w-full">
                                     Book This Package
                                     <ArrowRight className="button-primary-icon" />
                                 </button>
                                 <p className="text-xs text-gray-500 mt-4 text-center">Final price will be confirmed after consultation.</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </section>

            <section ref={quoteSectionRef} className="py-24 bg-white">
                <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${quoteIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Have a Unique Project?</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        If you're unsure where to start, tell us about your goals, and we'll create a custom quote just for you.
                    </p>
                    <form onSubmit={handleQuoteSubmit} className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-2xl text-left max-w-3xl mx-auto space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label><input type="text" id="name" name="name" className="w-full input-field" placeholder="John Doe" required /></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" id="email" name="email" className="w-full input-field" placeholder="you@example.com" required /></div>
                        </div>
                        <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full input-field" placeholder="+91 12345 67890" /></div>
                        <div><label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project</label><textarea id="details" name="details" rows="5" className="w-full input-field" placeholder="Please include as many details as possible: your business, target audience, content goals, etc." required></textarea></div>
                        <button type="submit" className="button-primary w-full">Get a Custom Quote <ArrowRight className="button-primary-icon" /></button>
                         <div className="mt-3 text-center">
                            <button type="button" onClick={() => setShowTerms(true)} className="text-xs text-gray-600 hover:text-gray-900 underline">View Terms &amp; Conditions</button>
                        </div>
                    </form>
                </div>
            </section>

            <footer className="bg-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300"><Megaphone className="text-white" size={32} /></div>
                    <p className="font-bold text-2xl mb-2">Focsera Media</p>
                    <p className="text-gray-400">Content that Converts, Strategy that Scales.</p>
                    <p className="text-sm text-gray-500 mt-8">© {new Date().getFullYear()} Focsera Media. All Rights Reserved.</p>
                </div>
            </footer>
            {showFancyModal && fancyModalContent && (
                <FancyModal
                    title={fancyModalContent.title}
                    subtitle={fancyModalContent.subtitle}
                    details={fancyModalContent.details}
                    onClose={() => setShowFancyModal(false)}
                />
            )}

            {showTerms && (
                <TermsModal onClose={() => setShowTerms(false)} />
            )}
        </>
    );
};

// --- CHECKOUT FLOW COMPONENTS ---

const CheckoutHeader = ({ currentStep }) => {
    const steps = [
        { id: 'login', name: 'Login', icon: <User className="w-5 h-5"/> },
        { id: 'cart', name: 'Review Order', icon: <ShoppingCart className="w-5 h-5"/> },
        { id: 'details', name: 'Checkout', icon: <CreditCard className="w-5 h-5"/> }
    ];
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
            <nav className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-4">
                       <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center gap-2 font-bold text-xl text-gray-800">
                           <Megaphone className="text-blue-600" />
                           Focsera Media
                       </a>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-blue-600 transition-all duration-500" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}></div>
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index <= currentStepIndex ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                                    {index < currentStepIndex ? <Check/> : step.icon}
                                </div>
                                <p className={`mt-2 text-xs font-semibold ${index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'}`}>{step.name}</p>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col items-center justify-center p-4 pt-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(100,116,139,0.08),transparent_50%)]"></div>
            <div className="w-full max-w-md animate-fadeInUp relative z-10">
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 p-8 lg:p-10">
                    <button onClick={onBack} className="absolute top-6 left-6 text-slate-600 hover:text-slate-800 font-medium text-sm flex items-center gap-2 transition-colors">
                        <span className="hover:-translate-x-1 transition-transform">&larr;</span> Back
                    </button>
                    <div className="text-center mb-8 mt-8">
                        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block mb-2">
                            FOCSERA
                        </h2>
                        <p className="text-slate-600">{isLoginView ? 'Sign in to continue your booking' : 'Join Focsera Media today'}</p>
                    </div>

                    <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
                        <button
                            onClick={() => setIsLoginView(true)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${isLoginView ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'}`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => setIsLoginView(false)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${!isLoginView ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 ${messageType === 'error' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-blue-50 border border-blue-200 text-blue-700'}`}>
                            <span>{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-start gap-3">
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-5">
                        {!isLoginView && (
                            <div className="group">
                                <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
                                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="relative w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400" placeholder="John Doe" required />
                                </div>
                            </div>
                        )}
                        <div className="group">
                            <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="relative w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400" placeholder="you@example.com" required />
                            </div>
                        </div>
                        <div className="group">
                            <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="relative w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400" placeholder="••••••••" required minLength={6} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10 transition-colors">
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
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
                        <p className="text-sm text-slate-600">
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => setIsLoginView(!isLoginView)} className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                {isLoginView ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                    <div className="flex items-center my-8">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="mx-4 text-slate-400 text-sm font-medium">OR</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>
                    <button onClick={onLogin} className="w-full py-3.5 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all">
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ bookingPackage, onProceed, onBack, individualServices }) => {
    const isCustom = bookingPackage.package.id === CREATOR_CHOICE_ID;
    const basePrice = isCustom ? 0 : (bookingPackage.tier === 'standard' ? bookingPackage.package.standard_price : bookingPackage.package.premium_price);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 pt-40">
            <div className="max-w-5xl mx-auto animate-fadeInUp">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Review Your Order</h1>
                    <p className="text-gray-600">Please review your package details before proceeding to checkout</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="aspect-video w-full overflow-hidden bg-gray-200">
                                <img src={bookingPackage.package.thumbnail} alt={bookingPackage.package.name} className="w-full h-full object-cover"/>
                            </div>
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">{bookingPackage.package.name}</h2>
                                <p className="text-gray-600 leading-relaxed">{isCustom ? "A custom selection of our media services tailored to your needs." : bookingPackage.package.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[#0052CC] sticky top-8">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                    <span className="font-semibold text-gray-700">
                                        {isCustom ? "Custom Package" : `Base Package (${bookingPackage.tier})`}
                                    </span>
                                    {!isCustom && (
                                        <span className="font-bold text-gray-900">₹{basePrice.toLocaleString('en-IN')}</span>
                                    )}
                                </div>
                                
                                {isCustom ? (
                                    Object.entries(bookingPackage.services).filter(([_,v]) => v).map(([key]) => {
                                        const service = individualServices.find(a => a.key === key);
                                        return service ? (
                                            <div key={key} className="flex justify-between items-center">
                                                <span className="text-gray-600">{service.label}</span>
                                                <span className="text-gray-700 font-medium">+ ₹{service.price_min.toLocaleString('en-IN')}</span>
                                            </div>
                                        ) : null;
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500">Includes all services listed for the {bookingPackage.tier} tier.</p>
                                )}
                            </div>
                            <div className="pt-6 border-t-2 border-gray-200 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">Total</span>
                                    <span className="text-3xl font-bold text-[#0052CC]">₹{bookingPackage.totalPrice.toLocaleString('en-IN')}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">*Final price will be confirmed after consultation</p>
                            </div>
                            <button onClick={onProceed} className="button-primary w-full mb-3">
                                Proceed to Checkout
                                <ArrowRight className="button-primary-icon" />
                            </button>
                            <button onClick={onBack} className="w-full py-3 text-center font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                                &larr; Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailsPage = ({ bookingPackage, onConfirm, onBack, session, individualServices }) => {

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const clientDetails = Object.fromEntries(formData.entries());

        let packageDetails = {};
    if (bookingPackage.package.id === CREATOR_CHOICE_ID) {
            packageDetails = {
                serviceName: "Creator's Choice (Custom)",
                customServices: Object.entries(bookingPackage.services)
                    .filter(([_,v]) => v)
                    .map(([key]) => {
                        const service = individualServices.find(a => a.key === key);
                        return service ? service.label : null;
                    }).filter(Boolean)
            };
        } else {
            packageDetails = {
                serviceName: bookingPackage.package.name,
                tier: bookingPackage.tier,
                includedServices: bookingPackage.package.included_services
            };
        }

        const bookingData = {
            user_id: session?.user?.id,
            package_id: bookingPackage.package.id,
            total_price: bookingPackage.totalPrice,
            client_details: {
                name: clientDetails.name,
                email: clientDetails.email,
                phone: clientDetails.phone,
                company_name: clientDetails.company_name || null,
            },
            package_details: packageDetails
        };

        const { error } = await supabase.from('media_bookings').insert([bookingData]);
        if (error) {
            alert('Error creating booking: ' + error.message);
        } else {
            onConfirm();
        }
    };
    
    const isCustom = bookingPackage.package.id === CREATOR_CHOICE_ID;

    return (
     <div className="min-h-screen bg-gray-50 p-4 sm:p-8 pt-40">
         <div className="max-w-6xl mx-auto animate-fadeInUp">
             <div className="mb-8">
                 <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
                 <p className="text-gray-600">Enter your project details to finalize your booking</p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                 <div className="lg:col-span-2">
                     <form onSubmit={handleConfirmBooking} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
                         <div>
                             <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                     <label className="text-sm font-semibold text-gray-700 block mb-2">Full Name</label>
                                     <input name="name" type="text" className="w-full input-field" placeholder="John Doe" defaultValue={session?.user?.user_metadata?.full_name || ''} required />
                                 </div>
                                 <div>
                                     <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
                                     <input name="email" type="email" className="w-full input-field" placeholder="you@example.com" defaultValue={session?.user?.email || ''} required />
                                 </div>
                                 <div>
                                     <label className="text-sm font-semibold text-gray-700 block mb-2">Phone Number</label>
                                     <input name="phone" type="tel" className="w-full input-field" placeholder="+91 98765 43210" required />
                                 </div>
                                  <div>
                                     <label className="text-sm font-semibold text-gray-700 block mb-2">Company Name (Optional)</label>
                                     <input name="company_name" type="text" className="w-full input-field" placeholder="Your Company Inc." />
                                 </div>
                             </div>
                         </div>

                         <div className="pt-6 border-t border-gray-200">
                             <h3 className="text-xl font-bold mb-6">Project Details</h3>
                             <div className="space-y-6">
                                 <div>
                                     <label className="text-sm font-semibold text-gray-700 block mb-2">Primary Goal</label>
                                     <textarea name="project_goals" rows="3" className="w-full input-field" placeholder="What is the main goal for this content? (e.g., increase brand awareness, generate leads, grow social media following)" required></textarea>
                                 </div>
                             </div>
                         </div>

                         <div className="pt-6 flex flex-col-reverse sm:flex-row items-center gap-4">
                             <button type="button" onClick={onBack} className="w-full sm:w-auto font-semibold text-gray-600 hover:text-gray-900 py-3 px-8 rounded-xl transition-colors">
                                 &larr; Back
                             </button>
                             <button type="submit" className="button-primary w-full sm:flex-1">
                                 Confirm Booking
                                 <ArrowRight className="button-primary-icon" />
                             </button>
                         </div>
                     </form>
                 </div>

                 <div className="lg:col-span-1">
                     <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[#0052CC] sticky top-8">
                         <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                         <div className="space-y-4 mb-6">
                             <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                 <span className="font-semibold text-gray-700">{bookingPackage.package.name} {bookingPackage.tier ? `(${bookingPackage.tier})` : ''}</span>
                             </div>
                             
                             {isCustom ? (
                                    Object.entries(bookingPackage.services).filter(([_,v]) => v).map(([key]) => {
                                        const service = individualServices.find(a => a.key === key);
                                        return service ? (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600">{service.label}</span>
                                                <span className="text-gray-700 font-medium">+ ₹{service.price_min.toLocaleString('en-IN')}</span>
                                            </div>
                                        ) : null;
                                    })
                                ) : (
                                    <p className="text-sm text-gray-500">Includes all services for the {bookingPackage.tier} tier.</p>
                                )}
                         </div>
                         <div className="pt-6 border-t-2 border-gray-200">
                             <div className="flex justify-between items-center">
                                 <span className="text-lg font-bold">Total</span>
                                 <span className="text-3xl font-bold text-[#0052CC]">₹{bookingPackage.totalPrice.toLocaleString('en-IN')}</span>
                             </div>
                             <p className="text-xs text-gray-500 mt-2">*Final price confirmed after consultation</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
    );
};

const SuccessModal = ({ onClose }) => {
    const [confetti, setConfetti] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn overflow-hidden">
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

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-12 text-center max-w-2xl mx-auto border-2 border-[#0052CC] relative animate-scaleIn">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl animate-bounce-slow">
                        <Check className="w-20 h-20 text-white" strokeWidth={4}/>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4 animate-slideDown">Booking Confirmed!</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto mb-6 rounded-full"></div>

                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-8">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            Thank you for choosing <span className="font-bold text-[#0052CC]">Focsera Media</span>!
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Your booking request has been successfully received and our team is already reviewing the details.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-[#0052CC]">1</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Confirmation Email</h4>
                                <p className="text-sm text-gray-600">Sent within 5 minutes</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-[#0052CC]">2</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Strategy Call</h4>
                                <p className="text-sm text-gray-600">Within 24 hours</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl font-bold text-[#0052CC]">3</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">Project Kick-off</h4>
                                <p className="text-sm text-gray-600">Pricing & schedule</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 italic">
                            Our professional team will reach out to discuss the final details, confirm pricing, and schedule your project kick-off call.
                        </p>
                    </div>

                    <button onClick={onClose} className="button-primary text-lg px-12 py-4 shadow-xl hover:shadow-2xl transition-all">
                        Return to Media
                        <ArrowRight className="button-primary-icon" size={24} />
                    </button>
                    <p className="text-sm text-gray-500 mt-6">
                        Need immediate assistance? Call us at <span className="font-semibold text-[#0052CC]">+91 98765 43210</span>
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
                const normalize = (s = '') => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
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
            setCurrentView('login');
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
             return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Please select a package first.</div>
        }

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
                            onConfirm={() => setShowSuccess(true)} 
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
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Loading Focsera Media...</p>
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

                .gradient-text { background: linear-gradient(90deg, #0052CC, #007BFF, #33A1FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: background-pan 5s linear infinite; }

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
                    background-color: white; border: 1px solid #e2e8f0; border-radius: 0.5rem;
                    padding: 0.75rem 1rem; transition: all 0.2s ease-in-out;
                }
                .input-field:focus {
                    outline: none; border-color: var(--brand-blue);
                    box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.2);
                }
            `}</style>

            <div className="bg-gray-50 text-gray-800 font-sans antialiased">
                {['login', 'cart', 'details'].includes(currentView) && <CheckoutHeader currentStep={currentView} />}
                {renderContent()}
                {showSuccess && <SuccessModal onClose={resetToLanding} />}
            </div>
        </>
    );
}

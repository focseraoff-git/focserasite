// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import FancyModal from '../../components/FancyModal';
import PremiumOfferSection from '../../components/PremiumOfferSection';
import Snapshot74 from '../../assets/Snapshot_74.png';


// --- ICONS (using inline SVGs for self-containment) ---
const Camera = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
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
const Instagram = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Twitter = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
const Facebook = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
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
const GoogleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.614l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C41.382 36.661 44 31.023 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
);
const Timer = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const Heart = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const Plus = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const Zap = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const Video = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
);
const Frame = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
);

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

const PackageCard = ({ service, onBook, index, customizerScrollRef }) => {
    const cardRef = useRef(null);
    const [isTermsVisible, setIsTermsVisible] = useState(false);

    const handleMouseMove = (e) => {
        if (!service.is_active) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        if (!service.is_active) return;
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-500 ease-out ${!service.is_active ? 'grayscale opacity-70' : 'hover:shadow-[0_20px_60px_-15px_rgba(0,123,255,0.3)] hover:border-blue-500/30'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {!service.is_active && (
                <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg border border-white/10">
                    Currently Unavailable
                </div>
            )}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src={service.thumbnail} alt={service.name} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-xs font-bold text-white rounded-full shadow-lg border border-white/20">{service.category}</span>
                </div>
            </div>
            <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-[#111] to-[#050505]">
                <h3 className="text-3xl font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all duration-300 font-sans tracking-tight">{service.name}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed flex-grow text-sm font-sans">{service.description}</p>
                <div className="mb-6 relative">
                    <div className="inline-block">
                        <span className="text-2xl font-extrabold text-[#3b82f6]">Get your custom quote</span>
                    </div>
                    <span className="block text-sm text-gray-500 font-medium mt-1">Contact us to discuss scope & pricing</span>
                </div>

                <div className="border-t border-white/10 mt-auto pt-4 space-y-4">
                    <button onClick={() => setIsTermsVisible(!isTermsVisible)} className="flex justify-between items-center w-full text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                        <span>Terms & Details</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTermsVisible ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTermsVisible ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="text-xs text-gray-500 space-y-3 pt-2">
                            <div>
                                <h4 className="font-bold text-gray-300">Client Terms</h4>
                                <p>{service.terms.clientSupport}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-300">Studio Terms</h4>
                                <p>{service.terms.studioSupport}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => {
                    customizerScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => onBook(), 500);
                }} disabled={!service.is_active} className="relative mt-4 w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed group/btn shadow-lg shadow-blue-900/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-2">
                        {service.is_active ? 'Get Custom Quote' : 'Unavailable'}
                        {service.is_active && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                    </span>
                </button>
            </div>
        </div>
    );
};

const TermsModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[#1a1a1a] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-white/10 animate-scaleIn overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 pointer-events-none mix-blend-overlay"></div>
                <div className="flex-shrink-0 bg-[#1a1a1a]/95 backdrop-blur-md p-4 md:p-6 border-b border-white/10 flex justify-between items-center z-10">
                    <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-xl md:text-2xl">📜</span> Strict Terms & Conditions
                    </h3>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4">
                        <p className="text-red-200 text-sm font-semibold text-center">
                            ⚠️ Please read carefully before booking. These terms are strict and non-negotiable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-sm text-gray-300">
                        <ul className="space-y-3 list-disc pl-5 marker:text-yellow-500">
                            <li><strong>One Service per Booking:</strong> Each booking covers only one service type.</li>
                            <li><strong>Max 8 bookings per day:</strong> Slots are allotted on a first-come, first-served basis.</li>
                            <li><strong>Equipment:</strong> Shoot conducted using <strong>iPhone or DSLR</strong> at Focsera Studios' sole discretion.</li>
                            <li><strong>Location:</strong> Valid for a <strong>single location in Hyderabad only</strong>. No multiple spots.</li>
                            <li><strong>Deliverables:</strong> <strong>No raw files</strong> provided. Edited output only.</li>
                            <li><strong>Revisions:</strong> <strong>No reshoots allowed</strong>. Only <strong>1 minor revision</strong> permitted.</li>
                            <li><strong>Social Media:</strong> <strong>Repost & tagging</strong> of Focsera Studios is mandatory.</li>
                            <li><strong>Gear:</strong> <strong>No professional lights, microphones, or gimbals</strong> included in this offer.</li>
                            <li><strong>Experience-Based:</strong> This is a trial experience with <strong>no guaranteed photo/video count</strong>.</li>
                            <li><strong>Punctuality:</strong> <strong>Late arrival leads to immediate cancellation</strong> without refund.</li>
                            <li><strong>Refunds:</strong> All bookings are <strong>non-refundable and non-transferable</strong>.</li>
                            <li><strong>Conduct:</strong> Any misbehavior or non-cooperation will result in immediate <strong>termination of the shoot</strong>.</li>
                            <li><strong>Validity:</strong> Offer valid strictly during the <strong>Sankranthi festival period</strong>.</li>
                        </ul>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <h4 className="font-bold text-yellow-500 text-sm mb-3 tracking-widest uppercase">Combo Pack Special Terms:</h4>
                        <div className="bg-white/5 rounded-xl p-4 space-y-3 border border-white/5">
                            <p className="text-sm text-gray-300">
                                • <strong>Single Slot:</strong> Reel, photos, and video must be captured in one continuous time slot.
                            </p>
                            <p className="text-sm text-gray-300">
                                • <strong>No Split:</strong> Services cannot be split across different days or locations.
                            </p>
                            <p className="text-sm text-gray-300">
                                • <strong>Compact Experience:</strong> This is a condensed festive experience, not three full individual services.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-center">
                        <p className="text-xs text-gray-500 italic">
                            *By proceeding with the booking, you acknowledge that you have read, understood, and accepted all the above terms and conditions.
                        </p>
                    </div>
                </div>

                <div className="flex-shrink-0 bg-[#1a1a1a]/95 backdrop-blur-md p-4 md:p-6 border-t border-white/10 z-10">
                    <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all">
                        I Understand & Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

const InstantMemoriesPricing = ({ onBook, onWhatsApp, services }) => {
    const plans = [
        {
            name: "Quick Moments",
            price: "₹999",
            duration: "1 Hour",
            deliverables: [
                "8 edited photographs",
                "1 instantly edited reel"
            ],
            cta: "Book ₹999 Plan",
            highlight: false
        },
        {
            name: "Event Boost",
            price: "₹1499",
            duration: "2 Hours",
            deliverables: [
                "12 edited photographs",
                "2 instantly edited reels"
            ],
            cta: "Book ₹1499 Plan",
            highlight: true,
            badge: "Most Popular"
        },
        {
            name: "Mini Story",
            price: "₹1999",
            duration: "3 Hours",
            deliverables: [
                "16 edited photographs",
                "3 instantly edited reels"
            ],
            cta: "Book ₹1999 Plan",
            highlight: false
        }
    ];

    const handlePlanClick = (plan) => {
        // Find a valid service ID to use as a base
        // Priority: Service named "Instant", or "999", or just the first active service
        const baseService = services?.find(s =>
            s.name.toLowerCase().includes('instant') ||
            s.name.includes('999')
        ) || services?.find(s => s.is_active) || { id: 1 }; // Fallback to ID 1 if nothing found

        const syntheticService = {
            id: baseService.id, // Use REAL database ID
            name: plan.name, // Display name (overrides DB name in UI)
            price: plan.price && plan.price !== 'Contact' && plan.price !== 'Custom' ? parseInt(plan.price.replace(/\D/g, '')) : 0,
            price_min: plan.price && plan.price !== 'Contact' && plan.price !== 'Custom' ? parseInt(plan.price.replace(/\D/g, '')) : 0,
            pricing_mode: plan.price && plan.price !== 'Contact' && plan.price !== 'Custom' ? 'fixed' : 'quote',
            description: `Instant Memories: ${plan.duration}. Includes: ${plan.deliverables ? plan.deliverables.join(', ') : 'Custom Scope'}.`,
            is_active: true,
            thumbnail: Snapshot74,
            category: "Instant Shoot",
            default_add_ons: {},
            terms: {
                clientSupport: "Standard instant shoot terms apply.",
                studioSupport: "Equipment provided by studio."
            }
        };
        onBook(syntheticService);
    };

    return (
        <section id="focsera-999-offer" className="relative w-full bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 overflow-hidden py-12 md:py-20 lg:py-24">
            {/* Soft light flare */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* --- ORIGINAL HERO SECTION RESTORED --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                    {/* Left Content */}
                    <div className="text-left space-y-6">
                        <div className="inline-flex items-center gap-2 bg-black/90 text-yellow-400 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <Timer size={16} className="animate-pulse" />
                            <span className="tracking-wide uppercase">LIMITED TIME OFFER!</span>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black tracking-tighter leading-none flex items-center gap-4">
                                Just ₹999
                                <Camera className="w-12 h-12 md:w-16 md:h-16 text-black/80 rotate-12" />
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-black/80">
                                Book Now!
                            </h3>
                        </div>

                        <p className="text-xl md:text-2xl font-semibold text-black/70">
                            Professional Photography & Editing Included!
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => handlePlanClick(plans[0])}
                                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-lg font-bold rounded-2xl shadow-xl hover:bg-gray-900 hover:scale-105 transition-all duration-300 group"
                            >
                                Book Your Shoot Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => {
                                    document.getElementById('more-plans')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-md text-black border-2 border-black/10 text-lg font-bold rounded-2xl shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300"
                            >
                                View More Plans
                            </button>
                        </div>

                        <div className="space-y-2">
                            <p className="text-red-700 font-bold text-sm flex items-center gap-2 animate-bounce">
                                First few clients only – Hurry!
                            </p>
                            <p className="text-black/60 text-sm font-medium">Link in bio to book</p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                        {/* Floating Social Icons */}
                        <div className="absolute top-10 right-4 z-20 flex flex-col gap-3">
                            <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 animate-bounce-slow">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <div className="w-10 h-10 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white">
                                <Plus size={24} />
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition-all duration-500">
                            <img
                                src={Snapshot74}
                                alt="Professional Shoot"
                                className="w-full h-auto object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* --- EXTENDED PRICING SECTION --- */}
                <div id="more-plans" className="pt-8 border-t border-black/10">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-5xl font-black text-black mb-4 font-sans">More Ways to Capture Memories</h3>
                        <p className="text-black/70 text-lg max-w-2xl mx-auto">Need more time or more reels? Upgrade your instant experience.</p>
                    </div>

                    {/* 2) "What You Get" Mini Feature Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { icon: <Camera className="w-8 h-8 text-black" />, title: "Instant Photos", desc: "Edited on the spot" },
                            { icon: <Video className="w-8 h-8 text-black" />, title: "Instant Reels", desc: "Ready to post" },
                            { icon: <Zap className="w-8 h-8 text-black" />, title: "Fast Delivery", desc: "During the event" },
                            { icon: <Frame className="w-8 h-8 text-black" />, title: "Photo Frames", desc: "Delivered in 48h (Optional)" },
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 text-center hover:bg-white/30 transition-colors shadow-lg">
                                <div className="bg-white/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-black mb-1 text-lg">{feature.title}</h3>
                                <p className="text-sm text-black/70 font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* 3) Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.highlight
                                    ? 'bg-black text-white border-black shadow-xl ring-4 ring-black/10'
                                    : 'bg-white/80 backdrop-blur-md text-black border-white/40 hover:bg-white'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className={`text-xl font-bold mb-2 ${plan.highlight ? 'text-gray-200' : 'text-gray-800'}`}>{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">{plan.price}</span>
                                        <span className={`text-sm ${plan.highlight ? 'text-gray-400' : 'text-gray-600'}`}>/ event</span>
                                    </div>
                                    <div className={`mt-4 inline-block px-3 py-1 rounded-lg text-sm font-medium ${plan.highlight ? 'bg-white/10 text-blue-300' : 'bg-black/5 text-blue-700'}`}>
                                        ⏱️ {plan.duration} Duration
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.deliverables.map((item, i) => (
                                        <li key={i} className={`flex items-start gap-3 ${plan.highlight ? 'text-gray-300' : 'text-gray-700'}`}>
                                            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-green-400' : 'text-green-600'}`} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => handlePlanClick(plan)}
                                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg ${plan.highlight
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-blue-500/30'
                                            : 'bg-black text-white hover:bg-gray-900 hover:scale-105'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                    <p className={`text-xs text-center mt-3 flex items-center justify-center gap-1 ${plan.highlight ? 'text-gray-500' : 'text-gray-600'}`}>
                                        <Zap size={10} className="text-yellow-500 fill-yellow-500" /> Instant delivery at the event
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 4) Add-on Card / Banner */}
                    <div className="bg-black/90 text-white border border-white/10 rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden text-center md:text-left shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-pink-900/40 to-transparent pointer-events-none"></div>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Photo Frames (Optional Add-on)</h3>
                                <p className="text-gray-300 mb-2 text-lg">Select your best moments. We deliver photo frames within 48 hours.</p>
                                <p className="text-sm text-gray-500 italic">Pricing depends on frame size & quantity.</p>
                            </div>
                            <button
                                onClick={() => handlePlanClick({ name: "Photo Frames Add-on", price: "Contact", duration: "N/A", deliverables: ["Custom Frames"] })}
                                className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 hover:scale-105 transition-all whitespace-nowrap shadow-lg"
                            >
                                Add Frames
                            </button>
                        </div>
                    </div>

                    {/* 5) Booking CTA Strip */}
                    <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 text-center shadow-xl">
                        <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Want us to come to your place?</h2>
                        <p className="text-black/80 text-lg mb-8 max-w-2xl mx-auto font-medium">Choose a plan, pick a slot, and we'll shoot + edit instantly.</p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => handlePlanClick({ name: "General Instant Shoot", price: "Custom", duration: "Custom", deliverables: ["Tailored Scope"] })}
                                className="px-8 py-4 bg-black text-white font-black text-lg rounded-xl shadow-xl hover:bg-gray-900 hover:scale-105 transition-all"
                            >
                                Book Now
                            </button>
                            <button
                                onClick={onWhatsApp}
                                className="px-8 py-4 bg-white/40 border-2 border-black/10 text-black font-bold text-lg rounded-xl hover:bg-white/60 hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c1.005.572 1.903.88 3.844.755 3.193-.207 5.727-2.617 5.728-5.937 0-3.18-2.585-5.764-5.766-5.765zm0-2c4.279 0 7.766 3.486 7.766 7.766 0 4.28-3.486 7.767-7.766 7.767-1.921 0-3.136-.596-3.83-1.071l-5.204 1.368 1.4-5.111c-.559-.838-1.229-2.226-1.129-4.32.184-3.696 3.454-6.399 8.763-6.399zm-2.022 10.428c-.126.046-.245.161-.202.348l.053.226c.266 1.134 1.328 1.838 2.894 1.055 1.564-.783 2.122-2.14 1.706-2.671-.247-.315-1.554-.807-1.782-.676-.228.131-.482.723-.746.689-.264-.033-1.085-.56-1.464-.986-.251-.283-.4-.539-.379-.806.02-.267.436-.453.649-.835.105-.189-.009-.436-.123-.679-.124-.263-.448-1.066-.757-1.149-.554-.15-1.036.035-1.378.369-.371.363-.761.802-.638 1.848.122 1.047 1.033 3.328 2.368 4.267z" /></svg>
                                WhatsApp Us
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

const LandingPage = ({ onBookNow, services, addOns, loadError, onRetry }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [showFancyModal, setShowFancyModal] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [fancyModalContent, setFancyModalContent] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState({});
    const [addonQuantities, setAddonQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const customizerScrollRef = useRef(null);
    const addOnsScrollRef = useRef(null);



    useEffect(() => {
        if (services.length > 0 && !selectedService) {
            const firstActive = services.find(s => s.is_active && !s.name.toLowerCase().includes('sankranthi'));
            if (firstActive) {
                setSelectedService(firstActive);
                setSelectedAddOns(firstActive.default_add_ons || {});
            }
        }
    }, [services, selectedService]);

    useEffect(() => {
        // Price calculation logic removed
    }, [selectedService, selectedAddOns, addonQuantities, addOns]);

    const handleAddOnToggle = (key) => {
        setSelectedAddOns(prev => ({ ...prev, [key]: !prev[key] }));
        if (!addonQuantities[key]) {
            setAddonQuantities(prev => ({ ...prev, [key]: 1 }));
        }
    };

    const handleQuantityChange = (key, delta) => {
        setAddonQuantities(prev => {
            const current = prev[key] || 1;
            const newValue = Math.max(1, current + delta);
            return { ...prev, [key]: newValue };
        });
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const quoteData = Object.fromEntries(formData.entries());

        // Basic validation
        const name = quoteData.name || quoteData.full_name || '';
        const email = quoteData.email || '';
        const details = quoteData.details || '';

        if (!name.trim() || !email.trim() || !details.trim()) {
            alert('Please provide your name, email, and some details about the project.');
            return;
        }

        // Append contextual info (selected service, add-ons, location, dates, estimated total)
        let contextualNotes = '';
        if (selectedService) {
            contextualNotes += `\n\nService: ${selectedService.name} (id: ${selectedService.id})`;
        }
        const selectedAddOnKeys = Object.entries(selectedAddOns || {}).filter(([_, v]) => v).map(([k]) => k);
        if (selectedAddOnKeys.length) {
            contextualNotes += `\nAdd-ons: ${selectedAddOnKeys.join(', ')}`;
        }
        if (quoteData.location) contextualNotes += `\nLocation: ${quoteData.location}`;
        if (quoteData.event_end_date) contextualNotes += `\nEnd Date: ${quoteData.event_end_date}`;
        contextualNotes += `\nEstimated Total: Contact for Pricing`;

        const combinedDetails = details + contextualNotes;

        const payload = {
            name: name,
            email: email,
            phone: quoteData.phone || null,
            event_date: quoteData.event_date || null,
            details: combinedDetails,
        };

        try {
            const { error } = await supabase.from('studio_quotes').insert([payload]);
            if (error) {
                console.error('Error inserting studio quote:', error);
                alert('Error submitting quote: ' + (error.message || String(error)));
                return;
            }

            // show grand modal
            setShowFancyModal(true);
            setFancyModalContent({
                title: 'Inquiry Received',
                subtitle: 'Thank you — our team will reach out shortly.',
                details: (
                    <>
                        <p className="mb-2">We have received your project details and will review them shortly.</p>
                        <p className="text-sm text-gray-600">Our studio team will contact you within 24 hours to discuss availability and pricing.</p>
                    </>
                )
            });
            e.target.reset();
        } catch (err) {
            console.error('Unexpected error submitting studio quote:', err);
            alert('An unexpected error occurred while submitting your request. Please try again later.');
        }
    };

    const handleCustomBooking = () => {
        if (!selectedService) return;
        const customPackage = {
            service: selectedService,
            addOns: selectedAddOns,
            totalPrice: null,
        };
        onBookNow(customPackage.service, customPackage.addOns);
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

    if (!services || services.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">No packages available right now.</div>
        );
    }

    return (
        <>
            <section className="relative py-20 md:py-28 lg:py-32 bg-[#020202] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020202] to-[#020202]"></div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-[0_0_40px_rgba(59,130,246,0.3)] border-4 border-white/10 p-3 md:p-4 animate-bounce-slow">
                        <img src="/images/logos/FocseraStudios.jpg" alt="Focsera Studios" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-4 md:mb-6 drop-shadow-sm tracking-tight font-sans">
                        FOCSERA STUDIOS
                    </h1>
                    <p className="text-lg md:text-xl lg:text-3xl text-slate-400 max-w-3xl mx-auto mb-6 md:mb-8 font-light tracking-wide font-sans italic">
                        "Capturing the Essence of Your Moments"
                    </p>
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6 md:mb-8"></div>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed">
                        Premium Photography & Videography Services for your most cherished moments.
                    </p>
                </div>
            </section>

            {/* --- Premium Instant Memories Pricing Section --- */}
            <PremiumOfferSection
                services={services}
                imageUrl={Snapshot74}
                onBook={(syntheticService) => {
                    if (syntheticService) {
                        onBookNow(syntheticService, syntheticService.default_add_ons || {});
                    }
                }}
                onWhatsApp={() => {
                    window.open("https://wa.me/919515803954", "_blank");
                }}
            />


            <section className="py-16 bg-[#050505] border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group">
                            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Camera className="text-blue-400" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 font-sans">Photography Services</h3>
                            <p className="text-gray-400 text-lg">Professional photography for weddings, portraits, fashion, and commercial projects</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 group">
                            <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 font-sans">Videography Services</h3>
                            <p className="text-gray-400 text-lg">Cinematic video production for events, commercials, and promotional content</p>
                        </div>
                    </div>
                </div>
            </section>



            <section ref={packagesRef} className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-b border-white/5">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert"></div>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 font-sans tracking-tight">Our Signature Packages</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.filter(s => s && !s.name.toLowerCase().includes('sankranthi')).map((service, index) => (
                            <PackageCard key={service?.id ?? index} service={service} onBook={() => onBookNow(service, service?.default_add_ons)} index={index} customizerScrollRef={customizerScrollRef} />
                        ))}
                    </div>
                </div>
            </section>

            <section ref={customizerScrollRef} className="py-16 md:py-24 bg-[#050505] scroll-mt-24 relative border-t border-white/5">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
                <div ref={customizerSectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 font-sans tracking-tight">Build Your Own Package</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl space-y-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-white">1. Select Your Base Service</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {services.filter(s => s && !s.name.toLowerCase().includes('sankranthi')).map(service => (
                                        <button key={service?.id ?? service?.name ?? Math.random()} onClick={() => {
                                            if (service.is_active) {
                                                setSelectedService(service);
                                                setSelectedAddOns(service.default_add_ons || {});
                                                setTimeout(() => {
                                                    addOnsScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }, 100);
                                            }
                                        }} disabled={!service.is_active} className={`group/service relative p-5 border-2 rounded-2xl text-left transition-all duration-300 transform overflow-hidden ${(selectedService?.id === service.id) ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/50 border-transparent scale-105' : 'bg-black/40 border-white/10 hover:border-blue-500/50 hover:bg-white/5'} ${service.is_active ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
                                            {selectedService?.id === service.id && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                                            )}
                                            <span className={`relative font-bold block text-sm md:text-base ${(selectedService?.id === service.id) ? 'text-white' : 'text-gray-200'}`}>{service.name}</span>
                                            <span className={`relative text-xs md:text-sm font-medium ${(selectedService?.id === service.id) ? 'text-white/90' : 'text-gray-500'}`}>Get Custom Quote</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div ref={addOnsScrollRef}>
                                <h3 className="text-xl font-bold mb-4 text-white">2. Choose Add-ons</h3>
                                <div className="space-y-4">
                                    {addOns.map((addOn) => {
                                        const isQuantityBased = ['extra_photographer', 'extra_videographer', 'extended_coverage'].includes(addOn.key);
                                        const isSelected = selectedAddOns[addOn.key];
                                        const quantity = addonQuantities[addOn.key] || 1;

                                        return (
                                            <div key={addOn.key} className={`p-4 border rounded-xl transition-all duration-300 ${isSelected ? 'bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-black/20 border-white/5 hover:border-white/20'}`}>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <button
                                                                onClick={() => handleAddOnToggle(addOn.key)}
                                                                className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-600 hover:border-gray-400 bg-transparent'}`}
                                                            >
                                                                {isSelected && <Check className="text-white" size={16} />}
                                                            </button>
                                                            <span className="font-semibold text-gray-200">{addOn.label}</span>
                                                        </div>
                                                        {addOn.description && (
                                                            <p className="text-xs text-gray-500 ml-9">{addOn.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="text-sm font-bold text-gray-300">
                                                            Get Custom Quote
                                                        </span>
                                                        {isSelected && isQuantityBased && (
                                                            <div className="flex items-center gap-2 bg-black/40 rounded-lg border border-white/10 px-2 py-1">
                                                                <button
                                                                    onClick={() => handleQuantityChange(addOn.key, -1)}
                                                                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                                </button>
                                                                <span className="text-sm font-semibold w-8 text-center text-white">{quantity}</span>
                                                                <button
                                                                    onClick={() => handleQuantityChange(addOn.key, 1)}
                                                                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-1 sticky top-8">
                            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                                <h3 className="text-2xl font-bold mb-6 text-center text-white">Your Custom Package</h3>
                                <div className="space-y-3 mb-6 border-b border-white/10 pb-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-300">{selectedService?.name || 'Service'}</p>
                                        <p className="text-gray-400 font-medium">Get Custom Quote</p>
                                    </div>
                                    {Object.entries(selectedAddOns).filter(([_, value]) => value).map(([key]) => {
                                        const addOn = addOns.find(a => a.key === key);
                                        const quantity = addonQuantities[key] || 1;
                                        return addOn ? (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <p className="text-gray-400">{addOn.label}{quantity > 1 ? ` (x${quantity})` : ''}</p>
                                                <p className="text-gray-500 font-medium">+ Get Custom Quote</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-lg font-bold text-white">Estimated Total</p>
                                    <p className="text-xl font-bold text-blue-400">Contact for Pricing</p>
                                </div>
                                <button onClick={handleCustomBooking} className="button-primary w-full shadow-lg shadow-blue-900/30">
                                    Request Custom Quote
                                    <ArrowRight className="button-primary-icon" />
                                </button>
                                <p className="text-xs text-gray-500 mt-4 text-center">Final price will be confirmed after consultation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={quoteSectionRef} className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/40 to-transparent"></div>
                <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${quoteIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold text-white mb-4 font-sans tracking-tight">Have a Unique Project?</h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto font-light">
                        If you didn't find the perfect package, tell us about your event, and we'll create a custom quote just for you.
                    </p>
                    <form onSubmit={handleQuoteSubmit} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl text-left max-w-3xl mx-auto space-y-6 relative z-10 hover:shadow-blue-900/10 transition-shadow duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label><input type="text" id="name" name="name" className="w-full input-field !bg-black/40 !border-white/10 !text-white placeholder:text-gray-600 focus:!border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="John Doe" required /></div>
                            <div><label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label><input type="email" id="email" name="email" className="w-full input-field !bg-black/40 !border-white/10 !text-white placeholder:text-gray-600 focus:!border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="you@example.com" required /></div>
                            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full input-field !bg-black/40 !border-white/10 !text-white placeholder:text-gray-600 focus:!border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="+91 12345 67890" /></div>
                            <div>
                                <label htmlFor="event_date" className="block text-sm font-medium text-gray-400 mb-2">Event Start Date</label>
                                <input type="date" id="event_date" name="event_date" className="w-full input-field !bg-black/40 !border-white/10 !text-white placeholder:text-gray-600 focus:!border-blue-500 focus:ring-1 focus:ring-blue-500 icon-invert" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="event_end_date" className="block text-sm font-medium text-gray-400 mb-2">Event End Date (Optional - for multi-day events)</label>
                            <input type="date" id="event_end_date" name="event_end_date" className="w-full input-field !bg-black/40 !border-white/10 !text-white placeholder:text-gray-600 focus:!border-blue-500 focus:ring-1 focus:ring-blue-500 icon-invert" />
                        </div>
                        <div><label htmlFor="details" className="block text-sm font-medium text-gray-400 mb-2">Tell us about your project</label><textarea id="details" name="details" rows="5" className="w-full input-field !bg-black/40 !border-white/10 !text-white placeholder:text-gray-600 focus:!border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Please include as many details as possible: location, number of guests, duration, specific shots you need, etc." required></textarea></div>
                        <button type="submit" className="button-primary w-full shadow-lg shadow-blue-900/20">Get a Custom Quote <ArrowRight className="button-primary-icon" /></button>
                    </form>
                </div>
            </section>

            <footer className="bg-black text-white py-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 border border-white/10"><Camera className="text-blue-500" size={32} /></div>
                    <p className="font-bold text-2xl mb-2 font-sans tracking-tight">Focsera Studios</p>
                    <p className="text-gray-500 font-light">Capturing Moments, Creating Memories.</p>
                    <div className="flex justify-center gap-6 my-8">
                        <a href="" className="text-gray-500 hover:text-white transition-colors"><Twitter /></a>
                        <a href="https://www.instagram.com/focsera.in/" className="text-gray-500 hover:text-white transition-colors"><Instagram /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook /></a>
                    </div>
                    <p className="text-sm text-gray-600 mt-8">© {new Date().getFullYear()} Focsera Studios. All Rights Reserved.</p>
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
            {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
        </>
    );
};

const CheckoutHeader = ({ currentStep }) => {
    const steps = [
        { id: 'cart', name: 'Review Order', icon: <ShoppingCart className="w-5 h-5" /> },
        { id: 'details', name: 'Checkout', icon: <CreditCard className="w-5 h-5" /> }
    ];
    const currentStepIndex = steps.findIndex(step => step.id === currentStep);

    return (
        <header className="bg-black/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm border-b border-white/5">
            <nav className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-4">
                    <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center gap-2 font-bold text-xl text-white font-sans tracking-tight">
                        <Camera className="text-blue-500" />
                        Focsera Studios
                    </a>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}></div>
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index <= currentStepIndex ? 'bg-gradient-to-br from-blue-600 to-cyan-600 border-transparent text-white shadow-lg shadow-blue-900/50' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
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
                setTimeout(() => {
                    onLogin();
                }, 2000);
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

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/studios',
                }
            });
            if (error) throw error;
        } catch (err) {
            setMessageType('error');
            setError(err.message || 'Error signing in with Google');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 pt-40 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(100,116,139,0.1),transparent_50%)]"></div>

            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-md animate-fadeInUp relative z-10">
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 lg:p-10">
                    <button onClick={onBack} className="absolute top-6 left-6 text-gray-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-colors">
                        <span className="hover:-translate-x-1 transition-transform">&larr;</span> Back
                    </button>

                    <div className="text-center mb-8 mt-8">
                        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent inline-block mb-2 font-sans tracking-tight">
                            FOCSERA
                        </h2>
                        <p className="text-gray-400">{isLoginView ? 'Sign in to continue your booking' : 'Join Focsera Studios today'}</p>
                    </div>

                    <div className="flex gap-2 mb-8 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                        <button
                            onClick={() => setIsLoginView(true)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${isLoginView
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => setIsLoginView(false)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${!isLoginView
                                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-900/30'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {error && (
                        <div className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 ${messageType === 'error'
                            ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                            : 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                            }`}>
                            <span>{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-start gap-3">
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
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        className="relative w-full pl-12 pr-4 py-4 bg-black/40 border-2 border-white/10 rounded-xl focus:border-blue-500 focus:bg-black/60 focus:outline-none transition-all text-white placeholder:text-gray-600"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="group">
                            <label className="text-sm font-bold text-gray-300 block mb-2 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="relative w-full pl-12 pr-4 py-4 bg-black/40 border-2 border-white/10 rounded-xl focus:border-blue-500 focus:bg-black/60 focus:outline-none transition-all text-white placeholder:text-gray-600"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-sm font-bold text-gray-300 block mb-2 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="relative w-full pl-12 pr-12 py-4 bg-black/40 border-2 border-white/10 rounded-xl focus:border-blue-500 focus:bg-black/60 focus:outline-none transition-all text-white placeholder:text-gray-600"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white z-10 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="relative w-full group overflow-hidden rounded-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-center justify-center gap-2 py-4 font-bold text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                                {loading ? 'Please wait...' : (isLoginView ? 'Log In' : 'Create Account')}
                                {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                            </div>
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {isLoginView ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLoginView(!isLoginView)}
                                className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
                            >
                                {isLoginView ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-white/10 rounded-xl font-bold text-gray-300 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all duration-300 mb-4"
                    >
                        <GoogleIcon className="w-5 h-5" />
                        <span>Continue with Google</span>
                    </button>

                    <button
                        onClick={onLogin}
                        className="w-full py-3.5 border-2 border-white/10 rounded-xl font-semibold text-gray-300 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ bookingPackage, onProceed, onBack, addOns }) => {
    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
            <div className="max-w-5xl mx-auto animate-fadeInUp relative z-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 font-sans tracking-tight">Review Your Order</h1>
                    <p className="text-gray-400">Please review your package details before proceeding to checkout</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                            <div className="aspect-video w-full overflow-hidden bg-gray-900 relative">
                                <img src={bookingPackage.service.thumbnail} alt={bookingPackage.service.name} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                            <div className="p-8">
                                <h2 className="text-3xl font-bold text-white mb-3 font-sans tracking-tight">{bookingPackage.service.name}</h2>
                                <p className="text-gray-400 leading-relaxed font-sans">{bookingPackage.service.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/10 sticky top-8">
                            <h3 className="text-xl font-bold mb-6 font-sans tracking-tight text-white">Order Summary</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                    <span className="font-semibold text-gray-300">Base Package</span>
                                    <span className="font-bold text-white">
                                        {bookingPackage.service.pricing_mode === 'fixed' && bookingPackage.service.price_min > 0
                                            ? `₹${bookingPackage.service.price_min}`
                                            : 'Custom Quote'}
                                    </span>
                                </div>
                                {Object.entries(bookingPackage.addOns).filter(([_, v]) => v).map(([key]) => {
                                    const addOn = addOns.find(a => a.key === key);
                                    return addOn ? (
                                        <div key={key} className="flex justify-between items-center">
                                            <span className="text-gray-400">{addOn.label}</span>
                                            <span className="text-gray-300 font-medium">+ Custom Quote</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <div className="pt-6 border-t border-white/10 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold font-sans tracking-tight text-white">Total</span>
                                    <span className="text-sm md:text-xl font-bold text-blue-400">
                                        {bookingPackage.service.pricing_mode === 'fixed' && bookingPackage.service.price_min > 0
                                            ? `₹${bookingPackage.service.price_min}`
                                            : 'Contact for Pricing'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {bookingPackage.service.pricing_mode === 'fixed' && bookingPackage.service.price_min > 0
                                        ? '*Price is fixed. Additional customizations may vary.'
                                        : '*Final price will be confirmed after consultation'}
                                </p>
                            </div>
                            <button onClick={onProceed} className="w-full button-primary shadow-lg shadow-blue-900/30">
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={onBack} className="w-full py-4 mt-3 text-center font-semibold text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                                <span>&larr;</span> Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailsPage = ({ bookingPackage, onConfirm, onBack, session, addOns }) => {

    const isSankranthi = bookingPackage.service.name.toLowerCase().includes('sankranthi');

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const clientDetails = Object.fromEntries(formData.entries());

        const bookingData = {
            user_id: session?.user?.id,
            service_id: bookingPackage.service.id,
            total_price: bookingPackage.service.price_min || bookingPackage.service.price || 0,
            event_date: clientDetails.event_date,
            event_venue: clientDetails.event_venue,
            client_details: {
                name: clientDetails.name,
                email: clientDetails.email,
                phone: clientDetails.phone,
                event_end_date: clientDetails.event_end_date || null,
                number_of_people: clientDetails.number_of_people || null,
            },
            package_details: {
                serviceName: bookingPackage.service.name,
                addOns: Object.entries(bookingPackage.addOns)
                    .filter(([_, v]) => v)
                    .map(([key]) => {
                        const addOn = addOns.find(a => a.key === key);
                        return addOn ? addOn.label : null;
                    }).filter(Boolean)
            }
        };

        const { error } = await supabase.from('studio_bookings').insert([bookingData]);
        if (error) {
            alert('Error creating booking: ' + error.message);
        } else {
            onConfirm();
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] p-4 sm:p-8 pt-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
            <div className="max-w-6xl mx-auto animate-fadeInUp relative z-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 font-sans tracking-tight">Complete Your Booking</h1>
                    <p className="text-gray-400">Enter your event details to finalize your booking</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <form onSubmit={handleConfirmBooking} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-6 font-sans tracking-tight text-white">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-300 block mb-2">Full Name</label>
                                        <input name="name" type="text" className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" placeholder="Rahul Sharma" defaultValue={session?.user?.user_metadata?.full_name || ''} required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-300 block mb-2">Email Address</label>
                                        <input name="email" type="email" className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" placeholder="you@example.com" defaultValue={session?.user?.email || ''} required />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-300 block mb-2">Phone Number</label>
                                        <input name="phone" type="tel" className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" placeholder="+91 98765 43210" required />
                                    </div>
                                    {isSankranthi && (
                                        <>
                                            <div>
                                                <label className="text-sm font-semibold text-gray-300 block mb-2">Number of People</label>
                                                <input name="number_of_people" type="number" min="1" max="10" className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" placeholder="e.g. 4" required />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <h3 className="text-xl font-bold mb-6 font-sans tracking-tight text-white">Event Details</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-300 block mb-2">Event Date(s)</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-gray-500 block mb-1">Start Date {isSankranthi && <span className="text-red-400 font-bold">(Jan 9-14 Only)</span>}</label>
                                                <input
                                                    name="event_date"
                                                    type="date"
                                                    className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl"
                                                    required
                                                    min={isSankranthi ? "2026-01-09" : undefined}
                                                    max={isSankranthi ? "2026-01-14" : undefined}
                                                />
                                            </div>
                                            {!isSankranthi && (
                                                <div>
                                                    <label className="text-xs text-gray-500 block mb-1">End Date (Optional - for multi-day events)</label>
                                                    <input name="event_end_date" type="date" className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {isSankranthi && (
                                        <div>
                                            <div className="bg-yellow-900/20 border-l-4 border-yellow-600 p-4 mb-4 rounded-r-lg">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm text-yellow-200">
                                                            <strong className="font-bold">Important:</strong> Please be fully ready in your outfits by the start of your slot. We will not be able to wait or extend the slot if you are late.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <label className="text-sm font-semibold text-gray-300 block mb-2">Preferred Time Slot</label>
                                            <select name="time_slot" className="w-full input-field bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" required>
                                                <option value="">Select a time slot</option>
                                                {Array.from({ length: 13 }).map((_, i) => {
                                                    const startHour = 8 + i;
                                                    const endHour = startHour + 1;
                                                    const formatTime = (h: number) => {
                                                        const period = h >= 12 ? 'PM' : 'AM';
                                                        const hour = h > 12 ? h - 12 : h;
                                                        return `${hour}:00 ${period}`;
                                                    };
                                                    const slot = `${formatTime(startHour)} - ${formatTime(endHour)}`;
                                                    return <option key={slot} value={slot}>{slot}</option>;
                                                })}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="text-sm font-semibold text-gray-300 block mb-2">Event Venue / Location {isSankranthi && <span className="text-red-400 font-bold">(Hyderabad Only)</span>}</label>
                                        <textarea name="event_venue" className="w-full input-field h-32 resize-none bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 rounded-xl" placeholder={isSankranthi ? "Enter the full address of your event venue in Hyderabad" : "Enter the full address of your event venue"} required></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button type="submit" className="w-full button-primary shadow-lg shadow-blue-900/30">
                                    Confirm Booking
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    By confirming, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 sticky top-32">
                            <h3 className="text-xl font-bold mb-6 font-sans tracking-tight text-white">Order Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                    <span className="font-semibold text-gray-300">{bookingPackage.service.name}</span>
                                    <span className="font-bold text-white">
                                        {bookingPackage.service.pricing_mode === 'fixed' && bookingPackage.service.price_min > 0
                                            ? `₹${bookingPackage.service.price_min}`
                                            : 'Custom Quote'}
                                    </span>
                                </div>
                                {Object.entries(bookingPackage.addOns).filter(([_, v]) => v).map(([key]) => {
                                    const addOn = addOns.find(a => a.key === key);
                                    return addOn ? (
                                        <div key={key} className="flex justify-between items-center">
                                            <span className="text-gray-400">{addOn.label}</span>
                                            <span className="text-gray-300 font-medium">+ Custom Quote</span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold font-sans tracking-tight text-white">Total</span>
                                    <span className="text-sm md:text-xl font-bold text-blue-400">
                                        {bookingPackage.service.pricing_mode === 'fixed' && bookingPackage.service.price_min > 0
                                            ? `₹${bookingPackage.service.price_min}`
                                            : 'Contact for Pricing'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {bookingPackage.service.pricing_mode === 'fixed' && bookingPackage.service.price_min > 0
                                        ? '*Price is fixed. Additional customizations may vary.'
                                        : '*Final price confirmed after consultation'}
                                </p>
                            </div>
                            <button onClick={onBack} className="w-full py-4 mt-6 text-center font-semibold text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 border border-white/10 rounded-xl hover:bg-white/5">
                                <span>&larr;</span> Back to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SuccessModal = ({ onClose, bookingPackage }) => {
    const [confetti, setConfetti] = React.useState(true);
    const isSankranthi = bookingPackage?.service?.name?.toLowerCase().includes('sankranthi');

    React.useEffect(() => {
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
                                backgroundColor: isSankranthi
                                    ? ['#FFD700', '#FF4500', '#FF6347', '#FFA500', '#FFFF00'][Math.floor(Math.random() * 5)]
                                    : ['#3B82F6', '#06B6D4', '#2563EB', '#60A5FA', '#22D3EE'][Math.floor(Math.random() * 5)],
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${Math.random() * 3 + 2}s`,
                                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className={`bg-gradient-to-br ${isSankranthi ? 'from-[#fffbf0] to-[#fff0f0]' : 'from-[#0a0a0a] to-gray-900'} rounded-3xl shadow-2xl p-6 md:p-12 text-center w-full max-w-2xl mx-auto border-2 ${isSankranthi ? 'border-yellow-500' : 'border-blue-500/50'} relative animate-scaleIn max-h-[90vh] flex flex-col overflow-hidden`}>
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${isSankranthi ? 'from-yellow-400 to-red-600' : 'from-blue-500 to-cyan-500'} flex items-center justify-center shadow-2xl shadow-blue-900/50 animate-bounce-slow`}>
                        {isSankranthi ? <span className="text-5xl">🪁</span> : <Check className="w-12 h-12 md:w-20 md:h-20 text-white" strokeWidth={4} />}
                    </div>
                </div>

                <div className="mt-12 md:mt-20 overflow-y-auto flex-grow px-2">
                    <h2 className={`text-3xl md:text-5xl font-bold ${isSankranthi ? 'text-red-800' : 'text-white'} mb-4 animate-slideDown font-sans tracking-tight`}>
                        {isSankranthi ? 'Sankranthi Slot Confirmed!' : 'Booking Confirmed!'}
                    </h2>
                    <div className={`w-24 h-1 bg-gradient-to-r ${isSankranthi ? 'from-yellow-500 to-red-500' : 'from-blue-500 to-cyan-500'} mx-auto mb-6 rounded-full`}></div>

                    <div className={`${isSankranthi ? 'bg-red-50 border-red-200' : 'bg-white/5 border-white/10'} border-2 rounded-2xl p-8 mb-8`}>
                        <p className={`text-xl leading-relaxed mb-6 ${isSankranthi ? 'text-gray-700' : 'text-gray-300'}`}>
                            Thank you for choosing <span className={`font-bold ${isSankranthi ? 'text-red-700' : 'text-blue-400'}`}>Focsera Studios</span>!
                        </p>
                        <p className={`leading-relaxed mb-6 ${isSankranthi ? 'text-gray-600' : 'text-gray-400'}`}>
                            {isSankranthi
                                ? "Your festive slot is locked! Get ready to capture your Sankranthi memories."
                                : "Your booking request has been successfully received and our team is already reviewing the details."}
                        </p>

                        {isSankranthi && (
                            <div className="mb-6 p-4 bg-yellow-100/50 rounded-xl border border-yellow-200 text-sm text-yellow-800">
                                <strong>📍 Venue:</strong> Hyderabad Only<br />
                                <strong>⚠️ Note:</strong> Please be on time. No refunds for delays/cancellations.
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                            <div className={`${isSankranthi ? 'bg-white' : 'bg-white/5'} rounded-xl p-6 shadow-md`}>
                                <div className={`w-12 h-12 rounded-full ${isSankranthi ? 'bg-red-100' : 'bg-blue-900/30'} flex items-center justify-center mx-auto mb-3`}>
                                    <span className={`text-2xl font-bold ${isSankranthi ? 'text-red-600' : 'text-blue-400'}`}>1</span>
                                </div>
                                <h4 className={`font-bold mb-2 ${isSankranthi ? 'text-gray-900' : 'text-white'}`}>Confirmation Email</h4>
                                <p className={`text-sm ${isSankranthi ? 'text-gray-600' : 'text-gray-400'}`}>Sent within 5 minutes</p>
                            </div>

                            <div className={`${isSankranthi ? 'bg-white' : 'bg-white/5'} rounded-xl p-6 shadow-md`}>
                                <div className={`w-12 h-12 rounded-full ${isSankranthi ? 'bg-red-100' : 'bg-blue-900/30'} flex items-center justify-center mx-auto mb-3`}>
                                    <span className={`text-2xl font-bold ${isSankranthi ? 'text-red-600' : 'text-blue-400'}`}>2</span>
                                </div>
                                <h4 className={`font-bold mb-2 ${isSankranthi ? 'text-gray-900' : 'text-white'}`}>{isSankranthi ? 'Be Ready' : 'Team Contact'}</h4>
                                <p className={`text-sm ${isSankranthi ? 'text-gray-600' : 'text-gray-400'}`}>{isSankranthi ? 'Arrive fully ready' : 'Within 24 hours'}</p>
                            </div>

                            <div className={`${isSankranthi ? 'bg-white' : 'bg-white/5'} rounded-xl p-6 shadow-md`}>
                                <div className={`w-12 h-12 rounded-full ${isSankranthi ? 'bg-red-100' : 'bg-blue-900/30'} flex items-center justify-center mx-auto mb-3`}>
                                    <span className={`text-2xl font-bold ${isSankranthi ? 'text-red-600' : 'text-blue-400'}`}>3</span>
                                </div>
                                <h4 className={`font-bold mb-2 ${isSankranthi ? 'text-gray-900' : 'text-white'}`}>{isSankranthi ? 'Shoot Day' : 'Final Details'}</h4>
                                <p className={`text-sm ${isSankranthi ? 'text-gray-600' : 'text-gray-400'}`}>{isSankranthi ? 'Enjoy the vibe!' : 'Confirm details'}</p>
                            </div>
                        </div>

                        <p className={`text-sm italic ${isSankranthi ? 'text-gray-500' : 'text-gray-500'}`}>
                            Our professional team will reach out to discuss the final details, confirm pricing, and schedule your shoot.
                        </p>
                    </div>

                    <button onClick={onClose} className="button-primary text-lg px-12 py-4 shadow-xl hover:shadow-2xl transition-all shadow-blue-900/30">
                        Return to Studios
                        <ArrowRight className="button-primary-icon" size={24} />
                    </button>

                    <p className={`text-sm mt-6 ${isSankranthi ? 'text-gray-500' : 'text-gray-500'}`}>
                        Need immediate assistance? Call us at <span className={`font-semibold ${isSankranthi ? 'text-red-600' : 'text-blue-400'}`}>+91 98765 43210</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [session, setSession] = useState(null);
    const [currentView, setCurrentView] = useState('landing');
    const [bookingPackage, setBookingPackage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [services, setServices] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [loadError, setLoadError] = useState(null);

    const getInitialData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [{ data: servicesData, error: servicesError }, { data: addOnsData, error: addOnsError }] = await Promise.all([
                supabase.from('studio_services').select('*').order('id', { ascending: true }),
                supabase.from('studio_addons').select('*').order('id', { ascending: true })
            ]);

            if (servicesError) throw servicesError;
            if (addOnsError) throw addOnsError;

            const mappedServices = (servicesData || []).map(s => ({
                id: s.id,
                name: s.name,
                description: s.description || s.short_description || '',
                thumbnail: s.thumbnail || s.image_url || `https://placehold.co/600x400/94A3B8/FFFFFF?text=${encodeURIComponent(s.name || 'Service')}`,
                category: s.category || 'General',
                is_active: !!s.is_active,
                terms: s.terms || {},
                default_add_ons: s.default_add_ons || {},
                price_min: s.price_min,
                pricing_mode: s.pricing_mode
            }));

            const mappedAddOns = (addOnsData || []).map(a => ({
                key: a.key || a.name?.toLowerCase().replace(/\s+/g, '_') || String(a.id),
                label: a.label || a.name || a.key || 'Add-on',
                description: a.description || '',
                is_active: !!a.is_active
            }));

            setServices((mappedServices || []).filter(Boolean));
            setAddOns((mappedAddOns || []).filter(Boolean));
            setLoadError(null);
        } catch (err) {
            console.error('Error loading data:', err);
            setLoadError(err?.message || String(err));
            setServices([]);
            setAddOns([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

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
                    // Check if we should skip cart
                    if (sessionStorage.getItem('skipCart') === 'true') {
                        setCurrentView('details');
                        sessionStorage.removeItem('skipCart');
                    } else {
                        setCurrentView('cart');
                    }
                    sessionStorage.removeItem('focseraBookingPackage');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [getInitialData]);

    // History Management for SPA Navigation
    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state?.view) {
                setCurrentView(event.state.view);
            } else {
                // If no state (e.g. back to initial load), go to landing
                setCurrentView('landing');
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const updateView = (newView) => {
        setCurrentView(newView);
        window.history.pushState({ view: newView }, '', window.location.pathname);
        window.scrollTo(0, 0);
    };

    const handleBookNow = (service, addOns, skipCart = false) => {
        if (!service.is_active) return;
        const addOnsList = addOns || service.default_add_ons;

        const packageToBook = {
            service: service,
            addOns: addOnsList,
            totalPrice: null,
        };

        sessionStorage.setItem('focseraBookingPackage', JSON.stringify(packageToBook));

        setBookingPackage(packageToBook);

        if (skipCart) {
            updateView('details');
            return;
        }

        updateView('cart');
    };

    const resetToLanding = () => {
        updateView('landing');
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
                return <LoginPage onLogin={() => updateView('cart')} onBack={resetToLanding} />;
            case 'cart':
                return <CartPage bookingPackage={bookingPackage} addOns={addOns} onProceed={() => updateView('details')} onBack={resetToLanding} />;
            case 'details':
                return <DetailsPage bookingPackage={bookingPackage} addOns={addOns} session={session} onConfirm={() => setShowSuccess(true)} onBack={() => updateView('cart')} />;
            case 'landing':
            default:
                return <LandingPage
                    onBookNow={handleBookNow}
                    services={services}
                    addOns={addOns}
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
                    <p className="text-lg font-semibold text-gray-700">Loading Focsera Studios...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap" rel="stylesheet" />
            <style>{`
                :root { --brand-blue: #0052CC; --brand-blue-dark: #0047b3; }
                body { font-family: 'Outfit', sans-serif; }
                h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
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
                .animate-bounce-slow { animation: bounce-slow 3s infinite ease-in-out; }

                @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                .animate-spin-slow { animation: spin-slow 20s linear infinite; }
                .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }

                @keyframes float-slow { 0%, 100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(-30px) rotate(15deg); } }
                @keyframes float-delayed { 0%, 100% { transform: translateY(0) rotate(-12deg); } 50% { transform: translateY(-20px) rotate(-8deg); } }
                .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 1s; }

                .gradient-text { background: linear-gradient(90deg, #0052CC, #007BFF, #33A1FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto; animation: background-pan 5s linear infinite; }

                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                .animate-shimmer { animation: shimmer 2.5s infinite linear; }

                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti { animation: confetti 4s ease-out forwards; }

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
                .button-primary .button-primary-icon { transition: transform 0.3s ease; }
                .button-primary:hover:not(:disabled) .button-primary-icon { transform: translateX(4px); }

                .input-field {
                    background-color: white; border: 1px solid #e2e8f0; border-radius: 0.5rem;
                    padding: 0.75rem 1rem; transition: all 0.2s ease-in-out;
                }
                .input-field:focus {
                    outline: none; border-color: var(--brand-blue);
                    box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.2);
                }
                
                /* Custom Scrollbar */
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #1a0505; }
                ::-webkit-scrollbar-thumb { background: #7c0a02; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #b91c1c; }
            `}</style>

            <div className="bg-gray-50 text-gray-800 font-sans antialiased overflow-x-hidden">
                {['login', 'cart', 'details'].includes(currentView) && <CheckoutHeader currentStep={currentView} />}
                {renderContent()}
                {showSuccess && <SuccessModal onClose={resetToLanding} bookingPackage={bookingPackage} />}
            </div>
        </>
    );
}

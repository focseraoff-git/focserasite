// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import FancyModal from '../../components/FancyModal';
import { supabase } from '../../lib/supabase';

// --- ICONS (using inline SVGs for self-containment) ---
const Calendar = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
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
const PartyPopper = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2l3 7-9 9-7 2 2-7 9-9z"></path><path d="M7 8l-4 4"></path><path d="M16 5l3 3"></path></svg>
);

// NOTE: Mock data has been removed. Services and add-ons are loaded from Supabase.
// If Supabase fetch fails, the UI will show a friendly message and prompt the user to retry.

// Shared Terms & Conditions text and modal
const TERMS_TEXT = `FOCSERA EVENTS — Terms & Conditions

1. Booking and Payments
• A 60% advance payment of the total event cost is required to confirm the booking.
• The remaining balance must be paid on event date, as stated in the invoice.
• Delayed payments may result in service suspension or cancellation and may incur a penalty fee.
• Travelling and transportation charges (for staff, logistics, or materials) are not included in the package cost and will be charged separately based on the event location.

2. Cancellation Policy
• CancellATIONS must be made at least 14 days prior to the scheduled event date.
• Cancellations made after this period will not be eligible for a refund of the advance payment.

3. Services Provided
FOCSERA Events will professionally manage and execute the event, covering the following services as per the package selected:
• Event planning, coordination, and management
• Venue setup and decoration
• Entertainment and activities (if included)
• Catering services (if included)
• Technical arrangements (sound, lighting, and related equipment)
• Any additional services mutually agreed upon in writing
All operations and services will be handled exclusively by FOCSERA EVENTS and its authorized partners.

4. Media Coverage
• All photography and videography for the event will be handled exclusively by FOCSERA Media.
• External photographers or videographers are not permitted unless prior written approval is obtained from FOCSERA.

5. Client Responsibilities
• The Client must provide accurate details of the guest count well in advance.
• All changes to the requirements must be informed at least one week prior to the event date.
• The Client is responsible for obtaining all necessary permissions, venue access, licenses, and security clearances.
• The Client must ensure that no illegal, hazardous, or disruptive activities occur during the event.
• Any misbehaviour or misconduct towards FOCSERA staff will not be tolerated and may result in immediate termination of services.
• The Client shall be liable for any damage caused to the venue, décor, or technical equipment and must compensate accordingly.
• Access to the venue must be provided at least one day prior to the event for setup and coordination.
• Cleaning and post-event maintenance are the responsibility of the client and the venue; FOCSERA will not handle cleanup.

6. Restrictions
• No last-minute changes will be accepted.
• Alcohol, smoking, and restricted substances are strictly prohibited at the event venue.
• Babysitting or childcare services are not provided.
• FOCSERA is not responsible for loss, theft, or misplacement of any personal belongings of guests or clients.

7. Adjustments and Modifications
• Price adjustments may apply depending on changes that affect logistics, manpower, or supplies.
• FOCSERA reserves the right to modify arrangements in case of unforeseen circumstances, with prior notification to the client.

8. Weather and External Factors
• FOCSERA shall not be held liable for delays, cancellations, or disruptions caused by bad weather, natural calamities, or other unavoidable situations.
• FOCSERA is not responsible for delays or disturbances resulting from the client’s side.

9. Acceptance of Terms
By confirming the booking, making payment, or signing the proposal, the Client acknowledges that they have read, understood, and agreed to all the above Terms and Conditions of FOCSERA EVENTS.`;

const TermsModal = ({ onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-[#1a1a1a] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl border border-white/10 animate-scaleIn overflow-hidden z-10">
            <div className="flex-shrink-0 bg-[#1a1a1a]/95 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    Focsera Events — Terms & Conditions
                </h3>
                <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-4 text-gray-300 text-sm">
                {TERMS_TEXT.split('\n').map((line, idx) => (
                    line.trim() === '' ? <div key={idx} className="py-1" /> : <p key={idx}>{line}</p>
                ))}
            </div>
            <div className="flex-shrink-0 bg-[#1a1a1a]/95 backdrop-blur-md p-6 border-t border-white/10 z-10 text-right">
                <button onClick={onClose} className="button-primary px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all">I Understand</button>
            </div>
        </div>
    </div>
);

// --- UTILITY HOOK ---
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
const PackageCard = ({ service, onBook, index, addOnsScrollRef, onOpenTerms }) => {
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
                    addOnsScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => onBook(), 500);
                }} disabled={!service.is_active} className="relative mt-4 w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed group/btn shadow-lg shadow-blue-900/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-2">
                        {service.is_active ? 'Book This Package' : 'Unavailable'}
                        {service.is_active && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                    </span>
                </button>
                <div className="mt-3 text-center">
                    <button onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-500 hover:text-white underline transition-colors">View Terms &amp; Conditions</button>
                </div>
            </div>
        </div>
    );
};

const LandingPage = ({ onBookNow, services, addOns, loadError, onRetry, onOpenTerms }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [showFancyModal, setShowFancyModal] = useState(false);
    const [fancyModalContent, setFancyModalContent] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState({});
    const [addonQuantities, setAddonQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const customizerScrollRef = useRef<HTMLDivElement | null>(null);
    const addOnsScrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (services.length > 0 && !selectedService) {
            const firstActive = services.find(s => s.is_active);
            if (firstActive) {
                setSelectedService(firstActive);
                setSelectedAddOns(firstActive.default_add_ons || {});
            }
        }
    }, [services, selectedService]);

    useEffect(() => {
        if (!selectedService) return;
        let newTotal = selectedService.price_min;
        Object.keys(selectedAddOns).forEach(key => {
            if (selectedAddOns[key]) {
                const addOn = addOns.find(a => a.key === key);
                if (addOn) {
                    const quantity = addonQuantities[key] || 1;
                    newTotal += addOn.price_min * quantity;
                }
            }
        });
        setTotalPrice(newTotal);
    }, [selectedService, selectedAddOns, addonQuantities, addOns]);

    useEffect(() => {
        const animation = requestAnimationFrame(() => {
            const difference = totalPrice - displayPrice;
            if (Math.abs(difference) < 1) setDisplayPrice(totalPrice);
            else setDisplayPrice(displayPrice + difference * 0.1);
        });
        return () => cancelAnimationFrame(animation);
    }, [totalPrice, displayPrice]);

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

        // Build payload that matches the `quotes` table columns: name, email, phone, event_date, details.
        // Append contextual info (service/add-ons/location/end date/estimated total) into the details string
        // so we don't send unknown columns to Supabase.
        let contextualNotes = '';
        if (selectedService) {
            contextualNotes += `\n\nService: ${selectedService.name} (id: ${selectedService.id}, min: ${selectedService.price_min})`;
        }
        const selectedAddOnKeys = Object.entries(selectedAddOns || {}).filter(([_, v]) => v).map(([k]) => k);
        if (selectedAddOnKeys.length) {
            contextualNotes += `\nAdd-ons: ${selectedAddOnKeys.join(', ')}`;
        }
        if (quoteData.location) contextualNotes += `\nLocation: ${quoteData.location}`;
        if (quoteData.event_end_date) contextualNotes += `\nEnd Date: ${quoteData.event_end_date}`;
        if (totalPrice) contextualNotes += `\nEstimated Total: ${totalPrice}`;

        const combinedDetails = details + contextualNotes;

        const payload = {
            name: name,
            email: email,
            phone: quoteData.phone || null,
            event_date: quoteData.event_date || null,
            details: combinedDetails,
        };

        try {
            const { error } = await supabase.from('event_quotes').insert([payload]);
            if (error) {
                console.error('Error inserting quote:', error);
                alert('There was an error submitting your quote request: ' + (error.message || String(error)));
                return;
            }

            // Show grand modal instead of alert
            setFancyModalContent({
                title: 'Inquiry Received',
                subtitle: 'Thank you — our team will reach out shortly.',
                details: (
                    <>
                        <p className="mb-2">We have received your project details and will review them shortly.</p>
                        <p className="text-sm text-gray-600">If you provided a date, our team will check availability and contact you within 24 hours.</p>
                    </>
                )
            });
            setShowFancyModal(true);
            e.target.reset();
        } catch (err) {
            console.error('Unexpected error submitting quote:', err);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    const handleCustomBooking = () => {
        if (!selectedService) return;
        const customPackage = {
            service: selectedService,
            addOns: selectedAddOns,
            totalPrice: totalPrice,
        };
        // Scroll to the add-ons section first so users can review/adjust add-ons
        // then trigger the booking flow shortly after the scroll animation.
        try {
            addOnsScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {
            // Ignore if ref isn't available
        }
        setTimeout(() => {
            onBookNow(customPackage.service, customPackage.addOns, customPackage.totalPrice);
        }, 500);
    };

    if (!services || services.length === 0 || !selectedService) {
        if (loadError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center text-lg font-semibold text-gray-400 bg-black gap-4">
                    <div>Failed to load events catalog: {String(loadError)}</div>
                    <div className="flex gap-3">
                        <button onClick={() => { if (onRetry) onRetry(); else window.location.reload(); }} className="px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
                        <a href="/contact" className="px-4 py-2 border border-white/20 rounded text-gray-300">Contact Support</a>
                    </div>
                </div>
            );
        }

        return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-400 bg-black">Loading Focsera Events...</div>
    }

    return (
        <>
            <section className="relative py-32 bg-[#020202] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020202] to-[#020202]"></div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <div className="w-32 h-32 bg-white/5 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)] border-4 border-white/10 p-4 animate-bounce-slow">
                        <img src="/images/logos/FocseraEvents.jpg" alt="Focsera Events" className="w-full h-full object-contain rounded-2xl" />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 drop-shadow-sm tracking-tight font-sans">Focsera Events</h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4 font-light tracking-wide font-sans italic">
                        Expert Event Planning & Management
                    </p>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-sans leading-relaxed">
                        We craft your next unforgettable event. From private parties to large corporate functions, we handle every detail to create a seamless and beautiful celebration.
                    </p>
                    {/* PromptX promo banner inserted here */}
                    <div className="mt-8 flex items-center justify-center">
                        <a href="/promptx" className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-semibold shadow-lg hover:scale-105 transition-all hover:bg-blue-600/30">
                            <PartyPopper className="text-blue-400" />
                            <span>PromptX Workshop — Register Now</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[#050505] border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 font-sans">Private & Social Events</h3>
                            <p className="text-gray-400 text-lg">Unforgettable celebrations for life's milestones, from birthdays to weddings.</p>
                        </div>
                        <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 font-sans">Corporate & Campus</h3>
                            <p className="text-gray-400 text-lg">Seamless and engaging events for businesses, schools, and universities.</p>
                        </div>
                    </div>
                    <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                        <p className="text-lg text-gray-300 font-medium max-w-3xl mx-auto">
                            <span className="font-bold text-blue-400">Note:</span> Focsera Events specializes in event planning and management.
                            For photography and videography, please visit <span className="font-bold text-white">Focsera Studios</span>.
                        </p>
                    </div>
                </div>
            </section>

            <section ref={packagesRef} className="py-24 bg-[#0a0a0a] border-t border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] invert"></div>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 font-sans tracking-tight">Our Signature Packages</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <PackageCard
                                key={service.id}
                                service={service}
                                index={index}
                                addOnsScrollRef={addOnsScrollRef}
                                onBook={() => {
                                    if (service.is_active) {
                                        setSelectedService(service);
                                        setSelectedAddOns(service.default_add_ons || {});
                                        setTimeout(() => {
                                            addOnsScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }, 100);
                                    }
                                }}
                                onOpenTerms={onOpenTerms}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section ref={customizerScrollRef} className="py-24 bg-[#050505] scroll-mt-24 relative border-t border-white/5">
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
                                    {services.map(service => (
                                        <button key={service.id} onClick={() => {
                                            if (service.is_active) {
                                                setSelectedService(service);
                                                setSelectedAddOns(service.default_add_ons || {});
                                                setTimeout(() => {
                                                    addOnsScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                }, 100);
                                            }
                                        }} disabled={!service.is_active} className={`group/service relative p-5 border-2 rounded-2xl text-left transition-all duration-300 transform overflow-hidden ${selectedService.id === service.id ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/50 border-transparent scale-105' : 'bg-black/40 border-white/10 hover:border-blue-500/50 hover:bg-white/5'} ${service.is_active ? 'hover:-translate-y-1 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
                                            {selectedService.id === service.id && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                                            )}
                                            <span className={`relative font-bold block text-sm md:text-base ${selectedService.id === service.id ? 'text-white' : 'text-gray-200'}`}>{service.name}</span>
                                            <span className={`relative text-xs md:text-sm font-medium ${selectedService.id === service.id ? 'text-white/90' : 'text-gray-500'}`}>Get your custom quote</span>
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
                                                        <span className="text-sm font-bold text-gray-300">Get custom quote</span>
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
                                        <p className="font-semibold text-gray-300">{selectedService.name}</p>
                                        <p className="text-gray-400 font-medium">Get your custom quote</p>
                                    </div>
                                    {Object.entries(selectedAddOns).filter(([_, value]) => value).map(([key]) => {
                                        const addOn = addOns.find(a => a.key === key);
                                        const quantity = addonQuantities[key] || 1;
                                        return addOn ? (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <p className="text-gray-400">{addOn.label}{quantity > 1 ? ` (x${quantity})` : ''}</p>
                                                <p className="text-gray-500 font-medium">+ Get custom quote</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                                <button onClick={handleCustomBooking} className="button-primary w-full shadow-lg shadow-blue-900/30">
                                    Book This Package
                                    <ArrowRight className="button-primary-icon" />
                                </button>
                                <div className="mt-3 text-center">
                                    <button onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-500 hover:text-white underline transition-colors">View Terms &amp; Conditions</button>
                                </div>
                                <p className="text-xs text-gray-500 mt-4 text-center">Final price will be confirmed after consultation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={quoteSectionRef} id="get-quote" className={`py-24 bg-[#0a0a0a] border-t border-white/5 transition-all duration-1000 ${quoteIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 font-sans tracking-tight">Need a Custom Event Plan?</h2>
                        <p className="text-xl text-gray-400">Tell us about your event, and we will create a tailored proposal for you.</p>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl">
                        <form onSubmit={handleQuoteSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-3.5 text-gray-500" size={20} />
                                        <input type="text" id="name" name="name" required className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600 transition-all" placeholder="Your Name" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-3.5 text-gray-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        <input type="email" id="email" name="email" required className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600 transition-all" placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                                    <div className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-3.5 text-gray-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        <input type="tel" id="phone" name="phone" className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600 transition-all" placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="event_date" className="block text-sm font-medium text-gray-300">Event Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-3.5 text-gray-500" size={20} />
                                        <input type="date" id="event_date" name="event_date" className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600 transition-all scheme-dark" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="details" className="block text-sm font-medium text-gray-300">Event Details</label>
                                <textarea id="details" name="details" rows={4} required className="w-full p-4 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-600 transition-all" placeholder="Tell us about the occasion, estimated guest count, and any specific themes or requirements..."></textarea>
                            </div>
                            <button type="submit" className="button-primary w-full shadow-lg shadow-blue-900/30">
                                Submit Inquiry
                                <ArrowRight className="button-primary-icon" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className="bg-[#020202] border-t border-white/5 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">F</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Focsera Events</span>
                    </div>
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Focsera Events. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default function Events() {
    const [services, setServices] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTerms, setShowTerms] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: servicesData, error: servicesError } = await supabase
                .from('event_services')
                .select('*')
                .order('id');

            if (servicesError) throw servicesError;

            const { data: addOnsData, error: addOnsError } = await supabase
                .from('event_addons')
                .select('*')
                .order('id');

            if (addOnsError) throw addOnsError;

            setServices(servicesData);
            setAddOns(addOnsData);
        } catch (err) {
            console.error('Error loading events data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-blue-500/30">
            {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
            <LandingPage
                onBookNow={() => { }}
                services={services}
                addOns={addOns}
                loadError={error}
                onRetry={loadData}
                onOpenTerms={() => setShowTerms(true)}
            />
        </div>
    );
}

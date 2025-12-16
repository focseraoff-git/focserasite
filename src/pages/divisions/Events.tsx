// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import FancyModal from '../../components/FancyModal';
import { supabase } from '../../lib/supabase';

// --- ICONS (using inline SVGs for self-containment) ---
const Calendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const ArrowRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const Check = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 border-2 border-[#0052CC]">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">Focsera Events — Terms & Conditions</h3>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-900 font-bold">Close</button>
            </div>
            <div className="text-sm text-gray-700 space-y-3">
                {TERMS_TEXT.split('\n').map((line, idx) => (
                    line.trim() === '' ? <div key={idx} className="py-1" /> : <p key={idx}>{line}</p>
                ))}
            </div>
            <div className="mt-6 text-right">
                <button onClick={onClose} className="button-primary px-6 py-2">I Understand</button>
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
            className={`group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl overflow-hidden shadow-xl flex flex-col transition-all duration-500 ease-out ${!service.is_active ? 'grayscale opacity-70' : 'hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {!service.is_active && (
                <div className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
                    Currently Unavailable
                </div>
            )}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src={service.thumbnail} alt={service.name} className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-xs font-bold text-gray-900 rounded-full shadow-lg">{service.category}</span>
                </div>
            </div>
            <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-white/80 to-white backdrop-blur-lg">
                <h3 className="text-3xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">{service.name}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed flex-grow text-sm">{service.description}</p>
                <div className="mb-6 relative">
                    <div className="inline-block">
                        <span className="text-2xl font-extrabold text-[#0052CC]">Get your custom quote</span>
                    </div>
                    <span className="block text-sm text-gray-500 font-medium mt-1">Contact us to discuss scope & pricing</span>
                </div>

                <div className="border-t border-gray-200 mt-auto pt-4 space-y-4">
                    <button onClick={() => setIsTermsVisible(!isTermsVisible)} className="flex justify-between items-center w-full text-sm font-semibold text-gray-600 hover:text-gray-900">
                        <span>Terms & Details</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTermsVisible ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTermsVisible ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="text-xs text-gray-500 space-y-3 pt-2">
                            <div>
                                <h4 className="font-bold text-gray-700">Client Terms</h4>
                                <p>{service.terms.clientSupport}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-700">Studio Terms</h4>
                                <p>{service.terms.studioSupport}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => {
                    addOnsScrollRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => onBook(), 500);
                }} disabled={!service.is_active} className="relative mt-4 w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed group/btn">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-2">
                        {service.is_active ? 'Book This Package' : 'Unavailable'}
                        {service.is_active && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                    </span>
                </button>
                <div className="mt-3 text-center">
                    <button onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-600 hover:text-gray-900 underline">View Terms &amp; Conditions</button>
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
            if(firstActive) {
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
                <div className="min-h-screen flex flex-col items-center justify-center text-lg font-semibold text-gray-600 gap-4">
                    <div>Failed to load events catalog: {String(loadError)}</div>
                    <div className="flex gap-3">
                        <button onClick={() => { if (onRetry) onRetry(); else window.location.reload(); }} className="px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
                        <a href="/contact" className="px-4 py-2 border rounded">Contact Support</a>
                    </div>
                </div>
            );
        }

        return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Loading Focsera Events...</div>
    }

    return (
        <>
            <section className="relative py-32 bg-gradient-to-br from-[#0052CC] to-[#0066FF] overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZHRoPSI1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]"></div>
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-2xl animate-[float_12s_ease-in-out_infinite]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl overflow-hidden">
                        <img src="/images/logos/FocseraEvents.jpg" alt="Focsera Events" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">Focsera Events</h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
                        Expert Event Planning & Management
                    </p>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                       We craft your next unforgettable event. From private parties to large corporate functions, we handle every detail to create a seamless and beautiful celebration.
                    </p>
                    {/* PromptX promo banner inserted here */}
                    <div className="mt-8 flex items-center justify-center">
                        <a href="/promptx" className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 text-[#0052CC] font-semibold shadow-lg hover:scale-105 transition-transform">
                            <PartyPopper className="text-[#0052CC]" />
                            <span>PromptX Workshop — Register Now</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="text-center p-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052CC]"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Private & Social Events</h3>
                            <p className="text-gray-600 text-lg">Unforgettable celebrations for life's milestones, from birthdays to weddings.</p>
                        </div>
                        <div className="text-center p-8">
                           <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0052CC]"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Corporate & Campus</h3>
                            <p className="text-gray-600 text-lg">Seamless and engaging events for businesses, schools, and universities.</p>
                        </div>
                    </div>
                    <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
                        <p className="text-lg text-gray-700 font-medium max-w-3xl mx-auto">
                            <span className="font-bold text-[#0052CC]">Note:</span> Focsera Events specializes in event planning and management.
                            For photography and videography, please visit <span className="font-bold">Focsera Studios</span>.
                        </p>
                    </div>
                </div>
            </section>

            <section ref={packagesRef} className="py-24 bg-white">
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Our Signature Packages</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {services.map((service, index) => (
                               <PackageCard
                                   key={service.id}
                                   service={service}
                                   index={index}
                                   addOnsScrollRef={addOnsScrollRef}
                                   onBook={() => {
                                       // Instead of immediately triggering the booking flow (which redirects to login/cart),
                                       // select this service in the customizer and scroll to the add-ons section so the user
                                       // can review/adjust add-ons before proceeding.
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

             <section ref={customizerScrollRef} className="py-24 bg-gray-50 scroll-mt-24">
                     <div ref={customizerSectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                         <div className="text-center mb-16">
                             <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Build Your Own Package</h2>
                             <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
                         </div>
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                             <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-2xl space-y-8">
                                 <div>
                                     <h3 className="text-xl font-bold mb-4">1. Select Your Base Service</h3>
                                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                         {services.map(service => (
                                             <button key={service.id} onClick={() => {
                                                 if(service.is_active) {
                                                     setSelectedService(service);
                                                     setSelectedAddOns(service.default_add_ons || {});
                                                     setTimeout(() => {
                                                         addOnsScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                     }, 100);
                                                 }
                                             }} disabled={!service.is_active} className={`group/service relative p-5 border-2 rounded-2xl text-left transition-all duration-300 transform overflow-hidden ${selectedService.id === service.id ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl border-transparent scale-105' : 'bg-white/80 backdrop-blur-sm border-gray-200'} ${service.is_active ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
                                                 {selectedService.id === service.id && (
                                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
                                                 )}
                                                 <span className="relative font-bold block text-sm md:text-base">{service.name}</span>
                                                 <span className={`relative text-xs md:text-sm font-medium ${selectedService.id === service.id ? 'text-white/90' : 'text-gray-600'}`}>Get your custom quote</span>
                                             </button>
                                         ))}
                                     </div>
                                 </div>
                                 <div ref={addOnsScrollRef}>
                                     <h3 className="text-xl font-bold mb-4">2. Choose Add-ons</h3>
                                     <div className="space-y-4">
                                         {addOns.map((addOn) => {
                                             const isQuantityBased = ['extra_photographer', 'extra_videographer', 'extended_coverage'].includes(addOn.key);
                                             const isSelected = selectedAddOns[addOn.key];
                                             const quantity = addonQuantities[addOn.key] || 1;

                                             return (
                                                 <div key={addOn.key} className={`p-4 border-2 rounded-xl transition-all duration-300 ${isSelected ? 'bg-blue-50 border-[#0052CC] shadow-md' : 'bg-gray-50 border-gray-200'}`}>
                                                     <div className="flex items-start justify-between gap-4">
                                                         <div className="flex-1">
                                                             <div className="flex items-center gap-3 mb-2">
                                                                 <button
                                                                     onClick={() => handleAddOnToggle(addOn.key)}
                                                                     className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#0052CC] border-[#0052CC]' : 'border-gray-300 hover:border-gray-400'}`}
                                                                 >
                                                                     {isSelected && <Check className="text-white" size={16} />}
                                                                 </button>
                                                                 <span className="font-semibold text-gray-900">{addOn.label}</span>
                                                             </div>
                                                             {addOn.description && (
                                                                 <p className="text-xs text-gray-600 ml-9">{addOn.description}</p>
                                                             )}
                                                         </div>
                                                         <div className="flex flex-col items-end gap-2">
                                                             <span className="text-sm font-semibold text-gray-900">Get custom quote</span>
                                                             {isSelected && isQuantityBased && (
                                                                 <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 px-2 py-1">
                                                                     <button
                                                                         onClick={() => handleQuantityChange(addOn.key, -1)}
                                                                         className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-all"
                                                                     >
                                                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                                     </button>
                                                                     <span className="text-sm font-semibold w-8 text-center">{quantity}</span>
                                                                     <button
                                                                         onClick={() => handleQuantityChange(addOn.key, 1)}
                                                                         className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#0052CC] hover:bg-blue-50 rounded transition-all"
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
                                  <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#0052CC] shadow-2xl">
                                     <h3 className="text-2xl font-bold mb-6 text-center">Your Custom Package</h3>
                                     <div className="space-y-3 mb-6 border-b border-blue-200 pb-4">
                                         <div className="flex justify-between items-center">
                                             <p className="font-semibold text-gray-700">{selectedService.name}</p>
                                             <p className="text-gray-600 font-medium">Get your custom quote</p>
                                         </div>
                                         {Object.entries(selectedAddOns).filter(([_, value]) => value).map(([key]) => {
                                             const addOn = addOns.find(a => a.key === key);
                                             const quantity = addonQuantities[key] || 1;
                                             return addOn ? (
                                                 <div key={key} className="flex justify-between items-center text-sm">
                                                     <p className="text-gray-600">{addOn.label}{quantity > 1 ? ` (x${quantity})` : ''}</p>
                                                     <p className="text-gray-500 font-medium">+ Get custom quote</p>
                                                 </div>
                                             ) : null;
                                         })}
                                     </div>
                                     <button onClick={handleCustomBooking} className="button-primary w-full">
                                         Book This Package
                                         <ArrowRight className="button-primary-icon" />
                                     </button>
                                    <div className="mt-3 text-center">
                                        <button onClick={() => onOpenTerms && onOpenTerms()} className="text-xs text-gray-600 hover:text-gray-900 underline">View Terms &amp; Conditions</button>
                                    </div>
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
                            If you didn't find the perfect package, tell us about your event, and we'll create a custom quote just for you.
                        </p>
                        <form onSubmit={handleQuoteSubmit} className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-2xl text-left max-w-3xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label><input type="text" id="name" name="name" className="w-full input-field" placeholder="John Doe" required /></div>
                                <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" id="email" name="email" className="w-full input-field" placeholder="you@example.com" required /></div>
                                <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full input-field" placeholder="+91 12345 67890" /></div>
                                <div><label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location / Venue</label><input type="text" id="location" name="location" className="w-full input-field" placeholder="City or Venue Name" /></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div>
                                    <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-2">Event Start Date</label>
                                    <input type="date" id="event_date" name="event_date" className="w-full input-field" />
                                </div>
                                <div>
                                    <label htmlFor="event_end_date" className="block text-sm font-medium text-gray-700 mb-2">Event End Date <span className="text-gray-400">(Optional)</span></label>
                                    <input type="date" id="event_end_date" name="event_end_date" className="w-full input-field" />
                                </div>
                            </div>
                            <div><label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project</label><textarea id="details" name="details" rows="5" className="w-full input-field" placeholder="Please include as many details as possible: type of event, number of guests, specific requirements, etc." required></textarea></div>
                            <button type="submit" className="button-primary w-full">Get a Custom Quote <ArrowRight className="button-primary-icon" /></button>
                        </form>
                    </div>
                </section>

                <footer className="bg-gray-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300"><Calendar className="text-white" size={32} /></div>
                        <p className="font-bold text-2xl mb-2">Focsera Events</p>
                        <p className="text-gray-400">Crafting Unforgettable Moments.</p>
                        <div className="flex justify-center gap-6 my-8">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
                        </div>
                        <p className="text-sm text-gray-500 mt-8">© {new Date().getFullYear()} Focsera Events. All Rights Reserved.</p>
                    </div>
                </footer>
        </>
    );
};

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
                         <Calendar className="text-blue-600" />
                         Focsera Events
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
    }
    
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
                        <p className="text-slate-600">{isLoginView ? 'Sign in to continue your booking' : 'Join Focsera Events today'}</p>
                    </div>

                    <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
                        <button
                            onClick={() => setIsLoginView(true)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${ isLoginView ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200' }`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => setIsLoginView(false)}
                            className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${ !isLoginView ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200' }`}
                        >
                            Sign Up
                        </button>
                    </div>
                    
                    {error && (
                        <div className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 ${
                            messageType === 'error'
                                ? 'bg-red-50 border border-red-200 text-red-700'
                                : 'bg-blue-50 border border-blue-200 text-blue-700'
                        }`}>
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
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        className="relative w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                           </div>
                       )}
                       <div className="group">
                           <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">Email Address</label>
                           <div className="relative">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                               <input
                                   type="email"
                                   value={email}
                                   onChange={e => setEmail(e.target.value)}
                                   className="relative w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                   placeholder="you@example.com"
                                   required
                               />
                           </div>
                       </div>
                       <div className="group">
                           <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">Password</label>
                           <div className="relative">
                               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                               <input
                                   type={showPassword ? 'text' : 'password'}
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   className="relative w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                   placeholder="••••••••"
                                   required
                                   minLength={6}
                               />
                               <button
                                   type="button"
                                   onClick={() => setShowPassword(!showPassword)}
                                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10 transition-colors"
                               >
                                   {showPassword ? (
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                   ) : (
                                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
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

                    <button
                        onClick={onLogin}
                        className="w-full py-3.5 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ bookingPackage, onProceed, onBack, addOns }) => (
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
                            <img src={bookingPackage.service.thumbnail} alt={bookingPackage.service.name} className="w-full h-full object-cover"/>
                        </div>
                        <div className="p-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{bookingPackage.service.name}</h2>
                            <p className="text-gray-600 leading-relaxed">{bookingPackage.service.description}</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[#0052CC] sticky top-28">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="font-semibold text-gray-700">Base Package</span>
                                <span className="font-bold text-gray-900">Get custom quote</span>
                            </div>
                            {Object.entries(bookingPackage.addOns).filter(([_,v]) => v).map(([key]) => {
                                const addOn = addOns.find(a => a.key === key);
                                return addOn ? (
                                    <div key={key} className="flex justify-between items-center">
                                        <span className="text-gray-600">{addOn.label}</span>
                                        <span className="text-gray-700 font-medium">+ Get custom quote</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="pt-6 border-t-2 border-gray-200 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-3xl font-bold text-[#0052CC]">Get your custom quote</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">*Final price will be confirmed after consultation</p>
                        </div>
                        <button onClick={onProceed} className="button-primary w-full mb-3">
                            Proceed to Checkout
                            <ArrowRight className="button-primary-icon" />
                        </button>
                        <button onClick={onBack} className="w-full py-3 text-center font-semibold text-gray-600 hover:text-gray-900 transition-colors">
                            &larr; Back to Packages
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const DetailsPage = ({ bookingPackage, onConfirm, onBack, addOns }) => {

    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const clientDetails = Object.fromEntries(formData.entries());
        console.log("Booking confirmed with details:", clientDetails);
        // Attempt to persist booking to Supabase
        try {
            const { data: { session: currentSession } } = await supabase.auth.getSession();

            // Build the booking payload using the actual DB schema for `event_bookings`
            // Columns: user_id, service_id, total_price, event_date, event_venue, client_details (jsonb), package_details (jsonb)
            const bookingPayload = {
                user_id: currentSession?.user?.id || null,
                service_id: bookingPackage?.service?.id || null,
                total_price: bookingPackage?.totalPrice || bookingPackage?.service?.price_min || 0,
                event_date: clientDetails.event_date || null,
                event_venue: clientDetails.event_venue || clientDetails.location || null,
                client_details: {
                    contact_name: clientDetails.name || clientDetails.full_name || null,
                    contact_email: clientDetails.email || null,
                    contact_phone: clientDetails.phone || null,
                    event_end_date: clientDetails.event_end_date || null,
                    details: clientDetails.details || null,
                    location: clientDetails.location || null
                },
                package_details: {
                    service: {
                        id: bookingPackage?.service?.id,
                        name: bookingPackage?.service?.name,
                        price_min: bookingPackage?.service?.price_min
                    },
                    add_ons: bookingPackage?.addOns || {},
                    total_price: bookingPackage?.totalPrice || bookingPackage?.service?.price_min || 0
                }
            };

            if (!currentSession) {
                // Not signed in — save and ask user to sign in (existing behavior)
                sessionStorage.setItem('focseraEventsBookingPackage', JSON.stringify(bookingPackage));
                alert('Please sign in to complete your booking. We saved your selection.');
                onBack();
                return;
            }

            const { data, error } = await supabase.from('event_bookings').insert([bookingPayload]).select('*').single();

            if (error) {
                console.error('Failed to create booking:', error);
                // PostgREST sometimes reports schema cache issues in error.message
                alert('Failed to submit booking — please try again later.\n' + (error.message || String(error)));
                return;
            }

            console.log('Booking created:', data);
            alert('Booking request sent successfully!');
            onConfirm();
        } catch (err) {
            console.error('Booking error:', err);
            alert('An unexpected error occurred while creating booking. Please try again.');
        }
    };

    return (
     <div className="min-h-screen bg-gray-50 p-4 sm:p-8 pt-40">
        <div className="max-w-6xl mx-auto animate-fadeInUp">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
                <p className="text-gray-600">Enter your event details to finalize your booking</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <form onSubmit={handleConfirmBooking} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-2">Full Name</label>
                                    <input name="name" type="text" className="w-full input-field" placeholder="John Doe" required />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-2">Email Address</label>
                                    <input name="email" type="email" className="w-full input-field" placeholder="you@example.com" required />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-2">Phone Number</label>
                                    <input name="phone" type="tel" className="w-full input-field" placeholder="+91 98765 43210" required />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-bold mb-6">Event Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-2">Event Date(s)</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-600 block mb-1">Start Date</label>
                                            <input name="event_date" type="date" className="w-full input-field" required/>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-600 block mb-1">End Date (Optional)</label>
                                            <input name="event_end_date" type="date" className="w-full input-field"/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 block mb-2">Event Venue / Location</label>
                                    <textarea name="event_venue" rows="3" className="w-full input-field" placeholder="Enter the full address of your event venue" required></textarea>
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
                    <div className="bg-white rounded-3xl shadow-lg p-8 border-2 border-[#0052CC] sticky top-28">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                <span className="font-semibold text-gray-700">{bookingPackage.service.name}</span>
                                <span className="font-bold text-gray-900">Get custom quote</span>
                            </div>
                             {Object.entries(bookingPackage.addOns).filter(([_,v]) => v).map(([key]) => {
                                 const addOn = addOns.find(a => a.key === key);
                                 return addOn ? (
                                     <div key={key} className="flex justify-between items-center">
                                         <span className="text-gray-600">{addOn.label}</span>
                                         <span className="text-gray-700 font-medium">+ Get custom quote</span>
                                     </div>
                                 ) : null;
                             })}
                        </div>
                        <div className="pt-6 border-t-2 border-gray-200">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-3xl font-bold text-[#0052CC]">Get your custom quote</span>
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
                            Thank you for choosing <span className="font-bold text-[#0052CC]">Focsera Events</span>!
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Your booking request has been successfully received and our team is already reviewing the details.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                             <div className="bg-white rounded-xl p-6 shadow-md">
                                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3"><span className="text-2xl font-bold text-[#0052CC]">1</span></div>
                                 <h4 className="font-bold text-gray-900 mb-2">Confirmation Email</h4>
                                 <p className="text-sm text-gray-600">Sent within 5 minutes</p>
                             </div>
                             <div className="bg-white rounded-xl p-6 shadow-md">
                                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3"><span className="text-2xl font-bold text-[#0052CC]">2</span></div>
                                 <h4 className="font-bold text-gray-900 mb-2">Team Contact</h4>
                                 <p className="text-sm text-gray-600">Within 24 hours</p>
                             </div>
                             <div className="bg-white rounded-xl p-6 shadow-md">
                                 <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3"><span className="text-2xl font-bold text-[#0052CC]">3</span></div>
                                 <h4 className="font-bold text-gray-900 mb-2">Final Details</h4>
                                 <p className="text-sm text-gray-600">Pricing & schedule</p>
                             </div>
                        </div>

                        <p className="text-sm text-gray-500 italic">
                            Our professional team will reach out to discuss the final details, confirm pricing, and plan your event.
                        </p>
                    </div>

                    <button onClick={onClose} className="button-primary text-lg px-12 py-4 shadow-xl hover:shadow-2xl transition-all">
                        Return Home
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
    const [showTerms, setShowTerms] = useState(false);

    const [services, setServices] = useState([]);
    const [addOns, setAddOns] = useState([]);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        // Load real data from Supabase on initial render (fall back to mocks on error)
        const loadData = async () => {
            try {
                const [{ data: servicesData, error: servicesError }, { data: addOnsData, error: addOnsError }] = await Promise.all([
                    supabase.from('event_services').select('*').order('id', { ascending: true }),
                    supabase.from('event_add_ons').select('*').order('id', { ascending: true })
                ]);

                if (servicesError) throw servicesError;
                if (addOnsError) throw addOnsError;

                // Map database rows to the UI-friendly shape used in this file
                const mappedServices = (servicesData || []).map(s => ({
                    id: s.id,
                    name: s.name,
                    description: s.description || s.short_description || '',
                    thumbnail: s.thumbnail || s.image_url || `https://placehold.co/600x400/94A3B8/FFFFFF?text=${encodeURIComponent(s.name || 'Service')}`,
                    category: s.category || 'General',
                    price_min: Number(s.price_min || s.price || 0),
                    pricing_mode: s.pricing_mode || 'per event',
                    is_active: !!s.is_active,
                    terms: s.terms || {},
                    default_add_ons: s.default_add_ons || {}
                }));

                const mappedAddOns = (addOnsData || []).map(a => ({
                    key: a.key || a.name?.toLowerCase().replace(/\s+/g, '_') || String(a.id),
                    label: a.label || a.name || a.key || 'Add-on',
                    description: a.description || '',
                    price_min: Number(a.price_min || a.price || 0),
                    is_active: !!a.is_active
                }));

                setServices(mappedServices);
                setAddOns(mappedAddOns);
                setLoadError(null);
            } catch (err) {
                // Surface load error so the UI can prompt the user to retry
                console.error('Failed to load services/add-ons from Supabase:', err);
                setLoadError(err?.message || String(err));
                setServices([]);
                setAddOns([]);
            }
        };

        loadData();

        // Check for saved booking package and restore if user signs in
        const restoreSavedPackage = async () => {
            const savedPackageJson = sessionStorage.getItem('focseraEventsBookingPackage');
            if (savedPackageJson) {
                const savedPackage = JSON.parse(savedPackageJson);
                const { data: { session: restoredSession } } = await supabase.auth.getSession();
                if (restoredSession) {
                    setBookingPackage(savedPackage);
                    setCurrentView('cart');
                    sessionStorage.removeItem('focseraEventsBookingPackage');
                }
            }
        };

        restoreSavedPackage();

        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);

            if (_event === "SIGNED_IN") {
                const savedPackageJson = sessionStorage.getItem('focseraEventsBookingPackage');
                if (savedPackageJson) {
                    const savedPackage = JSON.parse(savedPackageJson);
                    setBookingPackage(savedPackage);
                    setCurrentView('cart');
                    sessionStorage.removeItem('focseraEventsBookingPackage');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleBookNow = (service, addOnsData, price) => {
        if (!service.is_active) return;
        const addOnsList = addOnsData || service.default_add_ons;
        let finalPrice = price;

        if (!finalPrice) {
            const addOnsTotal = Object.entries(addOnsList || {}).reduce((acc, [key, value]) => {
                if (value) {
                    const addOn = addOns.find(a => a.key === key);
                    return acc + (addOn ? addOn.price_min : 0);
                }
                return acc;
            }, 0);
            finalPrice = service.price_min + addOnsTotal;
        }

        const packageToBook = {
            service: service,
            addOns: addOnsList,
            totalPrice: finalPrice,
        };

        sessionStorage.setItem('focseraEventsBookingPackage', JSON.stringify(packageToBook));

        setBookingPackage(packageToBook);

        // Check if user is already logged in
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
        sessionStorage.removeItem('focseraEventsBookingPackage');
    };

    const renderContent = () => {
        if (!bookingPackage && (currentView === 'cart' || currentView === 'details')) {
             return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Please select a package first. <button onClick={resetToLanding} className="ml-2 text-blue-600 font-bold">Go Back</button></div>
        }

        switch (currentView) {
            case 'login':
                return <LoginPage onLogin={() => setCurrentView('cart')} onBack={resetToLanding} />;
            case 'cart':
                return <CartPage bookingPackage={bookingPackage} addOns={addOns} onProceed={() => setCurrentView('details')} onBack={() => setCurrentView('login')} />;
            case 'details':
                return <DetailsPage bookingPackage={bookingPackage} addOns={addOns} session={session} onConfirm={() => setShowSuccess(true)} onBack={() => setCurrentView('cart')} />;
            case 'landing':
            default:
                return <LandingPage
                    onBookNow={handleBookNow}
                    services={services}
                    addOns={addOns}
                    loadError={loadError}
                    onRetry={() => { setLoadError(null); window.location.reload(); }}
                    onOpenTerms={() => setShowTerms(true)}
                />;
        }
    };

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

                @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }

                @keyframes slideDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-slideDown { animation: slideDown 0.6s ease-out forwards; animation-delay: 0.2s; opacity: 0; }

                @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
                
                @keyframes shimmer { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }
                .animate-shimmer { animation: shimmer 2.5s infinite linear; }

                @keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
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
                {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
            </div>
        </>
    );
}


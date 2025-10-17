import React, { useState, useEffect, useRef } from 'react';

// --- ICONS (using inline SVGs for self-containment) ---
const Camera = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const ArrowRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const Check = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>
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


// --- STATIC DATA ---
const defaultTerms = {
    clientSupport: "Dedicated point of contact available via email and phone during business hours. A 24-hour response time is guaranteed for all inquiries. Pre-event consultation calls are included to align on the creative vision.",
    studioSupport: "Full coordination with event planners, venues, and other vendors to ensure a seamless experience. We handle all technical logistics, including lighting and sound checks, to guarantee high-quality results."
};

const servicesData = [
    { id: 4, name: 'Destination Wedding', description: 'Comprehensive multi-day coverage for destination weddings.', category: 'Weddings (Full Package, multi-day)', priceMin: 200000, pricingMode: 'Per project', defaultAddOns: { drone: true, reel: true, editing: true, album: true, raw: true }, thumbnail: 'https://images.unsplash.com/photo-1597157639167-2ea07a7e100b?q=80&w=2070&auto=format&fit=crop', isActive: false, terms: defaultTerms },
    { id: 1, name: 'Standard Wedding', description: 'Full-day photography and videography for city weddings.', category: 'Weddings (Standard/City)', priceMin: 50000, pricingMode: 'Per project', defaultAddOns: { drone: true, reel: true, editing: false, album: true, raw: false }, thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', isActive: false, terms: defaultTerms },
    { id: 2, name: 'Corporate Conference', description: 'Complete video and photo coverage for multi-day corporate events.', category: 'Corporate Events / Conferences', priceMin: 10000, pricingMode: 'Per day', defaultAddOns: { drone: false, reel: true, editing: true, album: false, raw: true }, thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', isActive: true, terms: defaultTerms },
    { id: 5, name: 'Birthday Party', description: 'Fun and candid photography for birthday parties and private events.', category: 'Birthday / Private Parties', priceMin: 5000, pricingMode: 'Per hour', defaultAddOns: { drone: false, reel: true, editing: false, album: true, raw: false }, thumbnail: 'https://images.unsplash.com/photo-1599542148816-3335593e7f45?q=80&w=2070&auto=format&fit=crop', isActive: true, terms: defaultTerms },
    { id: 6, name: 'Express Wedding', description: 'A condensed photography package perfect for intimate one-day weddings.', category: 'Flash Shoots / 1-Day Weddings', priceMin: 12000, pricingMode: 'Per project', defaultAddOns: { drone: false, reel: true, editing: true, album: false, raw: false }, thumbnail: 'https://images.unsplash.com/photo-1606273153523-7489803c5a69?q=80&w=1974&auto=format&fit=crop', isActive: false, terms: defaultTerms },
    { id: 7, name: 'All-in-One Event', description: 'A combined photo and video package for your single-day event.', category: 'Photo + Video (1-Day)', priceMin: 20000, pricingMode: 'Per project', defaultAddOns: { drone: true, reel: true, editing: true, album: true, raw: false }, thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070&auto=format&fit=crop', isActive: true, terms: defaultTerms },
    { id: 8, name: 'Social Media Reels', description: 'Trendy and engaging short-form video reels for social media.', category: 'Custom Reels Package', priceMin: 2999, pricingMode: 'Per reel', defaultAddOns: { drone: false, reel: false, editing: true, album: false, raw: true }, thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop', isActive: true, terms: defaultTerms },
    { id: 9, name: 'Family Portrait', description: 'Timeless portrait session for you, your family, kids, or newborn.', category: 'Portrait / Family / Kids / Baby', priceMin: 2000, pricingMode: 'Per hour', defaultAddOns: { drone: false, reel: false, editing: true, album: true, raw: false }, thumbnail: 'https://images.unsplash.com/photo-1545696562-4458a436a5d4?q=80&w=2070&auto=format&fit=crop', isActive: false, terms: defaultTerms },
    { id: 3, name: 'Fashion Portfolio', description: 'Professional studio and outdoor shots for building a model or brand portfolio.', category: 'Fashion / Product / Portfolio / Commercial', priceMin: 12000, pricingMode: 'Per project', defaultAddOns: { drone: false, reel: false, editing: true, album: false, raw: true }, thumbnail: 'https://images.unsplash.com/photo-1611601322175-28e4abc40ba3?q=80&w=1974&auto=format&fit=crop', isActive: true, terms: defaultTerms }
];

const addOnsData = {
    drone: { label: 'Drone Coverage', price: 15000 },
    reel: { label: 'Highlight Reel', price: 8000 },
    editing: { label: 'Premium Editing', price: 12000 },
    album: { label: 'Premium Album', price: 10000 },
    raw: { label: 'Raw Footage', price: 5000 },
};

// --- Helper Hook for Animations ---
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

// --- 3D Tilt Card Component ---
const PackageCard = ({ service, onCustomize, index }) => {
    const cardRef = useRef(null);
    const [isTermsVisible, setIsTermsVisible] = useState(false);

    const handleMouseMove = (e) => {
        if (!service.isActive) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;
        currentTarget.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        if (!service.isActive) return;
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-lg flex flex-col transition-all duration-300 ease-out ${!service.isActive ? 'grayscale opacity-70' : 'hover:shadow-2xl'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {!service.isActive && (
                <div className="absolute top-4 right-4 bg-gray-700 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
                    Currently Unavailable
                </div>
            )}
            <div className="overflow-hidden"><img src={service.thumbnail} alt={service.name} className="h-56 w-full object-cover"/></div>
            <div className="p-6 flex flex-col flex-grow bg-white/50 backdrop-blur-sm">
                <p className="text-sm font-bold text-[#0052CC] mb-2">{service.category}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.description}</p>
                <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-800">₹{service.priceMin.toLocaleString('en-IN')}+</span>
                    <span className="text-gray-500 font-medium">/{service.pricingMode.split(' ')[1]}</span>
                </div>
                <ul className="space-y-3 mb-6">
                    {Object.entries(service.defaultAddOns).filter(([_, val]) => val).map(([key]) => (
                        <li key={key} className="flex items-center text-gray-700 text-sm font-medium">
                            <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-sm"><Check className="w-3 h-3"/></span>
                            {addOnsData[key].label}
                        </li>
                    ))}
                </ul>
                
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-4">
                    <button onClick={() => setIsTermsVisible(!isTermsVisible)} className="flex justify-between items-center w-full text-sm font-semibold text-gray-600 hover:text-gray-900">
                        <span>Terms & Details</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTermsVisible ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTermsVisible ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="text-xs text-gray-500 space-y-3 pt-2">
                            <div>
                                <h4 className="font-bold text-gray-700">Client Support</h4>
                                <p>{service.terms.clientSupport}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-700">Studio Support</h4>
                                <p>{service.terms.studioSupport}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={onCustomize} disabled={!service.isActive} className="button-primary mt-4 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100">
                    {service.isActive ? 'Customize This Package' : 'Unavailable'}
                    {service.isActive && <ArrowRight className="button-primary-icon" />}
                </button>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [selectedService, setSelectedService] = useState(servicesData.find(s => s.isActive) || servicesData[0]);
    const [selectedAddOns, setSelectedAddOns] = useState(selectedService.defaultAddOns);
    const [duration, setDuration] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const customizerRef = useRef(null);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });

    useEffect(() => {
        let newTotal = selectedService.priceMin;
        if (['Per hour', 'Per day', 'Per reel'].includes(selectedService.pricingMode)) {
            newTotal *= Math.max(1, duration);
        }
        Object.keys(selectedAddOns).forEach(key => {
            if (selectedAddOns[key]) newTotal += addOnsData[key].price;
        });
        setTotalPrice(newTotal);
    }, [selectedService, selectedAddOns, duration]);

    useEffect(() => {
        const animation = requestAnimationFrame(() => {
            const difference = totalPrice - displayPrice;
            if (Math.abs(difference) < 1) setDisplayPrice(totalPrice);
            else setDisplayPrice(displayPrice + difference * 0.1);
        });
        return () => cancelAnimationFrame(animation);
    }, [totalPrice, displayPrice]);

    const handleSelectServiceAndScroll = (service) => {
        if (!service.isActive) return;
        setSelectedService(service);
        setSelectedAddOns(service.defaultAddOns || {});
        setDuration(1);
        customizerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleAddOnToggle = (key) => setSelectedAddOns(prev => ({ ...prev, [key]: !prev[key] }));
    const getDurationLabel = () => selectedService.pricingMode.replace('Per ', (c) => c.toUpperCase()).replace('er ', '') + 's';

    const handleQuoteSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you shortly.');
        e.target.reset();
    };

    return (
        <>
            <style>{`
                :root { --brand-blue: #0052CC; --brand-blue-dark: #0047b3; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes background-pan { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
                
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
                <section className="relative py-32 bg-gradient-to-br from-[#0052CC] to-[#0066FF] overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEiIGZpbGw9IndoaXRlIi8+PC9zdmc+')]"></div>
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-2xl animate-[float_12s_ease-in-out_infinite]"></div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                        <div className="w-24 h-24 bg-white/30 backdrop-blur-lg rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                            <Camera className="text-white" size={48} />
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6">Focsera Studios</h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto">
                            Explore our signature packages or build your own. Professional photography and videography services tailored to your needs.
                        </p>
                    </div>
                </section>
                
                <section ref={packagesRef} className="py-24 bg-white">
                    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Our Signature Packages</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {servicesData.map((service, index) => (
                               <PackageCard key={service.id} service={service} onCustomize={() => handleSelectServiceAndScroll(service)} index={index}/>
                           ))}
                        </div>
                    </div>
                </section>
                
                <section ref={customizerRef} className="py-24 bg-gray-50 scroll-mt-20">
                    <div ref={customizerSectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Build Your Own Package</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-200 shadow-2xl space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">1. Select Your Base Service</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {servicesData.map(service => (
                                            <button key={service.id} onClick={() => { if(service.isActive) setSelectedService(service); setSelectedAddOns(service.defaultAddOns || {}) }} disabled={!service.isActive} className={`p-4 border rounded-xl text-left transition-all duration-300 transform  ${selectedService.id === service.id ? 'bg-[#0052CC] text-white shadow-lg ring-4 ring-blue-300' : 'bg-gray-100'} ${service.isActive ? 'hover:-translate-y-1 hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}>
                                                <span className="font-semibold block text-sm md:text-base">{service.name}</span>
                                                <span className={`text-xs md:text-sm ${selectedService.id === service.id ? 'text-white/80' : 'text-gray-500'}`}>Starts at ₹{service.priceMin.toLocaleString('en-IN')}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4">2. Choose Add-ons</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.entries(addOnsData).map(([key, {label, price}]) => (
                                            <div key={key} onClick={() => handleAddOnToggle(key)} className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${selectedAddOns[key] ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'bg-white hover:bg-gray-50'}`}>
                                                <div>
                                                    <span className="font-semibold block text-sm">{label}</span>
                                                    <span className="text-xs text-gray-500">+ ₹{price.toLocaleString('en-IN')}</span>
                                                </div>
                                                <div className={`mt-3 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 transform ${selectedAddOns[key] ? 'bg-[#0052CC] scale-110' : 'bg-gray-300'}`}>
                                                    {selectedAddOns[key] && <Check className="w-4 h-4 text-white"/>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 sticky top-8">
                                 <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border-2 border-[#0052CC] shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-6 text-center">Your Custom Package</h3>
                                    <div className="space-y-3 mb-6 border-b border-blue-200 pb-4">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-gray-700">{selectedService.name}</p>
                                            <p className="text-gray-600 font-medium">₹{selectedService.priceMin.toLocaleString('en-IN')}</p>
                                        </div>
                                        {Object.entries(selectedAddOns).filter(([_, value]) => value).map(([key]) => (
                                            <div key={key} className="flex justify-between items-center text-sm">
                                                <p className="text-gray-600">{addOnsData[key].label}</p>
                                                <p className="text-gray-500 font-medium">+ ₹{addOnsData[key].price.toLocaleString('en-IN')}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-lg font-bold">Estimated Total</p>
                                        <p className="text-3xl font-bold text-[#0052CC]">₹{Math.round(displayPrice).toLocaleString('en-IN')}</p>
                                    </div>
                                    <button className="button-primary w-full">
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
                            If you didn't find the perfect package, tell us about your event, and we'll create a custom quote just for you.
                        </p>
                        <form onSubmit={handleQuoteSubmit} className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-2xl text-left max-w-3xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label><input type="text" id="name" name="name" className="w-full input-field" placeholder="John Doe" required /></div>
                                <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" id="email" name="email" className="w-full input-field" placeholder="you@example.com" required /></div>
                                <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full input-field" placeholder="+91 12345 67890" /></div>
                                <div><label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Event Date</label><input type="date" id="date" name="date" className="w-full input-field" /></div>
                            </div>
                            <div><label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project</label><textarea id="details" name="details" rows="5" className="w-full input-field" placeholder="Please include as many details as possible: location, number of guests, duration, specific shots you need, etc." required></textarea></div>
                            <button type="submit" className="button-primary w-full">Get a Custom Quote <ArrowRight className="button-primary-icon" /></button>
                        </form>
                    </div>
                </section>
                
                <footer className="bg-gray-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300"><Camera className="text-white" size={32} /></div>
                        <p className="font-bold text-2xl mb-2">Focsera Studios</p>
                        <p className="text-gray-400">Capturing Moments, Creating Memories.</p>
                        <div className="flex justify-center gap-6 my-8">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook /></a>
                        </div>
                        <p className="text-sm text-gray-500 mt-8">© {new Date().getFullYear()} Focsera Studios. All Rights Reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}


import React, { useState, useEffect, useRef } from 'react';
// Import createClient directly from the Supabase ESM CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- SUPABASE SETUP ---
const supabaseUrl = 'https://gyjedezyhdlpwzeyixwg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amVkZXp5aGRscHd6ZXlpeHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDA5NDcsImV4cCI6MjA3NjExNjk0N30.6hsjkGN5ojE0jkLnO9qX5fRAGIQABLzlLoqagcNrm1s';
const supabase = createClient(supabaseUrl, supabaseKey);


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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const Instagram = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Twitter = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);
const Facebook = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
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
const GoogleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.614l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C41.382 36.661 44 31.023 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
);
const XIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


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

// --- Stylish Loader Component ---
const Loader = () => (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-80 flex items-center justify-center z-50">
        <div className="loader"></div>
    </div>
);

// --- Custom Alert Modal ---
const AlertModal = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-800 border border-cyan-400/30 rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-auto animate-fadeInUp">
                <p className="text-slate-200 mb-6">{message}</p>
                <button onClick={onClose} className="button-primary w-full">OK</button>
            </div>
        </div>
    );
};


// --- 3D Tilt Card Component ---
const PackageCard = ({ service, onBook, index }) => {
    const cardRef = useRef(null);
    const [isTermsVisible, setIsTermsVisible] = useState(false);

    const handleMouseMove = (e) => {
        if (!service.is_active) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 20;
        const y = (clientY - top - height / 2) / 20;
        currentTarget.style.transform = `perspective(1500px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        if (!service.is_active) return;
        e.currentTarget.style.transform = 'perspective(1500px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    };

    return (
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`card-3d relative bg-slate-900/50 backdrop-blur-sm border border-cyan-400/20 rounded-3xl overflow-hidden shadow-lg flex flex-col transition-all duration-300 ease-out ${!service.is_active ? 'grayscale opacity-60' : 'hover:shadow-cyan-400/10'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            {!service.is_active && (
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-slate-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
                    Currently Unavailable
                </div>
            )}
            <div className="relative overflow-hidden">
                <img src={service.thumbnail} alt={service.name} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <p className="absolute bottom-4 left-4 text-sm font-bold text-cyan-300 mb-0">{service.category}</p>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-3">{service.name}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed flex-grow">{service.description}</p>
                <div className="mb-6">
                    <span className="text-3xl font-bold text-white">₹{service.price_min.toLocaleString('en-IN')}+</span>
                    <span className="text-slate-500 font-medium">/{service.pricing_mode.split(' ')[1]}</span>
                </div>
                
                <div className="border-t border-cyan-400/20 mt-auto pt-4 space-y-4">
                    <button onClick={() => setIsTermsVisible(!isTermsVisible)} className="flex justify-between items-center w-full text-sm font-semibold text-slate-400 hover:text-white transition-colors">
                        <span>Terms & Details</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isTermsVisible ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isTermsVisible ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="text-xs text-slate-500 space-y-3 pt-2">
                             <div>
                                 <h4 className="font-bold text-slate-300">Client Terms</h4>
                                 <p>{service.terms.clientSupport}</p>
                             </div>
                            <div>
                                 <h4 className="font-bold text-slate-300">Studio Terms</h4>
                                 <p>{service.terms.studioSupport}</p>
                             </div>
                        </div>
                    </div>
                </div>

                <button onClick={onBook} disabled={!service.is_active} className="button-primary mt-4 disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100">
                    {service.is_active ? 'Book This Package' : 'Unavailable'}
                    {service.is_active && <ArrowRight className="button-primary-icon" />}
                </button>
            </div>
        </div>
    );
};

// --- Main Pages/Views ---

const LandingPage = ({ onBookNow, services, addOns, setAlertMessage }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });

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
                if (addOn) newTotal += addOn.price_min;
            }
        });
        setTotalPrice(newTotal);
    }, [selectedService, selectedAddOns, addOns]);

    useEffect(() => {
        const animation = requestAnimationFrame(() => {
            const difference = totalPrice - displayPrice;
            if (Math.abs(difference) < 1) setDisplayPrice(totalPrice);
            else setDisplayPrice(displayPrice + difference * 0.15);
        });
        return () => cancelAnimationFrame(animation);
    }, [totalPrice, displayPrice]);
    
    const handleAddOnToggle = (key) => setSelectedAddOns(prev => ({ ...prev, [key]: !prev[key] }));
    
    const handleQuoteSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const quoteData = Object.fromEntries(formData.entries());
        
        const { error } = await supabase.from('quotes').insert([quoteData]);
        if (error) {
            setAlertMessage('Error submitting quote: ' + error.message);
        } else {
            setAlertMessage('Thank you for your inquiry! We will get back to you shortly.');
            e.target.reset();
        }
    };
    
    const handleCustomBooking = () => {
        if (!selectedService) return;
        const customPackage = {
            service: selectedService,
            addOns: selectedAddOns,
            totalPrice: totalPrice,
        };
        onBookNow(customPackage.service, customPackage.addOns, customPackage.totalPrice);
    };

    if (!services || services.length === 0 || !selectedService) {
        return <Loader />
    }

    return (
        <>
            <section className="relative min-h-screen py-32 flex items-center justify-center text-center overflow-hidden hero-section">
                 <div className="absolute inset-0 bg-slate-900/60 z-10"></div>
                 <div className="absolute inset-0 hero-bg"></div>

                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-2xl animate-[float_12s_ease-in-out_infinite_2s]"></div>
                
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeInUp">
                    <div className="w-28 h-28 bg-black/30 backdrop-blur-lg rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border-2 border-cyan-400/30 animate-pulse">
                        <Camera className="text-cyan-300" size={56} />
                    </div>
                    <h1 className="text-5xl sm:text-8xl font-bold text-white mb-6 tracking-tighter" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>Focsera Studios</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Crafting visual narratives. Explore our signature packages or build your own bespoke experience.
                    </p>
                </div>
            </section>
            
            <section ref={packagesRef} className="py-24 bg-slate-900">
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 gradient-text">Signature Packages</h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {services.map((service, index) => (
                           <PackageCard key={service.id} service={service} onBook={() => onBookNow(service, service.default_add_ons)} index={index}/>
                       ))}
                    </div>
                </div>
            </section>
            
             <section className="py-24 bg-slate-900/70 scroll-mt-20">
                    <div ref={customizerSectionRef} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 gradient-text">Build Your Package</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2 bg-slate-900/80 p-8 rounded-3xl border border-cyan-400/20 shadow-2xl space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-white">1. Select Your Base Service</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {services.map(service => (
                                            <button key={service.id} onClick={() => { if(service.is_active) { setSelectedService(service); setSelectedAddOns(service.default_add_ons || {}) } }} disabled={!service.is_active} className={`p-4 border rounded-xl text-left transition-all duration-300 transform  ${selectedService.id === service.id ? 'bg-cyan-500 text-black shadow-lg ring-4 ring-cyan-400/50' : 'bg-slate-800 text-white border-slate-700'} ${service.is_active ? 'hover:-translate-y-1 hover:bg-slate-700' : 'opacity-50 cursor-not-allowed'}`}>
                                                <span className="font-semibold block text-sm md:text-base">{service.name}</span>
                                                <span className={`text-xs md:text-sm ${selectedService.id === service.id ? 'text-black/80' : 'text-slate-400'}`}>Starts at ₹{service.price_min.toLocaleString('en-IN')}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4 text-white">2. Choose Add-ons</h3>
                                    <div className="flex flex-col space-y-3">
                                        {addOns.map((addOn) => (
                                            <label key={addOn.key} className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:-translate-y-1 ${selectedAddOns[addOn.key] ? 'bg-cyan-500/10 border-cyan-500/50 ring-2 ring-cyan-500/30' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}>
                                                <div className="flex items-center">
                                                    <input 
                                                        type="checkbox"
                                                        className="custom-checkbox"
                                                        checked={!!selectedAddOns[addOn.key]}
                                                        onChange={() => handleAddOnToggle(addOn.key)}
                                                    />
                                                    <span className="font-semibold text-sm ml-4 text-white">{addOn.label}</span>
                                                </div>
                                                <span className="text-sm text-slate-400 font-medium">+ ₹{addOn.price_min.toLocaleString('en-IN')}{addOn.price_max ? ` - ₹${addOn.price_max.toLocaleString('en-IN')}` : ''}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 sticky top-8">
                                 <div className="bg-slate-900/80 backdrop-blur-lg p-8 rounded-3xl border-2 border-cyan-400/30 shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-6 text-center text-white">Your Custom Package</h3>
                                    <div className="space-y-3 mb-6 border-b border-cyan-400/20 pb-4">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-white">{selectedService.name}</p>
                                            <p className="text-slate-300 font-medium">₹{selectedService.price_min.toLocaleString('en-IN')}</p>
                                        </div>
                                        {Object.entries(selectedAddOns).filter(([_, value]) => value).map(([key]) => {
                                            const addOn = addOns.find(a => a.key === key);
                                            return addOn ? (
                                                <div key={key} className="flex justify-between items-center text-sm">
                                                    <p className="text-slate-400">{addOn.label}</p>
                                                    <p className="text-slate-400 font-medium">+ ₹{addOn.price_min.toLocaleString('en-IN')}</p>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-lg font-bold text-white">Estimated Total</p>
                                        <p className="text-3xl font-bold text-cyan-300">₹{Math.round(displayPrice).toLocaleString('en-IN')}</p>
                                    </div>
                                    <button onClick={handleCustomBooking} className="button-primary w-full">
                                        Book This Package
                                        <ArrowRight className="button-primary-icon" />
                                    </button>
                                    <p className="text-xs text-slate-500 mt-4 text-center">Final price will be confirmed after consultation.</p>
                                 </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={quoteSectionRef} className="py-24 bg-slate-900">
                    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${quoteIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 gradient-text">Have a Unique Project?</h2>
                        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
                            If our packages don't fit, tell us about your event. We'll create a custom quote just for you.
                        </p>
                        <form onSubmit={handleQuoteSubmit} className="bg-slate-900/80 p-8 rounded-3xl border border-cyan-400/20 shadow-2xl text-left max-w-3xl mx-auto space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Full Name</label><input type="text" id="name" name="name" className="w-full input-field" placeholder="John Doe" required /></div>
                                <div><label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email Address</label><input type="email" id="email" name="email" className="w-full input-field" placeholder="you@example.com" required /></div>
                                <div><label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full input-field" placeholder="+91 12345 67890" /></div>
                                <div><label htmlFor="event_date" className="block text-sm font-medium text-slate-400 mb-2">Event Date</label><input type="date" id="event_date" name="event_date" className="w-full input-field" /></div>
                            </div>
                            <div><label htmlFor="details" className="block text-sm font-medium text-slate-400 mb-2">Tell us about your project</label><textarea id="details" name="details" rows="5" className="w-full input-field" placeholder="Please include as many details as possible: location, number of guests, duration, specific shots you need, etc." required></textarea></div>
                            <button type="submit" className="button-primary w-full">Get a Custom Quote <ArrowRight className="button-primary-icon" /></button>
                        </form>
                    </div>
                </section>
                
                <footer className="bg-slate-900/50 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="w-16 h-16 bg-black/30 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300 border border-cyan-400/20"><Camera className="text-cyan-400" size={32} /></div>
                        <p className="font-bold text-2xl mb-2 text-white">Focsera Studios</p>
                        <p className="text-slate-400">Capturing Moments, Creating Memories.</p>
                        <div className="flex justify-center gap-6 my-8">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram /></a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook /></a>
                        </div>
                        <p className="text-sm text-slate-500 mt-8">© {new Date().getFullYear()} Focsera Studios. All Rights Reserved.</p>
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
        <header className="bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 shadow-lg border-b border-cyan-400/20">
            <nav className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-4">
                     <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center gap-2 font-bold text-xl text-white">
                        <Camera className="text-cyan-400" />
                        Focsera Studios
                    </a>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700"></div>
                    <div className="absolute top-1/2 left-0 h-0.5 bg-cyan-500 transition-all duration-500" style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}></div>
                    <div className="relative flex justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${index <= currentStepIndex ? 'bg-cyan-500 border-cyan-500 text-slate-900' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>
                                    {index < currentStepIndex ? <Check/> : step.icon}
                                </div>
                                <p className={`mt-2 text-xs font-semibold ${index <= currentStepIndex ? 'text-cyan-400' : 'text-slate-500'}`}>{step.name}</p>
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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const authMethod = isLoginView 
            ? supabase.auth.signInWithPassword 
            : supabase.auth.signUp;
        
        const credentials = isLoginView
            ? { email, password }
            : { email, password, options: { data: { full_name: fullName } } };

        const { error } = await authMethod(credentials);
        
        setLoading(false);

        if (error) {
            setError(error.message);
        } else if (!isLoginView) {
            alert("Please check your email to verify your account!");
        } else {
            onLogin();
        }
    };

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({ 
            provider: 'google',
            options: {
                redirectTo: window.location.origin 
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 pt-32">
            <div className="w-full max-w-md animate-fadeInUp">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-400/20 rounded-2xl shadow-2xl p-8 relative">
                    <button onClick={onBack} className="absolute top-4 left-4 text-slate-400 hover:text-white font-semibold text-sm flex items-center gap-1">
                        &larr;
                        <span>Back</span>
                    </button>
                    <h2 className="text-center text-3xl font-bold text-white mb-2 mt-8">{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-center text-slate-400 mb-8">{isLoginView ? 'Sign in to continue your booking' : 'Join us to start your creative journey'}</p>
                    {error && <p className="bg-red-900/50 text-red-300 p-3 rounded-lg text-sm mb-4">{error}</p>}
                    <form onSubmit={handleAuth}>
                        <div className="space-y-6">
                            {!isLoginView && (
                                <div><label className="text-sm font-medium text-slate-400 block mb-2">Full Name</label><input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full input-field" placeholder="John Doe" required/></div>
                            )}
                            <div><label className="text-sm font-medium text-slate-400 block mb-2">Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full input-field" placeholder="you@example.com" required/></div>
                            <div><label className="text-sm font-medium text-slate-400 block mb-2">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full input-field" placeholder="••••••••" required/></div>
                        </div>
                        <button type="submit" className="button-primary w-full mt-8" disabled={loading}>{loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}</button>
                    </form>
                    <div className="text-center mt-6">
                        <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm font-medium text-cyan-400 hover:underline">
                            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-slate-700"></div><span className="mx-4 text-slate-500 text-sm">OR</span><div className="flex-grow border-t border-slate-700"></div>
                    </div>
                    <div className="space-y-4">
                        <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 text-center py-3 border border-slate-600 rounded-full font-semibold text-slate-300 hover:bg-slate-800 transition-colors">
                            <GoogleIcon className="w-6 h-6"/>
                            Sign in with Google
                        </button>
                        <button onClick={onLogin} className="w-full text-center py-3 border border-slate-600 rounded-full font-semibold text-slate-300 hover:bg-slate-800 transition-colors">Continue as Guest</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ bookingPackage, onProceed, onBack, addOns }) => (
    <div className="min-h-screen bg-slate-900 p-4 sm:p-8 pt-32">
        <div className="max-w-4xl mx-auto animate-fadeInUp">
            <h1 className="text-4xl font-bold text-white mb-8">Review Your Order</h1>
            <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-400/20 rounded-2xl shadow-2xl overflow-hidden md:flex">
                <img src={bookingPackage.service.thumbnail} alt={bookingPackage.service.name} className="md:w-1/3 object-cover"/>
                <div className="p-8 flex-grow">
                     <h2 className="text-2xl font-bold text-white mb-2">{bookingPackage.service.name}</h2>
                     <p className="text-slate-400 mb-6">{bookingPackage.service.description}</p>
                     <div className="space-y-4 border-t border-b border-slate-700 py-6">
                         <div className="flex justify-between font-semibold text-white"><p>Base Package</p><p>₹{bookingPackage.service.price_min.toLocaleString('en-IN')}</p></div>
                         {Object.entries(bookingPackage.addOns).filter(([_,v]) => v).map(([key]) => {
                             const addOn = addOns.find(a => a.key === key);
                             return addOn ? (
                                 <div key={key} className="flex justify-between text-slate-400"><p>{addOn.label}</p><p>+ ₹{addOn.price_min.toLocaleString('en-IN')}</p></div>
                             ) : null;
                         })}
                     </div>
                     <div className="flex justify-between items-center mt-6">
                        <p className="text-xl font-bold text-white">Total Estimate</p>
                        <p className="text-3xl font-bold text-cyan-300">₹{bookingPackage.totalPrice.toLocaleString('en-IN')}</p>
                     </div>
                </div>
            </div>
             <div className="flex justify-between mt-8">
                <button onClick={onBack} className="font-semibold text-slate-400 hover:text-white">&larr; Back to Login</button>
                <button onClick={onProceed} className="button-primary">Proceed to Checkout</button>
            </div>
        </div>
    </div>
);

const DetailsPage = ({ bookingPackage, onConfirm, onBack, session, addOns }) => {
    
    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const clientDetails = Object.fromEntries(formData.entries());

        const bookingData = {
            user_id: session?.user?.id,
            service_id: bookingPackage.service.id,
            total_price: bookingPackage.totalPrice,
            event_date: clientDetails.event_date,
            event_venue: clientDetails.event_venue,
            client_details: {
                name: clientDetails.name,
                email: clientDetails.email,
                phone: clientDetails.phone,
            },
            package_details: {
                serviceName: bookingPackage.service.name,
                addOns: Object.entries(bookingPackage.addOns)
                    .filter(([_,v]) => v)
                    .map(([key]) => {
                        const addOn = addOns.find(a => a.key === key);
                        return addOn ? addOn.label : null;
                    }).filter(Boolean)
            }
        };

        const { error } = await supabase.from('bookings').insert([bookingData]);
        if (error) {
            alert('Error creating booking: ' + error.message);
        } else {
            onConfirm();
        }
    };

    return (
     <div className="min-h-screen bg-slate-900 p-4 sm:p-8 pt-32">
        <div className="max-w-4xl mx-auto animate-fadeInUp grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                 <h1 className="text-4xl font-bold text-white mb-8">Checkout Details</h1>
                 <form onSubmit={handleConfirmBooking} className="bg-slate-900/80 backdrop-blur-sm border border-cyan-400/20 p-8 rounded-2xl shadow-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="text-sm font-medium text-slate-400 block mb-2">Full Name</label><input name="name" type="text" className="w-full input-field" placeholder="John Doe" defaultValue={session?.user?.user_metadata?.full_name || ''} required /></div>
                        <div><label className="text-sm font-medium text-slate-400 block mb-2">Email Address</label><input name="email" type="email" className="w-full input-field" placeholder="you@example.com" defaultValue={session?.user?.email || ''} required /></div>
                        <div><label className="text-sm font-medium text-slate-400 block mb-2">Phone Number</label><input name="phone" type="tel" className="w-full input-field" placeholder="+91 12345 67890" required /></div>
                        <div><label className="text-sm font-medium text-slate-400 block mb-2">Event Date</label><input name="event_date" type="date" className="w-full input-field" required/></div>
                    </div>
                    <div><label className="text-sm font-medium text-slate-400 block mb-2">Event Venue / Address</label><textarea name="event_venue" rows="3" className="w-full input-field" placeholder="e.g., Grand Hyatt, Hyderabad" required></textarea></div>
                    <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-4">
                        <button type="button" onClick={onBack} className="w-full sm:w-auto font-semibold text-slate-400 hover:text-white py-3 px-6 rounded-full">
                            &larr; Back to Review
                        </button>
                        <button type="submit" className="button-primary w-full sm:flex-1">Confirm & Book Now</button>
                    </div>
                 </form>
            </div>
            <div className="lg:sticky top-32">
                <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-cyan-400/20">
                    <h3 className="font-bold text-lg mb-4 text-white">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between font-semibold text-white"><p>{bookingPackage.service.name}</p><p>₹{bookingPackage.service.price_min.toLocaleString('en-IN')}</p></div>
                         {Object.entries(bookingPackage.addOns).filter(([_,v]) => v).map(([key]) => {
                             const addOn = addOns.find(a => a.key === key);
                             return addOn ? (
                                <div key={key} className="flex justify-between text-slate-400"><p>{addOn.label}</p><p>+ ₹{addOn.price_min.toLocaleString('en-IN')}</p></div>
                             ) : null;
                         })}
                    </div>
                    <div className="flex justify-between items-baseline mt-4 pt-4 border-t border-slate-700">
                        <p className="font-bold text-white">Total</p>
                        <p className="font-bold text-xl text-cyan-300">₹{bookingPackage.totalPrice.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-slate-900 border border-cyan-400/20 rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-auto animate-fadeInUp">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center mx-auto mb-6 ring-4 ring-cyan-500/30">
                <Check className="w-12 h-12"/>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
            <p className="text-slate-400 mb-8">Thank you for choosing Focsera Studios. We've received your details and will contact you shortly to finalize the arrangements.</p>
            <button onClick={onClose} className="button-primary w-full">Back to Homepage</button>
        </div>
    </div>
);

// --- MAIN APP COMPONENT ---
export default function App() {
    const [session, setSession] = useState(null);
    const [currentView, setCurrentView] = useState('landing'); // 'landing', 'login', 'cart', 'details'
    const [bookingPackage, setBookingPackage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
    const [services, setServices] = useState([]);
    const [addOns, setAddOns] = useState([]);

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
        
        const getInitialData = async () => {
            const { data: servicesData, error: servicesError } = await supabase.from('services').select('*').order('id');
            if(servicesError) console.error("Error fetching services", servicesError);
            else setServices(servicesData);

            const { data: addOnsData, error: addOnsError } = await supabase.from('add_ons').select('*');
            if(addOnsError) console.error("Error fetching add-ons", addOnsError);
            else setAddOns(addOnsData);
        };
        getInitialData();

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);
    
    const handleBookNow = (service, addOns, price) => {
        if (!service.is_active) return;
        const addOnsList = addOns || service.default_add_ons;
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
        
        sessionStorage.setItem('focseraBookingPackage', JSON.stringify(packageToBook));

        setBookingPackage(packageToBook);
        setCurrentView('login');
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
             return (
                <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-2xl font-bold text-white mb-4">No Package Selected</h2>
                    <p className="text-slate-400 mb-8">Please go back to the homepage to select a package before proceeding.</p>
                    <button onClick={resetToLanding} className="button-primary">Back to Homepage</button>
                </div>
            );
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
                    setAlertMessage={setAlertMessage}
                />;
        }
    };

    return (
        <>
            <style>{`
                :root { 
                    --brand-neon-blue: #22d3ee; 
                    --brand-dark: #0f172a;
                    --brand-light: #f1f5f9;
                }
                body {
                    background-color: var(--brand-dark);
                    color: var(--brand-light);
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
                @keyframes background-pan { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
                @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } 100% { transform: translateY(0px) rotate(0deg); } }
                
                .gradient-text { background: linear-gradient(90deg, #22d3ee, #0ea5e9, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                
                .button-primary {
                    position: relative; overflow: hidden;
                    display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
                    padding: 0.875rem 1.75rem; 
                    background-image: linear-gradient(90deg, var(--brand-neon-blue) 0%, #0ea5e9 100%);
                    color: black; border-radius: 9999px; font-weight: 700;
                    transition: all 0.3s ease; transform: scale(1);
                    border: none;
                    box-shadow: 0 4px 20px rgba(34, 211, 238, 0.2), 0 0 0 0 rgba(34, 211, 238, 0.7);
                }
                .button-primary:hover:not(:disabled) { 
                    transform: scale(1.05); 
                    box-shadow: 0 8px 30px rgba(34, 211, 238, 0.3); 
                }
                .button-primary:active:not(:disabled) { transform: scale(0.98); }
                .button-primary-icon { transition: transform 0.3s ease; }
                .button-primary:hover:not(:disabled) .button-primary-icon { transform: translateX(4px); }

                .input-field {
                    background-color: #1e293b; border: 1px solid #475569; color: var(--brand-light); border-radius: 0.5rem;
                    padding: 0.75rem 1rem; transition: all 0.2s ease-in-out;
                }
                .input-field::placeholder { color: #64748b; }
                .input-field:focus {
                    outline: none; border-color: var(--brand-neon-blue);
                    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.2);
                }
                .input-field[type="date"]::-webkit-calendar-picker-indicator {
                   filter: invert(1);
                }
                
                .card-3d { will-change: transform; transform-style: preserve-3d; }
                
                .hero-section {
                  background-color: var(--brand-dark);
                }
                .hero-bg {
                  position: absolute;
                  inset: 0;
                  background-image: url('https://images.unsplash.com/photo-1544391752-1c6ee3832746?q=80&w=1974&auto=format&fit=crop');
                  background-size: cover;
                  background-position: center;
                  opacity: 0.1;
                  filter: blur(4px);
                }

                .loader {
                  width: 50px;
                  aspect-ratio: 1;
                  border-radius: 50%;
                  border: 8px solid #0000;
                  border-right-color: var(--brand-neon-blue);
                  position: relative;
                  animation: l24 1s infinite linear;
                }
                .loader:before,
                .loader:after {
                  content: "";
                  position: absolute;
                  inset: -8px;
                  border-radius: 50%;
                  border: inherit;
                  animation: inherit;
                  animation-duration: 2s;
                }
                .loader:after {
                  animation-duration: 4s;
                }
                @keyframes l24 {
                  100% {transform: rotate(1turn)}
                }
                
                .custom-checkbox {
                    -webkit-appearance: none;
                    appearance: none;
                    background-color: #334155;
                    border: 1px solid #475569;
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 0.25rem;
                    display: grid;
                    place-content: center;
                    transition: all 0.2s;
                }
                .custom-checkbox::before {
                    content: "";
                    width: 0.65em;
                    height: 0.65em;
                    transform: scale(0);
                    transition: 120ms transform ease-in-out;
                    box-shadow: inset 1em 1em var(--brand-neon-blue);
                    transform-origin: center;
                    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
                }
                .custom-checkbox:checked {
                    background-color: var(--brand-neon-blue);
                    border-color: var(--brand-neon-blue);
                }
                .custom-checkbox:checked::before {
                    transform: scale(1.2);
                    box-shadow: inset 1em 1em black;
                }

            `}</style>

            <div className="bg-slate-900 text-slate-200 font-sans antialiased">
                {currentView !== 'landing' && <CheckoutHeader currentStep={currentView} />}
                {renderContent()}
                {showSuccess && <SuccessModal onClose={resetToLanding} />}
                <AlertModal message={alertMessage} onClose={() => setAlertMessage('')} />
            </div>
        </>
    );
}


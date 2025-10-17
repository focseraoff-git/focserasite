import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Camera = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
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
const GoogleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" {...props}><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.618-3.226-11.283-7.614l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C41.382 36.661 44 31.023 44 24c0-1.341-.138-2.65-.389-3.917z"></path></svg>
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

const PackageCard = ({ service, onBook, index }) => {
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
                        <span className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">₹{service.price_min.toLocaleString('en-IN')}</span>
                        <span className="text-lg text-gray-500 font-semibold">+</span>
                    </div>
                    <span className="block text-sm text-gray-500 font-medium mt-1">per {service.pricing_mode.split(' ')[1]}</span>
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

                <button onClick={onBook} disabled={!service.is_active} className="relative mt-4 w-full py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed group/btn">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_100%] group-hover/btn:bg-right transition-all duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center justify-center gap-2">
                        {service.is_active ? 'Book This Package' : 'Unavailable'}
                        {service.is_active && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                    </span>
                </button>
            </div>
        </div>
    );
};

const LandingPage = ({ onBookNow, services, addOns }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);

    const [packagesRef, packagesAreVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [customizerSectionRef, customizerIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [quoteSectionRef, quoteIsVisible] = useIntersectionObserver({ threshold: 0.1 });
    const customizerScrollRef = useRef(null);
    const addOnsScrollRef = useRef(null);

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
            else setDisplayPrice(displayPrice + difference * 0.1);
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
            alert('Error submitting quote: ' + error.message);
        } else {
            alert('Thank you for your inquiry! We will get back to you shortly.');
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
        return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Loading Focsera Studios...</div>
    }

    return (
        <>
            <section className="relative py-32 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0f3460] overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                </div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite_reverse]"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ animation: 'fadeInUp 1s ease-out' }}>
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[2rem] blur-2xl opacity-60 animate-pulse"></div>
                        <div className="relative w-32 h-32 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] flex items-center justify-center shadow-2xl">
                            <Camera className="text-white drop-shadow-2xl" size={56} strokeWidth={1.5} />
                        </div>
                    </div>
                    <h1 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200 mb-6 tracking-tight">
                        Focsera Studios
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
                        Elevate your moments into timeless masterpieces. Professional photography and videography crafted to perfection.
                    </p>
                    <div className="flex gap-4 justify-center mt-12">
                        <div className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full">
                            <span className="text-white/90 font-semibold text-sm">📸 Photography</span>
                        </div>
                        <div className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full">
                            <span className="text-white/90 font-semibold text-sm">🎥 Videography</span>
                        </div>
                        <div className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full">
                            <span className="text-white/90 font-semibold text-sm">✨ Premium Quality</span>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={packagesRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+')] opacity-50"></div>
                <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${packagesAreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center mb-20">
                        <span className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-full mb-6 shadow-lg">FEATURED PACKAGES</span>
                        <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 mb-6">Our Signature Collections</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Handcrafted packages designed to capture your special moments with unmatched excellence</p>
                        <div className="relative w-32 h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 mx-auto rounded-full mt-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite]"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {services.map((service, index) => (
                           <PackageCard key={service.id} service={service} onBook={() => {
                               customizerScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                               setTimeout(() => onBookNow(service, service.default_add_ons), 800);
                           }} index={index}/>
                       ))}
                    </div>
                </div>
            </section>

             <section ref={customizerScrollRef} className="relative py-24 bg-gradient-to-b from-white to-gray-50 scroll-mt-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
                    <div ref={customizerSectionRef} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${customizerIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="text-center mb-20">
                            <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-bold rounded-full mb-6 shadow-lg">CUSTOMIZE YOUR EXPERIENCE</span>
                            <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 mb-6">Craft Your Perfect Package</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Mix and match services and add-ons to create a package that's uniquely yours</p>
                            <div className="relative w-32 h-2 bg-gradient-to-r from-purple-400 via-blue-500 to-cyan-400 mx-auto rounded-full mt-6"></div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-10 rounded-[2rem] border border-white/50 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] space-y-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg">1</div>
                                        <h3 className="text-2xl font-black text-gray-900">Select Your Base Service</h3>
                                    </div>
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
                                                <span className={`relative text-xs md:text-sm font-medium ${selectedService.id === service.id ? 'text-white/90' : 'text-gray-600'}`}>From ₹{service.price_min.toLocaleString('en-IN')}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div ref={addOnsScrollRef}>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-black text-lg shadow-lg">2</div>
                                        <h3 className="text-2xl font-black text-gray-900">Choose Add-ons</h3>
                                    </div>
                                    <div className="flex flex-col space-y-3">
                                        {addOns.map((addOn) => (
                                            <label key={addOn.key} className={`group/addon relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between transform hover:-translate-y-1 overflow-hidden ${selectedAddOns[addOn.key] ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-400 shadow-lg' : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:shadow-md'}`}>
                                                {selectedAddOns[addOn.key] && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent animate-[shimmer_3s_infinite]"></div>
                                                )}
                                                <div className="flex items-center relative z-10">
                                                    <div className="relative">
                                                        <input
                                                            type="checkbox"
                                                            className="peer h-6 w-6 rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer"
                                                            checked={!!selectedAddOns[addOn.key]}
                                                            onChange={() => handleAddOnToggle(addOn.key)}
                                                        />
                                                        <Check className="absolute inset-0 m-auto w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
                                                    </div>
                                                    <span className="font-bold text-sm ml-4 text-gray-900">{addOn.label}</span>
                                                </div>
                                                <span className="relative z-10 text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">+ ₹{addOn.price_min.toLocaleString('en-IN')}{addOn.price_max ? ` - ₹${addOn.price_max.toLocaleString('en-IN')}` : ''}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-1 sticky top-8">
                                 <div className="relative bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-2xl p-8 rounded-[2rem] border-2 border-white/50 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-20"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400 to-pink-600 rounded-full blur-3xl opacity-20"></div>
                                    <h3 className="relative text-3xl font-black text-center mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent">Your Custom Package</h3>
                                    <div className="relative space-y-3 mb-6 border-b-2 border-gradient-to-r from-transparent via-blue-300 to-transparent pb-6">
                                        <div className="flex justify-between items-center p-3 bg-white/50 backdrop-blur-sm rounded-xl">
                                            <p className="font-bold text-gray-900">{selectedService.name}</p>
                                            <p className="text-gray-700 font-bold">₹{selectedService.price_min.toLocaleString('en-IN')}</p>
                                        </div>
                                        {Object.entries(selectedAddOns).filter(([_, value]) => value).map(([key]) => {
                                            const addOn = addOns.find(a => a.key === key);
                                            return addOn ? (
                                                <div key={key} className="flex justify-between items-center text-sm p-2 bg-blue-50/50 rounded-lg">
                                                    <p className="text-gray-700 font-semibold">{addOn.label}</p>
                                                    <p className="text-blue-600 font-bold">+ ₹{addOn.price_min.toLocaleString('en-IN')}</p>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                    <div className="relative flex justify-between items-center mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
                                        <p className="text-lg font-black text-gray-900">Estimated Total</p>
                                        <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">₹{Math.round(displayPrice).toLocaleString('en-IN')}</p>
                                    </div>
                                    <button onClick={handleCustomBooking} className="relative w-full py-5 rounded-2xl font-black text-white text-lg overflow-hidden transition-all duration-300 group/book shadow-xl hover:shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-[length:200%_100%] group-hover/book:bg-right transition-all duration-700"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/book:translate-x-[200%] transition-transform duration-1000"></div>
                                        <span className="relative flex items-center justify-center gap-2">
                                            Book This Package
                                            <ArrowRight className="w-6 h-6 group-hover/book:translate-x-2 transition-transform" />
                                        </span>
                                    </button>
                                    <p className="relative text-xs text-gray-600 mt-4 text-center font-medium">Final price confirmed after consultation</p>
                                 </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={quoteSectionRef} className="relative py-24 bg-gradient-to-b from-white to-gray-100 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-[float_20s_ease-in-out_infinite]"></div>
                    <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${quoteIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold rounded-full mb-6 shadow-lg">CUSTOM SOLUTIONS</span>
                        <h2 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 mb-6">Have Something Unique in Mind?</h2>
                        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed">
                            Every vision is unique. Share your creative ideas with us, and we'll craft a bespoke package tailored exclusively for you.
                        </p>
                        <form onSubmit={handleQuoteSubmit} className="relative bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] border-2 border-white/50 shadow-[0_20px_70px_-15px_rgba(0,0,0,0.2)] text-left max-w-3xl mx-auto space-y-6 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
                            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-3">Full Name</label><input type="text" id="name" name="name" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none bg-white/80 backdrop-blur-sm font-medium" placeholder="John Doe" required /></div>
                                <div><label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-3">Email Address</label><input type="email" id="email" name="email" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none bg-white/80 backdrop-blur-sm font-medium" placeholder="you@example.com" required /></div>
                                <div><label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-3">Phone Number</label><input type="tel" id="phone" name="phone" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none bg-white/80 backdrop-blur-sm font-medium" placeholder="+91 12345 67890" /></div>
                                <div><label htmlFor="event_date" className="block text-sm font-bold text-gray-800 mb-3">Event Date</label><input type="date" id="event_date" name="event_date" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none bg-white/80 backdrop-blur-sm font-medium" /></div>
                            </div>
                            <div className="relative"><label htmlFor="details" className="block text-sm font-bold text-gray-800 mb-3">Tell us about your project</label><textarea id="details" name="details" rows="6" className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all outline-none resize-none bg-white/80 backdrop-blur-sm font-medium" placeholder="Share your vision: event type, location, guest count, duration, special moments you want captured, creative ideas, and any specific requirements..." required></textarea></div>
                            <button type="submit" className="relative w-full py-5 rounded-2xl font-black text-white text-lg overflow-hidden transition-all duration-300 group/submit shadow-xl hover:shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-600 to-purple-500 bg-[length:200%_100%] group-hover/submit:bg-right transition-all duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover/submit:translate-x-[200%] transition-transform duration-1000"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    Get Your Custom Quote
                                    <ArrowRight className="w-6 h-6 group-hover/submit:translate-x-2 transition-transform" />
                                </span>
                            </button>
                        </form>
                    </div>
                </section>

                <footer className="relative bg-gradient-to-b from-gray-900 via-[#0f0f1e] to-black text-white py-20 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="relative w-20 h-20 mx-auto mb-6 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                                <Camera className="text-white" size={36} strokeWidth={1.5} />
                            </div>
                        </div>
                        <p className="font-black text-4xl mb-3 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">Focsera Studios</p>
                        <p className="text-xl text-gray-400 font-light mb-10">Where moments become timeless masterpieces</p>
                        <div className="flex justify-center gap-4 my-10">
                            <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 hover:border-cyan-500/50 transition-all duration-300"><Twitter size={20} /></a>
                            <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 hover:border-cyan-500/50 transition-all duration-300"><Instagram size={20} /></a>
                            <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 hover:border-cyan-500/50 transition-all duration-300"><Facebook size={20} /></a>
                        </div>
                        <div className="border-t border-white/10 pt-8 mt-8">
                            <p className="text-sm text-gray-500 font-medium">© {new Date().getFullYear()} Focsera Studios. All Rights Reserved. Crafted with passion.</p>
                        </div>
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
                        <Camera className="text-blue-600" />
                        Focsera Studios
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

        if (error) {
            setError(error.message);
        } else if (!isLoginView) {
            alert("Please check your email to verify your account!");
        }

        setLoading(false);
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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 pt-40">
            <div className="w-full max-w-md animate-fadeInUp">
                <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
                    <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 font-semibold text-sm flex items-center gap-1">
                        &larr;
                        <span>Back</span>
                    </button>
                    <h2 className="text-center text-3xl font-bold text-gray-800 mb-2 mt-8">{isLoginView ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-center text-gray-500 mb-8">{isLoginView ? 'Sign in to continue your booking' : 'Join us to start your creative journey'}</p>
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm mb-4">{error}</p>}
                    <form onSubmit={handleAuth}>
                        <div className="space-y-6">
                            {!isLoginView && (
                                <div><label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label><input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full input-field" placeholder="John Doe" required/></div>
                            )}
                            <div><label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full input-field" placeholder="you@example.com" required/></div>
                            <div><label className="text-sm font-medium text-gray-700 block mb-2">Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full input-field" placeholder="••••••••" required/></div>
                        </div>
                        <button type="submit" className="button-primary w-full mt-8" disabled={loading}>{loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}</button>
                    </form>
                    <div className="text-center mt-6">
                        <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm font-medium text-blue-600 hover:underline">
                            {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                        </button>
                    </div>
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div><span className="mx-4 text-gray-500 text-sm">OR</span><div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="space-y-4">
                        <button onClick={onLogin} className="w-full text-center py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-colors">Continue as Guest</button>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-4">Note: Google sign-in will be available once OAuth is configured in Supabase.</p>
                </div>
            </div>
        </div>
    );
};

const CartPage = ({ bookingPackage, onProceed, onBack, addOns }) => (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 pt-40">
        <div className="max-w-4xl mx-auto animate-fadeInUp">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Review Your Order</h1>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden md:flex">
                <img src={bookingPackage.service.thumbnail} alt={bookingPackage.service.name} className="md:w-1/3 object-cover"/>
                <div className="p-8 flex-grow">
                     <h2 className="text-2xl font-bold text-gray-900 mb-2">{bookingPackage.service.name}</h2>
                     <p className="text-gray-600 mb-6">{bookingPackage.service.description}</p>
                     <div className="space-y-4 border-t border-b border-gray-200 py-6">
                         <div className="flex justify-between font-semibold"><p>Base Package</p><p>₹{bookingPackage.service.price_min.toLocaleString('en-IN')}</p></div>
                         {Object.entries(bookingPackage.addOns).filter(([_,v]) => v).map(([key]) => {
                             const addOn = addOns.find(a => a.key === key);
                             return addOn ? (
                                 <div key={key} className="flex justify-between text-gray-600"><p>{addOn.label}</p><p>+ ₹{addOn.price_min.toLocaleString('en-IN')}</p></div>
                             ) : null;
                         })}
                     </div>
                     <div className="flex justify-between items-center mt-6">
                        <p className="text-xl font-bold">Total Estimate</p>
                        <p className="text-3xl font-bold text-blue-600">₹{bookingPackage.totalPrice.toLocaleString('en-IN')}</p>
                     </div>
                </div>
            </div>
             <div className="flex justify-between mt-8">
                <button onClick={onBack} className="font-semibold text-gray-600 hover:text-gray-900">&larr; Back to Login</button>
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
     <div className="min-h-screen bg-gray-100 p-4 sm:p-8 pt-40">
        <div className="max-w-4xl mx-auto animate-fadeInUp grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                 <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout Details</h1>
                 <form onSubmit={handleConfirmBooking} className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label><input name="name" type="text" className="w-full input-field" placeholder="John Doe" defaultValue={session?.user?.user_metadata?.full_name || ''} required /></div>
                        <div><label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label><input name="email" type="email" className="w-full input-field" placeholder="you@example.com" defaultValue={session?.user?.email || ''} required /></div>
                        <div><label className="text-sm font-medium text-gray-700 block mb-2">Phone Number</label><input name="phone" type="tel" className="w-full input-field" placeholder="+91 12345 67890" required /></div>
                        <div><label className="text-sm font-medium text-gray-700 block mb-2">Event Date</label><input name="event_date" type="date" className="w-full input-field" required/></div>
                    </div>
                    <div><label className="text-sm font-medium text-gray-700 block mb-2">Event Venue / Address</label><textarea name="event_venue" rows="3" className="w-full input-field" placeholder="e.g., Grand Hyatt, Hyderabad" required></textarea></div>
                    <div className="pt-4 flex flex-col-reverse sm:flex-row items-center gap-4">
                        <button type="button" onClick={onBack} className="w-full sm:w-auto font-semibold text-gray-600 hover:text-gray-900 py-3 px-6 rounded-full">
                            &larr; Back to Review
                        </button>
                        <button type="submit" className="button-primary w-full sm:flex-1">Confirm & Book Now</button>
                    </div>
                 </form>
            </div>
            <div className="lg:sticky top-28">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between font-semibold"><p>{bookingPackage.service.name}</p><p>₹{bookingPackage.service.price_min.toLocaleString('en-IN')}</p></div>
                         {Object.entries(bookingPackage.addOns).filter(([_,v]) => v).map(([key]) => {
                             const addOn = addOns.find(a => a.key === key);
                             return addOn ? (
                                <div key={key} className="flex justify-between text-gray-600"><p>{addOn.label}</p><p>+ ₹{addOn.price_min.toLocaleString('en-IN')}</p></div>
                             ) : null;
                         })}
                    </div>
                    <div className="flex justify-between items-baseline mt-4 pt-4 border-t">
                        <p className="font-bold">Total</p>
                        <p className="font-bold text-xl text-blue-600">₹{bookingPackage.totalPrice.toLocaleString('en-IN')}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm mx-auto">
            <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12"/>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-8">Thank you for choosing Focsera Studios. We've received your booking details and will contact you shortly to finalize the arrangements.</p>
            <button onClick={onClose} className="button-primary w-full">Back to Homepage</button>
        </div>
    </div>
);

export default function App() {
    const [session, setSession] = useState(null);
    const [currentView, setCurrentView] = useState('landing');
    const [bookingPackage, setBookingPackage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const [services, setServices] = useState([]);
    const [addOns, setAddOns] = useState([]);

    useEffect(() => {
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

            if (_event === "SIGNED_IN") {
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
             return <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">Please select a package first.</div>
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
                {currentView !== 'landing' && <CheckoutHeader currentStep={currentView} />}
                {renderContent()}
                {showSuccess && <SuccessModal onClose={resetToLanding} />}
            </div>
        </>
    );
}

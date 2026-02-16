// Premium ₹999 Offer Section - Buttery Smooth UX
import React from 'react';

const Timer = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const Camera = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg>
);
const ArrowRight = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);
const Heart = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const Plus = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const Check = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12" /></svg>
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

export default function PremiumOfferSection({ onBook, onWhatsApp, imageUrl, services }) {
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
        const baseService = services?.find(s =>
            s.name.toLowerCase().includes('instant') ||
            s.name.includes('999')
        ) || services?.find(s => s.is_active) || { id: 1 };

        const syntheticService = {
            id: baseService.id,
            name: plan.name,
            price: plan.price && plan.price !== 'Contact' && plan.price !== 'Custom' ? parseInt(plan.price.replace(/\D/g, '')) : 0,
            price_min: plan.price && plan.price !== 'Contact' && plan.price !== 'Custom' ? parseInt(plan.price.replace(/\D/g, '')) : 0,
            pricing_mode: plan.price && plan.price !== 'Contact' && plan.price !== 'Custom' ? 'fixed' : 'quote',
            description: `Instant Memories: ${plan.duration}. Includes: ${plan.deliverables ? plan.deliverables.join(', ') : 'Custom Scope'}.`,
            is_active: true,
            thumbnail: imageUrl,
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
        <section id="focsera-999-offer" className="relative w-full bg-slate-950 overflow-hidden py-12 md:py-20 lg:py-32">
            {/* Premium Dark Background with Animated Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Mesh Gradients */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Hero Section - Premium Dark Theme */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
                    {/* Left Content */}
                    <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-full shadow-lg shadow-blue-500/20">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold tracking-[0.2em] uppercase text-blue-300">Limited Time Offer</span>
                        </div>

                        {/* Massive Typography */}
                        <div className="space-y-3 md:space-y-4">
                            <h2 className="text-[clamp(3rem,10vw,6rem)] font-black leading-[0.9] tracking-tighter">
                                <span className="block text-white">Just</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 animate-gradient">₹999</span>
                            </h2>
                            <p className="text-2xl md:text-3xl text-white/70 font-light">
                                Professional Photography & Instant Editing
                            </p>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2.5 md:gap-3 justify-center lg:justify-start">
                            {[
                                { icon: <Camera className="w-4 h-4" />, text: "8 Edited Photos" },
                                { icon: <Video className="w-4 h-4" />, text: "1 Instant Reel" },
                                { icon: <Zap className="w-4 h-4" />, text: "1 Hour Duration" }
                            ].map((item, i) => (
                                <div key={i} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center gap-2 md:gap-2.5 px-4 md:px-5 py-2.5 md:py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-colors">
                                        <div className="text-cyan-400">{item.icon}</div>
                                        <span className="text-sm font-medium text-white/90">{item.text}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4 items-center lg:items-start">
                            <button
                                onClick={() => handlePlanClick(plans[0])}
                                className="group relative inline-flex items-center justify-center px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 w-full sm:w-auto"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative z-10 text-base md:text-lg font-bold text-white">Book Your Shoot Now</span>
                                <ArrowRight className="relative z-10 ml-2 w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => document.getElementById('more-plans')?.scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center px-6 md:px-8 py-4 md:py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-xl md:rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all hover:scale-105 w-full sm:w-auto"
                            >
                                <span className="text-base md:text-lg font-bold">View More Plans</span>
                            </button>
                        </div>

                        {/* Urgency Note */}
                        <div className="flex items-center gap-2 text-blue-300 justify-center lg:justify-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold">First few clients only – Limited slots available!</span>
                        </div>
                    </div>

                    {/* Right Image - Premium Frame */}
                    <div className="relative mx-auto w-full max-w-sm md:max-w-md lg:max-w-full order-first lg:order-last">
                        {/* Ambient Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-purple-500/20 rounded-full blur-[120px] scale-110"></div>

                        {/* Image Container */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform hover:scale-105 transition-transform duration-700">
                            <img
                                src={imageUrl}
                                alt="Professional Shoot"
                                className="w-full h-auto object-cover aspect-[4/5]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                            {/* Floating Badge */}
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl md:rounded-2xl p-[2px]">
                                <div className="bg-slate-950 rounded-[14px] px-4 py-2">
                                    <div className="text-base md:text-lg font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                                        ₹999
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extended Pricing Section */}
                <div id="more-plans" className="pt-12 md:pt-16 border-t border-white/10">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">More Ways to Capture Memories</h3>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">Need more time or more reels? Upgrade your instant experience.</p>
                    </div>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
                        {[
                            { icon: <Camera className="w-8 h-8 text-blue-400" />, title: "Instant Photos", desc: "Edited on the spot" },
                            { icon: <Video className="w-8 h-8 text-cyan-400" />, title: "Instant Reels", desc: "Ready to post" },
                            { icon: <Zap className="w-8 h-8 text-purple-400" />, title: "Fast Delivery", desc: "During the event" },
                            { icon: <Frame className="w-8 h-8 text-blue-400" />, title: "Photo Frames", desc: "Delivered in 48h" },
                        ].map((feature, idx) => (
                            <div key={idx} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
                                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-white mb-1 text-base md:text-lg">{feature.title}</h3>
                                <p className="text-sm text-white/60 font-medium">{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative flex flex-col p-6 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${plan.highlight
                                    ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border-blue-500/50 shadow-xl shadow-blue-500/20'
                                    : 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                        {plan.badge}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl md:text-4xl font-black text-white">{plan.price}</span>
                                        <span className="text-sm text-white/60">/ event</span>
                                    </div>
                                    <div className="mt-4 inline-block px-3 py-1 rounded-lg text-sm font-medium bg-white/10 text-blue-300">
                                        ⏱️ {plan.duration} Duration
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {plan.deliverables.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/80">
                                            <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    <button
                                        onClick={() => handlePlanClick(plan)}
                                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg ${plan.highlight
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-blue-500/50 hover:scale-105'
                                            : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                    <p className="text-xs text-center mt-3 flex items-center justify-center gap-1 text-white/50">
                                        <Zap size={10} className="text-yellow-400 fill-yellow-400" /> Instant delivery at the event
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Final CTA */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4">Want us to come to your place?</h2>
                        <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">Choose a plan, pick a slot, and we'll shoot + edit instantly.</p>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <button
                                onClick={() => handlePlanClick({ name: "General Instant Shoot", price: "Custom", duration: "Custom", deliverables: ["Tailored Scope"] })}
                                className="px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-base md:text-lg rounded-xl shadow-xl hover:shadow-blue-500/50 hover:scale-105 transition-all w-full sm:w-auto"
                            >
                                Book Now
                            </button>
                            <button
                                onClick={onWhatsApp}
                                className="px-6 md:px-8 py-3.5 md:py-4 bg-white/10 border border-white/20 text-white font-bold text-base md:text-lg rounded-xl hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c1.005.572 1.903.88 3.844.755 3.193-.207 5.727-2.617 5.728-5.937 0-3.18-2.585-5.764-5.766-5.765zm0-2c4.279 0 7.766 3.486 7.766 7.766 0 4.28-3.486 7.767-7.766 7.767-1.921 0-3.136-.596-3.83-1.071l-5.204 1.368 1.4-5.111c-.559-.838-1.229-2.226-1.129-4.32.184-3.696 3.454-6.399 8.763-6.399zm-2.022 10.428c-.126.046-.245.161-.202.348l.053.226c.266 1.134 1.328 1.838 2.894 1.055 1.564-.783 2.122-2.14 1.706-2.671-.247-.315-1.554-.807-1.782-.676-.228.131-.482.723-.746.689-.264-.033-1.085-.56-1.464-.986-.251-.283-.4-.539-.379-.806.02-.267.436-.453.649-.835.105-.189-.009-.436-.123-.679-.124-.263-.448-1.066-.757-1.149-.554-.15-1.036.035-1.378.369-.371.363-.761.802-.638 1.848.122 1.047 1.033 3.328 2.368 4.267z" /></svg>
                                WhatsApp Us
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 6s ease infinite;
                }
            `}} />
        </section>
    );
}

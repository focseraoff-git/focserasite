import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FuelUpPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenFuelUpPopup');
            if (!hasSeenPopup) {
                setIsOpen(true);
                sessionStorage.setItem('hasSeenFuelUpPopup', 'true');
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full animate-scaleIn">

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors z-20"
                >
                    <X size={20} />
                </button>

                {/* Hero Image / Gradient Area */}
                <div className="relative h-32 bg-gradient-to-br from-blue-900 to-black overflow-hidden flex items-center justify-center font-sans">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute top-[-50%] left-[-20%] w-64 h-64 bg-blue-500/30 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest mb-2 animate-bounce-slow">
                            <Sparkles size={12} /> New Launch
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Focsera Fuel-Up Kit</h2>
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-8">
                    <p className="text-gray-400 text-center mb-6 text-sm leading-relaxed">
                        The ultimate starter kit to launch your professional identity.
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                        {[
                            'Visiting Cards Design & Print',
                            'Professional Logo & Branding',
                            'Premium Website Design'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle size={12} className="text-blue-400" />
                                </div>
                                <span className="text-gray-200 text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Block */}
                    <div className="flex items-end justify-center gap-4 mb-8">
                        <div className="text-center">
                            <span className="block text-gray-500 text-xs font-semibold line-through">₹4,999</span>
                            <span className="block text-4xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                ₹1,999
                            </span>
                        </div>
                        <div className="pb-2">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/30">
                                Launch Offer
                            </span>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link
                        to="/web#fuel-up-kit"
                        onClick={() => setIsOpen(false)}
                        className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-center rounded-xl shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Claim Offer Now
                    </Link>

                    <p className="text-center text-[10px] text-gray-600 mt-4">
                        Limited time offer. Terms & conditions apply.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FuelUpPopup;

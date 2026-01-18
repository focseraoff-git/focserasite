
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function FuelUpPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Show popup after a short delay
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    const handleCta = () => {
        setIsOpen(false);
        navigate('/web#fuel-up-kit');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-[#0A0A0A] rounded-[2rem] p-[1px] overflow-hidden max-w-md w-full shadow-2xl animate-fade-in-up">
                {/* Gradient Border Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-purple-500/10 to-transparent"></div>

                {/* Glow Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none"></div>

                <div className="relative bg-[#080808] rounded-[calc(2rem-1px)] p-6 sm:p-8">

                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors border border-white/5 z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="mb-6 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-bold tracking-wide mb-5 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                            <Sparkles size={12} /> NEW LAUNCH
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight leading-tight">
                            Focsera <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Fuel-Up Kit</span>
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            The ultimate starter kit to launch your professional identity.
                        </p>

                        <div className="flex items-baseline gap-3 mb-8 bg-white/5 p-4 rounded-xl border border-white/5 w-fit">
                            <span className="text-3xl sm:text-4xl font-black text-white">₹1,999</span>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xs text-gray-500 line-through">₹4,999</span>
                                <span className="text-[10px] text-green-400 font-bold uppercase">Launch Offer</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            {['Visiting Cards Design & Print', 'Professional Logo & Branding', 'Premium Website Design'].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 border border-blue-500/20">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleCta}
                        className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)] group relative overflow-hidden"
                    >
                        <span className="relative z-10">Get Your Kit Now</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>

                    <p className="text-center text-[10px] text-gray-600 mt-5 uppercase tracking-widest font-bold">Limited Payment • No Hidden Fees</p>
                </div>
            </div>
        </div>
    );
}

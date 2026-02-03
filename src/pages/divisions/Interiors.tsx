import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import {
    ArrowRight,
    Check,
    ChevronLeft,
    Layout,
    Home,
    Armchair,
    PenTool,
    Sun,
    Zap,
    PaintBucket,
    Grid3X3,
    Loader2,
    CheckCircle,
    MapPin,
    Phone,
    Mail,
    User,
    BedDouble,
    UtensilsCrossed,
    Bath,
    MessageCircle,
    ChevronUp,
    ChevronDown,
    Palette,
    Monitor,
    Clock,
    Users,
    Briefcase,
    HelpCircle,
    Star,
    ArrowUpRight
} from 'lucide-react';

// --- Types (Shared) ---
type IntentType = 'Room-Wise' | 'Full Home' | null;
type TierType = 'Standard' | 'Luxury' | 'Tailorcraft';
type PropertyType = 'Apartment' | 'Villa' | 'Commercial' | '';
type ConfigurationType = '1BHK' | '2BHK' | '3BHK' | '4BHK+' | '';

interface QuoteFormData {
    intent: IntentType;
    selectedRooms: string[];
    selectedTier: TierType | null;
    addOns: string[];
    propertyType: PropertyType;
    configuration: ConfigurationType;
    location: string;
    name: string;
    email: string;
    phone: string;
    callbackRequested?: boolean;
}

// --- Custom Select Component (Shared) ---
const CustomSelect = ({ options, value, onChange, placeholder, icon: Icon }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white/5 border ${isOpen ? 'border-orange-500 ring-1 ring-orange-500' : 'border-white/10 hover:border-white/30'} rounded-xl px-4 py-3 text-white cursor-pointer flex items-center justify-between transition-all`}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="text-gray-500" size={18} />}
                    <span className={!value ? 'text-gray-400' : 'text-white'}>
                        {value || placeholder}
                    </span>
                </div>
                {isOpen ? <ChevronUp size={18} className="text-orange-500" /> : <ChevronDown size={18} className="text-gray-500" />}
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto custom-scrollbar">
                    {options.map((opt: string) => (
                        <div
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-3 cursor-pointer transition-colors flex items-center justify-between ${value === opt ? 'bg-orange-900/20 text-orange-400' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                            {opt}
                            {value === opt && <Check size={16} className="text-orange-500" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Data (Quote Generator) ---
const ROOM_OPTIONS = [
    { id: 'Wall Paneling & Decor', icon: PaintBucket, desc: 'Textured, Louvers, Stone' },
    { id: 'Living Room Revamp', icon: Armchair, desc: 'TV Unit, Foyer, Seating' },
    { id: 'Bedroom Revamp', icon: BedDouble, desc: 'Wardrobes, Bed Back, Side Tables' },
    { id: 'Kitchen Revamp', icon: UtensilsCrossed, desc: 'Modular Shutters, Hardware' },
    { id: 'Balcony Makeover', icon: Sun, desc: 'Flooring, Green Walls, Lighting' },
    { id: 'Bathroom Makeover', icon: Bath, desc: 'Vanities, Partitions, Fixtures' },
];

const TIER_OPTIONS = [
    {
        id: 'Standard',
        title: 'Standard',
        desc: 'Smart, functional, and budget-friendly.',
        gradient: 'from-blue-600 to-cyan-500'
    },
    {
        id: 'Luxury',
        title: 'Luxury',
        desc: 'Premium finishes, designer aesthetics, and high-end hardware.',
        gradient: 'from-purple-600 to-pink-500'
    },
    {
        id: 'Tailorcraft',
        title: 'Tailorcraft',
        desc: '100% bespoke, signature materials, and architectural exclusivity.',
        gradient: 'from-amber-500 to-orange-600'
    }
];

const ADDON_OPTIONS = [
    'False Ceiling & Lighting',
    'Electrical & Home Automation',
    'Custom Woodwork (Carpentry & Modular)',
    'Professional Painting & Textures',
    'Glass & Mirror Work',
    'Tiles, Granite & Marble Flooring'
];

const LOCATIONS = [
    'Jubilee Hills', 'Banjara Hills', 'Gachibowli', 'Kokapet', 'Hitech City',
    'Madhapur', 'Kondapur', 'Manikonda', 'Begumpet', 'Secunderabad', 'Other'
];

// --- OLD COMPOENT: QuoteGenerator (Embedded) ---
function QuoteGenerator() {
    const [phase, setPhase] = useState(1);
    const [direction, setDirection] = useState(0); // 1 = next, -1 = back
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState<QuoteFormData>({
        intent: null,
        selectedRooms: [],
        selectedTier: null,
        addOns: [],
        propertyType: '',
        configuration: '',
        location: '',
        name: '',
        email: '',
        phone: ''
    });

    const topRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (phase > 1) {
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [phase]);

    const handleNext = () => {
        if (phase === 1 && !formData.intent) return alert('Please select an option to proceed.');
        if (phase === 2) {
            if (formData.intent === 'Room-Wise' && formData.selectedRooms.length === 0) return alert('Please select at least one zone.');
            if (formData.intent === 'Full Home' && !formData.selectedTier) return alert('Please select a lifestyle tier.');
        }
        if (phase === 4) {
            if (!formData.propertyType || !formData.configuration || !formData.location || !formData.name || !formData.email || !formData.phone) {
                return alert('Please fill in all details.');
            }
        }

        setDirection(1);
        setPhase(prev => prev + 1);
    };

    const handleBack = () => {
        setDirection(-1);
        setPhase(prev => prev - 1);
    };

    const toggleRoom = (id: string) => {
        setFormData(prev => ({
            ...prev,
            selectedRooms: prev.selectedRooms.includes(id)
                ? prev.selectedRooms.filter(r => r !== id)
                : [...prev.selectedRooms, id]
        }));
    };

    const toggleAddOn = (id: string) => {
        setFormData(prev => ({
            ...prev,
            addOns: prev.addOns.includes(id)
                ? prev.addOns.filter(a => a !== id)
                : [...prev.addOns, id]
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email || !formData.phone) return alert('Contact details are required.');

        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const payload = {
                full_name: formData.name,
                email: formData.email,
                phone: formData.phone,
                property_type: formData.propertyType,
                configuration: formData.configuration,
                location: formData.location,
                intent_type: formData.intent,
                selected_items: formData.intent === 'Room-Wise' ? formData.selectedRooms : [formData.selectedTier],
                core_services: formData.addOns,
                status: 'new'
            };

            const { error } = await supabase.from('interior_quotes' as any).insert([payload]);

            if (error) throw error;

            const descriptionParts = [
                `Property: ${formData.configuration} ${formData.propertyType}`,
                `Location: ${formData.location}`,
                formData.intent === 'Room-Wise' ? `Selected Rooms: ${formData.selectedRooms.join(', ')}` : '',
                formData.addOns.length > 0 ? `Add-ons: ${formData.addOns.join(', ')}` : '',
                formData.callbackRequested ? 'Immediate Callback Requested' : ''
            ].filter(Boolean).join('. ');

            await supabase.functions.invoke('send-interior-quote-email', {
                body: {
                    email: formData.email,
                    name: formData.name,
                    intent: formData.intent,
                    budgetTier: formData.selectedTier || 'N/A',
                    timeline: 'To be discussed',
                    projectDescription: descriptionParts || 'No additional details provided.'
                }
            });

            setSubmissionSuccess(true);
            setPhase(5);
        } catch (err: any) {
            console.error('Submission error:', err);
            setErrorMsg(err.message || 'Failed to submit quote. Please try again.');
            setIsSubmitting(false);
        }
    };

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 })
    };

    return (
        <div className="w-full bg-black/40 backdrop-blur-2xl border border-white/10 text-white py-12 overflow-hidden font-sans rounded-[3rem] relative shadow-2xl ring-1 ring-white/5">
            <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 relative z-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3 tracking-wider uppercase">
                        Powered by Urban Elegance Interiors
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-100 to-orange-200 mb-2 font-poppins tracking-tight">
                        Estimate Your Project
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                        Get a quick ballpark figure and design guide tailored to your needs.
                    </p>
                </div>

                {!submissionSuccess && (
                    <div className="max-w-3xl mx-auto mb-8">
                        <div className="flex justify-between text-sm font-medium text-gray-500 mb-4 px-2">
                            <span className={phase >= 1 ? 'text-orange-400' : ''}>Intent</span>
                            <span className={phase >= 2 ? 'text-orange-400' : ''}>Selection</span>
                            <span className={phase >= 3 ? 'text-orange-400' : ''}>Add-Ons</span>
                            <span className={phase >= 4 ? 'text-orange-400' : ''}>Details</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                                initial={{ width: '0%' }}
                                animate={{ width: `${(phase / 4) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>
                        </div>
                    </div>
                )}

                <div ref={topRef} className="max-w-4xl mx-auto min-h-[auto]">
                    <AnimatePresence custom={direction} mode="wait">
                        {phase === 1 && (
                            <motion.div key="phase1" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { id: 'Room-Wise', title: 'Room-Wise Revamp', desc: 'Quick upgrades for specific spaces.', icon: Layout, gradient: 'from-blue-600/30 to-cyan-600/30', border: 'hover:border-blue-400' },
                                    { id: 'Full Home', title: 'Full Home Packages', desc: 'End-to-end solutions for new homes.', icon: Home, gradient: 'from-orange-600/30 to-amber-600/30', border: 'hover:border-orange-400' }
                                ].map((option) => (
                                    <div key={option.id} onClick={() => setFormData(prev => ({ ...prev, intent: option.id as IntentType }))} className={`relative p-6 md:p-8 rounded-[2rem] border transition-all duration-500 cursor-pointer group overflow-hidden backdrop-blur-xl ${formData.intent === option.id ? `border-${option.gradient.includes('orange') ? 'orange' : 'blue'}-500 bg-white/10 shadow-[0_0_50px_rgba(249,115,22,0.2)] scale-[1.02]` : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ' + option.border}`}>
                                        <div className="flex flex-col items-center text-center h-full justify-center">
                                            <option.icon className="text-white mb-4" size={40} />
                                            <h3 className="text-xl font-bold text-white mb-1">{option.title}</h3>
                                            <p className="text-gray-400 text-sm mb-4">{option.desc}</p>
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${formData.intent === option.id ? 'bg-white border-white' : 'border-gray-500'}`}>
                                                {formData.intent === option.id && <Check className="text-black" size={16} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                        {phase === 2 && (
                            <motion.div key="phase2" custom={direction} variants={variants} initial="enter" animate="center" exit="exit">
                                <h2 className="text-2xl font-bold text-center mb-6">{formData.intent === 'Room-Wise' ? 'Select Spaces' : 'Lifestyle Tier'}</h2>
                                {formData.intent === 'Room-Wise' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {ROOM_OPTIONS.map((room) => (
                                            <div key={room.id} onClick={() => toggleRoom(room.id)} className={`p-4 rounded-xl border cursor-pointer text-center ${formData.selectedRooms.includes(room.id) ? 'bg-orange-500/20 border-orange-500 text-orange-200' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                                <room.icon className="mx-auto mb-2" size={24} />
                                                <span className="font-semibold block text-sm">{room.id}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {TIER_OPTIONS.map((tier) => (
                                            <div key={tier.id} onClick={() => setFormData(prev => ({ ...prev, selectedTier: tier.id as TierType }))} className={`p-6 rounded-2xl border cursor-pointer ${formData.selectedTier === tier.id ? 'bg-white/10 border-white' : 'bg-white/5 border-white/10'}`}>
                                                <h3 className="font-bold text-lg mb-1">{tier.title}</h3>
                                                <p className="text-xs text-gray-400 mb-3">{tier.desc}</p>
                                                {formData.selectedTier === tier.id && <Check className="text-orange-500" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {phase === 3 && (
                            <motion.div key="phase3" custom={direction} variants={variants} initial="enter" animate="center" exit="exit">
                                <h2 className="text-2xl font-bold text-center mb-6">Enhancements</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {ADDON_OPTIONS.map((addon) => (
                                        <div key={addon} onClick={() => toggleAddOn(addon)} className={`p-4 rounded-xl border cursor-pointer flex justify-between ${formData.addOns.includes(addon) ? 'bg-amber-500/10 border-amber-500' : 'bg-white/5 border-white/10'}`}>
                                            <span>{addon}</span>
                                            {formData.addOns.includes(addon) && <Check size={18} className="text-amber-500" />}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {phase === 4 && (
                            <motion.div key="phase4" custom={direction} variants={variants} initial="enter" animate="center" exit="exit">
                                <h2 className="text-2xl font-bold text-center mb-6">Project Details</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <CustomSelect options={['Apartment', 'Villa', 'Commercial']} value={formData.propertyType} onChange={(v: any) => setFormData(prev => ({ ...prev, propertyType: v }))} placeholder="Property Type" icon={Home} />
                                        <CustomSelect options={['1BHK', '2BHK', '3BHK', '4BHK+', 'Villa']} value={formData.configuration} onChange={(v: any) => setFormData(prev => ({ ...prev, configuration: v }))} placeholder="Configuration" icon={Grid3X3} />
                                        <CustomSelect options={LOCATIONS} value={formData.location} onChange={(v: any) => setFormData(prev => ({ ...prev, location: v }))} placeholder="Location" icon={MapPin} />
                                    </div>
                                    <div className="space-y-4">
                                        <input type="text" value={formData.name} onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" />
                                        <input type="email" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" />
                                        <input type="tel" value={formData.phone} onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="Phone" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" />
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={formData.callbackRequested} onChange={() => setFormData(prev => ({ ...prev, callbackRequested: !prev.callbackRequested }))} className="w-4 h-4 rounded text-orange-500" />
                                            <span className="text-sm text-gray-400">Request Immediate Callback</span>
                                        </label>
                                    </div>
                                </div>
                                {errorMsg && <p className="text-red-400 text-center mt-4">{errorMsg}</p>}
                            </motion.div>
                        )}
                        {phase === 5 && (
                            <motion.div key="phase5" className="text-center py-20">
                                <CheckCircle className="text-green-500 lg:w-20 lg:h-20 w-16 h-16 mx-auto mb-6" />
                                <h2 className="text-3xl font-bold mb-4">Request Sent!</h2>
                                <p className="text-gray-400">Thanks, {formData.name}. We'll be in touch soon.</p>
                                <button onClick={() => window.location.reload()} className="mt-8 px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition">New Quote</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {!submissionSuccess && (
                    <div className="flex justify-between mt-8">
                        <button onClick={handleBack} disabled={phase === 1} className={`px-6 py-3 rounded-xl ${phase === 1 ? 'opacity-0' : 'bg-white/5 hover:bg-white/10'}`}>Back</button>
                        {phase < 4 ? (
                            <button onClick={handleNext} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-bold text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300">Next</button>
                        ) : (
                            <button onClick={handleSubmit} disabled={isSubmitting} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl font-bold flex items-center gap-2 text-white shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300">
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Get Quote'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}

// --- NEW COMPONENT: Landing Page ---
export default function Interiors() {
    const [bookForm, setBookForm] = useState({
        name: '', phone: '', location: '', spaceType: '', budget: '', email: ''
    });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleBookSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        try {
            const payload = {
                full_name: bookForm.name,
                phone: bookForm.phone,
                location: bookForm.location,
                property_type: bookForm.spaceType,
                email: bookForm.email || 'no-email@provided.com', // Handle optional email
                selected_items: [`Budget: ${bookForm.budget}`],
                status: 'new_site_visit'
            };

            const { error } = await supabase.from('interior_quotes' as any).insert([payload]);
            if (error) throw error;

            // Send automated email (reuse existing function)
            await supabase.functions.invoke('send-interior-quote-email', {
                body: {
                    email: bookForm.email || 'creators@focsera.com', // Admin or fallback
                    name: bookForm.name,
                    intent: 'Site Visit Request',
                    budgetTier: bookForm.budget,
                    timeline: 'Immediate',
                    projectDescription: `Site visit request for ${bookForm.spaceType} in ${bookForm.location}. Phone: ${bookForm.phone}`
                }
            });

            setFormStatus('success');
        } catch (err) {
            console.error(err);
            setFormStatus('error');
        }
    };

    return (
        <div className="bg-[#030303] text-white font-sans selection:bg-orange-500/30 selection:text-orange-200 relative overflow-x-hidden">
            {/* Cinematic Noise Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            {/* 1. Hero Section + Calculator */}
            <section className="relative min-h-[auto] flex items-center justify-center bg-[#030303] overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24">
                {/* Dark Ambient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>
                <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="text-center mb-12 relative z-20">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-block py-1.5 px-5 rounded-full bg-orange-500/5 border border-orange-500/20 text-orange-400 text-xs font-bold mb-6 tracking-widest uppercase backdrop-blur-md shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                            Fast Interior Concepts
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-6 leading-[1.1] md:leading-[0.9] drop-shadow-2xl">
                            See it. <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Before</span> you build it.
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide">
                            The visual-first interior studio. <span className="text-gray-200 font-medium">Site visit &rarr; Design preview in 24 hours.</span>
                        </p>
                    </div>

                    {/* Integrated Calculator */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full">
                        <QuoteGenerator />
                    </motion.div>

                    <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-400 font-medium">
                        <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> We Design First</span>
                        <span className="flex items-center gap-2"><Users size={16} className="text-blue-500" /> Executed by Partners</span>
                    </div>
                </div>
            </section>

            {/* Removed separate Tool Section */}

            {/* 3. What We Do - Bento Grid Style */}
            <section className="py-20 md:py-32 bg-[#030303] border-y border-white/5 relative">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">What We Do</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">We help you design your space clearly before you spend.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                        {[
                            {
                                icon: PaintBucket,
                                title: "Painting",
                                desc: "Elevate your space with precision painting, bespoke murals, and eco-friendly options. Our team transforms visions into vibrant, timeless interiors.",
                                bg: "bg-white/[0.02]",
                                span: "md:col-span-2"
                            },
                            {
                                icon: BedDouble,
                                title: "Wardrobes",
                                desc: "Discover stylish wardrobes tailored to your space, merging functionality and elegance seamlessly.",
                                bg: "bg-white/[0.02]",
                                span: "md:col-span-1"
                            },
                            {
                                icon: Palette,
                                title: "Furnishing",
                                desc: "Explore curated furnishing collections, blending form and function. Elevate your space with our designer touch.",
                                bg: "bg-white/[0.02]",
                                span: "md:col-span-1"
                            },
                            {
                                icon: Grid3X3,
                                title: "Flooring",
                                desc: "Revitalize your space with exquisite flooring solutions. From timeless hardwood to modern tiles, our designs redefine elegance.",
                                bg: "bg-gradient-to-br from-orange-900/20 to-black",
                                span: "md:col-span-2"
                            },
                            {
                                icon: Armchair,
                                title: "Furniture",
                                desc: "Choose from our range of furniture offerings exclusively customised according to your colour palette.",
                                bg: "bg-white/[0.02]",
                                span: "md:col-span-1"
                            },
                            {
                                icon: Zap,
                                title: "Lighting",
                                desc: "Every space is crafted with meticulous attention to detail, and our captivating lighting arrangements infuse a touch of magic.",
                                bg: "bg-white/[0.02]",
                                span: "md:col-span-2"
                            }
                        ].map((item, i) => (
                            <motion.div whileHover={{ scale: 1.02 }} key={i} className={`${item.bg} ${item.span} p-10 rounded-[2.5rem] border border-white/10 hover:border-orange-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-[0_0_60px_rgba(249,115,22,0.15)] bg-black/40 backdrop-blur-sm`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform duration-500 border border-white/5 relative z-10">
                                    <item.icon size={32} />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-orange-200 transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-base leading-relaxed line-clamp-3">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. 24-Hour Promise - Cinematic Parallax */}
            <section className="py-20 md:py-32 bg-[#030303] relative overflow-hidden text-center md:text-left">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-900/10 to-transparent blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20 relative z-10">
                    <div className="flex-1 order-2 md:order-1">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">The Promise</span>
                            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tighter leading-tight">
                                24-Hour <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-amber-500">Design Preview.</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light">
                                From site visit to concept pack in 24 hours. See your future home’s potential instantly.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    "Personalized Concept Layout",
                                    "Curated Mood & Style Direction",
                                    "Main 3D Hero Visualization"
                                ].map((item, i) => (
                                    <motion.li
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 + 0.3 }}
                                        key={item}
                                        className="flex items-center gap-4 text-xl font-medium text-gray-300 group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-900/20 flex items-center justify-center text-green-400 border border-green-500/20 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                            <Check size={16} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <div className="flex-1 relative order-1 md:order-2 perspective-1000">
                        <motion.div
                            initial={{ transform: "rotateY(-10deg) rotateX(10deg)", opacity: 0 }}
                            whileInView={{ transform: "rotateY(-5deg) rotateX(5deg)", opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="aspect-square relative"
                        >
                            {/* Floating Cards Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-[#050505] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden z-10 transform hover:scale-[1.02] transition-transform duration-500 group">
                                <img
                                    src="/images/interior_render_cinematic.png"
                                    alt="Concept Visual Preview"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                />
                                <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black to-transparent">
                                    <div className="text-2xl font-bold text-white">Concept Visual Preview</div>
                                    <p className="text-orange-400 text-sm font-medium uppercase tracking-wider mt-2">Delivered in 24 Hours</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-white/5 rounded-[2rem] -z-10 transform translate-x-4 translate-y-4 border border-white/5"></div>
                            <div className="absolute inset-0 bg-orange-500/5 rounded-[2rem] -z-20 transform -translate-x-4 -translate-y-4 border border-orange-500/10 blur-sm"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 5. How It Works - Glowing Timeline */}
            <section className="py-20 md:py-32 bg-black text-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">How It Works</h2>
                        <p className="text-gray-400">Seamless. Transparent. Fast.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-[60px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
                            {[
                                { step: "01", title: "Book", desc: "Schedule a free site consultation." },
                                { step: "02", title: "Measure", desc: "Our experts digitize your space." },
                                { step: "03", title: "Preview", desc: "Get your concept in 24 hours." },
                                { step: "04", title: "Build", desc: "Execute with trusted partners." }
                            ].map((s, i) => (
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    key={i}
                                    className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-orange-500/50 hover:bg-white/[0.05] transition-all duration-500 group overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.1)]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-transparent transition-all duration-500"></div>
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-24 h-24 rounded-full bg-[#0a0a0a] border-4 border-[#1a1a1a] group-hover:border-orange-500 flex items-center justify-center text-3xl font-black mb-6 shadow-xl relative transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                                            <span className="text-gray-700 group-hover:text-white transition-colors">{s.step}</span>
                                            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{s.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{s.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Why Choose Us - Gallery Style */}
            <section className="py-20 md:py-32 bg-[#050505] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">Why <br /><span className="text-orange-500">Focsera?</span></h2>
                            <p className="text-2xl text-gray-400 mb-12 font-light leading-relaxed">
                                We bring <span className="text-white font-medium">cinematic visual quality</span> to interior design. No guesswork, just clarity.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { title: "Visual-First", desc: "See exactly what you get." },
                                    { title: "Tech-Driven", desc: "Founded by creative technologists." },
                                    { title: "Speed", desc: "Concepts in 24 hours, not weeks." },
                                    { title: "Transparency", desc: "Design first, spend later." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-6 group p-4 -ml-4 rounded-2xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(249,115,22,0.2)]">
                                            <Star className="text-gray-500 group-hover:text-orange-500 transition-colors" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-orange-200 transition-colors">{item.title}</h4>
                                            <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Abstract Visual Gallery */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-[3rem] blur-3xl opacity-30"></div>
                            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl rotate-3 hover:rotate-0 transition-all duration-700 shadow-2xl">
                                <div className="aspect-[4/5] bg-[#111] rounded-2xl overflow-hidden border border-white/5 relative group">
                                    <img src="/images/interior_render_cinematic.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" alt="Visuals" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 font-bold text-white opacity-100 transition-opacity">Visuals</div>
                                </div>
                                <div className="aspect-[4/5] bg-[#151515] rounded-2xl overflow-hidden border border-white/5 mt-12 relative group">
                                    <img src="/images/interior_floor_plan_stylized.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" alt="Plans" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 font-bold text-white opacity-100 transition-opacity">Plans</div>
                                </div>
                                <div className="aspect-[4/5] bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 -mt-12 relative group">
                                    <img src="/images/interior_mood_board_aesthetic.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" alt="Moods" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 font-bold text-white opacity-100 transition-opacity">Moods</div>
                                </div>
                                <div className="aspect-[4/5] bg-[#222] rounded-2xl overflow-hidden border border-white/5 relative group">
                                    <img src="/images/interior_detail_texture_macro.png" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" alt="Details" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 font-bold text-white opacity-100 transition-opacity">Details</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Book Visit Form REMOVED (Redundant with Calculator) */}

            {/* 8. WhatsApp & FAQ */}
            <section className="py-24 bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-6 space-y-32">
                    {/* WhatsApp CTA - Ultra Premium */}
                    <div className="text-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter relative z-10">
                            Ready to see <span className="text-green-500 font-serif italic">your</span> home?
                        </h3>
                        <a href="https://wa.me/919515803954" className="inline-flex items-center gap-4 px-10 py-5 bg-[#25D366] text-white rounded-full font-bold text-xl shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:scale-105 transition-all duration-300 relative z-10">
                            <MessageCircle size={28} />
                            <span>Chat on WhatsApp</span>
                        </a>
                        <p className="text-gray-500 mt-6 text-sm uppercase tracking-widest">Instant Response • No Commitments</p>
                    </div>

                    {/* FAQs - Clean Accordion Look */}
                    <div>
                        <h3 className="text-3xl font-bold mb-12 text-center text-white tracking-tight">Common Questions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { q: "Do you execute projects?", a: "Yes. We design first, then our verified local partners handle execution with our supervision." },
                                { q: "How fast is the design?", a: "You get the initial visual concept pack within 24 hours of the site visit." },
                                { q: "Is the site visit free?", a: "Absolutely. 100% free site consultation within our active zones." },
                                { q: "Can I just get the design?", a: "Yes. We offer design-only packages if you have your own contractor." }
                            ].map((faq, i) => (
                                <div key={i} className="p-8 bg-white/[0.03] rounded-3xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                                    <h4 className="font-bold text-lg mb-3 text-white">{faq.q}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Founder Note (Simplified) */}
                    <div className="text-center pt-16 border-t border-white/5">
                        <p className="font-serif italic text-2xl text-gray-500 mb-6">
                            "Visual clarity is the ultimate luxury."
                        </p>
                        <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] opacity-40">Powered by Urban Elegance Interiors</p>
                    </div>
                </div>
            </section>

            {/* Floating WhatsApp */}
            <div className="fixed bottom-6 right-6 z-50">
                <a href="https://wa.me/919515803954" target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                    <MessageCircle className="text-white" size={28} />
                </a>
            </div>
        </div >
    );
}

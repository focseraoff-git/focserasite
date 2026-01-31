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
    Lamp,
    Zap,
    Hammer,
    PaintBucket,
    Maximize,
    Grid3X3,
    Loader2,
    CheckCircle,
    MapPin,
    Building2,
    Phone,
    Mail,
    User,
    BedDouble,
    UtensilsCrossed,
    Bath,
    Sun,
    MessageCircle,
    ChevronUp,
    ChevronDown
} from 'lucide-react';

// --- Types ---
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

// --- Custom Select Component ---
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

// --- Data ---
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

export default function Interiors() {
    // --- State ---
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
        // Scroll to top on phase change
        if (phase > 1) {
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [phase]);

    // --- Handlers ---
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

            // Construct a comprehensive project description
            const descriptionParts = [
                `Property: ${formData.configuration} ${formData.propertyType}`,
                `Location: ${formData.location}`,
                formData.intent === 'Room-Wise' ? `Selected Rooms: ${formData.selectedRooms.join(', ')}` : '',
                formData.addOns.length > 0 ? `Add-ons: ${formData.addOns.join(', ')}` : '',
                formData.callbackRequested ? 'Immediate Callback Requested' : ''
            ].filter(Boolean).join('. ');

            // Send automated email
            await supabase.functions.invoke('send-interior-quote-email', {
                body: {
                    email: formData.email,
                    name: formData.name,
                    intent: formData.intent,
                    budgetTier: formData.selectedTier || 'N/A', // Mapped from selectedTier
                    timeline: 'To be discussed', // Default value as we don't collect this yet
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

    // --- Animations ---
    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -50 : 50,
            opacity: 0
        })
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-20 overflow-hidden font-sans">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                {/* Header */}
                <div className="text-center mb-16 pt-10 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-200 via-amber-100 to-orange-400 mb-4 md:mb-6 tracking-tighter drop-shadow-2xl px-2">
                            Focsera Interiors
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-8 md:mb-10 px-4">
                            Transforming spaces into living masterpieces.
                        </p>

                        {/* --- Powered By Tag --- */}
                        <div className="mb-12">
                            <span className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-400 tracking-wide">
                                Powered by <span className="text-orange-400">Urban Elegance Interiors</span>
                            </span>
                        </div>
                    </motion.div>
                </div>



                {/* --- NEW: Floating CTA --- */}
                <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col gap-3 md:gap-4">
                    <a href="https://wa.me/919515803954" target="_blank" rel="noreferrer" className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-900/20 hover:scale-110 active:scale-95 transition-transform">
                        <MessageCircle size={24} className="text-white md:w-7 md:h-7" />
                    </a>
                    <a href="tel:+919515803954" className="w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-900/20 hover:scale-110 active:scale-95 transition-transform animate-bounce-slow">
                        <Phone size={24} className="text-white md:w-7 md:h-7" />
                    </a>
                </div>

                {/* Progress Bar */}
                {!submissionSuccess && (
                    <div className="max-w-3xl mx-auto mb-12">
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

                {/* Main Content Area */}
                <div ref={topRef} className="max-w-4xl mx-auto min-h-[500px]">
                    <AnimatePresence custom={direction} mode="wait">

                        {/* PHASE 1: ENTRY GATE */}
                        {phase === 1 && (
                            <motion.div
                                key="phase1"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                {[
                                    { id: 'Room-Wise', title: 'Room-Wise Revamp', desc: 'Quick upgrades for specific spaces. Perfect for refreshing your home’s personality.', icon: Layout, gradient: 'from-blue-600/30 to-cyan-600/30', border: 'hover:border-blue-400' },
                                    { id: 'Full Home', title: 'Full Home Packages', desc: 'Comprehensive end-to-end interior solutions for new homes or total renovations.', icon: Home, gradient: 'from-orange-600/30 to-amber-600/30', border: 'hover:border-orange-400' }
                                ].map((option) => (
                                    <div
                                        key={option.id}
                                        onClick={() => setFormData(prev => ({ ...prev, intent: option.id as IntentType }))}
                                        className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer group overflow-hidden backdrop-blur-xl ${formData.intent === option.id ? `border-${option.gradient.includes('orange') ? 'orange' : 'blue'}-500 bg-white/10 shadow-2xl` : 'border-white/5 bg-white/5 hover:bg-white/10 hover:scale-[1.02] ' + option.border}`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                                        <div className="relative z-10 flex flex-col items-center text-center h-full justify-center">
                                            <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center mb-8 backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/10">
                                                <option.icon className="text-white drop-shadow-lg" size={48} />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{option.title}</h3>
                                            <p className="text-gray-300 leading-relaxed max-w-sm text-lg font-light">{option.desc}</p>

                                            <div className={`mt-10 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${formData.intent === option.id ? 'bg-white border-white scale-110' : 'border-gray-500 group-hover:border-white'}`}>
                                                {formData.intent === option.id && <Check className="text-black" size={20} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {/* PHASE 2: SELECTION ENGINE */}
                        {phase === 2 && (
                            <motion.div
                                key="phase2"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-3xl font-bold text-center mb-2">
                                    {formData.intent === 'Room-Wise' ? 'Select Your Spaces' : 'Choose Your Lifestyle Tier'}
                                </h2>
                                <p className="text-center text-gray-400 mb-10">Customize your package to fit your needs.</p>

                                {formData.intent === 'Room-Wise' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                        {ROOM_OPTIONS.map((room) => (
                                            <div
                                                key={room.id}
                                                onClick={() => toggleRoom(room.id)}
                                                className={`group relative p-6 h-48 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-4 text-center overflow-hidden ${formData.selectedRooms.includes(room.id) ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]' : 'bg-white/5 border-white/10 hover:border-orange-400/50 hover:bg-white/10'}`}
                                            >
                                                {/* Selection Indicator */}
                                                <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.selectedRooms.includes(room.id) ? 'bg-orange-500 border-orange-500 scale-110' : 'border-white/20'}`}>
                                                    {formData.selectedRooms.includes(room.id) && <Check className="text-white" size={14} />}
                                                </div>

                                                <div className={`p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 ${formData.selectedRooms.includes(room.id) ? 'bg-orange-500/20 text-orange-200' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                                    <room.icon size={32} strokeWidth={1.5} />
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-lg text-white leading-tight mb-1 tracking-tight">{room.id}</h4>
                                                    <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors font-medium">{room.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {TIER_OPTIONS.map((tier) => (
                                            <div
                                                key={tier.id}
                                                onClick={() => setFormData(prev => ({ ...prev, selectedTier: tier.id as TierType }))}
                                                className={`relative p-8 rounded-3xl border transition-all cursor-pointer overflow-hidden ${formData.selectedTier === tier.id ? 'border-transparent scale-105 shadow-2xl shadow-orange-900/40' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                                            >
                                                {formData.selectedTier === tier.id && (
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-20`}></div>
                                                )}
                                                <div className="relative z-10">
                                                    <h3 className={`text-2xl font-bold mb-4 ${formData.selectedTier === tier.id ? 'text-white' : 'text-gray-300'}`}>{tier.title}</h3>
                                                    <p className="text-gray-400 leading-relaxed text-sm mb-6">{tier.desc}</p>
                                                    <div className="flex justify-center">
                                                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${formData.selectedTier === tier.id ? 'bg-white border-white' : 'border-gray-600'}`}>
                                                            {formData.selectedTier === tier.id && <Check className="text-black" size={16} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* PHASE 3: ADD-ONS */}
                        {phase === 3 && (
                            <motion.div
                                key="phase3"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <h2 className="text-3xl font-bold text-center mb-2">Service Enhancements</h2>
                                <p className="text-center text-gray-400 mb-10">Select core services to be included in your quote.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {ADDON_OPTIONS.map((addon) => (
                                        <div
                                            key={addon}
                                            onClick={() => toggleAddOn(addon)}
                                            className={`p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${formData.addOns.includes(addon) ? 'bg-amber-500/10 border-amber-500/50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                        >
                                            <span className="font-medium text-gray-200">{addon}</span>
                                            <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.addOns.includes(addon) ? 'bg-amber-500' : 'bg-gray-700'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${formData.addOns.includes(addon) ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* PHASE 4: DETAILS */}
                        {phase === 4 && (
                            <motion.div
                                key="phase4"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <h2 className="text-3xl font-bold text-center mb-10">Final Steps</h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    {/* Property Details */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 text-orange-400">
                                            <Home size={20} /> Property Details
                                        </h3>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Property Type</label>
                                            <div className="flex gap-3">
                                                {['Apartment', 'Villa', 'Commercial'].map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => setFormData(prev => ({ ...prev, propertyType: type as PropertyType }))}
                                                        className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium border transition-all ${formData.propertyType === type ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                                    >
                                                        {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Configuration</label>
                                            <CustomSelect
                                                options={['1BHK', '2BHK', '3BHK', '4BHK+', 'Villa/Independent House', 'Other']}
                                                value={formData.configuration}
                                                onChange={(val: any) => setFormData(prev => ({ ...prev, configuration: val as ConfigurationType }))}
                                                placeholder="Select Configuration"
                                                icon={Grid3X3}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Location (Hyderabad Area)</label>
                                            <CustomSelect
                                                options={LOCATIONS}
                                                value={formData.location}
                                                onChange={(val: any) => setFormData(prev => ({ ...prev, location: val }))}
                                                placeholder="Select Area"
                                                icon={MapPin}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold flex items-center gap-2 text-amber-400">
                                            <User size={20} /> Your Details
                                        </h3>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                    placeholder="Ajay Kumar"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    placeholder="you@example.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-3.5 text-gray-500" size={18} />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="+91 98765 43210"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                                                />
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => setFormData(prev => ({ ...prev, callbackRequested: !prev.callbackRequested }))}
                                            className="flex items-center gap-4 pt-4 cursor-pointer group"
                                        >
                                            <div className={`w-6 h-6 rounded-lg border transition-all duration-300 flex items-center justify-center ${formData.callbackRequested ? 'bg-orange-500 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/5 border-white/20 group-hover:border-orange-500/50'}`}>
                                                {formData.callbackRequested && <Check className="text-white" size={16} />}
                                            </div>
                                            <span className={`text-sm font-medium transition-colors ${formData.callbackRequested ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                                Request <span className="text-orange-400">immediate callback</span>?
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {errorMsg && (
                                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
                                        {errorMsg}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* PHASE 5: SUCCESS */}
                        {phase === 5 && (
                            <motion.div
                                key="phase5"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center py-20"
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-900/50">
                                    <CheckCircle className="text-white" size={48} />
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-6">Quote Request Received!</h2>
                                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                                    Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our design team has received your project details and will be in touch shortly with your estimated quote and design guide.
                                </p>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-lg mx-auto mb-10 text-left">
                                    <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-4">Request Summary</h4>
                                    <div className="space-y-2 text-gray-300">
                                        <p><span className="text-gray-500">Intent:</span> {formData.intent}</p>
                                        {formData.intent === 'Room-Wise' ? (
                                            <p><span className="text-gray-500">Rooms:</span> {formData.selectedRooms.join(', ')}</p>
                                        ) : (
                                            <p><span className="text-gray-500">Lifestyle Tier:</span> {formData.selectedTier}</p>
                                        )}
                                        <p><span className="text-gray-500">Add-Ons:</span> {formData.addOns.length > 0 ? formData.addOns.join(', ') : 'None'}</p>
                                        <p><span className="text-gray-500">Location:</span> {formData.location}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-colors"
                                >
                                    Start New Quote
                                </button>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                {!submissionSuccess && (
                    <div className="mt-16 flex justify-between items-center max-w-4xl mx-auto">
                        <button
                            onClick={handleBack}
                            disabled={phase === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${phase === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <ChevronLeft size={20} /> Back
                        </button>

                        {phase < 4 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-900/30 transition-all hover:scale-105"
                            >
                                Next Step <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-orange-900/30 transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
                                Get My Estimated Quote & Design Guide
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}

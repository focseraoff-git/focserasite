import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Phone, Mail, Clock, AlertCircle, ArrowRight, ArrowLeft, Sparkles, CheckSquare, Square, Brush, Sofa, Hammer, Grid, Lightbulb, Wrench } from 'lucide-react';

const TIME_SLOTS = [
    'Morning (9AM - 12PM)',
    'Afternoon (12PM - 4PM)',
    'Evening (4PM - 7PM)',
    'Full Day (9AM - 7PM)'
];

const INTERIOR_SERVICES = [
    { id: 'painting', label: 'Painting', icon: <Brush /> },
    { id: 'furnishing', label: 'Furnishing', icon: <Sofa /> },
    { id: 'flooring', label: 'Flooring', icon: <Grid /> },
    { id: 'wardrobes', label: 'Wardrobes', icon: '🚪' },
    { id: 'tiles', label: 'Tiles', icon: <Grid /> },
    { id: 'false_ceiling', label: 'False Ceiling', icon: <Hammer /> },
    { id: 'electrical', label: 'Electrical', icon: <Lightbulb /> },
    { id: 'plumbing', label: 'Plumbing', icon: <Wrench /> }
];

const CELEBRATION_SERVICES = [
    { id: 'photography', label: 'Photography', icon: '📸' },
    { id: 'videography', label: 'Videography', icon: '🎥' },
    { id: 'reels', label: 'Reels / Shorts', icon: '📱' },
    { id: 'drone', label: 'Drone Coverage', icon: '🚁' },
    { id: 'styling', label: 'Event Styling', icon: '✨' },
    { id: 'decoration', label: 'Decoration', icon: '🎀' },
    { id: 'editing', label: 'Editing', icon: '🎬' },
    { id: 'album', label: 'Photo Album', icon: '📒' }
];

// Dream Space now includes EVERYTHING: Interiors + Celebration (Events/Studios)
const DREAM_SPACE_SERVICES = [...INTERIOR_SERVICES, ...CELEBRATION_SERVICES];

interface LocationState {
    packageType: 'Dream Space' | 'Celebration';
    tier: 'Lite' | 'Standard' | 'Premium' | 'Custom';
    category: 'dream' | 'celebration';
}

export default function PackageBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

    // Ultra-Smooth "Apple-like" Cubic Bezier Easing
    const smoothEase = [0.23, 1, 0.32, 1] as any;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '', // For both packages
        preferredDate: '', // Optional for both
        spaceType: '', // For Dream Space: 'home' or 'business'
        eventType: '', // For Celebration: 'birthday', 'anniversary', etc.
        notes: '', // Combined special requirements and notes
        selectedServices: [] as string[] // For Custom tier
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Redirect if no package selected
    useEffect(() => {
        if (!state || !state.packageType || !state.tier) {
            navigate('/', { replace: true });
        }
    }, [state, navigate]);

    if (!state) return null;

    const currentServices = state.packageType === 'Dream Space' ? DREAM_SPACE_SERVICES : CELEBRATION_SERVICES;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const toggleService = (serviceId: string) => {
        setFormData(prev => {
            const current = prev.selectedServices;
            const updated = current.includes(serviceId)
                ? current.filter(id => id !== serviceId)
                : [...current, serviceId];
            return { ...prev, selectedServices: updated };
        });
        if (errors.selectedServices) {
            setErrors(prev => ({ ...prev, selectedServices: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Phone must be 10 digits';
        }
        if (!formData.location.trim()) newErrors.location = 'Location is required';

        // Package-specific validation
        if (state.packageType === 'Dream Space' && !formData.spaceType) {
            newErrors.spaceType = 'Please select space type (Home or Business)';
        }
        if (state.packageType === 'Celebration' && !formData.eventType) {
            newErrors.eventType = 'Please select event type';
        }

        // Custom Tier Validation
        if (state.tier === 'Custom' && formData.selectedServices.length === 0) {
            newErrors.selectedServices = 'Please select at least one service';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Navigate to review screen with all data
            navigate('/booking/review', {
                state: {
                    ...state,
                    formData
                }
            });
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message');
            firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const spaceTypes = [
        { id: 'home', label: 'Home', desc: 'Houses, Villas, Apartments', icon: '🏠' },
        { id: 'business', label: 'Business', desc: 'Stores, Offices, Restaurants', icon: '🏢' }
    ];

    const eventTypes = [
        { id: 'birthday', label: 'Birthday', icon: '🎂' },
        { id: 'anniversary', label: 'Anniversary', icon: '💑' },
        { id: 'family', label: 'Family Event', icon: '👨‍👩‍👧‍👦' },
        { id: 'milestone', label: 'Milestone', icon: '🎉' },
        { id: 'other', label: 'Other Celebration', icon: '🎊' }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-20 relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-500/20 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                            scale: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            {/* Gradient Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: smoothEase }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6"
                    >
                        <Sparkles size={14} />
                        <span>Complete Your Booking</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: smoothEase }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent px-2"
                    >
                        {state.packageType} Package
                    </motion.h1>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg"
                    >
                        <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Selected Tier:</span>
                        <span className="text-white text-lg font-black">{state.tier}</span>
                    </motion.div>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
                    onSubmit={handleSubmit}
                    className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 space-y-8 md:space-y-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
                    {/* Personal Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        <h3 className="text-xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10">
                                <User size={20} />
                            </div>
                            <span className="bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent">Personal Information</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <label className="block text-sm font-semibold text-gray-400 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-gray-600`}
                                    placeholder="Your name"
                                />
                                {errors.name && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.name}</p>}
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                <label className="block text-sm font-semibold text-gray-400 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all placeholder:text-gray-600 font-mono`}
                                    placeholder="+91 XXXXXXXXXX"
                                />
                                {errors.phone && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.phone}</p>}
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="md:col-span-2">
                                <div className="group">
                                    <label className="block text-sm font-semibold text-gray-400 mb-2 group-focus-within:text-blue-400 transition-colors">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300`}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.email}</p>}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Checkbox Grid for Custom Package */}
                    {state.tier === 'Custom' && (
                        <div className="space-y-6 pt-8 border-t border-white/10">
                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/10">
                                    <CheckSquare size={20} />
                                </div>
                                <span className="bg-gradient-to-r from-white via-indigo-100 to-gray-400 bg-clip-text text-transparent">
                                    Select Services *
                                </span>
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {currentServices.map(service => {
                                    const isSelected = formData.selectedServices.includes(service.id);
                                    return (
                                        <motion.button
                                            key={service.id}
                                            type="button"
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleService(service.id)}
                                            className={`p-4 rounded-2xl border transition-all duration-300 text-center relative overflow-hidden group ${isSelected
                                                ? 'bg-indigo-600/20 border-indigo-500/50 shadow-lg shadow-indigo-500/20'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                                            <div className="relative z-10 flex flex-col items-center gap-2">
                                                <span className="text-2xl mb-1">{service.icon}</span>
                                                <div className={`text-sm font-bold transition-colors ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-indigo-200'}`}>{service.label}</div>
                                                <div className={`absolute top-2 right-2 ${isSelected ? 'text-indigo-400' : 'text-gray-600'}`}>
                                                    {isSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                            {errors.selectedServices && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.selectedServices}</p>}
                        </div>
                    )}


                    {/* Location & Date */}
                    <div className="space-y-6 pt-8 border-t border-white/10">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/10">
                                <MapPin size={20} />
                            </div>
                            <span className="bg-gradient-to-r from-white via-purple-100 to-gray-400 bg-clip-text text-transparent">
                                {state.packageType === 'Dream Space' ? 'Space Details' : 'Event Details'}
                            </span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-400 mb-2">
                                    {state.packageType === 'Dream Space' ? 'Space Location *' : 'Event Venue *'}
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.location ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-4 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600`}
                                    placeholder={state.packageType === 'Dream Space' ? 'e.g., Hyderabad, Banjara Hills' : 'Event location'}
                                />
                                {errors.location && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.location}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-400 mb-2">
                                    Preferred Date (Optional)
                                </label>
                                <input
                                    type="date"
                                    name="preferredDate"
                                    value={formData.preferredDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 [color-scheme:dark]"
                                />
                                <p className="text-xs text-gray-500 mt-2">We'll contact you to confirm the final date and time</p>
                            </div>
                        </div>
                    </div>

                    {/* Space Type Selection (Dream Space only) */}
                    {state.packageType === 'Dream Space' && (
                        <div className="space-y-3 pt-8 border-t border-white/10">
                            <label className="block text-sm font-semibold text-gray-400 mb-3">Space Type *</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {spaceTypes.map(type => (
                                    <motion.button
                                        key={type.id}
                                        type="button"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setFormData(prev => ({ ...prev, spaceType: type.id }))}
                                        className={`p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${formData.spaceType === type.id
                                            ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-500/20'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 transition-opacity duration-500 ${formData.spaceType === type.id ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                                        <div className="relative z-10 flex items-center gap-4 mb-2">
                                            <div className={`p-3 rounded-xl transition-colors ${formData.spaceType === type.id ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400 group-hover:text-blue-400'}`}>
                                                <span className="text-2xl">{type.icon}</span>
                                            </div>
                                            <div className="font-bold text-white text-lg group-hover:text-blue-200 transition-colors">{type.label}</div>
                                        </div>
                                        <div className="relative z-10 text-sm text-gray-400 pl-[4.5rem] group-hover:text-gray-300 transition-colors">{type.desc}</div>
                                    </motion.button>
                                ))}
                            </div>
                            {errors.spaceType && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.spaceType}</p>}
                        </div>
                    )}

                    {/* Event Type Selection (Celebration only) */}
                    {state.packageType === 'Celebration' && (
                        <div className="space-y-3 pt-8 border-t border-white/10">
                            <label className="block text-sm font-semibold text-gray-400 mb-3">Event Type *</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {eventTypes.map(type => (
                                    <motion.button
                                        key={type.id}
                                        type="button"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setFormData(prev => ({ ...prev, eventType: type.id }))}
                                        className={`p-6 rounded-2xl border transition-all duration-300 text-center relative overflow-hidden group ${formData.eventType === type.id
                                            ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition-opacity duration-500 ${formData.eventType === type.id ? 'opacity-100' : 'group-hover:opacity-100'}`} />
                                        <div className="relative z-10 flex flex-col items-center gap-3">
                                            <div className={`p-3 rounded-xl transition-colors ${formData.eventType === type.id ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400 group-hover:text-purple-400'}`}>
                                                <span className="text-2xl">{type.icon}</span>
                                            </div>
                                            <div className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">{type.label}</div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                            {errors.eventType && <p className="error-message text-red-400 text-sm mt-2 flex items-center gap-1"><AlertCircle size={14} />{errors.eventType}</p>}
                        </div>
                    )}

                    {/* Notes / Requirements */}
                    <div className="space-y-3 pt-8 border-t border-white/10">
                        <label className="block text-sm font-semibold text-gray-400">
                            {state.packageType === 'Dream Space' ? 'Additional Details / Requirements' : 'Special Requirements / Notes'}
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-blue-500 focus:outline-none transition-all placeholder:text-gray-600 resize-none"
                            placeholder={state.packageType === 'Dream Space'
                                ? 'Tell us about your space, any specific requirements, budget constraints, etc...'
                                : 'Any specific requests or requirements...'}
                        />
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col-reverse md:flex-row gap-4 pt-8"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02, x: -5 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
                        >
                            <ArrowLeft size={20} />
                            Back
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 transition-all shadow-xl hover:shadow-blue-500/30 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                            <span className="relative z-10 flex items-center gap-2">
                                Review Booking <ArrowRight size={20} />
                            </span>
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import {
    Check, Loader2, AlertCircle, Calendar, MapPin,
    User, Mail, Phone, Edit, CheckCircle2, PartyPopper, Sparkles
} from 'lucide-react';

interface ReviewState {
    packageType: 'Dream Space' | 'Celebration';
    tier: 'Lite' | 'Standard' | 'Premium' | 'Custom';
    category: 'dream' | 'celebration';
    formData: {
        name: string;
        email: string;
        phone: string;
        location: string;
        preferredDate: string;
        spaceType: string;
        eventType: string;
        notes: string;
        selectedServices: string[];
    };
}

// Pricing data (should match migration)
const PRICING = {
    'Dream Space': {
        Lite: 15000,
        Standard: 35000,
        Premium: 65000,
        Custom: 0 // Placeholder
    },
    'Celebration': {
        Lite: 8000,
        Standard: 20000,
        Premium: 45000,
        Custom: 0 // Placeholder
    }
};

const SPACE_TYPE_LABELS: Record<string, { label: string; desc: string; icon: string }> = {
    home: { label: 'Home', desc: 'Houses, Villas, Apartments', icon: '🏠' },
    business: { label: 'Business', desc: 'Stores, Offices, Restaurants', icon: '🏢' }
};

const EVENT_TYPE_LABELS: Record<string, { label: string; icon: string }> = {
    birthday: { label: 'Birthday Party', icon: '🎂' },
    anniversary: { label: 'Anniversary Celebration', icon: '💑' },
    family: { label: 'Family Event', icon: '👨‍👩‍👧‍👦' },
    milestone: { label: 'Milestone Event', icon: '🎉' },
    other: { label: 'Other Celebration', icon: '🎊' }
};

const CUSTOM_SERVICE_LABELS: Record<string, string> = {
    // Dream Space Services
    painting: 'Painting',
    furnishing: 'Furnishing',
    flooring: 'Flooring',
    wardrobes: 'Wardrobes',
    tiles: 'Tiles',
    false_ceiling: 'False Ceiling',
    electrical: 'Electrical',
    plumbing: 'Plumbing',

    // Celebration Services
    photography: 'Photography',
    videography: 'Videography',
    reels: 'Reels / Shorts',
    drone: 'Drone Coverage',
    styling: 'Space Styling',
    decoration: 'Decoration Setup',
    editing: 'Advanced Editing',
    album: 'Photo Album'
};

export default function BookingReview() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as ReviewState;

    // Ultra-Smooth "Apple-like" Cubic Bezier Easing
    const smoothEase = [0.23, 1, 0.32, 1] as any;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [bookingId, setBookingId] = useState<number | null>(null);

    // Redirect if no data
    if (!state || !state.formData) {
        navigate('/', { replace: true });
        return null;
    }

    const { packageType, tier, formData } = state;

    // Calculate pricing
    const basePrice = PRICING[packageType][tier];
    const isCustom = tier === 'Custom';

    const handleEdit = () => {
        navigate('/booking', { state });
    };

    const handleConfirm = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            // 1. Lookup package ID
            const { data: packageData, error: packageError } = await supabase
                .from('premium_packages')
                .select('id')
                .eq('name', packageType)
                .single();

            if (packageError || !packageData) {
                console.error('Package lookup error:', packageError);
                throw new Error('Package not found. Please contact support.');
            }

            // 2. Lookup tier ID
            const { data: tierData, error: tierError } = await supabase
                .from('premium_package_tiers')
                .select('id')
                .eq('package_id', packageData.id)
                .eq('tier_name', tier)
                .single();

            if (tierError || !tierData) {
                console.error('Tier lookup error:', tierError);
                throw new Error('Package tier not found. Please contact support.');
            }

            // 3. Prepare booking payload
            const clientDetails = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            };

            const packageDetails = {
                package_type: packageType,
                tier: tier,
                space_type: formData.spaceType || null,
                event_type: formData.eventType || null,
                location: formData.location,
                preferred_date: formData.preferredDate || null,
                notes: formData.notes,
                base_price: isCustom ? 'To be quoted' : basePrice,
                selected_custom_services: isCustom ? formData.selectedServices : []
            };

            const bookingPayload = {
                package_id: packageData.id,
                tier_id: tierData.id,
                total_price: isCustom ? null : basePrice, // Store null for custom quotes
                event_date: formData.preferredDate || null,
                event_venue: formData.location,
                client_details: clientDetails,
                package_details: packageDetails,
                selected_addons: isCustom ? formData.selectedServices : null, // Storing custom services in addons/JSONB if available
                special_requirements: formData.notes,
                status: 'new',
                user_id: null // Implicitly handled if needed, or null for guest
            };

            // 4. Insert booking
            const { data: bookingData, error: bookingError } = await supabase
                .from('premium_bookings')
                .insert([bookingPayload])
                .select('id')
                .single();

            if (bookingError) {
                console.error('Booking insert error:', bookingError);
                throw bookingError;
            }
            if (!bookingData) throw new Error('Booking creation failed');

            setBookingId(Number(bookingData.id));
            setSuccess(true);

        } catch (err: any) {
            console.error('Booking submission error:', err);
            setError(err.message || 'Failed to submit booking. Please try again or contact support.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
                            initial={{
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                y: -20,
                                scale: 0
                            }}
                            animate={{
                                y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 20,
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        duration: 0.6
                    }}
                    className="max-w-2xl w-full relative z-10"
                >
                    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] rounded-[3rem] p-12 text-center shadow-2xl">
                        {/* Success icon with pulse animation */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                delay: 0.2
                            }}
                            className="relative inline-block mb-8"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full blur-2xl"
                            />
                            <div className="relative w-28 h-28 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-900/50">
                                <Check className="text-white" size={56} strokeWidth={3} />
                            </div>
                        </motion.div>

                        {/* Success text with stagger animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-5xl font-black text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                Booking Confirmed!
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-4 mb-8"
                        >
                            <p className="text-gray-300 text-lg">
                                Your <span className="text-white font-bold">{packageType} - {tier}</span> package has been booked successfully.
                            </p>

                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20">
                                <PartyPopper className="text-yellow-400" size={20} />
                                <span className="text-white font-mono font-bold">Booking ID: #{bookingId}</span>
                            </div>

                            <p className="text-gray-400 text-sm max-w-md mx-auto">
                                We'll contact you at <span className="text-white font-medium">{formData.phone}</span> within 24 hours to confirm details and finalize your booking.
                            </p>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/')}
                            className="px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/50"
                        >
                            Back to Home
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-20 relative overflow-hidden">
            {/* Animated background particles for Review Screen */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
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
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase mb-6 shadow-lg shadow-blue-900/20"
                    >
                        <CheckCircle2 size={14} />
                        <span>Review Your Booking</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent px-2"
                    >
                        Almost There!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-lg"
                    >
                        Please review your booking details before confirming
                    </motion.p>
                </motion.div>

                {/* Review Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
                    className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.1] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 space-y-8 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
                    {/* Package Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-black text-white mb-1">{packageType} Package</h3>
                                {packageType === 'Dream Space' && formData.spaceType && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center gap-2 text-blue-300 text-sm"
                                    >
                                        <span className="text-lg">{SPACE_TYPE_LABELS[formData.spaceType]?.icon}</span>
                                        <span className="font-semibold">{SPACE_TYPE_LABELS[formData.spaceType]?.label}</span>
                                        <span className="text-gray-400">• {SPACE_TYPE_LABELS[formData.spaceType]?.desc}</span>
                                    </motion.div>
                                )}
                                {packageType === 'Celebration' && formData.eventType && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center gap-2 text-purple-300 text-sm"
                                    >
                                        <span className="text-lg">{EVENT_TYPE_LABELS[formData.eventType]?.icon}</span>
                                        <span className="font-semibold">{EVENT_TYPE_LABELS[formData.eventType]?.label}</span>
                                    </motion.div>
                                )}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg"
                                >
                                    {tier} Tier
                                </motion.div>
                                <div className="text-white font-bold text-xl">
                                    {isCustom ? (
                                        <span className="text-blue-300">To be quoted</span>
                                    ) : (
                                        `₹${basePrice.toLocaleString()}`
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Selected Services (Custom Only) */}
                    {isCustom && formData.selectedServices && formData.selectedServices.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 }}
                            className="space-y-4"
                        >
                            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                                    <Sparkles size={20} />
                                </div>
                                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Selected Services</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.selectedServices.map(serviceId => (
                                    <div key={serviceId} className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-sm font-medium">
                                        {CUSTOM_SERVICE_LABELS[serviceId] || serviceId}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Personal Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                <User size={20} />
                            </div>
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Personal Information</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem icon={<User size={16} />} label="Name" value={formData.name} />
                            <InfoItem icon={<Phone size={16} />} label="Phone" value={formData.phone} />
                            <InfoItem icon={<Mail size={16} />} label="Email" value={formData.email} className="md:col-span-2" />
                        </div>
                    </motion.div>

                    {/* Location & Date Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                                <MapPin size={20} />
                            </div>
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {packageType === 'Dream Space' ? 'Space Details' : 'Event Details'}
                            </span>
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <InfoItem
                                icon={<MapPin size={16} />}
                                label={packageType === 'Dream Space' ? 'Location' : 'Venue'}
                                value={formData.location}
                            />
                            {formData.preferredDate && (
                                <InfoItem
                                    icon={<Calendar size={16} />}
                                    label="Preferred Date"
                                    value={new Date(formData.preferredDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* Notes / Requirements */}
                    {formData.notes && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="space-y-3"
                        >
                            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3">
                                {packageType === 'Dream Space' ? 'Additional Details' : 'Special Requirements'}
                            </h3>
                            <p className="text-gray-300 bg-white/5 rounded-xl p-4 border border-white/5">{formData.notes}</p>
                        </motion.div>
                    )}



                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20"
                            >
                                <AlertCircle size={20} />
                                <p>{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-col-reverse md:flex-row gap-4 pt-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02, x: -5 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleEdit}
                            disabled={isSubmitting}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all disabled:opacity-50"
                        >
                            <Edit size={20} />
                            Edit Details
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Confirming...
                                </>
                            ) : (
                                <>
                                    <Check size={20} />
                                    Confirm Booking
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center text-xs text-gray-500 pt-4"
                    >
                        By confirming, you agree to our terms and conditions. {isCustom ? 'A quote will be provided shortly.' : 'A 50% advance payment may be required to secure your booking.'}
                    </motion.p>
                </motion.div>
            </div>
        </div >
    );
}

// Helper component for info display with animation
function InfoItem({ icon, label, value, className = '' }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, x: 5 }}
            className={`bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all ${className}`}
        >
            <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                {icon}
                <span className="uppercase tracking-wider font-bold">{label}</span>
            </div>
            <p className="text-white font-medium">{value}</p>
        </motion.div>
    );
}

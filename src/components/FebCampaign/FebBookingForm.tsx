import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Loader2, Check, AlertCircle, Calendar, Clock, MapPin, User, Phone, Camera, Heart, Film } from 'lucide-react';

const TIME_SLOTS = [
    'Morning (9AM - 12PM)',
    'Afternoon (12PM - 4PM)',
    'Evening (4PM - 7PM)'
];

const CATEGORIES = [
    'Couple/Love',
    'Self-Love/Portraits',
    'Besties/Squad',
    'Family/Pet'
];

interface FebBookingFormProps {
    selectedTheme?: string;
    onClearTheme?: () => void;
}

export function FebBookingForm({ selectedTheme, onClearTheme }: FebBookingFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        date: '',
        timeSlot: '',
        category: '',
        deliverables: {
            reels: true,
            photos: true
        },
        frames: false,
        notes: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Pre-select category based on theme if applicable
    useEffect(() => {
        if (selectedTheme) {
            if (selectedTheme.includes('Rose Day') || selectedTheme.includes('Propose Day') || selectedTheme.includes('Kiss Day') || selectedTheme.includes('Valentine')) {
                setFormData(p => ({ ...p, category: 'Couple/Love' }));
            }
            if (selectedTheme.includes('Chocolate Day') || selectedTheme.includes('Family')) {
                setFormData(p => ({ ...p, category: 'Family/Pet' }));
            }
            if (selectedTheme.includes('Self') || selectedTheme.includes('Teddy')) {
                setFormData(p => ({ ...p, category: 'Self-Love/Portraits' }));
            }
        }
    }, [selectedTheme]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        if (!/^\d{10}$/.test(formData.phone)) {
            setErrorMsg('Please enter a valid 10-digit phone number.');
            setIsSubmitting(false);
            return;
        }

        if (!formData.timeSlot) {
            setErrorMsg('Please select a preferred time slot.');
            setIsSubmitting(false);
            return;
        }
        if (!formData.category) {
            setErrorMsg('Please select a category.');
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: serviceData, error: serviceError } = await supabase
                .from('studio_services' as any)
                .select('id, price_min')
                .eq('name', 'Feb in Frames')
                .single();

            if (serviceError || !serviceData) {
                console.error('Service lookup error:', serviceError);
                throw new Error('Campaign service not active. Please contact support.');
            }

            // 2. Prepare Payload for studio_bookings
            // Mapping form fields to JSONB columns
            const clientDetails = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                location: formData.location
            };

            const packageDetails = {
                campaign: 'Feb in Frames',
                theme: selectedTheme || 'Not Selected',
                time_slot: formData.timeSlot,
                category: formData.category,
                deliverables: {
                    reels: formData.deliverables.reels,
                    photos: formData.deliverables.photos,
                    frames_opt_in: formData.frames
                },
                notes: formData.notes
            };

            const bookingPayload = {
                service_id: serviceData.id,
                total_price: serviceData.price_min + (formData.frames ? 500 : 0), // Simple logic: add 500 if fames selected, purely illustrative
                event_date: formData.date,
                event_venue: formData.location,
                client_details: clientDetails,
                package_details: packageDetails,
                status: 'new'
            };

            const { error } = await supabase.from('studio_bookings').insert([bookingPayload]);

            if (error) throw error;

            // Send automated email
            await supabase.functions.invoke('send-feb-campaign-email', {
                body: {
                    email: formData.email,
                    name: formData.name,
                    theme: selectedTheme,
                    date: formData.date,
                    venue: formData.location
                }
            });

            setSuccess(true);
        } catch (err: any) {
            console.error('Submission Error:', err);
            setErrorMsg(err.message || 'Something went wrong. Please trying again or call us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/10 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-transparent pointer-events-none"></div>
                <div className="w-24 h-24 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-pink-900/30 animate-pulse">
                    <Check className="text-white" size={40} strokeWidth={3} />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 tracking-tight">Confirmed.</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-md font-light leading-relaxed">
                    Your <span className="text-white font-medium">Feb in Frames</span> experience is booked. We'll contact you at <span className="text-white font-mono">{formData.phone}</span> shortly.
                </p>
                <button
                    onClick={() => setSuccess(false)}
                    className="text-sm font-bold text-pink-400 hover:text-pink-300 uppercase tracking-widest transition-colors"
                >
                    Book Another
                </button>
            </motion.div>
        );
    }

    return (
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-6 md:p-12 shadow-2xl relative overflow-hidden group">
            {/* AI/Cosmic Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-600/20 rounded-full blur-[100px] group-hover:bg-pink-600/30 transition-all duration-1000"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

            <div className="relative z-20">
                <div className="mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                        Reserve Your <span className="font-['Dancing_Script'] text-6xl text-pink-500 font-bold px-2">Frame</span>
                    </h2>
                    <p className="text-gray-500 font-mono text-xs md:text-sm uppercase tracking-widest">Limited Slots • Feb 7-15 • Hyderabad</p>
                </div>

                {/* Selected Theme Badge */}
                {selectedTheme && (
                    <div className="mb-6 p-4 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-between animate-fade-in">
                        <div>
                            <span className="text-[10px] text-pink-400 uppercase font-bold tracking-widest block mb-1">Theme Selected</span>
                            <span className="text-white font-bold text-lg font-['Dancing_Script']">{selectedTheme}</span>
                        </div>
                        {onClearTheme ? (
                            <button
                                type="button"
                                onClick={onClearTheme}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <Check size={20} className="text-pink-500 hidden" /> {/* Hidden check, using X instead */}
                                <span className="text-pink-500 font-bold text-lg">✕</span>
                            </button>
                        ) : (
                            <Check size={20} className="text-pink-500" />
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Identity</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-pink-500 focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-700 font-medium"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Contact</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-pink-500 focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-700 font-mono"
                                placeholder="+91..."
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-pink-500 focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-700"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-pink-500 focus:outline-none focus:bg-white/10 transition-all placeholder:text-gray-700"
                                placeholder="Location"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date</label>
                            <input
                                type="date"
                                min="2026-02-07"
                                max="2026-02-15"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-pink-500 focus:outline-none focus:bg-white/10 transition-all [color-scheme:dark] font-mono"
                                required
                            />
                        </div>
                    </div>

                    {/* Time Slot - Horizontal Scroll on Mobile */}
                    <div className="space-y-3">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Timeline</label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                            {TIME_SLOTS.map(slot => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, timeSlot: slot })}
                                    className={`whitespace-nowrap px-4 py-3 rounded-xl text-xs md:text-sm font-bold border transition-all duration-300 ${formData.timeSlot === slot ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transform scale-105' : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'}`}
                                >
                                    {slot.split('(')[0]} <span className="opacity-50 font-normal text-[10px] block">{slot.split('(')[1]?.replace(')', '')}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Tags */}
                    <div className="space-y-3">
                        <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Context</label>
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all uppercase tracking-wide ${formData.category === cat ? 'bg-pink-600 border-pink-600 text-white shadow-lg shadow-pink-900/40' : 'bg-transparent border-white/10 text-gray-600 hover:border-white/30'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Deliverables Section */}
                    <div className="space-y-6">

                        {/* Included Items */}
                        <div className="space-y-3">
                            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Included in Package</label>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Reels */}
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group/opt hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setFormData(p => ({ ...p, deliverables: { ...p.deliverables, reels: !p.deliverables.reels } }))}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${formData.deliverables.reels ? 'bg-pink-500 text-white' : 'bg-white/5 text-gray-500'}`}><Film size={18} /></div>
                                        <span className={`font-bold text-sm md:text-base ${formData.deliverables.reels ? 'text-white' : 'text-gray-500'}`}>Reels</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center ${formData.deliverables.reels ? 'bg-pink-500 border-pink-500' : ''}`}>
                                        {formData.deliverables.reels && <Check size={12} className="text-white" />}
                                    </div>
                                </div>

                                {/* Photos */}
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group/opt hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setFormData(p => ({ ...p, deliverables: { ...p.deliverables, photos: !p.deliverables.photos } }))}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${formData.deliverables.photos ? 'bg-pink-500 text-white' : 'bg-white/5 text-gray-500'}`}><Camera size={18} /></div>
                                        <span className={`font-bold text-sm md:text-base ${formData.deliverables.photos ? 'text-white' : 'text-gray-500'}`}>Photos</span>
                                    </div>
                                    <div className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center ${formData.deliverables.photos ? 'bg-pink-500 border-pink-500' : ''}`}>
                                        {formData.deliverables.photos && <Check size={12} className="text-white" />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add-ons */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider">Premium Add-ons</label>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-4 flex items-center justify-between group/opt hover:border-purple-500/40 transition-all cursor-pointer" onClick={() => setFormData(p => ({ ...p, frames: !p.frames }))}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${formData.frames ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-gray-500'}`}><Heart size={20} fill={formData.frames ? "currentColor" : "none"} /></div>
                                    <div>
                                        <span className={`font-bold text-base md:text-lg block leading-tight ${formData.frames ? 'text-white' : 'text-gray-400'}`}>Custom Frames</span>
                                        <span className="text-xs text-purple-400 font-mono">Capture the memory forever</span>
                                    </div>
                                </div>

                                <div className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${formData.frames ? 'bg-purple-500' : 'bg-gray-700'}`}>
                                    <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${formData.frames ? 'translate-x-7' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Submit */}
                    <div className="pt-6">
                        {errorMsg && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg text-sm mb-4 border border-red-500/20">
                                <AlertCircle size={16} /> {errorMsg}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white text-black font-black text-lg py-5 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-[1.01] transition-all transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500"></div>
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'SECURE SLOT'}
                        </button>
                        <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest font-mono">
                            Charges apply for frames.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

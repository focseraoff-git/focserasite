import React, { useState } from 'react';
import { Camera, Heart, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemedDaySlider from './ThemedDaySlider';
import { FebBookingForm } from './FebBookingForm';

const FebInFramesSection = () => {
    const [selectedTheme, setSelectedTheme] = useState('');

    return (
        <section id="feb-in-frames" className="relative py-20 px-4 md:px-6 bg-[#050505] overflow-hidden scroll-mt-20">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
                <div className="absolute top-20 left-10 w-72 h-72 md:w-96 md:h-96 bg-pink-900/20 rounded-full blur-[80px] md:blur-[100px]"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 md:w-96 md:h-96 bg-purple-900/20 rounded-full blur-[80px] md:blur-[100px]"></div>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-bold uppercase tracking-widest mb-6">
                        Valentine Week Special
                    </span>
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6">
                        Feb <span className="font-['Dancing_Script'] font-bold text-5xl sm:text-7xl md:text-9xl text-pink-500 mx-2" style={{ textShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}>in</span> Frames
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                        Partner, friends, family, or solo — <strong className="text-white">you enjoy the moment</strong>. We’ll capture it.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Details & Themes */}
                    <div className="lg:col-span-7 space-y-12">

                        {/* Service Bullets */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: Film, title: 'Instant Reels', desc: 'Shot & edited on location' },
                                { icon: Camera, title: 'Instant Photos', desc: 'Beautifully graded edits' },
                                { icon: Heart, title: '48H Frame Delivery', desc: 'Premium frames to your door' },
                                { icon: Camera, title: 'Doorstep Shoot', desc: 'At your preferred time & place' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="bg-pink-500/20 p-3 rounded-lg text-pink-500">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Theme Slider */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Heart className="text-pink-500" fill="currentColor" /> Pick Your Vibe
                            </h3>
                            <ThemedDaySlider onSelectTheme={(theme) => {
                                setSelectedTheme(theme);
                                document.getElementById('feb-booking-form')?.scrollIntoView({ behavior: 'smooth' });
                            }} />
                        </div>

                        {/* Quality Promise */}
                        <div className="bg-gradient-to-r from-gray-900 to-black border border-white/10 p-6 rounded-2xl flex items-center justify-between gap-6">
                            <div>
                                <h4 className="text-white font-bold mb-1">Our Quality Promise</h4>
                                <p className="text-gray-400 text-sm">
                                    Shoot may be on <span className="text-white font-medium">DSLR or iPhone 17 Pro Max</span> — at Focsera’s discretion. <br />
                                    <strong>No compromise in quality.</strong>
                                </p>
                            </div>
                            <div className="hidden sm:block text-RIGHT">
                                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Campaign Dates</span>
                                <span className="text-xl font-bold text-white">Feb 7 – 15</span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Booking Form */}
                    <div className="lg:col-span-5 relative" id="feb-booking-form">
                        <div className="lg:col-span-5 relative" id="feb-booking-form">
                            <FebBookingForm
                                selectedTheme={selectedTheme}
                                onClearTheme={() => setSelectedTheme('')}
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FebInFramesSection;

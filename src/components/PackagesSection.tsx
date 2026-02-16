
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Camera, Home, Crown, CheckCircle2, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    AsianPaintsLogo, SaintGobainLogo, HettichLogo, OrientLogo, EbcoLogo,
    CanonLogo, SonyLogo, IphoneLogo,
    LightVector, DroneVector, CineCameraVector
} from './CinematicVectors';

export default function PackagesSection() {
    const [activeTab, setActiveTab] = useState<'dream' | 'celebration'>('dream');
    const navigate = useNavigate();
    // Ultra-Smooth "Apple-like" Cubic Bezier Easing
    const smoothEase = [0.23, 1, 0.32, 1] as any;

    const handlePackageSelect = (tier: string) => {
        const packageType = activeTab === 'dream' ? 'Dream Space' : 'Celebration';
        navigate('/booking', {
            state: {
                packageType: packageType,
                tier: tier,
                category: activeTab
            }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="relative py-32 overflow-hidden bg-slate-950" id="packages">
            {/* Deep Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header - Platinum Aesthetic */}
                <div className="text-center mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: smoothEase }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-blue-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
                    >
                        <Sparkles size={14} className="text-blue-400" />
                        <span>Premium Offerings</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
                        className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
                    >
                        Crafting <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Perfect Moments.
                        </span>
                    </motion.h2>

                    {/* Glass Toggle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: smoothEase, delay: 0.4 }}
                        className="inline-flex bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-xl relative z-20 mt-8"
                    >
                        <TabButton
                            active={activeTab === 'dream'}
                            onClick={() => setActiveTab('dream')}
                            label="Dream Space"
                            icon={<Home size={16} />}
                        />
                        <TabButton
                            active={activeTab === 'celebration'}
                            onClick={() => setActiveTab('celebration')}
                            label="Celebration"
                            icon={<Crown size={16} />}
                        />
                    </motion.div>
                </div>

                {/* Dynamic Content Area */}
                <div className="min-h-[600px] mb-32">
                    <AnimatePresence mode="wait">
                        {activeTab === 'dream' ? (
                            <DreamSpacePackage key="dream" ease={smoothEase} onSelect={handlePackageSelect} />
                        ) : (
                            <CelebrationPackage key="celebration" ease={smoothEase} onSelect={handlePackageSelect} />
                        )}
                    </AnimatePresence>
                </div>

                {/* Industry Partners (Contextual - Dream Only) */}
                <AnimatePresence>
                    {activeTab === 'dream' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.8, ease: smoothEase }}
                            className="relative py-10 border-t border-white/[0.05]"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-4 text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                                Industry Partners
                            </div>
                            <div className="flex items-center justify-center">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700 w-full text-white">
                                    <AsianPaintsLogo />
                                    <SaintGobainLogo />
                                    <HettichLogo />
                                    <OrientLogo />
                                    <EbcoLogo />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Global Technology Partners (Always Visible) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2, ease: smoothEase }}
                    className="relative pt-10 border-t border-white/[0.05]"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-4 text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                        Technology Partners
                    </div>

                    <div className="min-h-[4rem] flex items-center justify-center">
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-700 w-full text-white px-4">
                            <CanonLogo />
                            <SonyLogo />
                            <IphoneLogo />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

const TabButton = ({ active, onClick, label, icon }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 ${active
            ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/10'
            : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
            } `}
    >
        {icon}
        {label}
    </button>
);

// --- SECTIONS ---

function DreamSpacePackage({ ease, onSelect }: { ease: any, onSelect: (tier: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: ease }}
            className="space-y-16"
        >
            {/* Bento Grid Layout - "What We Do" */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[500px]">

                {/* Main Feature - End-to-End Solution */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.5, ease: ease }}
                    className="lg:col-span-8 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between hover:bg-white/[0.04]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 max-w-xl">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold tracking-widest uppercase mb-4">Complete End-to-End Solution</div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Beautiful Beginnings.</h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            Every dream space deserves a beautiful start. Whether it's your new home, office, store, or restaurant, we handle everything from preparation to celebration.
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 size={16} className="text-blue-500" /> Space Preparation & Styling</li>
                            <li className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 size={16} className="text-blue-500" /> Celebration & Event Setup</li>
                            <li className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 size={16} className="text-blue-500" /> Professional Capture & Content</li>
                        </ul>
                    </div>

                    {/* Vector Illustration */}
                    <LightVector className="absolute bottom-[-10%] right-[-10%] w-64 h-64 text-white/5 group-hover:text-white/10 transition-colors duration-500 rotate-[-12deg]" />
                </motion.div>

                {/* Sub Features - Explaining the Pillars */}
                <div className="lg:col-span-4 grid grid-rows-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5, ease: ease }}
                        className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-blue-500/30"
                    >
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold text-white mb-2">Space Styling</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We help enhance your space with decor, lighting, and arrangement.
                            </p>
                        </div>
                        <CineCameraVector className="absolute bottom-4 right-4 w-32 h-32 text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-500" />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5, ease: ease }}
                        className="bg-blue-600 rounded-[2.5rem] p-8 relative overflow-hidden group hover:bg-blue-500 text-white"
                    >
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-2">Celebration Ready</h4>
                            <p className="text-blue-200 text-sm leading-relaxed">
                                Entrance setup, decoration, and event coordination support.
                            </p>
                        </div>
                        <Sparkles className="absolute bottom-4 right-4 text-blue-400/50 w-24 h-24 group-hover:rotate-12 transition-transform" />
                    </motion.div>
                </div>
            </div>

            {/* Pricing Grid - Tiers */}
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Choose Your Tier</h3>
                    <p className="text-slate-400 text-sm">Transform your space beautifully — based on your needs and budget.</p>
                </div>

                <motion.div
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <PricingCard
                        title="Lite"
                        price="Essential"
                        desc="Best for small spaces or simple setups."
                        features={[
                            'Basic space styling guidance',
                            'Minimal decoration setup',
                            'Photography coverage',
                            'Short reel creation',
                            'Edited photos delivery'
                        ]}
                        idealFor="Small homes, offices, shops, budget-friendly setups."
                        ease={ease}
                        onSelect={() => onSelect('Lite')}
                    />
                    <PricingCard
                        title="Standard"
                        price="Signature"
                        desc="Most popular option with balanced coverage."
                        features={[
                            'Space styling & arrangement',
                            'Decoration setup',
                            'Photography + videography',
                            'Cinematic reels',
                            'Portrait sessions',
                            'Event coordination support'
                        ]}
                        highlight={true}
                        idealFor="Homes, offices, store openings, medium celebrations."
                        ease={ease}
                        onSelect={() => onSelect('Standard')}
                    />
                    <PricingCard
                        title="Premium"
                        price="Visionary"
                        desc="Complete experience with advanced services."
                        features={[
                            'Full space styling & enhancement',
                            'Premium decoration setup',
                            'Photography + cinematic video',
                            'Multiple reels & portraits',
                            'Frames or album options',
                            'Event & Catering coordination'
                        ]}
                        idealFor="Luxury homes, businesses, high-end launches."
                        ease={ease}
                        onSelect={() => onSelect('Premium')}
                    />
                </motion.div>
            </div>

            {/* Optional Add-Ons Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: ease }}
                className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-8 md:p-10 mt-12"
            >
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                            <Rocket size={14} /> Optional Business Add-Ons
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold text-white mb-2">For Businesses & Brands</h4>
                        <p className="text-slate-400 text-sm max-w-xl">
                            Launching a store, office, or restaurant? Add these powerful tools to specific packages.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                        <AddOnCard icon={<Rocket size={16} />} title="Fuel Up Kit" desc="Branding & Logo" />
                        <AddOnCard icon={<Sparkles size={16} />} title="Website" desc="Design & Dev" />
                        <AddOnCard icon={<CheckCircle2 size={16} />} title="Software" desc="Billing/Mgmt" />
                        <AddOnCard icon={<Camera size={16} />} title="Marketing" desc="Reels & Social" />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function CelebrationPackage({ ease, onSelect }: { ease: any, onSelect: (tier: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: ease }}
            className="space-y-16"
        >
            {/* Bento Layout - "Remembered Beautifully" */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[500px]">

                {/* Main Feature - Large */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.5, ease: ease }}
                    className="lg:col-span-8 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between hover:bg-white/[0.04]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 max-w-xl">
                        <Crown className="text-amber-400 mb-6 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" size={40} />
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Remembered Beautifully.</h3>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            Birthdays, anniversaries, or milestones. We capture your special moments with professional photography and cinematic storytelling so you can celebrate stress-free.
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 size={16} className="text-amber-500" /> Professional Photography</li>
                            <li className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 size={16} className="text-amber-500" /> Cinematic Videography</li>
                            <li className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 size={16} className="text-amber-500" /> Creative Reels & Edits</li>
                        </ul>
                    </div>

                    {/* Vector Illustration */}
                    <DroneVector className="absolute bottom-[10%] right-[5%] w-48 h-48 text-white/5 group-hover:text-white/10 transition-colors duration-500 rotate-[-5deg]" />
                </motion.div>

                {/* Sub Features */}
                <div className="lg:col-span-4 grid grid-rows-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5, ease: ease }}
                        className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-purple-500/30"
                    >
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold text-white mb-2">Cinematic</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Smooth cinematic video coverage & storytelling reels.
                            </p>
                        </div>
                        <DroneVector className="absolute bottom-[-10px] right-[-10px] w-32 h-32 text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-500" />
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5, ease: ease }}
                        className="bg-amber-500 rounded-[2.5rem] p-8 relative overflow-hidden group hover:bg-amber-400 text-black"
                    >
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold mb-2">Stress Free</h4>
                            <p className="text-amber-900/70 text-sm font-medium leading-relaxed">
                                Optional setup support so you can enjoy the moment.
                            </p>
                        </div>
                        <CheckCircle2 className="absolute bottom-4 right-4 text-amber-900/20 w-24 h-24 group-hover:scale-110 transition-transform" />
                    </motion.div>
                </div>
            </div>

            {/* Pricing Grid */}
            <div className="space-y-8">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">Choose Your Tier</h3>
                    <p className="text-slate-400 text-sm">Celebrate stress-free — we handle the rest.</p>
                </div>

                <motion.div
                    variants={{
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <PricingCard
                        title="Lite"
                        price="Coverage"
                        desc="For simple celebrations."
                        features={[
                            'Photography coverage',
                            'Short reel creation',
                            'Edited photos delivery',
                            'Portrait shots'
                        ]}
                        idealFor="Small birthdays, home celebrations, intimate gatherings."
                        ease={ease}
                        onSelect={() => onSelect('Lite')}
                    />
                    <PricingCard
                        title="Standard"
                        price="Cinematic"
                        desc="Balanced celebration experience."
                        features={[
                            'Photography + videography',
                            'Creative reels',
                            'Basic decoration setup',
                            'Portrait sessions',
                            'Event coordination support'
                        ]}
                        highlight={true}
                        highlightColor="amber"
                        idealFor="Birthdays, anniversaries, family events. Most Popular."
                        ease={ease}
                        onSelect={() => onSelect('Standard')}
                    />
                    <PricingCard
                        title="Premium"
                        price="Heirloom"
                        desc="Complete celebration with full support."
                        features={[
                            'Photography + cinematic video',
                            'Premium decoration setup',
                            'Multiple reels',
                            'Catering coordination (partner)',
                            'Event management support',
                            'Frames or album'
                        ]}
                        idealFor="Large celebrations, parties, milestone events."
                        ease={ease}
                        onSelect={() => onSelect('Premium')}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

// --- SUB-COMPONENTS ---

const AddOnCard = ({ icon, title, desc }: any) => (
    <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-center hover:bg-white/10 transition-colors">
        <div className="text-blue-400 mb-2 flex justify-center">{icon}</div>
        <div className="font-bold text-white text-sm mb-1">{title}</div>
        <div className="text-slate-400 text-[10px] uppercase tracking-wide">{desc}</div>
    </div>
);

const PricingCard = ({ title, price, desc, features, idealFor, highlight = false, highlightColor = "blue", ease, onSelect }: any) => {
    const isGold = highlightColor === 'amber';

    return (
        <motion.div
            variants={{
                hidden: { y: 30, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: ease } }
            }}
            className={`relative p-8 rounded-[2rem] border transition-all duration-500 group overflow-hidden h-full flex flex-col justify-between ${highlight
                ? isGold
                    ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400/50'
                    : 'bg-blue-950/20 border-blue-500/30 hover:border-blue-400/50'
                : 'bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04]'
                } `}>
            {highlight && (
                <div className={`absolute inset-0 opacity-20 ${isGold ? 'bg-gradient-to-b from-amber-500/20 to-transparent' : 'bg-gradient-to-b from-blue-500/20 to-transparent'} pointer-events-none`}></div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                    <h4 className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${highlight ? (isGold ? 'text-amber-400' : 'text-blue-400') : 'text-slate-500'} `}>
                        {title}
                    </h4>
                    <div className="text-3xl font-black text-white mb-1">{price}</div>
                    <p className="text-slate-400 text-sm">{desc}</p>
                </div>

                <div className="space-y-6 flex-grow">
                    <ul className="space-y-3">
                        {features.map((f: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${highlight ? (isGold ? 'text-amber-500' : 'text-blue-500') : 'text-slate-600'} `} />
                                <span className="leading-snug">{f}</span>
                            </li>
                        ))}
                    </ul>

                    {idealFor && (
                        <div className={`pt-4 border-t ${highlight ? (isGold ? 'border-amber-500/20' : 'border-blue-500/20') : 'border-white/10'} `}>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Perfect For</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{idealFor}</p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onSelect}
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 mt-8 ${highlight
                        ? isGold
                            ? 'bg-amber-500 text-black hover:bg-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                            : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                        : 'bg-transparent border border-white/10 text-white hover:bg-white/10'
                        } `}>
                    Select Package
                </button>
            </div>
        </motion.div>
    );
};


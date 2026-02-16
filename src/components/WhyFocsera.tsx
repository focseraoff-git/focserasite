import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Diamond, Fingerprint, Clock, ShieldCheck, Award, Sparkles } from 'lucide-react';

export default function WhyFocsera() {
    const features = [
        {
            icon: Diamond,
            title: "Unmatched Quality",
            description: "Pixel-perfect clarity in every frame. We don't just capture moments; we craft cinematic masterpieces.",
            gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
            iconColor: "text-blue-400",
            glowColor: "blue"
        },
        {
            icon: Clock,
            title: "Lightning Fast",
            description: "Speed without compromise. Get your fully edited assets delivered in record time.",
            gradient: "from-indigo-500/20 via-purple-500/20 to-indigo-600/20",
            iconColor: "text-indigo-400",
            glowColor: "indigo"
        },
        {
            icon: Fingerprint,
            title: "Tailored Vision",
            description: "Your brand is unique. We customize every detail to reflect your personal style and identity.",
            gradient: "from-violet-500/20 via-fuchsia-500/20 to-violet-600/20",
            iconColor: "text-violet-400",
            glowColor: "violet"
        },
        {
            icon: ShieldCheck,
            title: "Reliability",
            description: "Peace of mind guaranteed. We show up, we deliver, and we exceed expectations every time.",
            gradient: "from-emerald-500/20 via-teal-500/20 to-emerald-600/20",
            iconColor: "text-emerald-400",
            glowColor: "emerald"
        },
        {
            icon: Zap,
            title: "Creative Edge",
            description: "Pushing boundaries with unique perspectives. We bring a fresh, artistic eye to every project.",
            gradient: "from-amber-500/20 via-orange-500/20 to-amber-600/20",
            iconColor: "text-amber-400",
            glowColor: "amber"
        },
        {
            icon: Award,
            title: "End-to-End Support",
            description: "From concept to final delivery, we are with you every step of the way. Dedicated support whenever you need it.",
            gradient: "from-rose-500/20 via-pink-500/20 to-rose-600/20",
            iconColor: "text-rose-400",
            glowColor: "rose"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    return (
        <section className="relative py-32 sm:py-40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/20 blur-[100px] rounded-full"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20 sm:mb-28"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 font-semibold tracking-wide uppercase text-xs sm:text-sm">
                            The Focsera Difference
                        </span>
                    </motion.div>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif font-medium text-white tracking-tight leading-tight">
                        Why{' '}
                        <span className="italic bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 bg-clip-text text-transparent">
                            Focsera?
                        </span>
                    </h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-6 text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Six pillars of excellence that set us apart in the creative industry
                    </motion.p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const imageMap = {
                            "Unmatched Quality": "/images/why-focsera-quality.png",
                            "Lightning Fast": "/images/why-focsera-speed.png",
                            "Tailored Vision": "/images/why-focsera-tailored.png",
                            "Reliability": "/images/why-focsera-reliability.png",
                            "Creative Edge": "/images/why-focsera-creative.png",
                            "End-to-End Support": "/images/why-focsera-support.png"
                        };

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                className="group relative h-[480px] rounded-3xl overflow-hidden"
                            >
                                {/* Animated Border Gradient */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px]">
                                    <div className="absolute inset-0 rounded-3xl bg-slate-900/90 backdrop-blur-xl" />
                                </div>

                                {/* Hover Glow Effect */}
                                <motion.div
                                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}
                                    initial={false}
                                />

                                {/* Image Background */}
                                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                                    <motion.img
                                        src={imageMap[feature.title]}
                                        alt={feature.title}
                                        className="w-full h-full object-cover opacity-40 group-hover:opacity-30 transition-opacity duration-700"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-slate-950/60" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                                    {/* Icon */}
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} backdrop-blur-md flex items-center justify-center ${feature.iconColor} border border-white/10 shadow-lg shadow-${feature.glowColor}-500/20 group-hover:shadow-${feature.glowColor}-500/40 transition-shadow duration-500`}
                                    >
                                        <Icon size={26} strokeWidth={1.8} />
                                    </motion.div>

                                    {/* Text Content */}
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <motion.div
                                                className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60 group-hover:opacity-100 group-hover:w-20 transition-all duration-500"
                                            />
                                            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-blue-100 transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                        </div>

                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium group-hover:text-slate-200 transition-colors duration-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Shine Effect on Hover */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{
                                        background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

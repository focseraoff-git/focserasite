import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, CheckCircle, HelpCircle, Phone, Globe, X, ArrowRight, Star, Shield, Zap, Users, Play, Video, Layers, Sparkles, ChevronRight, Upload, DollarSign, Heart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";

export default function SkillVerse() {
    const [isSkillVerseModalOpen, setIsSkillVerseModalOpen] = useState(false);
    const [isSkillVerseSuccess, setIsSkillVerseSuccess] = useState(false);
    const [isSkillVerseSubmitting, setIsSkillVerseSubmitting] = useState(false);
    const [skillVerseFormData, setSkillVerseFormData] = useState({
        name: '',
        phone: '',
        email: '',
        instituteName: '',
        role: '',
        message: ''
    });

    const handleSkillVerseBook = () => setIsSkillVerseModalOpen(true);
    const handleSkillVerseClose = () => {
        setIsSkillVerseModalOpen(false);
        setTimeout(() => {
            setIsSkillVerseSuccess(false);
            setSkillVerseFormData({ name: '', phone: '', email: '', instituteName: '', role: '', message: '' });
        }, 300);
    };

    const handleSkillVerseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSkillVerseSubmitting(true);

        setTimeout(() => {
            setIsSkillVerseSuccess(true);
            setIsSkillVerseSubmitting(false);
            toast.success("Application submitted successfully!");

            const text = `*Skill Verse Educator Application*%0A%0A*Name:* ${skillVerseFormData.name}%0A*Phone:* ${skillVerseFormData.phone}%0A*Email:* ${skillVerseFormData.email}%0A*Institute:* ${skillVerseFormData.instituteName}%0A*Role:* ${skillVerseFormData.role}%0A*Message:* ${skillVerseFormData.message}`;
            window.open(`https://wa.me/919515803954?text=${text}`, '_blank');

        }, 1500);
    };

    const features = [
        { icon: Star, title: "Zero Commission", desc: "Keep 100% of your earnings. We don't take a cut. Ever." },
        { icon: Shield, title: "Full Ownership", desc: "Your content, your IP. You retain 100% intellectual property rights." },
        { icon: Zap, title: "Instant Launch", desc: "Go live in minutes. No complex approvals or waiting periods." },
        { icon: Users, title: "Global Classroom", desc: "Reach students across the globe without geographical barriers." }
    ];

    const steps = [
        { icon: Upload, title: "1. Create Profile", desc: "Sign up as an educator and build your professional profile." },
        { icon: Layers, title: "2. Upload Content", desc: "Publish your courses, live sessions, or workshops easily." },
        { icon: DollarSign, title: "3. Start Earning", desc: "Set your price and receive payments directly from students." }
    ];

    const teachingModes = [
        { icon: Video, title: "Live Classes", desc: "Interactive real-time sessions with students.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { icon: Play, title: "Recorded Courses", desc: "Self-paced video lessons accessible anytime.", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
        { icon: Layers, title: "Hybrid Model", desc: "Combine live and recorded content for impact.", color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" }
    ];

    return (
        <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-blue-500/30 overflow-x-hidden">

            {/* Background Ambient Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[150px] animate-pulse delay-1000"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default group"
                    >
                        <Sparkles size={14} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
                        <span className="text-gray-300">The Future of Education is Here</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight"
                    >
                        Skill Verse <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">by Focsera</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
                    >
                        Teach Freely. Earn Fully. Grow Limitlessly. <br />
                        The world's first <span className="text-white font-semibold border-b border-blue-500/50">0% commission</span> premium learning ecosystem.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Button
                            onClick={handleSkillVerseBook}
                            className="bg-white text-black hover:bg-gray-200 font-bold rounded-full px-10 py-8 text-xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                        >
                            Join as Educator
                        </Button>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <CheckCircle size={16} className="text-green-500" /> Free to Join
                            <CheckCircle size={16} className="text-green-500 ml-2" /> Instant Access
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Join Section (Bento Grid Style) */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Choose Skill Verse?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">We've reimagined the education platform to put creators first.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Large Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="md:col-span-2 bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-[2rem] p-10 relative overflow-hidden group hover:border-blue-500/40 transition-all"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                                    <Star size={32} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Zero Commission. 100% Yours.</h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                    Unlike other platforms that take 20-50% of your revenue, Skill Verse takes nothing. You keep every penny you earn.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="bg-[#0f0f0f] border border-white/10 rounded-[2rem] p-10 hover:bg-white/5 transition-all group"
                        >
                            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                                <Shield size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Full Ownership</h3>
                            <p className="text-gray-400">Your content remains your intellectual property. We never claim rights over your hard work.</p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="bg-[#0f0f0f] border border-white/10 rounded-[2rem] p-10 hover:bg-white/5 transition-all group"
                        >
                            <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                                <Users size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Global Reach</h3>
                            <p className="text-gray-400">Connect with students from around the world. Break geographical barriers instantly.</p>
                        </motion.div>

                        {/* Large Card 4 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                            className="md:col-span-2 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-[2rem] p-10 relative overflow-hidden group hover:border-purple-500/40 transition-all"
                        >
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                                    <Zap size={32} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4">Launch in Minutes</h3>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                    Simple onboarding. No complex approvals. Start teaching and earning immediately.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
                        <p className="text-gray-400">Three simple steps to start your journey.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 border-t border-dashed border-white/20"></div>

                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}
                                className="relative flex flex-col items-center text-center z-10"
                            >
                                <div className="w-24 h-24 bg-[#0a0a0a] border border-white/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]">
                                    <step.icon className="text-white" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 max-w-xs">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Teaching Modes */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Teach Your Way</h2>
                        <p className="text-gray-400">Flexible options to suit your teaching style.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teachingModes.map((mode, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className={`p-8 rounded-3xl border ${mode.border} ${mode.bg} backdrop-blur-sm transition-all`}
                            >
                                <mode.icon className={`${mode.color} mb-6`} size={40} />
                                <h3 className="text-2xl font-bold text-white mb-3">{mode.title}</h3>
                                <p className="text-gray-400">{mode.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Terms & FAQ Section (Refined) */}
            <section className="py-24 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Terms */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <BookOpen className="text-blue-400" /> Terms & Conditions
                            </h3>
                            <div className="h-[500px] overflow-y-auto pr-4 custom-scrollbar space-y-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-blue-300 font-bold mb-2">1. Zero Commission Policy</h4>
                                    <p className="text-gray-400 text-sm">We charge 0% commission on your earnings. You receive the full amount paid by students, minus any standard payment gateway processing fees.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-blue-300 font-bold mb-2">2. Content Ownership</h4>
                                    <p className="text-gray-400 text-sm">You retain full ownership of your courses and materials. By uploading, you grant us a license to host and display the content, which you can revoke at any time by removing your course.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <h4 className="text-blue-300 font-bold mb-2">3. Quality Standards</h4>
                                    <p className="text-gray-400 text-sm">Courses must meet our basic audio/video quality guidelines. We reserve the right to remove content that is misleading, offensive, or violates copyright laws.</p>
                                </div>
                                {/* Add more terms as needed */}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <HelpCircle className="text-purple-400" /> Frequently Asked Questions
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { q: "Is it really free?", a: "Yes. No setup fees, no monthly subscription, and no commission on sales." },
                                    { q: "How do I get paid?", a: "Payments are transferred directly to your linked bank account." },
                                    { q: "Can I teach anything?", a: "As long as it's legal and educational, yes! From coding to cooking." }
                                ].map((faq, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                                        <p className="text-gray-400 text-sm">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Box */}
                            <div className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10">
                                <h4 className="font-bold text-white mb-4">Still have questions?</h4>
                                <div className="flex flex-col gap-3 text-gray-400">
                                    <span className="flex items-center gap-3"><Phone size={18} /> +91 95158 03954</span>
                                    <span className="flex items-center gap-3"><Globe size={18} /> www.focsera.in</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Booking Modal */}
            <AnimatePresence>
                {isSkillVerseModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleSkillVerseClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden text-white flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header with Gradient */}
                            <div className="relative p-8 pb-6 border-b border-white/5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Educator Application</h3>
                                        <p className="text-blue-400 text-sm mt-1 font-medium">Join the revolution</p>
                                    </div>
                                    <button onClick={handleSkillVerseClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
                                </div>
                            </div>

                            {isSkillVerseSuccess ? (
                                <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 relative z-10 h-96">
                                    <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                        <CheckCircle className="w-12 h-12 text-white" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Application Sent!</h3>
                                        <p className="text-gray-400 max-w-sm mx-auto">
                                            Welcome to Skill Verse. We are redirecting you to WhatsApp to finalize your onboarding.
                                        </p>
                                    </div>
                                    <Button onClick={handleSkillVerseClose} className="mt-4 bg-white/10 hover:bg-white/20 text-white rounded-full px-8 py-2 border border-white/10">Close Window</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSkillVerseSubmit} className="p-8 pt-6 space-y-6 relative z-10 overflow-y-auto custom-scrollbar">

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                                            <div className="relative">
                                                <input required type="text" className="w-full pl-4 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50" placeholder="John Doe" value={skillVerseFormData.name} onChange={(e) => setSkillVerseFormData({ ...skillVerseFormData, name: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone</label>
                                            <input required type="tel" className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50" placeholder="+91..." value={skillVerseFormData.phone} onChange={(e) => setSkillVerseFormData({ ...skillVerseFormData, phone: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                                        <input required type="email" className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50" placeholder="name@example.com" value={skillVerseFormData.email} onChange={(e) => setSkillVerseFormData({ ...skillVerseFormData, email: e.target.value })} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Institute / Org</label>
                                            <input type="text" className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50" placeholder="e.g. ABC Academy" value={skillVerseFormData.instituteName} onChange={(e) => setSkillVerseFormData({ ...skillVerseFormData, instituteName: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Role</label>
                                            <div className="relative">
                                                <select className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white appearance-none [&>option]:bg-black focus:ring-1 focus:ring-blue-500/50" value={skillVerseFormData.role} onChange={(e) => setSkillVerseFormData({ ...skillVerseFormData, role: e.target.value })}>
                                                    <option value="">Select Role...</option>
                                                    <option value="Teacher">Independent Teacher</option>
                                                    <option value="Institute Admin">Institute Admin</option>
                                                    <option value="Mentor">Mentor</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Message (Optional)</label>
                                        <textarea rows={3} className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all resize-none text-white placeholder:text-gray-600 focus:ring-1 focus:ring-blue-500/50" placeholder="Tell us about your courses..." value={skillVerseFormData.message} onChange={(e) => setSkillVerseFormData({ ...skillVerseFormData, message: e.target.value })} />
                                    </div>

                                    <div className="pt-4">
                                        <Button type="submit" disabled={isSkillVerseSubmitting} className="w-full bg-white text-black hover:bg-gray-200 text-lg h-14 rounded-xl font-bold shadow-lg shadow-white/10 transition-all transform active:scale-[0.98]">
                                            {isSkillVerseSubmitting ? 'Processing...' : 'Submit Application'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

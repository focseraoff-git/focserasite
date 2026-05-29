import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'What services does Focsera offer?',
        answer: 'Focsera offers 7 specialized divisions: Studios (photography & videography), Events (corporate & social), Interiors (design & makeover), Media (production house), Web (digital solutions), Labs (skills programs), and Product design services — all bookable from one app.',
    },
    {
        question: 'How do I book a service?',
        answer: 'Simply download the Focsera app on Android, browse through the available services, select your preferred date and time, and confirm your booking instantly. No phone calls required.',
    },
    {
        question: 'Are Focsera professionals vetted?',
        answer: 'Yes. Every Focsera partner professional goes through a rigorous vetting and quality check process before being listed on the platform. We guarantee reliable, consistent quality across all divisions.',
    },
    {
        question: 'Is there a first-booking discount?',
        answer: 'Yes! First-time users get 25% off their initial booking. The discount is automatically applied when you confirm your first service through the app.',
    },
    {
        question: 'What areas does Focsera service?',
        answer: 'We currently serve Hyderabad and surrounding areas, with rapid expansion underway. Check the app for real-time service availability in your location.',
    },
    {
        question: 'Is iOS supported?',
        answer: 'The Focsera app is currently available exclusively on Android via Google Play. iOS users can reach us directly at 9515803954 to arrange bookings manually while we build the iOS version.',
    },
];

export default function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-28 sm:py-36 bg-slate-50 dark:bg-slate-900/50 overflow-hidden transition-colors duration-500">
            <div className="max-w-3xl mx-auto px-6 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1]">
                        Frequently Asked<br className="hidden sm:block" /> Questions
                    </h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-md mx-auto font-normal leading-relaxed">
                        Everything you need to know about Focsera services.
                    </p>
                </motion.div>

                {/* Accordion */}
                <div className="space-y-0 divide-y divide-slate-200 dark:divide-white/[0.06] bg-white dark:bg-white/[0.02] rounded-[1.5rem] border border-slate-100 dark:border-white/[0.06] overflow-hidden">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-7 sm:px-8 py-6 text-left hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors duration-200 group"
                                aria-expanded={openIndex === i}
                                id={`faq-btn-${i}`}
                            >
                                <span className="font-semibold text-[15px] sm:text-base text-slate-800 dark:text-slate-200 pr-6 tracking-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    {faq.question}
                                </span>
                                <div
                                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        openIndex === i
                                            ? 'bg-blue-500 text-white rotate-0 shadow-md shadow-blue-500/20'
                                            : 'bg-slate-100 dark:bg-white/[0.06] text-slate-400 dark:text-slate-500'
                                    }`}
                                >
                                    {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-7 sm:px-8 pb-7 text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

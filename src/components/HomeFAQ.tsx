import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
        <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden transition-colors duration-500">
            <div className="max-w-3xl mx-auto px-6 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] sm:text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-[0.25em] mb-4">FAQ's</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-md mx-auto font-medium leading-relaxed">
                        Everything you need to know about Focsera services.
                    </p>
                </motion.div>

                {/* Accordion List */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="bg-white dark:bg-[#0e1424]/40 rounded-[1.25rem] border border-slate-100 dark:border-white/[0.05] hover:border-blue-100 dark:hover:border-blue-500/10 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 sm:px-7 py-5 sm:py-6 text-left transition-colors duration-200 group"
                                aria-expanded={openIndex === i}
                                id={`faq-btn-${i}`}
                            >
                                <span className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 pr-6 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {faq.question}
                                </span>
                                <div
                                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        openIndex === i
                                            ? 'bg-blue-500 text-white rotate-180 shadow-md shadow-blue-500/20'
                                            : 'bg-slate-50 dark:bg-white/[0.04] text-slate-450 dark:text-slate-550 group-hover:bg-slate-100 dark:group-hover:bg-white/[0.08]'
                                    }`}
                                >
                                    <ChevronDown className="w-4 h-4" />
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
                                        <div className="px-6 sm:px-7 pb-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-50 dark:border-white/[0.02] pt-4 font-medium">
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

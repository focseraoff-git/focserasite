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
        <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-500">
            <div className="max-w-3xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                                openIndex === i
                                    ? 'border-blue-200 dark:border-blue-500/30 bg-white dark:bg-white/[0.04] shadow-sm'
                                    : 'border-slate-200 dark:border-white/8 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/15'
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left"
                                aria-expanded={openIndex === i}
                                id={`faq-btn-${i}`}
                            >
                                <span className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 pr-4">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                        openIndex === i ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-400'
                                    }`}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === i && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-5 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
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

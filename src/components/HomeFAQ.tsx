import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'How are professionals verified?',
        answer: 'Every Focsera partner goes through a multi-step verification process including identity checks, portfolio reviews, skill assessments, and background verification. We only onboard professionals who meet our quality standards.',
    },
    {
        question: 'Can I get custom quotations?',
        answer: 'Absolutely. Every project is unique. Share your requirements and we\'ll provide a detailed, transparent quotation tailored to your specific needs — no templates, no hidden charges.',
    },
    {
        question: 'Do you provide site visits?',
        answer: 'Yes, for services like interiors, events, and architecture, we arrange site visits with verified professionals so they can assess the space and provide accurate recommendations and pricing.',
    },
    {
        question: 'How does payment work?',
        answer: 'We offer flexible payment options. You can pay securely through the Focsera platform or directly coordinate with the assigned partner. We provide detailed invoices for every transaction.',
    },
    {
        question: 'Do I pay partners directly?',
        answer: 'Payment structure depends on the service. For some packages, you pay through Focsera. For custom projects, you may pay partners directly after receiving a transparent quotation from us.',
    },
    {
        question: 'Can businesses join as partners?',
        answer: 'Yes! If you\'re a professional or business in photography, events, interiors, web development, marketing, or any creative field, you can apply to become a Focsera partner. Contact us to get started.',
    },
    {
        question: 'Can schools partner with Focsera?',
        answer: 'Absolutely. We offer AI workshops, skill development programs, and InnovateX labs for schools. Our education division has partnered with multiple institutions. Reach out to explore collaboration.',
    },
];

export default function HomeFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-16 sm:py-24 bg-focsera-bg overflow-hidden">
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <p className="text-[11px] font-bold text-focsera-primary uppercase tracking-[0.2em] mb-3">
                        FAQ
                    </p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-focsera-text tracking-[-0.03em] leading-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-focsera-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        Everything you need to know about working with Focsera.
                    </p>
                </motion.div>

                {/* Accordion */}
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-20px' }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between px-5 sm:px-7 py-5 sm:py-6 text-left transition-colors duration-200 group"
                                aria-expanded={openIndex === i}
                                id={`faq-btn-${i}`}
                            >
                                <span className="font-semibold text-[13px] sm:text-[15px] text-focsera-text pr-4 tracking-tight group-hover:text-focsera-primary transition-colors">
                                    {faq.question}
                                </span>
                                <div
                                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        openIndex === i
                                            ? 'bg-focsera-primary text-white rotate-180 shadow-md shadow-blue-500/20'
                                            : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
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
                                        <div className="px-5 sm:px-7 pb-5 text-focsera-muted text-[13px] sm:text-sm leading-relaxed border-t border-gray-50 pt-4">
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

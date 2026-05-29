import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

export default function Testimonials() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('home_testimonials')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });
                
                if (error) throw error;
                if (data) setReviews(data);
            } catch (err) {
                console.error("Error fetching testimonials:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const getInitials = (name: string) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    if (loading) {
        return (
            <section className="py-28 sm:py-36 bg-white dark:bg-slate-950 flex justify-center items-center transition-colors duration-500">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </section>
        );
    }

    return (
        <section className="py-28 sm:py-36 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-5">Reviews</p>
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1]">
                        Loved by Focsera<br className="hidden sm:block" /> users.
                    </h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-lg font-normal leading-relaxed">
                        Real experiences from real people who trusted Focsera.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="relative bg-slate-50 dark:bg-white/[0.03] rounded-[1.5rem] p-8 border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 hover:shadow-xl hover:shadow-slate-100/60 dark:hover:shadow-none transition-all duration-400 group"
                        >
                            {/* Quote mark */}
                            <div className="absolute top-6 right-6 opacity-[0.06] dark:opacity-[0.04]">
                                <Quote size={48} className="text-slate-900 dark:text-white" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-6">
                                {Array.from({ length: review.rating || 5 }).map((_, si) => (
                                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed mb-8 min-h-[60px] relative z-10">
                                "{review.review_text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3.5 pt-6 border-t border-slate-100 dark:border-white/[0.06]">
                                <div 
                                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-md"
                                    style={{ background: review.accent_hex || '#3b82f6' }}
                                >
                                    {getInitials(review.author)}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{review.author}</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{review.role || 'Verified Customer'}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

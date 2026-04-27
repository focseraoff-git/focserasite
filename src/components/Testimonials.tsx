import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
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
            <section className="py-24 sm:py-32 bg-white dark:bg-slate-950 flex justify-center items-center transition-colors duration-500">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </section>
        );
    }

    return (
        <section className="py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Reviews</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        User reviews and feedback
                    </h2>
                    <p className="mt-3 text-slate-500 dark:text-slate-400 text-base max-w-md mx-auto">
                        Real experiences from real people who trusted Focsera.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-slate-50 dark:bg-white/[0.04] rounded-2xl p-6 border border-slate-100 dark:border-white/8 hover:shadow-md dark:hover:border-white/15 transition-all duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: review.rating || 5 }).map((_, si) => (
                                    <Star key={si} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 min-h-[60px]">
                                "{review.review_text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-white/8">
                                <div 
                                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                                    style={{ background: review.accent_hex || '#3b82f6' }}
                                >
                                    {getInitials(review.author)}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{review.author}</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500">{review.role || 'Verified Customer'}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';

const fallbackReviews = [
    {
        author: 'Dr. K. Srinivas',
        role: 'Principal, Greenfield Public School',
        review_text: 'Focsera executed our school skill lab setup and AI training program flawlessly. The InnovateX workshop was an absolute hit with both students and teachers.',
        rating: 5,
        accent_hex: '#0B5FFF'
    },
    {
        author: 'Sandeep G.',
        role: 'Founder, TechVibe Studios',
        review_text: 'We booked Focsera for our corporate office interior makeover and brand identity launch. Incredible quality, transparent pricing, and managed execution.',
        rating: 5,
        accent_hex: '#7c3aed'
    },
    {
        author: 'Meenakshi S.',
        role: 'Parent & Event Organizer',
        review_text: 'Focsera handled my daughter\'s birthday decoration, photography, and catering end-to-end. I didn\'t have to follow up even once. Extremely reliable!',
        rating: 5,
        accent_hex: '#10b981'
    }
];

export default function Testimonials() {
    const [reviews, setReviews] = useState<any[]>(fallbackReviews);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data, error } = await supabase
                    .from('home_testimonials')
                    .select('*')
                    .eq('is_active', true)
                    .order('display_order', { ascending: true });
                
                if (error) throw error;
                if (data && data.length > 0) {
                    setReviews(data);
                }
            } catch (err) {
                console.error("Error fetching testimonials:", err);
            }
        };

        fetchReviews();
    }, []);

    const getInitials = (name: string) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const displayReviews = reviews;

    return (
        <section className="py-16 sm:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-14"
                >
                    <p className="text-[11px] font-bold text-focsera-primary uppercase tracking-[0.2em] mb-3">
                        Testimonials
                    </p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-focsera-text tracking-[-0.03em] leading-tight">
                        What our clients say.
                    </h2>
                    <p className="mt-4 text-focsera-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        Real experiences from individuals, businesses, and schools who trust Focsera.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {displayReviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                            className="group bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-400 relative overflow-hidden"
                        >
                            {/* Quote watermark */}
                            <div className="absolute top-5 right-5 opacity-[0.04] pointer-events-none">
                                <Quote size={36} className="text-focsera-text" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-5 text-amber-400">
                                {Array.from({ length: review.rating || 5 }).map((_, si) => (
                                    <Star key={si} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-[13px] sm:text-[14px] text-focsera-muted leading-relaxed mb-6 min-h-[60px] italic font-medium">
                                "{review.review_text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-5 border-t border-gray-50">
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[11px] font-extrabold shrink-0 shadow-sm"
                                    style={{ background: review.accent_hex || '#0B5FFF' }}
                                >
                                    {getInitials(review.author)}
                                </div>
                                <div>
                                    <div className="text-[13px] font-bold text-focsera-text">{review.author}</div>
                                    <div className="text-[11px] text-focsera-muted mt-0.5 font-medium">{review.role || 'Verified Customer'}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

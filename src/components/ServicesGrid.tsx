import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const services = [
    {
        title: 'Photography',
        image: '/images/partner_photographer.png',
        path: '/studios',
    },
    {
        title: 'Videography',
        image: '/images/partner_videographer.png',
        path: '/studios',
    },
    {
        title: 'Event Planning',
        image: '/images/partner_event_planner.png',
        path: '/events',
    },
    {
        title: 'Design & Interiors',
        image: '/images/partner_designer.png',
        path: '/interiors',
    },
    {
        title: 'Product Shoots',
        image: '/images/partner_product.png',
        path: '/interiors',
    },
    {
        title: 'Reels & Media',
        image: '/images/partner_reel_maker.png',
        path: '/media',
    },
    {
        title: 'Development',
        image: '/images/partner_developer.png',
        path: '/labs',
    },
];

export default function ServicesGrid() {
    return (
        <section className="py-24 sm:py-32 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <p className="text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-5">Our Services</p>
                    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-[1.1]">
                        Book trusted creative<br className="hidden sm:block" /> help.
                    </h2>
                    <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-lg font-normal leading-relaxed">
                        Professional services across every creative division — photography, events, design and more.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
                    {services.map((svc, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                        >
                            <Link
                                to={svc.path}
                                className="group flex flex-col bg-slate-50 dark:bg-white/[0.03] rounded-[1.25rem] border border-slate-100 dark:border-white/[0.06] hover:border-slate-200 dark:hover:border-white/10 hover:shadow-xl hover:shadow-slate-100/60 dark:hover:shadow-none overflow-hidden transition-all duration-400"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={svc.image}
                                        alt={svc.title}
                                        className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-600 ease-out"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <ArrowUpRight size={14} className="text-slate-700 dark:text-white" />
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="px-5 py-4">
                                    <span className="text-[13px] sm:text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
                                        {svc.title}
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

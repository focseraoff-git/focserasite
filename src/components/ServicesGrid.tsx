import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
        <section className="py-20 sm:py-28 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Our Services</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                        Book trusted creative help
                    </h2>
                </motion.div>

                {/* Auto-Scrolling Marquee */}
                <div className="relative w-full overflow-hidden">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none transition-colors duration-500" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none transition-colors duration-500" />

                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                        className="flex gap-5 w-max"
                    >
                        {[...services, ...services].map((svc, i) => (
                            <Link
                                key={i}
                                to={svc.path}
                                className="group flex flex-col items-center shrink-0 w-[220px] sm:w-[280px]"
                            >
                                <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={svc.image}
                                        alt={svc.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {svc.title}
                                </span>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

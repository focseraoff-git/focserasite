import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, MessageCircle, Quote, Sun } from 'lucide-react';

const THEME_DAYS = [
    { date: 'Feb 7', name: 'Rose Day', desc: 'Cinematic reel with a floral touch', icon: Heart },
    { date: 'Feb 8', name: 'Propose Day', desc: 'Capture the big question perfectly', icon: Quote },
    { date: 'Feb 9', name: 'Chocolate Day', desc: 'Sweet moments, sweeter frames', icon: Gift },
    { date: 'Feb 10', name: 'Teddy Day', desc: 'Candid vibes with your loved ones', icon: Gift },
    { date: 'Feb 11', name: 'Promise Day', desc: 'Areel that speaks forever', icon: MessageCircle },
    { date: 'Feb 12', name: 'Hug Day', desc: 'Warm embraces, frozen in time', icon: Heart },
    { date: 'Feb 13', name: 'Kiss Day', desc: 'Romantic cinematic portraits', icon: Heart },
    { date: 'Feb 14', name: 'Valentine’s Day', desc: 'The ultimate love story reel', icon: Heart },
    { date: 'Feb 15', name: 'Memory Day', desc: 'Reviewing the beautiful afterglow', icon: Sun },
];

const ThemedDaySlider = ({ onSelectTheme }: { onSelectTheme: (theme: string) => void }) => {
    return (
        <div className="w-full overflow-x-auto pb-8 pt-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-4 min-w-max">
                {THEME_DAYS.map((day, i) => (
                    <motion.div
                        key={day.name}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="w-72 bg-pink-900/10 backdrop-blur-md border border-pink-500/20 p-6 rounded-3xl flex flex-col gap-4 group hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all cursor-pointer relative overflow-hidden shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelectTheme(`${day.name} (${day.date})`);
                        }}
                    >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-2xl group-hover:from-pink-500/40 transition-all"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <span className="font-['Dancing_Script'] font-bold text-pink-400 text-3xl leading-none">{day.date}</span>
                            <div className="bg-pink-500/10 p-2 rounded-full backdrop-blur-sm group-hover:bg-pink-500/20 transition-colors">
                                <day.icon size={18} className="text-pink-300 group-hover:text-pink-100 transition-colors" />
                            </div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-pink-200 transition-colors">{day.name}</h3>
                            <p className="text-pink-200/60 text-sm leading-relaxed border-t border-pink-500/20 pt-3">{day.desc}</p>
                        </div>

                        <button
                            className="mt-2 w-full text-sm font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 py-3 px-4 rounded-xl shadow-lg shadow-pink-900/20 hover:shadow-pink-500/40 transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelectTheme(`${day.name} (${day.date})`);
                            }}
                        >
                            Book This Theme
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ThemedDaySlider;

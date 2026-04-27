import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`fixed top-24 right-6 z-[200] w-12 h-12 rounded-full flex items-center justify-center border shadow-lg backdrop-blur-xl transition-colors duration-500 ${
                isDark
                    ? 'bg-white/10 border-white/20 text-yellow-300 shadow-blue-500/20 hover:bg-white/15'
                    : 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50 hover:bg-slate-50'
            }`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
        </motion.button>
    );
}

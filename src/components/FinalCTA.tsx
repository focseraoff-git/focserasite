import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1D40] via-[#0a1628] to-[#061024] px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24 text-center"
        >
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-focsera-primary/15 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-blue-300 text-[11px] font-semibold tracking-wide mb-6 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Start your project today
            </motion.div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight mb-4">
              Ready to turn your vision{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                into reality?
              </span>
            </h2>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Get connected with trusted professionals today. One request is all it takes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <a
                href="https://wa.me/919515803954?text=Hi%20Focsera%2C%20I%27d%20like%20to%20start%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                id="final-cta-primary"
                className="flex items-center justify-center gap-2.5 bg-focsera-primary hover:bg-blue-600 text-white font-semibold text-[15px] px-8 py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] shadow-xl shadow-blue-500/25"
              >
                Start My Project
                <ArrowRight size={16} />
              </a>
              <a
                href="https://wa.me/919515803954?text=Hi%2C%20I%27d%20like%20to%20talk%20to%20an%20expert%20at%20Focsera."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.10] text-white/90 font-medium text-[15px] px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <MessageCircle size={16} />
                Talk to Expert
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

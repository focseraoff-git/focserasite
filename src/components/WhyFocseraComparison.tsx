import { motion } from 'framer-motion';
import { X, Check, Search, Phone, DollarSign, ClipboardList, Frown, Zap, ShieldCheck, FileText, Headphones, CheckCircle2 } from 'lucide-react';

const traditionalWay = [
  { icon: Search, text: 'Search everywhere for vendors' },
  { icon: ClipboardList, text: 'Compare dozens of options' },
  { icon: Phone, text: 'Call multiple people' },
  { icon: DollarSign, text: 'Negotiate pricing back and forth' },
  { icon: Frown, text: 'Manage execution yourself' },
];

const focseraWay = [
  { icon: Zap, text: 'One request — we handle the rest' },
  { icon: ShieldCheck, text: 'Verified professionals only' },
  { icon: FileText, text: 'Transparent, detailed quotations' },
  { icon: Headphones, text: 'Dedicated project support' },
  { icon: CheckCircle2, text: 'End-to-end execution managed' },
];

export default function WhyFocseraComparison() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[11px] font-bold text-focsera-primary uppercase tracking-[0.2em] mb-3">
            The Difference
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-focsera-text tracking-[-0.03em] leading-tight">
            Why Focsera?
          </h2>
          <p className="mt-4 text-focsera-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Stop managing vendors. Start managing outcomes.
          </p>
        </motion.div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100"
          >
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
              Without Focsera
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-6 tracking-tight">
              The Traditional Way
            </h3>
            <div className="space-y-4">
              {traditionalWay.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                      <X size={14} className="text-red-400" />
                    </div>
                    <span className="text-[13px] sm:text-sm text-gray-500 font-medium">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Focsera Way */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-gradient-to-br from-focsera-primary to-blue-600 rounded-2xl p-6 sm:p-8 shadow-xl shadow-blue-500/15 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-white/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-[11px] font-bold text-blue-200 uppercase tracking-[0.15em] mb-2">
                With Focsera
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 tracking-tight">
                The Smarter Way
              </h3>
              <div className="space-y-4">
                {focseraWay.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                        <Check size={14} className="text-emerald-300" />
                      </div>
                      <span className="text-[13px] sm:text-sm text-white/90 font-medium">{item.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

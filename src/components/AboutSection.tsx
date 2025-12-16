import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Trophy, PartyPopper, Shield } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "All Ages Welcome",
    description: "Games and activities designed for everyone, from kids to adults.",
  },
  {
    icon: Trophy,
    title: "Win & Redeem",
    description: "Earn points and redeem exciting prizes at our reward counters.",
  },
  {
    icon: PartyPopper,
    title: "Non-Stop Fun",
    description: "Two days of continuous games, food stalls, and entertainment.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Fully supervised activities with trained volunteers and safety protocols.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-gradient-radial relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About <span className="text-gold-gradient">ArenaX</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            ArenaX is a two-day, community-centric fun and activity festival hosted by Focsera Events, 
            exclusively for residents of the gated community. Designed to bring families, friends, and 
            neighbors together, ArenaX blends creativity, adventure, physical challenges, and interactive 
            experiences — all in a safe and engaging environment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <div className="relative p-8 border border-border hover:border-gold/30 rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(45_70%_47%/0.1)]">
                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/60">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { number: "2", label: "Days" },
            { number: "13+", label: "Games" },
            { number: "All", label: "Ages" },
            { number: "∞", label: "Memories" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-heading font-bold text-gold-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-foreground/60 uppercase tracking-wider text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Sun, Utensils, Gift, Music, Gamepad2 } from "lucide-react";

const activities = [
  { icon: Gamepad2, label: "Game Zones" },
  { icon: Gift, label: "Fun Challenges" },
  { icon: Utensils, label: "Food Trucks" },
  { icon: Gift, label: "Jewelry & Handicrafts" },
  { icon: Music, label: "Entertainment Booths" },
  { icon: Gift, label: "Prize Redemption" },
];

export const ScheduleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="schedule" className="py-24 bg-gradient-radial relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Event <span className="text-gold-gradient">Schedule</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            ArenaX will run continuously across two days, with games and stalls active throughout.
          </p>
        </motion.div>

        {/* Schedule Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Day 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden group-hover:border-gold/30 transition-all duration-300">
              {/* Day Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                <span className="text-gold text-sm font-medium">Day 1</span>
              </div>
              
              {/* Content */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Sun className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Evening Kickoff</h3>
                  <p className="text-muted-foreground">The Festival Begins</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-foreground/80 mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <span className="font-medium">6:00 PM – 9:00 PM</span>
              </div>

              <p className="text-foreground/70">
                Activities begin with a small kickoff and all game stalls open for participants to explore.
              </p>
            </div>
          </motion.div>

          {/* Day 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-gold/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden group-hover:border-gold/30 transition-all duration-300">
              {/* Day Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                <span className="text-gold text-sm font-medium">Day 2</span>
              </div>
              
              {/* Content */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Gamepad2 className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">Full Day Event</h3>
                  <p className="text-muted-foreground">The Main Celebration</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-foreground/80 mb-4">
                <Clock className="w-5 h-5 text-gold" />
                <span className="font-medium">10:00 AM – 9:00 PM</span>
              </div>

              <p className="text-foreground/70">
                Full-day event with all games active, prize counters operating, and food & merchandise stalls open.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Continuous Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-xl font-heading font-semibold text-foreground mb-6">
            Continuous Activities Across Both Days
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/30 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
              >
                <activity.icon className="w-4 h-4 text-gold" />
                <span className="text-sm text-foreground/80">{activity.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center text-muted-foreground mt-8 text-sm italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          No formal ceremonies — the event maintains a free-flowing, festival-like environment.
        </motion.p>
      </div>
    </section>
  );
};

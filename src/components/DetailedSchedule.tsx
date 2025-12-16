import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Sun, Moon, Utensils, Gift, Music, Gamepad2, Trophy, Users } from "lucide-react";

const day1Schedule = [
  { time: "6:00 - 6:30 PM", title: "Registration & Welcome", icon: Users, description: "Check-in at the registration desk and collect your game cards" },
  { time: "6:30 - 7:00 PM", title: "Opening Ceremony & Kickoff", icon: Trophy, description: "Brief welcome and event inauguration" },
  { time: "7:00 - 8:00 PM", title: "Game Zones Open", icon: Gamepad2, description: "All game stalls become active - start collecting points!" },
  { time: "8:00 - 8:30 PM", title: "Food & Refreshments", icon: Utensils, description: "Food trucks and refreshment stalls open" },
  { time: "8:30 - 9:00 PM", title: "Evening Games Continue", icon: Moon, description: "Final slots for Day 1 games and activities" },
];

const day2Schedule = [
  { time: "10:00 - 10:30 AM", title: "Morning Registration", icon: Users, description: "Registration desk opens for Day 2" },
  { time: "10:30 - 11:00 AM", title: "Day 2 Kickoff", icon: Sun, description: "Quick briefing and game zones open" },
  { time: "11:00 AM - 1:00 PM", title: "Morning Game Sessions", icon: Gamepad2, description: "All games active - Physical challenges, Skill games" },
  { time: "1:00 - 2:00 PM", title: "Lunch Break", icon: Utensils, description: "Food stalls, refreshments, and relaxation" },
  { time: "2:00 - 4:00 PM", title: "Afternoon Sessions", icon: Gamepad2, description: "Adventure games, Puzzles, and Mystery challenges" },
  { time: "4:00 - 4:30 PM", title: "Snacks Break", icon: Utensils, description: "Quick refreshment break" },
  { time: "4:30 - 6:00 PM", title: "Peak Hour Games", icon: Gamepad2, description: "High-energy games and competitions" },
  { time: "6:00 - 7:00 PM", title: "Special Challenges", icon: Trophy, description: "Squid Game, Murder Mystery, Among Us" },
  { time: "7:00 - 8:00 PM", title: "Evening Entertainment", icon: Music, description: "Ghost Story Telling, IPL Auction" },
  { time: "8:00 - 9:00 PM", title: "Closing & Prize Distribution", icon: Gift, description: "Final games, prize redemption, and closing ceremony" },
];

const continuousActivities = [
  { icon: Gamepad2, label: "Game Zones", available: "All Day" },
  { icon: Gift, label: "Prize Counter", available: "All Day" },
  { icon: Utensils, label: "Food Trucks", available: "All Day" },
  { icon: Gift, label: "Jewelry & Handicrafts", available: "All Day" },
  { icon: Music, label: "Entertainment Booths", available: "All Day" },
];

const TimeSlot = ({ item, index, isInView }: { item: typeof day1Schedule[0]; index: number; isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="flex gap-4 group"
  >
    {/* Timeline dot */}
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300">
        <item.icon className="w-5 h-5 text-gold" />
      </div>
      <div className="w-px flex-1 bg-gradient-to-b from-gold/30 to-transparent mt-2" />
    </div>
    
    {/* Content */}
    <div className="pb-8 flex-1">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gold font-medium text-sm">{item.time}</span>
      </div>
      <h4 className="text-lg font-heading font-semibold text-foreground group-hover:text-gold transition-colors">
        {item.title}
      </h4>
      <p className="text-sm text-foreground/60 mt-1">{item.description}</p>
    </div>
  </motion.div>
);

export const DetailedSchedule = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="schedule" className="py-24 bg-gradient-radial relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute left-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute right-0 top-1/4 w-px h-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 mb-6">
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-gold/80 text-sm">Detailed Timeline</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Event <span className="text-gold-gradient">Schedule</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Plan your ArenaX adventure with our detailed schedule. Every moment is designed for maximum fun!
          </p>
        </motion.div>

        {/* Schedule Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Day 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-card/30 border border-border backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                <Moon className="w-7 h-7 text-gold" />
              </div>
              <div>
                <span className="text-xs text-gold uppercase tracking-wider">Evening Event</span>
                <h3 className="text-2xl font-heading font-bold text-foreground">Day 1</h3>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                <span className="text-gold text-sm">6 PM - 9 PM</span>
              </div>
            </div>
            
            <div className="space-y-0">
              {day1Schedule.map((item, index) => (
                <TimeSlot key={item.title} item={item} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>

          {/* Day 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-2xl bg-card/30 border border-border backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                <Sun className="w-7 h-7 text-gold" />
              </div>
              <div>
                <span className="text-xs text-gold uppercase tracking-wider">Full Day Event</span>
                <h3 className="text-2xl font-heading font-bold text-foreground">Day 2</h3>
              </div>
              <div className="ml-auto px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                <span className="text-gold text-sm">10 AM - 9 PM</span>
              </div>
            </div>
            
            <div className="space-y-0 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {day2Schedule.map((item, index) => (
                <TimeSlot key={item.title} item={item} index={index} isInView={isInView} />
              ))}
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
            Available Throughout the Event
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {continuousActivities.map((activity, index) => (
              <motion.div
                key={activity.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-card/30 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300"
              >
                <activity.icon className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <span className="text-sm text-foreground font-medium">{activity.label}</span>
                  <p className="text-xs text-foreground/50">{activity.available}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center text-muted-foreground mt-10 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          * Schedule is subject to minor adjustments. The event maintains a free-flowing, festival-like environment.
        </motion.p>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Dumbbell, 
  Target, 
  Zap, 
  Ghost, 
  Search, 
  Crosshair,
  Gamepad2,
  Skull,
  Users,
  Coins
} from "lucide-react";

const games = [
  { icon: Dumbbell, name: "Gym Race", category: "Physical" },
  { icon: Target, name: "Sack Race", category: "Physical" },
  { icon: Zap, name: "Electric Wire Challenge", category: "Skill" },
  { icon: Gamepad2, name: "Squid Game Challenges", category: "Adventure" },
  { icon: Search, name: "Escape Room", category: "Puzzle" },
  { icon: Crosshair, name: "Treasure Hunt", category: "Adventure" },
  { icon: Target, name: "Ring Toss", category: "Skill" },
  { icon: Target, name: "Cup Throw", category: "Skill" },
  { icon: Crosshair, name: "Balloon Shooting", category: "Skill" },
  { icon: Ghost, name: "Ghost Story Telling", category: "Entertainment" },
  { icon: Skull, name: "Murder Mystery", category: "Puzzle" },
  { icon: Users, name: "Among Us (Real-Life)", category: "Adventure" },
  { icon: Coins, name: "IPL Auction", category: "Strategy" },
];

const categories = ["All", "Physical", "Skill", "Adventure", "Puzzle", "Entertainment", "Strategy"];

export const GamesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGames = activeCategory === "All" 
    ? games 
    : games.filter(game => game.category === activeCategory);

  return (
    <section id="games" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Games & <span className="text-gold-gradient">Challenges</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Experience a variety of exciting games and challenges designed for all skill levels.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gold text-primary-foreground shadow-[0_0_20px_hsl(45_70%_47%/0.4)]"
                  : "border border-border text-foreground/70 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          layout
        >
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="relative p-6 rounded-xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-gold/50 hover:shadow-[0_0_40px_hsl(45_70%_47%/0.15)]">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300">
                    <game.icon className="w-6 h-6 text-gold" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-gold transition-colors mb-1">
                    {game.name}
                  </h3>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {game.category}
                  </span>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center text-muted-foreground mt-8 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          All activities are conducted physically, supervised by event volunteers, and designed to be safe and enjoyable for all.
        </motion.p>
      </div>
    </section>
  );
};

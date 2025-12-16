import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ArenaNavbar";
import { Footer } from "@/components/ArenaFooter";
import { games, categories } from "@/data/gamesData";
import { ArrowRight, Clock, Users, Coins } from "lucide-react";

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  const filteredGames = activeCategory === "All"
    ? games
    : games.filter(game => game.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial" />
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                <span className="text-gold-gradient">Arena</span>
                <span className="text-foreground">X</span>
                <span className="text-foreground/60 text-4xl md:text-5xl ml-4">Games</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Discover 13+ exciting games designed for all ages. Click on any game to learn more!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 mb-12">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                    ? "bg-gold text-background gold-glow"
                    : "bg-card/50 text-foreground/70 border border-border hover:border-gold/50 hover:text-gold"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Games Grid */}
        <section className="container mx-auto px-4">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -30 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  <Link to={`/games/${game.id}`}>
                    <motion.div
                      className="relative group h-full"
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gold/20 blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredGame === game.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative h-full p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_40px_hsl(45_70%_47%/0.2)]">
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
                          <span className="text-gold text-xs font-medium">{game.category}</span>
                        </div>

                        {/* Icon with 3D effect */}
                        <motion.div
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 border border-gold/20"
                          whileHover={{
                            rotateY: 15,
                            rotateX: -15,
                            scale: 1.1
                          }}
                          transition={{ type: "spring", stiffness: 200 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <game.icon className="w-10 h-10 text-gold" />
                        </motion.div>

                        {/* Content */}
                        <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                          {game.name}
                        </h3>
                        <p className="text-foreground/60 text-sm mb-4 line-clamp-2">
                          {game.description}
                        </p>

                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-1 text-xs text-foreground/50">
                            <Clock className="w-3 h-3 text-gold" />
                            {game.duration}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-foreground/50">
                            <Users className="w-3 h-3 text-gold" />
                            {game.players}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-foreground/50">
                            <Coins className="w-3 h-3 text-gold" />
                            {game.price}
                          </div>
                        </div>

                        {/* Difficulty */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs text-foreground/50">Difficulty:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className={`w-2 h-2 rounded-full ${level <= (game.difficulty === "Easy" ? 1 : game.difficulty === "Medium" ? 2 : 3)
                                    ? "bg-gold"
                                    : "bg-foreground/20"
                                  }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                          className="flex items-center gap-2 text-gold font-medium text-sm"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>

                        {/* Decorative Corner */}
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gold/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

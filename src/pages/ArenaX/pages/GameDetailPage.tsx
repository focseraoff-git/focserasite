import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ArenaNavbar";
import { Footer } from "@/components/ArenaFooter";
import { games } from "@/data/gamesData";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft, Clock, Users, Coins, Target,
  CheckCircle2, Star, Sparkles
} from "lucide-react";

export default function GameDetailPage() {
  const { gameId } = useParams();
  const game = games.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">Game Not Found</h1>
          <Link to="/games">
            <Button variant="gold">Back to Games</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-radial" />
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                opacity: [0.5, 0.3, 0.5]
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/arenax/games">
                <Button variant="ghost" className="mb-8 text-foreground/70 hover:text-gold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Games
                </Button>
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Game Visual */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                {/* 3D Card Effect */}
                <motion.div
                  className="relative aspect-square max-w-md mx-auto"
                  whileHover={{ rotateY: 5, rotateX: -5 }}
                  style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gold/20 rounded-3xl blur-3xl" />

                  {/* Main Card */}
                  <div className="relative h-full rounded-3xl border-2 border-gold/30 bg-gradient-to-br from-card to-card/50 p-8 flex flex-col items-center justify-center overflow-hidden">
                    {/* Animated particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-gold/50 rounded-full"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${10 + i * 12}%`
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [1, 1.5, 1]
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      />
                    ))}

                    {/* Icon */}
                    <motion.div
                      className="w-40 h-40 rounded-3xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mb-6 border border-gold/30 gold-glow"
                      animate={{
                        boxShadow: [
                          "0 0 20px hsl(45 70% 47% / 0.3)",
                          "0 0 40px hsl(45 70% 47% / 0.5)",
                          "0 0 20px hsl(45 70% 47% / 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <game.icon className="w-20 h-20 text-gold" />
                    </motion.div>

                    {/* Category & Difficulty */}
                    <div className="flex gap-3">
                      <span className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-gold font-medium">
                        {game.category}
                      </span>
                      <span className={`px-4 py-2 rounded-full border font-medium ${game.difficulty === "Easy"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : game.difficulty === "Medium"
                          ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                          : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: Game Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-heading font-bold text-gold-gradient mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {game.name}
                </motion.h1>

                <motion.p
                  className="text-lg text-foreground/70 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {game.fullDescription}
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {[
                    { icon: Clock, label: "Duration", value: game.duration },
                    { icon: Users, label: "Players", value: game.players },
                    { icon: Target, label: "Age", value: game.ageGroup },
                    { icon: Coins, label: "Entry Fee", value: game.price },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="p-4 rounded-xl bg-card/50 border border-border hover:border-gold/30 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <stat.icon className="w-5 h-5 text-gold mb-2" />
                      <p className="text-xs text-foreground/50 mb-1">{stat.label}</p>
                      <p className="text-sm font-semibold text-foreground">{stat.value}</p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link to="/arenax/register">
                    <Button variant="gold" size="lg" className="gold-glow">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Register for This Game
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  <span className="text-gold-gradient">Game</span> Rules
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
              </div>

              <div className="space-y-4">
                {game.rules.map((rule, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/30 border border-border hover:border-gold/30 transition-all duration-300"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                    </div>
                    <p className="text-foreground/80 pt-1">{rule}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other Games Section */}
        <section className="py-16 bg-gradient-radial">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold mb-4">
                Explore More <span className="text-gold-gradient">Games</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {games.filter(g => g.id !== game.id).slice(0, 4).map((otherGame, index) => (
                <motion.div
                  key={otherGame.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/arenax/games/${otherGame.id}`}>
                    <motion.div
                      className="p-4 rounded-xl bg-card/30 border border-border hover:border-gold/30 transition-all duration-300 group"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                          <otherGame.icon className="w-6 h-6 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-foreground group-hover:text-gold transition-colors">
                            {otherGame.name}
                          </h3>
                          <p className="text-xs text-foreground/50">{otherGame.category}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

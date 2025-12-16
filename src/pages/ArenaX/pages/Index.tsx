import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/ArenaNavbar";
import { ParallaxHero } from "@/components/ParallaxHero";
import { Footer } from "@/components/ArenaFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2, Calendar, Users, Sparkles } from "lucide-react";

const quickLinks = [
  { icon: Gamepad2, title: "Explore Games", description: "Discover 13+ exciting games for all ages", href: "/arenax/games" },
  { icon: Calendar, title: "View Schedule", description: "Plan your 2-day ArenaX experience", href: "/arenax/schedule" },
  { icon: Users, title: "Volunteer", description: "Join our team of amazing volunteers", href: "/arenax/volunteers" },
  { icon: Sparkles, title: "Register Now", description: "Sign up for your favorite games", href: "/arenax/register" }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ParallaxHero />

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-radial relative overflow-hidden">
        <motion.div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Explore <span className="text-gold-gradient">ArenaX</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Your gateway to two days of non-stop fun, games, and community bonding!</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div key={link.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={link.href}>
                  <motion.div className="relative group h-full" whileHover={{ y: -10 }}>
                    <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative h-full p-8 rounded-2xl border border-border bg-gradient-to-br from-gold/20 to-gold/5 backdrop-blur-sm transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_40px_hsl(45_70%_47%/0.2)]">
                      <motion.div className="w-16 h-16 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <link.icon className="w-8 h-8 text-gold" />
                      </motion.div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-gold transition-colors">{link.title}</h3>
                      <p className="text-foreground/60 text-sm mb-4">{link.description}</p>
                      <div className="flex items-center gap-2 text-gold font-medium text-sm">Explore <ArrowRight className="w-4 h-4" /></div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">Ready to Join the <span className="text-gold-gradient">Fun?</span></h2>
            <p className="text-lg text-foreground/70 mb-8">Don't miss out on ArenaX – the ultimate community gaming experience!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/arenax/register"><Button variant="gold" size="xl" className="gold-glow gap-2"><Sparkles className="w-5 h-5" />Register for Games</Button></Link>
              <Link to="/arenax/games"><Button variant="goldOutline" size="xl" className="gap-2"><Gamepad2 className="w-5 h-5" />View All Games</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

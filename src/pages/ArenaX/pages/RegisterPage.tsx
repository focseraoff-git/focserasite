import { motion } from "framer-motion";
import { Navbar } from "@/components/ArenaNavbar";
import { Footer } from "@/components/ArenaFooter";
import { GameRegistrationForm } from "@/components/GameRegistrationForm";
import { GameCardBookingForm } from "@/components/GameCardBookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, CreditCard } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial" />
          <motion.div
            className="absolute top-10 left-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                <span className="text-gold-gradient">Register</span>
                <span className="text-foreground"> Now</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Join the excitement! Register for games or book your game cards
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Tabs defaultValue="game-registration" className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border mb-8">
                  <TabsTrigger
                    value="game-registration"
                    className="data-[state=active]:bg-gold data-[state=active]:text-background flex items-center gap-2"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    Game Registration
                  </TabsTrigger>
                  <TabsTrigger
                    value="game-card"
                    className="data-[state=active]:bg-gold data-[state=active]:text-background flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Book Game Cards
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="game-registration">
                  <GameRegistrationForm />
                </TabsContent>

                <TabsContent value="game-card">
                  <GameCardBookingForm />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

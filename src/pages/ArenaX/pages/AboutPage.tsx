import { motion } from "framer-motion";
import { Navbar } from "@/components/ArenaNavbar";
import { Footer } from "@/components/ArenaFooter";
import { AboutSection } from "@/components/AboutSection";
import { FAQSection } from "@/components/FAQSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial" />
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                About <span className="text-gold-gradient">ArenaX</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Learn about our community-centric fun and activity festival
              </p>
            </motion.div>
          </div>
        </section>

        <AboutSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}

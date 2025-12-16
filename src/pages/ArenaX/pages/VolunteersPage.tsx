import { motion } from "framer-motion";
import { Navbar } from "@/components/ArenaNavbar";
import { Footer } from "@/components/ArenaFooter";
import { VolunteerForm } from "@/components/VolunteerForm";
import { Heart, Users, Award, Clock } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Make a Difference",
    description: "Help create memorable experiences for your community"
  },
  {
    icon: Users,
    title: "Meet New People",
    description: "Connect with fellow residents and build lasting friendships"
  },
  {
    icon: Award,
    title: "Certificate of Appreciation",
    description: "Receive recognition for your valuable contribution"
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description: "Choose shifts that work with your schedule"
  }
];

export default function VolunteersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial" />
          <motion.div
            className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                Become a <span className="text-gold-gradient">Volunteer</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Join our team of amazing volunteers and help make ArenaX an unforgettable experience!
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="p-6 rounded-xl bg-card/30 border border-border hover:border-gold/30 transition-all duration-300 text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-foreground/60">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <VolunteerForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

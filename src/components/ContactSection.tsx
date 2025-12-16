import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Shield, AlertTriangle, Heart } from "lucide-react";
import { Button } from "./ui/button";

const safetyGuidelines = [
  "All games are designed with community safety protocols.",
  "Trained volunteers will be present at all activity zones.",
  "Basic first-aid support will be available at the event desk.",
  "Participants should avoid rushing or running in crowded areas.",
  "Children must remain within designated safe zones.",
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 bg-gradient-radial relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Get In <span className="text-gold-gradient">Touch</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-transparent mb-6" />
            <p className="text-lg text-foreground/70 mb-8">
              For inquiries, assistance, or support, reach out to the Focsera Events team.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <motion.a
                href="mailto:info.focsera@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email Us</p>
                  <p className="text-foreground font-medium">info.focsera@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                href="tel:9515803954"
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call Us</p>
                  <p className="text-foreground font-medium">9515803954</p>
                </div>
              </motion.a>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-foreground font-medium">Gated Community (Residents Only)</p>
                </div>
              </div>
            </div>

            <Button variant="gold" size="lg">
              Book Your Game Card
            </Button>
          </motion.div>

          {/* Safety Guidelines */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground">Safety Guidelines</h3>
              </div>

              <ul className="space-y-4">
                {safetyGuidelines.map((guideline, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-foreground/70">{guideline}</p>
                  </motion.li>
                ))}
              </ul>

              {/* Warning Note */}
              <div className="mt-6 p-4 rounded-xl bg-gold/5 border border-gold/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/70">
                  Use of unsafe or sharp items is strictly prohibited. Organisers reserve the right to stop or modify any activity for safety.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

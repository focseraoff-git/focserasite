import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/arenax">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl font-heading font-bold"
            >
              <span className="text-gold-gradient">Arena</span>
              <span className="text-foreground">X</span>
            </motion.div>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground/60">
            <Link to="/arenax/about" className="hover:text-gold transition-colors">About</Link>
            <Link to="/arenax/games" className="hover:text-gold transition-colors">Games</Link>
            <Link to="/arenax/schedule" className="hover:text-gold transition-colors">Schedule</Link>
            <Link to="/arenax/register" className="hover:text-gold transition-colors">Register</Link>
            <Link to="/arenax/volunteers" className="hover:text-gold transition-colors">Volunteers</Link>
            <Link to="/arenax/contact" className="hover:text-gold transition-colors">Contact</Link>
          </div>

          {/* Credits */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-foreground/60 flex items-center gap-1"
          >
            Made with <Heart className="w-4 h-4 text-gold fill-gold" /> by Focsera Events
          </motion.p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ArenaX. All rights reserved. Exclusively for community residents.
          </p>
        </div>
      </div>
    </footer>
  );
};

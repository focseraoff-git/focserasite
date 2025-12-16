import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gamepad2, UserPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/arenax/about", label: "About" },
  { href: "/arenax/games", label: "Games" },
  { href: "/arenax/schedule", label: "Schedule" },
  { href: "/arenax/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg shadow-gold/5" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/arenax">
            <motion.div
              className="text-2xl md:text-3xl font-heading font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gold-gradient">Arena</span>
              <span className="text-foreground">X</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  className={`font-medium relative group transition-colors duration-300 ${isActiveLink(link.href) ? "text-gold" : "text-foreground/80 hover:text-gold"
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActiveLink(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                </Link>
              </motion.div>
            ))}

            {/* Register & Volunteers Buttons */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/arenax/register">
                <Button variant="goldOutline" size="sm" className="gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  Register
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/arenax/volunteers">
                <Button variant="gold" size="sm" className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Volunteer
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-md border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`py-2 font-medium transition-colors ${isActiveLink(link.href) ? "text-gold" : "text-foreground/80 hover:text-gold"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/arenax/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="goldOutline" className="w-full gap-2">
                    <Gamepad2 className="w-4 h-4" />
                    Register for Games
                  </Button>
                </Link>
                <Link to="/arenax/volunteers" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="gold" className="w-full gap-2">
                    <UserPlus className="w-4 h-4" />
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

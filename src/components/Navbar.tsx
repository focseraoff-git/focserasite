import { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility: easily switch text color based on scroll/background
const getNavbarColor = (scrolled: boolean) => (scrolled ? "#0052CC" : "#FFFFFF");

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Divisions list
  const divisions = [
    { name: "Studios", path: "/studios" },
    { name: "Media", path: "/media" },
    { name: "Events", path: "/events" },
    { name: "Web", path: "/web" },
    { name: "Product Services", path: "/product-services" },
    { name: "Skill", path: "/skill" },
  ];

  // Scroll listener
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Click outside for menus
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
      setDivisionsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const textColor = getNavbarColor(scrolled);

  const navBgClass = scrolled
    ? "bg-white/40 backdrop-blur-2xl border border-white/20 shadow-lg"
    : "bg-transparent";

  return (
    <motion.nav
      initial={false}
      animate={{ color: textColor }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between
        px-6 py-3 rounded-full transition-all duration-500 z-50 ${navBgClass}`}
      style={{ color: textColor }}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-tight" style={{ color: textColor }}>
        FOCSERA
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-x-2">
        {["/", "/about", "/mission", "/journey", "/contact"].map((path) => (
          <Link
            key={path}
            to={path}
            className="relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full"
            style={{ color: textColor }}
          >
            <AnimatePresence>
              {isActive(path) && (
                <motion.div
                  layoutId="active-pill"
                  className={`absolute inset-0 rounded-full ${
                    scrolled ? "bg-blue-100/40" : "bg-white/20"
                  }`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </AnimatePresence>
            <span className="relative z-10">
              {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </span>
          </Link>
        ))}

        {/* Divisions Dropdown */}
        <div
          onMouseEnter={() => setDivisionsOpen(true)}
          onMouseLeave={() => setDivisionsOpen(false)}
          className="relative"
        >
          <button
            className="flex items-center gap-1 relative font-medium text-sm px-4 py-2 rounded-full transition-colors duration-300"
            style={{ color: textColor }}
            aria-expanded={divisionsOpen}
          >
            <span className="relative z-10">Divisions</span>
            <ChevronDown
              size={16}
              style={{ color: textColor }}
              className={`transition-transform ${divisionsOpen ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {divisionsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 
                    w-56 rounded-2xl shadow-xl p-2 bg-white/30 backdrop-blur-lg border border-white/10"
              >
                {divisions.map((d) => (
                  <motion.div
                    key={d.path}
                    whileHover={{ scale: 1.03 }}
                    className="block px-4 py-2 font-medium text-sm"
                    style={{ color: textColor }}
                  >
                    <Link to={d.path} style={{ color: textColor }}>
                      Focsera {d.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        aria-label="Toggle Menu"
        className="md:hidden"
        style={{ color: textColor }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        ref={menuButtonRef}
      >
        {mobileMenuOpen ? <X size={24} style={{ color: textColor }} /> : <Menu size={24} style={{ color: textColor }} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 top-16 w-64 p-4 rounded-2xl z-40 
                 bg-white/40 backdrop-blur-2xl border border-white/20 shadow-lg"
            style={{ color: textColor }}
          >
            {["Home", "About", "Mission", "Journey", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="block py-2 px-3 rounded-lg font-medium"
                style={{ color: textColor }}
              >
                {item}
              </Link>
            ))}

            <div className="mt-3">
              <button
                onClick={() => setDivisionsOpen(!divisionsOpen)}
                className="flex justify-between items-center w-full py-2 px-3 font-medium"
                style={{ color: textColor }}
              >
                Divisions
                <ChevronDown
                  size={16}
                  className={`transition-transform ${divisionsOpen ? "rotate-180" : ""}`}
                  style={{ color: textColor }}
                />
              </button>
              <AnimatePresence>
                {divisionsOpen &&
                  divisions.map((d) => (
                    <motion.div
                      key={d.path}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                      style={{ color: textColor }}
                    >
                      <Link
                        to={d.path}
                        className="block py-1 px-3 text-sm font-medium"
                        style={{ color: textColor }}
                      >
                        {d.name}
                      </Link>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const divisions = [
    { name: "Studios", path: "/studios" },
    { name: "Media", path: "/media" },
    { name: "Events", path: "/events" },
    { name: "Web", path: "/web" },
    { name: "Product Services", path: "/product-services" },
    { name: "Skill", path: "/skill" },
  ];

  // Handle scroll to toggle navbar background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Auto-close menus when clicking outside
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

  // Conditional background for navbar
  const navBgClass = scrolled
    ? "bg-white/40 backdrop-blur-2xl border border-white/20 shadow-lg"
    : "bg-transparent";

  // Conditional text color for FOCSERA logo
  const logoColorClass = scrolled ? "text-blue-700" : "text-white";

  const linkClass = (path: string) =>
    `relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
      isActive(path)
        ? "text-blue-700"
        : scrolled
        ? "text-gray-700 hover:text-blue-700"
        : "text-white hover:text-blue-200"
    }`;

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between 
        px-6 py-3 rounded-full transition-all duration-500 ${navBgClass} z-50`}
    >
      {/* Logo */}
      <motion.div
        initial={false}
        animate={{ color: scrolled ? "#0052CC" : "#FFFFFF" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Link
          to="/"
          className={`text-2xl font-extrabold tracking-tight ${logoColorClass}`}
        >
          FOCSERA
        </Link>
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-x-2">
        {["/", "/about", "/mission", "/journey", "/contact"].map((path, idx) => (
          <Link key={idx} to={path} className={linkClass(path)}>
            <AnimatePresence>
              {isActive(path) && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-blue-100/40"
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
            className={`flex items-center gap-1 ${linkClass("/divisions")}`}
            aria-expanded={divisionsOpen}
          >
            <span>Divisions</span>
            <ChevronDown
              size={16}
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
                    className="block px-4 py-2 text-gray-700 hover:text-blue-700 font-medium text-sm"
                  >
                    <Link to={d.path}>Focsera {d.name}</Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        ref={menuButtonRef}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden transition-transform ${logoColorClass}`}
        aria-label="Toggle Menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 top-16 w-64 p-4 rounded-2xl z-40 
                 bg-white/40 backdrop-blur-2xl border border-white/20 shadow-lg"
          >
            {["Home", "About", "Mission", "Journey", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="block py-2 px-3 rounded-lg text-gray-700 hover:text-blue-700"
              >
                {item}
              </Link>
            ))}

            <div className="mt-3">
              <button
                onClick={() => setDivisionsOpen(!divisionsOpen)}
                className="flex justify-between items-center w-full py-2 px-3 text-gray-700 font-medium"
              >
                Divisions
                <ChevronDown
                  size={16}
                  className={`transition-transform ${divisionsOpen ? "rotate-180" : ""}`}
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
                    >
                      <Link
                        to={d.path}
                        className="block py-1 px-3 text-sm text-gray-600 hover:text-blue-700"
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
    </nav>
  );
};

export default Navbar;

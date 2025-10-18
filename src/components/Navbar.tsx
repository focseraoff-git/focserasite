import { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

const getNavbarColor = (scrolled: boolean) => (scrolled ? "#0052CC" : "#FFFFFF");

const blueGradient = "linear-gradient(90deg,#1e3a8a 0%,#1560bd 100%)";
const lightBlueGradient = "linear-gradient(90deg,#e3ecfa 0%,#c9dbf6 100%)";

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

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

  const mainMenu = [
    { label: "Home", path: "/" },
    { label: "Divisions", type: "dropdown" },
    { label: "About", path: "/about" },
    { label: "Mission", path: "/mission" },
    { label: "Journey", path: "/journey" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
    ? "bg-white/95 backdrop-blur-xl border border-blue-100 shadow-xl"
    : "bg-blue-900/30 backdrop-blur-xl border border-blue-200 shadow-blue-300/20";

  return (
    <motion.nav
      initial={false}
      animate={{ color: textColor }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between
        px-6 py-3 rounded-full transition-all duration-500 z-50 ${navBgClass}`}
      style={{ color: textColor }}
    >
      {/* Logo Blue/White */}
      <Link to="/" className="relative group select-none">
        <span
          className="text-2xl font-black tracking-tight bg-clip-text text-transparent"
          style={{
            background: scrolled ? blueGradient : lightBlueGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FOCSERA
        </span>
        <div className="absolute -inset-2 bg-blue-500 rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-x-2">
        {mainMenu.map((item) =>
          item.type === "dropdown" ? (
            <div key={item.label} onMouseEnter={() => setDivisionsOpen(true)} onMouseLeave={() => setDivisionsOpen(false)} className="relative">
              <button
                className="flex items-center gap-1 font-bold text-base px-4 py-2 rounded-full transition-all"
                style={{ color: textColor }}
                aria-expanded={divisionsOpen}
              >
                <span>Divisions</span>
                <ChevronDown size={17} style={{ color: textColor }} className={`transition-transform ${divisionsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {divisionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl shadow-2xl p-2 bg-white/98 backdrop-blur-xl border border-blue-100 z-10"
                  >
                    {divisions.map((d) => (
                      <motion.div
                        key={d.path}
                        whileHover={{ scale: 1.04 }}
                        className="block px-4 py-2 font-bold text-base rounded-lg"
                        style={{ color: "#1560bd" }}
                      >
                        <Link to={d.path} style={{ color: "#1560bd" }}>
                          Focsera {d.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.path!}
              className="relative text-base font-bold transition-all duration-300 px-4 py-2 rounded-full hover:scale-105"
              style={{ color: textColor }}
            >
              <AnimatePresence>
                {isActive(item.path!) && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: scrolled
                        ? "linear-gradient(90deg,#dbeafe 0%,#a7c7f9 100%)"
                        : "linear-gradient(90deg,#1e3a8a33 0%,#1560bd22 100%)",
                      boxShadow: scrolled ? "0 2px 12px #1e3a8a22" : "0 2px 16px #1560bd44",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">{item.label}</span>
            </Link>
          )
        )}

        {/* Auth Button */}
        <Link
          to={user ? "/account" : "/login"}
          className="relative ml-2 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-base overflow-hidden group transition-all"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 transition-transform duration-300 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          <span className="relative z-10 text-white flex items-center gap-2">
            {user ? (
              <>
                <User size={18} />
                <span className="hidden lg:inline">Account</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Log In</span>
              </>
            )}
          </span>
        </Link>
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
            className="absolute right-0 top-16 w-64 p-4 rounded-2xl z-40 bg-white/98 backdrop-blur-xl border border-blue-100 shadow-2xl"
            style={{ color: "#1560bd" }}
          >
            {mainMenu.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label}>
                  <button
                    onClick={() => setDivisionsOpen(!divisionsOpen)}
                    className="flex justify-between items-center w-full py-2 px-3 font-bold rounded-lg"
                    style={{ color: "#1560bd" }}
                  >
                    Divisions
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${divisionsOpen ? "rotate-180" : ""}`}
                      style={{ color: "#1560bd" }}
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
                          style={{ color: "#1560bd" }}
                        >
                          <Link to={d.path} className="block py-1 px-3 text-base font-bold" style={{ color: "#1560bd" }}>
                            {d.name}
                          </Link>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className="block py-2 px-3 rounded-lg font-bold text-base"
                  style={{ color: "#1560bd" }}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <Link
                to={user ? "/account" : "/login"}
                className="relative flex items-center gap-2 py-3 px-4 rounded-full font-bold overflow-hidden group transition"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700"></div>
                <span className="relative z-10 text-white flex items-center gap-2">
                  {user ? (
                    <>
                      <User size={18} />
                      Account
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Log In
                    </>
                  )}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

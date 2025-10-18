import { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

const getNavbarColor = (scrolled: boolean) => (scrolled ? "#0052CC" : "#FFFFFF");

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

  // List of menu items in desired order (Divisions at 2nd)
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
    ? "bg-white/90 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-blue-500/10"
    : "bg-white/20 backdrop-blur-md border border-white/20";

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
      <Link to="/" className="relative group">
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          FOCSERA
        </span>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-x-2">
        {mainMenu.map((item) =>
          item.type === "dropdown" ? (
            // Divisions Dropdown as 2nd item
            <div
              key={item.label}
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
                        w-56 rounded-2xl shadow-2xl p-2 bg-white/95 backdrop-blur-2xl border border-white/50"
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
          ) : (
            // Regular links
            <Link
              key={item.label}
              to={item.path!}
              className="relative text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full hover:scale-105"
              style={{ color: textColor }}
            >
              <AnimatePresence>
                {isActive(item.path!) && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full ${
                      scrolled ? "bg-gradient-to-r from-blue-100 to-cyan-100" : "bg-white/30"
                    } shadow-md`}
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
          className="relative ml-2 flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-transform duration-300 group-hover:scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            className="absolute right-0 top-16 w-64 p-4 rounded-2xl z-40
                 bg-white/95 backdrop-blur-2xl border border-white/50 shadow-2xl"
            style={{ color: textColor }}
          >
            {mainMenu.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label}>
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
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className="block py-2 px-3 rounded-lg font-medium"
                  style={{ color: textColor }}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <Link
                to={user ? "/account" : "/login"}
                className="relative flex items-center gap-2 py-3 px-4 rounded-xl font-bold overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

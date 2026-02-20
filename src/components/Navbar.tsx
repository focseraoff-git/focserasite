
// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ FIXED: Using the standard 'supabase' client so it matches your Login page
import { supabase } from "../lib/supabase";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const divisionsRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const divisions = [
    { name: "Studios", path: "/studios" },
    { name: "Events", path: "/events" },
    { name: "Interiors", path: "/interiors" },
    { name: "Web", path: "/web" },
    { name: "Product Services", path: "/product-services" },
    { name: "Media", path: "/media" },
  ];

  const mainMenu = [
    { label: "Home", path: "/" },
    { label: "Divisions", type: "dropdown" },
    { label: "About", path: "/about" },
    // { label: "Mission", path: "/mission" },
    // { label: "Journey", path: "/journey" },
    { label: "Contact", path: "/contact" },
  ];

  // ✅ UPDATED: Robust Auth Check
  useEffect(() => {
    const checkUser = async () => {
      // 1. Check immediately
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();

    // 2. Listen for login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ✅ NEW: Force re-check whenever the URL changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, [location.pathname]);

  // --- Scroll Effect Logic ---
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
      if (divisionsRef.current && !divisionsRef.current.contains(target)) {
        setDivisionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between px-6 py-3 rounded-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen
        ? "bg-slate-950/80 border border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-xl" // Dark Glass Scrolled
        : "bg-transparent border border-transparent backdrop-blur-none" // Transparent Top
        }`}
    >
      {/* LOGO - Left aligned with flex-1 */}
      <div className="flex-1 flex justify-start z-50">
        <Link to="/" className="relative group flex items-center gap-3">
          <img
            src="/images/logos/logog.png"
            alt="Focsera Logo"
            className="h-8 w-auto object-contain brightness-0 invert" // Force white logo
            loading="eager"
            fetchPriority="high"
          />
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            FOCSERA
          </span>
        </Link>
      </div>

      {/* DESKTOP MENU - Centered in flow */}
      <div className={`hidden lg:flex items-center gap-1 p-1 rounded-full border transition-all duration-300 ${scrolled
        ? "bg-slate-900/50 border-slate-800"
        : "bg-white/5 border-white/10"
        }`}>
        {mainMenu.map((item) =>
          item.type === "dropdown" ? (
            <div
              key={item.label}
              onMouseEnter={() => setDivisionsOpen(true)}
              onMouseLeave={() => setDivisionsOpen(false)}
              className="relative"
            >
              <button
                className={`flex items-center gap-1 font-medium text-sm px-5 py-2 rounded-full transition-all duration-300 ${divisionsOpen
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                aria-expanded={divisionsOpen}
              >
                Divisions
                <ChevronDown size={14} className={`transition-transform duration-300 ${divisionsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {divisionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    ref={(el) => (divisionsRef.current = el)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] p-2 bg-slate-900 ring-1 ring-slate-800 border border-slate-800"
                  >
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 py-2">Discover</div>
                    {divisions.map((d) => (
                      <Link
                        key={d.path}
                        to={d.path}
                        className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors"
                      >
                        {d.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.path!}
              className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${isActive(item.path!)
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      {/* ACCOUNT BUTTON - Right aligned with flex-1 */}
      <div className="hidden lg:flex flex-1 justify-end z-50">
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        >
          {user ? <User size={16} /> : <Sparkles size={16} />}
          {user ? "Account" : "Start Here"}
        </Link>
      </div>

      {/* MOBILE MENU TOGGLE */}
      <button
        aria-label="Toggle Menu"
        className={`lg:hidden p-2 rounded-full transition-colors ${scrolled ? "text-white hover:bg-slate-800" : "text-white hover:bg-white/10"}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        ref={menuButtonRef}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-full mt-4 w-[calc(100vw-48px)] max-w-sm p-4 rounded-3xl z-50 bg-slate-900 border border-slate-800 shadow-[0_20px_50px_-5px_rgba(0,0,0,0.5)]"
          >
            <div className="space-y-1">
              {mainMenu.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.label} className="overflow-hidden rounded-2xl bg-slate-950/50 border border-slate-800">
                    <button
                      onClick={() => setDivisionsOpen(!divisionsOpen)}
                      className="flex justify-between items-center w-full py-3 px-4 font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                    >
                      Divisions
                      <ChevronDown size={16} className={`transition-transform duration-300 ${divisionsOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {divisionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-900 border-t border-slate-800 px-4 py-2 space-y-1"
                        >
                          {divisions.map((d) => (
                            <Link
                              key={d.path}
                              to={d.path}
                              className="block py-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {d.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path!}
                    className={`block py-3 px-4 rounded-2xl font-semibold transition-colors ${isActive(item.path!)
                      ? "bg-blue-600 text-white"
                      : "text-slate-200 hover:bg-slate-800"
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className={`mt-4 pt-4 border-t border-slate-800`}>
              <Link
                to={user ? "/account" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-lg hover:bg-slate-200 active:scale-95 transition-all"
              >
                {user ? <User size={18} /> : <LogIn size={18} />}
                {user ? "My Account" : "Log In / Sign Up"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

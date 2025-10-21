import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const location = useLocation();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const divisionsRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement>(null);

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
    const checkBackgroundColor = () => {
      if (!navRef.current) return;

      const navRect = navRef.current.getBoundingClientRect();
      const centerX = navRect.left + navRect.width / 2;
      const centerY = navRect.top + navRect.height / 2;

      const elementBehind = document.elementFromPoint(centerX, centerY + 100);

      if (elementBehind) {
        const bgColor = window.getComputedStyle(elementBehind).backgroundColor;
        const rgb = bgColor.match(/\d+/g);

        if (rgb && rgb.length >= 3) {
          const [r, g, b] = rgb.map(Number);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          setIsDarkBackground(brightness < 128);
        }
      }
    };

    // Run once initially
    checkBackgroundColor();

    // Throttle using requestAnimationFrame to avoid work on every scroll event
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          checkBackgroundColor();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // Close mobile menu only when click is outside mobile menu and menu button
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }

      // Close divisions dropdown only when click is outside the dropdown and its button
      if (divisionsRef.current && !divisionsRef.current.contains(target)) {
        // But also allow clicks on the divisions button (so the button can toggle)
        if (!(menuButtonRef.current && menuButtonRef.current.contains(target))) {
          setDivisionsOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const textColor = isDarkBackground ? "text-white" : "text-slate-700";
  const hoverTextColor = isDarkBackground ? "hover:text-blue-300" : "hover:text-blue-600";
  const activeTextColor = isDarkBackground ? "text-blue-300" : "text-blue-600";
  const activeBg = isDarkBackground ? "bg-white/10" : "bg-blue-50/80";
  const dropdownBg = isDarkBackground ? "bg-slate-900/95 border-slate-700" : "bg-white/95 border-slate-200";
  const dropdownTextColor = isDarkBackground ? "text-slate-300" : "text-slate-700";
  const dropdownHoverBg = isDarkBackground ? "hover:bg-slate-800" : "hover:bg-blue-50";
  const navBg = isDarkBackground
    ? "linear-gradient(135deg, rgba(15,23,42,0.15) 0%, rgba(15,23,42,0.05) 100%)"
    : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)";
  const borderColor = isDarkBackground ? "border-white/10" : "border-white/20";

  return (
    <motion.nav
      ref={navRef}
      initial={false}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-500 z-50 border ${borderColor} backdrop-blur-3xl`}
      style={{
        background: navBg,
      }}
    >
      <Link to="/" className="relative group flex items-center gap-3">
        <img
          src="public/images/logos/logog.png"
          alt="Focsera Logo"
          className="h-8 w-auto object-contain"
        />
        <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${isDarkBackground ? "text-white" : "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent"}`}>
          FOCSERA
        </span>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300"></div>
      </Link>

      <div className="hidden lg:flex items-center gap-1">
        {mainMenu.map((item) =>
          item.type === "dropdown" ? (
            <div
              key={item.label}
              onMouseEnter={() => setDivisionsOpen(true)}
              onMouseLeave={() => setDivisionsOpen(false)}
              className="relative"
            >
              <button
                className={`flex items-center gap-1 relative font-semibold text-sm px-3 py-1.5 rounded-full transition-all duration-500 ${textColor} ${hoverTextColor}`}
                aria-expanded={divisionsOpen}
              >
                <span className="relative z-10">Divisions</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${divisionsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {divisionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    ref={(el) => (divisionsRef.current = el)}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl p-2 backdrop-blur-xl border ${dropdownBg}`}
                  >
                    {divisions.map((d) => (
                      <Link
                        key={d.path}
                        to={d.path}
                        className={`block px-4 py-2.5 font-semibold text-sm rounded-xl transition-all duration-200 ${dropdownTextColor} ${hoverTextColor} ${dropdownHoverBg}`}
                      >
                        Focsera {d.name}
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
              className={`relative text-sm font-semibold transition-all duration-500 px-4 py-2 rounded-full ${
                isActive(item.path!)
                  ? `${activeTextColor} ${activeBg}`
                  : `${textColor} ${hoverTextColor}`
              }`}
            >
              {item.label}
            </Link>
          )
        )}

        <Link
          to={user ? "/account" : "/login"}
          className="relative ml-2 flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-sm transition-all duration-300 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-transform duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 text-white flex items-center gap-2">
            {user ? (
              <>
                <User size={18} />
                <span className="hidden xl:inline">Account</span>
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

      <button
        aria-label="Toggle Menu"
        className={`lg:hidden transition-colors duration-500 ${textColor} ${hoverTextColor}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        ref={menuButtonRef}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute right-4 top-full mt-2 w-72 p-3 rounded-2xl z-40 backdrop-blur-xl border shadow-xl ${dropdownBg}`}
          >
            {mainMenu.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label}>
                  <button
                    onClick={() => setDivisionsOpen(!divisionsOpen)}
                    className={`flex justify-between items-center w-full py-2.5 px-3 font-semibold rounded-xl transition-all duration-200 ${dropdownTextColor} ${hoverTextColor} ${dropdownHoverBg}`}
                  >
                    Divisions
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${divisionsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {divisionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="pl-3 space-y-1 mt-1"
                      >
                        {divisions.map((d) => (
                          <Link
                            key={d.path}
                            to={d.path}
                            className={`block py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${dropdownTextColor} ${hoverTextColor} ${dropdownHoverBg}`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Focsera {d.name}
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
                  className={`block py-2.5 px-3 rounded-xl font-semibold transition-all duration-200 ${
                    isActive(item.path!)
                      ? `${activeTextColor} ${activeBg}`
                      : `${dropdownTextColor} ${hoverTextColor} ${dropdownHoverBg}`
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className={`mt-3 pt-3 border-t ${isDarkBackground ? "border-slate-700" : "border-slate-200"}`}>
              <Link
                to={user ? "/account" : "/login"}
                className="relative flex items-center gap-2 py-3 px-4 rounded-xl font-bold overflow-hidden group"
                onClick={() => setMobileMenuOpen(false)}
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

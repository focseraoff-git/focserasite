import { FC, useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Note: Using a mock Supabase client for demonstration.
// Replace with your actual Supabase client initialization.
const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};

/**
 * Custom hook to determine which section is currently in the middle of the viewport.
 * It uses the IntersectionObserver API for performance.
 * @param {Array<React.RefObject<HTMLElement>>} sectionRefs - An array of refs to the sections to observe.
 * @param {string} defaultTheme - The default theme to return ('light' or 'dark').
 * @returns {string} The theme of the currently active section ('light' or 'dark').
 */
const useNavbarTheme = (sectionRefs, defaultTheme = 'dark') => {
  const [activeTheme, setActiveTheme] = useState(defaultTheme);
  const observerRef = useRef(null);

  useEffect(() => {
    // Disconnect previous observer if refs change
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme) {
              setActiveTheme(theme);
            }
          }
        });
      },
      {
        root: null,
        // This margin means the callback triggers when a section is in the vertical center of the viewport
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs, defaultTheme]);

  return activeTheme;
};

// --- Navbar Component ---
// This component is now "dumb" and only cares about the theme it's passed.
const Navbar = ({ theme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const divisions = [
    { name: "Studios", path: "/studios" }, { name: "Media", path: "/media" },
    { name: "Events", path: "/events" }, { name: "Web", path: "/web" },
    { name: "Product Services", path: "/product-services" }, { name: "Skill", path: "/skill" },
  ];
  const mainMenu = [
    { label: "Home", path: "/" }, { label: "Divisions", type: "dropdown" },
    { label: "About", path: "/about" }, { label: "Mission", path: "/mission" },
    { label: "Journey", path: "/journey" }, { label: "Contact", path: "/contact" },
  ];
  
  // --- User Auth Effect ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  // --- Click Outside Effect ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) &&
          menuButtonRef.current && !menuButtonRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  // --- THEME-BASED STYLING ---
  const isDark = theme === 'dark';

  const navClasses = isDark
    ? "border-slate-700/80 bg-slate-900/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
    : "border-white/40 bg-white/60 shadow-[0_8px_32px_0_rgba(59,130,246,0.1)]";

  const textColor = isDark ? "text-slate-300" : "text-slate-700";
  const hoverTextColor = isDark ? "hover:text-white" : "hover:text-blue-600";
  const activeTextColor = isDark ? "text-white" : "text-blue-600";
  const activePillColor = isDark ? "bg-white/10" : "bg-blue-100";
  const dropdownBg = isDark ? "bg-slate-900/80 border-slate-700" : "bg-white/90 border-slate-200";
  const dropdownLinkColor = isDark ? "text-slate-300" : "text-slate-700";
  const dropdownHoverBg = isDark ? "hover:bg-slate-800" : "hover:bg-blue-50";

  // Replace these with your actual logo URLs for light and dark backgrounds
  const logoSrc = isDark 
    ? "https://i.imgur.com/your-dark-theme-logo.png" 
    : "https://i.imgur.com/your-light-theme-logo.png";
  
  return (
    <motion.nav
      animate={{ color: isDark ? '#d1d5db' : '#374151' }}
      transition={{ duration: 0.4 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between px-4 sm:px-6 py-2 rounded-full transition-all duration-300 z-50 border backdrop-blur-xl ${navClasses}`}
    >
      <Link to="/" className="relative group flex items-center gap-3 shrink-0">
         <img
          src={logoSrc}
          alt="Focsera Logo"
          className="h-10 w-auto object-contain"
          onError={(e) => { 
            e.currentTarget.src = `https://placehold.co/140x40/${isDark ? '0f172a' : 'e2e8f0'}/${isDark ? 'e2e8f0' : '334155'}?text=Focsera&font=raleway`;
            e.currentTarget.onerror = null;
          }}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-1">
        {mainMenu.map((item) =>
          item.type === "dropdown" ? (
            <div key={item.label} className="relative" onMouseEnter={() => setDivisionsOpen(true)} onMouseLeave={() => setDivisionsOpen(false)}>
              <button className={`flex items-center gap-1 font-semibold text-sm px-4 py-2 rounded-full transition-colors duration-300 ${textColor} ${hoverTextColor}`}>
                Divisions
                <ChevronDown size={16} className={`transition-transform duration-300 ${divisionsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {divisionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl p-2 border ${dropdownBg}`}
                  >
                    {divisions.map((d) => (
                      <Link key={d.path} to={d.path} className={`block px-4 py-2.5 font-semibold text-sm rounded-xl transition-all duration-200 ${dropdownLinkColor} ${hoverTextColor} ${dropdownHoverBg}`}>
                        Focsera {d.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link key={item.label} to={item.path} className={`relative text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-full ${isActive(item.path) ? activeTextColor : `${textColor} ${hoverTextColor}`}`}>
              {isActive(item.path) && (
                <motion.div layoutId="active-pill" className={`absolute inset-0 rounded-full ${activePillColor}`}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10">{item.label}</span>
            </Link>
          )
        )}
      </div>

       {/* Auth & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <Link to={user ? "/account" : "/login"} className="relative hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-all duration-300 overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/40">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2">
            {user ? (<><User size={18} /> Account</>) : (<><LogIn size={18} /> Log In</>)}
          </span>
        </Link>
        <button aria-label="Toggle Menu" className={`lg:hidden transition-colors ${textColor} ${hoverTextColor}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} ref={menuButtonRef}>
          <AnimatePresence mode="wait">
            <motion.div key={mobileMenuOpen ? 'x' : 'menu'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div ref={mobileMenuRef} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className={`absolute right-4 top-full mt-2 w-72 p-3 rounded-2xl z-40 border shadow-xl ${dropdownBg}`}>
            {mainMenu.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label}>
                  <button onClick={() => setDivisionsOpen(!divisionsOpen)} className={`flex justify-between items-center w-full py-2.5 px-3 font-semibold rounded-xl transition-all duration-200 ${textColor} ${hoverTextColor} ${dropdownHoverBg}`}>
                    Divisions
                    <ChevronDown size={16} className={`transition-transform duration-300 ${divisionsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {divisionsOpen && divisions.map((d) => (
                    <Link key={d.path} to={d.path} onClick={() => setMobileMenuOpen(false)} className={`block py-2 px-6 text-sm font-medium rounded-lg transition-all duration-200 ${dropdownLinkColor} ${hoverTextColor} ${dropdownHoverBg}`}>
                      Focsera {d.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.label} to={item.path} onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3 rounded-xl font-semibold transition-all duration-200 ${isActive(item.path) ? `${activeTextColor} ${activePillColor}` : `${textColor} ${hoverTextColor} ${dropdownHoverBg}`}`}>
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <Link to={user ? "/account" : "/login"} onClick={() => setMobileMenuOpen(false)} className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-500">
                   {user ? (<><User size={18} /> Account</>) : (<><LogIn size={18} /> Log In</>)}
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};


// --- Main App Component ---
// This component demonstrates how to use the theme-aware Navbar.
const App = () => {
  // Create refs for each content section
  const darkSectionRef = useRef(null);
  const lightSectionRef = useRef(null);
  const anotherDarkSectionRef = useRef(null);

  // The hook returns the theme of the section currently in view
  const theme = useNavbarTheme([darkSectionRef, lightSectionRef, anotherDarkSectionRef], 'dark');

  return (
    <Router>
      {/* Pass the dynamic theme to the Navbar */}
      <Navbar theme={theme} />
      
      <main>
        {/* Add a data-theme attribute to each section */}
        <section
          ref={darkSectionRef}
          data-theme="dark"
          className="h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4"
        >
          <h1 className="text-5xl font-bold text-white">Dynamic Navbar</h1>
          <p className="text-xl text-slate-300 mt-4">Scroll down to see the theme change.</p>
        </section>

        <section
          ref={lightSectionRef}
          data-theme="light"
          className="h-screen bg-gray-100 flex items-center justify-center"
        >
          <h1 className="text-5xl font-bold text-gray-800">Light Section</h1>
        </section>

        <section
          ref={anotherDarkSectionRef}
          data-theme="dark"
          className="h-screen bg-[#0b0014] flex items-center justify-center"
        >
          <h1 className="text-5xl font-bold text-white">Another Dark Section</h1>
        </section>
      </main>
    </Router>
  );
};

export default App;


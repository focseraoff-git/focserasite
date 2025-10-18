import { FC, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

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

  const navBgClass = scrolled
    ? "bg-white/95 backdrop-blur-xl border-slate-200 shadow-lg"
    : "bg-white/80 backdrop-blur-md border-slate-100/50";

  return (
    <motion.nav
      initial={false}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between
        px-6 py-3.5 rounded-2xl transition-all duration-300 z-50 border ${navBgClass}`}
    >
      <Link to="/" className="relative group flex items-center">
        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
          FOCSERA
        </span>
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg opacity-0 group-hover:opacity-10 blur-sm transition-opacity duration-300"></div>
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
                className="flex items-center gap-1 relative font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300 text-slate-700 hover:text-blue-600 hover:bg-slate-50"
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl shadow-xl p-2 bg-white/95 backdrop-blur-xl border border-slate-200"
                  >
                    {divisions.map((d) => (
                      <Link
                        key={d.path}
                        to={d.path}
                        className="block px-4 py-2.5 font-semibold text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200"
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
              className={`relative text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-xl ${
                isActive(item.path!)
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </Link>
          )
        )}

        <Link
          to={user ? "/account" : "/login"}
          className="relative ml-2 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 overflow-hidden group"
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
        className="lg:hidden text-slate-700 hover:text-blue-600 transition-colors"
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
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-full mt-2 w-72 p-3 rounded-2xl z-40 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl"
          >
            {mainMenu.map((item) =>
              item.type === "dropdown" ? (
                <div key={item.label}>
                  <button
                    onClick={() => setDivisionsOpen(!divisionsOpen)}
                    className="flex justify-between items-center w-full py-2.5 px-3 font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all duration-200"
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
                        transition={{ duration: 0.2 }}
                        className="pl-3 space-y-1 mt-1"
                      >
                        {divisions.map((d) => (
                          <Link
                            key={d.path}
                            to={d.path}
                            className="block py-2 px-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
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
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-3 pt-3 border-t border-slate-200">
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

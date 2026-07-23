// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabase";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const solutionsRef = useRef<HTMLDivElement | null>(null);

  const solutions = [
    { name: "Celebrate", desc: "Events, Birthdays, Weddings", path: "/events", emoji: "🎉" },
    { name: "Grow", desc: "Branding, Website, Marketing", path: "/web", emoji: "📈" },
    { name: "Build", desc: "Interiors, Fabrication, Renovation", path: "/interiors", emoji: "🏗️" },
    { name: "Create", desc: "Photography, Video, Design", path: "/studios", emoji: "🎬" },
    { name: "Market", desc: "Ads, Social Media, SEO", path: "/marketing", emoji: "📣" },
    { name: "Learn", desc: "AI Workshops, Labs, Programs", path: "/labs", emoji: "🧠" },
  ];

  const mainMenu = [
    { label: "Solutions", type: "dropdown" },
    { label: "Industries", path: "/#industries" },
    { label: "Packages", path: "/#packages" },
    { label: "Partners", path: "/#partners" },
    { label: "For Schools", path: "/labs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Auth
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, [location.pathname]);

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target) && menuButtonRef.current && !menuButtonRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(target)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (path: string) => {
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = path;
      }
      return;
    }
  };

  const hasDarkHero = ["/", "/events", "/web", "/studios", "/promptx", "/ai-workshop", "/labs"].includes(location.pathname);
  const isDarkPage = true;
  const scrolledTheme = false;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${scrolled || mobileMenuOpen
        ? "bg-slate-950/40 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 sm:h-[72px]">

        {/* LOGO */}
        <Link to="/" className="relative group flex items-center gap-2.5 shrink-0">
          <div className="h-7 w-7 relative shrink-0">
            <img
              src="/images/logos/logog.png"
              alt="Focsera Logo"
              className={`absolute inset-0 h-full w-auto object-contain transition-opacity duration-500 ease-in-out ${scrolledTheme ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
            />
            <img
              src="/images/logos/logog.png"
              alt="Focsera Logo"
              className={`absolute inset-0 h-full w-auto object-contain brightness-0 invert transition-opacity duration-500 ease-in-out ${scrolledTheme ? 'opacity-0' : 'opacity-100'}`}
              loading="eager"
            />
          </div>
          <span className="text-lg font-serif font-bold text-white">
            focsera
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden xl:flex items-center gap-0.5">
          {mainMenu.map((item) =>
            item.type === "dropdown" ? (
              <div
                key={item.label}
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
                className="relative"
                ref={solutionsRef}
              >
                <button
                  className={`flex items-center gap-1 font-medium text-[13px] px-4 py-2 rounded-full transition-all duration-500 ease-in-out ${solutionsOpen
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  aria-expanded={solutionsOpen}
                >
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] rounded-2xl p-2 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border ${isDarkPage ? "bg-slate-950 border-slate-900" : "bg-white border-gray-100"
                        }`}
                    >
                      <div className={`text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-2 ${isDarkPage ? "text-slate-500" : "text-gray-400"
                        }`}>
                        What do you want to achieve?
                      </div>
                      {solutions.map((s) => (
                        <Link
                          key={s.path}
                          to={s.path}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors group/item ${isDarkPage ? "hover:bg-slate-900" : "hover:bg-focsera-accent"
                            }`}
                        >
                          <span className="text-lg">{s.emoji}</span>
                          <div>
                            <div className={`text-sm font-semibold transition-colors ${isDarkPage ? "text-white group-hover/item:text-blue-400" : "text-gray-900 group-hover/item:text-focsera-primary"
                              }`}>{s.name}</div>
                            <div className={`text-xs ${isDarkPage ? "text-slate-400" : "text-gray-500"}`}>{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              item.path?.startsWith("/#") ? (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.path!)}
                  className="text-[13px] font-medium px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/5 transition-all duration-500 ease-in-out"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.path!}
                  className={`text-[13px] font-medium px-4 py-2 rounded-full transition-all duration-500 ease-in-out ${isActive(item.path!)
                    ? "bg-white/10 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )
          )}
        </div>

        {/* RIGHT — CTA */}
        <div className="hidden xl:flex items-center gap-3">
          {user ? (
            <Link
              to="/account"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-focsera-primary text-white font-semibold text-[13px] hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-blue-500/20"
            >
              <User size={15} />
              Account
            </Link>
          ) : (
            <a
              href="https://wa.me/919515803954?text=Hi%20Focsera%2C%20I%27d%20like%20a%20free%20quote%20for%20my%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-focsera-primary text-white font-semibold text-[13px] hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-blue-500/20"
            >
              Get Free Quote
              <ArrowRight size={14} />
            </a>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          aria-label="Toggle Menu"
          className="xl:hidden p-2 rounded-full transition-colors text-white hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          ref={menuButtonRef}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`xl:hidden border-t overflow-hidden ${isDarkPage ? "bg-slate-950 border-slate-900" : "bg-white border-gray-100"
              }`}
          >
            <div className="max-w-7xl mx-auto px-5 py-4 space-y-1">
              {/* Solutions accordion */}
              <div className="rounded-xl overflow-hidden">
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className={`flex justify-between items-center w-full py-3 px-4 font-semibold rounded-xl transition-colors ${isDarkPage ? "text-white hover:bg-slate-900" : "text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  Solutions
                  <ChevronDown size={16} className={`transition-transform duration-300 text-gray-400 ${solutionsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-2 space-y-1"
                    >
                      {solutions.map((s) => (
                        <Link
                          key={s.path}
                          to={s.path}
                          className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${isDarkPage
                            ? "text-slate-300 hover:bg-slate-900 hover:text-white"
                            : "text-gray-600 hover:bg-focsera-accent hover:text-focsera-primary"
                            }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{s.emoji}</span>
                          <div>
                            <div className={`text-sm font-medium ${isDarkPage ? "text-white" : "text-gray-900"}`}>{s.name}</div>
                            <div className={`text-xs ${isDarkPage ? "text-slate-500" : "text-gray-400"}`}>{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Other menu items */}
              {mainMenu.filter(i => i.type !== "dropdown").map((item) => (
                item.path?.startsWith("/#") ? (
                  <button
                    key={item.label}
                    onClick={() => { handleNavClick(item.path!); setMobileMenuOpen(false); }}
                    className={`block w-full text-left py-3 px-4 rounded-xl font-semibold transition-colors ${isDarkPage ? "text-slate-300 hover:bg-slate-900" : "text-gray-750 hover:bg-gray-50"
                      }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    to={item.path!}
                    className={`block py-3 px-4 rounded-xl font-semibold transition-colors ${isActive(item.path!)
                      ? (isDarkPage ? "bg-slate-900 text-white" : "bg-focsera-accent text-focsera-primary")
                      : (isDarkPage ? "text-slate-300 hover:bg-slate-900" : "text-gray-700 hover:bg-gray-50")
                      }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}

              {/* CTA */}
              <div className={`pt-3 border-t mt-3 ${isDarkPage ? "border-slate-900" : "border-gray-100"}`}>
                {user ? (
                  <Link
                    to="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-focsera-primary text-white font-bold text-sm hover:bg-blue-600 active:scale-[0.97] transition-all"
                  >
                    <User size={16} />
                    My Account
                  </Link>
                ) : (
                  <a
                    href="https://wa.me/919515803954?text=Hi%20Focsera%2C%20I%27d%20like%20a%20free%20quote%20for%20my%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-focsera-primary text-white font-bold text-sm hover:bg-blue-600 active:scale-[0.97] transition-all"
                  >
                    Get Free Quote
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

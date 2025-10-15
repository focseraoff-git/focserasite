import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const divisionsRef = useRef(null);
  const mobileRef = useRef(null);

  const isHomePage = location.pathname === '/';

  const divisions = [
    { name: 'Studios', path: '/studios' },
    { name: 'Media', path: '/media' },
    { name: 'Events', path: '/events' },
    { name: 'Web', path: '/web' },
    { name: 'Product Services', path: '/product-services' },
    { name: 'Skill', path: '/skill' },
  ];

  // Scroll handler for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divisionsRef.current && !divisionsRef.current.contains(event.target)) {
        setDivisionsOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClasses = (path) =>
    `font-medium transition-all hover:scale-105 ${
      scrolled || !isHomePage
        ? location.pathname === path
          ? 'text-[#0052CC]'
          : 'text-gray-700 hover:text-[#0052CC]'
        : location.pathname === path
        ? 'text-white'
        : 'text-white hover:text-[#ECECEC]'
    }`;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled || !isHomePage
          ? 'glossy-card shadow-2xl backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div
              className={`text-2xl font-bold transition-colors ${
                scrolled || !isHomePage ? 'text-[#0052CC]' : 'text-white'
              }`}
            >
              FOCSERA
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClasses('/')}>
              Home
            </Link>
            <Link to="/about" className={linkClasses('/about')}>
              About
            </Link>

            <div
              className="relative"
              ref={divisionsRef}
              onMouseEnter={() => setDivisionsOpen(true)}
              onMouseLeave={() => setDivisionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 font-medium transition-all hover:scale-105 ${
                  scrolled || !isHomePage
                    ? 'text-gray-700 hover:text-[#0052CC]'
                    : 'text-white hover:text-[#ECECEC]'
                }`}
              >
                Divisions
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    divisionsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {divisionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-3 w-56 glossy-card rounded-2xl shadow-2xl py-2 border border-gray-100"
                  >
                    {divisions.map((division) => (
                      <Link
                        key={division.path}
                        to={division.path}
                        className="block px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#0052CC]/10 hover:to-[#0066FF]/10 hover:text-[#0052CC] transition-all font-medium"
                      >
                        Focsera {division.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/mission" className={linkClasses('/mission')}>
              Mission
            </Link>
            <Link to="/contact" className={linkClasses('/contact')}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden transition-all ${
              scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glossy-card border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link
                to="/"
                className="block py-3 text-gray-700 hover:text-[#0052CC] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block py-3 text-gray-700 hover:text-[#0052CC] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              <div className="py-2">
                <button
                  onClick={() => setDivisionsOpen(!divisionsOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-[#0052CC] w-full font-medium py-1"
                >
                  Divisions
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      divisionsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {divisionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="pl-4 mt-2 space-y-1"
                    >
                      {divisions.map((division) => (
                        <Link
                          key={division.path}
                          to={division.path}
                          className="block py-2 text-sm text-gray-600 hover:text-[#0052CC]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {division.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/mission"
                className="block py-3 text-gray-700 hover:text-[#0052CC] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mission
              </Link>
              <Link
                to="/contact"
                className="block py-3 text-gray-700 hover:text-[#0052CC] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

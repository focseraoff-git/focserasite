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
  const mobileToggleRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isHomePage = location.pathname === '/';
  const navBgClass = scrolled || !isHomePage || mobileMenuOpen ? 'glossy-pill' : 'bg-transparent';
  const linkColorClass = scrolled || !isHomePage || mobileMenuOpen ? 'text-gray-800' : 'text-white';
  const activeLinkColor = scrolled || !isHomePage || mobileMenuOpen ? 'text-[#0052CC]' : 'text-white';

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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check scroll position on initial load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divisionsRef.current && !divisionsRef.current.contains(event.target)) {
        setDivisionsOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileToggleRef.current &&
        !mobileToggleRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);


  const linkClasses = (path) =>
    `relative font-medium text-sm transition-colors duration-300 hover:text-[#0052CC] px-4 py-2 rounded-full ${
      location.pathname === path ? `${activeLinkColor}` : linkColorClass
    }`;

  const activeLinkIndicator = (path) => {
    if (location.pathname === path) {
      return (
        <motion.div
          layoutId="active-pill"
          className={`absolute inset-0 rounded-full ${scrolled || !isHomePage || mobileMenuOpen ? 'bg-blue-100/80' : 'bg-white/20'}`}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      );
    }
    return null;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4">
        <div className={`flex items-center justify-between w-full max-w-fit h-16 px-4 transition-all duration-300 rounded-full ${navBgClass}`}>
          {/* Logo */}
          <Link to="/" className={`text-2xl font-bold transition-colors duration-300 pl-2 ${linkColorClass}`}>
            FOCSERA
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-x-2 ml-8">
            <Link to="/" className={linkClasses('/')}>{activeLinkIndicator('/')} <span className="relative z-10">Home</span></Link>
            <Link to="/about" className={linkClasses('/about')}>{activeLinkIndicator('/about')} <span className="relative z-10">About</span></Link>

            <div
              className="relative"
              ref={divisionsRef}
              onMouseEnter={() => setDivisionsOpen(true)}
              onMouseLeave={() => setDivisionsOpen(false)}
            >
              <button className={`${linkClasses('/divisions')} flex items-center gap-1`}>
                <span className="relative z-10">Divisions</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${divisionsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {divisionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl shadow-xl p-2 glossy-pill border border-white/10"
                  >
                    {divisions.map((division) => (
                      <Link
                        key={division.path}
                        to={division.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-100/80 rounded-lg transition-all font-medium text-sm"
                      >
                        Focsera {division.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/mission" className={linkClasses('/mission')}>{activeLinkIndicator('/mission')} <span className="relative z-10">Mission</span></Link>
            <Link to="/journey" className={linkClasses('/journey')}>{activeLinkIndicator('/journey')} <span className="relative z-10">Journey</span></Link>
            <Link to="/contact" className={linkClasses('/contact')}>{activeLinkIndicator('/contact')} <span className="relative z-10">Contact</span></Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
            <button
              ref={mobileToggleRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors duration-300 ${linkColorClass}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 p-4 glossy-pill rounded-3xl shadow-xl border border-white/10"
          >
            <div className="space-y-2">
              <Link to="/" className="block py-2 px-3 text-gray-700 hover:bg-blue-100/80 rounded-lg font-medium">Home</Link>
              <Link to="/about" className="block py-2 px-3 text-gray-700 hover:bg-blue-100/80 rounded-lg font-medium">About</Link>
              <div>
                <button
                  onClick={() => setDivisionsOpen(!divisionsOpen)}
                  className="flex justify-between items-center w-full py-2 px-3 text-gray-700 hover:bg-blue-100/80 rounded-lg font-medium"
                >
                  Divisions
                  <ChevronDown size={16} className={`transition-transform ${divisionsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {divisionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-1"
                    >
                      {divisions.map((division) => (
                        <Link key={division.path} to={division.path} className="block py-2 px-3 text-sm text-gray-600 hover:text-[#0052CC] rounded-lg">
                          {division.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/mission" className="block py-2 px-3 text-gray-700 hover:bg-blue-100/80 rounded-lg font-medium">Mission</Link>
              <Link to="/journey" className="block py-2 px-3 text-gray-700 hover:bg-blue-100/80 rounded-lg font-medium">Journey</Link>
              <Link to="/contact" className="block py-2 px-3 text-gray-700 hover:bg-blue-100/80 rounded-lg font-medium">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
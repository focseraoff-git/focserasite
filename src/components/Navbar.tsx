import { useState, useEffect, useRef } from 'react';
// Note: In a real app, you would use 'react-router-dom'
// For this standalone example, we'll use anchor tags.
// import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

// Mock Link and useLocation for standalone functionality
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
const useLocation = () => ({ pathname: window.location.pathname });

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const divisionsRef = useRef(null);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to handle clicking outside of the divisions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divisionsRef.current && !divisionsRef.current.contains(event.target)) {
        setDivisionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHomePage = location.pathname === '/';

  const divisions = [
    { name: 'Studios', path: '/studios' },
    { name: 'Media', path: '/media' },
    { name: 'Events', path: '/events' },
    { name: 'Web', path: '/web' },
    { name: 'Product Services', path: '/product-services' },
    { name: 'Skill', path: '/skill' }
  ];
  
  const navLinkClasses = (scrolled, isHome) => 
    `transition-colors duration-200 ${scrolled || !isHome ? 'text-gray-700 hover:text-[#0052CC]' : 'text-white hover:text-gray-200'}`;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHomePage ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className={`text-2xl font-bold ${scrolled || !isHomePage ? 'text-[#0052CC]' : 'text-white'}`}>FOCSERA</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClasses(scrolled, isHomePage)}>
              Home
            </Link>
            <Link to="#/about" className={navLinkClasses(scrolled, isHomePage)}>
              About
            </Link>

            {/* Desktop Divisions Dropdown */}
            <div className="relative" ref={divisionsRef}>
              <button
                onClick={() => setDivisionsOpen(!divisionsOpen)}
                className={`flex items-center gap-1 ${navLinkClasses(scrolled, isHomePage)}`}
              >
                Divisions
                <ChevronDown size={16} className={`transition-transform duration-200 ${divisionsOpen ? 'rotate-180' : ''}`} />
              </button>

              {divisionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl py-2 animate-fade-in-down">
                  {divisions.map((division) => (
                    <Link
                      key={division.path}
                      to={division.path}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#0052CC]/10 hover:text-[#0052CC] transition-colors"
                      onClick={() => setDivisionsOpen(false)}
                    >
                      Focsera {division.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="#/mission" className={navLinkClasses(scrolled, isHomePage)}>
              Mission
            </Link>
            <Link to="#/contact" className={navLinkClasses(scrolled, isHomePage)}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${scrolled || !isHomePage ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-slide-in-down">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="#/about" className="block py-2 text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>About</Link>

            {/* Mobile Divisions Dropdown */}
            <div className="py-2">
              <button
                onClick={() => setDivisionsOpen(!divisionsOpen)}
                className="flex items-center justify-between gap-1 text-gray-700 hover:text-[#0052CC] w-full py-2"
              >
                <span>Divisions</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${divisionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {divisionsOpen && (
                <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-200 animate-fade-in">
                  {divisions.map((division) => (
                    <Link
                      key={division.path}
                      to={division.path}
                      className="block py-1 text-sm text-gray-600 hover:text-[#0052CC]"
                      onClick={() => {
                          setDivisionsOpen(false);
                          setMobileMenuOpen(false);
                      }}
                    >
                      {division.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="#/mission" className="block py-2 text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Mission</Link>
            <Link to="#/contact" className="block py-2 text-gray-700 hover:text-[#0052CC]" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
      
      {/* Adding some simple keyframe animations for better UX */}
      <style>{`
        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-10px) translateX(-50%); }
            to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }

        @keyframes slide-in-down {
            from { opacity: 0; transform: translateY(-10%); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-down { animation: slide-in-down 0.3s ease-out forwards; }
        
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </nav>
  );
}

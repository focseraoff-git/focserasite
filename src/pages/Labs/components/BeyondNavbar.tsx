import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sparkles, PhoneCall } from 'lucide-react';
import { BeyondLogo } from './BeyondLogo';

interface BeyondNavbarProps {
  onOpenPartnerModal: (program?: string) => void;
}

export const BeyondNavbar: React.FC<BeyondNavbarProps> = ({ onOpenPartnerModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Experiences', href: '#experiences' },
    { label: 'Programs', href: '#programs' },
    { label: 'For Schools', href: '#schools' },
    { label: 'Plans', href: '#plans' },
    { label: 'How It Works', href: '#process' },
    { label: 'Moments', href: '#gallery' },
    { label: 'Why Beyond', href: '#why' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFF9EF]/90 backdrop-blur-md border-b-2 border-[#35102F]/15 py-3 shadow-[0_4px_20px_rgba(53,16,47,0.06)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <BeyondLogo variant="dark" size="sm" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-[#35102F]/[0.04] border border-[#35102F]/10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-1 text-xs xl:text-sm font-semibold text-[#35102F]/80 hover:text-[#35102F] rounded-full hover:bg-white/80 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#35102F]/70 hover:text-[#35102F] rounded-full hover:bg-[#35102F]/5 transition-colors"
              title="Return to Focsera Main Site"
            >
              <span>← Focsera Main</span>
            </Link>

            <button
              onClick={() => onOpenPartnerModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C7EB49] text-[#35102F] font-black text-xs uppercase tracking-wider rounded-full border-2 border-[#35102F] shadow-[2px_3px_0px_#35102F] hover:shadow-[1px_1px_0px_#35102F] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner With Us</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenPartnerModal()}
              className="px-3 py-1.5 bg-[#C7EB49] text-[#35102F] font-black text-[11px] uppercase tracking-wider rounded-full border-2 border-[#35102F] shadow-[2px_2px_0px_#35102F]"
            >
              Partner
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-2xl bg-[#EDE2FA] border-2 border-[#35102F] text-[#35102F] flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_#35102F]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 mx-4 p-5 bg-[#FFF9EF] border-2 border-[#35102F] rounded-3xl shadow-[4px_6px_0px_#35102F] flex flex-col gap-2">
            <div className="pb-3 border-b border-[#35102F]/15 flex items-center justify-between">
              <span className="text-xs font-black uppercase text-[#35102F]/60 tracking-wider">Navigation</span>
              <Link to="/" className="text-xs font-bold text-[#35102F] flex items-center gap-1 hover:underline">
                Focsera Home <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 px-3 font-black text-sm text-[#35102F] hover:bg-[#EDE2FA] rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#35102F]/15 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPartnerModal();
                }}
                className="w-full py-3 bg-[#C7EB49] text-[#35102F] font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-[#35102F] shadow-[2px_3px_0px_#35102F] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Partner With Us
              </button>
              <a
                href="https://wa.me/919515803954?text=Hi%20Focsera!%20I'm%20interested%20in%20Beyond%20by%20Focsera%20education%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#EDE2FA] text-[#35102F] font-bold text-xs rounded-2xl border-2 border-[#35102F] text-center"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default BeyondNavbar;

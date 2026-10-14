import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { BeyondLogo } from './BeyondLogo';

export const BeyondFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const programLinks = [
    { label: 'PromptX AI Workshop', href: '#programs' },
    { label: 'InnovateX Summit', href: '#programs' },
    { label: 'Beyond Year-Long Program', href: '#programs' },
    { label: 'Institutional Skill Labs', href: '#schools' },
    { label: 'Partnership Tiers', href: '#plans' },
  ];

  const parentServices = [
    { label: 'Focsera Home', path: '/' },
    { label: 'Focsera Events', path: '/events' },
    { label: 'Focsera Studios', path: '/studios' },
    { label: 'Focsera Web & Growth', path: '/web' },
    { label: 'Focsera Interiors', path: '/interiors' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/focsera/?originalSubdomain=in', icon: Linkedin },
    { name: 'Instagram', href: 'https://www.instagram.com/focsera.in/', icon: Instagram },
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61582302131809', icon: Facebook },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#35102F] text-[#FFF9EF] border-t-2 border-[#35102F] pt-16 sm:pt-20 pb-12 relative overflow-hidden">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#C7EB49]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">

          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <BeyondLogo variant="light" size="md" showTagline />
              <p className="mt-5 text-sm sm:text-base text-white/75 leading-relaxed beyond-font-sans font-normal max-w-sm">
                Beyond is where students discover tomorrow’s technologies, develop real-world skills,
                and experience learning in exciting new ways.
              </p>
            </div>

            {/* Parent company attribution badge */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
              <span className="text-xs text-white/60">An initiative of</span>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-[#C7EB49] transition-colors"
              >
                <span>Focsera Technologies</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Col 2: Program Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C7EB49] mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programLinks.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Parent Platform Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C7EB49] mb-4">
              Focsera Network
            </h4>
            <ul className="space-y-2.5">
              {parentServices.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#C7EB49] mb-4">
              Campus Relations
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/80">
              <a
                href="tel:+919515803954"
                className="flex items-center gap-2 hover:text-[#C7EB49] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C7EB49] shrink-0" />
                <span>+91 95158 03954</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C7EB49] shrink-0 mt-0.5" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <a
                href="https://wa.me/919515803954?text=Hi%20Focsera!%20I'm%20interested%20in%20Beyond%20by%20Focsera."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#C7EB49] hover:text-[#35102F] text-xs font-bold text-white transition-colors mt-2"
              >
                <span>WhatsApp Coordinator</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C7EB49] hover:text-[#35102F] border border-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label={s.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} Beyond by Focsera. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BeyondFooter;

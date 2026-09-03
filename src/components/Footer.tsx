import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

const solutionLinks = [
  { name: 'Celebrate', path: '/events' },
  { name: 'Grow', path: '/web' },
  { name: 'Build', path: '/interiors' },
  { name: 'Create', path: '/studios' },
  { name: 'Learn', path: '/labs' },
];

const companyLinks = [
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Partners', path: '/contact' },
  { name: 'For Schools', path: '/labs' },
];

const legalLinks = [
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'Refund Policy', path: '/refund-policy' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/focsera/?originalSubdomain=in', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/focsera.in/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61582302131809', icon: Facebook },
];

interface FooterLinkProps {
  to: string;
  isDarkPage: boolean;
  children: React.ReactNode;
}
const FooterLink: FC<FooterLinkProps> = ({ to, isDarkPage, children }) => (
  <li>
    <Link
      to={to}
      className={`transition-colors duration-300 text-[13px] font-medium ${isDarkPage
          ? "text-slate-400 hover:text-white"
          : "text-gray-500 hover:text-focsera-primary"
        }`}
    >
      {children}
    </Link>
  </li>
);

const Footer: FC = () => {
  const location = useLocation();
  const isDarkPage = ["/events", "/web", "/studios", "/labs", "/marketing"].includes(location.pathname);

  return (
    <footer className={`relative py-16 sm:py-20 border-t transition-colors duration-500 ${isDarkPage
        ? "bg-[#02040a] border-slate-900/80"
        : "bg-white border-gray-100"
      }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-10 sm:gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/images/logos/logog.png"
                alt="Focsera"
                className={`h-7 w-auto object-contain transition-all duration-300 ${isDarkPage ? 'brightness-0 invert' : ''}`}
              />
              <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isDarkPage ? 'text-white' : 'text-focsera-text'}`}>
                FOCSERA
              </span>
            </Link>
            <p className={`text-[13px] leading-relaxed mb-5 max-w-xs transition-colors duration-300 ${isDarkPage ? 'text-slate-450' : 'text-focsera-muted'}`}>
              From Vision to Execution.
              <br />
              India's platform for getting important projects completed through trusted professionals.
            </p>
            {/* Social */}
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${isDarkPage
                      ? "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
                      : "bg-gray-50 hover:bg-focsera-accent text-gray-400 hover:text-focsera-primary"
                    }`}
                  aria-label={social.name}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className={`text-[12px] font-bold uppercase tracking-[0.1em] mb-4 ${isDarkPage ? 'text-slate-200' : 'text-focsera-text'}`}>
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {solutionLinks.map((link) => (
                <FooterLink key={link.name} to={link.path} isDarkPage={isDarkPage}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={`text-[12px] font-bold uppercase tracking-[0.1em] mb-4 ${isDarkPage ? 'text-slate-200' : 'text-focsera-text'}`}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <FooterLink key={link.name} to={link.path} isDarkPage={isDarkPage}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`text-[12px] font-bold uppercase tracking-[0.1em] mb-4 ${isDarkPage ? 'text-slate-200' : 'text-focsera-text'}`}>
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <FooterLink key={link.name} to={link.path} isDarkPage={isDarkPage}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 ${isDarkPage ? 'border-slate-900/80' : 'border-gray-100'}`}>
          <p className="text-[12px] text-gray-400">
            &copy; {new Date().getFullYear()} Focsera. All rights reserved.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-focsera-primary text-white rounded-lg hover:bg-blue-600 transition-all shadow-cta"
          >
            Download Focsera App
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

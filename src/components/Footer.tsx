import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

// Data for the footer links, making them easy to manage
const divisions = [
  { name: 'Studios', path: '/studios' },
  { name: 'Media', path: '/media' },
  { name: 'Events', path: '/events' },
  { name: 'Web', path: '/web' },
  { name: 'Product Services', path: '/product-services' },
  { name: 'Skill', path: '/skill' },
];

const companyLinks = [
  { name: 'About', path: '/about' },
  { name: 'Mission', path: '/mission' },
  { name: 'Careers', path: '/contact' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/focsera/?originalSubdomain=in', icon: Linkedin },
  { name: 'Instagram', href: 'https://www.instagram.com/focsera.in/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61582302131809', icon: Facebook },
];

// A reusable component for footer links to reduce repetition
interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}
const FooterLink: FC<FooterLinkProps> = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-[#0052CC] transition-all duration-300 font-light hover:-translate-y-px block"
    >
      {children}
    </Link>
  </li>
);

// Main Footer Component
const Footer: FC = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-20 overflow-hidden">
      {/* Aurora background effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-[#0052CC] to-transparent rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-[#0066FF] to-transparent rounded-full filter blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Focsera Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0052CC] to-[#0066FF] mb-4">
              FOCSERA
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Focus. Create. Celebrate.
              <br />
              Your global creative partner.
            </p>
          </div>

          {/* Divisions Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Divisions</h4>
            <ul className="space-y-3 text-sm">
              {divisions.map((link) => (
                <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Connect</h4>
            <ul className="space-y-3 text-sm">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.href} 
                    className="flex items-center gap-2 text-gray-400 hover:text-[#0052CC] transition-all duration-300 font-light hover:-translate-y-px"
                  >
                    <social.icon size={16} />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 font-light">
              &copy; {new Date().getFullYear()} Focsera. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
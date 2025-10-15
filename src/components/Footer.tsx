import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-bold text-gradient bg-gradient-to-r from-[#0052CC] to-[#0066FF] mb-4">FOCSERA</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Focus. Create. Celebrate.<br />
              Your global creative partner.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Divisions</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/studios" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Studios</Link></li>
              <li><Link to="/media" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Media</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Events</Link></li>
              <li><Link to="/web" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Web</Link></li>
              <li><Link to="/product-services" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Product Services</Link></li>
              <li><Link to="/skill" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Skill</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">About</Link></li>
              <li><Link to="/mission" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Mission</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-white">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#0052CC] transition-colors font-light">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 font-light">
              &copy; 2025 Focsera. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#0052CC] transition-colors font-light">Privacy Policy</a>
              <a href="#" className="hover:text-[#0052CC] transition-colors font-light">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

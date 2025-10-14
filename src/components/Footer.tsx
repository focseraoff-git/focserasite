import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-[#0052CC] mb-4">FOCSERA</h3>
            <p className="text-gray-400 text-sm">
              Focus. Create. Celebrate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Divisions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/studios" className="hover:text-[#0052CC] transition-colors">Studios</Link></li>
              <li><Link to="/media" className="hover:text-[#0052CC] transition-colors">Media</Link></li>
              <li><Link to="/events" className="hover:text-[#0052CC] transition-colors">Events</Link></li>
              <li><Link to="/web" className="hover:text-[#0052CC] transition-colors">Web</Link></li>
              <li><Link to="/product-services" className="hover:text-[#0052CC] transition-colors">Product Services</Link></li>
              <li><Link to="/skill" className="hover:text-[#0052CC] transition-colors">Skill</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-[#0052CC] transition-colors">About</Link></li>
              <li><Link to="/mission" className="hover:text-[#0052CC] transition-colors">Mission</Link></li>
              <li><Link to="/contact" className="hover:text-[#0052CC] transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-[#0052CC] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#0052CC] transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-[#0052CC] transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-[#0052CC] transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-[#0052CC] transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Focsera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

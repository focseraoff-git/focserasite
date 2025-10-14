import { Link } from 'react-router-dom';
import { Camera, Megaphone, PartyPopper, Globe, Package, GraduationCap, ArrowRight } from 'lucide-react';

export default function Home() {
  const divisions = [
    {
      icon: Camera,
      name: 'Focsera Studios',
      path: '/studios',
      description: 'Professional photography, videography, and curated portfolios for individuals and businesses.',
      services: ['Photography', 'Videography & Editing', 'Professional Portfolios']
    },
    {
      icon: Megaphone,
      name: 'Focsera Media',
      path: '/media',
      description: 'Content strategy, social media marketing, and influencer campaigns to maximize engagement.',
      services: ['YouTuber & Influencer Services', 'Content Strategy', 'Social Media Marketing']
    },
    {
      icon: PartyPopper,
      name: 'Focsera Events',
      path: '/events',
      description: 'Corporate, private, and campus events designed to create memorable experiences.',
      services: ['Corporate Events', 'Private Events', 'Campus & School Events']
    },
    {
      icon: Globe,
      name: 'Focsera Web',
      path: '/web',
      description: 'Modern websites, e-commerce platforms, and custom web applications built for success.',
      services: ['Business Websites', 'E-commerce Solutions', 'Custom Web Apps']
    },
    {
      icon: Package,
      name: 'Focsera Product Services',
      path: '/product-services',
      description: 'End-to-end product solutions from design and modeling to marketing and sales support.',
      services: ['Product Design', 'Product Modelling', 'Product Marketing']
    },
    {
      icon: GraduationCap,
      name: 'Focsera Skill',
      path: '/skill',
      description: 'Professional training in creative and digital technologies to empower the next generation.',
      services: ['Photography & Video Training', 'Coding & Development', 'New Technologies']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0052CC]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ECECEC] rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
            Focus. Create. Celebrate.
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-12 animate-fade-in-delay">
            A global creative, media, and digital solutions group
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link
              to="/about"
              className="group px-8 py-4 bg-white text-[#0052CC] rounded-full font-semibold hover:bg-[#ECECEC] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Divisions
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#0052CC] transition-all duration-300"
            >
              Work With Us
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#ECECEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Our Divisions</h2>
            <div className="w-24 h-1 bg-[#0052CC] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six specialized divisions working together to deliver comprehensive creative and digital solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisions.map((division, index) => {
              const Icon = division.icon;
              return (
                <Link
                  key={index}
                  to={division.path}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{division.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{division.description}</p>
                  <ul className="space-y-2 mb-6">
                    {division.services.map((service, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-start">
                        <span className="text-[#0052CC] mr-2">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <div className="text-[#0052CC] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

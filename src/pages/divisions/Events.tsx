import { Link } from 'react-router-dom';
import { PartyPopper, Briefcase, Users, ArrowRight } from 'lucide-react';

export default function Events() {
  const services = [
    {
      icon: Briefcase,
      title: 'Corporate Events',
      description: 'Professional event management for conferences, product launches, exhibitions, and corporate gatherings.',
      features: ['Conferences', 'Product Launches', 'Trade Shows', 'Team Building Events']
    },
    {
      icon: PartyPopper,
      title: 'Private Events',
      description: 'Personalized event planning for weddings, birthdays, anniversaries, and special celebrations.',
      features: ['Weddings', 'Birthday Parties', 'Anniversaries', 'Private Celebrations']
    },
    {
      icon: Users,
      title: 'Campus & School Events',
      description: 'Dynamic event solutions for educational institutions, cultural festivals, and campus competitions.',
      features: ['College Fests', 'Cultural Shows', 'Competitions', 'School Functions']
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="relative py-24 bg-gradient-to-br from-[#0052CC] to-[#0066FF] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl p-4">
            <img src="/images/logos/FocseraEvents.jpg" alt="Focsera Events" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Focsera Events</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Creating unforgettable experiences. From corporate conferences to personal celebrations, we make every event extraordinary.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-[#0052CC] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-start">
                        <span className="text-[#0052CC] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#ECECEC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Plan Your Next Event?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create an unforgettable experience that your guests will remember forever.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0052CC] text-white rounded-full font-semibold hover:bg-[#0066FF] transition-all duration-300 group"
          >
            Get in Touch
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

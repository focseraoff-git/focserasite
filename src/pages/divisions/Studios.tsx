import { Link } from 'react-router-dom';
import { Camera, Video, Image, ArrowRight } from 'lucide-react';

export default function Studios() {
  const services = [
    {
      icon: Camera,
      title: 'Photography',
      description: 'Professional photography services including flash shoots, newborn & child photography, lifestyle sessions, and wedding coverage.',
      features: ['Portrait Photography', 'Event Photography', 'Product Photography', 'Lifestyle Shoots']
    },
    {
      icon: Video,
      title: 'Videography & Editing',
      description: 'Expert video production and post-production services to bring your stories to life with cinematic quality.',
      features: ['Commercial Videos', 'Event Coverage', 'Promotional Content', 'Post-Production Editing']
    },
    {
      icon: Image,
      title: 'Professional Portfolios',
      description: 'Curated photo and video portfolios designed to showcase your brand, talent, or business in the best light.',
      features: ['Personal Portfolios', 'Business Portfolios', 'Creative Showcases', 'Digital Albums']
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
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="text-[#0052CC]" size={40} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Focsera Studios</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Capturing moments, creating memories. Professional photography and videography services that tell your story.
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Create Something Beautiful?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss your photography and videography needs and create stunning visuals together.
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

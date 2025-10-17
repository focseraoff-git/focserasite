import { Camera, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function Studios() {
  const services = [
    {
      name: 'Wedding Photography',
      category: 'Weddings',
      description: 'Capture every precious moment of your special day with our professional wedding photography services.',
      price: '50,000',
      priceMax: '8,00,000',
      thumbnail: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg',
      features: ['Full day coverage', 'Pre-wedding shoot', 'Edited photos', 'Online gallery']
    },
    {
      name: 'Corporate Events',
      category: 'Corporate',
      description: 'Professional photography and videography for conferences, product launches, and corporate gatherings.',
      price: '10,000',
      priceMax: '1,00,000',
      thumbnail: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
      features: ['Event coverage', 'Team photos', 'Highlights reel', 'Same-day delivery']
    },
    {
      name: 'Portrait Photography',
      category: 'Portrait',
      description: 'Professional portrait sessions for individuals, families, and professional headshots.',
      price: '2,000',
      priceMax: '50,000',
      thumbnail: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
      features: ['Studio or outdoor', 'Wardrobe changes', 'Retouched photos', 'Print-ready files']
    },
    {
      name: 'Fashion & Commercial',
      category: 'Fashion',
      description: 'High-end fashion photography and commercial shoots for brands and portfolios.',
      price: '12,000',
      priceMax: '1,00,000',
      thumbnail: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
      features: ['Professional lighting', 'Creative direction', 'Post-production', 'Rights management']
    },
    {
      name: 'Birthday Parties',
      category: 'Events',
      description: 'Capture the joy and excitement of birthday celebrations with our event photography services.',
      price: '5,000',
      priceMax: '30,000',
      thumbnail: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg',
      features: ['Full event coverage', 'Candid moments', 'Group photos', 'Digital album']
    },
    {
      name: 'Product Photography',
      category: 'Commercial',
      description: 'Professional product photography for e-commerce, catalogs, and marketing materials.',
      price: '3,000',
      priceMax: '50,000',
      thumbnail: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      features: ['White background', 'Multiple angles', 'Lifestyle shots', 'Quick turnaround']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#ECECEC] pt-20">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-10 animate-float">
            <Sparkles className="text-[#0052CC]" size={24} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
            <Sparkles className="text-[#0066FF]" size={20} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-[#0052CC]/10 to-[#0066FF]/10 rounded-full text-[#0052CC] text-sm font-semibold">
                Photography & Videography
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Focsera <span className="text-gradient">Studios</span>
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Capturing moments, creating memories. Professional photography and videography services for every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className="group glossy-card rounded-3xl overflow-hidden hover-lift border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.thumbnail}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#0052CC] text-xs font-semibold">
                      {service.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#0052CC] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">₹{service.price}</span>
                      <span className="text-gray-500 font-light">- ₹{service.priceMax}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-light">Starting price</span>
                  </div>

                  <div className="space-y-2 mb-6 border-t border-gray-200 pt-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="group/btn relative w-full glossy-blue text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden">
                    <span className="relative z-10">Book Service</span>
                    <ArrowRight className="relative z-10 group-hover/btn:translate-x-1 transition-transform" size={18} />
                    <div className="absolute inset-0 shimmer"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#0052CC]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-12 border border-white/20 text-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Camera className="text-[#0052CC]" size={40} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Capture Your Moments?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed font-light mb-8 max-w-2xl mx-auto">
              Whether it's a wedding, corporate event, or personal portrait session, our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative px-10 py-5 bg-white text-[#0052CC] rounded-full font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group">
                <span className="relative z-10">View Portfolio</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                <div className="absolute inset-0 shimmer"></div>
              </button>
              <a
                href="/contact"
                className="px-10 py-5 glass-effect border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-[#0052CC] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-gradient">Focsera Studios</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glossy-card rounded-3xl p-8 hover-lift border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Camera className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professional Equipment</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                State-of-the-art cameras, lenses, and lighting equipment for stunning results
              </p>
            </div>

            <div className="glossy-card rounded-3xl p-8 hover-lift border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Excellence</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Award-winning team with years of experience in creative photography and videography
              </p>
            </div>

            <div className="glossy-card rounded-3xl p-8 hover-lift border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-[#0052CC] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Check className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Satisfaction Guaranteed</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We work closely with you to ensure every shot exceeds your expectations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

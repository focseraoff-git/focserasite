import { Link, useLocation } from 'react-router-dom';
import { Globe, ShoppingCart, Code, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Web() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const services = [
    {
      icon: Globe,
      title: 'Business Websites & Startups',
      description: 'Modern, responsive websites designed to establish your online presence and drive business growth.',
      features: ['Corporate Websites', 'Startup Landing Pages', 'Product Launch Sites', 'Responsive Design']
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce & Portfolio',
      description: 'Full-featured online stores and stunning portfolio websites to showcase your products or work.',
      features: ['Online Stores', 'Payment Integration', 'Portfolio Sites', 'Product Catalogs']
    },
    {
      icon: Code,
      title: 'Custom Web Applications',
      description: 'Tailored web applications built to solve your unique business challenges and streamline operations.',
      features: ['Custom Development', 'API Integration', 'Database Solutions', 'Cloud Deployment']
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF0] relative overflow-hidden font-sans">

      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Golden Glows */}
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-orange-400/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[100px]"></div>

        {/* Decorative Kites */}
        <div className="absolute top-20 left-[10%] w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rotate-45 opacity-20 animate-float"></div>
        <div className="absolute top-40 right-[15%] w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rotate-12 opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-[5%] w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rotate-[-15deg] opacity-10 blur-sm"></div>

        {/* Rangoli-inspired Patterns (CSS Radial Gradients) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, #ff9900 0%, transparent 50%)'
        }}></div>
      </div>

      {/* Sankranthi Special Offer Section - PREMIUM HERO */}
      <section id="sankranthi-offer" className="relative pt-32 pb-24 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-bold rounded-full mb-8 shadow-xl shadow-orange-500/20 animate-fade-in-up border border-orange-400/30 backdrop-blur-sm">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="tracking-widest uppercase">Sankranthi Festival Special</span>
              <Sparkles size={16} className="text-yellow-300" />
            </div>

            <h1 className="text-5xl sm:text-7xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
              Elevate Your Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 drop-shadow-sm">
                This Sankranthi
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Get a premium, professional website for just <span className="text-orange-600 font-bold">₹999</span>. <br className="hidden sm:block" />
              Limited time offer for startups & visionaries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT COLUMN: Offer Card (Glassmorphism) */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-2xl overflow-hidden p-8 sm:p-10">

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-8 border-b border-gray-200/50">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">Professional Website</h3>
                      <div className="flex items-center gap-2 text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full w-fit">
                        <Star size={16} fill="currentColor" /> Premium Edition
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 tracking-tighter">
                        ₹999
                      </div>
                      <div className="text-sm text-gray-500 line-through">₹4,999</div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <ul className="space-y-4">
                      {[
                        '5-Page Premium Design',
                        'Mobile & Tablet Responsive',
                        'WhatsApp Integration',
                        'Contact Form Included'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">✓</span>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-4">
                      {[
                        'Fast 3-7 Day Delivery',
                        'Social Media Links',
                        'SEO Friendly Structure',
                        'Free 1 Month Support'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                          <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">✓</span>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Form */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                    <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      🚀 Book Your Slot
                    </h4>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const mobile = formData.get('mobile');
                      const business = formData.get('business');
                      const message = formData.get('message');

                      const text = `*Sankranthi Premium Offer Booking (₹999)*%0A%0A*Name:* ${name}%0A*Mobile:* ${mobile}%0A*Business:* ${business || 'N/A'}%0A*Message:* ${message || 'I am interested in the ₹999 premium website offer.'}`;

                      window.open(`https://wa.me/919515803954?text=${text}`, '_blank');
                    }} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                          <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile</label>
                          <input type="tel" name="mobile" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Name</label>
                        <input type="text" name="business" required className="w-full px-4 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:bg-white focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium" placeholder="e.g. My Startup" />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                      >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                        Send Request via WhatsApp
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Info & Addons */}
            <div className="lg:col-span-5 space-y-6">

              {/* Validity Card */}
              <div className="bg-gray-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-3xl opacity-20"></div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm">⏳</span>
                  Offer Validity
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="font-medium text-gray-200">Valid till Sankranthi (Jan 16th)</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <p className="font-medium text-gray-200">First 50 Bookings Only</p>
                  </div>
                </div>
              </div>

              {/* Add-ons Card */}
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Premium Add-Ons</h3>
                <div className="flex flex-wrap gap-2">
                  {['Domain (.com/.in)', 'Pro Hosting', 'Logo Design', 'Social Media Kit', 'SEO Package', 'Content Writing'].map((addon) => (
                    <span key={addon} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-colors cursor-default">
                      + {addon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Globe size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Focsera Guarantee</h4>
                <p className="text-blue-100 text-sm leading-relaxed">
                  We deliver pixel-perfect designs tailored to your brand identity. Trusted by 100+ businesses.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Standard Services Section - Refined */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-gray-900 group-hover:text-orange-600 transition-colors" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
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

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Transform Your Digital Presence?</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 group shadow-2xl shadow-white/10"
          >
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

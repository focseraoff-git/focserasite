// @ts-nocheck
import { Link, useLocation } from 'react-router-dom';
import { Globe, ShoppingCart, Code, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase';

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
    <div className="min-h-screen bg-black relative overflow-hidden font-sans selection:bg-orange-500/30">

      {/* Cinematic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000"></div>
      </div>

      {/* Spotlight Header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-60 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-input from-transparent via-white/10 to-transparent blur-[100px] rotate-45"></div>
      </div>

      {/* Sankranthi Special Offer Section - ULTRA PREMIUM HERO */}
      <section id="sankranthi-offer" className="relative pt-32 pb-24">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-20 relative">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full mb-8 shadow-[0_0_30px_-5px_rgba(251,146,60,0.3)] animate-fade-in-up hover:bg-white/10 transition-all duration-500 group cursor-default">
              <Sparkles size={14} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
              <span className="text-xs font-bold tracking-[0.2em] text-yellow-500 uppercase">Sankranthi Festival Special</span>
              <Sparkles size={14} className="text-yellow-400 group-hover:-rotate-12 transition-transform" />
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-none">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 drop-shadow-[0_0_30px_rgba(251,146,60,0.4)] animate-gradient-text bg-[length:200%_auto]">
                Digital Presence
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Unlock a cinematic, premium website for just <span className="text-white font-bold border-b-2 border-orange-500">₹999</span>. <br className="hidden sm:block" />
              Limited slots available for visionaries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT COLUMN: Offer Card (Premium Glass) */}
            <div className="lg:col-span-7 perspective-1000">
              <div className="relative group transition-all duration-500 hover:rotate-y-1">
                {/* Glow Behind */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-yellow-600 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                <div className="relative bg-black/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden p-8 sm:p-10 ring-1 ring-white/5">

                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-8 border-b border-white/5">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Professional Website</h3>
                      <div className="flex items-center gap-2 text-yellow-400 font-medium bg-yellow-400/10 px-3 py-1 rounded-full w-fit border border-yellow-400/20">
                        <Star size={14} fill="currentColor" /> Premium Edition
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <div className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        ₹999
                      </div>
                      <div className="text-sm text-gray-500 line-through font-medium">₹4,999</div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                    <ul className="space-y-4">
                      {[
                        '5-Page Premium Design',
                        'Mobile & Tablet Responsive',
                        'WhatsApp Integration',
                        'Contact Form Included'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300 font-medium group/item hover:text-white transition-colors">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 border border-green-500/20 group-hover/item:bg-green-500/30 transition-colors">
                            <span className="text-xs font-bold">✓</span>
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
                        <li key={i} className="flex items-center gap-3 text-gray-300 font-medium group/item hover:text-white transition-colors">
                          <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 border border-green-500/20 group-hover/item:bg-green-500/30 transition-colors">
                            <span className="text-xs font-bold">✓</span>
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking Form (Embedded Dark Mode) */}
                  <div className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden group/form">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 opacity-0 group-hover/form:opacity-100 transition duration-700"></div>

                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                      🚀 Fast-Track Booking
                    </h4>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const mobile = formData.get('mobile');
                      const business = formData.get('business');
                      const messageVal = formData.get('message'); // Rename to avoid conflict with constructed message

                      // 1. Prepare Data
                      const bookingData = {
                        name: name,
                        mobile: mobile,
                        business_name: business,
                        message: messageVal,
                        offer_code: "SANKRANTHI_WEB_OFFER_999",
                        status: 'pending'
                      };

                      try {
                        // 2. Insert DB (New dedicated table)
                        const { error } = await supabase.from('web_bookings').insert([bookingData]);
                        if (error) {
                          console.error(error);
                          alert("Note: Could not save to database, but proceeding to WhatsApp. " + error.message);
                        }
                      } catch (err) {
                        console.error(err);
                        // Proceed anyway to WhatsApp
                      }

                      // 3. WhatsApp Redirect
                      const text = `*Sankranthi Premium Offer Booking (₹999)*%0A%0A*Name:* ${name}%0A*Mobile:* ${mobile}%0A*Business:* ${business || 'N/A'}%0A*Message:* ${messageVal || 'I am interested in the ₹999 premium website offer.'}`;

                      window.open(`https://wa.me/919515803954?text=${text}`, '_blank');
                    }} className="space-y-5 relative z-10">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                          <input type="text" name="name" required className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/10 focus:bg-black/60 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium placeholder:text-gray-700" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Mobile</label>
                          <input type="tel" name="mobile" required className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/10 focus:bg-black/60 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium placeholder:text-gray-700" placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Name</label>
                        <input type="text" name="business" required className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-white/10 focus:bg-black/60 focus:border-orange-500 focus:ring-0 outline-none transition-all font-medium placeholder:text-gray-700" placeholder="e.g. My Startup" />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                        Claim Offer via WhatsApp
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Info & Addons */}
            <div className="lg:col-span-5 space-y-6">

              {/* Validity Card */}
              <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-[2rem] p-8 relative overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-[60px] group-hover:bg-orange-500/30 transition-all duration-700"></div>
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3 relative z-10">
                  <span className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">⏳</span>
                  Offer Validity
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                    <p className="font-medium text-gray-200">Valid till End of Jan</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(251,146,60,0.5)]"></div>
                    <p className="font-medium text-gray-200">First 50 Bookings Only</p>
                  </div>
                </div>
              </div>

              {/* Add-ons Card */}
              <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-8 border border-white/10 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Premium Add-Ons</h3>
                <div className="flex flex-wrap gap-2">
                  {['Domain (.com/.in)', 'Pro Hosting', 'Logo Design', 'Social Media Kit', 'SEO Package', 'Content Writing'].map((addon) => (
                    <span key={addon} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-gray-400 shadow-sm hover:border-orange-500/50 hover:text-orange-400 hover:bg-orange-500/10 transition-all cursor-default">
                      + {addon}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-br from-indigo-900/50 to-blue-900/50 backdrop-blur-md rounded-[2rem] p-8 text-white shadow-xl text-center border border-indigo-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10 relative z-10">
                  <Globe size={28} className="text-indigo-300" />
                </div>
                <h4 className="text-xl font-bold mb-2 relative z-10">Focsera Guarantee</h4>
                <p className="text-indigo-200 text-sm leading-relaxed relative z-10">
                  We deliver pixel-perfect designs tailored to your brand identity. Trusted by 100+ businesses.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Standard Services Section - Refined Dark */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">Our Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="group bg-white/5 rounded-[2rem] p-8 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                    <Icon className="text-gray-400 group-hover:text-orange-400 transition-colors duration-500" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed font-light">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center gap-3 group-hover:text-gray-300 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-colors"></div>
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
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-10 tracking-tight">Ready to Transform Your <br />Digital Presence?</h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 group shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

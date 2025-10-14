import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Let's Build Something Creative Together
            </h1>
            <div className="w-24 h-1 bg-[#0052CC] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to bring your vision to life? Get in touch with us today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-[#ECECEC]/50 hover:bg-[#ECECEC] transition-colors">
                <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600">info@focsera.com</p>
                  <p className="text-gray-600">hello@focsera.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-[#ECECEC]/50 hover:bg-[#ECECEC] transition-colors">
                <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-[#ECECEC]/50 hover:bg-[#ECECEC] transition-colors">
                <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">Global Headquarters</p>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="division" className="block text-sm font-semibold text-gray-700 mb-2">Interested Division</label>
                <select
                  id="division"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all"
                >
                  <option>Select a division</option>
                  <option>Focsera Studios</option>
                  <option>Focsera Media</option>
                  <option>Focsera Events</option>
                  <option>Focsera Web</option>
                  <option>Focsera Product Services</option>
                  <option>Focsera Skill</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0052CC] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0066FF] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Send Message
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

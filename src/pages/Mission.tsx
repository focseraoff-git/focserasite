import { Sparkles, Zap, Heart, Shield } from 'lucide-react';

export default function Mission() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#ECECEC] pt-20">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] to-[#0066FF]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect rounded-3xl p-12 border border-white/20 animate-fade-in">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-white/20 rounded-full text-white text-sm font-semibold">
                Our Purpose
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-8">Mission & Vision</h1>
            <div className="w-32 h-1.5 bg-white/80 mx-auto rounded-full mb-12"></div>
            <p className="text-xl sm:text-2xl text-white/95 leading-relaxed mb-8 font-light">
              At Focsera, we envision a world where creativity knows no bounds and innovation drives success.
              Our mission is to empower businesses and individuals with cutting-edge solutions that transform ideas into reality.
            </p>
            <p className="text-lg text-white/90 leading-relaxed font-light">
              We believe in the power of collaboration, the beauty of design, and the impact of technology
              to create experiences that inspire, engage, and celebrate human creativity.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 animate-float">
            <Sparkles className="text-[#0052CC]" size={24} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}>
            <Sparkles className="text-[#0066FF]" size={20} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              The <span className="text-gradient">Focsera</span> Way
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glossy-card rounded-3xl p-10 text-center hover-lift border border-gray-100 group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <span className="text-4xl font-bold text-white">F</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Focus</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                We focus on understanding your unique needs and delivering solutions that are tailored,
                strategic, and purposeful. Every project receives our undivided attention.
              </p>
            </div>

            <div className="glossy-card rounded-3xl p-10 text-center hover-lift border border-gray-100 group" style={{ animationDelay: '100ms' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <span className="text-4xl font-bold text-white">C</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                We create innovative, beautiful, and functional solutions that stand out in the marketplace
                and deliver measurable results for your business.
              </p>
            </div>

            <div className="glossy-card rounded-3xl p-10 text-center hover-lift border border-gray-100 group" style={{ animationDelay: '200ms' }}>
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-[#0052CC] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <span className="text-4xl font-bold text-white">C</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Celebrate</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                We celebrate every success, big or small, and believe that creativity deserves recognition.
                Your achievements are our achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glossy-card p-8 rounded-3xl hover-lift border border-gray-100 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="glossy-card p-8 rounded-3xl hover-lift border border-gray-100 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We maintain the highest standards in everything we do, from concept to execution.
              </p>
            </div>
            <div className="glossy-card p-8 rounded-3xl hover-lift border border-gray-100 group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-[#0052CC] rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We believe in working together with our clients and partners to achieve shared goals.
              </p>
            </div>
            <div className="glossy-card p-8 rounded-3xl hover-lift border border-gray-100 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0066FF] to-blue-500 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                We operate with transparency, honesty, and respect in all our business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

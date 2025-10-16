import { Lightbulb, Users, Target, Sparkles } from 'lucide-react';

export default function About() {
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
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-gradient">Focsera</span>
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#0052CC] to-[#0066FF] mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              We focus on creating impactful experiences, connecting brands and individuals with their audience,
              and celebrating creativity in all forms—through visuals, digital innovation, events, skills, and product excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up">
            <div className="group glossy-card rounded-3xl p-10 text-center hover-lift border border-gray-100">
              <div className="text-6xl font-bold text-gradient mb-4 group-hover:scale-110 transition-transform">6</div>
              <div className="text-xl font-semibold text-gray-900 mb-3">Specialized Divisions</div>
              <div className="text-gray-600 font-light">Comprehensive creative and digital solutions</div>
            </div>
            <div className="group glossy-card rounded-3xl p-10 text-center hover-lift border border-gray-100" style={{ animationDelay: '100ms' }}>
              <div className="text-6xl font-bold text-gradient mb-4 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-xl font-semibold text-gray-900 mb-3">Endless Possibilities</div>
              <div className="text-gray-600 font-light">Unlimited creative potential</div>
            </div>
            <div className="group glossy-card rounded-3xl p-10 text-center hover-lift border border-gray-100" style={{ animationDelay: '200ms' }}>
              <div className="text-6xl font-bold text-gradient mb-4 group-hover:scale-110 transition-transform">1</div>
              <div className="text-xl font-semibold text-gray-900 mb-3">Unified Vision</div>
              <div className="text-gray-600 font-light">Global excellence in creativity</div>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="glossy-card rounded-3xl p-10 hover-lift border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <Users className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                Focsera is a global creative, media, and digital solutions group dedicated to empowering businesses
                and individuals through innovative solutions. Our diverse portfolio of divisions ensures that we can
                meet any creative or digital challenge.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                From capturing stunning visuals to building powerful digital platforms, from organizing memorable
                events to training the next generation of creative professionals, Focsera is your partner in success.
              </p>
            </div>

            <div className="glossy-card rounded-3xl p-10 hover-lift border border-gray-100 group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0066FF] to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do</h2>
              <p className="text-gray-600 leading-relaxed mb-4 font-light">
                We offer end-to-end solutions across six specialized divisions: Studios, Media, Events, Web,
                Product Services, and Skill. Each division brings unique expertise while working seamlessly
                together to deliver integrated solutions.
              </p>
              <p className="text-gray-600 leading-relaxed font-light">
                Whether you need professional photography, social media strategy, event management, web development,
                product design, or training services, Focsera has the expertise and passion to bring your vision to life.
              </p>
            </div>
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

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect rounded-3xl p-12 border border-white/20">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Lightbulb className="text-[#0052CC]" size={40} />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Philosophy</h2>
            <p className="text-lg text-white/90 leading-relaxed font-light">
              At Focsera, we believe that creativity is the ultimate currency in today's world. We combine cutting-edge
              technology with human creativity to deliver solutions that don't just meet expectations—they exceed them.
              Every project is an opportunity to push boundaries and create something extraordinary.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

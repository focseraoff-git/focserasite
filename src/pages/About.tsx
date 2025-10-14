export default function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About Focsera</h1>
            <div className="w-24 h-1 bg-[#0052CC] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We focus on creating impactful experiences, connecting brands and individuals with their audience,
              and celebrating creativity in all forms—through visuals, digital innovation, events, skills, and product excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0052CC]/5 to-transparent hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl font-bold text-[#0052CC] mb-4">6</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Divisions</div>
              <div className="text-gray-600">Comprehensive creative and digital solutions</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0052CC]/5 to-transparent hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl font-bold text-[#0052CC] mb-4">∞</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Possibilities</div>
              <div className="text-gray-600">Unlimited creative potential</div>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#0052CC]/5 to-transparent hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl font-bold text-[#0052CC] mb-4">1</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Vision</div>
              <div className="text-gray-600">Global excellence in creativity</div>
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Focsera is a global creative, media, and digital solutions group dedicated to empowering businesses
                and individuals through innovative solutions. Our diverse portfolio of divisions ensures that we can
                meet any creative or digital challenge.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From capturing stunning visuals to building powerful digital platforms, from organizing memorable
                events to training the next generation of creative professionals, Focsera is your partner in success.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We offer end-to-end solutions across six specialized divisions: Studios, Media, Events, Web,
                Product Services, and Skill. Each division brings unique expertise while working seamlessly
                together to deliver integrated solutions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you need professional photography, social media strategy, event management, web development,
                product design, or training services, Focsera has the expertise and passion to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

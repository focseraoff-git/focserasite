export default function Mission() {
  return (
    <div className="min-h-screen bg-white pt-20">
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Our Mission & Vision</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-12"></div>
          <p className="text-xl sm:text-2xl text-white/95 leading-relaxed mb-8">
            At Focsera, we envision a world where creativity knows no bounds and innovation drives success.
            Our mission is to empower businesses and individuals with cutting-edge solutions that transform ideas into reality.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            We believe in the power of collaboration, the beauty of design, and the impact of technology
            to create experiences that inspire, engage, and celebrate human creativity.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">F</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                We focus on understanding your unique needs and delivering solutions that are tailored,
                strategic, and purposeful. Every project receives our undivided attention.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">C</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create</h3>
              <p className="text-gray-600 leading-relaxed">
                We create innovative, beautiful, and functional solutions that stand out in the marketplace
                and deliver measurable results for your business.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">C</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Celebrate</h3>
              <p className="text-gray-600 leading-relaxed">
                We celebrate every success, big or small, and believe that creativity deserves recognition.
                Your achievements are our achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#ECECEC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#0052CC] mb-3">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#0052CC] mb-3">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in everything we do, from concept to execution.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#0052CC] mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We believe in working together with our clients and partners to achieve shared goals.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-[#0052CC] mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with transparency, honesty, and respect in all our business relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

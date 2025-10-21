import { Link } from 'react-router-dom';
import { GraduationCap, Camera, Code, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Skill() {
  const [category, setCategory] = useState('All');

  const services = [
    {
      icon: Camera,
      category: 'Photography',
      title: 'Photography & Videography Training',
      description: 'Hands-on learning in professional shooting techniques, lighting, composition, and post-production editing.',
      features: ['Camera Techniques', 'Lighting Mastery', 'Video Editing', 'Portfolio Building']
    },
    {
      icon: Code,
      category: 'Development',
      title: 'Coding & Development',
      description: 'Comprehensive training in programming languages, web/app development, and problem-solving skills.',
      features: ['Programming Languages', 'Web Development', 'App Development', 'Algorithm Training']
    },
    {
      icon: Sparkles,
      category: 'Tech',
      title: 'New Technologies',
      description: 'Future-ready workshops on emerging technologies including AI, AR/VR, and cutting-edge digital tools.',
      features: ['AI & Machine Learning', 'AR/VR Development', 'Digital Tools', 'Tech Trends']
    },
    {
      icon: GraduationCap,
      category: 'Creative',
      title: 'Creative Education',
      description: 'Courses in design, content creation, and multimedia production to unlock your creative potential.',
      features: ['Graphic Design', 'Content Creation', 'Multimedia Production', 'Creative Strategy']
    }
  ];

  const categories = ['All', 'Photography', 'Development', 'Tech', 'Creative'];

  const filtered = category === 'All' ? services : services.filter(s => s.category === category);

  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('skillOverlayDismissed');
      if (dismissed === '1') setShowOverlay(false);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleDismissOverlay = () => {
    try { localStorage.setItem('skillOverlayDismissed', '1'); } catch (e) {}
    setShowOverlay(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Full-page launching overlay (dismissible) */}
      {showOverlay && (
        <div className="fixed inset-0 z-[40] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center text-white pointer-events-auto px-6 max-w-3xl">
            <button onClick={handleDismissOverlay} aria-label="Dismiss overlay" className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2">
              ✕
            </button>
            <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">Launching Soon!</h2>
            <p className="text-lg sm:text-xl text-white/80">We're preparing our Skill programs — sign up to be notified.</p>
          </div>
        </div>
      )}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-[#0052CC] to-[#0066FF] overflow-hidden">
        {/* subtle filter overlay */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl p-4">
            <img src="/images/logos/FocseraSkill.jpg" alt="Focsera Skill" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="inline-block px-4 py-2 rounded-full bg-white text-[#0052CC] font-bold text-lg shadow-md uppercase tracking-wide">Launching soon!</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Focsera Skill</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Empowering the next generation. Professional training in creative and digital technologies.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Our Programs</h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${category === cat ? 'bg-[#0052CC] text-white shadow' : 'bg-white text-black border'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-black to-gray-700 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-start">
                        <span className="text-black mr-2">✓</span>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Learn and Grow?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our training programs and unlock your potential in creative and digital technologies.
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

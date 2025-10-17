import { useState, useEffect } from 'react';
import { Camera, Sparkles, Check, ArrowRight, ChevronDown, X, ShoppingCart } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Service {
  id: string;
  name: string;
  description: string;
  price_min: number;
  price_max: number;
  thumbnail_url: string;
  features: string[];
  terms: {
    clientSupport: string;
    studioSupport: string;
  };
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price_min: number;
  price_max: number | null;
}

export default function Studios() {
  const [services, setServices] = useState<Service[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [showPackageBuilder, setShowPackageBuilder] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [expandedTerms, setExpandedTerms] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const { data: servicesData } = await supabase
      .from('services')
      .select('*')
      .eq('is_archived', false)
      .order('name');

    const { data: addOnsData } = await supabase
      .from('service_addons')
      .select('*')
      .eq('is_enabled', true)
      .order('name');

    if (servicesData) setServices(servicesData);
    if (addOnsData) setAddOns(addOnsData);

    setLoading(false);
  };

  const calculateTotal = () => {
    if (!selectedService) return 0;
    let total = Number(selectedService.price_min);
    selectedAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (addon) total += Number(addon.price_min);
    });
    return total;
  };

  const handleSubmitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from('quotes').insert([{
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      event_date: formData.get('event_date') || null,
      details: formData.get('details')
    }]);

    if (!error) {
      alert('Quote request submitted! We\'ll get back to you shortly.');
      setShowQuoteForm(false);
      e.currentTarget.reset();
    } else {
      alert('Error submitting quote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-[#ECECEC] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0052CC] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading studios...</p>
        </div>
      </div>
    );
  }

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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light mb-8">
              Capturing moments, creating memories. Professional photography and videography services for every occasion.
            </p>
            <button
              onClick={() => setShowPackageBuilder(true)}
              className="glossy-blue text-white px-10 py-5 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              Build Custom Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group glossy-card rounded-3xl overflow-hidden hover-lift border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.thumbnail_url}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
                      <span className="text-3xl font-bold text-gray-900">₹{Number(service.price_min).toLocaleString('en-IN')}</span>
                      <span className="text-gray-500 font-light">- ₹{Number(service.price_max).toLocaleString('en-IN')}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-light">Starting price</span>
                  </div>

                  <div className="space-y-2 mb-6 border-t border-gray-200 pt-6">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-5 h-5 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpandedTerms(expandedTerms === service.id ? null : service.id)}
                    className="w-full text-left flex items-center justify-between text-sm text-gray-600 hover:text-[#0052CC] transition-colors mb-4"
                  >
                    <span className="font-semibold">View Terms & Conditions</span>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform ${expandedTerms === service.id ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {expandedTerms === service.id && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-3">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Client Terms</h4>
                        <p className="font-light">{service.terms.clientSupport}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Studio Terms</h4>
                        <p className="font-light">{service.terms.studioSupport}</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setShowPackageBuilder(true);
                    }}
                    className="group/btn relative w-full glossy-blue text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                  >
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
              Have a Unique Project?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed font-light mb-8 max-w-2xl mx-auto">
              If our packages don't fit your needs, tell us about your event and we'll create a custom quote just for you.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="relative px-10 py-5 bg-white text-[#0052CC] rounded-full font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 overflow-hidden group"
            >
              <span className="relative z-10">Get Custom Quote</span>
              <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
              <div className="absolute inset-0 shimmer"></div>
            </button>
          </div>
        </div>
      </section>

      {showPackageBuilder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
          <div className="glossy-card rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 border-b border-gray-200 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">Build Your Custom Package</h2>
              <button
                onClick={() => {
                  setShowPackageBuilder(false);
                  setSelectedService(null);
                  setSelectedAddOns(new Set());
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">1. Select Base Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        selectedService?.id === service.id
                          ? 'glossy-blue text-white shadow-lg'
                          : 'glossy-card border border-gray-200 hover:border-[#0052CC]'
                      }`}
                    >
                      <h4 className={`font-bold mb-1 ${selectedService?.id === service.id ? 'text-white' : 'text-gray-900'}`}>
                        {service.name}
                      </h4>
                      <p className={`text-sm ${selectedService?.id === service.id ? 'text-white/90' : 'text-gray-600'}`}>
                        From ₹{Number(service.price_min).toLocaleString('en-IN')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {selectedService && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. Add Optional Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addOns.map(addon => (
                      <label
                        key={addon.id}
                        className={`p-4 rounded-xl cursor-pointer transition-all border ${
                          selectedAddOns.has(addon.id)
                            ? 'border-[#0052CC] bg-[#0052CC]/5'
                            : 'border-gray-200 hover:border-[#0052CC]'
                        } glossy-card`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedAddOns.has(addon.id)}
                            onChange={(e) => {
                              const newSet = new Set(selectedAddOns);
                              if (e.target.checked) {
                                newSet.add(addon.id);
                              } else {
                                newSet.delete(addon.id);
                              }
                              setSelectedAddOns(newSet);
                            }}
                            className="mt-1 w-5 h-5 text-[#0052CC] rounded focus:ring-[#0052CC]"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{addon.name}</h4>
                            <p className="text-sm text-gray-600 mb-2 font-light">{addon.description}</p>
                            <p className="text-sm font-semibold text-[#0052CC]">
                              ₹{Number(addon.price_min).toLocaleString('en-IN')}
                              {addon.price_max && ` - ₹${Number(addon.price_max).toLocaleString('en-IN')}`}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {selectedService && (
                <div className="glossy-card rounded-2xl p-6 border-2 border-[#0052CC]">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Package Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="font-semibold text-gray-900">{selectedService.name}</span>
                      <span className="font-bold text-gray-900">₹{Number(selectedService.price_min).toLocaleString('en-IN')}</span>
                    </div>
                    {Array.from(selectedAddOns).map(addonId => {
                      const addon = addOns.find(a => a.id === addonId);
                      return addon ? (
                        <div key={addon.id} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{addon.name}</span>
                          <span className="text-gray-900 font-semibold">+ ₹{Number(addon.price_min).toLocaleString('en-IN')}</span>
                        </div>
                      ) : null;
                    })}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                      <span className="text-lg font-bold text-gray-900">Estimated Total</span>
                      <span className="text-2xl font-bold text-[#0052CC]">₹{calculateTotal().toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    Final pricing will be confirmed after consultation. This is a starting estimate.
                  </p>
                  <a
                    href="/contact"
                    className="mt-6 w-full glossy-blue text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Contact Us to Book
                    <ArrowRight size={18} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="glossy-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Request Custom Quote</h2>
              <button
                onClick={() => setShowQuoteForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitQuote} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 transition-colors"
                    placeholder="+91 12345 67890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                  <input
                    type="date"
                    name="event_date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Details *</label>
                <textarea
                  name="details"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 transition-colors"
                  placeholder="Please include: event type, location, number of guests, duration, specific requirements, and any other relevant details..."
                />
              </div>
              <button
                type="submit"
                className="w-full glossy-blue text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Submit Quote Request
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

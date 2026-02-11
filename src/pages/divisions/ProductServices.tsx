import { Link } from 'react-router-dom';
import { Package, Palette, TrendingUp, ArrowRight, QrCode, X, Sparkles, Clock, MapPin, Utensils, Monitor, GraduationCap, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ProductServices() {
  // DineQR States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    restaurantName: '',
    tableCount: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    cuisineType: '',
    currentPos: '',
    details: ''
  });

  const generalServices = [
    {
      icon: Palette,
      title: 'Product Design',
      description: 'Comprehensive design services including UI/UX, packaging design, and concept development.'
    },
    {
      icon: Package,
      title: 'Product Modelling',
      description: 'Advanced visualization and prototyping services to bring your product ideas to life.'
    },
    {
      icon: TrendingUp,
      title: 'Product Marketing & Sales',
      description: 'Full-service marketing campaigns and sales support to successfully launch and scale your products.'
    }
  ];

  // DineQR Handlers
  const handleBookDemo = () => setIsModalOpen(true);
  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        restaurantName: '', tableCount: '', contactName: '', email: '', phone: '', address: '', cuisineType: '', currentPos: '', details: ''
      });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error: rpcError } = await supabase.rpc('submit_dineqr_demo', {
        p_restaurant_name: formData.restaurantName,
        p_contact_name: formData.contactName,
        p_email: formData.email,
        p_phone: formData.phone,
        p_table_count: formData.tableCount,
        p_address: formData.address,
        p_cuisine_type: formData.cuisineType,
        p_current_pos: formData.currentPos,
        p_details: formData.details
      });
      if (rpcError) throw rpcError;
      setIsSuccess(true);
      toast.success("Demo request submitted successfully!");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Failed to submit: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-blue-500/30 text-gray-200">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeInUp">
          <div className="w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl p-4 ring-1 ring-white/10">
            <img src="/images/logos/FocseraProduct.jpg" alt="Focsera Product Services" className="w-full h-full object-contain rounded-xl" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
            Focsera Product Services
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From concept to market. End-to-end product solutions that drive innovation and business success.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#050505] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* LEFT COLUMN: General Services List */}
            <div className="lg:col-span-4 space-y-12">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-white mb-6">Our Core Services</h2>
                <div className="w-16 h-1 bg-blue-500 rounded-full mb-8 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  We offer a comprehensive suite of product services designed to take your idea from initial concept to global success.
                </p>

                <div className="space-y-6">
                  {generalServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <div key={index} className="flex gap-5 group p-4 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300 border border-blue-500/20">
                          <Icon className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300" size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400">{service.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Featured Products */}
            <div className="lg:col-span-8">
              <div className="mb-10 flex items-baseline gap-4">
                <h2 className="text-3xl font-bold text-white">Featured Products</h2>
                <p className="text-gray-500">Flagship software solutions</p>
              </div>

              <div className="grid grid-cols-1 gap-8">

                {/* Product 1: FocseraDineQR */}
                <div className="bg-[#09090b]/80 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] transform hover:-translate-y-1">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-emerald-500/5 rounded-full blur-[100px] group-hover:bg-emerald-500/10 transition-all duration-700 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-900/40 to-emerald-600/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 shadow-inner shadow-emerald-500/20">
                        <QrCode className="text-emerald-400" size={40} />
                      </div>
                      <div className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm shadow-[0_0_15px_-5px_rgba(16,185,129,0.4)]">
                        <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Flagship</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">FocseraDineQR</h3>
                    <p className="text-gray-400 mb-8 leading-relaxed text-lg border-l-2 border-emerald-500/30 pl-4">
                      Streamline dining operations with intelligent QR solutions. Contactless ordering, digital menus, and real-time analytics.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {['Contactless Ordering', 'Digital Menus', 'Real-time Updates', 'Analytics Dashboard'].map((feature, idx) => (
                        <div key={idx} className="text-gray-400 flex items-center group/item text-sm">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mr-3 text-[10px] group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <Button onClick={handleBookDemo} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl py-6 text-lg shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/40 transition-all duration-300">Book Demo</Button>
                      <Button type="button" variant="outline" className="flex-1 border-white/10 hover:border-emerald-500/50 text-gray-400 hover:text-white rounded-xl h-auto py-6 font-medium bg-white/5 hover:bg-white/10 backdrop-blur-sm">View Details</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product 2: Skill Verse */}
                  <Link to="/skill-verse" className="bg-[#0a0a0a]/80 backdrop-blur-md border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] transform hover:-translate-y-1 block h-full flex flex-col">
                    <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-blue-600/5 rounded-full blur-[100px] group-hover:bg-blue-600/10 transition-all duration-700 pointer-events-none"></div>
                    <div className="absolute bottom-[-50%] left-[-50%] w-[100%] h-[100%] bg-purple-600/5 rounded-full blur-[100px] group-hover:bg-purple-600/10 transition-all duration-700 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 shadow-inner shadow-blue-500/20">
                          <GraduationCap className="text-blue-400" size={32} />
                        </div>
                        <div className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
                          <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">New</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">Skill Verse</h3>
                      <p className="text-gray-400 mb-6 text-sm leading-relaxed border-l-2 border-blue-500/30 pl-3">
                        Teach Freely. Earn Fully. A fair ecosystem with <span className="text-white font-bold">0% commission</span>.
                      </p>

                      <ul className="space-y-3 mb-8 flex-grow">
                        {['0% Commission', 'Global Reach', 'Live Classes'].map((feature, idx) => (
                          <li key={idx} className="text-gray-400 flex items-center group/item text-sm">
                            <span className="w-4 h-4 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mr-3 text-[9px] group-hover/item:bg-blue-500 group-hover/item:text-black transition-all">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-blue-400 font-bold group-hover:translate-x-2 transition-transform text-sm mt-auto">
                        Explore Platform <ArrowRight className="ml-2" size={16} />
                      </div>
                    </div>
                  </Link>

                  {/* Product 3: Coming Soon */}
                  <div className="bg-white/5 border border-white/10 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden h-full min-h-[300px] hover:bg-white/[0.07] transition-colors">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-white/10">
                      <Clock className="text-gray-500" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-300 mb-2">Coming Soon</h3>
                    <p className="text-gray-500 max-w-xs mx-auto text-sm">
                      New tools to revolutionize product management are in the works.
                    </p>
                    <div className="mt-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold text-gray-400 tracking-wider uppercase">
                      In Development
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DineQR Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#111] border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="p-8 pb-6 border-b border-white/5 flex items-center justify-between relative z-10 flex-shrink-0 bg-[#111]/50 backdrop-blur-sm">
                <div><h3 className="text-2xl font-serif font-medium tracking-wide text-white">Book <span className="text-emerald-400">Demo</span></h3><p className="text-sm text-gray-400 mt-1">Experience the future of dining</p></div>
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"><X size={20} /></button>
              </div>
              {isSuccess ? (
                <div className="p-12 flex flex-col items-center justify-center text-center space-y-6 relative z-10 h-96">
                  <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <CheckCircle className="w-12 h-12 text-black" />
                  </motion.div>
                  <div><h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3><p className="text-gray-400 max-w-sm mx-auto">Thank you. A confirmation has been sent to <span className="text-emerald-400">{formData.email}</span>.</p></div>
                  <Button onClick={handleClose} className="mt-4 bg-white/10 hover:bg-white/20 text-white rounded-full px-8 py-2 border border-white/10">Close</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-5 relative z-10 overflow-y-auto custom-scrollbar">
                  <div className="space-y-4"><h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact Details</h4><div className="grid grid-cols-2 gap-5"><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Your Name</label><input required type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="Full Name" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} /></div><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Phone</label><input required type="tel" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="+91..." value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div></div><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Email</label><input required type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="name@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div></div><div className="h-px bg-white/5 my-4"></div><div className="space-y-4"><h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Restaurant Details</h4><div className="grid grid-cols-2 gap-5"><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Restaurant Name</label><input required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="e.g. Tasty Bites" value={formData.restaurantName} onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })} /></div><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Cuisine Type</label><div className="relative"><Utensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} /><input className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="e.g. Italian, Cafe" value={formData.cuisineType} onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value })} /></div></div></div><div className="grid grid-cols-2 gap-5"><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Tables</label><select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all text-gray-300" value={formData.tableCount} onChange={(e) => setFormData({ ...formData, tableCount: e.target.value })}><option value="" className="bg-gray-900">Select...</option><option value="1-10" className="bg-gray-900">1-10 Tables</option><option value="11-30" className="bg-gray-900">11-30 Tables</option><option value="30+" className="bg-gray-900">30+ Tables</option></select></div><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Current POS</label><div className="relative"><Monitor className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} /><input className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-gray-600 text-white" placeholder="e.g. Petpooja, None" value={formData.currentPos} onChange={(e) => setFormData({ ...formData, currentPos: e.target.value })} /></div></div></div><div className="space-y-2"><label className="text-xs font-medium text-emerald-500/80 uppercase tracking-wider">Address / Location</label><div className="relative"><MapPin className="absolute left-4 top-3 text-gray-500" size={16} /><textarea rows={2} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all resize-none placeholder:text-gray-600 text-white" placeholder="City, Area" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} /></div></div></div><div className="pt-4 pb-2"><Button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-lg h-14 rounded-xl font-medium shadow-lg shadow-emerald-900/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? 'Submitting...' : 'Request Demo Access'}</Button></div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

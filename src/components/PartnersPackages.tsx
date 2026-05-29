import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Clock, 
  Phone, 
  Mail, 
  Layers, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  X,
  HelpCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

// Local Interfaces for Database Schemas
interface PartnerProfile {
  id: string;
  name: string | null;
  category: string;
  sub_category: string | null;
  price: number | null;
  price_unit: string | null;
  bio: string | null;
  avatar_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  is_verified: boolean | null;
  experience_years: number | null;
  phone: string | null;
  email: string | null;
  portfolio_images: string[] | null;
  is_available: boolean | null;
}

interface PartnerDetails {
  partner_id: string;
  hero_description: string;
  inclusions: string[] | null;
  styles: string[] | null;
  examples: string[] | null;
  workflow: string[] | null;
  deliverables: string[] | null;
  use_cases: string[] | null;
  tips: string[] | null;
  faqs: { question: string; answer: string; }[] | null;
}

interface UnifiedPackage {
  id: string;
  domain: string;
  name: string;
  description: string | null;
  price: number | null;
  thumbnail: string | null;
  is_active: boolean | null;
  metadata: {
    tag?: string;
    category?: string;
    pricing_mode?: string;
    included_items?: string[];
  } | null;
}

interface PackageDetails {
  id: string;
  package_id: string | null;
  hero_description: string | null;
  inclusions: string[] | null;
  styles: string[] | null;
  examples: string[] | null;
  workflow: string[] | null;
  deliverables: string[] | null;
  use_cases: string[] | null;
  tips: string[] | null;
  faqs: { question: string; answer: string; }[] | null;
}

export default function PartnersPackages() {
  const [activeTab, setActiveTab] = useState<'partners' | 'packages'>('partners');
  
  // Data lists
  const [partners, setPartners] = useState<PartnerProfile[]>([]);
  const [packages, setPackages] = useState<UnifiedPackage[]>([]);
  
  // Modals & Details states
  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<UnifiedPackage | null>(null);
  const [fetchedDetails, setFetchedDetails] = useState<PartnerDetails | PackageDetails | null>(null);
  const [detailsActiveTab, setDetailsActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  // Loading states
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch lists on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingList(true);

        // Fetch verified partners with completed profiles, excluding Uday
        const { data: partnersData, error: partnersError } = await supabase
          .from('partner_profiles')
          .select('*')
          .not('name', 'is', null)
          .neq('name', 'Uday')
          .order('rating', { ascending: false })
          .limit(100);

        if (partnersError) throw partnersError;
        
        // Exclude sandbox profiles and Uday
        const rawList = (partnersData as PartnerProfile[] || []).filter(
          p => p.name !== 'Uday' && p.id !== 'e7d03104-efd6-4854-96c1-a3dcd6b524f6'
        );

        // Deduplicate by category: keep only the highest-rated partner for each unique category
        const categoryMap = new Map<string, PartnerProfile>();
        rawList.forEach(partner => {
          const cat = partner.category;
          if (!categoryMap.has(cat)) {
            categoryMap.set(cat, partner);
          } else {
            const existing = categoryMap.get(cat)!;
            if ((partner.rating || 0) > (existing.rating || 0)) {
              categoryMap.set(cat, partner);
            }
          }
        });

        // Convert the map back into a concise, diverse array
        const diversePartners = Array.from(categoryMap.values())
          .sort((a, b) => (b.rating || 0) - (a.rating || 0));
          
        setPartners(diversePartners);

        // Fetch active packages
        const { data: packagesData, error: packagesError } = await supabase
          .from('unified_packages')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: true })
          .limit(100);

        if (packagesError) throw packagesError;
        setPackages(packagesData as UnifiedPackage[] || []);

      } catch (err) {
        console.error("Error loading partners/packages:", err);
      } finally {
        setLoadingList(false);
      }
    }
    loadData();
  }, []);

  // Fetch deeper details on card click
  const handlePartnerClick = async (partner: PartnerProfile) => {
    setSelectedPartner(partner);
    setDetailsActiveTab('overview');
    setFaqOpenIndices({});
    setLoadingDetails(true);
    setFetchedDetails(null);

    try {
      const { data, error } = await supabase
        .from('partner_category_details')
        .select('*')
        .eq('partner_id', partner.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFetchedDetails(data as PartnerDetails);
      }
    } catch (err) {
      console.error("Error fetching partner details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handlePackageClick = async (pkg: UnifiedPackage) => {
    setSelectedPackage(pkg);
    setDetailsActiveTab('overview');
    setFaqOpenIndices({});
    setLoadingDetails(true);
    setFetchedDetails(null);

    try {
      const { data, error } = await supabase
        .from('package_category_details')
        .select('*')
        .eq('package_id', pkg.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setFetchedDetails(data as PackageDetails);
      }
    } catch (err) {
      console.error("Error fetching package details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpenIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const closeModal = () => {
    setSelectedPartner(null);
    setSelectedPackage(null);
    setFetchedDetails(null);
  };

  // Micro-transition settings
  const hoverCardScale = { hover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } } };

  return (
    <section className="py-20 sm:py-28 bg-slate-50 dark:bg-slate-900/40 border-y border-slate-100 dark:border-white/5 transition-colors duration-500 overflow-hidden relative">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-400/5 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-400/5 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/30 dark:border-blue-500/20 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={12} />
              <span>Creative Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-[-0.03em] leading-tight">
              Dynamic solutions. <br className="hidden sm:block" />
              Verified experts.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Book certified independent partners directly or configure end-to-end premium curated packages managed by Focsera.
            </p>
          </div>

          {/* Interactive Pill Tabs */}
          <div className="flex bg-slate-200/60 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/20 dark:border-white/5 self-start md:self-end">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('partners')}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeTab === 'partners' 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md shadow-slate-900/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Creative Partners
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('packages')}
              className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                activeTab === 'packages' 
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md shadow-slate-900/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Premium Packages
            </motion.button>
          </div>
        </div>

        {/* Loading Skeleton lists */}
        {loadingList ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white dark:bg-slate-950/60 rounded-3xl p-6 border border-slate-100 dark:border-white/5 animate-pulse min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                  <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* TABS CONTENT */}
            {activeTab === 'partners' ? (
              <motion.div
                key="partners"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {partners.map(partner => (
                  <motion.div
                    key={partner.id}
                    variants={hoverCardScale}
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePartnerClick(partner)}
                    className="group bg-white dark:bg-slate-950/60 rounded-3xl p-6 sm:p-7 border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/20 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                  >
                    <div>
                      {/* Header row: Avatar, Category */}
                      <div className="flex gap-4 items-start">
                        <div className="relative">
                          {partner.avatar_url ? (
                            <img 
                              src={partner.avatar_url} 
                              alt={partner.sub_category || ""} 
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-900 group-hover:border-blue-500/50 transition-colors"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg border-2 border-white dark:border-slate-900">
                              {(partner.sub_category || "P")[0]}
                            </div>
                          )}
                          {partner.is_verified && (
                            <div className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white dark:border-slate-950">
                              <CheckCircle2 size={10} fill="currentColor" className="text-white dark:text-blue-500 fill-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {partner.sub_category || partner.category || "Focsera Partner"}
                          </h3>
                          <span className="text-xs font-semibold text-blue-500 dark:text-blue-400 tracking-wide uppercase">
                            {partner.category}
                          </span>
                        </div>
                      </div>

                      {/* Info & Rating chips */}
                      <div className="flex flex-wrap items-center gap-3 mt-5">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-semibold">
                          <Star size={11} fill="currentColor" />
                          <span>{partner.rating ? partner.rating.toFixed(1) : "5.0"}</span>
                          <span className="text-slate-400 dark:text-slate-500">({partner.reviews_count || 0})</span>
                        </div>
                        {partner.experience_years && (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-350 text-xs font-medium">
                            <Award size={11} />
                            <span>{partner.experience_years} Years Exp</span>
                          </div>
                        )}
                      </div>

                      {/* Bio snippet */}
                      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {partner.bio || "Verified professional partner offering custom creative sessions tailored precisely to your requirements."}
                      </p>
                    </div>

                    {/* Footer Row: price, action */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Rate Card</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            Enquire for details
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>View Profile</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="packages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {packages.map(pkg => (
                  <motion.div
                    key={pkg.id}
                    variants={hoverCardScale}
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePackageClick(pkg)}
                    className="group bg-white dark:bg-slate-950/60 rounded-3xl p-6 sm:p-7 border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/20 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
                  >
                    <div>
                      {/* Package thumbnail / fallback */}
                      <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                        {pkg.thumbnail ? (
                          <img 
                            src={pkg.thumbnail} 
                            alt={pkg.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-blue-500 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10">
                            <Layers size={36} />
                          </div>
                        )}
                        
                        {/* Domain Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase">
                          {pkg.domain}
                        </div>

                        {pkg.metadata?.tag && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase">
                            {pkg.metadata.tag}
                          </div>
                        )}
                      </div>

                      {/* Package Name */}
                      <h3 className="font-bold text-xl text-slate-900 dark:text-white mt-6 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {pkg.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {pkg.description || "Fully comprehensive corporate or domestic launch and activation package, backed by verified vendor lists."}
                      </p>
                    </div>

                    {/* Footer Row: price, action */}
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Standard Rate</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                            Enquire for details
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>View Plan Tiers</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          DETAILS MODAL / DRAWER
      ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(selectedPartner || selectedPackage) && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200/20 dark:border-white/5"
              >
                <X size={18} />
              </button>

              {/* Modal Body: Scrollable */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                
                {/* ── PARTNER MODAL CONTENT ── */}
                {selectedPartner && (
                  <div>
                    {/* Header Banner */}
                    <div className="p-8 sm:p-10 bg-gradient-to-br from-blue-50/50 to-indigo-50/20 dark:from-slate-900/60 dark:to-slate-950 border-b border-slate-100 dark:border-white/5">
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        {/* Big Avatar */}
                        {selectedPartner.avatar_url ? (
                          <img 
                            src={selectedPartner.avatar_url} 
                            alt={selectedPartner.sub_category || ""} 
                            className="w-20 h-20 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-2xl border-4 border-white dark:border-slate-800 shadow-lg">
                            {(selectedPartner.sub_category || "P")[0]}
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                              {selectedPartner.category}
                            </span>
                            {selectedPartner.is_verified && (
                              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-500/20">
                                <CheckCircle2 size={10} className="fill-emerald-500 text-white" />
                                <span>Verified Partner</span>
                              </div>
                            )}
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
                            {selectedPartner.sub_category || selectedPartner.category || "Focsera Partner"}
                          </h2>
                          <p className="text-sm text-slate-400 mt-1.5 font-medium flex items-center gap-1.5">
                            <Star size={13} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-slate-800 dark:text-slate-200">{selectedPartner.rating || "5.0"}</span> 
                            <span>({selectedPartner.reviews_count || 0} client reviews)</span>
                            <span>•</span>
                            <span>{selectedPartner.experience_years || 5} Years Exp</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Tab list */}
                    <div className="flex border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 px-8">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDetailsActiveTab('overview')}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                          detailsActiveTab === 'overview' 
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        Profile & Styles
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDetailsActiveTab('inclusions')}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                          detailsActiveTab === 'inclusions' 
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        Inclusions & Workflow
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDetailsActiveTab('faqs')}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                          detailsActiveTab === 'faqs' 
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        FAQs & Booking
                      </motion.button>
                    </div>

                    {/* Tab contents */}
                    <div className="p-8 sm:p-10">
                      {loadingDetails ? (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                          <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
                          <span className="text-sm font-semibold">Loading verified profile data...</span>
                        </div>
                      ) : (
                        <div>
                          
                          {/* OVERVIEW TAB */}
                          {detailsActiveTab === 'overview' && (
                            <div className="space-y-8">
                              <div>
                                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">About the Team</h4>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {selectedPartner.bio || "Professional creative team specializing in tailored high-performance client delivery."}
                                </p>
                              </div>

                              {/* Hero Description from category details */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).hero_description && (
                                <div className="p-5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-500/10">
                                  <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed italic">
                                    "{(fetchedDetails as PartnerDetails).hero_description}"
                                  </p>
                                </div>
                              )}

                              {/* Styles / Specialties */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).styles && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Specialty Styles & Forms</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {((fetchedDetails as PartnerDetails).styles || []).map((style, i) => (
                                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-250 text-xs font-semibold">
                                        {style}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Use cases */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).use_cases && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Ideal For / Use Cases</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {((fetchedDetails as PartnerDetails).use_cases || []).map((useCase, i) => (
                                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-100/10">
                                        {useCase}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Gallery Visuals */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).examples && ((fetchedDetails as PartnerDetails).examples || []).length > 0 && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Work Examples & Portfolio</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    {((fetchedDetails as PartnerDetails).examples || []).map((img, i) => (
                                      <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                                        <img src={img} alt={`Sample ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* INCLUSIONS & WORKFLOW TAB */}
                          {detailsActiveTab === 'inclusions' && (
                            <div className="space-y-8">
                              {/* Inclusions */}
                              <div>
                                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">Standard Inclusions</h4>
                                {fetchedDetails && (fetchedDetails as PartnerDetails).inclusions ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {((fetchedDetails as PartnerDetails).inclusions || []).map((inc, i) => (
                                      <div key={i} className="flex gap-3 items-start">
                                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-sm text-slate-700 dark:text-slate-350">{inc}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-slate-400">Custom inclusions configured during initial direct alignment.</p>
                                )}
                              </div>

                              {/* Deliverables */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).deliverables && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">Session Deliverables</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {((fetchedDetails as PartnerDetails).deliverables || []).map((del, i) => (
                                      <div key={i} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                                        <span className="text-sm text-slate-700 dark:text-slate-350 font-medium">{del}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Workflow timeline */}
                              <div>
                                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-5">Engagement & Delivery Timeline</h4>
                                {fetchedDetails && (fetchedDetails as PartnerDetails).workflow ? (
                                  <div className="space-y-4">
                                    {((fetchedDetails as PartnerDetails).workflow || []).map((step, i) => (
                                      <div key={i} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                          {i + 1}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                          {step}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300">Book session on Focsera Play Store application.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300">Direct coordination with expert partner to finalise schedule.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300">Creative delivery on site, with post-session support and review.</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* FAQS & BOOKING TAB */}
                          {detailsActiveTab === 'faqs' && (
                            <div className="space-y-8">
                              {/* FAQs Accordion */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).faqs && ((fetchedDetails as PartnerDetails).faqs || []).length > 0 ? (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">Frequently Asked Questions</h4>
                                  <div className="space-y-3.5">
                                    {((fetchedDetails as PartnerDetails).faqs || []).map((faq, idx) => (
                                      <div 
                                        key={idx} 
                                        className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/10 transition-colors"
                                      >
                                        <button
                                          onClick={() => toggleFaq(idx)}
                                          className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-bold text-slate-900 dark:text-white text-sm"
                                        >
                                          <span>{faq.question}</span>
                                          {faqOpenIndices[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                        <AnimatePresence initial={false}>
                                          {faqOpenIndices[idx] && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25 }}
                                            >
                                              <div className="px-5 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100/50 dark:border-white/5">
                                                {faq.answer}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : null}

                              {/* Tips Box */}
                              {fetchedDetails && (fetchedDetails as PartnerDetails).tips && ((fetchedDetails as PartnerDetails).tips || []).length > 0 && (
                                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                                    <Sparkles size={12} />
                                    <span>Expert Session Tips</span>
                                  </h5>
                                  <ul className="space-y-2">
                                    {((fetchedDetails as PartnerDetails).tips || []).map((tip, i) => (
                                      <li key={i} className="text-sm text-slate-600 dark:text-slate-350 list-disc list-inside">
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Booking Call-to-Action */}
                              <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl">
                                <div>
                                  <h4 className="font-extrabold text-xl">Direct Partner Booking</h4>
                                  <p className="text-sm text-slate-400 mt-1">Book directly from our official Focsera mobile app.</p>
                                </div>
                                <a 
                                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] rounded-2xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 shrink-0 transition-all duration-300"
                                >
                                  <Zap size={14} />
                                  <span>Get Focsera App</span>
                                </a>
                              </div>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── PACKAGE MODAL CONTENT ── */}
                {selectedPackage && (
                  <div>
                    {/* Header Banner */}
                    <div className="p-8 sm:p-10 bg-gradient-to-br from-blue-50/50 to-indigo-50/20 dark:from-slate-900/60 dark:to-slate-950 border-b border-slate-100 dark:border-white/5">
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        {/* Package Cover */}
                        {selectedPackage.thumbnail ? (
                          <img 
                            src={selectedPackage.thumbnail} 
                            alt={selectedPackage.name} 
                            className="w-20 h-20 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-2xl border-4 border-white dark:border-slate-800 shadow-lg">
                            <Layers size={32} />
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                              {selectedPackage.domain} Package
                            </span>
                            {selectedPackage.metadata?.tag && (
                              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-100 dark:border-amber-500/20">
                                <Sparkles size={10} className="text-amber-500" />
                                <span>{selectedPackage.metadata.tag}</span>
                              </div>
                            )}
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3 tracking-tight">
                            {selectedPackage.name}
                          </h2>
                          <p className="text-sm text-slate-400 mt-1.5 font-semibold">
                            Standard rate starts from: <span className="text-slate-800 dark:text-slate-200">Enquire for details</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Tab list */}
                    <div className="flex border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/30 px-8">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDetailsActiveTab('overview')}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                          detailsActiveTab === 'overview' 
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        Package Details
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDetailsActiveTab('inclusions')}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                          detailsActiveTab === 'inclusions' 
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        What's Included
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDetailsActiveTab('faqs')}
                        className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                          detailsActiveTab === 'faqs' 
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                            : 'border-transparent text-slate-400 hover:text-slate-800 dark:hover:text-white'
                        }`}
                      >
                        Process & FAQ
                      </motion.button>
                    </div>

                    {/* Tab contents */}
                    <div className="p-8 sm:p-10">
                      {loadingDetails ? (
                        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                          <Loader2 className="animate-spin text-blue-500 mb-3" size={32} />
                          <span className="text-sm font-semibold">Loading curated package details...</span>
                        </div>
                      ) : (
                        <div>
                          
                          {/* OVERVIEW TAB */}
                          {detailsActiveTab === 'overview' && (
                            <div className="space-y-8">
                              <div>
                                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Service Description</h4>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {selectedPackage.description || "Detailed multi-vendor full creative alignment managed end-to-end by Focsera operations."}
                                </p>
                              </div>

                              {/* Hero Description from category details */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).hero_description && (
                                <div className="p-5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-500/10">
                                  <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed italic">
                                    "{(fetchedDetails as PackageDetails).hero_description}"
                                  </p>
                                </div>
                              )}

                              {/* Styles / Specialties */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).styles && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Package Options & Variants</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {((fetchedDetails as PackageDetails).styles || []).map((style, i) => (
                                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-250 text-xs font-semibold">
                                        {style}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Use cases */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).use_cases && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Use Cases & Scenarios</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {((fetchedDetails as PackageDetails).use_cases || []).map((useCase, i) => (
                                      <span key={i} className="px-3.5 py-1.5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-xs font-semibold border border-blue-100/10">
                                        {useCase}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Gallery Visuals */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).examples && ((fetchedDetails as PackageDetails).examples || []).length > 0 && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-3">Visual Showcases</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    {((fetchedDetails as PackageDetails).examples || []).map((img, i) => (
                                      <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                                        <img src={img} alt={`Sample ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* INCLUSIONS TAB */}
                          {detailsActiveTab === 'inclusions' && (
                            <div className="space-y-8">
                              {/* Inclusions */}
                              <div>
                                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">Core Inclusions</h4>
                                {fetchedDetails && (fetchedDetails as PackageDetails).inclusions ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {((fetchedDetails as PackageDetails).inclusions || []).map((inc, i) => (
                                      <div key={i} className="flex gap-3 items-start">
                                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-sm text-slate-700 dark:text-slate-350">{inc}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : selectedPackage.metadata?.included_items ? (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {(selectedPackage.metadata.included_items || []).map((inc, i) => (
                                      <div key={i} className="flex gap-3 items-start">
                                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-sm text-slate-700 dark:text-slate-350">{inc}</span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-slate-400">Standard curated package terms managed upon placement.</p>
                                )}
                              </div>

                              {/* Deliverables */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).deliverables && (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">Deliverables & Standards</h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {((fetchedDetails as PackageDetails).deliverables || []).map((del, i) => (
                                      <div key={i} className="flex gap-3 items-center">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                                        <span className="text-sm text-slate-700 dark:text-slate-350 font-medium">{del}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* FAQS & PROCESS TAB */}
                          {detailsActiveTab === 'faqs' && (
                            <div className="space-y-8">
                              {/* Workflow timeline */}
                              <div>
                                <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-5">Workflow & Setup Process</h4>
                                {fetchedDetails && (fetchedDetails as PackageDetails).workflow ? (
                                  <div className="space-y-4">
                                    {((fetchedDetails as PackageDetails).workflow || []).map((step, i) => (
                                      <div key={i} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                          {i + 1}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                          {step}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300">Choose package tier (Lite, Standard, Premium) inside Focsera portal.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300">Submit date, venue, custom specifications, and add-ons.</p>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                      <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/20 dark:border-blue-500/25 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                                      <p className="text-sm text-slate-600 dark:text-slate-300">Focsera handles operational dispatch and full multi-vendor management.</p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* FAQs Accordion */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).faqs && ((fetchedDetails as PackageDetails).faqs || []).length > 0 ? (
                                <div>
                                  <h4 className="text-sm font-extrabold uppercase tracking-wider text-slate-400 mb-4">Frequently Asked Questions</h4>
                                  <div className="space-y-3.5">
                                    {((fetchedDetails as PackageDetails).faqs || []).map((faq, idx) => (
                                      <div 
                                        key={idx} 
                                        className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/10 transition-colors"
                                      >
                                        <button
                                          onClick={() => toggleFaq(idx)}
                                          className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-bold text-slate-900 dark:text-white text-sm"
                                        >
                                          <span>{faq.question}</span>
                                          {faqOpenIndices[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                        <AnimatePresence initial={false}>
                                          {faqOpenIndices[idx] && (
                                            <motion.div
                                              initial={{ height: 0, opacity: 0 }}
                                              animate={{ height: 'auto', opacity: 1 }}
                                              exit={{ height: 0, opacity: 0 }}
                                              transition={{ duration: 0.25 }}
                                            >
                                              <div className="px-5 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100/50 dark:border-white/5">
                                                {faq.answer}
                                              </div>
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : null}

                              {/* Tips Box */}
                              {fetchedDetails && (fetchedDetails as PackageDetails).tips && ((fetchedDetails as PackageDetails).tips || []).length > 0 && (
                                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-500 mb-2 flex items-center gap-1.5">
                                    <Sparkles size={12} />
                                    <span>Curated Execution Tips</span>
                                  </h5>
                                  <ul className="space-y-2">
                                    {((fetchedDetails as PackageDetails).tips || []).map((tip, i) => (
                                      <li key={i} className="text-sm text-slate-600 dark:text-slate-350 list-disc list-inside">
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Booking Call-to-Action */}
                              <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl">
                                <div>
                                  <h4 className="font-extrabold text-xl">Curated Package Setup</h4>
                                  <p className="text-sm text-slate-400 mt-1">Configure and purchase this package inside Focsera portal.</p>
                                </div>
                                <a 
                                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.97] rounded-2xl font-bold text-sm text-white flex items-center gap-2 shadow-lg shadow-blue-500/20 shrink-0 transition-all duration-300"
                                >
                                  <Zap size={14} />
                                  <span>Get Focsera App</span>
                                </a>
                              </div>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle2, 
  Award, 
  Clock, 
  Zap, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { findMatchingItem, getPackageSchema, getPartnerSchema, slugify } from '../lib/seoHelper';

export default function SeoLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Data Loading States
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Matched Item State
  const [itemType, setItemType] = useState<'package' | 'partner' | null>(null);
  const [itemData, setItemData] = useState<any | null>(null);
  const [categoryDetails, setCategoryDetails] = useState<any | null>(null);

  // Cross-reference data (related partners for a package, related packages for a partner)
  const [relatedItems, setRelatedItems] = useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // Tabs / Accordions UI State
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!slug) return;
    
    async function resolvePage() {
      try {
        setLoading(true);
        setErrorMsg(null);
        setItemData(null);
        setItemType(null);
        setCategoryDetails(null);
        setRelatedItems([]);

        // 1. Fetch all packages and partners to match the slug
        const [packagesRes, partnersRes] = await Promise.all([
          supabase.from('unified_packages').select('*').eq('is_active', true),
          supabase.from('partner_profiles').select('*').not('name', 'is', null).neq('name', 'Uday')
        ]);

        if (packagesRes.error) throw packagesRes.error;
        if (partnersRes.error) throw partnersRes.error;

        const resolved = findMatchingItem(slug || '', packagesRes.data || [], partnersRes.data || []);
        
        if (!resolved) {
          setLoading(false);
          return; // Shows fallback page
        }

        setItemType(resolved.type);
        setItemData(resolved.data);

        // 2. Fetch Category Details & Related Entities
        if (resolved.type === 'package') {
          // Fetch package_category_details
          const { data: details, error: detailsErr } = await supabase
            .from('package_category_details')
            .select('*')
            .eq('package_id', resolved.data.id)
            .maybeSingle();
            
          if (!detailsErr && details) {
            setCategoryDetails(details);
          }

          // Fetch related partners in the same category/domain
          setLoadingRelated(true);
          const domain = resolved.data.domain;
          // Map domain to partner category terms
          let categorySearch = '';
          if (domain.toLowerCase() === 'event') categorySearch = 'Event';
          else if (domain.toLowerCase() === 'interiors') categorySearch = 'Interior';
          else if (domain.toLowerCase() === 'media') categorySearch = 'Editor';
          else if (domain.toLowerCase() === 'studio') categorySearch = 'Photographer';
          else if (domain.toLowerCase() === 'web') categorySearch = 'Design';

          const { data: relPartners } = await supabase
            .from('partner_profiles')
            .select('*')
            .not('name', 'is', null)
            .neq('name', 'Uday')
            .ilike('category', `%${categorySearch}%`)
            .limit(3);

          if (relPartners) {
            setRelatedItems(relPartners);
          }
          setLoadingRelated(false);
        } else {
          // Fetch partner_category_details
          const { data: details, error: detailsErr } = await supabase
            .from('partner_category_details')
            .select('*')
            .eq('partner_id', resolved.data.id)
            .maybeSingle();

          if (!detailsErr && details) {
            setCategoryDetails(details);
          }

          // Fetch related packages in the same category
          setLoadingRelated(true);
          const category = resolved.data.category;
          let domainSearch = '';
          if (category.toLowerCase().includes('event') || category.toLowerCase().includes('host') || category.toLowerCase().includes('planner')) domainSearch = 'Event';
          else if (category.toLowerCase().includes('interior')) domainSearch = 'Interiors';
          else if (category.toLowerCase().includes('editor') || category.toLowerCase().includes('reel')) domainSearch = 'Media';
          else if (category.toLowerCase().includes('photographer') || category.toLowerCase().includes('photo')) domainSearch = 'Studio';
          else if (category.toLowerCase().includes('design') || category.toLowerCase().includes('web') || category.toLowerCase().includes('coder')) domainSearch = 'Web';

          const { data: relPackages } = await supabase
            .from('unified_packages')
            .select('*')
            .eq('is_active', true)
            .eq('domain', domainSearch)
            .limit(3);

          if (relPackages) {
            setRelatedItems(relPackages);
          }
          setLoadingRelated(false);
        }
      } catch (err: any) {
        console.error("Error resolving SEO page:", err);
        setErrorMsg(err.message || 'Failed to load details.');
      } finally {
        setLoading(false);
      }
    }

    resolvePage();
  }, [slug]);

  // Inject Meta Details (Title, Description, JSON-LD Schema) for SEO
  useEffect(() => {
    if (!itemData || !itemType) return;

    const name = itemType === 'package' ? itemData.name : (itemData.sub_category || itemData.name);
    const description = itemData.description || itemData.bio || `Explore expert services for ${name} by Focsera.`;
    
    // 1. Page Title
    document.title = `${name} | Focsera Premium Event & Creative Services`;

    // 2. Meta Tags (Description, OpenGraph)
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', `${name} | Focsera`);

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // 3. Dynamic JSON-LD Script Tag Injection
    const existingScript = document.getElementById('focsera-seo-ld-json');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'focsera-seo-ld-json';
    script.type = 'application/ld+json';
    const schemaData = itemType === 'package' ? getPackageSchema(itemData) : getPartnerSchema(itemData);
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      // Cleanup custom JSON-LD script on unmount
      const scriptToRemove = document.getElementById('focsera-seo-ld-json');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [itemData, itemType]);

  const toggleFaq = (index: number) => {
    setFaqOpenIndices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleWhatsAppBooking = () => {
    window.open('https://play.google.com/store/apps/details?id=com.focsera.focsera', '_blank');
  };

  // Determine Dynamic Theme Colors Based on Domain
  const getThemeColors = () => {
    if (!itemData) return { primary: 'from-blue-600 to-indigo-600', text: 'text-blue-500', bgGlow: 'bg-blue-500/10', border: 'border-blue-500/20' };
    const domainOrCategory = (itemType === 'package' ? itemData.domain : itemData.category).toLowerCase();
    
    if (domainOrCategory.includes('event') || domainOrCategory.includes('planner') || domainOrCategory.includes('host')) {
      return { primary: 'from-orange-500 to-red-500', text: 'text-orange-500', bgGlow: 'bg-orange-500/10', border: 'border-orange-500/20' };
    }
    if (domainOrCategory.includes('interior')) {
      return { primary: 'from-amber-500 to-yellow-600', text: 'text-amber-500', bgGlow: 'bg-amber-500/10', border: 'border-amber-500/20' };
    }
    if (domainOrCategory.includes('media') || domainOrCategory.includes('edit')) {
      return { primary: 'from-purple-600 to-pink-600', text: 'text-purple-500', bgGlow: 'bg-purple-500/10', border: 'border-purple-500/20' };
    }
    if (domainOrCategory.includes('studio') || domainOrCategory.includes('photo')) {
      return { primary: 'from-blue-600 to-cyan-500', text: 'text-blue-500', bgGlow: 'bg-blue-500/10', border: 'border-blue-500/20' };
    }
    if (domainOrCategory.includes('web') || domainOrCategory.includes('design') || domainOrCategory.includes('coder')) {
      return { primary: 'from-indigo-600 to-teal-500', text: 'text-indigo-500', bgGlow: 'bg-indigo-500/10', border: 'border-indigo-500/20' };
    }
    return { primary: 'from-blue-600 to-indigo-600', text: 'text-blue-500', bgGlow: 'bg-blue-500/10', border: 'border-blue-500/20' };
  };

  const themeColors = getThemeColors();

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-base font-semibold">Resolving secure SEO connection...</p>
      </div>
    );
  }

  // FALLBACK: SLUG NOT MATCHED
  if (!itemData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
        <div className="max-w-md w-full bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 text-center relative z-10">
          <Sparkles className="text-yellow-500 w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-white mb-2">Service Not Found</h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            The page you are looking for has been relocated or is currently undergoing update processes. Explore our creative directories instead.
          </p>
          <div className="space-y-3">
            <button onClick={() => navigate('/')} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98]">
              Go to Homepage
            </button>
            <button onClick={() => navigate('/contact')} className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CORE RENDER
  const name = itemType === 'package' ? itemData.name : (itemData.sub_category || itemData.name);
  const subtitle = itemType === 'package' ? `${itemData.domain} Package` : itemData.category;
  const rating = itemData.rating ? itemData.rating.toFixed(1) : "5.0";
  const reviews = itemData.reviews_count || 120;
  const exp = itemData.experience_years || 6;
  const bio = itemData.bio || itemData.description || "Premium service offering tailored professional execution.";

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 relative pb-20">
      
      {/* Background Decorative Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${themeColors.bgGlow} rounded-full blur-[140px] opacity-40`} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-900 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 relative z-10">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-xs font-semibold text-slate-400">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={12} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="capitalize">{subtitle}</span>
          <span>/</span>
          <span className="text-white line-clamp-1">{name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <span className={`px-3.5 py-1 rounded-full bg-gradient-to-r ${themeColors.primary} text-white text-[10px] font-extrabold uppercase tracking-wider`}>
                {subtitle}
              </span>
              {itemType === 'partner' && itemData.is_verified && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                  <ShieldCheck size={11} fill="currentColor" className="text-emerald-500 fill-emerald-500/10" />
                  <span>Verified Professional</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-tight text-white mb-6">
              {name}
            </h1>

            {/* Ratings & Metadata Row */}
            <div className="flex flex-wrap items-center gap-5 mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">
                <Star size={12} fill="currentColor" />
                <span>{rating}</span>
                <span className="text-slate-400 font-medium">({reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-slate-350 text-xs font-semibold border border-white/5">
                <Award size={12} />
                <span>{exp} Years Experience</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-slate-350 text-xs font-semibold border border-white/5">
                <Clock size={12} />
                <span>24-48hr Delivery</span>
              </div>
            </div>

            {/* Content Tabs Navigation */}
            <div className="flex border-b border-white/5 bg-slate-900/40 rounded-t-2xl px-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'overview' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Overview & Styles
              </button>
              <button
                onClick={() => setActiveTab('inclusions')}
                className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'inclusions' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                What's Included
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'faqs' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Process & FAQs
              </button>
            </div>

            {/* Tabs Body Content */}
            <div className="bg-slate-900/20 border-x border-b border-white/5 rounded-b-2xl p-6 sm:p-8">
              
              {/* 1. OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2">
                      <BookOpen size={14} /> Description
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {bio}
                    </p>
                  </div>

                  {categoryDetails?.hero_description && (
                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                      <p className="text-blue-300/80 text-sm leading-relaxed italic">
                        "{categoryDetails.hero_description}"
                      </p>
                    </div>
                  )}

                  {/* Specialty Styles */}
                  {categoryDetails?.styles && (categoryDetails.styles || []).length > 0 && (
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <Sliders size={14} /> Speciality Formats & Options
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {(categoryDetails.styles || []).map((style: string, i: number) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-white/5 text-slate-200 text-xs font-semibold border border-white/5 hover:border-white/10 transition-colors">
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Use Cases */}
                  {categoryDetails?.use_cases && (categoryDetails.use_cases || []).length > 0 && (
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <TrendingUp size={14} /> Recommended Use Cases
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {(categoryDetails.use_cases || []).map((useCase: string, i: number) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-blue-500/5 text-blue-300 text-xs font-semibold border border-blue-500/10">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Visual examples portfolio */}
                  {categoryDetails?.examples && (categoryDetails.examples || []).length > 0 && (
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4">
                        Work Showcase
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(categoryDetails.examples || []).map((imgUrl: string, i: number) => (
                          <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/5 group">
                            <img src={imgUrl} alt={`Showcase ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2. INCLUSIONS TAB */}
              {activeTab === 'inclusions' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4">
                      Core Inclusions Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categoryDetails?.inclusions ? (
                        (categoryDetails.inclusions || []).map((inc: string, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-slate-350 text-sm">{inc}</span>
                          </div>
                        ))
                      ) : itemType === 'package' && itemData.metadata?.included_items ? (
                        (itemData.metadata.included_items || []).map((inc: string, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-slate-350 text-sm">{inc}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500">Fully curated service setup aligned upon direct engagement request.</p>
                      )}
                    </div>
                  </div>

                  {categoryDetails?.deliverables && (categoryDetails.deliverables || []).length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4">
                        Standard Deliverables
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(categoryDetails.deliverables || []).map((del: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                            <span className="text-slate-350 text-sm font-medium">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. PROCESS & FAQS TAB */}
              {activeTab === 'faqs' && (
                <div className="space-y-8">
                  {/* Process timeline */}
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-5">
                      Operational Workflow
                    </h3>
                    <div className="space-y-5">
                      {categoryDetails?.workflow ? (
                        (categoryDetails.workflow || []).map((step: string, i: number) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                            <p className="text-slate-300 text-sm">Select service or package option inside Focsera mobile portal.</p>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                            <p className="text-slate-300 text-sm">Coordinate parameters and timelines directly with verified partners.</p>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                            <p className="text-slate-300 text-sm">Review quality work and finalize payouts upon standard delivery.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* FAQs */}
                  {categoryDetails?.faqs && (categoryDetails.faqs || []).length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <MessageSquare size={14} /> Frequently Asked Questions
                      </h3>
                      <div className="space-y-3.5">
                        {(categoryDetails.faqs || []).map((faq: { question: string; answer: string; }, idx: number) => (
                          <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-bold text-white text-sm"
                            >
                              <span>{faq.question}</span>
                              {faqOpenIndices[idx] ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            </button>
                            <AnimatePresence initial={false}>
                              {faqOpenIndices[idx] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-5 pb-5 pt-1 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Hero CTA card Right */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white mb-2">Book Service Offer</h3>
              <p className="text-xs text-slate-400 mb-6">Choose direct WhatsApp coordinate booking or get Focsera App.</p>

              {/* Price Details */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">STANDARD RATE</span>
                <div className="text-2xl font-black text-white">
                  {itemData.price || itemData.price_min ? `₹${itemData.price || itemData.price_min}` : 'Contact for Pricing'}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {itemData.price_unit ? `per ${itemData.price_unit}` : 'Standard package baseline'}
                </span>
              </div>

              {/* Inclusions summary preview */}
              <div className="space-y-3 mb-8">
                <div className="flex gap-2.5 items-center text-xs text-slate-350">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>100% Quality Guarantee</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs text-slate-350">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>Verified Focsera Support</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs text-slate-350">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>Secure Escrow Payments</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Zap size={15} />
                  <span>Book via WhatsApp</span>
                </button>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Download Play Store App</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Related Section */}
        {relatedItems.length > 0 && (
          <div className="pt-12 border-t border-white/5 mt-16">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {itemType === 'package' ? 'Verified Partner Experts' : 'Curated Packages'}
              </h2>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Related Solutions</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((item, idx) => {
                const itemSlug = itemType === 'package' 
                  ? slugify(item.sub_category || item.name || "")
                  : slugify(item.name || "");
                
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => navigate(`/${itemSlug}`)}
                    className="group bg-slate-900 border border-white/5 hover:border-white/10 rounded-2xl p-5 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {item.avatar_url || item.thumbnail ? (
                        <img 
                          src={item.avatar_url || item.thumbnail} 
                          alt={item.name} 
                          className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
                          <Layers className="text-slate-600" size={28} />
                        </div>
                      )}
                      
                      <h4 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-1">
                        {item.name || item.sub_category}
                      </h4>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {item.bio || item.description || "Premium verified service provider option."}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-bold text-slate-400">
                      <span>Rate Card: Enquire</span>
                      <span className="text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

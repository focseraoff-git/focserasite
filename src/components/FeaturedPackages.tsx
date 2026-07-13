import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { getOptimizedSlug } from '../lib/seoHelper';
 
interface UnifiedPackage {
  id: string;
  domain: string;
  name: string;
  description: string | null;
  price: number | null;
  thumbnail: string | null;
  is_active: boolean | null;
  metadata: any;
}
 
const fallbackPackages: UnifiedPackage[] = [
  {
    id: 'pkg-celebrate-1',
    domain: 'Celebrate',
    name: 'Premium Birthday Event Package',
    description: 'Complete celebration planning: thematic decoration, professional sound setup, MC/hosting, and cinematic event photography.',
    price: 18500,
    thumbnail: '/images/Screenshot_20260426_235650.jpg.jpeg',
    is_active: true,
    metadata: { tag: 'POPULAR' }
  },
  {
    id: 'pkg-grow-1',
    domain: 'Grow',
    name: 'Business Website & SEO Launch',
    description: 'High-converting custom website, local SEO optimization, font local config, and branding logo creation.',
    price: 24999,
    thumbnail: '/images/Screenshot_20260402_111519.jpg',
    is_active: true,
    metadata: { tag: 'BUSINESS' }
  },
  {
    id: 'pkg-build-1',
    domain: 'Build',
    name: 'Modern Living Space Interior Makeover',
    description: '3D spatial visualization, material sourcing, customized modular furniture fabrication, and structural execution under expert supervision.',
    price: 95000,
    thumbnail: '/images/interior_render_cinematic.png',
    is_active: true,
    metadata: { tag: 'INTERIORS' }
  }
];
 
export default function FeaturedPackages() {
  const [packages, setPackages] = useState<UnifiedPackage[]>(fallbackPackages);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('unified_packages')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true })
          .limit(6);

        if (error) throw error;
        if (data && data.length > 0) {
          setPackages(data);
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };
    fetchPackages();
  }, []);

  const handleViewDetails = (pkg: UnifiedPackage) => {
    const slug = getOptimizedSlug(pkg.name, 'package', pkg.id);
    navigate(`/${slug}`);
  };

  const displayPackages = packages;

  return (
    <section id="packages" className="py-16 sm:py-24 bg-focsera-bg">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-12 gap-4"
        >
          <div>
            <p className="text-[11px] font-bold text-focsera-primary uppercase tracking-[0.2em] mb-3">
              Packages
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-focsera-text tracking-[-0.03em] leading-tight">
              Featured Packages
            </h2>
            <p className="mt-3 text-focsera-muted text-sm sm:text-base max-w-md leading-relaxed">
              Curated solutions tailored to your requirements. Ready to book.
            </p>
          </div>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {displayPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
              onClick={() => handleViewDetails(pkg)}
              className="group min-w-[280px] sm:min-w-0 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 overflow-hidden transition-all duration-400 flex flex-col cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-[160px] sm:h-[180px] overflow-hidden bg-gray-100">
                <img
                  src={pkg.thumbnail || '/images/app-screenshot-1.png'}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
                {pkg.metadata?.tag && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold text-white bg-focsera-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {pkg.metadata.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <div className="text-[10px] font-semibold text-focsera-muted uppercase tracking-wider mb-1.5">
                  {pkg.domain}
                </div>
                <h3 className="text-[15px] font-bold text-focsera-text tracking-tight mb-2 leading-snug line-clamp-2">
                  {pkg.name}
                </h3>
                {pkg.description && (
                  <p className="text-[12px] text-focsera-muted leading-relaxed mb-4 line-clamp-2 flex-1">
                    {pkg.description}
                  </p>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <div>
                    <span className="text-[11px] text-focsera-muted">Catering & Setup</span>
                    <div className="text-sm font-bold text-focsera-text">Custom Quote</div>
                  </div>
                  <div className="text-[12px] font-semibold text-focsera-primary group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                    View Details
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

interface PartnerProfile {
  id: string;
  name: string | null;
  category: string;
  sub_category: string | null;
  avatar_url: string | null;
  rating: number | null;
  reviews_count: number | null;
  is_verified: boolean | null;
  experience_years: number | null;
  bio: string | null;
}

const fallbackPartners: PartnerProfile[] = [
  {
    id: 'p-1',
    name: 'Rajesh Kumar',
    category: 'Celebrate',
    sub_category: 'Event Planner & Decorator',
    avatar_url: '/images/partner_event_planner.png',
    rating: 4.9,
    reviews_count: 38,
    is_verified: true,
    experience_years: 8,
    bio: 'Specialist in thematic event design, birthday planning, corporate gatherings, and custom lighting arrangements.'
  },
  {
    id: 'p-2',
    name: 'Priya Sharma',
    category: 'Build',
    sub_category: 'Interior Architect',
    avatar_url: '/images/partner_designer.png',
    rating: 4.8,
    reviews_count: 24,
    is_verified: true,
    experience_years: 6,
    bio: 'Expert in residential transformations, modular kitchen styling, space-optimization renders, and architectural execution.'
  },
  {
    id: 'p-3',
    name: 'Ananya Rao',
    category: 'Create',
    sub_category: 'Commercial Photographer',
    avatar_url: '/images/partner_photographer.png',
    rating: 5.0,
    reviews_count: 52,
    is_verified: true,
    experience_years: 5,
    bio: 'Specialized in cinematic product shoots, portfolio headshots, wedding photography, and premium digital reels.'
  }
];

export default function FeaturedPartners() {
  const [partners, setPartners] = useState<PartnerProfile[]>(fallbackPartners);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from('partner_profiles')
          .select('id, name, category, sub_category, avatar_url, rating, reviews_count, is_verified, experience_years, bio')
          .eq('is_verified', true)
          .eq('is_available', true)
          .order('rating', { ascending: false })
          .limit(6);

        if (error) throw error;
        if (data && data.length > 0) {
          setPartners(data);
        }
      } catch (err) {
        console.error('Error fetching partners:', err);
      }
    };
    fetchPartners();
  }, []);

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const displayPartners = partners;

  return (
    <section id="partners" className="py-16 sm:py-24 bg-white">
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
              Our Partners
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-focsera-text tracking-[-0.03em] leading-tight">
              Trusted Professionals
            </h2>
            <p className="mt-3 text-focsera-muted text-sm sm:text-base max-w-md leading-relaxed">
              Every Focsera partner is vetted, verified, and rated by real customers.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
          {displayPartners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.06 }}
              className="group min-w-[260px] sm:min-w-0 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100/50 transition-all duration-400"
            >
              {/* Avatar + Info */}
              <div className="flex items-start gap-4 mb-4">
                {partner.avatar_url ? (
                  <img
                    src={partner.avatar_url}
                    alt={partner.sub_category || 'Partner'}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-focsera-accent flex items-center justify-center text-focsera-primary font-bold text-lg">
                    {getInitials(partner.sub_category || partner.category)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-[15px] font-bold text-focsera-text tracking-tight truncate">
                      {partner.sub_category || partner.category || 'Focsera Expert'}
                    </h3>
                    {partner.is_verified && (
                      <CheckCircle2 size={14} className="text-focsera-primary shrink-0" />
                    )}
                  </div>
                  <div className="text-[12px] text-focsera-muted font-medium">
                    {partner.category}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {partner.bio && (
                <p className="text-[12px] text-focsera-muted leading-relaxed mb-4 line-clamp-2">
                  {partner.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-[12px] text-focsera-muted mb-4">
                {partner.rating && (
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-focsera-text">{partner.rating}</span>
                    {partner.reviews_count ? (
                      <span>({partner.reviews_count})</span>
                    ) : null}
                  </div>
                )}
                {partner.experience_years ? (
                  <span>{partner.experience_years}+ yrs exp</span>
                ) : null}
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/919515803954?text=Hi%2C%20I'm%20interested%20in%20booking%20a%20consultation%20for%20${encodeURIComponent(partner.sub_category || partner.category || 'Expert')}%20(${encodeURIComponent(partner.category)}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-focsera-accent text-focsera-primary text-[13px] font-semibold hover:bg-focsera-primary hover:text-white transition-all duration-300"
              >
                Book Consultation
                <ArrowRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

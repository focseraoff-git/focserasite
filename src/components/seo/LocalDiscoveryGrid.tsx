// src/components/seo/LocalDiscoveryGrid.tsx
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { trackLocationClick } from '../../lib/seoAnalytics';

// Must match the TARGET_LOCATIONS in seoHelper.ts and generate_pages.mjs
const TARGET_LOCATIONS = [
  { slug: 'hyderabad', name: 'Hyderabad' },
  { slug: 'gachibowli', name: 'Gachibowli' },
  { slug: 'secunderabad', name: 'Secunderabad' },
  { slug: 'kondapur', name: 'Kondapur' },
  { slug: 'jubilee-hills', name: 'Jubilee Hills' },
  { slug: 'madhapur', name: 'Madhapur' },
  { slug: 'banjara-hills', name: 'Banjara Hills' },
  { slug: 'kukatpally', name: 'Kukatpally' },
];

function getLocationSlug(baseSlug: string, locationSlug: string): string {
  if (locationSlug === 'hyderabad') return baseSlug;
  if (baseSlug.endsWith('-hyderabad-telangana')) return baseSlug.replace('-hyderabad-telangana', `-${locationSlug}`);
  if (baseSlug.endsWith('-hyderabad')) return baseSlug.replace('-hyderabad', `-${locationSlug}`);
  return `${baseSlug}-${locationSlug}`;
}

interface Props {
  baseSlug: string;
  currentSlug: string;
  serviceName: string;
}

export default function LocalDiscoveryGrid({ baseSlug, currentSlug, serviceName }: Props) {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-focsera-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label mb-2 block">Local Discovery</span>
            <h2 className="font-heading text-heading-2 text-focsera-text flex items-center gap-2">
              <MapPin size={22} className="text-focsera-primary" />
              Find {serviceName} near you
            </h2>
            <p className="text-sm text-focsera-muted mt-2">
              Explore verified professionals and packages across Hyderabad
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {TARGET_LOCATIONS.map((loc) => {
            const locSlug = getLocationSlug(baseSlug, loc.slug);
            const isActive = locSlug === currentSlug;

            return (
              <Link
                key={loc.slug}
                to={`/${locSlug}`}
                className={`group p-4 sm:p-5 rounded-xl border transition-all duration-200 flex flex-col ${
                  isActive
                    ? 'bg-focsera-accent border-focsera-primary/20 shadow-card-sm'
                    : 'bg-white border-focsera-border hover:border-focsera-primary/15 hover:shadow-card-sm'
                }`}
                onClick={() => trackLocationClick(loc.name)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-xs font-semibold text-focsera-muted group-hover:text-focsera-primary transition-colors line-clamp-1 mb-1">
                  {serviceName}
                </span>
                <span className={`text-sm font-bold ${isActive ? 'text-focsera-primary' : 'text-focsera-text'}`}>
                  in {loc.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

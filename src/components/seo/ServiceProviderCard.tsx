// src/components/seo/ServiceProviderCard.tsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { RelatedItem } from './types';
import { trackProviderClick } from '../../lib/seoAnalytics';

interface Props {
  item: RelatedItem;
  itemType: 'package' | 'partner';
}

export default function ServiceProviderCard({ item, itemType }: Props) {
  return (
    <Link
      to={`/${item.slug}`}
      className="marketplace-card group flex flex-col overflow-hidden"
      onClick={() => trackProviderClick(item.id, item.name)}
      aria-label={`View ${item.name}`}
    >
      {/* Image */}
      {item.imageUrl ? (
        <div className="aspect-[16/10] overflow-hidden bg-gray-50">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
            width={400}
            height={250}
          />
        </div>
      ) : (
        <div className="aspect-[16/10] bg-gradient-to-br from-focsera-accent to-focsera-bg flex items-center justify-center">
          <span className="text-3xl font-bold text-focsera-primary/20 font-heading">F</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-focsera-muted uppercase tracking-wider mb-2">
          {item.subtitle}
        </span>
        <h3 className="text-base font-bold text-focsera-text group-hover:text-focsera-primary transition-colors mb-2 font-sans line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-focsera-muted line-clamp-2 leading-relaxed flex-1">
          {item.description || `Premium verified ${itemType === 'package' ? 'package' : 'service provider'} on Focsera.`}
        </p>

        <div className="mt-4 pt-4 border-t border-focsera-border flex items-center justify-between">
          <span className="text-sm font-semibold text-focsera-text">View Details</span>
          <ArrowRight size={16} className="text-focsera-primary group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

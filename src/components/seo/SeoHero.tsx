import { Link } from 'react-router-dom';
import { CheckCircle, Shield, CreditCard, Clock, ArrowRight, Smartphone } from 'lucide-react';
import type { PageData } from './types';
import { getCategoryAccent, getCategoryBgAccent } from './types';
import { trackAppCtaClick } from '../../lib/seoAnalytics';

interface Props {
  data: PageData;
}

const trustSignals = [
  { icon: Shield, label: 'Verified Professionals' },
  { icon: CreditCard, label: 'Transparent Details' },
  { icon: Clock, label: 'Easy Booking' },
  { icon: CheckCircle, label: 'Secure Payments' },
];

export default function SeoHero({ data }: Props) {
  const accent = getCategoryAccent(data.subtitle);
  const bgAccent = getCategoryBgAccent(data.subtitle);

  return (
    <section className="relative bg-focsera-bg">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] ${bgAccent} rounded-full blur-[120px] opacity-60`} />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-focsera-border to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-12 sm:pb-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-focsera-muted" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-focsera-primary transition-colors">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-focsera-border">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="capitalize">{data.subtitle.replace(' Package', '').replace(' Partner', '')}</span>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-focsera-border">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-focsera-text font-medium">{data.name}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left content */}
          <div className="lg:col-span-7">
            {/* Category badge */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${bgAccent} ${accent}`}>
                {data.subtitle.replace(' Package', '').replace(' Partner', '')}
              </span>
              {data.isVerified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100">
                  <Shield size={12} />
                  Verified Professional
                </span>
              )}
            </div>

            {/* H1 */}
            <h1 className="font-heading text-heading-1 sm:text-display text-focsera-text mb-5 leading-tight">
              {data.seoH1}
            </h1>

            {/* Short description */}
            <p className="text-body-lg text-focsera-muted max-w-2xl mb-8 leading-relaxed">
              {data.bio.length > 200 ? data.bio.slice(0, 200).trim() + '…' : data.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => trackAppCtaClick('hero', 'play_store')}
                id="hero-book-app"
              >
                <Smartphone size={16} />
                Book on Focsera App
                <ArrowRight size={16} />
              </a>
              <a
                href="#service-overview"
                className="btn-secondary"
                id="hero-explore"
              >
                Explore Details
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-3">
              {trustSignals.map((signal) => (
                <div key={signal.label} className="trust-badge">
                  <signal.icon size={14} className="text-focsera-primary" />
                  <span>{signal.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Service image + Booking card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Service image */}
            {data.thumbnail && (
              <div className="rounded-2xl overflow-hidden mb-6 shadow-card-md">
                <img
                  src={data.thumbnail}
                  alt={data.name}
                  className="w-full aspect-[4/3] object-cover"
                  loading="eager"
                  width={600}
                  height={450}
                />
              </div>
            )}

            {/* Quick booking card */}
            <div className="marketplace-card p-6">
              <h3 className="text-lg font-bold text-focsera-text mb-1 font-sans">Book This Service</h3>
              <p className="text-sm text-focsera-muted mb-5">
                Connect with verified professionals and book directly on the Focsera app.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-sm text-focsera-muted">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                  <span>Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-focsera-muted">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                  <span>Dedicated Focsera Support</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-focsera-muted">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                  <span>Secure Payments</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                  onClick={() => trackAppCtaClick('sidebar', 'play_store')}
                  id="sidebar-book-app"
                >
                  <Smartphone size={16} />
                  Book on Focsera App
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

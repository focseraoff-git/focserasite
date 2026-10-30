import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { serviceVisuals } from "../design/services";

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface TrustPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PackageItem {
  name: string;
  subtitle?: string;
  timeline?: string;
  guests?: string;
  whatsIncluded: string[];
  isPopular?: boolean;
}

export interface AddonItem {
  name: string;
  description: string;
}

export interface ServicePageData {
  // Hero
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroIcon: LucideIcon;
  heroVideoPath?: string;

  // Services
  services: ServiceItem[];

  // Packages (PDF packages show on screen)
  packages?: PackageItem[];
  addons?: AddonItem[];

  // Process
  processSteps: ProcessStep[];

  // Trust / Why Choose
  trustPoints: TrustPoint[];

  // CTA
  ctaTitle: string;
  ctaDescription: string;
  pdfPath?: string;
  pdfLabel?: string;

  // WhatsApp
  whatsappMessage: string;
  packageCategories?: {
    title: string;
    packages: PackageItem[];
  }[];
}

interface ServicePageProps {
  data: ServicePageData;
}

export default function ServicePage({ data }: ServicePageProps) {
  const { pathname } = useLocation();
  const [category, setCategory] = useState(0);
  const visual =
    serviceVisuals.find((s) => s.path === pathname) || serviceVisuals[0];
  const packages =
    data.packageCategories?.[category]?.packages || data.packages || [];
  const enquiry = (name?: string) =>
    `https://wa.me/919515802954?text=${encodeURIComponent(name ? `${data.whatsappMessage} I am interested in ${name}.` : data.whatsappMessage)}`;
  return (
    <div className="service-redesign">
      <section className="p-container p-service-hero">
        <div>
          <div className="p-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            {visual.title}
          </div>
          <span className="p-eyebrow">{data.heroTag}</span>
          <h1>{data.heroTitle}</h1>
          <p className="p-lead">{data.heroSubtitle}</p>
          <div className="p-actions">
            <a
              className="p-button"
              href={enquiry()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss your project <ArrowUpRight size={18} />
            </a>
            <a className="p-button p-button-outline" href="#services">
              Explore services <ArrowRight size={17} />
            </a>
          </div>
          <div className="p-mini-trust">
            <span>
              <Check size={15} /> Dedicated coordination
            </span>
            <span>
              <Check size={15} /> Clear project scope
            </span>
          </div>
        </div>
        <figure className="p-service-visual">
          <img src={visual.image} alt={visual.alt} />
          <figcaption>
            <span>{visual.label}</span>
            <strong>Ideas. Expertise. Execution.</strong>
          </figcaption>
        </figure>
      </section>
      <section id="services" className="p-section p-soft">
        <div className="p-container">
          <div className="p-section-heading">
            <div>
              <span className="p-eyebrow">Our expertise</span>
              <h2>Made for your next move.</h2>
            </div>
            <p>
              Focused services. Thoughtful details.
              <br />
              Everything your project deserves.
            </p>
          </div>
          <div className="p-grid-3">
            {data.services.map(({ icon: Icon, title, description }, i) => (
              <article className="p-expertise-card" key={title}>
                <div className="p-card-top">
                  <Icon size={24} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                  href={enquiry(title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-text-link"
                >
                  Enquire now <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      {(packages.length > 0 || data.pdfPath) && (
        <section id="packages" className="p-section p-container">
          <div className="p-section-heading">
            <div>
              <span className="p-eyebrow">Find your fit</span>
              <h2>A plan for every ambition.</h2>
            </div>
            {data.pdfPath && (
              <a
                className="p-button p-button-outline"
                href={data.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={17} />
                {data.pdfLabel || "Download packages"}
              </a>
            )}
          </div>
          {data.packageCategories && (
            <div
              className="p-tabs"
              role="tablist"
              aria-label="Package categories"
            >
              {data.packageCategories.map((c, i) => (
                <button
                  key={c.title}
                  id={`category-${i}`}
                  role="tab"
                  aria-controls="package-list"
                  aria-selected={category === i}
                  onClick={() => setCategory(i)}
                >
                  {c.title}
                </button>
              ))}
            </div>
          )}
          <div
            className="p-grid-3"
            id="package-list"
            role={data.packageCategories ? "tabpanel" : undefined}
            aria-labelledby={
              data.packageCategories ? `category-${category}` : undefined
            }
          >
            {packages.map((pkg) => (
              <article
                className={`p-plan ${pkg.isPopular ? "p-plan-popular" : ""}`}
                key={pkg.name}
              >
                {pkg.isPopular && (
                  <span className="p-plan-badge">Recommended</span>
                )}
                <span className="p-eyebrow">
                  {pkg.timeline || "Built around you"}
                </span>
                <h3>{pkg.name}</h3>
                {pkg.subtitle && <p>{pkg.subtitle}</p>}
                {pkg.guests && <p>{pkg.guests}</p>}
                <ul>
                  {pkg.whatsIncluded.map((item) => (
                    <li key={item}>
                      <Check size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  className={`p-button ${pkg.isPopular ? "" : "p-button-outline"}`}
                  href={enquiry(pkg.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss this package <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
          {data.addons && (
            <div className="p-addons">
              <h3>Make it your own.</h3>
              <div className="p-grid-3">
                {data.addons.map((a) => (
                  <div key={a.name}>
                    <h4>{a.name}</h4>
                    <p>{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      <section className="p-section p-navy">
        <div className="p-container">
          <span className="p-eyebrow">From brief to brilliant</span>
          <h2>Good work starts with a clear plan.</h2>
          <div className="p-process">
            {data.processSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="p-section p-container">
        <div className="p-section-heading">
          <div>
            <span className="p-eyebrow">The Focsera approach</span>
            <h2>Considered at every step.</h2>
          </div>
        </div>
        <div className="p-grid-3">
          {data.trustPoints.map(({ icon: Icon, title, description }) => (
            <article className="p-trust-card" key={title}>
              <Icon size={25} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="p-container p-bottom-cta">
        <div>
          <span className="p-eyebrow">Let's make it happen</span>
          <h2>{data.ctaTitle}</h2>
          <p>{data.ctaDescription}</p>
        </div>
        <a
          className="p-button"
          href={enquiry()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} />
          Start a conversation
        </a>
      </section>
    </div>
  );
}

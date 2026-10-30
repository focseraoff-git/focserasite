import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "../integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { getOptimizedSlug } from "../lib/seoHelper";

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
    id: "pkg-celebrate-1",
    domain: "Celebrate",
    name: "Premium Birthday Event Package",
    description:
      "Complete celebration planning: thematic decoration, professional sound setup, MC/hosting, and cinematic event photography.",
    price: 18500,
    thumbnail: "/images/campaign/focsera-events.png",
    is_active: true,
    metadata: { tag: "POPULAR" },
  },
  {
    id: "pkg-grow-1",
    domain: "Grow",
    name: "Business Website & SEO Launch",
    description:
      "High-converting custom website, local SEO optimization, and brand identity design.",
    price: 24999,
    thumbnail: "/images/campaign/focsera-business.png",
    is_active: true,
    metadata: { tag: "BUSINESS" },
  },
  {
    id: "pkg-build-1",
    domain: "Build",
    name: "Modern Living Space Interior Makeover",
    description:
      "3D spatial visualization, material sourcing, customized modular furniture fabrication, and structural execution under expert supervision.",
    price: 95000,
    thumbnail: "/images/campaign/focsera-interiors.png",
    is_active: true,
    metadata: { tag: "INTERIORS" },
  },
];

export default function FeaturedPackages() {
  const [packages, setPackages] = useState<UnifiedPackage[]>(fallbackPackages);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from("unified_packages")
          .select("*")
          .eq("is_active", true)
          .order("price", { ascending: true })
          .limit(6);

        if (error) throw error;
        if (data && data.length > 0) {
          setPackages(data);
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    fetchPackages();
  }, []);

  const handleViewDetails = (pkg: UnifiedPackage) => {
    const slug = getOptimizedSlug(pkg.name, "package", pkg.id);
    navigate(`/${slug}`);
  };

  const displayPackages = packages;

  return (
    <section id="packages" className="f-block-section">
      <div className="p-container">
        <header className="f-block-heading">
          <span className="p-eyebrow">Made for your next big thing</span>
          <h2>Featured Packages</h2>
          <p>Thoughtfully planned. Beautifully delivered.</p>
        </header>
        <div className="f-block-grid">
          {displayPackages.map((pkg) => (
            <article key={pkg.id} className="f-quality-block f-package-block">
              <div className="f-block-copy">
                <span className="f-block-label">
                  {pkg.metadata?.tag || pkg.domain}
                </span>
                <h3>{pkg.name}</h3>
                <p>{pkg.description}</p>
                <button
                  onClick={() => handleViewDetails(pkg)}
                  className="f-block-action"
                >
                  Explore package <ArrowRight size={16} />
                </button>
              </div>
              <div className="f-block-photo">
                <img
                  src={pkg.thumbnail || "/images/campaign/focsera-events.png"}
                  alt={pkg.name}
                  loading="lazy"
                />
                <span className="f-photo-chip">Tailored to your project</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

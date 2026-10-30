import { useEffect, useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { supabase } from "../integrations/supabase/client";

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
    id: "p-1",
    name: "Rajesh Kumar",
    category: "Celebrate",
    sub_category: "Event Planner & Decorator",
    avatar_url: "/images/campaign/focsera-events.png",
    rating: 4.9,
    reviews_count: 38,
    is_verified: true,
    experience_years: 8,
    bio: "Specialist in thematic event design, birthday planning, corporate gatherings, and custom lighting arrangements.",
  },
  {
    id: "p-2",
    name: "Priya Sharma",
    category: "Build",
    sub_category: "Interior Architect",
    avatar_url: "/images/campaign/focsera-business.png",
    rating: 4.8,
    reviews_count: 24,
    is_verified: true,
    experience_years: 6,
    bio: "Expert in residential transformations, modular kitchen styling, space-optimization renders, and architectural execution.",
  },
  {
    id: "p-3",
    name: "Ananya Rao",
    category: "Create",
    sub_category: "Commercial Photographer",
    avatar_url: "/images/campaign/focsera-photography.png",
    rating: 5.0,
    reviews_count: 52,
    is_verified: true,
    experience_years: 5,
    bio: "Specialized in cinematic product shoots, portfolio headshots, wedding photography, and premium digital reels.",
  },
];

export default function FeaturedPartners() {
  const [partners, setPartners] = useState<PartnerProfile[]>(fallbackPartners);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase
          .from("partner_profiles")
          .select(
            "id, name, category, sub_category, avatar_url, rating, reviews_count, is_verified, experience_years, bio",
          )
          .eq("is_verified", true)
          .eq("is_available", true)
          .order("rating", { ascending: false })
          .limit(6);

        if (error) throw error;
        if (data && data.length > 0) {
          setPartners(data);
        }
      } catch (err) {
        console.error("Error fetching partners:", err);
      }
    };
    fetchPartners();
  }, []);

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const displayPartners = partners;

  return (
    <section id="partners" className="f-block-section f-partner-section">
      <div className="p-container">
        <header className="f-block-heading">
          <span className="p-eyebrow">The people behind the possibilities</span>
          <h2>Experts Vetted for Quality</h2>
          <p>Meet the specialists who bring your ideas to life.</p>
        </header>
        <div className="f-block-grid">
          {displayPartners.map((partner) => (
            <article
              key={partner.id}
              className="f-quality-block f-partner-block"
            >
              <div className="f-block-copy">
                <span className="f-block-label">{partner.category}</span>
                <h3>{partner.sub_category || "Focsera Expert"}</h3>
                <p>{partner.bio}</p>
                <a
                  className="f-block-action"
                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find your expert <ArrowRight size={16} />
                </a>
              </div>
              <div className="f-block-photo">
                {partner.avatar_url ? (
                  <img
                    src={partner.avatar_url}
                    alt={partner.sub_category || "Focsera specialist"}
                    loading="lazy"
                  />
                ) : (
                  <span>{getInitials(partner.category)}</span>
                )}
                {partner.is_verified && (
                  <span className="f-photo-chip">
                    <CheckCircle2 size={15} /> Focsera verified
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

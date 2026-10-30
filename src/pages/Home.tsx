import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  CalendarDays,
  Monitor,
  TrendingUp,
  Check,
  Sparkles,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import { serviceVisuals } from "../design/services";
import FeaturedPackages from "../components/FeaturedPackages";
import FeaturedPartners from "../components/FeaturedPartners";
import HomeFAQ from "../components/HomeFAQ";
const mainServices = [
  { ...serviceVisuals[1], icon: CalendarDays, title: "Events & celebrations" },
  { ...serviceVisuals[0], icon: Camera, title: "Studios & photography" },
  { ...serviceVisuals[4], icon: TrendingUp, title: "Marketing & growth" },
  { ...serviceVisuals[2], icon: Monitor, title: "Business & digital" },
];
const remarkableStories = [
  {
    ...serviceVisuals[1],
    image: "/images/partner_event_planner.png",
    alt: "Focsera event planning specialist",
    copy: "Celebrations with presence. Experiences worth remembering.",
  },
  {
    ...serviceVisuals[0],
    image: "/images/partner_photographer.png",
    alt: "Focsera photography specialist with professional camera",
    copy: "Photography and films that make every frame mean more.",
  },
  {
    ...serviceVisuals[2],
    image: "/images/partner_developer.png",
    alt: "Focsera digital development specialist",
    copy: "Your next chapter in business, beautifully brought online.",
  },
];
export default function Home() {
  return (
    <div className="p-home">
      <section className="g-hero" aria-labelledby="grand-title">
        <div className="g-hero-art">
          <img
            src="/images/campaign/focsera-collective.png"
            alt="Campaign illustration of creative, event, digital and interior professionals in Focsera blue"
            fetchPriority="high"
          />
        </div>
        <div className="g-hero-shade" />
        <div className="g-hero-copy p-container">
          <span className="g-kicker">
            <span /> YOUR WORLD. ELEVATED.
          </span>
          <h1 id="grand-title">
            Everything extraordinary.
            <br />
            <em>At your doorstep.</em>
          </h1>
          <p>
            Big celebrations. Beautiful stories. Bolder businesses.
            <br />
            The expertise to bring your world to life, all in one place.
          </p>
          <div className="p-actions">
            <a href="#solutions" className="p-button">
              Explore Focsera <ArrowUpRight size={18} />
            </a>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-button p-button-outline">
              Plan your project <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <div className="g-hero-bottom p-container">
          <span>CREATIVE MINDS. EXCEPTIONAL POSSIBILITIES.</span>
          <a href="#solutions">
            Discover your next <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <div className="g-brand-ribbon" aria-label="Focsera service worlds">
        <span>CREATE</span>
        <Sparkles />
        <span>CELEBRATE</span>
        <Sparkles />
        <span>BUILD</span>
        <Sparkles />
        <span>TRANSFORM</span>
        <Sparkles />
        <span>GROW</span>
        <Sparkles />
        <span>CONNECT</span>
      </div>
      <div className="p-container">
        <div className="p-promise-strip">
          <span>THE FOCSERA STANDARD</span>
          <p>
            <Check size={17} /> Thoughtful planning
          </p>
          <p>
            <Check size={17} /> Professional execution
          </p>
          <p>
            <Check size={17} /> Personal attention
          </p>
        </div>
      </div>
      <section id="solutions" className="p-section p-container">
        <div className="p-section-heading">
          <div>
            <span className="p-eyebrow">A world of possibilities</span>
            <h2>One world. Endless possibilities.</h2>
          </div>
          <p>
            Big milestones or everyday ambitions.
            <br />
            Find the right expertise for yours.
          </p>
        </div>
        <div className="p-service-categories">
          {mainServices.map((s) => {
            const Icon = s.icon;
            return (
              <Link to={s.path} className="p-category" key={s.path}>
                <span className="g-category-visual">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                </span>
                <span className="g-category-content">
                  <span className="g-category-icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span>
                    <small>{s.short}</small>
                    <strong>{s.title}</strong>
                  </span>
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="g-more-domains">
          <span>More from Focsera</span>
          {[serviceVisuals[5], serviceVisuals[6], serviceVisuals[3]].map(
            (s) => (
              <Link to={s.path} key={s.path}>
                {s.title}
                <ArrowUpRight size={15} />
              </Link>
            ),
          )}
          <Link to="/beyond">
            Beyond <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <section className="p-section p-soft">
        <div className="p-container">
          <div className="p-section-heading">
            <div>
              <span className="p-eyebrow">Made for your world</span>
              <h2>Make room for remarkable.</h2>
            </div>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-text-link">
              Find your perfect fit <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="p-editorial-grid">
            {remarkableStories.map((s) => (
              <Link className="p-editorial-card" to={s.path} key={s.path}>
                <div className="p-editorial-image">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                  <span className="p-card-arrow">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <span className="p-eyebrow">{s.label}</span>
                <h3>{s.description}</h3>
                <p>{s.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="p-existing-section">
        <FeaturedPackages />
      </div>
      <section id="how-it-works" className="p-section p-navy">
        <div className="p-container p-how-layout">
          <div>
            <span className="p-eyebrow">Less effort. More possibility.</span>
            <h2>
              You dream it.
              <br />
              We bring it.
            </h2>
            <p className="p-lead">
              We bring the right people and a clear process together, so you can
              focus on what matters.
            </p>
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-button p-button-light">
              Start your project <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="p-step-list">
            {[
              [
                "01",
                "Tell us what you have in mind",
                "Choose a service and share your idea, timeline, and priorities.",
              ],
              [
                "02",
                "Find the right approach",
                "Explore options with our team and agree on the details.",
              ],
              [
                "03",
                "Leave the execution to us",
                "Your specialists bring the plan to life, with coordination along the way.",
              ],
            ].map(([n, t, d]) => (
              <article key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="p-existing-section">
        <FeaturedPartners />
      </div>
      <section id="industries" className="p-container p-audience">
        <span className="p-eyebrow">Different worlds. Shared ambition.</span>
        <h2>
          For the way you live.
          <br />
          And the work you do.
        </h2>
        <div>
          {[
            "Individuals & families",
            "Startups & businesses",
            "Creators & brands",
            "Schools & institutions",
            "Hospitality & retail",
          ].map((x) => (
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" key={x}>
              {x}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </section>
      <div className="p-existing-section p-faq">
        <HomeFAQ />
      </div>
      <section className="p-container p-app-panel">
        <div>
          <span className="p-eyebrow">FOCSERA, WHEREVER YOU ARE</span>
          <h2>
            Your world.
            <br />
            One powerful app.
          </h2>
          <p>
            Discover services, explore packages, and take the next step with
            Focsera on your phone.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
            target="_blank"
            rel="noopener noreferrer"
            className="p-button"
          >
            <Smartphone size={19} />
            Get it on Google Play <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="p-phone g-connected-phone">
          <img
            src="/images/focsera-connected-phone.png"
            alt="Focsera app captured from the connected phone"
            loading="lazy"
          />
        </div>
      </section>
      <section className="p-container p-bottom-cta">
        <div>
          <span className="p-eyebrow">Your next chapter starts here</span>
          <h2>
            Have something in mind?
            <br />
            Let's make it happen.
          </h2>
        </div>
        <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-button">
          Talk to Focsera <MessageCircle size={18} />
        </a>
      </section>
    </div>
  );
}

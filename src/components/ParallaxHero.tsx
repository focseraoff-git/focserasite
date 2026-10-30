import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
export const ParallaxHero = () => (
  <section className="p-container p-service-hero p-arena-hero">
    <div>
      <span className="p-eyebrow">An experience by Focsera Events</span>
      <h1>
        More play.
        <br />
        More connection.
        <br />
        This is ArenaX.
      </h1>
      <p className="p-lead">
        The community challenge festival. Games, shared experiences, and a
        little friendly competition, designed for every age.
      </p>
      <div className="p-actions">
        <Link className="p-button" to="/arenax/games">
          Explore games <ArrowUpRight size={17} />
        </Link>
        <Link className="p-button p-button-outline" to="/arenax/schedule">
          View schedule <CalendarDays size={17} />
        </Link>
      </div>
      <div className="p-mini-trust">
        <span>
          <Users size={16} /> Bringing communities together
        </span>
      </div>
    </div>
    <figure className="p-service-visual">
      <img src={heroBg} alt="ArenaX community challenge festival stage" />
      <figcaption>
        <span>COMMUNITY MEETS POSSIBILITY</span>
        <strong>Make a little room for play.</strong>
      </figcaption>
    </figure>
  </section>
);

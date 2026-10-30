import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, HeartHandshake, Lightbulb } from "lucide-react";
import { serviceVisuals } from "../design/services";
const values = [
  {
    icon: Layers,
    title: "Connected expertise",
    description:
      "Creative thinking, technical skill, and hands-on execution, brought into one conversation.",
  },
  {
    icon: HeartHandshake,
    title: "People at the centre",
    description:
      "We begin with your priorities and keep the work grounded in what you want to achieve.",
  },
  {
    icon: Lightbulb,
    title: "Ideas with purpose",
    description:
      "We care about details that make a difference, from the first brief to the final delivery.",
  },
];
export default function About() {
  return (
    <div>
      <section className="p-container p-story-hero">
        <div>
          <span className="p-eyebrow">Meet Focsera</span>
          <h1>
            Many talents.
            <br />
            One shared
            <br />
            <span>point of view.</span>
          </h1>
          <p>
            We bring creative, digital, and lifestyle expertise together to help
            people and businesses turn good ideas into meaningful experiences.
          </p>
          <div className="p-actions">
            <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-button">
              Get to know us <ArrowUpRight size={17} />
            </a>
            <Link to="/journey" className="p-text-link">
              Explore our journey <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <img
          src="/images/campaign/focsera-business.png"
          alt="Focsera creative specialist at work"
        />
      </section>
      <section className="p-section p-soft">
        <div className="p-container p-story-text">
          <div>
            <span className="p-eyebrow">From vision to execution</span>
            <h2>
              A world of expertise.
              <br />
              Working together.
            </h2>
          </div>
          <div>
            <p>
              Focsera connects individuals and businesses with specialists
              across photography, films, events, web development, media,
              marketing, product solutions, and interiors.
            </p>
            <p>
              Each discipline brings its own perspective. Together, they make it
              easier to move from an idea to a coordinated plan, and from that
              plan to a finished experience.
            </p>
            <p>
              Whether you are celebrating a milestone, building a brand, or
              reimagining a space, we work with you to understand what matters
              and bring the right expertise to the table.
            </p>
          </div>
        </div>
      </section>
      <section className="p-section p-container">
        <div className="p-section-heading">
          <div>
            <span className="p-eyebrow">What brings us together</span>
            <h2>
              Thoughtful by nature.
              <br />
              Collaborative by design.
            </h2>
          </div>
        </div>
        <div className="p-grid-3">
          {values.map(({ icon: Icon, title, description }) => (
            <article className="p-story-values" key={title}>
              <Icon size={28} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="p-section p-navy">
        <div className="p-container">
          <span className="p-eyebrow">The Focsera world</span>
          <h2>Explore what we can do together.</h2>
          <div className="p-process">
            {serviceVisuals.map((s) => (
              <article key={s.path}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <Link
                  className="p-button p-button-light"
                  to={s.path}
                  style={{ marginTop: 20 }}
                >
                  Explore <ArrowUpRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="p-container p-bottom-cta">
        <div>
          <span className="p-eyebrow">A good place to start</span>
          <h2>
            Your next idea.
            <br />
            Our next conversation.
          </h2>
        </div>
        <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-button">
          Let's talk <ArrowUpRight size={17} />
        </a>
      </section>
    </div>
  );
}

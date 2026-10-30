import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Lightbulb,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
const values = [
  {
    icon: Lightbulb,
    title: "Curiosity that creates",
    description:
      "We ask questions, explore possibilities, and look for a thoughtful approach to each challenge.",
  },
  {
    icon: HeartHandshake,
    title: "Collaboration that connects",
    description:
      "We bring people and perspectives together, keeping your goals at the centre of the work.",
  },
  {
    icon: ShieldCheck,
    title: "Care that carries through",
    description:
      "We value clear communication, considered details, and responsibility from start to finish.",
  },
];
export default function Mission() {
  return (
    <div>
      <section className="p-container p-story-hero">
        <div>
          <span className="p-eyebrow">Our purpose</span>
          <h1>
            Possibility,
            <br />
            with a sense
            <br />
            <span>of purpose.</span>
          </h1>
          <p>
            To empower individuals and businesses through creativity,
            technology, and experiences that turn ideas into reality.
          </p>
          <div className="p-actions">
            <a className="p-button" href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">
              Build something with us <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <img
          src="/images/campaign/focsera-collective.png"
          alt="A Focsera specialist bringing digital ideas to life"
        />
      </section>
      <section className="p-navy p-purpose-quote">
        <div className="p-container">
          <span className="p-eyebrow">Our vision</span>
          <blockquote>
            A world where creativity opens doors, and good ideas have room to
            grow.
          </blockquote>
          <p>Inspired by people. Made possible together.</p>
        </div>
      </section>
      <section className="p-section p-container">
        <div className="p-section-heading">
          <div>
            <span className="p-eyebrow">The principles behind our work</span>
            <h2>What we put into everything.</h2>
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
      <section className="p-section p-soft">
        <div className="p-container p-story-text">
          <div>
            <span className="p-eyebrow">Looking ahead</span>
            <h2>
              Better work.
              <br />
              Broader possibilities.
            </h2>
          </div>
          <div>
            <p>
              Our ambition is to create meaningful work across creative
              services, digital platforms, events, and learning. We believe that
              new possibilities emerge when people with different skills work
              toward a shared goal.
            </p>
            <p>
              Through Beyond by Focsera, we also explore learning experiences,
              workshops, and school partnerships that help the next generation
              engage with creativity and technology.
            </p>
            <Link to="/beyond" className="p-text-link">
              Discover Beyond <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="p-container p-bottom-cta">
        <div>
          <span className="p-eyebrow">Make your next move</span>
          <h2>
            Let's create something
            <br />
            that moves you forward.
          </h2>
        </div>
        <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-button">
          Start a conversation <ArrowUpRight size={17} />
        </a>
      </section>
    </div>
  );
}

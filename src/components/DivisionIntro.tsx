import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { serviceVisuals } from "../design/services";
export default function DivisionIntro({
  path,
  title,
  description,
  anchor,
  label = "Explore services",
}: {
  path: string;
  title: string;
  description: string;
  anchor: string;
  label?: string;
}) {
  const s = serviceVisuals.find((item) => item.path === path)!;
  return (
    <div className="p-container p-service-hero">
      <div>
        <div className="p-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {s.title}
        </div>
        <span className="p-eyebrow">{s.label}</span>
        <h1>{title}</h1>
        <p className="p-lead">{description}</p>
        <div className="p-actions">
          <a href={anchor} className="p-button">
            {label}
            <ArrowRight size={17} />
          </a>
          <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="p-text-link">
            Let's talk <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="p-mini-trust">
          <span>
            <Check size={15} /> Specialised expertise
          </span>
          <span>
            <Check size={15} /> A personal approach
          </span>
        </div>
      </div>
      <figure className="p-service-visual">
        <img src={s.image} alt={s.alt} />
        <figcaption>
          <span>{s.label}</span>
          <strong>{s.description}</strong>
        </figcaption>
      </figure>
    </div>
  );
}

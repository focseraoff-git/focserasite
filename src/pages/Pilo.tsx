import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Layers3,
  ShoppingBag,
  Boxes,
  Users,
  ClipboardList,
  Store,
  Truck,
  UtensilsCrossed,
  Stethoscope,
  Briefcase,
  Check,
  ChevronRight,
  Plus,
  LayoutDashboard,
  HelpCircle,
  QrCode,
  Dumbbell,
} from "lucide-react";
import "../design/pilo.css";

const modules = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "Sell with a clearer picture.",
    label: "POS & BILLING",
    description:
      "Connect the counter to the rest of your business. Explore billing, sales, and order workflows shaped around your day.",
    tags: ["Point of sale", "Billing", "Orders"],
  },
  {
    icon: Boxes,
    number: "02",
    title: "Know what moves. And what matters.",
    label: "INVENTORY & OPERATIONS",
    description:
      "Bring stock, purchasing, and fulfilment into one conversation, with an approach that fits how your business operates.",
    tags: ["Inventory", "Purchasing", "Fulfilment"],
  },
  {
    icon: Users,
    number: "03",
    title: "Turn customers into connections.",
    label: "CRM & RELATIONSHIPS",
    description:
      "Give enquiries, customer information, and follow-ups a shared home. Keep the next conversation in view.",
    tags: ["Customers", "Leads", "Follow-ups"],
  },
  {
    icon: ClipboardList,
    number: "04",
    title: "Give your team a shared rhythm.",
    label: "ERP & TEAM WORKFLOWS",
    description:
      "Explore connected business processes, team responsibilities, and everyday administration without losing sight of the bigger picture.",
    tags: ["Team operations", "Business processes", "Reporting"],
  },
];

const industries = [
  {
    name: "Retail",
    icon: Store,
    headline: "From the first sale to the last stock check.",
    description:
      "A connected direction for stores that need the counter, inventory, and customer experience to work together.",
    steps: [
      "Serve a customer",
      "Raise the bill",
      "Update stock",
      "See the bigger picture",
    ],
    example: "Everyday retail",
    cards: ["Sales & billing", "Stock visibility", "Customer relationships"],
  },
  {
    name: "Wholesale",
    icon: Truck,
    headline: "Bring every order into the bigger picture.",
    description:
      "Business workflows shaped around purchasing, stock movement, customer orders, and your distribution relationships.",
    steps: [
      "Receive an order",
      "Check availability",
      "Prepare fulfilment",
      "Follow up with the customer",
    ],
    example: "Wholesale operations",
    cards: [
      "Customer orders",
      "Purchasing & inventory",
      "Relationship management",
    ],
  },
  {
    name: "Restaurants",
    icon: UtensilsCrossed,
    headline: "More flow, from the table to the counter.",
    description:
      "An industry-specific approach to ordering, billing, and daily restaurant operations, connected to the wider business.",
    steps: [
      "Take an order",
      "Coordinate service",
      "Complete billing",
      "Review the day",
    ],
    example: "Restaurant operations",
    cards: ["Ordering workflows", "Billing & service", "Business overview"],
  },
  {
    name: "Clinics",
    icon: Stethoscope,
    headline: "Give the business side a little more clarity.",
    description:
      "Explore appointment, billing, and administrative workflows designed around the way a clinic operates.",
    steps: [
      "Manage an appointment",
      "Coordinate the visit",
      "Complete billing",
      "Plan the next follow-up",
    ],
    example: "Clinic administration",
    cards: ["Appointments", "Billing workflows", "Team coordination"],
  },
  {
    name: "Services",
    icon: Briefcase,
    headline: "Keep the work, the client, and the team connected.",
    description:
      "An approach for professional service businesses that brings enquiries, client relationships, projects, and billing together.",
    steps: [
      "Capture an enquiry",
      "Plan the work",
      "Coordinate your team",
      "Bill & follow up",
    ],
    example: "Professional services",
    cards: ["Client relationships", "Project workflows", "Team operations"],
  },
];

function PiloLogo() {
  return (
    <span className="pilo-brand-image">
      <img src="/images/pilo/pilo-logo-source.png" alt="Pilo by Focsera" />
    </span>
  );
}

export default function Pilo() {
  const [industryIndex, setIndustryIndex] = useState(0);
  const industry = industries[industryIndex];
  useEffect(() => {
    const previous = document.title;
    document.title = "Pilo by Focsera — Your business. All together.";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="pilo-page">
      <div className="pilo-subnav p-container">
        <Link to="/pilo" aria-label="Pilo home">
          <PiloLogo />
        </Link>
        <nav aria-label="Pilo navigation">
          <a href="#pilo-solutions">The ecosystem</a>
          <a href="#pilo-industries">For your business</a>
          <a href="#pilo-coming-soon">Coming soon</a>
          <a href="#pilo-approach">Our approach</a>
        </nav>
        <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="pilo-small-link">
          Let's talk <ArrowUpRight size={16} />
        </a>
      </div>

      <section className="pilo-hero p-container">
        <div className="pilo-hero-copy">
          <span className="pilo-eyebrow">
            <span /> MODULAR BUSINESS SOFTWARE
          </span>
          <h1>
            Your business.
            <br />
            <em>All together.</em>
          </h1>
          <p>
            One connected vision for the way you work. Pilo brings POS, CRM,
            inventory, and business operations into a modular software
            ecosystem, built around your business.
          </p>
          <div className="pilo-actions">
            <a className="pilo-button" href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">
              Find your Pilo <ArrowUpRight size={18} />
            </a>
            <a className="pilo-link" href="#pilo-solutions">
              Explore the ecosystem <ArrowRight size={17} />
            </a>
          </div>
          <div className="pilo-hero-foot">
            <Layers3 size={17} />
            <span>Start with what matters. Grow into what's next.</span>
          </div>
        </div>
        <div className="pilo-product-stage">
          <div className="pilo-stage-layer pilo-stage-layer-one" />
          <div className="pilo-stage-layer pilo-stage-layer-two" />
          <div
            className="pilo-workspace"
            aria-label="Illustrative Pilo product concept"
          >
            <aside className="pilo-demo-sidebar">
              <strong>
                pilo<span>.</span>
              </strong>
              <div className="pilo-demo-active">
                <LayoutDashboard size={17} />
              </div>
              <ShoppingBag size={17} />
              <Boxes size={17} />
              <Users size={17} />
              <ClipboardList size={17} />
              <HelpCircle size={17} />
            </aside>
            <div className="pilo-demo-main">
              <div className="pilo-demo-top">
                <span>
                  <span className="pilo-demo-dot" /> Your workspace
                </span>
                <span className="pilo-demo-avatar">P</span>
              </div>
              <div className="pilo-demo-greeting">
                <span>THE BIGGER PICTURE</span>
                <h3>
                  A good day starts
                  <br />
                  with a clear view.
                </h3>
                <span className="pilo-demo-preview">
                  Illustrative product preview
                </span>
              </div>
              <div className="pilo-demo-metrics">
                <div>
                  <ShoppingBag size={17} />
                  <span>Sales</span>
                  <strong>In view.</strong>
                </div>
                <div>
                  <Boxes size={17} />
                  <span>Inventory</span>
                  <strong>Connected.</strong>
                </div>
                <div>
                  <Users size={17} />
                  <span>Customers</span>
                  <strong>Together.</strong>
                </div>
              </div>
              <div className="pilo-demo-flow">
                <div>
                  <strong>Your everyday, connected.</strong>
                  <Layers3 size={15} />
                </div>
                {[
                  ["Customer enquiry", "CRM", "peach"],
                  ["Order & billing", "POS", "orange"],
                  ["Stock & fulfilment", "Operations", "navy"],
                ].map(([title, tag, color]) => (
                  <div className="pilo-demo-flow-row" key={title}>
                    <span className={`pilo-flow-mark ${color}`}>
                      <Check size={12} />
                    </span>
                    <span>{title}</span>
                    <small>{tag}</small>
                    <ChevronRight size={12} />
                  </div>
                ))}
              </div>
              <div className="pilo-demo-bottom">
                <span>One shared foundation.</span>
                <span>
                  Many possibilities. <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          </div>
          <div className="pilo-floating-note">
            <span>
              <Check size={16} />
            </span>
            <div>
              Made to work together.<small>Built around your business.</small>
            </div>
          </div>
        </div>
      </section>

      <div className="pilo-suite-strip">
        <div className="p-container">
          <span>A CONNECTED BUSINESS ECOSYSTEM</span>
          <strong>
            POS <Plus size={13} /> CRM <Plus size={13} /> INVENTORY{" "}
            <Plus size={13} /> ERP <Plus size={13} /> BUSINESS TOOLS
          </strong>
        </div>
      </div>

      <section
        className="pilo-section p-container pilo-launches"
        id="pilo-coming-soon"
      >
        <div className="pilo-section-heading">
          <div>
            <span className="pilo-eyebrow">NEXT FROM PILO</span>
            <h2>
              Purpose-built tools.
              <br />
              <em>New possibilities.</em>
            </h2>
          </div>
          <p>
            Two focused products for the people
            <br />
            who keep everyday businesses moving.
          </p>
        </div>
        <div className="pilo-launch-grid">
          <article className="pilo-launch-card pilo-food">
            <div className="pilo-launch-top">
              <QrCode size={36} strokeWidth={1.5} />
              <span className="pilo-coming-badge">Coming soon</span>
            </div>
            <div className="pilo-launch-art" aria-hidden="true">
              <div className="pilo-menu-preview">
                <span>YOUR TABLE. YOUR ORDER.</span>
                <strong>
                  Scan. Choose.
                  <br />
                  Enjoy.
                </strong>
                <QrCode size={70} />
                <small>Digital menu · QR ordering</small>
              </div>
              <UtensilsCrossed size={88} strokeWidth={1} />
            </div>
            <span className="pilo-eyebrow">
              FOR KITCHENS, RESTAURANTS & CAFÉS
            </span>
            <h3>QR Food Ordering</h3>
            <p>
              A simpler ordering experience for every kitchen, restaurant, café,
              and cloud kitchen. Digital menus and QR ordering, built around
              your service.
            </p>
            <div className="pilo-launch-tags">
              <span>Digital menus</span>
              <span>QR ordering</span>
              <span>Kitchen workflow</span>
            </div>
          </article>
          <article className="pilo-launch-card pilo-fit">
            <div className="pilo-launch-top">
              <Dumbbell size={36} strokeWidth={1.5} />
              <span className="pilo-coming-badge">Coming soon</span>
            </div>
            <div className="pilo-launch-art" aria-hidden="true">
              <div className="pilo-fit-preview">
                <span>TRAIN WITH A CLEARER VIEW.</span>
                <strong>
                  Every rep.
                  <br />
                  Every milestone.
                </strong>
                <div>
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <small>Clients · Training · Progress</small>
              </div>
              <Dumbbell size={88} strokeWidth={1} />
            </div>
            <span className="pilo-eyebrow">FOR GYMS & PERSONAL TRAINERS</span>
            <h3>FitLog</h3>
            <p>
              Keep your clients, training plans, and progress together. A
              dedicated workspace for gyms and trainers to support every fitness
              journey.
            </p>
            <div className="pilo-launch-tags">
              <span>Client management</span>
              <span>Training plans</span>
              <span>Progress tracking</span>
            </div>
          </article>
        </div>
      </section>

      <section className="pilo-section p-container" id="pilo-solutions">
        <div className="pilo-section-heading">
          <div>
            <span className="pilo-eyebrow">THE PILO ECOSYSTEM</span>
            <h2>
              Less scattered.
              <br />
              <em>More connected.</em>
            </h2>
          </div>
          <p>
            Your business has many moving parts.
            <br />
            Your software should help them move together.
          </p>
        </div>
        <div className="pilo-module-grid">
          {modules.map(
            ({ icon: Icon, number, title, label, description, tags }) => (
              <article className="pilo-module" key={number}>
                <div className="pilo-module-top">
                  <span>
                    <Icon size={25} strokeWidth={1.5} />
                  </span>
                  <small>{number}</small>
                </div>
                <span className="pilo-eyebrow">{label}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="pilo-module-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="pilo-industries" id="pilo-industries">
        <div className="p-container">
          <div className="pilo-section-heading">
            <div>
              <span className="pilo-eyebrow">
                ONE FOUNDATION. YOUR WAY OF WORKING.
              </span>
              <h2>
                Different businesses.
                <br />A shared possibility.
              </h2>
            </div>
            <p>
              From a neighbourhood store to a growing service team,
              <br />
              the right workflow starts with understanding your world.
            </p>
          </div>
          <div
            className="pilo-industry-tabs"
            role="tablist"
            aria-label="Business types"
          >
            {industries.map(({ name, icon: Icon }, i) => (
              <button
                key={name}
                id={`pilo-tab-${i}`}
                role="tab"
                aria-selected={industryIndex === i}
                aria-controls="pilo-industry-panel"
                tabIndex={industryIndex === i ? 0 : -1}
                onClick={() => setIndustryIndex(i)}
                onKeyDown={(event) => {
                  let next = i;
                  if (event.key === "ArrowRight")
                    next = (i + 1) % industries.length;
                  else if (event.key === "ArrowLeft")
                    next = (i + industries.length - 1) % industries.length;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = industries.length - 1;
                  else return;
                  event.preventDefault();
                  setIndustryIndex(next);
                  document.getElementById(`pilo-tab-${next}`)?.focus();
                }}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </div>
          <div
            id="pilo-industry-panel"
            role="tabpanel"
            aria-labelledby={`pilo-tab-${industryIndex}`}
            className="pilo-industry-panel"
          >
            <div>
              <span className="pilo-eyebrow">
                PILO FOR {industry.name.toUpperCase()}
              </span>
              <h3>{industry.headline}</h3>
              <p>{industry.description}</p>
              <a href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer" className="pilo-link">
                Let's discuss your workflow <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="pilo-workflow">
              <span className="pilo-eyebrow">{industry.example}</span>
              {industry.steps.map((step, i) => (
                <div key={step}>
                  <span>0{i + 1}</span>
                  <strong>{step}</strong>
                  {i < industry.steps.length - 1 ? (
                    <ChevronRight size={15} />
                  ) : (
                    <Check size={15} />
                  )}
                </div>
              ))}
              <p>
                Illustrative workflow · Explore the right scope with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="pilo-section pilo-approach p-container"
        id="pilo-approach"
      >
        <div>
          <span className="pilo-eyebrow">A BIG VISION. A PRACTICAL START.</span>
          <h2>
            Built around
            <br />
            your business.
            <br />
            <em>Not the other way round.</em>
          </h2>
          <p>
            Our direction is simple: combine useful everyday business tools with
            workflows that understand your industry. Start with the problems
            worth solving, then build a clearer path forward.
          </p>
          <a className="pilo-button" href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">
            Tell us how you work <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="pilo-principles">
          {[
            [
              "01",
              "Modular by design.",
              "Focus on the business tools and workflows that matter to your team.",
            ],
            [
              "02",
              "Connected at the core.",
              "A shared foundation for customers, products, orders, and operations.",
            ],
            [
              "03",
              "Shaped by your industry.",
              "Business software should reflect how your business actually runs.",
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
      </section>

      <section className="pilo-final">
        <div className="p-container">
          <span className="pilo-eyebrow">PILO BY FOCSERA</span>
          <h2>
            A little less complexity.
            <br />
            <em>A lot more possibility.</em>
          </h2>
          <p>
            Tell us about your business. Let's find the right starting point.
          </p>
          <a className="pilo-button" href="https://wa.me/919515802954" target="_blank" rel="noopener noreferrer">
            Start a conversation <ArrowUpRight size={18} />
          </a>
          <Link to="/" className="pilo-back">
            Explore the Focsera world <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}

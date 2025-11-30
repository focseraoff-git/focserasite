import React from "react";
import ArenaLayout from "./components/ArenaLayout";

const FAQS = [
  {q:"Is ArenaX open to non-residents?", a:"No — ArenaX is exclusive to gated-community residents."},
  {q:"Are there trophies or certificates?", a:"No — winners get redeemable prizes at the prize counter."},
  {q:"Do I need to register online?", a:"Not required. Pay per game at the stall or pre-book Game Cards."},
  {q:"Are games child-friendly?", a:"Yes — most games are safe for children and supervised by volunteers."}
];

export default function FAQ(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">FAQ</h2>
        <div style={{marginTop:12,display:"grid",gap:12}}>
          {FAQS.map((f,i) => (
            <div key={i} className="ax-card">
              <div style={{fontWeight:800,color:"var(--ax-sand)"}}>{f.q}</div>
              <div className="ax-sub" style={{marginTop:8}}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>
    </ArenaLayout>
  )
}
    
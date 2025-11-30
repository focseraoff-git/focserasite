import React from "react";
import ArenaLayout from "./components/ArenaLayout";

export default function Venue(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Venue & Access</h2>
        <p className="ax-sub">ArenaX is hosted inside the gated community for residents only. Security checks at entry points. Games are positioned across clubhouse, park and indoor rooms.</p>

        <div className="ax-card" style={{height:300,marginTop:20}}>
          Map Placeholder (upload your community map here)
        </div>
      </section>
    </ArenaLayout>
  );
}

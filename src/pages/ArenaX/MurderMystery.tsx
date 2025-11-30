import React from "react";
import ArenaLayout from "./components/ArenaLayout";

export default function MurderMystery(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Murder Mystery — Find the Killer</h2>
        <p className="ax-sub">Interactive staged crime-solving experience with clues, props, and roleplay. Supervised and safe.</p>

        <div style={{marginTop:18}} className="ax-grid cols-2">
          <div className="ax-card">
            <div className="ax-title">Overview</div>
            <p className="ax-sub" style={{marginTop:8}}>Players examine clue slips, question suspects, and solve the case within a time limit. Materials: props, clue cards, volunteers facilitating.</p>
          </div>

          <div className="ax-card">
            <div className="ax-title">Session Info</div>
            <div style={{marginTop:8,color:"var(--ax-muted)"}}>
              <div>Session length: 30–45 minutes</div>
              <div>Recommended age: 12+</div>
              <div>Entry: ₹80 per player</div>
            </div>
          </div>
        </div>
      </section>
    </ArenaLayout>
  )
}

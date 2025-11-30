import React from "react";
import ArenaLayout from "./components/ArenaLayout";

export default function Gallery(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Gallery</h2>
        <p className="ax-sub">Event posters, teasers, and prior event photos. Replace with a real gallery/carousel later.</p>

        <div className="ax-grid cols-3" style={{marginTop:12}}>
          <div className="ax-card" style={{height:180,background:"linear-gradient(180deg, var(--ax-brown), var(--ax-bg-alt))"}}>Poster / Image</div>
          <div className="ax-card" style={{height:180}}>Poster / Image</div>
          <div className="ax-card" style={{height:180}}>Poster / Image</div>
        </div>
      </section>
    </ArenaLayout>
  )
}

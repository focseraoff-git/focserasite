import React from "react";
import ArenaLayout from "./components/ArenaLayout";
import RegistrationForm from "./components/RegistrationForm";

export default function Register(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30,display:"grid",gridTemplateColumns:"1fr 400px",gap:20}}>
        <div>
          <h2 className="ax-title">Register / Book Game Cards</h2>
          <p className="ax-sub">No mandatory online registration. Use this for Game Card booking or prepaid passes.</p>

          <div className="ax-card" style={{marginTop:12}}>
            <div className="ax-title">Game Card Benefits</div>
            <ul style={{marginTop:8,color:"var(--ax-muted)"}}>
              <li>Skip long cash queues</li>
              <li>Prepay for multiple games</li>
              <li>Collect points for prizes</li>
            </ul>
          </div>
        </div>

        <div>
          <RegistrationForm />
        </div>
      </section>
    </ArenaLayout>
  )
}

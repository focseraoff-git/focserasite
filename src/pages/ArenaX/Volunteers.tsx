import React from "react";
import ArenaLayout from "./components/ArenaLayout";
import VolunteerForm from "./components/VolunteerForm";

export default function Volunteers(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Volunteer With Us</h2>
        <p className="ax-sub">We need 35–40 volunteers for game assistance, registration, first aid, and photography.</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 420px",gap:20,marginTop:18}}>
          <div>
            <div className="ax-card">
              <div className="ax-title">Volunteer Roles</div>
              <ul style={{marginTop:10,color:"var(--ax-muted)"}}>
                <li>Game Assistants</li>
                <li>Registration Desk</li>
                <li>Activity Supervisors</li>
                <li>First Aid Team</li>
                <li>Event Marshals</li>
                <li>Photography Team</li>
              </ul>
            </div>

            <div style={{marginTop:12}} className="ax-card">
              <div className="ax-title">Volunteer Guidelines</div>
              <ol style={{marginTop:8,color:"var(--ax-muted)"}}>
                <li>Attend the briefing 30 minutes before your shift.</li>
                <li>Wear volunteer ID & follow instructions.</li>
                <li>Report issues to the Event Manager immediately.</li>
              </ol>
            </div>
          </div>

          <div>
            <VolunteerForm />
          </div>
        </div>
      </section>
    </ArenaLayout>
  )
}

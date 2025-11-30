import React from "react";
import ArenaLayout from "./components/ArenaLayout";
import ScheduleList from "./components/ScheduleList";

const DAY1 = [
  {time:"6:00 PM - 6:30 PM", title:"Registration & Kickoff"},
  {time:"6:30 PM - 8:00 PM", title:"Stall Games & Kids Zone"},
  {time:"8:00 PM - 9:00 PM", title:"Murder Mystery — Session 1"}
];

const DAY2 = [
  {time:"10:00 AM - 12:00 PM", title:"Morning Sessions — Among Us, Treasure Hunt"},
  {time:"12:00 PM - 3:00 PM", title:"Cricket Matches & Stalls"},
  {time:"4:00 PM - 7:30 PM", title:"Finals — Squid Game & Escape Room"},
  {time:"7:30 PM - 9:00 PM", title:"Closing & Prize Moments"}
];

export default function Schedule(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Event Schedule</h2>
        <p className="ax-sub">ArenaX runs across both days. Drop in anytime during the hours listed.</p>

        <div style={{marginTop:16}}>
          <h3 className="ax-title">Day 1 — Evening</h3>
          <ScheduleList items={DAY1} />
        </div>

        <div style={{marginTop:24}}>
          <h3 className="ax-title">Day 2 — Full Day</h3>
          <ScheduleList items={DAY2} />
        </div>
      </section>
    </ArenaLayout>
  )
}

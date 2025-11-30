import React from "react";
import ArenaLayout from "./components/ArenaLayout";
import GameCard from "./components/GameCard";

const GAMES = [
  {title:"Gym Race", desc:"Micro fitness tasks — push-ups, squats.", price:"₹30"},
  {title:"Sack Race", desc:"Classic sack sprint.", price:"₹20"},
  {title:"Electric Wire Challenge", desc:"Steady hands game.", price:"₹40"},
  {title:"Escape Room", desc:"Timed puzzle room (indoor)", price:"₹100"},
  {title:"Treasure Hunt", desc:"Community-wide clue hunt", price:"₹50"},
  {title:"Murder Mystery", desc:"Interactive staged mystery", price:"₹80"},
];

export default function Games(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Games & Formats</h2>
        <p className="ax-sub" style={{marginTop:8}}>Choose any game at its stall and play — pay on the spot or pre-book.</p>

        <div className="ax-grid cols-3" style={{marginTop:16}}>
          {GAMES.map((g,i) => <GameCard key={i} title={g.title} desc={g.desc} price={g.price} />)}
        </div>
      </section>
    </ArenaLayout>
  )
}

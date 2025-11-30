import React from "react";
import ArenaLayout from "./components/ArenaLayout";
import PrizeCard from "./components/PrizeCard";

const PRIZES = [
  {title:"Gift Voucher — ₹200", points:"100"},
  {title:"Snack Coupon", points:"30"},
  {title:"Merchandise Coupon", points:"200"}
];

export default function PrizeRedemption(){
  return (
    <ArenaLayout>
      <section className="arena-container" style={{paddingTop:30}}>
        <h2 className="ax-title">Prize Redemption</h2>
        <p className="ax-sub">Collect your earned points and redeem exciting prizes at the Prize Counter.</p>

        <div className="ax-grid cols-3" style={{marginTop:12}}>
          {PRIZES.map((p,i) => <PrizeCard key={i} title={p.title} points={p.points} />)}
        </div>
      </section>
    </ArenaLayout>
  )
}
    
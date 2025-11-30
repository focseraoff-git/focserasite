import React from "react";

export default function RegistrationForm(){
  return (
    <form className="ax-card" style={{display:"grid",gap:10}}>
      <input placeholder="Full name" />
      <input placeholder="Block & Flat Number" />
      <input placeholder="Mobile number" />
      <input placeholder="Email (optional)" />
      <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
        <input placeholder="Select Game" />
        <input placeholder="Qty" style={{width:100}} />
      </div>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button className="ax-btn primary" type="submit">Book & Pay</button>
      </div>
    </form>
  )
}

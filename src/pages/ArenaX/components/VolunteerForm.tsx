import React from "react";

export default function VolunteerForm(){
  return (
    <form className="ax-card" style={{display:"grid",gap:10}}>
      <input placeholder="Full name" />
      <input placeholder="Email" />
      <input placeholder="Phone" />
      <select>
        <option>Role: Game assistant</option>
        <option>Role: Registration desk</option>
        <option>Role: First aid</option>
        <option>Role: Photography</option>
      </select>
      <textarea placeholder="Tell us why you want to volunteer" rows={3}></textarea>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button className="ax-btn primary" type="submit">Apply</button>
      </div>
    </form>
  )
}

import React from "react";

export default function ScheduleList({items}:{items:{time:string,title:string,desc?:string}[]}) {
  return (
    <div style={{display:"grid",gap:12}}>
      {items.map((it,idx) => (
        <div key={idx} className="ax-card" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:800,color:"var(--ax-sand)"}}>{it.title}</div>
            {it.desc && <div className="ax-sub" style={{marginTop:6}}>{it.desc}</div>}
          </div>
          <div style={{color:"var(--ax-gold)",fontWeight:800}}>{it.time}</div>
        </div>
      ))}
    </div>
  )
}

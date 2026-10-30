import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Menu,X,ArrowUpRight } from 'lucide-react';
import { BeyondLogo } from './BeyondLogo';
interface BeyondNavbarProps{onOpenPartnerModal:(program?:string)=>void;}
const navLinks=[{label:'Experiences',href:'#experiences'},{label:'Programs',href:'#programs'},{label:'For Schools',href:'#schools'},{label:'Plans',href:'#plans'},{label:'How It Works',href:'#process'},{label:'Moments',href:'#gallery'},{label:'Why Beyond',href:'#why'}];
export const BeyondNavbar:React.FC<BeyondNavbarProps>=({onOpenPartnerModal})=>{
 const [mobileMenuOpen,setMobileMenuOpen]=useState(false);
 const handleNavClick=(href:string)=>{setMobileMenuOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'});};
 useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setMobileMenuOpen(false);};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[]);
 return <header className="beyond-clean-navbar"><div className="beyond-clean-container beyond-clean-nav-row"><a href="#hero" aria-label="Beyond home" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}}><BeyondLogo variant="dark" size="sm"/></a><nav className="beyond-clean-desktop-nav" aria-label="Beyond navigation">{navLinks.map(l=><button key={l.href} onClick={()=>handleNavClick(l.href)}>{l.label}</button>)}</nav><div className="beyond-clean-nav-actions"><Link className="beyond-parent-link" to="/">Focsera Main <ArrowUpRight size={13}/></Link><button className="beyond-clean-button" onClick={()=>onOpenPartnerModal()}>Partner With Us <ArrowUpRight size={15}/></button><button className="beyond-clean-menu-toggle" aria-label={mobileMenuOpen?'Close navigation':'Open navigation'} aria-expanded={mobileMenuOpen} aria-controls="beyond-mobile-nav" onClick={()=>setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen?<X size={23}/>:<Menu size={23}/>}</button></div></div>{mobileMenuOpen&&<nav id="beyond-mobile-nav" className="beyond-clean-mobile-nav" aria-label="Beyond mobile navigation">{navLinks.map(l=><button key={l.href} onClick={()=>handleNavClick(l.href)}>{l.label}<ArrowUpRight size={15}/></button>)}<Link to="/">Focsera Main <ArrowUpRight size={15}/></Link></nav>}</header>;
};
export default BeyondNavbar;

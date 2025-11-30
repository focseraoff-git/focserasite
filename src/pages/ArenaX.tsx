"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import "./ArenaX/arenaX.css";

export default function ArenaXPage() {
  return (
    <div className="arenax-root overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6">
        
        <div className="absolute inset-0 bg-[url('/ArenaXDraft1.jpg')] bg-cover bg-center opacity-20" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1A14]/60 to-[#2D1A14]" />

        <div className="relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight"
            style={{ color: "var(--ax-cream)" }}
          >
            Arena<span style={{ color: "var(--ax-sand)" }}>X</span>
          </motion.h1>

          <p className="mt-4 text-xl max-w-2xl mx-auto italic font-serif" style={{ color: "var(--ax-cream)", opacity: 0.9 }}>
            Designed for Every Age, Loved by Every Heart
          </p>

          <motion.a
            href="#register"
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-8 px-10 py-3 rounded-xl text-lg font-semibold"
            style={{ background: "var(--ax-sand)", color: "var(--ax-bg)", boxShadow: "0 0 20px var(--ax-sand)" }}
          >
            Register Now
          </motion.a>

        </div>
      </section>

      {/* EVENT OVERVIEW */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold" style={{ color: "var(--ax-sand)" }}>Event Overview</h2>

        <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--ax-cream)", opacity: 0.9 }}>
          ArenaX is a 2-day community festival packed with treasure hunts, escape rooms,
          murder mysteries, cricket battles, carnival stalls, and more thrilling experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="p-6 rounded-2xl" style={{ background: "var(--ax-brown)", border: "1px solid rgba(232,211,184,0.2)", boxShadow: "0 0 15px var(--ax-brown)", borderColor: "var(--ax-border)" }}>
            <Calendar className="w-10 h-10" style={{ color: "var(--ax-gold)" }} />
            <h3 className="mt-3 font-bold text-xl">Event Month</h3>
            <p className="opacity-90">March (Tentative)</p>
          </div>

          <div className="p-6 rounded-2xl" style={{ background: "var(--ax-brown)", border: "1px solid rgba(232,211,184,0.2)", boxShadow: "0 0 15px var(--ax-brown)", borderColor: "var(--ax-border)" }}>
            <Clock className="w-10 h-10" style={{ color: "var(--ax-gold)" }} />
            <h3 className="mt-3 font-bold text-xl">Duration</h3>
            <p className="opacity-90">Two Days</p>
          </div>

          <div className="p-6 rounded-2xl" style={{ background: "var(--ax-brown)", border: "1px solid rgba(232,211,184,0.2)", boxShadow: "0 0 15px var(--ax-brown)", borderColor: "var(--ax-border)" }}>
            <Users className="w-10 h-10" style={{ color: "var(--ax-gold)" }} />
            <h3 className="mt-3 font-bold text-xl">Audience</h3>
            <p className="opacity-90">Kids • Teens • Adults • Seniors</p>
          </div>

        </div>
      </section>

      {/* GAMES */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-[#E8D3B8]">Games & Activities</h2>
        <p className="mt-4 opacity-90">15+ premium games, challenges & mysteries.</p>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--ax-gold)" }}>A. Outdoor & Ground Games</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-lg">
            <li>• Cricket Clash</li>
            <li>• Sack Race</li>
            <li>• Gym Race</li>
            <li>• Electric Wire Challenge</li>
            <li>• Pictionary</li>
            <li>• Debate Battles</li>
            <li>• Quiz Arena</li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--ax-gold)" }}>B. Indoor Adventure Events</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-lg">
            <li>• Treasure Quest</li>
            <li>• Escape Room</li>
            <li>• IPL Auction Room</li>
            <li>• Real-Life Among Us</li>
            <li>• Murder Mystery – Find the Killer</li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--ax-gold)" }}>C. Carnival Stalls</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-lg">
            <li>• Ring Toss</li>
            <li>• Cup Knockdown</li>
            <li>• Balloon Shooting</li>
          </ul>
        </div>

      </section>

      {/* CTA */}
      <section id="register" className="py-20 text-center">
        <h2 className="text-4xl font-bold" style={{ color: "var(--ax-sand)" }}>Ready to Enter the Arena?</h2>
        <p className="mt-2" style={{ color: "var(--ax-cream)", opacity: 0.8 }}>A weekend full of thrill, mystery & joy.</p>

        <a
          href="/register"
          className="mt-6 inline-block px-10 py-3 rounded-xl text-xl font-semibold"
          style={{ background: "var(--ax-gold)", color: "var(--ax-bg)", boxShadow: "0 0 20px var(--ax-gold)" }}
        >
          Join ArenaX
        </a>
      </section>

    </div>
  );
}

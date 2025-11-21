"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";

export default function ArenaXPage() {
  return (
    <div className="w-full bg-[#2D1A14] text-[#F2E4CE] overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6">
        
        <div className="absolute inset-0 bg-[url('/ArenaXDraft1.jpg')] bg-cover bg-center opacity-20" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1A14]/60 to-[#2D1A14]" />

        <div className="relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#F2E4CE]"
          >
            Arena<span className="text-[#E8D3B8]">X</span>
          </motion.h1>

          <p className="mt-4 text-xl max-w-2xl mx-auto text-[#F2E4CE]/90 italic font-serif">
            Designed for Every Age, Loved by Every Heart
          </p>

          <motion.a
            href="#register"
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-8 bg-[#E8D3B8] text-[#2D1A14] px-10 py-3 rounded-xl text-lg font-semibold shadow-[0_0_20px_#E8D3B8]"
          >
            Register Now
          </motion.a>

        </div>
      </section>

      {/* EVENT OVERVIEW */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#E8D3B8]">Event Overview</h2>

        <p className="mt-6 text-lg leading-relaxed text-[#F2E4CE]/90">
          ArenaX is a 2-day community festival packed with treasure hunts, escape rooms,
          murder mysteries, cricket battles, carnival stalls, and more thrilling experiences.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="p-6 rounded-2xl bg-[#5A3A2E] border border-[#E8D3B8]/20 shadow-[0_0_15px_#5A3A2E]">
            <Calendar className="w-10 h-10 text-[#FFD35A]" />
            <h3 className="mt-3 font-bold text-xl">Event Month</h3>
            <p className="opacity-90">March (Tentative)</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#5A3A2E] border border-[#E8D3B8]/20 shadow-[0_0_15px_#5A3A2E]">
            <Clock className="w-10 h-10 text-[#FFD35A]" />
            <h3 className="mt-3 font-bold text-xl">Duration</h3>
            <p className="opacity-90">Two Days</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#5A3A2E] border border-[#E8D3B8]/20 shadow-[0_0_15px_#5A3A2E]">
            <Users className="w-10 h-10 text-[#FFD35A]" />
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
          <h3 className="text-2xl font-bold mb-4 text-[#FFD35A]">A. Outdoor & Ground Games</h3>
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
          <h3 className="text-2xl font-bold mb-4 text-[#FFD35A]">B. Indoor Adventure Events</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-lg">
            <li>• Treasure Quest</li>
            <li>• Escape Room</li>
            <li>• IPL Auction Room</li>
            <li>• Real-Life Among Us</li>
            <li>• Murder Mystery – Find the Killer</li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4 text-[#FFD35A]">C. Carnival Stalls</h3>
          <ul className="grid md:grid-cols-2 gap-3 text-lg">
            <li>• Ring Toss</li>
            <li>• Cup Knockdown</li>
            <li>• Balloon Shooting</li>
          </ul>
        </div>

      </section>

      {/* CTA */}
      <section id="register" className="py-20 text-center">
        <h2 className="text-4xl font-bold text-[#E8D3B8]">Ready to Enter the Arena?</h2>
        <p className="mt-2 text-[#F2E4CE]/80">A weekend full of thrill, mystery & joy.</p>

        <a
          href="/register"
          className="mt-6 inline-block bg-[#FFD35A] text-[#2D1A14] px-10 py-3 rounded-xl text-xl font-semibold shadow-[0_0_20px_#FFD35A]"
        >
          Join ArenaX
        </a>
      </section>

    </div>
  );
}

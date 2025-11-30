// src/pages/ArenaX/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";

/** ArenaX Pages (relative imports) */
import ArenaXHome from "./index";
import Games from "./Games";
import Schedule from "./Schedule";
import Register from "./Register";
import Volunteers from "./Volunteers";
import FAQ from "./FAQ";
import Gallery from "./Gallery";
import PrizeRedemption from "./PrizeRedemption";
import MurderMystery from "./MurderMystery";
import Venue from "./Venue";


/**
 * ArenaX sub-router component — DO NOT include a BrowserRouter here.
 * This will be mounted by the top-level router at /arenax/*
 */
export default function ArenaXAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ArenaXHome />} />
      <Route path="games" element={<Games />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="register" element={<Register />} />
      <Route path="volunteers" element={<Volunteers />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="prizes" element={<PrizeRedemption />} />
      <Route path="murder-mystery" element={<MurderMystery />} />
      <Route path="venue" element={<Venue />} />

      {/* optional fallback — redirect unknown subpaths to home */}
      <Route path="*" element={<ArenaXHome />} />
    </Routes>
  );
}

// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
const Studios = React.lazy(() => import('./pages/divisions/Studios'));
const Media = React.lazy(() => import('./pages/divisions/Media'));
const Events = React.lazy(() => import('./pages/divisions/Events'));
const Web = React.lazy(() => import('./pages/divisions/Web'));
const ProductServices = React.lazy(() => import('./pages/divisions/ProductServices'));
const SkillApp = React.lazy(() => import("./pages/divisions/Skill/App"));
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ArenaXAppRoutes from './pages/ArenaX/App';
import RefundPolicyPage from './pages/Refund';
import TermsOfUsePage from './pages/TUse';
import PaymentSuccess from './pages/PaymentSuccess';

import Journey from './pages/journey';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Account from './pages/Account';
import PromptX from './pages/PromptX';
import VerifyPage from "./pages/VerifyPage";
import RefundCancellationPolicyPage from './pages/RPolicy';
import PrivacyPolicyPage from './pages/PPolicy';

function AppInner() {
  const location = useLocation();

  const hideLayoutOn = [
    "/divisions/skill",
    "/divisions/skill/",
    "/arenax",
    "/arenax/",
  ];


  const shouldHideLayout = hideLayoutOn.some((path) =>
    location.pathname.startsWith(path)
  );

  const isArenaX = location.pathname.startsWith("/arenax");

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: isArenaX ? '#1a1510' : '#ffffff',
        color: isArenaX ? '#f3f3f3' : 'inherit'
      }}
    >
      {/* Hide global navbar on ArenaX + Skill */}
      {!shouldHideLayout && <Navbar />}

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-500">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/media" element={<Media />} />
          <Route path="/events" element={<Events />} />
          <Route path="/web" element={<Web />} />
          <Route path="/product-services" element={<ProductServices />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/promptx" element={<PromptX />} />
          <Route path="/ai-workshop" element={<PromptX />} />
          <Route path="/gallery/:eventSlug" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/verify/:userId" element={<VerifyPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          {/* ArenaX nested routes */}
          <Route path="/arenax/*" element={<ArenaXAppRoutes />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* Skill App */}
          <Route path="/divisions/skill/*" element={<SkillApp />} />
        </Routes>
      </Suspense>

      {/* 🔥 FIX: Hide global footer on ArenaX + Skill */}
      {!shouldHideLayout && <Footer />}
    </div>
  );


}


export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

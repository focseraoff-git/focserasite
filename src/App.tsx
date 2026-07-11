// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
const Interiors = React.lazy(() => import('./pages/divisions/Interiors'));
const Labs = React.lazy(() => import('./pages/divisions/Labs'));
const SeoRoutes = React.lazy(() => import('./pages/seo/SeoRoutes'));


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
import PackageBooking from './pages/PackageBooking';
import BookingReview from './pages/BookingReview';

function AppInner() {
  const location = useLocation();

  const hideLayoutOn = [
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

          <Route path="/interiors" element={<Interiors />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/booking" element={<PackageBooking />} />
          <Route path="/booking/review" element={<BookingReview />} />
          <Route path="/*" element={<SeoRoutes />} />
        </Routes>
      </Suspense>

      {/* Floating WhatsApp Button */}
      {!shouldHideLayout && (
        <a
          href="https://wa.me/919515803954"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed ${location.pathname === '/' ? 'bottom-6 sm:bottom-24' : 'bottom-6'} right-6 z-[110] flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_28px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 group`}
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" />
          
          <svg
            className="w-7 h-7 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.792-4.382 9.795-9.786.002-2.599-1.01-5.042-2.85-6.885-1.841-1.843-4.29-2.858-6.885-2.86-5.404 0-9.79 4.385-9.793 9.79-.001 1.76.499 3.248 1.446 4.832L2.1 21.944l5.547-1.455zm11.09-5.413c-.273-.137-1.62-.8-1.87-.892-.25-.09-.43-.137-.61.137-.18.273-.693.892-.85 1.07-.157.18-.314.202-.586.066-.273-.137-1.15-.423-2.19-1.353-.81-.72-1.357-1.61-1.516-1.884-.159-.273-.017-.42.12-.556.123-.122.273-.32.41-.48.136-.16.18-.272.27-.455.09-.183.046-.34-.022-.48-.069-.136-.61-1.477-.837-2.022-.22-.53-.443-.458-.61-.466-.157-.008-.337-.01-.518-.01-.18 0-.472.067-.72.337-.246.27-.94.92-.94 2.24 0 1.32.96 2.59 1.09 2.77.135.18 1.89 2.887 4.58 4.05.64.277 1.14.442 1.53.566.64.204 1.23.175 1.69.107.513-.077 1.62-.662 1.85-1.3.23-.637.23-1.186.16-1.3-.07-.11-.27-.2-.54-.337z" />
          </svg>
        </a>
      )}

      {/* 🔥 FIX: Hide global footer on ArenaX + Skill */}
      {!shouldHideLayout && <Footer />}
    </div>
  );


}


export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppInner />
      </Router>
    </ThemeProvider>
  );
}

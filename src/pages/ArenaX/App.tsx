import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import React from "react";
// Admin Dashboards (Lazy Loaded)
const VolunteerDashboard = React.lazy(() => import("../../pages/admin/VolunteerDashboard"));
const OrganiserDashboard = React.lazy(() => import("../../pages/admin/OrganiserDashboard"));
import Index from "./pages/Index";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import AboutPage from "./pages/AboutPage";
import SchedulePage from "./pages/SchedulePage";
import RegisterPage from "./pages/RegisterPage";
import VolunteersPage from "./pages/VolunteersPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-brown-900 text-gray-100 relative">
        {/* Gilded shine overlay - ArenaX only */}
        <div
          className="fixed inset-0 pointer-events-none z-[9998] opacity-100"
          style={{
            background: 'radial-gradient(800px circle at 10% 20%, rgba(212, 175, 55, 0.15), transparent 8%), radial-gradient(600px circle at 80% 80%, rgba(184, 134, 11, 0.15), transparent 12%), linear-gradient(90deg, rgba(212, 175, 55, 0.09), rgba(184, 134, 11, 0.06))',
            mixBlendMode: 'screen',
            transform: 'translateZ(0)',
            animation: 'gradient-shift 10s ease-in-out infinite'
          }}
        />
        <Toaster />
        <Sonner />
        <Routes>
          <Route index element={<Index />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="games/:gameId" element={<GameDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="volunteers" element={<VolunteersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/scan" element={<VolunteerDashboard />} />
          <Route path="admin/reports" element={<OrganiserDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

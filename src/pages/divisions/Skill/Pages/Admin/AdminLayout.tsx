// @ts-nocheck
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { LayoutDashboard, PlusSquare, FolderPlus, LogOut, Menu, X } from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ✅ Verify admin role only once
  useEffect(() => {
    const role = localStorage.getItem("user_role");
    if (role !== "admin") {
      navigate("/divisions/skill/dashboard");
    } else {
      setAuthChecked(true);
    }
  }, []);

  const handleLogout = async () => {
    await lmsSupabaseClient.auth.signOut();
    localStorage.clear();
    navigate("/divisions/skill/auth");
  };

  const navItems = [
    { to: "/divisions/skill/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/divisions/skill/admin/add-challenge", icon: PlusSquare, label: "Add Challenge" },
    { to: "/divisions/skill/admin/add-program", icon: FolderPlus, label: "Add Program" },
  ];

  // ✨ Prevent flicker while verifying admin
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-gray-500">
        Checking permissions…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 bg-white border-r border-gray-200 w-64 p-6 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer select-none"
            onClick={() => navigate("/divisions/skill/admin/dashboard")}
          >
            SkillPortal Admin
          </h1>
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-gray-700 hover:text-gray-900 transition"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {location.pathname.includes("add")
                ? "Create New Entry"
                : "Admin Control Panel"}
            </h2>
          </div>
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg shadow transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        <main className="flex-1 p-6 animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

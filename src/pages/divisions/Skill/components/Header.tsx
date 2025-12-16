// @ts-nocheck
import { useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleNav = (path) => navigate(`/divisions/skill/${path}`);

  return (
    <header className="fixed w-full bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md z-50">
      {/* Left: Brand */}
      <div
        onClick={() => handleNav("dashboard")}
        className="text-2xl font-extrabold cursor-pointer tracking-tight hover:opacity-90 transition"
      >
        Focsera Skill
      </div>

      {/* Middle: Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-semibold">
        <button
          onClick={() => handleNav("dashboard")}
          className="hover:text-blue-200 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => handleNav("syllabus/30-days-of-java")}
          className="hover:text-blue-200 transition"
        >
          Courses
        </button>

        <button
          onClick={() => handleNav("certificate/30-days-of-java")}
          className="hover:text-blue-200 transition"
        >
          Certificates
        </button>

        {/* ✅ NEW EXAMS BUTTON ADDED HERE */}
        <button
          onClick={() => handleNav("exams")}
          className="hover:text-blue-200 transition"
        >
          Exams
        </button>

        {/* 🧠 Unique Compiler Button */}
        <button
          onClick={() => handleNav("online-compiler")}
          className="hover:text-blue-200 transition"
        >
          PlayGround
        </button>
      </nav>

      {/* Right: Auth Buttons */}
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-white/90 font-medium">
              {user.email}
            </span>
            <button
              onClick={onLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleNav("auth")}
            className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
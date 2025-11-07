// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, LogIn, UserPlus, Chrome } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result;
      if (mode === "login") {
        result = await lmsSupabaseClient.auth.signInWithPassword({ email, password });
      } else {
        result = await lmsSupabaseClient.auth.signUp({ email, password });
      }

      if (result.error) throw result.error;
      const userId = result.data?.user?.id || result.user?.id;

      let { data: userData } = await lmsSupabaseClient.from("users").select("*").eq("id", userId).single();

      if (!userData && mode === "signup") {
        const { data: newUser } = await lmsSupabaseClient
          .from("users")
          .insert([{ id: userId, email, full_name: fullName || email.split("@")[0], role: "user" }])
          .select()
          .single();
        userData = newUser;
      }

      const role = userData?.role || "user";
      localStorage.setItem("user_role", role);

      alert(`✅ Logged in as ${role === "admin" ? "Admin" : "User"}`);
      navigate(role === "admin" ? "/divisions/skill/admin/dashboard" : "/divisions/skill/dashboard");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const redirectUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5173/divisions/skill/auth/callback"
          : "https://focsera.in/divisions/skill/auth/callback";
      const { error } = await lmsSupabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: redirectUrl },
      });
      if (error) throw error;
    } catch (err) {
      alert("❌ Google login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          {mode === "login" ? "Welcome Back 👋" : "Create an Account"}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {mode === "login" ? "Log in to continue learning." : "Sign up to start your journey!"}
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg transition-all mb-5"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Chrome className="w-5 h-5" />}
          Continue with Google
        </button>

        <div className="relative mb-5">
          <hr className="border-gray-300" />
          <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-gray-400 text-sm">
            or
          </span>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-semibold text-white py-2.5 rounded-lg transition-all ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : mode === "login" ? <LogIn /> : <UserPlus />}
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          {mode === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            className="text-blue-600 hover:underline font-semibold"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Create one" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

// @ts-nocheck
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SkillAuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // ✅ Environment-aware URLs
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const baseUrl = isLocal
    ? "http://localhost:5173"
    : "https://www.focsera.in";

  const authUrl = `${baseUrl}/divisions/skill/auth`;
  const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;

  // 🔄 Handle Google redirect or existing session
  useEffect(() => {
  const handleAuthRedirect = async () => {
    try {
      // Check if Google returned OAuth tokens in URL
      if (window.location.hash.includes("access_token")) {
        setLoading(true);

        // ✅ Extract and store the session in Supabase
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) throw error;

        // ✅ Clean up the URL (remove the #access_token fragment)
        window.history.replaceState({}, document.title, window.location.pathname);

        // ✅ Redirect to the correct dashboard (local or prod)
        const isLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        const dashboardUrl = isLocal
          ? "http://localhost:5173/divisions/skill/dashboard"
          : "https://www.focsera.in/divisions/skill/dashboard";

        if (data?.session) {
          window.location.replace(dashboardUrl);
          return;
        }
      }

      // Already logged in → redirect
      const { data } = await lmsSupabaseClient.auth.getSession();
      if (data?.session) {
        const isLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        const dashboardUrl = isLocal
          ? "http://localhost:5173/divisions/skill/dashboard"
          : "https://www.focsera.in/divisions/skill/dashboard";

        window.location.replace(dashboardUrl);
      }
    } catch (err) {
      console.error("Auth redirect failed:", err);
    } finally {
      setLoading(false);
    }
  };

  handleAuthRedirect();
}, []);


  // 📩 Email/Password Auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await lmsSupabaseClient.auth.signUp({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("already registered")) {
            setMessageType("info");
            setError("This email is already registered. Please log in instead.");
            setTimeout(() => setMode("login"), 2500);
          } else throw error;
        } else if (data?.user) {
          await lmsSupabaseClient.from("users").insert([
            {
              id: data.user.id,
              email,
              full_name: fullName || email.split("@")[0],
              role: "user",
            },
          ]);

          setMessageType("success");
          setSuccessMessage("Account created successfully! Please log in.");
          setTimeout(() => setMode("login"), 2000);
        }
      } else {
        const { error } = await lmsSupabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        setMessageType("success");
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => window.location.replace(dashboardUrl), 1200);
      }
    } catch (err) {
      setMessageType("error");
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 Google OAuth login
  // 🔑 Google OAuth login
const handleGoogleSignIn = async () => {
  try {
    setLoading(true);

    // ✅ Always redirect back to /auth (never dashboard)
    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    const redirectTo = isLocal
      ? "http://localhost:5173/divisions/skill/auth"
      : "https://www.focsera.in/divisions/skill/auth";

    const { error } = await lmsSupabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) throw error;
  } catch (err) {
    setMessageType("error");
    setError(err.message || "Google sign-in failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center text-gray-700 space-y-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="font-semibold">Completing sign-in...</p>
          </div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side info */}
            <div className="hidden lg:block space-y-8 px-8">
              <h1 className="text-6xl font-extrabold leading-tight text-slate-800">
                Welcome to{" "}
                <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  FOCSERA Skill Portal
                </span>
              </h1>
              <p className="text-lg text-slate-600">
                Unlock creativity, attend live sessions, and grow your skills.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-white/80 rounded-2xl border hover:shadow-xl transition-all">
                  <Sparkles className="text-blue-500" size={28} />
                  <div>
                    <h3 className="font-bold text-slate-800">Creative Learning</h3>
                    <p className="text-slate-600">
                      Hands-on experience with real-world projects.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white/80 rounded-2xl border hover:shadow-xl transition-all">
                  <Shield className="text-blue-600" size={28} />
                  <div>
                    <h3 className="font-bold text-slate-800">Secure Access</h3>
                    <p className="text-slate-600">
                      Your credentials are protected with Supabase Auth.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-white/80 rounded-2xl border hover:shadow-xl transition-all">
                  <Zap className="text-blue-500" size={28} />
                  <div>
                    <h3 className="font-bold text-slate-800">Instant Login</h3>
                    <p className="text-slate-600">Sign in quickly with Google or Email.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side auth form */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border p-8">
                <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-8">
                  {mode === "login" ? "Log In" : "Sign Up"}
                </h2>

                {error && (
                  <div
                    className={`mb-6 p-4 rounded-xl text-sm flex items-start gap-3 ${
                      messageType === "error"
                        ? "bg-red-50 border border-red-200 text-red-700"
                        : "bg-blue-50 border border-blue-200 text-blue-700"
                    }`}
                  >
                    {messageType === "error" ? <AlertCircle size={20} /> : <Info size={20} />}
                    <span>{error}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-start gap-3">
                    <CheckCircle size={20} />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {mode === "signup" && (
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                          size={20}
                        />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Email</label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Password</label>
                    <div className="relative">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 outline-none"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-blue-400/40 transition-all"
                  >
                    {loading ? "Please wait..." : mode === "login" ? "Log In" : "Sign Up"}
                  </button>
                </form>

                <div className="mt-6">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-xl py-3 bg-white hover:shadow-md transition-all"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                </div>

                <p className="mt-6 text-center text-sm text-slate-600">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {mode === "login" ? "Sign Up" : "Log In"}
                  </button>
                </p>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/"
                  className="text-sm text-slate-600 hover:text-slate-800 font-medium inline-flex items-center gap-1"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

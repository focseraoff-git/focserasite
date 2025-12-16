// @ts-nocheck
import { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  UserIcon,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  User2,
} from "lucide-react";
// Make sure this path is correct for your project structure
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

let redirectInProgress = false; // prevents double redirects

export default function SkillAuthPage() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [verifying, setVerifying] = useState(false);
  const [roleStatus, setRoleStatus] = useState("");

  const baseUrl = window.location.origin;
  const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;
  const adminUrl = `${baseUrl}/divisions/skill/admin/dashboard`;
  const authRedirect = `${baseUrl}/divisions/skill/auth`;

  /* ===========================================================
   * 🔄 Redirect Based on Role (UPDATED)
   * =========================================================== */
  const redirectByRole = async (user) => {
    if (redirectInProgress || !user) return;
    redirectInProgress = true;
    setVerifying(true);

    try {
      const { data, error } = await lmsSupabaseClient
        .from("users")
        .select("role")
        .eq("id", user.id) // Query by user ID
        .maybeSingle();

      if (error) throw error;

      let userRole = data?.role || "user";

      // Auto-create record if missing (UPDATED: now includes full_name/avatar)
      if (!data) {
        await lmsSupabaseClient.from("users").insert([
          {
            id: user.id,
            email: user.email,
            full_name:
              user.user_metadata?.full_name || user.email.split("@")[0],
            avatar_url: user.user_metadata?.avatar_url || null,
            role: "user", // Default new users to "user"
          },
        ]);
        userRole = "user";
      }

      setRoleStatus(userRole);
      setTimeout(() => {
        window.location.replace(
          userRole === "admin" ? adminUrl : dashboardUrl
        );
      }, 1000);
    } catch (err) {
      console.error("Role redirect failed:", err.message);
      // Default to user dashboard on failure
      window.location.replace(dashboardUrl);
    } finally {
      // Note: setVerifying(false) is removed as the page will redirect
    }
  };

  /* ===========================================================
   * 👀 Watch Auth Session (UPDATED)
   * =========================================================== */
  useEffect(() => {
    const { data: listener } = lmsSupabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Pass the full user object
          await redirectByRole(session.user);
        }
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount

  /* ===========================================================
   * 🌐 Google Sign-in
   * =========================================================== */
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const redirectUrl =
        window.location.hostname === "localhost"
          ? "http://localhost:5173/divisions/skill/auth/callback"
          : "https://www.focsera.in/divisions/skill/auth/callback";

      const { error } = await lmsSupabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          access_type: "offline",
          prompt: "consent",
        },
      });

      if (error) throw error;
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
   * 🔐 Sign in / Sign up
   * =========================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await lmsSupabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // The onAuthStateChange listener will handle the redirect
      } else {
        const { error } = await lmsSupabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: authRedirect,
            data: { full_name: fullName }, // Pass full_name as metadata
          },
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Account created! Please verify your email before logging in.",
        });
        setMode("signin");
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
   * 🌀 Splash Loading Screen
   * =========================================================== */
  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-center transition-all">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        {roleStatus === "admin" ? (
          <>
            <Shield className="w-12 h-12 text-blue-600 mb-3 animate-bounce" />
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, Admin 👑
            </h1>
            <p className="text-slate-600 mt-2">Redirecting to dashboard...</p>
          </>
        ) : (
          <>
            <User2 className="w-12 h-12 text-blue-600 mb-3 animate-bounce" />
            <h1 className="text-2xl font-bold text-slate-800">
              Welcome back, Learner 🎓
            </h1>
            <p className="text-slate-600 mt-2">Preparing your dashboard...</p>
          </>
        )}
      </div>
    );
  }

  /* ===========================================================
   * 🎨 Auth Form UI
   * =========================================================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Floating Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Auth Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section */}
          <div className="hidden lg:block space-y-10 px-6">
            <div className="inline-block px-5 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-blue-200 shadow-lg">
              <span className="text-sm font-bold text-blue-600">
                Focsera SkillVerse
              </span>
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
              Learn, Create,{" "}
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Grow with Skill
              </span>
            </h1>

            <p className="text-lg text-slate-700 max-w-xl leading-relaxed">
              Master coding, editing, filmmaking, and AI tools with immersive,
              project-based learning.
            </p>

            <FeatureCard
              icon={<Sparkles size={22} className="text-white" />}
              title="Hands-on Learning"
              desc="Practical modules + real projects"
              colors="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<Shield size={22} className="text-white" />}
              title="Track Progress"
              desc="XP points, badges & analytics"
              colors="from-indigo-500 to-blue-600"
            />
            <FeatureCard
              icon={<Zap size={22} className="text-white" />}
              title="Lightning Fast"
              desc="Smooth, modern & responsive"
              colors="from-blue-400 to-blue-500"
            />
            <FeatureCard
              icon={<CheckCircle size={22} className="text-white" />}
              title="Career-Ready Skills"
              desc="Java, AI, Editing & beyond"
              colors="from-blue-600 to-slate-700"
            />
          </div>

          {/* Right Section - Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-slate-200">
              <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
                {mode === "signin" ? "Welcome Back" : "Create Your Account"}
              </h2>

              {message.text && (
                <div
                  className={`mb-6 p-3 rounded-lg text-sm ${
                    message.type === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <InputField
                    icon={<UserIcon className="text-gray-400" size={20} />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                )}
                <InputField
                  icon={<Mail className="text-gray-400" size={20} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  required
                />
                <InputField
                  icon={<Lock className="text-gray-400" size={20} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  required
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-500" />
                      ) : (
                        <Eye size={18} className="text-gray-500" />
                      )}
                    </button>
                  }
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : mode === "signin" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full mt-5 border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                <span className="font-medium">Continue with Google</span>
              </button>

              <p className="mt-6 text-center text-sm text-slate-600">
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() =>
                    setMode(mode === "signin" ? "signup" : "signin")
                  }
                  className="text-blue-600 font-bold hover:underline"
                >
                  {mode === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function InputField({ icon, rightIcon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        {icon}
      </span>
      {rightIcon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          {rightIcon}
        </span>
      )}
      <input
        {...props}
        className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all"
      />
    </div>
  );
}

/* Feature Card Component */
function FeatureCard({ icon, title, desc, colors }) {
  return (
    <div className="flex gap-4 p-5 bg-white/70 backdrop-blur-lg border rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div
        className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${colors} shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

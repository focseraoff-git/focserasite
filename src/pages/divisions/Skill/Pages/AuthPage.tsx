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
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SkillAuthPage() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const baseUrl = window.location.origin;
  const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;
  const authPageRedirect = `${baseUrl}/divisions/skill/auth`;

  /* ===========================================================
     SESSION WATCHER — auto redirect if logged in
  =========================================================== */
  useEffect(() => {
    const {
      data: { subscription },
    } = lmsSupabaseClient.auth.onAuthStateChange((event, session) => {
      if (session && !window.location.href.includes("/dashboard")) {
        window.location.replace(dashboardUrl);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ===========================================================
     GOOGLE LOGIN
  =========================================================== */
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

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
     SIGN IN | SIGN UP
  =========================================================== */
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

        window.location.replace(dashboardUrl);
      } else {
        const { error } = await lmsSupabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: authPageRedirect,
            data: { full_name: fullName },
          },
        });

        if (error) throw error;

        setMessage({
          type: "success",
          text: "Account created! Check your email to verify.",
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
     FINAL UI
  =========================================================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">

      {/* Animated Background Bubbles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT INFO SECTION */}
          <div className="hidden lg:block space-y-10 px-6">
            
            <div className="inline-block px-5 py-2 bg-white/70 backdrop-blur-xl rounded-full border border-blue-200 shadow-lg">
              <span className="text-sm font-bold text-blue-600">Focsera SkillVerse</span>
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
              Learn, Create,
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Grow with Skill
              </span>
            </h1>

            <p className="text-lg text-slate-700 max-w-xl leading-relaxed">
              Build coding, editing, filmmaking, and AI skills with India's fastest-growing student learning platform.
            </p>

            {/* Feature Cards */}
            <div className="space-y-6">

              <FeatureCard
                icon={<Sparkles size={22} className="text-white" />}
                title="Hands-on Learning"
                desc="Structured modules with coding + creative real-world tasks."
                colors="from-blue-500 to-blue-600"
              />

              <FeatureCard
                icon={<Shield size={22} className="text-white" />}
                title="Track Your Progress"
                desc="XP points, streaks, badges and certificate system built-in."
                colors="from-indigo-500 to-blue-600"
              />

              <FeatureCard
                icon={<Zap size={22} className="text-white" />}
                title="Fast & Modern"
                desc="Smooth UI designed for 15–25 age students & creators."
                colors="from-blue-400 to-blue-500"
              />

              <FeatureCard
                icon={<CheckCircle size={22} className="text-white" />}
                title="Career-Ready Skills"
                desc="Java, Python, Editing, AI Tools and 10+ creative programs."
                colors="from-blue-600 to-slate-700"
              />

            </div>
          </div>

          {/* RIGHT FORM SECTION */}
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

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <InputField
                    icon={<UserIcon className="text-gray-400" size={20} />}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                  />
                )}

                <InputField
                  icon={<Mail className="text-gray-400" size={20} />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                />

                <InputField
                  icon={<Lock className="text-gray-400" size={20} />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all shadow-md"
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

              {/* Google Login */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full mt-5 border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                <span className="font-medium">Continue with Google</span>
              </button>

              {/* Toggle */}
              <p className="mt-6 text-center text-sm text-slate-600">
                {mode === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() =>
                    setMode(mode === "signin" ? "signup" : "signin")
                  }
                  className="text-blue-600 font-bold"
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

/* COMPONENTS */
function InputField({ icon, rightIcon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</span>
      {rightIcon && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightIcon}
        </span>
      )}
      <input
        {...props}
        className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl 
        focus:border-blue-500 focus:bg-white outline-none transition-all"
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc, colors }) {
  return (
    <div className="flex gap-4 p-5 bg-white/70 backdrop-blur-lg border rounded-2xl 
    hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      <div className={`p-4 rounded-xl bg-gradient-to-br ${colors} shadow-lg`}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

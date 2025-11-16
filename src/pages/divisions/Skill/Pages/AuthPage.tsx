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
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

let redirectInProgress = false;

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
  const authPageRedirect = `${baseUrl}/divisions/skill/auth`;

  /* ===========================================================
     ✅ Detect Role and Redirect
  =========================================================== */
  const redirectByRole = async (userId, userEmail) => {
    if (redirectInProgress) return;
    redirectInProgress = true;
    setVerifying(true);

    try {
      // 🧠 Admin list (you can add more emails)
      const adminEmails = ["admin@focsera.in", "team@focsera.in"];

      // 1️⃣ Check local cache
      const cachedRole = localStorage.getItem("user_role");
      if (cachedRole) {
        setRoleStatus(cachedRole);
        setTimeout(
          () =>
            window.location.replace(
              cachedRole === "admin" ? adminUrl : dashboardUrl
            ),
          1200
        );
        return;
      }

      // 2️⃣ Fetch from Supabase
      const { data: existingUser, error } = await lmsSupabaseClient
        .from("users")
        .select("role, email")
        .eq("id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      let role = existingUser?.role?.toLowerCase() || "user";

      // 3️⃣ Email-based admin auto detection
      if (adminEmails.includes(userEmail)) {
        role = "admin";
        await lmsSupabaseClient
          .from("users")
          .upsert({
            id: userId,
            email: userEmail,
            role: "admin",
          });
      }

      // 4️⃣ Insert if user doesn’t exist
      if (!existingUser) {
        await lmsSupabaseClient.from("users").insert([
          {
            id: userId,
            email: userEmail,
            full_name: fullName || userEmail.split("@")[0],
            role,
          },
        ]);
      }

      // 5️⃣ Cache + redirect
      localStorage.setItem("user_role", role);
      setRoleStatus(role);
      setTimeout(
        () => window.location.replace(role === "admin" ? adminUrl : dashboardUrl),
        1200
      );
    } catch (err) {
      console.error("❌ Role detection failed:", err.message);
      window.location.replace(dashboardUrl);
    } finally {
      setVerifying(false);
    }
  };

  /* ===========================================================
     🧭 Auth Session Watcher
  =========================================================== */
  useEffect(() => {
    const { data: listener } = lmsSupabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await redirectByRole(session.user.id, session.user.email);
        }
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  /* ===========================================================
     🌐 Google Sign-in
  =========================================================== */
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
     🔐 Email + Password Login / Signup
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
          text: "Account created! Please check your email to verify.",
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
     🌀 Splash / Verifying Screen
  =========================================================== */
  if (verifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 text-center">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600 mb-3" />
        {roleStatus === "admin" ? (
          <>
            <Shield className="w-12 h-12 text-blue-600 mb-3 animate-bounce" />
            <h1 className="text-2xl font-bold text-slate-800">Access Granted 👑</h1>
            <p className="text-slate-600 mt-2">Redirecting to Admin Panel...</p>
          </>
        ) : roleStatus === "user" ? (
          <>
            <User2 className="w-12 h-12 text-blue-600 mb-3 animate-bounce" />
            <h1 className="text-2xl font-bold text-slate-800">Welcome Back 🎓</h1>
            <p className="text-slate-600 mt-2">Loading your dashboard...</p>
          </>
        ) : (
          <p className="text-gray-600">Verifying your account...</p>
        )}
      </div>
    );
  }

  /* ===========================================================
     🎨 Auth UI
  =========================================================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* floating lights */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl animate-pulse"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hidden lg:block space-y-10 px-6">
            <div className="inline-block px-5 py-2 bg-white/70 rounded-full border border-blue-200 shadow-lg">
              <span className="text-sm font-bold text-blue-600">Focsera SkillVerse</span>
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
              Learn, Create,{" "}
              <span className="block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Grow with Skill
              </span>
            </h1>

            <FeatureCard
              icon={<Sparkles size={22} className="text-white" />}
              title="Hands-on Learning"
              desc="Modules + real creative projects."
              colors="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<Shield size={22} className="text-white" />}
              title="Track Progress"
              desc="XP, badges, and performance insights."
              colors="from-indigo-500 to-blue-600"
            />
            <FeatureCard
              icon={<Zap size={22} className="text-white" />}
              title="Lightning Fast"
              desc="Optimized for speed and ease."
              colors="from-blue-400 to-blue-500"
            />
          </div>

          {/* Form */}
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

/* Components */
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
        className="w-full pl-12 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition-all"
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc, colors }) {
  return (
    <div className="flex gap-4 p-5 bg-white/70 backdrop-blur-lg border rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
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

// @ts-nocheck
import { useState } from "react";
import { Lock, Mail, UserIcon, Eye, EyeOff, Loader2 } from "lucide-react";
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
  const redirectCallback =
    window.location.hostname === "localhost"
      ? "http://localhost:5173/divisions/skill/auth/callback"
      : "https://www.focsera.in/divisions/skill/auth/callback";

  /* ===========================================================
     🔹 Google OAuth Sign In
  =========================================================== */
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const { error } = await lmsSupabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectCallback,
          access_type: "offline",
          prompt: "consent",
        },
      });

      if (error) throw error;
    } catch (err) {
      console.error("Google Sign-in Error:", err.message);
      setMessage({ type: "error", text: "Google sign-in failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     🔹 Email Sign In / Sign Up
  =========================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (mode === "signin") {
        // ✅ Sign In
        const { data, error } = await lmsSupabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // After login, redirect manually to callback to handle role
        window.location.replace(redirectCallback);
      } else {
        // ✅ Sign Up
        const { data, error } = await lmsSupabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectCallback,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;

        // ✅ Insert into 'users' table (default role = user)
        await lmsSupabaseClient.from("users").insert([
          {
            email,
            full_name: fullName,
            role: "user",
          },
        ]);

        setMessage({
          type: "success",
          text: "Account created! Please verify your email before login.",
        });
        setMode("signin");
      }
    } catch (err) {
      console.error("Auth error:", err.message);
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     🧠 Auth UI
  =========================================================== */
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 shadow-md rounded-xl w-[400px]">
        <h2 className="text-2xl font-bold text-center text-blue-700">
          {mode === "signin" ? "Sign In" : "Create Account"}
        </h2>

        {message.text && (
          <div
            className={`mt-3 p-2 rounded-md text-sm ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "signup" && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="pl-10 w-full border rounded-md py-2"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 w-full border rounded-md py-2"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 pr-10 w-full border rounded-md py-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
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

        {/* Google OAuth */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 border py-2 rounded-md hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        {/* Toggle Sign In / Sign Up */}
        <div className="text-center mt-4 text-sm">
          {mode === "signin" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-600"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-blue-600"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

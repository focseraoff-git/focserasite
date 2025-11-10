import { useState, useEffect } from "react";
import {
  Lock,
  Mail,
  UserIcon,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

type MessageType = 'success' | 'error' | 'info';
type AuthMode = 'signin' | 'signup';

export default function SkillAuthPage() {
  // State management
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageType, setMessageType] = useState<MessageType>("info");

  // Environment-aware URLs
  const baseUrl = window.location.origin;
  const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;
  const callbackUrl = `${baseUrl}/divisions/skill/auth/callback`;

  // Check for existing session on mount
  useEffect(() => {
    let mounted = true;

    const checkExistingSession = async () => {
      if (!mounted) return;
      
      try {
        setLoading(true);
        const { data: { session }, error } = await lmsSupabaseClient.auth.getSession();
        
        if (error) throw error;
        
        if (session && mounted) {
          console.log("✅ Existing session found");
          window.location.replace(dashboardUrl);
          return;
        }
      } catch (err) {
        if (mounted) {
          console.error("Error checking session:", err);
          setErrorMsg("Failed to verify existing session");
          setMessageType("error");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkExistingSession();

    return () => {
      mounted = false;
    };
  }, [dashboardUrl]);

  // Handle Google Sign In
  const handleGoogleSignIn = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");

      // Generate random state for CSRF protection
      const state = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Store state in sessionStorage
      sessionStorage.setItem('oauth_state', state);

      const { error } = await lmsSupabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            state,
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;

    } catch (err) {
      console.error("Google sign in error:", err);
      setErrorMsg("Failed to initialize Google sign in. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Email/Password Auth
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await lmsSupabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: callbackUrl,
            data: {
              full_name: fullName || email.split("@")[0],
            },
          }
        });

        if (error) {
          if (error.message.includes("already registered")) {
            setMessageType("info");
            setErrorMsg("This email is already registered. Please log in instead.");
            setTimeout(() => setMode("signin"), 2500);
          } else throw error;
        } else if (data?.user) {
          setMessageType("success");
          setSuccessMessage("Account created successfully! Please verify your email to continue.");
          setTimeout(() => setMode("signin"), 2000);
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
      setErrorMsg(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === "signin" ? "Sign in to your account" : "Create an account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === "signin" ? (
            <>
              Or{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                create a new account
              </button>
            </>
          ) : (
            <>
              Or{" "}
              <button
                onClick={() => setMode("signin")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign in to your account
              </button>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className={`rounded-md p-4 ${
                messageType === "error" ? "bg-red-50" : "bg-blue-50"
              }`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {messageType === "error" ? (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <Info className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm ${
                      messageType === "error" ? "text-red-700" : "text-blue-700"
                    }`}>
                      {errorMsg}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                }`}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : mode === "signin" ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full inline-flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';

// --- Supabase Client Setup ---
// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

// A simple check to ensure the user replaces the placeholder credentials.
if (supabaseUrl === 'YOUR_SUPABASE_URL' || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn("Supabase credentials are placeholders. Please replace them in App.jsx.");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Main App Component ---
export default function App() {
    // This state determines if we show the login page or the account page.
    const [session, setSession] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect(() => {
        // Check for an active session when the component mounts
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoadingInitial(false);
        });

        // Listen for changes in authentication state (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
            setSession(session);
        });

        // Cleanup the subscription when the component unmounts
        return () => subscription.unsubscribe();
    }, []);

    if (loadingInitial) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>
    }

    if (!session) {
        // If there's no session, show the Login/Signup page
        return <Login />;
    } else {
        // If there is a session, show the user's account page
        return <Account key={session.user.id} session={session} />;
    }
}

// --- Login/Signup Component ---
const Login = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        }
                    }
                });
                if (error) throw error;
                if (data.user) {
                    setSuccess('Account created! Please check your email for a verification link.');
                    setMode('login'); // Switch to login view after successful signup
                    setEmail('');
                    setPassword('');
                    setFullName('');
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                // The onAuthStateChanged listener in App will handle navigation
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                     <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 inline-block mb-2">
                        FOCSERA
                     </h1>
                    <p className="text-gray-600">Welcome back! Please {mode === 'login' ? 'log in' : 'sign up'} to continue</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8">
                    <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
                        {['login', 'signup'].map((m) => (
                             <button
                                key={m}
                                onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                    mode === m
                                        ? 'bg-[#0052CC] text-white shadow-md'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {m === 'login' ? 'Log In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === 'signup' && (
                            <InputField icon={User} type="text" value={fullName} onChange={setFullName} placeholder="John Doe" label="Full Name" required />
                        )}
                        <InputField icon={Mail} type="email" value={email} onChange={setEmail} placeholder="you@example.com" label="Email Address" required />
                        <PasswordField value={password} onChange={setPassword} />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_100%] text-white font-bold py-4 rounded-xl hover:bg-right transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>
                 <div className="text-center mt-6">
                     <a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                         &larr; Back to Home
                     </a>
                 </div>
            </div>
        </div>
    );
};

// --- Helper Input Field Components ---
const InputField = ({ icon: Icon, type, value, onChange, placeholder, label, required }) => (
    <div>
        <label className="text-sm font-semibold text-gray-700 block mb-2">{label}</label>
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0052CC] focus:outline-none transition-colors"
                placeholder={placeholder}
                required={required}
            />
        </div>
    </div>
);

const PasswordField = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Password</label>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#0052CC] focus:outline-none transition-colors"
                    placeholder="••••••••"
                    required
                    minLength={6}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

// --- Account Page Component ---
const Account = ({ session }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
                 <p className="text-gray-600 mb-6">You are now logged in.</p>
                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800 break-all"><strong>Email:</strong> {session.user.email}</p>
                 </div>
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

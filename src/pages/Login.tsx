import React, { useState, useEffect, FC } from 'react';
import { supabase } from './lib/supabase';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { Session } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

// --- Type Definitions ---
type Mode = 'login' | 'signup';

interface InputFieldProps {
    icon: React.ElementType;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    label: string;
    required?: boolean;
}

interface PasswordFieldProps {
    value: string;
    onChange: (value: string) => void;
}

interface AccountProps {
    session: Session;
}


// --- Main App Component ---
export default function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoadingInitial(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChanged((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loadingInitial) {
        return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
    }

    if (!session) {
        return <Login />;
    } else {
        return <Account key={session.user.id} session={session} />;
    }
}

// --- Login/Signup Component ---
const Login: FC = () => {
    const [mode, setMode] = useState<Mode>('login');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (mode === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { full_name: fullName } }
                });
                if (error) throw error;
                if (data.user) {
                    setSuccess('Account created! Please check your email for a verification link.');
                    setMode('login');
                    setEmail('');
                    setPassword('');
                    setFullName('');
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (err: any) {
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
                    <p className="text-gray-600">Welcome! Please {mode === 'login' ? 'log in' : 'sign up'} to continue</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-8">
                    <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
                        {(['login', 'signup'] as Mode[]).map((m) => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                                className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                    mode === m ? 'bg-[#0052CC] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {m === 'login' ? 'Log In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>

                    {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>}
                    {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{success}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === 'signup' && <InputField icon={User} type="text" value={fullName} onChange={setFullName} placeholder="John Doe" label="Full Name" required />}
                        <InputField icon={Mail} type="email" value={email} onChange={setEmail} placeholder="you@example.com" label="Email Address" required />
                        <PasswordField value={password} onChange={setPassword} />

                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_100%] text-white font-bold py-4 rounded-xl hover:bg-right transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>
                <div className="text-center mt-6">
                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 font-medium">&larr; Back to Home</a>
                </div>
            </div>
        </div>
    );
};

// --- Helper Input Field Components ---
const InputField: FC<InputFieldProps> = ({ icon: Icon, type, value, onChange, placeholder, label, required }) => (
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

const PasswordField: FC<PasswordFieldProps> = ({ value, onChange }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

// --- Account Page Component ---
const Account: FC<AccountProps> = ({ session }) => {
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

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff, Sparkles, Shield, Zap } from 'lucide-react';

const Login = () => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/account');
            }
        };
        checkUser();
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
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
                    alert('Account created successfully! You can now log in.');
                    setMode('login');
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;
                navigate('/account');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(100,116,139,0.08),transparent_50%)]"></div>

            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="hidden lg:block space-y-8 px-8">
                        <div className="space-y-6">
                            <div className="inline-block px-5 py-2 bg-white/80 backdrop-blur-md rounded-full border border-blue-200 shadow-lg">
                                <span className="text-sm font-bold text-blue-600">Premium Experience</span>
                            </div>
                            <h1 className="text-7xl font-extrabold leading-tight text-slate-800">
                                Welcome to
                                <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent mt-2">
                                    FOCSERA
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed">
                                Experience world-class photography, videography, and creative services tailored to perfection.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-blue-500/50 transition-shadow duration-300">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">Premium Quality</h3>
                                    <p className="text-slate-600">Industry-leading services with meticulous attention to detail</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg group-hover:shadow-slate-500/50 transition-shadow duration-300">
                                    <Shield className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">Secure & Trusted</h3>
                                    <p className="text-slate-600">Your data is protected with enterprise-grade security</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                                <div className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl shadow-lg group-hover:shadow-blue-400/50 transition-shadow duration-300">
                                    <Zap className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">Lightning Fast</h3>
                                    <p className="text-slate-600">Seamless booking experience and quick turnaround</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-md mx-auto">
                        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200 p-8 lg:p-10">
                            <div className="text-center mb-8 lg:hidden">
                                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block mb-2">
                                    FOCSERA
                                </h2>
                            </div>

                            <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
                                <button
                                    onClick={() => setMode('login')}
                                    className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                                        mode === 'login'
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                                    }`}
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => setMode('signup')}
                                    className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                                        mode === 'signup'
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'
                                    }`}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {mode === 'signup' && (
                                    <div className="group">
                                        <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="relative w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="group">
                                    <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="relative w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-bold text-slate-700 block mb-2 ml-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={20} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="relative w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 z-10 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full group overflow-hidden rounded-xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"></div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative flex items-center justify-center gap-2 py-4 font-bold text-white shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                                        {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
                                        {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                                    </div>
                                </button>
                            </form>

                            <div className="mt-8 text-center">
                                <p className="text-sm text-slate-600">
                                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                        className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                                    >
                                        {mode === 'login' ? 'Sign Up' : 'Log In'}
                                    </button>
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-6">
                            <Link to="/" className="text-sm text-slate-600 hover:text-slate-800 font-medium inline-flex items-center gap-2 group">
                                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, LogOut, Package, Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';

const Account = () => {
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const sessionRes = await supabase.auth.getSession();
            const session = sessionRes?.data?.session || null;
            if (!session) {
                navigate('/login');
                return;
            }
            setUser(session.user);
            await fetchBookings(session.user.id, 5); // default: show latest 5
        };
        getUser();
    }, [navigate]);

    const fetchBookings = async (userId: string, limit?: number) => {
        try {
            setError(null);
            let query = supabase
                .from('event_bookings')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
            if (limit && Number(limit) > 0) query = query.limit(Number(limit));

            const { data, error } = await query;

            if (error) throw error;
            setBookings(data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError((err as Error)?.message || 'Failed to load your bookings.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const getStatusBadge = (status: any) => {
        const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
        };

        // Normalize status into a safe lowercase string key
        let actualStatusKey = 'pending';
        if (status !== undefined && status !== null) {
            try {
                actualStatusKey = String(status).toLowerCase();
            } catch (e) {
                actualStatusKey = 'pending';
            }
        }

        const config = statusConfig[actualStatusKey] || statusConfig.pending;
        const Icon = config.icon;

        // Build a safe label
        const rawLabel = (typeof status === 'string' && status.length > 0) ? status : actualStatusKey;
        const label = typeof rawLabel === 'string' && rawLabel.length > 0
            ? rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1)
            : 'Pending';

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                <Icon size={14} />
                {label}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <svg className="animate-spin text-[#0052CC] mx-auto mb-4" width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="20" stroke="#E5E7EB" strokeWidth="6"/>
                        <path d="M45 25c0-11.046-8.954-20-20-20" stroke="#0052CC" strokeWidth="6" strokeLinecap="round"/>
                    </svg>
                    <p className="text-gray-600">Loading your account...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <XCircle className="mx-auto text-red-600" size={48} />
                    <h2 className="text-2xl font-bold text-gray-900 mt-4">Something went wrong</h2>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <div className="mt-6 flex justify-center gap-4">
                        <button onClick={async () => {
                            setLoading(true);
                            setError(null);
                            const { data: { session } } = await supabase.auth.getSession();
                            if (!session) {
                                navigate('/login');
                                return;
                            }
                            setUser(session.user);
                            await fetchBookings(session.user.id);
                        }} className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold">Retry</button>
                        <button onClick={async () => { await supabase.auth.signOut(); navigate('/'); }} className="px-6 py-3 border rounded-xl font-semibold">Sign out</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 pb-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 p-8 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">{user?.user_metadata?.full_name || 'User'}</h1>
                                    <p className="text-white/80">{user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all duration-300"
                            >
                                <LogOut size={20} />
                                Log Out
                            </button>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Bookings</h2>
                            <p className="text-gray-600">Manage and track all your service bookings</p>
                            <div className="mt-4">
                                <button onClick={async () => {
                                    const newShowAll = !showAll;
                                    setShowAll(newShowAll);
                                    setLoading(true);
                                    const { data: { session } } = await supabase.auth.getSession();
                                    if (!session) { navigate('/login'); return; }
                                    setUser(session.user);
                                    await fetchBookings(session.user.id, newShowAll ? undefined : 5);
                                    setLoading(false);
                                }} className="px-4 py-2 bg-white border rounded-lg shadow-sm text-sm">
                                    {showAll ? 'Show recent' : 'View all bookings'}
                                </button>
                            </div>
                        </div>

                        {bookings.length === 0 ? (
                            <div className="text-center py-16">
                                <Package className="text-gray-300 mx-auto mb-4" size={64} />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
                                <p className="text-gray-600 mb-6">Start exploring our services and make your first booking!</p>
                                <button
                                    onClick={() => navigate('/studios')}
                                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 bg-[length:200%_100%] text-white font-bold rounded-xl hover:bg-right transition-all duration-500"
                                >
                                    Browse Services
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {bookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="border-2 border-gray-200 rounded-2xl p-6 hover:border-[#0052CC] hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                            {booking.package_details?.service?.name || booking.package_details?.serviceName || 'Service Booking'}
                                                        </h3>
                                                        {getStatusBadge(booking.status)}
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Booking ID: {booking?.id ? String(booking.id).slice(0, 8).toUpperCase() : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-2xl font-bold text-[#0052CC]">
                                                    <DollarSign size={20} />
                                                    ₹{Number(booking.total_price || booking.total_price === 0 ? booking.total_price : booking?.package_details?.total_price || booking?.price || 0).toLocaleString('en-IN')}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Event Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {booking?.event_date ? (() => {
                                                            const d = new Date(booking.event_date);
                                                            return isNaN(d.getTime()) ? 'TBD' : d.toLocaleDateString('en-IN', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            });
                                                        })() : 'TBD'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <MapPin className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Venue</p>
                                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                                        {booking.event_venue || 'Not specified'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {(() => {
                                            const addOnsField = booking.package_details?.add_ons || booking.package_details?.addOns || booking.package_details?.addOnsList;
                                            let addonsArray: string[] = [];
                                            if (Array.isArray(addOnsField)) addonsArray = addOnsField;
                                            else if (addOnsField && typeof addOnsField === 'object') {
                                                // object with keys mapping to true/false
                                                addonsArray = Object.keys(addOnsField).filter(k => addOnsField[k]);
                                            }

                                            if (addonsArray.length === 0) return null;

                                            return (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    <p className="text-xs text-gray-500 font-medium mb-2">Add-ons:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {addonsArray.map((addon: string, idx: number) => (
                                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{addon}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })()}

                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-xs text-gray-500">
                                                Booked on {booking?.created_at ? new Date(booking.created_at).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) : 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;

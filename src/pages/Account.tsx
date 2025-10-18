import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { User, LogOut, Package, Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';

const Account = () => {
    const [user, setUser] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login');
                return;
            }
            setUser(session.user);
            await fetchBookings(session.user.id);
        };
        getUser();
    }, [navigate]);

    const fetchBookings = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            confirmed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                <Icon size={14} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin text-[#0052CC] mx-auto mb-4" size={48} />
                    <p className="text-gray-600">Loading your account...</p>
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
                                                        {booking.package_details?.serviceName || 'Service Booking'}
                                                    </h3>
                                                    {getStatusBadge(booking.status)}
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Booking ID: {booking.id.slice(0, 8).toUpperCase()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-2xl font-bold text-[#0052CC]">
                                                    <DollarSign size={20} />
                                                    ₹{booking.total_price?.toLocaleString('en-IN')}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="text-gray-400" size={20} />
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Event Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {new Date(booking.event_date).toLocaleDateString('en-IN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
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

                                        {booking.package_details?.addOns && booking.package_details.addOns.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-500 font-medium mb-2">Add-ons:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {booking.package_details.addOns.map((addon: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                                                        >
                                                            {addon}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-xs text-gray-500">
                                                Booked on {new Date(booking.created_at).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
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

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PlayerReport {
    id: string;
    full_name: string;
    card_code: string;
    email: string;
    balance: number;
    status: string;
    total_games_played: number;
    total_loaded: number;
    total_spent: number;
    last_activity: string | null;
    history: {
        id: string;
        transaction_type: string;
        amount: number;
        notes: string;
        created_at: string;
    }[];
}

interface GameRegistration {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    flat_number: string;
    age: number;
    game_type: string;
    preferred_day: string;
    preferred_time_slot: string;
    registration_code: string;
    created_at: string;
}

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-gold/30 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative animate-in fade-in zoom-in duration-200">
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">✕</button>
                <h2 className="text-xl font-bold text-gold mb-4">{title}</h2>
                {children}
            </div>
        </div>
    );
};

const OrganiserDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'cards' | 'registrations'>('cards');

    // Game Cards State
    const [cardReports, setCardReports] = useState<PlayerReport[]>([]);
    const [selectedCard, setSelectedCard] = useState<PlayerReport | null>(null);
    const [isCardEditOpen, setIsCardEditOpen] = useState(false);
    const [cardFormData, setCardFormData] = useState({
        full_name: '',
        email: '',
        card_code: '',
        status: 'active',
        balance: 0
    });

    // Game Registrations State
    const [registrationReports, setRegistrationReports] = useState<GameRegistration[]>([]);
    const [selectedRegistration, setSelectedRegistration] = useState<GameRegistration | null>(null);
    const [isRegEditOpen, setIsRegEditOpen] = useState(false);
    const [regFormData, setRegFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        game_type: '',
        preferred_day: '',
        preferred_time_slot: ''
    });

    const [loading, setLoading] = useState(false);
    const [newTx, setNewTx] = useState({ type: 'refill', amount: '', notes: '' });

    // AUTH
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Login with username/password
            const { data, error } = await (supabase as any).rpc('admin_login', {
                p_username: username,
                p_password: password
            });

            if (error) throw error;
            if (!data.success) throw new Error(data.error);
            if (data.user.role !== 'organiser') throw new Error('Unauthorized: Organiser access only');

            setCurrentUser(data.user);
            setIsAuthenticated(true);
            fetchCardReports();
            fetchRegistrationReports();
            toast.success(`Welcome, ${data.user.full_name}!`);
        } catch (err: any) {
            toast.error(err.message || 'Invalid credentials');
        }
    };

    // FETCH GAME CARDS
    const fetchCardReports = async () => {
        setLoading(true);
        try {
            const { data, error } = await (supabase as any).rpc('get_admin_reports');
            if (error) throw error;
            if (!data.success) throw new Error("Failed to load data");
            setCardReports(data.data || []);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // FETCH GAME REGISTRATIONS
    const fetchRegistrationReports = async () => {
        setLoading(true);
        try {
            const { data, error } = await (supabase as any).rpc('get_game_registration_reports');
            if (error) throw error;
            if (!data.success) throw new Error("Failed to load registrations");
            setRegistrationReports(data.data || []);
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // CARD CRUD
    const openCardEdit = (player: PlayerReport) => {
        setSelectedCard(player);
        setCardFormData({
            full_name: player.full_name,
            email: player.email,
            card_code: player.card_code,
            status: player.status,
            balance: player.balance
        });
        setIsCardEditOpen(true);
    };

    const saveCardEdit = async () => {
        if (!selectedCard) return;
        try {
            const { data, error } = await (supabase as any).rpc('admin_update_player', {
                p_id: selectedCard.id,
                p_full_name: cardFormData.full_name,
                p_email: cardFormData.email,
                p_status: cardFormData.status,
                p_balance: cardFormData.balance
            });
            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            toast.success("Player Updated");
            setIsCardEditOpen(false);
            fetchCardReports();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const deleteCard = async () => {
        if (!selectedCard || !confirm("Delete this player and all transaction history?")) return;
        try {
            const { data, error } = await (supabase as any).rpc('admin_delete_player', { p_id: selectedCard.id });
            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            toast.success("Player Deleted");
            setIsCardEditOpen(false);
            fetchCardReports();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const deleteTransaction = async (txId: string) => {
        if (!confirm("Remove this activity log?")) return;
        try {
            const { data, error } = await (supabase as any).rpc('admin_delete_transaction', { p_id: txId });
            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            toast.success("Activity Removed");
            fetchCardReports();
            setIsCardEditOpen(false);
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const addTransaction = async () => {
        if (!selectedCard || !newTx.amount) return;
        try {
            const { data, error } = await (supabase as any).rpc('process_card_transaction', {
                p_card_code: selectedCard.card_code,
                p_amount: parseInt(newTx.amount),
                p_type: newTx.type,
                p_notes: newTx.notes || 'Manual Adjustment'
            });

            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            toast.success("Activity Added");
            setIsCardEditOpen(false);
            fetchCardReports();
            setNewTx({ type: 'refill', amount: '', notes: '' });
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    // REGISTRATION CRUD
    const openRegEdit = (reg: GameRegistration) => {
        setSelectedRegistration(reg);
        setRegFormData({
            full_name: reg.full_name,
            email: reg.email,
            phone: reg.phone,
            game_type: reg.game_type,
            preferred_day: reg.preferred_day,
            preferred_time_slot: reg.preferred_time_slot
        });
        setIsRegEditOpen(true);
    };

    const saveRegEdit = async () => {
        if (!selectedRegistration) return;
        try {
            const { data, error } = await (supabase as any).rpc('admin_update_game_registration', {
                p_id: selectedRegistration.id,
                p_full_name: regFormData.full_name,
                p_email: regFormData.email,
                p_phone: regFormData.phone,
                p_game_type: regFormData.game_type,
                p_preferred_day: regFormData.preferred_day,
                p_preferred_time_slot: regFormData.preferred_time_slot
            });
            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            toast.success("Registration Updated");
            setIsRegEditOpen(false);
            fetchRegistrationReports();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const deleteRegistration = async () => {
        if (!selectedRegistration || !confirm("Delete this registration?")) return;
        try {
            const { data, error } = await (supabase as any).rpc('admin_delete_game_registration', { p_id: selectedRegistration.id });
            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            toast.success("Registration Deleted");
            setIsRegEditOpen(false);
            fetchRegistrationReports();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    // CSV EXPORT (Game Cards)
    const handleCardExport = () => {
        const csvData = [
            ['Name', 'Email', 'Card Code', 'Balance', 'Status', 'Games Played', 'Total Loaded', 'Total Spent'],
            ...cardReports.map(p => [p.full_name, p.email, p.card_code, p.balance, p.status, p.total_games_played, p.total_loaded, p.total_spent])
        ];
        const csv = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `game_cards_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    // CSV EXPORT (Registrations)
    const handleRegExport = () => {
        const csvData = [
            ['Name', 'Email', 'Phone', 'Game', 'Day', 'Time Slot', 'Code', 'Registered'],
            ...registrationReports.map(r => [r.full_name, r.email, r.phone, r.game_type, r.preferred_day, r.preferred_time_slot, r.registration_code, new Date(r.created_at).toLocaleDateString()])
        ];
        const csv = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `game_registrations_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-gold flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-gold/20">
                    <h1 className="text-2xl font-bold text-gold mb-6 text-center">Organiser Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-gold outline-none"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full bg-black border border-zinc-700 text-white p-3 rounded-lg focus:border-gold outline-none"
                        />
                        <button type="submit" className="w-full bg-gold text-black font-bold p-3 rounded-lg hover:bg-yellow-500 transition">
                            LOGIN
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-4 pb-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gold">Organiser Dashboard</h1>
                        <p className="text-xs text-zinc-500">Logged in as: {currentUser?.full_name || 'Admin'}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('cards')}
                        className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'cards' ? 'bg-gold text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
                    >
                        Game Cards ({cardReports.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('registrations')}
                        className={`px-6 py-3 rounded-lg font-bold transition ${activeTab === 'registrations' ? 'bg-gold text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
                    >
                        Game Registrations ({registrationReports.length})
                    </button>
                </div>

                {/* Game Cards Tab */}
                {activeTab === 'cards' && (
                    <div>
                        <div className="flex justify-end mb-4">
                            <button onClick={handleCardExport} className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-500">
                                Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto bg-zinc-900 rounded-xl border border-zinc-800">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Card Code</th>
                                        <th className="p-3">Balance</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Games</th>
                                        <th className="p-3">Loaded</th>
                                        <th className="p-3">Spent</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {cardReports.map((player) => (
                                        <tr
                                            key={player.id}
                                            onClick={() => openCardEdit(player)}
                                            className="hover:bg-zinc-800/50 cursor-pointer transition"
                                        >
                                            <td className="p-3 text-white">{player.full_name}</td>
                                            <td className="p-3 font-mono text-gold">{player.card_code}</td>
                                            <td className="p-3 text-green-400 font-bold">₹{player.balance}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded text-xs ${player.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
                                                    {player.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-zinc-400">{player.total_games_played}</td>
                                            <td className="p-3 text-zinc-400">₹{player.total_loaded}</td>
                                            <td className="p-3 text-zinc-400">₹{player.total_spent}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Game Registrations Tab */}
                {activeTab === 'registrations' && (
                    <div>
                        <div className="flex justify-end mb-4">
                            <button onClick={handleRegExport} className="bg-green-600 text-white px-4 py-2 rounded font-bold hover:bg-green-500">
                                Export CSV
                            </button>
                        </div>
                        <div className="overflow-x-auto bg-zinc-900 rounded-xl border border-zinc-800">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Code</th>
                                        <th className="p-3">Game</th>
                                        <th className="p-3">Day</th>
                                        <th className="p-3">Time Slot</th>
                                        <th className="p-3">Registered</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {registrationReports.map((reg) => (
                                        <tr
                                            key={reg.id}
                                            onClick={() => openRegEdit(reg)}
                                            className="hover:bg-zinc-800/50 cursor-pointer transition"
                                        >
                                            <td className="p-3 text-white">{reg.full_name}</td>
                                            <td className="p-3 font-mono text-gold">{reg.registration_code}</td>
                                            <td className="p-3 text-zinc-300">{reg.game_type}</td>
                                            <td className="p-3 text-zinc-400">{reg.preferred_day}</td>
                                            <td className="p-3 text-zinc-400">{reg.preferred_time_slot || 'Any'}</td>
                                            <td className="p-3 text-zinc-500 text-xs">{new Date(reg.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* EDIT CARD MODAL */}
                <Modal isOpen={isCardEditOpen} onClose={() => setIsCardEditOpen(false)} title="Edit Player">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Card Code</label>
                            <div className="text-gold font-mono font-bold">{cardFormData.card_code}</div>
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Full Name</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={cardFormData.full_name}
                                onChange={e => setCardFormData({ ...cardFormData, full_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Email</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={cardFormData.email}
                                onChange={e => setCardFormData({ ...cardFormData, email: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-zinc-500 uppercase">Balance (₹)</label>
                                <input
                                    type="number"
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-green-400 font-bold"
                                    value={cardFormData.balance}
                                    onChange={e => setCardFormData({ ...cardFormData, balance: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-zinc-500 uppercase">Status</label>
                                <select
                                    className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                    value={cardFormData.status}
                                    onChange={e => setCardFormData({ ...cardFormData, status: e.target.value })}
                                >
                                    <option value="active">Active</option>
                                    <option value="blocked">Blocked</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={saveCardEdit} className="w-full bg-white text-black font-bold p-3 rounded mt-4">
                            SAVE CHANGES
                        </button>

                        <div className="border-t border-zinc-800 pt-4 mt-4">
                            <h3 className="text-xs text-zinc-500 uppercase mb-3">Recent Activity</h3>

                            <div className="mb-4 bg-zinc-950 p-3 rounded border border-zinc-800">
                                <div className="text-xs font-bold text-zinc-400 mb-2 uppercase">+ Add Activity</div>
                                <div className="flex gap-2 mb-2">
                                    <select
                                        className="bg-zinc-900 border border-zinc-700 rounded text-xs text-white p-1"
                                        value={newTx.type}
                                        onChange={e => setNewTx({ ...newTx, type: e.target.value })}
                                    >
                                        <option value="refill">Refill (+)</option>
                                        <option value="spend">Spend (-)</option>
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Amt"
                                        className="bg-zinc-900 border border-zinc-700 rounded text-xs text-white p-1 w-20"
                                        value={newTx.amount}
                                        onChange={e => setNewTx({ ...newTx, amount: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Notes (e.g. Refund)"
                                        className="bg-zinc-900 border border-zinc-700 rounded text-xs text-white p-1 w-full"
                                        value={newTx.notes}
                                        onChange={e => setNewTx({ ...newTx, notes: e.target.value })}
                                    />
                                    <button onClick={addTransaction} className="bg-gold text-black text-xs font-bold px-3 rounded hover:bg-yellow-500">ADD</button>
                                </div>
                            </div>

                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                {selectedCard?.history && selectedCard.history.length > 0 ? (
                                    selectedCard.history.map((tx, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-black p-2 rounded border border-zinc-800 text-sm group">
                                            <div>
                                                <div className="text-white">{tx.notes || 'Transaction'}</div>
                                                <div className="text-xs text-zinc-600">
                                                    {new Date(tx.created_at).toLocaleString()}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={`font-mono font-bold ${tx.transaction_type === 'refill' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {tx.transaction_type === 'refill' ? '+' : '-'}₹{tx.amount}
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteTransaction(tx.id); }}
                                                    className="text-zinc-700 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                                                    title="Delete Log"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-zinc-600 text-xs py-2">No recent activity</div>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-zinc-800 pt-4 mt-4">
                            <button onClick={deleteCard} className="w-full text-red-500 text-sm hover:underline">
                                Delete Player (Permanent)
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* EDIT REGISTRATION MODAL */}
                <Modal isOpen={isRegEditOpen} onClose={() => setIsRegEditOpen(false)} title="Edit Registration">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Registration Code</label>
                            <div className="text-gold font-mono font-bold">{selectedRegistration?.registration_code}</div>
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Full Name</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={regFormData.full_name}
                                onChange={e => setRegFormData({ ...regFormData, full_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Email</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={regFormData.email}
                                onChange={e => setRegFormData({ ...regFormData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Phone</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={regFormData.phone}
                                onChange={e => setRegFormData({ ...regFormData, phone: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Game Type</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={regFormData.game_type}
                                onChange={e => setRegFormData({ ...regFormData, game_type: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Preferred Day</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={regFormData.preferred_day}
                                onChange={e => setRegFormData({ ...regFormData, preferred_day: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-zinc-500 uppercase">Time Slot</label>
                            <input
                                className="w-full bg-black border border-zinc-700 rounded p-2 text-white"
                                value={regFormData.preferred_time_slot}
                                onChange={e => setRegFormData({ ...regFormData, preferred_time_slot: e.target.value })}
                            />
                        </div>

                        <button onClick={saveRegEdit} className="w-full bg-white text-black font-bold p-3 rounded mt-4">
                            SAVE CHANGES
                        </button>

                        <div className="border-t border-zinc-800 pt-4 mt-4">
                            <button onClick={deleteRegistration} className="w-full text-red-500 text-sm hover:underline">
                                Delete Registration (Permanent)
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default OrganiserDashboard;

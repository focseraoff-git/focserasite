import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner'; // We will ask user to install this
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types
type TransactionType = 'refill' | 'spend';

interface CardData {
    id: string;
    full_name: string;
    card_code: string;
    balance: number;
    status: string;
    last_transactions: any[];
}

const VolunteerDashboard = () => {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState<any>(null);

    // App State
    const [mode, setMode] = useState<'scan' | 'action'>('scan');
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const [cardData, setCardData] = useState<CardData | null>(null);
    const [loading, setLoading] = useState(false);
    const [manualCode, setManualCode] = useState(''); // Added for manual entry input

    // Transaction State
    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');

    // Debug State
    const [debugLog, setDebugLog] = useState<string[]>([]);
    const addLog = (msg: string) => setDebugLog(prev => [msg, ...prev].slice(0, 5));

    // CONSTANTS
    const GAMES_MENU = [
        { name: "Gym Race", price: 50, icon: "Dumbbell" },
        { name: "Sack Race", price: 50, icon: "ShoppingBag" },
        { name: "Electric Wire", price: 50, icon: "Zap" },
        { name: "Squid Game", price: 100, icon: "Triangle" },
        { name: "Escape Room", price: 150, icon: "Key" },
        { name: "Treasure Hunt", price: 100, icon: "Map" },
        { name: "Ring Toss", price: 50, icon: "Circle" },
        { name: "Cup Throw", price: 50, icon: "Coffee" },
        { name: "Balloon Shoot", price: 50, icon: "Target" },
        { name: "Ghost Story", price: 50, icon: "Ghost" },
        { name: "Murder Mystery", price: 150, icon: "Search" },
        { name: "Among Us", price: 100, icon: "Users" },
        { name: "IPL Auction", price: 200, icon: "Gavel" },
    ];

    const REWARDS_MENU = [
        { name: "Participation", amount: 50, color: "text-blue-400 border-blue-900 bg-blue-900/20" },
        { name: "3rd Place", amount: 100, color: "text-amber-700 border-amber-900 bg-amber-900/20" },
        { name: "2nd Place", amount: 200, color: "text-zinc-400 border-zinc-700 bg-zinc-700/20" },
        { name: "1st Place", amount: 500, color: "text-yellow-400 border-yellow-900 bg-yellow-900/20" },
    ];

    // 1. AUTH HANDLER
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
            if (data.user.role !== 'volunteer') throw new Error('Unauthorized: Volunteer access only');

            setCurrentUser(data.user);
            setIsAuthenticated(true);
            toast.success(`Welcome, ${data.user.full_name}!`);
        } catch (err: any) {
            toast.error(err.message || 'Invalid credentials');
        }
    };

    // 2. FETCH CARD DETAILS
    const fetchCardDetails = async (code: string) => {
        setLoading(true);
        addLog(`Fetching card: ${code}`);
        try {
            const { data, error } = await (supabase as any).rpc('get_card_details', { p_card_code: code });

            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            setCardData(data.card);
            setScannedCode(code);
            setMode('action');
            toast.success("Card Found!");
            addLog(`Card found: ${data.card.full_name}`);
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch card");
            addLog(`Fetch error: ${err.message || err}`);
            setMode('scan');
        } finally {
            setLoading(false);
        }
    };

    // 3. QR SCAN HANDLER
    const handleScan = (data: any) => {
        if (!data) return;

        // Handle different library return types (string or object)
        const rawText = data?.text || data;

        if (rawText && !loading && mode === 'scan') {
            console.log("Scanned Data:", rawText);
            addLog(`Scanned: ${JSON.stringify(rawText)}`);

            // Simple extraction logic
            let codeToFetch = rawText;
            // Check if it's our format "Champion: ..., AccessID: ..."
            if (typeof rawText === 'string' && rawText.includes("AccessID:")) {
                const parts = rawText.split("AccessID:");
                if (parts.length > 1) {
                    codeToFetch = parts[1].trim();
                }
            }

            fetchCardDetails(codeToFetch);
        }
    };

    const handleError = (err: any) => {
        console.error(err);
        addLog(`Scanner Error: ${err.message || err}`);
        toast.error("Scanner Error: " + err.message);
    };

    // 4. PROCESS TRANSACTION
    const handleTransaction = async (type: TransactionType, quickAmount?: number, quickNotes?: string) => {
        if (!cardData) return;

        const txAmount = quickAmount || parseInt(amount);
        const txNotes = quickNotes || notes;

        if (!txAmount || txAmount <= 0) {
            toast.error("Invalid amount");
            return;
        }

        setLoading(true);
        addLog(`Processing ${type} for ${txAmount} with notes: ${txNotes}`);
        try {
            const { data, error } = await (supabase as any).rpc('process_card_transaction', {
                p_card_code: cardData.card_code,
                p_amount: txAmount,
                p_type: type,
                p_notes: txNotes
            });

            if (error) throw error;
            if (!data.success) throw new Error(data.error);

            // Update Local State
            setCardData({ ...cardData, balance: data.new_balance });
            toast.success(`Transaction Successful: ${type.toUpperCase()}`);
            addLog(`Transaction success: ${type} ${txAmount}`);

            // Reset Form
            setAmount('');
            setNotes('');

        } catch (err: any) {
            toast.error(err.message);
            addLog(`Transaction error: ${err.message || err}`);
        } finally {
            setLoading(false);
        }
    };

    // RENDER: LOGIN
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-gold flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-gold/20">
                    <h1 className="text-2xl font-bold text-gold mb-6 text-center">Volunteer Login</h1>
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

    // RENDER: DASHBOARD
    return (
        <div className="min-h-screen bg-black text-white p-4 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                <div>
                    <h1 className="text-xl font-bold text-gold">ArenaX Ops</h1>
                    <p className="text-xs text-zinc-500">Logged in as: {currentUser?.full_name || 'Volunteer'}</p>
                </div>
                <button
                    onClick={() => { setMode('scan'); setCardData(null); setScannedCode(null); setManualCode(''); }}
                    className="text-xs bg-zinc-800 px-3 py-1 rounded border border-zinc-700"
                >
                    New Scan
                </button>
            </div>

            {mode === 'scan' ? (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <div className="w-full max-w-sm aspect-square bg-zinc-900 rounded-2xl overflow-hidden border-2 border-gold relative">
                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 border-2 border-gold/50 z-10 m-8 rounded-xl animate-pulse"></div>

                        {/* SCANNER COMPONENT */}
                        <QrReader
                            key="qr-reader"
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '100%', height: '100%' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-0 text-gray-500">
                            Camera Loading...
                        </div>
                    </div>
                    <p className="mt-6 text-zinc-400 text-sm">Point camera at Game Card QR</p>

                    {/* DEBUG LOG SECTION */}
                    <div className="mt-4 p-2 bg-zinc-900 rounded border border-zinc-800 text-xs text-zinc-500 font-mono w-full max-w-sm">
                        <div className="uppercase font-bold text-zinc-400 mb-1">Scanner Debug Log</div>
                        {debugLog.length === 0 ? <div>Waiting for camera events...</div> : debugLog.map((l, i) => <div key={i}>{l}</div>)}
                    </div>

                    {/* Manual Entry Fallback */}
                    <div className="mt-6 w-full max-w-sm flex gap-2">
                        <input
                            type="text"
                            placeholder="Or enter Code manually..."
                            className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-lg text-white"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    fetchCardDetails(e.currentTarget.value);
                                }
                            }}
                        />
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto space-y-6">
                    {/* CARD INFO */}
                    {cardData && (
                        <div className="bg-zinc-900 border border-gold rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white uppercase">{cardData.full_name}</h2>
                                    <p className="text-xs text-zinc-500 tracking-widest">{cardData.card_code}</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold ${cardData.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-500'
                                    }`}>
                                    {cardData.status.toUpperCase()}
                                </div>
                            </div>

                            <div className="text-center py-4 bg-black rounded-xl border border-zinc-800">
                                <p className="text-zinc-500 text-xs uppercase mb-1">Current Balance</p>
                                <div className="text-4xl font-mono font-bold text-gold">
                                    ₹{cardData.balance}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ACTIONS TABS */}
                    <div className="space-y-8">

                        {/* 1. GAME ZONE */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest">Game Zone</h3>
                                <div className="h-[1px] bg-red-900/50 flex-1"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {GAMES_MENU.map((game, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleTransaction('spend', game.price, `${game.name} Entry`)}
                                        className="p-3 bg-zinc-900 border border-zinc-800 hover:border-red-500 hover:bg-red-900/10 rounded-xl transition group text-left relative overflow-hidden"
                                    >
                                        <div className="text-zinc-400 text-xs uppercase mb-1">{game.name}</div>
                                        <div className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">₹{game.price}</div>
                                        <div className="absolute right-0 bottom-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                                            {/* We can use icons here if we import them, for now text or generic shape */}
                                            <div className="w-8 h-8 rounded-full bg-white"></div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. FOCSERA CURRENCY (REWARDS) */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-sm font-bold text-gold uppercase tracking-widest">Focsera Rewards</h3>
                                <div className="h-[1px] bg-gold/30 flex-1"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {REWARDS_MENU.map((reward, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleTransaction('refill', reward.amount, `Reward: ${reward.name}`)}
                                        className={`p-4 rounded-xl border flex flex-col items-center justify-center transition hover:scale-105 ${reward.color}`}
                                    >
                                        <div className="text-xs uppercase font-bold mb-1 opacity-80">{reward.name}</div>
                                        <div className="text-2xl font-black">+ {reward.amount}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 3. CASH REFILL */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <h3 className="text-sm font-bold text-green-400 uppercase tracking-widest">Cash Refill</h3>
                                <div className="h-[1px] bg-green-900/50 flex-1"></div>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Amount (₹)"
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-white font-bold placeholder:font-normal"
                                />
                                <button
                                    onClick={() => handleTransaction('refill', 0, 'Cash Top-up')}
                                    className="bg-green-600 text-black px-6 rounded-lg font-bold hover:bg-green-500 transition"
                                >
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RECENT TRANSACTIONS */}
                    <div className="mt-8">
                        <h3 className="text-xs text-zinc-500 uppercase mb-3">Recent Transactions</h3>
                        <div className="space-y-2">
                            {cardData?.last_transactions && cardData.last_transactions.length > 0 ? (
                                cardData.last_transactions.map((tx: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center bg-zinc-900 p-3 rounded border border-zinc-800">
                                        <div>
                                            <div className="text-sm text-white">{tx.notes}</div>
                                            <div className="text-xs text-zinc-600">{new Date(tx.created_at).toLocaleTimeString()}</div>
                                        </div>
                                        <div className={`font-mono font-bold ${tx.transaction_type === 'refill' ? 'text-green-500' : 'text-red-500'}`}>
                                            {tx.transaction_type === 'refill' ? '+' : '-'}₹{tx.amount}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-zinc-600 text-sm py-4">No recent transactions</div>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default VolunteerDashboard;

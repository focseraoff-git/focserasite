import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Users, Ticket, Gamepad2, Search, Mail, Phone, Home, Calendar, ChevronDown, ChevronUp, AlertCircle, Plus, DollarSign, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Navbar } from "@/components/ArenaNavbar";
import { Footer } from "@/components/ArenaFooter";

interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  flat_number: string;
  number_of_cards: number;
  participant_names: string | null;
  card_code: string | null;
  total_balance: number | null;
  used_balance: number | null;
  created_at: string;
}

interface GamePlay {
  id: string;
  booking_id: string | null;
  game_name: string | null;
  played_at: string;
}

const gamePrices: Record<string, number> = {
  "Gym Race": 49,
  "Sack Race – Minefield Edition": 49,
  "Electric Wire Challenge": 19,
  "Squid Game – Trio Challenge": 149,
  "Escape Room": 179,
  "Treasure Hunt": 179,
  "Ring Toss": 49,
  "Cup Throw": 49,
  "Balloon Shooting": 49,
  "Ghost Story Telling": 99,
  "Murder Mystery Room": 199,
  "Musical Chairs": 25,
  "Giant Ludo": 35,
  "Balloon Darts": 40,
  "Tug of War": 15,
  "Reaction Challenge": 30,
  "Obstacle Course": 45,
  "Memory Match": 25,
  "Bean Bag Toss": 25,
  "Dance Off": 20,
  "Archery Zone": 50,
};

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [gamePlays, setGamePlays] = useState<GamePlay[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [refillAmount, setRefillAmount] = useState<Record<string, number>>({});

  const checkAdminAccess = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsAuthorized(true);
        toast.success("Welcome, Admin!");
        fetchData();
      } else {
        toast.error("Access denied. You are not an authorized admin.");
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast.error("Error verifying admin access");
    }
  };

  const fetchData = async () => {
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("game_card_bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      const { data: playsData, error: playsError } = await supabase
        .from("game_plays")
        .select("*")
        .order("played_at", { ascending: false });

      if (playsError) throw playsError;
      setGamePlays(playsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error loading admin data");
    }
  };

  const handleRefill = async (bookingId: string) => {
    const amount = refillAmount[bookingId] || 0;
    if (amount <= 0) {
      toast.error("Please enter a valid refill amount");
      return;
    }

    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      const newBalance = (booking.total_balance || 10) + amount;

      const { error } = await supabase
        .from("game_card_bookings")
        .update({ total_balance: newBalance })
        .eq("id", bookingId);

      if (error) throw error;

      toast.success(`Added ₹${amount} to balance`);
      setRefillAmount(prev => ({ ...prev, [bookingId]: 0 }));
      fetchData();
    } catch (error) {
      console.error("Error refilling balance:", error);
      toast.error("Failed to refill balance");
    }
  };

  useEffect(() => {
    setIsChecking(false);
  }, []);

  const filteredBookings = bookings.filter(booking =>
    booking.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.flat_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phone.includes(searchTerm) ||
    (booking.card_code && booking.card_code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getBookingPlays = (bookingId: string) => {
    return gamePlays.filter(play => play.booking_id === bookingId);
  };

  const totalCards = bookings.reduce((sum, b) => sum + b.number_of_cards, 0);
  const totalPlays = gamePlays.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_balance || 10), 0);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-md">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-gold" />
              </div>
              <h1 className="text-3xl font-heading font-bold mb-2">Admin Portal</h1>
              <p className="text-foreground/60">Enter your authorized email to access</p>
            </motion.div>

            <motion.div
              className="p-6 rounded-2xl bg-card/30 border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Admin Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-background/50"
                    onKeyDown={(e) => e.key === "Enter" && checkAdminAccess()}
                  />
                </div>
                <Button
                  onClick={checkAdminAccess}
                  variant="gold"
                  className="w-full"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Access Admin Portal
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-gold" />
              <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-foreground/60">Manage game cards, track activity, and refill balances</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-5 rounded-2xl bg-card/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                  <p className="text-sm text-foreground/60">Bookings</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-card/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalCards}</p>
                  <p className="text-sm text-foreground/60">Cards Issued</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-card/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalPlays}</p>
                  <p className="text-sm text-foreground/60">Games Played</p>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-card/30 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">₹{totalRevenue}</p>
                  <p className="text-sm text-foreground/60">Total Balance</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Game Prices Reference */}
          <motion.div
            className="mb-6 p-4 rounded-xl bg-card/20 border border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Game Prices
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(gamePrices).slice(0, 10).map(([game, price]) => (
                <span key={game} className="px-2 py-1 rounded-lg bg-background/50 text-xs text-foreground/70">
                  {game}: ₹{price}
                </span>
              ))}
              <span className="px-2 py-1 rounded-lg bg-gold/10 text-xs text-gold">+{Object.keys(gamePrices).length - 10} more</span>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, phone, flat, or card code..."
                className="pl-12 bg-background/50"
              />
            </div>
          </motion.div>

          {/* Bookings List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 text-foreground/50">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking) => {
                const plays = getBookingPlays(booking.id);
                const isExpanded = expandedBooking === booking.id;
                const balance = (booking.total_balance || 10) - (booking.used_balance || 0);

                return (
                  <motion.div
                    key={booking.id}
                    className="rounded-2xl bg-card/30 border border-border overflow-hidden"
                    layout
                  >
                    <div
                      className="p-5 cursor-pointer hover:bg-background/30 transition-colors"
                      onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                            <span className="text-lg font-bold text-gold">
                              {booking.full_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{booking.full_name}</h3>
                            <div className="flex items-center gap-3 text-sm text-foreground/60">
                              <span className="flex items-center gap-1">
                                <Ticket className="w-3 h-3" />
                                {booking.number_of_cards} cards
                              </span>
                              <span className="flex items-center gap-1">
                                <Gamepad2 className="w-3 h-3" />
                                {plays.length} plays
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${balance > 50 ? 'bg-emerald-500/20 text-emerald-400' : balance > 20 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                                ₹{balance} balance
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {booking.card_code && (
                            <span className="text-xs font-mono text-foreground/50 bg-background/50 px-2 py-1 rounded">
                              {booking.card_code}
                            </span>
                          )}
                          <span className="text-xs text-foreground/40">
                            {new Date(booking.created_at).toLocaleDateString()}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-foreground/40" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-foreground/40" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        className="px-5 pb-5 border-t border-border pt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Contact Info */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Contact Details</h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-foreground/40" />
                                <span className="text-foreground/70">{booking.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-foreground/40" />
                                <span className="text-foreground/70">{booking.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Home className="w-4 h-4 text-foreground/40" />
                                <span className="text-foreground/70">Flat {booking.flat_number}</span>
                              </div>
                              {booking.card_code && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Ticket className="w-4 h-4 text-foreground/40" />
                                  <span className="text-foreground/70 font-mono">{booking.card_code}</span>
                                </div>
                              )}
                            </div>

                            {booking.participant_names && (
                              <div className="mt-4">
                                <h4 className="text-sm font-semibold text-foreground/60 mb-2">Other Participants</h4>
                                <p className="text-sm text-foreground/50 whitespace-pre-line">{booking.participant_names}</p>
                              </div>
                            )}
                          </div>

                          {/* Game History */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Game History</h4>
                            {plays.length === 0 ? (
                              <p className="text-sm text-foreground/40">No games played yet</p>
                            ) : (
                              <div className="space-y-2 max-h-40 overflow-y-auto">
                                {plays.map((play) => (
                                  <div
                                    key={play.id}
                                    className="flex items-center justify-between p-2 rounded-lg bg-background/30"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Gamepad2 className="w-4 h-4 text-gold/60" />
                                      <span className="text-sm text-foreground/70">{play.game_name || "Unknown Game"}</span>
                                    </div>
                                    <div className="text-right">
                                      <span className="text-xs text-foreground/40 block">
                                        {new Date(play.played_at).toLocaleString()}
                                      </span>
                                      <span className="text-xs text-gold">
                                        ₹{play.game_name && gamePrices[play.game_name] ? gamePrices[play.game_name] : 30}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Balance & Refill */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider">Balance & Refill</h4>

                            <div className="p-4 rounded-xl bg-background/30">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-foreground/60">Total Balance</span>
                                <span className="text-xl font-bold text-foreground">₹{booking.total_balance || 10}</span>
                              </div>
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-foreground/60">Used</span>
                                <span className="text-lg text-red-400">-₹{booking.used_balance || 0}</span>
                              </div>
                              <div className="flex items-center justify-between pt-3 border-t border-border">
                                <span className="text-foreground/60">Remaining</span>
                                <span className={`text-xl font-bold ${balance > 50 ? 'text-emerald-400' : balance > 20 ? 'text-amber-400' : 'text-red-400'}`}>
                                  ₹{balance}
                                </span>
                              </div>
                            </div>

                            {/* Refill Section */}
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                placeholder="Amount"
                                value={refillAmount[booking.id] || ""}
                                onChange={(e) => setRefillAmount(prev => ({
                                  ...prev,
                                  [booking.id]: parseInt(e.target.value) || 0
                                }))}
                                className="bg-background/50 flex-1"
                              />
                              <Button
                                onClick={() => handleRefill(booking.id)}
                                variant="gold"
                                size="sm"
                                className="gap-1"
                              >
                                <Plus className="w-4 h-4" />
                                Refill
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Balance Bar */}
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-foreground/60">Usage Progress</span>
                            <span className="text-foreground">{booking.used_balance || 0} / {booking.total_balance || 10} used</span>
                          </div>
                          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${balance > 50 ? 'bg-emerald-500' : balance > 20 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${Math.min(((booking.used_balance || 0) / (booking.total_balance || 10)) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            )}
          </motion.div>

          {/* Refresh Button */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={fetchData}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </Button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;

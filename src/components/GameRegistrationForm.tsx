import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Gamepad2, Check, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const gameTypes = [
  "Gym Race",
  "Sack Race",
  "Electric Wire Challenge",
  "Squid Game Challenges",
  "Escape Room",
  "Treasure Hunt",
  "Ring Toss",
  "Cup Throw",
  "Balloon Shooting",
  "Ghost Story Telling",
  "Murder Mystery",
  "Among Us (Real-Life)",
  "IPL Auction",
];

const timeSlots = [
  "6:00 PM - 6:30 PM",
  "6:30 PM - 7:00 PM",
  "7:00 PM - 7:30 PM",
  "7:30 PM - 8:00 PM",
  "8:00 PM - 8:30 PM",
  "8:30 PM - 9:00 PM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
];

export const GameRegistrationForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    flat_number: "",
    age: "",
    game_type: "",
    preferred_day: "",
    preferred_time_slot: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("game_registrations").insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        flat_number: formData.flat_number,
        age: parseInt(formData.age),
        game_type: formData.game_type,
        preferred_day: formData.preferred_day,
        preferred_time_slot: formData.preferred_time_slot,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Game registration successful! See you at the event.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 mb-6">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-gold/80 text-sm">Game Registration</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Register for <span className="text-gold-gradient">Games</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose your favorite games and book your spot. Limited slots available per game!
            </p>
          </motion.div>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-card/30 border border-border backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Flat Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.flat_number}
                    onChange={(e) => setFormData({ ...formData, flat_number: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                    placeholder="e.g., A-101"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Age *</label>
                  <input
                    type="number"
                    required
                    min="5"
                    max="80"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                    placeholder="Your age"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Select Game *</label>
                  <select
                    required
                    value={formData.game_type}
                    onChange={(e) => setFormData({ ...formData, game_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                  >
                    <option value="">Choose a game</option>
                    {gameTypes.map((game) => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Preferred Day *</label>
                  <select
                    required
                    value={formData.preferred_day}
                    onChange={(e) => setFormData({ ...formData, preferred_day: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                  >
                    <option value="">Select day</option>
                    <option value="Day 1 (Evening)">Day 1 (Evening - 6 PM to 9 PM)</option>
                    <option value="Day 2 (Morning)">Day 2 (Morning - 10 AM to 1 PM)</option>
                    <option value="Day 2 (Afternoon)">Day 2 (Afternoon - 2 PM to 5 PM)</option>
                    <option value="Day 2 (Evening)">Day 2 (Evening - 5 PM to 9 PM)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Preferred Time Slot</label>
                  <select
                    value={formData.preferred_time_slot}
                    onChange={(e) => setFormData({ ...formData, preferred_time_slot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                  >
                    <option value="">Select time slot (optional)</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Registering..." : "Register for Game"}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="text-center p-12 rounded-2xl bg-gold/5 border border-gold/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Registration Complete!</h3>
              <p className="text-foreground/60 mb-6">You've successfully registered for {formData.game_type}. Get ready for an amazing experience!</p>
              <Button variant="goldOutline" onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  full_name: "",
                  email: "",
                  phone: "",
                  flat_number: "",
                  age: "",
                  game_type: "",
                  preferred_day: "",
                  preferred_time_slot: "",
                });
              }}>
                Register for Another Game
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

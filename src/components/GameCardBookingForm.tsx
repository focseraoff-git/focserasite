import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Ticket, Check, Minus, Plus, Sparkles, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GameCardDisplay } from "./GameCardDisplay";

// Generate random card code
const generateCardCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'AX-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const GameCardBookingForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cardCodes, setCardCodes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    flat_number: "",
    number_of_cards: 1,
    participant_names: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate card codes for all cards
      const codes = Array.from({ length: formData.number_of_cards }, () => generateCardCode());
      setCardCodes(codes);

      // Save to database
      const { error } = await supabase.from("game_card_bookings").insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        flat_number: formData.flat_number,
        number_of_cards: formData.number_of_cards,
        participant_names: formData.participant_names,
        card_code: codes[0], // Store primary card code
      });

      if (error) throw error;

      // Get participant names
      const names = getParticipantNames();

      // Send email with game cards
      try {
        const emailResponse = await supabase.functions.invoke('send-game-card-email', {
          body: {
            email: formData.email,
            name: formData.full_name,
            flatNumber: formData.flat_number,
            phone: formData.phone,
            cardCodes: codes,
            participantNames: names
          }
        });

        if (emailResponse.error) {
          console.error("Email error:", emailResponse.error);
          toast.warning("Cards generated but email could not be sent. Please screenshot your cards!");
        } else {
          toast.success("Game passes sent to your email!");
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        toast.warning("Cards generated! Screenshot them as email service is unavailable.");
      }

      setIsSubmitted(true);
      toast.success("Game Card booking successful!");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const adjustCards = (delta: number) => {
    const newValue = formData.number_of_cards + delta;
    if (newValue >= 1 && newValue <= 10) {
      setFormData({ ...formData, number_of_cards: newValue });
    }
  };

  // Get participant names array
  const getParticipantNames = () => {
    if (formData.number_of_cards === 1) return [formData.full_name];
    const names = formData.participant_names.split('\n').filter(n => n.trim());
    const allNames = [formData.full_name, ...names];
    return allNames.slice(0, formData.number_of_cards);
  };

  return (
    <section id="book-card" className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 mb-4">
              <Ticket className="w-4 h-4 text-gold" />
              <span className="text-gold/80 text-sm">Get Your Pass</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Book Your <span className="text-gold-gradient">Game Card</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              Get your exclusive ArenaX game pass with QR code - delivered to your email!
            </p>
          </motion.div>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="p-6 rounded-2xl bg-card/30 border border-border backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/70">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                      placeholder="Enter your name"
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
                      placeholder="Enter phone number"
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
                </div>

                {/* Number of Cards */}
                <div className="space-y-2">
                  <label className="text-sm text-foreground/70">Number of Game Cards *</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => adjustCards(-1)}
                      className="w-12 h-12 rounded-xl bg-background/50 border border-border flex items-center justify-center hover:border-gold/50 transition-colors"
                    >
                      <Minus className="w-5 h-5 text-foreground" />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-4xl font-bold text-gold">{formData.number_of_cards}</span>
                      <p className="text-sm text-foreground/50">Cards</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustCards(1)}
                      className="w-12 h-12 rounded-xl bg-background/50 border border-border flex items-center justify-center hover:border-gold/50 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Participant Names */}
                {formData.number_of_cards > 1 && (
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <label className="text-sm text-foreground/70">Other Participant Names (Optional)</label>
                    <textarea
                      value={formData.participant_names}
                      onChange={(e) => setFormData({ ...formData, participant_names: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30 resize-none"
                      placeholder="Enter names of other participants (one per line)"
                    />
                  </motion.div>
                )}

                <div className="flex items-center gap-2 p-3 rounded-xl bg-gold/5 border border-gold/20">
                  <Mail className="w-5 h-5 text-gold" />
                  <p className="text-sm text-foreground/70">
                    Your game passes will be emailed to <span className="text-gold">{formData.email || "your email"}</span>
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full gold-glow"
                  disabled={isSubmitting}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Generating & Sending..." : `Generate ${formData.number_of_cards} Game Card${formData.number_of_cards > 1 ? 's' : ''}`}
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Success Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  🎉 Cards Generated & Sent!
                </h3>
                <p className="text-foreground/60">
                  Check your email for your exclusive ArenaX game passes
                </p>
              </motion.div>

              {/* Generated Cards */}
              <div className="flex flex-wrap justify-center gap-8 py-8">
                {getParticipantNames().map((name, index) => (
                  <GameCardDisplay
                    key={index}
                    name={name || `Player ${index + 1}`}
                    cardNumber={index + 1}
                    totalCards={formData.number_of_cards}
                    cardCode={cardCodes[index]}
                    flatNumber={formData.flat_number}
                    phone={formData.phone}
                    email={formData.email}
                  />
                ))}
              </div>

              {/* Instructions */}
              <motion.div
                className="mt-8 p-4 rounded-xl bg-gold/5 border border-gold/20 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-sm text-foreground/70">
                  📧 Game passes sent to <span className="text-gold font-medium">{formData.email}</span>
                </p>
                <p className="text-sm text-foreground/60 mt-2">
                  📱 Screenshot your cards as backup! Show the QR code at the event for entry.
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
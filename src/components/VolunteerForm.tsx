import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Heart, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const VOLUNTEER_LIMIT = 40;

const roles = [
  "Game Zone Supervisor",
  "Registration Desk",
  "Food Stall Helper",
  "Crowd Management",
  "First Aid Support",
  "Entertainment Coordinator",
];

export const VolunteerForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    age: "",
    flat_number: "",
    preferred_role: "",
    experience: "",
  });

  useEffect(() => {
    fetchVolunteerCount();

    const channel = supabase
      .channel("volunteers-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "volunteers" },
        () => fetchVolunteerCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchVolunteerCount = async () => {
    const { count } = await supabase
      .from("volunteers")
      .select("*", { count: "exact", head: true });
    setVolunteerCount(count || 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (volunteerCount >= VOLUNTEER_LIMIT) {
      toast.error("Volunteer registration is now closed. We've reached our limit!");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("volunteers").insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        flat_number: formData.flat_number,
        preferred_role: formData.preferred_role,
        experience: formData.experience,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Thank you for volunteering! We'll contact you soon.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const remaining = VOLUNTEER_LIMIT - volunteerCount;
  const progressPercentage = (volunteerCount / VOLUNTEER_LIMIT) * 100;

  return (
    <section className="py-24 bg-gradient-radial relative overflow-hidden">
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
              <Heart className="w-4 h-4 text-gold" />
              <span className="text-gold/80 text-sm">Join Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Become a <span className="text-gold-gradient">Volunteer</span>
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Be part of the ArenaX experience. Help us create unforgettable moments for our community.
            </p>
          </motion.div>

          {/* Counter */}
          <motion.div
            className="mb-10 p-6 rounded-2xl bg-card/30 border border-border backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Volunteer Status</p>
                  <p className="text-xl font-bold text-foreground">
                    <span className="text-gold">{volunteerCount}</span> / {VOLUNTEER_LIMIT} Registered
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gold">{remaining}</p>
                <p className="text-sm text-foreground/60">Spots Remaining</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            
            {remaining <= 5 && remaining > 0 && (
              <div className="mt-3 flex items-center gap-2 text-gold">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Only {remaining} spots left! Register now.</span>
              </div>
            )}
          </motion.div>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
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
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Age *</label>
                <input
                  type="number"
                  required
                  min="16"
                  max="70"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                  placeholder="Your age"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Flat Number *</label>
                <input
                  type="text"
                  required
                  value={formData.flat_number}
                  onChange={(e) => setFormData({ ...formData, flat_number: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30"
                  placeholder="e.g., A-101"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-foreground/70">Preferred Role</label>
                <select
                  value={formData.preferred_role}
                  onChange={(e) => setFormData({ ...formData, preferred_role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground"
                >
                  <option value="">Select a role (optional)</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm text-foreground/70">Previous Experience (Optional)</label>
                <textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-card/50 border border-border focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-foreground placeholder:text-foreground/30 resize-none"
                  placeholder="Tell us about any relevant experience..."
                />
              </div>

              <div className="md:col-span-2">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || volunteerCount >= VOLUNTEER_LIMIT}
                >
                  {isSubmitting ? "Registering..." : volunteerCount >= VOLUNTEER_LIMIT ? "Registration Closed" : "Register as Volunteer"}
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
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">You're Registered!</h3>
              <p className="text-foreground/60">Thank you for volunteering. Our team will contact you shortly with more details.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

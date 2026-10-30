import { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// --- Supabase Setup ---
// 1. Replace these with your actual Supabase URL and Anon Key from your project settings.
//    It's best practice to store these in environment variables (.env.local file).

// Using shared `supabase` client from `src/lib/supabase`.

export default function Contact() {
  // --- State Management ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    division: "Select a division",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'
  const [formError, setFormError] = useState("");

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim() ||
      formData.division === "Select a division"
    ) {
      setFormError("Please fill out all required fields.");
      setStatus("error");
      return;
    }
    setFormError("");
    setStatus("submitting");

    // 3. Insert the form data into your Supabase table.
    //    Make sure you have a table named 'contacts' with matching columns.
    try {
      if (!supabase) throw new Error("Supabase client not available");

      const { error } = await (supabase as any).from("custom_contacts").insert({
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        interested_division: formData.division,
        message: formData.message.trim(),
      });

      if (error) throw error;

      setStatus("success");
      setFormData({
        // Reset form on success
        name: "",
        email: "",
        division: "Select a division",
        message: "",
      });
      // Optionally, revert to idle status after a few seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: any) {
      console.error("Error submitting to Supabase or network:", err);
      // Provide a more detailed message if Supabase returns details
      const friendly =
        "We could not send your message. Please try again, or email info@focsera.com.";
      setFormError(friendly);
      setStatus("error");
    }
  };

  return (
    <div className="p-contact-page min-h-screen bg-white">
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-contact-heading mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Let's make your next idea happen.
            </h1>
            <div className="w-24 h-1 bg-[#0052CC] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us a little about what you have in mind. We will help you
              find the right people and the right approach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info Section (unchanged) */}
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Email Us
                  </h3>
                  <a href="mailto:info@focsera.com" className="text-gray-600">
                    info@focsera.com
                  </a>
                  <p className="text-gray-600">collab@focsera.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Call Us
                  </h3>
                  <a href="tel:+919515803954" className="text-gray-600">
                    +91 95158 03954
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-[#0052CC] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Visit Us
                  </h3>
                  <p className="text-gray-600"></p>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Form Section (updated) */}
            <form onSubmit={handleSubmit} className="p-contact-form space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  maxLength={200}
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  maxLength={320}
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="division"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Interested Division
                </label>
                <select
                  id="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all"
                  required
                >
                  <option disabled>Select a division</option>
                  <option>Focsera Studios</option>
                  <option>Focsera Media</option>
                  <option>Focsera Events</option>
                  <option>Focsera Web</option>
                  <option>Pilo by Focsera</option>
                  <option>Focsera Interiors</option>
                  <option>Focsera Marketing</option>
                  <option>Beyond by Focsera</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  maxLength={10000}
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
              </div>

              {/* --- Submission Feedback --- */}
              <div className="min-h-14" aria-live="polite">
                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-green-700">
                    <CheckCircle size={20} />
                    <p className="font-semibold">
                      Message sent successfully! We'll be in touch soon.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700">
                    <AlertTriangle size={20} />
                    <p className="font-semibold">{formError}</p>
                    <button
                      onClick={async (evt) => {
                        evt.preventDefault();
                        setStatus("submitting");
                        await handleSubmit(evt as any);
                      }}
                      className="ml-4 px-3 py-1 bg-white text-red-700 rounded-md text-sm border"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-[#0052CC] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#0047b3] transition-all duration-300 flex items-center justify-center gap-2 group disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight
                      className="group-hover:translate-x-1 transition-transform"
                      size={20}
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

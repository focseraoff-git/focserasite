import React, { useState } from 'react';
import { X, Send, MessageCircle, FileDown, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({
  isOpen,
  onClose,
  initialProgram = 'InnovateX Summit & AI Workshops',
}) => {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('Principal / Educator');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(initialProgram);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedText = encodeURIComponent(
      `Hi Beyond by Focsera! I would like to partner with Beyond.\n\n` +
      `• Name: ${name}\n` +
      `• Role: ${role}\n` +
      `• School / Institution: ${institution}\n` +
      `• Phone: ${phone}\n` +
      `• Program of Interest: ${program}\n\n` +
      `Please get in touch with curriculum & pricing details.`
    );
    window.open(`https://wa.me/919515803954?text=${encodedText}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi Focsera! I'm interested in Beyond by Focsera education programs, workshops, and school partnerships. Can you share more details?"
    );
    window.open(`https://wa.me/919515803954?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#35102F]/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl bg-[#FFF9EF] border-2 border-[#35102F] rounded-3xl p-6 sm:p-8 shadow-[8px_12px_0px_#35102F] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#EDE2FA] border-2 border-[#35102F] text-[#35102F] flex items-center justify-center hover:bg-[#C7EB49] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#C7EB49] text-[#35102F] border border-[#35102F] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Campus Partnership
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#35102F] beyond-font-heading">
              Bring Beyond to Your School
            </h3>
            <p className="text-sm text-[#35102F]/70 mt-1 beyond-font-sans">
              Connect with our academic team to explore workshops, skill labs, or custom flagship events.
            </p>
          </div>

          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#C7EB49] border-2 border-[#35102F] flex items-center justify-center mb-4 text-[#35102F]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-[#35102F] beyond-font-heading">Redirecting to WhatsApp...</h4>
              <p className="text-sm text-[#35102F]/70 mt-1">Our team will respond right away with program details.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#35102F] uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#35102F] text-[#35102F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7EB49]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#35102F] uppercase tracking-wider mb-1">
                    Your Role / Title
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#35102F] text-[#35102F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7EB49]"
                  >
                    <option value="Principal / Director">Principal / Director</option>
                    <option value="Academic Dean / Coordinator">Academic Dean / Coordinator</option>
                    <option value="STEM / Computer Science HOD">STEM / CS HOD</option>
                    <option value="Educator / Teacher">Educator / Teacher</option>
                    <option value="Parent / Student Representative">Parent / Student Rep</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#35102F] uppercase tracking-wider mb-1">
                    School / College Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Oakridge International"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#35102F] text-[#35102F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7EB49]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#35102F] uppercase tracking-wider mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#35102F] text-[#35102F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7EB49]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#35102F] uppercase tracking-wider mb-1">
                  Interested In
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#35102F] text-[#35102F] text-sm focus:outline-none focus:ring-2 focus:ring-[#C7EB49]"
                >
                  <option value="PromptX AI Workshop (1-Day)">PromptX AI Workshop (1-Day, Classes 6–10)</option>
                  <option value="InnovateX Summit (3-Day Flagship)">InnovateX Summit (3-Day High School)</option>
                  <option value="Beyond Year-Long Saturday Program (60 Sessions)">Beyond Year-Long Saturday Program (60 Sessions)</option>
                  <option value="Starter Partnership Plan">Starter Partnership Plan</option>
                  <option value="Standard Skill Subscription">Standard Skill Subscription</option>
                  <option value="Premium Innovation Partnership">Premium Innovation Partnership</option>
                  <option value="Custom STEM / AI Lab Setup">Custom STEM / AI Lab Setup</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C7EB49] text-[#35102F] font-black rounded-2xl border-2 border-[#35102F] shadow-[3px_4px_0px_#35102F] hover:shadow-[1px_2px_0px_#35102F] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" /> Connect via WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-[#EDE2FA] text-[#35102F] font-bold rounded-2xl border-2 border-[#35102F] hover:bg-[#F7DCE7] transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#35102F]" /> Quick Chat
                </button>
              </div>

              <div className="pt-3 border-t border-[#35102F]/15 flex items-center justify-between text-xs text-[#35102F]/75">
                <a
                  href="/images/Focsera_School_Pitch.pdf"
                  download
                  className="inline-flex items-center gap-1.5 font-bold text-[#35102F] hover:underline"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#35102F]" /> Download Pitch PDF
                </a>
                <a
                  href="tel:+919515803954"
                  className="inline-flex items-center gap-1.5 font-bold text-[#35102F] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-[#35102F]" /> +91 95158 03954
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PartnerModal;

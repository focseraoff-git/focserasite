// @ts-nocheck
import { useEffect, useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPopUp({ onClose, onNavigate }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage so popup doesn’t appear repeatedly
    const hasSeen = localStorage.getItem("skill_popup_seen");
    if (!hasSeen) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("skill_popup_seen", "true");
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-[90%] relative text-center"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X size={22} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center rounded-full shadow-md">
                <Sparkles size={28} />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Welcome to <span className="text-blue-600">Focsera Skill</span> 🚀
            </h2>

            {/* Body */}
            <p className="text-gray-600 leading-relaxed mb-6">
              Explore hands-on programs, real-world assignments, and code
              challenges.  
              <br />
              Unlock your learning journey today!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate("/divisions/skill/dashboard");
                  handleClose();
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all"
              >
                Start Learning <ArrowRight size={18} />
              </button>

              <button
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 rounded-full font-semibold text-gray-600 hover:bg-gray-100 transition-all"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

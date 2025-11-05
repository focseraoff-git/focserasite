// @ts-nocheck
import { motion } from "framer-motion";

export default function TabButton({ label, active, onClick, icon: Icon }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`relative px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all duration-300
        ${
          active
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700"
        }
      `}
    >
      {Icon && <Icon size={18} className={`${active ? "text-white" : "text-blue-600"}`} />}
      <span>{label}</span>

      {/* Active indicator bubble animation */}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-full bg-blue-600 -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </motion.button>
  );
}

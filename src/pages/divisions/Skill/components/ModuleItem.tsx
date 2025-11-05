// @ts-nocheck
import { motion } from "framer-motion";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

export default function ModuleItem({ module, onOpen, locked }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center justify-between p-5 rounded-2xl border shadow-sm transition-all duration-300
        ${locked ? "bg-gray-100 border-gray-200 cursor-not-allowed" : "bg-white border-blue-100 hover:border-blue-400"}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        {module.completed ? (
          <CheckCircle className="text-green-500 w-6 h-6" />
        ) : locked ? (
          <Lock className="text-gray-400 w-6 h-6" />
        ) : (
          <PlayCircle className="text-blue-600 w-6 h-6" />
        )}

        {/* Info */}
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{module.title}</h3>
          <p className="text-gray-500 text-sm">
            {module.description || "Learn the key concepts of this module"}
          </p>
        </div>
      </div>

      {/* Right Action */}
      {!locked ? (
        <button
          onClick={() => onOpen && onOpen(module)}
          className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all"
        >
          {module.completed ? "Review" : "Start"}
        </button>
      ) : (
        <span className="text-gray-400 text-sm font-medium">Locked</span>
      )}
    </motion.div>
  );
}

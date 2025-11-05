// @ts-nocheck
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, CheckCircle } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function ProgressCourseCard({ course, onContinue }) {
  const progress = course.progress || 0;
  const isCompleted = progress >= 100;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={course.thumbnail || "/images/placeholders/course.jpg"}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
          <BookOpen size={18} />
          <span className="uppercase text-sm tracking-wide">
            {course.category || "Skill Program"}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {course.description?.slice(0, 90) || "Learn and master this concept with structured lessons and projects."}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full rounded-full ${
              isCompleted ? "bg-green-500" : "bg-blue-600"
            }`}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-medium ${
              isCompleted ? "text-green-600" : "text-blue-600"
            }`}
          >
            {isCompleted ? "Completed" : `${progress}% Complete`}
          </span>
          <button
            onClick={() => onContinue && onContinue(course)}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-all"
          >
            {isCompleted ? "Review" : "Continue"} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

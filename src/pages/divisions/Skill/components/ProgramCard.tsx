// @ts-nocheck
import { ArrowRight } from "lucide-react";

export default function ProgramCard({ program, onView }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        {program.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4">{program.description}</p>

      <button
        onClick={onView}
        className="text-blue-600 font-semibold hover:text-blue-800 transition-all flex items-center gap-2"
      >
        View Program <ArrowRight size={16} />
      </button>
    </div>
  );
}

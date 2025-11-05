// @ts-nocheck
import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import ProgramCard from "../components/ProgramCard";
import FeatureCard from "../components/FeatureCard";
import { BookOpen, ClipboardCheck, Terminal } from "lucide-react";

export default function HomePage({ navigate, supabase }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      // ✅ Fetch ALL programs, not just one
      const { data, error } = await supabase.from("programs").select("*");

      if (error) {
        console.error("Error fetching programs:", error.message);
      } else {
        setPrograms(data || []);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, [supabase]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center">
        <h1 className="text-5xl font-extrabold mb-4">Focsera Skill Portal</h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Learn, practice, and earn certificates — all in one place.
        </p>
        <a
          href="#programs"
          className="inline-flex items-center px-8 py-4 bg-white text-blue-700 rounded-full font-bold hover:bg-gray-100"
        >
          Start Learning
          <ArrowRight className="ml-2" />
        </a>
      </section>

      {/* All Programs */}
      <section id="programs" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Free Programs</h2>
          {loading ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <ProgramCard key={program.id} program={program} navigate={navigate} />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No programs available yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Terminal}
            title="Built-in Code Editor"
            description="Run and test code instantly in your browser."
          />
          <FeatureCard
            icon={BookOpen}
            title="Structured Notes"
            description="Read neatly organized notes for every concept."
          />
          <FeatureCard
            icon={ClipboardCheck}
            title="Daily Assignments"
            description="Test your learning with auto-evaluated tasks."
          />
        </div>
      </section>
    </div>
  );
}

// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Loader2,
  PlusCircle,
  Code2,
  Users,
  BookOpen,
  FolderPlus,
  Trophy,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChallenges: 0,
    totalPrograms: 0,
  });
  const [recentChallenges, setRecentChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);

        // Fetch user count
        const { count: userCount } = await lmsSupabaseClient
          .from("users")
          .select("*", { count: "exact", head: true });

        // Fetch program count
        const { count: programCount } = await lmsSupabaseClient
          .from("programs")
          .select("*", { count: "exact", head: true });

        // Fetch challenge count + recent ones
        const { data: challenges, count: challengeCount } = await lmsSupabaseClient
          .from("code_challenges")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .limit(5);

        setStats({
          totalUsers: userCount || 0,
          totalChallenges: challengeCount || 0,
          totalPrograms: programCount || 0,
        });

        setRecentChallenges(challenges || []);
      } catch (err) {
        console.error("Admin Dashboard Error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">
          Manage challenges, courses, and view platform stats here.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          icon={BookOpen}
          title="Programs"
          value={stats.totalPrograms}
          color="bg-purple-500"
        />
        <StatCard
          icon={Code2}
          title="Challenges"
          value={stats.totalChallenges}
          color="bg-green-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/divisions/skill/admin/add-challenge")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition"
          >
            <PlusCircle size={18} /> Add Challenge
          </button>
          <button
            onClick={() => navigate("/divisions/skill/admin/add-program")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition"
          >
            <FolderPlus size={18} /> Add Program
          </button>
          <button
            onClick={() => navigate("/divisions/skill/dashboard")}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg font-medium transition"
          >
            <Trophy size={18} /> View User Dashboard
          </button>
        </div>
      </div>

      {/* Recent Challenges */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Challenges
        </h2>

        {recentChallenges.length === 0 ? (
          <p className="text-gray-500 text-sm">No challenges found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border-t border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-left">
                  <th className="p-3">Title</th>
                  <th className="p-3">Language</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {recentChallenges.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                    onClick={() =>
                      navigate(`/divisions/skill/code/${c.id}`)
                    }
                  >
                    <td className="p-3 font-medium text-blue-600">
                      {c.title || "Untitled"}
                    </td>
                    <td className="p-3">{c.language || "—"}</td>
                    <td className="p-3 capitalize">{c.difficulty || "—"}</td>
                    <td className="p-3">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------- */
/* Reusable StatCard Component                   */
/* --------------------------------------------- */
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
      <div className={`p-4 rounded-full text-white ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

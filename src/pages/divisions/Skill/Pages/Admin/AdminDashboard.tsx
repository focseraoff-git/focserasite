// @ts-nocheck
import { useEffect, useState } from "react";
import {
  Loader2,
  Code2,
  Users,
  BookOpen,
  Layers,
  FolderPlus,
  Database,
  PenLine,
  Trash2,
  PlusCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    programs: 0,
    modules: 0,
    challenges: 0,
    submissions: 0,
  });
  const [expanded, setExpanded] = useState(null);
  const [tableData, setTableData] = useState({});

  /* ===========================================================
     Fetch Dashboard Stats
  =========================================================== */
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [users, programs, modules, challenges, submissions] = await Promise.all([
          lmsSupabaseClient.from("users").select("*", { count: "exact", head: true }),
          lmsSupabaseClient.from("programs").select("*", { count: "exact", head: true }),
          lmsSupabaseClient.from("modules").select("*", { count: "exact", head: true }),
          lmsSupabaseClient.from("code_challenges").select("*", { count: "exact", head: true }),
          lmsSupabaseClient.from("submissions").select("*", { count: "exact", head: true }),
        ]);

        setStats({
          users: users.count || 0,
          programs: programs.count || 0,
          modules: modules.count || 0,
          challenges: challenges.count || 0,
          submissions: submissions.count || 0,
        });
      } catch (err) {
        console.error("Error fetching stats:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  /* ===========================================================
     Dynamic Table Fetching
  =========================================================== */
  const fetchTable = async (table) => {
    try {
      setExpanded(expanded === table ? null : table);
      if (expanded === table) return; // collapse

      const { data, error } = await lmsSupabaseClient.from(table).select("*").limit(25);
      if (error) throw error;
      setTableData((prev) => ({ ...prev, [table]: data }));
    } catch (err) {
      alert(`Failed to fetch ${table}: ${err.message}`);
    }
  };

  /* ===========================================================
     CRUD Actions
  =========================================================== */
  const handleDelete = async (table, id) => {
    if (!confirm(`Delete record ${id} from ${table}?`)) return;
    try {
      const { error } = await lmsSupabaseClient.from(table).delete().eq("id", id);
      if (error) throw error;
      alert("Deleted successfully!");
      fetchTable(table);
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  const handleEdit = (table, id) => {
    navigate(`/divisions/skill/admin/edit/${table}/${id}`);
  };

  const handleAdd = (table) => {
    navigate(`/divisions/skill/admin/add-${table}`);
  };

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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Full control panel for managing programs, modules, challenges,
          and user activities.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard icon={Users} title="Users" value={stats.users} color="bg-blue-500" />
        <StatCard icon={BookOpen} title="Programs" value={stats.programs} color="bg-purple-500" />
        <StatCard icon={Layers} title="Modules" value={stats.modules} color="bg-indigo-500" />
        <StatCard icon={Code2} title="Challenges" value={stats.challenges} color="bg-green-500" />
        <StatCard icon={Database} title="Submissions" value={stats.submissions} color="bg-orange-500" />
      </div>

      {/* Expandable Tables */}
      {[
        { name: "programs", label: "Programs" },
        { name: "modules", label: "Modules" },
        { name: "content", label: "Content" },
        { name: "code_challenges", label: "Code Challenges" },
        { name: "test_cases", label: "Test Cases" },
        { name: "submissions", label: "Submissions" },
        { name: "user_stats", label: "User Stats" },
      ].map(({ name, label }) => (
        <div key={name} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={() => fetchTable(name)}
            className="w-full flex items-center justify-between p-4 font-semibold text-gray-800 hover:bg-gray-50 transition"
          >
            <span>{label}</span>
            {expanded === name ? <ChevronUp /> : <ChevronDown />}
          </button>

          {expanded === name && (
            <div className="p-4 overflow-x-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-gray-700 font-semibold">{label} Data</h3>
                <button
                  onClick={() => handleAdd(name)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
                >
                  <PlusCircle size={16} /> Add New
                </button>
              </div>

              {tableData[name]?.length ? (
                <table className="min-w-full text-sm text-gray-700 border-t border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-left">
                      {Object.keys(tableData[name][0]).slice(0, 6).map((key) => (
                        <th key={key} className="p-2 capitalize">
                          {key}
                        </th>
                      ))}
                      <th className="p-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData[name].map((row) => (
                      <tr key={row.id} className="border-b hover:bg-gray-50">
                        {Object.values(row)
                          .slice(0, 6)
                          .map((val, i) => (
                            <td key={i} className="p-2 truncate max-w-[160px]">
                              {typeof val === "string" && val.length > 80
                                ? val.slice(0, 80) + "..."
                                : String(val)}
                            </td>
                          ))}
                        <td className="p-2 flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(name, row.id)}
                            className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"
                          >
                            <PenLine size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(name, row.id)}
                            className="text-red-600 hover:bg-red-50 p-1.5 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-gray-500 mt-3">No records found.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ===========================================================
   Stat Card Component
=========================================================== */
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition">
      <div className={`p-4 rounded-full text-white ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

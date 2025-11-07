// @ts-nocheck
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";

export default function AdminEditPage() {
  const { table, id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(true);
  const [foreignOptions, setForeignOptions] = useState({});

  useEffect(() => {
    const fetchRecord = async () => {
      const { data, error } = await lmsSupabaseClient.from(table).select("*").eq("id", id).single();
      if (error) console.error(error.message);
      setRecord(data || {});
      setLoading(false);
    };
    fetchRecord();
  }, [table, id]);

  useEffect(() => {
    const fetchForeignData = async () => {
      const options = {};
      if (table === "modules" || table === "content") {
        const { data: programs } = await lmsSupabaseClient.from("programs").select("id, title");
        options.programs = programs;
      }
      if (table === "content") {
        const { data: challenges } = await lmsSupabaseClient.from("code_challenges").select("id, title");
        options.challenges = challenges;
      }
      setForeignOptions(options);
    };
    fetchForeignData();
  }, [table]);

  const handleSave = async () => {
    const { error } = await lmsSupabaseClient.from(table).update(record).eq("id", id);
    if (error) alert("Error: " + error.message);
    else {
      alert("✅ Record updated!");
      navigate("/divisions/skill/admin/dashboard");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 capitalize">Edit {table}</h2>
      {Object.keys(record).map((key) => (
        <div key={key} className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">{key}</label>

          {/* Textarea for long text */}
          {typeof record[key] === "string" && record[key]?.length > 100 ? (
            <textarea
              className="w-full border rounded px-3 py-2 text-sm"
              rows="4"
              value={record[key] ?? ""}
              onChange={(e) => setRecord({ ...record, [key]: e.target.value })}
            />
          ) : key.endsWith("_id") && foreignOptions.programs ? (
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={record[key] || ""}
              onChange={(e) => setRecord({ ...record, [key]: e.target.value })}
            >
              <option value="">Select</option>
              {foreignOptions.programs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="w-full border rounded px-3 py-2 text-sm"
              value={record[key] ?? ""}
              onChange={(e) => setRecord({ ...record, [key]: e.target.value })}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
}

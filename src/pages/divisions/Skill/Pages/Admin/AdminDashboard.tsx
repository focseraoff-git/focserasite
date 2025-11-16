// @ts-nocheck
import { useEffect, useState, useMemo } from "react";
import {
  Loader2, PlusCircle, Trash2, PenLine, ChevronUp, ChevronDown, X
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";

export default function AdminDashboard() {
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [newRow, setNewRow] = useState<any>({});
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [refresh, setRefresh] = useState(0);

  /* ============================================================
     Fetch all public tables from Supabase
  ============================================================ */
  useEffect(() => {
    const loadTables = async () => {
      const { data, error } = await lmsSupabaseClient.rpc("get_public_tables");
      if (error) console.error(error);
      else setTables(data.map((t: any) => t.table_name));
      setLoading(false);
    };
    loadTables();
  }, []);

  /* ============================================================
     Load Table Data
  ============================================================ */
  useEffect(() => {
    if (!selectedTable) return;
    const loadTable = async () => {
      setLoading(true);
      let query = lmsSupabaseClient.from(selectedTable).select("*", { count: "exact" });
      if (sortBy) query = query.order(sortBy, { ascending: sortDir === "asc" });
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      const { data, error, count } = await query.range(from, to);
      if (error) alert(error.message);
      else {
        setRows(data || []);
        setTotal(count || 0);
        if (data?.length) setColumns(Object.keys(data[0]));
      }
      setLoading(false);
    };
    loadTable();
  }, [selectedTable, sortBy, sortDir, page, pageSize, refresh]);

  /* ============================================================
     CRUD OPERATIONS
  ============================================================ */
  const addRow = async () => {
    const { error } = await lmsSupabaseClient.from(selectedTable).insert([newRow]);
    if (error) alert(error.message);
    else {
      alert("Added successfully!");
      setNewRow({});
      setRefresh(r => r + 1);
    }
  };

  const updateRow = async () => {
    const { id, ...data } = editingRow;
    const { error } = await lmsSupabaseClient.from(selectedTable).update(data).eq("id", id);
    if (error) alert(error.message);
    else {
      alert("Updated successfully!");
      setEditingRow(null);
      setRefresh(r => r + 1);
    }
  };

  const deleteRow = async (id: any) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const { error } = await lmsSupabaseClient.from(selectedTable).delete().eq("id", id);
    if (error) alert(error.message);
    else {
      alert("Deleted successfully!");
      setRefresh(r => r + 1);
    }
  };

  /* ============================================================
     Real-time Sync
  ============================================================ */
  useEffect(() => {
    if (!selectedTable) return;
    const channel = lmsSupabaseClient
      .channel(`realtime-${selectedTable}`)
      .on("postgres_changes", { event: "*", schema: "public", table: selectedTable }, () => {
        setRefresh(r => r + 1);
      })
      .subscribe();
    return () => lmsSupabaseClient.removeChannel(channel);
  }, [selectedTable]);

  /* ============================================================
     Dynamic Rendering
  ============================================================ */
  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    return rows.filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
    );
  }, [rows, search]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Table Selector */}
      <div className="flex flex-wrap gap-3">
        {tables.map((table) => (
          <button
            key={table}
            onClick={() => {
              setSelectedTable(table);
              setPage(1);
              setSortBy(null);
            }}
            className={`px-4 py-2 rounded-lg border ${selectedTable === table
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-50 text-gray-800"
              }`}
          >
            {table}
          </button>
        ))}
      </div>

      {/* Table Content */}
      {selectedTable && (
        <div className="bg-white border rounded-xl shadow-sm p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold">{selectedTable} Table</h2>

            <div className="flex items-center gap-2">
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={async () => {
                  // Prepare a newRow template using known columns, or try fetch one row to derive columns
                  if (!selectedTable) return alert('Select a table first');

                  if (columns?.length) {
                    const template = Object.fromEntries(columns.map((c) => [c, ""]));
                    setNewRow(template);
                    return;
                  }

                  if (rows?.length) {
                    const cols = Object.keys(rows[0] || {});
                    if (cols.length) {
                      setColumns(cols);
                      const template = Object.fromEntries(cols.map((c) => [c, ""]));
                      setNewRow(template);
                      return;
                    }
                  }

                  // try fetching a single row to derive columns
                  try {
                    const { data } = await lmsSupabaseClient.from(selectedTable).select("*").limit(1);
                    const cols = data && data.length ? Object.keys(data[0]) : [];
                    if (cols.length) {
                      setColumns(cols);
                      const template = Object.fromEntries(cols.map((c) => [c, ""]));
                      setNewRow(template);
                    } else {
                      alert('Unable to determine table columns — cannot add a row.');
                    }
                  } catch (err) {
                    console.error('Error fetching table sample:', err);
                    alert('Error fetching table info — check console for details.');
                  }
                }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm"
              >
                <PlusCircle size={16} /> Add
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="p-2 border-b cursor-pointer"
                      onClick={() => {
                        if (sortBy === col)
                          setSortDir(sortDir === "asc" ? "desc" : "asc");
                        else setSortBy(col);
                      }}
                    >
                      {col}{" "}
                      {sortBy === col && (sortDir === "asc" ? <ChevronUp /> : <ChevronDown />)}
                    </th>
                  ))}
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    {columns.map((col) => (
                      <td key={col} className="p-2 truncate max-w-[200px]">
                        {String(row[col] ?? "")}
                      </td>
                    ))}
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        onClick={() => setEditingRow(row)}
                        className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"
                      >
                        <PenLine size={16} />
                      </button>
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="text-red-600 hover:bg-red-50 p-1.5 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-3 text-sm">
            <span>
              Page {page} of {Math.ceil(total / pageSize)}
            </span>
            <div className="flex gap-2">
              <button
                className="border px-3 py-1 rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Prev
              </button>
              <button
                className="border px-3 py-1 rounded disabled:opacity-50"
                disabled={page >= Math.ceil(total / pageSize)}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {Object.keys(newRow).length > 0 && (
        <Modal
          title={`Add Row to ${selectedTable}`}
          data={newRow}
          setData={setNewRow}
          onCancel={() => setNewRow({})}
          onSave={addRow}
        />
      )}

      {/* EDIT MODAL */}
      {editingRow && (
        <Modal
          title={`Edit Row`}
          data={editingRow}
          setData={setEditingRow}
          onCancel={() => setEditingRow(null)}
          onSave={updateRow}
        />
      )}
    </div>
  );
}

/* ============================================================
   Generic Modal Component
============================================================ */
function Modal({ title, data, setData, onCancel, onSave }) {
  const keys = Object.keys(data);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center border-b p-3">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-auto space-y-3">
          {keys.map((key) => (
            <div key={key} className="grid grid-cols-3 items-center gap-2">
              <label className="text-sm text-gray-600">{key}</label>
              <input
                value={data[key] ?? ""}
                onChange={(e) =>
                  setData((d: any) => ({ ...d, [key]: e.target.value }))
                }
                className="col-span-2 border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          ))}
        </div>

        <div className="p-3 flex justify-end gap-2 border-t">
          <button onClick={onCancel} className="border px-3 py-2 rounded-lg">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

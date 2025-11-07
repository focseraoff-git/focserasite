// @ts-nocheck
import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";


export default function AddProgramPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddProgram = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill all fields!");
    setLoading(true);

    try {
      let thumbnailUrl = null;

      // 🧠 Upload thumbnail if provided
      if (thumbnail) {
        const filePath = `thumbnails/${Date.now()}_${thumbnail.name}`;
        const { error: uploadError } = await lmsSupabaseClient.storage
          .from("program-assets")
          .upload(filePath, thumbnail);
        if (uploadError) throw uploadError;

        const { data: publicUrl } = lmsSupabaseClient.storage
          .from("program-assets")
          .getPublicUrl(filePath);

        thumbnailUrl = publicUrl.publicUrl;
      }

      // ✅ Insert into programs table
      const { error } = await lmsSupabaseClient.from("programs").insert([
        {
          title,
          description,
          thumbnail_url: thumbnailUrl,
        },
      ]);

      if (error) throw error;

      alert("✅ Program added successfully!");
      setTitle("");
      setDescription("");
      setThumbnail(null);
      setPreviewUrl("");
    } catch (err) {
      alert("❌ Error adding program: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold mb-6">Add New Program</h1>

      <form onSubmit={handleAddProgram} className="space-y-5">
        <div>
          <label className="block font-semibold mb-2">Program Title</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="e.g. 30 Days of Java Programming"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg h-28"
            placeholder="Write a short description about this program..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Thumbnail (optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && <img src={previewUrl} alt="Preview" className="mt-3 w-48 rounded-lg shadow-md" />}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
          {loading ? "Adding..." : "Add Program"}
        </button>
      </form>
    </div>
  );
}

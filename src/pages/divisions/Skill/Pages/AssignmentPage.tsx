// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Send, UploadCloud, FileText } from "lucide-react";

export default function AssignmentPage({ user, supabase }) {
  const { contentId } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // 🔹 Fetch assignment details
  useEffect(() => {
    const fetchAssignment = async () => {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("id", contentId)
        .single();

      if (error) console.error("Error loading assignment:", error);
      else setAssignment(data);
    };

    fetchAssignment();
  }, [contentId, supabase]);

  // 🔹 Handle file uploads (stored in Supabase Storage)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
  };

  // 🔹 Handle submission to Supabase
  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit.");
      return;
    }

    setSubmitting(true);

    try {
      let submissionData = null;
      let submissionType = "file";

      // Upload to Supabase Storage if file provided
      if (file) {
        const filePath = `${user.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        submissionData = filePath;
      }

      // Insert submission record
      const { error: insertError } = await supabase.from("submissions").insert({
        user_id: user.id,
        content_id: assignment.id,
        type: submissionType,
        submission_data: submissionData,
        status: "pending",
        score: 0,
      });

      if (insertError) throw insertError;

      // Mark module as completed for this user (unlock next module)
      try {
        if (assignment.module_id) {
          const { error: compErr } = await supabase.from("completed_modules").insert({
            user_id: user.id,
            module_id: assignment.module_id,
            title: assignment.title,
            completed_at: new Date().toISOString(),
          });
          if (compErr) console.warn("Could not insert completed_modules record:", compErr.message);
        }
      } catch (e) {
        console.warn("Error marking module complete:", e?.message || e);
      }

      setSubmissionSuccess(true);
    } catch (err) {
      console.error("Error submitting assignment:", err.message);
      alert("Failed to submit assignment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!assignment)
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6"
        >
          <ArrowLeft size={18} /> Back to Module
        </button>

        {/* Assignment Header */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FileText size={26} className="text-green-600" /> {assignment.title}
          </h1>
          <p className="text-gray-600 mt-3 leading-relaxed">
            {assignment.body}
          </p>
        </div>

        {/* Submission Section */}
        {submissionSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl shadow-sm text-center">
            ✅ Your assignment has been submitted successfully!
          </div>
        ) : (
          <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Submit Your Work
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Upload your assignment file (PDF, DOCX, or ZIP) below.
            </p>

            <div className="flex items-center gap-3 mb-5">
              <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition">
                <UploadCloud className="text-blue-500 mr-3" />
                <span className="text-gray-600 font-medium">
                  {file ? file.name : "Choose file"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.zip"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting || !file}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all ${
                submitting || !file
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={18} /> Submit Assignment
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

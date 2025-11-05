// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { Award, Download, Loader2, LogIn, Share2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import confetti from "canvas-confetti";

export default function CertificatePage({ user, supabase = lmsSupabaseClient }) {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const certificateRef = useRef(null);

  // 🎉 Confetti Launch
  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#2563eb", "#60a5fa", "#93c5fd", "#38bdf8", "#ffffff"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#2563eb", "#60a5fa", "#93c5fd", "#38bdf8", "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // 🔹 Fetch user's program
  useEffect(() => {
    const fetchProgram = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: programs, error } = await supabase
          .from("programs")
          .select("title, slug")
          .limit(1);

        if (error) throw error;

        if (programs && programs.length > 0) {
          const selected = programs[0];
          const fakeCompletionDate = new Date();

          setProgram({
            program_name: selected.title,
            completion_date: fakeCompletionDate,
            certificate_id: "FOC-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
          });

          const verifyUrl = `${window.location.origin}/verify/${user.id}`;
          const qr = await QRCode.toDataURL(verifyUrl);
          setQrCodeUrl(qr);

          triggerConfetti();
        } else {
          setProgram(null);
        }
      } catch (err) {
        console.error("❌ Error fetching program:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [user, supabase]);

  const handleDownload = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const link = document.createElement("a");
    link.download = "focsera-certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // 🔗 Share buttons
  const shareCertificate = (platform) => {
    const shareText = `I just earned my Certificate in ${program.program_name} from Focsera Skill 🎓🔥`;
    const url = window.location.origin;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(
            shareText
          )}`,
          "_blank"
        );
        break;
      case "x":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)} ${url}`, "_blank");
        break;
      case "instagram":
        alert("📸 Screenshot your certificate and share it on Instagram tagging @focsera.official!");
        break;
      default:
        break;
    }
  };

  // 🟦 BEFORE LOGIN (Removed certificate preview)
  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center text-center px-4">
        <Award className="w-14 h-14 text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Earn Your Certificate of Completion
        </h1>
        <p className="text-gray-600 max-w-lg mb-8">
          Learn. Complete challenges. Earn an official, shareable Focsera Skill Certificate — verified and recognized by peers.
        </p>
        <button
          onClick={() => (window.location.href = "/divisions/skill/auth")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition"
        >
          <LogIn size={18} /> Log in to Start Learning
        </button>
      </div>
    );

  // 🟨 LOADING
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600 mr-2" />
        <div className="text-blue-600 font-semibold">Generating your certificate...</div>
      </div>
    );

  // 🟥 NO CERTIFICATE FOUND
  if (!program)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600 text-center px-6">
        <Award className="w-12 h-12 mb-3 text-blue-500" />
        <h2 className="text-2xl font-semibold mb-2">No Certificate Found</h2>
        <p className="text-gray-500 max-w-md mb-6">
          You haven’t completed any courses yet. Start learning and earn your verified certificate.
        </p>
        <button
          onClick={() => (window.location.href = "/divisions/skill/syllabus")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md"
        >
          Explore Courses →
        </button>
      </div>
    );

  // 🟩 AFTER LOGIN: Certificate Display
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div
        ref={certificateRef}
        className="relative bg-white border-8 border-blue-700 rounded-3xl shadow-2xl w-full max-w-3xl p-10 text-center overflow-hidden"
      >
        {/* Watermark */}
        <img
          src="/images/logos/logog.png"
          alt="Focsera Logo"
          className="absolute inset-0 w-96 opacity-[0.04] m-auto select-none pointer-events-none"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        />

        {/* Header */}
        <h2 className="text-2xl font-semibold text-blue-700 mb-3 tracking-wide">
          FOCSERA Skill Division
        </h2>

        <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
          Certificate of Completion
        </h1>

        <p className="text-gray-600 mb-6">This is to certify that</p>

        <h2 className="text-3xl font-bold text-blue-700 mb-4 capitalize">
          {user.email.split("@")[0]}
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
          has successfully completed the{" "}
          <span className="font-semibold text-blue-600">{program.program_name}</span> course on{" "}
          <span className="font-medium text-gray-800">
            {new Date(program.completion_date).toLocaleDateString()}
          </span>.
        </p>

        {/* Certificate ID */}
        <p className="text-gray-500 text-xs mt-3">
          Certificate ID: <span className="font-mono text-gray-700">{program.certificate_id}</span>
        </p>

        {/* Footer / Signatures */}
        <div className="mt-12 flex justify-between px-10 text-gray-500">
          <div className="flex flex-col items-center">
            <img
              src="/images/signature1.png"
              alt="Instructor Signature"
              className="h-10 opacity-80 mb-1"
            />
            <p className="text-sm font-medium">Instructor</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/images/signature2.png"
              alt="Director Signature"
              className="h-10 opacity-80 mb-1"
            />
            <p className="text-sm font-medium">Authorized Signatory</p>
          </div>
        </div>

        {/* QR */}
        {qrCodeUrl && (
          <div className="absolute bottom-8 right-8 text-xs text-gray-500 flex flex-col items-center">
            <img src={qrCodeUrl} alt="Verification QR" className="w-20 h-20 border border-gray-200 rounded-lg" />
            <p>Verify at focsera.in/verify</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <button
          onClick={handleDownload}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full flex items-center gap-2 shadow-lg"
        >
          <Download size={18} />
          Download Certificate
        </button>

        <button
          onClick={() => shareCertificate("linkedin")}
          className="px-6 py-3 bg-[#0A66C2] hover:bg-[#094b8f] text-white font-semibold rounded-full flex items-center gap-2"
        >
          <Share2 size={18} /> Share on LinkedIn
        </button>

        <button
          onClick={() => shareCertificate("x")}
          className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full flex items-center gap-2"
        >
          <Share2 size={18} /> Share on X
        </button>

        <button
          onClick={() => shareCertificate("instagram")}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-full flex items-center gap-2 shadow-lg"
        >
          <Share2 size={18} /> Share on Instagram
        </button>
      </div>
    </div>
  );
}

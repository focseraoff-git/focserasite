// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { Award, Download, Loader2, Share2, Lock, CheckCircle2, Circle, Clock } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import confetti from "canvas-confetti";

export default function CertificatePage({ user, supabase = lmsSupabaseClient }) {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const certificateRef = useRef(null);

  // 🔹 Inject Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

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
          setProgram({
            program_name: selected.title,
            completion_date: new Date(),
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
    
    setTimeout(async () => {
        const canvas = await html2canvas(element, { 
            scale: 3,
            useCORS: true,
            backgroundColor: "#ffffff",
        });
        const link = document.createElement("a");
        link.download = `Focsera_Certificate_${user?.email?.split("@")[0] || "User"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }, 100);
  };

  const shareCertificate = (platform) => {
    if (!program) return;
    const shareText = `I just earned my Certificate in ${program.program_name} from Focsera Skill 🎓🔥`;
    const url = window.location.origin;

    switch (platform) {
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareText)}`,
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

  // 🟨 LOADING
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600 mr-2" />
        <div className="text-blue-600 font-semibold">Generating your certificate...</div>
      </div>
    );

  // 🟥 NO CERTIFICATE FOUND (THE "BEST" DESIGN)
  if (!program)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        
        {/* Main Card Container */}
        <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            
            {/* LEFT: The Locked "Holographic" Certificate */}
            <div className="md:w-3/5 relative bg-gray-100 p-8 flex items-center justify-center overflow-hidden group">
                
                {/* 1. The Underlying Certificate (Blurred) */}
                <div className="absolute inset-0 m-8 bg-white shadow-lg border border-gray-200 transform scale-95 origin-center transition-all duration-700 blur-[3px] group-hover:blur-[1px] group-hover:scale-100">
                     {/* Faint details to make it look real */}
                     <div className="h-full w-full flex flex-col items-center justify-center opacity-40 select-none pointer-events-none">
                         <Award className="w-16 h-16 text-blue-900 mb-4" />
                         <div className="font-serif text-2xl text-gray-800 mb-2">Certificate of Completion</div>
                         <div className="font-[Great Vibes] text-4xl text-blue-600 rotate-[-2deg] my-4">
                            {user?.email?.split("@")[0] || "Your Name"}
                         </div>
                         <div className="w-32 h-px bg-gray-400 my-2"></div>
                         <div className="text-xs text-gray-500 uppercase tracking-widest">Focsera Skill Division</div>
                     </div>
                </div>

                {/* 2. The Glass Overlay & Lock */}
                <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm flex flex-col items-center justify-center z-10 transition-colors duration-500 group-hover:bg-blue-900/5">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="bg-white p-5 rounded-full shadow-2xl relative z-20">
                            <Lock className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>
                    <div className="mt-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-white/50 shadow-sm">
                        <span className="text-xs font-bold text-blue-900 tracking-widest uppercase">Credential Locked</span>
                    </div>
                </div>
            </div>

            {/* RIGHT: Progress Timeline */}
            <div className="md:w-2/5 p-10 bg-white flex flex-col justify-center relative">
                
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <Award size={150} />
                </div>

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Unlock Your Certificate</h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Your verified credential is waiting. Track your progress below.
                    </p>

                    {/* Timeline */}
                    <div className="space-y-0">
                        
                        {/* Step 1: Done */}
                        <div className="flex gap-4 pb-8 relative">
                            <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm z-10">
                                    <CheckCircle2 size={18} />
                                </div>
                                <div className="h-full w-0.5 bg-green-100 absolute top-8 left-4 -ml-[1px]"></div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm">Enrollment Confirmed</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Account active & verified.</p>
                            </div>
                        </div>

                        {/* Step 2: Active */}
                        <div className="flex gap-4 pb-8 relative">
                             <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md z-10 animate-pulse">
                                    <Clock size={18} />
                                </div>
                                <div className="h-full w-0.5 bg-gray-100 absolute top-8 left-4 -ml-[1px]"></div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-blue-600 text-sm">Coursework in Progress</h4>
                                <p className="text-xs text-gray-500 mt-0.5">Complete all lessons and quizzes.</p>
                                {/* Mini Status Bar */}
                                <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Locked */}
                        <div className="flex gap-4">
                             <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-300 flex items-center justify-center border border-gray-100 z-10">
                                    <Circle size={18} />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-400 text-sm">Certification Issued</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Downloadable PDF & Verification ID.</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
                        <span className="text-sm font-medium text-blue-800">Status: Learning in Progress</span>
                    </div>

                </div>
            </div>
        </div>
      </div>
    );

  // 🟩 CERTIFICATE DISPLAY (UNCHANGED)
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-10 px-4 overflow-x-hidden">
      
      {/* Scrollable Container */}
      <div className="w-full max-w-5xl overflow-x-auto pb-8 px-2 flex justify-center">
        
        {/* CERTIFICATE */}
        <div
            ref={certificateRef}
            className="relative bg-white text-center shadow-2xl flex-shrink-0"
            style={{
                width: "900px",
                height: "636px",
                padding: "40px",
                border: "10px solid #1e40af"
            }}
        >
            <div className="w-full h-full border-2 border-yellow-500 p-8 flex flex-col items-center relative">
                
                {/* Watermark */}
                <img
                    src="/images/logos/logog.png"
                    alt="Watermark"
                    className="absolute inset-0 w-80 opacity-[0.05] m-auto select-none pointer-events-none"
                    style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                />

                {/* Header */}
                <div className="mt-4">
                    <h2 className="text-xl font-bold text-blue-800 tracking-[0.2em] uppercase font-serif">
                        Focsera Skill Division
                    </h2>
                    <div className="w-16 h-1 bg-yellow-500 mx-auto mt-2 mb-8"></div>
                    
                    <h1 className="text-5xl font-serif text-gray-900 mb-2">
                        Certificate of Completion
                    </h1>
                    <p className="text-gray-500 italic font-serif">This certificate is proudly presented to</p>
                </div>

                {/* Name */}
                <div className="flex-1 flex flex-col justify-center py-2">
                    <h2 
                        className="text-6xl text-blue-700 mb-2 capitalize"
                        style={{ fontFamily: "'Great Vibes', cursive" }}
                    >
                        {user ? user.email.split("@")[0] : "Student Name"}
                    </h2>
                    <div className="w-2/3 h-px bg-gray-300 mx-auto"></div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto font-serif mb-8">
                    For successfully completing the comprehensive course requirements for <br />
                    <span className="font-bold text-black text-xl">"{program.program_name}"</span> <br />
                    demonstrating proficiency and dedication.
                </p>

                {/* Footer */}
                <div className="w-full flex justify-between items-end px-12 mt-auto">
                    <div className="text-left">
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Date</p>
                        <p className="font-serif text-lg border-b border-gray-400 pb-1 min-w-[120px]">
                            {new Date(program.completion_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">ID: {program.certificate_id}</p>
                    </div>

                    {qrCodeUrl && (
                        <div className="flex flex-col items-center">
                             <img src={qrCodeUrl} alt="QR" className="w-20 h-20 border-2 border-white shadow-sm" />
                             <span className="text-[10px] text-gray-400 mt-1 tracking-widest uppercase">Verified</span>
                        </div>
                    )}

                    <div className="text-center">
                         <img
                            src="/images/signature1.png"
                            alt="Signature"
                            className="h-12 mx-auto opacity-90 mb-[-10px]"
                        />
                        <div className="w-40 h-px bg-gray-400 mt-2 mb-1 mx-auto"></div>
                        <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Director</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-3xl">
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-full flex items-center gap-2 shadow-lg transition transform hover:-translate-y-1"
        >
          <Download size={20} /> Download PDF/PNG
        </button>

        <button
          onClick={() => shareCertificate("linkedin")}
          className="px-6 py-3 bg-[#0A66C2] hover:bg-[#094b8f] text-white font-semibold rounded-full flex items-center gap-2 shadow-md transition"
        >
          <Share2 size={18} /> LinkedIn
        </button>
      </div>
    </div>
  );
}
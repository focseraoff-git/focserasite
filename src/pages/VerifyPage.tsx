// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { lmsSupabaseClient } from "../lib/ssupabase";
import QRCode from "qrcode";

export default function VerifyPage() {
  const { userId } = useParams();
  const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
  const [certificate, setCertificate] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const verifyCertificate = async () => {
      if (!userId) return;

      const { data, error } = await lmsSupabaseClient
        .from("user_programs")
        .select("program_name, completion_date, user_id, users (email)")
        .eq("user_id", userId)
        .order("completion_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) {
        setStatus("invalid");
      } else {
        setCertificate(data);
        const verifyUrl = `${window.location.origin}/verify/${userId}`;
        const qr = await QRCode.toDataURL(verifyUrl);
        setQrCodeUrl(qr);
        setStatus("valid");
      }
    };

    verifyCertificate();
  }, [userId]);

  // LOADING STATE
  if (status === "loading")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600 font-medium">Verifying certificate...</p>
      </div>
    );

  // INVALID CERTIFICATE
  if (status === "invalid")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-6">
        <XCircle className="w-16 h-16 text-red-600 mb-3" />
        <h1 className="text-3xl font-bold text-red-700 mb-2">Invalid Certificate</h1>
        <p className="text-gray-600 max-w-md">
          This certificate could not be verified in the Focsera Skill Division database.
        </p>
        <Link
          to="/"
          className="mt-6 px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold"
        >
          Go to Homepage
        </Link>
      </div>
    );

  // VALID CERTIFICATE
  if (status === "valid")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12">
        <CheckCircle className="w-16 h-16 text-green-600 mb-3" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Certificate Verified ✅
        </h1>
        <p className="text-gray-600 mb-10 text-center max-w-md">
          This certificate has been issued by <b>Focsera Skill Division</b> and verified successfully in our records.
        </p>

        {/* Certificate Preview */}
        <div className="relative bg-white border-8 border-blue-600 rounded-3xl shadow-2xl w-full max-w-3xl p-10 text-center overflow-hidden">
          {/* Watermark Logo */}
          <img
            src="/images/logos/logog.png"
            alt="Focsera Logo"
            className="absolute inset-0 w-80 opacity-[0.04] m-auto select-none pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Border Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-[1px] border-blue-200"></div>

          {/* Header */}
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            FOCSERA Skill Division
          </h2>

          <h1 className="text-4xl font-extrabold mb-3 text-gray-800">
            Certificate of Completion
          </h1>

          <p className="text-gray-600 mb-6">
            This is to certify that
          </p>

          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            {certificate.users?.email?.split("@")[0]}
          </h2>

          <p className="text-gray-600">
            has successfully completed the{" "}
            <span className="font-semibold text-blue-600">
              {certificate.program_name}
            </span>{" "}
            course on{" "}
            <span className="font-medium text-gray-800">
              {new Date(certificate.completion_date).toLocaleDateString()}
            </span>.
          </p>

          {/* Footer / Signatures */}
          <div className="mt-12 flex justify-between px-10 text-gray-500">
            <div>
              <div className="h-[1px] bg-gray-400 mb-1"></div>
              <p className="text-sm">Instructor</p>
            </div>
            <div>
              <div className="h-[1px] bg-gray-400 mb-1"></div>
              <p className="text-sm">Authorized Signatory</p>
            </div>
          </div>

          {/* QR Code + ID */}
          {qrCodeUrl && (
            <div className="absolute bottom-8 right-8 text-xs text-gray-500 flex flex-col items-center">
              <img
                src={qrCodeUrl}
                alt="Verification QR"
                className="w-20 h-20 border border-gray-200 rounded-lg"
              />
              <p>Scan to verify</p>
            </div>
          )}
        </div>

        {/* Certificate ID & Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Certificate ID: <b>{certificate.user_id}</b>
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="mt-8 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Back to Focsera
        </Link>
      </div>
    );
}

import { Loader2 } from "lucide-react";
export default function FullPageLoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
    </div>
  );
}

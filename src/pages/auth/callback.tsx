import { useEffect, useRef } from "react";
import AlertHint from "@/components/ui/alert/AlertHint";
import { saveAuth } from "@/lib/auth-storage";

export default function AuthCallback() {
  const didSave = useRef(false);

  useEffect(() => {
    if (didSave.current) return;
    didSave.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return;

    saveAuth({ apiToken: token, apiUrl: import.meta.env.VITE_API_URL });
    window.location.replace("/");
  }, []);

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sidebar">
        <AlertHint
          title="Login failed"
          description="No token received"
        />
      </div>
    );
  }

  return null;
}

import { useEffect, useRef } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthCallback() {
  const didSave = useRef(false);
  const addToken = useAuth().addToken;

  useEffect(() => {
    if (didSave.current) return;
    didSave.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return;

    const apiUrl = import.meta.env.VITE_API_URL;
    addToken("default", token, apiUrl);
    window.location.href = "/";
  }, [addToken]);

  return null;
}

import { useEffect, useRef, useState } from "react";

export function useCopyEmail(email: string) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef(0);
  useEffect(() => {
    return () => {
      request.current++;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const copyEmail = async () => {
    const current = ++request.current;
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      if (current !== request.current) return;
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      if (current === request.current) setStatus("failed");
    }
  };
  return {
    copied: status === "copied",
    copyFailed: status === "failed",
    copyEmail,
  };
}

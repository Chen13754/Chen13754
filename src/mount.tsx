import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "./styles.css";
export function mount(page: ReactNode) {
  const root = document.getElementById("root");
  if (!root) throw new Error("Missing application root");
  createRoot(root).render(<StrictMode>{page}</StrictMode>);
}

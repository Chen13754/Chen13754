export type Page = "home" | "cv";
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
export const navigation = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Contact" },
] as const;

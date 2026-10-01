import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/Chen13754/",
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.tsx"],
  },
});

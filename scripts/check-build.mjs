import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const output = resolve("dist");
const manifest = JSON.parse(
  readFileSync(resolve(output, ".vite/manifest.json"), "utf8"),
);
function pageAssets(entry) {
  const files = new Set();
  const visited = new Set();
  const visit = (key) => {
    if (visited.has(key)) return;
    visited.add(key);
    const chunk = manifest[key];
    assert(chunk, `Missing build entry: ${key}`);
    files.add(chunk.file);
    (chunk.css ?? []).forEach((file) => files.add(file));
    (chunk.imports ?? []).forEach(visit);
  };
  visit(entry);
  return [...files];
}

const metrics = {};
for (const [page, entry] of [
  ["home", "index.html"],
  ["cv", "cv/index.html"],
]) {
  const html = readFileSync(resolve(output, entry), "utf8");
  assert(
    !html.includes("/node_modules/"),
    "Source font paths must be rewritten for production",
  );
  for (const [, asset] of html.matchAll(
    /(?:href|src)="(\/Chen13754\/[^"#]+)"/g,
  )) {
    readFileSync(resolve(output, asset.slice("/Chen13754/".length)));
  }
  const files = pageAssets(entry).filter((file) => file.endsWith(".js"));
  const buffers = files.map((file) => readFileSync(resolve(output, file)));
  metrics[page] = {
    files,
    bytes: buffers.reduce((sum, buffer) => sum + buffer.length, 0),
    gzipBytes: buffers.reduce(
      (sum, buffer) => sum + gzipSync(buffer).length,
      0,
    ),
  };
  if (page === "home") {
    assert(
      !files.includes(manifest["cv/index.html"].file),
      "Homepage must not download the CV entry",
    );
    assert(
      !buffers.some((buffer) => buffer.includes("Agent-Guided Real-to-Sim")),
      "CV research data must stay out of the homepage bundle",
    );
  }
}
console.log(
  "Production entries, assets, font preloads and page separation verified.",
);
console.log(JSON.stringify(metrics, null, 2));

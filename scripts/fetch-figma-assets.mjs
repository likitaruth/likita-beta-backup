// Downloads raster/illustration assets exported from Figma into public/assets.
// `npm run assets` fails loudly; predev/prebuild run it with --soft (never blocks the build).
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const soft = process.argv.includes("--soft");
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "assets");
const { assets } = JSON.parse(await readFile(path.join(root, "scripts", "asset-manifest.json"), "utf8"));
await mkdir(outDir, { recursive: true });

// A placeholder marker means the real file has not been downloaded yet.
let placeholders = false;
try { await access(path.join(outDir, ".placeholder")); placeholders = true; } catch {}

let failed = 0;
for (const a of assets) {
  const dest = path.join(outDir, a.file);
  let exists = false;
  try { await access(dest); exists = true; } catch {}
  if (exists && !placeholders) { console.log(`✓ ${a.file}`); continue; }
  try {
    const res = await fetch(a.url, { redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`↓ ${a.file}`);
  } catch (err) {
    if (!exists) failed++;
    console.warn(`✗ ${a.file} — ${err.message}${exists ? " (keeping placeholder)" : ""}. Export node ${a.node} from Figma into public/assets/${a.file}`);
  }
}
if (failed && !soft) process.exit(1);

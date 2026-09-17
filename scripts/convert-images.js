/**
 * scripts/convert-images.js  (ESM — project is "type": "module")
 *
 * For every PNG in public/mock/ + public/logo.png, generates AVIF and WebP
 * variants at 1x and 2x display density using sharp (bundles its own
 * libavif/libwebp — no Homebrew required).
 *
 * PNG originals are kept as the final <img> fallback.
 *
 * Run: npm run imgs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MOCK_DIR = path.join(ROOT, "public", "mock");
const LOGO = path.join(ROOT, "public", "logo.png");

// 1x display width each image renders at in the CSS layout.
// Sources larger than the chosen width are downscaled; sources smaller are
// kept at native (no upscale) via sharp's withoutEnlargement.
const DISPLAY_W = {
  "mobile-register": 272,
  "tablet-register": 540,
  "desktop-register": 568,
  register: 270,
  client: 270,
  credit: 270,
  stock: 270,
  "client-equity": 270,
  logo: 320,
};

const QUALITY = { avif: 85, webp: 82 };

function widthsFor(name, naturalWidth) {
  const oneX = DISPLAY_W[name] ?? Math.min(naturalWidth, 1600);
  const twoX = oneX * 2;
  return { oneX: Math.min(oneX, naturalWidth), twoX: Math.min(twoX, naturalWidth) };
}

async function convert(filePath, base, name) {
  const buf = fs.readFileSync(filePath);
  const meta = await sharp(buf).metadata();
  const dims = widthsFor(name, meta.width ?? 0);
  const pngKB = (buf.length / 1024).toFixed(0);
  console.log(`  ${path.basename(filePath)}  (${meta.width}x${meta.height}, ${pngKB} KB PNG) -> ${dims.oneX}w / ${dims.twoX}w`);

  for (const fmt of ["avif", "webp"]) {
    for (const [tag, w] of [["", dims.oneX], ["@2x", dims.twoX]]) {
      const out = `${base}${tag}.${fmt}`;
      await sharp(buf)
        .resize({ width: w, withoutEnlargement: true })
        .toFormat(fmt, { quality: QUALITY[fmt] })
        .toFile(out);
      const size = (fs.statSync(out).size / 1024).toFixed(0);
      console.log(`    -> ${fmt}${tag || " (1x)"}: ${size} KB  (${w}w)`);
    }
  }
}

async function main() {
  console.log("-> Converting mockups in public/mock/");
  if (fs.existsSync(MOCK_DIR)) {
    for (const name of fs.readdirSync(MOCK_DIR).filter((n) => n.endsWith(".png"))) {
      const key = name.replace(/\.png$/i, "");
      const full = path.join(MOCK_DIR, name);
      await convert(full, full.replace(/\.png$/i, ""), key);
    }
  }
  console.log("-> Converting logo");
  if (fs.existsSync(LOGO)) await convert(LOGO, LOGO.replace(/\.png$/i, ""), "logo");
  console.log("done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

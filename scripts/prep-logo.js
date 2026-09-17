/**
 * One-off logo prep (ESM). Reads the gold-on-black source from Downloads,
 * keys out the background with edge decontamination, tight-crops, and writes:
 *   public/logo.png            full lockup, transparent (used by nav + footer)
 *   public/favicon-32.png      K lettermark on dark rounded tile
 *   public/favicon.png         same at 64px
 *   public/apple-touch-icon.png same at 180px
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = "/Users/fenleymenelas/Downloads/kourro-logo.png";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

async function loadRaw(p) {
  const img = sharp(p);
  const meta = await img.metadata();
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height, ch: info.channels };
}

// sample background color from image corners/edges (assumed bg)
function sampleBg(data, w, h, ch) {
  const pts = [];
  const inset = (f) => Math.floor(f);
  for (let x = 0; x < w; x += 7) { pts.push([x, 2]); pts.push([x, h - 3]); }
  for (let y = 0; y < h; y += 7) { pts.push([2, y]); pts.push([w - 3, y]); }
  let r = 0, g = 0, b = 0;
  for (const [x, y] of pts) {
    const i = (y * w + x) * ch;
    r += data[i]; g += data[i + 1]; b += data[i + 2];
  }
  const n = pts.length;
  return [r / n, g / n, b / n];
}

function keyOut({ data, w, h, ch }) {
  const [br, bg, bb] = sampleBg(data, w, h, ch);
  console.log(`  bg sample: rgb(${br.toFixed(1)}, ${bg.toFixed(1)}, ${bb.toFixed(1)})`);
  const out = Buffer.from(data);
  for (let i = 0; i < w * h; i++) {
    const o = i * ch;
    const r = data[o], g = data[o + 1], b = data[o + 2];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    const chroma = mx - mn;
    // gold text is bright and/or strongly chromatic; bg is dark + neutral
    const aLum = (mx - 14) / 70;
    const aChr = (chroma - 28) / 70;
    let a = clamp(Math.max(aLum, aChr), 0, 1);
    if (a <= 0) { out[o + 3] = 0; continue; }
    if (a >= 1) { out[o + 3] = 255; continue; }
    // decontaminate: undo bg blend so edges stay gold on light grounds
    const ia = 1 - a;
    out[o] = clamp(Math.round((r - br * ia) / a), 0, 255);
    out[o + 1] = clamp(Math.round((g - bg * ia) / a), 0, 255);
    out[o + 2] = clamp(Math.round((b - bb * ia) / a), 0, 255);
    out[o + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: w, height: h, channels: ch } });
}

async function alphaBBox(imgSharp) {
  const { data, info } = await imgSharp.clone().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) if (data[y * w + x] > 10) row++;
    if (row < w * 0.01) continue;
    if (y < y0) y0 = y; if (y > y1) y1 = y;
    for (let x = 0; x < w; x++) {
      if (data[y * w + x] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; }
    }
  }
  return { x0, y0, x1, y1 };
}

// drop isolated speck components (bg noise) from the alpha channel in place
async function despeckle(imgSharp, minArea = 60) {
  const { data, info } = await imgSharp.clone().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const seen = new Uint8Array(w * h);
  const stack = [];
  for (let s = 0; s < w * h; s++) {
    if (seen[s] || data[s] <= 10) continue;
    // flood-fill one component
    const comp = [];
    stack.push(s);
    seen[s] = 1;
    while (stack.length) {
      const p = stack.pop();
      comp.push(p);
      const x = p % w, y = (p / w) | 0;
      if (x > 0 && !seen[p - 1] && data[p - 1] > 10) { seen[p - 1] = 1; stack.push(p - 1); }
      if (x < w - 1 && !seen[p + 1] && data[p + 1] > 10) { seen[p + 1] = 1; stack.push(p + 1); }
      if (y > 0 && !seen[p - w] && data[p - w] > 10) { seen[p - w] = 1; stack.push(p - w); }
      if (y < h - 1 && !seen[p + w] && data[p + w] > 10) { seen[p + w] = 1; stack.push(p + w); }
    }
    if (comp.length < minArea) for (const p of comp) data[p] = 0;
  }
  let removed = 0;
  return { alpha: data, w, h };
}

async function main() {
  const raw = await loadRaw(SRC);
  console.log(`  source: ${raw.w}x${raw.h}`);
  const keyed = keyOut(raw);
  // rejoin RGB with despeckled alpha
  const rgbPart = await keyed.clone().removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { alpha, w, h } = await despeckle(keyed);
  const joined = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    joined[i * 4] = rgbPart.data[i * 3];
    joined[i * 4 + 1] = rgbPart.data[i * 3 + 1];
    joined[i * 4 + 2] = rgbPart.data[i * 3 + 2];
    joined[i * 4 + 3] = alpha[i];
  }
  const clean = sharp(joined, { raw: { width: w, height: h, channels: 4 } });
  const box = await alphaBBox(clean);
  console.log(`  content bbox: x ${box.x0}-${box.x1}, y ${box.y0}-${box.y1}`);
  const pad = Math.round((box.x1 - box.x0) * 0.015);
  const exLeft = clamp(box.x0 - pad, 0, w - 1);
  const exTop = clamp(box.y0 - pad, 0, h - 1);
  const ex = {
    left: exLeft,
    top: exTop,
    width: Math.min(box.x1 - box.x0 + pad * 2, w - exLeft),
    height: Math.min(box.y1 - box.y0 + pad * 2, h - exTop),
  };
  const lockup = clean.extract(ex);
  const lockMeta = await lockup.toBuffer({ resolveWithObject: true }).then(({ info }) => info);
  console.log(`  lockup: ${lockMeta.width}x${lockMeta.height}`);
  await lockup.clone().png({ compressionLevel: 9 }).toFile(path.join(ROOT, "public", "logo.png"));
  console.log("  -> public/logo.png");

  // ---- K lettermark: isolate wordmark band, take first glyph cluster ----
  const { data, info } = await lockup.clone().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const rowSum = new Array(H).fill(0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) rowSum[y] += data[y * W + x] > 10 ? 1 : 0;
  // wordmark = top dense band; tagline = lower sparse band. Split at the biggest empty gap.
  let gapStart = -1, bestGap = -1, bestLen = 0;
  for (let y = 0; y < H; y++) {
    if (rowSum[y] < W * 0.02) { if (gapStart < 0) gapStart = y; }
    else { if (gapStart >= 0 && y - gapStart > bestLen) { bestLen = y - gapStart; bestGap = gapStart; } gapStart = -1; }
  }
  const bandBottom = bestGap > 0 ? bestGap : H;
  // column runs inside the band; first wide run = K
  const colSum = new Array(W).fill(0);
  for (let y = 0; y < bandBottom; y++) for (let x = 0; x < W; x++) colSum[x] += data[y * W + x] > 10 ? 1 : 0;
  const runs = [];
  let rs = -1;
  for (let x = 0; x <= W; x++) {
    const on = x < W && colSum[x] > 2;
    if (on && rs < 0) rs = x;
    if (!on && rs >= 0) { runs.push([rs, x - 1]); rs = -1; }
  }
  const wide = runs.filter(([a, b]) => b - a > W * 0.015);
  const [kx0, kx1] = wide[0];
  // split K from the following O at the deepest column valley in the run
  let kxEnd = kx1, minV = Infinity;
  for (let x = kx0 + 10; x <= kx1; x++) {
    if (colSum[x] < minV) { minV = colSum[x]; kxEnd = x; }
  }
  const peak = Math.max(...colSum.slice(kx0, kx1 + 1));
  if (minV > peak * 0.15) kxEnd = kx1; // no real valley — keep whole run
  while (kxEnd > kx0 && colSum[kxEnd] <= 5) kxEnd--;
  console.log(`  band bottom: ${bandBottom}/${H}, K run: x ${kx0}-${kx1} -> split ${kx0}-${kxEnd}`);
  const kPadL = Math.round((kxEnd - kx0) * 0.18);
  const kPadR = 4;
  const kLeft = Math.max(0, kx0 - kPadL);
  const kCrop = await lockup
    .extract({ left: kLeft, top: 0, width: kxEnd + kPadR - kLeft, height: bandBottom })
    .png()
    .toBuffer();
  const kMeta = await sharp(kCrop).metadata();

  // square dark rounded tile + gold K
  async function tile(size, dest) {
    const side = size;
    const radius = Math.round(size * 0.22);
    const tileBg = Buffer.from(
      `<svg width="${side}" height="${side}"><rect width="${side}" height="${side}" rx="${radius}" fill="#14110b"/></svg>`
    );
    const kSide = Math.round(size * 0.72);
    const kResized = await sharp(kCrop).resize({ width: kSide, height: Math.round((kSide * kMeta.height) / kMeta.width), fit: "inside" }).toBuffer();
    const kInfo = await sharp(kResized).metadata();
    await sharp(tileBg)
      .composite([{ input: kResized, left: Math.round((side - kInfo.width) / 2), top: Math.round((side - kInfo.height) / 2) }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(ROOT, "public", dest));
    console.log(`  -> public/${dest} (${side}x${side})`);
  }
  await tile(32, "favicon-32.png");
  await tile(64, "favicon.png");
  await tile(180, "apple-touch-icon.png");
  console.log("done.");
}

main().catch((e) => { console.error(e); process.exit(1); });

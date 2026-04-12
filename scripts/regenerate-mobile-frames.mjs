import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public/frames");
const SRC_DIR = ROOT;
const OUT_DIR = path.join(ROOT, "xs");
const TARGET_WIDTH = 896;
const QUALITY = 72;
const MOBILE_COUNT = 31;

async function run() {
  await mkdir(OUT_DIR, { recursive: true });

  const all = (await readdir(SRC_DIR))
    .filter((f) => /^frame_\d{4}\.webp$/.test(f))
    .sort();

  if (all.length === 0) {
    throw new Error(`No source frames found in ${SRC_DIR}`);
  }

  const step = (all.length - 1) / (MOBILE_COUNT - 1);
  let totalBytes = 0;

  for (let i = 0; i < MOBILE_COUNT; i++) {
    const srcIdx = Math.round(i * step);
    const srcFile = all[srcIdx];
    const outName = `frame_${String(i + 1).padStart(4, "0")}.webp`;
    const outPath = path.join(OUT_DIR, outName);

    await sharp(path.join(SRC_DIR, srcFile))
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(outPath);

    const { size } = await stat(outPath);
    totalBytes += size;
    console.log(
      `  ${outName}  <- ${srcFile}  ${(size / 1024).toFixed(1)} KB`,
    );
  }

  console.log(
    `\n${MOBILE_COUNT} frames, total ${(totalBytes / 1024).toFixed(0)} KB`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

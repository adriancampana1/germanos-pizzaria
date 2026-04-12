import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "public/images");

const LOGO = {
  src: "germanos.png",
  outputs: [
    { name: "germanos.webp", width: 240, quality: 85 },
  ],
};

const FOOD = [
  "marguerita",
  "bolonhesa",
  "bacon",
  "confeti",
  "dois-amores",
  "ouro-branco",
].map((slug) => ({
  src: `${slug}.webp`,
  outputs: [
    { name: `${slug}-sm.webp`, width: 1200, quality: 72 },
  ],
}));

const HERO = {
  src: "frente-pizzaria.webp",
  outputs: [
    { name: "frente-pizzaria-sm.webp", width: 1200, quality: 72 },
  ],
};

const TARGETS = [LOGO, ...FOOD, HERO];

async function run() {
  await mkdir(ROOT, { recursive: true });

  for (const target of TARGETS) {
    const srcPath = path.join(ROOT, target.src);
    try {
      await stat(srcPath);
    } catch {
      console.warn(`! missing source: ${target.src} — skipping`);
      continue;
    }

    for (const out of target.outputs) {
      const outPath = path.join(ROOT, out.name);
      await sharp(srcPath)
        .resize({ width: out.width, withoutEnlargement: true })
        .webp({ quality: out.quality, effort: 6, smartSubsample: true })
        .toFile(outPath);
      const { size } = await stat(outPath);
      console.log(`  ${out.name.padEnd(34)} ${out.width.toString().padStart(4)}w  ${(size / 1024).toFixed(1)} KB`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

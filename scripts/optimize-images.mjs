import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIRS = [
  path.resolve(process.cwd(), "assets"),
  path.resolve(process.cwd(), "public/assets/raw"),
  path.resolve(process.cwd(), "public/assets"),
];

const TARGET_DIR = path.resolve(process.cwd(), "public/assets");
const MAX_FILE_SIZE_BYTES = 100 * 1024; // 100 KB target threshold
const MAX_DIMENSION = 1600; // Optimal desktop width

const SUPPORTED_EXTS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".tiff",
]);

// Map descriptive user titles to canonical service asset names
const SERVICE_ALIASES = {
  "modern digital agency hero mockup": ["website-design", "web-engineering"],
  "social media campaign analytics workspace": ["meta-ads"],
  "meta ads analytics growth dashboard": ["meta-ads", "paid-advertising"],
  "meta ads": ["meta-ads"],
  "meta-ads": ["meta-ads"],
  "dental seo search results mockup": ["google-ads"],
  "google search growth dashboard": ["google-ads"],
  "google ads": ["google-ads"],
  "google-ads": ["google-ads"],
  "whatsapp lead automation workflow": ["ai-automation"],
  "business automation": ["ai-automation"],
  "ai automation": ["ai-automation"],
  "ai-automation": ["ai-automation"],
  "workflow automation": ["ai-automation"],
  "automate media brand guidelines mockup": ["graphic-design"],
  "graphic design": ["graphic-design"],
  "graphic-design": ["graphic-design"],
  "neon ai video editing studio": ["ai-video"],
  "futuristic video creation studio": ["ai-video"],
  "ai video": ["ai-video"],
  "ai-video": ["ai-video"],
  "ai video generation": ["ai-video"],
};

async function processBuffer(pipeline, initialSize) {
  let quality = 84;
  let buffer = await pipeline
    .clone()
    .webp({ quality, effort: 6 })
    .toBuffer();

  while (buffer.length > MAX_FILE_SIZE_BYTES && quality > 30) {
    quality -= 6;
    buffer = await pipeline
      .clone()
      .webp({ quality, effort: 6 })
      .toBuffer();
  }

  return { buffer, quality };
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTS.has(ext)) return;

  const baseName = path.basename(filePath, ext);
  // Avoid re-optimizing existing optimized webp files unless raw source changed
  if (ext === ".webp" && filePath.startsWith(TARGET_DIR)) {
    return;
  }

  const initialStat = fs.statSync(filePath);
  const initialSizeKb = (initialStat.size / 1024).toFixed(1);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = sharp(filePath);

    // Resize if dimensions exceed 1600px
    if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
      pipeline = pipeline.resize({
        width: metadata.width > metadata.height ? MAX_DIMENSION : undefined,
        height: metadata.height >= metadata.width ? MAX_DIMENSION : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    const { buffer, quality } = await processBuffer(pipeline, initialStat.size);
    const finalSizeKb = (buffer.length / 1024).toFixed(1);
    const savedPct = (
      ((initialStat.size - buffer.length) / initialStat.size) *
      100
    ).toFixed(0);

    // Determine target filenames: base name plus any service aliases
    const targets = new Set([baseName]);
    const normalized = baseName.trim().toLowerCase();
    if (SERVICE_ALIASES[normalized]) {
      for (const alias of SERVICE_ALIASES[normalized]) {
        targets.add(alias);
      }
    }

    for (const targetName of targets) {
      const outPath = path.join(TARGET_DIR, `${targetName}.webp`);
      fs.writeFileSync(outPath, buffer);
      console.log(
        `✓ [OPTIMIZED] ${path.basename(filePath)} (${initialSizeKb} KB) -> ${path.basename(
          outPath
        )} (${finalSizeKb} KB) [Quality: ${quality}%, Saved: ${savedPct}%]`
      );
    }

    // If a raw image was in public/assets/, move it to assets/ to keep public/assets clean
    if (filePath.startsWith(TARGET_DIR) && ext !== ".webp") {
      const destPath = path.join(path.resolve(process.cwd(), "assets"), path.basename(filePath));
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(filePath, destPath);
      }
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error(`✕ Error optimizing ${filePath}:`, err.message);
  }
}

async function run() {
  console.log("🔍 Scanning assets folders for uploaded images...");
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  let count = 0;
  for (const dir of SOURCE_DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        await optimizeImage(fullPath);
        count++;
      }
    }
  }

  if (count === 0) {
    console.log("ℹ No raw images found yet. Place your images in ./assets/ or public/assets/raw/");
  } else {
    console.log(`✨ Processed images into ${TARGET_DIR}`);
  }
}

const isWatch = process.argv.includes("--watch");

if (isWatch) {
  run().then(() => {
    console.log("👀 Watching for new image uploads in ./assets/ ... (Press Ctrl+C to stop)");
    const watchDirs = [
      path.resolve(process.cwd(), "assets"),
      path.resolve(process.cwd(), "public/assets/raw"),
    ];
    for (const dir of watchDirs) {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.watch(dir, (eventType, filename) => {
        if (filename && eventType === "rename") {
          const filePath = path.join(dir, filename);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            console.log(`📥 Detected new upload: ${filename}`);
            setTimeout(() => optimizeImage(filePath), 300);
          }
        }
      });
    }
  });
} else {
  run();
}

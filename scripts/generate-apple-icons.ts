import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ICON_SIZES = [
  { size: 180, name: "apple-touch-icon.png" }, // iPhone Retina
  { size: 167, name: "apple-touch-icon-167x167.png" }, // iPad Retina
  { size: 152, name: "apple-touch-icon-152x152.png" }, // iPad
  { size: 120, name: "apple-touch-icon-120x120.png" }, // iPhone
];

async function generateImages(imagePath: string, outputDir: string) {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    const maxSize = Math.max(...ICON_SIZES.map((size) => size.size));
    if (metadata.width! < maxSize || metadata.height! < maxSize) {
      throw new Error("Image is too small");
    }
    const generatePromises = ICON_SIZES.map(async ({ size, name }) => {
      const outputPath = path.join(outputDir, name);
      await image
        .clone()
        .resize(size, size, {
          fit: "cover",
          position: "center",
        })
        .toFormat("png")
        .toFile(outputPath);
      console.log(`Generated: ${name} (${size}x${size})`);
    });
    await Promise.all(generatePromises);
    console.log("All images generated successfully");
    const metaTags = ICON_SIZES.map(({ size, name }) => {
      return `<link rel="apple-touch-icon" sizes="${size}x${size}" href={new URL('path/to/${name}', Astro.url)} />`;
    }).join("\n");
    console.log("-- COPY AND PASTE THESE META TAGS INTO BaseHead.astro! --");
    console.log(metaTags);
    console.log("-- BE SURE TO REPLACE \"path/to/\" WITH THE REAL PATH --");
    console.log("-- END --");
  } catch (e: Error | unknown) {
    console.error(
      "Failed to generate images",
      (e as Error)?.message ?? "Unknown error",
    );
  }
}
// Check if correct arguments are provided
if (process.argv.length !== 4) {
  console.log(
    "Usage: tsx generate-apple-icons.ts path/to/image.png path/to/outputDir",
  );
  process.exit(1);
}

const inputPath = process.argv[2];
const outputDir = process.argv[3];

generateImages(inputPath, outputDir);

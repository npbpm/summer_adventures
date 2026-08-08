import tailwind from "bun-plugin-tailwind";
import { rm, readdir, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const outdir = path.join(process.cwd(), "dist");
await rm(outdir, { recursive: true, force: true });

const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()];

const result = await Bun.build({
  entrypoints,
  outdir,
  plugins: [tailwind],
  minify: true,
  target: "browser",
  sourcemap: "linked",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

for (const output of result.outputs) {
  console.log(
    ` ${path.relative(process.cwd(), output.path)}  ${(output.size / 1024).toFixed(1)} KB`,
  );
}

// Copy drawing PNGs into the dist/images folder preserving filenames
const imagesSrc = path.join(process.cwd(), "src", "assets", "DrawingsImages");
const imagesDest = path.join(outdir, "images");
try {
  await rm(imagesDest, { recursive: true, force: true });
  await mkdir(imagesDest, { recursive: true });
  const files = await readdir(imagesSrc);
  for (const f of files) {
    if (
      f.endsWith(".png") ||
      f.endsWith(".jpg") ||
      f.endsWith(".jpeg") ||
      f.endsWith(".webp")
    ) {
      await copyFile(path.join(imagesSrc, f), path.join(imagesDest, f));
      console.log(` copied images/${f}`);
    }
  }
} catch (e) {
  console.warn(
    "No DrawingsImages folder found or copy failed:",
    e.message || e,
  );
}

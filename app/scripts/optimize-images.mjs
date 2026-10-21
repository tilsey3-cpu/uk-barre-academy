// Generates AVIF + WebP variants of every JPG in public/media and writes
// src/media-manifest.json for the <Picture> component. Run with `npm run images`
// after adding or replacing photography; the output is committed.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'public/media';
const OUT = 'public/media/opt';
const STEPS = [480, 800, 1200, 1600, 1920];
const MAX = 2400; // largest variant: the original's full width, up to this cap (sharp on retina screens)

const exists = (p) => access(p).then(() => true, () => false);

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg')).sort();
const manifest = {};

for (const file of files) {
  const name = file.replace(/\.jpg$/, '');
  const input = path.join(SRC, file);
  const { width, height } = await sharp(input).metadata();
  const max = Math.min(width, MAX);
  const widths = STEPS.filter((w) => w < max).concat(max);

  for (const w of widths) {
    const avif = path.join(OUT, `${name}-${w}.avif`);
    const webp = path.join(OUT, `${name}-${w}.webp`);
    if (!(await exists(avif))) await sharp(input).resize({ width: w }).avif({ quality: 62, effort: 6 }).toFile(avif);
    if (!(await exists(webp))) await sharp(input).resize({ width: w }).webp({ quality: 80 }).toFile(webp);
  }
  manifest[name] = { width, height, widths };
  console.log(`${name}: ${widths.join(', ')}`);
}

await writeFile('src/media-manifest.json', JSON.stringify(manifest, null, 2) + '\n');

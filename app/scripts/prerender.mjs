// Renders every route to static HTML after `vite build`, so all copy is in the HTML for
// search engines and link previews. The client bundle then hydrates the page.
import { readFile, writeFile, rm } from 'node:fs/promises';

const { render, PAGES } = await import('../dist-ssr/entry-server.js');
const manifest = JSON.parse(await readFile('src/media-manifest.json', 'utf8'));

// Vercel preview builds point link previews (og:url, og:image) at the preview itself.
const siteUrl =
  process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL
    ? `https://${process.env.VERCEL_BRANCH_URL}`
    : 'https://ukbarreacademy.com';

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const poster = 'uba-hero-poster-1080';
const posterSet = manifest[poster].widths.map((w) => `./media/opt/${poster}-${w}.avif ${w}w`).join(', ');
const heroPreload = `<link rel="preload" as="image" type="image/avif" imagesrcset="${posterSet}" imagesizes="(max-width: 760px) 200vw, 100vw" fetchpriority="high">`;

const template = await readFile('dist/index.html', 'utf8');

for (const [page, meta] of Object.entries(PAGES)) {
  const html = template
    .replace('<!--app-html-->', render(page))
    .replace('<!--hero-preload-->', page === 'home' ? heroPreload : '')
    .replaceAll('%PAGE%', page)
    .replaceAll('%TITLE%', attr(meta.title))
    .replaceAll('%DESCRIPTION%', attr(meta.description))
    .replaceAll('%PATH%', meta.path)
    .replaceAll('%SITE_URL%', siteUrl);

  if (/coming soon/i.test(html)) throw new Error(`"coming soon" copy found in ${meta.file}`);
  if (/%[A-Z_]+%/.test(html)) throw new Error(`unfilled placeholder in ${meta.file}`);
  await writeFile(`dist/${meta.file}`, html);
  console.log(`Pre-rendered dist/${meta.file} (${Math.round(html.length / 1024)} KB)`);
}

await rm('dist-ssr', { recursive: true, force: true });
console.log(`og:url base: ${siteUrl}`);

// Renders every route to static HTML after `vite build`, so all copy is in the HTML for
// search engines and link previews. The client bundle then hydrates the page.
import { readFile, writeFile, rm } from 'node:fs/promises';

const { render, PAGES, homeJsonLd, jsonLdScript, llmsTxt } = await import('../dist-ssr/entry-server.js');
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
    .replace('<!--json-ld-->', page === 'home' ? jsonLdScript(homeJsonLd()) : '')
    .replaceAll('%PAGE%', page)
    .replaceAll('%TITLE%', attr(meta.title))
    .replaceAll('%DESCRIPTION%', attr(meta.description))
    .replaceAll('%PATH%', meta.path)
    .replaceAll('%SITE_URL%', siteUrl);

  // No placeholder "coming soon" copy; the one exception is the announced next-year dates.
  if (/coming soon/i.test(html.replace(/New \d{4} dates coming soon/g, ''))) throw new Error(`"coming soon" copy found in ${meta.file}`);
  if (/%[A-Z_]+%/.test(html)) throw new Error(`unfilled placeholder in ${meta.file}`);
  await writeFile(`dist/${meta.file}`, html);
  console.log(`Pre-rendered dist/${meta.file} (${Math.round(html.length / 1024)} KB)`);
}

// Sitemap with the build date, so search engines see when pages changed.
const today = new Date().toISOString().slice(0, 10);
// The homepage entry lists its photographs (full-size originals) so they can appear in image search.
const photos = Object.keys(manifest).map((n) => `    <image:image><image:loc>https://ukbarreacademy.com/media/${n}.jpg</image:loc></image:image>`).join('\n');
const urls = Object.entries(PAGES)
  .map(([page, p]) => `  <url><loc>https://ukbarreacademy.com${p.path}</loc><lastmod>${today}</lastmod>${page === 'home' ? `\n${photos}\n  ` : ''}</url>`)
  .join('\n');
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`);

// Plain-language summary for AI assistants, kept in step with site.js.
await writeFile('dist/llms.txt', llmsTxt());
console.log('Wrote dist/sitemap.xml and dist/llms.txt');

await rm('dist-ssr', { recursive: true, force: true });
console.log(`og:url base: ${siteUrl}`);

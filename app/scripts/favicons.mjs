// Generates the favicon set from the original UBA logo artwork (project/assets/UBA-logo-black.png and
// -white.png), resized only: nothing is redrawn. Run with `npm run favicons`; the output is committed.
//   ../assets/favicon.svg            black logo in light mode, white logo in dark mode (transparent)
//   ../assets/favicon-32.png / -96.png, favicon-dark-32.png / -96.png   PNG fallbacks for each scheme
//   public/favicon.ico               16/32/48, for browsers and crawlers that ask for /favicon.ico
//   ../assets/apple-touch-icon.png   180, black logo on white (iOS needs a solid background)
//   ../assets/icon-192.png, icon-512.png, icon-maskable-512.png, public/site.webmanifest
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const BLACK = '../project/assets/UBA-logo-black.png';
const WHITE = '../project/assets/UBA-logo-white.png';
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const PAPER = { r: 255, g: 255, b: 255, alpha: 1 };

// The logo, trimmed to its artwork, centred in a size×size square at `share` of the width.
async function square(src, size, share, background) {
  const logo = await sharp(src).trim().toBuffer();
  const w = Math.round(size * share);
  const fitted = await sharp(logo).resize({ width: w, kernel: 'lanczos3' }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: fitted, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// Tab icons: the logo as large as the square allows.
const TAB = 0.96;
await writeFile('../assets/favicon-32.png', await square(BLACK, 32, TAB, CLEAR));
await writeFile('../assets/favicon-96.png', await square(BLACK, 96, TAB, CLEAR));
await writeFile('../assets/favicon-dark-32.png', await square(WHITE, 32, TAB, CLEAR));
await writeFile('../assets/favicon-dark-96.png', await square(WHITE, 96, TAB, CLEAR));

// Adaptive SVG: the two original logos as images, switched by the browser's colour scheme.
const uri = async (src) => 'data:image/png;base64,' + (await square(src, 256, TAB, CLEAR)).toString('base64');
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256">' +
  '<style>.d{display:none}@media (prefers-color-scheme:dark){.l{display:none}.d{display:inline}}</style>' +
  `<image class="l" width="256" height="256" href="${await uri(BLACK)}"/>` +
  `<image class="d" width="256" height="256" href="${await uri(WHITE)}"/>` +
  '</svg>\n';
await writeFile('../assets/favicon.svg', svg);

// Home-screen and app icons: black logo on white, with breathing room (the OS applies its own mask).
await writeFile('../assets/apple-touch-icon.png', await square(BLACK, 180, 0.8, PAPER));
await writeFile('../assets/icon-192.png', await square(BLACK, 192, 0.8, PAPER));
await writeFile('../assets/icon-512.png', await square(BLACK, 512, 0.8, PAPER));
await writeFile('../assets/icon-maskable-512.png', await square(BLACK, 512, 0.66, PAPER)); // inside the 80% safe zone

// favicon.ico: PNG-compressed 16, 32 and 48 entries (black logo, transparent).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => square(BLACK, s, TAB, CLEAR)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...dir, ...images]));

await writeFile(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'UK Barre Academy',
      short_name: 'UBA',
      description: 'CPD-accredited Barre instructor certification in London.',
      start_url: '/',
      display: 'browser',
      background_color: '#ffffff',
      theme_color: '#0e0d0b',
      icons: [
        { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: '/assets/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        { src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      ],
    },
    null,
    2
  ) + '\n'
);
console.log('favicons written');

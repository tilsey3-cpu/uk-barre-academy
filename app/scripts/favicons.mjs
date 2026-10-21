// Generates the favicon set from the UBA letterform (traced from project/assets/UBA-logo-black.png,
// small "UK BARRE ACADEMY" text removed). Run with `npm run favicons`; the output is committed.
//   ../assets/favicon.svg            adaptive: ink tile in light mode, cream tile in dark mode
//   ../assets/favicon-32.png / -96.png, favicon-dark-32.png / -96.png   PNG fallbacks for each scheme
//   public/favicon.ico               16/32/48, for browsers and crawlers that ask for /favicon.ico
//   ../assets/apple-touch-icon.png   180, full bleed (iOS rounds the corners)
//   ../assets/icon-192.png, icon-512.png, icon-maskable-512.png, public/site.webmanifest
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const LETTERS = 'M 2148.720 18.081 C 2051.149 205.836, 1614 1049.630, 1614 1050.209 C 1614 1050.649, 1663.820 1050.894, 1724.712 1050.754 L 1835.424 1050.500 1868.462 981.278 L 1901.500 912.055 2151.969 912.278 L 2402.438 912.500 2436.417 981.750 L 2470.397 1051 2587.198 1051 C 2651.439 1051, 2704 1050.725, 2704 1050.389 C 2704 1050.053, 2694.601 1031.716, 2683.113 1009.639 C 2633.239 913.792, 2163.029 9.029, 2160.780 4.581 L 2158.292 -0.339 2148.720 18.081 M 0.279 320.250 C 0.638 649.387, 0.273 627.306, 6.098 672.500 C 34.863 895.675, 164.775 1036.214, 367.500 1063.466 C 434.122 1072.421, 507.141 1069.504, 568.245 1055.446 C 743.112 1015.214, 854.589 884.923, 881.901 688.853 C 888.709 639.985, 888.953 626.610, 888.978 301.250 L 889 18 782.500 18 L 676 18 676 324.355 C 676 525.650, 675.647 635.132, 674.969 643.605 C 663.775 783.674, 589.743 858.258, 458.500 861.689 C 310.761 865.551, 228.401 791.441, 216.025 643.500 C 215.381 635.810, 215.017 521.323, 215.010 324.750 L 215 18 107.475 18 L -0.050 18 0.279 320.250 M 958 534.536 L 958 1051.072 1151.250 1050.714 C 1352.619 1050.342, 1351.148 1050.372, 1381.500 1045.921 C 1536.988 1023.121, 1651.714 921.671, 1677.928 783.795 C 1701.230 661.236, 1658.035 550.432, 1557.827 475.708 L 1544.137 465.500 1554.390 455 C 1607.027 401.094, 1626.660 330.643, 1614.033 240.986 C 1597.002 120.069, 1514.721 45.399, 1375 24.063 C 1336.802 18.230, 1328.516 18.021, 1135.250 18.010 L 958 18 958 534.536 M 1173 307.500 L 1173 403 1234.256 403 C 1300.543 403, 1311.983 402.356, 1330.962 397.557 C 1373.804 386.724, 1394.559 361.127, 1396.684 316.500 C 1398.991 268.057, 1380.852 235.523, 1343.751 221.558 C 1321.431 213.157, 1308.317 212.024, 1233.250 212.011 L 1173 212 1173 307.500 M 2149.044 398.925 C 2145.141 406.195, 1995.084 717.417, 1995.352 717.686 C 1995.529 717.862, 2065.922 717.892, 2151.782 717.753 L 2307.891 717.500 2232.669 564.500 C 2191.297 480.350, 2155.849 408.125, 2153.897 404 C 2150.442 396.702, 2150.311 396.565, 2149.044 398.925 M 1173 723.960 L 1173 857 1250.750 856.971 C 1346.943 856.935, 1356.436 856.306, 1380.867 848.357 C 1437.013 830.087, 1468.232 778.711, 1463.075 713.070 C 1457.874 646.877, 1424.978 607.918, 1362.340 593.769 C 1352.631 591.576, 1351.306 591.542, 1262.750 591.233 L 1173 590.920 1173 723.960';
const LW = 2704; // traced letter box
const LH = 1069;
const INK = '#0e0d0b';
const CREAM = '#f6f2ec';

// The letters centred in a size×size square at the given share of its width.
const mark = (size, share, fill) => {
  const w = size * share;
  const s = w / LW;
  const x = (size - w) / 2;
  const y = (size - LH * s) / 2;
  return `<path fill="${fill}" transform="translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${s.toFixed(6)})" d="${LETTERS}"/>`;
};
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${body}</svg>`;
const tile = (bg, fg, r = 14) => svg(`<rect width="64" height="64" rx="${r}" fill="${bg}"/>${mark(64, 0.8, fg)}`);

// Adaptive SVG favicon: the tile flips with the browser's colour scheme.
const adaptive = svg(
  `<style>.t{fill:${INK}}.l{fill:#fff}@media (prefers-color-scheme:dark){.t{fill:${CREAM}}.l{fill:${INK}}}</style>` +
  `<rect class="t" width="64" height="64" rx="14"/>` + mark(64, 0.8, '#fff').replace('fill="#fff"', 'class="l"')
);
await writeFile('../assets/favicon.svg', adaptive + '\n');

const png = (svgText, size, file) => sharp(Buffer.from(svgText), { density: 72 * Math.max(1, size / 64) * 4 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
const light = tile(INK, '#fff');
const dark = tile(CREAM, INK);
await png(light, 32, '../assets/favicon-32.png');
await png(dark, 32, '../assets/favicon-dark-32.png');
await png(light, 96, '../assets/favicon-96.png'); // sharp on retina; Google search prefers multiples of 48
await png(dark, 96, '../assets/favicon-dark-96.png');

// Home-screen and app icons: full-bleed square (the OS applies its own mask).
const bleed = (share) => svg(`<rect width="64" height="64" fill="${INK}"/>${mark(64, share, '#fff')}`);
await png(bleed(0.74), 180, '../assets/apple-touch-icon.png');
await png(tile(INK, '#fff', 14), 192, '../assets/icon-192.png');
await png(tile(INK, '#fff', 14), 512, '../assets/icon-512.png');
await png(bleed(0.62), 512, '../assets/icon-maskable-512.png'); // letters inside the 80% safe zone

// favicon.ico: PNG-compressed 16, 32 and 48 entries.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => sharp(Buffer.from(light), { density: 72 * 4 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(images[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...dir, ...images]));

await writeFile('public/site.webmanifest', JSON.stringify({
  name: 'UK Barre Academy',
  short_name: 'UBA',
  description: 'CPD-accredited Barre instructor certification in London.',
  start_url: '/',
  display: 'browser',
  background_color: INK,
  theme_color: INK,
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/assets/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    { src: '/assets/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
  ],
}, null, 2) + '\n');
console.log('favicons written');

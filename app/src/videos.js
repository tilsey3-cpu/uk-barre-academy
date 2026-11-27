// Hidden, password-gated trainee practice library (/practice-library). Older links (/trainee-videos-7k3q, /practice_library) redirect here. Not linked anywhere, not in the sitemap, noindex.
// Videos and thumbnails live in the Cloudflare R2 bucket `uba-videos`, in its web/ folder; `file` is the
// object name there without its extension (each video has a matching .mp4 and .jpg).
export const VIDEO_BASE = 'https://pub-c0dde070760e43e0b8bbb11bd65ad309.r2.dev/web/';
export const VIDEOS_SLUG = 'practice-library';

export const videoSrc = (file) => VIDEO_BASE + encodeURIComponent(`${file}.mp4`);
export const thumbSrc = (file) => VIDEO_BASE + encodeURIComponent(`${file}.jpg`);

// Page order, as Taylor set it: the full warm-up, the full warm-down, arms, the class sessions,
// then Maggie's module-by-module demonstrations. `wide` marks landscape or square clips (the rest were
// filmed upright on a phone). `secs` is the running time. `opens` puts a heading above that group.
export const VIDEO_GROUPS = [
  { id: 'warm-up', kind: 'session', nav: 'Warm-up', title: 'Full warm-up', name: 'Module 1, taught to the class', videos: [
    { file: 'Module 1  (2)', title: 'Full warm-up', secs: 263, wide: true },
  ] },
  { id: 'warm-down', kind: 'session', nav: 'Warm-down', title: 'Full warm-down', name: 'Barre stretch into floor stretches', videos: [
    { file: 'Module 8  (1)', title: 'Full warm-down', secs: 218, wide: true },
  ] },
  { id: 'arms', kind: 'session', nav: 'Arms', title: 'Arms', name: 'Module 6 with hand weights', videos: [
    { file: 'Module 6  (1)', title: 'Arms', secs: 214, wide: true },
  ] },
  { id: 'class', nav: 'Class', title: 'Class sessions', name: 'The modules taught to a class', videos: [
    { file: 'Module 3', title: 'Module 3', secs: 217, wide: true },
    { file: 'Module 3 ', title: 'Module 3, from the barre', secs: 240, wide: true },
    { file: 'Module 4 & 5 combo ', title: 'Modules 4 & 5', secs: 171, wide: true },
    { file: 'Module 5- ', title: 'Module 5', secs: 76, wide: true },
    { file: 'Module 7 (b)', title: 'Module 7', secs: 195, wide: true },
  ] },
  { id: 'm1', nav: 'Module 1', title: 'Module 1', name: 'Foundations, Warm-Up and Alignment',
    opens: { title: 'The 8 modules', text: 'Maggie demonstrates every module of the UBA method, filmed for the founder course.' },
    videos: [
      { file: 'Module 1 ', title: 'Part 1', secs: 204 },
      { file: 'Module 1  (1)', title: 'Part 2', secs: 278 },
      { file: 'Module 1 . Barre stretch', title: 'Barre stretch', secs: 148 },
      { file: 'Module 1 - extra tip for warming up', title: 'Warm-up tip', secs: 26 },
      { file: 'Module 1 - Extended version mov', title: 'Extended version', secs: 493 },
    ] },
  { id: 'm2', nav: 'Module 2', title: 'Module 2', name: 'Pilates Core Foundation', videos: [
    { file: 'Module 2', title: 'Part 1', secs: 75 },
    { file: 'Module 2 ', title: 'Part 2', secs: 130 },
    { file: 'Module 2 Pilates short teaser ', title: 'Pilates teaser', secs: 17 },
  ] },
  { id: 'm3', nav: 'Module 3', title: 'Module 3', name: 'Feet, Ankles, Knees and Hips', videos: [
    { file: 'Module 3  (1)', title: 'Part 1', secs: 147 },
    { file: 'Module 3  (2)', title: 'Part 2', secs: 227 },
    { file: 'Module 3 Extended Version', title: 'Extended version', secs: 304 },
  ] },
  { id: 'm4', nav: 'Module 4', title: 'Module 4', name: 'Classical Barre Technique', videos: [
    { file: 'Module 4 ', title: 'Part 1', secs: 129 },
  ] },
  { id: 'm5', nav: 'Module 5', title: 'Module 5', name: 'Barre Flow, Choreography and Cardio Conditioning', assessment: true, videos: [
    { file: 'Module 5 ', title: 'Part 1', secs: 62 },
    { file: 'Module 5  (1)', title: 'Part 2', secs: 66 },
    { file: 'Module 5  (2)', title: 'Part 3', secs: 61 },
    { file: 'Module 5  (3)', title: 'Part 4', secs: 51 },
    { file: 'Module 4 & 5 - combination module ', title: 'With Module 4', secs: 266 },
  ] },
  { id: 'm6', nav: 'Module 6', title: 'Module 6', name: 'Upper Body Strength and Arm Definition', videos: [
    { file: 'Module 6', title: 'Part 1', secs: 93 },
    { file: 'Module 6 ', title: 'Part 2', secs: 193 },
  ] },
  { id: 'm7', nav: 'Module 7', title: 'Module 7', name: 'Leg Strength and Barre Conditioning', assessment: true, videos: [
    { file: 'Module 7 ', title: 'Part 1', secs: 63 },
    { file: 'Module 7  (1)', title: 'Part 2', secs: 46 },
    { file: 'Module 7  (2)', title: 'Part 3', secs: 195 },
  ] },
  { id: 'm8', nav: 'Module 8', title: 'Module 8', name: 'Barre Stretch, Mobility and Recovery', videos: [
    { file: 'Module 8  (2)', title: 'Part 1', secs: 37 },
    { file: 'Module 8 ', title: 'Part 2', secs: 170 },
  ] },
];

// Every clip in viewing order, with its group attached. The id is the file name, so a trainee's ticks
// stay on the right video if the page order changes.
export const ALL_CLIPS = VIDEO_GROUPS.flatMap((g) => g.videos.map((v) => ({ ...v, id: v.file, group: g })));
export const clipMinutes = (clips) => Math.round(clips.reduce((n, c) => n + c.secs, 0) / 60);

// Hidden trainee video library (/trainee-videos-7k3q). Not linked anywhere, not in the sitemap, noindex.
// Videos and thumbnails live in the Cloudflare R2 bucket `uba-videos`; `file` is the object name there.
export const VIDEO_BASE = 'https://pub-c0dde070760e43e0b8bbb11bd65ad309.r2.dev/web/';
export const VIDEOS_SLUG = 'trainee-videos-7k3q';

export const videoSrc = (file) => VIDEO_BASE + encodeURIComponent(`${file}.mp4`);
export const thumbSrc = (file) => VIDEO_BASE + encodeURIComponent(`${file}.jpg`);

// `wide` marks landscape clips (everything else is portrait, filmed on a phone). `secs` is the running time.
export const VIDEO_GROUPS = [
  { id: 'm1', title: 'Module 1', name: 'Foundations, Warm-Up and Alignment', videos: [
    { file: 'Module 1 . Barre stretch', title: 'Barre stretch', secs: 148 },
    { file: 'Module 1 - extra tip for warming up', title: 'Warm-up tip', secs: 26 },
  ] },
  { id: 'm2', title: 'Module 2', name: 'Pilates Core Foundation', videos: [
    { file: 'Module 2', title: 'Part 1', secs: 75 },
    { file: 'Module 2 ', title: 'Part 2', secs: 130 },
    { file: 'Module 2 Pilates short teaser ', title: 'Pilates teaser', secs: 17 },
  ] },
  { id: 'm3', title: 'Module 3', name: 'Feet, Ankles, Knees and Hips', videos: [
    { file: 'Module 3  (1)', title: 'Part 1', secs: 147 },
    { file: 'Module 3 ', title: 'Part 2', secs: 240, wide: true },
  ] },
  { id: 'm4', title: 'Module 4', name: 'Classical Barre Technique', videos: [
    { file: 'Module 4 ', title: 'Part 1', secs: 129 },
  ] },
  { id: 'm5', title: 'Module 5', name: 'Barre Flow, Choreography and Cardio Conditioning', assessment: true, videos: [
    { file: 'Module 5 ', title: 'Part 1', secs: 62 },
    { file: 'Module 5  (1)', title: 'Part 2', secs: 66 },
    { file: 'Module 5  (2)', title: 'Part 3', secs: 61 },
    { file: 'Module 5  (3)', title: 'Part 4', secs: 51 },
    { file: 'Module 5- ', title: 'Part 5', secs: 76, wide: true },
    { file: 'Module 4 & 5 combo ', title: 'With Module 4', secs: 171, wide: true },
  ] },
  { id: 'm6', title: 'Module 6', name: 'Upper Body Strength and Arm Definition', videos: [
    { file: 'Module 6', title: 'Part 1', secs: 93 },
  ] },
  { id: 'm7', title: 'Module 7', name: 'Leg Strength and Barre Conditioning', assessment: true, videos: [
    { file: 'Module 7 ', title: 'Part 1', secs: 63 },
    { file: 'Module 7  (1)', title: 'Part 2', secs: 46 },
    { file: 'Module 7 (b)', title: 'Part 3', secs: 195, wide: true },
  ] },
  { id: 'm8', title: 'Module 8', name: 'Barre Stretch, Mobility and Recovery', videos: [
    { file: 'Module 8  (2)', title: 'Part 1', secs: 37 },
  ] },
];

// Every clip in viewing order, with its module attached, and a stable id for progress.
export const ALL_CLIPS = VIDEO_GROUPS.flatMap((g) => g.videos.map((v, i) => ({ ...v, id: `${g.id}-${i + 1}`, group: g })));
export const clipMinutes = (clips) => Math.round(clips.reduce((n, c) => n + c.secs, 0) / 60);

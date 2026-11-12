// Crop (CSS px; sources are @2x) and export WebP into the website repo.
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import fs from 'node:fs';
const OUT = fileURLToPath(new URL('../../src/assets/screens', import.meta.url));
fs.mkdirSync(OUT, { recursive: true });
const jobs = [
  ['dashboard', 'dashboard', null, 1600],
  ['dashboard-full', 'follow-ups-funnel', [268, 636, 1160, 394], 1400],
  ['dashboard-full', 'recent-activity', [268, 1036, 1160, 560], 1400],
  ['jobs', 'jobs-table', [0, 0, 1440, 780], 1600],
  ['job-detail', 'job-detail', [360, 95, 720, 710], 1100],
  ['editor-ats', 'editor-ats', null, 1600],
  ['editor-ats', 'ats-panel', [1060, 48, 380, 852], 760],
  ['resumes', 'resume-library', [0, 0, 1060, 580], 1400],
  ['extension-panel', 'extension-detected', null, 800],
  ['extension-history', 'extension-saved', null, 800],
];
for (const [src, name, crop, width] of jobs) {
  let img = sharp(`shots/${src}.png`);
  if (crop) { const [l, t, w, h] = crop.map((v) => v * 2); img = img.extract({ left: l, top: t, width: w, height: h }); }
  const info = await img.resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(`${OUT}/${name}.webp`);
  console.log(name, info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
}

// 800px variants for srcset (phones) — wide shots only.
for (const name of ['dashboard', 'jobs-table', 'editor-ats', 'job-detail', 'resume-library', 'follow-ups-funnel', 'recent-activity']) {
  await sharp(`${OUT}/${name}.webp`).resize({ width: 800 }).webp({ quality: 80, effort: 6 }).toFile(`${OUT}/${name}-800.webp`);
}

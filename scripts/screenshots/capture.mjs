// Captures dashboard screenshots with every API call answered from fixtures.mjs.
// Usage: node capture.mjs [only-name ...]
import fs from 'node:fs';
import { chromium } from 'playwright';
import * as F from './fixtures.mjs';

const APP = 'http://localhost:5181';
const API = 'http://localhost:3000';
const only = process.argv.slice(2);
const DOCX = fs.readFileSync('fixtures/jordan-ellis-resume.docx');
const PDF = fs.readFileSync('fixtures/jordan-ellis-resume.pdf');

const page1 = (items) => ({ items, total: items.length, page: 1, pageSize: 100 });
function respond(route, url, method) {
  const p = url.pathname;
  const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  if (method !== 'GET') return json({});
  if (p === '/auth/me') return json(F.me);
  if (p === '/entitlements/me') return json(F.entitlements);
  if (p === '/jobs') return json(page1(F.jobs));
  if (p === '/companies') return json(page1(F.companies));
  if (p === '/people') return json(page1(F.people));
  if (p.startsWith('/jobs/')) return json(F.jobs.find((j) => p.endsWith(j.id)) ?? F.jobs[0]);
  if (p === '/cv') return json(F.cv);
  if (p === '/subscriptions') return json(F.subscriptions);
  if (p === '/subscriptions/me') return json(F.mySubscription);
  if (p === '/resumes') return json(F.resumes);
  if (p === '/editor/files') return json(F.editorFiles);
  if (/^\/resumes\/[^/]+\/content$/.test(p)) return route.fulfill({ status: 200, contentType: 'application/pdf', body: PDF });
  if (/^\/editor\/files\/[^/]+\/content$/.test(p))
    return route.fulfill({ status: 200, contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', body: DOCX });
  if (p === '/ats/scans') return json([F.atsScan].map(({ result, jobDescription, ...s }) => s));
  if (p.startsWith('/ats/scans/')) return json(F.atsScan);
  if (p.startsWith('/resumes/') || p.startsWith('/editor/files/') || p.startsWith('/cv/')) return json({ downloadUrl: 'about:blank' });
  console.warn('unmocked', method, p);
  return json({}, 404);
}

const shots = [
  { name: 'dashboard', path: '/dashboard' },
  { name: 'jobs', path: '/jobs' },
  { name: 'dashboard-full', path: '/dashboard', full: true },
  { name: 'job-detail', path: '/jobs', act: async (pg) => { await pg.getByText('Senior Frontend Engineer').first().click(); await pg.waitForTimeout(800); } },
  { name: 'companies', path: '/companies' },
  { name: 'people', path: '/people' },
  { name: 'resumes', path: '/resumes', wait: 3500 },
  { name: 'editor-list', path: '/editor', wait: 3500 },
  { name: 'editor-ats', path: `/editor/${F.editorFiles[0].id}`, wait: 6000 },
  { name: 'plans', path: '/plans' },
];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.env.CHROME_PATH ? undefined : 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: 'light' });
await ctx.addInitScript(() => localStorage.setItem('rl_token', 'demo.jwt.token'));
await ctx.route(`${API}/**`, (route) => respond(route, new URL(route.request().url()), route.request().method()));
await ctx.route('**/*paddle*/**', (route) => route.abort());

for (const s of shots) {
  if (only.length && !only.includes(s.name)) continue;
  const pg = await ctx.newPage();
  pg.on('pageerror', (e) => console.warn(s.name, 'pageerror', e.message));
  await pg.goto(APP + s.path, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(s.wait ?? 1500);
  if (s.act) await s.act(pg);
  await pg.screenshot({ path: `shots/${s.name}.png`, fullPage: !!s.full });
  console.log('shot', s.name);
  await pg.close();
}
await browser.close();

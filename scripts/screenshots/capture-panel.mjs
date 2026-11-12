// Renders the built extension side panel as a normal page with a stubbed `chrome.*`.
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import * as F from './fixtures.mjs';

const BUILD = fileURLToPath(new URL('../../../resume-log-extension/build/chrome-mv3-prod', import.meta.url));
const ORIGIN = 'http://panel.local';
const job = F.jobs[0];
const ago = (m) => new Date(Date.now() - m * 60000).toISOString();

const seed = {
  rl_token: 'demo.jwt.token',
  rl_user: { id: F.me.id, email: F.me.email, firstName: 'Jordan', lastName: 'Ellis', pictureUrl: '' },
  jobLogs: F.jobs.slice(1, 6).map((j, i) => ({
    id: j.linkedinJobId, url: j.url, capturedAt: ago(40 + i * 300), sync: 'synced',
    fields: { title: j.title, company: j.company, location: j.location, description: j.description },
  })),
  companyLogs: [], peopleLogs: [],
};
const extract = {
  fields: { title: job.title, company: job.company, location: job.location, description: job.description },
  missingFields: [], key: job.linkedinJobId, url: job.url,
};

const stub = ({ seed, extract, url }) => {
  const store = structuredClone(seed);
  const listeners = { msg: [], storage: [] };
  const ev = (arr) => ({ addListener: (f) => arr.push(f), removeListener: () => {}, hasListener: () => false });
  const noop = ev([]);
  const push = () => setTimeout(() => listeners.msg.forEach((f) => f({ type: 'CAPTURE_RESULT', kind: 'job', response: extract, done: true })), 150);
  window.chrome = {
    runtime: {
      id: 'demo', onMessage: ev(listeners.msg), onMessageExternal: noop,
      getManifest: () => ({ content_scripts: [] }), sendMessage: async () => undefined, getURL: (p) => p,
    },
    storage: {
      onChanged: ev(listeners.storage),
      local: {
        get: async (k) => (k == null ? { ...store } : Object.fromEntries([].concat(k).map((x) => [x, store[x]]))),
        set: async (o) => Object.assign(store, o),
        remove: async (k) => [].concat(k).forEach((x) => delete store[x]),
      },
    },
    tabs: {
      query: async () => [{ id: 1, url, active: true }],
      sendMessage: async (_id, msg) => {
        if (msg.type === 'EXTRACT_FIELDS') return extract;
        if (msg.type === 'RECAPTURE') push();
        return undefined;
      },
      create: async () => ({}), onActivated: noop, onUpdated: noop,
    },
    webNavigation: { getAllFrames: async () => [{ frameId: 0 }] },
    scripting: { executeScript: async () => [] },
  };
};

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.env.CHROME_PATH ? undefined : 'chrome' });
const ctx = await browser.newContext({ viewport: { width: 400, height: 860 }, deviceScaleFactor: 2 });
await ctx.addInitScript(stub, { seed, extract, url: job.url });
await ctx.route(`${ORIGIN}/**`, (route) => {
  const p = new URL(route.request().url()).pathname;
  const file = path.join(BUILD, p === '/' ? 'sidepanel.html' : p);
  if (!fs.existsSync(file)) return route.fulfill({ status: 404, body: '' });
  const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png' }[path.extname(file)];
  return route.fulfill({ status: 200, contentType: type, body: fs.readFileSync(file) });
});
await ctx.route('https://resume-log-be-*/**', (route) =>
  route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(seed.rl_user) }));
const pg = await ctx.newPage();
pg.on('pageerror', (e) => console.warn('pageerror', e.message));
pg.on('console', (m) => m.type() === 'error' && console.warn('console', m.text()));
await pg.goto(`${ORIGIN}/sidepanel.html`, { waitUntil: 'networkidle' });
await pg.waitForTimeout(2500);
await pg.screenshot({ path: 'shots/extension-panel.png' });
await pg.getByRole('button', { name: 'Save', exact: true }).click();
await pg.waitForTimeout(1500);
await pg.screenshot({ path: 'shots/extension-saved.png' });
await pg.getByText(/^History/).click();
await pg.waitForTimeout(800);
await pg.screenshot({ path: 'shots/extension-history.png' });
console.log('shot extension-panel');
await browser.close();

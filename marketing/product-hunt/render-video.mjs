import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
import { mkdirSync } from 'node:fs'
const [dir, mode, framesDir] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-win64/chrome-headless-shell.exe' })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
page.on('pageerror', (e) => console.log('pageerror', e.message))
await page.goto(pathToFileURL(`${dir}/video.html`).href)
await page.evaluate(() => document.fonts.ready)
await page.waitForLoadState('networkidle')
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode())))
mkdirSync(framesDir, { recursive: true })
if (mode === 'preview') {
  for (const t of [2.8, 7.5, 11.0, 13.0, 18.5, 24.5, 29, 33]) {
    await page.evaluate((t) => window.seek(t), t)
    await page.screenshot({ path: `${framesDir}/p-${t}.png`, type: 'png' })
  }
} else {
  const fps = 30
  const total = Math.round((await page.evaluate(() => window.DURATION)) * fps)
  for (let f = 0; f < total; f++) {
    await page.evaluate((t) => window.seek(t), f / fps)
    await page.screenshot({ path: `${framesDir}/f-${String(f).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 95 })
    if (f % 150 === 0) console.log('frame', f, '/', total)
  }
}
await browser.close()

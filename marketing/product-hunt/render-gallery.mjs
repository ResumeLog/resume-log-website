import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
const dir = process.argv[2]
const browser = await chromium.launch({ executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-win64/chrome-headless-shell.exe' })
const page = await browser.newPage({ viewport: { width: 1270, height: 760 }, deviceScaleFactor: 2 })
const names = { 1: '1-hero', 2: '2-capture', 3: '3-ats-check' }
for (const n of [1, 2, 3]) {
  await page.goto(pathToFileURL(`${dir}/gallery.html`).href + `?n=${n}`)
  await page.evaluate(() => document.fonts.ready)
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: `${dir}/out/${names[n]}.png` })
  console.log('wrote', names[n])
}
await browser.close()

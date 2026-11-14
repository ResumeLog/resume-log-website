import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
const dir = process.argv[2]
const browser = await chromium.launch({ executablePath: process.env.LOCALAPPDATA + '/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-win64/chrome-headless-shell.exe' })
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 })
await page.goto(pathToFileURL(`${dir}/thumbnail.html`).href)
await page.evaluate(() => document.fonts.ready)
await page.waitForLoadState('networkidle')
await page.screenshot({ path: `${dir}/out/youtube-thumbnail.png` })
await browser.close()
console.log('wrote out/youtube-thumbnail.png')

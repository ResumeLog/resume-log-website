/*
 * Build-time prerender. Runs after `vite build` (client → dist/) and
 * `vite build --ssr` (server → dist-ssr/). For every route in src/lib/seo.ts it
 * renders the React tree to HTML, injects that page's <title>/meta/canonical/
 * JSON-LD, and writes:
 *   /           → dist/index.html
 *   /pricing    → dist/pricing.html   (served at /pricing via vercel.json cleanUrls)
 *   unknown URL → dist/404.html       (real 404 status on Vercel)
 * plus dist/sitemap.xml. Crawlers get real content without running JS.
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const ssrEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href

const { render, headTags, pages, siteUrl } = await import(ssrEntry)
const template = await readFile(`${dist}/index.html`, 'utf8')

if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('prerender: index.html is missing the <!--app-head--> / <!--app-html--> placeholders')
}

function page(url, head) {
  const html = render(url)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

const today = new Date().toISOString().slice(0, 10)
const routes = Object.keys(pages)

for (const route of routes) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`
  await writeFile(`${dist}/${file}`, page(route, headTags(route)))
  console.log(`prerendered ${route} → dist/${file}`)
}

await writeFile(`${dist}/404.html`, page('/404-not-found', headTags(null)))
console.log('prerendered 404 → dist/404.html')

const urls = routes
  .map((route) => {
    const loc = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
  })
  .join('\n')
await writeFile(
  `${dist}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log(`wrote dist/sitemap.xml (${routes.length} urls)`)

await rm(`${root}dist-ssr`, { recursive: true, force: true })

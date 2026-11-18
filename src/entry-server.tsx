/*
 * Build-time render entry. scripts/prerender.mjs imports the SSR bundle of this
 * file and writes one static HTML file per route, so crawlers get real content.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

export { headTags, pages, siteUrl } from './lib/seo'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}

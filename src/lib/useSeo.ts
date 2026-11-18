import { useEffect } from 'react'
import { canonicalFor, metaFor, notFoundMeta } from './seo'

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Keeps title, description and canonical in sync on client-side navigation. */
export function useSeo(pathname: string) {
  useEffect(() => {
    const known = metaFor(pathname)
    const meta = known ?? notFoundMeta
    document.title = meta.title
    setTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', meta.description)
    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (known) {
      setTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', canonicalFor(pathname))
    } else {
      canonical?.remove()
    }
  }, [pathname])
}

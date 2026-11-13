/*
 * Per-page SEO metadata + structured data. Used in two places:
 *  - scripts/prerender.mjs (via src/entry-server.tsx) writes these tags into each
 *    page's static HTML at build time, which is what crawlers read;
 *  - Layout's useSeo() keeps document.title / description / canonical in sync
 *    while navigating client-side.
 */
import pricingPlans from '../data/pricing.json'
import { faqs } from '../data/faqs'
import { extensionUrl, linkedinUrl } from './links'

export const siteUrl = 'https://www.resumeloghq.com'
export const siteName = 'ResumeLog'
const ogImage = `${siteUrl}/og-image.png`

export type PageMeta = { title: string; description: string }

/** Every indexable route. Order = sitemap order. */
export const pages: Record<string, PageMeta> = {
  '/': {
    title: 'ResumeLog: Job Application Tracker & ATS Resume Checker',
    description:
      'ResumeLog is a free Chrome extension and dashboard for your job search. Save LinkedIn jobs in one click, check your résumé against each job with an ATS scan, and follow up before applications go cold.',
  },
  '/features': {
    title: 'Features | ResumeLog Job Tracker, ATS Check & Follow-ups',
    description:
      'Everything in ResumeLog: save LinkedIn jobs, people and companies, keep your Easy Apply answers, run a six-part ATS résumé check, edit Word résumés and get follow-up reminders.',
  },
  '/how-it-works': {
    title: 'How ResumeLog Works | Save, Organise, Tailor, Follow Up',
    description:
      'How the ResumeLog Chrome extension fits around your LinkedIn job search: save a job, track it in one table, tailor your résumé with an ATS check and follow up on time.',
  },
  '/pricing': {
    title: 'Pricing | ResumeLog: Free Job Tracker, Pro for Unlimited ATS Scans',
    description:
      'Start with ResumeLog for free. Upgrade to Pro for unlimited ATS résumé scans, every missing keyword and fix, follow-up reminders and a cover letter generator.',
  },
  '/about': {
    title: 'About ResumeLog | Built During a Job Search',
    description:
      'ResumeLog was built during a real job search, so keeping track of applications, résumés and follow-ups doesn’t become a second job.',
  },
  '/get-started': {
    title: 'Get Started with ResumeLog | Install the Chrome Extension',
    description:
      'Set up ResumeLog in about two minutes: add the Chrome extension, sign in with Google, and save your first LinkedIn job.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | ResumeLog',
    description: 'How ResumeLog collects, uses and protects your data.',
  },
  '/terms-and-conditions': {
    title: 'Terms and Conditions | ResumeLog',
    description: 'The terms that apply when you use the ResumeLog website, dashboard and Chrome extension.',
  },
  '/refund-policy': {
    title: 'Refund Policy | ResumeLog',
    description: 'ResumeLog’s 14-day money-back guarantee and how to request a refund.',
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Page not found | ResumeLog',
  description: 'This page doesn’t exist, or it has moved.',
}

function clean(path: string): string {
  return path.replace(/\/+$/, '') || '/'
}

export function metaFor(path: string): PageMeta | null {
  return pages[clean(path)] ?? null
}

export function canonicalFor(path: string): string {
  const p = clean(path)
  return p === '/' ? `${siteUrl}/` : `${siteUrl}${p}`
}

const sameAs = [extensionUrl, linkedinUrl].filter(Boolean)

const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: siteName,
  alternateName: ['Resume Log', 'ResumeLog HQ'],
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon-512.png`,
  sameAs,
}

const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  alternateName: ['Resume Log', 'ResumeLog HQ', 'resumeloghq.com'],
  url: `${siteUrl}/`,
  publisher: { '@id': `${siteUrl}/#organization` },
}

function softwareApplication() {
  const offers = pricingPlans
    .map((p) => ({ name: p.name, price: p.price.replace(/[^0-9.]/g, '') }))
    .filter((o) => o.price !== '')
    .map((o) => ({ '@type': 'Offer', name: o.name, price: o.price, priceCurrency: 'USD' }))
  return {
    '@type': 'SoftwareApplication',
    name: siteName,
    url: `${siteUrl}/`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Chrome',
    description: pages['/'].description,
    downloadUrl: extensionUrl,
    image: ogImage,
    publisher: { '@id': `${siteUrl}/#organization` },
    offers,
  }
}

function faqPage() {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** JSON-LD graph for a route, or null. */
export function structuredDataFor(path: string): object | null {
  const graph: object[] = []
  if (path === '/') graph.push(organization, website, softwareApplication())
  if (path === '/how-it-works') graph.push(faqPage())
  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Head tags for the static HTML of `path`. `null` path = the 404 page. */
export function headTags(path: string | null): string {
  const meta = path ? metaFor(path) ?? notFoundMeta : notFoundMeta
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
  ]
  if (path) {
    const url = canonicalFor(path)
    tags.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`)
    const ld = structuredDataFor(path)
    if (ld) tags.push(`<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`)
  } else {
    tags.push('<meta name="robots" content="noindex" />')
  }
  return tags.join('\n  ')
}

/*
 * Per-page SEO metadata + structured data. Used in two places:
 *  - scripts/prerender.mjs (via src/entry-server.tsx) writes these tags into each
 *    page's static HTML at build time, which is what crawlers read, plus
 *    sitemap.xml and llms.txt;
 *  - Layout's useSeo() keeps document.title / description / canonical in sync
 *    while navigating client-side.
 *
 * Content pages (landing / comparison / guide / FAQ) are registered from their
 * data files, so adding a record there is enough to get a prerendered,
 * sitemapped page with schema.
 */
import { comparisons } from '../data/comparisons'
import { plain, type Faq, type RelatedLink } from '../data/content'
import { allFaqs, faqs as howItWorksFaqs } from '../data/faqs'
import { guides } from '../data/guides'
import { landingPages } from '../data/landing'
import { contactEmail, extensionUrl, linkedinUrl } from './links'
import { comparisonPlans, includedFeatures, planComparison } from '../data/plan-comparison'
import { formatUsd, pricingPlans } from '../data/pricing'
import { withPrice } from './pricing'

export const siteUrl = 'https://www.resumeloghq.com'
export const siteName = 'ResumeLog'
const ogImage = `${siteUrl}/og-image.png`

/**
 * The one-sentence description of what ResumeLog is. Use the same wording in the
 * Chrome Web Store listing, LinkedIn and anywhere else: AI engines trust an
 * entity described consistently.
 */
export const entityDescription =
  'ResumeLog is a free Chrome extension and web dashboard for job seekers: a job application tracker that saves jobs from LinkedIn, Indeed, Glassdoor and more in one click, plus an ATS resume checker that scores your resume against each job.'

export type PageMeta = {
  title: string
  description: string
  /** Breadcrumb trail after Home (BreadcrumbList JSON-LD). */
  crumbs?: RelatedLink[]
  /** YYYY-MM-DD for sitemap lastmod; defaults to the build date. */
  lastmod?: string
}

const legal = (title: string, description: string, path: string): PageMeta => ({
  title: `${title} | ResumeLog`,
  description,
  crumbs: [{ to: path, label: title }],
})

/** Every indexable route. Order = sitemap order. */
export const pages: Record<string, PageMeta> = {
  '/': {
    title: 'ResumeLog: Job Application Tracker & ATS Resume Checker',
    description:
      'Free job application tracker and ATS resume checker for Chrome. Save jobs from LinkedIn, Indeed, Glassdoor and more in one click, tailor your resume to each job and follow up on time.',
  },
  '/features': {
    title: 'Features | ResumeLog Job Tracker, ATS Check & Follow-ups',
    description:
      'Save jobs, people and companies from LinkedIn, Indeed, Glassdoor and more, keep Easy Apply answers, run a six-part ATS resume check, edit Word resumes and get follow-up reminders.',
    crumbs: [{ to: '/features', label: 'Features' }],
  },
  '/how-it-works': {
    title: 'How ResumeLog Works | Save, Organise, Tailor, Follow Up',
    description:
      'How the ResumeLog Chrome extension fits around your job search: save a job, track it in one table, tailor your resume with an ATS check, follow up.',
    crumbs: [{ to: '/how-it-works', label: 'How it works' }],
  },
  '/pricing': {
    title: 'ResumeLog Pricing | Free Job Tracker & ATS Checker',
    description:
      'Free: job tracker, resume editor, 5 ATS scans a day. Pro: {proPrice}/month or {proYearlyPrice}/year for unlimited scans, every fix, follow-ups.',
    crumbs: [{ to: '/pricing', label: 'Pricing' }],
  },
  '/faq': {
    title: 'FAQ: Job Tracker, ATS Resume Check & Pricing | ResumeLog',
    description:
      'Answers about ResumeLog: how the job application tracker and ATS resume checker work, LinkedIn Easy Apply, privacy, the free plan and Pro pricing.',
    crumbs: [{ to: '/faq', label: 'FAQ' }],
  },
  ...Object.fromEntries(
    landingPages.map((p): [string, PageMeta] => [
      `/${p.slug}`,
      { title: p.title, description: p.description, crumbs: [{ to: `/${p.slug}`, label: p.name }] },
    ]),
  ),
  '/alternatives': {
    title: 'Best Job Tracker & ATS Checker Alternatives Compared | ResumeLog',
    description:
      'Teal, Huntr, Jobscan, Simplify and ResumeLog compared: job tracking, ATS resume checks, job board capture, autofill and price, side by side.',
    crumbs: [{ to: '/alternatives', label: 'Alternatives' }],
  },
  ...Object.fromEntries(
    comparisons.map((c): [string, PageMeta] => [
      `/compare/${c.slug}`,
      {
        title: c.title,
        description: c.description,
        crumbs: [
          { to: '/alternatives', label: 'Alternatives' },
          { to: `/compare/${c.slug}`, label: `ResumeLog vs ${c.competitor}` },
        ],
      },
    ]),
  ),
  '/guides': {
    title: 'Job Search Guides: Tracking, ATS, Follow-ups | ResumeLog',
    description:
      'Practical job search guides: how to track job applications, how ATS software reads resumes, when to follow up and how to tailor your resume.',
    crumbs: [{ to: '/guides', label: 'Guides' }],
  },
  ...Object.fromEntries(
    guides.map((g): [string, PageMeta] => [
      `/guides/${g.slug}`,
      {
        title: g.title,
        description: g.description,
        lastmod: g.updated,
        crumbs: [
          { to: '/guides', label: 'Guides' },
          { to: `/guides/${g.slug}`, label: g.headline },
        ],
      },
    ]),
  ),
  '/about': {
    title: 'About ResumeLog | Built During a Job Search',
    description:
      'ResumeLog was built during a real job search, so keeping track of applications, resumes and follow-ups doesn’t become a second job.',
    crumbs: [{ to: '/about', label: 'About' }],
  },
  '/get-started': {
    title: 'Get Started with ResumeLog | Install the Chrome Extension',
    description:
      'Set up ResumeLog in about two minutes: add the Chrome extension, sign in with Google, and save your first job.',
    crumbs: [{ to: '/get-started', label: 'Get started' }],
  },
  '/privacy-policy': legal('Privacy Policy', 'How ResumeLog collects, uses and protects your data.', '/privacy-policy'),
  '/terms-and-conditions': legal(
    'Terms and Conditions',
    'The terms that apply when you use the ResumeLog website, dashboard and Chrome extension.',
    '/terms-and-conditions',
  ),
  '/refund-policy': legal('Refund Policy', 'ResumeLog’s 14-day money-back guarantee and how to request a refund.', '/refund-policy'),
}

export const notFoundMeta: PageMeta = {
  title: 'Page not found | ResumeLog',
  description: 'This page doesn’t exist, or it has moved.',
}

function clean(path: string): string {
  return path.replace(/\/+$/, '') || '/'
}

/** Meta for a route with `{proPrice}` filled in, or null for unknown routes. */
export function metaFor(path: string): PageMeta | null {
  const meta = pages[clean(path)]
  return meta ? { ...meta, title: withPrice(meta.title), description: withPrice(meta.description) } : null
}

export function canonicalFor(path: string): string {
  const p = clean(path)
  return p === '/' ? `${siteUrl}/` : `${siteUrl}${p}`
}

// ───────── Structured data ─────────

const orgId = `${siteUrl}/#organization`
const softwareId = `${siteUrl}/#software`
const sameAs = [extensionUrl, linkedinUrl].filter(Boolean)

const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: siteName,
  alternateName: ['Resume Log', 'ResumeLog HQ'],
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon-512.png`,
  description: entityDescription,
  email: contactEmail,
  sameAs,
}

const website = {
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: siteName,
  alternateName: ['Resume Log', 'ResumeLog HQ', 'resumeloghq.com'],
  url: `${siteUrl}/`,
  publisher: { '@id': orgId },
}

export const featureList = [
  'Job application tracker with statuses, salary expectation and attached resume',
  'One-click save of jobs, companies and recruiters from LinkedIn, Indeed, Glassdoor, Ashby and Y Combinator (more job boards coming)',
  'Saves LinkedIn Easy Apply questions, answers and resume',
  'ATS resume checker with a six-part score and missing keywords',
  'Word (.docx) resume editor with PDF publishing and a resume library',
  'Response-rate chart and outcome funnel',
  'Follow-up reminders after two weeks without a reply (Pro)',
  'Cover letter generator (Pro)',
  'Google Calendar integration (Pro)',
  'SAML / SSO and a direct support channel (Enterprise)',
]

function offer(name: string, price: number, billingDuration?: 'P1M' | 'P1Y') {
  return {
    '@type': 'Offer',
    name,
    price: price.toFixed(2),
    priceCurrency: 'USD',
    url: `${siteUrl}/pricing`,
    ...(billingDuration && {
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: price.toFixed(2),
        priceCurrency: 'USD',
        billingDuration,
        unitCode: billingDuration === 'P1M' ? 'MON' : 'ANN',
      },
    }),
  }
}

function software() {
  const offers = pricingPlans.flatMap((p) => {
    if (p.monthly === null) return []
    if (p.monthly === 0) return [offer(p.name, 0)]
    return [
      offer(`${p.name} (monthly)`, p.monthly, 'P1M'),
      ...(p.yearly ? [offer(`${p.name} (yearly)`, p.yearly, 'P1Y')] : []),
    ]
  })
  return {
    '@type': 'SoftwareApplication',
    '@id': softwareId,
    name: siteName,
    url: `${siteUrl}/`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Job search tool',
    operatingSystem: 'Chrome',
    description: entityDescription,
    featureList,
    downloadUrl: extensionUrl,
    image: ogImage,
    publisher: { '@id': orgId },
    offers,
  }
}

function faqPage(list: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: plain(withPrice(f.a)) },
    })),
  }
}

function breadcrumbs(crumbs: RelatedLink[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ to: '/', label: 'Home' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: canonicalFor(c.to),
    })),
  }
}

/** JSON-LD graph for a route, or null. */
export function structuredDataFor(path: string): object | null {
  const p = clean(path)
  const graph: object[] = []
  const meta = pages[p]
  if (meta?.crumbs) graph.push(breadcrumbs(meta.crumbs))

  if (p === '/') graph.push(organization, website, software())
  if (p === '/pricing') graph.push(software())
  if (p === '/how-it-works') graph.push(faqPage(howItWorksFaqs))
  if (p === '/faq') graph.push(faqPage(allFaqs))

  const landing = landingPages.find((l) => `/${l.slug}` === p)
  if (landing) {
    // Question-led sections are answers too.
    graph.push(faqPage([...landing.sections.map((s) => ({ q: s.heading, a: s.answer })), ...landing.faqs]))
  }

  const comparison = comparisons.find((c) => `/compare/${c.slug}` === p)
  if (comparison) graph.push(faqPage(comparison.faqs))

  const guide = guides.find((g) => `/guides/${g.slug}` === p)
  if (guide) {
    graph.push({
      '@type': 'Article',
      headline: guide.headline,
      description: guide.summary,
      datePublished: guide.published,
      dateModified: guide.updated,
      author: { '@id': orgId },
      publisher: { '@id': orgId },
      image: ogImage,
      mainEntityOfPage: canonicalFor(p),
    })
    if (guide.howTo) {
      graph.push({
        '@type': 'HowTo',
        name: guide.howTo.name,
        step: guide.howTo.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
      })
    }
    graph.push(faqPage(guide.faqs))
  }

  // Inner pages reference the organization by @id; declare it so the reference resolves.
  if (graph.length && p !== '/') graph.push(organization)
  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Head tags for the static HTML of `path`. `null` path = the 404 page. */
export function headTags(path: string | null): string {
  const meta = path ? metaFor(path) ?? notFoundMeta : notFoundMeta
  const guide = path ? guides.find((g) => `/guides/${g.slug}` === clean(path)) : undefined
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
  if (guide) {
    tags.push(
      `<meta property="article:published_time" content="${guide.published}" />`,
      `<meta property="article:modified_time" content="${guide.updated}" />`,
    )
  }
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

/** sitemap lastmod for a route. */
export function lastmodFor(path: string, buildDate: string): string {
  return pages[clean(path)]?.lastmod ?? buildDate
}

/** /llms.txt: a plain-Markdown brief for AI assistants (https://llmstxt.org). */
export function llmsTxt(): string {
  const link = (path: string, label: string, note?: string) => `- [${label}](${canonicalFor(path)})${note ? `: ${note}` : ''}`
  const plans = pricingPlans
    .map((p, i) => {
      const price =
        p.monthly === null
          ? 'custom pricing'
          : p.monthly === 0
            ? '$0, free forever'
            : `${formatUsd(p.monthly)}/month or ${formatUsd(p.yearly!)}/year (same features)`
      return `- ${p.name}: ${price}. Includes: ${includedFeatures(i as 0 | 1 | 2).join('; ')}.`
    })
    .join('\n')
  const table = [
    `| | ${comparisonPlans.join(' | ')} |`,
    `|---|${comparisonPlans.map(() => '---').join('|')}|`,
    ...planComparison.flatMap((g) => [
      `| **${g.name}** | | | |`,
      ...g.rows.map((r) => `| | ${r.cells.map((c) => `${c.included ? '✓' : '✗'} ${c.label}`).join(' | ')} |`),
    ]),
  ].join('\n')
  return `# ResumeLog

> ${entityDescription}

ResumeLog is for job seekers, not recruiters (it is not an applicant tracking system). It never applies to jobs on your behalf. One-click saving works on LinkedIn, Indeed, Glassdoor, Ashby and Y Combinator today, with more job boards coming; the ATS check works with any pasted job description. Chrome only.

## Features

${featureList.map((f) => `- ${f}`).join('\n')}

## Pricing (USD)

${plans}
- 14-day money-back guarantee on every payment.

### Plan comparison

${table}

## Use cases

${landingPages.map((l) => link(`/${l.slug}`, l.name, plain(withPrice(l.intro)))).join('\n')}

## Comparisons

${link('/alternatives', 'Job tracker and ATS checker alternatives')}
${comparisons.map((c) => link(`/compare/${c.slug}`, `ResumeLog vs ${c.competitor}`)).join('\n')}

## Guides

${guides.map((g) => link(`/guides/${g.slug}`, g.headline, g.summary)).join('\n')}

## More

${link('/faq', 'FAQ')}
${link('/features', 'Features')}
${link('/pricing', 'Pricing')}
${link('/how-it-works', 'How it works')}
- [Chrome Web Store listing](${extensionUrl})
- Contact: ${contactEmail}
`
}

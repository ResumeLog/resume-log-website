import fallbackPlans from '../data/pricing.json'
import { apiUrl } from './api'

export type PricingPlan = {
  id: string
  name: string
  description: string
  price: string
  period?: string
  features: string[]
  cta: { label: string; action: 'login' | 'contact' }
  highlighted?: boolean
}

/** Shape of `GET /subscriptions` (resume-log-be `SubscriptionWithDetails`) — only the fields used here. */
type ApiPlan = {
  id: string
  name: string
  description: string
  price: string
  currency: string
  interval: 'month' | 'year'
  isDefault: boolean
  details: { label: string; sortOrder: number }[]
}

/** How long fetched plans are reused before the API is asked again. */
const TTL_MS = 10 * 60 * 1000

/**
 * In-memory cache only: a module variable lives for the page session (it
 * survives SPA navigation, a reload starts empty). Deliberately not
 * localStorage / sessionStorage.
 */
let cache: { plans: PricingPlan[]; at: number } | null = null
let inflight: Promise<PricingPlan[]> | null = null

const fallback = fallbackPlans as PricingPlan[]

/** Enterprise is hand-assigned (`isActive = false` in the DB), so the API never returns it. */
const enterprise = fallback.filter((p) => p.id === 'enterprise')

function slug(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function formatPrice(amount: number, currency: string): string {
  const digits = Number.isInteger(amount) ? 0 : 2
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(amount)
  } catch {
    return `${amount} ${currency.toUpperCase()}`
  }
}

function toPlans(api: ApiPlan[]): PricingPlan[] {
  let highlightedSet = false
  const plans = api.map((sub): PricingPlan => {
    const amount = Number(sub.price)
    const free = sub.isDefault || amount === 0
    const highlighted = !free && !highlightedSet
    if (highlighted) highlightedSet = true
    return {
      id: slug(sub.name),
      name: sub.name,
      description: sub.description,
      price: formatPrice(amount, sub.currency),
      period: free ? 'forever' : `/ ${sub.interval}`,
      features: [...sub.details].sort((a, b) => a.sortOrder - b.sortOrder).map((d) => d.label),
      cta: free
        ? { label: 'Get started free', action: 'login' }
        : { label: `Upgrade to ${sub.name}`, action: 'contact' },
      highlighted,
    }
  })
  return [...plans, ...enterprise.filter((e) => !plans.some((p) => p.id === e.id))]
}

async function fetchPlans(): Promise<PricingPlan[]> {
  const res = await fetch(`${apiUrl}/subscriptions`)
  if (!res.ok) throw new Error(`GET /subscriptions failed: ${res.status}`)
  const plans = toPlans((await res.json()) as ApiPlan[])
  if (plans.length === 0) throw new Error('GET /subscriptions returned no plans')
  return plans
}

/** Plans already in memory (and still fresh), for a synchronous first render. */
export function getCachedPricingPlans(): PricingPlan[] | null {
  return cache && Date.now() - cache.at < TTL_MS ? cache.plans : null
}

/**
 * Pricing plans from resume-log-be, fetched at most once per TTL. Concurrent
 * callers share one request. On failure returns the bundled plans without
 * caching them, so the next call retries the API.
 */
export function getPricingPlans(): Promise<PricingPlan[]> {
  const cached = getCachedPricingPlans()
  if (cached) return Promise.resolve(cached)
  if (inflight) return inflight

  inflight = fetchPlans()
    .then((plans) => {
      cache = { plans, at: Date.now() }
      return plans
    })
    .catch((err: unknown) => {
      console.warn('[pricing] falling back to bundled plans:', err)
      return fallback
    })
    .finally(() => {
      inflight = null
    })
  return inflight
}

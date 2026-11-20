/*
 * The website's plans: hard-coded on purpose (no API call), so the prerendered
 * pricing page, JSON-LD and llms.txt always carry complete, stable content.
 *
 * Keep in sync with resume-log-be `subscriptions` (price, yearlyPrice) and the
 * Figma plan cards. Features live in ./plan-comparison.ts.
 */

export type BillingInterval = 'month' | 'year'

export type PricingPlan = {
  id: 'free' | 'pro' | 'enterprise'
  name: string
  description: string
  /** USD per month; null for sales-led plans (Enterprise). */
  monthly: number | null
  /** USD per year; null when the plan has no yearly price. */
  yearly: number | null
  highlighted?: boolean
  /** signup → dashboard sign-in; upgrade → dashboard /upgrade (sign-in, then Paddle checkout); contact → email. */
  cta: { label: string; action: 'signup' | 'upgrade' | 'contact' }
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Track your job search and try the ATS checker.',
    monthly: 0,
    yearly: null,
    cta: { label: 'Get started free', action: 'signup' },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Unlimited ATS scans with every keyword, fix and past scan, plus follow-ups and cover letters.',
    monthly: 11.99,
    yearly: 129.49,
    highlighted: true,
    cta: { label: 'Upgrade to Pro', action: 'upgrade' },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Everything in Pro, plus SAML / SSO and a direct support channel.',
    monthly: null,
    yearly: null,
    cta: { label: 'Contact us', action: 'contact' },
  },
]

export function formatUsd(amount: number): string {
  return `$${Number.isInteger(amount) ? amount : amount.toFixed(2)}`
}

/** Saving from paying yearly, as a whole percent (Pro: 129.49 vs 12 × 11.99 → 10). */
export function yearlySaving(plan: PricingPlan): number | null {
  if (!plan.monthly || !plan.yearly) return null
  return Math.round((1 - plan.yearly / (12 * plan.monthly)) * 100)
}

export const proPlan = pricingPlans.find((p) => p.id === 'pro')!

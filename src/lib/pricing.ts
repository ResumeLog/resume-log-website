import plans from '../data/pricing.json'

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

// Hardcoded for now — swap the body for a fetch to resume-log-be once plans live there.
export async function getPricingPlans(): Promise<PricingPlan[]> {
  return plans as PricingPlan[]
}

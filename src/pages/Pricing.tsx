import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { dashboardUrl } from '../lib/links'
import { getCachedPricingPlans, getPricingPlans, type PricingPlan } from '../lib/pricing'

/** "$11.99" → "$11" at full size with ".99" smaller, top-aligned; "$12" / "Custom" render as-is. */
function PriceAmount({ price }: { price: string }) {
  const match = /^(.*\d)(\.\d+)$/.exec(price)
  if (!match) return <span className="display text-[2.6rem]">{price}</span>
  const [, whole, cents] = match
  return (
    <span className="display inline-flex items-start text-[2.6rem]">
      {whole}
      <span className="mt-[0.3em] text-[0.5em] leading-none">{cents}</span>
    </span>
  )
}

function PlanSkeleton({ last }: { last: boolean }) {
  return (
    <div
      aria-hidden
      className={`border-line flex animate-pulse flex-col p-8 md:p-10 ${last ? '' : 'border-b md:border-r md:border-b-0'}`}
    >
      <div className="bg-line h-5 w-20 rounded" />
      <div className="bg-line mt-3 h-3 w-4/5 rounded" />
      <div className="bg-line mt-2 h-3 w-3/5 rounded" />
      <div className="bg-line mt-8 h-10 w-24 rounded" />
      <div className="bg-line mt-6 h-10 w-full rounded" />
      <div className="border-line mt-8 flex flex-col gap-3 border-t pt-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-line h-3 w-3/4 rounded" />
        ))}
      </div>
    </div>
  )
}

function PlanCta({ plan }: { plan: PricingPlan }) {
  const className = `${plan.highlighted ? 'btn-solid' : 'btn-outline'} w-full`

  if (plan.cta.action === 'login') {
    return (
      <a href={dashboardUrl} className={className}>
        {plan.cta.label}
      </a>
    )
  }

  return (
    <Link to="/get-started" className={className}>
      {plan.cta.label}
    </Link>
  )
}

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>(() => getCachedPricingPlans() ?? [])

  useEffect(() => {
    let cancelled = false
    getPricingPlans().then((p) => {
      if (!cancelled) setPlans(p)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div>
      <Section bare inner="px-6 pt-20 pb-16 md:px-14 md:pt-28">
        <Reveal>
          <Label>Pricing</Label>
          <Lede
            as="h1"
            className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl"
            lead="Free to start."
            tail="Upgrade when it gets busy."
          />
        </Reveal>
      </Section>

      <Section inner="grid md:grid-cols-3">
        {plans.length === 0 && [0, 1, 2].map((i) => <PlanSkeleton key={i} last={i === 2} />)}
        {plans.map((plan, i) => (
          <div
            key={plan.id}
            className={`border-line flex flex-col p-8 md:p-10 ${plan.highlighted ? 'bg-panel' : ''} ${
              i < plans.length - 1 ? 'border-b md:border-r md:border-b-0' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium tracking-tight">{plan.name}</h2>
              {plan.highlighted && <span className="chip !bg-white ring-1 ring-black/5">Recommended</span>}
            </div>
            <p className="text-muted-foreground mt-2 min-h-[3rem] text-sm leading-relaxed">{plan.description}</p>

            <div className="mt-6 flex items-baseline gap-1.5">
              <PriceAmount price={plan.price} />
              {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
            </div>

            <div className="mt-6">
              <PlanCta plan={plan} />
            </div>

            <ul className="border-line mt-8 flex flex-1 flex-col gap-3 border-t pt-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <Check size={15} strokeWidth={2.25} className="text-muted-foreground mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section inner="px-8 py-8 md:px-10">
        <p className="text-muted-foreground text-sm">
          Prices in USD. Payments and invoices are handled by Paddle. Every payment has a 14-day money-back guarantee.
          See the{' '}
          <Link to="/refund-policy" className="text-foreground underline decoration-line-strong underline-offset-4">
            refund policy
          </Link>
          .
        </p>
      </Section>
    </div>
  )
}

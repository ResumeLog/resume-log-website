import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { dashboardUrl } from '../lib/links'
import { getPricingPlans, type PricingPlan } from '../lib/pricing'

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
  const [plans, setPlans] = useState<PricingPlan[]>([])

  useEffect(() => {
    getPricingPlans().then(setPlans)
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
              <span className="display text-[2.6rem]">{plan.price}</span>
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

import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { getPricingPlans, type PricingPlan } from '../lib/pricing'

const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL ?? 'http://localhost:5173'

function PlanCta({ plan }: { plan: PricingPlan }) {
  const className = `${plan.highlighted ? 'btn-solid' : 'btn-outline'} mt-8 w-full`

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
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:px-16 md:pt-28">
      <Reveal>
        <p className="eyebrow">Pricing</p>
        <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">
          Simple plans for every stage of your search.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
          Start free and upgrade when your search picks up. No hidden fees, cancel anytime.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal
            key={plan.id}
            delay={index * 0.1}
            className={`card flex flex-col ${plan.highlighted ? 'border-foreground!' : ''}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">{plan.name}</h2>
              {plan.highlighted && <span className="tag text-xs">Most popular</span>}
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
            </div>

            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{plan.description}</p>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-foreground" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <PlanCta plan={plan} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

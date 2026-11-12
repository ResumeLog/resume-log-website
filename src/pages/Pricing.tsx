import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { Note } from '../components/illustrations/Doodles'
import { dashboardUrl } from '../lib/links'
import { getPricingPlans, type PricingPlan } from '../lib/pricing'

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
    <div>
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-16 md:px-12 md:pt-24">
          <Reveal>
            <p className="hand text-2xl">no surprises</p>
            <h1 className="display mt-3 max-w-3xl text-5xl sm:text-7xl">Free to start. Pro when it gets busy.</h1>
            <p className="text-ash-600 mt-7 max-w-xl text-lg leading-relaxed">
              Saving jobs and using the résumé editor is free. Upgrade when you’re applying every week and
              want unlimited ATS scans and follow-up reminders. Cancel any time.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-ash-100 border-t bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 pt-20 pb-12 md:grid-cols-3 md:px-12">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 0.06}
              className={`relative flex flex-col rounded-xl border-[1.5px] bg-white p-7 ${
                plan.highlighted
                  ? 'border-ink shadow-[6px_6px_0_var(--ink)] md:-translate-y-2'
                  : 'border-ash-200 shadow-[6px_6px_0_var(--ash-100)]'
              }`}
            >
              {plan.highlighted && <Note className="absolute -top-9 right-4 -rotate-3">the one I’d pick</Note>}
              <h2 className="display text-3xl">{plan.name}</h2>
              <p className="text-ash-600 mt-2 text-sm leading-relaxed">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="display text-5xl">{plan.price}</span>
                {plan.period && <span className="text-ash-500 text-sm">{plan.period}</span>}
              </div>

              <div className="rough-rule my-6" />

              <ul className="flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <PlanCta plan={plan} />
            </Reveal>
          ))}
        </div>
        <p className="text-ash-500 mx-auto max-w-6xl px-6 pb-20 text-sm md:px-12">
          Prices in USD. Payments and invoices are handled by Paddle. Every payment has a 14-day
          money-back guarantee, see the{' '}
          <Link to="/refund-policy" className="underline decoration-ash-300 underline-offset-4">
            refund policy
          </Link>
          .
        </p>
      </section>
    </div>
  )
}

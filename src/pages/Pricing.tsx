import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaqSection } from '../components/content'
import PlanComparisonTable from '../components/PlanComparisonTable'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { allFaqs } from '../data/faqs'
import { formatUsd, pricingPlans, proPlan, yearlySaving, type BillingInterval, type PricingPlan } from '../data/pricing'
import { contactEmail, dashboardUrl } from '../lib/links'

/** "$11.99" → "$11" at full size with ".99" smaller, top-aligned; "$0" / "Custom" render as-is. */
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

const pricingQuestions = [
  'Is ResumeLog free?',
  'Is there an annual plan?',
  'How many free ATS scans do I get?',
  'Can I get a refund?',
  'Who can see my log?',
]
const pricingFaqs = pricingQuestions.flatMap((q) => allFaqs.filter((f) => f.q === q))
const saving = yearlySaving(proPlan)

/** Price, period and the other billing option as text, so both prices are in the static HTML. */
function planPrice(plan: PricingPlan, interval: BillingInterval): { price: string; period?: string; note?: string } {
  if (plan.monthly === null) return { price: 'Custom', period: 'let’s talk' }
  if (plan.monthly === 0) return { price: formatUsd(0), period: 'for everyone' }
  if (interval === 'year' && plan.yearly) {
    return {
      price: formatUsd(plan.yearly),
      period: 'per year',
      note: `${formatUsd(plan.yearly / 12)} a month, billed yearly. Or ${formatUsd(plan.monthly)} monthly.`,
    }
  }
  return {
    price: formatUsd(plan.monthly),
    period: 'per month',
    note: plan.yearly ? `Or ${formatUsd(plan.yearly)} a year, save ${yearlySaving(plan)}%.` : undefined,
  }
}

const ease = [0.22, 1, 0.36, 1] as const

/** Where a plan's button goes. Upgrade → dashboard /upgrade: signs in if needed, then opens Paddle checkout. */
function ctaHref(plan: PricingPlan, interval: BillingInterval): string {
  const base = dashboardUrl.replace(/\/+$/, '')
  if (plan.cta.action === 'signup') return `${base}/sign-in`
  if (plan.cta.action === 'upgrade') {
    const billing = interval === 'year' && plan.yearly ? 'year' : 'month'
    return `${base}/upgrade?plan=${plan.id}&interval=${billing}`
  }
  return `mailto:${contactEmail}?subject=ResumeLog%20Enterprise`
}

/** Swaps text with a short rise-and-fade when `value` changes (a plain fade with reduced motion). */
function Swap({ value, children, className }: { value: string; children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const offset = reduce ? 0 : 8
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={value}
        className={className}
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -offset }}
        transition={{ duration: reduce ? 0.15 : 0.28, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function PlanCta({ plan, interval }: { plan: PricingPlan; interval: BillingInterval }) {
  const className = `${plan.highlighted ? 'btn-solid' : 'btn-outline'} w-full`
  const href = ctaHref(plan, interval)
  return (
    <a href={href} className={className}>
      {plan.cta.label}
    </a>
  )
}

function IntervalToggle({ value, onChange }: { value: BillingInterval; onChange: (v: BillingInterval) => void }) {
  const reduce = useReducedMotion()
  const option = (v: BillingInterval, label: string, badge?: string) => (
    <button
      type="button"
      aria-pressed={value === v}
      onClick={() => onChange(v)}
      className={`relative flex h-7 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors duration-200 ${
        value === v ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {value === v && (
        <motion.span
          layoutId="billing-interval-pill"
          aria-hidden
          className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-black/5"
          transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
        />
      )}
      <span className="relative">{label}</span>
      {badge && <span className="chip relative !h-[18px] !px-1.5 !text-[11px]">{badge}</span>}
    </button>
  )
  return (
    <div role="group" aria-label="Billing period" className="bg-panel border-line inline-flex gap-0.5 rounded-lg border p-0.5">
      {option('month', 'Monthly')}
      {option('year', 'Yearly', saving ? `Save ${saving}%` : undefined)}
    </div>
  )
}

export default function Pricing() {
  const [interval, setBillingInterval] = useState<BillingInterval>('month')

  return (
    <div>
      <Section bare inner="flex flex-col gap-8 px-6 pt-20 pb-16 md:flex-row md:items-end md:justify-between md:px-14 md:pt-28">
        <Reveal>
          <Label>Pricing</Label>
          <Lede
            as="h1"
            className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl"
            lead="Free to start."
            tail="Upgrade when it gets busy."
          />
        </Reveal>
        <IntervalToggle value={interval} onChange={setBillingInterval} />
      </Section>

      <Section inner="grid md:grid-cols-3">
        {pricingPlans.map((plan, i) => {
          const { price, period, note } = planPrice(plan, interval)
          return (
            <div
              key={plan.id}
              className={`border-line flex flex-col p-8 md:p-10 ${plan.highlighted ? 'bg-panel' : ''} ${
                i < pricingPlans.length - 1 ? 'border-b md:border-r md:border-b-0' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium tracking-tight">{plan.name}</h2>
                {plan.highlighted && <span className="chip !bg-white ring-1 ring-black/5">Recommended</span>}
              </div>
              <p className="text-muted-foreground mt-2 min-h-[3rem] text-sm leading-relaxed">{plan.description}</p>

              <div className="mt-6 min-h-[3.25rem]">
                <Swap value={`${price}${period}`} className="flex items-baseline gap-1.5">
                  <PriceAmount price={price} />
                  {period && <span className="text-muted-foreground text-sm">{period}</span>}
                </Swap>
              </div>
              <div className="mt-1 min-h-[1.25rem] text-[13px]">
                <Swap value={note ?? ''} className="text-subtle">
                  {note}
                </Swap>
              </div>

              <div className="mt-6">
                <PlanCta plan={plan} interval={interval} />
              </div>
            </div>
          )
        })}
      </Section>

      <Section id="compare" inner="flex flex-col">
        <div className="border-line border-b px-6 py-10 md:px-14">
          <Lede className="text-[1.7rem] sm:text-[2rem]" lead="Compare plans." tail="Everything each plan includes." />
        </div>
        <PlanComparisonTable />
      </Section>

      <Section inner="px-8 py-8 md:px-10">
        <p className="text-muted-foreground text-sm">
          Prices in USD. Monthly and yearly Pro include the same features. Payments and invoices are handled by Paddle.
          Every payment has a 14-day money-back guarantee. See the{' '}
          <Link to="/refund-policy" className="text-foreground underline decoration-line-strong underline-offset-4">
            refund policy
          </Link>
          .
        </p>
      </Section>
      <FaqSection faqs={pricingFaqs} lead="Pricing questions." tail="Answered." />
    </div>
  )
}

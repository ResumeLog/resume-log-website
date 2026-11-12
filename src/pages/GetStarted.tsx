import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { contactEmail, dashboardUrl, extensionUrl } from '../lib/links'

const steps = [
  {
    title: 'Add the extension to Chrome',
    body: 'It’s free on the Chrome Web Store. Pin it so it’s always in your toolbar.',
    action: { label: 'Chrome Web Store', href: extensionUrl, external: true, solid: true },
  },
  {
    title: 'Sign in with Google',
    body: 'Open the side panel and press Sign in. You’ll land on the dashboard; continue with Google and the extension connects itself.',
    action: { label: 'Open dashboard', href: dashboardUrl, external: false, solid: false },
  },
  {
    title: 'Save your first job',
    body: 'Open any job on LinkedIn, open the side panel and press Save. It appears in your dashboard straight away.',
    action: null,
  },
]

export default function GetStarted() {
  return (
    <div>
      <Section bare inner="px-6 pt-20 pb-16 md:px-14 md:pt-28">
        <Reveal>
          <Label>Get started</Label>
          <Lede
            as="h1"
            className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl"
            lead="Set up in about two minutes."
            tail="Three steps, no onboarding call."
          />
        </Reveal>
      </Section>

      <Section inner="grid md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal
            key={step.title}
            className={`border-line flex flex-col p-8 md:p-10 ${i < steps.length - 1 ? 'border-b md:border-r md:border-b-0' : ''}`}
          >
            <span className="text-subtle font-mono text-sm tabular-nums">0{i + 1}</span>
            <h2 className="mt-3 text-lg font-medium tracking-tight">{step.title}</h2>
            <p className="text-muted-foreground mt-2 flex-1 leading-relaxed">{step.body}</p>
            {step.action && (
              <a
                href={step.action.href}
                {...(step.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`${step.action.solid ? 'btn-solid' : 'btn-outline'} mt-6 self-start`}
              >
                {step.action.label}
                <ArrowUpRight size={15} />
              </a>
            )}
          </Reveal>
        ))}
      </Section>

      <Section inner="grid md:grid-cols-2">
        <Reveal className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
          <p className="lede max-w-md text-lg">
            Want Pro?{' '}
            <span className="tail">
              Start on the free plan, then open Plans in the dashboard sidebar and upgrade. Checkout is handled by Paddle.
            </span>
          </p>
        </Reveal>
        <Reveal className="p-8 md:p-12">
          <p className="lede max-w-md text-lg">
            Coaching a group? <span className="tail">If you run a bootcamp or coach job seekers, email</span>{' '}
            <a href={`mailto:${contactEmail}`} className="underline decoration-line-strong underline-offset-4">
              {contactEmail}
            </a>
            <span className="tail">.</span>
          </p>
        </Reveal>
      </Section>
    </div>
  )
}

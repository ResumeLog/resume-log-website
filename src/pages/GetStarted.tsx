import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { Note } from '../components/illustrations/Doodles'
import { PaperPlane } from '../components/illustrations/Scenes'
import { contactEmail, dashboardUrl, extensionUrl } from '../lib/links'

const steps = [
  {
    title: 'Add the extension to Chrome',
    body: 'It’s free on the Chrome Web Store. Pin it so the icon is always in your toolbar.',
    action: { label: 'Open the Chrome Web Store', href: extensionUrl, external: true },
  },
  {
    title: 'Sign in with Google',
    body: 'Open the side panel and press Sign in. You’ll land on the dashboard, continue with Google, and the extension connects itself.',
    action: { label: 'Open the dashboard', href: dashboardUrl, external: false },
  },
  {
    title: 'Save your first job',
    body: 'Go to any job on LinkedIn, open the side panel and press Save. Then check the dashboard: it’s there.',
    action: null,
  },
]

export default function GetStarted() {
  return (
    <div>
      <section className="dot-grid">
        <div className="mx-auto grid max-w-6xl items-end gap-10 px-6 pt-16 pb-16 md:grid-cols-[1.4fr_1fr] md:px-12 md:pt-24">
          <Reveal>
            <p className="hand text-2xl">three steps, about two minutes</p>
            <h1 className="display mt-3 text-5xl sm:text-7xl">Let’s get you set up.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <PaperPlane className="text-ink mx-auto w-full max-w-xs" />
          </Reveal>
        </div>
      </section>

      <section className="border-ash-100 border-t bg-white">
        <ol className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-20 md:px-12">
          {steps.map((step, i) => (
            <Reveal key={step.title}>
              <li className="border-ash-200 flex gap-6 rounded-xl border-[1.5px] bg-white p-7 shadow-[5px_5px_0_var(--ash-100)]">
                <span className="hand text-5xl leading-none text-ink">{i + 1}</span>
                <div>
                  <h2 className="text-xl font-semibold">{step.title}</h2>
                  <p className="text-ash-600 mt-2 leading-relaxed">{step.body}</p>
                  {step.action && (
                    <a
                      href={step.action.href}
                      {...(step.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`${i === 0 ? 'btn-solid' : 'btn-outline'} mt-5`}
                    >
                      {step.action.label}
                      <ArrowUpRight size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mx-auto max-w-3xl px-6 pb-20 md:px-12">
          <Note className="-rotate-2">that’s it, honestly. no onboarding call.</Note>
        </div>
      </section>

      <section className="border-ash-100 border-t">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:px-12">
          <Reveal>
            <h2 className="display text-3xl sm:text-4xl">Want Pro?</h2>
            <p className="text-ash-600 mt-3 max-w-md leading-relaxed">
              Start on the free plan, then open <strong className="text-ink font-medium">Plans</strong> in the
              dashboard sidebar and upgrade there. Checkout is handled by Paddle and takes a minute.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display text-3xl sm:text-4xl">Coaching a group?</h2>
            <p className="text-ash-600 mt-3 max-w-md leading-relaxed">
              If you run a bootcamp or coach job seekers and want ResumeLog for your group, email{' '}
              <a href={`mailto:${contactEmail}`} className="text-ink underline decoration-ash-300 underline-offset-4">
                {contactEmail}
              </a>{' '}
              and tell me what you need.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

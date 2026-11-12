import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Note, Sparkle } from '../components/illustrations/Doodles'
import { Sketch, Stroke } from '../components/illustrations/Ink'
import { BrowserPanel } from '../components/illustrations/Scenes'
import { dashboardUrl, extensionUrl } from '../lib/links'
import { screens } from '../lib/screens'

type Step = { title: string; body: ReactNode; visual: ReactNode; note?: string }

const steps: Step[] = [
  {
    title: 'Add the extension and sign in',
    body: (
      <>
        Install ResumeLog from the{' '}
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ash-300 underline-offset-4">
          Chrome Web Store
        </a>{' '}
        and pin it. The first time you open the side panel it asks you to sign in. That opens the
        dashboard, you continue with Google, and the extension is connected. No new password.
      </>
    ),
    visual: <BrowserPanel className="text-ink mx-auto w-full max-w-sm" />,
    note: 'takes about a minute',
  },
  {
    title: 'Browse LinkedIn and press Save',
    body: 'Open the side panel and go through jobs the way you normally would. When one looks worth keeping, press Save. Do the same on a company page or a recruiter’s profile. Each save is kept in the extension first and then synced, so nothing is lost if your connection drops.',
    visual: (
      <div className="flex justify-center gap-5">
        <ScreenshotFrame {...screens.extensionDetected} variant="panel" tilt={-2} className="w-[42%] max-w-[210px]" />
        <ScreenshotFrame {...screens.extensionSaved} variant="panel" tilt={2} className="mt-8 w-[42%] max-w-[210px]" />
      </div>
    ),
  },
  {
    title: 'Tailor your résumé before you apply',
    body: 'Upload your résumé as a Word file and open it in the editor. Run an ATS check against the job you just saved, add the keywords that are genuinely true for you, and publish it as a PDF. It goes into your résumé library.',
    visual: <ScreenshotFrame {...screens.atsPanel} variant="plain" tilt={1.5} className="mx-auto w-[50%] max-w-[210px]" />,
    note: 'only add what’s actually true :)',
  },
  {
    title: 'Apply, and let the log keep up',
    body: 'Apply wherever the job is. If it’s LinkedIn Easy Apply, your questions and answers are saved when you press Submit. Otherwise set the status to Applied and attach the PDF you sent. It takes one click.',
    visual: <ScreenshotFrame {...screens.jobDetail} variant="plain" tilt={-1.5} tape className="mx-auto max-w-md" />,
  },
  {
    title: 'Check in once a week',
    body: 'Open the dashboard to see what’s moved. Update statuses as replies come in, follow up on anything that’s gone quiet (Pro), and use the funnel to see where things usually stall for you.',
    visual: <ScreenshotFrame {...screens.followUpsFunnel} variant="plain" tilt={0.8} tape />,
  },
]

const faqs = [
  {
    q: 'Does it apply to jobs for me?',
    a: 'No. ResumeLog never submits anything on your behalf. It writes down what you did.',
  },
  {
    q: 'What does the extension read?',
    a: 'Only the LinkedIn page in front of you: when you press Save, and the Easy Apply review screen when you press Submit. It doesn’t read your messages or your feed.',
  },
  {
    q: 'Who can see my log?',
    a: 'Just you. Everything is tied to your Google sign-in and isn’t shared or sold. You can delete any entry at any time.',
  },
  {
    q: 'Which browsers does it work in?',
    a: 'Chrome. Other Chromium browsers that install from the Chrome Web Store may work, but I only test in Chrome.',
  },
  {
    q: 'Does it work outside LinkedIn?',
    a: 'Saving works on LinkedIn today. The résumé editor and the ATS check work with any job: pick one you saved, or paste the description from wherever you found it.',
  },
]

/** The dashed, wandering line that joins the steps on wide screens. */
function Path() {
  return (
    <Sketch viewBox="0 0 40 1000" preserveAspectRatio="none" className="text-ash-300 absolute top-0 left-[19px] hidden h-full w-10 md:block">
      <Stroke d="M20 0 C 6 120, 34 220, 18 340 S 4 560, 22 680 S 34 880, 20 1000" tone="faint" dashed />
    </Sketch>
  )
}

export default function HowItWorks() {
  return (
    <div>
      <section className="dot-grid">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:px-12 md:pt-24">
          <Reveal>
            <p className="hand text-2xl">from first install to the offer</p>
            <h1 className="display mt-3 max-w-3xl text-5xl sm:text-7xl">How it fits into your search.</h1>
            <p className="text-ash-600 mt-7 max-w-xl text-lg leading-relaxed">
              You don’t change how you look for jobs. ResumeLog sits next to LinkedIn and fills in the
              boring parts as you go.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-ash-100 border-t bg-white">
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-12">
          <Path />
          <ol className="flex flex-col gap-24">
            {steps.map((step, i) => (
              <li key={step.title} className="relative grid items-start gap-10 md:grid-cols-[1fr_1fr] md:pl-16">
                <span className="bg-paper border-ink absolute top-0 left-0 hidden size-10 items-center justify-center rounded-full border-[1.5px] md:flex">
                  <span className="hand text-2xl leading-none">{i + 1}</span>
                </span>
                <Reveal>
                  <p className="hand text-3xl md:hidden">{i + 1}.</p>
                  <h2 className="display text-4xl sm:text-[2.6rem] md:-mt-1">{step.title}</h2>
                  <p className="text-ash-600 mt-4 max-w-md leading-relaxed">{step.body}</p>
                  {step.note && <Note className="mt-5 -rotate-2">{step.note}</Note>}
                </Reveal>
                <Reveal delay={0.1}>{step.visual}</Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-ash-100 border-t">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.6fr] md:px-12">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">Questions people ask</h2>
            <Sparkle className="text-ink mt-6 size-10" />
          </Reveal>
          <dl className="flex flex-col">
            {faqs.map((faq) => (
              <Reveal key={faq.q} className="border-ash-200 border-b py-6 first:pt-0">
                <dt className="text-lg font-semibold">{faq.q}</dt>
                <dd className="text-ash-600 mt-2 leading-relaxed">{faq.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="dot-grid border-ash-100 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-12">
          <h2 className="display max-w-xl text-4xl sm:text-5xl">Step one takes a minute.</h2>
          <div className="flex flex-wrap gap-4">
            <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid group">
              Add to Chrome
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </a>
            <a href={dashboardUrl} className="btn-outline">
              Open the dashboard
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

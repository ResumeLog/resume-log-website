import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Label, Lede, Section, Stage } from '../components/ui'
import { dashboardUrl, extensionUrl } from '../lib/links'
import { screens } from '../lib/screens'

type Step = { title: string; body: ReactNode; visual: ReactNode }

const steps: Step[] = [
  {
    title: 'Add the extension and sign in',
    body: (
      <>
        Install ResumeLog from the{' '}
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-line-strong underline-offset-4">
          Chrome Web Store
        </a>{' '}
        and pin it. The first time you open the side panel it asks you to sign in: the dashboard opens, you
        continue with Google, and the extension connects itself. No new password.
      </>
    ),
    visual: (
      <Stage className="flex h-full min-h-[360px] items-end justify-center px-6 pt-10">
        <ScreenshotFrame {...screens.extensionDetected} variant="panel" className="w-[50%] max-w-[240px] translate-y-10" />
      </Stage>
    ),
  },
  {
    title: 'Browse LinkedIn and press Save',
    body: 'Go through jobs the way you normally would. When one is worth keeping, press Save. The same works on company pages and recruiters’ profiles. Each save is stored in the extension first and then synced.',
    visual: (
      <Stage className="flex h-full min-h-[360px] items-end justify-center px-6 pt-10">
        <ScreenshotFrame {...screens.extensionSaved} variant="panel" className="w-[50%] max-w-[240px] translate-y-10" />
      </Stage>
    ),
  },
  {
    title: 'Tailor your résumé before you apply',
    body: 'Upload your résumé as a Word file and open it in the editor. Run an ATS check against the job you saved, add the keywords that are genuinely true for you, and publish a PDF to your library.',
    visual: (
      <Stage bleed="left" className="h-full">
        <ScreenshotFrame {...screens.editorAts} />
      </Stage>
    ),
  },
  {
    title: 'Apply, and let the log keep up',
    body: 'Apply wherever the job is. With LinkedIn Easy Apply, your questions and answers are saved when you press Submit. Otherwise set the status to Applied and attach the PDF you sent.',
    visual: (
      <Stage className="flex h-full items-center justify-center p-6 sm:p-10">
        <ScreenshotFrame {...screens.jobDetail} variant="plain" className="w-full max-w-md" />
      </Stage>
    ),
  },
  {
    title: 'Check in once a week',
    body: 'Open the dashboard to see what’s moved. Update statuses as replies arrive, follow up on anything that’s gone quiet (Pro), and use the funnel to see where things stall.',
    visual: (
      <Stage className="flex h-full items-center p-6 sm:p-10">
        <ScreenshotFrame {...screens.followUpsFunnel} variant="plain" />
      </Stage>
    ),
  },
]

const faqs = [
  { q: 'Does it apply to jobs for me?', a: 'No. ResumeLog never submits anything on your behalf. It records what you did.' },
  {
    q: 'What does the extension read?',
    a: 'Only the LinkedIn page in front of you: when you press Save, and the Easy Apply review screen when you press Submit. Not your messages, not your feed.',
  },
  {
    q: 'Who can see my log?',
    a: 'Only you. Everything is tied to your Google sign-in and is never shared or sold. You can delete any entry at any time.',
  },
  {
    q: 'Which browsers does it work in?',
    a: 'Chrome. Other Chromium browsers that install from the Chrome Web Store may work, but only Chrome is tested.',
  },
  {
    q: 'Does it work outside LinkedIn?',
    a: 'Saving works on LinkedIn today. The résumé editor and ATS check work with any job: pick one you saved, or paste the description.',
  },
  {
    q: 'What does it cost?',
    a: 'Free covers saving, the editor and five ATS scans a day. Pro is $12 a month with a 14-day money-back guarantee.',
  },
]

export default function HowItWorks() {
  return (
    <div>
      <Section bare inner="px-6 pt-20 pb-16 md:px-14 md:pt-28">
        <Reveal>
          <Label>How it works</Label>
          <Lede
            as="h1"
            className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl"
            lead="Fits around how you already search."
            tail="No new habits."
          />
        </Reveal>
      </Section>

      {steps.map((step, i) => (
        <Section key={step.title} inner="grid md:grid-cols-[1fr_1.35fr]">
          <Reveal className="border-line flex flex-col border-b p-8 md:border-r md:border-b-0 md:p-12">
            <span className="text-subtle font-mono text-sm tabular-nums">0{i + 1}</span>
            <h2 className="lede mt-3 text-2xl sm:text-[1.7rem]">{step.title}</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{step.body}</p>
          </Reveal>
          <div className="min-h-[300px]">{step.visual}</div>
        </Section>
      ))}

      <Section inner="grid md:grid-cols-[1fr_1.35fr]">
        <div className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
          <Lede className="text-[1.7rem] sm:text-[2rem]" lead="Questions." tail="The ones people ask first." />
        </div>
        <dl>
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} className={`p-8 md:px-12 ${i > 0 ? 'border-line border-t' : ''}`}>
              <dt className="font-medium">{faq.q}</dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">{faq.a}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      <Section inner="flex flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-14">
        <Lede className="max-w-xl text-[1.7rem] sm:text-[2rem]" lead="Step one takes a minute." tail="Everything after that happens as you browse." />
        <div className="flex flex-wrap gap-2.5">
          <a href={dashboardUrl} className="btn-outline btn-lg">
            Open dashboard
          </a>
          <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid btn-lg">
            Add to Chrome
            <ArrowRight size={16} />
          </a>
        </div>
      </Section>
    </div>
  )
}

import { ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Note, Underline } from '../components/illustrations/Doodles'
import { Notebook } from '../components/illustrations/Scenes'
import { extensionUrl } from '../lib/links'
import { screens } from '../lib/screens'

type Feature = {
  id: string
  title: string
  plan: 'Free' | 'Pro' | 'Free · more on Pro'
  body: string
  points: string[]
  visual: ReactNode
}

const features: Feature[] = [
  {
    id: 'capture',
    title: 'Save jobs, people and companies from LinkedIn',
    plan: 'Free',
    body: 'The extension opens as a side panel next to LinkedIn. It knows whether you’re on a job, a company page or someone’s profile, and switches tabs to match. Press Save and it’s in your log.',
    points: [
      'Title, company, location and the full job description',
      'Company size, industry and location',
      'A person’s name, headline and current company',
      'Saved on your machine first, then synced, so a flaky connection doesn’t lose anything',
    ],
    visual: (
      <div className="flex justify-center gap-6">
        <ScreenshotFrame {...screens.extensionDetected} variant="panel" tilt={-2} className="w-[44%] max-w-[240px]" />
        <ScreenshotFrame {...screens.extensionSaved} variant="panel" tilt={2} className="mt-10 w-[44%] max-w-[240px]" />
      </div>
    ),
  },
  {
    id: 'easy-apply',
    title: 'Easy Apply answers, kept with the job',
    plan: 'Free',
    body: 'When you finish a LinkedIn Easy Apply and press Submit, ResumeLog reads the review screen and keeps the questions, your answers and the résumé you uploaded. Weeks later, before the call, you can see exactly what you told them.',
    points: [
      'Captured automatically when you press Submit',
      'Works when you reuse a résumé LinkedIn already has',
      'Stored against the job, so it’s there when you open it',
    ],
    visual: (
      <div className="relative mx-auto max-w-sm">
        <Notebook className="text-ink w-full" />
        <Note className="absolute -bottom-6 left-4 -rotate-3">“Expected salary?” — what did I say…</Note>
      </div>
    ),
  },
  {
    id: 'tracker',
    title: 'A job tracker that fills itself in',
    plan: 'Free',
    body: 'Every saved job lands in a table you can sort and customise. Give it a status, note your salary expectation, attach the CV you sent and keep the original description for later.',
    points: [
      'Statuses: Bookmarked, Applied, Interviewing, Negotiating, Accepted, Closed',
      'Pick which columns you see, and add your own',
      'Attach a PDF résumé to each job',
      'Separate lists for people and companies',
    ],
    visual: (
      <div className="relative">
        <ScreenshotFrame {...screens.jobsTable} tilt={0.5} className="md:mr-16" />
        <ScreenshotFrame {...screens.jobDetail} variant="plain" tilt={-2} tape className="absolute -bottom-12 -right-2 w-[46%]" />
      </div>
    ),
  },
  {
    id: 'dashboard',
    title: 'A dashboard that tells you how it’s going',
    plan: 'Free · more on Pro',
    body: 'See how many jobs, people and companies you’ve saved, how many applications got a response, and where in the process things tend to stop.',
    points: [
      'Response rate by week, for the last 7 days, 30 days or 3 months',
      'An outcome funnel from saved to accepted',
      'A feed of everything you’ve recently saved',
    ],
    visual: (
      <div className="relative">
        <ScreenshotFrame {...screens.dashboard} tilt={-0.6} className="md:mr-20" />
        <ScreenshotFrame {...screens.recentActivity} variant="plain" tilt={2} tape className="absolute -right-2 -bottom-14 hidden w-[48%] sm:block" />
      </div>
    ),
  },
  {
    id: 'ats',
    title: 'An ATS check against the job you saved',
    plan: 'Free · more on Pro',
    body: 'Pick a saved job (or paste a description) and scan your résumé against it. The score is made of six parts you can see, so you know what to change instead of guessing.',
    points: [
      'Keyword match, with what’s missing and what’s already there',
      'Job title match, sections, parseability, content and qualifications',
      'Click a found keyword to highlight it in your résumé',
      'Free: 5 scans a day. Pro: unlimited scans, every fix and your scan history',
    ],
    visual: (
      <div className="relative">
        <ScreenshotFrame {...screens.editorAts} url="app.resumeloghq.com/editor" tilt={0.4} />
      </div>
    ),
  },
  {
    id: 'editor',
    title: 'Edit Word résumés and publish PDFs',
    plan: 'Free',
    body: 'Upload a .docx and edit it right in the browser, with the formatting kept. When it’s ready, publish it as a PDF and it’s added to your résumé library, ready to attach to a job.',
    points: [
      'A real document editor: fonts, lists, headings, comments',
      'Saves as you go',
      'One click from Word document to PDF',
      'Star the versions you use most',
    ],
    visual: <ScreenshotFrame {...screens.resumeLibrary} tilt={-0.6} />,
  },
  {
    id: 'follow-ups',
    title: 'Follow-up reminders',
    plan: 'Pro',
    body: 'Jobs you applied to two weeks ago or more, with no reply, are listed on your dashboard with how long they’ve been waiting. The older ones are at the top.',
    points: ['Shows up automatically, nothing to set up', 'Click a job to open it and update its status'],
    visual: <ScreenshotFrame {...screens.followUpsFunnel} variant="plain" tilt={-0.5} tape />,
  },
]

export default function Features() {
  return (
    <div>
      <section className="dot-grid">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-20 md:grid-cols-[1.2fr_1fr] md:px-12 md:pt-24">
          <Reveal>
            <p className="hand text-2xl">everything it does, honestly</p>
            <h1 className="display mt-3 text-5xl sm:text-7xl">
              What’s in{' '}
              <span className="relative inline-block">
                ResumeLog
                <Underline className="text-ink absolute -bottom-2 left-0 h-4 w-full" delay={0.4} />
              </span>
            </h1>
            <p className="text-ash-600 mt-7 max-w-lg text-lg leading-relaxed">
              Two parts: an extension that saves things while you browse LinkedIn, and a dashboard
              where you track applications and work on your résumé. Here’s each feature, with real
              screens.
            </p>
          </Reveal>

          {/* contents page */}
          <Reveal delay={0.1} className="border-ink self-end rounded-xl border-[1.5px] bg-white p-6 shadow-[6px_6px_0_var(--ash-200)]">
            <p className="hand text-2xl text-ink">contents</p>
            <ol className="mt-3 flex flex-col">
              {features.map((f, i) => (
                <li key={f.id}>
                  <a href={`#${f.id}`} className="group flex items-baseline gap-3 py-1.5 text-sm">
                    <span className="hand text-ash-500 w-5 text-lg">{i + 1}</span>
                    <span className="group-hover:underline">{f.title}</span>
                    <span className="border-ash-200 mx-1 flex-1 border-b border-dotted" />
                    <span className="text-ash-500 text-xs whitespace-nowrap">{f.plan}</span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {features.map((f, i) => (
        <section key={f.id} id={f.id} className={`border-ash-100 scroll-mt-16 border-t ${i % 2 === 0 ? 'bg-white' : ''}`}>
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.35fr] md:px-12">
            <Reveal className={i % 2 === 1 ? 'md:order-2' : ''}>
              <div className="flex items-center gap-3">
                <span className="hand text-5xl text-ink">{i + 1}.</span>
                <span className="border-ash-300 text-ash-600 rounded-full border border-dashed px-2.5 py-0.5 text-xs">
                  {f.plan}
                </span>
              </div>
              <h2 className="display mt-3 text-4xl sm:text-[2.7rem]">{f.title}</h2>
              <p className="text-ash-600 mt-5 leading-relaxed">{f.body}</p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {f.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1} className={`pb-10 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              {f.visual}
            </Reveal>
          </div>
        </section>
      ))}

      <section className="dot-grid border-ash-100 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-12">
          <h2 className="display max-w-xl text-4xl sm:text-5xl">Try it on the next job you look at.</h2>
          <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid group shrink-0">
            Add to Chrome, it’s free
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </div>
  )
}

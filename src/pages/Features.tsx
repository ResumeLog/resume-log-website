import { ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Label, Lede, Section, Stage } from '../components/ui'
import { CaptureFlow } from '../components/vignettes'
import { extensionUrl } from '../lib/links'
import { screens } from '../lib/screens'

type Feature = {
  id: string
  title: string
  short: string
  plan: 'Free' | 'Pro' | 'Free · more on Pro'
  body: string
  points: string[]
  visual: ReactNode
}

/** Each feature links to the use-case page that targets its search. */
const learnMore: Record<string, { to: string; label: string }> = {
  capture: { to: '/job-tracker-chrome-extension', label: 'More on the job tracker Chrome extension' },
  tracker: { to: '/job-application-tracker', label: 'More on the job application tracker' },
  dashboard: { to: '/job-search-organizer', label: 'More on the job search organizer' },
  ats: { to: '/ats-resume-checker', label: 'More on the ATS resume checker' },
  editor: { to: '/resume-manager', label: 'More on the resume manager' },
  'follow-ups': { to: '/guides/how-to-follow-up-on-a-job-application', label: 'How to follow up on an application' },
}

const features: Feature[] = [
  {
    id: 'capture',
    short: 'Job board capture',
    title: 'Save jobs, people and companies as you browse',
    plan: 'Free',
    body: 'The extension opens as a side panel next to LinkedIn, Indeed, Glassdoor, Ashby and Y Combinator, with more job boards on the way. It knows whether you’re on a job, a company page or a profile, and switches to match. Press Save and it’s in your log.',
    points: [
      'Title, company, location and the full job description',
      'Company size, industry and location from Indeed, Glassdoor and Y Combinator',
      'LinkedIn profiles and company pages: the link is saved, you add the details',
      'Saved locally first, then synced, so a dropped connection loses nothing',
    ],
    visual: (
      <Stage className="flex h-full min-h-[420px] items-end justify-center gap-6 px-6 pt-10">
        <ScreenshotFrame {...screens.extensionDetected} variant="panel" className="w-[42%] max-w-[230px] translate-y-8" />
        <ScreenshotFrame {...screens.extensionSaved} variant="panel" className="w-[42%] max-w-[230px] translate-y-16" />
      </Stage>
    ),
  },
  {
    id: 'tracker',
    short: 'Job tracker',
    title: 'A job tracker that fills itself in',
    plan: 'Free',
    body: 'Every saved job lands in a table you can sort and customise. Give it a status, note your salary expectation, attach the CV you sent and keep the original description.',
    points: [
      'Bookmarked, Applied, Interviewing, Negotiating, Accepted, Closed',
      'Choose which columns you see, and add your own',
      'Attach a PDF resume to each job',
      'Separate lists for people and companies',
    ],
    visual: (
      <Stage bleed className="h-full">
        <ScreenshotFrame {...screens.jobsTable} />
      </Stage>
    ),
  },
  {
    id: 'dashboard',
    short: 'Dashboard',
    title: 'A dashboard that shows how it’s going',
    plan: 'Free · more on Pro',
    body: 'How many jobs, people and companies you’ve saved, how many applications got a response, and where in the process things tend to stop.',
    points: [
      'Response rate by week: last 7 days, 30 days or 3 months',
      'An outcome funnel from saved to accepted',
      'A feed of everything you’ve recently saved',
    ],
    visual: (
      <Stage bleed className="h-full">
        <ScreenshotFrame {...screens.dashboard} />
      </Stage>
    ),
  },
  {
    id: 'ats',
    short: 'ATS check',
    title: 'An ATS check against the job you saved',
    plan: 'Free · more on Pro',
    body: 'Pick a saved job, or paste a description, and scan your resume against it. The score is made of six parts you can see, so you know what to change instead of guessing.',
    points: [
      'Keyword match, with what’s missing and what’s already there',
      'Job title, sections, parseability, content and qualifications',
      'Click a found keyword to highlight it in your resume',
      'Free: 5 scans a day. Pro: unlimited, every fix, scan history',
    ],
    visual: (
      <Stage bleed="left" className="h-full">
        <ScreenshotFrame {...screens.editorAts} />
      </Stage>
    ),
  },
  {
    id: 'editor',
    short: 'Resume editor',
    title: 'Edit Word resumes, publish PDFs',
    plan: 'Free',
    body: 'Upload a .docx and edit it in the browser with its formatting intact. When it’s ready, publish a PDF straight into your resume library.',
    points: ['Fonts, lists, headings and comments', 'Saves as you go', 'One click from Word to PDF', 'Star the versions you use most'],
    visual: (
      <Stage bleed className="h-full">
        <ScreenshotFrame {...screens.resumeLibrary} />
      </Stage>
    ),
  },
  {
    id: 'follow-ups',
    short: 'Follow-ups',
    title: 'Follow-up reminders',
    plan: 'Pro',
    body: 'Jobs you applied to two or more weeks ago with no reply are listed on your dashboard, oldest first, with how long each has been waiting.',
    points: ['Nothing to set up', 'Click a job to open it and update its status'],
    visual: (
      <Stage className="flex h-full items-center p-6 sm:p-10">
        <ScreenshotFrame {...screens.followUpsFunnel} variant="plain" />
      </Stage>
    ),
  },
]

export default function Features() {
  return (
    <div>
      <Section bare inner="grid lg:grid-cols-[1fr_1fr]">
        <div className="border-line border-b px-6 pt-20 pb-16 md:px-14 md:pt-28 lg:border-r lg:border-b-0">
          <Reveal>
            <Label>Features</Label>
            <Lede
              as="h1"
              className="mt-5 max-w-xl text-[2.2rem] sm:text-5xl"
              lead="Everything in ResumeLog."
              tail="Capture, track, tailor and follow up."
            />
          </Reveal>
          <nav className="mt-10 flex flex-wrap gap-2">
            {features.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="btn-outline !h-8 !px-3 !text-[13px]">
                {f.short}
              </a>
            ))}
          </nav>
        </div>
        <CaptureFlow className="min-h-[340px]" />
      </Section>

      {features.map((f) => (
        <Section key={f.id} id={f.id} className="scroll-mt-14" inner="grid md:grid-cols-[1fr_1.45fr]">
          <Reveal className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
            <span className="chip">{f.plan}</span>
            <h2 className="lede mt-4 text-2xl sm:text-[1.7rem]">{f.title}</h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">{f.body}</p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {f.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <Check size={15} strokeWidth={2.25} className="text-muted-foreground mt-0.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {learnMore[f.id] && (
              <Link
                to={learnMore[f.id].to}
                className="text-foreground mt-6 inline-flex items-center gap-1 text-sm font-medium underline decoration-line-strong underline-offset-4"
              >
                {learnMore[f.id].label}
                <ArrowRight size={14} />
              </Link>
            )}
          </Reveal>
          <div className="min-h-[320px]">{f.visual}</div>
        </Section>
      ))}

      <Section inner="flex flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-14">
        <Lede className="max-w-xl text-[1.7rem] sm:text-[2rem]" lead="Try it on the next job you open." tail="It takes about a minute to set up." />
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid btn-lg shrink-0">
          Add to Chrome, it’s free
          <ArrowRight size={16} />
        </a>
      </Section>
    </div>
  )
}

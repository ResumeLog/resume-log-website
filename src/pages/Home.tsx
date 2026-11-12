import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Arrow, Circle, Note, Sparkle, Underline } from '../components/illustrations/Doodles'
import { BrowserPanel, Calendar, Magnifier, Notebook, PaperPlane, TabChaos } from '../components/illustrations/Scenes'
import { dashboardUrl, extensionUrl } from '../lib/links'
import { screens } from '../lib/screens'

const pains = [
  'Forty tabs open, and you’re scared to close any of them.',
  'A spreadsheet you stopped updating in week two.',
  '“Which version of my résumé did I send them?”',
  'A recruiter who never replied. Or did they?',
]

const extras = [
  { title: 'Easy Apply, remembered', body: 'When you submit through LinkedIn Easy Apply, the questions and your answers are saved with the job.' },
  { title: 'People and companies', body: 'Save the recruiter’s profile and the company page from the same side panel.' },
  { title: 'A résumé library', body: 'Every tailored PDF in one place, with the one you sent attached to each job.' },
  { title: 'Statuses that mean something', body: 'Bookmarked, Applied, Interviewing, Negotiating, Accepted, Closed. Change it in one click.' },
]

export default function Home() {
  return (
    <div>
      {/* ───────────── Hero ───────────── */}
      <section className="dot-grid relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:px-12 md:pt-24">
          <motion.p
            initial={{ opacity: 0, rotate: -4 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hand text-2xl"
          >
            made by a job seeker, for job seekers
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="display mt-5 max-w-4xl text-[2.9rem] sm:text-7xl lg:text-[5.6rem]"
          >
            Every job you apply to,{' '}
            <span className="relative inline-block italic">
              remembered.
              <Underline className="text-ink absolute -bottom-2 left-0 h-4 w-full sm:-bottom-3 sm:h-5" delay={0.7} />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end"
          >
            <p className="text-ash-600 max-w-xl text-lg leading-relaxed">
              ResumeLog is a Chrome extension and a dashboard for your job search. Save a LinkedIn job in
              one click, check your résumé against it before you apply, and see which applications have
              gone quiet.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:justify-end">
              <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid group">
                Add to Chrome, it’s free
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
              <a href={dashboardUrl} className="btn-outline">
                Open the dashboard
              </a>
            </div>
          </motion.div>
        </div>

        {/* screenshot collage */}
        <div className="relative mx-auto max-w-6xl px-6 pb-20 md:px-12 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative md:mr-24"
          >
            <ScreenshotFrame {...screens.dashboard} tilt={-1} tape eager />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="absolute right-4 bottom-8 w-[34%] max-w-[230px] sm:right-8 md:right-6 md:bottom-6"
          >
            <ScreenshotFrame {...screens.extensionSaved} variant="panel" eager />
          </motion.div>

          <Note
            className="absolute right-[24%] -bottom-1 hidden w-72 lg:flex lg:items-end lg:gap-2"
            arrow="swoop"
            arrowClassName="mb-3 h-12 w-24 shrink-0"
            delay={1.2}
          >
            saved straight from LinkedIn, in one click
          </Note>
          <Sparkle className="text-ink absolute top-2 right-2 hidden size-9 md:block" delay={1.4} />
        </div>
      </section>

      <div className="rough-rule mx-auto max-w-6xl" />

      {/* ───────────── The problem ───────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12">
        <Reveal>
          <TabChaos className="text-ink mx-auto w-full max-w-md" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display text-4xl sm:text-5xl">Job hunting turns into a mess fast.</h2>
          <ul className="mt-8 flex flex-col gap-4">
            {pains.map((pain) => (
              <li key={pain} className="flex gap-3 text-lg leading-snug">
                <span className="hand text-ash-400 mt-[-2px] text-2xl">✗</span>
                <span>{pain}</span>
              </li>
            ))}
          </ul>
          <p className="text-ash-600 mt-8 leading-relaxed">
            That was my search. I built ResumeLog so the details get written down while I’m looking at
            them, not three weeks later when I’m trying to remember.
          </p>
        </Reveal>
      </section>

      {/* ───────────── 1. Capture ───────────── */}
      <section className="border-ash-100 border-t bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.15fr] md:px-12">
          <Reveal>
            <div className="flex items-end gap-4">
              <span className="hand text-6xl text-ink">1.</span>
              <BrowserPanel className="text-ink h-16 w-auto" />
            </div>
            <h2 className="display mt-4 text-4xl sm:text-5xl">Save it while you’re looking at it.</h2>
            <p className="text-ash-600 mt-5 max-w-md leading-relaxed">
              Open a job on LinkedIn and the ResumeLog side panel notices. Press Save and the title,
              company, location and full description go into your log, marked as Bookmarked. It works
              for company pages and people’s profiles too.
            </p>
            <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 text-sm font-medium underline decoration-ash-300 underline-offset-4">
              Get the extension <ArrowRight size={14} />
            </a>
          </Reveal>
          <Reveal delay={0.1} className="relative flex justify-center gap-6 sm:gap-10">
            <ScreenshotFrame {...screens.extensionDetected} variant="panel" tilt={-2} className="w-[44%] max-w-[250px]" />
            <ScreenshotFrame {...screens.extensionSaved} variant="panel" tilt={2} className="mt-12 w-[44%] max-w-[250px]" />
            <Arrow variant="swoop" className="text-ash-600 absolute top-[38%] left-1/2 h-10 w-20 -translate-x-1/2" delay={0.4} />
            <p className="hand absolute -top-9 left-1/2 -translate-x-1/2 text-xl whitespace-nowrap">press save…</p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 2. Organise ───────────── */}
      <section className="border-ash-100 border-t">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <div className="flex items-end gap-4">
                <span className="hand text-6xl text-ink">2.</span>
                <Notebook className="text-ink h-16 w-auto" />
              </div>
              <h2 className="display mt-4 text-4xl sm:text-5xl">Your whole search, on one page.</h2>
            </div>
            <p className="text-ash-600 max-w-md leading-relaxed">
              Every job you’ve saved, with its status, your salary expectation and the résumé you sent.
              Open one to read the original description again before the interview.
            </p>
          </Reveal>
          <div className="relative mt-14">
            <Reveal>
              <ScreenshotFrame {...screens.jobsTable} tilt={0.6} className="md:mr-40" />
            </Reveal>
            <Reveal delay={0.15} className="absolute -bottom-10 right-0 hidden w-[42%] md:block">
              <ScreenshotFrame {...screens.jobDetail} variant="plain" tilt={-2.5} tape />
            </Reveal>
            <Note className="absolute -top-12 right-4 hidden w-60 md:block" arrow="hook" arrowClassName="ml-24 h-16 w-16" delay={0.6}>
              the CV you actually sent is attached
            </Note>
          </div>
        </div>
      </section>

      {/* ───────────── 3. Tailor ───────────── */}
      <section className="border-ash-100 border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <div className="flex items-end gap-4">
                <span className="hand text-6xl text-ink">3.</span>
                <Magnifier className="text-ink h-16 w-auto" />
              </div>
              <h2 className="display mt-4 text-4xl sm:text-5xl">Fix your résumé for <em>this</em> job.</h2>
            </div>
            <div className="max-w-md">
              <p className="text-ash-600 leading-relaxed">
                Open your résumé in the built-in editor and run an ATS check against the job description
                you saved. You get a score, the keywords you’re missing and specific things to fix. Edit,
                scan again, then publish it as a PDF.
              </p>
              <p className="text-ash-500 mt-3 text-sm leading-relaxed">
                The check follows plain rules you can read: keyword match, job title, sections, whether a
                parser can read the file, and content quality.
              </p>
            </div>
          </Reveal>
          <Reveal className="relative mt-14">
            <ScreenshotFrame {...screens.editorAts} url="app.resumeloghq.com/editor" tilt={-0.5} />
            <Circle className="text-ink absolute top-[17%] right-[4%] h-[19%] w-[22%]" delay={0.5} />
            <Note className="absolute right-4 -bottom-14 hidden w-72 text-right md:block" delay={0.8}>
              ↑ 83 / 100, and it tells you why
            </Note>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 4. Follow up ───────────── */}
      <section className="border-ash-100 border-t">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <div className="flex items-end gap-4">
                <span className="hand text-6xl text-ink">4.</span>
                <Calendar className="text-ink h-16 w-auto" />
              </div>
              <h2 className="display mt-4 text-4xl sm:text-5xl">Follow up before it goes cold.</h2>
            </div>
            <p className="text-ash-600 max-w-md leading-relaxed">
              On Pro, anything you applied to more than two weeks ago without hearing back shows up in one
              list. The funnel next to it, free for everyone, shows where your applications usually stall.
            </p>
          </Reveal>
          <Reveal className="relative mt-14">
            <ScreenshotFrame {...screens.followUpsFunnel} variant="plain" tilt={-0.5} tape />
            <Note className="absolute -bottom-20 left-6 hidden w-64 md:block" delay={0.6}>
              ↑ these four are waiting on me
            </Note>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Also in there ───────────── */}
      <section className="border-ash-100 border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">A few more things it does.</h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {extras.map((extra, i) => (
              <Reveal key={extra.title} delay={(i % 2) * 0.08} className="border-ash-200 border-l-2 pl-5">
                <dt className="text-lg font-semibold">{extra.title}</dt>
                <dd className="text-ash-600 mt-1.5 leading-relaxed">{extra.body}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-12">
            <Link to="/features" className="inline-flex items-center gap-2 text-sm font-medium underline decoration-ash-300 underline-offset-4">
              See every feature <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────── Pricing teaser + CTA ───────────── */}
      <section className="dot-grid border-ash-100 border-t">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-[1.3fr_1fr] md:px-12">
          <Reveal>
            <h2 className="display text-5xl sm:text-6xl">
              Start with the <span className="marker">free plan.</span>
            </h2>
            <p className="text-ash-600 mt-6 max-w-lg text-lg leading-relaxed">
              Saving jobs, people and companies is free, and so are the editor and five ATS scans a day.
              Pro is $12 a month for unlimited scans, every fix, your scan history and follow-up
              reminders.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid">
                Add to Chrome
              </a>
              <Link to="/pricing" className="btn-outline">
                Compare plans
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PaperPlane className="text-ink mx-auto w-full max-w-sm" />
          </Reveal>
        </div>
      </section>
    </div>
  )
}

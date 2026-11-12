import { motion } from 'framer-motion'
import { ArrowRight, BellRing, Bookmark, FileText, Gauge, Lock, MessageSquareText, Star } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Label, Lede, Pill, Section, Stage } from '../components/ui'
import { dashboardUrl, extensionUrl } from '../lib/links'
import { screens } from '../lib/screens'

const strip = [
  { icon: Bookmark, text: 'Save LinkedIn jobs, people and companies' },
  { icon: Gauge, text: 'ATS check, scored in six parts' },
  { icon: FileText, text: 'Edit Word résumés, publish PDFs' },
  { icon: BellRing, text: 'Follow-up reminders' },
]

type Step = { id: string; name: string; lead: string; tail: string; visual: ReactNode; label?: string }

const steps: Step[] = [
  {
    id: 'capture',
    name: 'Capture',
    lead: 'Save it while you’re looking at it.',
    tail: 'The side panel sits next to LinkedIn. Press Save and the job, company or person is in your log, full description included.',
    visual: (
      <Stage className="flex justify-center gap-6 px-6 pt-10 pb-0 sm:gap-10">
        <ScreenshotFrame {...screens.extensionDetected} variant="panel" className="w-[42%] max-w-[250px] translate-y-6" />
        <ScreenshotFrame {...screens.extensionSaved} variant="panel" className="w-[42%] max-w-[250px] translate-y-14" />
      </Stage>
    ),
  },
  {
    id: 'organise',
    name: 'Organise',
    lead: 'Every application, one table.',
    tail: 'Status, salary expectation, the CV you sent and the original posting, all on one row you can sort and customise.',
    visual: (
      <Stage bleed>
        <ScreenshotFrame {...screens.jobsTable} />
      </Stage>
    ),
  },
  {
    id: 'tailor',
    name: 'Tailor',
    lead: 'Fix your résumé for this job.',
    tail: 'Run an ATS check against the job you saved. You get a score in six parts, the keywords you’re missing and specific fixes.',
    visual: (
      <Stage bleed="left">
        <ScreenshotFrame {...screens.editorAts} />
      </Stage>
    ),
  },
  {
    id: 'follow-up',
    name: 'Follow up',
    label: 'Pro',
    lead: 'Follow up before it goes cold.',
    tail: 'Applications with no reply after two weeks are listed for you, next to a funnel that shows where things usually stall.',
    visual: (
      <Stage className="p-6 sm:p-10">
        <ScreenshotFrame {...screens.followUpsFunnel} variant="plain" />
      </Stage>
    ),
  },
]

const extras = [
  {
    icon: MessageSquareText,
    title: 'Easy Apply, remembered.',
    body: 'Submit through LinkedIn Easy Apply and the questions, your answers and the résumé you used are saved with the job.',
  },
  {
    icon: FileText,
    title: 'A résumé library.',
    body: 'Every tailored version in one place. Star the ones you use most and attach the exact PDF to each job.',
  },
  {
    icon: Star,
    title: 'Statuses that mean something.',
    body: 'Bookmarked, Applied, Interviewing, Negotiating, Accepted, Closed. Your response rate is worked out from them.',
  },
  {
    icon: Lock,
    title: 'Private by default.',
    body: 'Your log is tied to your Google sign-in. Nobody else can see it, and nothing is sold. Delete anything, any time.',
  },
]

/** Which step block is currently in the middle of the viewport. */
function useActiveStep(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    refs.current.slice(0, count).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [count])
  return { refs, active }
}

export default function Home() {
  const { refs, active } = useActiveStep(steps.length)

  return (
    <div>
      {/* ───────── Hero ───────── */}
      <section className="hero-wash">
        <div className="mx-auto max-w-[1200px] px-5 pt-20 text-center md:px-8 md:pt-28">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Pill href={extensionUrl}>Now on the Chrome Web Store</Pill>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="display mx-auto mt-6 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[4.4rem]"
          >
            Every job you apply to, remembered.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg leading-relaxed"
          >
            ResumeLog saves LinkedIn jobs in one click, checks your résumé against each one, and tells you
            when it’s time to follow up.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-wrap justify-center gap-2.5"
          >
            <a href={dashboardUrl} className="btn-outline btn-lg">
              Open dashboard
            </a>
            <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid btn-lg">
              Add to Chrome, it’s free
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-16 max-w-[1080px] pb-16 md:mt-20 md:pb-24"
          >
            <ScreenshotFrame {...screens.dashboard} eager className="md:mr-[12%]" />
            <ScreenshotFrame
              {...screens.extensionSaved}
              variant="panel"
              eager
              className="absolute right-0 bottom-6 w-[30%] max-w-[250px] md:bottom-10"
            />
          </motion.div>
        </div>
      </section>

      {/* ───────── Capability strip ───────── */}
      <Section inner="grid grid-cols-2 md:grid-cols-4">
        {strip.map((item, i) => (
          <div
            key={item.text}
            className={`border-line flex flex-col gap-3 p-6 md:p-8 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''} ${i === 1 ? 'md:border-r' : ''}`}
          >
            <item.icon size={18} strokeWidth={1.75} className="text-muted-foreground" />
            <span className="text-[15px] leading-snug font-medium">{item.text}</span>
          </div>
        ))}
      </Section>

      {/* ───────── Intro ───────── */}
      <Section inner="px-6 py-20 md:px-14 md:py-28">
        <Reveal>
          <Label>How it works</Label>
          <Lede
            className="mt-5 max-w-3xl text-[1.6rem] sm:text-[2.75rem]"
            lead="Your whole job search, in one place."
            tail="Save it on LinkedIn, tailor your résumé for it, and follow up before it goes cold."
          />
        </Reveal>
      </Section>

      {/* ───────── Four steps with a sticky index ───────── */}
      <Section inner="md:grid md:grid-cols-[240px_1fr]">
        <aside className="border-line hidden md:block md:border-r">
          <ol className="sticky top-14 flex flex-col gap-0.5 px-8 py-12">
            {steps.map((step, i) => (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className={`relative block py-1.5 text-[15px] transition-colors ${
                    active === i ? 'text-foreground font-medium' : 'text-subtle hover:text-muted-foreground'
                  }`}
                >
                  {active === i && <span className="bg-foreground absolute top-1.5 bottom-1.5 -left-8 w-px" />}
                  {step.name}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div>
          {steps.map((step, i) => (
            <div
              key={step.id}
              id={step.id}
              ref={(el) => {
                refs.current[i] = el
              }}
              data-index={i}
              className={`scroll-mt-14 ${i > 0 ? 'border-line border-t' : ''}`}
            >
              <Reveal className="px-6 pt-14 pb-10 md:px-10 md:pt-16">
                {step.label && <Label>{step.label}</Label>}
                <Lede className={`max-w-xl text-[1.35rem] sm:text-2xl ${step.label ? 'mt-3' : ''}`} lead={step.lead} tail={step.tail} />
              </Reveal>
              <Reveal>{step.visual}</Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────── Extras bento ───────── */}
      <Section inner="grid md:grid-cols-2">
        {extras.map((extra, i) => (
          <Reveal
            key={extra.title}
            className={`border-line p-8 md:p-10 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < 2 ? 'border-b' : i === 2 ? 'border-b md:border-b-0' : ''}`}
          >
            <extra.icon size={18} strokeWidth={1.75} className="text-muted-foreground" />
            <p className="lede mt-4 max-w-md text-lg">
              {extra.title} <span className="tail">{extra.body}</span>
            </p>
          </Reveal>
        ))}
      </Section>

      {/* ───────── Closing CTA ───────── */}
      <Section inner="px-6 py-24 text-center md:py-32">
        <Reveal>
          <h2 className="display mx-auto max-w-2xl text-4xl sm:text-5xl">Start free. Upgrade when it gets busy.</h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-lg leading-relaxed">
            Saving, the résumé editor and five ATS scans a day are free. Pro is $12 a month for unlimited scans,
            every fix, scan history and follow-up reminders.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <Link to="/pricing" className="btn-outline btn-lg">
              Compare plans
            </Link>
            <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid btn-lg">
              Add to Chrome
              <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}

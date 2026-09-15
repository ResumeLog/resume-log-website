import { ArrowRight, MousePointerClick, Puzzle, Save, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const steps = [
  {
    tag: '01',
    icon: Puzzle,
    title: 'Install the extension',
    description:
      'Add Resume Log to Chrome and sign in with your Google account. Your log is private and scoped to you — nobody else sees what you save.',
  },
  {
    tag: '02',
    icon: MousePointerClick,
    title: 'Browse LinkedIn as usual',
    description:
      'Keep scrolling job postings, checking out companies, and looking through profiles the way you always do. Resume Log runs quietly in a side panel and detects what you’re looking at.',
  },
  {
    tag: '03',
    icon: Save,
    title: 'Save with one click',
    description:
      'See something worth remembering? Hit save. Job postings, company pages, and profiles all get captured the same way. Apply through Easy Apply and your answers + résumé are recorded automatically.',
  },
  {
    tag: '04',
    icon: Search,
    title: 'Find it later in your dashboard',
    description:
      'Everything you’ve saved shows up in your dashboard, organized into Jobs, Companies, and People. Search, expand, or clean up entries whenever you need to.',
  },
]

export default function HowItWorks() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">
            From open tab to organized log in four steps.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            No manual data entry, no separate app to remember to open. Resume Log fits into the
            browsing you’re already doing.
          </p>
        </Reveal>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-16">
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <Reveal key={step.tag} delay={index * 0.08}>
                <div
                  className={`flex flex-col gap-6 py-10 sm:flex-row sm:items-start ${
                    index !== 0 ? 'border-border border-t' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 sm:w-48 sm:shrink-0">
                    <span className="tag text-3xl">{step.tag}</span>
                    <step.icon size={22} className="text-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold sm:text-2xl">{step.title}</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-16">
          <Reveal className="card flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Ready to try it?</h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Join the early access list to get Resume Log as soon as it’s ready for you.
              </p>
            </div>
            <Link to="/get-started" className="btn-solid group shrink-0">
              Get Started
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

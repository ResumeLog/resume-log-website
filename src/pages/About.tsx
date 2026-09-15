import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const values = [
  {
    tag: '01',
    title: 'Built from a real search',
    description:
      'Resume Log started as a personal tool for keeping track of a messy, months-long job search — too many tabs, too many spreadsheets, too much forgotten context.',
  },
  {
    tag: '02',
    title: 'Low effort by design',
    description:
      'If it takes more work than just applying, nobody’s going to use it. Every part of Resume Log is built to add as close to zero friction as possible.',
  },
  {
    tag: '03',
    title: 'Your data stays yours',
    description:
      'Everything you capture is scoped to your own Google-authenticated account. Nothing is shared, sold, or visible to anyone else.',
  },
]

export default function About() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">
            A personal job-search tool, made public.
          </h1>
        </Reveal>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-20 md:grid-cols-2 md:px-16">
          <Reveal>
            <p className="text-muted-foreground leading-relaxed">
              Resume Log began as a way to stop losing track of a job search — which postings
              had already been seen, which companies were actually worth a second look, and what
              had actually been said in that Easy Apply form three weeks ago.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              What started as a personal browser extension turned into something worth sharing:
              a quiet layer that sits on top of LinkedIn and remembers the details so you don’t
              have to.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-muted-foreground leading-relaxed">
              Resume Log is currently <span className="text-foreground font-medium">early and
              actively in development</span>. It works end to end today — the extension
              captures, the dashboard displays — but it’s still being shaped by real use,
              not a finished product with a roadmap set in stone.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              If that sounds like something worth having in your own search, the early access
              list is the best way to follow along and get access as it opens up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-20 md:px-16">
          <Reveal>
            <p className="eyebrow">What matters here</p>
            <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
              A few things this is built around.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.tag} delay={index * 0.08}>
                <span className="tag text-2xl">{value.tag}</span>
                <h3 className="font-display mt-3 text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-16">
          <Reveal className="card flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">Follow along</h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Join the early access list to hear about updates and get access as it opens up.
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

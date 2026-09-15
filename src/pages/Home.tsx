import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Building2, FileText, LayoutDashboard, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const features = [
  {
    icon: Briefcase,
    title: 'Automatic capture',
    description:
      'Browse LinkedIn like you always do. One click on the extension saves the job posting — no copy-pasting into a spreadsheet.',
  },
  {
    icon: Building2,
    title: 'Companies & people',
    description:
      'Every company page and profile you check out along the way gets logged next to the roles you’re chasing.',
  },
  {
    icon: FileText,
    title: 'Easy Apply memory',
    description:
      'Applied through LinkedIn Easy Apply? We record the exact questions you were asked and the résumé you used.',
  },
  {
    icon: LayoutDashboard,
    title: 'One dashboard',
    description: 'Jobs, companies, and people in a single searchable view — your whole search, one page.',
  },
]

const steps = [
  {
    tag: '01',
    title: 'Install the extension',
    description: 'Add Resume Log to Chrome and sign in with Google in a few seconds.',
  },
  {
    tag: '02',
    title: 'Browse & save',
    description: 'Open the side panel on any LinkedIn job, company, or profile and hit save.',
  },
  {
    tag: '03',
    title: 'Review your dashboard',
    description: 'Everything you’ve captured shows up automatically, organized and searchable.',
  },
]

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:px-16 md:pt-28 md:pb-32">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-border mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1"
            >
              <span className="eyebrow">Now in early access</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl"
            >
              Your job search, automatically logged.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground mt-6 max-w-md text-lg leading-relaxed"
            >
              Resume Log quietly captures every job, company, and person you encounter on
              LinkedIn — and remembers exactly what you submitted when you hit Easy Apply.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/get-started" className="btn-solid group">
                Get Started
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link to="/features" className="btn-outline">
                See how it works
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="card !p-1"
          >
            <div className="rounded-md border border-border/60 p-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="eyebrow">Dashboard preview</span>
                <div className="flex gap-1.5">
                  <span className="bg-border size-2 rounded-full" />
                  <span className="bg-border size-2 rounded-full" />
                  <span className="bg-border size-2 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                {[
                  { icon: Briefcase, label: 'Senior Product Designer', sub: 'Northwind Labs' },
                  { icon: Building2, label: 'Northwind Labs', sub: 'Company · saved' },
                  { icon: Users, label: 'Alex Rivera', sub: 'Recruiter · saved' },
                ].map((row) => (
                  <div key={row.label} className="border-border flex items-center gap-3 rounded-md border p-3">
                    <row.icon size={16} className="text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{row.label}</p>
                      <p className="tag">{row.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-16">
          <Reveal>
            <p className="eyebrow">What it does</p>
            <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
              Everything your search touches, kept in one place.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.08}>
                <div className="card h-full">
                  <feature.icon size={20} className="text-foreground" />
                  <h3 className="font-display mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-16">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
              Three steps. Zero spreadsheets.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.tag} delay={index * 0.1}>
                <span className="tag text-2xl">{step.tag}</span>
                <h3 className="font-display mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-14">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 text-sm font-medium group">
              Walk through the details
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6 py-24 md:px-16">
          <Reveal className="card flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Stop losing track of your search.
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
                Join the early access list and get Resume Log the moment it’s ready for you.
              </p>
            </div>
            <Link to="/get-started" className="btn-solid shrink-0">
              Get Started
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

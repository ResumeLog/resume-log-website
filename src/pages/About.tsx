import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { Note, Underline } from '../components/illustrations/Doodles'
import { Desk } from '../components/illustrations/Scenes'
import { contactEmail, extensionUrl } from '../lib/links'

/*
 * TODO(confirm): first-person story drafted for RES-24 from the site's earlier
 * origin copy. The owner should check every personal detail before launch.
 */

const beliefs = [
  {
    title: 'It shouldn’t feel like more work',
    body: 'If keeping a log takes longer than applying, nobody keeps it. So it’s one button on the page you’re already looking at.',
  },
  {
    title: 'Your search is yours',
    body: 'Your log is tied to your Google sign-in and nobody else can see it. I don’t sell data, and you can delete anything whenever you want.',
  },
  {
    title: 'No magic scores',
    body: 'The ATS check shows how it got its number: six parts, each with a reason. You should be able to disagree with it.',
  },
  {
    title: 'Never apply for you',
    body: 'There are tools that mass-apply to hundreds of jobs. This isn’t one of them. You choose every application; ResumeLog just remembers it.',
  },
]

export default function About() {
  return (
    <div>
      <section className="dot-grid">
        <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 pt-16 pb-20 md:grid-cols-[1.3fr_1fr] md:px-12 md:pt-24">
          <Reveal>
            <p className="hand text-2xl">hi, I make ResumeLog</p>
            <h1 className="display mt-3 text-5xl sm:text-7xl">
              I built this because I kept{' '}
              <span className="relative inline-block italic">
                losing track.
                <Underline className="text-ink absolute -bottom-2 left-0 h-4 w-full" delay={0.4} />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <Desk className="text-ink mx-auto w-full max-w-sm" />
          </Reveal>
        </div>
      </section>

      <section className="border-ash-100 border-t bg-white">
        <div className="mx-auto max-w-3xl px-6 py-24 md:px-12">
          <Reveal className="text-ash-700 flex flex-col gap-6 text-lg leading-relaxed">
            <p>
              A few months into a job search, I had a spreadsheet I’d stopped updating, a folder of
              résumés called things like <span className="text-ink font-mono text-base">cv-final-v3-REAL.pdf</span>,
              and no idea which one I’d sent to which company.
            </p>
            <p>
              Then a recruiter called about a role I’d applied to weeks earlier. I couldn’t remember the
              job description, or what I’d said in the Easy Apply form about my notice period. I had to
              wing it.
            </p>
            <p>
              So I wrote a small browser extension that saved the LinkedIn job I was looking at. Then a
              page to see them all. Then a way to check my résumé against the job before applying, because
              I kept guessing which keywords mattered.
            </p>
            <p>
              That’s ResumeLog. It’s a small, independent product and I’m still building it. If something
              is broken or missing, I’d really like to hear about it.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <Note className="-rotate-2">— thanks for reading, and good luck with the search</Note>
          </Reveal>
        </div>
      </section>

      <section className="border-ash-100 border-t">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl">What I won’t compromise on</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.08} className="border-ash-200 border-l-2 pl-5">
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="text-ash-600 mt-1.5 leading-relaxed">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dot-grid border-ash-100 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <h2 className="display text-4xl sm:text-5xl">Say hello</h2>
            <p className="text-ash-600 mt-3 max-w-md leading-relaxed">
              Bug, idea, or a job search story: email{' '}
              <a href={`mailto:${contactEmail}`} className="text-ink underline decoration-ash-300 underline-offset-4">
                {contactEmail}
              </a>
              . I read everything.
            </p>
          </div>
          <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid group shrink-0">
            Try ResumeLog
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </div>
  )
}

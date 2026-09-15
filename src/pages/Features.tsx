import { Briefcase, Building2, CheckCircle2, FileText, LayoutDashboard } from 'lucide-react'
import Reveal from '../components/Reveal'

const sections = [
  {
    tag: '01',
    icon: Briefcase,
    title: 'Automatic job capture',
    description:
      'Open a job posting on LinkedIn and the Resume Log side panel picks it up instantly — title, company, location, description, all filled in. Click save, and it’s in your log. No tabs, no copy-pasting, no forgetting to write it down.',
    points: [
      'Auto-detects postings as you click through search results',
      'Edit any field before saving, right from the side panel',
      'Re-saving updates the same entry instead of creating duplicates',
    ],
  },
  {
    tag: '02',
    icon: Building2,
    title: 'Companies & people, tracked alongside',
    description:
      'A job search is never just jobs — it’s companies you’re sizing up and people you’re connecting with. Resume Log captures company pages and profiles the same way it captures postings, so context never gets lost.',
    points: [
      'Company pages saved with one click from anywhere on LinkedIn',
      'Recruiter and connection profiles logged for quick reference',
      'Everything cross-referenced against the jobs you’ve saved',
    ],
  },
  {
    tag: '03',
    icon: FileText,
    title: 'Easy Apply, remembered',
    description:
      'The hardest part of a long search is remembering what you actually told each company. When you apply through LinkedIn Easy Apply, Resume Log records the questions you were asked and the résumé you used — automatically.',
    points: [
      'Captures Easy Apply questions and your answers as you submit',
      'Links the exact résumé version used for each application',
      'No more guessing what you said in an interview follow-up',
    ],
  },
  {
    tag: '04',
    icon: LayoutDashboard,
    title: 'One dashboard for everything',
    description:
      'Jobs, Companies, and People live in one clean, searchable dashboard. Expand any job to see the full description, download the résumé you applied with, or clean up entries you no longer need.',
    points: [
      'Switchable Jobs / Companies / People views',
      'Expandable descriptions and per-job résumé downloads',
      'Signed in with Google — your log is private to you',
    ],
  },
]

export default function Features() {
  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <Reveal>
          <p className="eyebrow">Features</p>
          <h1 className="font-display mt-3 max-w-2xl text-4xl leading-tight font-semibold sm:text-5xl">
            Built to disappear into how you already job hunt.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            No new workflow to learn. Resume Log sits quietly in a side panel while you browse
            LinkedIn the way you always have.
          </p>
        </Reveal>
      </section>

      {sections.map((section, index) => (
        <section key={section.tag} className="border-border border-t">
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-16">
            <div
              className={`grid items-center gap-12 md:grid-cols-2 ${
                index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Reveal>
                <span className="tag text-2xl">{section.tag}</span>
                <div className="mt-4 flex items-center gap-3">
                  <section.icon size={22} />
                  <h2 className="font-display text-2xl font-semibold sm:text-3xl">{section.title}</h2>
                </div>
                <p className="text-muted-foreground mt-4 leading-relaxed">{section.description}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-foreground" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="card flex aspect-4/3 items-center justify-center">
                <section.icon size={64} strokeWidth={1} className="text-muted-foreground/40" />
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

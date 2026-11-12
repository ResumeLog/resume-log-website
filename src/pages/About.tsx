import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { contactEmail, extensionUrl } from '../lib/links'

/*
 * TODO(confirm): first-person story drafted for RES-24 from the site's earlier
 * origin copy. The owner should check every personal detail before launch.
 */

const principles = [
  {
    title: 'No extra work.',
    body: 'If keeping a log takes longer than applying, nobody keeps it. So it’s one button on the page you already have open.',
  },
  {
    title: 'Your search is yours.',
    body: 'Your log is tied to your Google sign-in and nobody else can see it. No data is sold, and you can delete anything.',
  },
  {
    title: 'Scores you can read.',
    body: 'The ATS check shows how it reached its number: six parts, each with a reason. You should be able to disagree with it.',
  },
  {
    title: 'It never applies for you.',
    body: 'There are tools that mass-apply to hundreds of jobs. This isn’t one. You choose every application; ResumeLog remembers it.',
  },
]

export default function About() {
  return (
    <div>
      <Section bare inner="px-6 pt-20 pb-16 md:px-14 md:pt-28">
        <Reveal>
          <Label>About</Label>
          <Lede
            as="h1"
            className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl"
            lead="Built during a job search."
            tail="Keeping track shouldn’t be a second job."
          />
        </Reveal>
      </Section>

      <Section inner="grid md:grid-cols-[1fr_1.35fr]">
        <div className="border-line text-subtle border-b p-8 text-sm md:border-r md:border-b-0 md:p-12">The story</div>
        <Reveal className="text-muted-foreground flex max-w-2xl flex-col gap-5 p-8 text-[17px] leading-relaxed md:p-12">
          <p>
            <span className="text-foreground">A few months into a job search, I had a spreadsheet I’d stopped updating</span>, a
            folder of résumés with names like <span className="text-foreground font-mono text-[15px]">cv-final-v3.pdf</span>,
            and no idea which one I’d sent to which company.
          </p>
          <p>
            Then a recruiter called about a role I’d applied to weeks earlier. I couldn’t remember the job description, or
            what I’d said in the Easy Apply form about my notice period.
          </p>
          <p>
            So I built a small extension that saved the LinkedIn job I was looking at. Then a page to see them all. Then a
            way to check my résumé against the job before applying, because I kept guessing which keywords mattered.
          </p>
          <p>
            That became ResumeLog. It’s a small, independent product and it’s still being built. If something is broken or
            missing, I’d like to hear about it.
          </p>
        </Reveal>
      </Section>

      <Section inner="grid md:grid-cols-2">
        {principles.map((p, i) => (
          <Reveal
            key={p.title}
            className={`border-line p-8 md:p-12 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < 2 ? 'border-b' : i === 2 ? 'border-b md:border-b-0' : ''}`}
          >
            <p className="lede max-w-md text-lg">
              {p.title} <span className="tail">{p.body}</span>
            </p>
          </Reveal>
        ))}
      </Section>

      <Section inner="flex flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-14">
        <div>
          <Lede className="text-[1.7rem] sm:text-[2rem]" lead="Say hello." tail="Bugs, ideas or job search stories." />
          <a href={`mailto:${contactEmail}`} className="text-muted-foreground hover:text-foreground mt-3 inline-block text-[15px]">
            {contactEmail}
          </a>
        </div>
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid btn-lg shrink-0">
          Try ResumeLog
          <ArrowRight size={16} />
        </a>
      </Section>
    </div>
  )
}

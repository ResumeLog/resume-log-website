import { Breadcrumbs, CtaBand, FaqSection, Related, Sections } from '../components/content'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import type { Guide as GuideData } from '../data/guides'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

/** /guides/<slug>: an answer-first article (src/data/guides.ts). */
export default function Guide({ guide }: { guide: GuideData }) {
  return (
    <article>
      <Section bare inner="px-6 pt-16 pb-14 md:px-14 md:pt-24">
        <Reveal>
          <Breadcrumbs
            trail={[
              { to: '/guides', label: 'Guides' },
              { to: `/guides/${guide.slug}`, label: guide.headline },
            ]}
          />
          <Label>Guide</Label>
          <Lede as="h1" className="mt-5 max-w-3xl text-[2rem] sm:text-[2.8rem]" lead={guide.headline} />
          <p className="text-subtle mt-5 text-[13px]">
            By the ResumeLog team · Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time> · {guide.readMinutes} min read
          </p>
          <div className="bg-panel border-line mt-8 max-w-2xl rounded-lg border p-6">
            <p className="text-subtle text-[13px] font-medium">The short answer</p>
            <p className="mt-2 leading-relaxed">{guide.summary}</p>
          </div>
          <nav aria-label="On this page" className="mt-8">
            <p className="text-subtle text-[13px] font-medium">On this page</p>
            <ol className="text-muted-foreground mt-2 flex list-decimal flex-col gap-1 pl-5 text-sm">
              {guide.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-foreground">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
      </Section>

      <Sections sections={guide.sections} />
      <FaqSection faqs={guide.faqs} lead="Questions." tail="Quick answers." />
      <Related links={guide.related} title="Keep reading" />
      <CtaBand />
    </article>
  )
}

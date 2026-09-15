import { formatEffectiveDate } from '../lib/formatEffectiveDate'
import Reveal from './Reveal'

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export default function LegalPage({
  title,
  sections,
}: {
  title: string
  sections: LegalSection[]
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-24 md:px-16 md:pt-28">
      <Reveal>
        <p className="eyebrow">Legal</p>
        <h1 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
          {title}
        </h1>
        <p className="tag mt-4">Effective Date: {formatEffectiveDate()}</p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-10">
        {sections.map((section, index) => (
          <Reveal key={section.heading} delay={Math.min(index * 0.04, 0.2)}>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">{section.heading}</h2>
            <div className="text-muted-foreground mt-3 flex flex-col gap-3 leading-relaxed">
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul className="flex flex-col gap-2 pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

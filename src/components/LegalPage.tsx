import type { ReactNode } from 'react'
import { formatEffectiveDate } from '../lib/formatEffectiveDate'
import Reveal from './Reveal'

export type LegalTable = {
  columns: string[]
  rows: string[][]
}

export type LegalSection = {
  heading: string
  paragraphs?: ReactNode[]
  bullets?: string[]
  table?: LegalTable
  closingParagraphs?: ReactNode[]
}

export default function LegalPage({
  title,
  sections,
  dateLabel = 'Effective Date',
  date = formatEffectiveDate(),
}: {
  title: string
  sections: LegalSection[]
  dateLabel?: string
  date?: string
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-20 pb-24 md:px-16 md:pt-28">
      <Reveal>
        <p className="eyebrow">Legal</p>
        <h1 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
          {title}
        </h1>
        <p className="tag mt-4">
          {dateLabel}: {date}
        </p>
      </Reveal>

      <div className="mt-12 flex flex-col gap-10">
        {sections.map((section, index) => (
          <Reveal key={section.heading} delay={Math.min(index * 0.04, 0.2)}>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">{section.heading}</h2>
            <div className="text-muted-foreground mt-3 flex flex-col gap-3 leading-relaxed">
              {section.paragraphs?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              {section.bullets && (
                <ul className="flex flex-col gap-2 pl-5">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="list-disc">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="border-border overflow-x-auto rounded-lg border">
                  <table className="w-full min-w-lg text-left text-sm">
                    <thead className="bg-muted text-foreground">
                      <tr>
                        {section.table.columns.map((column) => (
                          <th key={column} className="px-4 py-3 font-semibold">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]} className="border-border border-t">
                          {row.map((cell, i) => (
                            <td key={i} className="px-4 py-3 align-top">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.closingParagraphs?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

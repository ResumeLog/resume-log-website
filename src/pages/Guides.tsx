import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Breadcrumbs, CtaBand } from '../components/content'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { guides } from '../data/guides'

/** /guides: index of the job search guides. */
export default function Guides() {
  return (
    <div>
      <Section bare inner="px-6 pt-16 pb-14 md:px-14 md:pt-24">
        <Reveal>
          <Breadcrumbs trail={[{ to: '/guides', label: 'Guides' }]} />
          <Label>Guides</Label>
          <Lede as="h1" className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl" lead="Job search guides." tail="Short, practical, no fluff." />
        </Reveal>
      </Section>
      <Section inner="grid md:grid-cols-2">
        {guides.map((g, i) => (
          <Link
            key={g.slug}
            to={`/guides/${g.slug}`}
            className={`border-line group hover:bg-panel flex flex-col gap-3 p-8 transition-colors md:p-10 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < guides.length - 2 ? 'border-b' : i < guides.length - 1 ? 'border-b md:border-b-0' : ''}`}
          >
            <h2 className="lede flex items-start gap-1 text-xl">
              {g.headline}
              <ChevronRight size={16} className="text-subtle mt-1.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{g.description}</p>
            <span className="text-subtle text-[13px]">{g.readMinutes} min read</span>
          </Link>
        ))}
      </Section>
      <CtaBand />
    </div>
  )
}

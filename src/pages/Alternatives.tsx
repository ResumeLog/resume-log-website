import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BlockView, Breadcrumbs, CtaBand, RichText } from '../components/content'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { alternatives, alternativesIntro, comparisons, comparisonsChecked } from '../data/comparisons'

/** /alternatives: hub for the comparison pages. */
export default function Alternatives() {
  return (
    <div>
      <Section bare inner="px-6 pt-16 pb-14 md:px-14 md:pt-24">
        <Reveal>
          <Breadcrumbs trail={[{ to: '/alternatives', label: 'Alternatives' }]} />
          <Label>Alternatives</Label>
          <Lede as="h1" className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl" lead="Job tracker and ATS checker alternatives," tail="compared honestly." />
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            <RichText text={alternativesIntro} />
          </p>
        </Reveal>
      </Section>

      <Section inner="flex flex-col gap-4 p-6 md:p-12">
        <h2 className="lede text-2xl sm:text-[1.7rem]">Which job search tool should you use?</h2>
        <BlockView block={{ type: 'table', ...alternatives }} />
        <p className="text-subtle text-[13px]">Prices checked {comparisonsChecked} from public websites and published reviews; check each site before you decide.</p>
      </Section>

      <Section inner="grid md:grid-cols-2">
        {comparisons.map((c, i) => (
          <Link
            key={c.slug}
            to={`/compare/${c.slug}`}
            className={`border-line group hover:bg-panel flex flex-col gap-3 p-8 transition-colors md:p-10 ${i % 2 === 0 ? 'md:border-r' : ''} ${i < comparisons.length - 2 ? 'border-b' : i < comparisons.length - 1 ? 'border-b md:border-b-0' : ''}`}
          >
            <h2 className="lede flex items-center gap-1 text-xl">
              ResumeLog vs {c.competitor}
              <ChevronRight size={16} className="text-subtle transition-transform group-hover:translate-x-0.5" />
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <RichText text={c.description} />
            </p>
          </Link>
        ))}
      </Section>
      <CtaBand />
    </div>
  )
}

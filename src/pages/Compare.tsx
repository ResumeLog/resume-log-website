import { BlockView, Breadcrumbs, CtaBand, FaqSection, Related, RichText } from '../components/content'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { comparisons, comparisonsChecked, type Comparison } from '../data/comparisons'

/** /compare/<slug>: neutral ResumeLog vs competitor page (src/data/comparisons.ts). */
export default function Compare({ c }: { c: Comparison }) {
  const others = comparisons.filter((o) => o.slug !== c.slug)
  return (
    <div>
      <Section bare inner="px-6 pt-16 pb-14 md:px-14 md:pt-24">
        <Reveal>
          <Breadcrumbs
            trail={[
              { to: '/alternatives', label: 'Alternatives' },
              { to: `/compare/${c.slug}`, label: `vs ${c.competitor}` },
            ]}
          />
          <Label>Comparison</Label>
          <Lede as="h1" className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl" lead={`ResumeLog vs ${c.competitor}.`} tail="An honest side-by-side." />
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            <RichText text={c.summary} />
          </p>
        </Reveal>
      </Section>

      <Section id="table" inner="flex flex-col gap-4 p-6 md:p-12">
        <h2 className="lede text-2xl sm:text-[1.7rem]">
          How do ResumeLog and {c.competitor} compare?
        </h2>
        <BlockView block={{ type: 'table', head: ['', 'ResumeLog', c.competitor], rows: c.rows }} />
        <p className="text-subtle text-[13px]">
          {c.competitor} details are from its public website and published reviews, checked {comparisonsChecked}. Prices
          change, so check{' '}
          <a href={c.site} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-4">
            {c.site.replace('https://', '')}
          </a>{' '}
          before you decide.
        </p>
      </Section>

      <Section id="which" inner="grid md:grid-cols-2">
        <div className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
          <h2 className="lede text-xl">Choose {c.competitor} if…</h2>
          <div className="mt-4">
            <BlockView block={{ type: 'ul', items: c.pickThem }} />
          </div>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="lede text-xl">Choose ResumeLog if…</h2>
          <div className="mt-4">
            <BlockView block={{ type: 'ul', items: c.pickUs }} />
          </div>
        </div>
      </Section>

      <FaqSection faqs={c.faqs} lead="Questions." tail={`ResumeLog vs ${c.competitor}.`} />
      <Related
        title="Other comparisons"
        links={[...others.map((o) => ({ to: `/compare/${o.slug}`, label: `ResumeLog vs ${o.competitor}` })), { to: '/alternatives', label: 'All alternatives' }]}
      />
      <CtaBand />
    </div>
  )
}

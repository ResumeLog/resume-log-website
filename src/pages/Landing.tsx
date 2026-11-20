import { Breadcrumbs, CtaBand, FaqSection, Related, RichText, Sections } from '../components/content'
import Reveal from '../components/Reveal'
import ScreenshotFrame from '../components/ScreenshotFrame'
import { Lede, Section, Stage } from '../components/ui'
import type { LandingPage } from '../data/landing'
import { screens } from '../lib/screens'

const panelShots = new Set(['extensionDetected', 'extensionSaved', 'atsPanel'])

/** A search-intent landing page (src/data/landing.ts). */
export default function Landing({ page }: { page: LandingPage }) {
  const shot = screens[page.screen]
  const panel = panelShots.has(page.screen)

  return (
    <div>
      <Section bare inner="grid lg:grid-cols-[1fr_1fr]">
        <div className="border-line border-b px-6 pt-16 pb-14 md:px-14 md:pt-24 lg:border-r lg:border-b-0">
          <Reveal>
            <Breadcrumbs trail={[{ to: `/${page.slug}`, label: page.name }]} />
            <Lede as="h1" className="max-w-xl text-[2.2rem] sm:text-5xl" lead={page.h1.lead} tail={page.h1.tail} />
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              <RichText text={page.intro} />
            </p>
          </Reveal>
        </div>
        {panel ? (
          <Stage className="flex min-h-[380px] items-end justify-center px-6 pt-10">
            <ScreenshotFrame {...shot} variant="panel" eager className="w-[50%] max-w-[240px] translate-y-10" />
          </Stage>
        ) : (
          <Stage bleed className="min-h-[340px]">
            <ScreenshotFrame {...shot} eager />
          </Stage>
        )}
      </Section>

      <Sections sections={page.sections} />
      <FaqSection faqs={page.faqs} lead="Questions." tail={`About the ${page.name.toLowerCase()}.`} />
      <Related links={page.related} title="Keep reading" />
      <CtaBand />
    </div>
  )
}

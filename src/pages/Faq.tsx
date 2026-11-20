import { CtaBand, FaqList } from '../components/content'
import Reveal from '../components/Reveal'
import { Label, Lede, Section } from '../components/ui'
import { faqGroups } from '../data/faqs'

/** /faq: every question, grouped (FAQPage structured data in lib/seo.ts). */
export default function Faq() {
  return (
    <div>
      <Section bare inner="px-6 pt-20 pb-16 md:px-14 md:pt-28">
        <Reveal>
          <Label>FAQ</Label>
          <Lede
            as="h1"
            className="mt-5 max-w-3xl text-[2.2rem] sm:text-5xl"
            lead="Frequently asked questions."
            tail="About the job tracker, the ATS check, resumes, privacy and pricing."
          />
          <nav aria-label="FAQ topics" className="mt-10 flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="pill hover:bg-panel">
                {g.title}
              </a>
            ))}
          </nav>
        </Reveal>
      </Section>

      {faqGroups.map((g) => (
        <Section key={g.id} id={g.id} className="scroll-mt-14" inner="grid md:grid-cols-[1fr_1.6fr]">
          <div className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
            <h2 className="lede text-2xl sm:text-[1.7rem]">{g.title}</h2>
          </div>
          <FaqList faqs={g.faqs} />
        </Section>
      ))}

      <CtaBand lead="Still wondering?" tail="Try it free on the next job you open, or email us." />
    </div>
  )
}

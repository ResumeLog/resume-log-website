/*
 * Building blocks for the content pages (landing, comparison, guide, FAQ).
 * Semantic HTML on purpose: real <h2>/<ol>/<table>/<dl> is what featured
 * snippets and AI answer engines lift.
 */
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Block, ContentSection, Faq, RelatedLink } from '../data/content'
import { dashboardUrl, extensionUrl } from '../lib/links'
import { withPrice } from '../lib/pricing'
import Reveal from './Reveal'
import { Lede, Section } from './ui'

const linkClass = 'text-foreground underline decoration-line-strong underline-offset-4 hover:decoration-foreground'

/** Copy with `[label](/path)` links and `{proPrice}`. */
export function RichText({ text }: { text: string }) {
  const parts = withPrice(text).split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
        if (!m) return <Fragment key={i}>{part}</Fragment>
        const [, label, to] = m
        return to.startsWith('/') ? (
          <Link key={i} to={to} className={linkClass}>
            {label}
          </Link>
        ) : (
          <a key={i} href={to} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {label}
          </a>
        )
      })}
    </>
  )
}

export function BlockView({ block }: { block: Block }) {
  if (block.type === 'p')
    return (
      <p className="text-muted-foreground leading-relaxed">
        <RichText text={block.text} />
      </p>
    )
  if (block.type === 'table')
    return (
      <div className="border-line overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[480px] text-left text-sm">
          {block.caption && <caption className="text-subtle px-4 py-2 text-left text-xs">{block.caption}</caption>}
          <thead className="bg-panel">
            <tr>
              {block.head.map((h, i) => (
                <th key={i} scope="col" className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="border-line border-t">
                {row.map((c, ci) =>
                  ci === 0 ? (
                    <th key={ci} scope="row" className="px-4 py-3 align-top font-medium">
                      <RichText text={c} />
                    </th>
                  ) : (
                    <td key={ci} className="text-muted-foreground px-4 py-3 align-top">
                      <RichText text={c} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  const List = block.type === 'ol' ? 'ol' : 'ul'
  return (
    <List className={`text-muted-foreground flex flex-col gap-2 pl-5 leading-relaxed ${block.type === 'ol' ? 'list-decimal' : 'list-disc'}`}>
      {block.items.map((item) => (
        <li key={item} className="pl-1">
          <RichText text={item} />
        </li>
      ))}
    </List>
  )
}

/** Question-led sections: H2, direct answer, then detail. */
export function Sections({ sections }: { sections: ContentSection[] }) {
  return (
    <>
      {sections.map((s) => (
        <Section key={s.id} id={s.id} inner="grid md:grid-cols-[1fr_1.6fr]">
          <div className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
            <h2 className="lede text-2xl sm:text-[1.7rem]">{s.heading}</h2>
          </div>
          <Reveal className="flex max-w-2xl flex-col gap-5 p-8 md:p-12">
            <p className="text-[17px] leading-relaxed">
              <RichText text={s.answer} />
            </p>
            {s.blocks?.map((b, i) => <BlockView key={i} block={b} />)}
          </Reveal>
        </Section>
      ))}
    </>
  )
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <dl>
      {faqs.map((faq, i) => (
        <Reveal key={faq.q} className={`p-8 md:px-12 ${i > 0 ? 'border-line border-t' : ''}`}>
          <dt className="font-medium">{faq.q}</dt>
          <dd className="text-muted-foreground mt-2 leading-relaxed">
            <RichText text={faq.a} />
          </dd>
        </Reveal>
      ))}
    </dl>
  )
}

/** FAQ band with a headline column, as on /how-it-works. */
export function FaqSection({ faqs, lead = 'Questions.', tail = 'The ones people ask first.' }: { faqs: Faq[]; lead?: string; tail?: string }) {
  if (faqs.length === 0) return null
  return (
    <Section inner="grid md:grid-cols-[1fr_1.35fr]">
      <div className="border-line border-b p-8 md:border-r md:border-b-0 md:p-12">
        <Lede className="text-[1.7rem] sm:text-[2rem]" lead={lead} tail={tail} />
      </div>
      <FaqList faqs={faqs} />
    </Section>
  )
}

export function Related({ links, title = 'Related' }: { links: RelatedLink[]; title?: string }) {
  return (
    <Section inner="px-8 py-10 md:px-12">
      <h2 className="text-subtle text-[13px] font-medium">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="pill hover:bg-panel">
              {l.label}
              <ChevronRight size={14} className="text-subtle" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** Visible breadcrumb trail (BreadcrumbList JSON-LD is emitted by lib/seo.ts). */
export function Breadcrumbs({ trail }: { trail: RelatedLink[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-subtle mb-6 text-[13px]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.to} className="flex items-center gap-1.5">
            <ChevronRight size={12} />
            {i === trail.length - 1 ? (
              <span aria-current="page">{c.label}</span>
            ) : (
              <Link to={c.to} className="hover:text-foreground">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Closing call to action shared by the content pages. */
export function CtaBand({ lead = 'Try it on the next job you open.', tail = 'Free, and set up in about two minutes.' }: { lead?: ReactNode; tail?: ReactNode }) {
  return (
    <Section inner="flex flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-14">
      <Lede className="max-w-xl text-[1.7rem] sm:text-[2rem]" lead={lead} tail={tail} />
      <div className="flex flex-wrap gap-2.5">
        <a href={dashboardUrl} className="btn-outline btn-lg">
          Open dashboard
        </a>
        <a href={extensionUrl} target="_blank" rel="noopener noreferrer" className="btn-solid btn-lg">
          Add to Chrome, it’s free
          <ArrowRight size={16} />
        </a>
      </div>
    </Section>
  )
}

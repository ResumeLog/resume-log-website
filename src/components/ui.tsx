import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/** A full-width band with a top hairline; content sits inside the page frame. */
export function Section({
  children,
  className = '',
  inner = '',
  id,
  bare = false,
}: {
  children: ReactNode
  className?: string
  /** Classes for the framed inner column. */
  inner?: string
  id?: string
  /** No top hairline. */
  bare?: boolean
}) {
  return (
    <section id={id} className={`${bare ? '' : 'border-line border-t'} ${className}`}>
      <div className={`frame ${inner}`}>{children}</div>
    </section>
  )
}

/** Two-tone section headline: black lead, grey continuation. */
export function Lede({
  lead,
  tail,
  className = 'text-[1.7rem] sm:text-[2.1rem]',
  as: Tag = 'h2',
}: {
  lead: ReactNode
  tail?: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <Tag className={`lede ${className}`}>
      {lead}
      {tail && <span className="tail"> {tail}</span>}
    </Tag>
  )
}

/** Small neutral label above a headline. */
export function Label({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>
}

/** Pill badge, optionally a link. */
export function Pill({ children, to, href }: { children: ReactNode; to?: string; href?: string }) {
  const body = (
    <>
      {children}
      {(to || href) && <ChevronRight size={14} className="text-subtle" />}
    </>
  )
  if (to) return <Link to={to} className="pill hover:bg-panel">{body}</Link>
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="pill hover:bg-panel">
        {body}
      </a>
    )
  return <span className="pill">{body}</span>
}

/**
 * The grey dotted stage a screenshot sits on. With `bleed`, the shot is pushed
 * in from the top-left and runs off the right/bottom edge, cropped.
 */
export function Stage({
  children,
  className = '',
  bleed = false,
}: {
  children: ReactNode
  className?: string
  /** `true`/`'right'` crops the shot's right edge; `'left'` keeps the right side (e.g. a side panel) in view. */
  bleed?: boolean | 'right' | 'left'
}) {
  const inset =
    bleed === 'left'
      ? 'relative -ml-[12%] -mb-[10%] pt-[7%] pr-[7%]'
      : bleed
        ? 'relative -mr-[12%] -mb-[10%] pt-[7%] pl-[7%]'
        : ''
  return (
    <div className={`stage relative overflow-hidden ${className}`}>
      {bleed ? <div className={inset}>{children}</div> : children}
    </div>
  )
}

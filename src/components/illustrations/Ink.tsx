import { motion, useReducedMotion } from 'framer-motion'
import type { ComponentProps } from 'react'

/**
 * One pen stroke. Drawn on (0 → 100% length) the first time it scrolls into
 * view; static for people who prefer reduced motion.
 */
export function Stroke({
  d,
  delay = 0,
  duration = 0.9,
  width = 2,
  tone = 'ink',
  fill = 'none',
  dashed = false,
}: {
  d: string
  delay?: number
  duration?: number
  width?: number
  /** `ink` = currentColor; `ash` = a lighter grey for secondary lines. */
  tone?: 'ink' | 'ash' | 'faint'
  fill?: string
  dashed?: boolean
}) {
  const reduce = useReducedMotion()
  const stroke = tone === 'ink' ? 'currentColor' : tone === 'ash' ? 'var(--ash-400)' : 'var(--ash-200)'
  const common = {
    d,
    fill,
    stroke,
    strokeWidth: width,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (reduce || dashed) return <path {...common} strokeDasharray={dashed ? '4 7' : undefined} />
  return (
    <motion.path
      {...common}
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        pathLength: { duration, delay, ease: 'easeInOut' },
        opacity: { duration: 0.01, delay },
      }}
    />
  )
}

/** A flat grey fill shape — the "wash" under line art. Fades in, doesn't draw. */
export function Wash({ d, tone = 50, delay = 0 }: { d: string; tone?: 50 | 100 | 200; delay?: number }) {
  const reduce = useReducedMotion()
  const fill = `var(--ash-${tone})`
  if (reduce) return <path d={d} fill={fill} />
  return (
    <motion.path
      d={d}
      fill={fill}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay }}
    />
  )
}

/** Wrapper for every illustration: a viewBox, the "rough pen" filter, aria. */
export function Sketch({
  viewBox,
  label,
  className,
  children,
  ...rest
}: { viewBox: string; label?: string } & ComponentProps<'svg'>) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <g filter="url(#rough-pen)">{children}</g>
    </svg>
  )
}

/**
 * Mount once (in Layout). A tiny turbulence displacement makes every vector line
 * wobble like it was drawn by hand rather than by a path tool.
 */
export function RoughPenFilter() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter id="rough-pen" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

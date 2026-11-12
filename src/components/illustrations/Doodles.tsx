import type { ReactNode } from 'react'
import { Sketch, Stroke } from './Ink'

/*
 * Margin doodles. Paths are hand-placed with deliberate wobble — no perfect
 * arcs or straight lines — so they read as pen, not as a vector tool.
 */

/** A loose curved arrow. `variant` picks the curve; flip with CSS transforms. */
export function Arrow({
  className,
  variant = 'swoop',
  delay = 0,
}: {
  className?: string
  variant?: 'swoop' | 'hook' | 'loop' | 'down'
  delay?: number
}) {
  const shapes = {
    swoop: {
      vb: '0 0 140 70',
      body: 'M6 52 C 30 58, 58 50, 80 36 S 118 14, 128 12',
      head: 'M112 6 C 118 9, 124 11, 129 12 C 126 17, 123 22, 121 27',
    },
    hook: {
      vb: '0 0 110 110',
      body: 'M10 14 C 52 6, 92 26, 90 62 C 89 78, 80 90, 66 98',
      head: 'M80 99 C 75 99, 70 98, 65 98 C 66 92, 68 86, 70 81',
    },
    loop: {
      vb: '0 0 160 90',
      body: 'M6 70 C 26 72, 44 60, 52 44 C 60 26, 42 16, 36 30 C 30 46, 60 60, 92 54 S 136 34, 150 22',
      head: 'M136 18 C 141 19, 146 20, 151 21 C 149 26, 147 31, 146 36',
    },
    down: {
      vb: '0 0 60 120',
      body: 'M30 6 C 22 30, 38 52, 28 76 C 24 88, 27 98, 30 110',
      head: 'M20 98 C 23 102, 27 106, 30 111 C 34 106, 37 101, 41 97',
    },
  }[variant]
  return (
    <Sketch viewBox={shapes.vb} className={className}>
      <Stroke d={shapes.body} delay={delay} duration={0.8} />
      <Stroke d={shapes.head} delay={delay + 0.7} duration={0.25} />
    </Sketch>
  )
}

/** A hasty circle around something — overshoots where it closes, like a real one. */
export function Circle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <Sketch viewBox="0 0 220 100" className={className} preserveAspectRatio="none">
      <Stroke
        d="M150 14 C 108 2, 30 8, 12 40 C -2 66, 48 94, 120 90 C 186 86, 214 62, 206 38 C 198 16, 150 6, 92 12 C 70 14, 52 18, 40 24"
        delay={delay}
        duration={1.1}
        width={2.2}
      />
    </Sketch>
  )
}

/** A wavy underline. Stretches to the width of its container. */
export function Underline({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <Sketch viewBox="0 0 300 20" className={className} preserveAspectRatio="none">
      <Stroke d="M3 12 C 40 6, 70 15, 110 10 S 180 5, 220 11 S 280 9, 297 7" delay={delay} width={2.4} />
      <Stroke d="M40 16 C 90 12, 160 17, 250 13" delay={delay + 0.5} width={1.4} tone="ash" duration={0.6} />
    </Sketch>
  )
}

/** A little four-point sparkle. */
export function Sparkle({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <Sketch viewBox="0 0 40 40" className={className}>
      <Stroke d="M20 4 C 21 13, 23 17, 36 20 C 24 22, 21 26, 20 36 C 18 26, 15 22, 4 20 C 16 18, 19 13, 20 4 Z" delay={delay} duration={0.7} width={1.8} />
    </Sketch>
  )
}

/** Three short "motion" ticks. */
export function Ticks({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <Sketch viewBox="0 0 40 40" className={className}>
      <Stroke d="M8 30 L 14 22" delay={delay} duration={0.2} />
      <Stroke d="M18 30 C 19 24, 20 18, 21 12" delay={delay + 0.15} duration={0.2} />
      <Stroke d="M28 30 L 33 21" delay={delay + 0.3} duration={0.2} />
    </Sketch>
  )
}

/** A handwritten margin note, optionally with an arrow pointing at something. */
export function Note({
  children,
  className,
  arrow,
  arrowClassName,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  arrow?: 'swoop' | 'hook' | 'loop' | 'down'
  arrowClassName?: string
  delay?: number
}) {
  return (
    <div className={`pointer-events-none select-none ${className ?? ''}`}>
      <p className="hand text-xl sm:text-2xl">{children}</p>
      {arrow && <Arrow variant={arrow} delay={delay} className={`text-ash-600 ${arrowClassName ?? ''}`} />}
    </div>
  )
}

import type { CSSProperties } from 'react'

/**
 * A real product screenshot, "pinned" to the page: ink border, offset paper
 * shadow, optional tilt and masking-tape corners. Two shapes — a browser
 * window (dashboard) or a bare side panel (extension).
 */
export default function ScreenshotFrame({
  src,
  srcSet,
  sizes = '(max-width: 768px) 100vw, 1000px',
  alt,
  width,
  height,
  variant = 'browser',
  url = 'app.resumeloghq.com',
  tilt = 0,
  tape = false,
  eager = false,
  className = '',
  style,
}: {
  src: string
  /** Optional responsive set — phones get the 800px variant. */
  srcSet?: string
  sizes?: string
  alt: string
  /** Intrinsic pixel size of the image — prevents layout shift. */
  width: number
  height: number
  variant?: 'browser' | 'panel' | 'plain'
  url?: string
  tilt?: number
  tape?: boolean
  /** Above-the-fold images load eagerly; everything else is lazy. */
  eager?: boolean
  className?: string
  style?: CSSProperties
}) {
  return (
    <figure
      className={`${/\babsolute\b/.test(className) ? '' : 'relative'} ${className}`}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
    >
      {tape && (
        <>
          <span aria-hidden className="tape -top-3 left-6 -rotate-6" />
          <span aria-hidden className="tape -top-3 right-8 rotate-[5deg]" />
        </>
      )}
      <div className="border-ink overflow-hidden rounded-xl border-[1.5px] bg-white shadow-[6px_6px_0_var(--ash-200)]">
        {variant === 'browser' && (
          <div className="border-ash-100 flex items-center gap-3 border-b bg-white px-3 py-2">
            <div className="flex gap-1.5">
              <span className="border-ash-300 size-2.5 rounded-full border" />
              <span className="border-ash-300 size-2.5 rounded-full border" />
              <span className="border-ash-300 size-2.5 rounded-full border" />
            </div>
            <div className="bg-ash-50 text-ash-500 mx-auto w-full max-w-xs truncate rounded-md px-3 py-0.5 text-center font-mono text-[11px]">
              {url}
            </div>
            <span className="w-10" />
          </div>
        )}
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    </figure>
  )
}

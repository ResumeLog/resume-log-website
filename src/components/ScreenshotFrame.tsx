import type { CSSProperties } from 'react'

/**
 * A real product screenshot in a quiet frame: hairline border, soft layered
 * shadow, and (for `window`) a minimal title bar.
 */
export default function ScreenshotFrame({
  src,
  srcSet,
  sizes = '(max-width: 768px) 100vw, 1000px',
  alt,
  width,
  height,
  variant = 'window',
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
  /** `window` = app window chrome, `panel` = narrow extension panel, `plain` = image only. */
  variant?: 'window' | 'panel' | 'plain'
  eager?: boolean
  className?: string
  style?: CSSProperties
}) {
  const radius = variant === 'panel' ? 'rounded-[14px]' : 'rounded-xl'
  return (
    <figure
      className={`${/\babsolute\b/.test(className) ? '' : 'relative'} ${className}`}
      style={style}
    >
      <div className={`shadow-shot overflow-hidden bg-white ring-1 ring-black/[0.07] ${radius}`}>
        {variant === 'window' && (
          <div className="border-line flex h-8 items-center gap-1.5 border-b bg-white px-3.5">
            <span className="size-2.5 rounded-full bg-[#e6e6e9]" />
            <span className="size-2.5 rounded-full bg-[#e6e6e9]" />
            <span className="size-2.5 rounded-full bg-[#e6e6e9]" />
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

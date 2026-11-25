import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Bell, Check, Lock } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/*
 * Small, looping product "vignettes" — slices of the ResumeLog UI that animate
 * quietly while on screen. Each runs a timeline of steps; with reduced motion
 * it renders its final, settled state and never moves.
 */

const ease = [0.22, 1, 0.36, 1] as const

/** Steps through `durations` (ms each) in a loop while `active`. */
function useTimeline(durations: number[], active: boolean, settled: number) {
  const [step, setStep] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!active || reduce) return
    const t = setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step])
    return () => clearTimeout(t)
  }, [step, active, reduce, durations])
  return reduce ? settled : step
}

/** Wraps a vignette: the grey stage, and an in-view flag for its timeline. */
function Shell({ children, className = '' }: { children: (active: boolean) => ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  return (
    <div ref={ref} className={`stage relative flex items-center justify-center overflow-hidden ${className}`}>
      {children(inView)}
    </div>
  )
}

/* Product status colours, softened — the same hues the dashboard uses. */
const STATUS = {
  Bookmarked: 'bg-zinc-100 text-zinc-600',
  Applied: 'bg-blue-50 text-blue-600',
  Interviewing: 'bg-violet-50 text-violet-600',
  Negotiating: 'bg-amber-50 text-amber-700',
} as const

function Badge({ status }: { status: keyof typeof STATUS }) {
  return <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${STATUS[status]}`}>{status}</span>
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`shadow-soft rounded-xl bg-white ring-1 ring-black/[0.06] ${className}`}>{children}</div>
}

function Bar({ w, className = '' }: { w: string; className?: string }) {
  return <span className={`bg-panel-2 block h-1.5 rounded-full ${className}`} style={{ width: w }} />
}

/* ─────────────────────────── 1. Capture flow ─────────────────────────── */

const LOG = [
  { title: 'Frontend Engineer', company: 'Harbourline', status: 'Applied' as const },
  { title: 'React Developer', company: 'Tidewater', status: 'Interviewing' as const },
  { title: 'UI Engineer', company: 'Lumen & Co.', status: 'Applied' as const },
]

export function CaptureFlow({ className = '' }: { className?: string }) {
  return (
    <Shell className={className}>
      {(active) => <CaptureFlowInner active={active} />}
    </Shell>
  )
}

function CaptureFlowInner({ active }: { active: boolean }) {
  // 0 idle · 1 press · 2 travel · 3 saved (row in) · 4 hold
  const step = useTimeline([1100, 450, 900, 2600, 600], active, 3)
  const saved = step >= 3
  return (
    <div className="flex w-full max-w-[560px] items-center gap-3 px-6 py-10 sm:gap-5">
      {/* the LinkedIn page */}
      <Card className="w-[37%] shrink-0 p-4">
        <div className="text-subtle flex items-center justify-between text-[10px] font-medium">
          <span>linkedin.com/jobs</span>
        </div>
        <p className="mt-3 text-[13px] leading-tight font-medium">Senior Frontend Engineer</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">Northwind Labs · Remote</p>
        <div className="mt-3 flex flex-col gap-1.5">
          <Bar w="100%" />
          <Bar w="86%" />
          <Bar w="64%" />
        </div>
        <motion.div
          animate={{ scale: step === 1 ? 0.94 : 1 }}
          transition={{ duration: 0.18 }}
          className={`mt-4 flex h-7 items-center justify-center gap-1 rounded-md text-[11px] font-medium transition-colors ${
            saved ? 'bg-panel-2 text-muted-foreground' : 'bg-zinc-900 text-white'
          }`}
        >
          {saved ? (
            <>
              <Check size={12} /> Saved
            </>
          ) : (
            'Save'
          )}
        </motion.div>
      </Card>

      {/* connector with a travelling dot */}
      <div className="relative h-px min-w-10 flex-1">
        <div className="absolute inset-0 border-t border-dashed border-zinc-300" />
        <motion.span
          className="absolute -top-[3px] size-[7px] rounded-full bg-zinc-900"
          initial={false}
          animate={step === 2 ? { left: ['0%', '100%'], opacity: [1, 1] } : { left: '0%', opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      </div>

      {/* the log */}
      <Card className="w-[41%] shrink-0 overflow-hidden">
        <div className="border-line text-subtle border-b px-3 py-2 text-[10px] font-medium">Your log</div>
        <ul className="flex flex-col">
          <AnimatePresence initial={false}>
            {saved && (
              <motion.li
                key="new"
                layout
                initial={{ opacity: 0, y: -10, backgroundColor: '#f4f4f5' }}
                animate={{ opacity: 1, y: 0, backgroundColor: '#ffffff' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease, backgroundColor: { duration: 1.6 } }}
                className="border-line flex items-center justify-between gap-2 border-b px-3 py-2"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium">Senior Frontend Engineer</span>
                  <span className="text-subtle block truncate text-[10px]">Northwind Labs</span>
                </span>
                <Badge status="Bookmarked" />
              </motion.li>
            )}
          </AnimatePresence>
          {LOG.slice(0, saved ? 2 : 3).map((row) => (
            <motion.li
              layout
              key={row.title}
              transition={{ duration: 0.5, ease }}
              className="border-line flex items-center justify-between gap-2 border-b px-3 py-2 last:border-b-0"
            >
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-medium">{row.title}</span>
                <span className="text-subtle block truncate text-[10px]">{row.company}</span>
              </span>
              <Badge status={row.status} />
            </motion.li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

/* ─────────────────────────── 2. Job boards ─────────────────────────── */

const BOARDS = [
  { name: 'LinkedIn', job: 'Senior Frontend Engineer' },
  { name: 'Indeed', job: 'React Developer' },
  { name: 'Glassdoor', job: 'UI Engineer' },
  { name: 'Ashby', job: 'Product Engineer' },
  { name: 'Y Combinator', job: 'Founding Engineer' },
]

export function JobBoards({ className = '' }: { className?: string }) {
  return <Shell className={className}>{(active) => <JobBoardsInner active={active} />}</Shell>
}

function JobBoardsInner({ active }: { active: boolean }) {
  // 0 idle · 1..5 one board saved per step · 6 hold
  const step = useTimeline([900, 650, 650, 650, 650, 650, 2400], active, 6)
  return (
    <div className="w-full max-w-[380px] px-6 py-10">
      <Card className="overflow-hidden">
        <div className="border-line text-subtle border-b px-3 py-2 text-[10px] font-medium">Saved from</div>
        <ul className="flex flex-col">
          {BOARDS.map((board, i) => {
            const saved = step > i
            return (
              <li
                key={board.name}
                className="border-line flex items-center justify-between gap-2 border-b px-3 py-2 last:border-b-0"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium">{board.job}</span>
                  <span className="text-subtle block truncate text-[10px]">{board.name}</span>
                </span>
                <motion.span
                  animate={{ scale: step === i + 1 ? [1, 1.12, 1] : 1 }}
                  transition={{ duration: 0.35, ease }}
                  className={`flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium transition-colors ${
                    saved ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {saved ? (
                    <>
                      <Check size={10} strokeWidth={3} /> Saved
                    </>
                  ) : (
                    'Save'
                  )}
                </motion.span>
              </li>
            )
          })}
        </ul>
      </Card>
      <p className="text-subtle mt-3 text-center text-[11px]">More job boards on the way</p>
    </div>
  )
}

/* ─────────────────────────── 3. Status board ─────────────────────────── */

const COLUMNS = ['Applied', 'Interviewing', 'Negotiating'] as const

export function StatusBoard({ className = '' }: { className?: string }) {
  return <Shell className={className}>{(active) => <StatusBoardInner active={active} />}</Shell>
}

function StatusBoardInner({ active }: { active: boolean }) {
  const step = useTimeline([1800, 1800, 2400], active, 1)
  return (
    <div className="grid w-full max-w-[520px] grid-cols-3 gap-2.5 px-6 py-10">
      {COLUMNS.map((col, ci) => (
        <div key={col} className="bg-panel-2/70 flex min-h-[170px] flex-col gap-2 rounded-xl p-2">
          <div className="flex items-center justify-between px-1">
            <Badge status={col} />
            <span className="text-subtle text-[10px]">{ci === step ? 2 : 1}</span>
          </div>
          {/* a resident card per column */}
          <div className="rounded-lg bg-white p-2 ring-1 ring-black/[0.05]">
            <Bar w="80%" />
            <Bar w="50%" className="mt-1.5" />
          </div>
          {ci === step && (
            <motion.div
              layoutId="moving-card"
              transition={{ duration: 0.6, ease }}
              className="shadow-soft rounded-lg bg-white p-2 ring-1 ring-black/[0.08]"
            >
              <p className="truncate text-[11px] font-medium">Senior Frontend Eng.</p>
              <p className="text-subtle truncate text-[10px]">Northwind Labs</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────── 4. ATS score ─────────────────────────── */

const FOUND = ['React', 'TypeScript', 'GraphQL', 'Accessibility']
const MISSING = ['Design systems', 'Redux']

export function AtsScore({ className = '' }: { className?: string }) {
  return <Shell className={className}>{(active) => <AtsScoreInner active={active} />}</Shell>
}

function AtsScoreInner({ active }: { active: boolean }) {
  // 0 reset · 1 fill + chips · 2 hold
  const step = useTimeline([500, 3800, 400], active, 1)
  const on = step === 1
  const r = 34
  const c = 2 * Math.PI * r
  const [shown, setShown] = useState(on ? 83 : 0)
  useEffect(() => {
    if (!on) return
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100)
      setShown(Math.round(83 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on])
  return (
    <div className="flex w-full max-w-[460px] items-center gap-6 px-6 py-10">
      <Card className="flex shrink-0 flex-col items-center p-5">
        <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90">
          <circle cx="46" cy="46" r={r} fill="none" stroke="#f0f0f2" strokeWidth="7" />
          <motion.circle
            cx="46"
            cy="46"
            r={r}
            fill="none"
            stroke="#10b981"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={false}
            animate={{ strokeDashoffset: on ? c * (1 - 0.83) : c }}
            transition={{ duration: on ? 1.1 : 0.3, ease: on ? 'easeOut' : 'easeIn' }}
          />
        </svg>
        <span className="-mt-[60px] mb-[26px] text-xl font-semibold tabular-nums">{on ? shown : 0}</span>
        <motion.span initial={false} animate={{ opacity: on && shown > 70 ? 1 : 0 }} className="text-[11px] font-medium text-emerald-600">Strong match</motion.span>
      </Card>
      <div className="min-w-0 flex-1">
        <p className="text-subtle text-[10px] font-medium">Found</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {FOUND.map((k, i) => (
            <motion.span
              key={k}
              initial={false}
              animate={{ opacity: on ? 1 : 0, y: on ? 0 : 4 }}
              transition={{ duration: 0.3, delay: on ? 0.5 + i * 0.12 : 0 }}
              className="shadow-soft inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[11px] font-medium ring-1 ring-black/[0.06]"
            >
              <Check size={10} className="text-emerald-600" strokeWidth={3} />
              {k}
            </motion.span>
          ))}
        </div>
        <p className="text-subtle mt-4 text-[10px] font-medium">Missing</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {MISSING.map((k, i) => (
            <motion.span
              key={k}
              initial={false}
              animate={{ opacity: on ? 1 : 0, y: on ? 0 : 4 }}
              transition={{ duration: 0.3, delay: on ? 1.1 + i * 0.12 : 0 }}
              className="text-muted-foreground inline-flex rounded-md border border-dashed border-zinc-300 bg-white/60 px-2 py-1 text-[11px] font-medium"
            >
              {k}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── 5. Follow-up orbit ─────────────────────────── */

const ORBIT = [
  { label: 'Applied 21 days ago', ring: 1, angle: -20 },
  { label: 'No reply yet', ring: 0, angle: 200 },
  { label: 'Harbourline', ring: 1, angle: 150 },
  { label: 'Follow up today', ring: 0, angle: 40, strong: true },
]

export function FollowUpOrbit({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const radii = [74, 122]
  return (
    <div className={`stage relative flex items-center justify-center overflow-hidden ${className}`}>
      <div className="relative size-[280px]">
        {radii.map((r) => (
          <span
            key={r}
            className="absolute top-1/2 left-1/2 rounded-full border border-zinc-200"
            style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}
          />
        ))}
        {!reduce && (
          <motion.span
            className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300"
            animate={{ scale: [1, 3.6], opacity: [0.6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {ORBIT.map((chip) => {
            const r = radii[chip.ring]
            const a = (chip.angle * Math.PI) / 180
            return (
              <div
                key={chip.label}
                className="absolute top-1/2 left-1/2"
                style={{ transform: `translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px)` }}
              >
                <motion.span
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[11px] font-medium whitespace-nowrap ${
                    chip.strong ? 'bg-zinc-900 text-white' : 'shadow-soft bg-white ring-1 ring-black/[0.06]'
                  }`}
                  animate={reduce ? undefined : { rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  {chip.label}
                </motion.span>
              </div>
            )
          })}
        </motion.div>
        <div className="shadow-shot absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white ring-1 ring-black/[0.06]">
          <Bell size={22} strokeWidth={1.75} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── small static extras ─────────────────────────── */

export function PrivateBadge() {
  return (
    <div className="stage flex h-full min-h-[200px] items-center justify-center">
      <Card className="flex items-center gap-3 px-4 py-3">
        <span className="bg-panel-2 flex size-8 items-center justify-center rounded-lg">
          <Lock size={15} strokeWidth={1.75} />
        </span>
        <span>
          <span className="block text-[12px] font-medium">Only you can see this log</span>
          <span className="text-subtle block text-[11px]">Signed in with Google</span>
        </span>
      </Card>
    </div>
  )
}

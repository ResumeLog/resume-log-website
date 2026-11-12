import { Sketch, Stroke, Wash } from './Ink'

/*
 * Spot illustrations, all line art in ink + ash. Each takes a className for
 * sizing; colour comes from `currentColor` (set text-ink / text-ash-*).
 */

type P = { className?: string }

/** The problem: a laptop drowning in tabs, a spreadsheet, a worried sticky note. */
export function TabChaos({ className }: P) {
  return (
    <Sketch viewBox="0 0 380 280" className={className} label="A laptop crowded with browser tabs, a messy spreadsheet and a sticky note">
      {/* spreadsheet sheet behind */}
      <Wash d="M222 40 L 352 34 L 360 196 L 230 204 Z" tone={50} />
      <Stroke d="M222 40 L 352 34 L 360 196 L 230 204 Z" tone="ash" delay={0.1} />
      <Stroke d="M225 72 L 354 66 M227 104 L 356 98 M229 136 L 357 130 M230 168 L 358 162" tone="faint" delay={0.3} />
      <Stroke d="M266 38 L 272 202 M312 36 L 318 199" tone="faint" delay={0.4} />
      <Stroke d="M236 86 C 260 84, 300 92, 344 80" tone="ash" delay={1.2} duration={0.4} />
      <Stroke d="M238 118 C 270 122, 310 110, 346 114" tone="ash" delay={1.4} duration={0.4} />
      {/* laptop screen */}
      <Wash d="M40 62 L 236 58 L 240 196 L 44 200 Z" tone={100} delay={0.2} />
      <Stroke d="M38 60 C 100 58, 180 56, 238 57 C 239 102, 240 150, 241 197 C 176 199, 108 200, 44 201 C 42 154, 40 108, 38 60 Z" delay={0} duration={1.2} width={2.4} />
      {/* tabs, too many of them */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Stroke
          key={i}
          d={`M${46 + i * 23} 74 C ${48 + i * 23} 68, ${60 + i * 23} 67, ${64 + i * 23} 73`}
          delay={0.5 + i * 0.06}
          duration={0.25}
          width={1.6}
        />
      ))}
      <Stroke d="M42 78 C 110 76, 180 75, 238 76" delay={0.5} width={1.6} />
      {/* page content scribbles */}
      <Stroke d="M60 100 C 100 98, 140 101, 170 99" tone="ash" delay={1} duration={0.4} />
      <Stroke d="M60 116 C 90 115, 120 118, 150 116" tone="ash" delay={1.1} duration={0.4} />
      <Stroke d="M60 132 C 104 130, 150 134, 210 131" tone="ash" delay={1.2} duration={0.4} />
      <Stroke d="M60 148 C 90 147, 112 149, 130 148" tone="ash" delay={1.3} duration={0.4} />
      {/* base */}
      <Stroke d="M14 206 C 90 204, 200 203, 268 205 C 264 214, 256 220, 244 221 C 180 222, 90 223, 36 221 C 24 220, 16 214, 14 206 Z" delay={0.9} width={2.4} />
      {/* sticky note */}
      <Wash d="M262 168 L 340 160 L 348 236 L 270 244 Z" tone={200} delay={0.8} />
      <Stroke d="M262 168 C 288 165, 314 162, 340 160 C 342 186, 345 211, 348 236 C 322 239, 296 241, 270 244 C 267 218, 265 193, 262 168 Z" delay={0.9} />
      <Stroke d="M276 186 C 290 184, 306 183, 326 181" tone="ash" delay={1.6} duration={0.3} />
      <Stroke d="M278 200 C 292 199, 304 198, 330 196" tone="ash" delay={1.7} duration={0.3} />
      <Stroke d="M300 214 C 300 206, 314 204, 314 212 C 314 218, 306 218, 306 224 M306 231 L 306 232" delay={1.9} duration={0.5} />
      {/* worry ticks */}
      <Stroke d="M354 150 L 364 140 M358 162 L 372 158" tone="ash" delay={2.1} duration={0.3} />
    </Sketch>
  )
}

/** Capture: an open notebook with a ribbon bookmark and a pen. */
export function Notebook({ className }: P) {
  return (
    <Sketch viewBox="0 0 260 200" className={className} label="An open notebook with a bookmark ribbon">
      <Wash d="M20 40 C 70 30, 110 34, 130 48 C 150 34, 196 30, 240 40 L 240 170 C 196 160, 152 162, 130 176 C 108 162, 64 160, 20 170 Z" tone={50} />
      <Stroke d="M20 40 C 70 30, 110 34, 130 48 C 150 34, 196 30, 240 40 C 240 84, 240 126, 240 170 C 196 160, 152 162, 130 176 C 108 162, 64 160, 20 170 C 20 126, 20 84, 20 40 Z" width={2.4} duration={1.2} />
      <Stroke d="M130 48 C 131 90, 131 134, 130 176" delay={0.5} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Stroke key={`l${i}`} d={`M36 ${68 + i * 20} C 66 ${64 + i * 20}, 96 ${66 + i * 20}, 118 ${70 + i * 20}`} tone="faint" delay={0.6 + i * 0.08} duration={0.3} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Stroke key={`r${i}`} d={`M144 ${70 + i * 20} C 170 ${66 + i * 20}, 198 ${64 + i * 20}, 226 ${68 + i * 20}`} tone="ash" delay={1 + i * 0.12} duration={0.35} />
      ))}
      {/* check marks next to lines on the left page */}
      <Stroke d="M40 64 L 45 70 L 54 58" delay={1.5} duration={0.25} />
      <Stroke d="M40 84 L 45 90 L 54 78" delay={1.65} duration={0.25} />
      {/* ribbon */}
      <Stroke d="M196 34 C 197 60, 198 90, 196 120 L 204 110 L 212 122 C 212 90, 211 60, 210 32" delay={0.9} duration={0.7} />
      {/* pen */}
      <Stroke d="M168 186 L 246 136 L 254 146 L 176 196 Z M168 186 L 160 200 L 176 196" delay={1.3} duration={0.8} />
    </Sketch>
  )
}

/** ATS: a résumé page under a magnifying glass, a couple of ticks and one cross. */
export function Magnifier({ className }: P) {
  return (
    <Sketch viewBox="0 0 260 220" className={className} label="A résumé under a magnifying glass">
      <Wash d="M40 20 L 170 14 L 178 196 L 48 202 Z" tone={50} />
      <Stroke d="M40 20 C 84 18, 128 16, 170 14 C 173 75, 176 136, 178 196 C 134 198, 92 200, 48 202 C 45 141, 42 80, 40 20 Z" width={2.4} duration={1.1} />
      <Stroke d="M58 40 C 80 39, 100 38, 116 38" delay={0.5} width={3} duration={0.3} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Stroke key={i} d={`M58 ${62 + i * 18} C 90 ${61 + i * 18}, 124 ${60 + i * 18}, ${150 - (i % 3) * 14} ${59 + i * 18}`} tone="ash" delay={0.6 + i * 0.07} duration={0.3} />
      ))}
      {/* lens */}
      <Wash d="M196 112 m -48 0 a 48 46 0 1 0 96 0 a 48 46 0 1 0 -96 0" tone={100} delay={0.9} />
      <Stroke d="M150 104 C 152 76, 178 62, 202 66 C 230 70, 246 96, 242 122 C 238 148, 212 162, 188 158 C 162 154, 146 132, 150 104 Z" width={2.6} delay={0.8} />
      <Stroke d="M228 150 C 236 162, 244 174, 254 188" width={6} delay={1.3} duration={0.4} />
      {/* marks inside the lens */}
      <Stroke d="M172 100 L 179 108 L 192 92" delay={1.6} duration={0.25} />
      <Stroke d="M172 126 L 179 134 L 192 118" delay={1.8} duration={0.25} />
      <Stroke d="M206 96 L 220 110 M220 96 L 206 110" delay={2} duration={0.3} />
    </Sketch>
  )
}

/** Follow-ups: a desk calendar with one date circled and a tiny bell. */
export function Calendar({ className }: P) {
  return (
    <Sketch viewBox="0 0 240 210" className={className} label="A calendar with one date circled">
      <Wash d="M30 40 L 200 34 L 206 186 L 36 192 Z" tone={50} />
      <Stroke d="M30 40 C 86 38, 144 36, 200 34 C 202 85, 204 135, 206 186 C 150 188, 92 190, 36 192 C 34 141, 32 91, 30 40 Z" width={2.4} duration={1.1} />
      <Wash d="M30 40 L 200 34 L 201 66 L 31 72 Z" tone={200} delay={0.4} />
      <Stroke d="M31 72 C 90 70, 150 68, 201 66" delay={0.4} />
      <Stroke d="M70 26 L 72 50 M160 22 L 162 46" delay={0.6} width={3} duration={0.25} />
      {/* grid dots for days */}
      {Array.from({ length: 4 }).flatMap((_, r) =>
        Array.from({ length: 5 }).map((__, c) => (
          <Stroke key={`${r}-${c}`} d={`M${56 + c * 30} ${92 + r * 24} l 1 0`} width={4} tone="ash" delay={0.7 + (r * 5 + c) * 0.02} duration={0.05} />
        )),
      )}
      {/* circled date */}
      <Stroke d="M136 136 C 122 128, 106 138, 110 152 C 114 166, 140 166, 150 154 C 158 142, 146 126, 126 130" delay={1.3} width={2.4} duration={0.7} />
      {/* bell */}
      <Stroke d="M196 18 C 186 20, 182 30, 182 40 C 182 48, 178 52, 174 56 L 220 54 C 214 50, 212 46, 211 38 C 210 28, 206 18, 196 18 Z M192 60 C 194 66, 202 66, 204 59" delay={1.6} duration={0.7} />
      <Stroke d="M226 26 L 234 20 M228 40 L 238 40" tone="ash" delay={2.2} duration={0.2} />
    </Sketch>
  )
}

/** Outcomes: a funnel with dots going in and a star coming out. */
export function Funnel({ className }: P) {
  return (
    <Sketch viewBox="0 0 240 230" className={className} label="A funnel turning many dots into one star">
      <Wash d="M30 40 C 90 34, 150 34, 210 40 L 140 120 L 140 176 L 104 190 L 102 120 Z" tone={50} />
      <Stroke d="M30 40 C 90 34, 150 34, 210 40 C 186 66, 162 94, 140 120 C 140 140, 140 158, 140 176 C 128 181, 116 186, 104 190 C 103 166, 102 144, 102 120 C 78 94, 54 68, 30 40 Z" width={2.4} duration={1.2} />
      <Stroke d="M30 40 C 80 50, 160 50, 210 40" tone="ash" delay={0.5} />
      {[[60, 14], [86, 22], [112, 10], [138, 20], [164, 12], [186, 22], [100, 30], [150, 32]].map(([x, y], i) => (
        <Stroke key={i} d={`M${x} ${y} l 1 1`} width={6} delay={0.8 + i * 0.05} duration={0.05} />
      ))}
      <Stroke d="M121 196 C 123 204, 126 207, 134 208 C 127 211, 124 214, 122 222 C 120 214, 116 211, 109 208 C 116 207, 119 204, 121 196 Z" delay={1.5} duration={0.5} width={2} />
    </Sketch>
  )
}

/** The extension: a browser window with a side panel docked on the right. */
export function BrowserPanel({ className }: P) {
  return (
    <Sketch viewBox="0 0 300 210" className={className} label="A browser window with a side panel">
      <Wash d="M20 24 L 280 20 L 284 190 L 24 194 Z" tone={50} />
      <Stroke d="M20 24 C 106 22, 194 21, 280 20 C 281 77, 283 133, 284 190 C 197 191, 110 193, 24 194 C 22 137, 21 81, 20 24 Z" width={2.4} duration={1.2} />
      <Stroke d="M21 48 C 108 46, 196 45, 281 44" delay={0.4} />
      <Stroke d="M34 36 l 1 0 M46 35 l 1 0 M58 35 l 1 0" width={5} delay={0.5} duration={0.1} />
      <Wash d="M200 44 L 281 44 L 284 190 L 202 191 Z" tone={200} delay={0.6} />
      <Stroke d="M200 45 C 201 94, 201 142, 202 191" delay={0.6} />
      <Stroke d="M212 66 C 230 65, 250 64, 270 64" delay={1} duration={0.3} />
      <Stroke d="M212 82 C 228 81, 244 81, 258 80" tone="ash" delay={1.1} duration={0.3} />
      <Stroke d="M212 96 C 226 95, 240 95, 262 94" tone="ash" delay={1.2} duration={0.3} />
      <Stroke d="M212 164 C 230 163, 250 163, 270 162 C 271 168, 271 174, 270 178 C 252 179, 230 179, 212 180 C 211 174, 211 168, 212 164 Z" delay={1.4} duration={0.5} />
      {/* page skeleton */}
      <Stroke d="M40 70 C 90 68, 140 68, 180 67" delay={0.8} duration={0.3} width={3} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Stroke key={i} d={`M40 ${92 + i * 18} C 80 ${91 + i * 18}, 130 ${90 + i * 18}, ${176 - (i % 2) * 30} ${90 + i * 18}`} tone="ash" delay={0.9 + i * 0.06} duration={0.3} />
      ))}
      {/* arrow from page into the panel */}
      <Stroke d="M150 150 C 168 160, 186 160, 206 150" delay={1.8} duration={0.5} />
      <Stroke d="M196 144 L 207 150 L 198 158" delay={2.2} duration={0.2} />
    </Sketch>
  )
}

/** CTA: a paper plane with a looping dashed flight path. */
export function PaperPlane({ className }: P) {
  return (
    <Sketch viewBox="0 0 260 150" className={className} label="A paper plane">
      <Stroke d="M10 120 C 40 130, 70 120, 84 100 C 98 80, 80 64, 70 78 C 60 92, 96 110, 140 94 C 160 86, 172 76, 182 66" tone="ash" dashed />
      <Wash d="M180 62 L 250 22 L 222 98 Z" tone={50} />
      <Stroke d="M180 62 C 204 48, 228 34, 250 22 C 242 48, 232 72, 222 98 C 214 86, 206 76, 198 70 C 192 68, 186 64, 180 62 Z" width={2.4} duration={0.9} />
      <Stroke d="M198 70 C 214 54, 232 38, 250 22" delay={0.6} duration={0.5} />
      <Stroke d="M198 70 L 204 92 L 212 82" delay={0.9} duration={0.3} />
    </Sketch>
  )
}

/** About: a desk with a laptop, a steaming mug and a small plant. */
export function Desk({ className }: P) {
  return (
    <Sketch viewBox="0 0 340 240" className={className} label="A desk with a laptop, a mug of tea and a plant">
      <Stroke d="M10 196 C 110 192, 230 192, 330 196" width={2.6} duration={1} />
      <Stroke d="M40 198 L 44 236 M300 198 L 296 236" tone="ash" delay={0.4} duration={0.3} />
      {/* laptop */}
      <Wash d="M92 84 L 220 80 L 222 168 L 94 172 Z" tone={100} delay={0.3} />
      <Stroke d="M92 84 C 134 82, 178 81, 220 80 C 221 109, 221 139, 222 168 C 180 169, 136 171, 94 172 C 93 143, 92 113, 92 84 Z" delay={0.2} width={2.4} />
      <Stroke d="M74 186 C 130 184, 190 183, 240 184 C 236 190, 230 193, 220 194 C 170 195, 120 195, 90 194 C 82 193, 77 190, 74 186 Z" delay={0.6} />
      <Stroke d="M112 108 C 140 107, 170 106, 196 106 M112 124 C 136 123, 158 123, 180 122 M112 140 C 140 139, 168 139, 200 138" tone="ash" delay={1.1} duration={0.5} />
      {/* mug */}
      <Wash d="M252 140 L 290 138 L 288 190 L 256 192 Z" tone={50} delay={0.8} />
      <Stroke d="M252 140 C 264 139, 278 138, 290 138 C 290 156, 289 173, 288 190 C 277 191, 266 192, 256 192 C 254 174, 253 157, 252 140 Z M290 150 C 304 148, 306 172, 289 174" delay={0.8} />
      <Stroke d="M262 128 C 256 118, 270 112, 264 100 M276 126 C 270 116, 284 110, 278 98" tone="ash" delay={1.6} duration={0.6} />
      {/* plant */}
      <Stroke d="M30 192 L 34 158 L 68 156 L 66 192" delay={0.9} />
      <Stroke d="M50 156 C 46 130, 30 120, 20 116 C 34 112, 48 124, 50 156 C 52 126, 60 104, 76 96 C 74 116, 64 134, 50 156 C 52 134, 44 108, 46 88" delay={1.2} duration={1} />
    </Sketch>
  )
}

/** 404: a crumpled page and a trail of dotted footsteps going nowhere. */
export function LostPage({ className }: P) {
  return (
    <Sketch viewBox="0 0 300 200" className={className} label="A crumpled page with a wandering dotted trail">
      <Stroke d="M14 170 C 60 180, 90 140, 120 150 C 150 160, 140 190, 180 180 C 200 175, 206 160, 214 150" tone="ash" dashed />
      <Wash d="M222 104 C 236 88, 268 86, 282 104 C 296 122, 284 152, 258 156 C 232 160, 208 132, 222 104 Z" tone={100} />
      <Stroke d="M222 104 C 236 88, 268 86, 282 104 C 296 122, 284 152, 258 156 C 232 160, 208 132, 222 104 Z" width={2.4} duration={1} />
      <Stroke d="M230 110 L 252 122 L 248 140 M252 122 L 274 108 M252 122 L 266 142" tone="ash" delay={0.8} duration={0.6} />
      <Stroke d="M96 40 C 96 24, 124 22, 124 40 C 124 54, 110 54, 110 70 M110 84 l 0 1" width={3} delay={0.4} duration={0.9} />
    </Sketch>
  )
}

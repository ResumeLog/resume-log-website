# Website screenshots

Regenerates every image in `../../src/assets/screens/` from the **real** dashboard
and extension, fed with **fictional** demo data ("Jordan Ellis", made-up
companies). No real account, database or cloud storage is touched: every API
call is answered from `fixtures.mjs` inside Playwright.

Kept separate from the site's own `package.json` on purpose — none of this ships.

## Run

Needs the sibling repos checked out next to `resume-log-website`, and Google Chrome
installed (or set `CHROME_PATH`).

```bash
# 1. once
npm install
(cd ../../../resume-log-be && npm run build)            # ats-score.mjs uses the real ATS scorer from dist/
(cd ../../../resume-log-extension && npm run build)     # capture-panel.mjs renders build/chrome-mv3-prod

# 2. the dashboard dev server, on the port capture.mjs expects
(cd ../../../resume-log-fe && npx vite --port 5181 --strictPort) &

# 3. everything
npm run all
```

| Step | Script | Output |
| --- | --- | --- |
| Demo résumé | `gen-resume.mjs` | `fixtures/jordan-ellis-resume.docx` + `.pdf` |
| Real ATS score | `ats-score.mjs` | `fixtures/ats-result.json` (scored against `fixtures/jd.txt`) |
| Dashboard shots | `capture.mjs [name…]` | `shots/*.png` at 1440×900 @2x |
| Side panel shots | `capture-panel.mjs` | `shots/extension-*.png` — the built panel with a stubbed `chrome.*` |
| Crop + export | `process.mjs` | `../../src/assets/screens/*.webp` + `-800` variants |

Then update sizes/alt text in `src/lib/screens.ts` if a crop changed.

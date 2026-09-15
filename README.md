# Resume Log — website

The public marketing site for [Resume Log](../resume-log-ai-kb/README.md): a Chrome extension +
dashboard that automatically captures the jobs, companies, and people you encounter on LinkedIn,
including what you submitted through Easy Apply.

A single-page app built with React, TypeScript, and Vite, routed with `react-router-dom`. The
visual design system (colors, type, and component patterns) is ported from
`dewmith-mihisara-personal-portfolio-v2`.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first config in `src/index.css`, no `tailwind.config.js`)
- `react-router-dom` for client-side routing
- Framer Motion for scroll reveals and micro-interactions
- `lucide-react` for icons
- `oxlint` for linting

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # run oxlint
npm run preview  # preview the production build
```

## Pages

- `/` — Home
- `/features` — Features
- `/how-it-works` — How It Works
- `/about` — About
- `/get-started` — Get Started (early-access waitlist form, front-end only)

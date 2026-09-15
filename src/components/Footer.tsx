import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-14 md:px-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <Link to="/" className="flex items-center gap-2 font-mono text-base font-semibold tracking-tight">
              <img src="/resumelog-icon.svg" alt="" width="18" height="20" />
              ResumeLog
            </Link>
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
              A quiet log of every job, company, and person you meet on your search — captured
              automatically as you browse.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Site</span>
              <Link to="/features" className="text-sm">
                Features
              </Link>
              <Link to="/how-it-works" className="text-sm">
                How It Works
              </Link>
              <Link to="/about" className="text-sm">
                About
              </Link>
              <Link to="/get-started" className="text-sm">
                Get Started
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow">Connect</span>
              <a href="#" className="text-sm">
                GitHub
              </a>
              <a href="#" className="text-sm">
                LinkedIn
              </a>
              <a href="mailto:hello@resumelog.app" className="text-sm">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="border-border flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="tag">© {new Date().getFullYear()} Resume Log. Built for job seekers.</p>
          <p className="tag">Early access — actively in development.</p>
        </div>
      </div>
    </footer>
  )
}

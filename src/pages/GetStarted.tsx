import { CheckCircle2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import Reveal from '../components/Reveal'

export default function GetStarted() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 md:px-16 md:pt-28">
      <div className="grid gap-14 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Get started</p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
            Join the early access list.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-md leading-relaxed">
            Resume Log isn’t on the Chrome Web Store yet — it’s still early and actively
            being built. Leave your email and you’ll be one of the first to get access once
            it’s ready.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {[
              'No spam — just a note when access opens up',
              'Priority access before the public launch',
              'A chance to shape what ships next',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-foreground" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="card p-8">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
              <CheckCircle2 size={32} />
              <h2 className="font-display text-xl font-semibold">You’re on the list</h2>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                Thanks for signing up — we’ll be in touch at <strong>{email}</strong> as soon
                as early access opens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="border-border focus:border-foreground rounded-lg border px-4 py-3 text-sm focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jane@example.com"
                  className="border-border focus:border-foreground rounded-lg border px-4 py-3 text-sm focus:outline-none"
                />
              </div>

              <button type="submit" className="btn-solid mt-2">
                Join the waitlist
              </button>

              <p className="tag text-center">Currently in early access — Chrome Web Store coming soon.</p>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  )
}

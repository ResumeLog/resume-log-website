import { Link } from 'react-router-dom'
import { Section } from '../components/ui'

export default function NotFound() {
  return (
    <Section bare inner="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-subtle font-mono text-sm">404</span>
      <h1 className="display mt-4 text-4xl sm:text-5xl">Page not found</h1>
      <p className="text-muted-foreground mt-4 max-w-sm leading-relaxed">It doesn’t exist, or it has moved.</p>
      <div className="mt-8 flex gap-2.5">
        <Link to="/features" className="btn-outline">
          See features
        </Link>
        <Link to="/" className="btn-solid">
          Back to home
        </Link>
      </div>
    </Section>
  )
}

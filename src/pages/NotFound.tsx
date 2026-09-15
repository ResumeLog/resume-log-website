import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-32 md:px-16">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="text-muted-foreground max-w-md">
        The page you're looking for doesn't exist, or has moved.
      </p>
      <Link to="/" className="btn-solid mt-2">
        Back to home
      </Link>
    </div>
  )
}

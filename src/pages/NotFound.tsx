import { Link } from 'react-router-dom'
import { LostPage } from '../components/illustrations/Scenes'

export default function NotFound() {
  return (
    <div className="dot-grid">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        <div>
          <p className="hand text-2xl">404</p>
          <h1 className="display mt-2 text-5xl sm:text-6xl">This page didn’t make it into the log.</h1>
          <p className="text-ash-600 mt-5 max-w-md leading-relaxed">
            It doesn’t exist, or it moved. Let’s get you back somewhere useful.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/" className="btn-solid">
              Back to home
            </Link>
            <Link to="/features" className="btn-outline">
              See features
            </Link>
          </div>
        </div>
        <LostPage className="text-ink mx-auto w-full max-w-md" />
      </div>
    </div>
  )
}

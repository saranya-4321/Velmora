import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Velmora Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'The page you requested could not be found.')
  }, [])

  return (
    <div className="container-page py-16">
      <div className="card p-10 text-center max-w-2xl mx-auto">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-forest/10 grid place-items-center">
          <span className="text-2xl" aria-hidden="true">
            🌿
          </span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl">404 — Not Found</h1>
        <p className="mt-3 text-sm text-charcoal/70">
          Let’s get you back to calm, curated essentials.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary" aria-label="Go home">
            Go Home
          </Link>
          <Link to="/shop" className="btn-outline" aria-label="Browse shop">
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  )
}


import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About — Velmora Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Learn about Velmora Oils — our approach to premium essential oils, sourcing, and rituals.',
      )
  }, [])

  return (
    <div className="container-page py-10">
      <div className="card p-8 sm:p-12">
        <h1 className="font-heading text-3xl sm:text-4xl">About Velmora</h1>
        <p className="mt-4 text-sm sm:text-base text-charcoal/75 leading-relaxed max-w-3xl">
          Velmora Oils is a premium essential oil & aromatherapy brand inspired by nature’s quiet
          luxury. We focus on clean formulations, therapeutic-grade quality, and modern rituals that
          fit effortlessly into daily life.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Sourced with intention',
              text: 'We choose botanicals for aroma integrity, consistency, and quality you can trust.',
            },
            {
              title: 'Crafted for rituals',
              text: 'From morning focus to evening calm — every oil is designed to layer beautifully.',
            },
            {
              title: 'Clean & conscious',
              text: 'No fillers, no synthetics — just pure plant essence in protective dark glass.',
            },
          ].map((c) => (
            <div key={c.title} className="card p-6 bg-white/40">
              <h2 className="font-heading text-xl">{c.title}</h2>
              <p className="mt-2 text-sm text-charcoal/70">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


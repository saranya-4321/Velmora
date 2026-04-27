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
          Velmora Essential Oils is a premium Indian brand offering 100% pure, natural, therapeutic‑grade
          essential oils for everyday wellness. Our oils are steam distilled, chemical‑free, and ethically
          sourced—designed for aromatherapy, skincare, and haircare with results you can trust.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Steam distilled purity',
              text: 'Traditional steam distillation to preserve aroma, purity, and therapeutic benefits—no additives or fillers.',
            },
            {
              title: 'Everyday wellness',
              text: 'Lavender for relaxation and sleep, rosemary for hair care rituals, and eucalyptus for a fresh breathing ambience.',
            },
            {
              title: 'Quality & transparency',
              text: 'Recognized among the best essential oil brands in India—Velmora stands for clean sourcing, safe use, and consistent results.',
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


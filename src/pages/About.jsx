import { useEffect } from 'react'

export default function About() {
  useEffect(() => {
    document.title = 'About Velmora | Premium Essential Oils Manufacturer India'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Velmora is India\'s leading essential oils manufacturer offering pure therapeutic essential oils, organic spices, and aromatherapy products. Steam distilled, chemical-free, ethically sourced.',
      )
  }, [])

  return (
    <div className="container-page py-10">
      <div className="card p-8 sm:p-12">
        <h1 className="font-heading text-3xl sm:text-4xl">About Velmora Essential Oils</h1>
        <p className="mt-4 text-sm sm:text-base text-charcoal/75 leading-relaxed max-w-3xl">
          Velmora is India's premier essential oils manufacturer and supplier, specializing in premium therapeutic-grade essential oils for aromatherapy, natural wellness, and holistic healing. Our pure essential oils are steam-distilled from the finest organic botanicals, ensuring maximum potency and therapeutic benefits. From lavender essential oil for relaxation to eucalyptus oil for respiratory health, we provide natural solutions for modern wellness needs.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: 'Pure Steam Distilled Essential Oils',
              text: 'Our essential oils undergo traditional steam distillation to preserve natural aroma compounds, therapeutic properties, and purity—no synthetic additives or chemical processing.',
            },
            {
              title: 'Therapeutic Aromatherapy Benefits',
              text: 'Experience the healing power of nature with our essential oils for aromatherapy. Lavender oil for stress relief, rosemary oil for mental clarity, and eucalyptus oil for respiratory wellness.',
            },
            {
              title: 'Certified Quality & Organic Sourcing',
              text: 'As a trusted essential oil brand in India, Velmora ensures transparent sourcing, rigorous quality testing, and sustainable practices for premium organic essential oils you can trust.',
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


import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BotanicalBackdrop() {
  return (
    <svg
      className="absolute -top-16 -right-16 h-72 w-72 text-sage/30 blur-[0.3px]"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M145 35c-28 5-52 26-63 53-6 14-9 29-10 44 12-2 25-6 39-12 36-16 55-44 34-85Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M78 132c10-15 25-28 43-39"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="62" cy="62" r="7" fill="currentColor" opacity="0.4" />
      <circle cx="170" cy="92" r="5" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

const slides = [
  {
    id: 1,
    title: 'Premium Essential Oils for Natural Wellness',
    text: 'Discover pure essential oils for aromatherapy, skincare, and holistic healing. Shop therapeutic-grade essential oils online with free shipping across India.',
    ctaPrimary: { to: '/shop?category=Essential%20Oils', label: 'Shop Essential Oils' },
    ctaSecondary: { to: '/about', label: 'Learn More' },
    image: '/images/velmora-products.jpg',
  },
  {
    id: 2,
    title: 'Organic Spices & Natural Essential Oils',
    text: 'Experience the finest quality organic spices and pure essential oils. From eucalyptus oil to rosemary essential oil, find everything for your natural lifestyle.',
    ctaPrimary: { to: '/spices', label: 'Explore Spices' },
    ctaSecondary: { to: '/shop?category=Gift%20Sets', label: 'Gift Sets' },
    image: '/images/velmora-products.jpg',
  },
]

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => window.clearInterval(timer)
  }, [])

  const currentSlide = slides[activeSlide]

  return (
    <section className="relative">
      <div className="container-page pt-14 sm:pt-20">
        <div className="card overflow-hidden relative">
          <BotanicalBackdrop />
          <div className="grid gap-10 lg:grid-cols-2 p-8 sm:p-12 lg:p-14 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-sm font-semibold text-forest">
                <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                Auto Carousel • 2 Slides
              </p>
              <h1 className="mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                {currentSlide.title}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-charcoal/75 max-w-xl">
                {currentSlide.text}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to={currentSlide.ctaPrimary.to} className="btn-primary">
                  {currentSlide.ctaPrimary.label}
                </Link>
                <Link to={currentSlide.ctaSecondary.to} className="btn-outline">
                  {currentSlide.ctaSecondary.label}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['100% Pure', 'Therapeutic Grade', 'Organic Essential Oils', 'Aromatherapy', 'Natural Healing', 'Steam Distilled'].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center rounded-full bg-white/60 ring-1 ring-forest/10 px-4 py-2 text-sm font-semibold text-charcoal/80"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-forest/10 via-gold/10 to-transparent rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-forest/10 shadow-soft bg-white/40">
                <img src={currentSlide.image} alt="Velmora hero slide" className="h-[420px] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-cream/95">
                      Slide {activeSlide + 1} / {slides.length}
                    </p>
                    <div className="flex items-center gap-2">
                      {slides.map((slide, index) => (
                        <button
                          key={slide.id}
                          type="button"
                          aria-label={`Go to slide ${index + 1}`}
                          onClick={() => setActiveSlide(index)}
                          className={[
                            'h-2.5 rounded-full transition-all',
                            activeSlide === index ? 'w-8 bg-gold' : 'w-2.5 bg-cream/70',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


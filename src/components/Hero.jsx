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

const categories = [
  {
    id: 'oils',
    badge: 'Essential Oils',
    title: 'Premium Essential Oils for Natural Wellness',
    text: 'Discover pure essential oils for aromatherapy, skincare, and holistic healing. Therapeutic-grade with free shipping across India.',
    ctaPrimary: { to: '/explore-oils?category=Essential%20Oils', label: 'Shop Essential Oils' },
    ctaSecondary: { to: '/spices-range', label: 'Gift Sets' },
    image: '/images/velmora-products.jpg',
    tags: ['100% Pure', 'Therapeutic Grade', 'Steam Distilled', 'Aromatherapy'],
    accentColor: 'from-forest/10 via-gold/10',
  },
  {
    id: 'spices',
    badge: 'Organic Spices',
    title: 'Organic Spices & Natural Blends',
    text: 'Experience the finest quality organic spices sourced directly from farms. From everyday staples to exotic blends for your natural lifestyle.',
    ctaPrimary: { to: '/spices-range', label: 'Explore Spices' },
    ctaSecondary: { to: '/explore-oils', label: 'Learn More' },
    image: '/images/spicesimage.jpg',
    tags: ['Farm Fresh', 'Organic', 'Hand Picked', 'Natural Healing'],
    accentColor: 'from-gold/20 via-amber-100/30',
  },
]

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-page pt-14 sm:pt-20">
        {/* Main intro heading */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-sm font-semibold text-forest mb-4">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            Pure. Organic. Natural.
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Nature's Finest, Delivered to You
          </h1>
          <p className="mt-4 text-base sm:text-lg text-charcoal/70 max-w-2xl mx-auto">
            From therapeutic-grade essential oils to hand-picked organic spices — everything you need for a natural lifestyle, in one place.
          </p>
        </div>

        {/* Two-column category cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat.id} className="card overflow-hidden relative">
              <BotanicalBackdrop />

              <div className="p-6 sm:p-8 flex flex-col gap-6">
                {/* Image */}
                <div className="relative rounded-2xl overflow-hidden ring-1 ring-forest/10 shadow-soft bg-white/40">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${cat.accentColor} to-transparent rounded-2xl blur-xl`} />
                  <img
                    src={cat.image}
                    alt={cat.badge}
                    className="relative h-52 sm:h-64 w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-3 py-1.5 text-xs font-semibold text-forest mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                    {cat.badge}
                  </p>

                  <h2 className="font-heading text-2xl sm:text-3xl leading-tight">
                    {cat.title}
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-charcoal/70">
                    {cat.text}
                  </p>
                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-white/60 ring-1 ring-forest/10 px-3 py-1 text-xs font-semibold text-charcoal/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <Link to={cat.ctaPrimary.to} className="btn-primary">
                      {cat.ctaPrimary.label}
                    </Link>
                    <Link to={cat.ctaSecondary.to} className="btn-outline">
                      {cat.ctaSecondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
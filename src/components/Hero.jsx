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

export default function Hero() {
  return (
    <section className="relative">
      <div className="container-page pt-14 sm:pt-20">
        <div className="card overflow-hidden relative">
          <BotanicalBackdrop />
          <div className="grid gap-10 lg:grid-cols-2 p-8 sm:p-12 lg:p-14 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-forest/10 px-4 py-2 text-sm font-semibold text-forest">
                <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                100% Natural & Pure
              </p>
              <h1 className="mt-5 font-heading text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Velmora — Purity You Can Trust. Wellness You Can Feel
              </h1>
              <p className="mt-5 text-base sm:text-lg text-charcoal/75 max-w-xl">
                Premium Indian essential oils—steam distilled, chemical‑free, and ethically sourced.
                Designed for aromatherapy, skincare, and haircare.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/shop" className="btn-primary">
                  Shop Now
                </Link>
                <Link to="/about" className="btn-outline">
                  Learn More
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {['100% Pure', 'Steam Distilled', 'Chemical‑Free', 'Ethically Sourced'].map((b) => (
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
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/velmora-logo.png"
                      alt="Velmora Oils logo"
                      className="h-12 w-12 rounded-3xl bg-white/70 p-2 ring-1 ring-forest/10"
                      loading="lazy"
                    />
                    <div>
                      <p className="text-xs font-semibold text-charcoal/70 tracking-[0.34em] uppercase">
                        Premium Essential Oils
                      </p>
                      <p className="font-heading text-2xl leading-tight">Pure Botanical Power</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { src: '/images/lavender.svg', label: 'Lavender' },
                      { src: '/images/rosemary.svg', label: 'Rosemary' },
                      { src: '/images/eucalyptus.svg', label: 'Eucalyptus' },
                    ].map((p) => (
                      <div key={p.label} className="rounded-2xl overflow-hidden ring-1 ring-forest/10 bg-white/60">
                        <img src={p.src} alt={`${p.label} essential oil`} className="h-28 sm:h-32 w-full object-cover" />
                        <p className="px-3 py-2 text-xs font-semibold text-charcoal/75">{p.label}</p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-sm text-charcoal/70">
                    Lavender for relaxation & sleep • Rosemary for hair growth • Eucalyptus for respiratory relief
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


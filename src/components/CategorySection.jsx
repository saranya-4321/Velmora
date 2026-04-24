import { categories } from '../data/products.js'

export default function CategorySection({ value = 'All', onChange }) {
  return (
    <section className="container-page mt-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-2xl sm:text-3xl">Explore by Category</h2>
        <div className="hidden sm:block text-sm text-charcoal/70">Curated essentials</div>
      </div>

      <div className="mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Filter category ${c}`}
              onClick={() => onChange?.(c)}
              className={[
                'rounded-full px-4 py-2 text-sm font-semibold transition-all ring-1',
                value === c
                  ? 'bg-forest text-cream ring-forest shadow-soft'
                  : 'bg-white/60 text-charcoal ring-forest/10 hover:bg-forest/5 hover:ring-forest/25',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}


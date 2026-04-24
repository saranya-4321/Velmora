import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { categories, products } from '../data/products.js'
import ProductGrid from '../components/ProductGrid.jsx'

const sorters = {
  Featured: (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  'Price Low-High': (a, b) => a.price - b.price,
  'Price High-Low': (a, b) => b.price - a.price,
  Rating: (a, b) => b.rating - a.rating,
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const queryCategory = searchParams.get('category')

  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState(() => {
    if (queryCategory) return new Set([queryCategory])
    return new Set()
  })
  const [maxPrice, setMaxPrice] = useState(999)
  const [sort, setSort] = useState('Featured')
  const [pageSize, setPageSize] = useState(12)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    document.title = 'Shop — Velmora Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Shop Velmora Oils — premium essential oils and gift sets crafted for modern aromatherapy rituals.',
      )
  }, [])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 550)
    return () => clearTimeout(t)
  }, [queryCategory])

  useEffect(() => {
    if (!queryCategory) return
    setSelectedCategories(new Set([queryCategory]))
  }, [queryCategory])

  const filtered = useMemo(() => {
    const cats = selectedCategories
    const byCat = (p) => (cats.size === 0 ? true : cats.has(p.category))
    const byPrice = (p) => p.price <= maxPrice
    const out = products.filter((p) => byCat(p) && byPrice(p))
    const sorter = sorters[sort] || sorters.Featured
    out.sort(sorter)
    return out
  }, [selectedCategories, maxPrice, sort])

  const visible = filtered.slice(0, pageSize)

  const toggleCat = (c) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(c)) next.delete(c)
      else next.add(c)
      return next
    })
  }

  const Filters = ({ compact = false }) => (
    <div className={compact ? '' : 'sticky top-24'}>
      <div className="card p-5">
        <h3 className="font-heading text-lg">Filters</h3>

        <div className="mt-5">
          <p className="text-sm font-semibold text-charcoal">Categories</p>
          <div className="mt-3 space-y-2">
            {categories
              .filter((c) => c !== 'All')
              .map((c) => (
                <label key={c} className="flex items-center gap-3 text-sm text-charcoal/80">
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(c)}
                    onChange={() => toggleCat(c)}
                    aria-label={`Toggle category ${c}`}
                    className="h-4 w-4 rounded border-forest/20 text-forest focus:ring-gold/60"
                  />
                  <span>{c}</span>
                </label>
              ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-charcoal">Max Price</p>
            <p className="text-sm font-bold text-charcoal">₹{maxPrice}</p>
          </div>
          <input
            type="range"
            min={0}
            max={999}
            step={1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            aria-label="Price range"
            className="mt-3 w-full accent-[#2D5016]"
          />
        </div>

        <div className="mt-6">
          <p className="text-sm font-semibold text-charcoal">Sort by</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
            className="mt-3 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
          >
            {Object.keys(sorters).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        {!compact ? null : (
          <button type="button" className="btn-primary mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>
            Apply Filters
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="container-page py-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl">Shop</h1>
          <p className="mt-2 text-sm text-charcoal/70">
            Showing {Math.min(visible.length, filtered.length)} of {filtered.length} products
          </p>
        </div>

        <button
          type="button"
          className="lg:hidden btn-outline"
          aria-label="Open filters"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <Filters />
        </div>

        <div>
          <ProductGrid items={visible} loading={loading} />

          {loading || filtered.length <= pageSize ? null : (
            <div className="mt-8">
              <button
                type="button"
                className="btn-outline w-full"
                aria-label="Load more products"
                onClick={() => setPageSize((s) => s + 6)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <div
        className={[
          'fixed inset-0 z-[80] lg:hidden',
          mobileFiltersOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileFiltersOpen}
      >
        <div
          className={[
            'absolute inset-0 bg-charcoal/35 transition-opacity duration-200',
            mobileFiltersOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={[
            'absolute inset-x-0 bottom-0 bg-cream rounded-t-3xl border-t border-forest/10 shadow-2xl',
            'transition-transform duration-200',
            mobileFiltersOpen ? 'translate-y-0' : 'translate-y-full',
          ].join(' ')}
        >
          <div className="p-5">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-forest/15" aria-hidden="true" />
            <div className="mt-4">
              <Filters compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


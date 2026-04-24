import ProductCard from './ProductCard.jsx'

function CardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-56 bg-forest/10" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded bg-forest/10" />
        <div className="h-4 w-full rounded bg-forest/10" />
        <div className="h-4 w-2/3 rounded bg-forest/10" />
        <div className="h-9 w-full rounded-full bg-forest/10" />
      </div>
    </div>
  )
}

export default function ProductGrid({ items, loading = false }) {
  if (loading) {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
      </div>
    )
  }

  if (!items?.length) {
    return (
      <div className="card p-10 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-forest/10 grid place-items-center">
          <span className="text-2xl" aria-hidden="true">
            🌿
          </span>
        </div>
        <h3 className="font-heading text-xl">No products found</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Try adjusting filters to rediscover your perfect blend.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}


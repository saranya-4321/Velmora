import { useMemo, useState } from 'react'
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [size, setSize] = useState(product?.sizes?.[0] ?? '10ml')

  const discountPct = useMemo(() => {
    const o = Number(product?.originalPrice || 0)
    const p = Number(product?.price || 0)
    if (!o || o <= p) return 0
    return Math.round(((o - p) / o) * 100)
  }, [product])

  if (!product) return null

  return (
    <div className="card overflow-hidden group hover:shadow-lift transition-shadow duration-200">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />
        </Link>

        {product.badge ? (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full bg-cream/90 px-3 py-1 text-xs font-bold text-forest ring-1 ring-forest/10 backdrop-blur">
              {product.badge}
            </span>
          </div>
        ) : null}

        {discountPct > 0 ? (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center rounded-full bg-gold px-3 py-1 text-xs font-bold text-charcoal shadow-soft">
              {discountPct}% OFF
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              to={`/product/${product.id}`}
              className="block font-heading text-lg leading-tight text-charcoal hover:text-forest transition-colors"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-charcoal/70">{product.tagline}</p>
          </div>

          <button
            type="button"
            aria-label="Add to wishlist"
            className="rounded-full p-2 hover:bg-forest/5 transition-colors"
            onClick={() => toast.success('Saved to wishlist')}
          >
            <HeartIcon className="h-5 w-5 text-charcoal/70" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-gold" />
            <span className="font-semibold text-charcoal">{product.rating}</span>
          </div>
          <span className="text-charcoal/60">({product.reviews} reviews)</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-charcoal">{formatINR(product.price)}</span>
            {product.originalPrice ? (
              <span className="text-sm text-charcoal/50 line-through">
                {formatINR(product.originalPrice)}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes?.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`Select size ${s}`}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ring-1',
                size === s
                  ? 'bg-forest text-cream ring-forest'
                  : 'bg-white/60 text-charcoal ring-forest/10 hover:ring-forest/25 hover:bg-forest/5',
              ].join(' ')}
              onClick={() => setSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            className="btn-primary w-full"
            onClick={() => {
              addToCart(product, size, 1)
              toast.success('Added to cart ✓')
            }}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}


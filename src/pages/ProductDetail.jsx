import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { getProductById, products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

const tabs = ['Description', 'Benefits', 'How to Use', 'Ingredients']

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [activeTab, setActiveTab] = useState('Description')
  const [size, setSize] = useState(product?.sizes?.[0] ?? '10ml')
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!product) return
    document.title = `${product.name} — Velmora Oils`
    const meta = document.querySelector('meta[name=\"description\"]')
    if (meta) meta.setAttribute('content', product.tagline)
  }, [product])

  useEffect(() => {
    setSize(product?.sizes?.[0] ?? '10ml')
    setQty(1)
    setActiveImage(0)
    setActiveTab('Description')
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const gallery = useMemo(() => {
    if (!product) return []
    return [
      product.image,
      `https://picsum.photos/400/400?random=${product.id + 100}`,
      `https://picsum.photos/400/400?random=${product.id + 200}`,
      `https://picsum.photos/400/400?random=${product.id + 300}`,
    ]
  }, [product])

  const discountPct = useMemo(() => {
    const o = Number(product?.originalPrice || 0)
    const p = Number(product?.price || 0)
    if (!o || o <= p) return 0
    return Math.round(((o - p) / o) * 100)
  }, [product])

  const related = useMemo(() => {
    if (!product) return []
    return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="container-page py-16">
        <div className="card p-10 text-center">
          <h1 className="font-heading text-3xl">Product not found</h1>
          <p className="mt-2 text-sm text-charcoal/70">
            The product you’re looking for doesn’t exist.
          </p>
          <Link to="/shop" className="btn-primary mt-6">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      <div className="text-sm text-charcoal/70">
        <Link to="/shop" className="hover:text-charcoal">
          Shop
        </Link>{' '}
        <span aria-hidden="true">/</span> <span className="text-charcoal">{product.name}</span>
      </div>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="card overflow-hidden">
            <img
              src={gallery[activeImage]}
              alt={`${product.name} image`}
              className="w-full h-[360px] sm:h-[480px] object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallery.map((src, idx) => (
              <button
                key={src}
                type="button"
                aria-label={`Select image ${idx + 1}`}
                onClick={() => setActiveImage(idx)}
                className={[
                  'rounded-2xl overflow-hidden ring-1 transition-all',
                  activeImage === idx ? 'ring-gold' : 'ring-forest/10 hover:ring-forest/25',
                ].join(' ')}
              >
                <img src={src} alt={`${product.name} thumbnail ${idx + 1}`} className="h-20 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-heading text-3xl sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm text-charcoal/70">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <StarIcon className="h-5 w-5 text-gold" />
            <span className="font-semibold">{product.rating}</span>
            <span className="text-charcoal/60">({product.reviews} reviews)</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-charcoal">{formatINR(product.price)}</span>
            {product.originalPrice ? (
              <span className="text-base text-charcoal/50 line-through">
                {formatINR(product.originalPrice)}
              </span>
            ) : null}
            {discountPct > 0 ? (
              <span className="ml-1 inline-flex items-center rounded-full bg-gold px-3 py-1 text-xs font-bold text-charcoal">
                Save {discountPct}%
              </span>
            ) : null}
          </div>

          <div className="mt-7">
            <p className="text-sm font-semibold text-charcoal">Select size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`Select size ${s}`}
                  onClick={() => setSize(s)}
                  className={[
                    'px-4 py-2 rounded-full text-sm font-semibold ring-1 transition-colors',
                    size === s
                      ? 'bg-forest text-cream ring-forest'
                      : 'bg-white/60 text-charcoal ring-forest/10 hover:ring-forest/25 hover:bg-forest/5',
                  ].join(' ')}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="h-11 w-11 rounded-full ring-1 ring-forest/10 hover:ring-forest/25 hover:bg-forest/5"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="h-11 w-11 rounded-full ring-1 ring-forest/10 hover:ring-forest/25 hover:bg-forest/5"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              className="btn-primary"
              aria-label="Add to cart"
              onClick={() => {
                addToCart(product, size, qty)
                toast.success('Added to cart ✓')
              }}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn-gold"
              aria-label="Buy now"
              onClick={() => {
                addToCart(product, size, qty)
                toast.success('Added to cart ✓')
                navigate('/checkout')
              }}
            >
              Buy Now
            </button>
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-label={`Open tab ${t}`}
                  className={[
                    'px-4 py-2 rounded-full text-sm font-semibold ring-1 transition-colors',
                    activeTab === t
                      ? 'bg-forest text-cream ring-forest'
                      : 'bg-white/60 text-charcoal ring-forest/10 hover:ring-forest/25 hover:bg-forest/5',
                  ].join(' ')}
                  onClick={() => setActiveTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="mt-4 card p-6">
              {activeTab === 'Description' ? (
                <p className="text-sm text-charcoal/75 leading-relaxed">{product.description}</p>
              ) : null}

              {activeTab === 'Benefits' ? (
                <ul className="list-disc pl-5 text-sm text-charcoal/75 space-y-1">
                  {product.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}

              {activeTab === 'How to Use' ? (
                <div className="text-sm text-charcoal/75 space-y-2">
                  <p>
                    Diffuse 3–6 drops in water. For topical use, dilute with a carrier oil. Patch
                    test before use.
                  </p>
                  <p>
                    Create rituals: morning citrus blends for uplift, floral evenings for calm, and
                    earthy notes for grounding.
                  </p>
                </div>
              ) : null}

              {activeTab === 'Ingredients' ? (
                <div className="text-sm text-charcoal/75 space-y-2">
                  <p>100% pure essential oil. No fillers. No synthetics. No parabens.</p>
                  <p>Stored in dark glass to preserve aromatic integrity.</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl">Related products</h2>
              <p className="mt-2 text-sm text-charcoal/70">
                More from the {product.category} collection.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}


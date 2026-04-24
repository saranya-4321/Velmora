import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="container-page mt-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl">Our Best Sellers</h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Loved for their purity, aroma, and everyday versatility.
          </p>
        </div>
        <Link to="/shop" className="btn-outline hidden sm:inline-flex" aria-label="View all products">
          View All
        </Link>
      </div>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-6 sm:hidden">
        <Link to="/shop" className="btn-outline w-full" aria-label="View all products">
          View All
        </Link>
      </div>
    </section>
  )
}


import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const spiceNames = ['Pepper', 'Cardamom', 'Cloves', 'Cinnamon', 'Cumin', 'Star Anise', 'Nutmeg', 'Turmeric', 'Coriander']

export default function SpicesLanding() {
  useEffect(() => {
    document.title = 'Premium Indian Spices | Organic Spices Online | Velmora'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Buy premium organic spices online in India. Pure Indian spices: pepper, cardamom, cloves, cinnamon, cumin, star anise, nutmeg, turmeric, coriander. Authentic flavor for modern kitchens.',
      )
  }, [])

  return (
    <div className="container-page py-10">
      <section className="card overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="inline-flex rounded-full bg-gold/30 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase">
              New Landing Page
            </p>
            <h1 className="mt-4 font-heading text-4xl sm:text-5xl leading-tight">Premium Organic Spices from India</h1>
            <p className="mt-4 text-charcoal/75 max-w-xl">
              Discover authentic Indian spices online. Our premium organic spices are carefully sourced and packed to deliver maximum flavor and aroma. From black pepper to cardamom, elevate your cooking with the finest quality spices from India's spice heritage.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {spiceNames.map((spice) => (
                <span key={spice} className="rounded-full bg-forest/10 px-3 py-1.5 text-sm font-semibold text-forest">
                  {spice}
                </span>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link to="/contact" className="btn-primary">Bulk Spice Orders</Link>
              <Link to="/shop" className="btn-outline">Shop Essential Oils</Link>
            </div>
          </div>
          <img src="/images/velmora-products.jpg" alt="Premium spices collection" className="h-full min-h-[320px] w-full object-cover" />
        </div>
      </section>
    </div>
  )
}

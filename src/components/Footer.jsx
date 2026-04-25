import { Link } from 'react-router-dom'
import { categories } from '../data/products.js'

const brand = {
  name: 'Velmora',
  logo: '/images/velmora-logo.svg',
  phone: '+91 99441 96216',
  email: 'velmoraoils@gmail.com',
  website: 'www.velmoraoilsandspices.com',
  gstin: '33DRYPK1687M1ZU',
  fssai: '12426997000230',
}

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-forest/10 bg-white/40 backdrop-blur">
      <div className="container-page py-12 grid gap-10 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-11 w-11 rounded-3xl bg-white/70 p-1 ring-1 ring-forest/10 shadow-soft"
            />
            <span className="leading-tight">
              <span className="block font-body text-[12px] tracking-[0.34em] uppercase text-charcoal/70">
                Premium Essential Oils
              </span>
              <span className="block font-heading text-3xl tracking-[0.08em] text-charcoal">
                {brand.name}
              </span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-charcoal/75 max-w-md">
            Premium essential oils and aromatherapy blends crafted for wellness, beauty, and
            balance — inspired by nature, perfected for everyday rituals.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { label: 'Instagram', href: '#' },
              { label: 'Facebook', href: '#' },
              { label: 'YouTube', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="rounded-full px-3 py-2 text-sm font-semibold text-charcoal/80 hover:text-charcoal hover:bg-forest/5 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-lg">About</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="text-charcoal/75">Therapeutic-grade</li>
            <li className="text-charcoal/75">Ethically sourced</li>
            <li className="text-charcoal/75">Designed for rituals</li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories
              .filter((c) => c !== 'All')
              .map((c) => (
                <li key={c}>
                  <Link className="text-charcoal/75 hover:text-charcoal" to={`/shop?category=${c}`}>
                    {c}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
            <li>
              <span className="font-semibold text-charcoal">Phone:</span> {brand.phone}
            </li>
            <li>
              <span className="font-semibold text-charcoal">Email:</span> {brand.email}
            </li>
            <li>
              <span className="font-semibold text-charcoal">Website:</span> {brand.website}
            </li>
            <li className="pt-2">
              <span className="font-semibold text-charcoal">GSTIN:</span> {brand.gstin}
            </li>
            <li>
              <span className="font-semibold text-charcoal">FSSAI:</span> {brand.fssai}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest/10">
        <div className="container-page py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-charcoal/70">
          <p>© 2025 Velmora Oils. All Rights Reserved.</p>
          <p>Crafted with care. Breathe deeper.</p>
        </div>
      </div>
    </footer>
  )
}


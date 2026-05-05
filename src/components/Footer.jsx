import { Link } from 'react-router-dom'

const brand = {
  name: 'Velmora',
  logo: '/images/velmora-logo.png',
  phone: '+91 99441 96216',
  email: 'velmoraoils@gmail.com',
  website: 'www.velmoraoilsandspices.com',
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
              className="h-12 w-12 rounded-2xl shadow-soft "
            />
            <span className="leading-tight">
              <span className="block font-body text-[12px] tracking-[0.34em] uppercase text-charcoal/70">
                Essential Oils and spices
              </span>
              <span className="block font-heading text-3xl tracking-[0.08em] text-charcoal">
                {brand.name}
              </span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-charcoal/75 max-w-md">
            Discover premium essential oils and exotic spices at Velmora. Our pure, therapeutic-grade essential oils are steam-distilled and chemical-free. We also offer handpicked natural spices — perfect for your kitchen and wellness needs. Shop online with fast delivery across India.
          </p>
          <div className="mt-5 flex items-center gap-4">
            <a href="https://www.instagram.com/velmora.oils.spices?igsh=cXN5NDZ5MjkzOWJ6&utm_source=qr" aria-label="Instagram">
              <img src="/images/instagram.png" alt="Instagram" className="h-7 w-7 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582187160767" aria-label="Facebook">
              <img src="/images/facebook.png" alt="Facebook" className="h-7 w-7 object-cover rounded-full opacity-70 hover:opacity-100 transition-opacity" />
            </a>
            <a href="https://www.linkedin.com/in/kamesh-raj-a238933b4?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="LinkedIn">
              <img src="/images/linkedin.png" alt="LinkedIn" className="h-7 w-7 opacity-70 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-heading text-lg">About</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="text-charcoal/75">Pure Essential Oils</li>
            <li className="text-charcoal/75">Therapeutic Grade</li>
            <li className="text-charcoal/75">Organic & Natural</li>
            <li className="text-charcoal/75">Aromatherapy Benefits</li>
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
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg">Categories</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/shop?category=Essential Oils">
                Essential Oils
              </Link>
            </li>
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/shop?category=Spices">
                Spices
              </Link>
            </li>
            <li>
              <Link className="text-charcoal/75 hover:text-charcoal" to="/shop?category=Gift Sets">
                Gift Sets
              </Link>
            </li>
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
          </ul>
        </div>
      </div>

      <div className="border-t border-forest/10">
        <div className="container-page py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-charcoal/70">
          <p>© 2026 Velmora Essential Oils and spices. All Rights Reserved. Designed by <span><a href="https://www.seyontech.in/" target="_blank" rel="noreferrer" className="text-blue-500 underline hover:text-charcoal transition-colors">Seyontech Digital media Solutions</a></span></p>
        </div>
      </div>
    </footer>
  )
}


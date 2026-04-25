import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext.jsx'

const brand = {
  name: 'Velmora',
  logo: '/images/velmora-logo.svg',
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { getCartCount, openCart } = useCart()
  const cartCount = getCartCount()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50',
          'transition-all duration-200',
          scrolled
            ? 'bg-cream/70 backdrop-blur border-b border-forest/10'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="container-page h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-full p-2 hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Bars3Icon className="h-6 w-6 text-charcoal" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-9 w-9 rounded-2xl bg-white/70 p-1 ring-1 ring-forest/10 shadow-soft"
              />
              <span className="leading-tight">
                <span className="block font-body text-[13px] tracking-[0.34em] uppercase text-charcoal/70">
                  Premium Essential Oils
                </span>
                <span className="block font-heading text-2xl tracking-[0.08em] text-charcoal">
                  {brand.name}
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                    isActive
                      ? 'bg-forest/10 text-forest'
                      : 'text-charcoal/80 hover:text-charcoal hover:bg-forest/5',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              onClick={() => navigate('/shop')}
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-charcoal" />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              onClick={() => navigate('/shop')}
            >
              <HeartIcon className="h-5 w-5 text-charcoal" />
            </button>
            <button
              type="button"
              aria-label="Open cart"
              className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
              onClick={openCart}
            >
              <ShoppingBagIcon className="h-5 w-5 text-charcoal" />
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-gold text-[11px] font-bold text-charcoal grid place-items-center">
                  {cartCount}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-[60] lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        <div
          className={[
            'absolute inset-0 bg-charcoal/30 transition-opacity',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={[
            'absolute left-0 top-0 h-full w-[86%] max-w-sm bg-cream',
            'shadow-2xl border-r border-forest/10',
            'transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          <div className="h-16 px-4 flex items-center justify-between border-b border-forest/10">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-9 w-9 rounded-2xl bg-white/70 p-1 ring-1 ring-forest/10 shadow-soft"
              />
              <span className="leading-tight">
                <span className="block font-body text-[12px] tracking-[0.32em] uppercase text-charcoal/70">
                  Premium Essential Oils
                </span>
                <span className="block font-heading text-xl tracking-[0.08em] text-charcoal">
                  {brand.name}
                </span>
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-forest/5"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 text-charcoal" />
            </button>
          </div>

          <nav className="p-4 flex flex-col gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  [
                    'px-4 py-3 rounded-2xl text-base font-semibold transition-colors',
                    isActive ? 'bg-forest/10 text-forest' : 'hover:bg-forest/5',
                  ].join(' ')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}


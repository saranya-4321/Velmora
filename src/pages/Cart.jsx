import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Cart from '../components/Cart.jsx'
import { useCart } from '../context/CartContext.jsx'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

export default function CartPage() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal } = useCart()
  const subtotal = getCartTotal()
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 59

  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    document.title = 'Cart — Velmora Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Review your Velmora cart and proceed to checkout.')
  }, [])

  const total = useMemo(() => Math.max(0, subtotal + shipping - discount), [subtotal, shipping, discount])

  return (
    <div className="container-page py-10">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl">Cart</h1>
          <p className="mt-2 text-sm text-charcoal/70">
            {cartItems.length ? 'Review your items and checkout when ready.' : 'Your ritual begins here.'}
          </p>
        </div>
        <Link to="/shop" className="btn-outline hidden sm:inline-flex" aria-label="Continue shopping">
          Continue Shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Cart />
          <div className="mt-6 sm:hidden">
            <Link to="/shop" className="btn-outline w-full" aria-label="Continue shopping">
              Continue Shopping
            </Link>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="card p-6">
            <h2 className="font-heading text-xl">Order Summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span className="font-semibold">{formatINR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal/70">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal/70">Discount</span>
                <span className="font-semibold">{discount ? `- ${formatINR(discount)}` : '—'}</span>
              </div>
              <div className="pt-3 border-t border-forest/10 flex items-center justify-between">
                <span className="text-charcoal/70">Total</span>
                <span className="text-lg font-bold text-charcoal">{formatINR(total)}</span>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-charcoal" htmlFor="coupon">
                Coupon code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="VELMORA10"
                  className="h-11 flex-1 rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                />
                <button
                  type="button"
                  className="btn-outline h-11 px-4"
                  aria-label="Apply coupon"
                  onClick={() => {
                    const code = coupon.trim().toUpperCase()
                    if (!code) return
                    if (code === 'VELMORA10' && subtotal > 0) {
                      const d = Math.round(subtotal * 0.1)
                      setDiscount(d)
                      toast.success('Coupon applied')
                    } else {
                      setDiscount(0)
                      toast.error('Invalid coupon')
                    }
                  }}
                >
                  Apply
                </button>
              </div>
              <p className="mt-2 text-xs text-charcoal/60">Try: VELMORA10</p>
            </div>

            <button
              type="button"
              className="btn-primary mt-6 w-full"
              aria-label="Proceed to checkout"
              disabled={!cartItems.length}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}


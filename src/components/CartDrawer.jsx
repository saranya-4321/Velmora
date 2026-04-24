import { Link, useNavigate } from 'react-router-dom'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext.jsx'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

export default function CartDrawer() {
  const navigate = useNavigate()
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, getCartTotal } =
    useCart()

  const subtotal = getCartTotal()
  const freeShipThreshold = 499
  const remaining = Math.max(0, freeShipThreshold - subtotal)
  const progress = Math.min(100, Math.round((subtotal / freeShipThreshold) * 100))

  return (
    <div
      className={[
        'fixed inset-0 z-[70]',
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
      aria-hidden={!isCartOpen}
    >
      <div
        className={[
          'absolute inset-0 bg-charcoal/35 transition-opacity duration-200',
          isCartOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={closeCart}
      />

      <aside
        className={[
          'absolute right-0 top-0 h-full w-full sm:w-[420px] bg-cream',
          'shadow-2xl border-l border-forest/10',
          'transition-transform duration-200',
          isCartOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-label="Cart drawer"
      >
        <div className="h-16 px-5 flex items-center justify-between border-b border-forest/10">
          <h2 className="font-heading text-xl">Your Cart</h2>
          <button
            type="button"
            aria-label="Close cart"
            className="rounded-full p-2 hover:bg-forest/5"
            onClick={closeCart}
          >
            <XMarkIcon className="h-6 w-6 text-charcoal" />
          </button>
        </div>

        <div className="p-5 border-b border-forest/10">
          <p className="text-sm text-charcoal/70">
            {remaining === 0 ? (
              <span className="font-semibold text-forest">You unlocked free shipping.</span>
            ) : (
              <>
                Add <span className="font-semibold text-charcoal">{formatINR(remaining)}</span>{' '}
                more for free shipping!
              </>
            )}
          </p>
          <div className="mt-3 h-2 rounded-full bg-forest/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sage to-gold" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="p-5 overflow-auto h-[calc(100%-16rem)]">
          {cartItems.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="text-3xl" aria-hidden="true">
                🧺
              </div>
              <p className="mt-3 font-heading text-xl">Your cart is empty</p>
              <p className="mt-2 text-sm text-charcoal/70">
                Add a few calming essentials to begin your ritual.
              </p>
              <button
                type="button"
                className="btn-primary mt-5 w-full"
                onClick={() => {
                  closeCart()
                  navigate('/shop')
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="card p-4 animate-slide-in-right"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-2xl object-cover ring-1 ring-forest/10"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-charcoal truncate">{item.name}</p>
                          <p className="text-xs text-charcoal/60 mt-0.5">Size: {item.size}</p>
                        </div>
                        <button
                          type="button"
                          aria-label="Remove item"
                          className="rounded-full p-2 hover:bg-forest/5"
                          onClick={() => removeFromCart(item.productId, item.size)}
                        >
                          <TrashIcon className="h-5 w-5 text-charcoal/70" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="h-9 w-9 rounded-full ring-1 ring-forest/10 hover:ring-forest/25 hover:bg-forest/5"
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="h-9 w-9 rounded-full ring-1 ring-forest/10 hover:ring-forest/25 hover:bg-forest/5"
                            onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold">{formatINR(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="absolute bottom-0 inset-x-0 border-t border-forest/10 bg-cream/90 backdrop-blur p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-charcoal/70">Subtotal</span>
            <span className="text-lg font-bold text-charcoal">{formatINR(subtotal)}</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" className="btn-outline" onClick={closeCart}>
              Continue Shopping
            </button>
            <Link
              to="/checkout"
              className="btn-primary"
              aria-label="Proceed to checkout"
              onClick={closeCart}
            >
              Checkout
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link
              to="/cart"
              className="text-sm font-semibold text-forest hover:text-forest/80"
              onClick={closeCart}
            >
              View full cart
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}


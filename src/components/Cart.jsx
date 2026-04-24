import { TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext.jsx'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const subtotal = getCartTotal()

  if (!cartItems.length) {
    return (
      <div className="card p-10 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-forest/10 grid place-items-center">
          <span className="text-2xl" aria-hidden="true">
            🧺
          </span>
        </div>
        <h3 className="font-heading text-xl">Your cart is empty</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          Browse our collection to begin your aromatherapy ritual.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={`${item.productId}-${item.size}`} className="card p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-2xl object-cover ring-1 ring-forest/10"
              />
              <div className="min-w-0">
                <p className="font-semibold text-charcoal truncate">{item.name}</p>
                <p className="text-sm text-charcoal/60 mt-0.5">Size: {item.size}</p>
                <p className="text-sm font-semibold mt-2">{formatINR(item.price)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="h-10 w-10 rounded-full ring-1 ring-forest/10 hover:ring-forest/25 hover:bg-forest/5"
                  onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="h-10 w-10 rounded-full ring-1 ring-forest/10 hover:ring-forest/25 hover:bg-forest/5"
                  onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="text-right min-w-[90px]">
                <p className="text-sm text-charcoal/60">Total</p>
                <p className="font-bold">{formatINR(item.price * item.quantity)}</p>
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
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between text-sm text-charcoal/70">
        <span>Subtotal</span>
        <span className="text-base font-bold text-charcoal">{formatINR(subtotal)}</span>
      </div>
    </div>
  )
}


import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext.jsx'
import { createRazorpayOrder, loadRazorpayCheckout, verifyRazorpayPayment } from '../lib/razorpay.js'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

const steps = ['Shipping Info', 'Payment Method', 'Review & Confirm']

function Stepper({ step }) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {steps.map((s, idx) => {
        const active = idx === step
        const done = idx < step
        return (
          <div key={s} className="flex items-center gap-2 sm:gap-3">
            <div
              className={[
                'h-9 w-9 rounded-full grid place-items-center text-sm font-bold ring-1',
                done ? 'bg-forest text-cream ring-forest' : '',
                active ? 'bg-gold text-charcoal ring-gold' : '',
                !done && !active ? 'bg-white/60 text-charcoal/70 ring-forest/10' : '',
              ].join(' ')}
              aria-label={`Step ${idx + 1}`}
            >
              {idx + 1}
            </div>
            <span className={active ? 'text-sm font-semibold text-charcoal' : 'hidden sm:inline text-sm text-charcoal/60'}>
              {s}
            </span>
            {idx < steps.length - 1 ? (
              <div className="hidden sm:block h-px w-10 bg-forest/15" aria-hidden="true" />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const subtotal = getCartTotal()
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 59
  const total = subtotal + shipping

  const [step, setStep] = useState(0)
  const [paidBy, setPaidBy] = useState('Razorpay (UPI / Card / Wallet)')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNo, setOrderNo] = useState('')
  const [paying, setPaying] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const canProceed = useMemo(() => {
    if (cartItems.length === 0) return false
    if (step === 0) {
      const v = shippingInfo
      return Boolean(
        v.name.trim() &&
          v.email.trim() &&
          v.phone.trim() &&
          v.address.trim() &&
          v.city.trim() &&
          v.state.trim() &&
          v.pincode.trim(),
      )
    }
    if (step === 1) return Boolean(paidBy)
    return true
  }, [cartItems.length, step, shippingInfo, paidBy])

  async function payWithRazorpay() {
    if (paying) return
    if (!canProceed) return toast.error('Please complete the required details')

    setPaying(true)
    try {
      const ok = await loadRazorpayCheckout()
      if (!ok) throw new Error('Unable to load Razorpay Checkout')

      const receipt = `VO-${Math.floor(100000 + Math.random() * 900000)}`

      const { keyId, order } = await createRazorpayOrder({
        amountInr: Number(total),
        receipt,
        notes: {
          name: shippingInfo.name,
          phone: shippingInfo.phone,
          city: shippingInfo.city,
        },
      })

      const options = {
        key: keyId,
        name: 'Velmora Oils',
        description: 'Premium Essential Oils',
        image: '/images/velmora-logo.png',
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        prefill: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
        theme: { color: '#0b2b24' },
        handler: async function (response) {
          try {
            const verified = await verifyRazorpayPayment(response)
            if (!verified?.ok) throw new Error('Payment verification failed')
            setOrderNo(receipt)
            setOrderPlaced(true)
            clearCart()
            toast.success('Payment successful — order confirmed')
          } catch (e) {
            toast.error(e?.message || 'Payment verification failed')
          } finally {
            setPaying(false)
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      }

      const rz = new window.Razorpay(options)
      rz.on('payment.failed', (err) => {
        toast.error(err?.error?.description || 'Payment failed')
        setPaying(false)
      })
      rz.open()
    } catch (e) {
      setPaying(false)
      toast.error(e?.message || 'Unable to start payment')
    }
  }

  useEffect(() => {
    document.title = 'Checkout — Velmora Oils'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', 'Secure checkout for your Velmora Oils order.')
  }, [])

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) navigate('/cart')
  }, [cartItems.length, navigate, orderPlaced])

  if (orderPlaced) {
    return (
      <div className="container-page py-16">
        <div className="card p-10 text-center max-w-2xl mx-auto">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-forest/10 grid place-items-center">
            <span className="text-2xl" aria-hidden="true">
              ✅
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl">Order Confirmed</h1>
          <p className="mt-3 text-sm text-charcoal/70">
            Thank you for choosing Velmora. Your order number is{' '}
            <span className="font-bold text-charcoal">{orderNo}</span>.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-outline">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl">Checkout</h1>
          <p className="mt-2 text-sm text-charcoal/70">Complete your purchase in a few steps.</p>
        </div>
        <Stepper step={step} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="card p-6 sm:p-8">
          {step === 0 ? (
            <div>
              <h2 className="font-heading text-2xl">Shipping Info</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['name', 'Full Name'],
                  ['email', 'Email'],
                  ['phone', 'Phone'],
                  ['pincode', 'Pincode'],
                  ['city', 'City'],
                  ['state', 'State'],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="text-sm font-semibold" htmlFor={key}>
                      {label}
                    </label>
                    <input
                      id={key}
                      value={shippingInfo[key]}
                      onChange={(e) => setShippingInfo((p) => ({ ...p, [key]: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold" htmlFor="address">
                    Address
                  </label>
                  <input
                    id="address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo((p) => ({ ...p, address: e.target.value }))}
                    className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div>
              <h2 className="font-heading text-2xl">Payment Method</h2>
              <div className="mt-6 grid gap-3">
                {['Razorpay (UPI / Card / Wallet)', 'Cash on Delivery'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-label={`Select ${m}`}
                    onClick={() => setPaidBy(m)}
                    className={[
                      'rounded-2xl p-4 text-left ring-1 transition-colors',
                      paidBy === m
                        ? 'bg-forest text-cream ring-forest'
                        : 'bg-white/60 ring-forest/10 hover:bg-forest/5 hover:ring-forest/25',
                    ].join(' ')}
                  >
                    <p className="font-semibold">{m}</p>
                    <p className={paidBy === m ? 'text-sm text-cream/85' : 'text-sm text-charcoal/70'}>
                      {m.startsWith('Razorpay')
                        ? 'Pay securely via Razorpay (UPI, Card, Wallets, NetBanking).'
                        : 'Pay when your order arrives.'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h2 className="font-heading text-2xl">Review & Confirm</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="card p-5 bg-white/40">
                  <p className="text-sm font-semibold">Shipping</p>
                  <p className="mt-2 text-sm text-charcoal/70">
                    {shippingInfo.name}
                    <br />
                    {shippingInfo.address}, {shippingInfo.city}
                    <br />
                    {shippingInfo.state} — {shippingInfo.pincode}
                    <br />
                    {shippingInfo.phone}
                  </p>
                </div>
                <div className="card p-5 bg-white/40">
                  <p className="text-sm font-semibold">Payment</p>
                  <p className="mt-2 text-sm text-charcoal/70">{paidBy}</p>
                </div>
              </div>
              <p className="mt-5 text-sm text-charcoal/70">
                By placing your order, you agree to our terms and confirm all details are correct.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
            <button
              type="button"
              className="btn-outline"
              aria-label="Go back"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              Back
            </button>

            {step < 2 ? (
              <button
                type="button"
                className="btn-primary"
                aria-label="Continue to next step"
                onClick={() => {
                  if (!canProceed) return toast.error('Please complete the required details')
                  setStep((s) => Math.min(2, s + 1))
                }}
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                aria-label="Place order"
                onClick={() => {
                  if (!canProceed) return toast.error('Please complete the required details')
                  if (paidBy.startsWith('Razorpay')) return payWithRazorpay()
                  const no = `VO-${Math.floor(100000 + Math.random() * 900000)}`
                  setOrderNo(no)
                  setOrderPlaced(true)
                  clearCart()
                  toast.success('Order placed successfully')
                }}
                disabled={paying}
              >
                {paidBy.startsWith('Razorpay') ? (paying ? 'Opening Razorpay…' : `Pay ${formatINR(total)}`) : 'Place Order'}
              </button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="card p-6">
            <h3 className="font-heading text-xl">Order Summary</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span className="font-semibold">{formatINR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-charcoal/70">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="pt-3 border-t border-forest/10 flex items-center justify-between">
                <span className="text-charcoal/70">Total</span>
                <span className="text-lg font-bold text-charcoal">{formatINR(total)}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-forest/10 pt-5 space-y-3">
              {cartItems.map((i) => (
                <div key={`${i.productId}-${i.size}`} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="h-12 w-12 rounded-2xl object-cover ring-1 ring-forest/10" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-charcoal truncate">{i.name}</p>
                    <p className="text-xs text-charcoal/60">
                      {i.size} • Qty {i.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-bold">{formatINR(i.price * i.quantity)}</p>
                </div>
              ))}
            </div>

            <Link to="/cart" className="btn-outline mt-6 w-full" aria-label="Back to cart">
              Back to Cart
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}


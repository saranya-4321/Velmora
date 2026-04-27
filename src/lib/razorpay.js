export function loadRazorpayCheckout() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if (window.Razorpay) return resolve(true)

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export async function createRazorpayOrder({ amountInr, receipt, notes }) {
  const res = await fetch('/.netlify/functions/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amountInr,
      currency: 'INR',
      receipt,
      notes,
    }),
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(msg || 'Failed to create order')
  }

  return res.json()
}

export async function verifyRazorpayPayment(payload) {
  const res = await fetch('/.netlify/functions/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const msg = await res.text().catch(() => '')
    throw new Error(msg || 'Payment verification failed')
  }

  return res.json()
}


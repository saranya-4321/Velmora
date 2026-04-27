import crypto from 'crypto'

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  body: JSON.stringify(body),
})

function safeEqual(a, b) {
  const ba = Buffer.from(String(a || ''))
  const bb = Buffer.from(String(b || ''))
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keySecret) return json(500, { error: 'Razorpay secret is not configured on the server' })

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const orderId = payload.razorpay_order_id
  const paymentId = payload.razorpay_payment_id
  const signature = payload.razorpay_signature

  if (!orderId || !paymentId || !signature) return json(400, { error: 'Missing payment fields' })

  const expected = crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex')
  const ok = safeEqual(expected, signature)

  if (!ok) return json(400, { ok: false, error: 'Invalid signature' })
  return json(200, { ok: true })
}


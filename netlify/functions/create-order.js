const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
  body: JSON.stringify(body),
})

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

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return json(500, { error: 'Razorpay keys are not configured on the server' })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const amountInr = Number(payload.amountInr)
  const currency = String(payload.currency || 'INR').toUpperCase()
  const receipt = String(payload.receipt || '')
  const notes = payload.notes && typeof payload.notes === 'object' ? payload.notes : undefined

  if (!Number.isFinite(amountInr) || amountInr <= 0) return json(400, { error: 'Invalid amountInr' })
  if (currency !== 'INR') return json(400, { error: 'Only INR is supported' })

  const amount = Math.round(amountInr * 100) // paise
  if (amount < 100) return json(400, { error: 'Amount too small' })

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

  const resp = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      currency,
      receipt: receipt || undefined,
      notes,
    }),
  })

  const data = await resp.json().catch(() => null)
  if (!resp.ok) {
    return json(resp.status, {
      error: 'Failed to create Razorpay order',
      details: data,
    })
  }

  return json(200, {
    keyId,
    order: data,
  })
}


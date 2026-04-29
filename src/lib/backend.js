export async function submitOrder(orderPayload) {
  const res = await fetch('/.netlify/functions/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to save order')
  }

  return res.json()
}

export async function fetchOrders(adminToken = '') {
  const headers = {}
  if (adminToken) headers['x-admin-token'] = adminToken

  const res = await fetch('/.netlify/functions/orders', {
    method: 'GET',
    headers,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to fetch orders')
  }

  return res.json()
}

export async function adminLogin({ email, password }) {
  const res = await fetch('/.netlify/functions/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to login as admin')
  }

  return res.json()
}

export async function submitEnquiry(payload) {
  const res = await fetch('/.netlify/functions/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to submit enquiry')
  }

  return res.json()
}

export async function sendEmailOtp(email) {
  const res = await fetch('/.netlify/functions/send-email-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to send OTP')
  }
  return res.json()
}

export async function verifyEmailOtp({ email, code }) {
  const res = await fetch('/.netlify/functions/verify-email-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || 'Failed to verify OTP')
  }
  return res.json()
}

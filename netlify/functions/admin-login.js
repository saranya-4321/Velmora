const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  },
  body: JSON.stringify(body),
})

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  const adminEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const adminPassword = String(process.env.ADMIN_PASSWORD || '')
  const adminToken = String(process.env.ADMIN_DASHBOARD_TOKEN || '')

  if (!adminEmail || !adminPassword || !adminToken) {
    return json(500, {
      error: 'Missing ADMIN_EMAIL, ADMIN_PASSWORD or ADMIN_DASHBOARD_TOKEN in environment',
    })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const email = String(payload.email || '').trim().toLowerCase()
  const password = String(payload.password || '')

  if (email !== adminEmail || password !== adminPassword) {
    return json(401, { error: 'Invalid admin credentials' })
  }

  return json(200, {
    ok: true,
    email: adminEmail,
    adminToken,
  })
}

import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.netlify', 'data')
const OTP_FILE = path.join(DATA_DIR, 'email-otp.json')

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

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(OTP_FILE)
  } catch {
    await fs.writeFile(OTP_FILE, '{}', 'utf8')
  }
}

async function readStore() {
  await ensureStore()
  const raw = await fs.readFile(OTP_FILE, 'utf8')
  return JSON.parse(raw || '{}')
}

async function writeStore(store) {
  await ensureStore()
  await fs.writeFile(OTP_FILE, JSON.stringify(store, null, 2), 'utf8')
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.OTP_FROM_EMAIL
  if (!resendApiKey || !fromEmail) {
    return json(500, { error: 'Missing RESEND_API_KEY or OTP_FROM_EMAIL in environment' })
  }

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const email = String(payload.email || '').trim().toLowerCase()
  if (!/\S+@\S+\.\S+/.test(email)) return json(400, { error: 'Invalid email' })

  const code = String(Math.floor(100000 + Math.random() * 900000))
  const expiresAt = Date.now() + 10 * 60 * 1000

  const store = await readStore()
  store[email] = { code, expiresAt }
  await writeStore(store)

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [email],
      subject: 'Your Velmora login OTP',
      html: `<p>Your OTP code is <strong>${code}</strong>.</p><p>This code expires in 10 minutes.</p>`,
    }),
  })

  if (!resp.ok) {
    const details = await resp.text().catch(() => '')
    return json(resp.status, { error: 'Failed to send OTP email', details })
  }

  return json(200, { ok: true, message: 'OTP sent successfully' })
}

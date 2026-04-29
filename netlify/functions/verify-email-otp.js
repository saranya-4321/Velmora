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

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  const email = String(payload.email || '').trim().toLowerCase()
  const code = String(payload.code || '').trim()

  if (!/\S+@\S+\.\S+/.test(email) || !code) return json(400, { error: 'Email and code are required' })

  const store = await readStore()
  const record = store[email]
  if (!record) return json(400, { ok: false, error: 'No OTP found for this email' })

  if (Date.now() > Number(record.expiresAt || 0)) {
    delete store[email]
    await writeStore(store)
    return json(400, { ok: false, error: 'OTP has expired' })
  }

  if (String(record.code) !== code) return json(400, { ok: false, error: 'Invalid OTP' })

  delete store[email]
  await writeStore(store)
  return json(200, { ok: true })
}

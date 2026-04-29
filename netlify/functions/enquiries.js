import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.netlify', 'data')
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json')

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
    await fs.access(ENQUIRIES_FILE)
  } catch {
    await fs.writeFile(ENQUIRIES_FILE, '[]', 'utf8')
  }
}

async function readEnquiries() {
  await ensureStore()
  const raw = await fs.readFile(ENQUIRIES_FILE, 'utf8')
  return JSON.parse(raw || '[]')
}

async function writeEnquiries(items) {
  await ensureStore()
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(items, null, 2), 'utf8')
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

  const name = String(payload.name || '').trim()
  const phone = String(payload.phone || '').trim()
  const message = String(payload.message || '').trim()
  const email = String(payload.email || '').trim()

  if (!name || !phone || !message) return json(400, { error: 'Name, phone, and message are required' })

  const enquiries = await readEnquiries()
  const next = {
    id: `enq_${Date.now()}`,
    name,
    phone,
    email,
    message,
    createdAt: new Date().toISOString(),
  }
  enquiries.push(next)
  await writeEnquiries(enquiries)
  return json(200, { ok: true, enquiry: next })
}

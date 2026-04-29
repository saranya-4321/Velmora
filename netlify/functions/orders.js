import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.netlify', 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-token',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  },
  body: JSON.stringify(body),
})

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(ORDERS_FILE)
  } catch {
    await fs.writeFile(ORDERS_FILE, '[]', 'utf8')
  }
}

async function readOrders() {
  await ensureStore()
  const raw = await fs.readFile(ORDERS_FILE, 'utf8')
  return JSON.parse(raw || '[]')
}

async function writeOrders(orders) {
  await ensureStore()
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8')
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return json(204, {})

  if (event.httpMethod === 'GET') {
    const requiredToken = process.env.ADMIN_DASHBOARD_TOKEN
    const providedToken = event.headers?.['x-admin-token'] || event.headers?.['X-Admin-Token']
    if (requiredToken && providedToken !== requiredToken) {
      return json(401, { error: 'Unauthorized' })
    }
    const orders = await readOrders()
    const sorted = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return json(200, { orders: sorted })
  }

  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' })

  let payload
  try {
    payload = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Invalid JSON body' })
  }

  if (!payload.orderNo || !payload.shippingInfo || !Array.isArray(payload.items)) {
    return json(400, { error: 'Missing required order fields' })
  }

  const orders = await readOrders()
  const nextOrder = {
    id: `ord_${Date.now()}`,
    orderNo: String(payload.orderNo),
    paymentMethod: String(payload.paymentMethod || 'Unknown'),
    paymentStatus: String(payload.paymentStatus || 'pending'),
    total: Number(payload.total || 0),
    shipping: Number(payload.shipping || 0),
    subtotal: Number(payload.subtotal || 0),
    items: payload.items,
    shippingInfo: payload.shippingInfo,
    createdAt: new Date().toISOString(),
  }

  orders.push(nextOrder)
  await writeOrders(orders)
  return json(200, { ok: true, order: nextOrder })
}

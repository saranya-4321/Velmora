import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchOrders } from '../lib/backend.js'
import { useAuth } from '../context/AuthContext.jsx'

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

export default function AdminDashboard() {
  const { email, adminToken, logout } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadOrders() {
    if (loading) return
    setLoading(true)
    try {
      const data = await fetchOrders(adminToken)
      setOrders(data.orders || [])
    } catch (error) {
      toast.error(error?.message || 'Unable to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function initialLoad() {
      setLoading(true)
      try {
        const data = await fetchOrders(adminToken)
        setOrders(data.orders || [])
      } catch (error) {
        toast.error(error?.message || 'Unable to fetch orders')
      } finally {
        setLoading(false)
      }
    }

    initialLoad()
  }, [adminToken])

  return (
    <div className="container-page py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-charcoal/70">View customer orders collected from checkout.</p>
          <p className="mt-1 text-xs text-charcoal/60">Signed in as {email}</p>
        </div>
        <button type="button" className="btn-outline w-full sm:w-auto" onClick={logout}>
          Logout Admin
        </button>
      </div>

      <div className="mt-6 card p-5">
        <p className="text-sm text-charcoal/70">
          This dashboard is available at <span className="font-semibold text-charcoal">/admin</span> after admin login.
        </p>
        <button type="button" className="btn-primary mt-4" onClick={loadOrders} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Orders'}
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {orders.length === 0 ? (
          <div className="card p-8 text-sm text-charcoal/70">No orders yet. Place a test order to see data here.</div>
        ) : (
          <div className="card overflow-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-forest text-cream">
                <tr>
                  {['Order No', 'Date', 'Customer', 'Email', 'Phone', 'Address', 'Payment', 'Status', 'Items', 'Total'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-forest/10 align-top">
                    <td className="px-4 py-3 font-semibold">{order.orderNo}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{order.shippingInfo?.name}</td>
                    <td className="px-4 py-3">{order.shippingInfo?.email}</td>
                    <td className="px-4 py-3">{order.shippingInfo?.phone}</td>
                    <td className="px-4 py-3 min-w-[220px]">
                      {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.state} -{' '}
                      {order.shippingInfo?.pincode}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.paymentMethod}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{order.paymentStatus}</td>
                    <td className="px-4 py-3 min-w-[240px]">
                      {order.items?.map((item) => (
                        <div key={`${item.productId}-${item.size}`}>
                          {item.name} ({item.size}) x {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">{formatINR(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

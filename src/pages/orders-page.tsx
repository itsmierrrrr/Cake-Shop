import { useEffect, useState } from 'react'
import { PageTransition } from '@/components/common/page-transition'
import { useAuth } from '@/hooks/use-auth'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { formatCurrency } from '@/utils/currency'
import type { Order as OrderType } from '@/types/order'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export function OrdersPage() {
  useDocumentTitle('Your Orders')

  const { isAuthenticated, token } = useAuth()
  const [orders, setOrders] = useState<OrderType[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !token) return

    setLoading(true)
    void (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          setOrders([])
          return
        }

        const data = await res.json()
        setOrders(data.orders || [])
      } catch {
        setOrders([])
      } finally {
        setLoading(false)
      }
    })()
  }, [isAuthenticated, token])

  return (
    <PageTransition>
      <section className="space-y-4">
        <h1 className="section-title">Your Orders</h1>
        <p className="section-copy">A history of your past orders.</p>
      </section>

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="glass-card p-6">Loading…</div>
        ) : orders && orders.length > 0 ? (
          orders.map((o) => (
            <div key={o._id} className="glass-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm text-truffle/80 dark:text-[#f6dfd0]/80">{new Date(o.createdAt).toLocaleString()}</div>
                <div className="font-medium text-cocoa dark:text-[#f2cdb8]">{formatCurrency(o.total)}</div>
              </div>
              <div className="text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
                {o.items.map((it) => (
                  <div key={it.cakeId} className="flex items-center justify-between">
                    <div>
                      {it.quantity} x {it.name}
                    </div>
                    <div>{formatCurrency(it.price * it.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-6">You have no past orders.</div>
        )}
      </div>
    </PageTransition>
  )
}

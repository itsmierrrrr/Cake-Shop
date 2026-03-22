import { Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageTransition } from '@/components/common/page-transition'
import { QuantityStepper } from '@/components/common/quantity-stepper'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { formatCurrency } from '@/utils/currency'

export function CartPage() {
  useDocumentTitle('Cart')

  const { isAuthenticated } = useAuth()
  const { items, setQuantity, removeItem, subtotal } = useCart()

  return (
    <PageTransition>
      <section className="space-y-2">
        <h1 className="section-title">Your Cart</h1>
        <p className="section-copy">Review your selected cakes and adjust quantities.</p>
      </section>

      {items.length === 0 ? (
        <section className="glass-card space-y-4 p-8 text-center">
          <p className="text-sm text-truffle/80 dark:text-[#f6dfd0]/80">Your cart is empty.</p>
          <Button asChild>
            <Link to="/shop">Explore Cakes</Link>
          </Button>
        </section>
      ) : (
        <section className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.cake.id} className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <img
                  src={item.cake.images[0]}
                  alt={item.cake.name}
                  loading="lazy"
                  className="h-24 w-full rounded-2xl object-cover sm:w-28"
                />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-truffle dark:text-[#f6dfd0]">{item.cake.name}</p>
                  <p className="text-xs text-truffle/70 dark:text-[#f6dfd0]/70">{formatCurrency(item.cake.price)} each</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <QuantityStepper value={item.quantity} onChange={(value) => setQuantity(item.cake.id, value)} />
                  <button
                    type="button"
                    onClick={() => removeItem(item.cake.id)}
                    className="rounded-full p-2 text-truffle/70 transition hover:bg-white/70 hover:text-truffle dark:text-[#f6dfd0]/70 dark:hover:bg-white/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="glass-card h-fit space-y-4 p-5">
            <h2 className="text-2xl font-semibold text-truffle dark:text-[#f6dfd0]">Order Summary</h2>
            <div className="flex items-center justify-between text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
              <span>Delivery</span>
              <span>{formatCurrency(subtotal > 80 ? 0 : 7)}</span>
            </div>
            <div className="border-t border-rose/30 pt-3 text-base font-semibold text-cocoa dark:border-white/20 dark:text-[#f2cdb8]">
              Total: {formatCurrency(subtotal + (subtotal > 80 ? 0 : 7))}
            </div>
            <Button asChild className="w-full">
              <Link to={isAuthenticated ? '/checkout' : '/signin'} state={{ from: { pathname: '/checkout' } }}>
                {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              </Link>
            </Button>
          </aside>
        </section>
      )}
    </PageTransition>
  )
}


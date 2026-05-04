import { useState } from 'react'
import { Landmark, QrCode } from 'lucide-react' //add "CreditCard" if you want to re-enable card payment option
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { PageTransition } from '@/components/common/page-transition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { formatCurrency } from '@/utils/currency'
import upiRandomQr from '@/assets/Googlepay qr.jpeg'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export function CheckoutPage() {
  useDocumentTitle('Checkout')

  const navigate = useNavigate()
  const { isAuthenticated, user, token } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const [payment, setPayment] = useState<'bank' | 'upi' | null>(null)

  const shipping = subtotal > 80 ? 0 : 7
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <PageTransition>
        <section className="glass-card space-y-4 p-8 text-center">
          <h1 className="section-title">No items to checkout</h1>
          <p className="section-copy">Please add cakes to your cart before checkout.</p>
          <Button asChild>
            <Link to="/shop">Go to Shop</Link>
          </Button>
        </section>
      </PageTransition>
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isAuthenticated) {
      toast.error('Please sign in before placing an order.')
      navigate('/signin', { state: { from: { pathname: '/checkout' } } })
      return
    }

    if (!payment) {
      toast.error('Please select at least one payment mode.')
      return
    }

    const payload = {
      items: items.map((it) => ({ cakeId: it.cake.id, name: it.cake.name, price: it.cake.price, quantity: it.quantity })),
      subtotal,
      shipping,
      paymentMethod: payment,
    }

    void (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          toast.error('Failed to place order. Please try again.')
          return
        }

        toast.success('Order placed successfully. Fresh sweetness is on its way!')
        clearCart()
        navigate('/orders')
      } catch (err) {
        toast.error('Failed to place order. Please try again.')
      }
    })()
  }

  return (
    <PageTransition>
      <section className="space-y-2">
        <h1 className="section-title">Checkout</h1>
        <p className="section-copy">Complete your details and confirm your order.</p>
        {user ? <p className="text-sm text-truffle/70 dark:text-[#f6dfd0]/70">Signed in as {user.name}</p> : null}
      </section>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass-card space-y-4 p-6">
          <h2 className="text-2xl font-semibold text-truffle dark:text-[#f6dfd0]">Customer Details</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input required placeholder="First name" />
            <Input required placeholder="Last name" />
          </div>
          <Input required type="email" placeholder="Email address" />
          <Input required placeholder="Phone number" />
          <Textarea required placeholder="Delivery address" />

          <div className="space-y-2 rounded-2xl border border-rose/30 bg-white/70 p-4 dark:border-white/20 dark:bg-[#3a2f2a]/60">
            <p className="text-sm font-medium text-truffle dark:text-[#f6dfd0]">Payment Method</p>
            {/*<label className="flex items-center gap-2 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
              <input
                type="radio"
                name="payment"
                checked={payment === 'card'}
                onChange={() => setPayment('card')}
              />
              <CreditCard size={14} />
              Credit / Debit Card
            </label>*/}
            <label className="flex items-center gap-2 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
              <input
                type="radio"
                name="payment"
                required
                checked={payment === 'bank'}
                onChange={() => setPayment('bank')}
              />
              <Landmark size={14} />
              Bank Transfer
            </label>
            <label className="flex items-center gap-2 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
              <input
                type="radio"
                name="payment"
                required
                checked={payment === 'upi'}
                onChange={() => setPayment('upi')}
              />
              <QrCode size={14} />
              UPI / QR Payment
            </label>

            {payment === 'upi' ? (
              <div className="mt-3 rounded-2xl border border-rose/30 bg-white/80 p-3 text-center dark:border-white/20 dark:bg-[#3a2f2a]/70">
                <img
                  src={upiRandomQr}
                  alt="UPI QR code"
                  className="mx-auto h-40 w-40 rounded-lg border border-rose/30 bg-white p-1"
                />
                <p className="mt-2 text-sm font-medium text-truffle dark:text-[#f6dfd0]">Scan to pay with any UPI app</p>
                <p className="text-xs text-truffle/70 dark:text-[#f6dfd0]/70">Please note: this is not an actual shopping website.
The UPI QR is only for demonstration purposes. You can pay tho lol.</p>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="glass-card h-fit space-y-4 p-5">
          <h2 className="text-2xl font-semibold text-truffle dark:text-[#f6dfd0]">Summary</h2>
          {items.map((item) => (
            <div key={item.cake.id} className="flex items-center justify-between text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
              <span>
                {item.quantity} x {item.cake.name}
              </span>
              <span>{formatCurrency(item.quantity * item.cake.price)}</span>
            </div>
          ))}
          <div className="border-t border-rose/30 pt-3 text-sm dark:border-white/20">
            <div className="mb-1 flex items-center justify-between text-truffle/80 dark:text-[#f6dfd0]/80">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="mb-1 flex items-center justify-between text-truffle/80 dark:text-[#f6dfd0]/80">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-cocoa dark:text-[#f2cdb8]">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <Button className="w-full" type="submit">
            Place Order
          </Button>
        </aside>
      </form>
    </PageTransition>
  )
}


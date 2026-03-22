import { useEffect, useMemo, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { PageTransition } from '@/components/common/page-transition'
import { QuantityStepper } from '@/components/common/quantity-stepper'
import { RatingStars } from '@/components/common/rating-stars'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cakes, reviewsByCakeId } from '@/data/cakes'
import { useCart } from '@/hooks/use-cart'
import { useDocumentTitle } from '@/hooks/use-document-title'
import { formatCurrency } from '@/utils/currency'

export function ProductDetailsPage() {
  const { cakeId } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const cake = useMemo(() => cakes.find((item) => item.id === cakeId || item.slug === cakeId), [cakeId])
  const { addToCart } = useCart()

  useDocumentTitle(cake ? cake.name : 'Product Not Found')

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), 400)
    return () => window.clearTimeout(timer)
  }, [cakeId])

  if (isLoading) {
    return (
      <PageTransition>
        <div className="grid gap-8 lg:grid-cols-2">
          <Skeleton className="h-[420px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-36 w-full" />
          </div>
        </div>
      </PageTransition>
    )
  }

  if (!cake) {
    return (
      <PageTransition>
        <section className="glass-card space-y-4 p-8 text-center">
          <h1 className="section-title">Cake Not Found</h1>
          <p className="section-copy">The product may have moved or is no longer available.</p>
          <Button asChild>
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </section>
      </PageTransition>
    )
  }

  const reviews = reviewsByCakeId[cake.id] ?? []

  return (
    <PageTransition>
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="img-zoom">
            <img
              src={cake.images[selectedImage]}
              alt={cake.name}
              className="h-[420px] w-full rounded-3xl object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {cake.images.map((image, idx) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className="overflow-hidden rounded-2xl border border-transparent transition hover:border-rose/40"
              >
                <img src={image} alt={`${cake.name} preview ${idx + 1}`} loading="lazy" className="h-24 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <article className="glass-card space-y-6 p-6">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-3xl font-semibold text-truffle dark:text-[#f6dfd0]">{cake.name}</h1>
            <Badge>{cake.category}</Badge>
          </div>

          <RatingStars rating={cake.rating} />
          <p className="text-sm text-truffle/75 dark:text-[#f6dfd0]/75">{cake.description}</p>

          <ul className="grid grid-cols-2 gap-2 rounded-2xl bg-white/70 p-4 text-sm dark:bg-[#3a2f2a]/60">
            {cake.ingredients.map((ingredient) => (
              <li key={ingredient} className="text-truffle/80 dark:text-[#f6dfd0]/80">
                • {ingredient}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-2xl font-semibold text-cocoa dark:text-[#f2cdb8]">{formatCurrency(cake.price)}</p>
            <QuantityStepper value={quantity} onChange={setQuantity} />
          </div>

          <Button
            className="w-full"
            onClick={() => {
              addToCart(cake, quantity)
              toast.success(`${quantity} x ${cake.name} added to cart.`)
            }}
          >
            <ShoppingCart size={14} className="mr-2" />
            Add to Cart
          </Button>
        </article>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="section-copy">No reviews yet. Be the first to leave feedback.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="glass-card space-y-2 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-truffle dark:text-[#f6dfd0]">{review.name}</p>
                  <RatingStars rating={review.rating} />
                </div>
                <p className="text-sm text-truffle/75 dark:text-[#f6dfd0]/75">{review.comment}</p>
                <p className="text-xs text-truffle/60 dark:text-[#f6dfd0]/60">{review.date}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  )
}


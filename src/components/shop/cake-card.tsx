import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { RatingStars } from '@/components/common/rating-stars'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import type { Cake } from '@/types/cake'
import { formatCurrency } from '@/utils/currency'

type CakeCardProps = {
  cake: Cake
}

export function CakeCard({ cake }: CakeCardProps) {
  const { addToCart } = useCart()

  const handleAdd = () => {
    addToCart(cake, 1)
    toast.success(`${cake.name} added to cart.`)
  }

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden p-0">
        <Link to={`/shop/${cake.id}`} className="img-zoom block">
          <img
            src={cake.images[0]}
            alt={cake.name}
            loading="lazy"
            className="h-56 w-full object-cover"
          />
        </Link>
        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-truffle dark:text-[#f6dfd0]">{cake.name}</p>
              <p className="text-xs text-truffle/70 dark:text-[#f6dfd0]/70">{cake.shortDescription}</p>
            </div>
            <Badge>{cake.category}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <RatingStars rating={cake.rating} />
            <p className="font-semibold text-cocoa dark:text-[#f2cdb8]">{formatCurrency(cake.price)}</p>
          </div>

          <Button onClick={handleAdd} className="w-full">
            <ShoppingCart size={14} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}


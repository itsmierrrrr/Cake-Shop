import { Star } from 'lucide-react'

export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= Math.round(rating) ? 'fill-current' : 'opacity-30'}
        />
      ))}
      <span className="ml-1 text-xs text-truffle/70 dark:text-[#f6dfd0]/75">{rating.toFixed(1)}</span>
    </div>
  )
}

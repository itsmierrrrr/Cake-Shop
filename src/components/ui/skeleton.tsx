import { cn } from '@/lib/utils'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-rose/40 dark:bg-white/10',
        "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:animate-shimmer dark:before:via-white/20",
        className,
      )}
    />
  )
}


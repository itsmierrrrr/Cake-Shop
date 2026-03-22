import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-rose/50 px-3 py-1 text-xs font-medium text-truffle dark:bg-white/10 dark:text-[#f6dfd0]',
        className,
      )}
      {...props}
    />
  )
}


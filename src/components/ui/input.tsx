import type { InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-2xl border border-rose/40 bg-white/90 px-4 text-sm text-truffle outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/30 dark:border-white/20 dark:bg-[#3a2f2a]/80 dark:text-[#f6dfd0] dark:focus:border-[#f0becc]',
        className,
      )}
      {...props}
    />
  )
}


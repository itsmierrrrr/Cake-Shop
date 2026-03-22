import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/60 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-truffle text-white shadow-soft hover:-translate-y-0.5 hover:bg-cocoa dark:bg-[#f4dfcf] dark:text-[#2c201b] dark:hover:bg-[#f8e9de]',
        secondary:
          'bg-white/80 text-truffle ring-1 ring-rose/40 hover:bg-white dark:bg-[#3a2f2a] dark:text-[#f6dfd0] dark:ring-white/20 dark:hover:bg-[#473933]',
        ghost: 'text-truffle hover:bg-white/70 dark:text-[#f6dfd0] dark:hover:bg-white/10',
      },
      size: {
        default: 'h-10 px-5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />
}


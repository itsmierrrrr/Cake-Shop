import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

export function PageTransition({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-10"
    >
      {children}
    </motion.div>
  )
}

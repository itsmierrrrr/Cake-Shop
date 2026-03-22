import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
}

export function QuantityStepper({ value, onChange }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/80 px-2 py-1 dark:border-white/20 dark:bg-[#3a2f2a]/80">
      <Button variant="ghost" size="icon" onClick={() => onChange(Math.max(1, value - 1))}>
        <Minus size={14} />
      </Button>
      <span className="w-6 text-center text-sm font-medium">{value}</span>
      <Button variant="ghost" size="icon" onClick={() => onChange(value + 1)}>
        <Plus size={14} />
      </Button>
    </div>
  )
}


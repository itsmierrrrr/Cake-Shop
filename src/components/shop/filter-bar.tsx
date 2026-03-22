import type { CakeCategory, Flavor } from '@/types/cake'

const categoryOptions: Array<CakeCategory | 'All'> = [
  'All',
  'Celebration',
  'Wedding',
  'Signature',
  'Mini',
  'Seasonal',
]

const flavorOptions: Array<Flavor | 'All'> = [
  'All',
  'Chocolate',
  'Vanilla',
  'Berry',
  'Caramel',
  'Citrus',
  'Pistachio',
]

type FilterBarProps = {
  category: CakeCategory | 'All'
  flavor: Flavor | 'All'
  maxPrice: number
  onCategoryChange: (value: CakeCategory | 'All') => void
  onFlavorChange: (value: Flavor | 'All') => void
  onMaxPriceChange: (value: number) => void
}

export function FilterBar({
  category,
  flavor,
  maxPrice,
  onCategoryChange,
  onFlavorChange,
  onMaxPriceChange,
}: FilterBarProps) {
  return (
    <section className="glass-card grid gap-4 p-5 md:grid-cols-3">
      <label className="space-y-2 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
        Category
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as CakeCategory | 'All')}
          className="h-11 w-full rounded-2xl border border-rose/40 bg-white px-3 text-sm outline-none focus:border-rose dark:border-white/20 dark:bg-[#3a2f2a]/80"
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
        Flavor
        <select
          value={flavor}
          onChange={(event) => onFlavorChange(event.target.value as Flavor | 'All')}
          className="h-11 w-full rounded-2xl border border-rose/40 bg-white px-3 text-sm outline-none focus:border-rose dark:border-white/20 dark:bg-[#3a2f2a]/80"
        >
          {flavorOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
        Max Price: ${maxPrice}
        <input
          type="range"
          min={20}
          max={140}
          step={1}
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(Number(event.target.value))}
          className="h-11 w-full accent-[#9b6e5a]"
        />
      </label>
    </section>
  )
}


import { useEffect, useMemo, useState } from 'react'

import { PageTransition } from '@/components/common/page-transition'
import { CakeCard } from '@/components/shop/cake-card'
import { FilterBar } from '@/components/shop/filter-bar'
import { Skeleton } from '@/components/ui/skeleton'
import { cakes } from '@/data/cakes'
import { useDocumentTitle } from '@/hooks/use-document-title'
import type { CakeCategory, Flavor } from '@/types/cake'

export function ShopPage() {
  useDocumentTitle('Shop')

  const [category, setCategory] = useState<CakeCategory | 'All'>('All')
  const [flavor, setFlavor] = useState<Flavor | 'All'>('All')
  const [maxPrice, setMaxPrice] = useState(140)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => setIsLoading(false), 450)
    return () => window.clearTimeout(timer)
  }, [category, flavor, maxPrice])

  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      const categoryMatch = category === 'All' || cake.category === category
      const flavorMatch = flavor === 'All' || cake.flavor === flavor
      const priceMatch = cake.price <= maxPrice
      return categoryMatch && flavorMatch && priceMatch
    })
  }, [category, flavor, maxPrice])

  return (
    <PageTransition>
      <section className="space-y-2">
        <h1 className="section-title">Shop Cakes</h1>
        <p className="section-copy">Filter by flavor, style, and budget to find your perfect pick.</p>
      </section>

      <FilterBar
        category={category}
        flavor={flavor}
        maxPrice={maxPrice}
        onCategoryChange={setCategory}
        onFlavorChange={setFlavor}
        onMaxPriceChange={setMaxPrice}
      />

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="glass-card space-y-3 p-4">
              <Skeleton className="h-56 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      )}

      {!isLoading && filteredCakes.length === 0 && (
        <p className="rounded-2xl border border-rose/30 bg-white/80 p-6 text-center text-sm text-truffle/80 dark:border-white/20 dark:bg-[#3a2f2a]/70 dark:text-[#f6dfd0]/80">
          No cakes found with the current filters.
        </p>
      )}
    </PageTransition>
  )
}


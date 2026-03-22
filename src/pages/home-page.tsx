import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageTransition } from '@/components/common/page-transition'
import { RatingStars } from '@/components/common/rating-stars'
import { CakeCard } from '@/components/shop/cake-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cakes } from '@/data/cakes'
import { useDocumentTitle } from '@/hooks/use-document-title'

const testimonials = [
  {
    name: 'Sophia M.',
    note: 'Velvet Crumb made our engagement party unforgettable. Every detail was gorgeous.',
    rating: 5,
  },
  {
    name: 'The Parkers',
    note: 'The wedding cake looked like art and tasted incredibly balanced and fresh.',
    rating: 5,
  },
  {
    name: 'Nina R.',
    note: 'Their mini cakes are my go-to gift. Beautiful packaging and premium flavor.',
    rating: 4.8,
  },
]

export function HomePage() {
  useDocumentTitle('Home')

  const featured = cakes.filter((cake) => cake.featured).slice(0, 4)

  return (
    <PageTransition>
      <section className="grid items-center gap-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-soft backdrop-blur-sm md:grid-cols-2 md:p-10 dark:border-white/10 dark:bg-[#2a211d]/70">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
          <Badge className="mb-4">
            <Sparkles size={12} className="mr-1" /> Premium Cake Studio
          </Badge>
          <h1 className="text-4xl leading-tight text-truffle dark:text-[#f6dfd0] md:text-6xl">
            Baked with Artistry,
            <br /> Designed for Memories
          </h1>
          <p className="mt-4 max-w-xl text-sm text-truffle/75 dark:text-[#f6dfd0]/75 md:text-base">
            Discover handcrafted celebration cakes with signature textures, soft pastel palettes,
            and boutique-level presentation.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/shop">
                Shop Collection <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="img-zoom rounded-[1.75rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <img
            src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=80"
            alt="Featured boutique cake display"
            loading="lazy"
            className="h-[380px] w-full object-cover"
          />
        </motion.div>
      </section>

      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-title">Featured Cakes</h2>
            <p className="section-copy">Signature creations loved by our regulars.</p>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/shop">Browse all</Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <motion.article
            key={item.name}
            className="glass-card space-y-3 p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <RatingStars rating={item.rating} />
            <p className="text-sm text-truffle/75 dark:text-[#f6dfd0]/75">"{item.note}"</p>
            <p className="text-sm font-semibold text-cocoa dark:text-[#f2cdb8]">{item.name}</p>
          </motion.article>
        ))}
      </section>

      <section className="grid items-center gap-7 rounded-[2rem] border border-white/70 bg-white/65 p-6 md:grid-cols-2 md:p-9 dark:border-white/10 dark:bg-[#2a211d]/70">
        <img
          src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1400&q=80"
          alt="Bakery team preparing cakes"
          loading="lazy"
          className="h-72 w-full rounded-3xl object-cover"
        />
        <div>
          <h2 className="section-title">A Bakery Built on Slow Craft</h2>
          <p className="section-copy mt-3">
            We bake in small batches every morning with premium dairy, seasonal fruits, and
            balanced sweetness profiles. Every cake is hand-finished by our pastry artists.
          </p>
          <Button asChild className="mt-6">
            <Link to="/about">Read More</Link>
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}


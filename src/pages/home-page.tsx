import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
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
    note: 'Royale Bakes made our engagement party unforgettable. Every detail was gorgeous.',
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

const cakeMoments = [
  {
    title: 'Moments That Taste Like Joy',
    message:
      'From birthdays to cozy Sunday dinners, every slice brings smiles, stories, and little celebrations around the table.',
    image:
      'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?q=80&w=1170&auto=format&fit=crop',
    alt: 'Friends holding cake and celebrating together',
  },
  {
    title: 'Baked for Togetherness',
    message:
      'Our cakes are made to be shared with the people you love, turning simple gatherings into warm, unforgettable memories.',
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1170&auto=format&fit=crop',
    alt: 'Family eating cake at a celebration',
  },
  {
    title: 'Handcrafted Happiness',
    message:
      'Delicate layers, balanced sweetness, and elegant finishes made for happy hands, happy hearts, and happy photos.',
    image:
      'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1170&auto=format&fit=crop',
    alt: 'Person presenting a decorated cake at a party',
  },
  {
    title: 'Slices Shared, Memories Made',
    message:
      'A cake table becomes the heart of every celebration when friends gather, laugh, and share one more bite together.',
    image:
      'https://images.unsplash.com/photo-1521302200778-33500795e128?q=80&w=1170&auto=format&fit=crop',
    alt: 'Friends eating cake together during a celebration',
  },
  {
    title: 'Celebrate Every Little Win',
    message:
      'From exam results to new beginnings, our cakes turn everyday milestones into meaningful moments worth remembering.',
    image:
      'https://images.unsplash.com/photo-1558970859-2f4f2a6b0f7a?q=80&w=1170&auto=format&fit=crop',
    alt: 'People smiling while holding birthday cake',
  },
  {
    title: 'Sweetness You Can Hold',
    message:
      'Every handcrafted cake is designed to look stunning in your hands and even better when shared around your favorite people.',
    image:
      'https://images.unsplash.com/photo-1518566585952-6e1fcd8f1a89?q=80&w=1170&auto=format&fit=crop',
    alt: 'Person holding a celebration cake with candles',
  },
]

export function HomePage() {
  useDocumentTitle('Home')

  const featured = cakes.filter((cake) => cake.featured).slice(0, 4)
  const [activeMoment, setActiveMoment] = useState(0)
  const totalMoments = cakeMoments.length

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setActiveMoment((current) => (current + 1) % totalMoments)
    }, 3000)

    return () => window.clearTimeout(timeoutId)
  }, [activeMoment, totalMoments])

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
            src="https://plus.unsplash.com/premium_photo-1673792686366-27a26e9d5ea5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Featured boutique cake display"
            loading="lazy"
            className="h-[380px] w-full object-cover"
          />
        </motion.div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="section-title">Sweet Moments on Repeat</h2>
          <p className="section-copy">
            Cake stories from real celebrations, sliding by automatically every few seconds.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-soft backdrop-blur-sm dark:border-white/10 dark:bg-[#2f2521]/80">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeMoment * 100}%)` }}
          >
            {cakeMoments.map((moment) => (
              <article key={moment.title} className="grid min-w-full gap-4 p-4 md:grid-cols-2 md:gap-7 md:p-7">
                <img
                  src={moment.image}
                  alt={moment.alt}
                  loading="lazy"
                  className="h-64 w-full rounded-3xl object-cover md:h-[320px]"
                />
                <div className="flex items-center">
                  <div>
                    <Badge className="mb-3">Cake Love Story</Badge>
                    <h3 className="text-2xl leading-tight text-truffle dark:text-[#f6dfd0] md:text-4xl">
                      {moment.title}
                    </h3>
                    <p className="mt-4 text-sm text-truffle/75 dark:text-[#f6dfd0]/75 md:text-base">
                      {moment.message}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Show previous slide"
            onClick={() =>
              setActiveMoment((current) => (current - 1 + totalMoments) % totalMoments)
            }
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 bg-white/85 text-cocoa transition-colors hover:bg-white dark:border-[#f2cdb8]/25 dark:bg-[#2f2521]/80 dark:text-[#f2cdb8]"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex justify-center gap-2">
          {cakeMoments.map((moment, idx) => (
            <button
              key={moment.title}
              type="button"
              aria-label={`Show slide ${idx + 1}`}
              onClick={() => setActiveMoment(idx)}
              className={`h-2.5 rounded-full transition-all ${
                activeMoment === idx
                  ? 'w-8 bg-cocoa dark:bg-[#f2cdb8]'
                  : 'w-2.5 bg-cocoa/35 dark:bg-[#f2cdb8]/40'
              }`}
            />
          ))}
          </div>

          <button
            type="button"
            aria-label="Show next slide"
            onClick={() => setActiveMoment((current) => (current + 1) % totalMoments)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/20 bg-white/85 text-cocoa transition-colors hover:bg-white dark:border-[#f2cdb8]/25 dark:bg-[#2f2521]/80 dark:text-[#f2cdb8]"
          >
            <ArrowRight size={16} />
          </button>
        </div>
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
          src="https://images.unsplash.com/photo-1597528662465-55ece5734101?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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


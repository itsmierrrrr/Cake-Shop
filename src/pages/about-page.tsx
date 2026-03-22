import { PageTransition } from '@/components/common/page-transition'
import { useDocumentTitle } from '@/hooks/use-document-title'
import kitchen from '@/assets/purple.png'

const processSteps = [
  {
    title: 'Ingredient Curation',
    copy: 'We source premium butter, stone-milled flour, and seasonal fruit from local growers.',
  },
  {
    title: 'Slow Baking',
    copy: 'Each sponge is baked in small batches for better crumb texture and richer flavor.',
  },
  {
    title: 'Artisan Finishing',
    copy: 'Our decorators craft each cake by hand with clean lines and custom pastel palettes.',
  },
]

export function AboutPage() {
  useDocumentTitle('About')

  return (
    <PageTransition>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h1 className="section-title">Our Story</h1>
          <p className="section-copy">
            Velvet Crumb started as a tiny studio kitchen and grew into a premium bakery known for
            elegant celebration cakes. We blend modern pastry technique with warm, handmade detail.
          </p>
          <p className="section-copy">
            From weddings to intimate birthdays, our mission is to make every milestone sweeter and
            visually unforgettable.
          </p>
        </div>
        <img
          src={kitchen}
          alt="Bakery interior with cake displays"
          loading="lazy"
          className="h-72 w-full rounded-3xl object-cover"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {processSteps.map((step) => (
          <article key={step.title} className="glass-card space-y-2 p-5">
            <h2 className="text-2xl font-semibold text-truffle dark:text-[#f6dfd0]">{step.title}</h2>
            <p className="text-sm text-truffle/75 dark:text-[#f6dfd0]/75">{step.copy}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1400&q=80"
          alt="Pastry chef icing a cake"
          loading="lazy"
          className="h-80 w-full rounded-3xl object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1570038283490-0c2b8fe95b2b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cake decoration in process"
          loading="lazy"
          className="h-80 w-full rounded-3xl object-cover"
        />
      </section>
    </PageTransition>
  )
}


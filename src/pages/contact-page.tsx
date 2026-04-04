import { Mail, MapPin, Phone } from 'lucide-react'
import { toast } from 'sonner'

import { PageTransition } from '@/components/common/page-transition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useDocumentTitle } from '@/hooks/use-document-title'

export function ContactPage() {
  useDocumentTitle('Contact')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast.success('Your message has been sent. We will get back shortly.')
    event.currentTarget.reset()
  }

  return (
    <PageTransition>
      <section className="space-y-2">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-copy">Planning an event or custom cake? Tell us what you need.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
          <Input required placeholder="Your name" />
          <Input required type="email" placeholder="Email" />
          <Input placeholder="Phone" />
          <Textarea required placeholder="Your message" />
          <Button type="submit">Send Message</Button>
        </form>

        <div className="space-y-4">
          <div className="glass-card space-y-3 p-5 text-sm text-truffle/80 dark:text-[#f6dfd0]/80">
            <p className="inline-flex items-center gap-2">
              <MapPin size={15} /> Malad West, Mumbai.
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone size={15} /> 9897169420
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail size={15} /> mihir.s.sawant17@gmail.com
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-rose/30 dark:border-white/20">
            <iframe
              title="Royale Bakes bakery location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7285.364725596908!2d-74.52559964008351!3d24.052276509405953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1775329192421!5m2!1sen!2sin"
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}


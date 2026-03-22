import { Link } from 'react-router-dom'

import { PageTransition } from '@/components/common/page-transition'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/use-document-title'

export function NotFoundPage() {
  useDocumentTitle('Not Found')

  return (
    <PageTransition>
      <section className="glass-card mx-auto max-w-xl space-y-4 p-8 text-center">
        <h1 className="section-title">Page Not Found</h1>
        <p className="section-copy">The page you requested does not exist.</p>
        <Button asChild>
          <Link to="/">Return Home</Link>
        </Button>
      </section>
    </PageTransition>
  )
}


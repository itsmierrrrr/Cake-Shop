import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { PageTransition } from '@/components/common/page-transition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { useDocumentTitle } from '@/hooks/use-document-title'

type RedirectState = {
  from?: {
    pathname?: string
  }
}

export function SignInPage() {
  useDocumentTitle('Sign In')

  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const state = location.state as RedirectState | null
  const redirectTo = state?.from?.pathname || '/'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await signIn(email, password)
      toast.success('Signed in successfully.')
      navigate(redirectTo, { replace: true })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign in.')
    }
  }

  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="section-title">Sign In</h1>
          <p className="section-copy">Sign in to place orders and complete checkout.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-4 p-6">
          <Input
            required
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p className="text-center text-xs text-truffle/70 dark:text-[#f6dfd0]/70">
            New here?{' '}
            <Link to="/signup" className="font-medium text-cocoa underline-offset-2 hover:underline dark:text-[#f2cdb8]">
              Create an account
            </Link>
          </p>
        </form>

        {isAuthenticated && user && (
          <div className="glass-card space-y-2 p-4 text-center">
            <p className="text-sm text-truffle/80 dark:text-[#f6dfd0]/80">Signed in as {user.name}</p>
            <Button asChild variant="secondary" className="w-full">
              <Link to={redirectTo}>Continue</Link>
            </Button>
          </div>
        )}
      </section>
    </PageTransition>
  )
}

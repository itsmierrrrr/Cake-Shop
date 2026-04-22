import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { GoogleAuthButton } from '@/components/common/google-auth-button'
import { PageTransition } from '@/components/common/page-transition'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { useDocumentTitle } from '@/hooks/use-document-title'

export function SignUpPage() {
  useDocumentTitle('Sign Up')

  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await signUp(name, email, password)
      toast.success(response.message)
      navigate('/signin', { replace: true })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign up.')
    }
  }

  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="section-title">Create Account</h1>
          <p className="section-copy">Create your account to sign in and place orders.</p>
        </div>

        <form onSubmit={handleSignUp} className="glass-card space-y-4 p-6">
          <Input
            required
            placeholder="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-truffle/20 dark:bg-[#f6dfd0]/20" />
            <span className="text-[11px] uppercase tracking-[0.12em] text-truffle/60 dark:text-[#f6dfd0]/60">or</span>
            <span className="h-px flex-1 bg-truffle/20 dark:bg-[#f6dfd0]/20" />
          </div>
          <GoogleAuthButton
            label="Continue with Google"
            onClick={() => {
              const target = `${apiBaseUrl}/api/auth/google?redirect=${encodeURIComponent('/')}`
              window.location.assign(target)
            }}
          />
          <p className="text-center text-xs text-truffle/70 dark:text-[#f6dfd0]/70">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-cocoa underline-offset-2 hover:underline dark:text-[#f2cdb8]">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </PageTransition>
  )
}

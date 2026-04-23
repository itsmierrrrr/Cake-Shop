import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { PageTransition } from '@/components/common/page-transition'
import { useDocumentTitle } from '@/hooks/use-document-title'

export function GoogleCallbackPage() {
  useDocumentTitle('Google Sign In')

  const location = useLocation()
  const navigate = useNavigate()
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000'

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const code = params.get('code')
    const state = params.get('state')
    const error = params.get('error')

    if (error || !code) {
      navigate('/signin?error=google_auth_failed', { replace: true })
      return
    }

    const completeGoogleSignIn = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/auth/google/exchange`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        })

        if (!response.ok) {
          throw new Error('Google sign-in exchange failed')
        }

        const data = (await response.json()) as { token: string; redirect: string }
        const signInParams = new URLSearchParams({
          token: data.token,
          provider: 'google',
          redirect: data.redirect,
        })

        navigate(`/signin?${signInParams.toString()}`, { replace: true })
      } catch {
        navigate('/signin?error=google_auth_failed', { replace: true })
      }
    }

    void completeGoogleSignIn()
  }, [apiBaseUrl, location.search, navigate])

  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-md space-y-3 text-center">
        <h1 className="section-title">Finishing Google Sign In</h1>
        <p className="section-copy">Please wait while we complete your sign-in.</p>
      </section>
    </PageTransition>
  )
}
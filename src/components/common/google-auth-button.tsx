import { useEffect, useRef, useState } from 'react'

import { loadGoogleIdentityScript } from '@/lib/google-identity'

type GoogleAuthButtonProps = {
  label: string
  onCredential: (credential: string) => Promise<void> | void
  className?: string
}

export function GoogleAuthButton({ label, onCredential, className }: GoogleAuthButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const credentialHandlerRef = useRef(onCredential)
  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined

  useEffect(() => {
    credentialHandlerRef.current = onCredential
  }, [onCredential])

  useEffect(() => {
    let isMounted = true

    const renderButton = async () => {
      if (!clientId || !containerRef.current) {
        setHasError(true)
        return
      }

      try {
        await loadGoogleIdentityScript()

        if (!isMounted || !containerRef.current || !window.google?.accounts?.id) {
          return
        }

        containerRef.current.replaceChildren()
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (response.credential) {
              void credentialHandlerRef.current(response.credential)
            }
          },
        })

        window.google.accounts.id.renderButton(containerRef.current, {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
          width: containerRef.current.clientWidth,
        })

        setIsReady(true)
      } catch {
        if (isMounted) {
          setHasError(true)
        }
      }
    }

    void renderButton()

    return () => {
      isMounted = false
      containerRef.current?.replaceChildren()
    }
  }, [clientId])

  return (
    <div className={className ? `space-y-2 ${className}` : 'space-y-2'}>
      <p className="text-center text-[11px] uppercase tracking-[0.16em] text-truffle/60 dark:text-[#f6dfd0]/60">{label}</p>
      <div ref={containerRef} className="flex min-h-[44px] items-center justify-center" />
      {!clientId && (
        <p className="text-center text-xs text-red-500">Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in.</p>
      )}
      {hasError && clientId && (
        <p className="text-center text-xs text-red-500">Google sign-in is unavailable right now.</p>
      )}
      {!hasError && clientId && !isReady && (
        <p className="text-center text-xs text-truffle/60 dark:text-[#f6dfd0]/60">Loading Google Sign-In...</p>
      )}
    </div>
  )
}
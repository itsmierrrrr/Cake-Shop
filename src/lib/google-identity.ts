let googleIdentityScriptPromise: Promise<void> | null = null

export function loadGoogleIdentityScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if (window.google?.accounts?.id) {
    return Promise.resolve()
  }

  if (!googleIdentityScriptPromise) {
    googleIdentityScriptPromise = new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>('script[data-google-identity="true"]')

      if (existingScript) {
        if (window.google?.accounts?.id) {
          resolve()
          return
        }

        existingScript.addEventListener('load', () => resolve(), { once: true })
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Google Identity Services.')), {
          once: true,
        })
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.dataset.googleIdentity = 'true'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Google Identity Services.'))
      document.head.appendChild(script)
    }).catch((error) => {
      googleIdentityScriptPromise = null
      throw error
    })
  }

  return googleIdentityScriptPromise
}
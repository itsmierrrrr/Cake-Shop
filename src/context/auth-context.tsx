import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useContext,
  useMemo,
  useState,
} from 'react'

import type { AuthSessionResponse, AuthUser, SignUpResponse } from '@/types/auth'

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isHydrating: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithToken: (token: string) => Promise<void>
  signInWithGoogle: (idToken: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<SignUpResponse>
  signOut: () => void
}

const AUTH_STORAGE_KEY = 'velvet-auth-user'
const AUTH_TOKEN_KEY = 'velvet-auth-token'
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const AuthContext = createContext<AuthContextValue | null>(null)

function getInitialUser(): AuthUser | null {
  const saved = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!saved) {
    return null
  }

  try {
    const parsed = JSON.parse(saved) as AuthUser
    if (parsed?.email && parsed?.name) {
      return parsed
    }
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return null
}

function getInitialToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

async function parseApiError(response: Response): Promise<never> {
  let message = 'Request failed. Please try again.'

  try {
    const data = (await response.json()) as { message?: string }
    if (data.message) {
      message = data.message
    }
  } catch {
    // Keep default fallback message when body cannot be parsed.
  }

  throw new Error(message)
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => getInitialUser())
  const [token, setToken] = useState<string | null>(() => getInitialToken())
  const [isHydrating, setIsHydrating] = useState(true)

  const applySession = (nextToken: string, nextUser: AuthUser) => {
    setUser(nextUser)
    setToken(nextToken)
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    localStorage.setItem(AUTH_TOKEN_KEY, nextToken)
  }

  useEffect(() => {
    void fetch(`${API_BASE_URL}/api/health`).catch(() => {
      // Best-effort warmup for cold Render instances.
    })

    const hydrate = async () => {
      if (!token) {
        setIsHydrating(false)
        return
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Session is no longer valid.')
        }

        const data = (await response.json()) as { user: AuthUser }
        setUser(data.user)
      } catch {
        setUser(null)
        setToken(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
        localStorage.removeItem(AUTH_TOKEN_KEY)
      } finally {
        setIsHydrating(false)
      }
    }

    void hydrate()
  }, [token])

  const signUp = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      await parseApiError(response)
    }

    return (await response.json()) as SignUpResponse
  }

  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      await parseApiError(response)
    }

    const data = (await response.json()) as { token: string; user: AuthUser }
    applySession(data.token, data.user)
  }

  const signInWithGoogle = async (idToken: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })

    if (!response.ok) {
      await parseApiError(response)
    }

    const data = (await response.json()) as AuthSessionResponse & { isNewUser?: boolean }
    applySession(data.token, data.user)
  }

  const signInWithToken = async (nextToken: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${nextToken}`,
      },
    })

    if (!response.ok) {
      await parseApiError(response)
    }

    const data = (await response.json()) as { user: AuthUser }
    applySession(nextToken, data.user)
  }

  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isHydrating,
      signIn,
      signInWithToken,
      signInWithGoogle,
      signUp,
      signOut,
    }),
    [isHydrating, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}

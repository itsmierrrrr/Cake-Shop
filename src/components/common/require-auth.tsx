import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/use-auth'

type RequireAuthProps = {
  children: React.ReactElement
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, isHydrating } = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated && !isHydrating) {
      toast.info('Please sign in to continue to checkout.')
    }
  }, [isAuthenticated, isHydrating])

  if (isHydrating) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  return children
}

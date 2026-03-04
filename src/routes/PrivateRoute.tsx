import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PrivateRouteProps {
  children: ReactNode
}

/**
 * PrivateRoute component for protecting routes that require authentication.
 * Redirects to login page if user is not authenticated.
 */
export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation()

  // TODO: Replace with actual auth check from useAuth hook
  const isAuthenticated = true // Placeholder for auth context

  if (!isAuthenticated) {
    // Redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default PrivateRoute

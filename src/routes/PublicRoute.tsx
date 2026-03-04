import type { ReactNode } from 'react'

interface PublicRouteProps {
  children: ReactNode
  restricted?: boolean
}

/**
 * PublicRoute component for routes that don't require authentication.
 * If restricted is true, authenticated users will be redirected to home.
 */
export function PublicRoute({ children, restricted = false }: PublicRouteProps) {
  // TODO: Replace with actual auth check from useAuth hook
  const isAuthenticated = false // Placeholder for auth context

  if (isAuthenticated && restricted) {
    // Redirect authenticated users away from restricted public routes (e.g., login page)
    // return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default PublicRoute

import { useContext, useCallback } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import type { AuthContextValue, LoginCredentials, RegisterCredentials } from '../types/auth'

/**
 * Hook to access authentication context.
 * Provides access to auth state and methods.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

/**
 * Hook that provides wrapped authentication methods with memoization.
 */
export function useAuthActions() {
  const { login, logout, register, refreshToken } = useAuth()

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      await login(credentials)
    },
    [login]
  )

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const handleRegister = useCallback(
    async (credentials: RegisterCredentials) => {
      await register(credentials)
    },
    [register]
  )

  const handleRefreshToken = useCallback(async () => {
    await refreshToken()
  }, [refreshToken])

  return {
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    refreshToken: handleRefreshToken,
  }
}

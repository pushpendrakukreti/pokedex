/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type {
  AuthContextValue,
  AuthState,
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthTokens,
} from '../types/auth'
import { getStorageItem, setStorageItem, removeStorageItem } from '../lib/storage'
import { STORAGE_KEYS } from '../constants/app'

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider component that provides authentication context to the app.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)
      const user = getStorageItem<User>(STORAGE_KEYS.USER)

      if (token && user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // TODO: Replace with actual API call
      // const response = await authService.login(credentials)

      // Placeholder implementation
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const mockTokens: AuthTokens = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      }

      // Store tokens and user
      setStorageItem(STORAGE_KEYS.AUTH_TOKEN, mockTokens.accessToken)
      setStorageItem(STORAGE_KEYS.USER, mockUser)

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }))
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN)
    removeStorageItem(STORAGE_KEYS.USER)

    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  }, [])

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        // TODO: Replace with actual API call
        // const response = await authService.register(credentials)

        // After registration, automatically log in
        await login({ email: credentials.email, password: credentials.password })
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Registration failed',
        }))
        throw error
      }
    },
    [login]
  )

  const refreshToken = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await authService.refreshToken()
      console.log('Token refresh not implemented')
    } catch (error) {
      // If refresh fails, log out the user
      logout()
      throw error
    }
  }, [logout])

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    register,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

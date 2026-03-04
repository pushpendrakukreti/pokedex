import type { LoginCredentials, RegisterCredentials, AuthTokens, User } from '../../types/auth'
import { getStorageItem, setStorageItem, removeStorageItem } from '../../lib/storage'
import { STORAGE_KEYS } from '../../constants/app'

/**
 * Authentication service for login, logout, and registration.
 * Replace mock implementations with actual API calls.
 */
export const authService = {
  /**
   * Login with email and password.
   */
  login: async (credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> => {
    // TODO: Replace with actual API call
    // const response = await apiClient.post('/auth/login', credentials)

    // Mock implementation
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

    return { user: mockUser, tokens: mockTokens }
  },

  /**
   * Register a new user.
   */
  register: async (
    credentials: RegisterCredentials
  ): Promise<{ user: User; tokens: AuthTokens }> => {
    // TODO: Replace with actual API call
    // const response = await apiClient.post('/auth/register', credentials)

    // Mock implementation
    const mockUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const mockTokens: AuthTokens = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      expiresIn: 3600,
    }

    return { user: mockUser, tokens: mockTokens }
  },

  /**
   * Logout the current user.
   */
  logout: async (): Promise<void> => {
    // TODO: Call logout endpoint if needed
    // await apiClient.post('/auth/logout')

    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN)
    removeStorageItem(STORAGE_KEYS.USER)
  },

  /**
   * Refresh the access token.
   */
  refreshToken: async (): Promise<AuthTokens> => {
    const refreshToken = getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)

    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    // TODO: Replace with actual API call
    // const response = await apiClient.post('/auth/refresh', { refreshToken })

    // Mock implementation
    const mockTokens: AuthTokens = {
      accessToken: 'new-mock-access-token',
      refreshToken: 'new-mock-refresh-token',
      expiresIn: 3600,
    }

    setStorageItem(STORAGE_KEYS.AUTH_TOKEN, mockTokens.accessToken)

    return mockTokens
  },

  /**
   * Get the current user from storage.
   */
  getCurrentUser: (): User | null => {
    return getStorageItem<User>(STORAGE_KEYS.USER)
  },

  /**
   * Check if user is authenticated.
   */
  isAuthenticated: (): boolean => {
    const token = getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)
    return !!token
  },
}

export default authService

import { getStorageItem, setStorageItem, removeStorageItem } from '../../lib/storage'
import { STORAGE_KEYS } from '../../constants/app'
import type { AuthTokens } from '../../types/auth'

/**
 * Token manager for handling JWT tokens.
 */
export const tokenManager = {
  /**
   * Get the current access token.
   */
  getAccessToken: (): string | null => {
    return getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)
  },

  /**
   * Set the access token.
   */
  setAccessToken: (token: string): void => {
    setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token)
  },

  /**
   * Remove the access token.
   */
  removeAccessToken: (): void => {
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN)
  },

  /**
   * Store tokens (access and refresh).
   */
  setTokens: (tokens: AuthTokens): void => {
    setStorageItem(STORAGE_KEYS.AUTH_TOKEN, tokens.accessToken)
    // Store refresh token separately if needed
    // setStorageItem('refresh_token', tokens.refreshToken)
  },

  /**
   * Clear all auth tokens.
   */
  clearTokens: (): void => {
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN)
    // removeStorageItem('refresh_token')
  },

  /**
   * Check if a token exists.
   */
  hasToken: (): boolean => {
    return !!getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)
  },

  /**
   * Decode a JWT token (without verification).
   * Note: This only decodes, it does NOT verify the signature.
   */
  decodeToken: (token: string): Record<string, unknown> | null => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(jsonPayload)
    } catch {
      return null
    }
  },

  /**
   * Check if a token is expired.
   */
  isTokenExpired: (token: string): boolean => {
    const decoded = tokenManager.decodeToken(token)
    if (!decoded || typeof decoded.exp !== 'number') {
      return true
    }
    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now()
  },

  /**
   * Check if the current access token is expired.
   */
  isCurrentTokenExpired: (): boolean => {
    const token = tokenManager.getAccessToken()
    if (!token) return true
    return tokenManager.isTokenExpired(token)
  },
}

export default tokenManager

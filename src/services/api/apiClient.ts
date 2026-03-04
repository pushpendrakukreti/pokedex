import axios from 'axios'
import { API_CONFIG } from '../../constants/api'
import { getStorageItem } from '../../lib/storage'
import { STORAGE_KEYS } from '../../constants/app'

/**
 * Configured API client with interceptors for auth and error handling.
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          // Could trigger logout or token refresh here
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          break
        case 500:
          // Server error
          console.error('Server error occurred')
          break
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received')
    }

    return Promise.reject(error)
  }
)

export { apiClient }
export default apiClient

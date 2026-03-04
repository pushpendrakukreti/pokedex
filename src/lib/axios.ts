import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '../constants/api'
import { getStorageItem } from './storage'
import { STORAGE_KEYS } from '../constants/app'

/**
 * Configured axios instance with interceptors for auth and error handling.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStorageItem<string>(STORAGE_KEYS.AUTH_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized - clear token and redirect
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          // window.location.href = '/login'
          break
        case 403:
          // Handle forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Handle not found
          console.error('Resource not found')
          break
        case 500:
          // Handle server error
          console.error('Server error')
          break
      }
    }
    return Promise.reject(error)
  }
)

export { axiosInstance }
export default axiosInstance

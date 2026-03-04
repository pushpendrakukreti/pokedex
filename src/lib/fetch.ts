import { API_CONFIG } from '../constants/api'
import { ERROR_MESSAGES } from '../constants/messages'

interface FetchOptions extends RequestInit {
  timeout?: number
}

/**
 * Custom error class for fetch operations
 */
export class FetchError extends Error {
  status: number
  statusText: string

  constructor(message: string, status: number, statusText: string) {
    super(message)
    this.name = 'FetchError'
    this.status = status
    this.statusText = statusText
  }
}

/**
 * Fetch wrapper with timeout and error handling.
 */
export async function fetchWithTimeout<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { timeout = API_CONFIG.TIMEOUT, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new FetchError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText
      )
    }

    return response.json()
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(ERROR_MESSAGES.TIMEOUT)
    }

    throw error
  }
}

/**
 * Simple GET request wrapper
 */
export async function get<T>(url: string, options?: FetchOptions): Promise<T> {
  return fetchWithTimeout<T>(url, { ...options, method: 'GET' })
}

/**
 * Simple POST request wrapper
 */
export async function post<T>(url: string, data?: unknown, options?: FetchOptions): Promise<T> {
  return fetchWithTimeout<T>(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
}

export default { get, post, fetchWithTimeout }

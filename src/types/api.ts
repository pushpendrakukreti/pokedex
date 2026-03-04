// API request/response types

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: Record<string, unknown>
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiRequestConfig {
  timeout?: number
  retries?: number
  headers?: Record<string, string>
}

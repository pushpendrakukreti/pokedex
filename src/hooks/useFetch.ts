import { useState, useEffect, useCallback, useRef } from 'react'
import type { AsyncState, Status } from '../types/common'

interface FetchOptions<T> {
  /** Whether to fetch immediately on mount */
  immediate?: boolean
  /** Initial data value */
  initialData?: T | null
  /** Callback when fetch succeeds */
  onSuccess?: (data: T) => void
  /** Callback when fetch fails */
  onError?: (error: Error) => void
}

interface UseFetchReturn<T> extends AsyncState<T> {
  /** Execute the fetch manually */
  execute: () => Promise<T | null>
  /** Reset the state */
  reset: () => void
  /** Whether the fetch has been executed at least once */
  isExecuted: boolean
}

/**
 * Generic data fetching hook with loading, error, and caching support.
 */
export function useFetch<T>(
  fetchFn: () => Promise<T>,
  options: FetchOptions<T> = {}
): UseFetchReturn<T> {
  const { immediate = true, initialData = null, onSuccess, onError } = options

  const [data, setData] = useState<T | null>(initialData)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [isExecuted, setIsExecuted] = useState(false)

  // Use ref to track if component is mounted
  const isMounted = useRef(true)

  // Use ref for latest fetchFn to avoid stale closures
  const fetchFnRef = useRef(fetchFn)

  // Update the ref in an effect to avoid updating during render
  useEffect(() => {
    fetchFnRef.current = fetchFn
  }, [fetchFn])

  const execute = useCallback(async (): Promise<T | null> => {
    setStatus('loading')
    setError(null)
    setIsExecuted(true)

    try {
      const result = await fetchFnRef.current()

      if (isMounted.current) {
        setData(result)
        setStatus('success')
        onSuccess?.(result)
      }

      return result
    } catch (err) {
      if (isMounted.current) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred'
        setError(errorMessage)
        setStatus('error')
        onError?.(err instanceof Error ? err : new Error(errorMessage))
      }
      return null
    }
  }, [onSuccess, onError])

  const reset = useCallback(() => {
    setData(initialData)
    setStatus('idle')
    setError(null)
    setIsExecuted(false)
  }, [initialData])

  // Execute on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Valid pattern for immediate data fetching on mount
      execute()
    }
  }, [immediate, execute])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  return {
    data,
    status,
    error,
    execute,
    reset,
    isExecuted,
  }
}

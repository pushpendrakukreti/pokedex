import { useState, useEffect } from 'react'

/**
 * Hook that debounces a value by the specified delay.
 * Useful for search inputs to avoid excessive API calls.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timeout to update the debounced value
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clear the timeout if the value or delay changes
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}

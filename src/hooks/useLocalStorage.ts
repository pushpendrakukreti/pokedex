import { useState, useEffect, useCallback } from 'react'
import { getStorageItem, setStorageItem, removeStorageItem } from '../lib/storage'

/**
 * Hook to manage state persisted in localStorage.
 * Syncs with localStorage and provides type-safe access.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getStorageItem<T>(key)
    return item !== null ? item : initialValue
  })

  // Update localStorage when state changes
  useEffect(() => {
    setStorageItem(key, storedValue)
  }, [key, storedValue])

  // Wrapper to update state and localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const newValue = value instanceof Function ? value(prev) : value
        return newValue
      })
    },
    []
  )

  // Function to remove the item from storage
  const removeValue = useCallback(() => {
    removeStorageItem(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch {
          console.error('Error parsing storage event value')
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue, removeValue]
}

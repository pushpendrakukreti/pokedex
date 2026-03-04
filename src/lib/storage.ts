/**
 * Storage utilities for localStorage and sessionStorage with type safety.
 */

type StorageType = 'local' | 'session'

function getStorage(type: StorageType): Storage {
  return type === 'local' ? localStorage : sessionStorage
}

/**
 * Get an item from storage with type safety.
 */
export function getStorageItem<T>(key: string, type: StorageType = 'local'): T | null {
  try {
    const storage = getStorage(type)
    const item = storage.getItem(key)
    if (item === null) return null
    return JSON.parse(item) as T
  } catch (error) {
    console.error(`Error reading from ${type}Storage:`, error)
    return null
  }
}

/**
 * Set an item in storage with type safety.
 */
export function setStorageItem<T>(key: string, value: T, type: StorageType = 'local'): boolean {
  try {
    const storage = getStorage(type)
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to ${type}Storage:`, error)
    return false
  }
}

/**
 * Remove an item from storage.
 */
export function removeStorageItem(key: string, type: StorageType = 'local'): boolean {
  try {
    const storage = getStorage(type)
    storage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from ${type}Storage:`, error)
    return false
  }
}

/**
 * Clear all items from storage.
 */
export function clearStorage(type: StorageType = 'local'): boolean {
  try {
    const storage = getStorage(type)
    storage.clear()
    return true
  } catch (error) {
    console.error(`Error clearing ${type}Storage:`, error)
    return false
  }
}

/**
 * Check if storage is available.
 */
export function isStorageAvailable(type: StorageType = 'local'): boolean {
  try {
    const storage = getStorage(type)
    const testKey = '__storage_test__'
    storage.setItem(testKey, testKey)
    storage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

export default {
  get: getStorageItem,
  set: setStorageItem,
  remove: removeStorageItem,
  clear: clearStorage,
  isAvailable: isStorageAvailable,
}

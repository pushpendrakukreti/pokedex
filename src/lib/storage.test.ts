import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getStorageItem, setStorageItem, removeStorageItem, clearStorage, isStorageAvailable } from './storage'

describe('Storage utilities', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getStorageItem', () => {
    it('should return parsed value from localStorage', () => {
      localStorage.setItem('test-key', JSON.stringify({ name: 'test' }))
      const result = getStorageItem<{ name: string }>('test-key')
      expect(result).toEqual({ name: 'test' })
    })

    it('should return null for non-existent key', () => {
      const result = getStorageItem('non-existent')
      expect(result).toBeNull()
    })

    it('should return null on JSON parse error', () => {
      localStorage.setItem('bad-json', 'not-valid-json')
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const result = getStorageItem('bad-json')
      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalled()
    })

    it('should read from sessionStorage when type is session', () => {
      sessionStorage.setItem('session-key', JSON.stringify('session-value'))
      const result = getStorageItem<string>('session-key', 'session')
      expect(result).toBe('session-value')
    })
  })

  describe('setStorageItem', () => {
    it('should store JSON-stringified value in localStorage', () => {
      const result = setStorageItem('test-key', { name: 'test' })
      expect(result).toBe(true)
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify({ name: 'test' }))
    })

    it('should store value in sessionStorage when type is session', () => {
      setStorageItem('session-key', 'value', 'session')
      expect(sessionStorage.getItem('session-key')).toBe(JSON.stringify('value'))
    })

    it('should return false when storage throws', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full')
      })
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const result = setStorageItem('key', 'value')
      expect(result).toBe(false)
      expect(consoleSpy).toHaveBeenCalled()
    })
  })

  describe('removeStorageItem', () => {
    it('should remove item from localStorage', () => {
      localStorage.setItem('to-remove', '"value"')
      const result = removeStorageItem('to-remove')
      expect(result).toBe(true)
      expect(localStorage.getItem('to-remove')).toBeNull()
    })

    it('should return false when storage throws', () => {
      vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Error')
      })
      vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(removeStorageItem('key')).toBe(false)
    })
  })

  describe('clearStorage', () => {
    it('should clear all items from localStorage', () => {
      localStorage.setItem('key1', '"v1"')
      localStorage.setItem('key2', '"v2"')
      const result = clearStorage()
      expect(result).toBe(true)
      expect(localStorage.length).toBe(0)
    })

    it('should return false when storage throws', () => {
      vi.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
        throw new Error('Error')
      })
      vi.spyOn(console, 'error').mockImplementation(() => {})
      expect(clearStorage()).toBe(false)
    })
  })

  describe('isStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isStorageAvailable()).toBe(true)
    })

    it('should return true for sessionStorage', () => {
      expect(isStorageAvailable('session')).toBe(true)
    })

    it('should return false when storage throws', () => {
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage unavailable')
      })
      expect(isStorageAvailable()).toBe(false)
    })
  })
})

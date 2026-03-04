import { describe, it, expect, vi, afterEach } from 'vitest'
import { formatDate, formatDateShort, formatTime, formatRelativeTime, isToday, isPast, isFuture } from './date'

describe('Date utilities', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  describe('formatDate', () => {
    it('should format a Date object to readable string', () => {
      const date = new Date(2024, 0, 15) // Jan 15, 2024
      const result = formatDate(date)
      expect(result).toContain('2024')
      expect(result).toContain('15')
    })

    it('should accept string dates', () => {
      const result = formatDate('2024-06-01')
      expect(result).toContain('2024')
    })

    it('should accept custom options', () => {
      const result = formatDate(new Date(2024, 0, 15), { month: 'short' })
      expect(result).toBeTruthy()
    })
  })

  describe('formatDateShort', () => {
    it('should format date in short format', () => {
      const date = new Date(2024, 0, 15)
      const result = formatDateShort(date)
      expect(result).toContain('2024')
    })
  })

  describe('formatTime', () => {
    it('should format a date to a time string', () => {
      const date = new Date(2024, 0, 15, 14, 30)
      const result = formatTime(date)
      expect(result).toBeTruthy()
      // Should contain hour and minute info
      expect(result).toContain('30')
    })
  })

  describe('formatRelativeTime', () => {
    it('should return "just now" for recent dates', () => {
      const now = new Date()
      expect(formatRelativeTime(now)).toBe('just now')
    })

    it('should return minutes ago', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const fiveMinutesAgo = new Date('2024-06-15T11:55:00')
      expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago')
      vi.useRealTimers()
    })

    it('should return hours ago', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const twoHoursAgo = new Date('2024-06-15T10:00:00')
      expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago')
      vi.useRealTimers()
    })

    it('should return days ago', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const threeDaysAgo = new Date('2024-06-12T12:00:00')
      expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago')
      vi.useRealTimers()
    })

    it('should handle singular forms', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const oneMinuteAgo = new Date('2024-06-15T11:59:00')
      expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago')
      vi.useRealTimers()
    })

    it('should return weeks ago', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const twoWeeksAgo = new Date('2024-06-01T12:00:00')
      expect(formatRelativeTime(twoWeeksAgo)).toBe('2 weeks ago')
      vi.useRealTimers()
    })

    it('should return months ago', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const threeMonthsAgo = new Date('2024-03-15T12:00:00')
      expect(formatRelativeTime(threeMonthsAgo)).toContain('month')
      vi.useRealTimers()
    })

    it('should return years ago', () => {
      vi.useFakeTimers()
      const now = new Date('2024-06-15T12:00:00')
      vi.setSystemTime(now)
      const twoYearsAgo = new Date('2022-06-15T12:00:00')
      expect(formatRelativeTime(twoYearsAgo)).toContain('year')
      vi.useRealTimers()
    })
  })

  describe('isToday', () => {
    it('should return true for today', () => {
      expect(isToday(new Date())).toBe(true)
    })

    it('should return false for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      expect(isToday(yesterday)).toBe(false)
    })
  })

  describe('isPast', () => {
    it('should return true for past dates', () => {
      const pastDate = new Date('2020-01-01')
      expect(isPast(pastDate)).toBe(true)
    })

    it('should return false for future dates', () => {
      const futureDate = new Date('2099-01-01')
      expect(isPast(futureDate)).toBe(false)
    })
  })

  describe('isFuture', () => {
    it('should return true for future dates', () => {
      const futureDate = new Date('2099-01-01')
      expect(isFuture(futureDate)).toBe(true)
    })

    it('should return false for past dates', () => {
      const pastDate = new Date('2020-01-01')
      expect(isFuture(pastDate)).toBe(false)
    })
  })
})

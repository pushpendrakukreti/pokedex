/**
 * Date utility functions and formatters.
 */

/**
 * Format a date to a readable string.
 */
export function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = new Date(date)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return dateObj.toLocaleDateString(undefined, defaultOptions)
}

/**
 * Format a date to a short string (MM/DD/YYYY).
 */
export function formatDateShort(date: Date | string | number): string {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

/**
 * Format a date to a time string.
 */
export function formatTime(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = new Date(date)
  const defaultOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  }
  return dateObj.toLocaleTimeString(undefined, defaultOptions)
}

/**
 * Format a date to a relative time string (e.g., "2 hours ago").
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = new Date(date)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
}

/**
 * Check if a date is today.
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = new Date(date)
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Check if a date is in the past.
 */
export function isPast(date: Date | string | number): boolean {
  return new Date(date).getTime() < new Date().getTime()
}

/**
 * Check if a date is in the future.
 */
export function isFuture(date: Date | string | number): boolean {
  return new Date(date).getTime() > new Date().getTime()
}

export default {
  format: formatDate,
  formatShort: formatDateShort,
  formatTime,
  formatRelative: formatRelativeTime,
  isToday,
  isPast,
  isFuture,
}

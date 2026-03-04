/**
 * Common enum-like constants using const objects and union types
 * Using const objects instead of enums for erasableSyntaxOnly compatibility
 */

// Loading state constant and type
export const LoadingState = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const
export type LoadingState = typeof LoadingState[keyof typeof LoadingState]

// Sort order constant and type
export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const
export type SortOrder = typeof SortOrder[keyof typeof SortOrder]

// Sort field constant and type
export const SortField = {
  NAME: 'name',
  ID: 'id',
  DATE: 'date',
} as const
export type SortField = typeof SortField[keyof typeof SortField]

// Notification type constant and type
export const NotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const
export type NotificationType = typeof NotificationType[keyof typeof NotificationType]

// Theme constant and type
export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const
export type Theme = typeof Theme[keyof typeof Theme]

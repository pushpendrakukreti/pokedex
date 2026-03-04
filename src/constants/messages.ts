// User-facing messages and notifications

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again later.',
  NETWORK: 'Unable to connect. Please check your internet connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  TIMEOUT: 'The request timed out. Please try again.',
  POKEMON_LOAD_FAILED: 'Failed to load Pokemon data. Please try again.',
  POKEMON_NOT_FOUND: 'Pokemon not found. Please check the name or ID.',
} as const

export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Item deleted successfully.',
  LOGIN: 'Welcome back!',
  LOGOUT: 'You have been logged out.',
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites.',
} as const

export const INFO_MESSAGES = {
  LOADING: 'Loading...',
  NO_RESULTS: 'No results found.',
  SEARCH_PLACEHOLDER: 'Search Pokémon...',
  NO_POKEMON_FOUND: 'No Pokémon found matching your search.',
} as const

export const CONFIRMATION_MESSAGES = {
  DELETE: 'Are you sure you want to delete this?',
  LOGOUT: 'Are you sure you want to log out?',
  UNSAVED_CHANGES: 'You have unsaved changes. Are you sure you want to leave?',
} as const

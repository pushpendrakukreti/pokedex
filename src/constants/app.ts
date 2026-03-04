// General application constants

export const APP_CONFIG = {
  NAME: 'Pokedex',
  VERSION: '1.0.0',
  DESCRIPTION: 'A React application for exploring Pokemon',
} as const

export const STORAGE_KEYS = {
  THEME: 'pokemon-explorer-theme',
  AUTH_TOKEN: 'pokemon-explorer-auth-token',
  USER: 'pokemon-explorer-user',
  FAVORITES: 'pokemon-explorer-favorites',
} as const

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const

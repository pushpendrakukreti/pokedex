// API configuration constants

export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const

export const API_ENDPOINTS = {
  POKEMON: '/pokemon',
  POKEMON_SPECIES: '/pokemon-species',
  POKEMON_TYPE: '/type',
  POKEMON_ABILITY: '/ability',
} as const

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const

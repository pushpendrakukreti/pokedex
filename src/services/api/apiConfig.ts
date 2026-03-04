import { API_CONFIG, API_ENDPOINTS, PAGINATION } from '../../constants/api'

/**
 * API configuration and endpoint builders.
 */
export const apiConfig = {
  baseUrl: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  retryAttempts: API_CONFIG.RETRY_ATTEMPTS,
  retryDelay: API_CONFIG.RETRY_DELAY,
}

/**
 * Build Pokemon list endpoint URL.
 */
export function buildPokemonListUrl(
  limit = PAGINATION.DEFAULT_LIMIT,
  offset = 0
): string {
  return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POKEMON}?limit=${limit}&offset=${offset}`
}

/**
 * Build Pokemon detail endpoint URL.
 */
export function buildPokemonDetailUrl(idOrName: string | number): string {
  return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POKEMON}/${idOrName}`
}

/**
 * Build Pokemon species endpoint URL.
 */
export function buildPokemonSpeciesUrl(idOrName: string | number): string {
  return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POKEMON_SPECIES}/${idOrName}`
}

/**
 * Build Pokemon type endpoint URL.
 */
export function buildPokemonTypeUrl(type: string): string {
  return `${API_CONFIG.BASE_URL}${API_ENDPOINTS.POKEMON_TYPE}/${type}`
}

export default apiConfig

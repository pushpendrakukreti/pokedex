import axios from 'axios'
import { API_CONFIG, API_ENDPOINTS } from '../../constants/api'
import type { PokemonListResponse, PokemonDetail } from '../../types/pokemon'

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
})

export const pokemonApi = {
  /**
   * Get a paginated list of Pokemon.
   */
  getList: async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
    const response = await apiClient.get<PokemonListResponse>(
      `${API_ENDPOINTS.POKEMON}?limit=${limit}&offset=${offset}`
    )
    return response.data
  },

  /**
   * Get Pokemon by ID or name.
   */
  getById: async (id: number | string): Promise<PokemonDetail> => {
    const response = await apiClient.get<PokemonDetail>(`${API_ENDPOINTS.POKEMON}/${id}`)
    return response.data
  },

  /**
   * Get Pokemon by name (case-insensitive).
   */
  getByName: async (name: string): Promise<PokemonDetail> => {
    const response = await apiClient.get<PokemonDetail>(
      `${API_ENDPOINTS.POKEMON}/${name.toLowerCase()}`
    )
    return response.data
  },

  /**
   * Search Pokemon by name prefix.
   */
  searchByName: async (query: string, limit = 20): Promise<PokemonListResponse> => {
    // Note: PokeAPI doesn't support search, so we fetch all and filter client-side
    // In a real app, you'd have a backend that supports search
    const response = await apiClient.get<PokemonListResponse>(
      `${API_ENDPOINTS.POKEMON}?limit=1000`
    )
    
    const filteredResults = response.data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    )

    return {
      ...response.data,
      count: filteredResults.length,
      results: filteredResults.slice(0, limit),
    }
  },
}

export default pokemonApi

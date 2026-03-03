import axios from 'axios'
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const pokemonApi = {
  getList: async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
    const response = await axios.get<PokemonListResponse>(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    )
    return response.data
  },

  getById: async (id: number | string): Promise<PokemonDetail> => {
    const response = await axios.get<PokemonDetail>(`${BASE_URL}/pokemon/${id}`)
    return response.data
  },

  getByName: async (name: string): Promise<PokemonDetail> => {
    const response = await axios.get<PokemonDetail>(`${BASE_URL}/pokemon/${name.toLowerCase()}`)
    return response.data
  },
}

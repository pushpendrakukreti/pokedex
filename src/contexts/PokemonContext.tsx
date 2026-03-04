/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { PokemonListItem, PokemonDetail } from '../types/pokemon'

interface PokemonContextValue {
  favorites: string[]
  addFavorite: (name: string) => void
  removeFavorite: (name: string) => void
  isFavorite: (name: string) => boolean
  toggleFavorite: (name: string) => void
  recentlyViewed: PokemonListItem[]
  addToRecentlyViewed: (pokemon: PokemonListItem) => void
  clearRecentlyViewed: () => void
  selectedPokemon: PokemonDetail | null
  setSelectedPokemon: (pokemon: PokemonDetail | null) => void
}

export const PokemonContext = createContext<PokemonContextValue | null>(null)

interface PokemonProviderProps {
  children: ReactNode
}

const MAX_RECENTLY_VIEWED = 10

/**
 * PokemonProvider component that manages Pokemon-related state.
 */
export function PokemonProvider({ children }: PokemonProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<PokemonListItem[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null)

  const addFavorite = useCallback((name: string) => {
    setFavorites((prev) => {
      if (prev.includes(name)) return prev
      return [...prev, name]
    })
  }, [])

  const removeFavorite = useCallback((name: string) => {
    setFavorites((prev) => prev.filter((f) => f !== name))
  }, [])

  const isFavorite = useCallback((name: string) => favorites.includes(name), [favorites])

  const toggleFavorite = useCallback(
    (name: string) => {
      if (isFavorite(name)) {
        removeFavorite(name)
      } else {
        addFavorite(name)
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  )

  const addToRecentlyViewed = useCallback((pokemon: PokemonListItem) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.name !== pokemon.name)
      // Add to beginning
      const newList = [pokemon, ...filtered]
      // Keep only max items
      return newList.slice(0, MAX_RECENTLY_VIEWED)
    })
  }, [])

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([])
  }, [])

  const value: PokemonContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    selectedPokemon,
    setSelectedPokemon,
  }

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}

export default PokemonProvider

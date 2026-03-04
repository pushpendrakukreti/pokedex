import { useState, useMemo, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { pokemonApi } from '../../../services/pokemonApi'
import type { PokemonListItem } from '../../../types/pokemon'
import { PokemonCard } from '../PokemonCard'
import { PokemonSearch } from '../PokemonSearch'

/**
 * PokemonList component - displays a filterable grid of Pokemon cards.
 * Uses memoization for filtering and callbacks to optimize performance.
 */
export function PokemonList() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: () => pokemonApi.getList(20, 0),
  })

  const results = data?.results

  // Memoize filtered results to avoid recalculation on every render
  const filteredPokemon = useMemo(() => {
    if (!results) return []
    if (!searchTerm.trim()) return results

    return results.filter((pokemon: PokemonListItem) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [results, searchTerm])

  // Memoize search handler to pass to child components
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-50">
        <p className="text-lg text-red-600">
          Error: {error instanceof Error ? error.message : 'Failed to load Pokemon'}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokémon List</h1>

      <PokemonSearch value={searchTerm} onChange={handleSearchChange} />

      {filteredPokemon.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">No Pokémon found matching "{searchTerm}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPokemon.map((pokemon: PokemonListItem) => (
            <Link key={pokemon.name} to={`/pokemon/${pokemon.name}`} className="no-underline">
              <PokemonCard pokemon={pokemon} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default PokemonList

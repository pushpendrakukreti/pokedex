import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { pokemonApi } from '../../services/pokemonApi'
import type { PokemonListItem } from '../../types/pokemon'
import { PokemonCard } from '../PokemonCard/PokemonCard'

export function PokemonList() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: () => pokemonApi.getList(20, 0),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg text-red-600">
          Error: {error instanceof Error ? error.message : 'Failed to load Pokemon'}
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.results.map((pokemon: PokemonListItem) => (
          <Link
            key={pokemon.name}
            to={`/pokemon/${pokemon.name}`}
            className="no-underline"
          >
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  )
}

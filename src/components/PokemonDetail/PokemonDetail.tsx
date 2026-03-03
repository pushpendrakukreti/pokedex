import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { pokemonApi } from '../../services/pokemonApi'
import type { PokemonDetail as PokemonDetailType } from '../../types/pokemon'
import { typeColors, statNames } from '../../utils/helper'

export function PokemonDetail() {
  const { nameOrId } = useParams<{ nameOrId: string }>()

  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = useQuery<PokemonDetailType>({
    queryKey: ['pokemon', 'detail', nameOrId],
    queryFn: () => pokemonApi.getById(nameOrId!),
    enabled: !!nameOrId,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-lg text-red-600 mb-4">
          Error: {error instanceof Error ? error.message : 'Failed to load Pokemon'}
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  if (!pokemon) {
    return null
  }

  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to List
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 bg-linear-to-br from-gray-100 to-gray-200 p-8 flex items-center justify-center">
              {imageUrl && (
                <img src={imageUrl} alt={pokemon.name} className="w-64 h-64 object-contain" />
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
                <span className="text-xl text-gray-500">
                  #{pokemon.id.toString().padStart(3, '0')}
                </span>
              </div>

              {/* Types */}
              <div className="flex gap-2 mb-6">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-1 rounded-full text-white text-sm font-medium capitalize ${
                      typeColors[type.type.name] || 'bg-gray-400'
                    }`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              {/* Physical Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">Height</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {(pokemon.height / 10).toFixed(1)} m
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-500 text-sm">Weight</p>
                  <p className="text-xl font-semibold text-gray-800">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </p>
                </div>
              </div>

              {/* Abilities */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className={`px-3 py-1 rounded-lg text-sm capitalize ${
                        ability.is_hidden
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {ability.ability.name.replace('-', ' ')}
                      {ability.is_hidden && <span className="text-xs ml-1">(Hidden)</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Base Stats</h2>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name} className="flex items-center">
                      <span className="w-20 text-sm text-gray-600">
                        {statNames[stat.stat.name] || stat.stat.name}
                      </span>
                      <span className="w-10 text-sm font-medium text-gray-800">
                        {stat.base_stat}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

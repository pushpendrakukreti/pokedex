import type { PokemonListItem } from '../../types/pokemon'
import { getPokemonId, getSpriteUrl } from '../../utils/helper'

interface PokemonCardProps {
  pokemon: PokemonListItem
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonId = getPokemonId(pokemon.url)
  const spriteUrl = getSpriteUrl(pokemonId)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer">
      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <img
          src={spriteUrl}
          alt={pokemon.name}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>
      <p className="text-center text-lg font-semibold capitalize text-gray-800">{pokemon.name}</p>
      <p className="text-center text-sm text-gray-500">#{pokemonId.toString().padStart(3, '0')}</p>
    </div>
  )
}

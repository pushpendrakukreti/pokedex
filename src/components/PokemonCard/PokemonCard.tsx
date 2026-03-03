import type { PokemonListItem } from '../../types/pokemon'

interface PokemonCardProps {
  pokemon: PokemonListItem
}

// Extract Pokemon ID from URL
const getPokemonId = (url: string): number => {
  const parts = url.split('/')
  return parseInt(parts[parts.length - 2], 10)
}

// Get sprite URL from Pokemon ID
const getSpriteUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
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
      <p className="text-center text-lg font-semibold capitalize text-gray-800">
        {pokemon.name}
      </p>
      <p className="text-center text-sm text-gray-500">
        #{pokemonId.toString().padStart(3, '0')}
      </p>
    </div>
  )
}

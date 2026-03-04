// Pokemon-specific constants

export const POKEMON_TYPES = [
  { name: 'normal', color: 'bg-gray-400' },
  { name: 'fire', color: 'bg-red-500' },
  { name: 'water', color: 'bg-blue-500' },
  { name: 'electric', color: 'bg-yellow-400' },
  { name: 'grass', color: 'bg-green-500' },
  { name: 'ice', color: 'bg-blue-200' },
  { name: 'fighting', color: 'bg-red-700' },
  { name: 'poison', color: 'bg-purple-500' },
  { name: 'ground', color: 'bg-yellow-600' },
  { name: 'flying', color: 'bg-indigo-400' },
  { name: 'psychic', color: 'bg-pink-500' },
  { name: 'bug', color: 'bg-green-400' },
  { name: 'rock', color: 'bg-yellow-700' },
  { name: 'ghost', color: 'bg-purple-700' },
  { name: 'dragon', color: 'bg-indigo-600' },
  { name: 'dark', color: 'bg-gray-700' },
  { name: 'steel', color: 'bg-gray-500' },
  { name: 'fairy', color: 'bg-pink-300' },
] as const

export const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
}

export const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

export const SPRITE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

export const POKEMON_GENERATIONS = [
  { id: 1, name: 'Generation I', range: [1, 151] },
  { id: 2, name: 'Generation II', range: [152, 251] },
  { id: 3, name: 'Generation III', range: [252, 386] },
  { id: 4, name: 'Generation IV', range: [387, 493] },
  { id: 5, name: 'Generation V', range: [494, 649] },
  { id: 6, name: 'Generation VI', range: [650, 721] },
  { id: 7, name: 'Generation VII', range: [722, 809] },
  { id: 8, name: 'Generation VIII', range: [810, 905] },
  { id: 9, name: 'Generation IX', range: [906, 1025] },
] as const

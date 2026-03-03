import { http, HttpResponse } from 'msw'

// Mock data for Pokemon list
export const mockPokemonList = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  ],
}

// Mock data for individual Pokemon
export const mockPokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  types: [
    { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
    { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
  ],
  abilities: [
    {
      ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' },
      is_hidden: true,
      slot: 3,
    },
  ],
  stats: [
    { base_stat: 45, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
    },
    {
      base_stat: 65,
      effort: 1,
      stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' },
    },
    {
      base_stat: 65,
      effort: 0,
      stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' },
    },
    { base_stat: 45, effort: 0, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
  ],
}

export const handlers = [
  // Pokemon list endpoint
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json(mockPokemonList)
  }),

  // Pokemon detail endpoint
  http.get('https://pokeapi.co/api/v2/pokemon/:nameOrId', ({ params }) => {
    const { nameOrId } = params
    if (nameOrId === 'invalid' || nameOrId === '9999') {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json({
      ...mockPokemonDetail,
      id:
        typeof nameOrId === 'string' && !isNaN(Number(nameOrId))
          ? Number(nameOrId)
          : mockPokemonDetail.id,
      name:
        typeof nameOrId === 'string' && isNaN(Number(nameOrId)) ? nameOrId : mockPokemonDetail.name,
    })
  }),
]

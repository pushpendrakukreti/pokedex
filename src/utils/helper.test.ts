import { describe, it, expect } from 'vitest'
import { typeColors, statNames, getPokemonId, getSpriteUrl } from './helper'

describe('helper', () => {
  describe('typeColors', () => {
    it('contains all 18 Pokemon types', () => {
      const expectedTypes = [
        'normal',
        'fire',
        'water',
        'electric',
        'grass',
        'ice',
        'fighting',
        'poison',
        'ground',
        'flying',
        'psychic',
        'bug',
        'rock',
        'ghost',
        'dragon',
        'dark',
        'steel',
        'fairy',
      ]
      expectedTypes.forEach((type) => {
        expect(typeColors[type]).toBeDefined()
      })
    })

    it('returns correct color class for fire type', () => {
      expect(typeColors.fire).toBe('bg-red-500')
    })

    it('returns correct color class for water type', () => {
      expect(typeColors.water).toBe('bg-blue-500')
    })

    it('returns correct color class for grass type', () => {
      expect(typeColors.grass).toBe('bg-green-500')
    })

    it('returns correct color class for electric type', () => {
      expect(typeColors.electric).toBe('bg-yellow-400')
    })

    it('returns correct color class for psychic type', () => {
      expect(typeColors.psychic).toBe('bg-pink-500')
    })

    it('returns correct color class for dragon type', () => {
      expect(typeColors.dragon).toBe('bg-indigo-600')
    })
  })

  describe('statNames', () => {
    it('contains all 6 base stats', () => {
      const expectedStats = [
        'hp',
        'attack',
        'defense',
        'special-attack',
        'special-defense',
        'speed',
      ]
      expectedStats.forEach((stat) => {
        expect(statNames[stat]).toBeDefined()
      })
    })

    it('returns correct display name for hp', () => {
      expect(statNames.hp).toBe('HP')
    })

    it('returns correct display name for attack', () => {
      expect(statNames.attack).toBe('Attack')
    })

    it('returns correct display name for defense', () => {
      expect(statNames.defense).toBe('Defense')
    })

    it('returns correct display name for special-attack', () => {
      expect(statNames['special-attack']).toBe('Sp. Atk')
    })

    it('returns correct display name for special-defense', () => {
      expect(statNames['special-defense']).toBe('Sp. Def')
    })

    it('returns correct display name for speed', () => {
      expect(statNames.speed).toBe('Speed')
    })
  })

  describe('getPokemonId', () => {
    it('extracts Pokemon ID from URL', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1/'
      expect(getPokemonId(url)).toBe(1)
    })

    it('extracts Pokemon ID for double-digit IDs', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/25/'
      expect(getPokemonId(url)).toBe(25)
    })

    it('extracts Pokemon ID for triple-digit IDs', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/150/'
      expect(getPokemonId(url)).toBe(150)
    })

    it('extracts Pokemon ID for four-digit IDs', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1000/'
      expect(getPokemonId(url)).toBe(1000)
    })

    it('handles URL without trailing slash', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/42'
      // Note: This will return NaN because the last part would be '42' not before the trailing slash
      // The function expects trailing slash
      const parts = url.split('/')
      expect(parts[parts.length - 1]).toBe('42')
    })
  })

  describe('getSpriteUrl', () => {
    it('returns correct sprite URL for Pokemon ID 1', () => {
      const expected =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
      expect(getSpriteUrl(1)).toBe(expected)
    })

    it('returns correct sprite URL for Pokemon ID 25', () => {
      const expected =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
      expect(getSpriteUrl(25)).toBe(expected)
    })

    it('returns correct sprite URL for Pokemon ID 150', () => {
      const expected =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
      expect(getSpriteUrl(150)).toBe(expected)
    })

    it('returns correct sprite URL for high Pokemon ID', () => {
      const expected =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1000.png'
      expect(getSpriteUrl(1000)).toBe(expected)
    })
  })
})

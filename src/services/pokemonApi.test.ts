import { describe, it, expect } from 'vitest'
import { pokemonApi } from './pokemonApi'

describe('pokemonApi', () => {
  describe('getList', () => {
    it('fetches a list of Pokemon with default parameters', async () => {
      const result = await pokemonApi.getList()
      expect(result).toBeDefined()
      expect(result.results).toBeDefined()
      expect(Array.isArray(result.results)).toBe(true)
    })

    it('returns Pokemon list with name and url properties', async () => {
      const result = await pokemonApi.getList()
      expect(result.results.length).toBeGreaterThan(0)
      expect(result.results[0]).toHaveProperty('name')
      expect(result.results[0]).toHaveProperty('url')
    })

    it('fetches Pokemon list with custom limit', async () => {
      const result = await pokemonApi.getList(5, 0)
      expect(result.results).toBeDefined()
    })

    it('fetches Pokemon list with custom offset', async () => {
      const result = await pokemonApi.getList(20, 10)
      expect(result.results).toBeDefined()
    })
  })

  describe('getById', () => {
    it('fetches Pokemon by numeric ID', async () => {
      const result = await pokemonApi.getById(1)
      expect(result).toBeDefined()
      expect(result.name).toBe('bulbasaur')
    })

    it('fetches Pokemon by string ID', async () => {
      const result = await pokemonApi.getById('1')
      expect(result).toBeDefined()
      expect(result.name).toBe('bulbasaur')
    })

    it('returns Pokemon with expected properties', async () => {
      const result = await pokemonApi.getById(1)
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('height')
      expect(result).toHaveProperty('weight')
      expect(result).toHaveProperty('sprites')
      expect(result).toHaveProperty('types')
      expect(result).toHaveProperty('abilities')
      expect(result).toHaveProperty('stats')
    })

    it('throws error for invalid Pokemon ID', async () => {
      await expect(pokemonApi.getById(9999)).rejects.toThrow()
    })
  })

  describe('getByName', () => {
    it('fetches Pokemon by name', async () => {
      const result = await pokemonApi.getByName('bulbasaur')
      expect(result).toBeDefined()
      expect(result.name).toBe('bulbasaur')
    })

    it('fetches Pokemon by name case-insensitively', async () => {
      const result = await pokemonApi.getByName('BULBASAUR')
      expect(result).toBeDefined()
      expect(result.name).toBe('bulbasaur')
    })

    it('returns Pokemon with expected properties', async () => {
      const result = await pokemonApi.getByName('bulbasaur')
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('height')
      expect(result).toHaveProperty('weight')
      expect(result).toHaveProperty('sprites')
      expect(result).toHaveProperty('types')
      expect(result).toHaveProperty('abilities')
      expect(result).toHaveProperty('stats')
    })

    it('throws error for invalid Pokemon name', async () => {
      await expect(pokemonApi.getByName('invalid')).rejects.toThrow()
    })
  })
})

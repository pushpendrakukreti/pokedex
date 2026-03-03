import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PokemonCard } from './PokemonCard'
import type { PokemonListItem } from '../../types/pokemon'

describe('PokemonCard', () => {
  const mockPokemon: PokemonListItem = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
  }

  it('renders Pokemon name', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
  })

  it('renders Pokemon ID with leading zeros', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText('#001')).toBeInTheDocument()
  })

  it('renders Pokemon image with correct alt text', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'bulbasaur')
  })

  it('renders Pokemon image with correct sprite URL', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    )
  })

  it('renders Pokemon with higher ID correctly', () => {
    const pikachu: PokemonListItem = {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon/25/',
    }
    render(<PokemonCard pokemon={pikachu} />)
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    expect(screen.getByText('#025')).toBeInTheDocument()
  })

  it('renders Pokemon with three-digit ID correctly', () => {
    const charizard: PokemonListItem = {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon/100/',
    }
    render(<PokemonCard pokemon={charizard} />)
    expect(screen.getByText('#100')).toBeInTheDocument()
  })

  it('has correct styling classes for card container', () => {
    const { container } = render(<PokemonCard pokemon={mockPokemon} />)
    const card = container.firstChild
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md')
  })

  it('renders image with lazy loading attribute', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('loading', 'lazy')
  })
})

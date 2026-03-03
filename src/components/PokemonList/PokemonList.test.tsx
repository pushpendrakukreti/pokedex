import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { PokemonList } from './PokemonList'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  )
}

describe('PokemonList', () => {
  it('renders loading state initially', () => {
    render(<PokemonList />, { wrapper: createWrapper() })
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders a list of Pokemon after loading', async () => {
    render(<PokemonList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument()
    expect(screen.getByText(/charmander/i)).toBeInTheDocument()
  })

  it('renders Pokemon cards in a grid layout', async () => {
    render(<PokemonList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    const pokemonCards = screen.getAllByRole('link')
    expect(pokemonCards.length).toBeGreaterThan(0)
  })

  it('displays Pokemon images', async () => {
    render(<PokemonList />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
  })
})

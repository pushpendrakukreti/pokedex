import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { PokemonDetail } from './PokemonDetail'

const createWrapper = (initialEntries: string[] = ['/pokemon/bulbasaur']) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/pokemon/:nameOrId" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('PokemonDetail', () => {
  it('renders loading state initially', () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders Pokemon details after loading', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })
  })

  it('displays Pokemon image', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByRole('img')).toBeInTheDocument()
    })
  })

  it('displays Pokemon types', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/grass/i)).toBeInTheDocument()
      expect(screen.getByText(/poison/i)).toBeInTheDocument()
    })
  })

  it('displays Pokemon stats', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/hp/i)).toBeInTheDocument()
      expect(screen.getByText(/attack/i)).toBeInTheDocument()
      expect(screen.getByText(/defense/i)).toBeInTheDocument()
    })
  })

  it('displays Pokemon abilities', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/overgrow/i)).toBeInTheDocument()
    })
  })

  it('displays Pokemon height and weight', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/height/i)).toBeInTheDocument()
      expect(screen.getByText(/weight/i)).toBeInTheDocument()
    })
  })

  it('displays back navigation link', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: /back/i })).toBeInTheDocument()
  })

  it('displays error state for invalid Pokemon', async () => {
    render(<PokemonDetail />, { wrapper: createWrapper(['/pokemon/invalid']) })

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})

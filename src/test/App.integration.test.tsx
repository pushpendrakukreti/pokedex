import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App Integration', () => {
  it('renders the Pokemon list on the home page', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })
  })

  it('navigates to Pokemon detail page when clicking on a Pokemon card', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    // Find the link containing bulbasaur
    const bulbasaurCard = screen.getByText(/bulbasaur/i).closest('a')
    expect(bulbasaurCard).toBeInTheDocument()
    await user.click(bulbasaurCard!)

    await waitFor(() => {
      expect(screen.getByText(/back to list/i)).toBeInTheDocument()
    })
  })

  it('can navigate back from detail page to list page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    // Find the link containing bulbasaur
    const bulbasaurCard = screen.getByText(/bulbasaur/i).closest('a')
    await user.click(bulbasaurCard!)

    await waitFor(() => {
      expect(screen.getByText(/back to list/i)).toBeInTheDocument()
    })

    const backLink = screen.getByRole('link', { name: /back to list/i })
    await user.click(backLink)

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
    })
  })

  it('filters Pokemon and navigates to filtered Pokemon detail', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    // Search for pikachu
    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'pika')

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    })

    // Click on pikachu
    const pikachuCard = screen.getByText(/pikachu/i).closest('a')
    await user.click(pikachuCard!)

    await waitFor(() => {
      expect(screen.getByText(/back to list/i)).toBeInTheDocument()
    })
  })
})

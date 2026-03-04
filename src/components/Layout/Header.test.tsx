import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

  it('should render the app name', () => {
    renderHeader()
    expect(screen.getByText('Pokemon Explorer')).toBeInTheDocument()
  })

  it('should render the Home navigation link', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })

  it('should render the API Docs external link', () => {
    renderHeader()
    const apiLink = screen.getByRole('link', { name: /api docs/i })
    expect(apiLink).toHaveAttribute('href', 'https://pokeapi.co/')
    expect(apiLink).toHaveAttribute('target', '_blank')
  })

  it('should render mobile menu button', () => {
    renderHeader()
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
  })

  it('should have sticky positioning', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
  })
})

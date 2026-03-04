import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('should render the app name', () => {
    render(<Footer />)
    expect(screen.getByText('Pokedex')).toBeInTheDocument()
  })

  it('should render the app description', () => {
    render(<Footer />)
    expect(screen.getByText('A React application for exploring Pokemon')).toBeInTheDocument()
  })

  it('should render the PokéAPI link', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /pokéapi/i })
    expect(link).toHaveAttribute('href', 'https://pokeapi.co/')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('should render the GitHub link', () => {
    render(<Footer />)
    const link = screen.getByRole('link', { name: /github/i })
    expect(link).toHaveAttribute('href', 'https://github.com')
  })

  it('should render copyright with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })

  it('should render tech stack info', () => {
    render(<Footer />)
    expect(screen.getByText(/built with react/i)).toBeInTheDocument()
  })
})

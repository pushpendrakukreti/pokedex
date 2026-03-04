import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CustomLink from './Link'

describe('CustomLink', () => {
  it('should render internal link with React Router', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/pokemon">Pokemon</CustomLink>
      </MemoryRouter>
    )
    const link = screen.getByText('Pokemon')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/pokemon')
  })

  it('should render external link', () => {
    render(
      <MemoryRouter>
        <CustomLink href="https://pokeapi.co" external>API</CustomLink>
      </MemoryRouter>
    )
    const link = screen.getByText('API').closest('a')
    expect(link).toHaveAttribute('href', 'https://pokeapi.co')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should apply variant styles', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test" variant="success">Green Link</CustomLink>
      </MemoryRouter>
    )
    expect(screen.getByText('Green Link')).toHaveClass('text-green-500')
  })

  it('should apply size styles', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test" size="lg">Large</CustomLink>
      </MemoryRouter>
    )
    expect(screen.getByText('Large')).toHaveClass('text-lg')
  })

  it('should apply underline styles', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/test" underline="always">Always underline</CustomLink>
      </MemoryRouter>
    )
    expect(screen.getByText('Always underline')).toHaveClass('underline')
  })

  it('should show external link icon for external links', () => {
    render(
      <MemoryRouter>
        <CustomLink href="https://example.com" external>External</CustomLink>
      </MemoryRouter>
    )
    const link = screen.getByText('External').closest('a')
    expect(link?.querySelector('svg')).toBeInTheDocument()
  })
})
